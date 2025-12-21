import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const experiences = await prisma.experience.findMany({
		orderBy: [{ current: 'desc' }, { startDate: 'desc' }]
	});

	return new Response(JSON.stringify(experiences), {
		headers: { 'Content-Type': 'application/json' }
	});
};
