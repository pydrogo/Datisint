Ext.define('prada.page.models.Category', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'ParentId', type: 'int' },
    { name: 'BrandsIds'}
    ]
});