/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // www.halladayplumbing.com and halladayplumbing.com are both live on
  // Vercel (see DNS setup); redirect www -> apex here in code so there's
  // one canonical URL for SEO, without depending on a dashboard-only
  // domain redirect setting.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.halladayplumbing.com" }],
        destination: "https://halladayplumbing.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
