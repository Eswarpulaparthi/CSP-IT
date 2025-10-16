"use client";
import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";

export default function AllPlants() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("/api/allPlants")
      .then((res) => res.json())
      .then((data) => setPlants(data));
  }, []);

  return (
    <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {plants.map((p: any) => (
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
