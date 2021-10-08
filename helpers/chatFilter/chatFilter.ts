import filter from 'bad-words';

export default (message: string) => {
  try {
    return new filter({ placeHolder: '*' }).clean(message);
  } catch (err) {
    return '[Emoticons are currently unable to be processed and sent as a chat]';
  }
};
