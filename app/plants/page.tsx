"use client";
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";

// Plant interface
interface Plant {
  _id: string;
  userId: string;
  scientificName: string;
  healthStatus: string;
  description: string;
  image: string;
}

export default function AllPlants() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    setLoading(true);
    fetch("/api/allPlants")
      .then((res) => res.json())
      .then((data) => setPlants(data || []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    // Display a simple spinner or skeleton
    return (
      <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl h-80 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">No plants found.</div>
    );
  }

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {plants.map((p) => (
        <ImageCard
          key={p._id}
          title={p.scientificName}
          description={p.description}
          image={p.image}
          health={p.healthStatus}
          user={p.userId}
        />
      ))}
    </div>
  );
}
