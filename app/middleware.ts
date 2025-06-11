import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { client } from '@/sanity/lib/client';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    // Fetch user from Sanity
    const user = await client.fetch(
      `*[_type == "user" && _id == $userId][0]{
        _id,
        name,
        email,
        role
      }`,
      { userId: decoded.id }
    );

    if (!user) {
      throw new Error('User not found');
    }

    // Clone the request headers and add user data
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', user._id);
    requestHeaders.set('x-user-email', user.email);
    requestHeaders.set('x-user-role', user.role);

    // Continue with the modified request
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Specify which routes should use this middleware
export const config = {
  matcher: ['/dashboard', '/profile', '/collection'],
};