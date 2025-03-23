'use client'

import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Category } from '@/payload-types'
import { Button } from '../../components/ui/button'

const MaterialCard = (props: Category) => {
  // const imageUrl =
  //   (typeof props.image === 'object' &&
  //     props.image !== null &&
  //     props.image.url) ||
  //   '/placeholder.jpg'

    const imageUrl = `/assets/collections/${props.slug}.webp`;

  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault() // Prevent dialog from opening while starting drag
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y

      // Ensure the card stays within viewport bounds
      const maxX = window.innerWidth - 200 // approximate card width
      const maxY = window.innerHeight - 60 // approximate card height

      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY),
      })
    }
  }

  const handleMouseUp = () => {
    if (!isDragging) return
    setIsDragging(false)

    // If drag distance is minimal, treat it as a click and open dialog
    const dragDistance = Math.sqrt(
      Math.pow(position.x, 2) + Math.pow(position.y, 2)
    )
    if (dragDistance < 5) {
      ;(document.querySelector('[role="dialog"]') as HTMLElement)?.click()
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  })

  useEffect(() => {
    const adjustPosition = () => {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight

      // Default posisi di kanan bawah
      let newX = screenWidth - 400
      const newY = screenHeight - 80

      // Jika layar lebih kecil dari sm (640px), geser lebih ke kanan
      if (screenWidth < 640) {
        newX = screenWidth - 360
      }

      setPosition({ x: newX, y: newY })
    }

    adjustPosition()
    window.addEventListener('resize', adjustPosition)

    return () => window.removeEventListener('resize', adjustPosition)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        left: position.x ? `${position.x}px` : 'auto',
        top: position.y ? `${position.y}px` : 'auto',
        right: position.x ? 'auto' : '20px',
        bottom: position.y ? 'auto' : '20px',
        zIndex: 50,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
    >
      <Dialog>
        <Card
          className='group flex aspect-[380/60] w-[380px] scale-75 select-none items-center space-x-2 bg-white shadow-lg hover:bg-gray-50 sm:scale-100'
          onMouseDown={handleMouseDown}
        >
          <div className='relative aspect-[4/3] h-full w-auto'>
            <Image
              src={imageUrl}
              alt='Material Icon'
              className='h-full w-full rounded-l-xl object-cover'
              width={200}
              height={150}
              loading='eager'
            />
          </div>
          <div className='flex w-full items-center justify-between'>
            <p className='font-bold'>Kenali Material Renjana</p>
            <DialogTrigger asChild>
              <Button
                size={'sm'}
                className='ml-auto mr-4 justify-self-end font-normal'
              >
                Material
              </Button>
            </DialogTrigger>
          </div>
        </Card>
        <DialogContent className='group aspect-[702/307] scale-75 overflow-hidden rounded-lg border-none p-0 sm:max-w-lg sm:scale-100'>
          <div className='flex'>
            {/* Image Section */}
            <div className='relative h-full w-2/5 bg-neutral-400'>
              <Image
                src={imageUrl}
                alt=''
                className='h-full w-full rounded-l-lg object-cover'
                sizes='50%'
                fill
              />
            </div>

            {/* Content Section */}
            <div className='relative w-3/5 space-y-4 p-4'>
              <DialogHeader>
                <DialogTitle className='text-left'>
                  {props['material-name']}
                </DialogTitle>
                <p className='text-left text-xs text-[#666666]'>
                  {props.title} Material of Renjana Furniture
                </p>
                <hr className='w-full text-[#999999]' />
              </DialogHeader>
              <p className='text-xs'>{props['material-description']}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MaterialCard
