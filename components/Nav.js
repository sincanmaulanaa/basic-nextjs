import { SearchIcon } from "@heroicons/react/solid";
import {
  MenuIcon,
  XIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import workflowLogo from "../public/images/workflow.svg";
import Link from "next/link";
import Cookie from "js-cookie";
import Router from "next/router";

export default function Nav() {
  function logoutHandler(e) {
    e.preventDefault;

    Cookie.remove("token");

    Router.replace("/auth/login");
  }
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Image
                className="block lg:hidden h-8 w-auto"
                src={workflowLogo}
                alt="Workflow"
              />
              {/* <Image
                className="hidden lg:block h-8 w-auto"
                src={workflowLogo}
                alt="Workflow"
              /> */}
            </div>
            <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
              {/* <!-- Current: "border-blue-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
              <Link href="/posts">
                <a className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {" "}
                  Postingan{" "}
                </a>
              </Link>
              <Link href="/posts/create">
                <a className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  {" "}
                  Buat Postingan{" "}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            {/* <!-- Mobile menu button --> */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* <!--
				  Icon when menu is closed.
	  
				  Heroicon name: outline/menu
	  
				  Menu open: "hidden", Menu closed: "block"
				--> */}
              <MenuIcon className="block h-6 w-6" />
              {/* <!--
				  Icon when menu is open.
	  
				  Heroicon name: outline/x
	  
				  Menu open: "block", Menu closed: "hidden"
				--> */}
              <XIcon className="hidden h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:ml-4 lg:flex lg:items-center">
            {/* <!-- Profile dropdown --> */}
            <div className="ml-4 relative flex-shrink-0">
              <div>
                <button
                  type="button"
                  className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>

                  <UserCircleIcon className="h-8 w-8 rounded-full text-gray-400" />
                </button>
              </div>

              {/* <!--
				  Dropdown menu, show/hide based on menu state.
	  
				  Entering: "transition ease-out duration-100"
					From: "transform opacity-0 scale-95"
					To: "transform opacity-100 scale-100"
				  Leaving: "transition ease-in duration-75"
					From: "transform opacity-100 scale-100"
					To: "transform opacity-0 scale-95"
				--> */}
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                {/* <!-- Active: "bg-gray-100", Not Active: "" --> */}
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Profil saya
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={logoutHandler.bind(this)}
                >
                  Keluar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className="lg:hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          {/* <!-- Current: "bg-blue-50 border-blue-500 text-blue-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" --> */}
          <a
            href="#"
            className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
          >
            Calendar
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <UserCircleIcon className="h-10 w-10 rounded-full text-gray-400" />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">
                Tom Cook
              </div>
              <div className="text-sm font-medium text-gray-500">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            >
              Profil saya
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              onClick={logoutHandler.bind(this)}
            >
              Keluar
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
