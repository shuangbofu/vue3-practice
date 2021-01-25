<template>
  <div class="relative">
    <div class="mt-0 bg-white relative border-b" v-for="regionTree in filterDataByRegionTrees">
      <div class=" z-30 text-blue-400 bg-blue-100 w-full text-center">{{regionTree.name}}</div>
      <div class="p-2 ">
        <component class="mb-2" v-for="(c,index) in regionTree.data" :key="c.id" :data="c"/>
      </div>
    </div>
  </div>
</template>

<script>
import Component from '../component/index.vue'
import { computed, inject } from 'vue'
import {useOptionData} from '../hooks'

export default {
  components: {Component},
  setup() {
    const {optionData,filterDataByRegionTrees} = useOptionData()
    // out(top) header main tail out(bottom)
    return {
      filterDataByRegionTrees
    }
  }
}
</script>

<style>

</style>