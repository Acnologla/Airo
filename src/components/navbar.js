import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, { useState } from 'react';

export default function NavBar() {

    const [isHidden, setMenu] = useState(true);

    return (
      <nav className="bg-red-500 dark:bg-dark fixed inset-x-0 top-0 z-10">
          <div className="flex items-center px-10 shadow-sm py-3 justify-between ">
            <div>
              <FontAwesomeIcon className="text-white fa-lg h-13 w-13" icon={faCog} />
              <div className="w-36"></div>  
            </div>

            <div className="w-full justify-center sm:flex hidden">
              <div className="bg-red-400 flex rounded-full w-96 h-10 px-5 items-center">
                <input className="bg-transparent flex-grow p-1 px-3 text-white"></input>
                <FontAwesomeIcon className="text-white fa-md" icon={faSearch} />
              </div>
            </div>

            <div className="sm:hidden">
                <svg fill="white" viewBox="0 0 100 80" width="20" height="20" onClick={() => setMenu(!isHidden)}>
                  <rect width="100" height="15"></rect>
                  <rect y="30" width="100" height="15"></rect>
                  <rect y="60" width="100" height="15"></rect>
                </svg>
            </div>

          
            <div className="sm:flex hidden items-center justify-end ">
                <div><FontAwesomeIcon className="text-white fa-lg ml-5" icon={faBell} /></div>
                <div><FontAwesomeIcon className="text-white fa-lg h-13 w-13 ml-5" icon={faCog} /></div>
                <div className="h-8 w-8 ml-5 rounded-full bg-gray-500" alt="" />
            </div>
          </div>
          <div className={isHidden ? "hidden" : "sm:hidden block center"}>
            <a href="#" className="block ml-5 p-5 text-lx" >Home</a>
            <a href="#" className="block ml-5 p-5 text-lx" >Login</a>
            <a href="#" className="block ml-5 p-5 text-lx" >SignUp</a>
            <a href="#" className="block ml-5 p-5 text-lx" >Configuration</a>
          </div>
      </nav>)
}