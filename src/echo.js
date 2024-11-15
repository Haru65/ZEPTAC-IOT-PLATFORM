import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

let echoInstance = null; // Singleton variable for the Echo instance

const initializeEcho = (token) => {
  // Check if an instance is already initialized in session storage
  if (echoInstance || sessionStorage.getItem("echoInitialized")) {
    console.log("Reusing existing Echo instance");
    return echoInstance;
  }

  // Create a new Echo instance if it doesn't exist
  echoInstance = new Echo({
    broadcaster: "pusher",
    key: "0deb67beae544eb86503",
    cluster: "ap2",
    encrypted: true,
    authEndpoint: "https://api.zeptac.com/api/v1/broadcasting/auth",
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  // Set a flag in sessionStorage to mark initialization
  sessionStorage.setItem("echoInitialized", "true");

  console.log("Echo instance initialized");
  return echoInstance;
};

export default initializeEcho;
