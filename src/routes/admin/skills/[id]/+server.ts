import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const PUT: RequestHandler = async ({ params, request }) => {
	const id = parseInt(params.id);
	const data = await request.json();
	const skill = await prisma.skill.update({
		where: { id },
		data: { name: data.name, icon: data.icon || null, category: data.category }
	});
	return new Response(JSON.stringify(skill), { headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: RequestHandler = async ({ params }) => {
	await prisma.skill.delete({ where: { id: parseInt(params.id) } });
	return new Response(null, { status: 204 });
};
