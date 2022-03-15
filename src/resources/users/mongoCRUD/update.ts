import { User, UserDB } from '../user.model';

export const update = async (user: Partial<User>): Promise<User> => {
  const userUpdated = await UserDB.findByIdAndUpdate(user._id, user, {
    returnDocument: 'after',
  });
  if (userUpdated) {
    return userUpdated;
  } else {
    throw new Error('No such user');
  }
};
