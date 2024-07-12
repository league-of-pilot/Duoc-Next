/** @type {import('next').NextConfig} */

// https://nextjs.org/docs/pages/building-your-application/optimizing/images#remote-images
// https://nextjs.org/docs/app/building-your-application/optimizing/images
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/components/image#remotepatterns
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000'
        // pathname: '/photos/**'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

export default nextConfig
