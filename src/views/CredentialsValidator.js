import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ProcessButton from "components/VBG/ProcessButton";
import LdapServerProfilesBF from "business-components/LdapServerProfilesBF";
import LdapAuthenticationBF from "business-components/LdapAuthenticationBF";
import LdapAuthenticationStatusENT from "business-entities/LdapAuthenticationStatusENT";

class CredentialsValidator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: true,
      resultPanelHidden: true,
      profiles: [],
      txtbDomain: "LANPERU",
      authenticationStatus: new LdapAuthenticationStatusENT(
        null,
        null,
        null,
        null,
        null,
        null,
        "Ingrese sus credenciales en el formulario y valide."
      ),
    };
  }

  changeValueHandler = (event) => {
    let controlName = event.target.name;
    let controlValue = event.target.value;
    console.log(
      `changeValueHandler->Asignar valor: ${controlName}=${controlValue}`
    );
    //Asignamos el valor al estado
    this.setState({
      [controlName]: controlValue,
    });
  };

  componentDidMount() {
    //Obtener los Perfiles de acceso LDAP que soporta el Web API
    let bf = new LdapServerProfilesBF();
    bf.getProfiles()
      .then((entities) => {
        console.log(entities);
        //Asignamos el estado actual
        this.setState({
          busy: false,
          profiles: entities,
          combProfiles: entities[0].profileName,
        });
      })
      .catch((e) => {
        alert(e.message);
        console.log(e);
      });
  }

  validateCredentials() {
    this.setState({
      busy: true,
      resultPanelHidden: true,
    });

    let _authenticationStatus = new LdapAuthenticationStatusENT(
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
    let bf = new LdapAuthenticationBF();
    bf.validateCredentials(
      process.env.REACT_APP_WEBAPP_NAME,
      this.state.combProfiles,
      false,
      this.state.txtbDomain,
      this.state.txtbAccountName,
      this.state.txtbPassword
    )
      .then((entity) => {
        console.log("CredentialsValidator->validateCredentials->Resolved");
        _authenticationStatus = entity;
      })
      .catch((e) => {
        console.log("CredentialsValidator->validateCredentials->Error");
        console.log(e);
        alert(e.message);
      })
      .finally(() => {
        console.log("CredentialsValidator->validateCredentials->Fin");
        console.log(_authenticationStatus);
        //Asignamos el estado
        this.setState({
          busy: false,
          resultPanelHidden: false,
          authenticationStatus: _authenticationStatus,
        });
      });
  }

  customClick() {
    alert("Click!");
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="6">
            <div className="form-bordered">
              <Form>
                <Form.Group
                  as={Row}
                  controlId="combProfiles"
                  className="form-control-sm"
                >
                  <Form.Label column xs="3">
                    Perfil LDAP
                  </Form.Label>
                  <Col xs="9">
                    <Form.Control
                      // id="combProfiles"
                      name="combProfiles"
                      size="sm"
                      as="select"
                      disabled={this.state.busy}
                      onChange={this.changeValueHandler}
                    >
                      {this.state.profiles.map((profile, i) => {
                        return <option>{profile.profileName}</option>;
                      })}
                    </Form.Control>
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="txtbDomain"
                  className="form-control-sm"
                >
                  <Form.Label column xs="3">
                    Dominio
                  </Form.Label>
                  <Col xs="9">
                    <Form.Control
                      // id="txtbDomain"
                      name="txtbDomain"
                      size="sm"
                      placeholder="Dominio de la Red del usuario"
                      defaultValue={this.state.txtbDomain}
                      disabled={this.state.busy}
                      onChange={this.changeValueHandler}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="txtbAccountName"
                  className="form-control-sm"
                >
                  <Form.Label column xs="3">
                    Usuario Red
                  </Form.Label>
                  <Col xs="9">
                    <Form.Control
                      // id="txtbAccountName"
                      name="txtbAccountName"
                      size="sm"
                      placeholder="Cuenta del usuario de red"
                      disabled={this.state.busy}
                      onChange={this.changeValueHandler}
                    />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  controlId="txtbPassword"
                  className="form-control-sm"
                >
                  <Form.Label column xs="3">
                    Contraseña
                  </Form.Label>
                  <Col xs="9">
                    <Form.Control
                      // id="txtbPassword"
                      name="txtbPassword"
                      type="password"
                      size="sm"
                      placeholder="Contraseña del usuario de Red"
                      disabled={this.state.busy}
                      onChange={this.changeValueHandler}
                    />
                  </Col>
                </Form.Group>
                <Form.Group className="text-center">
                  <ProcessButton
                    idleCaption="Validar credenciales"
                    busyCaption="Validando credenciales"
                    fill="true"
                    buttonType="primary"
                    size="sm"
                    isBusy={this.state.busy}
                    idleIcon="nc-planet"
                    busyIcon="nc-refresh-02"
                    disabled={this.state.busy}
                    onClick={() => this.validateCredentials()}
                  />
                </Form.Group>
              </Form>
            </div>
          </Col>
          <Col md="6">
            <Card className="card-stats" hidden={this.state.resultPanelHidden}>
              <Card.Header className="text-center">
                <Card.Title as="h5">
                  Estado de la validaciòn de Credenciales
                </Card.Title>
              </Card.Header>
              <Card.Body className="text-center">
                <Row>
                  <Col>
                    <div className="icon-big">
                      <i className="nc-icon nc-single-02 text-info"></i>
                    </div>
                    <div>
                      <p className="card-category">Autenticado</p>
                      <span className="text-body">
                        {this.state.authenticationStatus.isSuccess == false
                          ? "Error"
                          : this.state.authenticationStatus.isAuthenticated ==
                            null
                          ? "Por validar"
                          : this.state.authenticationStatus.isAuthenticated
                          ? "SI"
                          : "NO"}
                      </span>
                      <p className="card-category mt-2">Mensaje</p>
                      <span
                        className={
                          this.state.authenticationStatus.isSuccess == null
                            ? "text-warning"
                            : this.state.authenticationStatus.isSuccess
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {this.state.authenticationStatus.message}
                      </span>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>{/* Nada por el momento */}</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CredentialsValidator;
