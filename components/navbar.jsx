"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import NavLinks from "./nav-links";

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-br from-emerald-50 via-white to-blue-50 shadow-sm border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CSP</span>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent hidden sm:inline">
              BIO TWIN
            </span>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks
              href="/plants"
              className="text-gray-700 hover:text-emerald-600 transition font-medium"
            >
              Plants
            </NavLinks>
            <NavLinks
              href="/"
              className="text-gray-700 hover:text-emerald-600 transition font-medium"
              exactMatch
            >
              Home
            </NavLinks>
            {session && (
              <>
                <NavLinks
                  href="/yourplants"
                  className="text-gray-700 hover:text-emerald-600 transition font-medium"
                >
                  Your Plants
                </NavLinks>
                <NavLinks
                  href="/uploadImage"
                  className="text-gray-700 hover:text-emerald-600 transition font-medium"
                >
                  Upload
                </NavLinks>
              </>
            )}
          </div>

          {/* Right Navigation - Auth */}
          <div className="hidden md:flex items-center space-x-8">
            {session ? (
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 hover:border-emerald-400 text-gray-700 font-medium transition-all hover:shadow-md"
              >
                <FcGoogle size={18} />
                <span>Signout</span>
              </button>
            ) : (
              <button
                onClick={() =>
                  signIn("google", {
                    prompt: "select_account",
                  })
                }
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium hover:shadow-lg transition-all hover:scale-105"
              >
                <FcGoogle size={18} />
                <span>Continue with Google</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-emerald-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 border-t border-emerald-100 pt-4">
            <NavLinks
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
              exactMatch
            >
              Home
            </NavLinks>
            <NavLinks
              href="/plants"
              className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
            >
              Plants
            </NavLinks>

            {session && (
              <>
                <NavLinks
                  href="/yourplants"
                  className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
                >
                  Your Plants
                </NavLinks>
                <NavLinks
                  href="/uploadImage"
                  className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 rounded-lg transition"
                >
                  Upload
                </NavLinks>
              </>
            )}
            {session ? (
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 text-gray-700 font-medium transition-all"
              >
                <FcGoogle size={18} />
                <span>Signout</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  signIn("google", {
                    prompt: "select_account",
                  });
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium transition-all"
              >
                <FcGoogle size={18} />
                <span>Continue with Google</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
