module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL:
    process.env.DATABASE_URL ||
    'postgres://fhmuzfdppwaoke:b279f8294d3880c5f71861816b5c13c9b740604bc45adea16558d030c65382a6@ec2-54-221-236-144.compute-1.amazonaws.com:5432/d99r19rafkodnv',
  CLIENT_ORIGIN: 'https://payman-irem-petful-app.now.sh'
};
