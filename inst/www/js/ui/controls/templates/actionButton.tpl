<button id="<%=control.id%>" class="btn btn-primary" data-code="<%=control.controlProperties[0].value%>"><%=control.controlProperties[1].value%></button>

<script type="text/javascript">

	$('#<%=control.id%>').click(function() {
		var codeToCall = $(this).data('code');
		RCAP.callFunction(codeToCall);
	}); 

</script>