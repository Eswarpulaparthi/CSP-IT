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
    const fetchPlants = async () => {
      try {
        const res = await fetch("/api/myPlants");
        if (!res.ok) throw new Error("Failed to fetch plants");

        // Tell TypeScript what data looks like
        const data: { plants: Plant[] } = await res.json();
        setPlants(data.plants || []);
      } catch (err) {
        console.error(err);
        setPlants([]);
      }
    };
    fetchPlants();
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
