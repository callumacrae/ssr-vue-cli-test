import Vue from 'vue';
import App from './App.vue';

const createApp = () => {
  const app = new Vue({
    render: h => h(App)
  });

  return { app };
};

export default createApp;

if (typeof window !== 'undefined') {
  const { app } = createApp();
  app.$mount('#app');
}
