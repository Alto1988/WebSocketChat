import React, { Component } from "react";
import render from "react-dom";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {
    // const roomName = JSON.parse(
    //   document.getElementById("room-name").textContent
    // );
    const roomName = location.pathname.substr(1);
    const ws_path =
      "ws://" + window.location.host + "/ws/chat/" + roomName + "/";
    const chatSocket = new WebSocket(ws_path);

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      document.querySelector("#chat-log").value += data.message + "\n";
    };

    chatSocket.onclose = function (e) {
      console.error("Chat socket closed unexpectedly");
    };

    document.querySelector("#chat-message-input").focus();
    document.querySelector("#chat-message-input").onkeyup = function (e) {
      if (e.keyCode === 13) {
        // enter, return
        document.querySelector("#chat-message-submit").click();
      }
    };

    document.querySelector("#chat-message-submit").onclick = function (e) {
      const messageInputDom = document.querySelector("#chat-message-input");
      const message = messageInputDom.value;
      chatSocket.send(
        JSON.stringify({
          message: message,
        })
      );
      messageInputDom.value = "";
    };
  }
  render() {
    return (
      <div>
        {this.state.messages.map(function (item, i) {
          return (
            <div key={i} id="message" className="card">
              <div className="cell large-4">{item.text}</div>
              <div className="cell large-2 text-right">
                <small>{item.date}</small>
              </div>
            </div>
          );
        })}

        <textarea id="chat-message-input" type="text" cols="100" />
        <br />
        <input
          id="chat-message-submit"
          type="button"
          className="button"
          value="Send"
        />
      </div>
    );
  }
}

const root = document.getElementById("app");
render(<App />, root);
