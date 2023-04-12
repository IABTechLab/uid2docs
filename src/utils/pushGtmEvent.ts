declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushGtmEvent(data = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
