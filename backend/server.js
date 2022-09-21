const express = require('express');
const dotenv = require('dotenv');
const chats = require('./dummydata');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const PORT = process.env.PORT || 5000;
const {notFound, errorHandler} = require('./middleware/errorMiddleware')
 dotenv.config();
// database connection
connectDB();
const app = express();
app.use(express.json());


app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, ()=>{
      console.log('server started on ',PORT );
})