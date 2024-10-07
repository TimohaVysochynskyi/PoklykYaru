import { Router } from 'express';

import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
//import { validateBody } from '../../middlewares/validateBody.js';
import { isValidId } from '../../middlewares/isValidId.js';
import { authCustomer } from '../../middlewares/authCustomer.js';

import {
  getAllItemsController,
  addItemController,
  updateItemController,
  deleteItemController,
} from '../../controllers/merch/cart.js';

const router = Router();

router.use('/', authCustomer);

router.get('/', ctrlWrapper(getAllItemsController));
router.post('/add', ctrlWrapper(addItemController));
router.post('/update', ctrlWrapper(updateItemController));
router.delete('/', isValidId, ctrlWrapper(deleteItemController));

export default router;
