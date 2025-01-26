const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: '#000000',
        secondaryBackground: 'rgba(35,3,17,1)',
        primaryText: '#ffffff',
        secondaryText: '#35547B',
        thirdText: '#96104B',
        primaryForeground: '#96104B',
        secondaryForeground: '#2B2627',
      },
      fontFamily: {
        iceland: ['Iceland'],
        sans: ['sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
