import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);


interface PriceOverride {
  start: Dayjs;
  end: Dayjs;
  price: number;
}

export default function calculatePrice(
  start: Dayjs,
  end: Dayjs,
  pricePerHour: number,
  priceOverrides: PriceOverride[]
): number {
  let totalPrice = 0;

  // Iterate over each hour of the duration
  let currentHour = start.clone().startOf('hour');
  while (currentHour.isBefore(end)) {
    const nextHour = currentHour.clone().add(1, 'hour');

    // Check for overrides
    const override = priceOverrides.find(
      (override) =>
        currentHour.isSameOrBefore(override.end) &&
        override.start.isSameOrBefore(nextHour)
    );

    let price = override ? override.price : pricePerHour;

    // Double price on weekends
    if (currentHour.day() === 0 || currentHour.day() === 6) {
      price *= 2;
    }

    // Calculate the duration within the hour
    const durationInHour = Math.min(nextHour.diff(currentHour, 'minute'), end.diff(currentHour, 'minute'));

    totalPrice += (price / 60) * durationInHour; // Convert price per hour to price per minute

    currentHour = nextHour;
  }

  // Round to 2 decimal places
  return parseFloat(totalPrice.toFixed(2));
}

export function testExample(){
  // Example usage
  const start = dayjs.tz('2024-06-08 10:00:00', 'America/New_York');
  const end = dayjs.tz('2024-06-08 13:30:00', 'America/New_York');
  const pricePerHour = 10;
  const priceOverrides: PriceOverride[] = [
    {
      start: dayjs.tz('2024-06-08 11:00:00', 'America/New_York'),
      end: dayjs.tz('2024-06-08 12:00:00', 'America/New_York'),
      price: 15,
    },
  ];

  return calculatePrice(start, end, pricePerHour, priceOverrides);
}
// Output: 30


// Example 2
export function testExample2(){

  return calculatePrice(
    dayjs.tz('2021-11-13T09:24:00'), dayjs.tz('2021-11-15T15:13:00'), 13, [
    {
      start: dayjs.tz('2021-11-14T12:00:00'),
      end: dayjs.tz('2021-11-14T14:01:00'),
      price: 5,
    },
    {
      start: dayjs.tz('2021-11-15T09:00:00'),
      end: dayjs.tz('2021-11-17T00:00:00'),
      price: 15.2,
    },
    ]
  )
  
}



