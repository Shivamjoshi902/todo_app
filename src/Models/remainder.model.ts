import mongoose, { Schema, model, Document } from 'mongoose';
import { ITask } from '@/Models/task.model';

export interface IReminder extends Document {
  reminderDate: Date;
  task: ITask['_id'];
  user: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ReminderSchema = new Schema<IReminder>({
  reminderDate: { type: Date, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Reminder = mongoose.models.Remainder as mongoose.Model<IReminder>|| model<IReminder>('Reminder', ReminderSchema);
export default Reminder;
