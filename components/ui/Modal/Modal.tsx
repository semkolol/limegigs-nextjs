'use client';

import React, { forwardRef, useRef, useState, Fragment } from 'react';
import Button from '@/components/ui/Button';

import LoadingDots from '@/components/ui/LoadingDots';

import { Dialog, Transition } from '@headlessui/react'


interface Props {
  user: any;
}

const Modal = (props: Props) => {
  const {
    user,
  } = props;

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const addAlert = async () => {
    // 'use server';

    // const supabase = createServerActionClient<Database>({ cookies });
    // const session = await getSession();
    const kek = user;
    const name = '';
    const link = '';
    const interval = 0;

    // first check if a entry with the link already exists and if so, add the user id to the user array/object
    // not sure if this will work, otherwise fuck it and make it unefficient
    // const { data, error: fetchError } = await supabase
    //   .from('alerts')
    //   .select('link')
    //   .eq('link', link)

    // // if link already exists add user to notifyList, else create new alert
    // if (!data) {
    //   const { error } = await supabase
    //     .from('alerts')
    //     .insert({ name: name, link: link, interval: interval, user: user?.id })
    // } else if (data) {
    //   const { error } = await supabase
    //     .from('alerts')
    //     .update({ notifyList: 'userId' })
    //     .eq('link', link)
    // }
  }

  return (
    <>
      <Button
        onClick={openModal}
        variant='slim'
      >
        <span>
          Add new Gig
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="ml-2 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black border-2 border-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    Add new Gig
                  </Dialog.Title>
                  <div className="mt-2">
                    <form id="addAlertForm" action={addAlert}>
                      <label>Job-Page link</label>
                      <input
                        type="text"
                        name="addAlert"
                        className="w-full p-3 rounded-md bg-zinc-800"
                        placeholder="https://www.amazon.com/Disney-Stuffed-Lightning-Mcqueen-Pillow/dp/B001IKKS5S/"
                        required
                      />
                      <div className='flex flex-col mt-2'>
                        <label>Salary</label>
                        <select name="interval" id="interval" required className='w-full p-3 rounded-md bg-zinc-800'>
                          <option value="daily">Daily</option>
                          <option value="hourly">Hourly</option>
                        </select>
                      </div>
                      <div className='flex flex-col mt-2'>
                        <label>Gig title</label>
                        <input
                          type="text"
                          className="w-full p-3 rounded-md bg-zinc-800"
                          placeholder="Product name for you, to organise gigs"
                          required
                        />
                      </div>
                    </form>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black hover:bg-neutral-300"
                      onClick={closeModal}
                    >
                      Add Gig
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
