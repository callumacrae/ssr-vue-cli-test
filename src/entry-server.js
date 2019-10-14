import createApp from './main';

export default () => {
  return new Promise((resolve, reject) => {
    const { app } = createApp();
    resolve(app);
  });
};
