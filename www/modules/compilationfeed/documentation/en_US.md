# Compilation status

Show the status and latest milestones of a King of App build without exposing personal data. The interface displays only the app name, platform, translated stages and categorized errors. It does not show raw Slack messages, internal IDs, email addresses, phone numbers, verification phone numbers, private logs or download links.

## Configuration

An app owner or administrator creates the tracking token in King of App. Paste it in **Public feed token** and treat it as a revocable private link. **Status API base** only identifies where to fetch JSON; it does not host the widget JavaScript.

The website widget is served from a separate static CDN. The API URL is used only to request sanitized status data. The module refreshes automatically every 10 seconds.

Revoke the link with the authenticated API operation. Creating a replacement token disables the old one.
