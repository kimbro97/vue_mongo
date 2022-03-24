import { Router } from "express";
import controller from "./user.controller.js";;

const router = Router();

router.post('/login', controller.loginUser);
router.post('/signup', controller.createUser);
router.post('/logout', controller.logoutUser);
router.delete('/:id', controller.deleteUser);
router.put('/:id', controller.updateUser)

export default router;
