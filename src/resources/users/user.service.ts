import { ServiceNoRequest, ServiceWithRequest } from '../Service';
import usersRepo from './user.memory.repository';
import { UserModel, UserToResponse } from './user.model';
import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from './utils';

const getAllUsersService = new ServiceNoRequest<Array<UserToResponse>>(
  getAllUsers
);
// const getUserService = new Service(getUser);
const createUserService = new ServiceWithRequest<UserModel, UserToResponse>(
  createUser
);
// const updateUserService = new Service(updateUser);
// const deleteUserService = new Service(deleteUser);

export const userService = {
  getAllUsers: getAllUsersService,
  // getUser: getUserService,
  createUser: createUserService,
  // updateUser: updateUserService,
  // deleteUser: deleteUserService,
};
