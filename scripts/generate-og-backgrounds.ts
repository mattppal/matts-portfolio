import fs from 'fs/promises';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'public', '.og-backgrounds');

async function generateBackgrounds() {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generate backgrounds for indices 0-19
    for (let i = 0; i < 20; i++) {
      console.log(`Generating background ${i}...`);

      // Call the OG API endpoint with the bg parameter
      const response = await fetch(`http://localhost:3000/api/og?bg=${i}`, {
        headers: {
          // Some Next.js middleware might require this
          'User-Agent': 'node-fetch',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to generate background ${i}: ${response.statusText}`);
      }

      const buffer = await response.arrayBuffer();
      await fs.writeFile(path.join(OUTPUT_DIR, `bg-${i}.png`), Buffer.from(buffer));

      console.log(`Generated background ${i}`);
    }

    // Create .gitignore in the output directory
    await fs.writeFile(path.join(OUTPUT_DIR, '.gitignore'), '*\n!.gitignore\n');

    console.log('All backgrounds generated successfully!');
  } catch (error) {
    console.error('Error generating backgrounds:', error);
    process.exit(1);
  }
}

// Make sure the development server is running before executing this script
console.log('Make sure your Next.js development server is running on http://localhost:3000');
console.log('Starting background generation...');
generateBackgrounds();
