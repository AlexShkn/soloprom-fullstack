// next.config.js
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
