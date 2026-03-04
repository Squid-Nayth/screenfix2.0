export const submitHiddenGoogleForm = (
  formResponseUrl: string,
  payload: Record<string, string>,
  successDelayMs = 1200
) =>
  new Promise<void>((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Fenetre non disponible'));
      return;
    }

    const body = new URLSearchParams(payload);
    const blob = new Blob([body], { type: 'application/x-www-form-urlencoded' });

    // Try beacon first (non-blocking, often more fiable cross-origin)
    if (navigator.sendBeacon && navigator.sendBeacon(formResponseUrl, blob)) {
      window.setTimeout(() => resolve(), successDelayMs);
      return;
    }

    fetch(formResponseUrl, {
      method: 'POST',
      mode: 'no-cors',
      body
    })
      .then(() => {
        window.setTimeout(() => resolve(), successDelayMs);
      })
      .catch(() => {
        reject(new Error('Soumission Google Forms impossible.'));
      });
  });
