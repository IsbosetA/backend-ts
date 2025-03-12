import { Router } from "express";
import { createUser, deleteUser, findUserById, findUsers, updateUser } from "@controllers/userController";
import { createRoles, deleteRoles, findRoles, findRolesById, updateRoles } from "@controllersrolesController";
import { login, registerUser } from "@controllersauth/authController";

const router = Router();

export default () => {
    router.get("/health", (req, res) => {
      res.send("Api is Healthy!");
    });

		//Auth Routes
		router.post("/auth/register", registerUser)
		router.post("/auth/login", login)

		//User Routes
		router.get("/users", findUsers);
		router.post("/users", createUser);
		router.get("/users/:id", findUserById);
		router.put("/users/:id", updateUser);
		router.delete("/users/:id", deleteUser);

		//Roles Routes
		router.get("/roles", findRoles);
		router.post("/roles", createRoles);
		router.get("/roles/:id", findRolesById);
		router.put("/roles/:id", updateRoles);
		router.delete("/roles/:id", deleteRoles);

    return router;
};