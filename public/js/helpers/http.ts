const POSTRequest = (url: string, payload: object, cb: (any: any) => void) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(async (responseData): Promise<void> => {
      const parsedData: any = await responseData.text();
      cb(parsedData);
    })
    .catch((): void => cb(false));
};
