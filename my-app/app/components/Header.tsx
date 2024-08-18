import { UserButton } from '@clerk/nextjs';
import React from 'react';

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4">
         <div className="flex-shrink-0">
        <img src='/next.svg' alt="Logo" className="h-5" />
      </div>
      <div className="flex-1 flex justify-center">                           
        <div className="border-white rounded-2xl p-8">
          <ul className="flex gap-4">
            <li className="underline-animation flex transition-all text-xl hover:font-extrabold hover:text-red-600 cursor-pointer">
              Home
            </li>
            <li className="underline-animation flex transition-all text-xl hover:font-extrabold hover:text-red-600 cursor-pointer">
              About
            </li>
            <li className="underline-animation flex transition-all text-xl hover:font-extrabold hover:text-red-600 cursor-pointer">
              Dashboard
            </li>
            <li className="underline-animation flex transition-all text-xl hover:font-extrabold hover:text-red-600 cursor-pointer">
              Contact
            </li>
            <li className="underline-animation flex transition-all text-xl hover:font-extrabold hover:text-red-600 cursor-pointer">
              Help
            </li>
          </ul>
        </div>
      </div>
      <UserButton />
    </div>
  );
}
