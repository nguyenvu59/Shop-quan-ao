/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');
const tailgrids = require('tailgrids/plugin');

module.exports = {

    mode: "jit",
    content: [
        "./src/**/*.{html,ts}",
    ],
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                'h1': { fontSize: theme('fontSize.4xl') },
                'h2': { fontSize: theme('fontSize.3xl') },
                'h3': { fontSize: theme('fontSize.2xl') },
                'h4': { fontSize: theme('fontSize.xl') },
                'h5': { fontSize: theme('fontSize.lg') },
                'h6': { fontSize: theme('fontSize.base') },
            })
        }),
        tailgrids
    ],
    important: true
};

