export default function robots() {
  const base = process.env.SITE_URL || "https://www.examscalendar.com";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin"] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
