const fs = require("fs");
const { images } = require("../components/common/CommonArray/FileArray");

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
${images?.map(
  (path) => `<url>
    <loc>https://convertor.tools${path.navigate}</loc>
    <changefreq>daily</changefreq>
    <lastmod>${new Date()}</lastmod>
    <priority>0.7</priority>
</url>`
)}
</urlset>`;

fs.writeFileSync("out/sitemap.xml", sitemapXml);
