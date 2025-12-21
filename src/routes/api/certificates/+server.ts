import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const certificates = await prisma.certificate.findMany({
		orderBy: [{ issueDate: 'desc' }]
	});

	return new Response(JSON.stringify(certificates), {
		headers: { 'Content-Type': 'application/json' }
	});
};
