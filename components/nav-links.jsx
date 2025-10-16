"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({
  href,
  children,
  exactMatch = false,
  className: customClassName = "",
}) {
  const pathname = usePathname();

  const isActive = exactMatch ? pathname === href : pathname.startsWith(href);

  const baseClassName =
    customClassName ||
    "relative group text-gray-700 font-medium transition-all duration-300";

  const className = isActive
    ? `${baseClassName} text-emerald-600 font-semibold`
    : baseClassName;

  return (
    <Link href={href} className={className}>
      {children}
      {/* <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-300 ${
          isActive
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100 origin-left"
        }`}
      /> */}
    </Link>
  );
}
