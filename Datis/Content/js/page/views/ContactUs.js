Ext.define('prada.page.views.ContactUs', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    title: 'مدیریت بخش تماس با ما',
    items: [{
        url: 'contactUsAdmin/Save',
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
            fieldLabel: 'Title',
            allowBlank: false,
            name: 'Title'
        }, {
            xtype: 'ckeditor',
            fieldLabel: 'Article',
            name: 'Article',
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
                                success: function (form, action) {
                                    if (action.result.success) {
                                        form.setValues([
                                            { id: 'Id', value: action.result.data.Id }
                                        ]);
                                        jump('', action.result.message);

                                    }
                                },
                                failure: function (form, action) {
                                    Ext.Msg.alert('خطا', action.result.message);
                                    action.SaveBtn.disabled = false;
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
    }],
    constructor: function (config) {
        var a = this;
        this.callParent(arguments);
        Ext.getBody().mask('لطفا صبر کنید');
        window.setTimeout(function () {
            $.ajax({
                url: 'ContactUsAdmin/Read',
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function (data) {
                    Ext.getBody().unmask();
                    if (data) {
                        var form = a.down('form').getForm();
                        form.setValues([
                            { id: 'Id', value: data.Id },
                            { id: 'Title', value: data.Title },
                            { id: 'Article', value: data.Article },
                        ]);
                    }

                },
                error: function (xhr, status, error) {
                }
            });
        }, 2000);

    }
});
