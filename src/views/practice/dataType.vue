<template>
  <div class="about">
    <h1>This is an data type page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup(props){
      //数组类型
        let list1:number[] = [1,2,3,4]
        let list2:Array<number> = [1,2,3,4]
        console.log(list1,list2,'---- 数组类型')
      //元组类型(已知数组项类型和类型的数组)
        let x:[string , number]
        x = ['hello', 10]  //tip：越界元素，是联合类型（string或number）不报错(3.1之前支持，之后会报错)
        console.log(x,'----元组类型')
      //枚举类型
        enum Color1 {Red,Green,Blue} //从0开始编号
        enum Color2 {Red=1,Green,Blue}  //从1开始编号
        let c1:Color1 = Color1.Green
        let c2:Color2 = Color2.Green
        console.log(c1,c2,'----枚举类型')
      //any:任意类型（ts不做类型检查）
        let anyList:any[] = [1, true, "test"]
        console.log(anyList,'----任意类型')
      //void:函数不返回任何值
      function user():void{
        console.log('this is test message')
      }
      //never:永远不存在的类型，任何类型的子类型，可以赋值给其他类型，用于函数没有返回值、不能结束的或抛出异常
      function error(message:string):never{
        throw new Error(message) //or while(true)
      }
      //类型推断
      let someValue:any = 'this is test message'
      let strLength1:number = (<string>someValue).length
      let strLength2:number = (someValue as string).length
      console.log(strLength1,strLength2,'----类型推断')
      // (<string>someValue)/(someVale as string) 强制类型或是断言为string类型
      let myFunction:(x: number,y:number)=>number = function(x: number,y:number):number {
            return x+y
      }
      // ==>let myFunction = function(x: number,y:number):number {
      //       return x+y
      // } //myFunction可以根据后面的function类型推导myFunction的参数类型，这是上下文归类
      console.log(myFunction(4,8),'----类型推断-上下文归类')
    }
})
</script>