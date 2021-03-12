import React from "react";
import { Container, Row, Col, Card, ToastBody } from "react-bootstrap";
import { Toast, Spinner } from "react-bootstrap";
import LdapServerProfilesBF from 'business-components/LdapServerProfilesBF';

class LdapServerProfiles extends React.Component {
  constructor(props) {
    super(props);
    //Initialize component State
    this.state = {
      toast: (
        <Toast>
          <ToastBody>
            <span className="mr-2">Cargando</span>
            <Spinner animation="border" color="primary"></Spinner>
          </ToastBody>
        </Toast>
      ),
      data: [],
    };
  }

  /**
   * List the profiles obtained from the Web API
   */
  getItemsFromData() {
    const items = this.state.data.map((item, i) => {
      return <li className="list-group-item">{item.profileName}</li>;
    });

    return items;
  }

  componentDidMount() {
    let bf = new LdapServerProfilesBF();
    bf.getProfiles()
      .then((entities) => {
        console.log(
          "LdapServerProfiles->componentDidMount->Perfiles descargados."
        );
        console.log(entities);

        //Asignado el estado del componente
        this.setState({
          toast: null,
          data: entities,
        });
      })
      .catch((e) => {
        console.log(
          "LdapServerProfiles->componentDidMount->Error al obtener datos del BF."
        );
        console.log(e);

        alert(e.message);

        //Establece el estado del componente
        this.setState({
          toast: null,
          data: [],
        });
      })
      .finally(() => {
        console.log("LdapServerProfiles->componentDidMount->Fin");
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col xs="12">
            <Card>
              <Card.Header>
                {/* <Card.Title as="h4">Perfiles de Servidores LDAP</Card.Title> */}
                <span>Perfiles de acceso a servidores LDAP</span>
              </Card.Header>
              <Card.Body>
                {this.state.toast}
                <ul className="list-group">{this.getItemsFromData()}</ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default LdapServerProfiles;
