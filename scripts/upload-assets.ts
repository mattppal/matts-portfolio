import { put, list, del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ASSETS_FILE = path.join(process.cwd(), 'config', 'assets.ts');

function organizeByDirectory(blobs: { pathname: string; url: string }[]) {
  const structure: Record<string, any> = {};

  blobs.forEach(({ pathname, url }) => {
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

async function processDirectory(
  dirPath: string,
  baseDir: string = '',
  existingUrls: Map<string, string>
) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    // Skip .DS_Store files
    if (entry.name === '.DS_Store') continue;

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, relativePath, existingUrls);
    } else {
      console.log(`Processing: ${relativePath}`);

      if (existingUrls.has(relativePath)) {
        console.log(`Deleting existing blob: ${relativePath}`);
        await del(existingUrls.get(relativePath)!);
      }

      const file = await fs.readFile(fullPath);
      const blob = await put(relativePath, file, {
        access: 'public',
        addRandomSuffix: false,
      });

      console.log(`Uploaded: ${blob.url}`);
    }
  }
}

async function uploadAssets() {
  try {
    // Get all existing blobs first
    const existingBlobs = await list();
    const existingUrls = new Map(existingBlobs.blobs.map((blob) => [blob.pathname, blob.url]));

    // Upload new assets
    await processDirectory(PUBLIC_DIR, '', existingUrls);

    // Get updated list of all blobs
    const updatedBlobs = await list();

    // Organize assets into structure
    const assetStructure = organizeByDirectory(updatedBlobs.blobs);

    // Generate and write TypeScript code
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
