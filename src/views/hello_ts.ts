interface Te1 {
    readonly id: number;
    name: string;
    intro?: string;
    [other: string]: any

}

let obj1: Te1 = {
    id: 1,
    name: "zs",
    intro: "",
    more: "xxx",
    more1: "xxx",
}

interface InterFun1 {
    (x:number,y:number):number
}

let fun1:InterFun1=function(x,y){
    return x+y;
}
console.log(fun1(2,3));

class Person {
    name:string;
    constructor(n:string){
        this.name=n;
    }

    eat():void{
        console.log(this.name+"吃");
        
    }
    protected updateName(){
        return this.name+"hhh";
        
    }

}
 
class Student extends Person{
    study:string;
    constructor(name:string,something:string){
        super(name);
        this.study=something;
    }
}

let p1=new Person("zs");
// console.log(p1.eat());

let s1=new Student("小红","看书")
console.log(p1);
console.log(s1);

