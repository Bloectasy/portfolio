'use client';


import Link from 'next/link';
import { useTheme } from '@context/ThemeProvider';
import { usePathname } from 'next/navigation';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

import { FaGithub, FaMailBulk, FaSpotify, FaLinkedin } from 'react-icons/fa';

const Navigation = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <nav className="relative mt-6 flex items-center justify-center sm:mt-8 sm:justify-between">
      {/* Left Side */}
      <div className="text-primary hidden items-center justify-center gap-4 text-3xl md:flex">
        <Link
          href="https://github.com/Bloectasy"
          className="hover:text-primary/80 transition-transform duration-300 hover:scale-115"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/david-acevski-699198224/"
          className="hover:text-primary/80 transition-transform duration-300 hover:scale-115"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="/contact"
          className="hover:text-primary/80 transition-transform duration-300 hover:scale-115"
        >
          <FaMailBulk />
        </Link>
        <Link
          href="https://open.spotify.com/user/ysse2vavhoqu9o6nvb0my3ckx?si=b696d7a4e9944ee6"
          className="hover:text-primary/80 transition-transform duration-300 hover:scale-115"
        >
          <FaSpotify />
        </Link>
      </div>
      {/* Right Side*/}
      <div className="relative flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-between sm:gap-4 md:gap-10">
        <Paths />
        <button
          className="absolute right-0 cursor-pointer sm:static"
          onClick={() => toggleTheme()}
        >
          {theme === 'light' ? (
            <MdDarkMode className="text-2xl" />
          ) : (
            <MdLightMode className="text-2xl" />
          )}
        </button>
      </div>

    </nav>
  );
};

const Paths = () => {
  const path = usePathname();

  return (
    <div className="flex flex-1 items-center justify-center gap-4 text-xl font-semibold sm:flex-none sm:gap-4 sm:text-xl">
      <Link
        className={`${path === '/' ? 'text-primary hover:text-primary/80' : 'hover:text-text/80'} transition-transform duration-300 hover:scale-105`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${path === '/projects' ? 'text-primary hover:text-primary/80' : 'hover:text-text/80'} transition-transform duration-300 hover:scale-105`}
        href="/projects"
      >
        Projects
      </Link>
      <Link
        className={`${path === '/contact' ? 'text-primary hover:text-primary/80' : 'hover:text-text/80'} transition-transform duration-300 hover:scale-105`}
        href="/contact"
      >
        Contact
      </Link>
    </div>
  );
};

export default Navigation;
