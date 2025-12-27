
import { prisma } from '$lib/server/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const post = await prisma.blogPost.findUnique({
        where: { slug: params.slug, published: true }
    });

    if (!post) throw error(404, 'Post not found');

    await prisma.blogPost.update({
        where: { id: post.id },
        data: { views: { increment: 1 } }
    });

    return {
        post: {
            ...post,
            contentHtml: post.content
        }
    };
};

