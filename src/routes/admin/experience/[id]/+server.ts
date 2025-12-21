import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const PUT: RequestHandler = async ({ params, request }) => {
	const id = parseInt(params.id);
	const data = await request.json();
	const exp = await prisma.experience.update({
		where: { id },
		data: {
			company: data.company,
			position: data.position,
			description: data.description || '',
			jobType: data.jobType || 'Fulltime',
			companyLogo: data.companyLogo || null,
			startDate: data.startDate ? new Date(data.startDate) : undefined,
			endDate: data.current ? null : (data.endDate ? new Date(data.endDate) : undefined),
			current: data.current || false
		}
	});
	return new Response(JSON.stringify(exp), { headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: RequestHandler = async ({ params }) => {
	await prisma.experience.delete({ where: { id: parseInt(params.id) } });
	return new Response(null, { status: 204 });
};
