class Bank{
double  _amt = 10;

void deposit( double amt){
  _amt += amt;
}
double getBalance(){
  return _amt;
}

}
void main(List<String> args) {
  var account = Bank();
  account.deposit(100);
  var myamt = account.getBalance();
  print(myamt);
}