const mongoose =require ('mongoose');

mongoose.connect(process.env.DB_STRING)
.then(()=> console.log("DB connected"))
.catch(err => console.error(err));