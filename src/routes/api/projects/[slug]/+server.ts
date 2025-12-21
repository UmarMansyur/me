import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async ({ params }) => {
	const project = await prisma.project.findFirst({
		where: { slug: params.slug }
	});

	if (!project) {
		return new Response(JSON.stringify({ error: 'Project not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(project), {
		headers: { 'Content-Type': 'application/json' }
	});
};
