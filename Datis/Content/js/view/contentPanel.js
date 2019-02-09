Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'prada': 'content/js'
    }
});

Ext.define('prada.view.ContentPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.contentpanel',
    region: 'center',
    id: 'contentPanel',
    margins: '3 2 5 5',
    minTabWidth: 115,
    plain: true,
    items: [Ext.create('prada.page.views.Wellcome')]
    
});
