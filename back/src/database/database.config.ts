import Pool from "pg-pool";

const pool = new Pool({
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.connect((error, client, done) => {
  if (error) {
    console.error(error.message);
    done(error);
    process.exit(1);
  } else {
    console.log("Connected to database !");
  }

  done();
});

export default pool;
