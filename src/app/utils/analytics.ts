export const logEvent = (eventName: string, params: Record<string, string>) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, params);
  }
};
