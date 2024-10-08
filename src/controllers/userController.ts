import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });

      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      await user.save();
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message, message: "Failed to register user." });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await User.find();
      if (users.length === 0) {
        res.status(404).json({ message: "No users found" });
        return;
      }
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({ message: "Incorrect email or password" });
        return;
      }
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Incorrect email or password" });
        return;
      }
      const token = await user.generateToken();
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
      if (!updatedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(204).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message, message: "Failed to delete user" });
    }
  }
}

export default new UserController();