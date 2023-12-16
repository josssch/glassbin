/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                glass: 'hsla(0, 0%, 100%, .1)',
                glassier: 'hsla(0, 0%, 100%, .2)',
            },

            fontFamily: {
                sans: ['Poppins'],
                mono: ['Fira Code'],
            },
        },
    },
    plugins: [],
}
