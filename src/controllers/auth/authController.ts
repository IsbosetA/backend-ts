import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { IUserService, User } from "types/UserTypes";
import { Request, Response } from "express";
import { secret, alg } from "@config/config";
import * as jwt from 'jose'

const userRepository: UserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email }: User = req.body;
		const userExists = await userService.findByEmail(email);

		if(userExists) return res.status(400).json({message: "Email already exists"});

		const newUser = await userService.createUser(req.body);

		res.status(201).json({
			message: "User Registered Successfully",
			user: newUser
		})
	} catch (e) {
		console.log(`Error >>> ${e}`)
		res.status(500).json(e);
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password }: User = req.body;
		const user = await userService.findByEmail(email);

		if(!user) return res.status(404).json("User Not Found");

		const comparePass = await user.comparePassword(password);

		if(!comparePass) return res.status(400).json("Invalid Password");

		const token = await new jwt.SignJWT({id: user.id, email: user.email, username: user.username}).setProtectedHeader({ alg }).setExpirationTime("1h").sign(secret);

		res.json(token);

	} catch (e) {
		console.log(`Error >>> ${e}`)
		res.status(500).json(e);
	}
}