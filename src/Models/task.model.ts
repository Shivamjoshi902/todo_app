import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser } from '@/Models/user.model'
import { IProject } from '@/Models/project.model';

export interface ITask extends Document {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'Low' | 'Medium' | 'High';
  isComplete: boolean;
  project: IProject['_id'];
  assignee: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: [true, "title is required"] },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  isComplete: { type: Boolean, default: false },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignee: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Task = mongoose.models.Task as mongoose.Model<ITask> || model<ITask>('Task', TaskSchema);
export default Task;
