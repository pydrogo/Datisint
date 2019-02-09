var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
    clicksToMoveEditor: 1,
    autoCancel: false,
    saveBtnText: 'ذخیره',
    cancelBtnText: 'انصراف',
    listeners: {
        'canceledit': function (rowEditing, context) {
            // Canceling editing of a locally added, unsaved record: remove it
            if (context.record.phantom) {
                context.store.remove(context.record);
            }
        }
    }
});
Ext.define('prada.page.views.Feature', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Feature'],
    title: 'مدیریت ویژگی',
    plugins: [rowEditing],
    forceFit: true,
    searchbar: 'prada.page.views.Feature.SearchBar',
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'Name',
        text: 'نام',
        editor: {
            // defaults to textfield if no xtype is supplied
            allowBlank: true,
            xtype: 'textfield'
        }
    }, {
        dataIndex: 'CategoryId',
        text: 'دسته بندی',
        editor: {
            xtype: 'sccombo',
            displayField: 'Title',
            valueField: 'Id',
            url: 'FeatureAdmin/CategoryLookup'
        },
        renderer: hussein.renderer.comboRenderer
    },
    //{
    //    text: 'ویرایش',
    //    xtype: 'updatecolumn',
    //        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
    //            Ext.create('Ext.window.Window', {
    //                title: 'ویرایش',
    //                height: '100%',
    //                width: '100%',
    //                layout: 'fit',
    //                modal: true,
    //                constrain: true,
    //                items: Ext.create('prada.page.views.FeatureForm', {
    //                    values: record.data

    //                }),
    //                listeners: {
    //                    close: function (grid) {
    //                        return function (w) {
    //                            if (w.returnValue == 'ok')
    //                                grid.store.reload();
    //                        };
    //                    }(this.up('grid'))
    //                }
    //            }).show();
    //        }
    //},
        {
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
                                    url: 'FeatureAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.Feature',
    readUrl: 'FeatureAdmin/AjaxRead',
    tbar: [{
        iconCls: 'icon-Add',
        text: 'جدید',
        //handler: function (item, e) {
        //    Ext.create('Ext.window.Window', {
        //        title: 'افزودن محصول جدید',
        //        height: '100%',
        //        width: '100%',
        //        layout: 'fit',
        //        modal: true,
        //        constrain: true,
        //        items: Ext.create('prada.page.views.FeatureForm', {
        //            Id: 0,
        //            title: 'افزودن محصول جدید'
        //        }),
        //        listeners: {
        //            close: function (grid) {
        //                return function (w) {
        //                    if (w.returnValue == 'ok')
        //                        grid.store.reload();
        //                };
        //            }(this.up('grid'))
        //        }
        //    }).show();
        //}
        handler: function () {
            rowEditing.cancelEdit();
            // Create a model instance
            var r = Ext.create('prada.page.models.Feature', {
                Name: 'New Feature',
                CategoryId: 0
            });

            this.up('gridpanel').store.insert(0, r);
            rowEditing.startEdit(0, 0);
        }
    }],

    constructor: function (config) {
        //this.readUrl += config.farmStatusId;
        this.callParent(arguments);
    },
    listeners: {
        edit: function (editor, e) {
            var record = e.record;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: 'FeatureAdmin/Save',
                data:
            {
                'Id': record.data.Id,
                'CategoryId': record.data.CategoryId,
                'Name': record.data.Name
            },
                success: function (form, action) {
                    
                    if (form.success) {
                        jump('', form.message);

                    } else {
                        jump('خطا', form.message);
                    }
                },
                failure: function (form, action) {
                    jump('خطا', form.message);
                }
            });
        },
        exception: function (proxy, response, operation) {
            Ext.MessageBox.show({
                title: 'Server error',
                msg: operation.getError(),
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
            });
            gridStore.add(gridStore.getRemovedRecords());
        }
    }
});
var CategoryStore = Ext.create('Ext.data.Store', {
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
        url: 'FeatureAdmin/CategoryLookup'
    }
});
//Ext.define('prada.page.views.FeatureForm', {
//    extend: 'Ext.container.Container',
//    rtl: false,
//    layout: 'border',
//    items: [{
//        url: 'FeatureAdmin/Save',
//        xtype: 'form',
//        border: false,
//        region: 'center',
//        autoScroll: true,
//        layout: 'column',
//        bodyPadding: 10,
//        fieldDefaults: {
//            labelWidth: 150,
//            msgTarget: 'side'
//        },
//        defaults: { style: { right: 0, left: 'auto' }, columnWidth: 0.48, padding: 5 },
//        items: [{
//            xtype: 'hiddenfield', name: 'Id', value: 0
//        }, {
//            xtype: 'textfield',
//            fieldLabel: 'Name',
//            allowBlank: false,
//            name: 'Name'
//        }, {
//            xtype: 'combobox',
//            allowBlank: true,
//            multiSelect: false,
//            displayField: 'Title',
//            valueField: 'Id',
//            store: FeatureStore
//        }],
//        tbar: {
//            xtype: 'toolbar',
//            items: [{
//                iconCls: 'icon-Disk',
//                text: 'ذخیره',
//                listeners: {
//                    click: function (item, e) {
//                        if (this.up('form').isValid()) {
//                            this.disabled = true;
//                            this.up('form').submit({
//                                clientValidation: true,
//                                SaveBtn: this,
//                                window: this.up('window'),
//                                success: function (form, action) {
//                                    if (action.result.success) {
//                                        form.setValues([
//                                            { id: 'Id', value: action.result.data.Id }
//                                        ]);
//                                        //Set this flag for Reload Parent Grid.
//                                        action.window.returnValue = 'ok';
//                                        action.window.close();
//                                    }
//                                },
//                                failure: function (form, action) {
//                                    action.SaveBtn.disabled = false;
//                                    Ext.Msg.alert('خطا', action.result.message);
//                                }
//                            });
//                        }
//                    }
//                }
//            }, {
//                iconCls: 'icon-Delete',
//                text: 'پاک کردن فرم',
//                listeners: {
//                    click: function (item, e) {
//                        var formPanel = this.up('form');
//                        if (formPanel) {
//                            var form = formPanel.getForm();
//                            var id = null;
//                            id = form.findField('Id');
//                            form.reset();
//                            if (id)
//                                form.setValues([{ id: 'Id', value: id }]);

//                        }
//                    }
//                }
//            }]
//        }
//    }
//    ],
//    constructor: function (config) {
//        if (config.values) {
//            this.items[0].items[0].value = config.values.Id;
//        } else {
//            this.items[0].items[0].value = 0;
//        }

//        this.callParent(arguments);

//        //On Edit Mode
//        if (config && config.values) {
//            this.mode = 'update';
//            var values = this.values = config.values;
//            var form = this.down('form').getForm();
//            form.setValues([
//                { id: 'Id', value: values.Id },
//                { id: 'Name', value: values.Name },
//                { id: 'CategoryId', value: values.CategoryId }

//            ]);
//        } else {
//            this.down('form').getForm().setValues([
//        { id: 'Id', value: config.Id }
//            ]);
//            this.mode = 'add';
//            this.values = {};
//        }
//    }
//});

Ext.define('prada.page.views.Feature.SearchBar', {
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
            fieldLabel: 'Name',
            name: 'Name'
        },
         {
             xtype: 'combobox',
             fieldLabel: 'Category',
             allowBlank: true,
             name: 'CategoryId',
             multiSelect: false,
             displayField: 'Title',
             valueField: 'Id',
             store: CategoryStore
         }]
    }]
});
