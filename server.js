const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
// const sessionMiddleware = require('./BACKEND/middleware/sessionMiddleware'); // Import the middleware
const patientRoutes = require('./BACKEND/routes/patientRoutes');
const doctorRoutes = require('./BACKEND/routes/doctorRoutes')
const appointmentRoutes = require('./BACKEND/routes/appointmentRoutes')
const app = express();
dotenv.config();
const cors = require('cors');


app.use(express.static(path.join(__dirname,'/')))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Use routes
app.use('/patient', patientRoutes);
app.use('/doctor',doctorRoutes);
app.use('/appoint',appointmentRoutes)

app.get('/',(request,response) =>{
  response.sendFile(path.join(__dirname,'index.html'));
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});


