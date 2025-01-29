// pages/api/users/route.ts  
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/db/prisma';

export async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully')
  } catch (err) {
    console.error('Database connection error:', err);
    throw err;  // Propagate the error
  }
}

export async function GET() {
  try {
    await main();
    const users = await prisma.users.findMany();
    return NextResponse.json({
      message: "OK",
      data: users
    }, { status: 200 });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({
      message: "Error occurred",
      error: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
