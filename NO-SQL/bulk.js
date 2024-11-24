db.students.bulkWrite([
    { 
        insertOne: { 
            document: {
                name: "John Doe",
                age: 21
            }
        }
        
    },
    { 
        updateOne: { 
            filter: { name: "John Doe" },
            update: { $set: { age: 21 } }
        }
    },
    { 
        deleteOne: { 
            filter: { age: 16 }
        }
    }
])