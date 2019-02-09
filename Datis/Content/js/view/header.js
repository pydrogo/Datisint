
Ext.define('bs.view.Header', {
    extend: 'Ext.container.AbstractContainer',
    alias: 'widget.topheader',
    region: 'north',
    layout: 'fit',
    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            cls: 'logo-item',
            height: 30,
            xtype: 'container',
            defaults: { 'xtype': 'component', 'cls': 'head_item' },
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                width: 5,
                xtype: 'container',
                layout: 'absolute'
            }, {
                width: 125,
                xtype: 'component'
            }, {
                width: 10,
                xtype: 'tbspacer'
            }, {
                html: '<div class="header-com">مدیریت داتیس</div>',
                margin: '6 0 0 0',
                xtype: 'component',
                flex: 1
            }, {
                text: username,
                itemId: 'userFeature',
                textAlign: 'left',
                cls: 'header-item',
                margin: '5 5 2 0',
                xtype: 'button',
                shadow: false,
                iconCls: 'icon-User',
                menu: {
                    xtype: 'menu',
                    items: [ {
                        iconCls: 'icon-UserKey',
                        text: 'تغییر رمز عبور',
                        handler: function () { window.location = "Account/Manage"; }
                    }, {
                        xtype: 'menuseparator'
                    }, {
                        text: 'خروج',
                        iconCls: 'icon-DoorOut',
                        handler: function () { window.location = "Account/LogOff"; }
                    }
                    ]
                },
                listeners: {
                    mouseout: function (item, e) {
                        this.addCls('header-item');
                    },
                    mouseover: function (item, e) {
                        this.removeCls('header-item');
                    }
                }
            }, {
                cls: 'header-item',
                margin: '5 5 2 0',
                xtype: 'button',
                iconCls: 'icon-Help',
                menu: {
                    xtype: 'menu',
                    items: [{
                        iconCls: 'icon-Help',
                        text: 'راهنما'
                    }, {
                        xtype: 'menuseparator'
                    }, {
                        iconCls: 'icon-Textfield',
                        text: 'درباره سیستم'
                    }]
                },
                listeners: {
                    mouseout: function (item, e) {
                        this.addCls('header-item');
                    },
                    mouseover: function (item, e) {
                        this.removeCls('header-item');
                    }
                }
            }, {

                margin: '5 5 2 0',
                width: 180,
                xtype: 'textfield',
                emptyText: 'جستجو',
                cls: 'x-hidden',
                enableKeyEvents: true,
                maskRe: /[^\!\@\$\%\^\&\*\(\)\_\-\+\"\â„–\;\%\:\?\*\(\)\[\]\;\:\'\<\>\,\.\/\?\\\|\`\~]/,
                iconCls: 'icon-Magnifier'
            }]
        }]
    }],
    constructor: function () {
        this.callParent(arguments);
    }
});