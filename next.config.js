/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 180,
}

module.exports = nextConfig
