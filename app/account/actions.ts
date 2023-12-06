'use server'

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import {
  getSession,
  getUserDetails,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase-server';
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { Database } from '@/types_db';


export async function publishGig(formData: FormData) {
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