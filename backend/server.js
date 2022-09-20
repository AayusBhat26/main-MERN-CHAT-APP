const express = require('express');
const dotenv = require('dotenv');
const chats = require('./dummydata');
const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();


// app.get('/', (req, res)=>{
//       res.send('Home route')
// })

app.get('/api/chat', (req, res)=>{
      res.send(chats);
})


//for single chat.
app.get('/api/chat/:id', (req, res)=>{
      // console.log(req.params);
})

// database connection




app.listen(PORT, ()=>{
      console.log('server started on ',PORT );
})