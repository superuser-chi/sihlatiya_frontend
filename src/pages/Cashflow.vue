<template>
  <div class="content">
    <base-header
      type="gradient-success"
      class="pb-6 pb-8 pt-md-8"
      id="status-header"
    >
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Sales"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4 mb-xl-0"
          >
            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Total Expenditure"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Break-Even Point"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Gross Profit"
            type="gradient-info"
            sub-title="49,65%"
            icon="ni ni-chart-bar-32"
            class="mb-4 mb-xl-0"
          >

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>
    <div class="row">
      <div
        class="col-md-6 bg-primary"
        id="receipts"
      >
        <card
          :title="table1.title"
          class="card-plain"
        >
          <div class="table-full-width table-responsive">
            <base-table
              theadClasses="thead-light"
              :title="table1.title"
              :sub-title="table1.subTitle"
              :data="table1.data"
              :columns="table1.columns"
              tbodyClasses
            >

            </base-table>
          </div>
        </card>
      </div>
      <div class="col-md-6 bg-warning">
        <card
          :title="table2.title"
          class="card-plain"
        >
          <div class="table-full-width table-responsive">
            <base-table
              type="table-bordered"
              theadClasses="thead-light"
              tbodyClasses="table-striped"
              :title="table2.title"
              :sub-title="table2.subTitle"
              :data="table2.data"
              :columns="table2.columns"
            >

            </base-table>
          </div>
        </card>
      </div>

    </div>
  </div>
</template>
<script>
import { BaseTable, BaseHeader, StatsCard } from "@/components";
const tableColumns = ["date", "description", "amount"];
const tableData = [
  {
    id: 1,
    date: "01 August",
    amount: "E 36.738",
    description: "Balance b/d",
  },
  {
    id: 2,
    date: "03 August",
    amount: "E 23,789",
    description: "Sales"
  },
  {
    id: 3,
    date: "Sage Rodriguez",
    amount: "$56,142",
    description: "Netherlands",
  },
  {
    id: 4,
    date: "Philip Chaney",
    amount: "$38,735",
    description: "Korea, South",
  },
  {
    id: 5,
    date: "Doris Greene",
    amount: "$63,542",
    description: "Malawi",
  },
  {
    id: 6,
    date: 'Mason Porter',
    amount: '$98,615',
    description: 'Chile',
  },
  {
    id: 7,
    date: 'Jon Porter',
    amount: '$78,615',
    description: 'Portugal',
  },
  {
    id: 8,
    date: 'Balance',
    amount: '$78,615',
    description: '',
  }
];
const tableData2 = [
  {
    id: 1,
    date: "01 August",
    amount: "E 36.738",
    description: "Balance b/d",
  },
  {
    id: 2,
    date: "02 August",
    amount: "E 23,789",
    description: "Operating Cost"
  },
  {
    id: 3,
    date: "3 August",
    amount: "$56,142",
    description: "Purchases",
  },
  {
    id: 4,
    date: 'Balance',
    amount: '$78,615',
    description: '',
  }
];

export default {
  components: {
    BaseTable, BaseHeader, StatsCard
  },
  data () {
    return {
      table1: {
        title: "Receipts",
        columns: [...tableColumns],
        data: [...tableData]
      },
      table2: {
        title: "Payments",
        columns: [...tableColumns],
        data: [...tableData2]
      }
    };
  },
  beforeMount () {
    console.log("We are here")  }
};
</script>
<style scoped>
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px; /* remove scrollbar space */
  background: transparent;
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #ff0000;
}

.table-striped > tbody > tr:last-child {
  background-color: red;
}

#status-header .card {
  background: var(--green) !important;
  color: aliceblue;
}
</style>
