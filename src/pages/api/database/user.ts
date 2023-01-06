import { Model, Schema, models } from "mongoose";
import createModel from "../../../lib/createModel";

interface IUser {
    username: string,
    email: string,
    password: string,
    providers: [string],
    email_verified: boolean
}

interface IUserMethods {}

type UserModel = Model<IUser, {}, IUser>;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
    username: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    providers: {
        type: [String],
        default: []
    },
    email_verified: {
        type: Boolean,
        default: false
    }
});

export default models.users || createModel<IUser, UserModel>("users", UserSchema);