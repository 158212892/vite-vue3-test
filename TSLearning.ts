// type AddFunType = (a: number, b: number) => number;
// interface AddFunType1 extends AddFunType {}

// const AddFun: AddFunType1 = (a, b) => a + b;

// console.log(AddFun);
// console.log(AddFun(1, 2));

// class Person {
//   constructor(private name: string) {}
//   say() {
//     console.log(this.name);
//     return function () {
//       console.log('hello,my name is ' + this.name);
//     };
//   }
// }

// new Person('小明').say().call({ name: '小红' });
/**@property noImplicitThis false*/
// 小明
// hello, my name is 小红


/*
存取器
TS 支持通过 getter/setter 来截取对象成员的访问。

假设我们现在有个类，其中 name 是私有属性，但是我们又想要更改以及访问这个属性，此时就可以使用存取器。
*/
// class User {
//   private _name: string;
//   constructor(_name: string) {
//     this._name = _name;
//   }
//   get name(): string {
//     return this._name;
//   }
//   set name(val: string) {
//     this._name = val;
//   }
// }
// console.log(new User("小天").name,typeof User);


interface IConstructor {
  new (): void;
}
class User {
  name!: string;
  age!: number;
}
function createInstanceFactory(instance: IConstructor) {
  return new instance();
}
// function createInstanceFactory<T>(instance: { new (): T }): T {
//   return new instance();
// }
const instance = createInstanceFactory(User); // 小问题： instance 类型为什么是 void ？
console.log(instance);


//既然类可以被当做类型使用，接口也可以去继承类类型
// class User {
//   name!: string;
//   age!: number;
//   protected sex!: string;
//   private smoking!: string;
// }

// interface IPerson extends User {
//   say(): void;
// }
// // 继承后的类型包含所有父类型和子类型的所有类型。
// const user: IPerson = {}; // Error 类型“{}”缺少类型“IPerson”中的以下属性: say, name, age, sex, smoking


