import { User, UserDB, UserToResponse } from '../user.model';

export const createUserDB = async (
  data: User
): Promise<UserToResponse | undefined> => {
  const user = await UserDB.create(data);
  if (user) {
    return user;
  } else {
    throw new Error('Can not create user');
  }
};
