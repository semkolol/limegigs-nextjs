import Script from 'next/script';

import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import Link from 'next/link';

import { redirect } from 'next/navigation';


export default async function SuccessPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  if (!session) {
    return redirect('/signin');
  }

  return (<div className='flex flex-col justify-center items-center max-w-3xl mt-28'>

    {/* <Script>
      {`

        gtag('event', 'conversion', {
            'send_to': 'AW-943611337/PnBFCMykpecYEMm7-cED',
            'transaction_id': ''
        });

      `}
    </Script> */}
    <h2 className="text-xl font-bold py-4">Your Purchase was successful - Tokens were added to your balance!</h2>
    <Link href="/account" className='px-4 py-2 rounded-lg bg-neutral-950 hover:bg-neutral-900'>
      Go to Dashboard
    </Link>
  </div>
  )
}