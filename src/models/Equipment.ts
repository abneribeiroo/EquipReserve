import mongoose, { Document, Schema } from 'mongoose';

interface IEquipment extends Document {
  name: string;
  description: string;
  quantity: number;
  status: 'available' | 'reserved';
  createdAt: Date;
  owner: mongoose.Schema.Types.ObjectId;
}

const equipmentSchema = new Schema<IEquipment>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0  // Ensure quantity is non-negative
  },
  status: {
    type: String,
    enum: ['available', 'reserved'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now // Use Date.now to return a Date object
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Equipment = mongoose.model<IEquipment>('Equipment', equipmentSchema);

export default Equipment;