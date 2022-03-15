import { CRUDService } from '../../common/Service';
import { getAll, get, create, update, del } from './mongoCRUD';

export const userService = new CRUDService({
  getAll,
  get,
  create,
  update,
  del,
});
