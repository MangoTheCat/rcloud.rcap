<% if(control.getPropertyValue('linkUrl')) { %>
  <a href="<%=control.getPropertyValue('linkUrl')%>" <%= control.getPropertyValue('linkUrlTarget') === 'new' ? ' target="_blank"' : '' %>>
<% } %>

<% if(isDesignTime && control.getPropertyValue('linkUrl')) { %>
  <div class="link-details">
    <i class="icon-link" title="<%=control.getPropertyValue('linkUrl')%>" /><span><%=control.getPropertyValue('linkUrl')%></span>
  </div>
<% } %>

<div data-imgsrc="<%=control.getPropertyValue('imagesource')%>"
     style="background-image:url(<%=control.getPropertyValue('imagesource')%>);width:100%;height:100%;<%=control.getPropertyValue('imageLayout')%>">
</div>

<% if(control.getPropertyValue('linkUrl')) { %>
  </a>
<% } %>
