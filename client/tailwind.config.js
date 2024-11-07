/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                libre: ['Frank Ruhle Libre', 'serif'],
                fira: ['Fira Sans', 'sans-serif'],
                fenix: ['Fenix', 'serif'],
                poppins: ['Poppins', 'sans serif'],
            },
            colors: {
                'gray': '#ECECEC',
                'dark-green': '#2B663D',
                'blue': '#4F72AF',
                'dark-gray': '#676767',
                'red': '#B32C36',
                'light-gray': '#B7B7B7',
                'light-green': '#599F50',
                'pale-green': '#D0E4C3',
                'medium-pale-green': '#9EC19A',
                'sky-blue': '#BFDFDDD9',
                'ice-blue': '#c0e6d880',
                'lavender': '#d0b0db80',
                'lightest-grey': '#dadadf80',
                'greyish-blue': '#bdcbdd80',
                'pinky-pink': '#f0cabe80',
                'mauve': '#e4b5c680',
                'mediumish-green': '#D9E2B8',
                'yet-another-light-grey': "#f7f7f7f7",
                'charcoal': '#7b7b7b7b',
                'school-bus-yellow': "#f0d171",
                'green-is-good': "#38761d"
            },
            dropShadow: {
                md: '0 4px 4px rgba(0, 0, 0, 0.25)',
                //box-shadow: 0px 4.554px 4.554px 0px rgba(0, 0, 0, 0.25)
            },
        },
    },
    plugins: [],
};
