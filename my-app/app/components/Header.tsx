import React from 'react';

export default function Header() {
  return (
    <div className="flex justify-center ">
      <div className="flex justify-center border-white rounded-2xl p-8">
        <ul className="flex gap-4">
          <li className="underline-animation flex transition-all hover:font-bold hover:text-red-600 cursor-pointer ">
            Home
          </li>
          <li className="underline-animation flex transition-all hover:font-bold hover:text-red-600 cursor-pointer">
            About
          </li>
          <li className="underline-animation flex transition-all hover:font-bold hover:text-red-600 cursor-pointer">
            Dashboard
          </li>
          <li className="underline-animation flex transition-all hover:font-bold hover:text-red-600 cursor-pointer">
            Contact
          </li>
          <li className="underline-animation flex transition-all hover:font-bold hover:text-red-600 cursor-pointer">
            Help
          </li>
        </ul>
      </div>
    </div>
  );
}
