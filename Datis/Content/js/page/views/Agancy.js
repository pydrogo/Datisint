Ext.define('prada.page.views.Agancy', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Agancy'],
    title: 'مدیریت برند',
    forceFit: true,
    searchbar: 'prada.page.views.Agancy.SearchBar',
    columns: [
    {
        text: 'ردیف',
        xtype: 'rownumberer'
    }, {
        dataIndex: 'NameSherkatForushgah',
        text: 'نام'
    }, {
        dataIndex: 'NameModiramelMasool',
        text: 'نام مسئول'
    }, {
        dataIndex: 'Ostan',
        text: 'استان'
    }, {
        dataIndex: 'Shahrestan',
        text: 'شهر'
    }
        , {
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
                    items: Ext.create('prada.page.views.AgancyForm', {
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
            text: 'فایل جواز',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                window.location = "Agancies/DownloadJavaz?Id=" + record.data.Id;
            }
        }, {
            iconCls: 'icon-Image',
            xtype: 'actioncolumn',
            text: 'فایل گردش حساب',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                window.location = "Agancies/DownloadPrintGardesh?Id=" + record.data.Id;
            }
        }
        , {
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
                                    url: 'Agancies/Delete/' + record.data.Id,
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
        }
    ],

    model: 'prada.page.models.Agancy',
    readUrl: 'Agancies/AjaxRead',

    constructor: function (config) {
        this.callParent(arguments);
    }
});

Ext.define('prada.page.views.AgancyForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    rtl: true,
    items: [{
        url: 'Agancies/Save',
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
            fieldLabel: 'نام شرکت/فروشگاه',
            editable: false,
            name: 'NameSherkatForushgah'
        }, {
            xtype: 'textfield',
            fieldLabel: 'نام مدیرعامل/مسئول',
            readOnly: true,
            name: 'NameModiramelMasool'
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
            fieldLabel: 'فکس',
            readOnly: true,
            name: 'Fax'
        }, {
            xtype: 'textfield',
            fieldLabel: 'ایمیل',
            readOnly: true,
            name: 'Email'
        }, {
            xtype: 'textareafield',
            fieldLabel: 'آدرس',
            readOnly: true,
            name: 'Address',
        }, {
            xtype: 'textfield',
            fieldLabel: 'تاریخ ثبت',
            readOnly: true,
            name: 'RegisterDate'
        }, {
            xtype: 'textfield',
            fieldLabel: 'محل ثبت',
            readOnly: true,
            name: 'RegisterPlace'
        }, {
            xtype: 'textfield',
            fieldLabel: 'تعداد پرسنل فنی',
            readOnly: true,
            name: 'TedadPersonnelFanni'
        }, {
            xtype: 'textfield',
            fieldLabel: 'تعداد پرسنل اداری',
            readOnly: true,
            name: 'TedadPersonnelEdari'
        }, {
            xtype: 'textfield',
            fieldLabel: 'تعداد پرسنل فروش',
            readOnly: true,
            name: 'TedadPersonnelForush'
        }, {
            xtype: 'textfield',
            fieldLabel: ' آیا تابحال پروژه مدار بسته انجام داده‌اید؟',
            readOnly: true,
            name: 'ProjeAnjamDadeid',
            columnWidth: 0.6,
            labelWidth: 400
        }, {
            xtype: 'textfield',
            fieldLabel: ' آیا تا کنون نمایندگی برند خاصی را داشته اید؟ چه برندی؟',
            readOnly: true,
            name: 'NamayandegBrandDashte',
            columnWidth: 0.6,
            labelWidth: 400
        }, {
            xtype: 'textfield',
            fieldLabel: ' توانایی شما در فروش تجهیزات مداربسته سالیانه تا چه حدی می‌باشد؟',
            readOnly: true,
            name: 'TavanayiSaliane',
            columnWidth: 0.6,
            labelWidth: 400
        }, {
            xtype: 'textfield',
            fieldLabel: ' آیا با محصولات مدار بسته پرادا آشنایی دارید؟ از چه طریق؟',
            readOnly: true,
            name: 'AshnayiBaPrada',
            columnWidth: 0.6,
            labelWidth: 400
        }, {
            xtype: 'textfield',
            fieldLabel: 'جهت اخذ نمایندگی توانایی ارائه چه نوع ضمانت هایی را دارید؟',
            readOnly: true,
            name: 'NoeZemanat',
            columnWidth: 0.6,
            labelWidth: 400
        }, {
            xtype: 'textfield',
            fieldLabel: 'محل کسب',
            readOnly: true,
            name: 'EjareShakhsi',
            labelWidth: 400

        }]
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
                { id: 'NameSherkatForushgah', value: values.NameSherkatForushgah },
                { id: 'NameModiramelMasool', value: values.NameModiramelMasool },
                { id: 'Email', value: values.Email },
                { id: 'Ostan', value: values.Ostan },
                { id: 'Shahrestan', value: values.Shahrestan },
                { id: 'Address', value: values.Address },
                { id: 'Mobile', value: values.Mobile },
                { id: 'Tel', value: values.Tel },
                { id: 'Fax', value: values.Fax },
                { id: 'RegisterDate', value: values.RegisterDate },
                { id: 'RegisterPlace', value: values.RegisterPlace },
                { id: 'TedadPersonnelFanni', value: values.TedadPersonnelFanni },
                { id: 'TedadPersonnelEdari', value: values.TedadPersonnelEdari },
                { id: 'TedadPersonnelForush', value: values.TedadPersonnelForush },
                { id: 'ProjeAnjamDadeid', value: values.ProjeAnjamDadeid },
                { id: 'NamayandegBrandDashte', value: values.NamayandegBrandDashte },
                { id: 'TavanayiSaliane', value: values.TavanayiSaliane },
                { id: 'AshnayiBaPrada', value: values.AshnayiBaPrada },
                { id: 'EjareShakhsi', value: values.EjareShakhsi },
                { id: 'NoeZemanat', value: values.NoeZemanat }
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

Ext.define('prada.page.views.Agancy.SearchBar', {
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
            name: 'NameSherkatForushgah'
        }, {
            xtype: 'textfield',
            fieldLabel: 'نام مسئول',
            name: 'NameModiramelMasool'
        }]
    }]
});
