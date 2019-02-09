

Ext.define('prada.page.views.FirstPage', {
    extend: 'Ext.container.Container',
    title: 'مدیریت بخش های صفحه اول',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'FirstPageAdmin/Save',
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
        items: [
            {
                xtype: 'sccombo',
                fieldLabel: 'Articles show in first page',
                allowBlank: false,
                name: 'Article',
                multiSelect: true,
                url:'FirstPageAdmin/Lookup'
            }
        ],
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

                                        jump("", action.result.message);
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
            }]
        }
    }
    ],
    constructor: function (config) {


        this.callParent(arguments);

      
    }
});
Ext.define('prada.page.views.FirstPage.SearchBar', {
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
            fieldLabel: 'Title',
            name: 'Title'
        }, {
            xtype: 'textfield',
            fieldLabel: 'FirstPage Content',
            name: 'Article'
        }]
    }]
});
