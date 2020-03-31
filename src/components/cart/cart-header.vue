<template>
  <div class="cart-thead">
    <div v-for="(item, index) of CART_THEAD" :style="{ width: item.width }">
      {{ item.text }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import cartCheckbox from "./cart-checkbox.vue";

const CART_THEAD = [
  {
    text: "全部",
    width: "16.6%"
  },
  {
    text: "商品信息",
    width: "41.6%"
  },
  {
    text: "单价",
    width: "12.5%"
  },
  { text: "数量", width: "12.5%" },
  { text: "金额", width: "12.5%" },
  { text: "操作", width: "4.16%" }
];

export default defineComponent({
  components: {
    cartCheckbox
  },
  setup(props) {
    return {
      CART_THEAD
    };
  }
});
</script>
<style lang="scss" scoped>
.cart-thead {
  display: flex;
  height: 40px;
  background: #e1e1e1;
  line-height: 40px;
  text-align: left;
  padding: 0 24px;
  font-weight: bold;
}
</style>
