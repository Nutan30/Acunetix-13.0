import React from 'react';
import ScheduleDayPage from '@/pages/schedule/ScheduleDayPage';

const scheduleEvents = [
  { id: 1, name: 'CODE OF LIES', location: 'TBA', time: 'TBA' },
  { id: 2, name: 'DPL AUCTION', location: 'TBA', time: 'TBA' },
  { id: 3, name: 'ESCAPE ROOM', location: 'TBA', time: 'TBA' },
];

function ScheduleDay2Page() {
  return <ScheduleDayPage dayLabel="28th March" scheduleEvents={scheduleEvents} />;
}

export default ScheduleDay2Page;
