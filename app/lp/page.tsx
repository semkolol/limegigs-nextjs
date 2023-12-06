import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import Pricing from '@/components/Pricing';
import Button from '@/components/ui/Button/Button';
import Accordion from '@/components/ui/Accordion/Accordion';
import Example from '/public/alert.png';

async function getGigs() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession();


  if (session) {
    var { data } = await supabase
      .from('alerts')
      .select(`id, name, link, interval`)
      .eq('user_id', session.user.id) // change to all or filter
    return data
  }

}

export default async function HomePage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const gigs = await getGigs();


  return (
    <>
      <div className='flex flex-col p-5 lg:h-screen justify-center items-center text-center'>
        <div className='flex flex-col lg:flex-row items-center max-w-6xl'>
          <div className='flex flex-col items-center mt-10 lg:mt-0 lg:items-start lg:p-4'>
            <h1 className="text-4xl font-extrabold text-white text-center lg:text-left md:text-5xl">
              Freshly pressed gigs!
            </h1>
            <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 text-center lg:text-left sm:text-2xl">
              Find your next <b className='text-yellow-400 underline'>Dreamgig</b> or find your <b className='text-lime-400 underline'>Dream-Employee </b> directly to <b className='text-yellow-500 underline'>Email</b>.
            </p>
            <ul>
              <li className="flex mt-5 text-zinc-500 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-700">
                  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>
                <span>
                  Find the right candidate
                </span>
              </li>
              <li className="flex mt-5 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-700">
                  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>
                <span>
                  Connect directly with applicants
                </span>
              </li>
              <li className="flex mt-5 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-700">
                  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>
                <span>
                  Unique Landing Page with company brand
                </span>
              </li>
              <li className="flex mt-5 text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-700">
                  <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                </svg>
                <span>
                  Works for Startups or Big Corps
                </span>
              </li>
            </ul>
            <div className='py-10 flex space-x-2'>
              <Link href="/pricing" className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex px-10 rounded-lg leading-6 transition ease-in-out duration-150 shadow-sm font-bold text-center justify-center uppercase py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                Post Gig ➔
              </Link>
              <Button variant='slim' loading={false} >
                <span className='font-bold'>EXPLORE JOBS</span>
              </Button>
            </div>
          </div>
          <div className='py-10'></div>
          <figure className="relative z-[1] max-w-[45rem] h-auto rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_80%),_0_0_5rem_-2rem_rgb(45_55_75_/_50%)]">
            <div className="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex space-x-1 absolute top-2/4 left-4 -translate-y-1">
                <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
              </div>
              <div className="flex justify-center items-center w-full h-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-gray-700 dark:text-gray-200">www.limegigs.com</div>
            </div>

            <Image className="h-auto rounded-b-lg" src={Example} alt="Example" />
          </figure>
          {/* <Image src={Example} alt='example' className='p-4 lg:p-10' /> */}
        </div>
        {/* <LogoCloud /> */}
      </div>


      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <nav className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4" aria-label="Tabs" role="tablist">
          <button type="button" className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-neutral-800 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700 active" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
            <span className="flex justify-center">
              <svg className="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-yellow-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              </svg>

              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-white">Sign up & subscribe</span>
                <span className=" mt-2 text-gray-300">Create an account with the Email you want to receive alerts on</span>
              </span>
            </span>
          </button>

          <button type="button" className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-neutral-800 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700" id="tabs-with-card-item-2" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
            <span className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-yellow-400 ">
                <path fill-rule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clip-rule="evenodd" />
              </svg>

              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-white">Add Alerts & select Interval</span>
                <span className=" mt-2 text-gray-200">Add products, you want to receive alerts for and how often</span>
              </span>
            </span>
          </button>

          <button type="button" className="hs-tab-active:bg-gray-100 hs-tab-active:hover:border-transparent text-center md:text-left hover:bg-neutral-800 p-3 md:p-5 rounded-xl dark:hs-tab-active:bg-white/[.05] dark:hover:bg-gray-700" id="tabs-with-card-item-3" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab">
            <span className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hidden md:block flex-shrink-0 md:mt-2 h-6 w-6 hs-tab-active:text-blue-600 text-yellow-400 ">
                <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
              </svg>
              <span className="md:grow md:ml-5">
                <span className="hs-tab-active:text-blue-600 block font-semibold text-white">Ready to alert!</span>
                <span className=" mt-2 text-gray-200">You're all set up & ready to receive alerts via email as soon as the price/availability changes</span>
              </span>
            </span>
          </button>
        </nav>

        <div className='py-5'></div>


        <Accordion data={gigs} />

        <div className='py-5'></div>


        {gigs && gigs.length >= 1 ?
          <>
            {gigs.map((gig) => (
              <div key={gig.id} className='p-2 flex justify-between items-center rounded-lg bg-neutral-700'>
                <p className='text-white'>{gig.name}</p>
                <input className='hidden' name='alert-id' defaultValue={gig.id} />
                <div className='space-x-2'>
                  <button className='p-1 rounded-lg text-white bg-neutral-900'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>

                  <button className='p-1 rounded-lg text-white bg-red-700'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </>
          :
          <div className='flex space-x-2 items-center'>
            <p>No gigs found.</p>
          </div>}

        {/* <div className="mt-12 md:mt-16">
          <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
            <div className="max-w-[1140px] lg:pb-32 relative">
              {/* <figure className="hidden absolute bottom-0 left-0 z-[2] max-w-full w-60 h-auto mb-20 ml-20 lg:block">
                <div className="p-1.5 bg-gray-100 rounded-3xl shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)] dark:bg-gray-700 dark:shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(0_0_0_/_20%),_0_2rem_4rem_-2rem_rgb(0_0_0_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(0_0_0_/_20%)]">
                  <Image className="max-w-full h-auto rounded-[1.25rem]" src={Example} alt="Image Description" />
                </div>
              </figure> 

              <figure className="ml-auto relative z-[1] max-w-full w-[45rem] h-auto rounded-b-lg shadow-[0_2.75rem_3.5rem_-2rem_rgb(45_55_75_/_20%),_0_0_5rem_-2rem_rgb(45_55_75_/_15%)] dark:shadow-[0_2.75rem_3.5rem_-2rem_rgb(0_0_0_/_20%),_0_0_5rem_-2rem_rgb(0_0_0_/_15%)]">
                <div className="relative flex items-center max-w-[50rem] bg-white border-b border-gray-100 rounded-t-lg py-2 px-24 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex space-x-1 absolute top-2/4 left-4 -translate-y-1">
                    <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                    <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                    <span className="w-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></span>
                  </div>
                  <div className="flex justify-center items-center w-full h-full bg-gray-200 text-[.25rem] text-gray-800 rounded-sm sm:text-[.5rem] dark:bg-gray-700 dark:text-gray-200">www.limegigs.com</div>
                </div>

                <div className="bg-gray-800 rounded-b-lg">
                  <Image className="max-w-full h-auto rounded-b-lg" src={Example} alt="Image Description" />
                </div>
              </figure>
            </div>
          </div>
        </div> */}
      </div>

      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </>
  );
}

function LogoCloud() {
  return (
    <div>
      <p className="mt-24 text-xs uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
        Our Partners
      </p>
      <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
        <div className="flex items-center justify-start">
          <a href="https://nextjs.org" aria-label="Next.js Link">
            <Image
              src="/nextjs.svg"
              alt="Next.js Logo"
              className="h-12 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://vercel.com" aria-label="Vercel.com Link">
            <Image
              src="/vercel.svg"
              alt="Vercel.com Logo"
              className="h-6 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://stripe.com" aria-label="stripe.com Link">
            <Image
              src="/stripe.svg"
              alt="stripe.com Logo"
              className="h-12 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://supabase.io" aria-label="supabase.io Link">
            <Image
              src="/supabase.svg"
              alt="supabase.io Logo"
              className="h-10 text-white"
            />
          </a>
        </div>
        <div className="flex items-center justify-start">
          <a href="https://github.com" aria-label="github.com Link">
            <Image
              src="/github.svg"
              alt="github.com Logo"
              className="h-8 text-white"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
