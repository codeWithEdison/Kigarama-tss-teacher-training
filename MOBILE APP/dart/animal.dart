class Animal{
  void sound(){
    print("Animal sound");
  }
}
class Dog extends Animal{
  @override
  void sound(){
    print("Bark");
  }
}

class Cat extends Animal{}
void main(List<String> args) {
  var cat = Cat();
  var mydog = Dog();
  mydog.sound();
  cat.sound();
  
}