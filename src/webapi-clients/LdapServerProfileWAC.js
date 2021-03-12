//import Reac from "react";
class LdapServerProfileWAC {
  constructor() {
    //To do...
  }

  static get endPoint() {
    return "/api/LdapServerProfile";
  }

  getData() {
    return fetch(
      process.env.REACT_APP_WEBAPI_URL + LdapServerProfileWAC.endPoint
    );
  }
}

export default LdapServerProfileWAC;
