function getRSS() {
  let $rss_container = document.getElementById("rss");
  var myXML = "";
  var request = new XMLHttpRequest();
  request.open("GET", "https://feed.nrk.no/pan/rss/1.11001867", true);
  request.onreadystatechange = function () {
    if (request.readyState == 4) {
      if (request.status == 200 || request.status == 0) {
        myXML = request.responseXML;
        console.log(myXML);
        $(myXML)
          .find("item:lt(3)")
          .each(function () {
            const el = $(this);

            let rss_item = document.createElement("div");
            rss_item.className = "rss_item";
            $rss_container.appendChild(rss_item);

            let title = document.createElement("h1");
            title.innerHTML = `<a href="${el
              .find("link")
              .text()}" target="_blank" rel="noopener">
              ${el.find("title").text()}
            </a>`;
            rss_item.appendChild(title);

            let description = document.createElement("p");
            description.innerHTML = `${el.find("description").text()}`;
            rss_item.appendChild(description);
            console.log("Success");
          });
      }
    }
  };
  request.send();
}

getRSS();
