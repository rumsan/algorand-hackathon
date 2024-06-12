import { Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

import axios from "axios";

export default function AskAi({ open, setOpen }: any) {
  const [query, setQuery] = useState("");

  const [answer, setAnswer] = useState("");

  const aiUrl = import.meta.env.VITE_BACKEND_AI_URL;

  const handleAICall = async (query: string) => {
    const response = await axios.post(aiUrl, { question: query });

    console.log(response);

    setAnswer(response?.data?.data);
  };

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-10 overflow-hidden rounded-xl bg-white bg-opacity-80 shadow-2xl ring-1 ring-black ring-opacity-5 backdrop-blur backdrop-filter transition-all">
              <Combobox onChange={(item: any) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-900 text-opacity-40"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 focus:ring-0 sm:text-sm"
                    placeholder="Ask rumee ..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                <Combobox.Options
                  static
                  className=" flex min-h-80 flex-col items-center justify-center scroll-py-2 divide-y divide-gray-500 divide-opacity-10 overflow-y-auto"
                >
                  <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
                    <div class="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                      <div class="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        <div class="flex w-full mt-2 space-x-3 max-w-xs">
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                          <div>
                            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                              <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs">
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                          <div>
                            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                              <p class="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                              </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                              </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                              </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">Lorem ipsum dolor sit amet.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs">
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                          <div>
                            <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                              <p class="text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                              </p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                        </div>
                        <div class="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                          <div>
                            <div class="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                              <p class="text-sm">Lorem ipsum dolor sit.</p>
                            </div>
                            <span class="text-xs text-gray-500 leading-none">2 min ago</span>
                          </div>
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                      </div>

                      <div class="bg-gray-300 p-4">
                        <input class="flex items-center h-10 w-full rounded px-3 text-sm" type="text" placeholder="Type your message…" />
                      </div>
                    </div>
                  </div>
                  {/* <p>{answer}</p>

                  <button
                    onClick={() => handleAICall(query)}
                    className="ml-4 flex-shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Ask Rumee
                  </button> */}
                </Combobox.Options>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
