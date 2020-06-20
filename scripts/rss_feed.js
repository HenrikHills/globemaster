const RSS_URL = `https://feed.nrk.no/pan/rss/1.11001867`;

let $rss_container = document.getElementById("rss");

$.ajax(RSS_URL, {
  accepts: {
    xml: "application/rss+xml",
  },

  dataType: "xml",
  crossDomain: true,

  success: function (data) {
    $(data)
      .find("item:lt(3)")
      .each(function () {
        const el = $(this);

        let rss_item = document.createElement("div");
        rss_item.className = "rss_item";
        $rss_container.appendChild(rss_item);
        console.log("Test");

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
      });
  },
});
