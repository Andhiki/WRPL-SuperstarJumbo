'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// Define the structure of an image
type ImageType = {
  url: string
}

// Props for the ProductImageGallery component
type ProductImageGalleryProps = {
  images: ImageType[]
  selectedImageIndex: number
  className?: string
}

const ProductImageGallery = ({
  images,
  selectedImageIndex,
  className,
}: ProductImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(selectedImageIndex || 0)

  return (
    <>
      <DesktopGallery
        images={images}
        selectedImageIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        className={`${className}`}
      />
      <MobileGallery
        images={images}
        selectedImageIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        className={`${className}`}
      />
    </>
  )
}

// Props for the DesktopGallery component
type DesktopGalleryProps = {
  images: ImageType[]
  selectedImageIndex: number
  setActiveIndex: (index: number) => void
  className?: string
}

const DesktopGallery = ({
  images,
  selectedImageIndex,
  setActiveIndex,
  className,
}: DesktopGalleryProps) => {
  return (
    <main
      className={`relative z-40 hidden aspect-square items-end gap-4 bg-neutral-500 lg:flex lg:p-12 ${className}`}
    >
      <section className='relative flex w-auto overflow-hidden'>
        <div
          className='scrollbar-hide flex w-full cursor-grab flex-nowrap gap-4 overflow-x-auto active:cursor-grabbing'
          onMouseDown={(e) => {
            const ele = e.currentTarget
            const startX = e.pageX - ele.offsetLeft
            const scrollLeft = ele.scrollLeft

            const handleMouseMove = (e: MouseEvent) => {
              const x = e.pageX - ele.offsetLeft
              const walk = (x - startX) * 2
              ele.scrollLeft = scrollLeft - walk
            }

            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove)
              document.removeEventListener('mouseup', handleMouseUp)
            }

            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
          }}
        >
          {images?.map((image, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className='relative z-50 aspect-square h-auto w-20 shrink-0 cursor-pointer rounded-lg bg-neutral-400'
            >
              <Image
                src={image?.url || '/api/placeholder/100/100'}
                alt={`Product Image ${index + 1}`}
                fill
                sizes='100%'
                className='pointer-events-none rounded-lg border border-white object-cover'
              />
            </div>
          ))}
        </div>
        {/* Blur gradient overlay */}
        <div className='pointer-events-none absolute -right-6 top-0 z-[100] h-20 w-20 bg-gradient-to-r from-transparent from-20% via-black via-80% to-transparent'></div>
      </section>

      {/* Main image */}
      <Image
        src={images?.[selectedImageIndex]?.url || '/api/placeholder/400/400'}
        alt={`Product Image ${selectedImageIndex + 1}`}
        fill
        sizes='100%'
        className='pointer-events-none z-0 object-cover lg:max-w-[50vw]'
      />
    </main>
  )
}

// Props for the MobileGallery component
type MobileGalleryProps = {
  images: ImageType[]
  selectedImageIndex: number
  setActiveIndex: (index: number) => void
  className?: string
}

const MobileGallery = ({
  images,
  selectedImageIndex,
  setActiveIndex,
  className,
}: MobileGalleryProps) => {
  return (
    <div
      className={`relative z-[99] flex flex-col gap-4 lg:hidden ${className}`}
    >
      {/* Main image */}
      <div className='relative z-[100] h-[400px] w-full bg-neutral-400'>
        <Image
          src={images?.[selectedImageIndex]?.url || '/api/placeholder/400/400'}
          alt={`Product Image ${selectedImageIndex + 1}`}
          fill
          sizes='100%'
          className='z-0 object-cover'
        />
      </div>

      {/* Thumbnails */}
      <div className='md:scrollbar-hide relative z-[101] flex w-full flex-nowrap gap-4 overflow-x-auto px-4 sm:px-8'>
        {images?.map((image, index) => (
          <div
            key={index}
            className={`relative z-[102] aspect-square h-auto w-20 shrink-0 cursor-pointer rounded-lg border bg-neutral-500 ${
              index === selectedImageIndex ? 'border-white' : 'border-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Image
              src={image?.url || '/api/placeholder/100/100'}
              alt={`Product Image ${index + 1}`}
              fill
              sizes='100%'
              className='rounded-lg border border-white object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery
