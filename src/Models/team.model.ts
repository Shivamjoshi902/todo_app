import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser } from '@/Models/user.model';

export interface ITeam extends Document {
  teamName: string;
  leader: IUser['_id'];
  members: IUser['_id'][];
  projects: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema: Schema<ITeam> = new Schema<ITeam>({
  teamName: { type: String, required: true },
  leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]
}, { timestamps: true });

const Team =mongoose.models.Team as mongoose.Model<ITeam> || model<ITeam>('Team', TeamSchema);
export default Team;
