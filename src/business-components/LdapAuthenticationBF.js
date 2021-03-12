import LdapAuthenticationWAC from "webapi-clients/LdapAuthenticationWAC";
import LdapAuthenticationStatusENT from "business-entities/LdapAuthenticationStatusENT";

class LdapAuthenticationBF {
  constructor() {
    //...
  }

  validateCredentials(
    requestTag,
    ldapServerProfile,
    useGC,
    domainName,
    accountName,
    password
  ) {
    //Promise to get Web API response
    let asyncMethod = new Promise((resolve, reject) => {
      let items = [];
      let wac = new LdapAuthenticationWAC();
      wac
        .postData(
          requestTag,
          ldapServerProfile,
          useGC,
          domainName,
          accountName,
          password
        )
        .then((response) => {
          console.log("LdapAuthenticationBF->validateCredentials->Response");
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
          console.log("LdapAuthenticationBF->validateCredentials->Data");
          console.log(data);

          //Crear Entity
          let authenticationStatus = null;
          if (data.isSuccessResponse) {
            authenticationStatus = new LdapAuthenticationStatusENT(
              true,
              data.requestTag,
              data.useGC,
              data.domainName,
              data.user,
              data.isAuthenticated,
              data.message
            );
          } else {
            authenticationStatus = new LdapAuthenticationStatusENT(
              false,
              null,
              null,
              null,
              null,
              "Error",
              data.Message
            );
          }
          console.log(
            "LdapAuthenticationBF->validateCredentials->Creando Entity respuesta:"
          );
          console.log(authenticationStatus);

          //Retornamos el Entity
          resolve(authenticationStatus);
        })
        .catch((e) => {
          console.log(
            "LdapAuthenticationBF->validateCredentials->Error al descargar datos."
          );
          console.log(e);
          //Retornamos del error
          reject(e);
        })
        .finally(() => {
          console.log("LdapAuthenticationBF->validateCredentials->Fin");
        });
    });

    return asyncMethod;
  }
}

export default LdapAuthenticationBF;
