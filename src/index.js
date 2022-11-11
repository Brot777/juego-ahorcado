import "dotenv/config";
import express from "express";
import { PORT } from "./config.js";
import "./database.js";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/players.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const urlStatic = join(__dirname, "build");
console.log(urlStatic);

/* MIDDLEWARES */
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

/* RUTES */
app.use("/api/players", router);

/* STATIC FILES */
app.use(express.static(urlStatic));

/* STARTING SERVER */
app.listen(PORT);
console.log("server on port", PORT);
