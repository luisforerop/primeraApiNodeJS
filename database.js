const mongoose = require('mongoose');
const password = 'conectCondby.NET'
const databaseName = 'garageApi';
mongoose.connect(`mongodb+srv://facturaUser:${password}@cluster0.jvzdp.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true });

/*
const hyperCar= mongoose.model('hyperCar', { name: String });
const ferrari = new hyperCar({ name: 'Ferrari La Ferrari' });
ferrari.save().then(() => console.log('Nuevo carro guardado'));*/


