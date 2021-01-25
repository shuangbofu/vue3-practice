<template>
  <div>
    <div class="m-2 pl-2 border-l-4 border-blue-400">右侧菜单</div>
    <div class="p-2 pt-0" v-if="sc">
      <div class="mb-1 flex items-center" v-for="(po, index) in parameterOptions" :key="index">
        <template v-if="Object.keys(sc.option).includes(po.name)">
          <span class="mx-2 font-bold">{{po.label}}:</span>
          <input @input="e => valueChange(po.name, e)" v-if="po.type === 'input'" :disabled="sc.option.fixedRow && po.name === 'row' ? 'disabled' : false"
          class="focus:outline-none border px-2 py-1" 
          v-model="sc.option[po.name]"></input>
          <select v-else-if="po.type === 'select'" 
            v-model="sc.option[po.name]"
            @change="e => valueChange(po.name, e)" 
            class="mb-2 px-2 py-1 border focus:outline-none"
            :disabled="sc.option.fixedRow && po.name === 'row' ? 'disabled' : false"
           >
            <option v-for="op in allOptions[po.optionName]" :key="op.value" :value="op.value">{{op.label}}
            </option>
          </select>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const parameterOptions = [
  {name: 'row', label: '行',type: 'select',optionName: 'lines'},
  {name: 'column', label: '列',type: 'select',optionName: 'lines'},
  {name: 'label',label: '标签',type: 'input'},
  {name: 'text', label: '文本',type: 'input'},
  {name: 'textAlign', label: '文本对齐', type: 'select', optionName: 'aligns'},
  {name: 'fontWeight',label: '字体宽度',type: 'select',optionName: 'weights'},
  {name: 'fontSize', label: '字体大小',type: 'select', optionName: 'sizes'},
  {name: 'spanCol', label: '单元格', type: 'select', optionName: 'spanCols'}
]
const intArr = (start, end, interval) => {
  const res = []
  for(let i=start; i<end; i+=interval) {
    res.push(i)
  }
  return res
}
const arr2Map = arr => arr.map(i=> {return {value: i,label: i}})
const allOptions = {
  lines :arr2Map(intArr(1, 13,1)),
  aligns: [{value: 'left', label: '左对齐'},{value: 'center',label: '居中'},{value: 'right', label: '右对齐'}],
  weights: arr2Map(intArr(200, 800, 100)),
  sizes: arr2Map(intArr(10, 61, 1)),
  spanCols: arr2Map(intArr(1,6,1))
}
import { inject, watch } from 'vue'
import {useOptionData} from '../hooks'
export default {
  setup() {
    const {optionData,selectedComponent,completeChilds,calcMaxChildCount} = useOptionData()
    const sc = selectedComponent
    return {
      sc,
      parameterOptions,
      allOptions,
      completeChilds,
      valueChange: (poName,e) => {
        if('column'=== poName) {
          // 重新计算单元格数量
          const count = calcMaxChildCount(sc.value)
          completeChilds(sc.value.children.length, sc.value)
        }
      }
    }
  }
}
</script>

<style>

</style>