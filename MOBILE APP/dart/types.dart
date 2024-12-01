// builtin type

// int, double, String, bool


void main() {
  // int
  var  num1 = 100;
  var hex = 0xDEABDE;
  // double
  var pi= 3.14;
  double y = 100;
   var res = pi + num1;
   var sone = "1";
   var one =int.parse( sone);

   if(one == 1){
    print("is equal");
   } else{
    print("not equal");
   }

  //  print(sone + 10);
  print(res);
  
  var name = " john doe";
  print(name);

  String fname = 'my name';
  print(fname);
  var comment = """ 
  this is 
  my comment 
  on
  your 
  post 
  """;
  var mypost = " to day \n match was  \n very difficult";

  print(mypost);

 const number = 100;
  // number = 20;
  // records
  var record = ('first value ', x:2, y :true, 'last value');
   (int a, int b)color = (10, 20);

  print(color);

  // (int, int) swapp((int, int)record){
  //   var (x,y) = record;
  //   return(y,x);
  // }
  // print(swapp())

  // list
  var numbers = [1,2,3,4];
  print(numbers[2]);

  // set
  var set = {'a','a', 'c'};
  var newSet = {'d', 'e', ...set};
    print(newSet);
}
    // String