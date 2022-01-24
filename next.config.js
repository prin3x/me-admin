/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/premium-common',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
  '@fullcalendar/resource-daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/bootstrap',
  '@fullcalendar/resource-common',
  '@fullcalendar/timeline',
  '@fullcalendar/resource-timeline',
  '@fullcalendar/resource-daygrid',
  '@fullcalendar/resource-timegrid',
]);
const withLess = require('next-with-less');
module.exports = withTM(
  withLess({
    swcMinify: false,
    images: {
      formats: ['image/avif', 'image/webp'],
    },
  })
);
