const express = require('express');
const app = express();

//Static file
app.use(express.static(__dirname + '/public'));
app.get('*', (req,res) =>{
    res.sendFile(__dirname+'/public/index.html');
});

app.listen(3000, () => {
    console.log('Server corriendo en puerto 3000');
});