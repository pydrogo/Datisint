/*
    Hussein Personal ExtJs Framework
    Copyright (c) 2014 Hussein
    Frist Build Date: 2013-12-18 | 1392-09-28 10:30:00
*/

Ext.Ajax.timeout = 300000;

var hussein = hussein || {};

(function () {
    Ext.apply(hussein, {
        version: '0.2',
        description: 'Hussein ExtJs Framework'
    });
})();

//yazdandoost
Ext.define('Ext.ux.CheckCombo',
{
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.checkcombo',
    multiSelect: true,
    allSelector: false,
    noData: false,
    noDataText: 'No combo data',
    addAllSelector: false,
    allSelectorHidden: false,
    enableKeyEvents: true,
    afterExpandCheck: false,
    allText: 'All',
    oldValue: '',
    listeners:
    {
        // uncomment if you want to reload store on every combo expand
                beforequery: function(qe)
                {
                    this.store.removeAll();
                    delete qe.combo.lastQuery;
                },
        
        focus: function (cpt) {
            cpt.oldValue = cpt.getValue();
        },
        keydown: function (cpt, e, eOpts) {
            var value = cpt.getRawValue(),
                oldValue = cpt.oldValue;

            if (value != oldValue) cpt.setValue('');
        }
    },
    createPicker: function () {
        var me = this,
            picker,
            menuCls = Ext.baseCSSPrefix + 'menu',
            opts = Ext.apply(
            {
                pickerField: me,
                selModel:
                {
                    mode: me.multiSelect ? 'SIMPLE' : 'SINGLE'
                },
                floating: true,
                hidden: true,
                ownerCt: me.ownerCt,
                cls: me.el.up('.' + menuCls) ? menuCls : '',
                store: me.store,
                displayField: me.displayField,
                focusOnToFront: false,
                pageSize: me.pageSize,
                tpl:
                [
                    '<ul><tpl for=".">',
                        '<li role="option" class="' + Ext.baseCSSPrefix + 'boundlist-item"><span class="x-combo-checker">&nbsp;</span> {' + me.displayField + '}</li>',
                    '</tpl></ul>'
                ]
            }, me.listConfig, me.defaultListConfig);


        picker = me.picker = Ext.create('Ext.view.BoundList', opts);
        if (me.pageSize) {
            picker.pagingToolbar.on('beforechange', me.onPageChange, me);
        }


        me.mon(picker,
        {
            itemclick: me.onItemClick,
            refresh: me.onListRefresh,
            scope: me
        });


        me.mon(picker.getSelectionModel(),
        {
            'beforeselect': me.onBeforeSelect,
            'beforedeselect': me.onBeforeDeselect,
            'selectionchange': me.onListSelectionChange,
            scope: me
        });


        me.store.on('load', function (store) {
            if (store.getTotalCount() == 0) {
                me.allSelectorHidden = true;
                if (me.allSelector != false) me.allSelector.setStyle('display', 'none');
                if (me.noData != false) me.noData.setStyle('display', 'block');
            }
            else {
                me.allSelectorHidden = false;
                if (me.allSelector != false) me.allSelector.setStyle('display', 'block');
                if (me.noData != false) me.noData.setStyle('display', 'none');
            }
        });


        return picker;
    },
    reset: function () {
        var me = this;


        me.setValue('');
    },
    setValue: function (value) {
        this.value = value;
        if (!value) {
            if (this.allSelector != false) this.allSelector.removeCls('x-boundlist-selected');
            return this.callParent(arguments);
        }


        if (typeof value == 'string') {
            var me = this,
                records = [],
                vals = value.split(',');


            if (value == '') {
                if (me.allSelector != false) me.allSelector.removeCls('x-boundlist-selected');
            }
            else {
                if (vals.length == me.store.getCount() && vals.length != 0) {
                    if (me.allSelector != false) me.allSelector.addCls('x-boundlist-selected');
                    else me.afterExpandCheck = true;
                }
            }


            Ext.each(vals, function (val) {
                var record = me.store.getById(parseInt(val));
                if (record) records.push(record);
            });


            return me.setValue(records);
        }
        else return this.callParent(arguments);
    },
    getValue: function () {
        if (typeof this.value == 'object') return this.value.join(',');
        else return this.value;
    },
    getSubmitValue: function () {
        return this.getValue();
    },
    expand: function () {
        var me = this,
            bodyEl, picker, collapseIf;


        if (me.rendered && !me.isExpanded && !me.isDestroyed) {
            bodyEl = me.bodyEl;
            picker = me.getPicker();
            collapseIf = me.collapseIf;


            // show the picker and set isExpanded flag
            picker.show();
            me.isExpanded = true;
            me.alignPicker();
            bodyEl.addCls(me.openCls);


            if (me.noData == false) me.noData = picker.getEl().down('.x-boundlist-list-ct').insertHtml('beforeBegin', '<div class="x-boundlist-item" role="option">' + me.noDataText + '</div>', true);


            if (me.addAllSelector == true && me.allSelector == false) {
                me.allSelector = picker.getEl().down('.x-boundlist-list-ct').insertHtml('beforeBegin', '<div class="x-boundlist-item" role="option"><span class="x-combo-checker">&nbsp;</span> ' + me.allText + '</div>', true);
                me.allSelector.on('click', function (e) {
                    if (me.allSelector.hasCls('x-boundlist-selected')) {
                        me.allSelector.removeCls('x-boundlist-selected');
                        me.setValue('');
                        me.fireEvent('select', me, []);
                    }
                    else {
                        var records = [];
                        me.store.each(function (record) {
                            records.push(record);
                        });
                        me.allSelector.addCls('x-boundlist-selected');
                        me.select(records);
                        me.fireEvent('select', me, records);
                    }
                });


                if (me.allSelectorHidden == true) me.allSelector.hide();
                else me.allSelector.show();

                if (me.afterExpandCheck == true) {
                    me.allSelector.addCls('x-boundlist-selected');
                    me.afterExpandCheck = false;
                }
            }


            // monitor clicking and mousewheel
            me.mon(Ext.getDoc(),
            {
                mousewheel: collapseIf,
                mousedown: collapseIf,
                scope: me
            });
            Ext.EventManager.onWindowResize(me.alignPicker, me);
            me.fireEvent('expand', me);
            me.onExpand();
        }
        else {
            me.fireEvent('expand', me);
            me.onExpand();
        }
    },
    alignPicker: function () {
        var me = this,
            picker = me.getPicker();


        me.callParent();

        if (me.addAllSelector == true) {
            var height = picker.getHeight();
            height = parseInt(height) + 20;
            picker.setHeight(height);
            picker.getEl().setStyle('height', height + 'px');
        }
    },
    onListSelectionChange: function (list, selectedRecords) {
        var me = this,
            isMulti = me.multiSelect,
            hasRecords = selectedRecords.length > 0;
        // Only react to selection if it is not called from setValue, and if our list is
        // expanded (ignores changes to the selection model triggered elsewhere)
        if (!me.ignoreSelection && me.isExpanded) {
            if (!isMulti) {
                Ext.defer(me.collapse, 1, me);
            }
            /*
            * Only set the value here if we're in multi selection mode or we have
            * a selection. Otherwise setValue will be called with an empty value
            * which will cause the change event to fire twice.
            */
            if (isMulti || hasRecords) {
                me.setValue(selectedRecords, false);
            }
            if (hasRecords) {
                me.fireEvent('select', me, selectedRecords);
            }
            me.inputEl.focus();


            if (me.addAllSelector == true && me.allSelector != false) {
                if (selectedRecords.length == me.store.getTotalCount()) me.allSelector.addCls('x-boundlist-selected');
                else me.allSelector.removeCls('x-boundlist-selected');
            }
        }
    }
});




