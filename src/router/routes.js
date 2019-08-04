import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import( /* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const Cashflow = () => import( /* webpackChunkName: "common" */ "@/pages/Cashflow.vue");
const Notifications = () => import( /* webpackChunkName: "common" */ "@/pages/Notifications.vue");
const Recommendations = () => import( /* webpackChunkName: "common" */ "@/pages/Recommendations.vue");
const Maps = () => import( /* webpackChunkName: "common" */ "@/pages/Maps.vue");
const BreakEvenAnalysis = () => import( /* webpackChunkName: "common" */ "@/pages/BreakEvenAnalysis.vue");
const Purchases = () => import( /* webpackChunkName: "common" */ "@/pages/Purchases.vue");
const Sales = () => import( /* webpackChunkName: "common" */ "@/pages/Sales.vue");
const Typography = () => import( /* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import( /* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [{
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [{
        path: "dashboard",
        name: "Summary",
        component: Dashboard
      },
      {
        path: "cashflow",
        name: "cashflow",
        component: Cashflow
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "break-Even-Analysis",
        name: "Break-Even-Analysis",
        component: BreakEvenAnalysis
      },
      {
        path: "purchases",
        name: "Purchases",
        component: Purchases
      },
      {
        path: "sales",
        name: "sales",
        component: Sales

      },
      {
        path: "recommendations",
        name: "recommendations",
        component: Recommendations
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  {
    path: "*",
    component: NotFound
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
