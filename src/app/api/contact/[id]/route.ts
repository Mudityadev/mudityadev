import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try { 
    console.log('PATCH request for message ID:', params.id);
    const body = await req.json();
    console.log('Request body:', body);
    
    const { replied } = body;
    
    if (typeof replied !== 'boolean') {
      return NextResponse.json({ error: 'replied field must be a boolean' }, { status: 400 });
    }
    
    const contact = await prisma.contact.update({
      where: { id: params.id },
      data: { replied },
    });
    
    console.log('Updated contact:', contact);
    return NextResponse.json({ success: true, contact });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json({ error: 'Failed to update message.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contact.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message.' }, { status: 500 });
  }
} 