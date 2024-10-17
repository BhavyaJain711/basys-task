import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import compression from 'vite-plugin-compression2';
import path from 'path';
// import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      compression(),
      // basicSsl()
    ],
    resolve: {

        alias: {

            "@": path.resolve(__dirname),

            routes: `${path.resolve(__dirname, "./src/routes/")}`,

            services: `${path.resolve(__dirname, "./src/services/")}`,

        }

    },
    server: {},
    esbuild:{
      drop: ['console', 'debugger'],
    },
    define: {
      __APP_ENV__: JSON.stringify(env),
    },
    // https: {
    //   key: fs.readFileSync('./printify-privateKey.key'),
    //   cert: fs.readFileSync('./printify.crt')
    // }
  };
});
