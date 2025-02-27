require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const connection = require('./config/database');
const fs = require('fs');
const path = require('path');
const mainGroupRoutes = require('./routes/mainGroupRoutes');
const subGroupRouter = require('./routes/subGroupRoutes');
const subGroup1Routes = require('./routes/subGroup1Routes');
const subGroup2Routes = require('./routes/subGroup2Routes');
const subGroup3Routes = require('./routes/subGroup3Routes');
const subGroup4Routes = require('./routes/subGroup4Routes');
const occupationRoutes = require('./routes/occupationRoute');
const userRoute = require('./routes/userRoute');
const countryRoutes = require('./routes/countryRoute')
const jobDescriptionRoutes = require('./routes/jobDescriptionRoute');
const additionalRespRoutes = require('./routes/additionalRespRoutes');
const  responsibilityTypeRouter = require('./routes/addRespTypeRoutes');
const locationRoutes = require('./routes/locationRoute');
const abuseReportsRouter = require('./routes/abuseReportsRoute')
const inviteRoute = require('./routes/inviteuserRoute');
const inviteUserRouter = require('./routes/inviteuserRoute');
const reportRoute = require('./routes/reportRoute') 
const groupAccessRoute = require('./routes/groupAccessRoute');
const groupRoutes = require('./routes/groupRoute');
const announcementRoutes = require('./routes/announcementRoutes');
const userAccessLevelRoutes = require('./routes/userAccessLevelRoutes');
const chatRoute = require('./routes/chatRoute');
const app = express();

app.use(cors({ origin: 'http://localhost:3000' , credentials: true })); // Frontend URL

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/chat', chatRoute);
app.use('/api', abuseReportsRouter);
app.use('/api/reports', reportRoute);
app.use('/api/group-access', groupAccessRoute);
app.use('/api/main-group', mainGroupRoutes);
app.use('/api', groupRoutes);
app.use('/api/invite', inviteRoute);
app.use('/api', subGroupRouter);
app.use('/api/group1', subGroup1Routes);
app.use('/api/sub-group2', subGroup2Routes);
app.use('/api/sub-group3', subGroup3Routes);
app.use('/api/sub-group4', subGroup4Routes);
app.use('/api/occupations', occupationRoutes);
app.use('/api/user', userRoute);
app.use('/api/countries', countryRoutes);
app.use('/api/locations', locationRoutes);
app.use("/user_access_levels", userAccessLevelRoutes);
app.use('/api', jobDescriptionRoutes);
app.use('/api/additional-responsibilities', additionalRespRoutes);
app.use('/api/responsibility-types', responsibilityTypeRouter);
app.use('/api', announcementRoutes);
app.post('/api/addresptype/submit', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Responsibility Type name is required' });
    }

    const query = 'SELECT * FROM responsibility_types WHERE name = ?';
    connection.query(query, [name], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'There was an error checking the name' });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: 'Responsibility Type name already exists' });
        }

        const insertQuery = 'INSERT INTO responsibility_types (name) VALUES (?)';
        connection.query(insertQuery, [name], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'There was an error submitting the form.' });
            }
            res.status(200).json({ message: 'Responsibility Type added successfully!', data: result });
        });
    });
});
const fileUpload = require('express-fileupload');

app.use(fileUpload({
    createParentPath: true // Automatically create the folder structure
}));


const exportDir = path.resolve(__dirname, './exports');
if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
