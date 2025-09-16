import Link from "next/link";
import NavLinks from "./nav-links";
export default function Navbar() {
  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-800">CSP PROJECT</div>

            <div className="flex space-x-8">
              <NavLinks href="/" exactMatch>
                Home
              </NavLinks>
              <NavLinks href="/uploadImage">Upload Image</NavLinks>
              {/* <NavLinks href="/login">Login</NavLinks> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
