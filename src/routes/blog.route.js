import { Router } from "express";
import { importFromFile, index, search, store } from "../Controllers/BlogController.js";

const router = Router();

router.get('/', index);
router.post('/create', store);
router.get('/search', search);
router.post('/import', importFromFile);



export default router;