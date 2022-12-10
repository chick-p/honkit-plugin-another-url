# Honkit Another Url Plugin

You can add another url to your Honkit page.

## Usage

Install this plugin:

```shell
$ npm install -D https://github.com/chick-p/honkit-plugin-another-url.git
```

Add to your `book.json` plugin list and config:

```json
{
  "plugins": [
    "another-url@https://github.com/chick-p/honkit-plugin-another-url.git"
  ],
  "pluginsConfig": {
    "another-url": {
      "basepath": "/"
    }
  }
}
```

## How to use it

Define `anotherUrls` to [front matter](https://honkit.netlify.app/pages.html#front-matter) of page.
For example:

```markdown
---
anotherUrls:
  - "/id/eternal-extream-permanent-link.html"
---

# Title
```

If you access to `book.example.com/id/eternal-extream-permanent-link.html`, redirect to the page that defined the front matter.
