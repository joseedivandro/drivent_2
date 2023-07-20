import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, changeBooking, listBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).post('', bookingRoom).put('/:bookingId', changeBooking).get('', listBooking);

export { bookingRouter };
