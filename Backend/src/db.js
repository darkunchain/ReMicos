const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/remicos',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('db connected'))
.catch(err => console.log(err));