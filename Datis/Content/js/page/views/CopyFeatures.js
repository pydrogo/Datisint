var CategorytStore = Ext.create('Ext.data.Store', {
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
Ext.define('prada.page.views.CopyFeatures', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'CopyFeaturesAdmin/Save',
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
            xtype: 'combobox',
            fieldLabel: 'Copy From Category',
            allowBlank: false,
            name: 'FromCategoryId',
            multiSelect: false,
            displayField: 'Title',
            valueField: 'Id',
            store: CategorytStore
        }
        , {
            xtype: 'combobox',
            fieldLabel: 'To Category',
            allowBlank: false,
            name: 'ToCategoryId',
            multiSelect: false,
            displayField: 'Title',
            valueField: 'Id',
            store: CategorytStore
        }, {
            xtype: 'booleanfield',
            fieldLabel: 'Delete Destination Category Features',
            name: 'DeleteFeatures'
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
                                        Ext.Msg.alert('توجه',action.result.message);
                                        action.SaveBtn.disabled = false;
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
    ]
});