// Delete a Single Document:
db.students.deleteOne({ name: "Charlie" })


//Delete Multiple Documents (Age Greater than 24):

db.students.deleteMany({ age: { $gt: 24 } })

