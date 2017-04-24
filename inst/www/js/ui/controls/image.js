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
          }),
          new TextProperty({
						uid: 'linkUrl',
						label : 'Link URL',
						defaultValue : '',
            helpText : 'The URL where you go if you click on the image; use #page to go to another page',
						isRequired: false
					}),
					new DropdownProperty({
              uid: 'linkUrlTarget',
              label: 'Link target',
              helpText: 'Should the link open in the current tab or a new tab.',
              isRequired: false,
              defaultOptionText: 'Current',
              availableOptions: [{
                  text: 'New',
                  value: 'new'
              }]
          })
				]
			});
		},
		render: function(options) {

			var template = _.template(tpl);
      options = options || {};

      return template({
          control: this,
          isDesignTime: options.isDesignTime || false
      });
		},
		initialiseViewerItems : function() {

			$('.grid-stack-item-content.rcap-controltype-image').click(function() {

        // if the user has specified that this image has a link associated with it,
        // skip the image stretcher functionality:
        if($(this).find('a').length) {
          return;
        }

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
