Ext.define('prada.page.models.SiteContent', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Article', type: 'string' },
        { name: 'ArticleType', type: 'int' }
    ]
});