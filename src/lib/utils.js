// src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- MODIFIED gData for ARC lines ---
const N_ARCS = 30; // Number of arcs you want
export const gData = [...Array(N_ARCS).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  // You can still assign a color or use default arc color
  color: ['#00bcd4', '#ff4040', '#ffffff', '#00ffc8'][Math.round(Math.random() * 3)],
  // Optional: add a 'stroke' for arc thickness
  stroke: Math.random() * 0.5 + 0.1, // Random stroke thickness
}));