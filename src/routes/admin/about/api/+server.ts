import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const contents = await prisma.aboutContent.findMany({
		orderBy: { order: 'asc' }
	});
	return new Response(JSON.stringify(contents), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	
	const existing = await prisma.aboutContent.findUnique({
		where: { section: data.section }
	});

	let content;
	if (existing) {
		content = await prisma.aboutContent.update({
			where: { section: data.section },
			data: {
				title: data.title,
				content: data.content,
				order: data.order || 0
			}
		});
	} else {
		content = await prisma.aboutContent.create({
			data: {
				section: data.section,
				title: data.title,
				content: data.content,
				order: data.order || 0
			}
		});
	}

	return new Response(JSON.stringify(content), { headers: { 'Content-Type': 'application/json' } });
};
