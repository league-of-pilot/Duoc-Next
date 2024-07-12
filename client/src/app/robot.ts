import envConfig from '@/nextApp/config'
import { MetadataRoute } from 'next'

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
// Edit file robot khiến VScode bị hang
// Save rất lâu
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/me/'
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`
  }
}
