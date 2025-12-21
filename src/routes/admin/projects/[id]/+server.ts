import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const PUT: RequestHandler = async ({ params, request }) => {
	const id = parseInt(params.id);
	const data = await request.json();

	const project = await prisma.project.update({
		where: { id },
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
		headers: { 'Content-Type': 'application/json' }
	});
};

export const DELETE: RequestHandler = async ({ params }) => {
	const id = parseInt(params.id);

	await prisma.project.delete({ where: { id } });

	return new Response(null, { status: 204 });
};
