import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';

const EventDetailsPage = lazy(() => import('@/pages/events/EventDetailsPage'));
const ScheduleDay1Page = lazy(() => import('@/pages/schedule/ScheduleDay1Page'));
const ScheduleDay2Page = lazy(() => import('@/pages/schedule/ScheduleDay2Page'));
const ScheduleDay3Page = lazy(() => import('@/pages/schedule/ScheduleDay3Page'));

const RouteFallback = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <p className="text-sm tracking-[0.2em] uppercase text-white/70">Loading...</p>
  </div>
);

const withSuspense = (node) => (
  <Suspense fallback={<RouteFallback />}>
    {node}
  </Suspense>
);

function AppRoutes({ scrollToRefs, scrollToSection, isScrolled }) {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            scrollToRefs={scrollToRefs}
            scrollToSection={scrollToSection}
            isScrolled={isScrolled}
          />
        }
      />
      <Route path="/schedule/1" element={withSuspense(<ScheduleDay1Page />)} />
      <Route path="/schedule/2" element={withSuspense(<ScheduleDay2Page />)} />
      <Route path="/schedule/3" element={withSuspense(<ScheduleDay3Page />)} />
      <Route path="/events/:eventName" element={withSuspense(<EventDetailsPage />)} />
    </Routes>
  );
}

export default AppRoutes;
