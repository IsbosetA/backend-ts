import { UserRepository } from "@repositoriesuserRepositories";
import { UserService } from "@servicesuserServices";
import { IUserService, User } from "types/UserTypes";
import { Router } from "express";

const router = Router();

const userRepository: UserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export default () => {
    router.get("/health", (req, res) => {
      res.send("Api is Healthy!");
    });

		//User Routes
		router.get("/users", async(req, res) => {
			const users = await userService.findUsers();
			res.json(users);
		});

		router.post("/users", async (req, res) => {
			const newUser:User = req.body;
			const result = await userService.createUser(newUser);

			res.json(result)
		});

		router.get("/users/:id", async (req, res) => {
			const user = await userService.findUserById(req.params.id);
			res.json(user);
		});

		router.put("/users/:id", async (req, res) => {
			const user = await userService.updateUser(req.params.id, req.body);
			res.json(user);
		});

		router.delete("/users/:id", async (req, res) => {
			const user = await userService.deleteUser(req.params.id);
			res.json(user);
		});

    return router;
};