define(['rcap/js/ui/controls/gridControl',
    'rcap/js/ui/properties/dropdownProperty',
    'rcap/js/ui/properties/colorProperty',
    'pubsub',
    'site/pubSubTable',
    'rcap/js/utils/pageWalker'
], function(GridControl, DropdownProperty, ColorProperty, PubSub, pubSubTable, PageWalker) {

    'use strict';

    var accordionToggle = function(toggler) {
        toggler.parent().siblings('div').toggle();
        // looks strange, but it'll be toggled on the following line:
        toggler.attr('title', toggler.hasClass('expanded') ? 'Expand' : 'Collapse');
        toggler.toggleClass('expanded');
        toggler.toggleClass('collapsed');
    };

    var renderControl = function(control, publishEvent) {

        // publish the required event if required; if render method has been called
        // directly, let its caller handle the returned markup, otherwise fire the 
        // event:
        if (publishEvent) {
            control.isDirty = false;
            PubSub.publish(pubSubTable.updateControl, control);
        } else {

            var buildTree = function(menuType, pages) {
            
                var addMenuItem = function(rootTemplate, page, markup) {
                    if(page.parentId) {
                        // this is a child page
                        var parentPage = rootTemplate.find('a[data-pageid="' + page.parentId + '"]').parent(); // li

                        if(parentPage.find('ul').length === 0) {
                            parentPage.append('<ul>');
                        }

                        parentPage.find('ul').append(markup);

                    } else {
                        rootTemplate.find('> ul').append(markup);
                    }

                    return rootTemplate;
                };

                var templates = {
                    'root' : {
                        'hamburger' : '<nav class="hamburger hamburger-valign-' + control.controlProperties[1].value + '"><button>Toggle</button><div></div></nav>',
                        'accordion' : '<nav class="accordion accordion-valign-' + control.controlProperties[1].value + '"><button>Toggle</button><div></div></nav>',
                        'horizontal' : '<nav class="horizontal horizontal-' + control.controlProperties[2].value + '"><ul></ul></nav>',
                        'vertical': '<nav class="vertical vertical-' + control.controlProperties[2].value + '"><ul></ul></nav>',
                    },
                    'item': {
                        'hamburger' : '<div data-pageid="<%=p.id%>"><a style="padding-left:<%=((p.depth - 1) * 20) + 15%>px" href="javascript:void(0)" data-ishamburger="true" <%if(currentPageID === p.id) {%>class="current"<%}%> data-pageid="<%=p.id%>" data-href="<%=p.navigationTitle%>"><%=p.navigationTitle%></a></div>',
                        'accordion' : '<div data-pageid="<%=p.id%>"><a style="padding-left:<%=((p.depth - 1) * 20) + 15%>px" href="javascript:void(0)" data-isaccordion="true" <%if(currentPageID === p.id) {%>class="current"<%}%> data-pageid="<%=p.id%>" data-href="<%=p.navigationTitle%>"><%=p.navigationTitle%></a></div>',
                        'horizontal' : '<li><a href="javascript:void(0)" <%if(currentPageID === p.id) {%>class="current"<%}%> data-pageid="<%=p.id%>" data-href="<%=p.navigationTitle%>"><%=p.navigationTitle%></a></li>',
                        'vertical' : '<li><a href="javascript:void(0)" <%if(currentPageID === p.id) {%>class="current"<%}%> data-pageid="<%=p.id%>" data-href="<%=p.navigationTitle%>"><%=p.navigationTitle%></a></li>'
                    },
                    'addItem': {
                        'hamburger' : function(rootTemplate, page, markup) { 
                            if(page.parentId) {
                                // this is a child page
                                rootTemplate.find('div[data-pageid="' + page.parentId + '"]').append(markup);
                            } else {
                                rootTemplate.find('> div').append(markup);
                            }

                            return rootTemplate;
                        },
                        'accordion' : function(rootTemplate, page, markup) { 
                            if(page.parentId) {
                                // this is a child page, so hide by default:
                                var parent = rootTemplate.find('div[data-pageid="' + page.parentId + '"]');
                                markup = $(markup).hide();
                                parent.append(markup);

                                var rootAnchor = parent.find('a:eq(0)');

                                if(!rootAnchor.hasClass('has-children')) {
                                    rootAnchor.addClass('has-children');   
                                    rootAnchor.append('<span title="Expand" class="toggler collapsed">Expand</span>'); 
                                }
                                
                            } else {
                                rootTemplate.find('> div').append(markup);
                            }

                            return rootTemplate;
                        },
                        'horizontal' : function(rootTemplate, page, markup) { return addMenuItem(rootTemplate, page, markup); },
                        'vertical' : function(rootTemplate, page, markup) { return addMenuItem(rootTemplate, page, markup); }
                    }
                };

                var template = $(templates.root[menuType]);

                _.each(pages, function(page) {
                    var itemTemplate = _.template(templates.item[menuType]);
                    var markup = itemTemplate({
                        p: page,
                        currentPageID: control.currentPageID
                    });

                    if (page.isEnabled) {
                        template = templates.addItem[menuType](template, page, markup);
                    }
                });

                // expand for accordion:
                if(menuType === 'accordion') {
                    if(control.currentPageID) {
                        var ancestors = new PageWalker(control.pages).getAncestorsAndSelf(control.currentPageID);
                        ancestors.pop();

                        for(var loop = 0; loop < ancestors.length; loop++) {
                            accordionToggle(template.find('div[data-pageid="' + ancestors[loop].id + '"] > a > .toggler'));
                        }
                    }
                }

                return template[0].outerHTML;
            };

            return buildTree(control.controlProperties[0].value, control.pages);

        }
    };

    var PageMenuControl = GridControl.extend({
        init: function() {
            this._super({
                type: 'pagemenu',
                controlCategory: 'Navigation',
                label: 'Page Menu',
                icon: 'reorder',
                controlProperties: [
                    new DropdownProperty({
                        uid: 'menustyle',
                        label: 'Menu Style',
                        helpText: 'The visual style of the menu',
                        isRequired: true,
                        availableOptions: [{
                            text: 'Mobile Style',
                            value: 'hamburger'
                        }, {
                            text: 'Accordion',
                            value: 'accordion'
                        }, {
                            text: 'Horizontal',
                            value: 'horizontal'
                        }, {
                            text: 'Vertical',
                            value: 'vertical'
                        }],
                        value: 'hamburger'
                    }),
                    new DropdownProperty({
                        uid: 'verticalalignment',
                        label: 'Vertical Alignment',
                        isRequired: true,
                        availableOptions: [{
                            text: 'Top',
                            value: 'top'
                        }, {
                            text: 'Middle',
                            value: 'middle'
                        }, {
                            text: 'Bottom',
                            value: 'bottom'
                        }],
                        value: 'middle'
                    }),
                    new DropdownProperty({
                        uid: 'horizontalalignment',
                        label: 'Horizontal Alignment',
                        isRequired: true,
                        availableOptions: [{
                            text: 'Left',
                            value: 'left'
                        }, {
                            text: 'Center',
                            value: 'center'
                        }, {
                            text: 'Right',
                            value: 'right'
                        }],
                        value: 'center'
                    })
                ]
            });

            // this will be manipulated by various event subscriptions
            this.pages = [];
            this.currentPageID = undefined;

            var me = this;

            //////////////////////////////////////////////////////////////////////////////////
            //
            //  viewer event
            //
            PubSub.subscribe(pubSubTable.changeSelectedPage, function(msg, page) {

                if (me.isOnGrid) {
                    me.currentPageID = page.id;
                    renderControl(me, true);
                }

            });

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            // viewer/designer event:
            //
            PubSub.subscribe(pubSubTable.initSite, function(msg, site) {

                if (me.isOnGrid) {
                    me.pages = site.pages;
                    me.currentPageID = site.currentPageID;

                    renderControl(me, true);
                }
            });

            //////////////////////////////////////////////////////////////////////////////////
            //
            //  designer events
            //

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            //
            //
            PubSub.subscribe(pubSubTable.pageAdded, function(/*msg, msgData*/) {

                if (me.isOnGrid) {
                    renderControl(me, true);
                }
            });

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            //
            //
            PubSub.subscribe(pubSubTable.updatePage, function(msg, pageObj) {

                if (me.isOnGrid) {

                    // update the page's details:
                    var page = _.findWhere(me.pages, { id : pageObj.id });

                    page.navigationTitle = pageObj.navigationTitle;
                    page.isEnabled = pageObj.isEnabled;

                    me.currentPageID = pageObj.id;

                    renderControl(me, true);
                }

            });

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            //
            //
            PubSub.subscribe(pubSubTable.deletePageConfirm, function(msg, pageId) {

                if (me.isOnGrid) {

                    me.pages = new PageWalker(me.pages).removePage(pageId);

                    me.currentPageID = me.pages.length > 0 ? me.pages[0].id : '';

                    renderControl(me, true);
                }
            });

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            //
            //
            PubSub.subscribe(pubSubTable.pagesChanged, function(msg, pagesInfo) {

                if (me.isOnGrid) {

                    // verify that the pages' order has actually changed:
                    if (_.pluck(me.pages, 'id').join() !== _.pluck(pagesInfo.pages, 'id').join()) {
                        me.pages = pagesInfo.pages;
                        me.currentPageID = me.pages.length > 0 ? me.pages[0].id : '';
                        renderControl(me, true);
                    }
                }
            });

            //////////////////////////////////////////////////////////////////////////////////////////
            //
            //
            //
            PubSub.subscribe(pubSubTable.gridItemAddedInit, function(msg, initInfo) {

                // ensure this is only picked up by the specific control
                // in the initInfo parameter:
                if (me.isOnGrid && me.id === initInfo.controlID) {
                    // this should only be published if it is on a grid, but be cautious nonetheless:
                    me.pages = initInfo.site.pages;
                    me.currentPageID = me.pages.length > 0 ? me.pages[0].id : '';

                    // and render:
                    renderControl(me, true);
                }

            });

        },
        render: function() {

            // don't publish an update event since this is being called directly:
            return renderControl(this, false);

        },
        initialiseViewerItems: function() {

            $('.hamburger, .accordion, .rcap-pagemenu, nav.horizontal, nav.vertical').closest('.grid-stack-item').css('z-index', '1');

            $('nav.horizontal').closest('.grid-stack-item-content').css({
                'overflow-x': 'visible',
                'overflow-y': 'visible'
            });

            $('#rcap-viewer').on('click', '.rcap-pagemenu a, .hamburger a, nav.accordion a, nav.horizontal a, nav.vertical a', function() {
                // get the nav title:
                location.hash = $(this).data('href');
                PubSub.publish(pubSubTable.changeSelectedPageByTitle, $(this).data('href'));

                if ($(this).attr('data-ishamburger') === 'true' || $(this).attr('data-isaccordion') === 'true') {
                    $(this).toggleClass('expanded').siblings('div').toggle();
                    $(this).parent().toggleClass('expanded');
                }
            });

            $('#rcap-viewer').on('click', '.hamburger button, .accordion button', function() {
                $(this).toggleClass('expanded').siblings('div').toggle();
                $(this).parent().toggleClass('expanded');

                $(this).closest('.grid-stack-item-content').css({
                    'overflow-x': 'visible',
                    'overflow-y': 'visible'
                });
            });

            // accordion events:
            $('#rcap-viewer').on('click', '.accordion .toggler', function(e) {
                accordionToggle($(this));
                e.stopPropagation();
            });
        },
    });

    return PageMenuControl;

});
