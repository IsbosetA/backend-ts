import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface User extends Document {
	id: string;
	name: string;
	username: string;
	email: string;
	password: string;
	comparePassword(password: string): Promise<boolean>
}

export interface IUserRepository extends Repository<User> {
	findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
	createUser(user: User): Promise<User>;
	findUsers(): Promise<User[]>;
	findUserById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	updateUser(id: string, user: Partial<User>): Promise<User | null>;
	deleteUser(id: string): Promise<boolean>;
}