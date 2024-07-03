import Image from 'next/image'
import imgImport from '../../../public/images/suffer.png'
import ButtonRedirectServer from '../../components/ButtonRedirectServer'
export default function demoImg() {
  return (
    <div>
      <ButtonRedirectServer />
      <div className=' w-[700px] h-[700px] bg-red-300'>
        <Image
          src='/images/suffer.png'
          alt='Picture of the author'
          width={500} // import trực tiếp phải provide width - height
          height={500}
          quality={100} // optional
          // className='h-[500px]' -> ko được, phải dùng props
        />
      </div>

      <hr />

      <div className=' w-[700px] h-[700px] bg-red-300'>
        {/* import thông qua import ko cần */}
        <Image src={imgImport} alt='Picture of the author' />
      </div>

      {/* Dùng thẻ img gốc sẽ bị eslint Next warning */}
      <hr />

      {/* <img src='/suffer.png' alt='Picture of the author' /> */}
    </div>
  )
}
