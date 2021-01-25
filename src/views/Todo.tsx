import { defineComponent, ref } from 'vue'
import { addTodo, finish, todoStore } from '../store/todoStore'
import TodoItem from '../components/TodoItem'
export default defineComponent({
  setup() {
    const todo = ref('init value')
    return () => (<>
      <div>
        {todoStore.todoList.map(i =>
          <TodoItem
            name={i.name}
            onConfirm={finish(i.id)}
            btn="Done"
          ></TodoItem>)}
      </div>
      <div class="flex rounded-md" >
        <input
          type="text"
          class="border rounded-none rounded-l-md px-3 py-1.5 flex-1 focus:outline-none"
          placeholder="todo"
          v-model={todo.value}
        // vModel_trim={todo.value}
        />
        <button
          class="border rounded-none rounded-r-md px-4 border-green-600 bg-green-600 text-white select-none"
          onClick={
            () => {
              addTodo(todo.value);
              console.log(todo.value, todoStore.todoList)
              todo.value = '';
            }
          }>
          Add
      </button>
      </div>
    </>
    )
  }
})