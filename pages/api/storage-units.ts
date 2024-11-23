import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const storageUnits = await prisma.storageUnit.findMany();
      res.status(200).json(storageUnits);
    } catch (error) {
      console.error('Error fetching storage units:', error);
      res.status(500).json({ error: 'Failed to fetch storage units' });
    }
  } else if (req.method === 'POST') {
    const { size, location, price, userId } = req.body;
    try {
      const newStorageUnit = await prisma.storageUnit.create({
        data: {
          size,
          location,
          price,
          userId,
        },
      });
      res.status(201).json(newStorageUnit);
    } catch (error) {
      console.error('Error creating storage unit:', error);
      res.status(500).json({ error: 'Failed to create storage unit' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}