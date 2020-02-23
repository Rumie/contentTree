<template>
  <div id="app">
    <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom: 20px;"></el-input>
    <el-tree
      default-expand-all
      accordion
      highlight-current
      :show-checkbox="false"
      ref="tree"
      :data="categories"
      :filter-node-method="filterNode"
      empty-text="No data to show"
    />
  </div>
</template>

<script>
import categories from '@/constants/categories';
export default {
  name: 'App',
  data() {
    return {
      filterText: '',
      categories: categories,
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>

<style lang="scss">
body {
  font-family: sans;
  /* background: #fafafa; */
}
</style>
