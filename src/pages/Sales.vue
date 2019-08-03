<template>
  <div class="wrapper">
    <div class="row">
      <div class="col-12">
        <card type="chart">
          <template slot="header">
            <div class="row">
              <div class="col-sm-6">
                <h5 class="card-category">Daily</h5>
                <h2 class="card-title">Sales</h2>
              </div>
              <div class="col-sm-6">
                <div
                  class="btn-group btn-group-toggle"
                  :class="isRTL ? 'float-left' : 'float-right'"
                  data-toggle="buttons"
                >
                  <label
                    v-for="(option, index) in bigLineChartCategories"
                    :key="option"
                    class="btn btn-sm btn-primary btn-simple"
                    :class="{active: bigLineChart.activeIndex === index}"
                    :id="index"
                  >
                    <input
                      type="radio"
                      @click="initBigChart(index)"
                      name="options"
                      autocomplete="off"
                      :checked="bigLineChart.activeIndex === index"
                    >
                    {{option}}
                  </label>
                </div>
              </div>
            </div>
          </template>
          <div class="chart-area">
            <line-chart
              style="height: 100%"
              ref="bigChart"
              chart-id="big-line-chart"
              :chart-data="bigLineChart.chartData"
              :gradient-colors="bigLineChart.gradientColors"
              :gradient-stops="bigLineChart.gradientStops"
              :extra-options="bigLineChart.extraOptions"
            >
            </line-chart>
          </div>
        </card>
      </div>
    </div>
    <div class="row row-eq-height">
      <div class="col-8">
        <card :title="table1.title">
          <div class="table-responsive">
            <base-table
              :data="table1.data"
              :columns="table1.columns"
              thead-classes="text-primary"
            >
            </base-table>
          </div>
        </card>
      </div>
      <div class="col-4">
        <card>
          <h5
            slot="header"
            class="title"
          >Add new sale</h5>
          <div class="row">
            <div class="col-md-12">
              <base-input
                label="Name"
                placeholder="Name of Business"
                v-model="model.name"
              >
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 pr-md-1">
              <base-input
                label="Description"
                v-model="model.description"
                placeholder="Describe purchase"
              >
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-8 pr-md-1">
              <base-input
                label="Unit unit_price"
                v-model="model.unit_unit_price"
                placeholder="unit_price per unit"
              >
              </base-input>
            </div>
            <div class="col-md-4 pr-md-1">
              <base-input
                label="Quantity"
                v-model="model.quantity"
                placeholder="City"
              >
              </base-input>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 pr-md-1">
              <base-input
                label="Total total_cost"
                placeholder="Total total_cost of the purchase"
                v-model="model.total_cost"
                disabled
              >
              </base-input>
            </div>
          </div>
          <base-button
            slot="footer"
            type="primary"
            fill
          >Add</base-button>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
import LineChart from '@/components/Charts/LineChart';
import * as chartConfigs from '@/components/Charts/config';
import config from '@/config';
const tableColumns = ["name", "description", "units", "unit_price", "total_total_cost"];
const tableData = [
  {
    id: 1,
    name: "Dakota Rice",
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 2,
    name: "Minerva Hooper",
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 3,
    name: "Sage Rodriguez",
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 4,
    name: "Philip Chaney",
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 5,
    name: "Doris Greene",
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 6,
    name: 'Mason Porter',
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  },
  {
    id: 7,
    name: 'Jon Porter',
    description: "Nick Nacks 500g",
    units: "100",
    unit_price: "E5",
    total_cost: "E500"
  }
];

export default {
  components: {
    BaseTable,
    LineChart,
  },
  data () {
    return {
      table1: {
        title: "Sales for the current Month",
        columns: [...tableColumns],
        data: [...tableData]
      },
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
          [60, 80, 65, 130, 80, 105, 90, 130, 70, 115, 60, 130]
        ],
        activeIndex: 0,
        chartData: null,
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
      model: {
        name: undefined,
        description: undefined,
        unit_unit_price: undefined,
        quantity: undefined,
        total_cost: undefined
      }
    };
  },
  computed: {
    enableRTL () {
      return this.$route.query.enableRTL;
    },
    isRTL () {
      return this.$rtl.isRTL;
    },
    bigLineChartCategories () {
      return this.$t('dashboard.chartCategories');
    }
  },
  methods: {
    initBigChart (index) {
      let chartData = {
        datasets: [{
          fill: true,
          borderColor: config.colors.primary,
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: config.colors.primary,
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: config.colors.primary,
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.bigLineChart.allData[index]
        }],
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
      }
      this.$refs.bigChart.updateGradients(chartData);
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted () {
    this.i18n = this.$i18n;
    if (this.enableRTL) {
      this.i18n.locale = 'ar';
      this.$rtl.enableRTL();
    }
    this.initBigChart(0);
  },
  beforeDestroy () {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
};
</script>
<style>
.row-eq-height {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}
</style>
