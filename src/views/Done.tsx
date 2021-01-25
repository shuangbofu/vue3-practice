import { defineComponent } from 'vue'
import TodoItem from '../components/TodoItem'
import { todoStore, remove } from '../store/todoStore'
export default defineComponent({
  setup() {
    return () => (<>
      <div>{todoStore.doneList.map(i =>
        <TodoItem
          name={i.name}
          onConfirm={remove(i.id)}
          btn="Delete"
        ></TodoItem>)}</div>
    </>)
  }
})