"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Cta from "@/components/cta";
import ImageSlideshow from "@/components/image-slideshow";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <section className="bg-gradient-to-b from-white via-emerald-50/30 to-white py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          {session && (
            <div className="mb-8 lg:mb-12 flex items-center gap-4 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border border-emerald-200 shadow-sm">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full ring-2 ring-emerald-400"
                />
              )}
              <div className="flex flex-col">
                <span className="text-sm text-gray-600 font-medium">Hello</span>
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  {session.user?.name || "Plant Lover"}
                </h2>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-green-600">BIO TWIN</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Snap, Identify, Treat - Your plant&apos;s health in seconds.
                Upload a photo and get instant identification plus expert care
                guidance for diseases and treatments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {session ? (
                  <Link href="/uploadImage">
                    <Cta shade>Learn More</Cta>
                  </Link>
                ) : (
                  <div className="px-6 py-2 rounded-xl font-medium bg-green-600 text-white cursor-not-allowed opacity-50">
                    Learn More
                  </div>
                )}
              </div>
            </div>
            <ImageSlideshow />
          </div>
        </div>
      </section>
    </>
  );
}
