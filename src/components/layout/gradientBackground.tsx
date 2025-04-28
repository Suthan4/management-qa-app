"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
}

export function GradientBackground({ className }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;

      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;

      ctx.scale(dpr, dpr);
    };

    // Initial resize
    resizeCanvas();

    // Gradient variables
    let gradientColors = [
      { r: 23, g: 42, b: 135, a: 0.2 }, // Deep blue
      { r: 120, g: 20, b: 150, a: 0.2 }, // Purple
      { r: 20, g: 120, b: 150, a: 0.2 }, // Teal
      { r: 20, g: 150, b: 120, a: 0.2 }, // Mint
    ];

    let circles = Array.from({ length: 4 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 300 + 200,
      dx: Math.random() * 0.4 - 0.2,
      dy: Math.random() * 0.4 - 0.2,
      color: gradientColors[i],
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each circle
      circles.forEach((circle) => {
        // Update position
        circle.x += circle.dx;
        circle.y += circle.dy;

        // Bounce off walls
        if (
          circle.x - circle.radius < 0 ||
          circle.x + circle.radius > window.innerWidth
        ) {
          circle.dx *= -1;
        }
        if (
          circle.y - circle.radius < 0 ||
          circle.y + circle.radius > window.innerHeight
        ) {
          circle.dy *= -1;
        }

        // Draw gradient circle
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.radius
        );
        gradient.addColorStop(
          0,
          `rgba(${circle.color.r}, ${circle.color.g}, ${circle.color.b}, ${circle.color.a})`
        );
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 w-full h-full -z-10", className)}
    />
  );
}
