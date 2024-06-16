import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

import mysql from 'mysql2/promise';

export const mysqlConnection = async () => {
  const regex = /mysql:\/\/root:([^@]+)@/;
  const match = (process.env.DATABASE_URL as string).match(regex);
  let password: string;
  if (match) {
    password = match[1];
  } else {
    password = '';
    console.error('Password not found in the connection string.');
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'finpro',
  });

  return connection;
};
