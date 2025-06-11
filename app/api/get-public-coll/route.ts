// app/api/collections/public/route.ts
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID|| '5832dved';
  const dataset = process.env.SANITY_DATASET || 'production';

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '', 10);
  const offset = (page - 1) * limit;

  const collectionsQuery = encodeURIComponent(`
    *[_type == "collection" && collectionType == "public"] | order(_createdAt desc) [${offset}...${offset + limit}] {
      _id,
      collectionName,
      "coverImage": images[0].asset->url,
      "images": images[].asset->url,
      _createdAt,
      "user": {
        "name": user->name,
        "image": user->image.asset->url
      }
    }
  `);

  const countQuery = encodeURIComponent(`
    count(*[_type == "collection" && collectionType == "public"])
  `);

  const collectionsUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${collectionsQuery}`;
  const countUrl = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}?query=${countQuery}`;

  try {
    const [collectionsRes, countRes] = await Promise.all([
      fetch(collectionsUrl, { headers: { 'Content-Type': 'application/json' }, next: { revalidate: 10 } }),
      fetch(countUrl, { headers: { 'Content-Type': 'application/json' }, next: { revalidate: 10 } }),
    ]);

    if (!collectionsRes.ok || !countRes.ok) {
      throw new Error('Sanity fetch failed');
    }

    const collectionsData = await collectionsRes.json();
    const countData = await countRes.json();

    const result = collectionsData.result;
    const totalCount = countData.result;

    return NextResponse.json({ collections: result, totalCount });
  } catch (error) {
    console.error('Error fetching public collections:', error);
    return NextResponse.json({ error: 'Failed to fetch public collections' }, { status: 500 });
  }
}
