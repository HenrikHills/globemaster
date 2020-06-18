const RSS_URL = `https://feed.nrk.no/pan/rss/1.11001867`;

$.ajax(RSS_URL, {
  accepts: {
    xml: "application/rss+xml",
  },

  dataType: "xml",

  success: function (data) {
    $(data)
      .find("item")
      .each(function () {
        const el = $(this);

        const template = `
            <article>
              <h2>
                <a href="${el
                  .find("link")
                  .text()}" target="_blank" rel="noopener">
                  ${el.find("title").text()}
                </a>
              </h2>
              <p>
              ${el.find("description").text()}
              </p>
            </article>
          `;

        document.body.insertAdjacentHTML("beforeend", template);
      });
  },
});
