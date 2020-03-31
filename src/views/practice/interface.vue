<template>
  <div class="about">
    <h1>Interface</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props) {
    //可选属性：预定义可能存在属性，可以捕获引用不存在属性的错误，比如拼写错误时
    interface config {
      color?: string;
    }
    let colorConfig: config = {
      color: "#fff"
      // colour: '#fff' error
    };
    console.log(colorConfig, "----可选属性");

    //只读属性
    interface Point {
      readonly x: number;
      readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 5; // error

    let arr: number[] = [1, 2, 3];
    let ro: ReadonlyArray<number> = arr; //const ro = arr
    // ro[0] = 4   // error
    // arr = ro   // 类型不一致，error
    arr = ro as number[]; //通过类型断言赋值，true

    //额外属性
    interface config {
      color?: string;
      // [propName:string]:any，这个可以声明额外属性，避免存在不一致属性报错
    }
    function create(config: config): config {
      let obj = { color: "#fff" };
      return obj;
    }
    // create({colour:'black'})   //没有声明额外属性，error
    create({ colour: "black" } as config); //类型推断可解决以上error，true

    //函数类型
    interface SearchFunc {
      (source: string, subtr: string): Boolean; //传入参数类型和返回类型
    }

    let search: SearchFunc;
    search = function(src, str) {
      return false;
    };
    search("./", "img");

    //可索引类型 ：字符串类型和数字类型索引,数字索引的返回值必须是字符串索引返回值类型的子类型
    interface StringArray {
      [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["test1", "test2"];

    let myStr: string = myArray[0];
    console.log(myStr, "----可索引类型");

    // interface NumberDictionary {
    //   [index: string]: number;
    //   length: number;
    //   name: string; // name的类型与索引类型返回值的类型不匹配
    // }
    // //Type 'string' is not assignable to type 'number'
    // let obj: NumberDictionary = { length: 1, name: "test1" };
    // console.log(obj["name"] === obj.name);

    interface StringArray1 {
      readonly [index: number]: string;
    }
    let myArray1: StringArray1 = ["test1", "test2"];
    // myArray1[0] = "test3"; //只读不可赋值，error

    //类类型：类静态部分（构造器）接口、实例类型接口,当一个类实现了一个接口时，只对其实例部分进行类型检查。
    //constructor存在于类的静态部分，所以不在检查的范围内。

    // interface ClockConstructor {
    //     new (hour: number, minute: number);
    // }

    // class Clock implements ClockConstructor {
    //     currentTime: Date;
    //     constructor(h: number, m: number) { }
    // }  //error constructor为类的静态部分，不在interface检查的范围内

    interface ClockConstructor {
      new (hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
      tick(): void;
    }

    function createClock(
      ctor: ClockConstructor,
      hour: number,
      minute: number
    ): ClockInterface {
      return new ctor(hour, minute);
    } //传入第一个ClockConstructor类型参数，用于检查类的constructor的参数是否符合要求

    class DigitalClock implements ClockInterface {
      constructor(h: number, m: number) {}
      tick() {
        console.log("beep beep----类类型");
      }
    }
    class AnalogClock implements ClockInterface {
      constructor(h: number, m: number) {}
      tick() {
        console.log("tick tock----类类型");
      }
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);

    //继承接口
    interface Shape {
      color: string;
    }
    interface PenStroke {
      penWidth: number;
    }
    interface Square extends Shape, PenStroke {
      //继承多个接口
      sideLength: number;
    }
    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;
    console.log(square, "----继承接口");

    //混合类型：接口同时描述多种类型
    interface Counter {
      (start: number): string;
      interval: number;
      reset(): void;
      count?: number;
      [propName: string]: any;
    }
    function getCounter(): Counter {
      let counter = <Counter>function(start: number) {};
      counter.interval = 123;
      counter.reset = function() {};
      return counter;
    }
    let c = getCounter(); //可以同时做为函数和对象使用
    c(10);
    c.reset();
    c.interval = 5.0;
    c.test = 2;
    c.count = 3;
    console.log(c, "----混合类型");

    // 接口继承类型：接口类型只能被这个类或其子类所实现
    class Control {
      private state: any;
    }
    interface SelectableControl extends Control {
      //SelectableControl继承了Control的所有成员
      select(): void;
    }
    // class Image implements SelectableControl {  //error
    // 	select() {}
    // }
    class Button extends Control implements SelectableControl {
      //true
      //Button 继承了SelectableControl，拥有select方法，并可以访问Control私有变量state
      select() {}
    }
  }
});
</script>
