import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const profile = await prisma.profile.findFirst();
	return new Response(JSON.stringify(profile), {
		headers: { 'Content-Type': 'application/json' }
	});
};
