const NAME = "Christian";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format.
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'tab'

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 1500;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [
    {
        "groupName": "News",
        "items":[
            {"name": "NRK", "shortcutKey": "n", "url": "https://www.nrk.no/"},
            {"name": "Aftenbladet", "shortcutKey": "a", "url": "http://www.aftenbladet.no/"},
            {"name": "E24", "shortcutKey": "e", "url": "https://e24.no/"},
            {"name": "DN", "shortcutKey": "d", "url": "https://www.dn.no/"}
        ]
    },
    {
        "groupName": "Tech",
        "items":[
            {"name": "The Verge", "shortcutKey": "v", "url": "http://www.theverge.com/"},
            {"name": "9to5Mac", "shortcutKey": "9", "url": "http://9to5mac.com/"},
            {"name": "MacRumors", "shortcutKey": "m", "url": "http://www.macrumors.com/"},
            {"name": "Tek.no", "shortcutKey": "k", "url": "https://www.tek.no/"}
        ]
    },
    {
        "groupName": "Other",
        "items":[
            {"name": "Twitter", "shortcutKey": "t", "url": "https://twitter.com/"},
            {"name": "Reddit", "shortcutKey": "r", "url": "https://www.reddit.com/"},
            {"name": "Flyprat", "shortcutKey": "f", "url": "http://forum.flyprat.no/search.php?do=getnew"},
            {"name": "FR24", "shortcutKey": "2", "url": "https://www.flightradar24.com/59.38,6.83/7"}
        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage(){
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours/6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupTime(){
  let hour = new Date().getHours();
  let min = new Date().getMinutes();
  let time = hour + ":" + min;
  document.getElementById("time-out").innerHTML = time;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  // add a zero in front of numbers<10
  m = checkTime(m);
  document.getElementById('time').innerHTML = h + ":" + m;
  t = setTimeout(function() {
    startTime()
  }, 500);
}

function setupGroups(){
    for (let i = 0; i < MASTER_MAP.length; i++){
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++){
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

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)){
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++){
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function(){ listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main(){
    startTime();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();
