'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { createUrl } from '@/utils/helpers';

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;

    const newParams = new URLSearchParams(searchParams.toString())

    if (search.value) {
      newParams.set('q', search.value)
    } else {
      newParams.delete('q')
    }

    router.push(createUrl('/', newParams))
  }

  return (
    <>
      {/* <form onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name='search'
          placeholder='Search for gigs...'
          defaultValue={searchParams.get('q') || ''}
          className='py-2 px-4 rounded-l-lg border text-neutral-900' />
        <button className='p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-r-lg leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </form> */}
      <div className='py-10'></div>
      <form onSubmit={onSearch} className=" w-max-[550px] relative w-full lg:w-80 xl:w-full">
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          placeholder="Search for gigs..."
          autoComplete="off"
          defaultValue={searchParams?.get('q') || ''}
          className=" w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
          <button className='absolute right-0 top-0 mr-3 flex h-full items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-black dark:text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
