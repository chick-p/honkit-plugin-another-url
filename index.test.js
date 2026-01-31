import path from "node:path";
import tester from "honkit-tester";
import { expect, test } from "vitest";

const markdownContent = `---
anotherUrls:
  - "/id/dest.html"
---

# Title`;

function normalizeHtml(html) {
  return html.replace(/\s+/g, "").trim();
}

const htmlContent = `<!DOCTYPE html><html lang="en"><head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <script>
          const hash = window.location.hash;
          const query = window.location.search;
          window.location.href = '/src.html' + query + hash;
        </script>
      </head>
      <body>
        <section>
          <p>Move to <a href="/src.html">here</a>.</p>
        </section>
      </body></html>`;

test("Generate another link", async () => {
  const result = await tester
    .builder()
    .withContent(markdownContent)
    .withPage("src", markdownContent)
    .withLocalPlugin(path.join(__dirname, "."))
    .withBookJson({
      title: "Test Book",
      plugins: ["another-url"],
      pluginsConfig: {
        "another-url": {
          basepath: "/",
        },
      },
    })
    .create();
  const content = result.get("id/dest.html").$.html();
  expect(normalizeHtml(content)).toEqual(normalizeHtml(htmlContent));
});
