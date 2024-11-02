db.students.insertOne({
    name: "Alice",
    age: 23,
    major: "Computer Science",
    address: { city: "New York", street: "123 5th Ave" },
    grades: [90, 85, 88]
  })
// insert many documents 
  db.students.insertMany([
    { name: "Bob", age: 22, major: "Physics" },
    { name: "Charlie", age: 24, major: "Mathematics" }
  ])
  