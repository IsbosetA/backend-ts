import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { Request, Response } from "express";
import { IUserService, User } from "types/UserTypes";

const userRepository: UserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const findUsers = async (req: Request, res: Response) => {
	try {
		const users = await userService.findUsers();

		if (users.length == 0)
			return res.status(404).json({ message: "Not users found." });

		res.json(users);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};

export const findUserById = async (req: Request, res: Response) => {
	try {
		const user = await userService.findUserById(req.params.id);

		if (!user) return res.status(404).json({ message: "Not user found." });

		res.json(user);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};

export const createUser = async (req: Request, res: Response) => {
	try {
		const newUser: User = req.body;
		const result = await userService.createUser(newUser);

		res.status(201).json(result);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(400).json(e);
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.updateUser(req.params.id, req.body);

		if (!user) return res.status(404).json({ message: "Not user found." });
		
		res.json(user);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(400).json(e);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await userService.deleteUser(req.params.id);

		if (!user) return res.status(404).json({ message: "Not user found." });
		
		res.json(user);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};
