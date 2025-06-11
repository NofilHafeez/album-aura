import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { client } from "@/sanity/lib/client";

export async function DELETE(request: NextRequest) {
  try {
    const token = cookies().get("token")?.value;
    console.log("→ Token:", token);
    if (!token) throw new Error("No token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    console.log("→ Decoded ID:", decoded.id);

    const { collectionId } = await request.json();
    console.log("→ collectionId:", collectionId);
    if (!collectionId) throw new Error("Missing collectionId");

    const collection = await client.fetch(
      `*[_type=="collection" && _id==$id][0]{ _id, "owner": user->_ref }`,
      { id: collectionId }
    );
    console.log("→ Fetched collection:", collection);
    if (!collection) throw new Error("Collection not found");

    

    await client.delete(collectionId);
    return NextResponse.json({ message: "Deleted" });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("DELETE /api/delete-collection error:", err.message, err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}

