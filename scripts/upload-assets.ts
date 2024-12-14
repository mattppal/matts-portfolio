import { put, list, del } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import crypto from 'crypto';
import ignore from 'ignore';
import { promises as fsPromises } from 'fs';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

// Add these type definitions at the top
type AssetStructure = {
  [key: string]: string | string[] | AssetStructure;
};

// Load environment variables
dotenv.config({ path: '.env.local' });

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const ASSETS_FILE = path.join(process.cwd(), 'config', 'assets.ts');

// Initialize ignore instance
let ig: ReturnType<typeof ignore>;

async function initializeGitignore() {
  ig = ignore();
  try {
    const gitignoreContent = await fsPromises.readFile(
      path.join(process.cwd(), '.gitignore'),
      'utf8'
    );
    ig.add(gitignoreContent);
  } catch (error) {
    console.warn('No .gitignore file found, proceeding without ignore rules');
  }
}

// Helper to calculate file hash
async function calculateFileHash(filePath: string): Promise<string> {
  const fileBuffer = await fs.readFile(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function organizeByDirectory(
  blobs: { pathname: string; url: string }[],
  useLocalUrls: boolean = false
) {
  const structure: AssetStructure = {};
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  // Filter out .DS_Store files before processing
  const filteredBlobs = blobs.filter((blob) => !blob.pathname.includes('.DS_Store'));

  filteredBlobs.forEach(({ pathname, url }) => {
    const parts = pathname.split('/');
    let current = structure;

    // If using local URLs, construct local URL instead of using CDN URL
    const finalUrl = useLocalUrls ? `${baseUrl}/${pathname}` : url;

    parts.forEach((part, index) => {
      // Get the name without extension for the final part
      const key = index === parts.length - 1 ? part.replace(/\.[^/.]+$/, '') : part;

      if (index === parts.length - 1) {
        // If there's already an entry, convert to array
        if (current[key]) {
          if (Array.isArray(current[key])) {
            (current[key] as string[]).push(finalUrl);
          } else {
            current[key] = [current[key] as string, finalUrl];
          }
        } else {
          current[key] = finalUrl;
        }
      } else {
        current[key] = current[key] || {};
        current = current[key] as AssetStructure;
      }
    });
  });

  // Sort any arrays in the structure
  const sortArrays = (obj: AssetStructure) => {
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        (obj[key] as string[]).sort();
      } else if (typeof obj[key] === 'object') {
        sortArrays(obj[key] as AssetStructure);
      }
    }
  };

  sortArrays(structure);
  return structure;
}

