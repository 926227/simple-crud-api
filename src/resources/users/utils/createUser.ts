import { UserModel, UserToResponse } from '../user.model';

export const createUser = (
  data: UserModel
): Promise<UserToResponse | undefined> => {
  return new Promise((resolve) =>
    resolve({ id: '1', name: 'ddd', login: 'eee' })
  );
};
