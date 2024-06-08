import {NextRequest,NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const { nextUrl: url, geo } = req;
    const country = geo ? geo.country || 'US': 'CAN';

    url.searchParams.set('country', country);

    return NextResponse.rewrite(url);
}