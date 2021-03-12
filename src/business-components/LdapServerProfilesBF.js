import LdapServerProfileWAC from "webapi-clients/LdapServerProfileWAC";
import LdapServerProfileENT from "business-entities/LdapServerProfileENT";

class LdapServerProfilesBF {
  constructor() {
    //...
  }

  getProfiles() {
    //Promise to get Web API data
    let asyncMethod = new Promise((resolve, reject) => {
      let items = [];
      let wac = new LdapServerProfileWAC();
      wac
        .getData()
        .then((res) => res.json())
        .then((data) => {
          console.log(
            "LdapServerProfilesBF->getData->Datos descargados, generando Entities..."
          );
          console.log(data);
          //Crear Entities y agregarlas a la lista
          data.map((item, i) => {
            items.push(new LdapServerProfileENT(item));
          });
          //Retornamos con la lista de Entities
          resolve(items);
        })
        .catch((e) => {
          console.log(
            "LdapServerProfilesBF->getData->Error al descargar datos."
          );
          console.log(e);
          //Retornamos del error
          reject(e);
        })
        .finally(() => {
          console.log("LdapServerProfilesBF->getData->Fin");
        });
    });

    return asyncMethod;
  }
}

export default LdapServerProfilesBF;
