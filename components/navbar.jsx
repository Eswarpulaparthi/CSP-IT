"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import NavLinks from "./nav-links";
export default function Navbar() {
  const { data: session } = useSession();

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-800">CSP PROJECT</div>

            <div className="flex space-x-8">
              {session ? (
                <>
                  <NavLinks href="/" exactMatch>
                    Home
                  </NavLinks>
                  <NavLinks href="/uploadImage">Upload Image</NavLinks>
                  <button
                    className="flex items-center justify-center gap-3 w-full max-w-xs border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
                    onClick={() => signOut()}
                  >
                    <FcGoogle size={24} />
                    <span className="text-gray-700 font-medium">Signout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLinks href="/" exactMatch>
                    Home
                  </NavLinks>
                  <button
                    onClick={() =>
                      signIn("google", {
                        prompt: "select_account",
                      })
                    }
                    className="flex items-center justify-center gap-3 w-full max-w-xs border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition"
                  >
                    <FcGoogle size={24} />
                    <span className="text-gray-700 font-medium">
                      Continue with Google
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
