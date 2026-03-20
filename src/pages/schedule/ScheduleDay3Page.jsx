import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'TREASURE TROVE', location: 'TBA', time: 'TBA' },
];

function ScheduleDay3Page() {
  return <ScheduleDayPage dayLabel="29th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay3Page;
