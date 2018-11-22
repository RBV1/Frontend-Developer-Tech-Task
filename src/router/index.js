import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store'

// Pages
import Home from "@/pages/Home";
import Movie from "@/pages/Movie";
import NotFound from "@/pages/NotFound";



Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: "/movie/:id(\\d+)",
    name: 'Movie',
    component: Movie,
    props: true
  },
  {
    path: "*",
    name: 'NotFound',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.state.movies.baseImageUrl) {
    store.dispatch('movies/fetchConfig')
  }
  next()
})

export default router;
