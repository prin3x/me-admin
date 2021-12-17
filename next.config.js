/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/timegrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/bootstrap'
]);
const withLess = require('next-with-less');
module.exports = withTM(
  withLess({
    swcMinify: false,
    trailingSlash: true,
    images: {
      formats: ['image/avif', 'image/webp'],
    },
  })
);
