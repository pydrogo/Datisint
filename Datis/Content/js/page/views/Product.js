Ext.define('prada.page.views.Product', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Product'],
    title: 'مدیریت ویژگی',
    forceFit: true,
    searchbar: 'prada.page.views.Product.SearchBar',
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'Model',
        text: 'مدل'
    }, {
        xtype: 'updatecolumn',
        text: 'مقدار دهی ویژگیها',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            Ext.create('Ext.window.Window', {
                title: 'ویژگیهای محصول',
                height: '100%',
                width: '100%',
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.FeatureValues', {
                    values: record.data
                }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show();
        }
    }, {
        iconCls: 'icon-Image',
        xtype: 'actioncolumn',
        text: 'تصویر',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            Ext.create('Ext.window.Window', {
                title: 'افزودن عکس لوگو برند',
                height: 600,
                width: 800,
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.ImageUploader', {
                    values: record.data,
                    tableId: 2,
                    MainLogoDimension: 1
                }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show();
        }
    }, {
        width: 25,
        iconCls: 'icon-FileManager',
        xtype: 'actioncolumn',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            Ext.create('Ext.window.Window', {
                title: 'افزودن فایل های محصول',
                height: 600,
                width: 800,
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.FileUploader', {
                    values: record.data,
                    tableId: 2//,
                    //Type: 1
                }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show();
        }
    }, {
        xtype: 'updatecolumn',
        text: 'ویرایش',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            Ext.create('Ext.window.Window', {
                title: 'ویرایش',
                height: '100%',
                width: '100%',
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.ProductForm', {
                    values: record.data

                }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show();
        }
    }, {
        xtype: 'deletecolumn',
        text: 'حذف',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            Ext.Msg.show({
                title: 'حذف رکورد',
                msg: 'آیا از حذف ردیف مورد نظر اطمینان دارید؟ در صورت حذف امکان دسترسی به این ردیف دیگر وجود نخواهد داشت.',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: function (col, grid, record) {
                    return function (btn) {
                        if (btn == 'yes') {
                            Ext.Ajax.request({
                                method: 'delete',
                                url: 'ProductAdmin/Delete/' + record.data.Id,
                                success: function (response, eOpts) {
                                    grid.getStore().remove(record);
                                    jump('حذف', 'رکورد مورد نظر حذف گردید');
                                }
                            });
                        }
                    };
                }(this, grid, record)
            });
        }
    }],

    model: 'prada.page.models.Product',
    readUrl: 'ProductAdmin/AjaxRead',
    tbar: [{
        iconCls: 'icon-Add',
        text: 'جدید',
        handler: function (item, e) {
            Ext.create('Ext.window.Window', {
                title: 'افزودن محصول جدید',
                height: '100%',
                width: '100%',
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.ProductForm', {
                    Id: 0,
                    title: 'افزودن محصول جدید'
                }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show();
        }
    }],

    constructor: function (config) {
        //this.readUrl += config.farmStatusId;
        this.callParent(arguments);
    }
});
var ProductStore = Ext.create('Ext.data.Store', {
    //model: me.model,
    fields: ['Id', 'Title'],
    autoLoad: true,
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        url: 'ProductAdmin/BrandCategoryLookup'
    }
});
Ext.define('prada.page.views.ProductForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'ProductAdmin/Save',
        xtype: 'form',
        border: false,
        region: 'center',
        autoScroll: true,
        layout: 'column',
        bodyPadding: 10,
        fieldDefaults: {
            labelWidth: 150,
            msgTarget: 'side'
        },
        defaults: { style: { right: 0, left: 'auto' }, columnWidth: 0.48, padding: 5 },
        items: [{
            xtype: 'hiddenfield', name: 'Id', value: 0
        }, {
            xtype: 'textfield',
            fieldLabel: 'Model',
            allowBlank: false,
            name: 'Model'
        }, {
            xtype: 'combobox',
            fieldLabel: 'Brand and Category',
            allowBlank: false,
            name: 'BrandCategoryId',
            multiSelect: false,
            displayField: 'Title',
            valueField: 'Id',
            store: ProductStore
        }, {
            xtype: 'textfield',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'Description'
        },
        {
            xtype: 'ckeditor',
            fieldLabel: 'Features Summary',
            name: 'FeaturesSummary',
            height: 500,
            columnWidth: 0.8
        },
        {
            xtype: 'ckeditor',
            fieldLabel: 'Product Summary',
            name: 'Summary',
            height: 500,
            columnWidth: 0.8
        }],
        tbar: {
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-Disk',
                text: 'ذخیره',
                listeners: {
                    click: function (item, e) {
                        if (this.up('form').isValid()) {
                            this.disabled = true;
                            this.up('form').submit({
                                clientValidation: true,
                                SaveBtn: this,
                                window: this.up('window'),
                                success: function (form, action) {
                                    if (action.result.success) {
                                        form.setValues([
                                            { id: 'Id', value: action.result.data.Id }
                                        ]);
                                        //Set this flag for Reload Parent Grid.
                                        action.window.returnValue = 'ok';
                                        action.window.close();
                                    }
                                },
                                failure: function (form, action) {
                                    action.SaveBtn.disabled = false;
                                    Ext.Msg.alert('خطا', action.result.message);
                                }
                            });
                        }
                    }
                }
            }, {
                iconCls: 'icon-Delete',
                text: 'پاک کردن فرم',
                listeners: {
                    click: function (item, e) {
                        var formPanel = this.up('form');
                        if (formPanel) {
                            var form = formPanel.getForm();
                            var id = null;
                            id = form.findField('Id');
                            form.reset();
                            if (id)
                                form.setValues([{ id: 'Id', value: id }]);

                        }
                    }
                }
            }]
        }
    }
    ],
    constructor: function (config) {
        if (config.values) {
            this.items[0].items[0].value = config.values.Id;
        } else {
            this.items[0].items[0].value = 0;
        }

        this.callParent(arguments);

        //On Edit Mode
        if (config && config.values) {
            this.mode = 'update';
            var values = this.values = config.values;
            var form = this.down('form').getForm();
            form.setValues([
                { id: 'Id', value: values.Id },
                { id: 'Model', value: values.Model },
                { id: 'BrandCategoryId', value: values.BrandCategoryId },
            { id: 'Description', value: values.Description },
        { id: 'Summary', value: values.Summary },
        { id: 'FeaturesSummary', value: values.FeaturesSummary }

            ]);
        } else {
            this.down('form').getForm().setValues([
        { id: 'Id', value: config.Id }
            ]);
            this.mode = 'add';
            this.values = {};
        }
    }
});
Ext.define('prada.page.views.Product.SearchBar', {
    extend: 'Ext.form.Panel',
    height: 50,
    layout: {
        type: 'table',
        columns: 2,
        tableAttrs: { style: { width: '100%' } },
        tdAttrs: { style: { width: '43%', verticalAlign: 'middle' } }
    },
    items: [{
        layout: 'column',
        xtype: 'fieldset',
        defaults: {
            columnWidth: 0.33,
            labelWidth: 70,
            padding: 3
        },
        colspan: 2,
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Model',
            name: 'Model'
        }]
    }]
});
