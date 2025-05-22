import dotenv from "dotenv";

dotenv.config();

export default {
    HF_TOKEN : process.env.HF_TOKEN,
    HF_ENDPOINT_URL: process.env.HF_URL
}