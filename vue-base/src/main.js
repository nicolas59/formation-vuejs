// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Football from './components/Football'
import Team from './components/Team'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.component('bf-table', Buefy.Table)
Vue.component('bf-table-column', Buefy.TableColumn)

Vue.component('bf-tabs', Buefy.Tabs)
Vue.component('bf-tab-item', Buefy.TabItem)

const routes = [
  { path: '/league', component: Football },
  { path: '/league/:leagueId/team/:id', component: Team, props: true }
]

const router = new VueRouter({
  routes // raccourci pour `routes: routes`
})

Vue.http.headers.common['X-Auth-Token'] = '009a44174d6e4ffda80be88df5522506'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router: router
})
