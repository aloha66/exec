import { ref, defineComponent, PropType, watch } from 'vue'
import { Input } from './input'
import { useForm } from '../../logic/useForm'

export const FormExample = defineComponent({
  setup() {
    const { form, ver } = useForm({ username: '张三', info: 'xxx' })

    watch(form.getValues(), e => {
      console.log('form data change', e)
    })

    return () => {
      return (
        <div>
          <button
            onClick={() => {
              console.log('submit', form.getValues())
              form.setValues({
                username: '张三',
                info: 'xxx',
              })
              // ver.value++
            }}
          >
            重置/提交
          </button>
          {/* 双向绑定 */}
          {/* 触发form的proxy
          get函数封装了onChange和value
           */}
          <Input {...form.username} />

          <Input {...form.info} />
        </div>
      )
    }
  },
})
