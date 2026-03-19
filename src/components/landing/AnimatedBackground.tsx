"use client";

import { useEffect, useRef } from "react";

type Direction = "right" | "left" | "up" | "down";

interface Point {
  x: number;
  y: number;
  age: number;
  isDot: boolean;
}

const GRID_SIZE = 40;
const MAX_AGE = 240;
const PATH_COLOR = "47, 37, 87"; // RGB for brand color
const DOT_COLOR = `rgba(${PATH_COLOR}, 0.3)`;
const DOT_RADIUS = 1.5;
const MOVE_PROBABILITY = 0.15;
const TURN_PROBABILITY = 0.12;
const MIN_STEPS_BEFORE_TURN = 4;
const MAX_PATHS = 3;
const SPAWN_RATE = 0.01;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const paths: Path[] = [];

    class Path {
      x: number;
      y: number;
      direction: Direction = "right";
      stepsSinceLastTurn = 0;
      points: Point[] = [];
      finished = false;

      constructor() {
        this.x = -GRID_SIZE * 2;
        this.y = Math.floor((Math.random() * height) / GRID_SIZE) * GRID_SIZE;
        this.points.push({ x: this.x, y: this.y, age: 0, isDot: false });
      }

      update() {
        // Age all points every frame (independent of movement)
        this.points.forEach((p) => (p.age += 0.4));

        // Remove old points
        while (this.points[0]?.age > MAX_AGE) this.points.shift();

        // Movement logic
        if (!this.finished && Math.random() < MOVE_PROBABILITY) {
          this.stepsSinceLastTurn++;
          const nextDirection = this.getNextDirection();
          const willTurn = nextDirection !== this.direction;

          if (willTurn) {
            // Mark the current position (before moving) as a turning point
            if (this.points.length > 0) {
              this.points[this.points.length - 1].isDot = true;
            }
            this.stepsSinceLastTurn = 0;
          }

          this.direction = nextDirection;
          this.move();

          // Stop if out of bounds
          if (
            this.y < 0 ||
            this.y >= height ||
            this.x > width + GRID_SIZE * 10
          ) {
            this.finished = true;
            return;
          }

          this.points.push({ x: this.x, y: this.y, age: 0, isDot: false });
        }
      }

      getNextDirection(): Direction {
        const minSteps = MIN_STEPS_BEFORE_TURN + Math.floor(Math.random() * 4);
        if (
          this.stepsSinceLastTurn < minSteps ||
          Math.random() > TURN_PROBABILITY
        ) {
          return this.direction;
        }

        const isHorizontal =
          this.direction === "right" || this.direction === "left";
        const turns: Direction[] = isHorizontal
          ? ["up", "down"]
          : [
              "right",
              "right",
              "right",
              ...(this.x > GRID_SIZE * 3 ? ["left" as const] : []),
            ];

        return turns[Math.floor(Math.random() * turns.length)];
      }

      move() {
        const moves = {
          right: [GRID_SIZE, 0],
          left: [-GRID_SIZE, 0],
          down: [0, GRID_SIZE],
          up: [0, -GRID_SIZE],
        };
        const [dx, dy] = moves[this.direction];
        this.x = Math.round(this.x + dx);
        this.y = Math.round(this.y + dy);
      }

      draw() {
        if (!ctx || this.points.length < 2) return;

        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";

        for (let i = 0; i < this.points.length - 1; i++) {
          const { x, y, age, isDot } = this.points[i];
          const opacity = Math.max(0, (1 - age / MAX_AGE) * 0.45);

          // Draw line segment
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(this.points[i + 1].x, this.points[i + 1].y);
          ctx.strokeStyle = `rgba(${PATH_COLOR}, ${opacity})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();

          // Draw junction dot
          if (isDot && opacity > 0.05) {
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${PATH_COLOR}, ${opacity})`;
            ctx.shadowBlur = 0;
            ctx.fill();
          }
        }
      }
    }

    function resizeCanvas() {
      if (!canvas || !ctx) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = window.devicePixelRatio;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }

    function drawDotGrid() {
      if (!ctx) return;
      ctx.fillStyle = DOT_COLOR;
      for (let x = 0; x <= width; x += GRID_SIZE) {
        for (let y = 0; y <= height; y += GRID_SIZE) {
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      drawDotGrid();

      if (Math.random() < SPAWN_RATE && paths.length < MAX_PATHS) {
        paths.push(new Path());
      }

      for (let i = paths.length - 1; i >= 0; i--) {
        paths[i].update();
        paths[i].draw();
        if (paths[i].points.length === 0) paths.splice(i, 1);
      }

      requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50"
    />
  );
}
