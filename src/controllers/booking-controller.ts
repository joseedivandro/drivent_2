import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-service';

export async function getAllBooking(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);
    return res.status(httpStatus.OK).send({
      id: booking.id,
      Room: booking.Room,
    });
  } catch (error) {
    next(error);
  }
}

export async function PostBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body as Record<string, number>;

  const booking = await bookingService.bookingRoomById(userId, roomId);

  res.status(httpStatus.OK).send({ bookingId: booking.id });
}

export async function changeBooking(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const bookingId = Number(req.params.bookingId);
  if (!bookingId) return res.sendStatus(httpStatus.BAD_REQUEST);

  const { roomId } = req.body as Record<string, number>;
  const booking = await bookingService.changeBookingRoomById(userId, roomId);

  res.status(httpStatus.OK).send({ bookingId: booking.id });
}
