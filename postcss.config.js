import tailwindcss from '@tailwindcss/postcss';
import postcssTheme from 'postcss-theme';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [tailwindcss, postcssTheme, autoprefixer],
};
