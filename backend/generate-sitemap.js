
import { SitemapStream, streamToPromise } from 'sitemap';
import { promises as fs } from 'fs';
import path from 'path';
import { dirname } from 'path';
import { Readable } from 'stream';
import { fileURLToPath } from 'url';


// Manually define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const pages = [
  { url: '/', changefreq: 'monthly', priority: 1.0 } // one page 
];


async function generateSitemap() {
  //const hostname = process.env.HOSTNAME || 'https://yourdomain.com'; // Use env variable for hostname
  const hostname = "http://localhost:3000" // frontend, not always 3000 ..?
  const stream = new SitemapStream({ hostname });

  const sitemap = await streamToPromise(Readable.from(pages).pipe(stream));
  const sitemapPath = path.resolve(__dirname, '../frontend/public/sitemap.xml'); // __dirname gets the absolute path of this folder (/backend), then we exit the folder with .. and go into /folder/public/sitemap
  await fs.writeFile(sitemapPath, sitemap.toString(), 'utf-8');

  console.log("Sitemap generated and saved to", sitemapPath);
}

generateSitemap();

// Create sitemap once manually:
//      open terminal and cd into backend folder
//      node generate-sitemap.js

// Could call this script in server.js if we want to run it dynamically!!!!11111