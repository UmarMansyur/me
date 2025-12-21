import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ cookies }) => {
  const sessionId = cookies.get('admin_session');

  if (!sessionId) {
    return json({ authenticated: false });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(sessionId) }
    });

    if (!admin) {
      cookies.delete('admin_session', { path: '/' });
      return json({ authenticated: false });
    }

    return json({ authenticated: true, username: admin.username });
  } catch {
    return json({ authenticated: false });
  }
};
