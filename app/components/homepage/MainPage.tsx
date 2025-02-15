"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react"; // Import search icon
import { ArrowRight } from 'lucide-react';

import Image from "next/image";

interface Photographer {
  id: number;
  name: string;
  imageUrl: string;
}

const photographersData: Photographer[] = [
  { id: 1, name: "John Doe", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 2, name: "Jane Smith", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 3, name: "Emily Johnson", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 4, name: "Michael Brown", imageUrl: "https://plus.unsplash.com/premium_photo-1661859079243-24150b97a737?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 5, name: "Sarah Williams", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 6, name: "David Wilson", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 7, name: "Emma Thomas", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  { id: 8, name: "Olivia Martinez", imageUrl: "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
];

const MainPage = () => {
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setPhotographers(photographersData);
  }, []);

  // Filter photographers based on search input
  const filteredPhotographers = photographers.filter((photographer) =>
    photographer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container text-black mx-auto py-24 px-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-white">GALLERY</h1>

        {/* Search Bar (Top Right) */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>

      {/* Photographers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
        {filteredPhotographers.length > 0 ? (
          filteredPhotographers.map((photographer) => (
            <div
              key={photographer.id}
              className="relative group overflow-hidden transition-transform transform hover:scale-105 hover:cursor-pointer"
            >
              <Image
                src={photographer.imageUrl}
                alt={photographer.name}
                width={500}
                height={300}
                className="w-full h-[400px] rounded-md object-cover object-center"
              />
              <div className="pt-2 flex justify-between items-center text-white">
                <h2 className="text-lg font-semibold">{photographer.name}</h2>
                <button className="text-blue-600 rounded-lg transition-all shadow-md">
                  <a href="/view" className="flex gap-2"><h1>View All</h1> <div><ArrowRight className="text-sm" /></div></a>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No photographers found.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
