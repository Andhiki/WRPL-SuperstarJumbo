import { LoaderCircle } from "lucide-react"

const LoadingScreen = () => {
  return (
    <main className='grid h-screen place-items-center gap-4'>
      <LoaderCircle className='h-20 w-20 animate-spin text-custom-brown' />
    </main>
  )
}

export default LoadingScreen
