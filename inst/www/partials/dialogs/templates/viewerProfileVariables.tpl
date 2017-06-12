
<% if(hasStaleItem) { %>
  <% _.each(profileDataItems, function(o, i){ %>
    <% if(o.staleValues.length) { %>
      <h4>
      Your saved selection (<% _.each(o.staleValues, function(staleValue) { %>
        <span class="stale"><%=staleValue%></span>
      <% }); %>) for variable <%=o.name%> <%= (o.allStale) ? ' has no valid values.' : ' has some values that are no longer valid.' %>
      </h4>
    <% } %>
  <% }); %>
<% } %>

<table>
  <thead>
    <tr>
      <td>Variable</td>
      <td>Selection method</td>
      <td>Values</td>
    </tr>
  </thead>
  <tbody>
    <% _.each(profileDataItems, function(o, i){ %>
      <tr data-variablename="<%=o.name%>" data-id="<%=o.id%>" data-valuehash="<%=o.valueHash%>">
        <td><%=o.description%></td>
        <td class="selection-method">
          <select id="<%=o.id%>">
            <option value="all"<%= o.all ? ' selected="selected"' : ''%>>All values</option>
            <option value="selected"<%= !o.all ? ' selected="selected"' : ''%>>Selection</option>
          </select>
        </td>
        <td class="values">
          <div data-selectionmethod="all" <%= !o.all ? ' style="display:none"' : ''%>">All</div>
          <div data-selectionmethod="selected" <%= o.all ? ' style="display:none"' : ''%>>
            <select data-parsley-variablevalidator="#<%=o.id%>" required multiple="multiple"<%= _.findWhere(o.options, { selected: true }).length === 0 ? ' style="display:none"' : ''%>>
              <% _.each(o.options, function(option, i) { %>
                <option value="<%=option.value%>" <%= option.selected ? ' selected="selected"' : ''%>><%=option.value%></option>
              <% }); %>
            </select>
          </div>
          <div class="errors" />
        </td>
      </tr>
    <% }); %>
  </tbody>
</table>
