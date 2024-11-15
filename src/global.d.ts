
import 'laravel-echo';

declare global {
    interface Window {
      Echo: any; // Add Echo property
      Pusher: any;   // Add socket.io property if needed
      gtag: (...args: any[]) => void;
    }
  }
  
  export {};