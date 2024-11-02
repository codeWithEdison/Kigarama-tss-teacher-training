// Update a Single Document:
db.students.updateOne(
    { name: "Alice" },
    { $set: { age: 24, major: "Data Science" } }
  )
  
  // Update Multiple Documents (Increment Age by 1 for All Students):
  db.students.updateMany({}, { $inc: { age: 1 } })

  //Replace a Document Completely:
  db.students.replaceOne(
    { name: "Bob" },
    { name: "Bob", age: 25, major: "Engineering", address: { city: "Boston" } }
  )

  