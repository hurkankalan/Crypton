import Pool from "pg-pool";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env);

const pool = new Pool({
  database: process.env.DB_NAME || "",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "5432"),
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.connect((error, client, done) => {
  if (error) {
    console.error(error.message);

    if (done) {
      done(error);
    }

    process.exit(1);
  } else {
    console.log("Connected to database !");
  }

  if (done) {
    done();
  }
});

export default pool;
