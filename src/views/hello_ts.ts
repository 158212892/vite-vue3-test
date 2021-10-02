interface Te1 {
  readonly id: number;
  name: string;
  intro?: string;
  [other: string]: any;
}

let obj1: Te1 = {
  id: 1,
  name: 'zs',
  intro: '',
  more: 'xxx',
  more1: 'xxx',
};

interface InterFun1 {
  (x: number, y: number): number;
}

let fun1: InterFun1 = function (x, y) {
  return x + y;
};
console.log(fun1(2, 3));

class Person {
  name: string;
  constructor(n: string) {
    this.name = n;
  }

  eat(): void {
    console.log(this.name + '吃');
  }
  protected updateName() {
    return this.name + 'hhh';
  }
}

class Student extends Person {
  study: string;
  constructor(name: string, something: string) {
    super(name);
    this.study = something;
  }
}

let p1 = new Person('zs');
// console.log(p1.eat());

let s1 = new Student('小红', '看书');
console.log(p1);
console.log(s1);

enum Days {
  Sun = 7,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days.Mon);


// 声明一个装饰器，第三个参数是 "成员的属性描述符"，如果代码输出目标版本(target)小于 ES5 返回值会被忽略。
const validate = function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  // 保存原来的方法
  let method = descriptor.value
  // 重写原来的方法
  descriptor.value = (newValue: string) => {
    // 检查是否是空字符串
    if (!newValue) {
      throw Error('name is invalid')
    } else {
      // 否则调用原来的方法
      method()
    }
  }
}

class User {
  name: string
  id: number
  constructor(name:string, id: number) {
    this.name = name
    this.id = id
  }

  // 调用装饰器
  @validate
  changeName (newName: string) {
    this.name = newName
  }
}
console.log(new User("",1).changeName(""));

