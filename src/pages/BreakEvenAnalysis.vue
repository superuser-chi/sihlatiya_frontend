<template>
  <div>
    <base-header
      type="gradient-success"
      class="pb-6 pb-8 pt-md-8"
      id="status-header"
    >
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-4 col-lg-6">
          <stats-card
            title="Total Expenditure"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-4 col-lg-6">
          <stats-card
            title="Total Income"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </div>
        <div class="col-xl-4 col-lg-6">
          <stats-card
            title="Break-Even Point"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
    <div class="row">
      <div class="col-12">
        <card
          id="fullscreen"
          type="chart container-fluid"
        >
          <template slot="header">
            <div class="row">
              <div
                class="col-sm-6"
                :class="isRTL ? 'text-right' : 'text-left'"
              >
                <h2 class="card-title">Break-Even Analysis</h2>
              </div>
            </div>
          </template>
          <div class="chart-area-full">
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
  </div>
</template>
<script>
import { BaseTable, BaseHeader, StatsCard } from "@/components";
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';
import * as chartConfigs from '@/components/Charts/config';
import TaskList from './Dashboard/TaskList';
import UserTable from './Dashboard/UserTable';
import config from '@/config';

export default {
  components: {
    LineChart,
    BarChart,
    TaskList,
    UserTable,
    BaseHeader,
    StatsCard
  },
  data () {
    return {
      bigLineChart: {
        allData: [
          [100, 70, 90, 70, 85, 60, 75, 60, 90, 50, 60, 100, 10, 30, 0, 45, 50, 120, 5, 100, 90, 80, 130, 100, 60, 90, 100, 85, 50, 150, 90],
          [0, 30, 15, 55, 95, 105, 90, 100, 100, 95, 170, 120, 165, 230, 100, 160, 150, 180, 213, 250, 190, 200, 180, 293, 167, 240, 199,
            300, 240, 250, 290, 100],
          [80, 120, 105, 110, 95, 105, 90, 100, 80, 95, 70, 120],
        ],
        activeIndex: 0,
        chartData: null,
        extraOptions: chartConfigs.purpleChartOptions,
        gradientColors: config.colors.primaryGradient,
        maintainAspectRatio: false,
        gradientStops: [1, 0.4, 0],
        categories: []
      },
    }
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

      var fillBetweenLinesPlugin = {
        afterDatasetsDraw: function (chart) {
          var ctx = chart.chart.ctx;
          ctx.save();

          for (var d = 0; d < datasets.length; d++) {
            var dataset = datasets[d];
            if (dataset.fillBetweenSet == undefined) {
              continue;
            }

            // get meta for both data sets
            var meta1 = chart.getDatasetMeta(d);
            var meta2 = chart.getDatasetMeta(dataset.fillBetweenSet);

            // do not draw fill if one of the datasets is hidden
            if (meta1.hidden || meta2.hidden) continue;

            // create fill areas in pairs
            for (var p = 0; p < meta1.data.length - 1; p++) {
              // if null skip
              if (dataset.data[p] == null || dataset.data[p + 1] == null) continue;

              ctx.beginPath();

              // trace line 1
              var curr = meta1.data[p];
              var next = meta1.data[p + 1];
              ctx.moveTo(curr._view.x, curr._view.y);
              ctx.lineTo(curr._view.x, curr._view.y);
              if (curr._view.steppedLine === true) {
                ctx.lineTo(next._view.x, curr._view.y);
                ctx.lineTo(next._view.x, next._view.y);
              }
              else if (next._view.tension === 0) {
                ctx.lineTo(next._view.x, next._view.y);
              }
              else {
                ctx.bezierCurveTo(
                  curr._view.controlPointNextX,
                  curr._view.controlPointNextY,
                  next._view.controlPointPreviousX,
                  next._view.controlPointPreviousY,
                  next._view.x,
                  next._view.y
                );
              }

              // connect dataset1 to dataset2
              var curr = meta2.data[p + 1];
              var next = meta2.data[p];
              ctx.lineTo(curr._view.x, curr._view.y);

              // trace BACKWORDS set2 to complete the box
              if (curr._view.steppedLine === true) {
                ctx.lineTo(curr._view.x, next._view.y);
                ctx.lineTo(next._view.x, next._view.y);
              }
              else if (next._view.tension === 0) {
                ctx.lineTo(next._view.x, next._view.y);
              }
              else {
                // reverse bezier
                ctx.bezierCurveTo(
                  curr._view.controlPointPreviousX,
                  curr._view.controlPointPreviousY,
                  next._view.controlPointNextX,
                  next._view.controlPointNextY,
                  next._view.x,
                  next._view.y
                );
              }

              // close the loop and fill with shading
              ctx.closePath();
              ctx.fillStyle = dataset.fillBetweenColor || "rgba(0,0,0,0.1)";
              ctx.fill();
            } // end for p loop
          }
        } // end afterDatasetsDraw
      }; // end fillBetweenLinesPlugin

      //Chart.pluginService.register(fillBetweenLinesPlugin);

      let chartData = {
        datasets: [{
          label: "Sales",
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
          steppedLine: false,
          fillBetweenSet: 1,
          fillBetweenColor: "rgba(255,0,0, 0.2)",
          pointRadius: 4,
          data: this.bigLineChart.allData[index[1]]
        },
        {
          label: "Purchase",
          fill: false,
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
          steppedLine: false,
          fillBetweenSet: 1,
          fillBetweenColor: "rgba(255,0,0, 0.2)",
          pointRadius: 4,
          data: this.bigLineChart.allData[index[0]]
        }],
        labels: ['1', '2', '3', '4', '5', '6', '17', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
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
    this.initBigChart([0, 1]);
  },
  beforeDestroy () {
    if (this.$rtl.isRTL) {
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
    }
  }
};
</script>

<style scoped>
#fullscreen {
  height: 95vh;
}
#status-header .card {
  background: var(--green) !important;
  color: aliceblue;
}
</style>
