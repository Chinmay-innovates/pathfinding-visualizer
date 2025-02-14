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
						bgColor: "#E11D48BF",
						borderRadius: "100%",
					},
					"50%": {
						bgColor: "#EA580CBF",
					},
					"75%": {
						transform: "scale(1.2)",
						bgColor: "#FB923CBF",
					},
					"90%": {
						transform: "scale(0.8)",
						bgColor: "#FDE68A",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
				travered: {
					"0%": {
						transform: "scale(0.3)",
						bgColor: "#9333EABF",
						borderRadius: "100%",
					},
					"50%": {
						bgColor: "#4F46e4BF",
					},
					"75%": {
						transform: "scale(1.2)",
						bgColor: "#3B82F6BF",
					},
					"100%": {
						transform: "scale(1)",
						bgColor: "#22D3EE",
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
						// backgroundColor: "#9CA3AF",
						backgroundColor: "#6B7280",
					},
					"100%": {
						opacity: "0",
						transform: "scale(0.3)",
						// backgroundColor: "#F8FAFC",
						backgroundColor: "#27272A",
					},
				},
			},
			animation: {
				wall: "wall 0.3s ease-out forwards",
				"wall-removal": "wall-removal 0.3s ease-out forwards",
			},
		},
	},
	plugins: [],
};
