((function() {

    requirejs.config({
        paths: {
            'rcap': '../../shared.R/rcloud.rcap',
            'site': '../../shared.R/rcloud.rcap/js/site',
            'pages': '../../shared.R/rcloud.rcap/js/pages',
            'controls': '../../shared.R/rcloud.rcap/js/ui/controls',
            'templates': '../../shared.R/rcloud.rcap/js/ui/controls/properties/templates',
            'controlTemplates': '../../shared.R/rcloud.rcap/js/ui/controls/templates',
            'pubsub': '../../shared.R/rcloud.rcap/bower_components/pubsub-js/src/pubsub',
            'parsley': '../../shared.R/rcloud.rcap/bower_components/parsleyjs/dist/parsley.min',
            'spectrum': '../../shared.R/rcloud.rcap/bower_components/spectrum',
            'wysiwyg': '../../shared.R/rcloud.rcap/bower_components/wysiwyg.js/dist'
        },
        map: {
            '*': {
                'css': 'rcap/bower_components/require-css/css',
                'text': 'rcap/bower_components/requirejs-text/text',
                'json': 'rcap/bower_components/requirejs-plugins/src/json',
                'font': 'rcap/bower_components/requirejs-plugins/src/font',
                'propertyParser': 'rcap/bower_components/requirejs-plugins/src/propertyParser'
            }
        }
    });

    return {
        init: function(ocaps, k) {

            RCloud.UI.advanced_menu.add({ // jshint ignore:line
                rcapDesigner: {
                    sort: 10000,
                    text: 'RCAP Designer',
                    modes: ['edit'],
                    action: function() {
                        require(['rcap/js/designer'], function(Designer) {
                            new Designer().initialise();
                        });
                    }
                }
            });

            // this is a temporary menu item:
            RCloud.UI.advanced_menu.add({ // jshint ignore:line
                rcapViewer: {
                    sort: 11000,
                    text: 'RCAP Viewer',
                    modes: ['edit'],
                    action: function() {

                        function getParameterByName(name) {
                            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                                results = regex.exec(location.search);
                            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                        }

                        window.open('/shared.R/rcloud.rcap/standaloneviewer.htm?notebook=' + getParameterByName('notebook'));
                    }
                }
            });

            k();

        },

        initViewer: function(content, k) {
            require(['rcap/js/viewer'], function(viewer) {
                viewer.initialise(content);
                k();
            });
        }
    };

})());
