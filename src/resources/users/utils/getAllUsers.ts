import { UserToResponse } from '../user.model';
import { UserDB } from '../user.model';

export const getAllUsersDB = async (): Promise<
  Array<UserToResponse> | undefined
> => {
  const allUsers = await UserDB.find({}, ['-password']);
  return allUsers;
};
