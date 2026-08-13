const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config();


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})