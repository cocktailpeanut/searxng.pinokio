# SearXNG Pinokio Launcher

This launcher installs and runs [SearXNG](https://github.com/searxng/searxng), a privacy-respecting metasearch engine. It runs locally with Pinokio's Python 3.11 virtual environment and does not use Docker, containers, or system services.

## Use

1. Click **Install** to clone SearXNG into `app/` and install Python dependencies.
2. Click **Start** to launch the local web UI.
3. Click **Open Web UI** when the server is ready.
4. Use **Update** to pull the latest SearXNG code and reinstall dependencies.
5. Use **Reset** to remove the local checkout and generated secret.

The launcher binds SearXNG to `127.0.0.1` on an available local port.

## API

The launcher enables SearXNG's `json`, `csv`, and `rss` output formats in `settings.yml`.

Replace `$SEARXNG_URL` with the URL shown by the **Open Web UI** tab.

### Curl

```bash
curl "$SEARXNG_URL/search?q=pinokio&format=json"
```

### JavaScript

```javascript
const baseUrl = process.env.SEARXNG_URL || "http://127.0.0.1:8888"
const params = new URLSearchParams({ q: "pinokio", format: "json" })
const response = await fetch(`${baseUrl}/search?${params}`)
const data = await response.json()
console.log(data.results)
```

### Python

```python
import json
import os
import urllib.parse
import urllib.request

base_url = os.environ.get("SEARXNG_URL", "http://127.0.0.1:8888")
query = urllib.parse.urlencode({"q": "pinokio", "format": "json"})

with urllib.request.urlopen(f"{base_url}/search?{query}") as response:
    data = json.load(response)

print(data["results"])
```
