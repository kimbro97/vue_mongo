import { Router } from "express";
import controller from "./user.controller.js";;

const router = Router();

router.post('/login', controller.loginUser);
router.post('/signup', controller.createUser);
router.post('/logout', controller.logoutUser);
router.delete('/', controller.deleteUser);
router.put('/', controller.updateUser)
router.get('/', controller.getUserInfo)

export default router;
