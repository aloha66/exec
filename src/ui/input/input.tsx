import { ref, defineComponent, PropType, watch } from 'vue'

export const Input = defineComponent({
  props: {
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: false,
    },
    value: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const input = ref<HTMLInputElement | null>()

    watch(
      () => props.value,
      () => {
        const ipt = input.value!
        debugger
        if (ipt.value !== props.value) {
          ipt.value = props.value || ''
        }
      }
    )

    return () => {
      return (
        <input
          onInput={e => props.onChange?.((e.target as HTMLInputElement).value)}
          value={props.value}
          ref={input}
        />
      )
    }
  },
})
