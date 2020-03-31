<template>
  <div class="shop-item-warp">
    <div class="shop-name-wrap">
      <cartCheckbox
        :defaultChecked="shop.is_checked"
        field="shop-select"
        :id="shop.shop_id"
        :onChange="changeSelectShop"
      ></cartCheckbox>
      <img class="shop-logo" src="../../assets/logo.png" />
      <span>店铺：</span>
      {{ shop.shop_name }}
    </div>
    <div class="shop-con-wrap">
      <div
        class="shop-good-item"
        v-for="(item, index) in shop.goods"
        :key="index"
      >
        <div class="good-check">
          <cartCheckbox
            :defaultChecked="item.is_checked"
            field="good-select"
            :id="item.id"
            :onChange="changeSelectGoods"
          ></cartCheckbox>
        </div>
        <div class="good-name">
          <img :src="item.img" class="good-img" />
          {{ item.title }}
        </div>
        <div class="good-amount">{{ item.price }}</div>
        <div class="good-amount">
          <Count
            :id="item.id"
            :stock="item.stock"
            :goodsNumber="item.count"
            :onChange="changeCount"
          ></Count>
        </div>
        <div class="good-amount">{{ item.price * item.count }}</div>
        <div class="good-delete" @click="deleteHandle(shop.shop_id, item.id)">
          删除
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import Count from "./count.vue";
import cartCheckbox from "./cart-checkbox.vue";
import emitter from "../../utils/emitter";
export default defineComponent({
  components: {
    Count,
    cartCheckbox
  },
  props: {
    shop: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const changeSelectShop = (val: Boolean, id: string): void => {
      emitter.$emit("select-shop-item", { val, id });
    };
    const changeSelectGoods = (val: Boolean, id: string): void => {
      emitter.$emit("select-goods-item", { val, id });
    };
    const changeCount = (id: String, val: number): void => {
      emitter.$emit("change-goods-count", { id, val });
    };
    const deleteHandle = (shopId: string, id: String) => {
      emitter.$emit("delete-goods", { shopId, id });
    };
    return {
      changeSelectShop,
      changeSelectGoods,
      changeCount,
      deleteHandle
    };
  }
});
</script>
<style lang="scss" scoped>
.shop-item-warp {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 20px;
  .shop-name-wrap {
    display: flex;
    align-items: center;
    color: #444;
    line-height: 2.5;
    padding: 0 18px;
    .shop-logo {
      width: 15px;
      height: 15px;
      margin: 0 5px;
    }
  }
  .shop-con-wrap {
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .shop-good-item {
      display: flex;
      width: 100%;
      height: 110px;
      padding: 15px 24px;
      box-sizing: border-box;
      text-align: left;
      background: #fff;
      border-bottom: 1px solid #e1e1e1;
      &:last-child {
        border: none;
      }
      .good-check {
        width: 2.5%;
      }
      .good-name {
        width: 55.7%;
        display: flex;
        padding-right: 5px;
        box-sizing: border-box;
        .good-img {
          width: 78px;
          height: 78px;
          background: #ccc;
          margin-right: 10px;
        }
      }
      .good-amount {
        width: 12.5%;
      }
      .good-delete {
        cursor: pointer;
      }
    }
  }
}
</style>
