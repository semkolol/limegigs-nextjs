'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { createUrl } from '@/utils/helpers';

export default function Filter() {
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

    <div className='flex flex-row space-x-4 overflow-x-auto overflow-y-hidden whitespace-nowrap'>
      <form id='1' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={''}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400" />

        <button className={searchParams?.get('q') == undefined
          ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
          : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          ALL
        </button>
      </form>

      <form id='2' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={'game'}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <button
          className={searchParams?.get('q') === 'game'
            ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
            : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
          </svg>

          Game Development
        </button>
      </form>

      <form id='3' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={'software engineer'}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <button
          className={searchParams?.get('q') === 'software engineer'
            ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
            : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
          </svg>
          Software Engineer
        </button>
      </form>

      <form id='4' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={'customer support'}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <button
          className={searchParams?.get('q') === 'customer support'
            ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
            : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          Customer Support
        </button>
      </form>

      <form id='5' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={'sales'}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <button
          className={searchParams?.get('q') === 'sales'
            ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
            : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>

          Sales
        </button>
      </form>

      <form id='5' onSubmit={onSearch} className='flex items-center pt-10'>
        <input
          key={searchParams?.get('q')}
          type="text"
          name="search"
          defaultValue={'finance'}
          className="hidden w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
        />
        <button
          className={searchParams?.get('q') === 'finance'
            ? `p-2 bg-yellow-400 text-zinc-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white`
            : `p-2 text-black-800 cursor-pointer inline-flex rounded-full leading-6 transition ease-in-out duration-150 shadow-sm text-center justify-center border border-neutral-900 items-center hover:bg-yellow-400 `}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>


          Finance
        </button>
      </form>

      <div className='py-10'></div>
    </div>
  );
}
