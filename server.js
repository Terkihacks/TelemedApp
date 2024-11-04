const express = require('express');
const dotenv = require('dotenv');
const sessionMiddleware = require('./BACKEND/middleware/sessionMiddleware'); // Import the middleware
const patientRoutes = require('./BACKEND/routes/patientRoutes');
const doctorRoutes = require('./BACKEND/routes/doctorRoutes');
const appointmentRoutes = require('./BACKEND/routes/appointmentRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionMiddleware); // Use the session middleware

// Use routes
app.use('/patient', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});


