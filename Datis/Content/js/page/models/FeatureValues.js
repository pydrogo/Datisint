Ext.define('prada.page.models.FeatureValues', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'Id', type: 'int' },
        { name: 'CategoryId', type: 'int' },
        { name: 'BrandCategoryId', type: 'int' },
        { name: 'FeatureId', type: 'int' },
        { name: 'ProductId', type: 'int' },
        { name: 'Name', type: 'string' },
        { name: 'Value', type: 'string' }
    ]
});