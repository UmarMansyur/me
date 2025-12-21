import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const experiences = await prisma.experience.findMany({ orderBy: { order: 'asc' } });
	return new Response(JSON.stringify(experiences), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const exp = await prisma.experience.create({
		data: {
			company: data.company,
			position: data.position,
			description: data.description || '',
			jobType: data.jobType || 'Fulltime',
			companyLogo: data.companyLogo || null,
			startDate: data.startDate ? new Date(data.startDate) : new Date(),
			endDate: data.current ? null : (data.endDate ? new Date(data.endDate) : new Date()),
			current: data.current || false
		}
	});
	return new Response(JSON.stringify(exp), { status: 201, headers: { 'Content-Type': 'application/json' } });
};
