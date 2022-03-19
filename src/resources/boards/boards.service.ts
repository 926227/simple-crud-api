import { CRUDService } from '../../common/Service';
import { delByBoardId as updateTasks } from '../tasks/mongoCRUD';
import { getAll, get, create, update, del } from './mongoCRUD';

export const boardsService = new CRUDService({
  getAll,
  get,
  create,
  update,
  del,
});


boardsService.del.use(updateTasks)