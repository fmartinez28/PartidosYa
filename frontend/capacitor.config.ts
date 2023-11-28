import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smatcher.app',
  appName: 'frontend',
  webDir: 'dist/frontend',
  server: {
    androidScheme: 'http'
  }
};

export default config;
