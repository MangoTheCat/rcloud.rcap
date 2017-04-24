define(['rcap/js/ui/controls/gridControl',
    'rcap/js/ui/properties/textProperty',
    'rcap/js/ui/properties/autocompleteProperty',
    'rcap/js/ui/properties/dropdownProperty',
    'text!controlTemplates/rText.tpl',
    'text!controlTemplates/rText-design.tpl'
], function(GridControl, TextProperty, AutocompleteProperty, DropdownProperty, tpl, dtpl) {

    'use strict';

    var RTextControl = GridControl.extend({
        init: function() {
            this._super({
                type: 'rtext',
                controlCategory: 'Dynamic',
                label: 'R Text',
                icon: 'edit',
                controlProperties: [
                    new AutocompleteProperty({
                        uid: 'code',
                        label: 'R Function',
                        helpText: 'R Function for this control.',
                        isRequired: true
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

            options = options || {};
            var isDesignTime = options.isDesignTime || false;
            var designTimeDescription = '';

            if(isDesignTime && this.controlProperties[0].value) {
                designTimeDescription += 'Function: ' + this.controlProperties[0].value;
            }

            var template = isDesignTime ? _.template(dtpl) : _.template(tpl);

            return template({
                control: this,
                designTimeDescription : designTimeDescription
            });

        },
        initialiseViewerItems: function() {

        },
        updateData : function(controlId, data) {
            $('#' + controlId).html(data);

        }
    });

    return RTextControl;


});
