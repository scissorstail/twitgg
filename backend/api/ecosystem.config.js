module.exports = {
  apps: [{
    name: 'api',
    script: './src/index.js',
    instances: 4,
    exec_mode: 'cluster',
    merge_logs: true,
    autorestart: true,
    watch: process.env.NODE_ENV === 'development',
    ignore_watch: [
      '.git',
      'node_modules',
    ],
  }],
};
