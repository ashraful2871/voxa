/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let planDetailsData: any = null;

export const receivedPlanDetails = (subscription: any) => {
  planDetailsData = subscription;
  console.log("User subscription:", planDetailsData?.data);

  if (planDetailsData?.data) {
    localStorage.setItem(
      "planDetailsData",
      JSON.stringify(planDetailsData.data)
    );

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("planDetailsDataUpdated"));
  }
};

export const getPlanDetailsData = () => {
  const stored = localStorage.getItem("planDetailsData");
  if (stored) return JSON.parse(stored);
  return null;
};
