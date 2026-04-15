import { NextResponse } from 'next/server';
import { appointmentsTable } from '@/app/db/schema';
import { db } from '@/app/db';


export async function POST(req: Request) {
  const data = await req.json();

  await db.insert(appointmentsTable).values(data);

  return NextResponse.json({ success: true });
}