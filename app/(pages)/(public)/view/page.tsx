"use client";

import Image from "next/image";

const images = [
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1661859079243-24150b97a737?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1683140431958-31505d0fd1ff?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const FullscreenGallery = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Scrollable Image Container */}
      <div className="px-12 pt-20 pb-5 overflow-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {images.map((image, index) => (
            <div key={index} className="relative w-[300px] h-[400px] overflow-hidden rounded-lg group">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullscreenGallery;
