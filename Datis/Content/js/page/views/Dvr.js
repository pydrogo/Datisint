Ext.define('prada.page.views.Dvr', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.Dvr'],
    title: 'مدیریت Network Dome Camera',
    forceFit: true,
    searchbar: 'prada.page.views.Dvr.SearchBar',
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
                        tableId: 11,
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
                        tableId: 11,
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
                                    url: 'DvrAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.Dvr',
    readUrl: 'DvrAdmin/AjaxRead',
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
        url: 'DvrAdmin/Save',
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
      { xtype: 'textfield', fieldLabel: 'Input', name: 'Input' },
      { xtype: 'textfield', fieldLabel: 'Standard', name: 'Standard' },
      { xtype: 'textfield', fieldLabel: 'AudioInput', name: 'AudioInput' },
      { xtype: 'textfield', fieldLabel: 'AudioOutput', name: 'AudioOutput' },
      { xtype: 'textfield', fieldLabel: 'TwoWayTalk', name: 'TwoWayTalk' },
      { xtype: 'textfield', fieldLabel: 'Interface', name: 'Interface' },
      { xtype: 'textfield', fieldLabel: 'Resolution', name: 'Resolution' },
      { xtype: 'textfield', fieldLabel: 'DisplaySplit', name: 'DisplaySplit' },
      { xtype: 'textfield', fieldLabel: 'PrivacyMasking', name: 'PrivacyMasking' },
      { xtype: 'textfield', fieldLabel: 'OSD', name: 'OSD' },
      { xtype: 'textfield', fieldLabel: 'VideoAudioCompression', name: 'VideoAudioCompression' },
      { xtype: 'textfield', fieldLabel: 'RecordingResolution', name: 'RecordingResolution' },
      { xtype: 'textfield', fieldLabel: 'RecordRateMainStream', name: 'RecordRateMainStream' },
      { xtype: 'textfield', fieldLabel: 'RecordRateExtraStream', name: 'RecordRateExtraStream' },
      { xtype: 'textfield', fieldLabel: 'BitRate', name: 'BitRate' },
      { xtype: 'textfield', fieldLabel: 'RecordMode', name: 'RecordMode' },
      { xtype: 'textfield', fieldLabel: 'RecordInterval', name: 'RecordInterval' },
      { xtype: 'textfield', fieldLabel: 'TriggerEvents', name: 'TriggerEvents' },
      { xtype: 'textfield', fieldLabel: 'VideoDetection', name: 'VideoDetection' },
      { xtype: 'textfield', fieldLabel: 'AlarmInput', name: 'AlarmInput' },
      { xtype: 'textfield', fieldLabel: 'AlarmOutput', name: 'AlarmOutput' },
      { xtype: 'textfield', fieldLabel: 'SyncPlayback', name: 'SyncPlayback' },
      { xtype: 'textfield', fieldLabel: 'SearchMode', name: 'SearchMode' },
      { xtype: 'textfield', fieldLabel: 'PlaybackFunctions', name: 'PlaybackFunctions' },
      { xtype: 'textfield', fieldLabel: 'BackupMode', name: 'BackupMode' },
      { xtype: 'textfield', fieldLabel: 'Ethernet', name: 'Ethernet' },
      { xtype: 'textfield', fieldLabel: 'NetworkFunctions', name: 'NetworkFunctions' },
      { xtype: 'textfield', fieldLabel: 'MaxUserAccess', name: 'MaxUserAccess' },
      { xtype: 'textfield', fieldLabel: 'SmartPhone', name: 'SmartPhone' },
      { xtype: 'textfield', fieldLabel: 'InternalHDD', name: 'InternalHDD' },
      { xtype: 'textfield', fieldLabel: 'ExternalHDD', name: 'ExternalHDD' },
      { xtype: 'textfield', fieldLabel: 'USBInterface', name: 'USBInterface' },
      { xtype: 'textfield', fieldLabel: 'RS232', name: 'RS232' },
      { xtype: 'textfield', fieldLabel: 'RS485', name: 'RS485' },
      { xtype: 'textfield', fieldLabel: 'PowerSupply', name: 'PowerSupply' },
      { xtype: 'textfield', fieldLabel: 'PowerConsumption', name: 'PowerConsumption' },
      { xtype: 'textfield', fieldLabel: 'WorkingEnvironment', name: 'WorkingEnvironment' },
      { xtype: 'textfield', fieldLabel: 'DimensionWDH', name: 'DimensionWDH' },
      { xtype: 'textfield', fieldLabel: 'Weight', name: 'Weight' }
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
      { id: 'Input', value: values.Input },
      { id: 'Standard', value: values.Standard },
      { id: 'AudioInput', value: values.AudioInput },
      { id: 'AudioOutput', value: values.AudioOutput },
      { id: 'TwoWayTalk', value: values.TwoWayTalk },
      { id: 'Interface', value: values.Interface },
      { id: 'Resolution', value: values.Resolution },
      { id: 'DisplaySplit', value: values.DisplaySplit },
      { id: 'PrivacyMasking', value: values.PrivacyMasking },
      { id: 'OSD', value: values.OSD },
      { id: 'VideoAudioCompression', value: values.VideoAudioCompression },
      { id: 'RecordingResolution', value: values.RecordingResolution },
      { id: 'RecordRateMainStream', value: values.RecordRateMainStream },
      { id: 'RecordRateExtraStream', value: values.RecordRateExtraStream },
      { id: 'BitRate', value: values.BitRate },
      { id: 'RecordMode', value: values.RecordMode },
      { id: 'RecordInterval', value: values.RecordInterval },
      { id: 'TriggerEvents', value: values.TriggerEvents },
      { id: 'VideoDetection', value: values.VideoDetection },
      { id: 'AlarmInput', value: values.AlarmInput },
      { id: 'AlarmOutput', value: values.AlarmOutput },
      { id: 'SyncPlayback', value: values.SyncPlayback },
      { id: 'SearchMode', value: values.SearchMode },
      { id: 'PlaybackFunctions', value: values.PlaybackFunctions },
      { id: 'BackupMode', value: values.BackupMode },
      { id: 'Ethernet', value: values.Ethernet },
      { id: 'NetworkFunctions', value: values.NetworkFunctions },
      { id: 'MaxUserAccess', value: values.MaxUserAccess },
      { id: 'SmartPhone', value: values.SmartPhone },
      { id: 'InternalHDD', value: values.InternalHDD },
      { id: 'ExternalHDD', value: values.ExternalHDD },
      { id: 'USBInterface', value: values.USBInterface },
      { id: 'RS232', value: values.RS232 },
      { id: 'RS485', value: values.RS485 },
      { id: 'PowerSupply', value: values.PowerSupply },
      { id: 'PowerConsumption', value: values.PowerConsumption },
      { id: 'WorkingEnvironment', value: values.WorkingEnvironment },
      { id: 'DimensionWDH', value: values.DimensionWDH },
      { id: 'Weight', value: values.Weight }
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
Ext.define('prada.page.views.Dvr.SearchBar', {
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
