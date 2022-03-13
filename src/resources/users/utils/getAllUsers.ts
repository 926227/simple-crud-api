import { UserToResponse } from '../user.model';

export const getAllUsers = (): Promise<Array<UserToResponse> | undefined> => {
  return new Promise((resolve) =>
    resolve([{ id: '1', name: 'ddd', login: 'eee' }])
  );
};
