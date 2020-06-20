const MASTER_MAP = [
  {
    groupName: "News",
    items: [
      { name: "NRK", url: "https://www.nrk.no/" },
      { name: "Aftenbladet", url: "http://www.aftenbladet.no/" },
      { name: "E24", url: "https://e24.no/" },
      { name: "DN", url: "https://www.dn.no/" },
    ],
  },
  {
    groupName: "Tech",
    items: [
      { name: "The Verge", url: "http://www.theverge.com/" },
      { name: "9to5Mac", url: "http://9to5mac.com/" },
      { name: "MacRumors", url: "http://www.macrumors.com/" },
      { name: "Tek.no", url: "https://www.tek.no/" },
    ],
  },
  {
    groupName: "Other",
    items: [
      { name: "Twitter", url: "https://twitter.com/" },
      { name: "Reddit", url: "https://www.reddit.com/" },
      { name: "Flyprat", url: "http://forum.flyprat.no/search.php?do=getnew" },
      { name: "FR24", url: "https://www.flightradar24.com/59.38,6.83/7" },
    ],
  },
];

let $container = document.getElementById("content");

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
      pContainer.className = "content_font";
      group.appendChild(pContainer);

      let link = document.createElement("a");
      link.innerHTML = curItemData.name;
      link.setAttribute("href", curItemData.url);
      pContainer.appendChild(link);
    }
  }
}

setupGroups();
