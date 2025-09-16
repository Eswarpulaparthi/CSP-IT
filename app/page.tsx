// import Image from "next/image";
import Link from "next/link";
import Cta from "@/components/cta";
import ImageSlideshow from "@/components/image-slideshow";
export default function Home() {
  return (
    <>
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Welcome to{" "}
                <span className="text-green-600">Plant Identification</span>
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                Snap, Identify, Treat - Your plant&apos;s health in seconds.
                Upload a photo and get instant identification plus expert care
                guidance for diseases and treatments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/uploadImage">
                  <Cta shade>Learn More</Cta>
                </Link>
              </div>
            </div>
            <ImageSlideshow />
          </div>
        </div>
      </section>
    </>
  );
}
