kigaliTulple = ("nyarugege", "gasabo", "kicukiro");
(ny, *oths ) = kigaliTulple
print(oths)

print(type(kigaliTulple));
if "gasabo" in kigaliTulple:
    print("gasabo is in the tuple.");
# kigaliTulple.pop();
# kigaliTulple[0] ="gakenke";

print(kigaliTulple[:-2]); 
myTulpe = tuple(("monday", "friday"));
print(myTulpe[-1]);
# kigaliTulple= ("welcome",);  
# print(type(kigaliTulple));

# change  tulpe
newData = list(kigaliTulple);
newData[0]= "nyarugenge";
newData.append("gatsata");
print(newData)
kigaliTulple= tuple(newData);

for i in range(len(kigaliTulple)):
    print( " district : ", i, " : ",  kigaliTulple[i]);

for ds in kigaliTulple:
   print();


for i in range(10):
    print("hello")

print("heloo " * 10)
# while loop
rows= 5
for i in range(1,rows+1):
    print("" * (rows -i) + " *" *(2*i -1) )


for i in range(rows):
    print("*"*(rows))

# while loop
i = 0
while i< len(kigaliTulple):
    print(kigaliTulple[i])
    i += 1
    
# join tulpe
fistdays = ("mon", "tue")
fistdays = fistdays *2;
secdays = ("wed", "thu")
mydays = fistdays + secdays
print(mydays.index("wed"))