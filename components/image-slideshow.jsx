"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import burgerImg from "@/assets/plant1.jpg";
import curryImg from "@/assets/plant2.jpg";
import dumplingsImg from "@/assets/plant3.jpg";
import macncheeseImg from "@/assets/plant4.jpg";
import pizzaImg from "@/assets/plant5.jpg";

const images = [
  { image: burgerImg, alt: "A delicious, juicy burger" },
  { image: curryImg, alt: "A delicious, spicy curry" },
  { image: dumplingsImg, alt: "Steamed dumplings" },
  { image: macncheeseImg, alt: "Mac and cheese" },
  { image: pizzaImg, alt: "A delicious pizza" },
];

export default function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const goToSlide = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative w-full h-96 lg:h-full min-h-96 overflow-hidden rounded-2xl group bg-gradient-to-br from-green-50 to-blue-50 shadow-xl border border-green-100">
      {/* Images Container */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentImageIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={image.image}
              alt={image.alt}
              fill
              priority={index === 0}
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              className="transition-transform duration-500"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 lg:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-green-600 p-2 lg:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 lg:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-white text-green-600 p-2 lg:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 lg:gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentImageIndex
                ? "bg-green-600 w-8 h-2 lg:w-10 shadow-md"
                : "bg-white/60 hover:bg-white/80 w-2 h-2 lg:w-3 lg:h-3 shadow-sm"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-3 lg:top-4 right-3 lg:right-4 z-30 bg-green-600/90 text-white px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-semibold shadow-md">
        {currentImageIndex + 1}/{images.length}
      </div>
    </div>
  );
}
