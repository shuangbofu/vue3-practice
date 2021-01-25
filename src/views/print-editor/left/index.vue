<template>
  <div class=" bg-gray-100 h-full" v-if="!(selectedComponent && selectedComponent.type.includes('table'))">
    <div class="flex flex-wrap border-b p-2">
      <div :class="['border mr-3 mb-3 px-4 py-1 hover:bg-gray-400 hover:border-gray-500 hover:text-gray-600 cursor-pointer',`${choosedMenu.label === menu.label ? 'bg-blue-400 border-blue-500 text-white' : ''}`]" 
      v-for="(menu, index) in menus" :key="index" @click="choose(menu)">{{menu.label}}</div>
    </div>
    <div class="mt-3 ml-2">
      <template v-if="!selectedComponent">
        <select v-model="position" class="mb-2 mr-2 px-2 py-1 border focus:outline-none">
          <option v-for="(p,index) in positions" :key="index" :value="p.name">{{p.label}}</option>
        </select>
      </template>
      <template v-else>
        <!-- <button class="border px-3 py-1 focus:outline-none bg-yellow-400 border-yellow-500" @click="replace">替换</button>   -->
      </template>
      <button v-if="!selectedComponent || selectedMaxCount > 0" class="border px-3 py-1 focus:outline-none bg-green-400 border-green-500 text-white" @click="add">添加</button>  
       <select v-if="!selectedComponent" v-model="region" class="ml-2 px-2 py-1 border focus:outline-none">
          <option v-for="(r,index) in regions" :key="index" :value="r.name">{{r.label}}</option>
        </select>
    </div>
    <div class=" border-t mt-2">
      <button class="border px-3 py-1 mt-3 ml-2 focus:outline-none bg-green-400 border-green-500 text-white" @click="generate">生成json</button>  
    </div>
  </div>
</template>

<script>
import { computed, inject ,ref} from 'vue'
const positions = [{name: 'top',label: '从顶部',},{name: 'bottom', label: '从底部'}]
const regions = [{name: 'head', label: '到头部'},{name: 'tail',label: '到尾部'},{name:'out',label: '到外部'}]
import {useOptionData, useMenuData} from '../hooks'
export default {
  setup() {
    const position = ref('bottom')
    const region = ref('head')

    const index = ref(1)

    const {menus, findMenu, menuToCom} = useMenuData()

    const choosedMenu = ref(findMenu('栅格'))
    
    const {optionData, addComponent,replaceComponent,selectedComponent,generateJson,calcMaxChildCount} = useOptionData()
    
    const add = () => addComponent({position: position.value, region: region.value, index: index.value -1}, menuToCom(choosedMenu.value))
    const choose = menu => choosedMenu.value = menu
    const replace = () => replaceComponent(optionData.id, menuToCom(choosedMenu.value))

    function copy(copyText) {
      var textarea = document.createElement("textarea");
      textarea.textContent = copyText;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand("copy");
      if (success) {
        // this.$message.success("复制成功！");
      }
      document.body.removeChild(textarea);
    }
    
    return {
      position,
      region,

      index, 
      positions,
      regions,
      menus: menus.filter(i=>i.name!=='table_cell'),

      choosedMenu,

      choose,
      replace,
      add,
      generate: () => {
        const res = generateJson()
        const text = JSON.stringify(res,null,2)
        // console.log(text)
        copy(text)
      },

      
      
      selectedComponent,
      selectedMaxCount: computed(()=>calcMaxChildCount(selectedComponent.value))
    }
  }
}
</script>

<style>

</style>