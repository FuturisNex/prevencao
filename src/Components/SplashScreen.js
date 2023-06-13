import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import logo from "./grupo.png";
import './SplashScreen.css';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 3000); // Tempo em milissegundos (3 segundos)
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="splash-screen">
        <div className="logo">
        <img src={logo} alt="Logo" className="logo-form" />
          <div className="reflection" />
        </div>
      </div>
    );
  }
}

export default SplashScreen;
