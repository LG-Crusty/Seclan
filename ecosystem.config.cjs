module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "./apps/server",
      script: "pnpm",
      args: "run start",
      env_production: {
        NODE_ENV: "production",
        PORT: 9000,
      },
      max_memory_restart: "1G",
    },
    {
      name: "frontend",
      cwd: "./apps/web",
      script: "pnpm",
      args: "run start", // or index.js
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      max_memory_restart: "1G",
    },
  ],
};
