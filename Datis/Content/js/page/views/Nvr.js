Ext.define('prada.page.views.Nvr', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Nvr'],
    title: 'مدیریت Network Dome Camera',
    forceFit: true,
    searchbar: 'prada.page.views.Nvr.SearchBar',
    columns: [
    {
        xtype: 'rownumberer'
    }, {
        dataIndex: 'Name',
        text: 'نام'
    }, {
        dataIndex: 'Model',
        text: 'مدل'
    }, {
        dataIndex: 'Price',
        text: 'قیمت'
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
            width: 25,
            iconCls: 'icon-Image',
            xtype: 'actioncolumn',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                Ext.create('Ext.window.Window', {
                    title: 'افزودن عکس های محصول',
                    height: 600,
                    width: 800,
                    layout: 'fit',
                    modal: true,
                    constrain: true,
                    items: Ext.create('prada.page.views.ImageUploader', {
                        values: record.data,
                        tableId: 12,
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
                    title: 'افزودن فایل های محصولات',
                    height: 600,
                    width: 800,
                    layout: 'fit',
                    modal: true,
                    constrain: true,
                    items: Ext.create('prada.page.views.FileUploader', {
                        values: record.data,
                        tableId: 12,
                        DocumentOrImageOrSoftware: 1
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
        },
        {
            width: 25,
            xtype: 'updatecolumn',
            handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
                Ext.create('Ext.window.Window', {
                    title: 'ویرایش کالا',
                    height: '100%',
                    width: '100%',
                    layout: 'fit',
                    modal: true,
                    constrain: true,
                    items: Ext.create('prada.page.views.AnlogBoxForm', {
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
            width: 25,
            xtype: 'deletecolumn',
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
                                    url: 'NvrAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.Nvr',
    readUrl: 'NvrAdmin/AjaxRead',
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
                items: Ext.create('prada.page.views.AnlogBoxForm', {
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

Ext.define('prada.page.views.AnlogBoxForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'NvrAdmin/Save',
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
            fieldLabel: 'Name',
            allowBlank: false,
            name: 'Name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Model',
            allowBlank: false,
            name: 'Model'
        }
        , {
            xtype: 'ckeditor',
            fieldLabel: 'Overview',
            name: 'Overview',
            height: 500,
            columnWidth: 0.8
        }
        , {
            xtype: 'textfield',
            fieldLabel: 'Description',
            allowBlank: false,
            name: 'Description'
        }
        , {
            xtype: 'numberfield',
            fieldLabel: 'Price',
            name: 'Price'
        }
        , {
            xtype: 'booleanfield',
            fieldLabel: 'show price in website',
            name: 'ShowPrice'
        },

   
     { xtype: 'textfield', fieldLabel: 'MainProcessor', name: 'MainProcessor' },
      { xtype: 'textfield', fieldLabel: 'OperatingSystem', name: 'OperatingSystem' },
      { xtype: 'textfield', fieldLabel: 'Motherboard', name: 'Motherboard' },
      { xtype: 'textfield', fieldLabel: 'Memory', name: 'Memory' },
      { xtype: 'textfield', fieldLabel: 'SystemCase', name: 'SystemCase' },
      { xtype: 'textfield', fieldLabel: 'Fan', name: 'Fan' },
      { xtype: 'textfield', fieldLabel: 'SystemInterface', name: 'SystemInterface' },
      { xtype: 'textfield', fieldLabel: 'Input', name: 'Input' },
      { xtype: 'textfield', fieldLabel: 'Transmission', name: 'Transmission' },
      { xtype: 'textfield', fieldLabel: 'Recording', name: 'Recording' },
      { xtype: 'textfield', fieldLabel: 'Preview', name: 'Preview' },
      { xtype: 'textfield', fieldLabel: 'Playback', name: 'Playback' },
      { xtype: 'textfield', fieldLabel: 'RecordingResolution', name: 'RecordingResolution' },
      { xtype: 'textfield', fieldLabel: 'Audio', name: 'Audio' },
      { xtype: 'textfield', fieldLabel: 'RecordingMode', name: 'RecordingMode' },
      { xtype: 'textfield', fieldLabel: 'AlarmRecording', name: 'AlarmRecording' },
      { xtype: 'textfield', fieldLabel: 'BackupMode', name: 'BackupMode' },
      { xtype: 'textfield', fieldLabel: 'DisplayInterface', name: 'DisplayInterface' },
      { xtype: 'textfield', fieldLabel: 'VideoOutput', name: 'VideoOutput' },
      { xtype: 'textfield', fieldLabel: 'MultiScreenDisplay', name: 'MultiScreenDisplay' },
      { xtype: 'textfield', fieldLabel: 'PrivacyMasking', name: 'PrivacyMasking' },
      { xtype: 'textfield', fieldLabel: 'InternalHDD', name: 'InternalHDD' },
      { xtype: 'textfield', fieldLabel: 'HDDMode', name: 'HDDMode' },
      { xtype: 'textfield', fieldLabel: 'HDDInstallation', name: 'HDDInstallation' },
      { xtype: 'textfield', fieldLabel: 'NetworkInterface', name: 'NetworkInterface' },
      { xtype: 'textfield', fieldLabel: 'EthernetPort', name: 'EthernetPort' },
      { xtype: 'textfield', fieldLabel: 'MotionDetection', name: 'MotionDetection' },
      { xtype: 'textfield', fieldLabel: 'AlarmInput', name: 'AlarmInput' },
      { xtype: 'textfield', fieldLabel: 'RelayOutput', name: 'RelayOutput' },
      { xtype: 'textfield', fieldLabel: 'FrontCover', name: 'FrontCover' },
      { xtype: 'textfield', fieldLabel: 'USB', name: 'USB' },
      { xtype: 'textfield', fieldLabel: 'eSATA', name: 'eSATA' },
      { xtype: 'textfield', fieldLabel: 'RS485', name: 'RS485' },
      { xtype: 'textfield', fieldLabel: 'PowerSupply', name: 'PowerSupply' },
      { xtype: 'textfield', fieldLabel: 'PowerConsumption', name: 'PowerConsumption' },
      { xtype: 'textfield', fieldLabel: 'WorkingEnvironment', name: 'WorkingEnvironment' },
      { xtype: 'textfield', fieldLabel: 'WorkingHumidity', name: 'WorkingHumidity' },
      { xtype: 'textfield', fieldLabel: 'DimensionWDH', name: 'DimensionWDH' },
      { xtype: 'textfield', fieldLabel: 'Weight', name: 'Weight' },
      { xtype: 'textfield', fieldLabel: 'Installation', name: 'Installation' },
      , {
          xtype: 'booleanfield',
          fieldLabel: 'Show as new product',
          name: 'IsNew'
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
                                        form.setValues([
                                            { id: 'Id', value: action.result.data.Id }
                                        ]);
                                        //Set this flag for Reload Parent Grid.
                                        action.window.returnValue = 'ok';
                                        action.window.close();
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
                { id: 'Model', value: values.Model },
                { id: 'Overview', value: values.Overview },
                { id: 'Description', value: values.Description },
                { id: 'Price', value: values.Price },
                { id: 'ShowPrice', value: values.ShowPrice },


                   { id: 'MainProcessor', value: values.MainProcessor },
      { id: 'OperatingSystem', value: values.OperatingSystem },
      { id: 'Motherboard', value: values.Motherboard },
      { id: 'Memory', value: values.Memory },
      { id: 'SystemCase', value: values.SystemCase },
      { id: 'Fan', value: values.Fan },
      { id: 'SystemInterface', value: values.SystemInterface },
      { id: 'Input', value: values.Input },
      { id: 'Transmission', value: values.Transmission },
      { id: 'Recording', value: values.Recording },
      { id: 'Preview', value: values.Preview },
      { id: 'Playback', value: values.Playback },
      { id: 'RecordingResolution', value: values.RecordingResolution },
      { id: 'Audio', value: values.Audio },
      { id: 'RecordingMode', value: values.RecordingMode },
      { id: 'AlarmRecording', value: values.AlarmRecording },
      { id: 'BackupMode', value: values.BackupMode },
      { id: 'DisplayInterface', value: values.DisplayInterface },
      { id: 'VideoOutput', value: values.VideoOutput },
      { id: 'MultiScreenDisplay', value: values.MultiScreenDisplay },
      { id: 'PrivacyMasking', value: values.PrivacyMasking },
      { id: 'InternalHDD', value: values.InternalHDD },
      { id: 'HDDMode', value: values.HDDMode },
      { id: 'HDDInstallation', value: values.HDDInstallation },
      { id: 'NetworkInterface', value: values.NetworkInterface },
      { id: 'EthernetPort', value: values.EthernetPort },
      { id: 'MotionDetection', value: values.MotionDetection },
      { id: 'AlarmInput', value: values.AlarmInput },
      { id: 'RelayOutput', value: values.RelayOutput },
      { id: 'FrontCover', value: values.FrontCover },
      { id: 'USB', value: values.USB },
      { id: 'eSATA', value: values.eSATA },
      { id: 'RS485', value: values.RS485 },
      { id: 'PowerSupply', value: values.PowerSupply },
      { id: 'PowerConsumption', value: values.PowerConsumption },
      { id: 'WorkingEnvironment', value: values.WorkingEnvironment },
      { id: 'WorkingHumidity', value: values.WorkingHumidity },
      { id: 'DimensionWDH', value: values.DimensionWDH },
      { id: 'Weight', value: values.Weight },
      { id: 'Installation', value: values.Installation }
            , { id: 'IsNew', value: values.IsNew }

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
Ext.define('prada.page.views.Nvr.SearchBar', {
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
        }, {
            xtype: 'textfield',
            fieldLabel: 'Model',
            name: 'Model'
        }]
    }]
});
