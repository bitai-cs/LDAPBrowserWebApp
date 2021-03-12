import LdapUserAndGroupQueuedResultWAC from "webapi-clients/LdapUserAndGroupQueuedResultWAC";
import LdapEntryENT from "business-entities/LdapEntryENT";

class LdapUserAndGroupBF {
  constructor() {
    //...
  }

  searchEntries(
    requestTag,
    ldapServerProfile,
    useGC,
    requiredEntryAttributes,
    filterAttribute,
    filterValue
  ) {
    //Promise to get Web API response
    let asyncMethod = new Promise((resolve, reject) => {
      let items = [];
      let _wac = new LdapUserAndGroupQueuedResultWAC();
      _wac
        .getByAttribute(
          requestTag,
          ldapServerProfile,
          useGC,
          requiredEntryAttributes,
          filterAttribute,
          filterValue
        )
        .then((response) => {
          console.log(
            "LdapUserAndGroupBF->getByAttribute->Response de la solicitud"
          );
          console.log(response);

          //Armar respuesta final de la solicitud
          return response.json().then((responseBody) => {
            if (response.ok) {
              return {
                ...{ isSuccessResponse: true, responseStatusCode: 200 },
                ...responseBody,
              };
            } else {
              return {
                ...{
                  isSuccessResponse: false,
                  responseStatusCode: response.status,
                },
                ...responseBody,
              };
            }
          });
        })
        .then((data) => {
          console.log("LdapUserAndGroupBF->getByAttribute->Data para procesar");
          console.log(data);

          //Crear Entities
          let _entries = [];
          if (data.isSuccessResponse) {
            //Recorrer cada entry de la respuesta...
            data.entries.map((entry, i) => {
              //Crear entity combinando los datos del parametro entry
              let _entity = { ...new LdapEntryENT(), ...entry };
              //Agregar Entity al array resultante
              _entries.push(_entity);
            });

            console.log("LdapUserAndGroupBF->getByAttribute->Data resultante");
            console.log(_entries);

            //Retornamos los entries resultantes
            resolve(_entries);
          } else {
            console.log("LdapUserAndGroupBF->getByAttribute->Data con errores");
            console.log(data);

            reject(data);
          }
        })
        .catch((e) => {
          console.log(
            "LdapUserAndGroupBF->getByAttribute->Error al solicitar datos"
          );
          console.log(e);

          //Retornamos del error
          reject(e);
        })
        .finally(() => {
          console.log("LdapUserAndGroupBF->getByAttribute->Fin");
        });
    });

    return asyncMethod;
  }
}

export default LdapUserAndGroupBF;
