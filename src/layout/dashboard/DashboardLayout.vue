<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link
          to="/dashboard"
          :name="$t('Performance Summary')"
          icon="tim-icons icon-chart-pie-36"
        />
        <sidebar-link
          to="/purchases"
          :name="$t('Purchases')"
          icon="tim-icons  icon-cart"
        />
        <sidebar-link
          to="/sales"
          :name="$t('Sales')"
          icon="tim-icons icon-coins"
        />
        <sidebar-link
          to="/cashflow"
          :name="$t('Cash Flow')"
          icon="tim-icons icon-paper"
        />
        <sidebar-link
          to="/break-Even-Analysis"
          :name="$t('Break-Even Analysis')"
          icon="tim-icons icon-chart-bar-32"
        />
        <sidebar-link
          to="/maps"
          :name="$t('Market Analysis')"
          icon="tim-icons icon-map-big"
        />
        <sidebar-link
          to="/recommendations"
          :name="$t('Product Recommendations')"
          icon="tim-icons icon-light-3"
        />
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
