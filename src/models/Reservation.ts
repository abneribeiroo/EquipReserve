import mongoose, { Document, Schema } from 'mongoose';
import moment from 'moment';

interface IReservation extends Document {
  user: mongoose.Schema.Types.ObjectId;
  equipment: mongoose.Schema.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  equipment: {
    type: Schema.Types.ObjectId,
    ref: 'Equipment',
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now // Use Date.now to return a Date object
  }
});

const Reservation = mongoose.model<IReservation>('Reservation', reservationSchema);

export default Reservation;