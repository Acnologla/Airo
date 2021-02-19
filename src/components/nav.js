import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCog, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav() {
    return (
        <nav className = "bg-white dark:bg-dark">
            <div className = "ml-5 mr-5 flex items-center  md:justify-start justify-between h-16">
              <div className = "items-baseline">
                <img className="w-8 ml-3" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow"></img>
              </div>
              <div className="-mr-2 flex rounded-md shadow-sm">
                <input type="text" className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="www.example.com"></input>
              </div>            
              <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                <div>
                    <FontAwesomeIcon  className="w-6 ml-3" icon={faBell} />
                </div>
                <div>
                    <FontAwesomeIcon  className="w-6 ml-3" icon={faCog} /> 
                </div>
                <img className="h-10 w-10 ml-3 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt=""></img>
              </div>
            </div>
        </nav>      
    )
}