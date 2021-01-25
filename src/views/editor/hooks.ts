import { reactive, toRefs,ref, onMounted, provide, inject,computed,Ref} from "vue";

export function useList(count, text:Ref<String>) {
  onMounted(() => console.log('count hook\'s count is '+count.value))
  const obj = reactive({
    list:[]
  })
  const remove = index => {
    const removed = obj.list.splice(index,1)
    if (removed.length > 0) {
      count.value--
    }
  }
  const add = () => {
    const textValue = text.value
    if (textValue.trim() === '') {
      return 
    }
    if (obj.list.findIndex(i=>i===textValue) !== -1) {
      return 
    }
    obj.list.push(textValue)
    count.value++
  }
  // const removeByContent = text => {
  //   const index = obj.list.findIndex(i => i === text)
  //   index !== -1 && remove(index)
  // }

  const objRef = toRefs(obj)

  return {
    remove,
    add,
    list: objRef.list,
    clear: () => obj.list.splice(0, obj.list.length)
  }
}

export function useCountIncrease() {
  onMounted(() => console.log('count increase init'))
  const count = ref(0)
  return {
    count,
    countIncrease: () => count.value++,
  }
}

export function useTodoList(text) {
  const id = ref(0)
  const list = ref([])

  const add = () => {
    console.log(text.value)
    list.value.push({
      value: text.value,
      id: id.value++,
      finished: false
    })
  }

  const finish = id => {
    const index = list.value.findIndex(i => i.id === id) 
    console.log(index)
    if (index !== -1) {
      list.value[index].finished = true
      console.log(list.value[index])
    }
  }

  const clear = () => list.value.splice(0, list.value.length)

  return {
    addTodo: add,
    todoList: list,
    finishTodo: finish,
    clear
  }
}