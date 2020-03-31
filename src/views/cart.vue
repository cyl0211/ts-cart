<template>
  <div class="main-wrap">
    <div class="cart-header">
      我的购物车
      <router-link class="to-good-list" to="/goods-list">商品列表</router-link>
    </div>
    <CartHeader></CartHeader>
    <div class="cart-con">
      <div class="cart-empty" v-if="shopList.length === 0">
        购物车空空如也~
      </div>
      <ShopItem
        v-else
        v-for="(item, index) of shopList"
        :key="index"
        :shop="item"
      ></ShopItem>
    </div>

    <CartFooter :shopList="shopList"></CartFooter>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref } from "@vue/composition-api";
import CartHeader from "../components/cart/cart-header.vue";
import CartFooter from "../components/cart/cart-footer.vue";
import ShopItem from "../components/cart/shop-item.vue";
import { GoodsItem, ShopInfo } from "../types/index";
import { formatCartData } from "../utils/tools";
import { useEmitterEvent } from "../utils/use-emitter";

const CART_THEAD = [
  {
    text: "全部",
    span: 4
  },
  {
    text: "商品信息",
    span: 10
  },
  {
    text: "单价",
    span: 2
  },
  { text: "数量", span: 2 },
  { text: "金额", span: 2 },
  { text: "操作", span: 4 }
];

export default defineComponent({
  components: {
    CartHeader,
    CartFooter,
    ShopItem
  },
  setup(props) {
    const shopList: Ref<ShopInfo[]> = ref([]);
    const keyword = ref("");
    
    shopList.value = formatCartData();

    const selectAll = (val: boolean) => {
      shopList.value.map((item: ShopInfo) => {
        item.is_checked = val;
        item.goods.map((goodsItem: GoodsItem) => {
          goodsItem.is_checked = val;
          return goodsItem;
        });
        return item;
      });
    };

    const selectShopItem = ({ val, id }: { val: boolean; id: string }) => {
      shopList.value.map((item: ShopInfo) => {
        if (item.shop_id === id) {
          item.is_checked = val;
          item.goods.map((goodsItem: GoodsItem) => {
            goodsItem.is_checked = val;
            return goodsItem;
          });
        }
        return item;
      });
    };

    const selectGoodsItem = ({ val, id }: { val: boolean; id: string }) => {
      shopList.value.map((item: ShopInfo) => {
        item.goods.map((goodsItem: GoodsItem) => {
          if (goodsItem.id === id) {
            goodsItem.is_checked = val;
          }
          return goodsItem;
        });
        if (
          !item.goods.some(item => {
            return item.is_checked !== val;
          })
        ) {
          item.is_checked = val;
        }
        return item;
      });
    };

    const deleteItem = ({ shopId, id }: { shopId: string; id: string }) => {
      shopList.value = shopList.value.filter((item: ShopInfo) => {
        if (item.shop_id === shopId) {
          item.goods = item.goods.filter((goodsItem: GoodsItem) => {
            return goodsItem.id !== id;
          });
        }
        return item.goods.length > 0;
      });
    };

    const deleteSelectGoods = () => {
      shopList.value = shopList.value.filter(item => {
        item.goods = item.goods.filter((goodsItem: GoodsItem) => {
          return !goodsItem.is_checked;
        });
        return item.goods.length > 0;
      });
    };

    const changeCountHandle = ({ id, val }: { id: string; val: number }) => {
      shopList.value.map(item => {
        item.goods.map((goodsItem: GoodsItem) => {
          if (goodsItem.id === id) {
            goodsItem.count = val;
          }
          return goodsItem;
        });
        return item;
      });
    };

    useEmitterEvent("change-goods-count", changeCountHandle);

    useEmitterEvent("select-goods-item", selectGoodsItem);
    useEmitterEvent("select-shop-item", selectShopItem);
    useEmitterEvent("select-all", selectAll);

    useEmitterEvent("delete-goods", deleteItem);
    useEmitterEvent("delete-select-goods", deleteSelectGoods);

    return {
      CART_THEAD,
      shopList,
    };
  }
});
</script>
<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  box-sizing: border-box;
  min-height: calc(100vh - 120px);
  background: #f4f4f4;
  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    color: #f40;
    line-height: 3;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    .to-good-list{
      color: #f40;
      font-size: 14px;
      text-decoration: underline;
    }
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
