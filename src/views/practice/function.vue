<template>
  <div class="about">
    <h1>function</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props) {
    //推断类型
    let myAdd: (x: number, y: number) => number = function(
      x: number,
      y: number
    ): number {
      return x + y;
    };
    //===> let myAdd = function(x: number, y: number): number { return x + y; };

    //可选参数
    function buildName(firstName: string, lastName?: string) {
      //可用 ? 表示可选参数，必需参数不能跟随可选参数
      //buildName(firstName?: string, lastName: string) error
      if (lastName) return firstName + " " + lastName;
      else return firstName;
    }

    let result1 = buildName("Bob");
    // let result2 = buildName("Bob", "Adams", "Sr.");  // 超出参数数量 error
    let result3 = buildName("Bob", "Adams");

    //默认参数
    function buildName2(firstName: string, lastName = "Smith") {
      if (lastName) return firstName + " " + lastName;
      else return firstName;
    }

    let result4 = buildName2("Bob"); //lastName='Smith'
    let result5 = buildName2("Bob", "Adams");

    //剩余参数,类似于js的arguments
    function buildName3(firstName: string, ...restOfName: string[]) {
      return firstName + " " + restOfName.join(" ");
    }

    let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");

    // this
    // let deck = {
    //   suits: ["hearts", "spades", "clubs", "diamonds"],
    //   cards: Array(52),
    //   createCardPicker: function() {
    //     return function() {
    //       let pickedCard = Math.floor(Math.random() * 52);
    //       let pickedSuit = Math.floor(pickedCard / 13);
    //       //没有指定this类型，这里会报this的类型为any的错误
    //       return { suit: this.suits[pickedSuit], card: pickedCard % 13 }; //这里的this在调用时，指向window
    //     };
    //   }
    // };

    // let cardPicker = deck.createCardPicker();
    // let pickedCard = cardPicker();

    // console.log("card: " + pickedCard.card + " of " + pickedCard.suit); //card: undefined of undefined

    interface Deck {
      suits: string[];
      cards: number[];
      createCardPicker(this: Deck): () => void;
    }
    let deck: Deck = {
      suits: ["hearts", "spades", "clubs", "diamonds"],
      cards: Array(52),

      createCardPicker: function(this: Deck) {
        //this指向deck，并为Deck类型
        return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);
        };
      }
    };

    let cardPicker = deck.createCardPicker();

    //重载
    //重载列表
    function test(x: number[]): number;
    function test(x: number): string;

    function test(x: any): any {
      if (typeof x === "object") {
        //通过typeof判断不同的参数类型，指定需要执行的操作
        return x.length;
      } else if (typeof x === "number") {
        return x + "--string";
      }
    }
    //test调用时，查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。
    //因此，在定义重载的时候，一定要把最精确的定义放在最前面。
    let testFunc = test([1, 2, 3, 4]);
    console.log(testFunc); // 4
    let testFunc2 = test(3);
    console.log(testFunc2); // 3--string
  }
});
</script>
