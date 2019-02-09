Ext.define('prada.page.views.Career', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Career'],
    title: 'مدیریت برند',
    forceFit: true,
    searchbar: 'prada.page.views.Career.SearchBar',
    columns: [
    {
        width:30,
        text: 'ردیف',
        xtype: 'rownumberer'
    },
    {
        dataIndex: 'Name',
        text: 'نام'
    }, {
        dataIndex: 'LastName',
        text: 'نام خانوادگی'
    }, {
        dataIndex: 'CodeMelli',
        text: 'کد ملی'
    }, {
        iconCls: 'icon-Image',
        xtype: 'actioncolumn',
        text: 'فایل رزومه',
        handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
            debugger;
            //$.ajax({
            //    url: 'Career/Load',
            //    type: 'GET',
            //    dataType: 'json',
            //    data:
            //    {
            //        "ResumeId": record.data.Id
            //    },
            //    success: function () {
            //        debugger;
            //        alert("hiiI");
                    window.location = "Career/Load?ResumeId=" + record.data.Id;
            //    },
            //    error: function (xhr, status, error) {
            //        debugger;
            //        alert("fail");
            //    }
            //});
        }
    },
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
                    items: Ext.create('prada.page.views.CareerForm', {
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
                                    url: 'Career/Delete/' + record.data.Id,
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

    model: 'prada.page.models.Career',
    readUrl: 'Career/AjaxRead',
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

Ext.define('prada.page.views.CareerForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    rtl:true,
    items: [{
        url: 'Career/Save',
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
            fieldLabel: 'نام',
            editable:false,
            name: 'Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'نام خانوادگی',
            readOnly: true,
            name: 'LastName'
        }
        , {
            xtype: 'textfield',
            fieldLabel: 'کد ملی',
            readOnly: true,
            name: 'CodeMelli'
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
                { id: 'Name', value: values.Name },
                { id: 'LastName', value: values.LastName },
                { id: 'CodeMelli', value: values.CodeMelli },
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

Ext.define('prada.page.views.Career.SearchBar', {
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
            fieldLabel: 'نام',
            name: 'Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'نام خانوادگی',
            name: 'LastName'
        }, {
            xtype: 'textfield',
            fieldLabel: 'کد ملی',
            name: 'CodeMelli'
        }]
    }]
});
