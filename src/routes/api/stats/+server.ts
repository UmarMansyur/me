import type { RequestHandler } from './$types';
import prisma from '$lib/server/db';

export const GET: RequestHandler = async ({ request }) => {
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
		request.headers.get('x-real-ip') || 
		'unknown';

	const [visitors, likes, dislikes, userReaction] = await Promise.all([
		prisma.visitor.count(),
		prisma.reaction.count({ where: { type: 'like' } }),
		prisma.reaction.count({ where: { type: 'dislike' } }),
		prisma.reaction.findUnique({ where: { ip } })
	]);

	return new Response(JSON.stringify({
		visitors,
		likes,
		dislikes,
		userReaction: userReaction?.type || null
	}), {
		headers: { 'Content-Type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
		request.headers.get('x-real-ip') || 
		'unknown';
	const userAgent = request.headers.get('user-agent') || null;

	const data = await request.json();
	const action = data.action;

	if (action === 'visit') {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		
		const existingVisit = await prisma.visitor.findFirst({
			where: {
				ip,
				createdAt: { gte: today }
			}
		});

		if (!existingVisit) {
			await prisma.visitor.create({
				data: { ip, userAgent }
			});
		}
	} else if (action === 'like' || action === 'dislike') {
		const existing = await prisma.reaction.findUnique({ where: { ip } });
		
		if (existing) {
			if (existing.type === action) {
				await prisma.reaction.delete({ where: { ip } });
			} else {
				await prisma.reaction.update({
					where: { ip },
					data: { type: action }
				});
			}
		} else {
			await prisma.reaction.create({
				data: { ip, type: action }
			});
		}
	}

	const [visitors, likes, dislikes, userReaction] = await Promise.all([
		prisma.visitor.count(),
		prisma.reaction.count({ where: { type: 'like' } }),
		prisma.reaction.count({ where: { type: 'dislike' } }),
		prisma.reaction.findUnique({ where: { ip } })
	]);

	return new Response(JSON.stringify({
		visitors,
		likes,
		dislikes,
		userReaction: userReaction?.type || null
	}), {
		headers: { 'Content-Type': 'application/json' }
	});
};
