mylist = ["red", "green", "yellow", "yellow", 1]
print(type(mylist))
mylist[0]= "pink"
mylist[1:4]= ["purple"]
mylist.append("tomato")
mylist.insert(1, "indigo");
print(mylist)
if "red" in mylist:
    print("red is in the list")
