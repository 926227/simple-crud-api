import { User, UserDB } from '../user.model';

export const deleteUserDB = async (id: string): Promise<User> => {
  const user = await UserDB.findByIdAndDelete(id);

  if (user) {
    return user;
  } else {
    throw new Error('No such user');
  }
};
