import "./styles.css";

function initiateQiscus() {
  QiscusSDK.core.init({
    AppId: "tugu-insu-ldnfjbr3fdk",
    options: {
      loginSuccessCallback() {
        QiscusUI.chatTarget("ilesmana@antigravity.id");
      },
      roomChangedCallback(data) {
        // Pastikan untuk mengirim komen
        // hanya jika ini post pertama
        if (data.comments.length < 1) {
          QiscusSDK.core.sendComment(
            QiscusSDK.core.selected.id, // room id
            "hi", // message content
            null, // unique_id
            "custom", // message type
            { type: "trigger", content: { visible: false } }, // payload
            null // extras
          );
        } else {
          // kalau sudah pernah di kirimkan komen, kita baca komen
          // pertama, kalau tipenya custom dan visible false
          // maka set display nya ke none supaya hilang
          if (data.comments[0].type === "custom") {
            if (!data.comments[0].payload.content.visible) {
              document.getElementById(data.comments[0].id).style =
                "display: none;";
            }
          }
        }
      }
    }
  });
  var randomID = null;
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++)
    randomID += possible.charAt(Math.floor(Math.random() * possible.length));
  var randomKey = Date.now();
  var userData = {
    user_id: randomID + "@guesttugu.com",
    user_key: randomKey,
    user_name: "Guest - " + randomKey
  };
  QiscusSDK.core.setUser(
    userData.user_id,
    userData.user_key,
    userData.user_name,
    "https://image.flaticon.com/icons/svg/145/145867.svg"
  );
  QiscusSDK.render();
}

(function() {
  // Buat element qiscus-widget kalo belum ada
  if (!document.getElementById("qiscus-widget"))
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div id="qiscus-widget"></div>'
    );
  // Pasang qiscus widget
  var e = document.createElement("script");
  e.setAttribute("type", "text/javascript");
  e.setAttribute(
    "src",
    "https://multichannel.qiscus.com/js/qiscus-sdk.2.9.6.js"
  );
  e.onload = () => initiateQiscus();
  document.head.appendChild(e);
})();
