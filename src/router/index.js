import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/posts",
      name: "posts",
      component: () => import("../views/PostsView.vue"),
      children: [
        {
          path: "category/:category",
          name: "category",
          component: () => import("../views/CategoryView.vue"),
          children: [
            {
              path: ":subcategory",
              name: "subcategory",
              component: () => import("../views/SubcategoryView.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/post/:id",
      name: "blogPost",
      component: () => import("../views/BlogPost.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
