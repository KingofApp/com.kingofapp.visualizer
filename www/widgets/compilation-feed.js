(function() {
  'use strict';
  var script = document.currentScript;
  if (!script) return;
  var token = script.getAttribute('data-token');
  var apiBase = (script.getAttribute('data-api') || 'https://api.kingofapp.com').replace(/\/$/, '');
  var locale = (script.getAttribute('data-locale') || navigator.language || 'en-US').toLowerCase().indexOf('es') === 0 ? 'es_ES' : 'en_US';
  var host = document.createElement('div');
  host.setAttribute('data-kingofapp-build-feed', '');
  script.parentNode.insertBefore(host, script.nextSibling);
  var root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
  var messages;
  var translationsUrl = new URL('./locale/' + locale + '.json', script.src).toString();
  var endpoint = apiBase + '/public/compilation-feed/status';

  var css = document.createElement('style');
  css.textContent = ':host{display:block;font:15px/1.5 Roboto,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#163c2c}*{box-sizing:border-box}.panel{max-width:620px;margin:0 auto;padding:20px 22px;background:#fff;border:1px solid #dce9e2;border-radius:14px}.head{display:flex;align-items:center;gap:10px}.mark{width:11px;height:11px;border-radius:50%;background:#11A07C;flex:0 0 auto}h2{margin:0;font-size:1.1rem;line-height:1.35;font-weight:650}.app{display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:8px;margin-top:22px}.app strong{overflow-wrap:anywhere}.app span,.updated,footer{color:#52665b;font-size:.84rem}.state{display:flex;align-items:center;gap:9px;margin:15px 0 0;font-weight:600}.dot{width:9px;height:9px;border-radius:50%;background:#11A07C;box-shadow:0 0 0 4px #e4f8ec}.failed .dot{background:#b42318;box-shadow:0 0 0 4px #fde8e7}.error{margin:13px 0 0;color:#8e211b;line-height:1.5}.updated{margin:15px 0 0;font-variant-numeric:tabular-nums}.timeline{margin-top:20px;border-top:1px solid #e8efeb;padding-top:14px}.timeline h3{margin:0 0 8px;color:#52665b;font-size:.88rem;font-weight:600}.timeline ol{list-style:none;margin:0;padding:0}.timeline li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:3px 12px;padding:8px 0;border-bottom:1px solid #eef3f0;font-size:.88rem}.timeline time{color:#52665b;font-size:.8rem}.timeline small{grid-column:1/-1;color:#8e211b;line-height:1.4}footer{margin-top:17px;padding-top:12px;border-top:1px solid #e8efeb}@media(max-width:420px){.panel{padding:17px}}';
  root.appendChild(css);

  function render(data, error) {
    while (root.lastChild && root.lastChild !== css) root.removeChild(root.lastChild);
    if (!messages) return;
    var panel = document.createElement('section');
    panel.className = 'panel';
    panel.setAttribute('aria-live', 'polite');
    panel.setAttribute('aria-atomic', 'true');
    var head = document.createElement('header');
    head.className = 'head';
    var mark = document.createElement('span');
    mark.className = 'mark';
    mark.setAttribute('aria-hidden', 'true');
    var title = document.createElement('h2');
    title.textContent = messages.title;
    head.appendChild(mark);
    head.appendChild(title);
    panel.appendChild(head);

    if (error) {
      var fail = document.createElement('p');
      fail.className = 'error';
      fail.textContent = messages.unavailable;
      panel.appendChild(fail);
    } else if (!data || !data.status) {
      var idle = document.createElement('p');
      idle.textContent = messages.idle;
      panel.appendChild(idle);
    } else {
      var app = document.createElement('div');
      app.className = 'app';
      var name = document.createElement('strong');
      name.textContent = data.appName || messages.platform.other;
      var platform = document.createElement('span');
      platform.textContent = messages.platform[data.platform] || messages.platform.other;
      app.appendChild(name);
      app.appendChild(platform);
      panel.appendChild(app);
      var state = document.createElement('p');
      state.className = 'state' + (data.status === 'failed' ? ' failed' : '');
      var dot = document.createElement('i');
      dot.className = 'dot';
      dot.setAttribute('aria-hidden', 'true');
      var label = document.createElement('span');
      label.textContent = messages.status[data.status] || messages.status.in_progress;
      state.appendChild(dot);
      state.appendChild(label);
      panel.appendChild(state);
      if (data.error && messages.error[data.error]) {
        var safeError = document.createElement('p');
        safeError.className = 'error';
        safeError.textContent = messages.error[data.error];
        panel.appendChild(safeError);
      }
      if (Array.isArray(data.events) && data.events.length) {
        var timeline = document.createElement('section');
        timeline.className = 'timeline';
        var timelineTitle = document.createElement('h3');
        timelineTitle.textContent = messages.eventsTitle;
        timeline.appendChild(timelineTitle);
        var list = document.createElement('ol');
        data.events.slice(-10).forEach(function(event) {
          var item = document.createElement('li');
          var eventLabel = document.createElement('span');
          eventLabel.textContent = messages.status[event.status] || messages.status.in_progress;
          item.appendChild(eventLabel);
          if (event.updatedAt) {
            var time = document.createElement('time');
            time.textContent = new Date(event.updatedAt).toLocaleTimeString(locale === 'es_ES' ? 'es-ES' : 'en-US', { hour: '2-digit', minute: '2-digit' });
            item.appendChild(time);
          }
          if (event.error && messages.error[event.error]) {
            var eventError = document.createElement('small');
            eventError.textContent = messages.error[event.error];
            item.appendChild(eventError);
          }
          list.appendChild(item);
        });
        timeline.appendChild(list);
        panel.appendChild(timeline);
      }
      if (data.updatedAt) {
        var updated = document.createElement('p');
        updated.className = 'updated';
        updated.textContent = messages.updated + ' · ' + new Date(data.updatedAt).toLocaleString(locale === 'es_ES' ? 'es-ES' : 'en-US');
        panel.appendChild(updated);
      }
    }
    var footer = document.createElement('footer');
    footer.textContent = messages.live;
    panel.appendChild(footer);
    root.appendChild(panel);
  }

  function refresh() {
    if (!token) return render(null, true);
    fetch(endpoint, { cache: 'no-store', credentials: 'omit', headers: { 'X-Compilation-Feed-Token': token } })
      .then(function(response) { if (!response.ok) throw new Error('unavailable'); return response.json(); })
      .then(function(data) { render(data, false); })
      .catch(function() { render(null, true); });
  }

  fetch(translationsUrl, { cache: 'force-cache', credentials: 'omit' })
    .then(function(response) { if (!response.ok) throw new Error('locale'); return response.json(); })
    .then(function(data) { messages = data; refresh(); window.setInterval(refresh, 10000); })
    .catch(function() { host.setAttribute('aria-hidden', 'true'); });
}());
