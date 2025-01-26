// import { Children, useState } from "react";
// import styled from "styled-components";
// import { Sidebar } from "../components/organismos/sidebar/Sidebar";
// import { MenuHambur } from "../components/organismos/MenuHambur";
// import { Device } from "../styles/breackpoints";
// import { useUsuariosStore } from "../store/UsuariosStore";
// import { SpinnerLoader } from "../components/moleculas/SpinnerLoader";
// export function Layout(children) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const { mostrarUsuarios, datausuarios } = useUsuariosStore();
//   const { mostrarEmpresa } = useEmpresaStore();
//   const { mostrarpermisos } = usePermisosStore();
//   const {
//     data: usuarios,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["mostrar usuarios"],
//     queryFn: mostrarUsuarios,
//   });
//   const { data: dataempresa } = useQuery({
//     queryKey: ["mostrar empresa", { idusuarios: datausuarios?.id }],
//     queryFn: () => mostrarEmpresa({ idusuarios: datausuarios?.id }),
//     enabled: !!usuarios,
//   });

//   const { data: datapermisos } = useQuery({
//     queryKey: ["mostrar permisos", { id_usuario: datausuarios?.id }],
//     queryFn: () => mostrarpermisos({ id_usuario: datausuarios?.id }),
//     enabled: !!usuarios,
//   });

//   if (isLoading) {
//     return <SpinnerLoader />;
//   }
//   if (error) {
//     return <ErrorMolecula mensaje={error.message} />;
//   }

//   return (
//     <Container className={sidebarOpen ? "active" : ""}>
//       <section className="ContentSidebar">
//         <Sidebar
//           state={sidebarOpen}
//           setState={() => setSidebarOpen(!sidebarOpen)}
//         />
//       </section>
//       <section className="ContentMenuambur">
//         <MenuHambur />
//       </section>
//       <section className="ContentRoutes">
//       </section>
//       <ContainerBody>{children}</ContainerBody>
//     </Container>
//   );
// }
// const Container = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   background-color: ${({ theme }) => theme.bgtotal};
//   .ContentSidebar {
//     display: none;
//   }
//   .ContentMenuambur {
//     display: block;
//     position: absolute;
//     left: 20px;
//   }
//   @media ${Device.tablet} {
//     grid-template-columns: 65px 1fr;
//     &.active {
//       grid-template-columns: 220px 1fr;
//     }
//     .ContentSidebar {
//       display: initial;
//     }
//     .ContentMenuambur {
//       display: none;
//     }
//   }
//   .ContentRoutes {
//     grid-column: 1;
//     width: 100%;
//     @media ${Device.tablet} {
//       grid-column: 2;
//     }
//   }`;
//   const ContainerBody = styled.div`
//   grid-column: 1;
//   width: 100%;
//   @media ${Device.tablet} {
//     grid-column:2;
//   }
//   `;
