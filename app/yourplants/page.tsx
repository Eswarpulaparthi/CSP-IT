"use client";
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";

// Define a TypeScript interface for Plant
interface Plant {
  _id: string;
  userId: string;
  scientificName: string;
  healthStatus: string;
  description: string;
  image: string;
}

export default function YourPlants() {
  const [plants, setPlants] = useState<Plant[]>([]); // Use the Plant type

  useEffect(() => {
    fetch("/api/myPlants")
      .then((res) => res.json())
      .then((data) => setPlants(data.plants || []));
  }, []);

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
