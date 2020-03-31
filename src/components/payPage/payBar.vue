<template>
  <div class="cart-footer">
    <div class="pay-wrap">
      <div class="pay-amount">
        合计：（不含运费）<span class="amount">￥{{ amount }}</span>
      </div>
      <div class="pay-btn" @click="toPay">
        支付
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "@vue/composition-api";
import * as storage from "../../utils/sessiomStorage";

export default defineComponent({
  props: {
    amount: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const vm = getCurrentInstance();
    const toPay = () => {
      vm && vm.$message.success("支付成功");
      vm && vm.$router.go(-1);
      storage.remove("pay-goods");
      storage.remove("pay-amount");
    };
    return {
      toPay
    };
  }
});
</script>
<style lang="scss" scoped>
.cart-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 52px;
  background: #e1e1e1;
}
.pay-wrap {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  width: 40%;
  .pay-amount {
    flex: 1;
    line-height: 52px;
    .amount {
      font-size: 20px;
      color: #f40;
      font-weight: bold;
    }
  }
  .pay-btn {
    width: 120px;
    height: 100%;
    font-size: 18px;
    text-align: center;
    background: #f40;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
    line-height: 52px;
  }
}
</style>
