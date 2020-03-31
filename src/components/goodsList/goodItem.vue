<template>
  <div class="shop-item-warp">
    <div class="shop-con-wrap">
      <div class="shop-good-item">
        <div class="good-name">
          <img :src="goods.img" class="good-img" />
          {{ goods.title }}
        </div>
        <div class="good-amount">{{ goods.price }}</div>
        <div class="operate">
          <div class="add-to-cart" @click="addToCart">+</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, toRefs } from "@vue/composition-api";
import emitter from "../../utils/emitter";

export default defineComponent({
  components: {},
  props: {
    goods: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const addToCart = () => {
      emitter.$emit("add-to-cart", props.goods);
    };

    return {
      addToCart
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
      .good-name {
        width: 70%;
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
        width: 25%;
        text-align: center;
      }
      .operate {
        height: 100%;
        display: flex;
        flex: 1;
        justify-content: center;
        .add-to-cart {
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background: #f40;
          color: #fff;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
