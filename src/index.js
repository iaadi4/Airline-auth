const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const { User, Role} = require('./models/index');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log('Server started at', PORT);

        const u1 = await User.findByPk(2);
        const r1 = await Role.findByPk(1);
        u1.addRole(r1);
    })
}


prepareAndStartServer();