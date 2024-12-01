class Vehicle{
String brand;
String color;
Vehicle(this.brand, this.color);
void changeColor(String newColor){
  color = newColor;
}
}
var myCar = Vehicle("tesla", "black");
var myCar2 = Vehicle("toyota", "red");

class Car extends Vehicle{
  String model;
  Car( String brand, String color,  this.model):super(brand, color);
}

var car1 = Car("houndai", "green", "fiat");

void main(List<String> args) {
  myCar.changeColor('blue');
  print(myCar.color);
  car1.changeColor("yellow");
  print(car1.color);

}