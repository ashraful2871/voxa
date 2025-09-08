/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let moderationData: any = null;

export const receivedModerationDetails = (moderation: any) => {
  moderationData = moderation;
  console.log("User moderation:", moderationData?.data);

  if (moderationData?.data) {
    localStorage.setItem("moderationData", JSON.stringify(moderationData.data));

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("moderationDataUpdated"));
  }
};

export const getModerationData = () => {
  const stored = localStorage.getItem("moderationData");
  if (stored) return JSON.parse(stored);
  return null;
};
