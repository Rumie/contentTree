<template>
  <div id="app">
    <el-tree
      :default-expand-all="false"
      accordion
      highlight-current
      :show-checkbox="false"
      ref="tree"
      :props="defaultProps"
      :data="modifiedCategories"
      :filter-node-method="filterNode"
      empty-text="No data to show"
    >
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <div class="custom-tree-node__icon">
          <i class="fa" :class="iconClasses(data['priority'])"></i>
        </div>
        <div class="custom-tree-node__label">{{ node.label }}</div>
        <div  class="slider-options-container" @click.stop="$emit('priority', (data))">
          <content-tree-slider v-bind="options" :marks="true" :contained="true" class="settings-options" v-model="data.priority" height="1px" width="400px" :data="settingOptions"/>
          <i class="far fa-times reset-slider-value" @click="data.priority = 'NONE'"></i>
        </div>
        <span class="custom-tree-node__type">
          {{ data['type'] }}<i class="fas fa-ellipsis-v elipsis-styling"></i>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
const SETING_OPTIONS = {
  NONE: "NONE",
  LESS: "LESS",
  NORMAL: "NORMAL",
  MORE: "MORE",
  FEATURED: "FEATURED"
}

export default {
  name: 'App',
  props: {
    categories: Array
  },
  data() {
    return {
      filterText: '',
      mode: "",
      settingOption: "",
      settingOptions: Object.values(SETING_OPTIONS),
      defaultProps: {
        label: "name"
      }
    }
  },
  computed: {
    options() {
      return {
      marks: val => ({
          labelStyle: this.settingOption === val ? { color: 'black'} : null
        }),
        dotOptions: [{
          style: this.settingOption === "" || null ? {
            "backgroundColor": "#ffffff",
            "border": "1px solid #ffffff",
            "boxShadow": "0.5px 0.5px 2px 1px #ffffff"
          } : null,
        }]
      }
    },
    modifiedCategories() {
      let category = this.categories.map(value => {
        value.children = value.topics.map(themes => {
          themes.children = themes.themes.map(val =>  {
            return { ...val, type: "theme"}
          })
          return {...themes, type: "topic"}
        })
        return {...value, type: "category"}
      })
      return category;
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    iconClasses (value) {
      return {
        'fa-check': value === "NORMAL",
        'fa-star': value === "FEATURED",
        'fa-angle-up': value === "MORE",
        'fa-angle-down': value === "LESS",
        'fa-ban': value === "NONE",
      }
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
  font-family: var(--calibre);
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
  align-items: center;
  width: 100%;
}

.custom-tree-node__icon {
  margin-right: 10px;
}

.custom-tree-node__type {
  margin-left: auto;
  font-size: var(--xs) !important;
}

/* element ui classes */
.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
}

.el-input__inner {
  -webkit-appearance: none;
  background-color: #FFF;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #DCDFE6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  width: 100%;
}

.el-tree {
  position: relative;
  cursor: default;
  background: #FFF;
  color: #606266;
}

.el-tree-node {
  white-space: nowrap;
  outline: 0;
}

.custom-tree-node {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
}

.el-tree-node__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 26px;
  cursor: pointer;
}

.el-tree-node__expand-icon {
  cursor: pointer;
  color: #C0C4CC;
  font-size: 12px;
  -webkit-transform: rotate(0);
  transform: rotate(0);
  -webkit-transition: -webkit-transform .3s ease-in-out;
  transition: -webkit-transform .3s ease-in-out;
  transition: transform .3s ease-in-out;
  transition: transform .3s ease-in-out, -webkit-transform .3s ease-in-out;
  transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;
}

.el-tree-node__content>.el-tree-node__expand-icon {
  padding: 6px;
}

.el-tree-node__expand-icon.is-leaf {
  color: transparent;
  cursor: default;
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

.el-tree-node__content>.el-tree-node__expand-icon {
  width: 20px;
}

.el-tree-node__content {
  padding: 20px;
  border-bottom: 2px solid var(--background);
}

.el-tree-node__label {
  font-size: 20px;
}

.custom-tree-node__label {
  display: block;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.el-tree__empty-block {
  text-align: center;
  padding: var(--spacing-4);
}

.el-tree-node .el-tree-node__content .custom-tree-node__label {
  font-size: var(--sm) !important;
}

.el-tree-node .el-tree-node .el-tree-node__content .custom-tree-node__label {
  font-size: var(--sm) !important;
}

.el-tree-node .el-tree-node .el-tree-node .el-tree-node__content .custom-tree-node__label {
  font-size: var(--xs) !important;
}

.el-tree-node {
  margin-bottom: var(--spacing-1);
}

.el-icon-caret-right:before {
  content: "\002B" !important;
  font-size: 30px;
}

.el-tree-node__expand-icon.expanded {
  transform: none !important;
  -webkit-transform: none !important;
  position: relative;
  bottom: 4px;
}

.el-tree-node__expand-icon.expanded:before {
  content: "\002D" !important;
  font-size: 30px;
}

.el-tree-node__content > .el-tree-node__expand-icon {
  position: relative;
  bottom: 2px;
}

.custom-tree-node__type {
  margin-left: auto;
  background-color: var(--grey-lighter);
  padding: 8px 15px;
  margin-bottom: var(--spacing-4);
  margin-top: var(--spacing-4);
  color: black;
  font-weight: 600;
  align-items: flex-end;
  display: flex;
}

.elipsis-styling {
  color: var(--grey);
  margin-left: 5px;
}

.fa-check {
  color: var(--blue-light);
  font-size: var(--spacing-4);
}

.fa-star {
  color: var(--primary-light);
  font-size: var(--spacing-4);
}

.fa-angle-up {
  color: var(--green-light);
  font-size: var(--spacing-6);
}

.fa-angle-down {
  color: var(--green-light);
  font-size: var(--spacing-6);
}

.fa-ban {
  color: var(--red);
  font-size: var(--spacing-4);
}
/*Vue Slider*/

.slider-options-container {
  display: flex;
  align-items: center;
}

.reset-slider-value {
  margin-left: 80px;
  color: var(--tertiary);
}

.reset-slider-value:hover {
  cursor: pointer;
  transform: scale(1.1);
}

.settings-options {
  margin-left: auto;
  margin-top: 25px;
}

.vue-slider-process {
  background-color: var(--primary) !important;
}

.vue-slider-dot {
  width: 11px !important;
  height: 11px !important;
}

.vue-slider-rail {
  background-color: var(--grey-lighter) !important;
}

.vue-slider-dot-handle {
  background-color: var(--white) !important;
  border: 2px solid var(--primary);
}

.vue-slider-mark-label {
  color: var(--tertiary);
  font-weight: 700;
}

.vue-slider-mark {
  height: 4px !important;
  width: 4px !important;
}

.vue-slider-mark-step-active {
  background-color: var(--primary) !important;
}

.vue-slider-mark:first-child .vue-slider-mark-step, .vue-slider-mark:last-child .vue-slider-mark-step {
  display: block !important;
}

.vue-slider-ltr .vue-slider-mark-label, .vue-slider-rtl .vue-slider-mark-label {
  margin-top: -25px !important;
  top: 0;
}
</style>
