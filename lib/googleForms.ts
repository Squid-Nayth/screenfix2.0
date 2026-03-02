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
