Ext.onReady(function () {
    Ext.create('Ext.window.Window', {
        hidden: false, renderTo: Ext.getBody(), width: 700,
        items: [{
            border: false,
            rtl: true,
            width: 300,
            xtype: 'form',
            defaultAnchor: '100%',
            items: [{
                xtype: 'hiddenfield',
                name: 'Id', value: '0'
            },
                {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'fieldcontainer',
                        anchor: '100%',
                        items: [{
                            xtype: 'textfield', flex: 1, fieldLabel: 'عنوان', name: 'Title', allowBlank: false,
                            blankText: 'وارد نمودن "عنوان" الزامی است'
                        }, {
                            xtype: 'numberfield', flex: 1, fieldLabel: 'مساحت', name: 'Area', value: 0.0,
                            allowBlank: false, blankText: 'وارد نمودن "مساحت" الزامی است',
                            decimalSeparator: '.', minValue: 0.0
                        }],
                        layout: 'hbox'
                    }, {
                        xtype: 'fieldcontainer', anchor: '100%',
                        items: [{
                            xtype: 'combobox',
                            flex: 1,
                            fieldLabel: 'کانال',
                            name: 'Channels',
                            allowBlank: false,
                            blankText: 'انتخاب "کانال" الزامی است', multiSelect: true,
                            queryMode: 'local',
                            store: [['1', 'B1'], ['2', 'P1'], ['3', 'P2'], ['4', 'SC01-2'], ['5', 'SC01-3'], ['6', 'SC01-4'], ['7', 'SC03'], ['8', 'SC05'], ['9', 'SC07'], ['10', 'SC09'], ['11', 'SC11'], ['12', 'SC13'], ['13', 'SC15'], ['14', 'SC17'], ['15', 'SC19'], ['16', 'SC21'], ['17', 'SC23'], ['18', 'SC25'], ['19', 'SC27'], ['20', 'ZT']]
                        },
                            {
                                xtype: 'hiddenfield',
                                name: 'ChartId',
                                value: '0'
                            },
                            {
                                xtype: 'netdropdown',
                                anchor: '50%',
                                flex: 1,
                                fieldLabel: 'چارت سازمانی',
                                name: 'OrganizationChartTitle',
                                submitValue: false,
                                editable: false,
                                triggerCls: Ext.form.field.Trigger.getIcon('Search'),
                                component: {
                                    store: {
                                        type: 'tree',
                                        proxy: {
                                            type: 'ajax',
                                            url: '/Basics/OrganizationChart/GetOrganizationNode'
                                        }
                                    },
                                    height: 200, xtype: 'treepanel',
                                    autoScroll: true,
                                    title: 'چارت',
                                    scroll: 'vertical',
                                    root: { text: 'Root' },
                                    rootVisible: false,
                                    listeners: {
                                        itemclick: {
                                            fn: function (item, record, node, index, e) {
                                                this.dropDownField.up('form').query('hiddenfield[name=ChartId]')[0].setValue(record.data.id);
                                                this.dropDownField.setValue(record.data.text, true);
                                            }
                                        }
                                    }
                                }
                            }
                        ],
                        layout: 'hbox'
                    },
                        {
                            xtype: 'textareafield', anchor: '100%', flex: 1, fieldLabel: 'شرح',
                            name: 'Description', allowBlank: false
                        }],
                    collapsible: true, title: 'اطلاعات عمومی'
                },
                {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'fieldcontainer',
                        anchor: '100%',
                        items: [{
                            xtype: 'combobox',
                            flex: 1,
                            fieldLabel: 'واریته',
                            name: 'Varietes',
                            allowBlank: false,
                            multiSelect: true,
                            queryMode: 'local',
                            store: [['1', 'CP48'], ['2', 'CP57'], ['3', 'CP69'], ['4', 'CP70'], ['5', 'CP73'], ['6', 'IRC-99-01'], ['7', 'IRC-99-02'], ['8', 'کشت نشده']]
                        },
                            {
                                xtype: 'combobox',
                                flex: 1, fieldLabel: 'وضعیت', name: 'FarmStatus',
                                allowBlank: false,
                                queryMode: 'local',
                                store: [['1', 'کاشت'], ['2', 'داشت'], ['3', 'آیش'], ['4', 'تهیه زمین کاشت'], ['5', 'تهیه زمین داشت'], ['6', 'تهیه زمین آیش']]
                            }
                        ],
                        layout: 'hbox'
                    },
                    {
                        xtype: 'fieldcontainer', anchor: '100%', items: [
                            {
                                xtype: 'combobox', flex: 1, fieldLabel: 'نوع سن مزرعه', name: 'FarmAgeType', allowBlank: false,
                                selectedItems: [{ value: 0 }], queryMode: 'local', store: [['1', 'Ratton'], ['2', 'New Plant'], ['3', 'Plant'], ['4', 'کشت نشده']]
                            }, { xtype: 'numberfield', flex: 1, fieldLabel: 'سن مزرعه', name: 'FarmAgeValue', decimalSeparator: '.', minValue: 0.0 }], layout: 'hbox'
                    }],
                    collapsible: true,
                    title: 'اطلاعات سالیانه'
                }],
            bodyPadding: 5,
            buttons: [{
                text: 'ذخیره',
                listeners: {
                    click: {
                        fn: function (item, e) {
                            this.up('form').submit({
                                success: function (form, action) {
                                    form.owner.up('window').close();
                                    Ext.net.Bus.publish('App.reloadGrid');
                                }
                            });
                        }
                    }
                }
            }], url: '/Basics/Farm/Save'
        }], layout: 'fit', title: 'مزرعه', constrain: true, modal: true
    });
});