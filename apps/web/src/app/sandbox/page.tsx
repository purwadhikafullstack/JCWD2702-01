'use client';
import { Calendar } from '@/components/ui/calendar';
import { DateRange, DayContentProps } from 'react-day-picker';
import {
  addDays,
  areIntervalsOverlapping,
  closestTo,
  isSameDay,
  isWithinInterval,
  subDays,
} from 'date-fns';
import { useState } from 'react';
import { useGetListings } from '@/features/listings/hooks/useGetListings';
import Loading from '../loading';
import { ListingCard } from '@/components/cards/ListingCard';
import Link from 'next/link';
import { FacilityBadge } from '@/components/cores/FacilityBadge';

export default function Page() {
  const { listings } = useGetListings();
  console.log(listings);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });

  const seasonal_price = [
    { id: 1, price: 620000, start_date: '2024-06-23', end_date: '2024-06-28' },
    { id: 1, price: 300000, start_date: '2024-07-14', end_date: '2024-07-20' },
  ];

  const rooms = [
    {
      roomId: 1,
      price: 560000,
      seasonal_price: seasonal_price[0],
    },
    {
      roomId: 2,
      price: 560000,
      seasonal_price: seasonal_price[1],
    },
    {
      roomId: 3,
    },
  ];

  const bookings = [
    {
      roomId: 1,
      startDate: '2024-06-08',
      endDate: '2024-06-10',
    },
    {
      roomId: 1,
      startDate: '2024-06-15',
      endDate: '2024-06-17',
    },
    {
      roomId: 2,
      startDate: '2024-06-09',
      endDate: '2024-06-10',
    },
    {
      roomId: 1,
      startDate: '2024-06-26',
      endDate: '2024-06-28',
    },
    {
      roomId: 2,
      startDate: '2024-06-20',
      endDate: '2024-06-28',
    },
  ];

  const nonavailabilities = [
    {
      roomId: 2,
      startDate: '2024-06-12',
      endDate: '2024-06-15',
    },
    {
      roomId: 1,
      startDate: '2024-06-30',
      endDate: '2024-07-10',
    },
  ];

  const selectedRoom = 2;

  function CustomDayContent(props: DayContentProps) {
    const seasonal_price_check = isWithinInterval(props.date, {
      start: new Date(rooms[1].seasonal_price?.start_date as string),
      end: new Date(rooms[1].seasonal_price?.end_date as string),
    });

    // Check if the day is disabled
    const isDisabled = no_books.some((range) =>
      isWithinInterval(props.date, { start: range.from, end: range.to }),
    );

    return (
      <span
        className="numbers-font"
        style={{
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          padding: '5px',
          display: 'inline-block',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
        }}
      >
        <div>{props.date.getDate()}</div>
        {!isDisabled && (
          <div
            className={
              seasonal_price_check
                ? 'text-red-500 font-medium'
                : 'text-green-400 font-medium'
            }
            style={{ fontSize: '0.8em', marginTop: '0.1em' }}
          >
            {seasonal_price_check
              ? (rooms[1].seasonal_price?.price as number) / 1000
              : (rooms[1].price as number) / 1000}
          </div>
        )}
      </span>
    );
  }

  const no_books = [...bookings, ...nonavailabilities]
    .filter((x) => x.roomId === selectedRoom)
    .map((x) => ({
      from: new Date(x.startDate),
      to: new Date(x.endDate),
    }));

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
    let result;
    if (selectedDate?.from && selectedDate?.to) {
      if (selectedDate?.to > date?.to!) {
        setDate({ from: selectedDate.to, to: undefined });
      } else {
        result = no_books.filter((x) =>
          areIntervalsOverlapping(
            { start: selectedDate.from as Date, end: selectedDate.to as Date },
            { start: x.from, end: x.to },
          ),
        );

        if (result.length > 0) {
          const froms = result.map((x) => x.from);
          const closestDate = closestTo(selectedDate.from as Date, froms);
          setDate({
            from: selectedDate.from,
            to: subDays(closestDate as Date, 1),
          });
        }
      }
    }
  };

  if (!listings) return <Loading />;
  return (
    <div className="mt-32">
      <FacilityBadge icon={false} text={'Workspace'}></FacilityBadge>
      <div>Selected Room ID: {selectedRoom}</div>
      <Calendar
        mode="range"
        numberOfMonths={2}
        min={2}
        disabled={[...no_books]}
        fromDate={new Date()}
        selected={date}
        onSelect={handleDateChange}
        components={{
          DayContent: CustomDayContent, // Replace the DayContent component
        }}
      />
      {listings.map((x: any) => (
        <Link href={`/sandbox/${x.slug}`}>
          <ListingCard
            key={x.id} // Add a unique key for each element
            imageUrl={`http://localhost:8000/${x.listing_images[0].image_url}`}
            title={x.title}
            avgRating={x.avg_rating}
            country={x.country}
            city={x.city}
            price={x.room_types[0].price}
            seasonalPrice={x.room_types[0]?.seasonal_prices[0]}
          />
        </Link>
      ))}
    </div>
  );
}
