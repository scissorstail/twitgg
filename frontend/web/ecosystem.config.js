module.exports = {
  apps: [{
    name: 'web',
    script: './.output/server/index.mjs',
    instances: -1,
    exec_mode: 'cluster',
    merge_logs: true,
    autorestart: true
  }]
}
