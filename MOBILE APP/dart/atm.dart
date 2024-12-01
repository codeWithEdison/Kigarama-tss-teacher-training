import 'dart:io';
void main(List<String> args) {
  int correctPin = 1234;
  int enteredPin;
  double balance = 1000;
  double withdraw;
  double deposit;

  // do while loop 
  do{
    // print("WELCOME TO QUICK BANK");
    print("------------------");

    print("enetr your password: ");

    enteredPin = int.parse(stdin.readLineSync()!);

    if( enteredPin!= correctPin){
      print("Incorrect password, please try again.");
    }
  } while(enteredPin != correctPin);

 print("WELCOME TO QUICK BANK");
 int choice;

 do{
   print("------------------");
   print("1. Check Balance");
   print("2. Withdraw Money");
   print("3. Deposit Money");
   print("0. Exit");
   print("Choose an option: ");
  
   choice = int.parse(stdin.readLineSync()!);

    switch(choice){
      case 1:
        print("your balance is : ${balance.toStringAsFixed(2)} rwfs");
        break;
      
      case 2:
       print("Enter amount to withdraw: ");
       withdraw = double.parse(stdin.readLineSync()!);
       if(withdraw <= balance){
         balance -= withdraw;
         print("Withdrawal successful. Your new balance is: ${balance.toStringAsFixed(2)} rwfs");
       }
       else{
         print("Insufficient funds.");
       }
       break;
       case 3:
        print("Enter amount to deposit: ");
        deposit = double.parse(stdin.readLineSync()!);
        balance += deposit;
        print("Deposit successful. Your new balance is: ${balance.toStringAsFixed(2)} rwfs");
        break;
        case 0:
        print("Thank you for using our service. Goodbye!");
        break;
        default:
        print("Invalid option. Please try again.");
        
    }
 }while(choice !=0);
  
}