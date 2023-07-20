import { Booking } from '@prisma/client';
import { prisma } from '@/config';

type CreateParams = Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>;
type UpdateParams = Omit<Booking, 'createdAt' | 'updatedAt'>;

async function create({ roomId, userId }: CreateParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

async function findByHotelId(hotelId: number) {
  const bookings: Booking[] = [];
  const rooms = await prisma.room.findMany({
    where: {
      hotelId: hotelId,
    },
  });
  for (let i = 0; i < rooms.length; i++) {
    const booking = await prisma.booking.findFirst({
      where: {
        roomId: rooms[i].id,
      },
    });
    if (booking) bookings.push(booking);
  }
  return bookings;
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  create,
  findByRoomId,
  findByHotelId,
  findByUserId,
  upsertBooking,
};

export default bookingRepository;
