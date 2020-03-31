<template>
  <div class="main-wrap">
    <PayItem
      v-for="(item, index) of payGoodsList"
      :key="index"
      :goods="item"
    ></PayItem>
    <PayBar :amount="amount"></PayBar>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "@vue/composition-api";
import PayItem from "../components/payPage/payItem.vue";
import PayBar from "../components/payPage/payBar.vue";
import { GoodsItem, ShopInfo } from "../types/index";
import * as storage from "../utils/sessiomStorage";

export default defineComponent({
  components: {
    PayItem,
    PayBar
  },
  setup(props) {
    const payGoodsList = ref([]);
    const amount = ref("0");
    payGoodsList.value = storage.get("pay-goods");
    amount.value = storage.get("pay-amount");
    return {
      payGoodsList,
      amount
    };
  }
});
</script>
<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  box-sizing: border-box;
  min-height: 100vh;
  background: #f4f4f4;
  .cart-header {
    padding: 0 24px;
    color: #f40;
    line-height: 3;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
  }
  .cart-thead {
    height: 40px;
    background: #e1e1e1;
    line-height: 40px;
    text-align: left;
    padding: 0 24px;
    font-weight: bold;
  }
  .cart-con {
    width: 100%;
    height: calc(100vh - 152px);
    position: relative;
    overflow: auto;
  }
  .cart-empty {
    position: absolute;
    text-align: center;
    top: 35%;
    left: 50%;
    font-size: 20px;
    color: #444;
  }
}
</style>
