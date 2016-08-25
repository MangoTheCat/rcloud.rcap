define(['rcap/js/ui/controls/gridControl',
    'rcap/js/ui/controls/properties/textControlProperty',
    'rcap/js/ui/controls/properties/autocompleteControlProperty',
    'text!controlTemplates/actionButton.tpl'
], function(GridControl, TextControlProperty, AutocompleteControlProperty, tpl) {

    'use strict';

    var RPlotControl = GridControl.extend({
        init: function() {
            this._super({
                type: 'actionbutton',
                controlCategory: 'Dynamic',
                label: 'Action Button',
                icon: 'exclamation-sign',
                initialSize: [2, 2],
                controlProperties: [
                    new AutocompleteControlProperty({
                        uid: 'code',
                        label: 'R Function',
                        helpText: 'R Function for this control.',
                        isRequired: true
                    }),
                    new TextControlProperty({
                        uid: 'buttonText',
                        label : 'Button Text',
                        defaultValue : '',
                        helpText : 'Button Text',
                        isRequired: true,
                        isHorizontal: false
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
        initialiseViewerItems: function() {
 
        }
    });

    return RPlotControl;


});
