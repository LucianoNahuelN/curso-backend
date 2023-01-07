import ContainerFiles from "../containers/ContainerFiles.js";
const container =  new ContainerFiles('users.txt')

async function adminTest(req, res, next) {
    try {
        const user = await container.getAll()
        if (user.admin == true) {
            next()
        } else {
            res.status(403)
            res.json({message: `ruta (${req.url}) y metodo(${req.method}) no autorizados`})
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

export { adminTest, controllerPostLogin, controllerPostLogout }