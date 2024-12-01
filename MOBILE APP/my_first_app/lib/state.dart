import 'package:flutter/material.dart';

class MyScreens extends StatelessWidget {
  const MyScreens({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: FirstApp(),
    );
  }
}

class FirstApp extends StatelessWidget {
  const FirstApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title:const  Text("First Page"),),
      body: Center(
        child: ElevatedButton(
          onPressed: (){
            Navigator.push(context, 
            MaterialPageRoute(builder: (context)=> const SecondApp()));
          },
           child: const Text(' GO TO SECOND PAGE')),
      ),
    );
}

}

class SecondApp extends StatelessWidget {
  const SecondApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Second pag"),),
      body: Center(
        child: ElevatedButton(
          onPressed: (){
            Navigator.pop(context);
          },
         child:  const Text('Back to first ')),
      ),
    );
  }
}