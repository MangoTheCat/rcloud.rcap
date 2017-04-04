define(['rcap/js/ui/properties/baseProperty', 
	'text!templates/wysiwyg.tpl', 
	'wysiwyg/standalone'
	], function(BaseProperty, tpl) {
	'use strict';

	var WysiwygProperty = BaseProperty.extend({
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

			// replace stuff:
			this.value = this.value.replace(/'/g, '\\\'');
			this.value = this.value.replace(/"/g, '\"');
            
            return template({
            	property : this,
            	childIndex : childIndex
            });

		},
		getDialogValue : function() {
			return $('#' + this.id).wysiwyg('shell').getHTML();
		}
	});

	return WysiwygProperty;

});