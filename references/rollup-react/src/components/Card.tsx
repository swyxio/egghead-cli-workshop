import React from 'react';

export default function Card() {
  return (
    <div className="relative overflow-hidden mb-8 mt-12 px-6 flex-shrink-0 hidden md:block">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-400 p-4 p-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="rounded-lg md:w-56"
              src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=448&amp;q=80"
              alt="Woman paying for a purchase"
            />
          </div>{' '}
          <div className="mt-4 md:mt-0 md:ml-6">
            <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
              Marketing
            </div>{' '}
            <a
              href="#"
              className="block mt-1 text-lg leading-tight font-semibold text-gray-900 hover:underline"
            >
              Finding customers for your new business
            </a>{' '}
            <p className="mt-2 text-gray-600">
              Getting a new business off the ground is a lot of hard work. Here
              are five ideas you can use to find your first customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
