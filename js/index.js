// Cargar imagen del chat
const imageChatInputDOM = document.getElementById("image-chat");
const imageTagDOM = document.querySelector(".imagen-chat");
const imageChatDOM = document.querySelector("#image-user-chat");

imageChatInputDOM.addEventListener("change", (e) => {
  const targetImage = e.target;
  const reader = new FileReader();

  reader.readAsDataURL(targetImage.files[0]);
  reader.onload = (e) => {
    e.preventDefault();
    imageTagDOM.src = e.target.result;
    imageChatDOM.src = e.target.result;
  };
});

// Cargar Nombre del destino
const nameChatInputDOM = document.getElementById("name-contact");
const nameChatDOM = document.getElementById("chat-name");

nameChatInputDOM.addEventListener("change", () => {
  nameChatDOM.textContent = nameChatInputDOM.value;
});

// Cargar fecha
const today = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };
const dateES = today.toLocaleDateString("es-ES", options);
const dateChatDOM = document.getElementsByClassName("date");

dateChatDOM[0].textContent = dateES;

// Cargar Mensajes
const messageContainerDOM = document.querySelector("#content-messages");
const btnAddMessageDOM = document.querySelector("#add-message");
const optionsMessage = document.querySelectorAll(
  "input[name='option-message']"
);

btnAddMessageDOM.addEventListener("click", () => {
  const todayActually = new Date();
  const inputMessageDOM = document.querySelector("#message");
  const inputTimeDOM = document.getElementById("time-data");
  let timeChat;

  if (inputMessageDOM.value.length == 0) return;

  if (inputTimeDOM.value.length == 0)
    timeChat = todayActually.toLocaleTimeString("es-ES").slice("0", "5");
  else timeChat = inputTimeDOM.value;

  const objectTime = formatTime(timeChat);

  messageContainerDOM.innerHTML += `
        <div class="${
          optionsMessage[0].checked
            ? "bg-success align-self-end text-white"
            : "bg-white"
        } message-chat position-relative">
            ${inputMessageDOM.value}
            <span
              class="position-absolute"
              style="
                font-size: 12px;
                color: ${optionsMessage[0].checked ? "#fff" : "#8696a0"};
                bottom: 2px;
                right: 5px;
              "
              >${objectTime.time + objectTime.turn}</span
            >
        </div>
    `;
});

const formatTime = (hour) => {
  const res = {};
  const arrayHour = hour.split(":");

  if (+arrayHour[0] < 12) {
    res.turn = "am";
    res.time = arrayHour.join(":");
    return res;
  }

  res.turn = "pm";
  res.time = +arrayHour[0] - 12 + ":" + arrayHour[1];
  return res;
};

// Descargar imagen
const btnDownloadDOM = document.querySelector(".btn-download");

btnDownloadDOM.addEventListener("click", () => {
  const captureContainerDOM = document.querySelector("#capture");

  html2canvas(captureContainerDOM)
    .then((canvas) => {
      canvas.style.display = "none";
      document.body.appendChild(canvas);
      return canvas;
    })
    .then((canvas) => {
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute(
        "download",
        `${nameChatDOM.textContent}-Whatsapp_Chat_Fake.png`
      );
      a.setAttribute("href", image);
      a.click();
      canvas.remove();
    });
});
