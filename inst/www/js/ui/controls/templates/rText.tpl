<% if(control.getPropertyValue('linkUrl')) { %>
  <a href="<%=control.getPropertyValue('linkUrl')%>" <%= control.getPropertyValue('linkUrlTarget') === 'new' ? ' target="_blank"' : '' %> class="full">
<% } %>

<div id="<%=control.id%>" class="rtext" data-controltype="rtext">Please wait while the content is loaded...</div>

<% if(control.getPropertyValue('linkUrl')) { %>
  </a>
<% } %>
