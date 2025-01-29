// pages/api/users/route.ts  
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/db/prisma';

// export async function main() {
//   try {
//     await prisma.$connect();
//   } catch (err) {
//       return Error("DB error")
//   }
  
// }

// export const GET = async () =>{

//   console.log('get')
//   try{
//     await main()
//     const posts = await prisma.post.findMany();
//     return NextResponse.json({
//       message:"OK",posts
//     },{status:200})

//   }catch(err){
//     return NextResponse.json({
//       message:"err",err
//     },{status:500})
//   }finally {
//     await prisma.$disconnect();
//   }
// }

export const GET = async(request: NextRequest)=> {
  console.log('get')
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  

  if (id) {
    // 获取特定用户
    const user = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } else {
    // 获取所有用户
    const users = await prisma.post.findMany();
    return NextResponse.json(users);
  }
}

export const  POST = async (request: NextRequest) =>{
  const { title, description } = await request.json();
  const newUser = await prisma.post.create({
    data: { title, description },
  });
  return NextResponse.json(newUser, { status: 201 });
}

export const  PUT = async (request: NextRequest) =>{
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const { title, description } = await request.json();
  const updatedUser = await prisma.post.update({
    where: { id: Number(id) },
    data: { title, description },
  });
  return NextResponse.json(updatedUser);
}

export const  DELETE= async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  await prisma.post.delete({
    where: { id: Number(id) },
  });
  return new NextResponse(null, { status: 204 });
}


