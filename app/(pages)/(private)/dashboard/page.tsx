"use client";

import { useState, useEffect } from "react";
import { Trash, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/UserContext";


interface User {
  name: string;
  image?: string;
}

interface Collection {
  _id: string;
  collectionName: string;
  images: (string | { url: string })[];
  user: User;
  collectionType: "public" | "private";
  id: string;
}

const Page = () => {
  const router = useRouter();
    const { user, loading } = useAuth();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [collLoading, setCollLoading] = useState(false);
  
  // Fetch public collections when authorized
  useEffect(() => {
    if (!user) return;

    const fetchPublicCollections = async () => {
      setCollLoading(true);
      try {
        const res = await fetch("/api/get-collection");
        const data = await res.json();

        if (Array.isArray(data)) {
          setCollections(data);
          console.log(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch collections:", error);
      } finally {
        setCollLoading(false);
      }
    };

    fetchPublicCollections();
  }, [user]);

  const handleDelete = async (collectionId: string) => {
    const deletedCollection = collections.find((c) => c._id === collectionId);
    setCollections((prev) => prev.filter((c) => c._id !== collectionId));

    try {
      const response = await fetch("/api/delete-coll", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collectionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete");
        if (deletedCollection) {
          setCollections((prev) => [...prev, deletedCollection]);
        }
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed");
      if (deletedCollection) {
        setCollections((prev) => [...prev, deletedCollection]);
      }
    }
  };

  if (loading) {
    return <div className="text-white text-center py-20">Checking authentication...</div>;
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
          <p className="mb-4">You are not authorized to access this page.</p>
          <button
            onClick={() => router.push("/login")}
            className="border-white border-[1px] text-white px-4 py-1 shadow-md transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-white">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-black p-6 py-20 border-b md:border-b-0 md:border-r">
        <div className="mb-6">
          <a href="/collection" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 flex items-center justify-center gap-2">
            <Plus size={16} /> Create Collection
          </a>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Private Collections</h3>
          <ul className="mb-4">
            {collections.filter((c) => c.collectionType === "private").map((c) => (
              <li key={c.id} className="py-2 px-2bg-zinc-900 mb-1">{c.collectionName}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-2">Public Collections</h3>
          <ul>
            {collections.filter((c) => c.collectionType=== "public").map((c) => (
              <li key={c.id} className="py-2 px-2 bg-zinc-900 mb-1">{c.collectionName}</li>
            ))}
          </ul>
        </div> 
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 bg-black py-20 p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Manage Collections</h2>
        {collLoading ? <h3>Loading...</h3> : null}
        <div>
          {collections.map((collection) => (
            <div key={collection.id} className="flex flex-col md:flex-row justify-between items-center bg-zinc-900 p-4 mb-2">
              <span className="text-lg mb-2 md:mb-0">{collection.collectionName}</span>
              <div className="flex gap-4">
                <button className="text-red-400 hover:text-red-500" onClick={() => handleDelete(collection._id)}>
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
