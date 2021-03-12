class LdapEntryENT {
  constructor() {
    this.requestTag = "";

    this.entryFromGC = false;

    this.directoryEntryPath = "";

    this.c = "";

    this.cn = "";

    this.company = "";

    this.description = "";

    this.department = "";

    this.displayName = "";

    this.distinguishedName = "";

    this.givenName = "";

    this.l = "";

    this.lastLogon = new Date();

    this.mail = "";

    this.manager = "";

    this.member = [];
    this.memberOf = [];
    this.memberOfEntries = [];
    this.name = "";

    this.objectCategory = "";

    this.objectClass = [];
    this.samAccountName = "";

    this.samAccountType = "";

    this.sn = "";

    this.telephoneNumber = "";

    this.title = "";

    this.userPrincipalName = "";

    this.whenCreated = new Date();

    this.objectGuid = "";

    this.objectGuidBytes = null; //($byte)

    this.objectSid = "";

    this.objectSidBytes = null; //($byte)
  }
}

export default LdapEntryENT;
