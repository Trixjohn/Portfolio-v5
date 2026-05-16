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
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Create container if it doesn't exist
    let container = document.getElementById("cursor-trail-container") as HTMLDivElement;
    if (!container) {
      container = document.createElement("div");
      container.id = "cursor-trail-container";
      document.body.appendChild(container);
    }
    containerRef.current = container;

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isTouchOnly = hasCoarsePointer && !hasFinePointer;

    const setCursorVisible = (visible: boolean) => {
      if (cursorRef.current) cursorRef.current.style.display = visible ? "block" : "none";
      if (containerRef.current) containerRef.current.style.display = visible ? "block" : "none";
    };

    isMobileRef.current = isTouchOnly;
    isActiveRef.current = true;
    setCursorVisible(!isTouchOnly);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActiveRef.current) return;

      if (!isMobileRef.current) {
        setCursorVisible(true);
      }

      const x = e.clientX;
      const y = e.clientY;
      const zoom = parseFloat(getComputedStyle(document.body).zoom) || 1;
      const adjustedX = x / zoom;
      const adjustedY = y / zoom;

      // Update main cursor immediately using refs (no re-render delay)
      if (cursorRef.current) {
        cursorRef.current.style.left = adjustedX + "px";
        cursorRef.current.style.top = adjustedY + "px";
      }

      // Add trail point on every move for smoother trailing
      const trailId = trailIdRef.current++;
      const trailPoint = document.createElement("div");
      trailPoint.style.cssText = `
        position: fixed;
        left: ${adjustedX}px;
        top: ${adjustedY}px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgba(59, 130, 246, 0.25);
        pointer-events: none;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 18px rgba(59, 130, 246, 0.9), 0 0 28px rgba(59, 130, 246, 0.5);
        z-index: 9998;
        animation: fadeOut 0.8s ease-out forwards;
      `;

      if (containerRef.current) {
        containerRef.current.appendChild(trailPoint);
      }
      trailRef.current.set(trailId, trailPoint);

      // Remove old trail if too many points are present
      if (trailRef.current.size > 45) {
        const oldestId = Array.from(trailRef.current.keys())[0];
        const oldest = trailRef.current.get(oldestId);
        if (oldest?.parentNode) oldest.remove();
        trailRef.current.delete(oldestId);
      }

      // Remove after animation
      setTimeout(() => {
        if (trailPoint.parentNode) {
          trailPoint.remove();
        }
        trailRef.current.delete(trailId);
      }, 800);

      lastPosRef.current = { x: adjustedX, y: adjustedY };
    };

    const handleVisibilityChange = () => {
      const visible = !document.hidden;
      isActiveRef.current = visible;
      setCursorVisible(visible);
    };

    const handleWindowBlur = () => {
      isActiveRef.current = false;
      setCursorVisible(false);
    };

    const handleWindowFocus = () => {
      if (!isMobileRef.current) {
        isActiveRef.current = true;
        setCursorVisible(true);
      }
    };

    const handleTouchStart = () => {
      isMobileRef.current = true;
      isActiveRef.current = false;
      setCursorVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isActiveRef.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
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
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          background: "rgba(59, 130, 246, 0.2)",
          border: "2px solid rgba(59, 130, 246, 0.9)",
          opacity: 0.95,
          pointerEvents: "none",
          boxShadow: "0 0 18px rgba(59, 130, 246, 0.9), 0 0 36px rgba(59, 130, 246, 0.6), 0 0 60px rgba(59, 130, 246, 0.35), inset 0 0 12px rgba(59, 130, 246, 0.5)",
          zIndex: 9999,
          transition: "transform 0.08s ease-out, opacity 0.1s ease-out",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Hide default cursor & keyframes */}
      <style>{`
        * {
          cursor: none !important;
        }

        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
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