Ext.define('hussein.util.Util', {
    singleton: true,

    //Usage : afterLabelTextTpl: hussein.util.Util.required
    required: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>',

    /*
    * Show Message in jump panel.
    * Usage: jump(title,msg);
    */
    jump: function () {
        var msgCt;

        function createBox(t, s) {
            return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
        }
        return {
            msg: function (title, format) {
                if (!msgCt) {
                    msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
                }
                var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
                m.hide();
                m.slideIn('t').ghost("t", { delay: 1000, remove: true });
            },

            init: function () {
                if (!msgCt) {
                    msgCt = Ext.DomHelper.insertFirst(document.body, { id: 'msg-div' }, true);
                }
            }
        };
    }(),
    /*
    * Show Modal.
    * Usage: showModal(compenent, config);
    */
    showModal: function (viewclass, config) {
        if (arguments.length == 0) {
            console.log('class or view is required.');
            return false;
        }

        var vw;

        if (typeof (arguments[0]) === 'object') {
            vw = arguments[0];
        } else {
            if (viewclass.length <= 0)
                viewclass = 'Ext.panel.Panel';

            if (config)
                vw = Ext.create(viewclass, config);
            else
                vw = Ext.create(viewclass);
        }

        var title = vw.title;
        var icon = vw.iconCls;
        vw.title = '';
        vw.iconCls = '';

        Ext.create('Ext.window.Window', {
            title: title,
            height: vw.height ? vw.height : 500,
            width: vw.width ? vw.width : 700,
            layout: 'fit',
            items: vw,
            iconCls: icon,
            modal: true,
            listeners: {
                close: config.callback || Ext.emptyFn
            }
        }).show(true);

        return true;
    },
    /*
    * Alert Message.
    * Usage: alert(msg);
    *        alert(title, msg);
    *        alert({title:'',msg:''});
    */
    alert: function () {
        if (arguments.length == 1 && typeof arguments[0] === 'object') {
            Ext.MessageBox.show(arguments[0]);
            return;
        } else {
            if (arguments.length == 1 && typeof arguments[0] === 'string') {
                Ext.Msg.alert('hussein-core', arguments[0]);
                return;
            }
            if (arguments.length == 2 && typeof arguments[0] === 'string' && typeof arguments[1] === 'string') {
                Ext.Msg.alert(arguments[0], arguments[1]);
                return;
            }
        }
        throw 'alert -> Error in arguments.';
    },
    /*
    * Alert Exception MessageBox
    * usage :excepAlert(msg);
    */
    exceptionAlert: function (msg) {
        Ext.Msg.show({
            title: 'خطا رخ داده است',
            msg: msg,
            buttons: Ext.Msg.OK,
            bodyPadding: 20,
            icon: Ext.Msg.ERROR
        });
    },

    addTab: function (id, viewPanel, callback) {
        var cPanel = Ext.ComponentQuery.query('contentpanel')[0];
        var tab = cPanel.down('#tab-' + id);

        if (tab) {
            cPanel.remove(tab);
        }

        viewPanel.closable = true;
        viewPanel.id = 'tab-' + id;
        viewPanel.on({ close: callback || Ext.emptyFn, destroy: callback || Ext.emptyFn });

        tab = cPanel.add(viewPanel);
        cPanel.setActiveTab(tab);

    },

    removeTab: function (id) {
        var cPanel = Ext.ComponentQuery.query('contentpanel')[0];
        var tab = null;
        if (id) tab = cPanel.down('#tab-' + id);
        else tab = cPanel.getActiveTab();
        if (tab) {
            cPanel.remove(tab);
        }
    },

    comboFocus: function (combo) {
        //if (combo.getValue() == 0)
        //    combo.setValue(null);

        if (combo.getValue() == null) {
            var selectedRecord = combo.store.findRecord('Selected', true);
            if (selectedRecord) {
                combo.setValue(selectedRecord);
            }
        }
    }
});

(function () {
    Ext.BLANK_IMAGE_URL = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
    Ext.Ajax.defaultHeaders = { 'Powered-By': 'Ext' };

    window['jump'] = hussein.util.Util.jump.msg;
    window['alert'] = hussein.util.Util.alert;
    window['showModal'] = hussein.util.Util.showModal;
    window['excepAlert'] = hussein.util.Util.exceptionAlert;

    document.write('<link rel="stylesheet" type="text/css" href="content/hussein/hussein-all.css"/>');
})();


Ext.onReady(function () {

    // Override Fields for Requierd Star
    Ext.override(Ext.form.field.Text, {
        initComponent: function (config) {
            if (this.allowBlank === false)
                this.afterLabelTextTpl = hussein.util.Util.required;
            this.callParent();
        }
    });

    Ext.override(Ext.form.field.ComboBox, {
        initComponent: function (config) {
            if (this.allowBlank === false)
                this.afterLabelTextTpl = hussein.util.Util.required;
            this.callParent();
        }
    });
});

Ext.define('hussein.grid.Panel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.husseingrid',
    config: {
        model: null,
        readUrl: null,
        batchSaveUrl: null,
        autoLoadStore: true,
        addPagingtoolbar: true,
        showSearchbar: false,
        useFilters: true,
        storeConfig: {}
    },
    selModel: {
        type: 'rowmodel',
        mode: "MULTI"
    },
    constructor: function (config) {
        if (!this.store)
            this.store = Ext.create('Ext.data.Store', Ext.apply({
                autoLoad: this.autoLoadStore,
                remoteSort: true,
                pageSize: 20,
                model: this.model,
                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json',
                        root: 'data',
                        totalProperty: 'total'
                    },
                    url: config.readUrl || this.readUrl,
                    limitParam: this.addPagingtoolbar ? 'limit' : undefined,
                    startParam: this.addPagingtoolbar ? 'start' : undefined,
                    pageParam: this.addPagingtoolbar ? 'page' : undefined,
                    listeners: {
                        exception: function (proxy, response, operation, eOpts) {
                            if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                                window.location = '/Account/Login';
                            if (response.responseText.indexOf('{') == 0) {
                                var res = Ext.decode(response.responseText);
                                if (res.success == false) {
                                    alert(res.message);
                                }
                            }
                        }
                    }
                }
            },
                this.storeConfig));

        if (this.addPagingtoolbar) {
            this.bbar = {
                plugins: [Ext.create('Ext.ux.ProgressBarPager', {})],
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: this.store || config.store,
                items: [
                    {
                        width: 5,
                        xtype: 'tbspacer'
                    },
                    {
                        xtype: 'label',
                        text: 'تعداد رکوردهای صفحه :'
                    },
                    {
                        width: 8,
                        xtype: 'tbspacer'
                    },
                    {
                        width: 120,
                        xtype: 'combobox',
                        editable: false,
                        selectedItems: [{ text: '20', value: '20' }],
                        queryMode: 'local',
                        store: [['10', '10'], ['15', '15'], ['20', '20'], ['50', '50']],
                        listeners: {
                            select: function (item, records) {
                                var store = item.up('pagingtoolbar').getStore();
                                store.pageSize = parseInt(item.getValue(), 10);
                                store.load({ page: 1, start: 0 });
                            }
                        }
                    }
                ],
                displayInfo: true
            };
        }

        if (!this.plugins)
            this.plugins = [];

        if (this.batchSaveUrl) {
            var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {});
            this.plugins.push(cellEditing);
            this.relayEvents(cellEditing, ['beforestartedit', 'canceledit', 'startedit', 'beforecomplete', 'complete']);

            this.plugins.push(Ext.create('hussein.grid.plugin.Validation', {}));
        }

        if ((this.showSearchbar || this.searchbar) && !Ext.Array.findBy(this.plugins, function (item, index) {
            if (item.ptype == 'gridsearchbar')
                return item;
            return null;
        }))
            this.plugins.push(Ext.create('hussein.grid.plugin.Searchbar', {}));

        this.callParent(arguments);
        //Configure Listeners
        this.on({
            itemdblclick: this.onItemdblclick,
            scope: this
        });
    },
    onItemdblclick: function (view, record, item, rowIdx, e, eOpts) {
        var grid = view.ownerCt;
        var updateColumn = grid.down('updatecolumn');

        if (updateColumn && !updateColumn.isDisabled(view, rowIdx, 0, item, record))
            updateColumn.handler.call(updateColumn, grid, rowIdx, 0, null, e, record, item);
    },
    destroy: function () {
        this.callParent(arguments);
        if (this.plugins)
            Ext.each(this.plugins, function (p) {
                p.destroy();
            });
        this.plugins = [];
    }
});

