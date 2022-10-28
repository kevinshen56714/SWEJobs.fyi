/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // sometime some pages take longer than 60s to generate
  // staticPageGenerationTimeout: 180,
}

module.exports = nextConfig
