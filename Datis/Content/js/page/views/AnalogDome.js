Ext.define('prada.page.views.AnalogDome', {
    extend: 'hussein.grid.Panel',
    requires: ['prada.page.models.AnalogDome'],
    title: 'مدیریت Analog Dome Camera',
    forceFit: true,
    searchbar: 'prada.page.views.AnalogDome.SearchBar',
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
                        tableId: 2,
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
                        tableId: 2,
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
                    items: Ext.create('prada.page.views.AnalogDomeForm', {
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
                                    url: 'AnalogDomeAdmin/Delete/' + record.data.Id,
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

    model: 'prada.page.models.AnalogDome',
    readUrl: 'AnalogDomeAdmin/AjaxRead',
    tbar: [{
        iconCls: 'icon-Add',
        text: 'جدید',
        handler: function (item, e) {
            Ext.create('Ext.window.Window', {
                title: 'ویرایش کالا',
                height: '100%',
                width: '100%',
                layout: 'fit',
                modal: true,
                constrain: true,
                items: Ext.create('prada.page.views.AnalogDomeForm', {
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

Ext.define('prada.page.views.AnalogDomeForm', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'AnalogDomeAdmin/Save',
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
            columnWidth: 0.81
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
        }, {
            xtype: 'textfield',
            fieldLabel: 'Image Sensor',
            name: 'ImageSensor'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Efective Pixels',
            name: 'EfectivePixels'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Horizontal Resolution',
            name: 'HorizontalResolution'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Electronic Shutter',
            name: 'ElectronicShutter'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Synchronization',
            name: 'Synchronization'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Minimum Illumination',
            name: 'MinIllumination'
        }, {
            xtype: 'textfield',
            fieldLabel: 'S/N Ratio',
            name: 'SNRatio'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Video Output',
            name: 'VideoOutput'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Day Night',
            name: 'DayNight'
        }, {
            xtype: 'textfield',
            fieldLabel: 'OSD',
            name: 'OSD'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Backlight Compensation',
            name: 'BacklightCompensation'
        }, {
            xtype: 'textfield',
            fieldLabel: 'White Balance',
            name: 'WhiteBalance'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Gain Control',
            name: 'GainControl'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Noise Reduction',
            name: 'NoiseReduction'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Privacy Masking',
            name: 'PrivacyMasking'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Picture Adjustment',
            name: 'PictureAdjustment'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Digital Zoom',
            name: 'DigitalZoom'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Focal Length',
            name: 'FocalLength'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Focus Type',
            name: 'FocusType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Lens Type',
            name: 'LensType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Mount Type',
            name: 'MountType'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Power Supply',
            name: 'PowerSupply'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Power Consumption',
            name: 'PowerConsumption'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Working Environment',
            name: 'WorkingEnvironment'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Dimensions',
            name: 'Dimensions'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Weight',
            name: 'Weight'
        }, {
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
                { id: 'Id'                             , value: values.Id },
                { id: 'Name'                           , value: values.Name },
                { id: 'Model'                          , value: values.Model },
                { id: 'Overview'                       , value: values.Overview },
                { id: 'Description'                    , value: values.Description },
                { id: 'Price'                          , value: values.Price },
                { id: 'ShowPrice'                      , value: values.ShowPrice },
                { id: 'ImageSensor', value: values.ImageSensor },
                { id: 'EfectivePixels', value: values.EfectivePixels },
                { id: 'HorizontalResolution', value: values.HorizontalResolution },
                { id: 'ElectronicShutter', value: values.ElectronicShutter },
                { id: 'Synchronization', value: values.Synchronization },
                { id: 'MinIllumination', value: values.MinIllumination },
                { id: 'SNRatio', value: values.SNRatio },
                { id: 'VideoOutput', value: values.VideoOutput },
                { id: 'DayNight', value: values.DayNight },
                { id: 'OSD', value: values.OSD },
                { id: 'BacklightCompensation', value: values.BacklightCompensation },
                { id: 'WhiteBalance', value: values.WhiteBalance },
                { id: 'GainControl', value: values.GainControl },
                { id: 'NoiseReduction', value: values.NoiseReduction },
                { id: 'PrivacyMasking', value: values.PrivacyMasking },
                { id: 'PictureAdjustment', value: values.PictureAdjustment },
                { id: 'DigitalZoom', value: values.DigitalZoom },
                { id: 'FocalLength', value: values.FocalLength },
                { id: 'FocusType', value: values.FocusType },
                { id: 'LensType', value: values.LensType },
                { id: 'MountType', value: values.MountType },
                { id: 'PowerSupply', value: values.PowerSupply },
                { id: 'PowerConsumption', value: values.PowerConsumption },
                { id: 'WorkingEnvironment', value: values.WorkingEnvironment },
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
Ext.define('prada.page.views.AnalogDome.SearchBar', {
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