Ext.define('hussein.grid.plugin.Validation', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridvalidation',

    init: function (grid) {
        var me = this;
        me.grid = grid;
        me.view = grid.view;

        me.grid.validate = function () {
            var grid = me.grid;
            var rows = grid.store.data.length;
            var cols = grid.columns.length;
            var result = true;

            for (var row = 0; row < rows; row++) {
                var record = grid.store.getAt(row);
                for (var col = 0; col < cols; col++) {

                    var editor = grid.getView().editingPlugin.getEditor(record, grid.columns[col]);
                    if (editor) {
                        var columnName = grid.columns[col].dataIndex;
                        var columnValue = record.data[columnName];

                        editor.field.setValue(columnValue);
                        var cell = grid.view.getCellByPosition({ row: row, column: grid.getSelectionModel().$className == "Ext.selection.CheckboxModel" ? col + 1 : col });
                        cell.removeCls("x-form-invalid-field");
                        cell.set({ 'data-errorqtip': '' });
                        if (!editor.field.isValid()) {
                            cell.addCls('x-form-invalid-field');
                            cell.set({ 'data-errorqtip': editor.field.getErrors().join(',') });
                            result = false;
                        }
                    }
                }
            }

            return result;
        };
    },
    constructor: function () {
        var me = this;
        me.callParent(arguments);
    }
});

Ext.define('hussein.grid.plugin.Searchbar', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridsearchbar',
    init: function (grid) {
        var me = this;

        me.grid = grid;
        me.view = grid.view;

        var item = grid.searchbar ? Ext.create(grid.searchbar, { bodyPadding: 5, border: false, region: 'center', autoScroll: true }) : { autoScroll: true, border: false, region: 'center' };

        var height = item.height ? (item.height < 70 ? 70 : item.height) : 120;

        var topToolbar = grid.down('toolbar[dock=top]');

        me.dockedPanel = grid.addDocked({
            xtype: 'panel',
            itemId: 'searchbar-panel',
            docked: 'top',
            border: false,
            height: height,
            hidden: !!topToolbar,
            layout: 'border',
            resizable: { handles: 's' },
            style: 'border-top:1px solid #99BCE8;',
            items: [{
                region: 'east',
                width: 100,
                border: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    padding: 10
                },
                items: [{
                    xtype: 'button',
                    text: 'جستجو',
                    iconCls: 'icon-Magnifier',
                    width: 80,
                    handler: function () {
                        var panel = this.up('[itemId=searchbar-panel]');
                        panel.doSearch();
                    }
                }, {
                    xtype: 'button',
                    text: 'پاک کن',
                    iconCls: 'icon-Cross',
                    margin: '5px 0 0 0',
                    width: 80,
                    handler: function () {
                        var formPanel = this.up('[itemId=searchbar-panel]').down('form');
                        if (formPanel) {
                            var form = formPanel.getForm();

                            //TODO : Found best solution & remove this temporary code.
                            var agriculturalYear = form.findField('AgricultureYearId');
                            var agriculturalYearValue = null;
                            if (agriculturalYear) agriculturalYearValue = agriculturalYear.value;
                            var organizationChart = form.findField('OrganizationChartCode');
                            var organizationChartValue = null;
                            if (organizationChart) organizationChartValue = organizationChart.value;
                            //------------

                            form.reset();

                            //TODO : Found best solution & remove this temporary code.
                            if (agriculturalYear)
                                form.setValues([{ id: 'AgricultureYearId', value: agriculturalYearValue }]);
                            if (organizationChart)
                                form.setValues([{ id: 'OrganizationChartCode', value: organizationChartValue }]);
                            //------------

                            var store = this.up('grid').store;
                            store.getProxy().extraParams = {};
                        }
                    }
                }]
            }, item],
            listeners: {
                afterRender: function (panel) {
                    var flds = panel.query('field');
                    Ext.each(flds, function (fld) {
                        fld.addListener('specialkey', function (field, e) {
                            if (e.getKey() == e.ENTER) {
                                panel.doSearch();
                            }
                        });
                    });
                }
            },
            doSearch: function () {
                var form = this.down('form');//this.up('[itemId=searchbar-panel]').down('form');
                if (form) {
                    var store = this.up('grid').store;
                    var values = form.getForm().getValues();
                    var filters = [];
                    for (p in values) {
                        if (values[p] != null && values[p].toString().length > 0) {
                            if (typeof (values[p]) === 'string' && values[p].length <= 0)
                                continue;

                            var name = p;
                            var value = values[p];
                            var type = 'string';
                            var field = form.getForm().findField(p);
                            switch (field.xtype) {
                                case 'textfield':
                                    type = 'string';
                                    break;
                                case 'numberfield':
                                    type = 'numeric';//field.allowDecimals ? 'float' : 'int';
                                    break;
                                case 'sccombo':
                                    type = field.multiSelect ? 'string' : 'numeric';//'int';
                                    if (Ext.isArray(value)) {
                                        value = value.join(',');
                                    }
                                    break;
                                case 'pdatefield':
                                    type = 'date';
                                    break;
                            }

                            filters.push({
                                field: name,
                                value: value,
                                type: type,
                                comparison: 'eq'
                            });
                        }
                    }
                    if (this.up('grid').readUrl.indexOf('?') != -1) {
                        store.getProxy().url = this.up('grid').readUrl + "&" + form.getValues(true, true);
                    } else {
                        store.getProxy().url = this.up('grid').readUrl + "?" + form.getValues(true, true);//.extraParams = Ext.encode(values);
                    }
                    if (grid.useFilters == true) store.getProxy().setExtraParam('filter', Ext.encode(filters));
                    store.load();
                }
            }
        }, 2);

        if (topToolbar)
            me.buttons = topToolbar.add('->', '-', {
                iconCls: 'icon-expand',
                itemId: 'search-expander',
                tooltip: 'نمایش و عدم نمایش پنل جستجو',
                handler: function () {
                    var sp = grid.down('[itemId=searchbar-panel]');
                    if (this.iconCls == 'icon-expand') {
                        sp.show(true);
                        this.setIconCls('icon-collapse');
                    } else {
                        sp.hide(true);
                        this.setIconCls('icon-expand');
                    }
                }
            });
    },
    constructor: function () {
        var me = this;
        me.callParent(arguments);
    },
    destroy: function () {
        var me = this;
        if (me.dockedPanel && me.dockedPanel.length > 0)
            me.dockedPanel[0].destroy();
        if (me.buttons)
            Ext.each(me.buttons, function (b) {
                b.destroy();
            });
    }
});

Ext.define('hussein.grid.TreePanel', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.husseintreegrid',

    useArrows: true,
    config: {
        model: null,
        readUrl: null,
        batchSaveUrl: null,
        autoLoadStore: true
    },
    selModel: {
        type: 'rowmodel',
        mode: "MULTI"
    },
    root: {
        expanded: true,
        text: 'ریشه'
    },
    constructor: function (config) {
        if (!this.store)
            this.store = Ext.create('Ext.data.TreeStore', {
                autoLoad: this.autoLoadStore,
                remoteSort: true,
                model: this.model,
                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json'
                    },
                    url: this.readUrl,
                    limitParam: this.addPagingtoolbar ? 'limit' : undefined,
                    startParam: this.addPagingtoolbar ? 'start' : undefined,
                    pageParam: this.addPagingtoolbar ? 'page' : undefined,
                    listeners: {
                        exception: function (proxy, response, operation, eOpts) {
                            if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                                window.location = '/Account/Login';
                        }
                    }
                }
            });

        if (this.batchSaveUrl)
            this.plugins = Ext.create('Ext.grid.plugin.CellEditing', {});

        this.callParent(arguments);
    }
});

