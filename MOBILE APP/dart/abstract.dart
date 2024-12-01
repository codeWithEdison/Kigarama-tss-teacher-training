 abstract class Animal{ 
  void sound(); // Abstact method (no body)

  void eat(){
    print("Eating");
  }
}
class Dog extends Animal{
  void sound(){
    print("Bark");
  }
}
class Cat extends Animal{
  void sound(){
    print("Meow");
  }
}
// class fakeAnimal extends Animal{}
void main(List<String> args) {
  Animal myDog = Dog();
  myDog.sound();

  Animal myCat = Cat();
  myCat.sound();
  myCat.eat();
}