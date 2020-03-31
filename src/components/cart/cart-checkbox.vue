<template>
  <el-checkbox v-model="checked" @change="changeSelect" />
</template>
<script lang="ts">
import { defineComponent, watch, ref, toRefs } from "@vue/composition-api";
export default defineComponent({
  props: {
    field: {
      type: String,
      default: "goods-select"
    },
    defaultChecked: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: ""
    },
    onChange: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const { defaultChecked } = toRefs(props);
    const checked = ref(props.defaultChecked);

    watch(defaultChecked, (val: boolean) => {
      checked.value = val;
    });

    const changeSelect = (val: Boolean) => {
      props.onChange(val, props.id);
    };

    return {
      checked,
      changeSelect
    };
  }
});
</script>
