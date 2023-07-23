import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, getAllBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .post('/', bookingRoom)
  .put('/:bookingId', changeBooking)
  .get('/', getAllBooking);

export { bookingRouter };
