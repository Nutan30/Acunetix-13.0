import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'ESCAPE ROOM', location: '509 AND 511', time: '11 AM' },
  { id: 2, name: 'DPL', location: '402 AND 409', time: '11 AM' },
  { id: 3, name: 'CTRL ALT ELITE', location: '4TH FLOOR LABS', time: '12 PM' },
  { id: 4, name: 'BRAINIAC', location: '409', time: '3:30 PM' },
];

function ScheduleDay1Page() {
  return <ScheduleDayPage dayLabel="27th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay1Page;
