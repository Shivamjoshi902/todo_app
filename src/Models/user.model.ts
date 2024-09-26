import mongoose, { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  projects: Schema.Types.ObjectId[];
  tasks: Schema.Types.ObjectId[];
  teams: Schema.Types.ObjectId[];
  verifyToken : String,
  verifyTokenExpiry : Date,
  isVerified : Boolean,
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, "userName is required"],
        unique: true, trim : true 
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: { 
        type: String, 
        required: [true, "password is required"],
    },
    projects: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Project'
    }],
    tasks: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Task' 
    }],
    teams: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Team' 
    }],
    verifyToken : {
        type : String,
        required : [true, "verifyToken is required"],
    },
    verifyTokenExpiry : {
        type : Date,
        required : [true, "verifyTokenExpiry is required"],
    },
    isVerified : {
        type : Boolean,
        default : false,
    },
  }, { timestamps: true });

const User = mongoose.models.User as mongoose.Model<IUser> || model<IUser>('User', UserSchema);

export default User;