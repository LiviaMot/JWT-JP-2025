import jwt from 'jsonwebtoken'
import ServiceUser from '../service/users.js'
const JWT_SEGREDO = "M3uS3gr3d0"

export default async function authMiddleware(req, res, next) {
  try {
    const token = req.headers['authorization']
    if(!token) {
      throw new Error("Você não tem permissão para realizar esta ação.")
    }
    const decoded = jwt.verify(token.split(' ')[1], JWT_SEGREDO)

    const user = await ServiceUser.FindOne(decoded.id)

    req.headers.user = user
    next()
  } catch (erro) {
    res.status(403).send({
      data: null,
      msg: erro.message,
      error: true
    })
  }
}