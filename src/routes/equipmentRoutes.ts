import express from 'express';
import EquipmentController from '../controllers/equipmentController';

const router = express.Router();

// Create new equipment
router.post('/', EquipmentController.createEquipment);

// Get all equipment
router.get('/', EquipmentController.getAllEquipment);

// Get equipment by ID
router.get('/:equipmentId', EquipmentController.getEquipmentById);

// Update equipment
router.put('/:equipmentId', EquipmentController.updateEquipment);

// Delete equipment
router.delete('/:equipmentId', EquipmentController.deleteEquipment);

export default router;