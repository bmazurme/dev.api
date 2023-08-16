import {
  Schema, Document, model, Model,
} from 'mongoose';

import validator from 'validator';
import isUrl from 'validator/lib/isURL';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  firstName: string;
  secondName: string;
  login: string
  email: string;
  phone: string;
  avatar: string;
  password: string;
  status: string;
  confirmationCode: string;
}

export interface UserModel extends Model<IUser> {
  findUserByCredentials: (email: string, password: string) => Promise<IUser | undefined>;
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  secondName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  login: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email: string) {
        return validator.isEmail(email);
      },
      message: 'Введён некорректный email',
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (link: string) => isUrl(link),
      message: 'некорректные данные',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending',
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role',
  }],
});

// eslint-disable-next-line func-names
UserSchema.statics.findUserByCredentials = function (email: string, password: string)
  : Promise<IUser | undefined> {
  return this.findOne({ email })
    .select('+password')
    .then((user: IUser) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Incorrect email or password'));
          }

          return user;
        });
    });
};

export default model<IUser, UserModel>('User', UserSchema);
