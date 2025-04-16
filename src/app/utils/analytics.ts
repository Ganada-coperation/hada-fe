export const trackEvent = (event: string, params?: Record<string, any>) => {
    if (typeof window !== "undefined") {
      window.dataLayer?.push({ event, ...params });
    }
  };
  