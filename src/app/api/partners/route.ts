import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Partner from '@/lib/models/Partner';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const partners = await Partner.find({}).sort({ createdAt: -1 });
      return NextResponse.json({ success: true, count: partners.length, data: partners });
    }
    return NextResponse.json({ success: true, data: [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const conn = await connectToDatabase();

    const partnerId = `PART-${Math.floor(10000 + Math.random() * 90000)}`;
    const newPartnerData = {
      partnerId,
      ...body,
      status: 'Pending',
    };

    if (conn) {
      const newPartner = await Partner.create(newPartnerData);
      return NextResponse.json({ success: true, data: newPartner }, { status: 201 });
    }

    return NextResponse.json({ success: true, data: newPartnerData }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
