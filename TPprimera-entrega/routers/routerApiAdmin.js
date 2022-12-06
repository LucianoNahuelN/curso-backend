const express = require('express');
const {controllerPostLogin,
    controllerPostLogout} = require("../controllers/controllerAdmin");
    
const routerApiAdmin = express.Router()

routerApiAdmin.post('/login', controllerPostLogin)
routerApiAdmin.post('/logout', controllerPostLogout)

exports.routerApiAdmin = routerApiAdmin;