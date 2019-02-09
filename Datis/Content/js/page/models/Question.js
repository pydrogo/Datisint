Ext.define('prada.page.models.Question', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'FullName', type: 'string' },
        { name: 'Country', type: 'string' },
        { name: 'Mail', type: 'string' },
        { name: 'Phone', type: 'string' },
        { name: 'Company', type: 'string' },
        { name: 'Subject', type: 'string' },
        { name: 'Note', type: 'string' }
    ]
});