import Image from 'next/image'
import React from 'react'
function AboutUs() {
  return (
    <>
      <div className="flex items-center justify-center gap-1">
        <article className="prose lg:prose-xl">
          <h3 className="self-center text-center text-xl">For engineers, by engineers</h3>
          <p className="mb-2 text-center text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo quis nunc
            aliquam efficitur ut ut tellus. Fusce mattis eu mi sit amet egestas. Mauris eu tristique
            ex, a interdum leo. Vestibulum suscipit viverra convallis. Aliquam urna purus, dignissim
            sit amet maximus et, mattis in sem.
          </p>
          <p className="mb-2 text-center text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae justo quis nunc
            aliquam efficitur ut ut tellus. Fusce mattis eu mi sit amet egestas. Mauris eu tristique
            ex, a interdum leo. Vestibulum suscipit viverra convallis. Aliquam urna purus, dignissim
            sit amet maximus et, mattis in sem.
          </p>
        </article>
      </div>
      <br />
      <div className="flex items-center justify-center">
        <div className="max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">Our Vision</div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
          </div>
        </div>
        <div className="max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">Our Vision</div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
          </div>
        </div>
        <div className="max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-xl">
          <div className="px-6 py-4">
            <div className="mb-2 text-xl font-bold">Our Vision</div>
            <p className="text-base text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
            <span className="mr-2 mb-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
              #jobs
            </span>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div className="w-full rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select tab
            </label>
            <select
              id="tabs"
              className="block w-full rounded-t-lg border-0 border-b border-gray-200 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
            >
              <option>Statistics</option>
              <option>Services</option>
              <option>FAQ</option>
            </select>
          </div>
          <ul
            className="hidden divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 dark:divide-gray-600 dark:text-gray-400 sm:flex"
            id="fullWidthTab"
            data-tabs-toggle="#fullWidthTabContent"
            role="tablist"
          >
            <li className="w-full">
              <button
                id="stats-tab"
                data-tabs-target="#stats"
                type="button"
                role="tab"
                aria-controls="stats"
                aria-selected="true"
                className="inline-block w-full rounded-tl-lg border-blue-600 bg-gray-50 p-4 text-blue-600 hover:bg-gray-100 hover:text-blue-600 focus:outline-none dark:border-blue-500 dark:bg-gray-700 dark:text-blue-500 dark:hover:bg-gray-600 dark:hover:text-blue-500"
              >
                Statistics
              </button>
            </li>
            <li className="w-full">
              <button
                id="about-tab"
                data-tabs-target="#about"
                type="button"
                role="tab"
                aria-controls="about"
                aria-selected="false"
                className="inline-block w-full border-gray-100 bg-gray-50 p-4 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:border-transparent dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300"
              >
                Services
              </button>
            </li>
            <li className="w-full">
              <button
                id="faq-tab"
                data-tabs-target="#faq"
                type="button"
                role="tab"
                aria-controls="faq"
                aria-selected="false"
                className="inline-block w-full rounded-tr-lg border-gray-100 bg-gray-50 p-4 text-gray-500 hover:border-gray-300 hover:bg-gray-100 hover:text-gray-600 focus:outline-none dark:border-transparent dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-300"
              >
                FAQ
              </button>
            </li>
          </ul>
          <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
            <div
              className="rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8"
              id="stats"
              role="tabpanel"
              aria-labelledby="stats-tab"
            >
              <dl className="mx-auto grid max-w-screen-xl grid-cols-2 gap-8 p-4 text-gray-900 dark:text-white sm:grid-cols-3 sm:p-8 xl:grid-cols-6">
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">73M+</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">Developers</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">100M+</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Public repositories
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">1000s</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Open source projects
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">1B+</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">Contributors</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">90+</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">
                    Top Forbes companies
                  </dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <dt className="mb-2 text-3xl font-extrabold">4M+</dt>
                  <dd className="font-light text-gray-500 dark:text-gray-400">Organizations</dd>
                </div>
              </dl>
            </div>
            <div
              className="hidden rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                We invest in the world’s potential
              </h2>

              <ul role="list" className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex space-x-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-light leading-tight">Dynamic reports and dashboards</span>
                </li>
                <li className="flex space-x-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-light leading-tight">Templates for everyone</span>
                </li>
                <li className="flex space-x-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-light leading-tight">Development workflow</span>
                </li>
                <li className="flex space-x-2">
                  <svg
                    className="h-4 w-4 flex-shrink-0 text-blue-600 dark:text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span className="font-light leading-tight">Limitless business automation</span>
                </li>
              </ul>
            </div>
            <div
              className="hidden rounded-lg bg-white p-4 dark:bg-gray-800 md:p-8"
              id="faq"
              role="tabpanel"
              aria-labelledby="faq-tab"
            >
              <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                data-inactive-classes="text-gray-500 dark:text-gray-400"
              >
                <h2 id="accordion-flush-heading-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 bg-white py-5 text-left font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    data-accordion-target="#accordion-flush-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-flush-body-1"
                  >
                    <span>What is Flowbite?</span>
                    <svg
                      data-accordion-icon=""
                      className="h-6 w-6 shrink-0 rotate-180"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-1"
                  className=""
                  aria-labelledby="accordion-flush-heading-1"
                >
                  <div className="border-b border-gray-200 py-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is an open-source library of interactive components built on top of
                      Tailwind CSS including buttons, dropdowns, modals, navbars, and more.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{' '}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        get started
                      </a>{' '}
                      and start developing websites even faster with components on top of Tailwind
                      CSS.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-2"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-2"
                  >
                    <span>Is there a Figma file available?</span>
                    <svg
                      data-accordion-icon=""
                      className="h-6 w-6 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-2"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-2"
                >
                  <div className="border-b border-gray-200 py-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is first conceptualized and designed using the Figma software so
                      everything you see in the library has a design equivalent in our Figma file.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out the{' '}
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Figma design system
                      </a>{' '}
                      based on the utility classes from Tailwind CSS and components from Flowbite.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between border-b border-gray-200 py-5 text-left font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    data-accordion-target="#accordion-flush-body-3"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-3"
                  >
                    <span>What are the differences between Flowbite and Tailwind UI?</span>
                    <svg
                      data-accordion-icon=""
                      className="h-6 w-6 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-3"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-3"
                >
                  <div className="border-b border-gray-200 py-5 font-light dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      The main difference is that the core components from Flowbite are open source
                      under the MIT license, whereas Tailwind UI is a paid product. Another
                      difference is that Flowbite relies on smaller and standalone components,
                      whereas Tailwind UI offers sections of pages.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      However, we actually recommend using both Flowbite, Flowbite Pro, and even
                      Tailwind UI as there is no technical reason stopping you from using the best
                      of two worlds.
                    </p>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Learn more about these technologies:
                    </p>
                    <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                      <li>
                        <a
                          href="https://flowbite.com/pro/"
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Flowbite Pro
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://tailwindui.com/"
                          rel="nofollow"
                          className="text-blue-600 hover:underline dark:text-blue-500"
                        >
                          Tailwind UI
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutUs
