import { Router } from "express";
import controller from "./auth.controller.js";;

const router = Router();

router.get('/refreshtoken', controller.getRefreshToken)

export default router;
