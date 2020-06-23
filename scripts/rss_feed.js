function getRSS() {
  let $rss_container = document.getElementById("rss");

  let nrk_credits = document.createElement("div");
  nrk_credits.className = "credits";
  nrk_credits.innerHTML = `<p>News from 
  <a href="https://feed.nrk.no/pan/rss/1.11001867">NRK</a>
  :</p>`;
  nrk_credits.style = "visibility: hidden; opacity: 0;";
  $rss_container.appendChild(nrk_credits);

  var rss_xml = "";
  var request = new XMLHttpRequest();
  request.open(
    "GET",
    "https://cors-anywhere.herokuapp.com/https://feed.nrk.no/pan/rss/1.11001867",
    true
  );
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        rss_xml = request.responseXML;
        $(rss_xml)
          .find("item:lt(3)")
          .each(function () {
            const el = $(this);

            let rss_item = document.createElement("div");
            rss_item.className = "rss_item";
            $rss_container.appendChild(rss_item);

            let title = document.createElement("div");
            title.innerHTML = `${el.find("title").text()}`;
            title.className = "title";
            title.tabIndex = "1";
            title.style = "transition: 500ms; opacity: 0.6;";
            rss_item.appendChild(title);

            let description = document.createElement("div");
            description.className = "description_item";
            description.innerHTML = `
            <a href="${el.find("link").text()}" target="_blank" rel="noopener">
              ${el.find("description").text()}
            </a>`;
            rss_item.appendChild(description);
          });
        nrk_credits.style =
          "transition: 1000ms; opacity: 0.3; visibility: visible;";
      }
    }
  };
  request.send();
  console.log("RSS Complete.");

  console.log("Credits Complete.");
}

getRSS();
