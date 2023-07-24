import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { PostBooking, changeBooking, getAllBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .post('/', PostBooking)
  .put('/:bookingId', changeBooking)
  .get('/', getAllBooking);

export { bookingRouter };
