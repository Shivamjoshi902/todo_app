import mongoose, { Schema, model, Document } from 'mongoose';
import { IUser } from '@/Models/user.model';

export interface IProject extends Document {
  title: string;
  description?: string;
  owner: IUser['_id'];
  members: IUser['_id'][];
  tasks: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: { 
    type: String, 
    required: [true, "title is required"] 
},
  description: { 
    type: String 
},
  owner: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, "please define the owner"]
},
  members: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User'
}],
  tasks: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Task'
}]
}, { timestamps: true });

const Project = mongoose.models.Project as mongoose.Model<IProject> || model<IProject>('Project', ProjectSchema);
export default Project;
