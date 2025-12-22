import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';
import { dev } from '$app/environment';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { username, password } = await request.json();

    console.log(username, password);

    if (!username || !password) {
      return json({ message: 'Username and password are required' }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin || admin.password !== password) {
      return json({ message: 'Invalid username or password' }, { status: 401 });
    }

    cookies.set('admin_session', 'authenticated', {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    });

    return json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return json({ message: 'Internal server error' }, { status: 500 });
  }
};
