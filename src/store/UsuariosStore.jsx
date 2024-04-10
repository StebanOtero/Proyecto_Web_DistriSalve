import { create } from "zustand";
import { InsertarAsignaciones, InsertarUsuarios, MostrarUsuarios, MostrarUsuariosTodos, supabase } from "../index";

export const useUsuariosStore = create((set, get) => ({
  insertarUsuarioAdmin: async (p) => {
    const { data, error } = await supabase.auth.signUp({
      email: p.correo,
      password: p.pass,
    });
    console.log("data del redgistro del user auth", data);
    if (error) return;
    const datauser = await InsertarUsuarios({
      idauth: data.user.id,
      fecharegistro: new Date(),
      tipouser: "admin",
    });
    return datauser;
  },
  idusuario: 0,
  mostrarUsuarios: async () => {
    const response = await MostrarUsuarios();
    set({ idusuario: response.id });
    return response;
  },
  buscador: "",
  setBuscador: (p) => {
    set({ buscador: p });
  },
  datausuarios: [],
  usuariosItemSelect: [],
  parametros: {},
  mostrarusuariosTodos: async (p) => {
    const response = await MostrarUsuariosTodos(p);
    set({ parametros: p });
    set({ datausuarios: response });
    set({ usuariosItemSelect: response[0] });
    return response;
  },
  selectusuarios: (p) => {
    set({ usuariosItemSelect: p });
  },
  insertarusuarios: async (parametrosAuth,p) => {
    const { data, error } = await supabase.auth.signUp({
      email: parametrosAuth.correo,
      password: parametrosAuth.pass
    })
    if(error){
      return null
    }
    const dataUserNew = await InsertarUsuarios({
      nombres: p.nombres,
      nro_doc: p.nro_doc,
      telefono: p.telefono,
      direccion: p.direccion,
      fecharegistro: new Date(),
      estado: "activo",
      idauth: data.user.id,
      tipouser: p.tipouser,
      tipodoc: p.tipodoc,
    })
    await InsertarAsignaciones({
      id_empresa: p.id_empresa,
      id_usuario:dataUserNew.id
    })
    const { mostrarusuarios } = get();
    const { parametros } = get();
    set(mostrarusuarios(parametros));
  },
  eliminarusuarios: async (p) => {
    await Eliminarusuarios(p);
    const { mostrarusuarios } = get();
    const { parametros } = get();
    set(mostrarusuarios(parametros));
  },
  editarusuarios: async (p) => {
    await Editarusuarios(p);
    const { mostrarusuarios } = get();
    const { parametros } = get();
    set(mostrarusuarios(parametros));
  },
  buscarusuarios: async (p) => {
    const response = await Buscarusuarios(p);
    set({ datausuarios: response });
  },
}));
