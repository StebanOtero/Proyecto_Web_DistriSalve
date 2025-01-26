import styled from "styled-components";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
//import { render } from "react-dom";
//import { MdDescription } from "react-icons/md";
import {
  Buscador,
  ListaGenerica,
  useEmpresaStore,
  useProductosStore,
} from "../../../index";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function StockActualTodosPorProducto() {
  const [stateListaproductos, setstateListaProductos] = useState(false);
  const { reportStockXproducto, buscarproductos, buscador, setBuscador, selectproductos, productosItemSelect } =
    useProductosStore();
  const { dataempresa } = useEmpresaStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Reporte stock por producto", { id_empresa: dataempresa?.id,id:productosItemSelect?.id }],
    queryFn: () => reportStockXproducto({ _id_empresa: dataempresa?.id,id:productosItemSelect?.id }),
    enabled: !!dataempresa,
  });

  const {
    data: dataproductosbuscador,
    isLoading: ProductosBuscador,
    error: errorBuscador,
  } = useQuery({
    queryKey: [
      "buscar productos",
      { id_empresa: dataempresa?.id,descripcion: buscador },
    ],
    queryFn: () =>
      buscarproductos({ id_empresa: dataempresa?.id,descripcion: buscador }),
    enabled: !!dataempresa,
  });
  // if (isLoading) {
  //   return <span>Cargando</span>;
  // }
  // if (error) {
  //   return <span>Error{error.message}</span>;
  // }

  const styles = StyleSheet.create({
    page: { flexDirection: "row", position: "relative" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    table: { width: "100%", margin: "auto", marginTop: 10 },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      alignItems: "stretch",
      height: 24,
      borderLeftColor: "#000",
      borderLeft: 1,
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",
      //fontFamily: "Inconsolata",
      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      //fontFamily: "Inconsolata",
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
    },
  });
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.descripcion}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
    </View>
  );
  return (
    <Container>
      <Buscador funcion={()=>setstateListaProductos(!stateListaproductos)} setBuscador={setBuscador}/>
      {stateListaproductos && <ListaGenerica funcion={(p)=>{
        selectproductos(p)
        setBuscador("")
      }} setState={()=>setstateListaProductos(!stateListaproductos)} data={dataproductosbuscador} />}
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de Stock Para Todos">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Stock Actual por Producto
                </Text>
                <Text>Fecha y Hora del Reporte: {formattedDate}</Text>
                <View>
                  {renderTableRow(
                    {
                      descripcion: "Producto",
                      stock: "Stock",
                    },
                    true
                  )}
                  {data?.map((item) => renderTableRow(item))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap:15
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
export default StockActualTodosPorProducto;
