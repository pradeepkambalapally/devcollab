
require('dotenv').config();

const express = require('express');
const connectToDB = require('./config/db');
const authRoutes = require('./routes/authroutes');
const conversationRoutes = require('./routes/conversation-routes');
const messageRoutes = require('./routes/message-routes');
const userRoutes = require('./routes/userroutes');
connectToDB();

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is now running at ${PORT}`);
})