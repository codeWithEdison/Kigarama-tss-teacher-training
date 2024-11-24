mydict = {
    "name": "John",
    "age": 30,
    "city": "New York",
    "colors": ["red", "green"]
}
# print(mydict["colors"][0])
mydict["ages"] = 100
mydict["nationality"] = "American "
mydict.update({"name":"jane doe"})
x = mydict.values()
mydict.pop("ages")
mydict.popitem()
print(mydict)
std = dict(name ="john", age = 30, city = "New York")
# print(std.items())

for i in std:
    print(i ," : ", std[i])

    #[], (), {}, {}