function generateTypeScriptCode(structure: AssetStructure, localStructure: AssetStructure): string {
  return `// CDN URLs for production
const productionAssets = ${JSON.stringify(structure, null, 2)} as const;

// Local URLs for development
const localAssets = ${JSON.stringify(localStructure, null, 2)} as const;

// Export the appropriate version based on NEXT_PUBLIC_BASE_URL
export const assets = process.env.NEXT_PUBLIC_BASE_URL?.includes('localhost')
  ? localAssets
  : productionAssets;

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

    // Check if path is ignored by gitignore
    const relativeToRoot = path.relative(process.cwd(), fullPath);
    if (ig.ignores(relativeToRoot)) {
      console.log(`Skipping ignored path: ${relativeToRoot}`);
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...(await getAllLocalFiles(fullPath, relativePath)));
    } else {
      files.push(relativePath);
    }
  }

  return files;
}

// Add this helper function to check git status
async function isFileModifiedInGit(relativePath: string): Promise<boolean> {
  try {
    // Check if file is tracked by git
    const isTracked =
      execSync(`git ls-files ${relativePath}`, {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).length > 0;

    if (!isTracked) {
      return true; // New file, needs upload
    }

    // Check if file is modified
    const status = execSync(`git status --porcelain ${relativePath}`, {
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });

    return status.length > 0; // Returns true if file is modified
  } catch (error) {
    logWarning(`Unable to check git status for ${chalk.bold(relativePath)}`);
    return true;
  }
}

// Add these helper functions at the top level
function logSuccess(message: string) {
  console.log(chalk.green('✓'), message);
}

function logInfo(message: string) {
  console.log(chalk.blue('ℹ'), message);
}

function logWarning(message: string) {
  console.log(chalk.yellow('⚠'), message);
}

function logError(message: string) {
  console.log(chalk.red('✖'), message);
}

// Update the processFiles function with better logging
async function processFiles(localFiles: string[], existingBlobs: Map<string, string>) {
  const processedFiles = new Set<string>();
  const spinner = ora();

  console.log(chalk.bold('\n🚀 Processing files...\n'));

  for (const relativePath of localFiles) {
    spinner.start(chalk.dim(`Checking ${relativePath}`));
    const fullPath = path.join(PUBLIC_DIR, relativePath);

    if (existingBlobs.has(relativePath)) {
      const isModified = await isFileModifiedInGit(path.join('public', relativePath));

      if (isModified) {
        spinner.text = chalk.dim(`Uploading ${relativePath}`);
        const file = await fs.readFile(fullPath);
        await put(relativePath, file, {
          access: 'public',
          addRandomSuffix: false,
        });
        spinner.stop();
        logSuccess(`Updated ${chalk.bold(relativePath)}`);
      } else {
        spinner.stop();
        logInfo(`Skipped ${chalk.bold(relativePath)} (unchanged)`);
      }
    } else {
      spinner.text = chalk.dim(`Uploading ${relativePath}`);
      const file = await fs.readFile(fullPath);
      await put(relativePath, file, {
        access: 'public',
        addRandomSuffix: false,
      });
      spinner.stop();
      logSuccess(`Uploaded ${chalk.bold(relativePath)} (new)`);
    }

    processedFiles.add(relativePath);
  }

  // Handle deletions
  const deletions = Array.from(existingBlobs.entries()).filter(
    ([remotePath]) => !processedFiles.has(remotePath)
  );

  if (deletions.length > 0) {
    console.log(chalk.bold('\n🧹 Cleaning up removed files...\n'));

    for (const [remotePath] of deletions) {
      spinner.start(chalk.dim(`Removing ${remotePath}`));
      await del(existingBlobs.get(remotePath)!);
      spinner.stop();
      logSuccess(`Removed ${chalk.bold(remotePath)}`);
    }
  }
}

// Update uploadAssets function with better logging
async function uploadAssets() {
  const mainSpinner = ora();

  try {
    console.log(chalk.bold('\n📦 Starting asset upload process...\n'));

    mainSpinner.start('Initializing gitignore rules');
    await initializeGitignore();
    mainSpinner.succeed('Gitignore rules loaded');

    mainSpinner.start('Fetching existing assets');
    const existingBlobs = await list();
    const existingUrlMap = new Map(
      existingBlobs.blobs
        .filter((blob) => !blob.pathname.includes('.DS_Store'))
        .map((blob) => [blob.pathname, blob.url])
    );
    mainSpinner.succeed(`Found ${existingBlobs.blobs.length} existing assets`);

    mainSpinner.start('Scanning local files');
    const localFiles = await getAllLocalFiles(PUBLIC_DIR);
    mainSpinner.succeed(`Found ${localFiles.length} local files`);

    await processFiles(localFiles, existingUrlMap);

    mainSpinner.start('Generating assets.ts');
    const finalBlobs = await list();
    const productionStructure = organizeByDirectory(finalBlobs.blobs, false);
    const localStructure = organizeByDirectory(finalBlobs.blobs, true);
    const tsCode = generateTypeScriptCode(productionStructure, localStructure);
    await fs.writeFile(ASSETS_FILE, tsCode);
    mainSpinner.succeed('Generated assets.ts');

    console.log(chalk.bold.green('\n✨ Asset upload complete!\n'));
  } catch (error) {
    mainSpinner.fail('Error during asset upload');
    logError(error instanceof Error ? error.message : 'Unknown error occurred');
    process.exit(1);
  }
}

// Run the upload
uploadAssets();
