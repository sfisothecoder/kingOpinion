# King Opinion landing page

A lightweight, responsive landing page that sends visitors to an externally hosted survey. It uses plain HTML, CSS, and JavaScript, with no build step or dependencies.

## Set the survey URL

Open `script.js` and replace the value near the top:

```javascript
const SURVEY_URL = "https://example.com/survey";
```

Use the full survey URL, including `https://`. This is the only place the destination is configured. If the value is empty, malformed, or uses a protocol other than HTTP/HTTPS, the CTA is safely disabled and an unavailable message is shown.

## Test the Complete Survey button

1. Set `SURVEY_URL` to a test destination you control.
2. Start a local server using one of the commands below.
3. Open the local URL in a browser and select **Complete Survey**.
4. Confirm the same browser tab opens the configured destination.

To test tracking passthrough, open a URL such as:

```text
http://localhost:8000/?subid=test-123&source=local&campaign=demo
```

After selecting the button, the destination should contain those same values. Test the unavailable state temporarily with `const SURVEY_URL = "";`.

## Tracking parameters

The `TRACKING_PARAMETER_MAP` object in `script.js` controls tracking passthrough. By default, these incoming parameters are allowlisted:

- `subid`
- `sub1`
- `sub2`
- `source`
- `campaign`
- `click_id`

Only values actually present in the landing-page URL are copied. The code does not create visitor data. A parameter already included in `SURVEY_URL` takes precedence and is not overwritten. To map an incoming name to a different survey-provider name, change the corresponding value:

```javascript
const TRACKING_PARAMETER_MAP = {
  click_id: "provider_click_id"
};
```

## Run locally

No installation or build is required. From the project directory, run either:

```bash
python3 -m http.server 8000
```

or:

```bash
npx serve .
```

Then visit `http://localhost:8000/` (or the address printed by `serve`). A local server is preferable to opening `index.html` directly because it matches production hosting behavior.

## Deploy as a static site

- **Netlify:** Drag the project folder into Netlify Drop, or connect the repository. Publish the project root; no build command is needed.
- **Vercel:** Import the repository, choose the static/other framework preset, leave the build command empty, and use `.` as the output directory.
- **GitHub Pages:** Push the files to a repository, then enable Pages for the branch containing `index.html` and select the repository root.
- **Other hosts:** Upload all four files together, keeping their names and relative locations unchanged.

## File guide

- `index.html` — content, metadata, semantic structure, and SVG artwork
- `styles.css` — responsive layout, typography, colors, focus states, and button styling
- `script.js` — survey URL, tracking parameter mapping, URL validation, and redirect behavior
- `README.md` — configuration, testing, and deployment instructions
