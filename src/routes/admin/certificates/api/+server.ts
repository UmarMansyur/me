import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const certificates = await prisma.certificate.findMany({ orderBy: { order: 'asc' } });
	return new Response(JSON.stringify(certificates), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const cert = await prisma.certificate.create({
		data: {
			title: data.title,
			issuer: data.issuer,
			issuerLogo: data.issuerLogo || null,
			credentialId: data.credentialId || null,
			credentialUrl: data.credentialUrl || null,
			issueDate: new Date(data.issueDate),
			expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
			description: data.description || null
		}
	});
	return new Response(JSON.stringify(cert), { status: 201, headers: { 'Content-Type': 'application/json' } });
};
