import filter from 'bad-words';

export default (message: string) =>
  new filter({ placeHolder: '*' }).clean(message);
