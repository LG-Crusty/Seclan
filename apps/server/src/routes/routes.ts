import { Router } from "express";
import { checkActive } from "../controllers/healthCheck.controller";

const router = Router();


router.route("/check").post(checkActive)
export { router };