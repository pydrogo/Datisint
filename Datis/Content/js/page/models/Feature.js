Ext.define('prada.page.models.Feature', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'CategoryName', type: 'string' },
        { name: 'CategoryId', type: 'int' }
    ]
});