// app/api/logout/route.ts

import { cookies } from 'next/headers'

export async function GET() {
  cookies().delete('token')
  return new Response(JSON.stringify({ success: true }), { status: 200 })
}
