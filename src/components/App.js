import React, { Component } from "react";
import copy from "copy-to-clipboard";
import "../css/style.css";
import Checkbox from "./Checkbox";
import Result from "./Result";

const smallLetters = "abcdefghijklmnopqrstuwxyz";
const bigLetters = "ABCDEFGHIJKLMNOPQRSTUWXYZ";
const numbers = "01234567890";
const specialLetters = "!@#$%^&*()_+-=~,.<>?:;`[]{}/''";

class App extends Component {
  state = {
    passwordLength: 0,
    password: "",
    options: [
      { id: 1, value: "Małe litery", isChecked: false },
      { id: 2, value: "Duże litery", isChecked: false },
      { id: 3, value: "Liczby", isChecked: false },
      { id: 4, value: "Specjalne znaki", isChecked: false }
    ]
  };

  handleChecked = e => {
    let options = this.state.options;
    options.forEach(option => {
      if (option.value === e.target.value) {
        option.isChecked = e.target.checked;
      }
    });
    this.setState({ options });
  };

  handleInputChange = e => {
    this.setState({
      passwordLength: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let allLetters = "";
    if (this.state.options[0].isChecked) {
      allLetters += smallLetters;
    }
    if (this.state.options[1].isChecked) {
      allLetters += bigLetters;
    }
    if (this.state.options[2].isChecked) {
      allLetters += numbers;
    }
    if (this.state.options[3].isChecked) {
      allLetters += specialLetters;
    }

    let generatePass = "";
    if (allLetters) {
      for (let i = 0; i < this.state.passwordLength; i++) {
        let letter = Math.floor(Math.random() * allLetters.length);

        generatePass += allLetters[letter];
      }
      this.setState({
        password: generatePass
      });
    }
  };

  handleCopy = () => {
    if (this.state.password) {
      copy(this.state.password);
      alert(`Skopiowano: ${this.state.password}`);
    }
  };

  handleButton = e => {
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";
    document.querySelector("button").appendChild(ripples);

    setTimeout(() => {
      ripples.remove();
    }, 1000);
  };

  render() {
    return (
      <div className="App">
        <h1>Generator haseł</h1>{" "}
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <ul>
              {this.state.options.map(option => {
                return (
                  <Checkbox
                    key={option.id}
                    handleChecked={this.handleChecked}
                    {...option}
                  ></Checkbox>
                );
              })}
            </ul>
            <label>
              {" "}
              <input
                type="number"
                min="0"
                max="10"
                defaultValue="0"
                className="inputNumber"
                onChange={this.handleInputChange}
              />
              Długość hasła{" "}
            </label>
            <button onClick={this.handleButton}>Generuj hasło</button>
          </form>
          <Result
            password={this.state.password}
            click={this.handleCopy}
          ></Result>
        </div>
      </div>
    );
  }
}

export default App;
