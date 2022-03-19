import { CRUDService } from '../../common/Service';
import { updateUserIdToNull as updateTasks } from '../tasks/mongoCRUD';
import { getAll, get, create, update, del } from './mongoCRUD';

export const userService = new CRUDService({
  getAll,
  get,
  create,
  update,
  del,
});


userService.del.use(updateTasks)