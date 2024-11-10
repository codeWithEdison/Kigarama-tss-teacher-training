
let num:number  = 10;
// num = " my number"; 

// infer 
let a =10;
// a ='fhsfj'


let myName:string ;

let isStudent: boolean;

myName= 'edison';
isStudent= true;

let numbers:number[];
numbers = [1,2,3];
// numbers.push('sagdusa') // error


// any

let z:any;
z = 10;
z=true;

// unknown

let w:unknown;

w = 10;
w= true;
// never 
console.log(w);

// tuples

let ourTuple:[number, string, boolean, number];
ourTuple = [10,'me',false,10];


let student:{name:string, age:number}= {name: 'education', age:10}

// ENUM

enum day{
    manday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday
}


let today:day = day.manday;

// interface
interface rectangle{
    width:number,
    height:number
}

let box:rectangle ={
    width:10,
    height:20
}

// union  |
let b:number|string;
b= 10;
b= 'my name';
// b=true;

interface student{
    name:string,
    age:number,
    grade?:number
}
let myStudents:student={
    name:'edison',
    age:10
}

// function 
function add(a:number, b:number):number{
    return a + b;
}
