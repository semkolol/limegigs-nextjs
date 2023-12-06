'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';


export default function SignOutButton() {
  const router = useRouter();
  const { supabase } = useSupabase();
  return (
    <button
      className='p-1 text-black dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800'
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/signin');
      }}
    >
      Sign out
    </button>
  );
}
