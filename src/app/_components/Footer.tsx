import Link from 'next/link';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-primary/50 mt-12 flex items-center justify-between border-t px-8 py-6">
      <div className="text-primary text-sm">
        David Acevski 2026. All rights reserved.
      </div>

      <div className="flex items-center gap-8">
        <div className="ml-4 flex items-center gap-4">
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
