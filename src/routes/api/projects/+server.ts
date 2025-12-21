import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async ({ url }) => {
	const featured = url.searchParams.get('featured');
	
	const projects = await prisma.project.findMany({
		where: featured === 'true' ? { featured: true } : undefined,
		orderBy: { order: 'asc' }
	});

	return new Response(JSON.stringify(projects), {
		headers: { 'Content-Type': 'application/json' }
	});
};
