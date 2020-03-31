<template>
  <div class="main-wrap">
    <div class="cart-header">
      商品列表
      <div class="search-bar">
        <el-input
          v-model="keyword"
          placeholder="请输入关键字搜索"
          @input="search"
        ></el-input>
      </div>
    </div>
    <div class="cart-con">
      <div class="cart-empty" v-if="shopList.length === 0">
        无商品~
      </div>
      <Goods
        v-else
        v-for="(item, index) of shopList"
        :key="index"
        :goods="item"
      ></Goods>
    </div>
    <router-link class="to-cart" to="/">购物车</router-link>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  Ref,
  getCurrentInstance
} from "@vue/composition-api";
import Goods from "../components/goodsList/goodItem.vue";
import { GoodsItem } from "../types/index";
import { useEmitterEvent } from "../utils/use-emitter";
import { saveGoodsData } from "../utils/tools";
import * as storage from "../utils/sessiomStorage";

export default defineComponent({
  components: {
    Goods
  },
  setup(props) {
    const list = saveGoodsData();
    const shopList: Ref<GoodsItem[]> = ref([]);
    const keyword = ref("");

    shopList.value = list;

    const search = (val: string) => {
      shopList.value = list.filter(item => {
        return item.title.indexOf(val) !== -1;
      });
    };
    const vm = getCurrentInstance();

    const addToCart = (goods: GoodsItem) => {
      let cartList: GoodsItem[] = storage.get("cartList");
      const index = cartList.findIndex(
        (item: GoodsItem) => item.id === goods.id
      );
      if (index === -1) {
        cartList.push(goods);
      } else {
        cartList[index].count++;
      }
      storage.put("cartList", cartList);
      vm && vm.$message.success("添加成功");
    };

    useEmitterEvent("add-to-cart", addToCart);

    return {
      shopList,
      search,
      keyword
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
  .to-cart {
    position: fixed;
    top: 60%;
    left: 30px;
    border-radius: 50%;
    text-align: center;
    width: 50px;
    height: 50px;
    background: #f40;
    line-height: 50px;
    color: #fff;
  }
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
    height: calc(100vh - 60px);
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
