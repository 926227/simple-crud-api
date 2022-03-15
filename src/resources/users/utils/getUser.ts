import { User, UserDB, UserToResponse } from '../user.model';

export const getUserDB = async (id: string): Promise<UserToResponse> => {
  const userToResponse = await UserDB.findById(id, ['-password']);
  if (userToResponse) {
    return userToResponse;
  } else {
    throw new Error('No such user');
  }
};
