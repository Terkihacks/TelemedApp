const express = require('express');
const dotenv = require('dotenv');
// const adminRoutes = require('./BACKEND/routes/adminRoutes');
// const adminMiddleware = require('./BACKEND/routes/adminRoutes');
const patientRoutes = require('./BACKEND/routes/patientRoutes');
const doctorRoutes = require('./BACKEND/routes/doctorRoutes')
const appointmentController = require('./BACKEND/controllers/appointmentController')
// const sessionMiddleware = require('./BACKEND/middleware/sessionMiddleware')
// const adminMiddleware = require('./BACKEND/middleware/adminMiddleware')
const app = express();
dotenv.config();
app.use(express.json());
// Middleware to parse incoming JSON data
app.use(express.json());

app.use(express.urlencoded({extended:true}));
 // Use routes
//  app.use('/api',adminMiddleware);
app.use('/patient', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments',appointmentController);



app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});

 

