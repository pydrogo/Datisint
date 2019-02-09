
//Global Utils
Ext.define('bs.util.Util', {
    singleton: true,
    menuClick: function (itemId) {
        var btn = Ext.ComponentQuery.query('topheader container container button[itemId=systemModule] menu')[0];
        btn.fireEvent('click', btn, btn.down('[itemId=' + itemId + ']'), Ext.EventObject);
    }
});


bs.util.Util.required = hussein.util.Util.required; // TODO: Temporary Until Repair All Previous Code.
bs.util.Util.addTab = hussein.util.Util.addTab; // TODO: Temporary Until Repair All Previous Code.


//Renderer
Ext.namespace('bs.renderer');

bs.renderer.approvalRenderer = function(value) {
    if (value == true)
        return '<img src="Content/images/icon/check.png" title="تائید شده">';
    else if (value == false)
        return '<img src="Content/images/icon/notaccept.png" title="تائید نشده">';
    return '<img src="Content/images/icon/warning.png" title="در انتظار تائید">';
};

bs.renderer.doneRenderer = function(value) {
    if (value == true)
        return '<img src="Content/images/icon/check_blue.png" title="انجام شده">';
    return '';
};

Ext.define('bs.util.ComboCoupleBox', {
    extend: Ext.form.FieldContainer,
    mixins: { field: 'Ext.form.field.Field' },
    alias: 'widget.combocouplebox',
    config: {
        displayField: 'Title',
        codeField: 'Code',
        valueField: 'Id'
    },
    layout:'hbox',
    items: [{
        xtype: 'textfield',
        flex: 1,
        listeners: {
            change: function (field, newValue, oldValue, eOpts) {
                var comboEl = this.ownerCt.comboEl;
                comboEl.doQuery(newValue, true, false) ;
            }
        }
    }, {
        xtype: 'splitter'
    }, {
        xtype: 'combobox',
        flex: 4,
        displayField: 'Title',
        valueField: 'Id',
        queryMode: 'local',
        triggerAction: 'query',
        typeAhead: true,
        anyMatch: true,
        forceSelection: true,
        store: {
            fields: ['Id', 'Title'],
            autoLoad: false,
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'data'
                },
                url: ''
            }
        }
    }],
    comboEl:null,
    constructor: function (config) {
        this.items[2].store.proxy.url = config.url;
        this.callParent(arguments);
        this.comboEl = this.down('combobox');
        this.comboEl.store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (this.getValue() == 0)
                    this.setValue(null);
            }
        });
    },
    getValue: function () {
        return this.comboEl.getValue();
    },
    setValue: function (value) {
        this.comboEl.setValue(value);
    },
    getSubmitValue: function () {
        return this.comboEl.getValue();
    },
    findRecordByCode: function (value) {
        return this.findRecord(this.displayField, value);
    }
});

