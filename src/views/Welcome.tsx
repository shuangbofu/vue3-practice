import { computed, Ref, toRefs, defineComponent, reactive, ref, SetupContext, onMounted } from 'vue'
import { Button } from 'ant-design-vue'
import { createTypes } from 'vue-types'

interface WelcomeProps {
  title: String,
  visible: Boolean,
  onBtnClick: (count: Ref<Number>) => void;
}

export default defineComponent({
  props: {
    title: String,
    visible: Boolean,
    onBtnClick: Function,
    onJo222hn2: Function
  },
  setup(props, { slots, emit }) {
    const count = ref(1)
    onMounted(() => {
      console.log('onMounted')
    })
    const tip = renderTip(props.title, props.visible)
    console.log(props.visible)
    return () => (
      <>
        <div class="container">
          {`name:${tip.name.value}`},{props.visible.toString()}
          {tip.render()}
          <div class="mx-auto p-2">
            {count.value}
            <Button type="primary"
              onClick={() => {
                props.onBtnClick(count)
              }}>按钮</Button>
            {slots.default()}
          </div>
        </div>
      </>
    )
  }
})

function renderTip(title, visible) {
  const name = computed(() => `欢迎【${title}】`)
  const hasTip = computed(() => visible)

  const render = () => {
    console.log(hasTip.value)
    if (hasTip.value) {
      return <>
        <div>
          {visible.toString()}
          {name.value}
        </div>
      </>
    }
  }
  return {
    render,
    name
  }
}