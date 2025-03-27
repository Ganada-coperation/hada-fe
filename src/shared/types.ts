export type FontsTypes = {
    [key: string]: string;
  };
  export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}