Ext.define('hussein.renderer', {
    singleton: true,
    comboRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        debugger;
        var grid = this;
        var combo;

        //var editor = grid.getView().editingPlugin.getEditor(record, grid.columns[colIndex]);
        var editor = grid.getView().getHeaderCt().getHeaderAtIndex(colIndex);
        
        if (editor)
            combo = editor.field;
        if (combo) {
            var comboStore = combo.store,
                rec;
            if (!comboStore.loading && comboStore.data.items.length > 0) {
                if (value != null && value.length > 1 && !Ext.isString(value)) {
                    var text = "";
                    for (i = 0; i < value.length; i++) {
                        rec = comboStore.findRecord(combo.valueField, value[i], 0, false, false, true);
                        text += rec ? rec.get(combo.displayField) + ', ' : '';
                    }
                    if (text.length > 0)
                        text = text.substring(0, text.length - 2);
                    return text;
                } else {
                    rec = comboStore.findRecord(combo.valueField, value, 0, false, false, false);
                    return rec ? rec.get(combo.displayField) : '';
                }
            } else {
                var si = setInterval(function () {
                    if (!comboStore.loading) {
                        clearInterval(si);
                        if (value != null && value.length > 1 && !Ext.isString(value)) {
                            var text = "";
                            for (i = 0; i < value.length; i++) {
                                rec = comboStore.findRecord(combo.valueField, value[i], 0, false, false, true);
                                text += rec ? rec.get(combo.displayField) + ', ' : '';
                            }
                            if (text.length > 0)
                                text = text.substring(0, text.length - 2);
                            grid.getView().getCell(record, grid.columns[colIndex]).dom.firstChild.innerHTML = text;
                        } else {
                            rec = comboStore.findRecord(combo.valueField, value, 0, false, false, false);
                            grid.getView().getCell(record, grid.columns[colIndex]).dom.firstChild.innerHTML = (rec ? rec.get(combo.displayField) : '');
                        }
                        //rec = comboStore.findRecord(combo.valueField, value, 0, false, false, true);
                        //grid.getView().getCell(record, grid.columns[colIndex]).dom.firstChild.innerHTML = (rec ? rec.get(combo.displayField) : '');
                    }
                }, 100);
                return 'بازخوانی...';
            }
        }
        return '';
    },

    dateRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.PDate.format(value, 'd / m / Y');
    },

    datetimeRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.PDate.format(value, 'H:i:s d / m / Y');
    },

    gridLookupRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value.length <= 0 || value == 0)
            return '';

        var grid = this;
        var dataIndex = grid.columns[colIndex].dataIndex;
        var fieldTitle = (dataIndex.substr(dataIndex.length - 2, 2) == 'Id'
            ? dataIndex.substr(0, dataIndex.length - 2)
            : dataIndex) + 'Title';


        var lookup;

        var editor = grid.getView().editingPlugin.getEditor(record, grid.columns[colIndex]);
        if (editor)
            lookup = editor.field;
        if (lookup) {
            if (lookup.valueText) {
                record.data[fieldTitle] = lookup.valueText;
                return lookup.valueText;
            } else if (record.data[fieldTitle] && record.data[fieldTitle].length > 0)
                return record.data[fieldTitle];
            else {
                Ext.Ajax.request({
                    url: lookup.url + Ext.String.format('?{0}={1}', lookup.valueField, value),
                    grid: grid,
                    lookup: lookup,
                    record: record,
                    colIndex: colIndex,
                    success: function (response, eOpts) {
                        var result = Ext.decode(response.responseText);
                        var valueText = '';
                        if (result && result.data.length > 0)
                            valueText = result.data[0][eOpts.lookup.displayField];

                        var cell = eOpts.grid.getView().getCell(eOpts.record, grid.columns[eOpts.colIndex]);
                        var cellEl = cell.dom.firstChild;
                        cellEl.innerHTML = valueText;
                        cell.valueText = valueText;

                        eOpts.record.data[fieldTitle] = lookup.valueText;
                    }
                });
                return 'بازخوانی...';
            }
        }
        return '';
    },

    constructorlookupRenderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if (value.length <= 0 || value == 0)
            return '';

        var grid = this;
        var dataIndex = grid.columns[colIndex].dataIndex;
        var fieldTitle = (dataIndex.substr(dataIndex.length - 2, 2) == 'Id'
            ? dataIndex.substr(0, dataIndex.length - 2)
            : dataIndex) + 'Title';

        var lookup;

        var editor = grid.getView().editingPlugin.getEditor(record, grid.columns[colIndex]);
        if (editor)
            lookup = editor.field;
        if (lookup) {
            if (lookup.valueText) {
                record.data[fieldTitle] = lookup.valueText;
                return lookup.valueText;
            } else if (record.data[fieldTitle] && record.data[fieldTitle].length > 0)
                return record.data[fieldTitle];
            else {
                return 'بازخوانی...';
            }
        }
        return '';
    },

    timeRenderer: function (value, metadata, record, rowIndex, colIndex, store, view) {
        return value != null ? value.substring(0, 5) : value;
    }
});


Ext.define('hussein.grid.button.Add', {
    extend: 'Ext.button.Button',
    alias: 'widget.addbutton',
    iconCls: 'icon-Add',
    text: 'جدید',
    listeners: {
        click: function (item, e) {
            var grid = this.up('grid');
            grid.store.insert(0, {});
            grid.getSelectionModel().selectByPosition({ row: 0, column: 0 });
            if (grid.columns[0].xtype == 'rownumberer') grid.getPlugin().startEditByPosition({ row: 0, column: 1 });
            else grid.getPlugin().startEditByPosition({ row: 0, column: 0 });
        }
    }
});

Ext.define('hussein.grid.button.AddForm', {
    extend: 'Ext.button.Button',
    alias: 'widget.addformbutton',

    iconCls: 'icon-Add',
    text: 'جدید',
    listeners: {
        click: function (item, e) {
            Ext.create('Ext.window.Window', {
                title: 'ثبت...',
                height: 350,
                width: 500,
                layout: 'fit',
                modal: true,
                items: Ext.create('Ext.form.Panel', { title: 'ثبت...' }),
                listeners: {
                    close: function (grid) {
                        return function (w) {
                            if (w.returnValue == 'ok')
                                grid.store.reload();
                        };
                    }(this.up('grid'))
                }
            }).show(true);
        }
    }
});

Ext.define('hussein.grid.button.Save', {
    extend: 'Ext.button.Button',
    alias: 'widget.savebutton',
    iconCls: 'icon-Disk',
    text: 'ذخیره',
    listeners: {
        click: function (item, e) {
            var btn = this;
            btn.setText('در حال ارسال...');
            var grid = item.up('grid');
            var store = grid.getStore();
            if (store.getModifiedRecords().length <= 0 && store.getRemovedRecords().length <= 0) {
                btn.setText('ذخیره');
                return false;
            }

            if (!grid.validate()) {
                jump('اعتبار سنجی', 'اطلاعات وارده معتبر نمی باشند');
                btn.setText('ذخیره');
                return false;
            }

            var saveMask = new Ext.LoadMask(grid, { msg: "در حال ذخیره .." });
            saveMask.show();

            var data = {
                created: store.getNewRecords(),
                updated: store.getUpdatedRecords(),
                deleted: store.getRemovedRecords()
            };

            var i;
            for (i = 0; i < data.created.length; i++)
                data.created[i] = data.created[i].data;
            for (i = 0; i < data.updated.length; i++)
                data.updated[i] = data.updated[i].data;
            for (i = 0; i < data.deleted.length; i++)
                data.deleted[i] = data.deleted[i].data;

            Ext.Ajax.request({
                url: grid.batchSaveUrl || '',
                grid: grid,
                store: store,
                btn: btn,
                mask: saveMask,
                timeout: 5000000,
                success: function (response, opts) {
                    var result = Ext.decode(response.responseText).result;
                    opts.btn.setText('ذخیره');
                    //var result = Ext.decode(response.responseText);
                    if (result == undefined) {
                        result = Ext.decode(response.responseText);
                        if (result.success == true) {
                            jump('', result.message);
                            //opts.store.commitChanges();
                            opts.store.reload();
                        } else {
                            jump('', 'ذخیره اطلاعات با مشکل مواجه گردید');
                            Ext.Msg.alert('', result.message);
                        }
                    } else {
                        if (result.Success == true || result.success == true) {
                            jump('', 'ذخیره اطلاعات با موفقیت انجام شد.');
                            opts.store.reload();
                            //opts.store.commitChanges();
                        } else {
                            jump('', 'ذخیره اطلاعات با مشکل مواجه گردید');
                            Ext.Msg.alert('', result.message);
                        }
                    }
                    opts.mask.hide();
                },
                failure: function (response, opts) {
                    opts.btn.setText('ذخیره');
                    //console.log('خطایی با کد مقابل رخ داده است: ' + response.status);
                    Ext.Msg.alert('', result.message);
                },
                jsonData: data
            });
            return true;
        }
    }
});

