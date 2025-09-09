/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let verificationData: any = null;

export const receivedVerificationDetails = (verification: any) => {
  verificationData = verification;
  console.log("User verification:", verificationData?.data);

  if (verificationData?.data) {
    localStorage.setItem(
      "verificationData",
      JSON.stringify(verificationData.data)
    );

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("verificationDataUpdated"));
  }
};

export const getVerificationData = () => {
  const stored = localStorage.getItem("verificationData");
  if (stored) return JSON.parse(stored);
  return null;
};
