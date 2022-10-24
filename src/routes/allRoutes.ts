import { Router } from "https://deno.land/x/oak/mod.ts";
import {signin} from "../controllers/users.ts";

const router = new Router();


router.post("/api/auth", signin)

export default router;