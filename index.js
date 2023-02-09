const path = require("path");

const pluginName = "another-url";

function buildContent(path) {
  const encodedUri = encodeURI(path);
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <script>
          const hash = window.location.hash;
          const query = window.location.search;
          window.location.href = '${encodedUri}' + query + hash;
        </script>
      </head>
    </html>`;
}

function buildAnotherUrlPath(isIndexHtml, anotherUrl) {
  if (isIndexHtml) {
    return `${path.resolve("/", "/../" + anotherUrl)}/index.html`;
  }
  return path.resolve("/", anotherUrl);
}

function pageHookHandler(page) {
  const { anotherUrls } = page;
  if (!anotherUrls || anotherUrls.length === 0) {
    return;
  }
  const { book, output } = this;
  const config = book.config.get(`pluginsConfig.${pluginName}`, {});
  const toUrl = output.toURL(page.path);
  const toUrlPath = config.basepath + toUrl;

  anotherUrls.forEach(function (anotherUrl) {
    const isIndexHtml = anotherUrl.endsWith("/");
    const anotherUrlPath = buildAnotherUrlPath(isIndexHtml, anotherUrl);
    output.writeFile(anotherUrlPath, buildContent(toUrlPath));
  });
}

function initHookHandler() {
  if (
    !Object.keys(this.book.config.get(`pluginsConfig.${pluginName}`, {})).length
  ) {
    this.book.config.set(`pluginsConfig.${pluginName}`, {
      basepath: "/",
    });
  }
}

module.exports = {
  hooks: {
    init: initHookHandler,
    page: pageHookHandler,
  },
};
