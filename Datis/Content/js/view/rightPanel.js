Ext.define('datis.store.MainTree',
{
    extend: 'Ext.data.TreeStore',
    storeId: 'MainTreeStore',
    rootVisible: true,
    root: {
        checked: false,
        expanded: true,
        text: 'سامانه فروشندگان تجهیزات و خدمات'
    },
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'Admin/TreeMenuItems'
    },
    autoLoad: true
});
Ext.define('bs.view.RightPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightpanel',
    region: 'west',
    border: false,
    width: 250,
    margins: '30 0 5 3',
    split: true,
    title: 'منوی راهبری',
    layout: 'border',
    //bodyStyle: 'background:none repeat scroll 0 0 transparent !important;',
    bodyBorder: 0,
    collapseMode: 'mini',
    collapsible: true,
    header: false,
    items: [{
        itemId: 'apiPanel',
        xtype: 'treepanel',
        cls: 'api-panel',
        region: 'center',
        flex: 3,
        bodyStyle: 'background:none repeat scroll 0 0 transparent !important;border:0 none !important;',
        collapseFirst: false,
        lines: false,
        rootVisible: false,
        useArrows: true,
        store: 'MainTreeStore',
        viewConfig: {
            /*copy: true,
            plugins: {
                ptype: 'treeviewdragdrop',
                enableDrag: true,
                enableDrop: false
            }*/
        },
        //root: {
        //    expanded: true,
        //    text: 'ریشه',
        //    children: [
        //        //{
        //        //iconCls: 'icon-Dashboard',
        //        //text: 'داشبرد',
        //        //viewPath: 'bs.page.views.Dashboard',
        //        //leaf: true
        //        //},
        //    {
        //        iconCls: 'icon-GroupGear',
        //        text: 'مدیریت کاربران',
        //        viewPath: 'prada.page.views.Users',
        //        leaf: true
        //    }, {
        //        iconCls: 'icon-Store',
        //        text: 'ورود اطلاعات',
        //        leaf: false,
        //        expanded: true,
        //        children: [{
        //            iconCls: 'icon-Category',
        //            text: 'Brand',
        //            viewPath: 'prada.page.views.Brand',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-Category',
        //            text: 'Category',
        //            viewPath: 'prada.page.views.Category',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-Category',
        //            text: 'Feature',
        //            viewPath: 'prada.page.views.Feature',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-Category',
        //            text: 'Product',
        //            viewPath: 'prada.page.views.Product',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-Category',
        //            text: 'Copy Features',
        //            viewPath: 'prada.page.views.CopyFeatures',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'مدیریت عکس ها',
        //            url: 'FileManager/Default.aspx',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'درباره داتیس',
        //            viewPath: 'prada.page.views.DarbareDatis',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'تماس با ما',
        //            viewPath: 'prada.page.views.TamasBaMa',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'پیام های مدیریت',
        //            viewPath: 'prada.page.views.ContactManager',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'شرایط گارانتی',
        //            viewPath: 'prada.page.views.TermsOfGarranty',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'ارجاع کالا',
        //            viewPath: 'prada.page.views.ReturnProduct',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'درخواست های تعمیر یا ارجاع کالا',
        //            viewPath: 'prada.page.views.Repair',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'درخواست های همکاری',
        //            viewPath: 'prada.page.views.Career',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'درخواست های نمایندگی',
        //            viewPath: 'prada.page.views.Agancy',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'پروژه های انجام شده',
        //            viewPath: 'prada.page.views.Projects',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'پرسشهای متداول',
        //            viewPath: 'prada.page.views.Faq',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'راه حل های داتیس',
        //            viewPath: 'prada.page.views.Solution',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'مقالات',
        //            viewPath: 'prada.page.views.Article',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'بروشور',
        //            viewPath: 'prada.page.views.Brochure',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'نرم افزارهای کاربردی',
        //            viewPath: 'prada.page.views.Application',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'شماره سریال های ثبت شده',
        //            viewPath: 'prada.page.views.SerialNumber',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'مدیریت اخبار',
        //            viewPath: 'prada.page.views.News',
        //            leaf: true
        //        }, {
        //            iconCls: 'icon-NoteEdit',
        //            text: 'مدیریت تکنولوژیها',
        //            viewPath: 'prada.page.views.Technology',
        //            leaf: true
        //        }]
        //    }]
        //},
        listeners: {
            cellkeydown: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                if (e.keyCode == Ext.EventObject.ENTER)
                    this.ownerCt.onItemClick(record);
            },
            itemclick: function (item, record, node, index, e) {
                if (record.data.leaf == true)
                    this.ownerCt.onItemClick(record);
            }
        }
    }],
    onItemClick: function (record) {
        if (record.data.leaf == true) {
            var cPanel = this.up('viewport').down('contentpanel');
            cPanel.removeAll(true);
            var tab;
            if (record.raw.url) {
                tab = cPanel.add(Ext.create('Ext.panel.Panel', {
                    title: record.data.text,
                    iconCls: record.data.iconCls,
                    layout: 'fit',
                    contentEl: Ext.DomHelper.createDom({
                        tag: 'iframe',
                        region: 'center',
                        width: '100%',
                        height: '100%',
                        frameborder: '0',
                        src: record.raw.url
                    })
                }));
            } else if (record.raw.viewPath) {
                tab = cPanel.add(Ext.create(record.raw.viewPath, Ext.apply({
                    iconCls: record.data.iconCls
                }, record.raw.params)));
            } else {
                var tab = cPanel.add(Ext.create('Ext.panel.Panel', {
                    title: record.data.text,
                    iconCls: record.data.iconCls,
                    tools: [{
                        type: 'refresh'
                    },
                    {
                        type: 'print'
                    },
                    {
                        type: 'help'
                    }]
                }));
            }
            cPanel.setActiveTab(tab);
        }
    },
    initComponent: function () {
        Ext.create('datis.store.MainTree');
        this.callParent(arguments);
    }
});