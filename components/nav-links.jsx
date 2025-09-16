"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NavLinks({ href, children, exactMatch = false }) {
  const pathname = usePathname();

  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  const className = isActive
    ? "text-green-600 font-semibold border-b-2 border-green-600 pb-1"
    : "text-gray-600 hover:text-gray-900 transition-colors";
  return (
    <>
      <Link href={href} className={className}>
        {children}
      </Link>
    </>
  );
}
