import React from 'react';

export default function Hero({
  setToggle
}: {
  setToggle: (updaterFn: (x: boolean) => boolean) => void;
}) {
  return (
    <div className="px-6 text-left md:text-center xl:text-left max-w-2xl md:max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-4xl font-light leading-tight">
        Rincewind: A fast boilerplate for{' '}
        <span className="sm:block text-teal-500 font-normal">
          React + TypeScript + Tailwind apps.
        </span>
      </h1>
      <p className="mt-6 leading-relaxed sm:text-lg md:text-xl xl:text-lg text-gray-600">
        Tailwind CSS is a highly customizable, low-level CSS framework that
        gives you all of the building blocks you need to build bespoke designs
        without any annoying opinionated styles you have to fight to override.
      </p>
      <div className="flex mt-6 justify-start md:justify-center xl:justify-start">
        <button
          onClick={() => setToggle(x => !x)}
          className="rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-teal-500 hover:bg-teal-600 md:text-lg xl:text-base text-white font-semibold leading-tight shadow-md"
        >
          Toggle Children
        </button>
        <a
          href="https://tailwindcss.com/#what-is-tailwind"
          className="ml-4 rounded-lg px-4 md:px-5 xl:px-4 py-3 md:py-4 xl:py-3 bg-white hover:bg-gray-200 md:text-lg xl:text-base text-gray-800 font-semibold leading-tight shadow-md"
        >
          Why Tailwind?
        </a>
      </div>
    </div>
  );
}
