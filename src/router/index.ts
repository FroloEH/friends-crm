import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";
import AuthenticationPage from "../views/AuthenticationPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/contacts",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/contacts",
      },
      {
        path: "contacts",
        component: () => import("@/views/ContactListTab.vue"),
      },
      {
        path: "add-contact",
        component: () => import("@/views/AddContactTab.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: AuthenticationPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
