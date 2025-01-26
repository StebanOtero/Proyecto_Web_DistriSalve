import { useQuery } from "@tanstack/react-query";
import {
  BloqueoPagina,
  ProductosTemplate,
  SpinnerLoader,
  useCategoriasStore,
  useEmpresaStore,
  useMarcaStore,
  useProductosStore,
  useUsuariosStore,
} from "../index";

export function Productos() {
  const { datapermisos } = useUsuariosStore();
  const statePermiso = datapermisos.some((objeto) =>
    objeto.modulos.nombre.includes("Productos")
  );

  const { mostrarMarca } = useMarcaStore();
  const { mostrarcategorias } = useCategoriasStore();
  const { mostrarProductos, dataproductos, buscarproductos, buscador } =
    useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar productos", { _id_empresa: dataempresa?.id }],
    queryFn: () => mostrarProductos({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  const { data: buscar } = useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarproductos({ descripcion: buscador, id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  const { data: datamarcas } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  const { data: datacategorias } = useQuery({
    queryKey: ["mostrar categorias", { id_empresa: dataempresa?.id }],
    queryFn: () => mostrarcategorias({ id_empresa: dataempresa?.id }),
    enabled: dataempresa?.id != null,
  });
  if (statePermiso == false) {
    return <BloqueoPagina />;
  }
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <ProductosTemplate data={dataproductos} />;
}
