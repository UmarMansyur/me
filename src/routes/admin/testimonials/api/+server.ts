import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const testimonials = await prisma.testimonial.findMany({
		orderBy: { createdAt: 'desc' }
	});
	return new Response(JSON.stringify(testimonials), { headers: { 'Content-Type': 'application/json' } });
};

export const PUT: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const testimonial = await prisma.testimonial.update({
		where: { id: data.id },
		data: { isActive: data.isActive }
	});
	return new Response(JSON.stringify(testimonial), { headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: RequestHandler = async ({ request }) => {
	const data = await request.json();
	await prisma.testimonial.delete({ where: { id: data.id } });
	return new Response(null, { status: 204 });
};
