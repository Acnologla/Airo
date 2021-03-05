import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faSearch, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from "react"
import MainContext from "../context/main"
import React, { useState, useRef } from 'react';
import Login from "./login"
import Image from "./image"
import { useRouter } from 'next/router'

export default function NavBar() {
  const searchRef = useRef(null)
  const [isHidden, setMenu] = useState(true);
  const [login, setLogin] = useState(false)
  const router = useRouter()
  const context = useContext(MainContext)
  const search = async (e) => {
    if (e.key === "Enter") {
      const { value } = searchRef.current
      router.push(`/search?query=${value}`)
    }
  }
  return (
    <nav className="bg-red-500 dark:bg-dark fixed inset-x-0 top-0 z-10">
      <div className="flex items-center px-10 shadow-sm py-2 justify-between ">
        <div>
          <FontAwesomeIcon className="text-white fa-lg h-13 w-13 cursor-pointer" icon={faCog} />
          <div className="w-36"></div>
        </div>

        <div className="w-full justify-center md:flex hidden">
          <div className="bg-red-400 flex rounded-full w-96 h-6 px-5 items-center">
            <input ref={searchRef} onKeyDown={search} className="bg-transparent flex-grow p-1 px-3 text-white"></input>
            <FontAwesomeIcon className="text-white fa-md cursor-pointer" icon={faSearch} />
          </div>
        </div>

        <div className="block md:hidden">
          <svg className="cursor-pointer" fill="white" viewBox="0 0 100 80" width="20" height="20" onClick={() => setMenu(!isHidden)}>
            <rect rx="10" ry="10" width="100" height="15"></rect>
            <rect rx="10" ry="10" style={{ borderRadius: "25px" }} y="30" width="100" height="15"></rect>
            <rect rx="10" ry="10" style={{ borderRadius: "25px" }} y="60" width="100" height="15"></rect>
          </svg>
        </div>


        <div className="md:flex hidden items-center justify-end ">
          <div><FontAwesomeIcon className="cursor-pointer text-white fa-lg ml-5" icon={faBell} /></div>
          <div><FontAwesomeIcon className="cursor-pointer text-white fa-lg h-13 w-13 ml-5" icon={faCog} /></div>
          {
            context.auth ?
              <Image /> :
              <button className="ml-5" onClick={() => setLogin(!login)}>Login</button>
          }
        </div>
      </div>
      <div className={isHidden ? "hidden" : "md:hidden block center text-center cursor-pointer"}>
        <a href="#" className="hover:text-white block ml-5 p-5 text-lx" >Home</a>
        <a href="#" className="hover:text-white block ml-5 p-5 text-lx" >Login</a>
        <a href="#" className="hover:text-white block ml-5 p-5 text-lx" >SignUp</a>
        <a href="#" className="hover:text-white block ml-5 p-5 text-lx" >Configuration</a>
      </div>
      {login ? <Login /> : <></>}
    </nav>)
}