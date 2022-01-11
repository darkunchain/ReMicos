const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://app.remicos.com.co/remicos,localhost/remicos',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('db connected'))
.catch(err => console.log(err));