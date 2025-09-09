/* eslint-disable @typescript-eslint/no-explicit-any */
/* utils/receiveUserData.ts */
let reportData: any = null;

export const receivedReportDetails = (report: any) => {
  reportData = report;
  console.log("User report:", reportData?.data);

  if (reportData?.data) {
    localStorage.setItem("reportData", JSON.stringify(reportData.data));

    // Dispatch a custom event to notify components
    window.dispatchEvent(new Event("reportDataUpdated"));
  }
};

export const getReportData = () => {
  const stored = localStorage.getItem("reportData");
  if (stored) return JSON.parse(stored);
  return null;
};
