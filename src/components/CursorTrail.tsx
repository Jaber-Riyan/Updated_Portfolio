import { useEffect, useRef } from "react";
import gsap from "gsap";

const CursorTrail = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // disable on mobile
    if (window.innerWidth < 768) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.3,
      ease: "power3",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.3,
      ease: "power3",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
    />
  );
};

export default CursorTrail;