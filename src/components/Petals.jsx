import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function Petals() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        console.log("Petals: Initializing...");
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            console.log("Petals: Engine Ready!");
            setInit(true);
        });
    }, []);

    if (init) {
        return (
            <Particles
                id="tsparticles"
                options={{
                    /* 1. FORCE ON TOP */
                    fullScreen: {
                        enable: true,
                        zIndex: 9999 // Maximum priority
                    },
                    background: {
                        color: "transparent",
                    },
                    particles: {
                        number: {
                            value: 30,
                        },
                        /* 2. THE TROJAN HORSE TRICK */
                        // We load both a circle AND the image. 
                        // We set the circle size to 0 so it is invisible.
                        shape: {
                            type: ["circle", "image"],
                            options: {
                                circle: {
                                    // This is the dummy shape to kickstart the engine
                                    fill: false
                                },
                                image: {
                                    src: "/petal.webp", // Your working path
                                    width: 100,
                                    height: 100,
                                    replaceColor: false
                                }
                            }
                        },
                        /* 3. OPACITY & SIZE */
                        opacity: {
                            value: 0.8,
                            random: false,
                        },
                        size: {
                            value: 15, // Big size to ensure visibility
                            random: true,
                        },
                        /* 4. MOVEMENT */
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "bottom",
                            random: false,
                            straight: false,
                            outModes: "out",
                        },
                        /* 5. WOBBLE */
                        wobble: {
                            enable: true,
                            distance: 20,
                            speed: 10,
                        },
                        rotate: {
                            value: { min: 0, max: 360 },
                            animation: { enable: true, speed: 5, sync: false },
                        },
                    },
                }}
            />
        );
    }

    return <></>;
}