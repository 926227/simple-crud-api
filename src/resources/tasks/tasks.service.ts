import { CRUDService, ServiceWithRequest } from '../../common/Service';
import { getAll, getAllByBoardId, get, create, update, del } from './mongoCRUD';

const tasksCRUD = new CRUDService({
  getAll,
  get,
  create,
  update,
  del,
});

const getAllService = new ServiceWithRequest(getAllByBoardId).run;

export const tasksService = {
  ...tasksCRUD,
  getAll: getAllService,
};
