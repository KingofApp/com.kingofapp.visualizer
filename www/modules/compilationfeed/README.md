# Compilation status module

The module renders the current status and a short timeline of recent build events for one app. It polls every 10 seconds and only displays the app name, platform, localized status labels and safe error categories. It does not display Slack raw messages. The access token is a bearer secret: do not place it in public source repositories. It can be revoked and replaced.

## Enable a public feed

From an authenticated King of App session, send `POST /apps/{appId}/compilation-feed` with the usual `X-Access-Token` header. The response contains a one-time random `token`. Keep it private and paste it into this module's **Token de seguimiento** field. The internal app ID is used only for the authenticated management request; the public feed URL itself uses the random token.

Use `DELETE /apps/{appId}/compilation-feed` with the same authentication to revoke the link. Creating a new feed rotates the old token.

## Insert in a website

The JavaScript and its locale files are served as static files through jsDelivr from the Visualizer repository. This host is separate from the API: the API is used only for the sanitized JSON status response. The current pinned widget revision is:

```html
<script async
  src="https://cdn.jsdelivr.net/gh/KingofApp/com.kingofapp.visualizer@fdb32b85a11f93bca854c547c2822adfbb06c3ef/www/widgets/compilation-feed.js"
  data-api="https://api.kingofapp.com"
  data-token="PASTE_PUBLIC_FEED_TOKEN"
  data-locale="es-ES"></script>
```

The `data-api` value points only to the status JSON service. For a local API, set `data-api="http://your-lan-host:PORT"`; a local-only API cannot be reached by visitors outside that network. The widget JS can also be copied to any static website host. Use HTTPS for production pages.

## Local verification

The Builder module files are under `www/modules/compilationfeed`. JSON locales are kept separately so additional languages can be added without changing the renderer.
