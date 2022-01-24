import dynamic from 'next/dynamic';
import React, { ReactElement } from 'react';

const RoomBookingCalendar = dynamic(
  () => import('../../components/room-booking/RoomBookingCalendar'),
  {
    ssr: false,
  }
);

interface Props {}

function RoomBooking({}: Props): ReactElement {
  return (
    <div>
      <RoomBookingCalendar />
    </div>
  );
}

export default RoomBooking;
// import { CalendarEvent } from 'src/calendar-event/calendar-event.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   OneToMany,
//   PrimaryGeneratedColumn,
//   UpdateDateColumn,
// } from 'typeorm';

// @Entity()
// export class Room {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ default: '' })
//   room: string;

//   @Column({ nullable: true })
//   floor: number;

//   @CreateDateColumn({ name: 'created_date' })
//   createdDate: Date;

//   @UpdateDateColumn({ name: 'updated_date' })
//   updatedDate: Date;

//   @OneToMany(() => CalendarEvent, (_calendar) => _calendar.roomDetail)
//   calendarEventDetail: CalendarEvent[];
// }
