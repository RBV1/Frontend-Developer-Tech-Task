import Vue from 'vue'
import App from './components/App.vue'
import router from '@/router'
import store from '@/store'



// Include uikit
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

// loads the Icon plugin
UIkit.use(Icons);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
