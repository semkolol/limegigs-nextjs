import Link from 'next/link';
import Image from 'next/image';
import { createServerSupabaseClient } from '@/app/supabase-server';
import {
  getSession
} from '@/app/supabase-server';
import Logo from '/public/logo.png';
import SignOutButton from './SignOutButton';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher/ThemeSwitcher'
import NavMenu from '../NavMenu/NavMenu';

export default async function Navbar() {
  const [session] = await Promise.all([
    getSession()
  ]);

  const supabase = createServerSupabaseClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <nav className='sticky top-0 bg-white dark:bg-slate-950 z-40 transition-all duration-150 border-b-[1px] border-yellow-400'>
      <div className="max-w-6xl px-6 mx-auto ">
        <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
          <div className="flex items-center flex-1">
            <Link href="/" className='flex items-center cursor-pointer' aria-label="Logo">
              <Image src={Logo} alt='limegigs' height={44} width={44} />
            </Link>
          </div>

          <div className=" justify-end flex-1 space-x-8 items-center md:flex flex-row hidden">
            {!user && (
              <Link href="/signin" className={'bg-yellow-400 text-zinc-800 text-xs cursor-pointer inline-flex px-4 rounded-full leading-6 transition ease-in-out duration-150 shadow-sm font-semibold text-center justify-center uppercase py-2 border border-transparent items-center hover:bg-yellow-800 hover:text-white hover:border hover:border-white'}>
                Post Gig ➔
              </Link>
            )}
            {user && (
              <Link href="/account" className='p-1 text-black dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800'>
                Dashboard
              </Link>
            )}
            {user ? (
              <SignOutButton />
            ) : (
              <Link href="/signin" className='flex p-1 text-black dark:text-zinc-100 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 items-center space-x-1'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
                <span className='hidden md:block'>Sign in</span>
              </Link>
            )}
            <ThemeSwitcher />

          </div>
          <NavMenu user={user} />

        </div>
      </div>
    </nav>
  );
}
