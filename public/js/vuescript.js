
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },

  { path: '/bar', component: Bar }
]

const router = new VueRouter({
    mode: 'history',
    routes 
})

const app = new Vue({
  router
}).$mount('#app')