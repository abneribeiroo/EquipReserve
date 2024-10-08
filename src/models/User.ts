import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
  generateToken(): Promise<string>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'] // Enum for user roles
  },
  createdAt: {
    type: Date,
    default: Date.now // Use Date.now to return a Date object
  }
});

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.username = this.username.toLowerCase();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function (): Promise<string> {
  return jwt.sign({ userId: this._id }, process.env.SECRET_KEY as string, {
    expiresIn: 86400
  });
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;