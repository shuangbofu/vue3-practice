<template>
  <div class=" bg-gray-200 h-screen flex">
    <div class="w-1/5 border-r-2 h-full">
      <left-menu />
    </div>
    <div class="bg-white w-3/5 h-full overflow-auto">
      <center />
    </div>
    <div class="w-1/5 border-l-2 h-full">
      <right-menu />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, provide, reactive,ref, watch } from 'vue'
import LeftMenu from './left/index.vue'
import Center from './main/index.vue'
import RightMenu from './right/index.vue'
import {useOptionData} from './hooks'
export default {
  components: {LeftMenu, Center, RightMenu},
  setup() {
    const {id, optionData} = useOptionData()

    onMounted(() => {
      const data = localStorage.getItem('print_data')
      if(data) {
        Object.assign(optionData, JSON.parse(data))
        const ids = optionData.listData.map(i=>i.id)
        if(ids?.length > 0) {
          const idValue = Math.max.apply(Math, ids)
          id.value = idValue
        }
      }
    })
    watch(optionData, (pre, val) => {
      localStorage.setItem('print_data', JSON.stringify(val))
    })
  }
}
</script>

<style>

</style>