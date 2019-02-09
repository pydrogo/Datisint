Ext.define('prada.page.models.Career', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'LastName', type: 'string' },
        { name: 'CodeMelli', type: 'string' },
        { name: 'ResumeFilePath', type: 'string' },
    ]
});