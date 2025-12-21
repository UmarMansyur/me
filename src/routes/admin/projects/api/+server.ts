import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const projects = await prisma.project.findMany({
		orderBy: { order: 'asc' }
	});

	return new Response(JSON.stringify(projects), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	const project = await prisma.project.create({
		data: {
			title: data.title,
			slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
			description: data.description,
			content: data.content || null,
			imageUrl: data.imageUrl || null,
			liveUrl: data.liveUrl || null,
			sourceUrl: data.sourceUrl || null,
			role: data.role || null,
			tags: data.tags || '',
			featured: data.featured || false
		}
	});

	return new Response(JSON.stringify(project), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};
