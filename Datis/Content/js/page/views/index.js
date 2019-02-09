var store = Ext.create('Ext.data.TreeStore', {
    root: {
        expanded: true,
        children: [{
            text: "مدیریت دسته بندی ها",
            itemId: 'Category',
            leaf: true
        }, {
            text: "مدیریت برند ها",
            itemId: 'Brand',
            leaf: true
        }, {
            text: "مدیریت محصولات",
            itemId: 'Product',
            leaf: true
        }, {
            text: "مدیریت کاربران",
            itemId: 'User',
            leaf: true
        }, {
            text: "مدیریت ساختار سازمانی",
            itemId: 'Admin',
            leaf: true
        }, {
            text: "مدیریت اطلاعات پایه",
            itemId: 'BasicInfo',
            leaf: true
        }, {
            text: "مدیریت فاکتورها",
            itemId: 'Factor',
            leaf: true
        }, {
            text: "مدیریت انبار",
            itemId: 'Store',
            leaf: true
        }, {
            text: "گزارش ها",
            itemId: 'Report',
            expanded: true,
            children: [{
                text: "سفارشات",
                itemId: 'FactorReport',
                leaf: true
            }, {
                text: "موجوی انبار",
                itemId: 'StoreReport',
                leaf: true
            }, {
                text: "پرداخت ها",
                itemId: 'PayReport',
                leaf: true
            }, {
                text: "دریافت ها",
                itemId: 'GetReport',
                leaf: true
            }, {
                text: "سود",
                itemId: 'ProfitReport',
                leaf: true
            }]
        }]
    }
});

Ext.application({
    name: 'sc',
    appFolder: 'content/js',
    paths: {
        'Ext': 'content/extjs',
        'Chart': 'content/highcharts/sencha/Chart'
    },

    launch: function () {
        //Line : 29136, 130580 for Debug
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider({
            prefix: '',
            expires: new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 30)), //30 days from now
        }));

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            rtl: true,
            cls: 'header-bg',
            items: [{
                title: 'مدیریت بهار شاپ',
                layout: 'border',
                items: [{
                    region: 'west',
                    collapsible: true,
                    splitButton: true,
                    title: 'بخش ها',
                    xtype: 'treepanel',
                    titleCollapse: true,
                    width: 200,
                    height: '100%',
                    store: store,
                    rootVisible: false,
                    listeners: {
                        itemclick: function (grd, record, item, index, e, eOpts) {
                            if (Ext.get('pageFrame') != null) {
                                document.getElementById('pageFrame').src = 'Admin/' + record.raw.itemId;
                            }
                        }
                    }
                }, {
                    border: false,
                    layout: 'fit',
                    region: 'center',
                    html: '<iframe id="pageFrame" src="Admin/Default/Welcome" border="0" style="width:100%; height:100%; border:false;" ></iframe>'
                }]
            }]
        });

        // Map multiple keys to multiple actions.
        //var map = new Ext.util.KeyMap({
        //    target: Ext.getBody(),
        //    binding: [{
        //        key: Ext.EventObject.F2,
        //        fn: function () {
        //            var tree = Ext.ComponentQuery.query('rightpanel treepanel[itemId=apiPanel]')[0];
        //            var node = tree.getRootNode().findChildBy(function (node) {
        //                if (node.data.cls != 'x-hidden')
        //                    return true;
        //            });
        //            node = node.findChildBy(function (node) {
        //                if (node.data.cls != 'x-hidden')
        //                    return true;
        //            });
        //            node.bubble(function (node) {
        //                node.expand();
        //            });
        //            tree.getSelectionModel().select(node);
        //        }
        //    }, {
        //        key: Ext.EventObject.F2,
        //        ctrl: true,
        //        shift: true,
        //        fn: function () {
        //            var btn = Ext.ComponentQuery.query('topheader button[itemId=systemModule]')[0];
        //            btn.showMenu();
        //            btn.menu.keyNav.focusNextItem(1);
        //        }
        //    }, {
        //        key: Ext.EventObject.F5,
        //        ctrl: true,
        //        shift: true,
        //        fn: function () {
        //            var cPanel = Ext.ComponentQuery.query('contentpanel')[0];
        //            var tab = cPanel.getActiveTab();
        //            if (tab.xtype == 'sugargrid')
        //                tab.store.reload();
        //        }
        //    }, {
        //        key: Ext.EventObject.F12,
        //        ctrl: true,
        //        shift: true,
        //        fn: function () {
        //            var item = Ext.ComponentQuery.query('topheader button[itemId=userFeature] menu menuitem[iconCls=icon-DoorOut]')[0];
        //            item.handler();
        //        }
        //    }]
        //});

        return true;
    }
});
//Ext.create('Ext.container.Viewport', {
//    layout: 'border',
//    title: 'مدیریت بهار شاپ',
//    rtl: true,
//    layout: 'border',
//    items: [{
//        region: 'west',
//        collapsible: true,
//        splitButton: true,
//        title: 'بخش ها',
//        xtype: 'treepanel',
//        width: 200,
//        height: '100%',
//        store: store,
//        rootVisible: false
//    }, {
//        border: false,
//        layout: 'fit',
//        region: 'center',
//        html: '<iframe src="test.html" style="width:100%; height:100%; border:false;" ></iframe>'
//    }]
//});