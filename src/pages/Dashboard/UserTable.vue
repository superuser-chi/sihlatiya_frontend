<template>
  <base-table
    :data="table.data"
    :columns="table.columns"
    thead-classes="text-primary"
  >
  </base-table>
</template>
<script>
import { BaseTable } from "@/components";
const tableColumns = ["name", "purchase", "selling", "markup"];
const tableData = [
  {
    id: 1,
    name: "Beans",
    selling: "E 36.73",
    purchase: "E50.00",
    markup: "E 13.27",
  },
  {
    id: 2,
    name: "Cheese",
    selling: "E 6.00",
    purchase: "E 3.78",
    markup: "E 2.22",
  },
  {
    id: 3,
    name: "Pork",
    selling: "E 6.00",
    purchase: "E 5.14",
    markup: "E 0.86",
  },
  {
    id: 4,
    name: "Nick Nacks",
    selling: "E 0.50",
    purchase: "E 1.00",
    markup: "E 0.50",
  },
  {
    id: 5,
    name: "Pork",
    selling: "E8.35",
    purchase: "E 8.50",
    markup: "E E 0.15",
  },
]
export default {
  components: {
    BaseTable
  },
  data () {
    return {
      table: {
        title: "Receipts",
        columns: [...tableColumns],
        data: [...tableData]
      }
    }
  }
}
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
</style>
