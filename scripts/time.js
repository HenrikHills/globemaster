function formatPrintedTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  h = formatPrintedTime(h);
  m = formatPrintedTime(m);
  s = formatPrintedTime(s);
  return `${h}:${m}:${s}`;
}

function showTime() {
  const el = document.getElementById("time");
  el.innerHTML = formatTime();
  t = setTimeout(function () {
    showTime();
  }, 1000);
}

showTime();
