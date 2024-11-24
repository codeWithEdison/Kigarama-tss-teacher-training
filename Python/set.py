myset = {"name", "age", "name", False, True, 0, 1}
print(len(myset))
numbers = set((1,2,3,3,4,5)) 
myset.add("city")
myset.update(numbers)
myset.discard("namea")
myset.pop()
myset.clear()
# print (myset[0])


for i in myset:
    print(i)

# join 

num1 ={1 , 2 ,3 ,4}
num2 ={1 , 2, 3 ,5}
num3 = {2,4, 6}

common = num1.intersection(num2, num3)

all = num1.union(num2, num3)
# num1.intersection_update(num2, num3)
sym = num1.symmetric_difference(num2) 

print("comon ", common)

print("all ", all)

print("sy:  ", sym)