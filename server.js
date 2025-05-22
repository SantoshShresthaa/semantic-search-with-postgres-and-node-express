import dotenv from "dotenv";
import app from "./src/app.js";

dotenv.config();

const PORT= process.env.PORT ?? 3000;

app.listen(PORT, () => {
    console.info(`The server is running on port ${PORT}`)
});