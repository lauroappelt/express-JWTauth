import {Schema, model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs/dist/bcrypt';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requuired:  true,
        uniquem: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods.show = function (){
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        deleted: this.deleted
    }
};

export default model('User', UserSchema);