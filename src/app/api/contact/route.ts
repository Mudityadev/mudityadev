import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email, message } = await req.json();
    console.log('POST request received:', { email, message });
    // if (!email || !message) {
    //   return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
    // }
    // const contact = await prisma.contact.create({
    //   data: { email, message },
    // });
    // return NextResponse.json({ success: true, contact });
    
    // Temporary response while implementation is commented out
    return NextResponse.json({ message: 'POST endpoint not yet implemented' });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    console.log('GET request received');
    // const messages = await prisma.contact.findMany({
    //   orderBy: { createdAt: 'desc' },
    // });
    // return NextResponse.json({ messages });
    
    // Temporary response while implementation is commented out
    return NextResponse.json({ message: 'GET endpoint not yet implemented' });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, replied } = await req.json();
    console.log('PATCH request received:', { id, replied });
    // if (!id || typeof replied !== 'boolean') {
    //   return NextResponse.json({ error: 'ID and replied field are required.' }, { status: 400 });
    // }
    
    // const contact = await prisma.contact.update({
    //   where: { id },
    //   data: { replied },
    // });
    // return NextResponse.json({ success: true, contact });
    
    // Temporary response while implementation is commented out
    return NextResponse.json({ message: 'PATCH endpoint not yet implemented' });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log('DELETE request received');
    // const { id } = await req.json();
    // if (!id) {
    //   return NextResponse.json({ error: 'ID is required.' }, { status: 400 });
    // }
    
    // await prisma.contact.delete({
    //   where: { id },
    // });
    // return NextResponse.json({ success: true });
    
    // Temporary response while implementation is commented out
    return NextResponse.json({ message: 'DELETE endpoint not yet implemented' });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
} 