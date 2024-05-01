import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Choose a Topic
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Select the topic you want to take a quiz on.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 mx-auto gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Link
              className="group flex flex-col items-center justify-center  rounded-lg border border-gray-200 bg-white p-6 text-center transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="/html"
            >
              {/* <TextIcon className="h-12 w-12 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
              <h3 className="mt-4 text-center flex justify-center items-center text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-900 dark:text-gray-50 dark:group-hover:text-gray-50">
                HTML
              </h3>
              <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                Test your HTML knowledge.
              </p>
            </Link>
            <Link
              className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              {/* <ChromeIcon className="h-12 w-12 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-900 dark:text-gray-50 dark:group-hover:text-gray-50">
                CSS
              </h3>
              <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                Test your CSS knowledge.
              </p>
            </Link>
            <Link
              className="group flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-6 text-center transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800"
              href="#"
            >
              {/* <CodepenIcon className="h-12 w-12 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50" /> */}
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-900 dark:text-gray-50 dark:group-hover:text-gray-50">
                JavaScript
              </h3>
              <p className="mt-2 text-sm text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
                Test your JavaScript knowledge.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
