Ext.define('prada.page.models.SerialNumber', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'Email', type: 'string' },
        { name: 'Mobile', type: 'string' },
        { name: 'SerialNumber', type: 'string' },
        { name: 'InsertDate', type: 'string' },
        { name: 'Product', type: 'string' },
        { name: 'BuyDate', type: 'string' },
        { name: 'Description', type: 'string' }

    ]
});