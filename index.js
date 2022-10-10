const express = require('express');
const bodyParser = require('body-parser');
const env = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')

const MovieRoutes = require('./routes/movie.routes');
const theatreRoutes = require('./routes/theatre.routes');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const bookingRoutes = require('./routes/booking.routes');
const showRoutes = require('./routes/show.routes');
const paymentRoutes = require('./routes/payment.routes');

env.config();
const app = express(); 

// configuring body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

mongoose.set('debug', true);

MovieRoutes(app); 
theatreRoutes(app); 
authRoutes(app);
userRoutes(app); 
bookingRoutes(app); 
showRoutes(app); 
paymentRoutes(app); 

app.get('/', (req, res) => {
    res.send('Home');
})

app.listen(process.env.PORT || 5000, async () => {
    console.log(`Server started on Port ${process.env.PORT} !!`);

    try {
        if(process.env.NODE_ENV == 'production') {
            await mongoose.connect(process.env.PROD_DB_URL); 
        } else {
            await mongoose.connect(process.env.DB_URL); 
        }
        
        console.log("Successfully connected to mongo");
    } catch (err) {
        console.log("Not able to connect mongo", err);
    }
});
