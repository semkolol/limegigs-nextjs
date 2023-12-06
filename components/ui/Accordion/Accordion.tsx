"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Disclosure, Tab } from '@headlessui/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function Accordion({ data }: any) {
  return (

    <div className="mx-auto w-full max-w-6xl p-2">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 p-1">
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg p-2 text-sm font-medium leading-5 text-neutral-700 dark:text-white',
                selected
                  ? 'bg-white dark:bg-neutral-700 shadow'
                  : 'text-blue-100 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              )
            }
          >
            GIGS
          </Tab>
          <Tab
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg p-2 text-sm font-medium leading-5 text-neutral-700 dark:text-white',
                selected
                  ? 'bg-white dark:bg-neutral-700 shadow'
                  : 'text-blue-100 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              )
            }
          >
            PROFILES
          </Tab>
        </Tab.List>
        <Tab.Panels className="w-full py-10">
          <Tab.Panel className="space-y-2">
            {data.map((gig: any) => (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg  px-4 py-2 text-left text-sm font-medium text-neutral-950 dark:text-neutral-100 border dark:border-neutral-800 hover:border-yellow-500 hover:bg-zinc-100 dark:hover:bg-neutral-800">
                      <div className='flex items-center space-x-2'>

                        <Image src={`https://rckgfebgmiatwsmkwheb.supabase.co/storage/v1/object/public/company_logos/${gig.company_logo}`} alt={gig.company_name} width={60} height={60} />

                        <div className='flex flex-col'>
                          <Link href={`/gig/${gig.id}`}>
                            <span className='font-bold'>{gig.gig_title}</span>
                          </Link>
                          <span className='text-neutral-300'>{gig.company_name}</span>
                          <div className='flex flex-col md:flex-row space-x-2 space-y-2 md:space-y-0 items-start'>
                            <span>${gig.min_salary}-${gig.max_salary}</span>
                            <div className='flex flex-row space-x-2'>
                              <span className='px-2 rounded-lg bg-blue-200 dark:bg-blue-900 capitalize flex items-center space-x-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                  <path fill-rule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
                                </svg>

                                {gig.location}
                              </span>
                              <span className='px-2 rounded-lg bg-green-200 dark:bg-green-900 capitalize flex items-center space-x-1'>{gig.gig_type}</span>

                            </div>

                            <div className='flex flex-row space-x-2'>
                              <span className='px-2 rounded-lg bg-lime-200 dark:bg-lime-900 capitalize'>{gig.company_location}</span>
                              {gig.company_city &&
                                <span className='px-2 rounded-lg bg-lime-200 dark:bg-lime-900 capitalize'>{gig.company_city}</span>
                              }
                            </div>

                            <div>
                              <span className='px-2 rounded-lg bg-orange-200 dark:bg-orange-900 capitalize flex items-center space-x-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                  <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
                                </svg>
                                {gig.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-neutral-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col px-4 pt-4 pb-2 text-sm rounded-lg text-neutral-950 bg-zinc-100 dark:bg-neutral-900 dark:text-gray-300 items-center">
                      <div className='py-5 flex flex-col items-center space-x-2 space-y-5 justify-evenly'>
                        <div className='flex flex-col items-center'>
                          <Image src={`https://rckgfebgmiatwsmkwheb.supabase.co/storage/v1/object/public/company_logos/${gig.company_logo}`} alt={gig.company_name} width={70} height={70} />
                          <div className='flex flex-col'>
                            <span className='font-bold text-xl'>{gig.gig_title}</span>
                            <span className='dark:text-neutral-300 text-lg'>{gig.company_name}</span>
                            <div className='flex flex-col space-x-2 space-y-2 items-center'>
                              {gig.max_salary !== 'NaN' &&
                                <span className='font-bold text-lg'>${gig.min_salary}-${gig.max_salary}</span>
                              }
                              <div className='flex flex-row space-x-2'>
                                <span className='px-2 rounded-lg bg-blue-200 dark:bg-blue-900 capitalize flex items-center space-x-1'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clip-rule="evenodd" />
                                  </svg>
                                  {gig.location}
                                </span>
                                <span className='px-2 rounded-lg bg-lime-200 dark:bg-lime-900 capitalize'>{gig.company_location}</span>
                                {gig.company_city &&
                                  <span className='px-2 rounded-lg bg-lime-200 dark:bg-lime-900 capitalize'>{gig.company_city}</span>
                                }
                              </div>
                              <div>
                                <span className='px-2 rounded-lg bg-orange-200 dark:bg-orange-900 capitalize flex items-center space-x-1'>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                    <path fill-rule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" />
                                  </svg>
                                  {gig.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='flex space-x-2 items-center'>
                          <Link href={gig.link} target='_notarget' className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex px-4 rounded-lg leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                            Apply
                          </Link>
                          {gig.email &&
                            <Link href={`mailto:${gig.email}`} className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex px-4 rounded-lg leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                              Email
                            </Link>
                          }
                          <Link href={`/gig/${gig.id}`} className={'bg-lime-800 text-white cursor-pointer inline-flex px-4 rounded-lg leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize py-2 border border-transparent items-center hover:bg-lime-500 hover:text-black hover:border hover:border-white'}>
                            Learn more
                          </Link>
                        </div>
                      </div>

                      <div className='max-w-xl'>
                        <span className='py-5'>{gig.description}</span>

                        <h3 className='py-5 text-xl'>Key responsibilities</h3>
                        <span >{gig.responsibilities}</span>

                        <h3 className='py-5 text-xl'>Requirements</h3>
                        <span >{gig.requirements}</span>

                        <h3 className='py-5 text-xl'>Compensation and Benefits {gig.company_name}</h3>
                        <span >{gig.compensation}</span>

                        <h3 className='py-5 text-xl'>About {gig.company_name}</h3>
                        <span >{gig.about}</span>

                      </div>

                      <div className='py-10 space-x-2 flex items-center'>
                        {gig.github &&
                          <Link href={gig.github} className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex p-2 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" /></svg>
                          </Link>
                        }
                        {gig.twitter &&
                          <Link href={gig.twitter} className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex p-2 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z" /></svg>
                          </Link>
                        }
                        {gig.linkedin &&
                          <Link href={gig.linkedin} className={'bg-yellow-400 text-zinc-800 cursor-pointer inline-flex p-2 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center capitalize border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" /></svg>
                          </Link>
                        }
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>))}
          </Tab.Panel>
          <Tab.Panel className="space-y-2">
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

    </div>
  );
}
