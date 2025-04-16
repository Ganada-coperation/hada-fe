declare global {
  interface Window {
    gtag?: (event: string, action: string, params: Record<string, unknown>) => void;
  }
}

export const logEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};
