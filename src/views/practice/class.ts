export class Person {
  protected name: string;
  readonly age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
export class Employee extends Person {
  private department: string;
  constructor(name: string, department: string, age: number) {
    super(name, age);
    this.department = department;
  }
  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

export class EmployeeCode {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName == "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }

  constructor(fullName: string) {
    this._fullName = fullName;
  }
}

export abstract class Department {
  constructor(public name: string) {}
  printName(): void {
    console.log("Department name: " + this.name);
  }
  abstract printMeeting(): void; // 抽象类型需要在子类中实现
}

export class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing");
  }
  printMeeting(): void {
    console.log("The Accounting Department meets each Monday at 10am.");
  }
  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world");
console.log(greeter); // Hello, world

class Person1 {
  protected name: string;
  protected constructor(theName: string) {
    this.name = theName;
  }
}

// let john1 = new Person1("John"); //error,类“Person1”的构造函数是受保护的，仅可在类声明中访问

class Animal {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  //===> constructor(private name: string) {this.name = theName;}
}

class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    let xDist = point.x - Grid.origin.x;
    let yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}
