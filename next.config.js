const { redirect } = require('next/dist/server/api-utils')

/** 
 * @type {import('next').NextConfig} 
 * */
 const nextConfig = {
    reactStrictMode: true,   
    images: {
      minimumCacheTTL: 900,
      domains: [
        'res.cloudinary.com'
      ],
    },
    async rewrites() {
      return [
        {
          source: "/download/:path*",
          destination: "/api/download/:path*"
        },
        {
          source: "/cdn/v1/:transformations/:slug*",
          destination: "https://res.cloudinary.com/mahitm-cdn/image/upload/:transformations/mahitm/:slug*",
          has: [{ type: "query", key: "transform", value: "true" }]
        },
        {
          source: "/cdn/v1/:slug*",
          destination: "https://res.cloudinary.com/mahitm-cdn/image/upload/mahitm/:slug*",
        }
      ]
    }
} 
  
  module.exports = nextConfig
  