"use client";

import { useState, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

const CreateCollection = () => {
  const [collectionName, setCollectionName] = useState<string>("");
  const [collectionType, setCollectionType] = useState<"private" | "public">("private");
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  // Handle Image Upload
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setUploadedImages((prevImages) => [...prevImages, ...filesArray]);
    }
  };

  // Remove an Image
  const handleRemoveImage = (index: number) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Create Collection (Function Placeholder)
  const handleCreateCollection = () => {
    if (!collectionName.trim() || uploadedImages.length === 0) {
      alert("Please enter a collection name and upload at least one image.");
      return;
    }
    console.log("Collection Created:", { collectionName, collectionType, uploadedImages });
  };

  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Create Collection</h1>

      {/* Upload Box */}
      <label className="w-full max-w-lg h-60 border-2 border-dashed border-gray-500 flex flex-col items-center justify-center cursor-pointer hover:border-white transition">
        <Upload size={40} className="text-gray-400 mb-2" />
        <p className="text-gray-400">Click or Drag & Drop to Upload</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>

      {/* Collection Name & Privacy Options */}
      <div className="w-full max-w-lg mt-6 space-y-4">
        <input
          type="text"
          placeholder="Collection Name"
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />

        {/* Public / Private Toggle Button */}
        <div className="flex items-center justify-center bg-gray-800 p-3 rounded-md">
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

        {/* Create Collection Button */}
        <button
          onClick={handleCreateCollection}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md text-lg font-semibold transition"
        >
          Create Collection
        </button>
      </div>

      {/* Uploaded Images Preview - Full Width */}
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
