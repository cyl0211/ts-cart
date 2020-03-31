<template>
  <div class="about">
    <h1>This is an class page</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Employee,EmployeeCode,Department,AccountingDepartment } from './class'

export default defineComponent({
    setup(props){
      let howard = new Employee("Howard", "Sales", 20);
      console.log(howard.getElevatorPitch());
      // console.log(howard.name); // protected类型只能子类调用 error
      // console.log(howard.department); // private 除了定义的class本身，外部无法调用 error
      console.log(howard.age)
      // howard.age=34  // readonly属性只读不可赋值 error

      //类存储器用于，获取值或赋值时执行一些额外的操作，get、set
      let employeeCode = new EmployeeCode('secret passcode')
      console.log(employeeCode.fullName,'---类存储器-get')

      let employeeCode1 = new EmployeeCode('secret passcode1')
      employeeCode1.fullName = 'secret11 passcode'
      console.log(employeeCode1.fullName,'---类存储器-set')

      //static类型属性用于定义一些不变的属性

      //
      let department: Department; // 类可以作为接口引用
      // department = new Department(); // 不能创建一个抽象类的实例 error
      department = new AccountingDepartment(); 
      department.printName();
      department.printMeeting();
      // department.generateReports(); // Department不存在generateReports error
    }
})


</script>