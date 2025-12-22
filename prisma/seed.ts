import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Admin
  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: 'adminpassword', 
    },
  });
  console.log('Admin created/verified:', admin.username);

  // 2. Profile
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Umar Mansyur',
      title: 'Fullstack Developer',
      description: 'Passionate developer with experience in building web applications.',
      email: 'umar@example.com',
      phone: '+62123456789',
      location: 'Indonesia',
      github: 'https://github.com/umarmansyur',
      linkedin: 'https://linkedin.com/in/umarmansyur',
      avatarUrl: 'https://via.placeholder.com/150',
    },
  });
  console.log('Profile created/verified:', profile.name);

  // 3. Skills
  const skills = [
    { name: 'JavaScript', icon: 'SiJavascript', category: 'Language', order: 1 },
    { name: 'TypeScript', icon: 'SiTypescript', category: 'Language', order: 2 },
    { name: 'React', icon: 'SiReact', category: 'Frontend', order: 3 },
    { name: 'Svelte', icon: 'SiSvelte', category: 'Frontend', order: 4 },
    { name: 'Node.js', icon: 'SiNodedotjs', category: 'Backend', order: 5 },
    { name: 'Prisma', icon: 'SiPrisma', category: 'Backend', order: 6 },
    { name: 'PostgreSQL', icon: 'SiPostgresql', category: 'Database', order: 7 },
  ];

  for (const s of skills) {
    const existing = await prisma.skill.findFirst({ where: { name: s.name } });
    if (!existing) {
      await prisma.skill.create({ data: s });
    }
  }
  console.log('Skills seeded');

  // 4. Projects
  const projects = [
    {
      title: 'Portfolio Website',
      slug: 'portfolio-website',
      description: 'A personal portfolio website built with SvelteKit and Prisma.',
      content: 'Detailed description of the portfolio website project.',
      tags: JSON.stringify(['SvelteKit', 'Prisma', 'TailwindCSS']),
      featured: true,
      order: 1,
    },
    {
      title: 'E-commerce App',
      slug: 'ecommerce-app',
      description: 'A full-featured e-commerce application.',
      content: 'Detailed description of the e-commerce app.',
      tags: JSON.stringify(['React', 'Node.js', 'PostgreSQL']),
      featured: false,
      order: 2,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log('Projects seeded');

  // 5. Experience
  const experiences = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Developer',
      description: 'Leading the development team in building scalable web applications.',
      jobType: 'Fulltime',
      startDate: new Date('2022-01-01'),
      current: true,
      order: 1,
    },
  ];

  for (const exp of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { company: exp.company, position: exp.position }
    });
    if (!existing) {
      await prisma.experience.create({ data: exp });
    }
  }
  console.log('Experiences seeded');

  // 6. AboutContent
  const aboutContents = [
    {
      section: 'background',
      title: 'My Background',
      content: 'I started my journey in web development 5 years ago...',
      order: 1,
    },
    {
      section: 'interests',
      title: 'My Interests',
      content: 'I love learning new technologies and contributing to open source.',
      order: 2,
    },
  ];

  for (const about of aboutContents) {
    await prisma.aboutContent.upsert({
      where: { section: about.section },
      update: about,
      create: about,
    });
  }
  console.log('About content seeded');

  // 7. Certificates
  const certificates = [
    {
      title: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Coursera',
      issueDate: new Date('2023-05-15'),
      description: 'Comprehensive program covering React, JS, and CSS.',
      order: 1,
    }
  ];

  for (const cert of certificates) {
    const existing = await prisma.certificate.findFirst({ where: { title: cert.title } });
    if (!existing) {
      await prisma.certificate.create({ data: cert });
    }
  }
  console.log('Certificates seeded');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
