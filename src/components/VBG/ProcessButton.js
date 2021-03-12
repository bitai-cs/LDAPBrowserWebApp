import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

class ProcessButton extends Component {
  constructor(props) {
    super(props);
  }

  getButtonClassname() {
    return (
      (this.props.fill ? "btn-fill " : "btn ") +
      this.getButtonType() +
      this.getSize()
    );
  }

  getButtonType() {
    switch (this.props.buttonType) {
      case "primary":
        return "btn-primary ";
      case "warning":
        return "btn-warning ";
      case "success":
        return "btn-success ";
      case "danger":
        return "btn-danger ";
      default:
        return " ";
    }
  }

  getSize() {
    switch (this.props.size) {
      case "sm":
        return "btn-sm ";
      case "lg":
        return "btn-lg ";
      default:
        return " ";
    }
  }

  render() {
    return (
      <Button
        className={this.getButtonClassname() + " mt-3"}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
      >
        <i
          className={
            this.props.isBusy
              ? "nc-icon spin " + this.props.busyIcon + " lg mr-1"
              : "nc-icon " + this.props.idleIcon + " lg mr-1"
          }
        ></i>
        {this.props.isBusy}
        {this.props.isBusy ? this.props.busyCaption : this.props.idleCaption}
      </Button>
    );
  }
}

ProcessButton.propTypes = {
  idleCaption: PropTypes.string.isRequired,
  busyCaption: PropTypes.string.isRequired,
  fill: PropTypes.bool,
  buttonType: PropTypes.string,
  size: PropTypes.oneOf(['sm','lg']),
  isBusy: PropTypes.bool.isRequired,
  idleIcon: PropTypes.bool.isRequired,
  busyIcon: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

ProcessButton.defaultProps = {
  fill: true,
  buttonType: "primary",
  size: "",
  disabled: false,
};

export default ProcessButton;
