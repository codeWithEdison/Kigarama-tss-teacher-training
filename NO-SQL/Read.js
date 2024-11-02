//Find All Documents:
db.students.find()
// Find Documents with Specific Fields (Projection):
db.students.find({}, { name: 1, age: 1, _id: 0 })
//Find with a Condition (Filter by Major):
db.students.find({ major: "Computer Science" })

//Query with Comparison Operators (Age Greater than 22):
db.students.find({ age: { $gt: 22 } })
// Query Using Logical Operators (OR Query):
db.students.find({ $or: [{ age: { $gt: 22 } }, { major: "Physics" }] })

// Query with Nested Fields (Find by City in Address):
db.students.find({ "address.city": "New York" })
