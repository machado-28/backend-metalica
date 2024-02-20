import Usuario from "../models/Usuario";

async function ValidarUsuario(nif) {
  try {
    if (!nif) return 0;

    const usuarioExiste = await Usuario.findOne({
      where: {
        nif,
      },
    });

    if (usuarioExiste) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return -1;
  }
}
export default ValidarUsuario;
