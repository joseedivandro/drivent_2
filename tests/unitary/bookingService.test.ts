import {
  enrollmentWithAddressReturn,
  findBookingByRoomIdNoCapacityReturn,
  findBookingByRoomIdReturn,
  findRoomByIdNoCapacityReturn,
  findRoomByIdReturn,
  findTicketByEnrollmentIdReturn,
  getBookingDifferentUserIdReturn,
  getBookingReturn,
} from '../factories/booking-factory';
import bookingService from '../../src/services/booking-service';
import bookingRepository from '@/repositories/booking-repository';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import ticketsRepository from '@/repositories/tickets-repository';

describe('getBooking function', () => {
  it('should return the booking for the given user id', async () => {
    const userId = 1;
    const booking = getBookingReturn();

    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(booking);

    const result = await bookingService.getBooking(userId);

    expect(bookingRepository.findByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual(booking);
  });

  it('should throw notFoundError if the booking for the given user id is not found', async () => {
    const userId = 1;

    jest.spyOn(bookingRepository, 'findByUserId').mockResolvedValue(null);

    await expect(bookingService.getBooking(userId)).rejects.toEqual(notFoundError());
    expect(bookingRepository.findByUserId).toHaveBeenCalledWith(userId);
  });
});
