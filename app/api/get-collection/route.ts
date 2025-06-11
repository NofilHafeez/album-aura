import {NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { client } from '@/sanity/lib/client';

export async function GET() {
  try {
    const token = cookies().get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const userId = decoded.id;

    const collections = await client.fetch(
      `*[_type == "collection" && user._ref == $userId]{
        _id,
        collectionName,
        collectionType, 
        user->{name, image}
      }`,
      { userId }
    );
console.log('Fetched collections:', collections);
    return NextResponse.json(collections);
  } catch (error) {
    console.error('Fetch user collections error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