Ext.define('hussein.grid.button.Reject', {
    extend: 'Ext.button.Button',
    alias: 'widget.rejectbutton',
    iconCls: 'icon-ArrowUndo',
    text: 'انصراف از تغییرات',
    listeners: {
        click: function (item, e) {
            item.up('grid').getStore().rejectChanges();
        }
    }
});

Ext.define('hussein.grid.button.Delete', {
    extend: 'Ext.button.Button',
    alias: 'widget.deletebutton',
    iconCls: 'icon-Delete',
    text: 'حذف',
    listeners: {
        click: function (item, e) {
            var grid = item.up('grid');
            var rec = grid.getSelectionModel().getSelection();
            grid.getStore().remove(rec);
        }
    }
});

Ext.define('hussein.grid.button.Report', {
    extend: 'Ext.button.Button',
    alias: 'widget.reportbutton',
    iconCls: 'icon-Find',
    text: 'اجرای گزارش',
    listeners: {
        click: function (item, e) {
            var form = this.up('form');
            if (form.isValid()) {
                window.open(form.url + '?' + form.getValues(true), '_blank');
            }
        }
    }
});

Ext.define('hussein.grid.column.ActionUpdate', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.updatecolumn',
    text: '',
    tooltip: 'ویرایش',
    menuDisabled: true,
    width: 25,
    iconCls: 'icon-NoteEdit',
    draggable: false,
    sortable: false,
    align: 'center',
    resizable: false,
    hideable: false,

    handler: function (grid, rowIndex, colIndex, actionItem, event, record, row) {
    },
    isDisabled: function (view, rowIdx, colIdx, item, record) {
        //return record.internalId == 'root';
        return false;
    },
    constructor: function () {
        this.callParent(arguments);
    }
});

Ext.define('hussein.grid.column.ActionDelete', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.deletecolumn',
    text: '',
    tooltip: 'حذف',
    menuDisabled: true,
    width: 25,
    iconCls: 'icon-Delete',
    draggable: false,
    sortable: false,
    align: 'center',
    resizable: false,
    hideable: false,
    handler: function (grid, rowIndex, colIndex, actionItem, event, record) {
    },
    isDisabled: function (view, rowIdx, colIdx, item, record) {
        return false;
    },
    constructor: function () {
        this.callParent(arguments);
    }
});

Ext.define('hussein.grid.column.Rating', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.ratingcolumn',
    dataIndex: "rating",
    allowChange: true,
    selectedCls: 'rating-selected',
    unselectedCls: 'rating-unselected',
    editable: false,
    maxRating: 5,
    tickSize: 16,
    roundToTick: true,
    zeroSensitivity: 0.25,
    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.renderer = Ext.Function.bind(me.renderer, me);
    },
    processEvent: function (type, view, cell, recordIndex, cellIndex, e) {
        if (this.editable && type == 'mousedown') {
            var grid = view.panel,
				record = grid.store.getAt(recordIndex);
            if (this.allowChange || !record.isModified(this.dataIndex)) {
                var value = (e.getXY()[0] - Ext.fly(e.getTarget()).getX()) / this.tickSize;
                if (value < this.zeroSensitivity)
                    value = 0;
                if (this.roundToTick)
                    value = Math.ceil(value);
                if (value > this.maxRating)
                    value = this.maxRating;
                var ev = {
                    grid: grid,
                    record: record,
                    field: this.dataIndex,
                    value: record.get(this.dataIndex),
                    row: view.getNode(recordIndex),
                    column: this,
                    rowIdx: recordIndex,
                    colIdx: cellIndex,
                    cancel: false
                };
                if (grid.fireEvent('beforeedit', grid, ev) === false || ev.cancel === true)
                    return false;
                ev.originalValue = ev.value;
                ev.value = value;
                if (grid.fireEvent('validateedit', grid, ev) === false || ev.cancel === true)
                    return false;
                record.set(this.dataIndex, value);
                grid.fireEvent('edit', grid, ev);
                return false;
            }
        } else {
            return this.callParent(arguments);
        }
        return true;
    },
    renderer: function (value, meta) {
        meta.tdCls = 'rating-cell';
        return Ext.String.format('<div class="{0}" style="width:{1}px;{4}"><div class="{2}" style="width:{3}px">&nbsp;</div></div>',
			this.unselectedCls,
			Math.round(this.tickSize * this.maxRating),
			this.selectedCls,
			Math.round(this.tickSize * value),
			this.editable ? 'cursor:pointer;' : ''
		);
    }
});

Ext.define('hussein.cmp.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.sccombo',
    config: {
        autoLoadStore: true,
        storeConfig: null,
        fields: null,
        url: ''
    },

    displayField: 'Title',
    valueField: 'Id',
    queryMode: 'local',
    triggerAction: 'all',
    typeAhead: true,
    anyMatch: true,
    forceSelection: false,
    clearFilterOnBlur: true,
    constructor: function (config) {
        if (!this.store)
            this.store = Ext.create('Ext.data.Store', Ext.apply({
                autoLoad: config.autoLoadStore || this.autoLoadStore,
                fields: config.fields ? config.fields : ['Id', 'Title', 'Selected'],
                proxy: {
                    type: 'ajax',
                    reader: {
                        type: 'json',
                        root: 'data'
                    },
                    listeners: {
                        exception: function (proxy, response, operation, eOpts) {
                            if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                                window.location = '/Account/Login';
                            if (response.responseText.indexOf('{') == 0) {
                                var res = Ext.decode(response.responseText);
                                if (res.success == false) {
                                    alert(res.message);
                                }
                            }
                        }
                    }
                }
            }, this.storeConfig));

        Ext.getBody().mask('لطفا صبر کنید...');
        this.store.proxy.url = config.url;
        this.callParent(arguments);
        if (this.autoLoadStore)// && config.url.length > 0)
            this.store.load();

        this.store.on({
            load: function (records, operation, success) {
                Ext.getBody().unmask();
                hussein.util.Util.comboFocus(this);
            },
            scope: this
        });

        this.on('focus', function (me, The, eOpts) {
            if (!me.readOnly && !me.disabled) {
                me.expand();
                hussein.util.Util.comboFocus(me);
            }
        });
    }
});

Ext.define('hussein.cmp.ComboBoxForSearch', {
    extend: 'hussein.cmp.ComboBox',
    alias: 'widget.sccombosearch',
    fields: ['Title'],
    valueField: 'Title',
    displayField: 'Title',
    forceSelection: false,
    hideTrigger: true,
    typeAhead: false
});

Ext.define('hussein.cmp.ClearComboBox', {
    extend: 'hussein.cmp.ComboBox',
    alias: 'widget.sccomboclear',
    trigger2Cls: 'x-form-clear-trigger',
    trigger2Tooltip: 'پاک کردن',
    onTrigger2Click: function () {
        this.setRawValue('');
        this.setValue('');
    }
});

Ext.define('hussein.cmp.InfoCombobox', {
    extend: 'hussein.cmp.ComboBox',
    alias: 'widget.sccomboinfo',
    trigger2Cls: 'x-form-search-trigger',
    trigger2Config: {
        qtip: 'test'
    },
    onTrigger2Click: function () {
        //ToDo: Create a mechanism that get some info from server and show that to user with an alert
        alert('', 'اطلاعات موجود نیست.');
    }
});

