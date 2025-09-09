/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let subsCriptionData: any = null;

export const receivedSubscriptionDetails = (subscription: any) => {
  subsCriptionData = subscription;
  console.log("User subscription:", subsCriptionData?.data);

  if (subsCriptionData?.data) {
    localStorage.setItem(
      "subscriptionData",
      JSON.stringify(subsCriptionData.data)
    );

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("subscriptionDataUpdated"));
  }
};

export const getSSubscriptionData = () => {
  const stored = localStorage.getItem("subscriptionData");
  if (stored) return JSON.parse(stored);
  return null;
};
