import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const skills = await prisma.skill.findMany({
		orderBy: { order: 'asc' }
	});

	return new Response(JSON.stringify(skills), {
		headers: { 'Content-Type': 'application/json' }
	});
};
