import Pool from "pg-pool";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env);

const pool = new Pool({
  database: process.env.DB_NAME || "", // Ajoutez une chaîne vide comme valeur par défaut
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "",
  port: parseInt(process.env.DB_PORT || "5432"), // Ajoutez une valeur par défaut ou ajustez-la selon vos besoins
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 10000,
});

pool.connect((error, client, done) => {
  if (error) {
    console.error(error.message);
    if (done) {
      done(error); // Assurez-vous que done est défini avant de l'appeler
    }
    process.exit(1);
  } else {
    console.log("Connected to database !");
  }

  if (done) {
    done(); // Assurez-vous que done est défini avant de l'appeler
  }
});

export default pool;
