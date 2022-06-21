/* eslint-disable react/jsx-key */
import { Page, StyleSheet, Document, View, Text } from "@react-pdf/renderer";
import React from "react";
import { FindCourseQuery, GetSubTypesDisabledQuery, GetSubTypesQuery, Report } from "../types";
import {
  DAMAGE_1041_OPTIONS,
  DAMAGE_OPTIONS,
  DEFAULT_DATE_FORMAT,
  INVOLVED_ELEMENTS_OPTIONS,
  MAGNITUDE_1041_OPTIONS,
  QUANTITIES_1044_1045_OPTIONS,
  RESOURCES_OPTIONS,
} from "../utils/constants";
import { useQuery } from "react-apollo";
import { GET_REPORT } from "../queries/Reports";
import { GET_SUB_TYPES, GET_SUB_TYPES_DISABLED } from "../queries/subType";
import Spinner from "../components/spinner";
import moment from "moment";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: "10px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
});

interface TheProps {
  report: any;
}

// Create Document Component
const GeneralReport: React.FC<TheProps> = (props) => {
  const report: Report = props.report;

  /*const getSubTypesDisabledQuery = useQuery<GetSubTypesDisabledQuery>(GET_SUB_TYPES_DISABLED);
  const getSubTypesQuery = useQuery<GetSubTypesQuery>(GET_SUB_TYPES);

  if(getSubTypesQuery.loading || getSubTypesDisabledQuery.loading)
    return <Spinner/>*/

  return (
    <Document>
      <Page size="A4" style={styles.page} debug={false}>
        <View style={{ border: "1px solid blue", width: "100%", fontSize: "12px" }}>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "10px", fontSize: "16px" }}>
            Informe Mensual de Servicios
          </Text>
          <Text style={{ textAlign: "center", width: "100%", marginTop: "10px", marginBottom: "4px" }}>
            CBV de Capitán Miranda
          </Text>
          <View style={{ flexDirection: "row", border: "1px solid red", marginBottom: "10px" }}>
            <Text style={{ width: "30%", fontWeight: "bold" }}>Fecha de Envío: / / </Text>
            <Text style={{ width: "25%" }}>Hora:_______</Text>
            <Text style={{ width: "25%" }}>Mes:_______</Text>
            <Text style={{ width: "20%" }}>Año:_______</Text>
          </View>
          {/*<View style={{flexDirection: "row", border: "1px solid red"}}>
            <Text>Fecha: {moment(report.startDate).format(DEFAULT_DATE_FORMAT)} al {moment(report.endDate).format(DEFAULT_DATE_FORMAT)}</Text>
          </View>*/}
          <Text>Datos de Envío</Text>
          <View style={{ flexDirection: "row", border: "1px solid blue" }}>
            <Text style={{ width: "50%" }}>CBV de Capitán Miranda</Text>
            <Text style={{ width: "50%" }}>Cantidad Cia. / Estaciones: ________________</Text>
          </View>
          <View style={{ flexDirection: "row", border: "1px solid blue" }}>
            <Text style={{ width: "50%" }}>Elaborado por: ________________</Text>
            <Text style={{ width: "50%" }}>Teléfono: ________________</Text>
          </View>
          <Text>Enviado desde: ________________</Text>
          <Text>Fax habilitado (para posible reenvío): ________________</Text>
          <Text>Fecha de cierre del informe: ________________</Text>
          <Text>
            Cantidad total de Servicio: {report.count1040 + report.count1041 + report.count1043} ________________
          </Text>

          <View style={{ border: "1px solid blue" }}>
            <Text style={{ backgroundColor: "black", color: "white", width: "60px" }}>10.40</Text>
            <Text style={{ textTransform: "uppercase" }}>
              Cantidad Global de 10.40: ({report.count1040}) ________________
            </Text>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Servicio 10.40</Text>
                {report.subTypeCount1040.map((row) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Magnitudes</Text>
                {DAMAGE_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name}{" "}
                      {props.report.damageCount.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1040.find((the1044) => the1044.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Causas Posibles</Text>
                {report.possibleCausesCount.map((row) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Recursos Utilizados (numeros incorrectos creo)</Text>
                {report.resourcesUsedCount1040.map((resource) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {RESOURCES_OPTIONS.find((option) => option.id === resource.id)?.name || resource.id}{" "}
                      {resource.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Móviles / Km.</Text>
                <View style={{ border: "1px solid magenta" }}>
                  <Text>Total de Km. ________</Text>
                  <Text>Nómina de Móviles utilizadas _______</Text>
                </View>
              </View>
            </View>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <Text>
                Mencione el mayor problema presente y el motivo en los servicios según la hoja 10.40
                ___________________________________________
              </Text>
            </View>
          </View>

          <View style={{ border: "1px solid blue" }}>
            <Text style={{ backgroundColor: "black", color: "white", width: "60px" }}>10.41</Text>
            <Text style={{ textTransform: "uppercase" }}>
              Cantidad Global de 10.41: ({report.count1041}) ________________
            </Text>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Servicio 10.41</Text>
                {report.subTypeCount1041.map((row) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Magnitudes (damage1041)</Text>
                {DAMAGE_1041_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name} {report.damage1041Count.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1041.find((the1044) => the1044.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Elementos Involucrados</Text>
                {INVOLVED_ELEMENTS_OPTIONS.map((item) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {item.name}{" "}
                      {report.involvedElementsCount.find((theDamage) => theDamage.id === item.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Seguridad de involucrados</Text>
                {MAGNITUDE_1041_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name}{" "}
                      {report.magnitude1041Count.find((theDamage) => theDamage.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Recursos Utilizados</Text>
                {report.resourcesUsedCount1041.map((resource) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {RESOURCES_OPTIONS.find((option) => option.id === resource.id)?.name || resource.id}{" "}
                      {resource.count}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View style={{ border: "1px solid blue" }}>
            <Text style={{ backgroundColor: "black", color: "white", width: "60px" }}>10.43</Text>
            <Text style={{ textTransform: "uppercase" }}>
              Cantidad Global de 10.43: ({report.count1043}) ________________
            </Text>

            <View style={{ border: "1px solid red", flexDirection: "row" }}>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Servicio 10.43</Text>
                {report.subTypeCount1043.map((row) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>
              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Tipo de Rescate</Text>
                {report.rescueTypeCount.map((row) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {row.name} {row.count}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={{ border: "1px solid green", width: "33.33%" }}>
                <Text>Cantidad de 10.44/10.45</Text>
                {QUANTITIES_1044_1045_OPTIONS.map((damage) => (
                  <View style={{ border: "1px solid magenta" }}>
                    <Text>
                      {damage.name}{" "}
                      {report.quantities1044Count1043.find((the1044) => the1044.id === damage.id)?.count || 0}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneralReport;