// void main(List<String> args) {
//   // int a = 100;
// //  print(a);
// print(isChild(10, 'doe'));
// }

String isChild( int age, [String? name]){
  String mesage = '';
  if(age< 18){
    mesage = '${name ?? "you"} are  a child';
  }
  else{
    mesage = '${name ?? "you"} are an adult';
  }

return mesage;
}
void caller(){
  print(isChild(10, 'john'));
  print(isChild(18));
}
void main(List<String> args) {
  caller();
}
(int, int, String) swapp(int a, int b){
  return(b,a, 'done');
}