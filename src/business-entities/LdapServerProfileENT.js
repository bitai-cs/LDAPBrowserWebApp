class LdapServerProfileENT {
  constructor(profileName) {
    if (!profileName) throw new Error("profileName cannot be null.");

    this._profileName = profileName;
  }

  get profileName() {
    return this._profileName;
  }

  set profileName(value) {
    this._profileName = value;
  }
}

export default LdapServerProfileENT;
