
import 'dart:convert';

void main(List<String> args) {
  var jsonData = '{"name": "john doe", "age":30}';
  var user = jsonDecode(jsonData);
  print(user['name']);
}