import { ShopInfo, GoodsItem } from "../types/index";
import cartList from "../data/cart.json";
import goodsList from "../data/goods.json";
import * as storage from "./sessiomStorage";

export function saveCartData(data: ShopInfo[]): void {
  const list = data.reduce((all: GoodsItem[], next: ShopInfo) => {
    all = [...all, ...next.goods];
    return all;
  }, []);
  storage.put("cartList", list);
}

export function formatCartData(): ShopInfo[] {
  if (!storage.get("cartList")) {
    storage.put("cartList", cartList as GoodsItem[]);
  }

  let data: GoodsItem[] = storage.get("cartList");

  const shopList = data.reduce((all: ShopInfo[] = [], next: GoodsItem) => {
    const index: number = all.findIndex(
      i => i.shop_id === next.shop_info.shop_id
    );
    next.is_checked = false;
    if (index === -1) {
      let info = {
        shop_id: next.shop_info.shop_id,
        shop_name: next.shop_info.shop_name,
        is_checked: false,
        goods: [next]
      };
      all.push(info);
    } else {
      all[index].goods.push(next);
    }
    return all;
  }, []);

  return shopList;
}

export function saveGoodsData() {
  const list: GoodsItem[] = storage.get("goodsList");
  if (list.length === 0) {
    storage.put("goodsList", goodsList as GoodsItem[]);
    return goodsList as GoodsItem[];
  }
  return list;
}

export function savePayGoodsData(goodsList: GoodsItem[], amount: number) {
  storage.put("pay-goods", goodsList);
  storage.put("pay-amount", amount);
}
