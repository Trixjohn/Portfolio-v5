"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const trailIdRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true);

  useEffect(() => {
    // Create container if it doesn't exist
    let container = document.getElementById("cursor-trail-container") as HTMLDivElement;
    if (!container) {
      container = document.createElement("div");
      container.id = "cursor-trail-container";
      document.body.appendChild(container);
    }
    containerRef.current = container;

    isActiveRef.current = true;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActiveRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      // Update main cursor immediately using refs (no re-render delay)
      if (cursorRef.current) {
        cursorRef.current.style.left = x + "px";
        cursorRef.current.style.top = y + "px";
      }

      // Add trail point on every move
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        const trailId = trailIdRef.current++;
        const trailPoint = document.createElement("div");
        trailPoint.style.cssText = `
          position: fixed;
          left: ${lastPosRef.current.x}px;
          top: ${lastPosRef.current.y}px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #3b82f6;
          pointer-events: none;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
          z-index: 9998;
          animation: fadeOut 0.8s ease-out forwards;
        `;

        if (containerRef.current) {
          containerRef.current.appendChild(trailPoint);
        }
        trailRef.current.set(trailId, trailPoint);

        // Remove after animation
        setTimeout(() => {
          if (trailPoint.parentNode) {
            trailPoint.remove();
          }
          trailRef.current.delete(trailId);
        }, 800);

        lastPosRef.current = { x, y };
      }
    };

    const handleVisibilityChange = () => {
      isActiveRef.current = !document.hidden;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {/* Main cursor circle */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          border: "2px solid #3b82f6",
          opacity: 0.8,
          pointerEvents: "none",
          boxShadow: "0 0 20px #3b82f6, 0 0 40px rgba(59, 130, 246, 0.5), inset 0 0 10px rgba(59, 130, 246, 0.3)",
          zIndex: 9999,
        }}
      />

      {/* Hide default cursor & keyframes */}
      <style>{`
        * {
          cursor: none !important;
        }

        @keyframes fadeOut {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
        }
      `}</style>
    </>
  );
}
