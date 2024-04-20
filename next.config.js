/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  style: {
    postcss: {
      plugins: {
        autoprefixer: {},
      },
    },
  },
};

module.exports = nextConfig;
