"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search, ArrowRight } from "lucide-react";

// User interface
interface User {
  name: string;
  image?: string;
}

// Collection interface
interface Collection {
  _id: string;
  collectionName: string;
  images: (string | { url: string })[];
  user: User;
}

// Flattened image interface for search and display
interface FlatImage {
  id: string;
  title: string;
  url: string; 
  user: User;
}

export default function PinterestPage() {
  const [search, setSearch] = useState("");
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);
    const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Fetch public collections from API
  useEffect(() => {
    const fetchPublicCollections = async () => {
      try {
        const res = await fetch(`/api/get-public-coll?page=${page}&limit=${limit}`);
        const data = await res.json();

         if (Array.isArray(data.collections)) {
        setCollections(data.collections);
        setTotalPages(Math.ceil(data.totalCount / limit));
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicCollections();
  }, [page]);

  // Flatten collections for displaying cover images
  const allImages: FlatImage[] = collections
    .map((collection) => {
      const firstImg = collection.images[0];
      if (!firstImg) return null;

      return {
        id: `${collection._id}-0`,
        title: collection.collectionName,
        url: typeof firstImg === "string" ? firstImg : firstImg.url,
        user: collection.user,
      };
    })
    .filter(Boolean) as FlatImage[];

  const filteredImages = allImages.filter((img) =>
    img.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-black text-white">
      {/* Search */}
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-full px-20 pb-10 pt-28 text-center">
          <h1 className="text-3xl font-bold mb-1">SEARCH THE PROFESSIONALS</h1>
          <p className="text-sm text-gray-300">Get unique, expert, and experienced photographers</p>
        </div>
        <div className="relative mb-5 w-full max-w-md">
          <input
            type="text"
            placeholder="Search collections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md bg-neutral-800 text-white placeholder:text-gray-400 focus:outline-none"
          />
          <Search className="absolute top-2.5 left-3 text-gray-400" size={18} />
        </div>
      </div>

      {/* Masonry layout */}
      {loading ? (
        <p className="text-center text-gray-400">Loading collections...</p>
      ) : (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group break-inside-avoid overflow-hidden rounded-xl shadow-md cursor-pointer"
              onClick={() => {
                const collection = collections.find(col => col._id === image.id.split("-")[0]);
                if (collection) setSelectedCollection(collection);
              }}
            >
              <Image
                src={image.url}
                alt={image.title}
                width={300}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-lg font-semibold">
                View <ArrowRight className="ml-2" size={18} />
              </div>

              {/* User Info on Hover */}
              {image.user && (
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-black bg-opacity-60 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-medium">{image.user?.name || "Unknown"}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay for Full Collection */}
      {selectedCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative w-full  rounded-lg p-6 overflow-y-auto h-screen">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedCollection(null)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">{selectedCollection.collectionName}</h2>

            <div className="flex justify-between flex-wrap gap-4">
  {selectedCollection.images.map((img: any, index: number) => (
    <div key={index} className="w-[300px] h-auto overflow-hidden rounded-md">
      <Image
        src={typeof img === "string" ? img : img.url}
        alt={`Image ${index + 1}`}
        width={300}
        height={500}
        className="object-cover w-full h-full"
      />
    </div>
  ))}
</div>

          </div>
        </div>
      )}
         {/* Pagination */}
      <div className="flex justify-center items-center mt-20 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border-2 border-opacity-50 disabled:opacity-50"
        >
          Previous
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 border-2 border-opacity-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
