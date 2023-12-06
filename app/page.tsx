import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createServerSupabaseClient } from '@/app/supabase-server';

import Accordion from '@/components/ui/Accordion/Accordion';
import Search from '@/components/ui/Search/Search';
import Filter from '@/components/ui/Filter/Filter';

import { Poppins } from 'next/font/google'

const inter = Poppins({ subsets: ['latin'], weight: '400' })

type Props = {
  params?: {
    num?: string;
  };
  searchParams?: {
    q?: string;
  };
};

async function getGigs(gig: string) {
  const supabase = createServerComponentClient({ cookies })

  if (gig == undefined) {
    gig = '';
  }

  var { data } = await supabase
    .from('gigs')
    .select()
    .eq('isPublished', true)
    .ilike('gig_title', `%${gig}%`)
  return data
}

export default async function HomePage(props: Props) {
  const gigs = await getGigs(props.searchParams?.q as string);

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <>
      <div className='flex flex-col p-5 justify-center items-center text-center'>
        <div className='flex flex-col  items-center max-w-6xl'>

          <div className='py-10 lg:py-0'></div>

          <div className='flex flex-col items-center lg:items-start lg:p-4'>
            <h1 className="text-4xl font-semibold text-black dark:text-white text-center lg:text-left md:text-5xl">
              <span className={inter.className}>Freshly pressed <b className='text-yellow-400 underline'>Gigs</b>!</span>
            </h1>

            <div className='py-5'></div>

            {/* <p className="max-w-2xl m-auto text-xl text-zinc-200 text-center lg:text-left sm:text-2xl">
              Find your next <b className='text-yellow-400 underline'>Dreamgig</b> or find your <b className='text-lime-400 underline'>Dream-Employee </b> directly to <b className='text-yellow-500 underline'>Email</b>.
            </p> */}
          </div>

          <div className='py-10'></div>

          {!user && (
            <div className='space-x-4'>
              <Link href="/signin" className={'bg-yellow-400 text-zinc-800 text-xs cursor-pointer inline-flex px-4 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                Post Gig ➔
              </Link>
              <Link href="/signin" className={'bg-yellow-400 text-zinc-800 text-xs cursor-pointer inline-flex px-4 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                Create Profile ➔
              </Link>
            </div>
          )}
          {user && (
            <Link href="/account" className="bg-yellow-400 text-zinc-800 text-xs cursor-pointer inline-flex px-4 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white">
              Dashboard
            </Link>
          )}

          <Search />

          {/* <Filter /> */}
        </div>
        {/* <LogoCloud /> */}
      </div>


      <div className="max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">


        {gigs && gigs.length > 0 ?
          <Accordion data={gigs} />
          :
          <p>No gigs found</p>
        }

        <div className='py-5'></div>

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
