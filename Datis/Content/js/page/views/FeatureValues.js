//commentha alaki nistttttttttttttttttttttttttttttttttttttttttttt...baraye add kardane record be gride
var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 1,
    autoCancel: false,
    saveBtnText: 'ذخیره',
    cancelBtnText: 'انصراف',
    //listeners: {
    //    'canceledit': function (rowEditing, context) {
    //        // Canceling editing of a locally added, unsaved record: remove it
    //        if (context.record.phantom) {
    //            context.store.remove(context.record);
    //        }
    //    }
    //}
});
Ext.define('prada.page.views.FeatureValues', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.FeatureValues'],
    title: 'مدیریت ویژگی',
    plugins: [rowEditing],
    forceFit: true,
    autoLoadStore: false,
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'Name',
        text: 'ویژگی'
    }, {
        dataIndex: 'Value',
        text: 'مقدار',
        editor: {
            // defaults to textfield if no xtype is supplied
            allowBlank: true,
            xtype: 'textfield'
        }
    }],
    //tbar: [{
    //    text: 'Add Employee',
    //    iconCls: 'employee-add',
    //    handler: function () {
    //        rowEditing.cancelEdit();
    //        // Create a model instance
    //        var r = Ext.create('prada.page.models.FeatureValues', {
    //            Name: 'New Guy',
    //            Value: 'new@sencha-test.com'
    //        });

    //        this.up('gridpanel').store.insert(0, r);
    //        rowEditing.startEdit(0, 0);
    //    }
    //}],
    model: 'prada.page.models.FeatureValues',
    //readUrl: 'FeatureValuesAdmin/AjaxRead',
    constructor: function (config) {
        this.callParent(arguments);
        this.store.proxy.url = 'FeatureValuesAdmin/AjaxRead?BrandCategoryId=' + config.values.BrandCategoryId + '&ProductId=' + config.values.Id;
        this.store.load();
    },
    listeners: {
        edit: function (editor, e) {
            var record = e.record;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'FeatureValuesAdmin/Save',
                data:
            {
                'Id': record.data.Id,
                'CategoryId': record.data.CategoryId,
                'BrandCategoryId': record.data.BrandCategoryId,
                'FeatureId': record.data.FeatureId,
                'ProductId': record.data.ProductId,
                'Name': record.data.Name,
                'Value': record.data.Value,
            },
                success: function (response, eOpts) {
                    
                    jump('توجه', 'رکورد با موفقیت ویرایش شد');
                }
            });
            //alert(Ext.String.format(
            //    'The field "{0}" or record #{1} has been changed from {2} to {3}',
            //    e.field, record.get('id'), e.originalValue, e.newValue
            //));

            //alert('The following fields of the records are dirty: ' + Ext.Object.getKeys(record.modified).join(', '));
        }
    }
});
