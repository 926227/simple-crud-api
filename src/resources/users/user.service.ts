import { ServiceNoRequest, ServiceWithRequest } from '../Service';
import {
  getAllUsersDB,
  getUserDB,
  createUserDB,
  updateUserDB,
  deleteUserDB,
} from './utils';

const getAllUsers = new ServiceNoRequest(getAllUsersDB).run;
const getUser = new ServiceWithRequest(getUserDB).run;
const createUser = new ServiceWithRequest(createUserDB).run;
const updateUser = new ServiceWithRequest(updateUserDB).run;
const deleteUser = new ServiceWithRequest(deleteUserDB).run;

export const userService = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
