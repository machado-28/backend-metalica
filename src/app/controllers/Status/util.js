import Status from '../../models/Status'

class UStatus {
  async validar_id(id) {
    const statusValida = await Status.findOne({ where: { id } })
    if (!statusValida) {
      return false
    }
    return true
  }
  async validar_titulo(titulo) {
    const statusValida = await Status.findOne({ where: { titulo } })
    if (!statusValida) {
      return false
    }
    return true
  }
}

export default new UStatus()
