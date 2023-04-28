import { NextResponse } from 'next/server';
import { getAllErrors } from '../comum';

export const ROUTE = 'RedefineSenha';

export async function POST(req) {
    var args = {
       method: 'POST',
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': process.env.API_KEY,
          'x-client-name': process.env.API_CLIENT
       },
       cache: 'no-store',
       body: JSON.stringify(await req.json())
    };
    const res = await fetch(process.env.API_URL + ROUTE, args);
    if (res.status === 200) {
       const data = await res.json();
       return NextResponse.json(data);
    }
    else {
       let errorMessage = await getAllErrors(await res.json());
       return new NextResponse(null, { status: 400, statusText: errorMessage });
    }
 }