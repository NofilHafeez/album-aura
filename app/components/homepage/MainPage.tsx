"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Photographer {
  id: number;
  name: string;
  imageUrl: string;
}

const photographersData: Photographer[] = [
  { id: 1, name: "John Doe", imageUrl: "/images/john.jpg" },
  { id: 2, name: "Jane Smith", imageUrl: "/images/jane.jpg" },
  { id: 3, name: "Emily Johnson", imageUrl: "/images/emily.jpg" },
  { id: 4, name: "Michael Brown", imageUrl: "/images/michael.jpg" },
  { id: 5, name: "Sarah Williams", imageUrl: "/images/sarah.jpg" },
  { id: 6, name: "David Wilson", imageUrl: "/images/david.jpg" },
  { id: 7, name: "Emma Thomas", imageUrl: "/images/emma.jpg" },
  { id: 8, name: "Olivia Martinez", imageUrl: "/images/olivia.jpg" }
];

const MainPage = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    setPhotographers(photographersData);
  }, []);

  return (
    <div className="container mx-auto py-20 p-10">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-200">Photographers' Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {photographers.map((photographer) => (
          <div key={photographer.id} className="relative group rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <Image
              src={photographer.imageUrl}
              alt={photographer.name}
              width={500}
              height={300}
              className="w-full h-72 object-cover rounded-t-xl"
            />
            <div className="p-5 flex justify-between items-center bg-gray-800 text-white rounded-b-xl">
              <h2 className="text-lg font-semibold">{photographer.name}</h2>
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md">
                View Collection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
