import React from 'react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-theme bg-surface/50 py-6 mt-8 transition-theme">
      <div className="mx-auto max-w-[1500px] px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted">
              © {currentYear} Expense Tracker. All rights reserved.
            </p>
            <p className="text-xs text-muted mt-1">
              Made by <span className="font-semibold text-body">Abdul Samad</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted hover:text-body transition"
              aria-label="GitHub"
              title="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="#"
              className="text-muted hover:text-body transition"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="#"
              className="text-muted hover:text-body transition"
              aria-label="Twitter"
              title="Twitter"
            >
              <FiTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
