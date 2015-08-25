define(['rcap/js/ui/controls/properties/baseControlProperty', 
	'text!templates/wysiwyg.tpl', 
	'wysiwyg/standalone'
	], function(BaseControlProperty, tpl) {
	'use strict';

	var WysiwygControlProperty = BaseControlProperty.extend({
		init: function(options) {
			options = options || {};
			this._super({
				type : 'wysiwyg',
				label : options.label || '',
				helpText : options.helpText || '',
				defaultValue : options.defaultValue || '',
				isRequired : options.isRequired || false,
				value : options.value || '',
				uid : options.uid,
				className : options.className
			});

			// additional assignments go here:
		},
		render: function(childIndex) {

			var template = _.template(tpl);
            
            return template({
            	property : this,
            	childIndex : childIndex
            });

		},
		getDialogValue : function() {
			return $('#' + this.id).wysiwyg('shell').getHTML();
		}
	});

	return WysiwygControlProperty;

});