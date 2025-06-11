import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { client } from '@/sanity/lib/client';

export async function GET() {
  const token = cookies().get('token')?.value;
  console.log('Token:', token); // DEBUG

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
    console.log('Decoded ID:', decoded.id); // DEBUG

    const user = await client.fetch(
      `*[_type == "user" && _id == $userId][0]{
        _id,
        name,
        email,
        role
      }`,
      { userId: decoded.id }
    );

    console.log('Fetched User:', user); // DEBUG

    if (!user) {
      return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ user: null }, { status: 403 });
  }
}
