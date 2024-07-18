document.addEventListener("DOMContentLoaded", function () {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const date = new Date();
  const time = date.getHours() + ":" + date.getMinutes();
  const msgLen = messages.length;
  const chatarea = document.getElementById("chatarea");
  const tutorial = document.getElementById("tutorial").textContent =
    "enter `/m` to see the messages";

  // Create new message
  const createMsg = (message) => {
    const messageData = {
      id: Date.now(),
      text: message,
    };
    const send = document.createElement("div");
    send.className = "send";
    messages.push(messageData);
    const textMessage = document.createElement("p");
    textMessage.innerHTML = message;
    send.appendChild(textMessage);
    chatarea.appendChild(send);
    localStorage.setItem("messages", JSON.stringify(messages));
    if (msgLen != 0) {
      messages.forEach((i) => {});
    }
  };

  // Adding new message
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.addEventListener("click", function () {
    const message = document.getElementById("inputMsg").value;
    if (message != "") {
      if (message === "/m") {
        listMessages();
      } else {
        createMsg(message);
      }
      document.getElementById("inputMsg").value = "";
    } else {
      window.alert("Please enter a message");
    }
  });

  // Listing all messages
  const listMessages = () => {
    const receivedMsg = document.createElement("div");
    receivedMsg.className = "receive";
    const textMessageUL = document.createElement("ul");
    messages.map((i,index) => {
      console.log(i);
      const textMessageLI = document.createElement("li");
      textMessageLI.innerHTML = `${i.text}`;
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn";
      deleteBtn.innerHTML = `<img src="../images/delete.png" />`;
      const editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.innerHTML = `<img src ="../images/edit.png"/>`;
      editBtn.addEventListener("click", function () {
        const editInput = document.createElement("input");
        const saveBtn = document.createElement("button");
        saveBtn.innerHTML = "Save";
        saveBtn.addEventListener("click", function () {
          const editedMsg = editInput.value;
          textMessageLI.innerHTML = `${editedMsg}`;
          localStorage.setItem("messages", JSON.stringify(messages));
        });
        editInput.value = i.text;
        editInput.id = "editInput";
        textMessageUL.appendChild(editInput);
        textMessageUL.appendChild(saveBtn);
        textMessageLI.removeChild(textMessageLI.lastChild);
      });
      deleteBtn.addEventListener("click", function () {
        messages.splice(index, 1);
        localStorage.setItem("messages", JSON.stringify(messages));
        textMessageUL.removeChild(textMessageLI);
      });
      textMessageLI.appendChild(deleteBtn);
      textMessageLI.appendChild(editBtn);
      textMessageUL.appendChild(textMessageLI);
    });
    receivedMsg.appendChild(textMessageUL);
    chatarea.appendChild(receivedMsg);
  };
});