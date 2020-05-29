const NAME = "Christian";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format.
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = "tab";

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
  {
    groupName: "News",
    items: [
      { name: "NRK", shortcutKey: "n", url: "https://www.nrk.no/" },
      {
        name: "Aftenbladet",
        shortcutKey: "a",
        url: "http://www.aftenbladet.no/",
      },
      { name: "E24", shortcutKey: "e", url: "https://e24.no/" },
      { name: "DN", shortcutKey: "d", url: "https://www.dn.no/" },
    ],
  },
  {
    groupName: "Tech",
    items: [
      { name: "The Verge", shortcutKey: "v", url: "http://www.theverge.com/" },
      { name: "9to5Mac", shortcutKey: "9", url: "http://9to5mac.com/" },
      { name: "MacRumors", shortcutKey: "m", url: "http://www.macrumors.com/" },
      { name: "Tek.no", shortcutKey: "k", url: "https://www.tek.no/" },
    ],
  },
  {
    groupName: "Other",
    items: [
      { name: "Twitter", shortcutKey: "t", url: "https://twitter.com/" },
      { name: "Reddit", shortcutKey: "r", url: "https://www.reddit.com/" },
      {
        name: "Flyprat",
        shortcutKey: "f",
        url: "http://forum.flyprat.no/search.php?do=getnew",
      },
      {
        name: "FR24",
        shortcutKey: "2",
        url: "https://www.flightradar24.com/59.38,6.83/7",
      },
    ],
  },
];

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage() {
  let curHours = new Date().getHours();
  curHours = Math.floor(curHours / 6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
  if (curHours == 4) curHours = 3;
  let welcome = `Good ${WELCOME_MESSAGE_TEMPLATE[curHours]}, ${NAME}`;
  let el = document.getElementById("hello");
  el.setAttribute("data-rotate", `[ "${welcome}", "${formatTime()}" ]`);
}

function checkTime(i) {
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
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);

  return `${h}:${m}`;
}

function startTime() {
  document.getElementById("time").innerHTML = formatTime();
  t = setTimeout(function () {
    startTime();
  }, 500);
}

function showTime() {
  const el = document.getElementById("time");
  el.classList.add("fadeInShow");
  el.classList.remove("fadeInHide");
}

function setupGroups() {
  for (let i = 0; i < MASTER_MAP.length; i++) {
    let curGroupData = MASTER_MAP[i];

    let group = document.createElement("div");
    group.className = "group";
    $container.appendChild(group);

    let header = document.createElement("h1");
    header.innerHTML = curGroupData.groupName;
    group.appendChild(header);

    for (let j = 0; j < curGroupData.items.length; j++) {
      let curItemData = curGroupData.items[j];

      let pContainer = document.createElement("p");
      group.appendChild(pContainer);

      let link = document.createElement("a");
      link.innerHTML = curItemData.name;
      link.setAttribute("href", curItemData.url);
      pContainer.appendChild(link);

      let shortcutDisplay = document.createElement("span");
      shortcutDisplay.innerHTML = curItemData.shortcutKey;
      shortcutDisplay.className = "shortcut";
      shortcutDisplay.style.animation = "none";
      pContainer.appendChild(shortcutDisplay);

      getUrl[curItemData.shortcutKey] = curItemData.url;
    }
  }
}

function shortcutListener(e) {
  let key = e.key.toLowerCase();

  if (listeningForShortcut && getUrl.hasOwnProperty(key)) {
    window.location = getUrl[key];
  }

  if (key === SHORTCUT_STARTER) {
    clearTimeout(listenerTimeout);
    listeningForShortcut = true;

    // Animation reset
    for (let i = 0; i < $shortcutDisplayList.length; i++) {
      $shortcutDisplayList[i].style.animation = "none";
      setTimeout(function () {
        $shortcutDisplayList[i].style.animation = "";
      }, 10);
    }

    listenerTimeout = setTimeout(function () {
      listeningForShortcut = false;
    }, SHORTCUT_TIMEOUT);
  }
}

class TxtRotate {
  constructor(el, toRotate, period) {
    console.log(el);
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  }
  tick() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
    var that = this;
    var delta = 150 - Math.random() * 100;
    if (this.isDeleting) {
      delta /= 2;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
    if (i === 0 && this.txt === "") {
      this.el.classList.remove("fadeOutShow");
      this.el.classList.add("fadeOutHide");
      showTime();
    }
    setTimeout(function () {
      that.tick();
    }, delta);
  }
}

window.onload = function () {
  this.setupWelcomeMessage();

  var elements = document.getElementsByClassName("txt-rotate");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};

function main() {
  startTime();
  setupGroups();
  document.addEventListener("keyup", shortcutListener, false);
}

main();