Ext.define('hussein.cmp.PersianDateField', {
    extend: 'Ext.form.field.PDate',
    alias: 'widget.pdatefield',
    toField: null,
    fromField: null,
    toDate: null,
    fromDate: null,
    valueToRaw: function (value) {
        if (value && !Ext.isDate(value))
            value = new Date(Date.parse(value));
        return this.formatDate(this.parseDate(value));
    },
    getSubmitValue: function () {
        var me = this,
            format = me.submitFormat || me.format,
            value = me.getValue();

        return value ? Ext.Date.format(value, format) : null;
    },
    constructor: function () {
        this.callParent(arguments);

        if (this.toDate != null) {
            this.setMinValue(this.toDate)
        }
        if (this.fromDate != null) {
            this.setMinValue(this.fromDate)
        }
        this.on('focus', function (me, The, eOpts) {
            if (!me.readOnly && !me.disabled)
                me.expand();

        });

        this.on('change', function (me, newValue, oldValue, eOpts) {
            var par = me.up('fieldset') || me.up('form') || me.up('panel');
            if (me.toField != null) {
                var dt = par.down('[name=' + me.toField + ']');
                if (dt != null) {
                    dt.setMinValue(newValue);
                    dt.setValue(newValue);
                }
            }
            if (me.fromField) {
                var dt = par.down('[name=' + me.fromField + ']');
                if (dt != null) {
                    dt.setValue(newValue);
                    dt.setMaxValue(newValue);
                }
            }
        });
    }
});

Ext.define('hussein.cmp.PersianDateTimeField', {
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    alias: 'widget.pdatetimefield',
    alternateClassName: ['Ext.form.field.PersianDateTimeField'],
    layout: 'hbox',
    combineErrors: true,
    allowBlank: true,

    dateCfg: {},
    timeCfg: {},

    initComponent: function () {
        var me = this;
        me.buildField();
        me.callParent();
        me.dateField = me.child('datefield');
        me.timeField = me.child('timefield');

        // Init mixins
        me.initField();

        if (me.readOnly) {
            me.timeField.readOnly = me.readOnly;
            me.dateField.readOnly = me.readOnly;
        }
    },

    //private
    buildField: function () {
        this.items = [
            Ext.apply({
                xtype: 'timefield',
                allowBlank: this.allowBlank
            }, this.timeCfg),
            Ext.apply({
                xtype: 'pdatefield',
                flex: 1,
                padding: '0 10px 0 0',
                allowBlank: this.allowBlank
            }, this.dateCfg)
        ];
    },

    //private
    onDisable: function () {
        var me = this;
        me.callParent();
        me.timeField.disabled = true;
        me.dateField.disabled = true;
    },

    //private
    onEnable: function () {
        var me = this;
        me.callParent();
        me.timeField.disabled = false;
        me.dateField.disabled = false;
        me.isValid();
    },

    getValue: function () {
        var me = this;
        if (me.dateField.isValid() && me.timeField.isValid()) {
            var d = me.dateField.getValue(),
                t = me.timeField.getValue();
            if (d && t) {
                d.setMinutes(t.getMinutes());
                d.setHours(t.getHours());
            }
            me.value = d;
        } else
            me.value = null;
        return me.value;
    },

    setValue: function (value) {
        var me = this;
        me.dateField.setValue(value);
        me.timeField.setValue(value);
        me.validate();
        return me.mixins.field.setValue.call(me, value);
    },

    getSubmitData: function () {
        var me = this,
            data = null,
            val;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getValue();
            if (val !== null) {
                data = {};
                data[me.getName()] = val;
            }
        }
        return data;
    },

    setMinValue: function (dt) {
        var me = this,
            dField = me.dateField,
            dPicker = me.dateField.picker,
            minValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        dField.minValue = minValue;

        if (dPicker) {
            dPicker.minText = Ext.String.format(dField.minText, me.formatDate(dField.minValue));
            dPicker.setMinDate(minValue);
        }
    },

    setMaxValue: function (dt) {
        var me = this,
            dField = me.dateField,
            dPicker = me.dateField.picker,
            maxValue = (Ext.isString(dt) ? me.parseDate(dt) : dt);

        dField.maxValue = maxValue;

        if (dPicker) {
            dPicker.maxText = Ext.String.format(dField.maxText, me.formatDate(dField.maxValue));
            dPicker.setMaxDate(maxValue);
        }
    },

    isValid: function () {
        var me = this;
        return me.disabled || Ext.isEmpty(me.getErrors());
    },

    validate: function () {
        var me = this,
            isValid = me.dateField.isValid() && me.timeField.isValid() && me.isValid();
        if (isValid !== me.wasValid) {
            me.wasValid = isValid;
            me.fireEvent('validitychange', me, isValid);
        }
        return isValid;
    },

    getErrors: function () {
        var me = this,
            value = me.value,
            errors = [],
            vtype = me.vtype,
            vtypes = Ext.form.field.VTypes;

        if (value == null || value.length < 1) { // if it's blank and textfield didn't flag it then it's valid
            return errors;
        }

        if (vtype) {
            if (!vtypes[vtype](value, me)) {
                errors.push(me.vtypeText || vtypes[vtype + 'Text']);
            }
        }

        return errors;
    },

    setReadOnly: function (r) {
        var me = this;
        me.dateField.setReadOnly(r);
        me.timeField.setReadOnly(r);
    }
});

Ext.define('Ext.form.field.Time', {
    override: 'Ext.form.field.Time',
    toField: null,
    fromField: null,
    constructor: function () {
        this.callParent(arguments);
        this.on('focus', function (me, The, eOpts) {
            if (!me.readOnly && !me.disabled)
                me.expand();
        });
        this.on('change', function (me, newValue, oldValue, eOpts) {
            var par = me.up('fieldset') || me.up('form') || me.up('panel');
            if (me.toField != null) {
                var dt = par.down('[name=' + me.toField + ']');
                if (dt != null)
                    dt.setMinValue(newValue);
            }
            if (me.fromField) {
                var dt = par.down('[name=' + me.fromField + ']');
                if (dt != null)
                    dt.setMaxValue(newValue);
            }
        });
    }
});

Ext.define('Ext.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    getSortParam: function () {
        if (this.sortIndex && this.sortIndex != null && this.sortIndex != undefined && this.sortIndex.length > 0) return this.sortIndex;
        return this.dataIndex;
    }
});


Ext.define('hussein.cmp.lookup.Tree', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.treelookup',
    config: {
        wndHeight: 300,
        wndWidth: 350,
        url: '',
        model: null,
        fields: ['Id', 'Title']
    },
    trigger1Cls: 'x-form-clear-trigger',
    trigger2Cls: 'x-form-search-trigger',

    displayField: 'text',
    valueField: 'id',

    wnd: null,

    valueText: '',
    valueId: '0',

    onSelected: Ext.emptyFn,

    fieldSubTpl: [
        '<input id="{id}" type="{type}" {inputAttrTpl}',
            ' size="1"',
            '<tpl if="name"> name="{name}"</tpl>',
            '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
            '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
            '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
            '<tpl if="disabled"> disabled="disabled"</tpl>',
            '<tpl if="tabIdx"> tabIndex="{tabIdx}"</tpl>',
            '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
            ' readonly="readonly"',
            ' class="{fieldCls} {typeCls} {editableCls}" autocomplete="off"/>',
        {
            disableFormats: true
        }
    ],
    onTrigger1Click: function () {
        //me.valueId = 0;
        this.valueText = '';
        this.setValue('');
        this.valueId = null;
    },
    onTriggerClick: function () {
        var me = this;
        if (!me.wnd) {
            var tree = Ext.create('Ext.tree.Panel', {
                border: false,
                useArrows: false,
                rootVisible: false,
                store: Ext.create('Ext.data.TreeStore', {
                    model: 'arvand.TreeModel',
                    proxy: {
                        type: 'ajax',
                        reader: 'json',
                        url: me.url + '?hc=false',
                        listeners: {
                            exception: function (proxy, response, operation, eOpts) {
                                if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                                    window.location = '/Account/Login';
                            }
                        }
                    },
                    root: { name: 'root', expanded: true, text: 'ریشه' }
                }),
                listeners: {
                    selectionchange: function (tree, selected, eOpts) {
                    },

                    'itemdblclick': function (view, record, item, index, e, eOpts) {
                        me.valueId = record.raw[me.valueField];
                        me.valueText = record.raw[me.displayField];
                        me.setValue(record.raw[me.valueField]);
                        me.focus();
                        this.up('window').close();
                    }
                }
            });

            me.wnd = Ext.create('Ext.window.Window', {
                title: me.title || 'انتخاب از درخت',
                height: me.wndHeight,
                width: me.wndWidth,
                iconCls: 'no-cls',
                layout: 'fit',
                modal: true,
                closeAction: 'hide',
                items: tree,
                listeners: {
                    close: me.callback || Ext.emptyFn
                },
                buttons: [{
                    text: 'انتخاب',
                    handler: function (field) {
                        return function () {
                            var sel = tree.getSelectionModel().getSelection();
                            if (sel.length > 0) {
                                var path = '';
                                var selParent = sel[0];
                                while (selParent.parentNode) {
                                    path = path + selParent.data.text + ';';
                                    selParent = selParent.parentNode;
                                }
                                var splitPath = path.split(';');
                                path = '';
                                for (var index = splitPath.length - 1; index >= 0; index--) {
                                    if (splitPath[index] != '')
                                        path = path + splitPath[index] + ">";
                                }
                                path = path.substr(0, path.length - 1);
                                field.valueId = sel[0].raw[field.valueField];
                                field.valueText = path; //sel[0].raw[field.displayField];
                                field.setValue(sel[0].raw[field.valueField]);

                                if (field.onSelected != Ext.emptyFn)
                                    field.onSelected.call(field, sel[0].raw);
                            }
                            field.focus();
                            field.validate();
                            this.up('window').close();
                        };
                    }(me)
                }],
                tools: [{
                    type: 'refresh',
                    handler: function () {
                        tree.getStore().reload();
                    }
                }]
            });
        }
        if (me.wnd) {
            me.wnd.show();
        }
    },
    listeners: {
        beforedestroy: function (el, eOpts) {
            if (el.wnd) {
                if (el.wnd.items.items.length > 0)
                    el.wnd.items.items[0].destroy();
                el.wnd.destroy();
            }
        }
    },
    setValue: function (value) {
        var me = this,
            inputEl = me.inputEl;

        if (inputEl && me.emptyText && !Ext.isEmpty(value)) {
            inputEl.removeCls(me.emptyCls);
            me.valueContainsPlaceholder = false;
        }
        if (value == 0)
            value = null;
        me.valueId = value;
        value = me.valueText || value;
        me.setRawValue(me.valueToRaw(value));
        me.applyEmptyText();
        return me;
    },
    getValue: function () {
        var me = this,
            val = me.rawToValue(me.processRawValue(me.getRawValue()));
        me.value = val;
        return me.valueId;
    },
    getSubmitValue: function () {
        return this.valueId;
    },
    constructor: function (config) {
        this.callParent(arguments);
    }
});

