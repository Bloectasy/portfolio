import Link from 'next/link';
import { FaGithub, FaLinkedin, FaMailBulk, FaSpotify } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-primary/50 mt-12 flex flex-col items-start justify-between gap-4 border-t px-0 py-6 sm:flex-row sm:items-center">
      <div className="text-primary text-sm">
        David Acevski 2026. All rights reserved.
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-5 md:hidden">
          <Link
            href="https://github.com/Bloectasy"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaGithub size={26} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/david-acevski-699198224/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaLinkedin size={26} />
          </Link>
          <Link
            href="/contact"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaMailBulk size={26} />
          </Link>
          <Link
            href="https://open.spotify.com/user/ysse2vavhoqu9o6nvb0my3ckx?si=b696d7a4e9944ee6"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaSpotify size={26} />
          </Link>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="https://www.linkedin.com/in/david-acevski-699198224/"
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaLinkedin size={24} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
