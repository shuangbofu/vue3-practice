import { computed, Ref, defineComponent, reactive, ref, SetupContext, onMounted } from 'vue'
import { Button } from 'ant-design-vue'

interface WelcomeProps {
  title: String,
  visible: boolean,
  btnClick: (count: Ref<Number>) => void;
}

export default defineComponent<WelcomeProps>({
  setup(props: WelcomeProps, { slots }) {
    const count = ref(1)
    console.log(props)
    const name = computed(() => `欢迎【${props.title}】`)

    onMounted(() => {
      console.log('onMounted')
    })
    return () => (
      <>
        <div class="container">

          <div> {false} {name.value},{count.value}</div>
          <Button
            type="primary"
            onClick={() => {
              props.btnClick(count)
            }}>按钮</Button>
        </div>
        {slots.defualt()}
      </>
    )
  }
})

// const click = ({ count, visible }) => {
//   count.value++
//   visible.value = !visible.value;
//   console.log(count.value, visible.value)
// }