document.addEventListener("DOMContentLoaded", () => {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const chatarea = document.getElementById("chatarea");
  const tutorialElem = document.getElementById("tutorial");

  tutorialElem.textContent = "enter `/m` to see the messages";

  const createMsg = (message) => {
    const messageData = { id: Date.now(), text: message };
    const send = document.createElement("div");
    send.className = "send";
    send.innerHTML = `<p>${message}</p>`;
    chatarea.appendChild(send);
    messages.push(messageData);
    localStorage.setItem("messages", JSON.stringify(messages));
  };

  const listMessages = () => {
    const receivedMsg = document.createElement("div");
    receivedMsg.className = "receive";
    const textMessageUL = document.createElement("ul");

    messages.forEach((msg, index) => {
      const textMessageLI = document.createElement("li");

      const textDiv = document.createElement("div");
      textDiv.className = "textDiv";
      textDiv.innerText = msg.text;

      const btnDiv = document.createElement("div");
      btnDiv.className = "btnDiv";

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn";
      deleteBtn.innerHTML = `<img src="./images/delete.png" />`;
      deleteBtn.addEventListener("click", () => {
        messages.splice(index, 1);
        localStorage.setItem("messages", JSON.stringify(messages));
        textMessageUL.removeChild(textMessageLI);
      });

      const editBtn = document.createElement("button");
      editBtn.className = "btn";
      editBtn.innerHTML = `<img src="./images/edit.png"/>`;
      editBtn.addEventListener("click", () => {
        const editInput = document.createElement("input");
        const saveBtn = document.createElement("button");
        saveBtn.innerHTML = "Save";
        saveBtn.addEventListener("click", () => {
          const editedMsg = editInput.value;
          textDiv.innerText = editedMsg;
          messages[index].text = editedMsg;
          localStorage.setItem("messages", JSON.stringify(messages));
          btnDiv.replaceChild(editBtn, saveBtn);
          btnDiv.removeChild(editInput);
        });
        editInput.value = msg.text;
        btnDiv.appendChild(editInput);
        btnDiv.replaceChild(saveBtn, editBtn);
      });

      btnDiv.appendChild(deleteBtn);
      btnDiv.appendChild(editBtn);
      textMessageLI.appendChild(textDiv);
      textMessageLI.appendChild(btnDiv);
      textMessageUL.appendChild(textMessageLI);
    });

    receivedMsg.appendChild(textMessageUL);
    chatarea.appendChild(receivedMsg);
  };

  document.getElementById("sendBtn").addEventListener("click", () => {
    const message = document.getElementById("inputMsg").value;
    if (message) {
      if (message === "/m") {
        messages.length ? listMessages() : (tutorialElem.textContent = "No Data is available");
      } else {
        createMsg(message);
        tutorialElem.textContent = "";
      }
      document.getElementById("inputMsg").value = "";
    } else {
      alert("Please enter a message");
    }
  });
});