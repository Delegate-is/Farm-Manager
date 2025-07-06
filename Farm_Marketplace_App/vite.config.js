// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Ensure the react plugin is correctly configured for JSX transformation
    react({
      // This ensures that JSX is transformed correctly for both .js and .jsx files
      // by default, @vitejs/plugin-react handles this, but being explicit can help.
      jsxRuntime: 'automatic' // This is the modern React JSX transform
    })
  ],
  // Remove or comment out the 'esbuild' section if you added it previously,
  // as @vitejs/plugin-react should handle JSX parsing.
  // esbuild: {
  //   loader: 'jsx',
  //   include: /src\/.*\.js$/,
  //   exclude: [],
  // },
})