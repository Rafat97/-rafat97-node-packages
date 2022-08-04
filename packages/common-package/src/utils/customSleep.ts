export const customSleep = async (time: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      console.log("done sleep " + time);
      resolve();
    }, time);
  });
};
