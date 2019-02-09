Ext.define('prada.page.views.AHDBox', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.AHDBox', 'prada.page.views.AnalogBox'],
    title: 'مدیریت HD Analog BOX Camera',
    forceFit: true,
    searchbar: 'prada.page.views.AHDBox.SearchBar',
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
                        tableId: 13,
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
                        tableId: 13,
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
                    items: Ext.create('prada.page.views.AHDBoxForm', {
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
                                    url: 'AHDBoxAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.AHDBox',
    readUrl: 'AHDBoxAdmin/AjaxRead',
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
                items: Ext.create('prada.page.views.AHDBoxForm', {
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

Ext.define('prada.page.views.AHDBoxForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'AHDBoxAdmin/Save',
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
        }, { xtype: 'textfield', fieldLabel: 'Image Sensor', name: 'ImageSensor' }
      , { xtype: 'textfield', fieldLabel: 'Scan Mode', name: 'ScanMode' }
      , { xtype: 'textfield', fieldLabel: 'Number Of Active Pixels', name: 'NumberOfActivePixels' }
      , { xtype: 'textfield', fieldLabel: 'Total Number Of Pixels', name: 'TotalNumberOfPixels' }
      , { xtype: 'textfield', fieldLabel: 'Minimum Illumination', name: 'MinimumIllumination' }
      , { xtype: 'textfield', fieldLabel: 'SN Ratio', name: 'SNRatio' }
      , { xtype: 'textfield', fieldLabel: 'Day Night', name: 'DayNight' }
      , { xtype: 'textfield', fieldLabel: 'Back Light', name: 'BackLight' }
      , { xtype: 'textfield', fieldLabel: 'AGC', name: 'AGC' }
      , { xtype: 'textfield', fieldLabel: 'White Balance', name: 'WhiteBalance' }
      , { xtype: 'textfield', fieldLabel: 'Noise Reduction', name: 'NoiseReduction' }
      , { xtype: 'textfield', fieldLabel: 'EZoom', name: 'EZoom' }
      , { xtype: 'textfield', fieldLabel: 'Brightness', name: 'Brightness' }
      , { xtype: 'textfield', fieldLabel: 'Mirror', name: 'Mirror' }
      , { xtype: 'textfield', fieldLabel: 'Privacy Zone', name: 'PrivacyZone' }
      , { xtype: 'textfield', fieldLabel: 'Motion', name: 'Motion' }
      , { xtype: 'textfield', fieldLabel: 'OSD', name: 'OSD' }
      , { xtype: 'textfield', fieldLabel: 'ACE', name: 'ACE' }
      , { xtype: 'textfield', fieldLabel: 'Lens Mount', name: 'LensMount' }
      , { xtype: 'textfield', fieldLabel: 'Max IR LEDs Length', name: 'MaxIRLEDsLength' }
      , { xtype: 'textfield', fieldLabel: 'Hardware Flash', name: 'HardwareFlash' }
      , { xtype: 'textfield', fieldLabel: 'Ethernet', name: 'Ethernet' }
      , { xtype: 'textfield', fieldLabel: 'Video Output', name: 'VideoOutput' }
      , { xtype: 'textfield', fieldLabel: 'Compression', name: 'Compression' }
      , { xtype: 'textfield', fieldLabel: 'Max FrameRate', name: 'MaxFrameRate' }
      , { xtype: 'textfield', fieldLabel: 'Bitrate Control', name: 'BitrateControl' }
      , { xtype: 'textfield', fieldLabel: 'Audio Compression', name: 'AudioCompression' }
      , { xtype: 'textfield', fieldLabel: 'Audio Interface', name: 'AudioInterface' }
      , { xtype: 'textfield', fieldLabel: 'Event', name: 'Event' }
      , { xtype: 'textfield', fieldLabel: 'Event Output', name: 'EventOutput' }
      , { xtype: 'textfield', fieldLabel: 'Recording', name: 'Recording' }
      , { xtype: 'textfield', fieldLabel: 'Client', name: 'Client' }
      , { xtype: 'textfield', fieldLabel: 'Network Protocol', name: 'NetworkProtocol' }
      , { xtype: 'textfield', fieldLabel: 'Smart Function', name: 'SmartFunction' }
      , { xtype: 'textfield', fieldLabel: 'WiFi', name: 'WiFi' }
      , { xtype: 'textfield', fieldLabel: 'Compatibility', name: 'Compatibility' }
      , { xtype: 'textfield', fieldLabel: 'Operating Temp', name: 'OperatingTemp' }
      , { xtype: 'textfield', fieldLabel: 'Weight', name: 'Weight' }
      , { xtype: 'textfield', fieldLabel: 'Dimension', name: 'Dimension' }
      , { xtype: 'textfield', fieldLabel: 'Power Supply', name: 'PowerSupply' }
      , { xtype: 'textfield', fieldLabel: 'Power Consumption', name: 'PowerConsumption' }
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
      { id: 'ScanMode', value: values.ScanMode },
      { id: 'NumberOfActivePixels', value: values.NumberOfActivePixels },
      { id: 'TotalNumberOfPixels', value: values.TotalNumberOfPixels },
      { id: 'MinimumIllumination', value: values.MinimumIllumination },
      { id: 'SNRatio', value: values.SNRatio },
      { id: 'DayNight', value: values.DayNight },
      { id: 'BackLight', value: values.BackLight },
      { id: 'AGC', value: values.AGC },
      { id: 'WhiteBalance', value: values.WhiteBalance },
      { id: 'NoiseReduction', value: values.NoiseReduction },
      { id: 'EZoom', value: values.EZoom },
      { id: 'Brightness', value: values.Brightness },
      { id: 'Mirror', value: values.Mirror },
      { id: 'PrivacyZone', value: values.PrivacyZone },
      { id: 'Motion', value: values.Motion },
      { id: 'OSD', value: values.OSD },
      { id: 'ACE', value: values.ACE },
      { id: 'LensMount', value: values.LensMount },
      { id: 'MaxIRLEDsLength', value: values.MaxIRLEDsLength },
      { id: 'HardwareFlash', value: values.HardwareFlash },
      { id: 'Ethernet', value: values.Ethernet },
      { id: 'VideoOutput', value: values.VideoOutput },
      { id: 'Compression', value: values.Compression },
      { id: 'MaxFrameRate', value: values.MaxFrameRate },
      { id: 'BitrateControl', value: values.BitrateControl },
      { id: 'AudioCompression', value: values.AudioCompression },
      { id: 'AudioInterface', value: values.AudioInterface },
      { id: 'Event', value: values.Event },
      { id: 'EventOutput', value: values.EventOutput },
      { id: 'Recording', value: values.Recording },
      { id: 'Client', value: values.Client },
      { id: 'NetworkProtocol', value: values.NetworkProtocol },
      { id: 'SmartFunction', value: values.SmartFunction },
      { id: 'WiFi', value: values.WiFi },
      { id: 'Compatibility', value: values.Compatibility },
      { id: 'OperatingTemp', value: values.OperatingTemp },
      { id: 'Weight', value: values.Weight },
      { id: 'Dimension', value: values.Dimension },
      { id: 'PowerSupply', value: values.PowerSupply },
      { id: 'PowerConsumption', value: values.PowerConsumption }
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
Ext.define('prada.page.views.AHDBox.SearchBar', {
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
