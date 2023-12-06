import { ReactNode } from 'react';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// import { } from './actions'

import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types_db';
import { randomUUID } from 'crypto';

import ManageSubscriptionButton from './ManageSubscriptionButton';
import Button from '@/components/ui/Button';
import Pricing from '@/components/Pricing';


async function getUserGigs() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession();


  if (session) {
    var { data } = await supabase
      .from('gigs')
      .select()
      .eq('user_id', session.user.id)
    return data
  }

}

export default async function Account() {
  const [session, userDetails, products, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getActiveProductsWithPrices(),
    getSubscription()
  ]);

  const gigs = await getUserGigs();
  const user = session?.user;

  if (!session) {
    return redirect('/signin');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);


  const publishGig = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const id = formData.get('gig-id') as string;


    if (session) {
      let { data, error: userError } = await supabase
        .from('users')
        .select('credits')
        .eq('id', session.user.id)
        .single()

      // check if credits is not null
      if (data) {
        if (data.credits > 0) {
          // set published status to true if credits are available
          const updatePublishStatus = {
            isPublished: true,
          };

          const { error } = await supabase
            .from('gigs')
            .update(updatePublishStatus)
            .eq('id', id)

          if (error) {
            console.log(error)
          }

          // decrement credits -1
          const updateCredits = {
            credits: data.credits -= 1,
          };


          const { error: userErrorTwo } = await supabase
            .from('users')
            .update(updateCredits)
            .eq('id', session.user.id)

          if (userErrorTwo) {
            console.log(userErrorTwo)
          }
        }
      }
    }

    revalidatePath('/account');
  }

  const addGig = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const gig_title = formData.get('gig_title') as string;
    const description = formData.get('description') as string;
    const responsibilities = formData.get('responsibilities') as string;
    const requirements = formData.get('requirements') as string;
    const about = formData.get('about') as string;
    const gig_type = formData.get('gig_type') as string;
    const compensation = formData.get('compensation') as string;
    const min_salary = formData.get('min_salary') as string;
    const max_salary = formData.get('max_salary') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const link = formData.get('link') as string;
    const email = formData.get('email') as string;
    const company_name = formData.get('company_name') as string;
    const company_size = formData.get('company_size') as string;
    const company_location = formData.get('company_location') as string;
    const company_city = formData.get('company_city') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    const linkedin = formData.get('linkedin') as string;
    const company_logo: any = formData.get('company_logo');

    if (session) {

      const { data, error: uploadError } = await supabase
        .storage
        .from('company_logos')
        .upload(`public/${company_name + randomUUID() + company_logo.name}`, company_logo, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        // return something
      }

      const newGig = {
        id: randomUUID(),
        user_id: session.user.id,
        gig_title: gig_title,
        description: description,
        responsibilities: responsibilities,
        requirements: requirements,
        about: about,
        gig_type: gig_type,
        compensation: compensation,
        min_salary: min_salary,
        max_salary: max_salary,
        location: location,
        category: category,
        tags: tags,
        link: link,
        email: email,
        company_name: company_name,
        company_size: company_size,
        company_location: company_location,
        company_city: company_city,
        company_logo: data?.path as string,
        twitter: twitter,
        github: github,
        linkedin: linkedin,
        isPublished: false,
      };

      const { error } = await supabase
        .from('gigs')
        .insert(newGig)
        .eq('user_id', session.user.id)

      if (error) {
        // console.log(error)
      }
    }

    revalidatePath('/account');

  }

  const updateGig = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const id = formData.get('gig-id') as string;
    const gig_title = formData.get('gig_title') as string;
    const description = formData.get('description') as string;
    const responsibilities = formData.get('responsibilities') as string;
    const requirements = formData.get('requirements') as string;
    const about = formData.get('about') as string;
    const gig_type = formData.get('gig_type') as string;
    const compensation = formData.get('compensation') as string;
    const min_salary = formData.get('min_salary') as string;
    const max_salary = formData.get('max_salary') as string;
    const location = formData.get('location') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const link = formData.get('link') as string;
    const email = formData.get('email') as string;
    const company_name = formData.get('company_name') as string;
    const company_size = formData.get('company_size') as string;
    const company_location = formData.get('company_location') as string;
    const company_city = formData.get('company_city') as string;
    const twitter = formData.get('twitter') as string;
    const github = formData.get('github') as string;
    const linkedin = formData.get('linkedin') as string;
    const company_logo: any = formData.get('company_logo');

    const { data, error: uploadError } = await supabase
      .storage
      .from('company_logos')
      .upload(`public/${company_name + randomUUID() + company_logo.name}`, company_logo, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      // return something
    }

    if (session) {

      const updatedGig = {
        gig_title: gig_title,
        description: description,
        responsibilities: responsibilities,
        requirements: requirements,
        about: about,
        gig_type: gig_type,
        compensation: compensation,
        min_salary: min_salary,
        max_salary: max_salary,
        location: location,
        category: category,
        tags: tags,
        link: link,
        email: email,
        company_name: company_name,
        company_size: company_size,
        company_location: company_location,
        company_city: company_city,
        company_logo: data?.path as string,
        twitter: twitter,
        github: github,
        linkedin: linkedin,
      };

      const { error } = await supabase
        .from('gigs')
        .update(updatedGig)
        .eq('id', id)

      if (error) {
        // handle error
      }
    }

  }

  const deleteGig = async (formData: FormData) => {
    'use server';

    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();
    const id = formData.get('gig-id') as string;

    if (session) {
      // delete gig
      const { error } = await supabase
        .from('gigs')
        .delete()
        .eq('id', id)

      if (error) {
        // handle error
      }
    }
    revalidatePath('/account');
  }

  const updateName = async (formData: FormData) => {
    'use server';

    const newName = formData.get('name') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const session = await getSession();

    if (session) {
      const { error } = await supabase
        .from('users')
        .update({ full_name: newName })
        .eq('id', session.user?.id);
      if (error) {
        console.log(error);
      }
    }

    revalidatePath('/account');
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    const newEmail = formData.get('email') as string;
    const supabase = createServerActionClient<Database>({ cookies });
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  return (
    <section className="flex flex-col justify-center items-center pb-32 dark:bg-black">
      <div className="max-w-6xl px-2 py-8 mx-auto sm:px-2 sm:pt-24 lg:px-2">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-center sm:text-6xl">
            Dashboard
          </h1>
        </div>
      </div>

      <div className="p-2 space-y-5 ">
        <div className='flex items-start '>
          <Card
            title={"Create a Gig"}
            description={`Credits: ${userDetails?.credits}`}
            footer={
              gigs && gigs.length >= 1 ?
                <div className='space-y-2 '>
                  <p className='py-2 font-semibold '>Your gigs</p>
                  <p>Credits: {userDetails?.credits ?? ''}</p>
                  {gigs.map((gig) => (
                    <div key={gig.id} className='p-2 flex justify-between items-center rounded-lg bg-zinc-300 dark:bg-neutral-950'>
                      <p>{gig.gig_title}</p>
                      <div className='flex items-center space-x-2'>

                        {gig.isPublished == false ?
                          <form id={`publishGig${gig.id}`} action={publishGig}>
                            <input className='hidden' name='gig-id' defaultValue={gig.id} />
                            <button type='submit' form='publishGig' className='flex items-center p-1 space-x-1 rounded-lg bg-zinc-100 dark:bg-neutral-700 hover:bg-neutral-600'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className='text-xs'>Publish</span>
                            </button>
                          </form>
                          :
                          <div className='flex items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                              <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clip-rule="evenodd" />
                            </svg>
                            <span className='text-xs'>Published</span>
                          </div>
                        }

                        <form id='updateGig' action={updateGig}>
                          <button className='p-1 rounded-lg text-black dark:text-white bg-neutral-400 hover:bg-neutral-500 dark:bg-neutral-700 dark:hover:bg-neutral-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                          </button>
                        </form>

                        <form id={`deleteGig${gig.id}`} action={deleteGig}>
                          <input type='hidden' name='gig-id' value={gig.id} />
                          <button type='submit' form={`deleteGig${gig.id}`} className='p-1 rounded-lg text-black dark:text-white bg-red-500 hover:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </div>
                  ))}
                </div>
                :
                <div className='flex space-x-2 items-center'>
                  <p>Credits: {userDetails?.credits ?? ''}</p>
                  <p>No gigs found.</p>
                </div>
            }
          >
            <div className='flex md:hidden'>
              <Pricing
                session={session}
                user={session?.user}
                products={products}
                subscription={subscription}
              />
            </div>

            <div className="flex flex-col py-4 text-md font-semibold">
              {
                <>
                  <form id="addGigForm" action={addGig}>
                    <label>Gig Title</label>
                    <input
                      name='gig_title'
                      type="text"
                      placeholder="Nextjs Frontend Senior Developer"
                      required
                      maxLength={80}
                      className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                    />

                    <div className='flex flex-col py-2'>
                      <label>Role Description</label>
                      <textarea
                        name='description'
                        placeholder="Describe the gig here..."
                        required
                        maxLength={1500}
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Role Key Responsibilities</label>
                      <textarea
                        name='responsibilities'
                        placeholder="Describe gig responsibilities here..."
                        required
                        maxLength={1500}
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Requirements / Nice to Have</label>
                      <textarea
                        name='requirements'
                        placeholder="Describe gig requirements here..."
                        required
                        maxLength={1500}
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>About your company</label>
                      <textarea
                        name='about'
                        placeholder="Describe your company..."
                        required
                        maxLength={1500}
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Gig Type</label>
                      <select name="gig_type" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="full time">Full Time</option>
                        <option value="part time">Part Time</option>
                        <option value="contract">Contract</option>
                        <option value="freelance">Freelance</option>
                        <option value="internship">Internship</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Pay and Benefits</label>
                      <textarea
                        name='compensation'
                        placeholder="Describe compensation here..."
                        required
                        maxLength={1000}
                        className="w-full p-3 rounded-md dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <label>Salary range (USD)</label>
                    <div className='flex flex-row space-x-2 py-2'>
                      <select name="min_salary" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="30000">30000</option>
                        <option value="40000">40000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="70000">70000</option>
                        <option value="80000">80000</option>
                        <option value="90000">90000</option>
                        <option value="100000">100000</option>
                        <option value="110000">110000</option>
                        <option value="120000">120000</option>
                        <option value="130000">130000</option>
                        <option value="140000">140000</option>
                        <option value="150000">150000</option>
                        <option value="160000">160000</option>
                        <option value="170000">170000</option>
                        <option value="180000">180000</option>
                        <option value="190000">190000</option>
                        <option value="200000">200000</option>
                        <option value="NaN">NaN</option>
                      </select>
                      <select name="max_salary" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="10000">10000</option>
                        <option value="20000">20000</option>
                        <option value="30000">30000</option>
                        <option value="40000">40000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="50000">50000</option>
                        <option value="60000">60000</option>
                        <option value="70000">70000</option>
                        <option value="80000">80000</option>
                        <option value="90000">90000</option>
                        <option value="100000">100000</option>
                        <option value="110000">110000</option>
                        <option value="120000">120000</option>
                        <option value="130000">130000</option>
                        <option value="140000">140000</option>
                        <option value="150000">150000</option>
                        <option value="160000">160000</option>
                        <option value="170000">170000</option>
                        <option value="180000">180000</option>
                        <option value="190000">190000</option>
                        <option value="200000+">200000+</option>
                        <option value="NaN">NaN</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Location</label>
                      <select name="location" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="office">Office</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Category</label>
                      <select name="category" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="accounting">Accounting</option>
                        <option value="architecture">Architecture</option>
                        <option value="consulting">Consulting</option>
                        <option value="customer support">Customer Support</option>
                        <option value="defense">Defense</option>
                        <option value="education">Education</option>
                        <option value="electrician">Electrician</option>
                        <option value="engineering">Engineering</option>
                        <option value="finance">Finance</option>
                        <option value="game development">Game Development</option>
                        <option value="government">Government</option>
                        <option value="graphic design">Graphic Desgin</option>
                        <option value="hardware">Hardware</option>
                        <option value="health">Health</option>
                        <option value="human resources">Human Resources</option>
                        <option value="law">Law</option>
                        <option value="marketing">Marketing</option>
                        <option value="math">Math</option>
                        <option value="medicine">Medicine</option>
                        <option value="pharma">Pharma</option>
                        <option value="physics">Physics</option>
                        <option value="product manager">Product Manager</option>
                        <option value="robotics">Robotics</option>
                        <option value="sales">Sales</option>
                        <option value="science">Science</option>
                        <option value="software engineer">Software Engineer</option>
                        <option value="UI/UX design">UI/UX Desgin</option>
                        <option value="video editor">Video Editor</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Tags (seperated by comma)</label>
                      <input
                        name='tags'
                        type="text"
                        placeholder="nextjs,react,tailwind,javascript"
                        required
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Link to your Job-Page</label>
                      <input
                        name='link'
                        type="text"
                        placeholder="https://www.amazon.jobs/"
                        required
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Email, for applicants to reach out (optional)</label>
                      <input
                        name='email'
                        type="email"
                        placeholder="gigs@acme.com"
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <label className='text-xl pt-5'>Branding</label>
                    <div className='flex flex-col py-2'>
                      <label>Company name</label>
                      <input
                        name='company_name'
                        type="text"
                        placeholder="Acme LLC"
                        required
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Company size (Employees)</label>
                      <select name="company_size" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="1-10">1-10</option>
                        <option value="10-50">10-50</option>
                        <option value="50-100">50-100</option>
                        <option value="100+">100+</option>
                        <option value="500+">500+</option>
                        <option value="1000+">1000+</option>
                        <option value="5000+">5000+</option>
                        <option value="1000+">10000+</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Gig location (Country)</label>
                      <select name="company_location" required className='w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950'>
                        <option value="🌍 worldwide">Worldwide</option>
                        <option value="🇦🇷 argentina">Argentina</option>
                        <option value="🇦🇹 austria">Austria</option>
                        <option value="🇦🇺 australia">Australia</option>
                        <option value="🇧🇪 belgium">Belgium</option>
                        <option value="🇧🇷 brazil">Brazil</option>
                        <option value="🇧🇬 bulgaria">Bulgaria</option>
                        <option value="🇨🇦 canada">Canada</option>
                        <option value="🇨🇿 chech rep.">Chech Rep.</option>
                        <option value="🇨🇳 china">China</option>
                        <option value="🇭🇷 croatia">Croatia</option>
                        <option value="🇩🇰 denmark">Denmark</option>
                        <option value="🇫🇮 finland">Finland</option>
                        <option value="🇫🇷 france">France</option>
                        <option value="🇩🇪 germany">Germany</option>
                        <option value="🇬🇹 guatemala">Guatemala</option>
                        <option value="🇭🇰 hong kong">Hong Kong</option>
                        <option value="🇭🇺 hungary">Hungary</option>
                        <option value="🇮🇳 india">India</option>
                        <option value="🇮🇪 ireland">Ireland</option>
                        <option value="🇮🇱 israel">Israel</option>
                        <option value="🇯🇵 japan">Japan</option>
                        <option value="🇰🇷 korea south">Korea South</option>
                        <option value="🇳🇱 netherlands">Netherlands</option>
                        <option value="🇳🇴 norway">Norway</option>
                        <option value="🇵🇱 polska">Polska</option>
                        <option value="🇵🇹 portugal">Portugal</option>
                        <option value="🇷🇺 russia">Russia</option>
                        <option value="🇸🇦 saudi arabia">Saudi Arabia</option>
                        <option value="🇷🇸 serbia">Serbia</option>
                        <option value="🇸🇬 singapore">Singapore</option>
                        <option value="🇸🇮 slovenia">Slovenia</option>
                        <option value="🇸🇰 slovakia">Slovakia</option>
                        <option value="🇸🇪 sweden">Sweden</option>
                        <option value="🇪🇸 spain">Spain</option>
                        <option value="🇹🇼 taiwan">Taiwan</option>
                        <option value="🇦🇪 UAE">UAE</option>
                        <option value="🇺🇦 ukraine">Ukraine</option>
                        <option value="🇬🇧 UK">UK</option>
                        <option value="🇺🇸 USA">USA</option>
                      </select>
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Gig location (City, State)</label>
                      <input
                        name='company_city'
                        type="text"
                        placeholder="San Francisco, California"
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <div className='flex flex-col py-2'>
                      <label>Company logo (No Black Logos)</label>
                      <input
                        name='company_logo'
                        accept="image/*"
                        type="file"
                        required
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>

                    <label className='text-xl pt-5'>Other (optional)</label>
                    <div className='space-y-2'>
                      <label>Twitter</label>

                      <input
                        name='twitter'
                        type="text"
                        placeholder="https://twitter.com/limegigs"
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />

                      <label>Github</label>
                      <input
                        name='github'
                        type="text"
                        placeholder="https://github.com/limegigs"
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />

                      <label>Linkedin</label>
                      <input
                        name='linkedin'
                        type="text"
                        placeholder="https://linkedin.com/limegigs"
                        className="w-full p-3 rounded-md text-zinc-950 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                      />
                    </div>
                  </form>

                  <Button
                    variant='slim'
                    type="submit"
                    form="addGigForm"
                    className='mt-2'>
                    <span>
                      CREATE NEW GIG
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                  </Button>
                </>
              }
            </div>
          </Card>
          <div className='hidden md:flex flex-col'>
            <div className='p-2'>
              <h3 className='text-lg font-semibold'>How it works</h3>
              <p className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                Create a Gig
              </p>
              <p className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                Buy Credits
              </p>
              <p className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                Use Credits to publish Gig
              </p>
            </div>
            <Pricing
              session={session}
              user={session?.user}
              products={products}
              subscription={subscription}
            />
          </div>
        </div>

        <Card
          title="Manage your Purchases and Invoices"
          // description={
          //   subscription
          //     ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
          //     : 'You are not currently subscribed to any plan.'
          // }
          footer={
            // subscription ?
            <ManageSubscriptionButton session={session} />
            // : <Link href="/pricing" className='p-2 bg-white text-black rounded-sm font-semibold hover:bg-neutral-800 hover:text-white'>Choose your plan</Link>
          }
        >
          {/* <div className="mt-8 mb-4 text-xl font-semibold">
            {subscription && (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            )}
          </div> */}
        </Card>

        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login. (not visible to others)"
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                We will email you to verify the change.
              </p>
              <Button
                variant="slim"
                type="submit"
                form="emailForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Email
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="emailForm" action={updateEmail}>
              <input
                type="text"
                name="email"
                className="w-1/2 p-3 rounded-md dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                defaultValue={user ? user.email : ''}
                placeholder="Your email"
                maxLength={64}
              />
            </form>
          </div>
        </Card>

        <Card
          title="Your Name (optional)"
          description="Please enter your full name, or a display name you are comfortable with. (not visible to others)"
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">64 characters maximum</p>
              <Button
                variant="slim"
                type="submit"
                form="nameForm"
                disabled={true}
              >
                {/* WARNING - In Next.js 13.4.x server actions are in alpha and should not be used in production code! */}
                Update Name
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            <form id="nameForm" action={updateName}>
              <input
                type="text"
                name="name"
                className="w-1/2 p-3 rounded-md dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-950"
                defaultValue={userDetails?.full_name ?? ''}
                placeholder="Your name"
                maxLength={64}
              />
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto py-8 border rounded-md p border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="p-4 border-t rounded-b-md border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
        {footer}
      </div>
    </div>
  );
}
