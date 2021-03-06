define(['rcap/js/ui/controls/gridControl', 'rcap/js/ui/properties/textProperty', 'rcap/js/ui/properties/dropdownProperty',
	'text!controlTemplates/image.tpl'], 
	function(GridControl, TextProperty, DropdownProperty, tpl) {
	
	'use strict';

	var ImageControl = GridControl.extend({
		init: function() {
			this._super({
				type : 'image',
				controlCategory: 'HTML',
				label : 'Image',
				icon: 'picture',
				controlProperties: [
					new TextProperty({
						uid: 'imagesource',
						label : 'Image source',
						defaultValue : '',
						helpText : 'The source of the image',
						isRequired: true
					}),
					new DropdownProperty({
                        uid: 'imageLayout',
                        label: 'Image style',
                        helpText: 'Whether the image should be tiled, stretched or placed as is.',
                        isRequired: true,
                        availableOptions: [{
                            text: 'Initial size',
                            value: 'background-repeat:no-repeat;'
                        }, {
                            text: 'Tiled along x axis',
                            value: 'background-repeat: repeat-x;'
                        }, {
                            text: 'Tiled along y axis',
                            value: 'background-repeat: repeat-y;'
                        }, {
                            text: 'Tiled',
                            value: 'background-repeat: repeat;'
                        }, {
                            text: 'Cover',
                            value: 'background-size: cover;'
                        }, {
                            text: 'Stretch',
                            value: 'background-size: 100% 100%'
                        }],
                        defaultValue: 'background-repeat:no-repeat;'
                    })
				]
			});
		},
		render: function() {

			var template = _.template(tpl);

            return template({
                control: this
            });
		},
		initialiseViewerItems : function() {

			$('.grid-stack-item-content.rcap-controltype-image').click(function() {
				$('#rcap-stretcher .js-rcap-dynamic').append($('<img />').attr('src', $(this).find('div').attr('data-imgsrc')));
				$('body').addClass('rcap-stretched');
				$('#rcap-stretcher').show();
				
				$('#rcap-stretcher img').resizable({ aspectRatio: true, maxHeight: $('#rcap-stretcher .js-rcap-dynamic').height() });
			});

			$('#rcap-stretcher .stretcher-close').click(function() {
				$('#rcap-stretcher .js-rcap-dynamic').empty();
				$('body').removeClass('rcap-stretched');
				$('#rcap-stretcher').hide();
			});

		}
	});

	return ImageControl;

});