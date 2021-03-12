class LdapAuthenticationStatusENT {
  constructor(
    isSuccess,
    requestTag,
    useGC,
    domainName,
    accountName,
    isAuthenticated,
    message
  ) {
    this.isSuccess = isSuccess;
    this.requestTag = requestTag;
    this.useGC = useGC;
    this.domainName = domainName;
    this.accountName = accountName;
    this.isAuthenticated = isAuthenticated;
    this.message = message;
  }
}

export default LdapAuthenticationStatusENT;
