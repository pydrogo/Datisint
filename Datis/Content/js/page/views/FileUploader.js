
Ext.define('prada.page.views.FileUploader', {
    extend: 'Ext.container.Container',
    rtl: false,
    layout: 'border',
    items: [{
        url: 'AnalogBoxAdmin/Save',
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
        defaults: { style: { right: 0, left: 'auto' }, columnWidth: 1, padding: 5 },
        items: [{
            xtype: 'hiddenfield', name: 'Id', value: 0
        }, {
            xtype: 'hiddenfield', name: 'tableId', value: 0
        },

        //{
        //    xtype: 'combo',
        //    store: [[1, 'documents'], [2, 'Images zip File'], [3, 'software']],
        //    name: 'DocumentOrImageOrSoftware',
        //    fieldLabel: 'display for',
        //    listeners: {
        //        change: function (combo, newValue, oldValue) {
        //            var uploader = $('#uploader').plupload('getUploader');
        //            var form = this.up('form').getForm();
        //            if (uploader && uploader.settings && uploader.settings.multipart_params) {

        //                uploader.settings.multipart_params.DocumentOrImageOrSoftware = newValue;
        //            }
        //            $.ajax({
        //                url: 'Image/Load',
        //                type: 'POST',
        //                dataType: 'json',
        //                data:
        //                {
        //                    "ImageOrFile": '2',
        //                    "tableId": form.findField('tableId').getValue(),
        //                    "productId": form.findField('Id').getValue(),
        //                    "typeOfFileOrImage": newValue
        //                },
        //                success: function (data) {
        //                    $('.currentFiles').html('');
        //                    if (data.length > 0) {

        //                        for (var i = 0; i < data.length; i++) {
        //                            $('.currentFiles').append('<li style="float:left"   data-qtip="' + data[i].name + '"  class="plupload_file ui-state-default plupload_delete"><div class="plupload_file_thumb"><img style="width:100px;height:100px" src=' + data[i].adress + ' /></div><div class="plupload_file_action" d-id=' + data[i].id + ' style="position:absolute;right:0;top:0"><div class="plupload_action_icon ui-icon ui-icon-circle-minus"> </div></div></li>');
        //                        }
        //                        $('.ImagesContainer .plupload_file_action').click(function () {
        //                            deleteImage($(this).attr('d-id'));
        //                        });
        //                    }

        //                },
        //                error: function (xhr, status, error) {
        //                }
        //            });
        //        }
        //    }
        //},
        {
            xtype: 'panel',
            fieldLabel: 'آپلود فایل های محصول',
            name: 'upload',
            html: '<div id="uploader"><p>Your browser does not have Flash, Silverlight or HTML5 support.</p></div>'
        },
        {
            autoScroll: true,
            title: 'فایل های موجود',
            height: 200,
            width: '100%',
            cls: 'ImagesContainer',
            xtype: 'panel',
            html: '<ul class="currentFiles"></ul>'
        }],
    }
    ],
    listeners: {
        render: function () {
            var form = this.down('form').getForm();
            var uploader = $("#uploader").plupload({
                runtimes: 'html5,html4',
                url: '../Image/CreateFile',
                max_file_count: 20,
                filters: {
                    max_file_size: '10000mb',
                    mime_types: [
                        { title: "Image files", extensions: "zip,pdf" }
                    ]
                },
                rename: true,
                sortable: true,
                dragdrop: true,
                views: {
                    list: true,
                    thumbs: true,
                    active: 'thumbs'
                },
                multipart_params: {
                    ForeignId: form.findField('Id').getValue(),
                    TableId: form.findField('tableId').getValue(),
                    Type: 1//form.findField('Type').getValue()
                }, init: {
                    FileUploaded: function (up, file, info) {
                        var obj = Ext.decode(info.response);
                        var id = obj.id;
                        var address = obj.address;
                        var name = obj.name;
                        $('.currentFiles').append('<li style="float:left" data-qtip="' + name + '" class="plupload_file ui-state-default plupload_delete"><div class="plupload_file_thumb"><img style="width:100px;height:100px" src=' + address + ' /></div><div class="plupload_file_action" d-id=' + id + ' style="position:absolute;right:0;top:0"><div class="plupload_action_icon ui-icon ui-icon-circle-minus"> </div></div></li>');
                        $('.ImagesContainer .plupload_file_action').click(function () {
                            deleteImage($(this).attr('d-id'));
                        });
                    },
                }
            });
            $.ajax({
                url: 'Image/Load',
                type: 'POST',
                dataType: 'json',
                data:
                {
                    "ImageOrFile": '2',
                    "tableId": form.findField('tableId').getValue(),
                    "productId": form.findField('Id').getValue(),
                    "typeOfFileOrImage": 1//form.findField('Type').getValue()
                },
                success: function (data) {
                    $('.currentFiles').html('');
                    if (data.length > 0) {

                        for (var i = 0; i < data.length; i++) {
                            $('.currentFiles').append('<li style="float:left"  data-qtip="' + data[i].name + '" class="plupload_file ui-state-default plupload_delete"><div class="plupload_file_thumb"><img style="width:100px;height:100px" src=' + data[i].adress + ' /></div><div class="plupload_file_action" d-id=' + data[i].id + ' style="position:absolute;right:0;top:0"><div class="plupload_action_icon ui-icon ui-icon-circle-minus"> </div></div></li>');
                        }
                        $('.ImagesContainer .plupload_file_action').click(function () {
                            deleteImage($(this).attr('d-id'));
                        });
                    }

                },
                error: function (xhr, status, error) {
                    //var err = eval("(" + xhr.responseText + ")");
                    //alert(err.Message);
                    //alert("error");
                }
            });
        }
    },
    constructor: function (config) {


        this.callParent(arguments);


        if (config && config.values) {
            var values = config.values;
            var form = this.down('form').getForm();
            form.setValues([
                { id: 'Id', value: values.Id },
                { id: 'tableId', value: config.tableId }//,
                //{ id: 'Type', value: config.Type },
            ]);

        }
    }
});
function deleteImage(imageId) {
    Ext.Msg.show({
        title: 'حذف فایل از سرور',
        msg: 'آیا از حذف فایل اطمینان دارید؟',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'post',
                    url: 'Image/Delete?Id=' + imageId + '&FileOrImage=2',
                    success: function (response, eOpts) {
                        $('.plupload_file_action[d-id=' + response.responseText + ']').parent().remove();
                        jump('حذف', 'فایل مورد نظر حذف گردید');
                    }
                });
            }
        }
    });

}