import Form from 'next/form'
import { Input } from '../ui/input'
import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import CategoryFilter from './category-filter'
// import { updateSearchParams } from '@/lib/utils'
import AvailableFilter from './available-filter'
import { getFilterOptions } from '@/lib/fetch'

const Search = async (props: { query?: string; slug: string }) => {
  const FILTER_OPTIONS = await getFilterOptions(props.slug)

  return (
    <main className='flex flex-col items-baseline justify-between gap-4 sm:flex-row md:gap-8'>
      <Form action={``} replace className='relative w-full sm:max-w-80'>
        <Input
          type='text'
          name='q'
          autoComplete='off'
          placeholder='Search in The Collection'
          defaultValue={props.query}
          className='rounded-lg border-neutral-200 p-4 shadow-md'
        />
        <div className='absolute right-0 top-0 mr-3 flex h-full items-center bg-gradient-to-l from-white to-transparent'>
          <MagnifyingGlass className='h-4' />
        </div>
      </Form>

      <section className='flex w-full sm:w-auto items-center gap-4 '>
        <AvailableFilter />
        <CategoryFilter filterOptions={FILTER_OPTIONS} />
      </section>
    </main>
  )
}

export default Search
