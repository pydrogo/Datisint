Ext.define('prada.page.views.AHDIrBullet', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.AHDIrBullet'],
    title: 'مدیریت Network Dome Camera',
    forceFit: true,
    searchbar: 'prada.page.views.AHDIrBullet.SearchBar',
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
                        tableId: 15,
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
                        tableId: 15,
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
                    items: Ext.create('prada.page.views.AHDIrBulletForm', {
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
                                    url: 'AHDIrBulletAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.AHDIrBullet',
    readUrl: 'AHDIrBulletAdmin/AjaxRead',
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
                items: Ext.create('prada.page.views.AHDIrBulletForm', {
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

Ext.define('prada.page.views.AHDIrBulletForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'AHDIrBulletAdmin/Save',
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
              { xtype: 'textfield', fieldLabel: 'ImageSensor', name: 'ImageSensor' },
      { xtype: 'textfield', fieldLabel: 'EffectivePixels', name: 'EffectivePixels' },
      { xtype: 'textfield', fieldLabel: 'ScanningSystem', name: 'ScanningSystem' },
      { xtype: 'textfield', fieldLabel: 'ElectronicShutterSpeed', name: 'ElectronicShutterSpeed' },
      { xtype: 'textfield', fieldLabel: 'MinIllumination', name: 'MinIllumination' },
      { xtype: 'textfield', fieldLabel: 'SNRatio', name: 'SNRatio' },
      { xtype: 'textfield', fieldLabel: 'VideoOutput', name: 'VideoOutput' },
      { xtype: 'textfield', fieldLabel: 'DayNight', name: 'DayNight' },
      { xtype: 'textfield', fieldLabel: 'BacklightCompensation', name: 'BacklightCompensation' },
      { xtype: 'textfield', fieldLabel: 'WhiteBalance', name: 'WhiteBalance' },
      { xtype: 'textfield', fieldLabel: 'GainControl', name: 'GainControl' },
      { xtype: 'textfield', fieldLabel: 'NoiseReduction', name: 'NoiseReduction' },
      { xtype: 'textfield', fieldLabel: 'PrivacyMasking', name: 'PrivacyMasking' },
      { xtype: 'textfield', fieldLabel: 'FocalLength', name: 'FocalLength' },
      { xtype: 'textfield', fieldLabel: 'MaxAperture', name: 'MaxAperture' },
      { xtype: 'textfield', fieldLabel: 'FocusControl', name: 'FocusControl' },
      { xtype: 'textfield', fieldLabel: 'AngleOfView', name: 'AngleOfView' },
      { xtype: 'textfield', fieldLabel: 'LensType', name: 'LensType' },
      { xtype: 'textfield', fieldLabel: 'MountType', name: 'MountType' },
      { xtype: 'textfield', fieldLabel: 'VideoCompression', name: 'VideoCompression' },
      { xtype: 'textfield', fieldLabel: 'Resolution', name: 'Resolution' },
      { xtype: 'textfield', fieldLabel: 'FrameRate', name: 'FrameRate' },
      { xtype: 'textfield', fieldLabel: 'BitRate', name: 'BitRate' },
      { xtype: 'textfield', fieldLabel: 'AudioCompression', name: 'AudioCompression' },
      { xtype: 'textfield', fieldLabel: 'Interface', name: 'Interface' },
      { xtype: 'textfield', fieldLabel: 'Ethernet', name: 'Ethernet' },
      { xtype: 'textfield', fieldLabel: 'WiFi', name: 'WiFi' },
      { xtype: 'textfield', fieldLabel: 'Protocol', name: 'Protocol' },
      { xtype: 'textfield', fieldLabel: 'ONVIF', name: 'ONVIF' },
      { xtype: 'textfield', fieldLabel: 'MaxUserAccess', name: 'MaxUserAccess' },
      { xtype: 'textfield', fieldLabel: 'SmartPhone', name: 'SmartPhone' },
      { xtype: 'textfield', fieldLabel: 'MemorySlot', name: 'MemorySlot' },
      { xtype: 'textfield', fieldLabel: 'RS485', name: 'RS485' },
      { xtype: 'textfield', fieldLabel: 'Alarm', name: 'Alarm' },
      { xtype: 'textfield', fieldLabel: 'PIRSensorRange', name: 'PIRSensorRange' },
      { xtype: 'textfield', fieldLabel: 'PowerSupply', name: 'PowerSupply' },
      { xtype: 'textfield', fieldLabel: 'PowerConsumption', name: 'PowerConsumption' },
      { xtype: 'textfield', fieldLabel: 'WorkingEnvironment', name: 'WorkingEnvironment' },
      { xtype: 'textfield', fieldLabel: 'IngressProtection', name: 'IngressProtection' },
      { xtype: 'textfield', fieldLabel: 'VandalResistance', name: 'VandalResistance' },
      { xtype: 'textfield', fieldLabel: 'Dimensions', name: 'Dimensions' },
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

                  { id: 'ImageSensor', value: values.ImageSensor },
      { id: 'EffectivePixels', value: values.EffectivePixels },
      { id: 'ScanningSystem', value: values.ScanningSystem },
      { id: 'ElectronicShutterSpeed', value: values.ElectronicShutterSpeed },
      { id: 'MinIllumination', value: values.MinIllumination },
      { id: 'SNRatio', value: values.SNRatio },
      { id: 'VideoOutput', value: values.VideoOutput },
      { id: 'DayNight', value: values.DayNight },
      { id: 'BacklightCompensation', value: values.BacklightCompensation },
      { id: 'WhiteBalance', value: values.WhiteBalance },
      { id: 'GainControl', value: values.GainControl },
      { id: 'NoiseReduction', value: values.NoiseReduction },
      { id: 'PrivacyMasking', value: values.PrivacyMasking },
      { id: 'FocalLength', value: values.FocalLength },
      { id: 'MaxAperture', value: values.MaxAperture },
      { id: 'FocusControl', value: values.FocusControl },
      { id: 'AngleOfView', value: values.AngleOfView },
      { id: 'LensType', value: values.LensType },
      { id: 'MountType', value: values.MountType },
      { id: 'VideoCompression', value: values.VideoCompression },
      { id: 'Resolution', value: values.Resolution },
      { id: 'FrameRate', value: values.FrameRate },
      { id: 'BitRate', value: values.BitRate },
      { id: 'AudioCompression', value: values.AudioCompression },
      { id: 'Interface', value: values.Interface },
      { id: 'Ethernet', value: values.Ethernet },
      { id: 'WiFi', value: values.WiFi },

      { id: 'Protocol', value: values.Protocol },
      { id: 'ONVIF', value: values.ONVIF },
      { id: 'MaxUserAccess', value: values.MaxUserAccess },
      { id: 'SmartPhone', value: values.SmartPhone },
      { id: 'MemorySlot', value: values.MemorySlot },
      { id: 'RS485', value: values.RS485 },
      { id: 'Alarm', value: values.Alarm },
      { id: 'PowerSupply', value: values.PowerSupply },
      { id: 'PIRSensorRange', value: values.PIRSensorRange },
      { id: 'PowerConsumption', value: values.PowerConsumption },
      { id: 'WorkingEnvironment', value: values.WorkingEnvironment },
      { id: 'IngressProtection', value: values.IngressProtection },
      { id: 'VandalResistance', value: values.VandalResistance },

      { id: 'Dimensions', value: values.Dimensions },
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
Ext.define('prada.page.views.AHDIrBullet.SearchBar', {
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
