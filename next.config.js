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
} 
  
  module.exports = nextConfig
  