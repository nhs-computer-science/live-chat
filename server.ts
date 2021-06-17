import path from 'path';
import dotenv from 'dotenv';

import app from './app';

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const PORT = process.env.PORT! || 5000;

app.listen(PORT, (): void => {
  console.log(`Listening to request on port ${PORT}`);
});

const merge = (firstHalf: number[], secondHalf: number[]): number[] => {
  for (let i = 0; i < firstHalf.length; i++) {
    for (let k = 0; k < secondHalf.length; k++) {
      if (firstHalf[i] > secondHalf[k]) {
        const smallerValues: number[] = [];

        let c = 0;

        while (c <= k) {
          smallerValues[c] = secondHalf[c];
          secondHalf.shift();
          c++;
        }

        const greaterValues: number[] = firstHalf.splice(i);

        firstHalf = [...firstHalf, ...smallerValues, ...greaterValues];
      }
    }
  }

  return firstHalf.length > 0 ? [...firstHalf, ...secondHalf] : [...firstHalf];
};

const mergeSort = (a1: number[]): any => {
  if (a1.length < 2) {
    return a1;
  }

  const firstHalf = a1.splice(0, a1.length / 2);
  return merge(mergeSort(firstHalf), mergeSort(a1));
};

const init = (): void => {
  const a1: number[] = [];

  for (let i = 0; i < 10; i++) {
    a1[i] = Math.floor(Math.random() * 10);
  }

  console.log(mergeSort(a1));
};

init();
