import BaseWebApiClient from "webapi-clients/BaseWebApiClient";

class LdapUserAndGroupQueuedResultWAC extends BaseWebApiClient {
  constructor() {
    super();
  }

  static get endPoint() {
    return "/api/LdapUserAndGroupQueuedResult";
  }

  getByAttribute(
    requestTag,
    ldapServerProfile,
    useGC,
    requiredEntryAttributes,
    filterAttribute,
    filterValue
  ) {
    console.log("LdapUserAndGroupQueuedResultWAC->GetByAttribute");
    
    let _requestUri = `${LdapUserAndGroupQueuedResultWAC.endPoint}/GetByAttribute?requestTag=${requestTag}&ldapServerProfile=${ldapServerProfile}&useGC=${useGC}&requiredEntryAttributes=${requiredEntryAttributes}&filterAttribute=${filterAttribute}&filterValue=${filterValue}`;  

    let _fullRequestUri = process.env.REACT_APP_WEBAPI_URL + _requestUri;

    const _request = {
      method: "GET",
      headers: { "Content-Type": this.contentTypeAppJson }
    };
    console.log(_request);
    console.log(_fullRequestUri);

    return fetch(
      _fullRequestUri,
      _request
    );
  }
}

export default LdapUserAndGroupQueuedResultWAC;
