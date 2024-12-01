
import 'package:http/http.dart' as http;

Future<void> fetchData()  async{
  var  url = Uri.parse("https://jsonplaceholder.typicode.com/posts/1");
  var response = await http.get(url);
  if(response.statusCode == 200){
    print(response.body);
  }else{
    print('Error: ${response.statusCode}');
  }
}

void main(List<String> args) {
  print("fetching .......");
  fetchData();
}