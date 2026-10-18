"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../theme/theme-toggle";
import { ArrowRight, Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="bg-white dark:bg-zinc-950 px-6 md:px-12 lg:px-24 xl:px-40 py-4 flex items-center justify-between relative border-b border-zinc-100 dark:border-zinc-800">
      {/* Brand Logo */}
      <Link
        href="/"
        aria-label="Home"
        className="text-zinc-900 dark:text-zinc-50 font-bold text-xl tracking-tight"
      >
       Okshor
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-1 py-1 gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-medium text-zinc-800 dark:text-zinc-100 shadow-2xs"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="hidden md:flex items-center gap-2">
        <ThemeToggle />

        {/* Desktop CTA Button */}
        <Link
          href="/get-started"
          className="flex items-center gap-2.5 bg-linear-to-r from-zinc-950 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-zinc-50 dark:text-zinc-950 hover:opacity-95 text-sm font-medium pl-5 pr-2 py-2 rounded-full cursor-pointer transition-all border-0"
        >
          Get started
          <span className="w-7 h-7 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      {/* Mobile Hamburger Toggle & Theme Toggle */}
      <div className="flex md:hidden items-center gap-2">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="flex items-center justify-center cursor-pointer bg-transparent border-0 p-2 text-zinc-800 dark:text-zinc-100"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 flex flex-col p-5 gap-1 md:hidden z-50 shadow-lg">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-zinc-50 dark:bg-zinc-900 font-medium text-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link
            href="/get-started"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2.5 bg-linear-to-r from-zinc-950 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400 text-zinc-50 dark:text-zinc-950 text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer border-0 mt-3 w-full"
          >
            Get started
            <span className="w-7 h-7 rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
}