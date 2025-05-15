import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: USER,
  host: HOST,
  database: DATABASE,
  password: PASSWORD,
  port: PORT,
});

db.connect().catch((err) => {
  console.error("Failed to connect to the database:", err);
  process.exit(1);
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


async function checkVisited() {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    return result.rows.map((country) => country.country_code);
  } catch (err) {
    console.error("Error fetching visited countries:", err);
    throw new Error("Database query failed");
  }
}

// Route: GET home page
app.get("/", async (req, res) => {
  try {
    const countries = await checkVisited();
    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while loading the page.");
  }
});


app.post("/add", async (req, res) => {
  const input = req.body["country"].toLowerCase();

  try {
    
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input]
    );

    if (result.rows.length === 0) {
      const countries = await checkVisited();
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country name does not exist. Please try again.",
      });
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode]
      );
      res.redirect("/");
    } catch (err) {
      console.error("Error inserting country:", err);
      const countries = await checkVisited();
      return res.render("index.ejs", {
        countries: countries,
        total: countries.length,
        error: "Country has already been added. Please try again.",
      });
    }
  } catch (err) {
    console.error("Error during country addition:", err);
    const countries = await checkVisited();
    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      error: "An unexpected error occurred. Please try again.",
    });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
