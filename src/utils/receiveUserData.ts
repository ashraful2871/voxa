/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let userData: any = null;

export const receiveUserData = (user: any) => {
  userData = user;
  console.log("User received:", userData?.data);

  if (userData?.data) {
    localStorage.setItem("userdata", JSON.stringify(userData.data));

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("userDataUpdated"));
  }
};

export const getUserData = () => {
  const stored = localStorage.getItem("userdata");
  if (stored) return JSON.parse(stored);
  return null;
};
