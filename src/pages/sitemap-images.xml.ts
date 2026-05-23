import type { APIRoute } from 'astro';
import carsData from '../data/cars.json';

const escapeXml = (unsafe: string) => {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
};

export const GET: APIRoute = async () => {
    const siteUrl = 'https://mitsubishi-sleman.online';

    // Looping data product cars.json
    const urls = carsData.cars.map((car) => {
        const title = `Mitsubishi ${car.title} Sleman Yogyakarta`;
        return `
    <url>
        <loc>${siteUrl}/${car.slug === '#' ? '' : car.slug}</loc>
        <image:image>
            <image:loc>${siteUrl}${car.image}</image:loc>
            <image:title>${escapeXml(title)}</image:title>
            <image:caption>${escapeXml(car.description)}</image:caption>
        </image:image>
    </url>`;
    }).filter(str => str.includes('html')).join("");

    // Struktur XML Sitemap Image
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <!-- Homepage Images -->
    <url>
        <loc>${siteUrl}/</loc>
        <image:image>
            <image:loc>${siteUrl}/images/hero-bg.webp</image:loc>
            <image:title>Promo Mitsubishi Jogja &amp; Sleman 2026</image:title>
        </image:image>
        <image:image>
            <image:loc>${siteUrl}/images/sun-sleman.webp</image:loc>
            <image:title>Dealer Resmi Mitsubishi Sun Star Motor Sleman</image:title>
        </image:image>
    </url>
    <!-- Product Pages Images -->${urls}
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
};
