// app/api/signup/route.ts (App Router)

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const userExists = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (userExists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.create({
      _type: 'user',
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
