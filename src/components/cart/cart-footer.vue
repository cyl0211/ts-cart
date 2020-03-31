<template>
  <el-row class="cart-footer">
    <el-col :span="2">
      <cartCheckbox
        :defaultChecked="allChecked"
        field="all-select"
        :onChange="selectAll"
      ></cartCheckbox>
      全部
    </el-col>
    <el-col :span="12" class="delete-select">
      <div @click="deleteHandle">删除</div>
    </el-col>
    <el-col :span="3"> 已选商品{{ selectCount }}件 </el-col>
    <el-col :span="7" class="pay-wrap">
      <div class="pay-amount">
        合计：（不含运费）<span class="amount">￥{{ amount }}</span>
      </div>
      <div
        :class="[selectCount > 0 ? 'can-pay' : '', 'pay-btn']"
        @click="toPay"
      >
        支付
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  computed,
  ref,
  watch,
  toRefs,
  PropType
} from "@vue/composition-api";
import cartCheckbox from "./cart-checkbox.vue";
import emitter from "../../utils/emitter";
import { GoodsItem, ShopInfo } from "../../types/index.d";
import { savePayGoodsData } from "../../utils/tools";

export default defineComponent({
  components: {
    cartCheckbox
  },
  props: {
    shopList: {
      type: Array as PropType<ShopInfo[]>,
      required: true
    }
  },
  setup(props) {
    const { shopList } = toRefs(props);

    const allChecked = computed(() => {
      return (
        props.shopList.filter(item => {
          return item.is_checked === true;
        }).length === props.shopList.length
      );
    });

    const selectCount = computed((): number => {
      let count = 0;
      props.shopList.forEach((item: ShopInfo) => {
        count =
          count +
          item.goods.filter((goodItem: GoodsItem) => {
            return goodItem.is_checked;
          }).length;
      });
      return count;
    });

    const amount = computed(() => {
      let amount = 0;
      props.shopList.forEach((item: ShopInfo) => {
        item.goods.forEach((goodItem: GoodsItem) => {
          if (goodItem.is_checked) {
            amount = amount + goodItem.count * Number(goodItem.price);
          }
        });
      });
      return amount;
    });

    const payGoodsList = computed(() => {
      return props.shopList.reduce((all: GoodsItem[], next: ShopInfo) => {
        const goodsList = next.goods.filter(item => {
          return item.is_checked;
        });
        all = [...all, ...goodsList];
        return all;
      }, []);
    });

    const deleteHandle = () => {
      emitter.$emit("delete-select-goods");
    };
    const selectAll = (val: boolean) => {
      emitter.$emit("select-all", val);
    };

    const vm = getCurrentInstance();

    const toPay = () => {
      if (selectCount.value === 0) {
        return;
      }

      savePayGoodsData(payGoodsList.value as GoodsItem[], amount.value);

      vm &&
        vm.$router.push({
          path: "/pay-page"
        });
    };

    return {
      deleteHandle,
      selectAll,
      selectCount,
      amount,
      toPay,
      allChecked
    };
  }
});
</script>
<style lang="scss" scoped>
.cart-footer {
  height: 52px;
  background: #e1e1e1;
  line-height: 52px;
  text-align: left;
  padding: 0 0 0 24px;
}
.delete-select-goods {
  cursor: pointer;
}
.pay-wrap {
  display: flex;
  .pay-amount {
    flex: 1;
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
    background: #ccc;
    color: #fff;
    cursor: pointer;
    font-weight: bold;
  }
  .can-pay {
    background: #f40;
  }
}
</style>
