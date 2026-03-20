import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'BRAINIAC', location: 'TBA', time: 'TBA' },
  { id: 2, name: 'CTRL ALT ELITE', location: 'TBA', time: 'TBA' },
  { id: 3, name: 'DPL ROUND 1 & 2', location: 'TBA', time: 'TBA' },
  { id: 4, name: 'ESCAPE ROOM', location: 'TBA', time: 'TBA' },
];

function ScheduleDay1Page() {
  return <ScheduleDayPage dayLabel="27th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay1Page;
