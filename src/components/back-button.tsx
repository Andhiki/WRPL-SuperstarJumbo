'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

const BackButton = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button
      className='absolute left-2 top-5 z-[100] underline-offset-8 hover:underline lg:left-8 lg:top-8'
      variant={'back'}
      onClick={handleBack}
    >
      <ArrowLeft className='scale-125' />
      Back
    </Button>
  )
}

export default BackButton
