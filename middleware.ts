import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(req: NextRequest) {
    const isAuthenticated = req.cookies.get('isAuth')?.value === 'true';
    const protectedRoutes = ['/login', '/register'];

    if (isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) return NextResponse.redirect(new URL('/', req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ['/login', '/register'],
};
