import { put, list, del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';

// Load environment variables
dotenv.config({ path: '.env.local' });

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ASSETS_FILE = path.join(process.cwd(), 'config', 'assets.ts');

// Helper to calculate file hash
async function calculateFileHash(filePath: string): Promise<string> {
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function organizeByDirectory(blobs: { pathname: string; url: string }[]) {
  const structure: Record<string, any> = {};

  // Filter out .DS_Store files before processing
  const filteredBlobs = blobs.filter((blob) => !blob.pathname.includes('.DS_Store'));

  filteredBlobs.forEach(({ pathname, url }) => {
    const parts = pathname.split('/');
    let current = structure;

    parts.forEach((part, index) => {
      // Get the name without extension for the final part
      const key = index === parts.length - 1 ? part.replace(/\.[^/.]+$/, '') : part;

      if (index === parts.length - 1) {
        // If there's already an entry, convert to array
        if (current[key]) {
          if (Array.isArray(current[key])) {
            current[key].push(url);
          } else {
            current[key] = [current[key], url];
          }
        } else {
          current[key] = url;
        }
      } else {
        current[key] = current[key] || {};
        current = current[key];
      }
    });
  });

  // Sort any arrays in the structure
  const sortArrays = (obj: any) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        obj[key].sort();
      } else if (typeof obj[key] === 'object') {
        sortArrays(obj[key]);
      }
    }
  };

  sortArrays(structure);
  return structure;
}

function generateTypeScriptCode(structure: Record<string, any>): string {
  return `export const assets = ${JSON.stringify(structure, null, 2)} as const;

export type AssetUrl = string;
`;
}

// Get all local files recursively
async function getAllLocalFiles(dir: string, baseDir: string = ''): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.includes('.DS_Store')) continue;

    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await getAllLocalFiles(fullPath, relativePath)));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

async function processFiles(localFiles: string[], existingBlobs: Map<string, string>) {
  const processedFiles = new Set<string>();

  for (const relativePath of localFiles) {
    console.log(`Processing: ${relativePath}`);
    const fullPath = path.join(PUBLIC_DIR, relativePath);

    // Calculate hash of local file
    const localHash = await calculateFileHash(fullPath);

    if (existingBlobs.has(relativePath)) {
      // Check if file content has changed by downloading and comparing hash
      const existingUrl = existingBlobs.get(relativePath)!;
      const response = await fetch(existingUrl);
      const existingBuffer = await response.arrayBuffer();
      const existingHash = crypto
        .createHash('sha256')
        .update(Buffer.from(existingBuffer))
        .digest('hex');

      if (localHash !== existingHash) {
        console.log(`File changed, re-uploading: ${relativePath}`);
        const file = await fs.readFile(fullPath);
        await put(relativePath, file, {
          access: 'public',
          addRandomSuffix: false,
        });
      } else {
        console.log(`File unchanged: ${relativePath}`);
      }
    } else {
      // New file, upload it
      console.log(`New file, uploading: ${relativePath}`);
      const file = await fs.readFile(fullPath);
      await put(relativePath, file, {
        access: 'public',
        addRandomSuffix: false,
      });
    }

    processedFiles.add(relativePath);
  }

  // Delete remote files that don't exist locally
  for (const [remotePath] of existingBlobs.entries()) {
    if (!processedFiles.has(remotePath)) {
      console.log(`Deleting removed file: ${remotePath}`);
      await del(existingBlobs.get(remotePath)!);
    }
  }
}

async function uploadAssets() {
  try {
    // Get all existing blobs
    const existingBlobs = await list();
    const existingUrlMap = new Map(
      existingBlobs.blobs
        .filter((blob) => !blob.pathname.includes('.DS_Store'))
        .map((blob) => [blob.pathname, blob.url])
    );

    // Get all local files
    const localFiles = await getAllLocalFiles(PUBLIC_DIR);

    // Process files - upload new/changed and delete removed
    await processFiles(localFiles, existingUrlMap);

    // Get final list of blobs and generate assets file
    const finalBlobs = await list();
    const assetStructure = organizeByDirectory(finalBlobs.blobs);
    const tsCode = generateTypeScriptCode(assetStructure);
    await fs.writeFile(ASSETS_FILE, tsCode);

    console.log('Asset upload complete and assets.ts updated!');
  } catch (error) {
    console.error('Error uploading assets:', error);
    process.exit(1);
  }
}

// Run the upload
uploadAssets();
