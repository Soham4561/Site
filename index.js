setTimeout(() => {
  var page = document.getElementById("content-page")
  var loading = document.getElementById("loading")
  loading.style.display = "none";
  page.style.display = "block";
  page.style.transform = "translate(-50%, -50%) scale(1)";
  page.style.opacity = 1;
},3)

var start = () => {
  window.Telegram.WebApp.expand();
};

start()