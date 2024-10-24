import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons'


const Searchbar = () => {
    return (
      <div className="flex justify-end items-center pb-5 pr-8 pt-20">
        <div className="flex items-center justify-between shadow-lg bg-[#F2F2F2] rounded-lg p-4 max-lg:3/5 lg:w-1/3 lg:px-8  lg:mr-32 max-sm:p-2 ">
          <input
            type="text"
            placeholder="Search for course..."
            className="outline-none bg-[#F2F2F2] rounded-md w-full"
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="flex h-6 text-gray-500 rounded-md hover:cursor-pointer"
          />
        </div>
      </div>
    );
};

export default Searchbar