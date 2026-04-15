import fs from 'fs';
import path from 'path';

const filesToMigrate = [
    { src: 'public/xpander-sleman.html', dest: 'src/pages/xpander-sleman.astro', layoutPath: '../layouts/Layout.astro' },
    { src: 'public/pajero-sport-sleman.html', dest: 'src/pages/pajero-sport-sleman.astro', layoutPath: '../layouts/Layout.astro' },
    { src: 'public/xforce-jogja.html', dest: 'src/pages/xforce-jogja.astro', layoutPath: '../layouts/Layout.astro' },
    { src: 'public/dealer-mitsubishi-sleman.html', dest: 'src/pages/dealer-mitsubishi-sleman.astro', layoutPath: '../layouts/Layout.astro' },
    { src: 'public/blog/kredit-mitsubishi-sleman.html', dest: 'src/pages/blog/kredit-mitsubishi-sleman.astro', layoutPath: '../../layouts/Layout.astro' },
    { src: 'public/blog/perbandingan-xpander-vs-xforce.html', dest: 'src/pages/blog/perbandingan-xpander-vs-xforce.astro', layoutPath: '../../layouts/Layout.astro' }
];

console.log("Memulai proses migrasi total ke .astro...");

filesToMigrate.forEach(file => {
    if(!fs.existsSync(file.src)) {
        console.log(`[SKIP] File tidak ditemukan: ${file.src}`);
        return;
    }
    const html = fs.readFileSync(file.src, 'utf-8');
    
    // Extractor
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = html.match(/<meta name="description" content="([^"]+)">/i);
    const schemaMatch = html.match(/(<script type="application\/ld\+json">[\s\S]*?<\/script>)/i);
    
    // Memotong konten (Mulai dari Breadcrumb sampai sebelum Footer/Floating WA)
    const bodyStartMatch = html.match(/<div class="breadcrumb/i);
    const bodyEndMatch = html.match(/<a href="[^"]*wa\.me[^"]*"[^>]*whatsapp-float/i) || html.match(/<footer/i);
    
    if(!bodyStartMatch || !bodyEndMatch) {
         console.log(`[ERROR] Gagal mencari tag pembatas di ${file.src}`);
         return;
    }
    
    const bodyContent = html.substring(bodyStartMatch.index, bodyEndMatch.index);
    const title = titleMatch ? titleMatch[1].trim() : 'Mitsubishi Sleman';
    const description = descMatch ? descMatch[1].trim() : '';
    let schemaStr = schemaMatch ? schemaMatch[1] : '';

    // Memperbaiki link asset yang tadinya relative (images/...) menjadi absolute (/images/...)
    let fixedBody = bodyContent
        .replace(/src="(?!http|\/)(.*?)"/g, 'src="/$1"')
        .replace(/href="(?!http|#|\/)(.*?\.html)"/g, 'href="/$1"');

    // Khusus memotong link blog yang numpuk (href="blog/..." jadi href="/blog/...")
    fixedBody = fixedBody.replace(/href="blog\//g, 'href="/blog/');

    const astroContent = `---
import Layout from '${file.layoutPath}';
---

<Layout title="${title}" description="${description}">
${schemaStr ? `    <Fragment slot="head">\n        ${schemaStr}\n    </Fragment>\n` : ''}
${fixedBody}
</Layout>
`;

    // Pastikan folder dest ada
    const destDir = path.dirname(file.dest);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    fs.writeFileSync(file.dest, astroContent);
    console.log(`[SUKSES] 🔥 Berhasil migrasi: ${file.src} -> ${file.dest}`);
    
    // Mengubah ekstensi file asli agar netlify tidak bingung antara ada .html & .astro
    fs.renameSync(file.src, file.src + '.backup');
});

console.log("\n MIGRASI SELESAI!! Silakan klik sync_github.bat sekarang.");
