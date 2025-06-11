"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/UserContext";

const CreateCollection = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionType, setCollectionType] = useState<"private" | "public">("private");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);


  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setUploadedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleCreateCollection = async () => {
    if (!collectionName.trim() || uploadedImages.length === 0) {
      alert("Please enter a collection name and upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("collectionName", collectionName);
    formData.append("collectionType", collectionType);
    uploadedImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await fetch("/api/create-collection", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Collection created successfully!");
        setCollectionName("");
        setCollectionType("private");
        setUploadedImages([]);
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed.");
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
    <div className="flex flex-col min-h-screen items-center bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Create Collection</h1>

      {/* Upload Box */}
      <label className="w-full max-w-lg h-60 border-2 border-dashed border-gray-500 flex flex-col items-center justify-center cursor-pointer hover:border-white transition">
        <Upload size={40} className="text-gray-400 mb-2" />
        <p className="text-gray-400">Click or Drag & Drop to Upload</p>
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
      </label>

      {/* Collection Name & Privacy Options */}
      <div className="w-full max-w-lg mt-6 space-y-4">
        <input
          type="text"
          placeholder="Collection Name"
          className="w-full p-3 bg-zinc-900 border border-gray-700 rounded-md focus:outline-none "
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />

        <div className="flex items-center justify-center bg-zinc-900 p-3 rounded-md">
          <button
            className={`w-1/2 text-center py-2 rounded-l-md transition ${
              collectionType === "private" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCollectionType("private")}
          >
            Private
          </button>
          <button
            className={`w-1/2 text-center py-2 rounded-r-md transition ${
              collectionType === "public" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setCollectionType("public")}
          >
            Public
          </button>
        </div>

        <button
          onClick={handleCreateCollection}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition"
        >
          Create Collection
        </button>
      </div>

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="w-full mt-6 px-6">
          <h2 className="text-lg font-semibold mb-2">Uploaded Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {uploadedImages.map((file, index) => (
              <div key={index} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Uploaded"
                  className="w-full h-[400px] object-cover rounded-md"
                  onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCollection;