Ext.define('hussein.cmp.lookup.Grid', {
    extend: Ext.form.field.Picker,
    alias: ['widget.gridlookupeditor', 'widget.gridlookup'],
    editable: false,
    matchFieldWidth: false,
    trigger1Cls: 'x-form-clear-trigger',
    trigger2Cls: 'x-form-search-trigger',
    displayField: 'Title',
    valueField: 'Id',
    config: {
        wndHeight: 350,
        wndWidth: 600,
        url: '',
        model: null,
        fields: ['Id', 'Title'],
        columns: null,
        searchItems: null,
        showSearchbar: false,
        searchbar: null
    },
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
    onSelect: function (record) {
        var me = this;
        me.valueId = record.data[me.valueField];
        me.valueText = record.data[me.displayField];
        me.setValue(record.raw[me.valueField]);
        me.fireEvent('lookupchange', me, record);
        me.collapse();
        me.focus();
        me.inputEl.focus();
    },
    createPicker: function () {
        var me = this;
        if (!me.model && me.fields) {
            me.model = 'Ext.data.Store.ImplicitModel-' + Ext.id();
            Ext.define(me.model, {
                extend: 'Ext.data.Model',
                fields: me.fields
            });
            delete me.fields;
        } else {
            Ext.syncRequire(me.model);
        }

        if (!me.url && me.model && me.model.length > 0) {
            var model = Ext.ModelManager.getModel(me.model);
            if (model)
                me.url = model.url;
        }

        var store = Ext.create('Ext.data.Store', {
            model: me.model,
            autoLoad: true,
            pageSize: 10,
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                url: me.url,
                listeners: {
                    exception: function (proxy, response, operation, eOpts) {
                        if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                            window.location = '/Account/Login';
                    }
                }
            }
        });
        var grid = Ext.create('Ext.grid.Panel', {
            region: 'center',
            border: false,
            defaults: { sortable: true },
            readUrl: me.url,
            viewConfig: {
                stripeRows: true
            },
            forceFit: true,
            showSearchbar: this.showSearchbar,
            searchbar: this.searchbar,
            columns: me.columns || [
                { xtype: 'rownumberer' },
                {
                    text: 'عنوان',
                    dataIndex: me.displayField,
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
                    me.onSelect(record);
                },
                cellkeydown: function (table, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    if (e.keyCode == Ext.EventObject.ENTER)
                        me.onSelect(record);
                }
            },
            plugins: this.searchbar != null && this.searchbar.length > 0 ? [{ ptype: 'gridsearchbar' }] : []
            /*,
            constructor: function () {
                if ((me.showSearchbar || me.searchbar) && !Ext.Array.findBy(this.plugins, function (item, index) {
                    if (item.ptype == 'gridsearchbar')
                        return item;
                    return null;
                }))
                    this.plugins.push(Ext.create('hussein.grid.plugin.Searchbar', {}));
                this.callParent(arguments);

            }*/
        });
        var search = me.searchItems
            ? Ext.create('Ext.container.Container', {
                region: 'north',
                padding: '5 3 0 0',
                height: me.searchItems.length * 30,
                items: me.searchItems
            })
            : Ext.emptyFn;

        return Ext.create('Ext.window.Window', {
            title: me.title || 'انتخاب  ',
            height: me.wndHeight,
            width: me.wndWidth,
            layout: 'border',
            closable: false,
            items: [search, grid],
            buttons: [{
                text: 'انتخاب',
                handler: function (field) {
                    return function () {
                        field.onSelect(grid.getSelectionModel().getSelection()[0]);
                    };
                }(me)
            }],
            tools: [{
                type: 'refresh',
                handler: function () {
                    grid.getStore().reload();
                }
            }],
            listeners: {
                show: function () {
                    //console.log('show picker');                    
                    var grid = this.down('grid');
                    grid.focus();
                    //grid.view.focusRow(0);
                    //grid.getSelectionModel().select(0);                    
                    //var rec = grid.getSelectionModel().getSelection();
                    //if (rec.length > 0) {
                    //grid.getSelectionModel().setLastFocused(rec[0]);
                    //grid.view.focusNode(rec[0]);                        
                    //}
                }
            }
        });
    },
    onTrigger1Click: function () {
        var me = this;
        me.valueText = '';
        me.setValue('');
        me.valueId = null;
        me.focus();
    },
    //collapseIf And triggerBlur functions are added to prevent collapsing or hiding picker on combobox clicks
    collapseIf: Ext.Function.createInterceptor(Ext.form.field.Picker.prototype.collapseIf, function (e) {
        var boundList = Ext.get(e.target).up('.x-boundlist'),
            cmp;
        cmp = boundList && Ext.getCmp(boundList.id);
        if (cmp) {
            return false;
        }
    }, this, true),

    triggerBlur: Ext.Function.createInterceptor(Ext.form.field.Picker.prototype.triggerBlur, function (e) {
        var boundList = Ext.get(e.target).up('.x-boundlist'),
            cmp;
        cmp = boundList && Ext.getCmp(boundList.id);
        if (cmp) {
            return false;
        }
    }, this, true)
});

Ext.define('hussein.cmp.HeaderButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.headerbutton',
    textAlign: 'left',
    cls: 'header-item',
    margin: '5 5 2 0',
    shadow: false,
    listeners: {
        mouseout: function (item, e) {
            this.addCls('header-item');
        },
        mouseover: function (item, e) {
            this.removeCls('header-item');
        }
    }
});

Ext.define('hussein.cmp.ribbon.Panel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.ribbon',
    cls: 'ui-ribbonbar',
    activeTab: 0,
    plain: true,
    unstyled: true,
    autoHeight: true,
    border: false,

    defaults: {
        xtype: 'ribbontab'
    },

    addTab: function (tab, focus) {
        var rTab = this.add(tab);
        if (focus === true || this.items.length == 1)
            this.setActiveTab(rTab);
    },

    listeners: {
        tabchange: function (tabPanel, newTab, oldTab, eOpts) {
            if (newTab != null && newTab.refresh != null)
                newTab.refresh();
        }
    },

    refresh: function () {
        Ext.suspendLayouts();
        //Refrsh Code Insert Hear.
        Ext.resumeLayouts(true);
    }
});

