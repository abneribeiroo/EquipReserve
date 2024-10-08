import { Request, Response } from 'express';
import Equipment from '../models/Equipment';

// Extend the Request type to include userId
interface CustomRequest extends Request {
  userId?: string;
}

class EquipmentController {
  async createEquipment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { name, description, quantity } = req.body;
      const equipment = new Equipment({ name, description, quantity, owner: req.userId });
      await equipment.save();
      res.status(201).json({ message: "Equipment registered successfully." });
    } catch (error: any) {
      res.status(500).json({
        error: error.message,
        message: "Failed to register Equipment.",
      });
    }
  }

  async getAllEquipment(req: Request, res: Response): Promise<void> {
    try {
      const equipment = await Equipment.find();
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(500).json({ error: error.message, message: "Failed to find Equipment" });
    }
  }

  async getEquipmentById(req: Request, res: Response): Promise<void> {
    try {
      const equipment = await Equipment.findById(req.params.equipmentId);
      if (!equipment) {
        res.status(404).json({ message: "Equipment not found" });
        return;
      }
      res.status(200).json(equipment);
    } catch (error: any) {
      res.status(500).json({ error: error.message, message: "Failed to find Equipment" });
    }
  }

  async updateEquipment(req: Request, res: Response): Promise<void> {
    try {
      const equipmentId = req.params.equipmentId;
      const updatedEquipment = await Equipment.findByIdAndUpdate(
        equipmentId,
        req.body,
        { new: true }
      );
      if (!updatedEquipment) {
        res.status(404).json({ message: "Equipment not found" });
        return;
      }
      res.status(200).json(updatedEquipment);
    } catch (error: any) {
      res.status(500).json({ error: error.message, message: "Failed to update Equipment" });
    }
  }

  async deleteEquipment(req: Request, res: Response): Promise<void> {
    try {
      const equipmentId = req.params.equipmentId;
      const deletedEquipment = await Equipment.findByIdAndDelete(equipmentId);
      if (!deletedEquipment) {
        res.status(404).json({ message: "Equipment not found" });
        return;
      }
      res.status(204).json({ message: "Equipment deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message, message: "Failed to delete Equipment" });
    }
  }
}

export default new EquipmentController();