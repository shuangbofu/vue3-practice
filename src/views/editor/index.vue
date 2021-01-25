<template>
  <div class="bg-gray-100 px-3 py-2 border w-3/4 m-auto">
    <div class="mb-2 flex items-center ">
      <div class="mr-2 border px-4 py-1 w-12">{{countStastic}}</div>
      <!-- <span class="mr-3 border px-4 py-1">{{count}}</span> -->
      <input class="border rounded-none focus:outline-none p-1 px-3 " size="small" v-model="text" ></input>
      <button class="ml-2 border rounded-none px-4 py-1 border-green-600 bg-green-600 text-white select-none focus:outline-none hover:bg-green-500 hover:border-green-500" @click="add">添加</button>
      <button class="ml-2 border rounded-none px-4 py-1 border-yellow-600 bg-yellow-600 text-white select-none focus:outline-none hover:bg-yellow-500 hover:border-yellow-500" @click="reset">清空</button>
    </div>
    <!-- <div class="mt-2 w-3/4 flex flex-col border p-5 bg-white">
      <div class="mb-3 flex justify-between" v-for="(item, index) in list" :key="index">
        <span>{{item}}</span>
        <span><button class="focus:outline-none border px-4 py-0 bg-red-500 border-red-500 text-white" @click="remove(index)">完成</button></span>
      </div>
    </div> -->
    <!-- <div class="mt-2 border px-4 py-1 w-12">{{countStastic}}</div> -->
    <div class="mt-2 w-3/4 flex flex-col border p-5 bg-white">
      <div class="mb-3 flex justify-between" v-for="(item, index) in todoList" :key="index">
          <span :class="`${item.finished ? 'line-through': ''}`">{{item.value}}</span>
          <a @click="finish(item.id)" v-show="!item.finished">完成</a>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref, onMounted} from 'vue'
import {useCountIncrease, useList, useTodoList} from './hooks'
export default {
  components:{},
  setup() {
    // const name = ref('')
    const value = ref('')

    // const computedName = computed(() => `computed : ${name.value}`)

    const countHook = useCountIncrease()
    const listHook = useList(countHook.count,value)
    

    const todoListHook = useTodoList(value)

    const countStastic = computed(() => `${todoListHook.todoList.value.length}/${todoListHook.todoList.value.filter(i=>i.finished).length }`)

    const add = () => {
      listHook.add()
      todoListHook.addTodo()
      value.value = ''
    }

    const reset = () => {
      listHook.clear()
      countHook.count.value = 0
      todoListHook.clear()
    }

    return {
      // name,
      // computedName, 

      countStastic,
      ...listHook,
      ...countHook,
      ...todoListHook,
      reset,
      text:value,
      add,
      finish: id => todoListHook.finishTodo(id)
    }
  }
};
</script>

<style>
</style>