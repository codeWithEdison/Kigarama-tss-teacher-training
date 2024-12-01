import 'package:flutter/material.dart';
import 'package:my_first_app/count.dart';
import 'package:my_first_app/state.dart';

void main() {
  runApp(const MyScreens());  
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Scaffold(
        appBar: AppBar(
          title: Image.asset('assets/images/pro.png'),
        ),
        body: Center(
          child: GestureDetector(
            onTap: () {
              print("Image tapped!"); // Debug message
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: const Text("Image Clicked"),
                    content: const Text("You clicked on the image!"),
                    actions: [
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text("CLOSE"),
                      ),
                    ],
                  );
                },
              );
            },
            child: Image.network(
              'https://i.pinimg.com/736x/70/f5/6d/70f56df4470c617b9221edbecbecfc48.jpg',
              width: 200,
              height: 200,
              fit: BoxFit.cover,
            ),
          ),
        ),
        bottomNavigationBar: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: _onItemTapped,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.account_circle),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
