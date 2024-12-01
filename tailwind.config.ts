/** @type {import("tailwindcss").Config} */

import plugin = require( "tailwindcss/plugin");


module.exports = {
    darkMode: ['selector', '.dark'],
    content: ["./src/**/*.{html,js,svelte}", "./rollup.config.mjs"],
    theme: {
        fontFamily: {
            sans: ["Dm Sans", "ui-sans-serif", "system-ui"],
            serif: ["Libre Bodoni", "ui-serif", "Georgia"],
            body: ["\"Dm Sans\"", "ui-sans-serif"]
        }, extend: {
            colors: {
                primary: {
                    "50": "hsl(140, 5%, 95%)",
                    "100": "hsl(140, 15%, 90%)",
                    "200": "hsl(140, 25%, 85%)",
                    "300": "hsl(140, 35%, 75%)",
                    "400": "hsl(140, 45%, 65%)",
                    "500": "hsl(140, 55%, 55%)",
                    "600": "hsl(140, 65%, 45%)",
                    "700": "hsl(140, 75%, 35%)",
                    "800": "hsl(140, 85%, 25%)",
                    "900": "hsl(140, 95%, 15%)",
                    "950": "hsl(140, 100%, 5%)"
                },
                secondary: {
                    "50": "hsl(58, 5%, 95%)",
                    "100": "hsl(58, 15%, 90%)",
                    "200": "hsl(58, 25%, 85%)",
                    "300": "hsl(58, 35%, 75%)",
                    "400": "hsl(58, 45%, 65%)",
                    "500": "hsl(58, 55%, 55%)",
                    "600": "hsl(58, 65%, 45%)",
                    "700": "hsl(58, 75%, 35%)",
                    "800": "hsl(58, 85%, 25%)",
                    "900": "hsl(58, 95%, 15%)",
                    "950": "hsl(58, 100%, 5%)"
                }

            },
            minHeight: {
                "screen-75": "75vh"
            }, fontSize: {
                55: "55rem"
            }, opacity: {
                80: ".8"
            }, zIndex: {
                2: 2, 3: 3
            }, inset: {
                "-100": "-100%",
                "-225-px": "-225px",
                "-160-px": "-160px",
                "-150-px": "-150px",
                "-94-px": "-94px",
                "-50-px": "-50px",
                "-29-px": "-29px",
                "-20-px": "-20px",
                "25-px": "25px",
                "40-px": "40px",
                "95-px": "95px",
                "145-px": "145px",
                "195-px": "195px",
                "210-px": "210px",
                "260-px": "260px"
            }, height: {
                "95-px": "95px", "70-px": "70px", "350-px": "350px", "500-px": "500px", "600-px": "600px"
            }, maxHeight: {
                "860-px": "860px"
            }, maxWidth: {
                "100-px": "100px",
                "120-px": "120px",
                "150-px": "150px",
                "180-px": "180px",
                "200-px": "200px",
                "210-px": "210px",
                "580-px": "580px"
            }, minWidth: {
                "140-px": "140px", 48: "12rem"
            }, backgroundSize: {
                full: "100%"
            }
        }
    },
    variants: ["responsive", "group-hover", "focus-within", "first", "last", "odd", "even", "hover", "focus", "active", "visited", "disabled"],
    plugins: [require("@tailwindcss/forms"),

        plugin(function ({addComponents, theme}) {

            const screens = theme("screens", {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
                "2xl": "1536px"
            });
            addComponents([{
                ".container": {width: "100%"}
            }, {
                [`@media (min-width: ${screens.sm}})`]: {
                    ".container": {
                        "max-width": "640px"
                    }
                }
            }, {
                [`@media (min-width: ${screens.md})`]: {
                    ".container": {
                        "max-width": "768px"
                    }
                }
            }, {
                [`@media (min-width: ${screens.lg})`]: {
                    ".container": {
                        "max-width": "1024px"
                    }
                }
            }, {
                [`@media (min-width: ${screens.xl})`]: {
                    ".container": {
                        "max-width": "1280px"
                    }
                }
            }, {
                [`@media (min-width: ${screens["2xl"]})`]: {
                    ".container": {
                        "max-width": "1280px"
                    }
                }
            }]);


        })]
};
