
Ext.application({
    name: 'prada',
    appFolder: 'content/js',
    paths: {
        'Ext': 'content/extjs'
    },
    
    launch: function () {
        Ext.require('prada.page.views.Wellcome');
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            rtl: true,
            items: [{ xtype: 'topheader' }, { xtype: 'rightpanel' }, {
                xtype: 'contentpanel'
            }]
        });
      
        // Map multiple keys to multiple actions.
        //var map = new Ext.util.KeyMap({
        //    target:Ext.getBody(),
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