import { RolesRepository } from "@repositories/rolesRepositories";
import { RolesService } from "@services/rolesService";
import { Request, Response } from "express";
import { IRolesService, Roles } from "types/RolesTypes";

const rolesRepository: RolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository);

export const findRoles = async (req: Request, res: Response) => {
	try {
		const roles = await rolesService.findRoles();

		if (roles.length == 0)
			return res.status(404).json({ message: "Not Roles found." });

		res.json(roles);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};

export const findRolesById = async (req: Request, res: Response) => {
	try {
		const role = await rolesService.findRolesById(req.params.id);

		if (!role) return res.status(404).json({ message: "Not Role found." });

		res.json(role);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};

export const createRoles = async (req: Request, res: Response) => {
	try {
		const newUser: Roles = req.body;
		const result = await rolesService.createRoles(newUser);

		res.status(201).json(result);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(400).json(e);
	}
};

export const updateRoles = async (req: Request, res: Response) => {
	try {
		const role = await rolesService.updateRoles(req.params.id, req.body);

		if (!role) return res.status(404).json({ message: "Not Roles found." });
		
		res.json(role);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(400).json(e);
	}
};

export const deleteRoles = async (req: Request, res: Response) => {
	try {
		const role = await rolesService.deleteRoles(req.params.id);

		if (!role) return res.status(404).json({ message: "Not Roles found." });
		
		res.json(role);
	} catch (e) {
		console.log(`Error >>> ${e}`);
		res.status(500).json(e);
	}
};
