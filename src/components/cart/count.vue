<template>
  <div class="count-wrapper">
    <div class="item-count">
      <a class="sub" @click="handleClick('sub')">-</a>
      <input class="count-text" v-model="count" />
      <a class="add" @click="handleClick('add')">+</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, ref } from "@vue/composition-api";
export default defineComponent({
  props: {
    goodsNumber: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0
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
    const count = ref(props.goodsNumber);

    watch(count, val => {
      props.onChange(props.id, val);
    });

    const handleClick = (type: string) => {
      switch (type) {
        case "add":
          if (count.value < props.stock) {
            count.value++;
          }
          break;
        case "sub":
          if (count.value <= 1) {
            return;
          }
          count.value--;
          break;
        default:
          break;
      }
    };

    return {
      count,
      handleClick
    };
  }
});
</script>
<style lang="scss" scoped>
.count-wrapper {
  .item-count {
    display: flex;
    .sub,
    .add {
      width: 25px;
      height: 25px;
      border: #444;
      text-align: center;
      height: 25px;
      background: #e1e1e1;
    }

    .count-text {
      padding: 0;
      width: 35px;
      height: 23px;
      border: 1px solid #e1e1e1;
      text-align: center;
      color: #2c3e50;
    }
  }
}
</style>
