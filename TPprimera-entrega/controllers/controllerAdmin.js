const ContainerFile = require("../ContainerFiles")
const container =  new ContainerFile('users.txt')

async function adminTest(req, res, next) {
    try {
        user = await container.getAll()
        if (user.admin == true) {
            next()
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

async function controllerPostLogin(req, res) {
    try {
        const status = {admin: true}
        container.update(status)
        res.status(200)
        res.json(status)
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

async function controllerPostLogout(req, res) {
    try {
        const status = {admin: false}
        container.update(status)
        res.status(200)
        res.json(status)
    } catch (error) {
        res.status(500)
        res.json(error)
    }
}

exports.adminTest = adminTest;
exports.controllerPostLogin = controllerPostLogin;
exports.controllerPostLogout = controllerPostLogout;