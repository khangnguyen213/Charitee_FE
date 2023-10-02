import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsSpeedometer2,
  BsFillJournalBookmarkFill,
  BsCashCoin,
  BsFillPersonLinesFill,
  BsFillGrid3X3GapFill,
} from 'react-icons/bs';
const SideNavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav
        id="sidenav-3"
        className="fixed left-0 top-[3.2rem] z-[1035] h-screen w-60 -translate-x-full overflow-hidden bg-zinc-800 shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] data-[te-sidenav-hidden='false']:translate-x-0"
        data-te-sidenav-init
        data-te-sidenav-hidden="true"
        data-te-sidenav-color="white"
      >
        <ul
          className="relative m-0 list-none px-[0.2rem]"
          data-te-sidenav-menu-ref
        >
          <li className="relative" onClick={() => navigate('/admin')}>
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
              data-te-sidenav-link-ref
            >
              <span className="mr-4 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <BsSpeedometer2 className="h-6 w-6" />
              </span>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="relative" onClick={() => navigate('/admin/accounts')}>
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
              data-te-sidenav-link-ref
            >
              <span className="mr-4 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <BsFillPersonLinesFill className="h-6 w-6" />
              </span>
              <span>Account Manager</span>
            </a>
          </li>
          <li className="relative" onClick={() => navigate('/admin/causes')}>
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
              data-te-sidenav-link-ref
            >
              <span className="mr-4 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <BsFillJournalBookmarkFill className="h-6 w-6" />
              </span>
              <span>Cause Manager</span>
            </a>
          </li>
          <li className="relative" onClick={() => navigate('/admin/donations')}>
            <a
              className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-300 outline-none transition duration-300 ease-linear hover:bg-white/10 hover:outline-none focus:bg-white/10 focus:outline-none active:bg-white/10 active:outline-none data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none"
              data-te-sidenav-link-ref
            >
              <span className="mr-4 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-gray-400 dark:[&>svg]:text-gray-300">
                <BsCashCoin className="h-6 w-6" />
              </span>
              <span>Donation Manager</span>
            </a>
          </li>
        </ul>
      </nav>

      <button
        className="fixed top-16 left-4 z-[1000] block rounded bg-slate-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-slate-900 hover:shadow-lg focus:bg-slate-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-950 active:shadow-lg"
        data-te-sidenav-toggle-ref
        data-te-target="#sidenav-3"
        aria-controls="#sidenav-3"
        aria-haspopup="true"
      >
        <span className="block [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-white">
          <BsFillGrid3X3GapFill className="h-6 w-6" />
        </span>
      </button>
    </>
  );
};

export default SideNavBar;
