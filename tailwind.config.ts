import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        trendyol: {
          orange: '#f27a1a',
          text: '#333333',
          muted: '#999999',
          line: '#e6e6e6',
          bg: '#fafafa'
        }
      }
    }
  },
  plugins: []
};

export default config;
