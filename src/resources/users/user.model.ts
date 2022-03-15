import mongoose from 'mongoose';

export type User = {
  _id: string;
  name: string;
  login: string;
  password: string;
};

export type UserToResponse = Omit<User, 'password'>;

const userShema = new mongoose.Schema<User>({
  name: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserDB = mongoose.model('User', userShema);

// export class User implements UserModel {
//   id: string;
//   name: string;
//   login: string;
//   password: string;

//   constructor({
//     id = uuid(),
//     name = 'USER',
//     login = 'user',
//     password = 'P@55w0rd',
//   }) {
//     this.id = id;
//     this.name = name;
//     this.login = login;
//     this.password = password;
//   }

//   static toResponse(user: UserModel) {
//     const { id, name, login } = user;
//     return { id, name, login };
//   }
// }
