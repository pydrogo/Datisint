Ext.define('prada.page.models.Product', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'Model', type: 'string' },
        { name: 'Description', type: 'string' },
        { name: 'Summary', type: 'string' },
        { name: 'FeaturesSummary', type: 'string' },
        { name: 'BrandCategoryId', type: 'int' }
    ]
});