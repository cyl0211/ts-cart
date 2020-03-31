import emitter from './emitter'
import { onUnmounted } from '@vue/composition-api'

interface UseEventOptions {
  immediate?: boolean
}

export const useEmitterEvent = (
  type: string,
  listener: Function,
  options?: UseEventOptions
) => {
  emitter.$on(type, listener)

  if (options && options.immediate) {
    listener()
  }

  const off = () => emitter.$off(type, listener)

  onUnmounted(off)

  return off
}