module.exports = {
  apps: [
    {
      name: 'jcwd270201.purwadhikabootcamp.com',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2721,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/jcwd270201.purwadhikabootcamp.com/apps/web',
    },
    {
      name: 'jcwd270201api.purwadhikabootcamp.com',
      script: 'npm',
      args: 'run serve',
      env: {
        PORT: 2722,
        NODE_ENV: 'production',
      },
      cwd: '/var/www/html/jcwd270201.purwadhikabootcamp.com/apps/api',
    },
  ],
};