Ext.define('hussein.cmp.ribbon.Tab', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ribbontab',
    layout: 'hbox',
    title: 'Untitled',
    border: false,

    defaults: {
        xtype: 'ribbongroup',
        headerPosition: 'bottom',
        margins: '3 0 3 3'
    }
});

Ext.define('hussein.cmp.ribbon.Group', {
    extend: 'Ext.container.ButtonGroup',
    alias: 'widget.ribbongroup',
    border: false,

    defaults: {
        xtype: 'button', //button, splitbutton, ComboBox
        scale: 'medium',
        iconAlign: 'top'
        //padding: '0 5px 0 5px'
    }
});

Ext.define('hussein.cmp.LiveCombo', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.livecombo',

    config: {
        url: '',
        model: null,
        fields: ['Id', 'Title']
    },

    displayField: 'Title',
    valueField: 'Id',
    typeAhead: true,
    store: {
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'data'
            },
            url: '',
            listeners: {
                exception: function (proxy, response, operation, eOpts) {
                    Ext.getBody().unmask();
                    if (response.responseText.indexOf('action="/Account/Login?') >= 0)
                        window.location = '/Account/Login';
                }
            }
        },
        pageSize: 10
    },
    pageSize: 10,
    minChars: 2,
    hideTrigger: true,
    emptyText: 'برای جستجو تایپ کنید',
    listConfig: {
        loadingText: 'در حال جستجو...',
        emptyText: 'موردی یافت نشد.'
        // Custom rendering template for each item
        /*getInnerTpl: function() {
            return '<a class="search-item" href="http://www.sencha.com/forum/showthread.php?t={topicId}&p={id}">' +
                '<h3><span>{[Ext.Date.format(values.lastPost, "M j, Y")]}<br />by {author}</span>{title}</h3>' +
                '{excerpt}' +
            '</a>';*/
    },

    constructor: function (config) {
        var me = this;

        var model = config.model || me.model;
        var fields = config.fields || me.fields;

        if (!model && fields) {
            model = me.model = 'Ext.data.Store.ImplicitModel-' + Ext.id();
            Ext.define(model, {
                extend: 'Ext.data.Model',
                fields: fields
            });
            delete fields;
        } else {
            Ext.syncRequire(model);
        }

        this.store.proxy.extraParams = { 'queryField': config.displayField || me.displayField };
        this.store.model = model;
        this.store.proxy.url = config.url;

        if (this.allowBlank === false)
            this.afterLabelTextTpl = hussein.util.Util.required;
        this.callParent(arguments);


        this.on('focus', function (me, The, eOpts) {
            if (!me.readOnly && !me.disabled)
                me.expand();
        });
    },

    setValue: function (value, doSelect) {
        this.callParent(arguments);
        var me = this;
        if (arguments.length == 1 && value != null && value != undefined) {
            if (value.toString().length > 0 && value.toString() != '0' && doSelect !== false) {
                if (me.store.getCount() <= 0) {
                    Ext.Ajax.request({
                        url: me.store.proxy.url,
                        method: 'GET',
                        params: { queryField: me.valueField, query: value },
                        success: function (response) {
                            var records = Ext.decode(response.responseText).data;
                            if (records.length > 0) {
                                me.setRawValue(records[0][me.displayField]);
                                me.checkChange();
                                me.inputEl.removeCls(me.emptyCls);
                                me.store.load();
                            }
                        },
                        scope: me
                    });
                }
            }
        }
    }
});

Ext.define('hussein.cmp.HourMinute', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.hourminutefield',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    layout: 'hbox',
    items: [{
        xtype: 'numberfield',
        itemId: 'secondField',
        minValue: 0,
        maxValue: 59,
        hideLabel: true,
        flex: 1
    }, {
        xtype: 'displayfield',
        value: ' : ',
        padding: '0 5px 0 5px'
    }, {
        xtype: 'numberfield',
        itemId: 'minuteField',
        minValue: 0,
        maxValue: 59,
        hideLabel: true,
        flex: 1
    }, {
        xtype: 'displayfield',
        value: ' : ',
        padding: '0 5px 0 5px'
    }, {
        xtype: 'numberfield',
        itemId: 'hourField',
        minValue: 0,
        maxValue: 10000,
        hideLabel: true,
        flex: 1
    }],

    initComponent: function () {
        var me = this;
        me.callParent();
        me.secondField = me.child('#secondField');
        me.minuteField = me.child('#minuteField');
        me.hourField = me.child('#hourField');

        // Init mixins
        me.initField();

        if (me.readOnly) {
            me.secondField.readOnly = me.readOnly;
            me.minuteField.readOnly = me.readOnly;
            me.hourField.readOnly = me.readOnly;
        }
    },

    //private
    onDisable: function () {
        var me = this;
        me.callParent();
        me.secondField.disabled = true;
        me.minuteField.disabled = true;
        me.hourField.disabled = true;
    },

    value: 0,
    vSecond: 10000000,
    vMinute: 600000000,
    vHour: 36000000000,

    getValue: function () {
        var me = this;
        me.value = me.hourField.getValue() * me.vHour + me.minuteField.getValue() * me.vMinute + me.secondField.getValue() * me.vSecond;
        return me.value;
    },

    setValue: function (value) {
        var me = this;
        if (value) {
            var hour = Math.floor(value / (me.vHour));
            var minute = Math.floor((value % (me.vHour)) / me.vMinute);
            var second = Math.floor((value - (hour * me.vHour + minute * me.vMinute)) / me.vSecond);

            me.hourField.setValue(hour);
            me.minuteField.setValue(minute);
            me.secondField.setValue(second);
        }
        return me.mixins.field.setValue.call(me, value);
    },

    setReadOnly: function (r) {
        var me = this;
        me.secondField.setReadOnly(r);
        me.minuteField.setReadOnly(r);
        me.hourField.setReadOnly(r);
    }
});


/*
* custom Vtype for vtype:'IPAddress' | vtype:'IPAddress' | vtype:'daterange' | vtype:'password' 
*/
Ext.apply(Ext.form.field.VTypes, {

    IPAddress: function (v) {
        return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(v);
    },
    IPAddressText: 'Must be a numeric IP address',
    IPAddressMask: /[\d\.]/i,

    MacAddress: function (v) {
        return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(v);
    },
    MacAddressText: 'Must be a valid Mac address. "F7-89-22-A5-2C-5F"',
    MacAddressMask: /[0-9A-Fa-f:-]/i,

    daterange: function (val, field) {
        var date = (field.xtype === 'pdatetimefield') ? field.dateField.parseDate(val) : field.parseDate(val);
        //var date = field.parseDate(val);

        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            //var start = field.up('form').down('#' + field.startDateField);
            var start = field.up('form').getForm().findField(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            //var end = field.up('form').down('#' + field.endDateField);
            var end = field.up('form').getForm().findField(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },
    daterangeText: 'Start date must be less than end date',

    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText: 'Passwords do not match',

    DateField: function (v) {
        return /^\d{1,2}\:\d{1,2}\:\d{1,2}$/.test(v);
    },
    DateFieldText: 'a valid Date Format is 00:00:00 ',
    DateFieldMask: /[0-9 :]/i
});

String.prototype.hashCode = function () {
    var hash = 0, i, chr;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

/**
*  Base64 encode / decode
*  http://www.webtoolkit.info/
**/
var Base64 = (function () {

    // private property
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // private method for UTF-8 encoding
    function utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }

    // public method for encoding
    return {
        //This was the original line, which tries to use Firefox's built in Base64 encoder, but this kept throwing exceptions....
        // encode : (typeof btoa == 'function') ? function(input) { return btoa(input); } : function (input) {


        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            input = utf8Encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
            }
            return output;
        }
    };
})();

Ext.define('Ext.grid.RowNumberer', {
    override: 'Ext.grid.RowNumberer',
    resizable: true
});

Ext.define('hussein.cmp.BooleanField', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.booleanfield',
    store: [[true, 'Yes'], [false, 'No']]
})