import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const testimonials = await prisma.testimonial.findMany({
		where: { isActive: true },
		orderBy: { createdAt: 'desc' }
	});

	return new Response(JSON.stringify(testimonials), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
		request.headers.get('x-real-ip') || 
		'unknown';
	
	const data = await request.json();

	const testimonial = await prisma.testimonial.create({
		data: {
			name: data.name,
			email: data.email || null,
			message: data.message,
			rating: data.rating || 5,
			ip,
			isActive: false
		}
	});

	return new Response(JSON.stringify(testimonial), {
		status: 201,
		headers: { 'Content-Type': 'application/json' }
	});
};
