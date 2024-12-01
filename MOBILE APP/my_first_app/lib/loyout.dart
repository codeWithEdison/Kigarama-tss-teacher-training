import 'package:flutter/material.dart';

class MyHomePage extends StatelessWidget {
  const MyHomePage({
    super.key,
    required this.name,
    required this.description,
    required this.price,
    required this.image,
  });

  final String name;
  final String description;
  final int price;
  final String image;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(2),
      height: 120,
      child: Card(
        child: Row(
          children: [
            Image.asset(image, width: 180,), // Make sure the path is correct
            Expanded(
              child: Column(
                children: [
                  Text(name, style: const TextStyle(fontWeight: FontWeight.bold),),
                  Text(description),
                  Text('Price: $price \$'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class Display extends StatelessWidget {
  const Display({super.key});

  @override
  Widget build(BuildContext context) {
    return  MaterialApp(
      home: Scaffold(
        body:
        Center(
          child: 
         ListView(
          children: const [
           MyHomePage(
          name: "Laptop",
          description: "Best laptop ever",
          price: 1000,
          image: 'assets/images/mac.png', // Ensure the path is correct
        ),
         MyHomePage(name: "Iphone", description: "iphone 14", price: 1200, image: 'assets/images/iphone.png'), 
         MyHomePage(name: " Tablet", description: "Samsung Galaxy", price: 800, image: 'assets/images/tablet.png'),  // Ensure the path is correct
         MyHomePage(name: " Tablet", description: "Samsung Galaxy", price: 800, image: 'assets/images/tablet.png'),  // Ensure the path is correct
         MyHomePage(name: " Tablet", description: "Samsung Galaxy", price: 800, image: 'assets/images/tablet.png'),  // Ensure the path is correct
         ],)
      )),
    );
  }
} 

// void main() {
//   runApp(const Display());
// }
