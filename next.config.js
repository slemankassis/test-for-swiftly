/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  style: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"avatars.githubusercontent.com',
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
