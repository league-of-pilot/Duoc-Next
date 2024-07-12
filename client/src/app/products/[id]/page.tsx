import { baseOpenGraph } from '@/app/shared-metadata'
import productApiRequest from '@/nextApp/apiRequest/product/product.api'
import envConfig from '@/nextApp/config'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import { cache } from 'react'

// https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#using-react-cache-server-only-and-the-preload-pattern
const getDetail = cache(productApiRequest.getDetail)

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { payload } = await getDetail(Number(params.id))
  const product = payload.data
  const url = envConfig.NEXT_PUBLIC_URL + '/products/' + product.id

  // openGraph là nested Obj ko được merge mà sẽ override cấp thấp hơn
  // Các key khác thiếu như canonical nhờ tool SEO check và tự search
  // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#opengraph

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...baseOpenGraph,
      title: product.name,
      description: product.description,
      url,
      images: [
        {
          url: product.image
        }
      ]
    },
    alternates: {
      canonical: url
    }
  }
}

export default async function ProductDetail({ params }: Props) {
  let product = null
  try {
    const { payload } = await getDetail(Number(params.id))
    product = payload.data
  } catch (error) {}

  return (
    <div>
      {!product && <div>Không tìm thấy sản phẩm</div>}
      {product && (
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={180}
            height={180}
            className='w-32 h-32 object-cover'
          />

          <h3>{product.name}</h3>
          <div>{product.price}</div>
        </div>
      )}
    </div>
  )
}
