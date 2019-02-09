Ext.define('prada.page.views.Repair', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Repair'],
    title: 'مدیریت برند',
    forceFit: true,
    searchbar: 'prada.page.views.Repair.SearchBar',
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'TamirOrMarjoo',
        text: 'نوع درخواست'
    }, {
        dataIndex: 'NameSherkat',
        text: 'نام شرکت'
    }, {
        dataIndex: 'Ostan',
        text: 'استان'
    }, {
        dataIndex: 'Shahrestan',
        text: 'شهر'
    },
    //{
    //    dataIndex: 'CreateDate',
    //    text: 'تاریخ ثبت',
    //    renderer: hussein.renderer.dateRenderer
    //}, {
    //    dataIndex: 'CreateName',
    //    text: 'ثبت کننده'
    //}, {
    //    dataIndex: 'LastModifiedDate',
    //    text: 'تاریخ آخرین ویرایش',
    //    renderer: hussein.renderer.dateRenderer
    //}, {
    //    dataIndex: 'LastModefiedName',
    //    text: 'آخرین ویرایش کننده'
        //},

        {
            xtype: 'updatecolumn',
            text: 'نمایش کامل',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                Ext.create('Ext.window.Window', {
                    title: 'نمایش کامل',
                    height: '100%',
                    width: '100%',
                    layout: 'fit',
                    modal: true,
                    constrain: true,
                    items: Ext.create('prada.page.views.RepairForm', {
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
                                    url: 'RepairAdmin/Delete/' + record.data.Id,
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
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: Ext.XTemplate('{Eshkal}')
    }],

    model: 'prada.page.models.Repair',
    readUrl: 'RepairAdmin/AjaxRead',
    //tbar: [{
    //    iconCls: 'icon-Add',
    //    text: 'جدید',
    //    handler: function (item, e) {
    //        Ext.create('Ext.window.Window', {
    //            title: 'افزودن محصول جدید',
    //            height: '100%',
    //            width: '100%',
    //            layout: 'fit',
    //            modal: true,
    //            constrain: true,
    //            items: Ext.create('prada.page.views.RepairForm', {
    //                Id: 0,
    //                title: 'افزودن محصول جدید'
    //            }),
    //            listeners: {
    //                close: function (grid) {
    //                    return function (w) {
    //                        if (w.returnValue == 'ok')
    //                            grid.store.reload();
    //                    };
    //                }(this.up('grid'))
    //            }
    //        }).show();
    //    }
    //}],

    constructor: function (config) {
        //this.readUrl += config.farmStatusId;
        this.callParent(arguments);
    }
});

Ext.define('prada.page.views.RepairForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    rtl:true,
    items: [{
        url: 'RepairAdmin/Save',
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
            fieldLabel: 'نوع درخواست',
            editable:false,
            name: 'TamirOrMarjoo'
        }, {
            xtype: 'textfield',
            fieldLabel: 'نام شرکت',
            readOnly: true,
            name: 'NameSherkat'
        }
        , {
            xtype: 'textfield',
            fieldLabel: 'نام مسئول',
            readOnly: true,
            name: 'NameMasool'
        }, {
            xtype: 'textfield',
            fieldLabel: 'استان',
            readOnly: true,
            name: 'Ostan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'شهر',
            readOnly: true,
            name: 'Shahrestan'
        }, {
            xtype: 'textfield',
            fieldLabel: 'کد پستی',
            readOnly: true,
            name: 'CodePosti'
        }, {
            xtype: 'textfield',
            fieldLabel: 'تلفن ثابت',
            readOnly: true,
            name: 'Tel'
        }, {
            xtype: 'textfield',
            fieldLabel: 'موبایل',
            readOnly: true,
            name: 'Mobile'
        }, {
            xtype: 'textfield',
            fieldLabel: 'ایمیل',
            readOnly: true,
            name: 'Email'
        }, {
            xtype: 'textfield',
            fieldLabel: 'مدل دستگاه',
            readOnly: true,
            name: 'ModelDastgah'
        }, {
            xtype: 'textfield',
            fieldLabel: 'شماره سریال دستگاه',
            readOnly: true,
            name: 'ShomareSerialDastgah'
        }, {
            xtype: 'textfield',
            fieldLabel: 'شماره فاکتور',
            readOnly: true,
            name: 'ShomareFactor'
        }, {
            xtype: 'textfield',
            fieldLabel: 'تاریخ فاکتور',
            readOnly: true,
            name: 'FactorDate'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'آدرس',
            readOnly: true,
            name: 'Address'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'شرح مشکل',
            readOnly: true,
            name: 'Eshkal'
        }
        ]
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
                { id: 'TamirOrMarjoo', value: values.TamirOrMarjoo },
                { id: 'NameSherkat', value: values.NameSherkat },
                { id: 'NameMasool', value: values.NameMasool },
                { id: 'Ostan', value: values.Ostan },
                { id: 'Shahrestan', value: values.Shahrestan },
                { id: 'CodePosti', value: values.CodePosti },
                { id: 'Tel', value: values.Tel },
                { id: 'Mobile', value: values.Mobile },
                { id: 'Email', value: values.Email },
                { id: 'ModelDastgah', value: values.ModelDastgah },
                { id: 'ShomareSerialDastgah', value: values.ShomareSerialDastgah },
                { id: 'ShomareFactor', value: values.ShomareFactor },
                { id: 'FactorDate', value: values.FactorDate },
                { id: 'Address', value: values.Address },
                { id: 'Eshkal', value: values.Eshkal }
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

Ext.define('prada.page.views.Repair.SearchBar', {
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
            fieldLabel: 'نام شرکت',
            name: 'NameSherkat'
        }, {
            xtype: 'textfield',
            fieldLabel: 'مشکل',
            name: 'Eshkal'
        }]
    }]
});
