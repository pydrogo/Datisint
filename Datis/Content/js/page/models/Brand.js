Ext.define('prada.page.models.Brand', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Logo', type: 'string' }
        
    ]
});