import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const PUT: RequestHandler = async ({ params, request }) => {
	const id = parseInt(params.id);
	const data = await request.json();
	const cert = await prisma.certificate.update({
		where: { id },
		data: {
			title: data.title,
			issuer: data.issuer,
			issuerLogo: data.issuerLogo || null,
			credentialId: data.credentialId || null,
			credentialUrl: data.credentialUrl || null,
			issueDate: data.issueDate ? new Date(data.issueDate) : undefined,
			expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
			description: data.description || null
		}
	});
	return new Response(JSON.stringify(cert), { headers: { 'Content-Type': 'application/json' } });
};

export const DELETE: RequestHandler = async ({ params }) => {
	await prisma.certificate.delete({ where: { id: parseInt(params.id) } });
	return new Response(null, { status: 204 });
};
