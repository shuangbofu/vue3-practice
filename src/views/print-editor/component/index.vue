<template>
  <div v-on:click.self.prevent="selectComponent(data.id)" class=" " 
  :class="`
  ${data.type === 'grid' ? 'h-auto': ''}
  ${active(data.id) ? ' border-blue-400' : ''}
   cursor-pointer border p-3 relative
  `">
    <template v-if="active(data.id)">
      <div class=" z-10 absolute top-0 left-0 bg-blue-300 px-1 py-0 text-white">{{data.typeName}}-{{data.id}}</div>
      <a v-if="data.type !== 'table_cell'" class="z-10 absolute top-0 right-0 text-xs mr-1" @click="removeComponent(data.id)">删除</a>
    </template>
    <div v-if="maxCount > 0" :class="`${data.option.column ? `grid grid-rows-${data.option.row} grid-cols-${data.option.column}`: ''}
      ${data.option.column && data.type !== 'table' ? 'gap-2' :''} 
      `">
      <div :class="`relative row-span-1 col-span-${child(num)?.option?.spanCol}`" v-for="num in maxCount" :key="child(num)?.id || `key_${num}`">
        <template v-if="child(num)">
          <print-component :class="`h-16 ${child(num) && getBgClass(child(num).index)}`"  :data="child(num)"/>
          <!-- <span class="absolute right-0 text-gray-400 text-base" style="top: calc(50% - 10px)">+</span> -->
        </template>
        <div v-else :class="`
        ${choosedIndex === num ? 'bg-blue-100 text-blue-300' : ''}
        border border-dashed h-16 text-center text-gray-400 m-atuo bg-gray-100
        `" @click.prevent="chooseIndex(data.id, num)">{{num}}
        </div>
      </div>
    </div>
    <div v-else-if="['label','table_cell'].includes(data.type)" class="p-2" :class="`text-${data.option.textAlign}`" :style="{
      fontSize: `${data.option.fontSize}pt`,
      fontWeight: `${data.option.fontWeight}`
    }">
      <span :class="`font-bold`">{{data.option.label}}
        <span v-if="data.option.text !== '' && data.option.label!== ''">:</span>
        </span>{{data.option.text}}
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref } from 'vue'
import {useOptionData} from '../hooks'
export default defineComponent({
  name: 'print-component',
  props: {
    data: {type: Object}
  },
  setup(props,{attrs}) {
    const {optionData,selectComponent,selectedComponent,removeComponent,chooseIndex,getRowBoundary,calcMaxChildCount} = useOptionData()
    const data = props.data
    
    const child = num => data.children.find(i=>i.index === num)
    const active = id => optionData.id === id

    const sc = selectedComponent

    const typeBoundary = computed(() => getRowBoundary(data))

    const getBgClass = index => {
      if(data.type !== 'table') {
        return null;
      }
      const boudnary = typeBoundary.value
      const colors = ['red','yellow','green','gray']
      let idx = 3;
      for(let i=0; i <= boudnary.length; i++) {
        if((i<1 || index > boudnary[i-1]) && index <= boudnary[i]) {
          idx = i
          break;
        }
      }
      return `bg-${colors[idx]}-100`
    }

    return {
      data,
      maxCount: computed(() => {
        if(data.type !== 'label') {
          return calcMaxChildCount(data)
        }
        return 0;
      }),
      choosedIndex: computed(() => optionData.indexes[data.id]),

      child,
      active,

      removeComponent,
      selectComponent,

      chooseIndex,
      getBgClass
    }
  }
})
</script>

<style>

</style>