"use client";

import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";

const Page = () => {
  const [collections, setCollections] = useState([
    { id: 1, name: "Wedding Shoots", type: "private" },
    { id: 2, name: "Street Photography", type: "public" },
    { id: 3, name: "Portraits", type: "private" },
    { id: 4, name: "Nature Shots", type: "public" },
  ]);
  const [newCollection, setNewCollection] = useState("");
  const [collectionType, setCollectionType] = useState("private");

  const handleDelete = (id: number) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const handleCreate = () => {
    if (newCollection.trim() === "") return;
    setCollections([...collections, { id: Date.now(), name: newCollection, type: collectionType }]);
    setNewCollection("");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-900 p-6 py-20 border-b md:border-b-0 md:border-r border-gray-700">
        {/* Create Collection Form */}
        <div className="mb-6">
          <a 
            href="/collection" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Create Collection
          </a>
        </div>  
        <div>
          <h3 className="text-lg font-semibold mb-2">Private Collections</h3>
          <ul className="mb-4">
            {collections.filter((c) => c.type === "private").map((c) => (
              <li key={c.id} className="py-2 px-2 bg-gray-800 mb-1">{c.name}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Public Collections</h3>
          <ul>
            {collections.filter((c) => c.type === "public").map((c) => (
              <li key={c.id} className="py-2 px-2 bg-gray-800 mb-1">{c.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-gray-800 py-20 p-6 flex-gorw">
        <h2 className="text-2xl font-bold mb-6">Manage Collections</h2>
        <div>
          {collections.map((collection) => (
            <div key={collection.id} className="flex flex-col md:flex-row justify-between items-center bg-gray-700 p-4 mb-2 border-b border-gray-600">
              <span className="text-lg mb-2 md:mb-0">{collection.name}</span>
              <div className="flex gap-4">
                <button className="text-blue-400 hover:text-blue-500">
                  <Edit size={20} />
                </button>
                <button className="text-red-400 hover:text-red-500" onClick={() => handleDelete(collection.id)}>
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
