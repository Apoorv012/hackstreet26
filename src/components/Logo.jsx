import { useEffect, useState } from "react";

export default function Logo() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setOffset(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        // Cleanup function to remove listener when component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-start pt-32 pointer-events-none z-[30]"
            style={{
                // PARALLAX MAGIC:
                // We move the logo DOWN as you scroll, but slower than the page.
                // This makes it look like it's floating in 3D space.
                transform: `translateY(${offset * 0.5}px)`
            }}
        >
            <img
                src="/logo2.png"
                alt="HackStreet Logo"
                className="w-[300px] md:w-[850px] opacity-90"
                style={{
                    // OPTIONAL: If your logo is black text, this turns it white to see on dark bg
                    filter: "invert(0.15) drop-shadow(0 0 0px rgba(255,255,255,0.5))"
                }}
            />
        </div>
    );
}