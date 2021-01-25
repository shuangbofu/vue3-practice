import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: { type: String, default: '' },
    btn: { type: String, dfeault: 'Done' }
  },
  emits: ['confirm'],
  setup(props, { emit }) {
    const { name, btn } = props
    return () => (
      <>
        <div class="flex justify-between pl-3 mb-4">
          <span>{name}</span>
          <button
            class="border rounded-md py-1 px-3 text-sm text-gray-700 select-none" onClick={() => emit('confirm')}
          >
            {btn}
          </button>
        </div>
      </>
    )
  }
})