import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

import mysql from 'mysql2/promise';

export const mysqlConnection = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  return connection;
};

export const redisConfig = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    tls: true,
    enableTLSForSentinelMode: false,
  },
};
