import {
	Inter,
	Lato,
	Playfair_Display,
	Plus_Jakarta_Sans,
} from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-plus-jakarta",
});

export const playfair = Playfair_Display({
	subsets: ["latin"],
	variable: "--font-playfair",
});

export const lato = Lato({
	weight: ['300', '400', '700', '900'],
	subsets: ["latin"],
	variable: "--font-lato",
});

export const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});
