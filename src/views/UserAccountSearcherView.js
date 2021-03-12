import react from "react";
import {
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";
import LdapServerProfilesBF from "business-components/LdapServerProfilesBF";
import LdapUserAndGroupBF from "business-components/LdapUserAndGroupBF";

class UserAccountSearcherView extends react.Component {
  constructor(props) {
    super(props);

    this.state = {
      busy: true,
      profiles: [],
      entries: [],
    };
  }

  componentDidMount() {
    let _bf = new LdapServerProfilesBF();
    _bf
      .getProfiles()
      .then((entities) => {
        //Asignar valores al state
        this.setState({
          busy: false,
          profiles: entities,
          combProfiles: entities[0].profileName,
          chkbUseGC: false,
          combFilterTypes: "cn",
          combOutputTypes: "Minimun",
        });
      })
      .catch((e) => {
        alert(e.message);
        console.log(e);
      });
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

  searchEntries() {
    this.setState({
      busy: true,
    });

    let _bf = new LdapUserAndGroupBF();
    _bf
      .searchEntries(
        process.env.REACT_APP_WEBAPP_NAME,
        this.state.combProfiles,
        this.state.chkbUseGC,
        this.state.combOutputTypes,
        this.state.combFilterTypes,
        this.state.txtbFilterValue
      )
      .then((entries) => {
        console.log("UserAccountSearcherView -> searchEntries -> Then");
        console.log(entries);

        this.setState({
          busy: false,
          entries: entries,
        });
      })
      .catch((e) => {
        console.log("UserAccountSearcherView -> searchEntries -> Catch");
        console.log(e);

        alert(e.message);
      })
      .finally(() => {
        console.log("UserAccountSearcherView -> searchEntries -> Finally");
      });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <div className="form-bordered">
              <Form inline>
                <FormGroup className="mt-1">
                  <Label size="sm" for="combProfiles">
                    Perfil LDAP:
                  </Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="ml-1"
                    name="combProfiles"
                    onChange={this.changeValueHandler}
                  >
                    {this.state.profiles.map((profile, i) => {
                      return (
                        <option value={profile.profileName}>
                          {profile.profileName}
                        </option>
                      );
                    })}
                  </Input>
                </FormGroup>
                <FormGroup className="ml-3 mt-1">
                  <Label check size="sm" for="chkbUseGC">
                    Usar Catalogo Global:
                    <Input
                      type="checkbox"
                      bsSize="sm"
                      className="ml-1"
                      name="chkbUseGC"
                      onChange={this.changeValueHandler}
                    ></Input>
                  </Label>
                </FormGroup>
                <FormGroup className="ml-3 mt-1">
                  <Label size="sm" for="combFilterTypes">
                    Filtrar por:
                  </Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="ml-1"
                    name="combFilterTypes"
                    onChange={this.changeValueHandler}
                  >
                    <option value="cn">Nombre</option>
                    <option value="description">Descripción</option>
                    <option value="sAMAccountName">Usuario de Red</option>
                    <option value="mail">Email</option>
                  </Input>
                  <Input
                    type="text"
                    bsSize="sm"
                    name="txtbFilterValue"
                    className="ml-1"
                    placeholder="Ingrese valor del filtro"
                    onChange={this.changeValueHandler}
                  ></Input>
                </FormGroup>
                <FormGroup className="ml-3 mt-1">
                  <Label size="sm" for="combOutputTypes">
                    Datos requeridos:
                  </Label>
                  <Input
                    type="select"
                    bsSize="sm"
                    className="ml-1"
                    name="combOutputTypes"
                    onChange={this.changeValueHandler}
                  >
                    <option value="Minimun">Mínimos</option>
                    <option value="Few">Pocos</option>
                    <option value="All">Todo</option>
                  </Input>
                </FormGroup>
                <FormGroup className="ml-3 mt-1">
                  <Input
                    type="button"
                    bsSize="sm"
                    name="butnSearch"
                    className="btn-fill btn-primary"
                    value="Buscar Cuenta"
                    onClick={() => this.searchEntries()}
                  />
                </FormGroup>
              </Form>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <p className="card-category">
                  Se encontraron los siguientes usuarios:
                </p>
              </CardHeader>
              <CardBody className="table-full-width table-responsive px-0 table-sm">
                <Table className="table-primary table-hover table-striped">
                  <thead>
                    <th>Usuario Red</th>
                    <th>Desc.</th>
                    <th>Nombre</th>
                  </thead>
                  <tbody>
                    {this.state.entries.map((entry, i) => {
                      return (
                        <tr>
                          <td>{entry.samAccountName}</td>
                          <td>
                            {entry.description == null
                              ? "-"
                              : entry.description}
                          </td>
                          <td>{entry.cn}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserAccountSearcherView;
