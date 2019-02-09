Ext.define('prada.page.models.News', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Article', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Category', type: 'int' },
        { name: 'ShowInFirstPage', type: 'bool' },
        { name: 'NewsDate', type: 'date' }
    ]
});