import BaseWebApiClient from "webapi-clients/BaseWebApiClient";

class LdapAuthenticationWAC extends BaseWebApiClient {
  constructor() {
    super();
  }

  static get endPoint() {
    return "/api/LdapAuthentication";
  }

  postData(
    requestTag,
    ldapServerProfile,
    useGC,
    domainName,
    accountName,
    password
  ) {
    const body = {
      requestTag: requestTag,
      ldapServerProfile: ldapServerProfile,
      useGC: useGC,
      domainName: domainName,
      accountName: accountName,
      password: password,
    };

    console.log("LdapAuthenticationWAC->postData->body");
    console.log(body);

    const request = {
      method: "POST",
      headers: { "Content-Type": this.contentTypeAppJson },
      body: JSON.stringify(body),
    };
    console.log(request);

    return fetch(
      process.env.REACT_APP_WEBAPI_URL + LdapAuthenticationWAC.endPoint,
      request
    );
  }
}

export default LdapAuthenticationWAC;
