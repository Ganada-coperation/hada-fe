declare global {
  interface Window {
    gtag: (
      command: string,
      eventName: string,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const logEvent = (
  eventName: string,
  params: Record<string, string | number | boolean>
) => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
};
