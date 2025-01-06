const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

module.exports = withMDX({
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
})

const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.yandex.net',
      },
    ],
  },
}

export default nextConfig
