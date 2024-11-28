import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()); // Load environment variables based on the mode (e.g., development, production)

  return {
    plugins: [react()], // Include the React plugin
    define: {
      'process.env': env, // Define `process.env` for use in the app
    },
  };
});
