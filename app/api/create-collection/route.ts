import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      name: string;
      email: string;
    };

    const formData = await request.formData();
    const collectionName = formData.get("collectionName")?.toString();
    const collectionType = formData.get("collectionType")?.toString();
    const images = formData.getAll("images") as File[];

    if (!collectionName || !collectionType || images.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const imageRefs = [];

    for (const image of images) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const uploadedImage = await client.assets.upload("image", buffer, {
        filename: image.name,
      });

      imageRefs.push({
        _type: "image",
        asset: {
          _type: "reference",
          _ref: uploadedImage._id,
        },
      });
    }

    const imageRefsWithKeys = imageRefs.map((ref) => ({
      ...ref,
      _key: uuidv4(),
    }));

    const newCollection = await client.create({
      _type: "collection",
      collectionName,
      collectionType,
      images: imageRefsWithKeys,
      user: {
        _type: "reference",
        _ref: decoded.id, // ✅ Reference the logged-in user's ID
      },
    });

    return NextResponse.json({ message: "Collection created successfully", data: newCollection });
  } catch (error) {
    console.error("Error uploading images to Sanity:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
