import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from "@/generated/prisma"; 
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();
    if (!email || !message) {
      return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
    }
    const contact = await prisma.contact.create({
      data: { email, message },
    });
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, replied } = await req.json();
    if (!id || typeof replied !== 'boolean') {
      return NextResponse.json({ error: 'ID and replied field are required.' }, { status: 400 });
    }
    
    const contact = await prisma.contact.update({
      where: { id },
      data: { replied },
    });
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    }
    
    await prisma.contact.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
} 