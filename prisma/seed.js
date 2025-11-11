import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const seedData = [
    {
      title: 'Inception',
      type: 'MOVIE',
      director: 'Christopher Nolan',
      budget: 160000000,
      location: 'Los Angeles',
      duration: 148,
      year: 2010,
    },
    {
      title: 'The Dark Knight',
      type: 'MOVIE',
      director: 'Christopher Nolan',
      budget: 185000000,
      location: 'Gotham City',
      duration: 152,
      year: 2008,
    },

    {
      title: 'Welcome to derry',
      type: 'TV_SHOW',
      director: 'giret',
      budget: 3000000,
      location: 'Albuquerque',
      duration: 5, 
      year: 2008,
    },
    {
      title: 'Stranger Things',
      type: 'TV_SHOW',
      director: 'The Duffer Brothers',
      budget: 120000000,
      location: 'Hawkins',
      duration: 34, 
      year: 2016,
    },
  ];

  for (const entry of seedData) {
    await prisma.entry.create({ data: entry });
  }

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
