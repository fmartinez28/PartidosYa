import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.partidosya.app',
  appName: 'frontend',
  webDir: 'dist/frontend',
  server: {
    androidScheme: 'http'
  }
};

export default config;
