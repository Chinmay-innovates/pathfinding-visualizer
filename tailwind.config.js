import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				path: {
					"0%": {
						transform: "scale(0.3)",
						backgroundColor: "#E11D48BF",
						borderRadius: "100%",
					},
					"50%": {
						backgroundColor: "#EA580CBF",
					},
					"75%": {
						transform: "scale(1.2)",
						backgroundColor: "#FB923CBF",
					},
					"90%": {
						transform: "scale(0.8)",
						backgroundColor: "#FDE68A",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				traversed: {
					"0%": {
						transform: "scale(0.3)",
						backgroundColor: "#9333EABF",
						borderRadius: "100%",
					},
					"50%": {
						backgroundColor: "#4F46e4BF",
					},
					"75%": {
						transform: "scale(1.2)",
						backgroundColor: "#3B82F6BF",
					},
					"100%": {
						transform: "scale(1)",
						backgroundColor: "#22D3EE",
					},
				},
				wall: {
					"0%": {
						transform: "scale(0.7)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				"wall-removal": {
					"0%": {
						opacity: "1",
						transform: "scale(1)",
						backgroundColor: "#9CA3AF",
						// backgroundColor: "#6B7280",
					},
					"100%": {
						opacity: "0",
						transform: "scale(0.3)",
						backgroundColor: "#F8FAFC",
						// backgroundColor: "#27272A",
					},
				},
			},
			animation: {
				"wall-removal": "wall-removal 0.3s ease-out forwards",
				traversed: "traversed 0.5s cubic-bezier(0, 0, 0.2, 1)",
				path: "path 2.5s cubic-bezier(0, 0, 0.2, 1)",
				wall: "wall 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
			},
		},
	},
	plugins: [],
};
