import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const skills = await prisma.skill.findMany({ orderBy: { order: 'asc' } });
	return new Response(JSON.stringify(skills), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const skill = await prisma.skill.create({
		data: { name: data.name, icon: data.icon || null, category: data.category }
	});
	return new Response(JSON.stringify(skill), { status: 201, headers: { 'Content-Type': 'application/json' } });
};
