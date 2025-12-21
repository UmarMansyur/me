import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async () => {
	const profile = await prisma.profile.findFirst();
	return new Response(JSON.stringify(profile), { headers: { 'Content-Type': 'application/json' } });
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	
	const existingProfile = await prisma.profile.findFirst();
	
	let profile;
	if (existingProfile) {
		profile = await prisma.profile.update({
			where: { id: existingProfile.id },
			data: {
				name: data.name,
				title: data.title,
				description: data.description,
				email: data.email,
				phone: data.phone || null,
				location: data.location || null,
				avatarUrl: data.avatarUrl || null,
				github: data.github || null,
				linkedin: data.linkedin || null,
				twitter: data.twitter || null
			}
		});
	} else {
		profile = await prisma.profile.create({
			data: {
				name: data.name,
				title: data.title || '',
				description: data.description || '',
				email: data.email,
				phone: data.phone || null,
				location: data.location || null,
				avatarUrl: data.avatarUrl || null,
				github: data.github || null,
				linkedin: data.linkedin || null,
				twitter: data.twitter || null
			}
		});
	}

	return new Response(JSON.stringify(profile), { headers: { 'Content-Type': 'application/json' } });
};
