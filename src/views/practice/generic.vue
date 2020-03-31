<template>
  <div class="about">
    <h1>泛型</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  setup(props) {
    //泛型变量是为了使返回值的类型与传入参数的类型是相同
    function identity<T>(arg: T): T {
      //<T>捕获传入参数的类型，然后作为返回值的类型
      return arg;
    }
    let output = identity<string>("myString"); // == 类型推导：let output = identity("myString");

    //使用泛型变量需要考虑到所有的类型
    // function myIdentity<T>(arg: T): T {
    //     return arg.length // (1) 假如传入类型为Number，length不存在 error
    // }

    function myIdentity1<T>(arg: T[]): T[] {
      //确定传入类型为数组，则length是存在的
      console.log(arg.length);
      return arg;
    }

    //泛型函数
    function identity2<T>(arg: T): T {
      return arg;
    }

    let myIdentity2: <T>(arg: T) => T = identity;
    // == let myIdentity : {<T>(arg: T): T} = identity;

    interface GenericIdentityFn<T> {
      (arg: T): T;
    } //可以在指定接口是传入参数类型，接口中其他参数也就知道了自身类型

    let myIdentity3: GenericIdentityFn<Number> = identity;

    //泛型类，写法与泛型接口一致
    class GenericNumber<T> {
      zeroValue: T;
      add: (x: T, y: T) => T;
    }
    //泛型类型只能描述实例部分，构造器部分无法使用泛型类型
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) {
      return x + y;
    };

    //泛型约束
    //(1)处的错误，除了指定输入参数为[]外，还可通过添加接口描述进行约束泛型参数
    interface Lengthwise {
      length: number;
    }
    //<T>通过extends继承Lengthwise类型
    function loggingIdentity<T extends Lengthwise>(arg: T): T {
      console.log(arg.length);
      return arg;
    }
    loggingIdentity({ length: 1 });
    // loggingIdentity({a:1}) //传入参数必须含length

    //泛型参数中可以使用类型参数，即一个泛型参数可以使用另一个参数作为约束条件
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }

    let x = { a: 1, b: 2, c: 3, d: 4 };

    getProperty(x, "a");
    // getProperty(x, "m") // m不存在与x中

    //泛型参数可以使用类类型进行约束
    class BeeKeeper {
      hasMask: boolean;
    }
    class ZooKeeper {
      nametag: string;
    }
    class Animal {
      numLegs: number;
    }
    class Bee extends Animal {
      keeper: BeeKeeper;
    }
    class Lion extends Animal {
      keeper: ZooKeeper;
    }
    //<A extends Animal>约束传入传出参数为Animal子类
    function createInstance<A extends Animal>(c: new () => A): A {
      return new c();
    }
    createInstance(Lion).keeper.nametag;
    createInstance(Bee).keeper.hasMask;
  }
});
</script>
