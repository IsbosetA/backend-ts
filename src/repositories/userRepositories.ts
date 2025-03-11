import { UserModel } from "@modelsUsers";
import { IUserRepository, User } from "types/UserTypes";

export class UserRepository implements IUserRepository {

	async create(data: User): Promise<User> {
		const newUser = new UserModel(data)
		return await newUser.save();
	}

	async find(): Promise<User[]> {
		return await UserModel.find().exec();
	}

	async findById(id: string): Promise<User | null> {
		return await UserModel.findById(id).exec();
	}

	async findByEmail(email: string): Promise<User | null> {
		return await UserModel.findOne({ email }).exec();
	}

	async findByUsername(username: string): Promise<User | null> {
		return await UserModel.findOne({ username }).exec();
	}

	async update(id: string, data: Partial<User>): Promise<User | null> {
		return await UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
	}

	async delete(id: string): Promise<boolean> {
		const deleted = await UserModel.findByIdAndDelete(id).exec();
		return deleted !== null;
	}
}