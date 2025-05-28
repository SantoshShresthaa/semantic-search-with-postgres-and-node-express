import axios from "axios";
import huggingface from "../config/huggingface.js";

export default async function getVectorEmbeddings (context) {
        const hfToken = huggingface.HF_TOKEN;
        const endPointUrl = huggingface.HF_ENDPOINT_URL;

        const requestData = {
            "inputs" : context
        };

        const vectorEmbeddings = await axios.post(endPointUrl, requestData, {
            headers: {
                Authorization: `Bearer ${hfToken}`,
                "Content-Type":" application/json"
            }
        });
        
        return vectorEmbeddings;
}