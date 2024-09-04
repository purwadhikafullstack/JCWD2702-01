module.exports = {
  apps: [
    {
      name: 'roomer-web',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2721,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/roomer.purwadhikabootcamp.com/apps/web',
    },
    {
      name: 'roomer-api',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2722,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/roomer.purwadhikabootcamp.com/apps/api',
    },
  ],
};
