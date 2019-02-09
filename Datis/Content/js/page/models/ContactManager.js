Ext.define('prada.page.models.ContactManager', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Subject', type: 'string' },
        { name: 'Email', type: 'string' },
    { name: 'Message', type: 'string' }
        
    ]
});