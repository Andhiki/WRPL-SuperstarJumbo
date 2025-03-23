'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Container from '@/components/container'

interface WarehouseLocation {
  name: string
  coordinates: [number, number]
  phone: string
  workingDays: string
  workingHours: string
  desc: string
}

interface WarehouseMapProps {
  location: WarehouseLocation
}

const MapComponent = dynamic(() => import('@/modules/our-warehouse/map'), {
  ssr: false,
  loading: () => (
    <div className="aspect-[4/3] h-full w-auto border animate-pulse bg-gray-200 sm:aspect-video md:aspect-square lg:aspect-video" />
  ),
})

const OurWarehouse = ({ location }: WarehouseMapProps) => {
  return (
    <div className='relative'>
      <div className='relative h-[24rem] lg:h-[50vh] w-full'>
        <Image
          src={`/assets/home/get-more/bg.webp`}
          alt='Renjana Furniture'
          fill
          sizes='100%'
          priority
          className='z-0 object-cover'
        />
        <h1 className='px-4 sm:px-8 inset absolute z-20 text-center font-playfair text-3xl font-bold text-white right-0 left-0 mx-auto bottom-4 sm:bottom-8 md:bottom-12 md:text-[2.5rem]'>
          Our Official Renjana Warehouse
        </h1>
      </div>
      <div className='absolute top-0 h-[36rem] w-full bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(61,28,13,0.8)] to-[rgba(76,35,16,1)]'></div>
      <main className='bg-background relative z-40 lg:min-h-[50vh]'>
        <Container className='flex w-full flex-col-reverse gap-5 py-4 sm:py-8 md:flex-row md:py-12'>
          <div className='w-full'>
            <MapComponent location={location} />
          </div>
          <WarehouseInfo location={location} />
        </Container>
      </main>
    </div>
  )
}

const WarehouseInfo = ({ location }: WarehouseMapProps) => (
  <div className='w-full'>
    <h1 className='mb-2 text-center font-playfair text-2xl font-bold md:text-start'>
      {location.name}
    </h1>
    <p className='text-center text-sm md:text-start md:text-base'>
      {location.desc}
    </p>
    <div className='my-8 flex w-full items-start justify-center gap-16 md:my-16 md:mb-0 md:items-start md:justify-start lg:gap-36'>
      <div>
        <h3 className='mb-2 text-center font-playfair text-xl font-bold md:text-start'>
          Contact
        </h3>
        <p className='text-center text-sm md:text-start md:text-base'>
          {location.phone}
        </p>
      </div>
      <div>
        <h3 className='mb-2 text-center font-playfair text-xl font-bold md:text-start'>
          Working Hours
        </h3>
        <p className='mb-2 text-center text-sm md:text-start md:text-base'>
          {location.workingDays}
        </p>
        <p className='text-center text-sm font-bold md:text-start md:text-base'>
          {location.workingHours}
        </p>
      </div>
    </div>
  </div>
)

export default OurWarehouse