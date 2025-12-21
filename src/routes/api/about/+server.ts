import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const contents = await prisma.aboutContent.findMany({
		orderBy: { order: 'asc' }
	});
	return new Response(JSON.stringify(contents), { headers: { 'Content-Type': 'application/json' } });
};
