<template>
  <div id="app">
    <!-- nav header  -->
    <nav class="navigation">
      <img src="@/assets/images/logo.svg" alt="Rumie" />
      <div class="navigation__title">
        Rumie Content Categories
      </div>
    </nav>



    <!-- search -->
    <div style="margin: 10px">
      <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom: 20px;"></el-input>
    </div>

    <!-- tree explorer -->
    <!-- TODO: migrate to it's own component, ready for export and print -->
    <el-tree
      :default-expand-all="false"
      accordion
      highlight-current
      :show-checkbox="false"
      ref="tree"
      :data="categories"
      :filter-node-method="filterNode"
      empty-text="No data to show"
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <div>{{ node.label }}</div>
        <div class="custom-tree-node__type">{{ data['type'] }}</div>
      </div>
    </el-tree>
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
  font-family: 'system-ui';
}

.navigation {
  padding: var(--spacing-4);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.navigation__title {
  margin-top: var(--spacing-2);
  font-weight: var(--bold);
  font-size: var(--xl3);
  letter-spacing: var(--tracking-tight);
  margin-left: auto;
  margin-right: auto;
}

/* tree style */
.custom-tree-node {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.custom-tree-node__type {
  margin-left: auto;
  font-size: var(--xs) !important;
}

.el-tree-node__content {
  padding: 5px;
}

.el-tree-node__content:hover {
  background: var(--primary-lightest);
  background-color: var(--primary-lightest);
}

.el-tree-node.is-current > .el-tree-node__content {
  background: var(--primary-lightest) !important;
  background-color: var(--primary-lightest) !important;
}

.el-tree-node__content {
  padding: 20px;
}

.el-tree-node__label {
  font-size: 20px;
}

.el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: var(--xl4) !important;
}

.el-tree-node .el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: var(--xl2) !important;
}

.el-tree-node .el-tree-node .el-tree-node .el-tree-node__content .el-tree-node__label {
  font-size: var(--lg) !important;
}

</style>
