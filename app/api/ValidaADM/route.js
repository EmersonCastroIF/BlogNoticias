import { NextResponse } from 'next/server';
import { getAllErrors } from '../comum';

export const ROUTE = 'ValidaADM';

export async function GET() {
   const res = await fetch(process.env.API_URL + ROUTE, { cache: 'no-store', headers: { 'x-api-key': process.env.API_KEY, 'x-client-name': process.env.API_CLIENT } });

   if (res.status === 200) {
      const data = await res.json();
      return NextResponse.json(data);
   }
   else {
      const error = await res.text();
      return new NextResponse(null, { status: 400, statusText: error });
   }
}