import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			keyframes: {
				path: {
					"0%": {
						transform: "scale(0.5)",
						backgroundColor: "#E11D48BF",
						// boxShadow: "0px 0px 10px #E10D46BF",
						borderRadius: "100%",
					},
					"50%": {
						backgroundColor: "#EA580CBF",
						transform: "scale(1.1)",
					},
					"75%": {
						transform: "scale(1.3)",
						backgroundColor: "#FB923CBF",
						// boxShadow: "0px 0px 20px #FB925CBF",
					},
					"90%": {
						transform: "scale(1)",
						backgroundColor: "#FDE68A",
					},
					"100%": {
						transform: "scale(1)",
						boxShadow: "none",
					},
				},

				traversed: {
					"0%": {
						transform: "scale(0.5)",
						backgroundColor: "#4C1D95BF", // Deep purple
						boxShadow: "0px 0px 10px #4C1D95", // Soft glow effect
						borderRadius: "100%",
					},
					"40%": {
						backgroundColor: "#5B21B6BF", // Richer purple
						transform: "scale(1.1)",
					},
					"70%": {
						transform: "scale(1.2)",
						backgroundColor: "#6366F1BF", // Bright blue
						boxShadow: "0px 0px 15px #6366F1",
					},
					"90%": {
						transform: "scale(1)",
						backgroundColor: "#60A5FA", // Lighter blue
					},
					"100%": {
						transform: "scale(1)",
						boxShadow: "none",
					},
				},

				wall: {
					"0%": {
						transform: "scale(0.7)",
						opacity: 0.5,
					},
					"50%": {
						transform: "scale(1.05)",
						opacity: 1,
					},
					"100%": {
						transform: "scale(1)",
						opacity: 1,
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
				traversed: "traversed 1.5s cubic-bezier(0, 0, 0.2, 1)",
				path: "path 2.5s cubic-bezier(0, 0, 0.2, 1)",
				wall: "wall 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
			},
		},
	},
	plugins: [],
};
