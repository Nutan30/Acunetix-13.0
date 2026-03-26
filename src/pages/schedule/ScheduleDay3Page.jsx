import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'TREASURE TROVE', location: '402, 409, 509 and 511', time: 'ALL DAY' },
];

function ScheduleDay3Page() {
  return <ScheduleDayPage dayLabel="29th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay3Page;
