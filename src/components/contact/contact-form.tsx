'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters long',
    })
    .max(50, {
      message: 'Name must be at most 50 characters long',
    }),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z
    .string()
    .regex(/^(?:08\d{8,13}|\+\d{9,14})$/, {
      message:
        "Invalid phone number. Local numbers must start with '08', while international numbers must start with '+'.",
    })
    .optional(),
  message: z.string().min(10),
})

const ContactForm = () => {
  const [pending, setPending] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  const submitEmail = async (data: z.infer<typeof formSchema>) => {
    try {
      setPending(true)

      const [emailRes, sheetRes] = await Promise.all([
        fetch('/api/email', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
        fetch('/api/submit-form', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      ])

      if (!emailRes.ok || !sheetRes.ok) {
        throw new Error('Failed to send email or save data')
      }

      form.reset()
      toast({ description: 'Your message has been sent and saved!' })
    } catch (error) {
      console.error('Error:', error)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Please try again later.',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitEmail)}
        className='flex w-full flex-col gap-4 sm:gap-6'
      >
        <section className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name/Surname</FormLabel>
                <FormControl>
                  <Input placeholder='Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder='Company / Org Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='your.email@gmail.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder='e.g., 08123456789 or +441234567890'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </section>

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder='Message...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          disabled={pending}
          className='ml-auto w-fit font-normal'
        >
          {pending ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Form>
  )
}

export default ContactForm
