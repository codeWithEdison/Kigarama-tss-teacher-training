// Classes

class Student{
    
constructor(name, email, age, address){
    this.name = name;
    this.email = email;
    this.age = age;
    this.address = address;
}
nationality;
info(){
    console.log(`name: ${this.name} age: ${this.age}`);
    
}
}
class NewComer extends Student{
    constructor(name, age, prevSchool){
        super(name,age);
        this.prevSchool= prevSchool;
    }
     helloNew(){
        console.log(`welcome  ${this.name}`);
        
    }
}
// const std1 = new Student('KEVIN','kevin@me.hh',13,'ngoma');
const std2 = new Student('john','john@me.hh', 15,'kayonza');
const std3 = new NewComer('jane',10,'sentare');
std2.info();
std3.helloNew();