//Custom Component Lookup
Ext.define('bs.util.lookup.Constructor', {
    extend: Ext.form.field.Picker,
    alias: 'widget.constructorlookup',
    editable: false,
    matchFieldWidth: false,
    trigger1Cls: 'x-form-clear-trigger',
    trigger2Cls: 'x-form-search-trigger',
    valueText: '',
    valueId: '0',
    setValue: function (value) {
        var me = this;
        me.callParent(arguments);

        if (value == 0)
            value = null;
        me.valueId = value;
        me.setRawValue(me.valueToRaw(me.valueText || value));

        return me;
    },
    getValue: function () {
        this.callParent(arguments);
        return this.valueId;
    },
    getSubmitValue: function () {
        return this.valueId;
    },
    createTab1: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            //model: me.model,
            fields:['Id','Name', 'Family'],
            autoLoad: true,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                url: '/Basics/Employee/Lookup'
            }
        });

        return Ext.create('Ext.grid.Panel', {
            title:'فرد',
            border: false,
            defaults: { sortable: true },
            viewConfig: {
                stripeRows: true
            },
            forceFit: true,
            columns: [
                { xtype: 'rownumberer' },
                { text: 'نام', dataIndex: 'Name', flex: 1 },
                { text: 'نام خانوادگی', dataIndex: 'Family', flex: 1 }
                //{
                //    text: 'عنوان',
                //    dataIndex: 'Title',
                //    flex: 1
                //}
            ],
            store: store,
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: store,
                pageSize: 10
            },
            listeners: {
                'itemdblclick': function (view, record, item, index, e, eOpts) {
                    me.valueId = record.data['Id'];
                    me.valueText = record.data['Name'] + record.data['Family'];
                    me.setValue(record.raw['Id']);
                    me.focus();
                    me.fireEvent('lookupchange', me, record);
                    me.collapse();
                }
            }
        });
    },
    createTab2: function () {
        var me = this;
        var store = Ext.create('Ext.data.Store', {
            //model: me.model,
            fields: ['Id', 'Title'],
            autoLoad: true,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                url: '/Basics/Contractor/Lookup'
            }
        });

        return Ext.create('Ext.grid.Panel', {
            title:'شرکت',
            border: false,
            defaults: { sortable: true },
            viewConfig: {
                stripeRows: true
            },
            forceFit: true,
            columns: [
                { xtype: 'rownumberer' },
                {
                    text: 'عنوان',
                    dataIndex: 'Title',
                    flex: 1
                }
            ],
            store: store,
            bbar: {
                xtype: 'pagingtoolbar',
                displayInfo: true,
                store: store,
                pageSize: 10
            },
            listeners: {
                'itemdblclick': function (view, record, item, index, e, eOpts) {
                    me.valueId = record.data['Id'];
                    me.valueText = record.data['Title'];
                    me.setValue(record.raw['Id']);
                    me.focus();
                    me.fireEvent('lookupchange', me, record);
                    me.collapse();
                }
            }
        });
    },
    createPicker: function () {
        var me = this;

        return Ext.create('Ext.window.Window', {
            title: me.title || 'انتخاب  ',
            height: 400,
            width: 400,
            layout: 'fit',
            closable:false,
            items: {
                xtype: 'tabpanel',
                border:false,
                items: [
                    me.createTab1.call(me),
                    me.createTab2.call(me)
                ]
            },
            buttons: [{
                text: 'انتخاب',
                handler: function (field) {
                    return function() {
                        var sel = grid.getSelectionModel().getSelection();
                        if (sel.length > 0) {
                            var rec = sel[0].data;
                            field.valueId = rec['Id'];
                            field.valueText = rec['Title'];
                            field.setValue(rec['Id']);
                        }
                        field.inputEl.focus();
                        field.validate();
                        field.collapse();
                    };
                }(me)
            }]
        });
    },
    onTrigger1Click: function () {
        var me = this;
        me.valueText = '';
        me.setValue('');
        me.valueId = null;
        me.focus();
    }
});

Ext.define('bs.util.GroupingComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: ['widget.groupingcombobox', 'widget.groupingcombo'],
    store: {
        fields: ['Id', 'Title', 'GroupKey', 'GroupName'],
        autoLoad: false,
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'data'
            },
            url: ''
        }
    },
    constructor: function (config) {
        this.store.proxy.url = config.url;
        this.callParent(arguments);
        this.store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (this.getValue() == 0)
                    this.setValue(null);
            }
        });
    },
    listConfig: {
        tpl: Ext.create('Ext.XTemplate',
                '<ul class="x-list-plain" style="margin:5px;"><tpl for=".">',
                '<tpl if="xindex == 1 || this.getGroupStr(parent[xindex - 2]) != this.getGroupStr(values)">',
                '<li class="x-combo-list-group"><b>{[this.getGroupStr(values)]}</b></li>',
                '</tpl>',
                '<li role="option" class="x-boundlist-item" style="margin-right: 15px">{Title}</li>',
                '</tpl>' +
                '</ul>',
                {
                    getGroupStr: function (values) {
                        return values.GroupName;
                    }
                }
        )
    }
});