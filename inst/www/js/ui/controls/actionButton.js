define(['rcap/js/ui/controls/gridControl',
    'rcap/js/ui/controls/properties/textControlProperty',
    'text!controlTemplates/actionButton.tpl'
], function(GridControl, TextControlProperty, tpl) {

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
                    new TextControlProperty({
                        uid: 'variable',
                        label: 'Variable',
                        helpText: 'The variable associated with this control',
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
