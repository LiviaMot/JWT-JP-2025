import User from '../model/users.js'
import jwt from 'jsonwebtoken'

const JWT_SEGREDO = "M3uS3gr3d0"

class ServiceUser {

  FindAll() {
    // return User.FindAll()
  }

  async FindOne(id) {
    if (!id) {
      throw new Error("Favor informar o ID")
    }

    // preciso procurar um usuario no banco
    const user = await User.findByPk(id)

    if (!user) {
      throw new Error(`Usuário ${id} não encontrado`)
    }

    return user
  }

  async Create(nome, email, senha, ativo) {
    if (!nome || !email || !senha) {
      throw new Error("favor preencher todos os campos")
    }

    await User.create({
      nome, email, senha, ativo
    })
  }

  Update(id, nome) {
    // User.Update(id, nome)
  }

  Delete(id) {
    // User.Delete(id)
  }

  async Login(email, senha) {
    if(!email || !senha) {
      throw new Error("Email ou senha inválidos.")
    }

    const user = await User.findOne({ where: { email } })

    if (!user || user.senha !== senha) {
      throw new Error("Email ou senha inválidos.")
    }

    return jwt.sign(
      { id: user.id, nome: user.nome },
      JWT_SEGREDO,
      { expiresIn: 60 * 60 }
    )
  }
}

export default new ServiceUser()