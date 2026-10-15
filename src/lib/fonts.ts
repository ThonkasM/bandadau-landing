import { IBM_Plex_Sans, Rubik } from 'next/font/google';

export const rubik = Rubik({ subsets: ['latin'], display: 'swap', variable: '--font-rubik', weight: ['500', '600', '700', '800'] });
export const plex = IBM_Plex_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-plex', weight: ['400', '500', '600', '700'] });
export const fontVariables = `${rubik.variable} ${plex.variable}`;
