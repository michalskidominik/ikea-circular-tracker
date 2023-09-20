import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async create(email: string, hashedPassword: string): Promise<User> {
    const newUser = new this.userModel({
      email: email,
      passwordHash: hashedPassword,
    });

    return newUser.save();
  }

  async updateProfile(userId: string, newPassword?: string): Promise<void> {
    const updateData: Partial<User> = {};

    // if (newPassword) {
    //   const hashedPassword = await bcrypt.hash(newPassword, 10);
    //   updateData.passwordHash = hashedPassword;
    // }

    await this.userModel.findByIdAndUpdate(userId, updateData);
  }

  async deleteUser(userId: string): Promise<void> {
    await this.userModel.findByIdAndDelete(userId);
  }

  async trackItem(userId: string, itemId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { trackedItems: itemId },
    });
  }

  async untrackItem(userId: string, itemId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { trackedItems: itemId },
    });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const filter = { email };
    return await this.userModel.findOne(filter).exec();
  }

  async findById(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user;
  }
}
