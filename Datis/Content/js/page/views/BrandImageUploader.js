Ext.define('prada.page.views.BrandImageUploader', {
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
        }, {
            xtype: 'panel',
            fieldLabel: 'آپلود عکس لوگو برند',
            name: 'upload',
            html: '<div id="uploader"><p>Your browser does not have Flash, Silverlight or HTML5 support.</p></div>'
        },
        {
            autoScroll: true,
            title: 'تصاویر موجود',
            height: 200,
            width: '100%',
            xtype: 'panel',
            cls: 'ImagesContainer',
            html: '<ul class="currentFiles"></ul>'
        }],
    }
    ],
    listeners: {
        render: function () {
            var form = this.down('form').getForm();
            var uploader = $("#uploader").plupload({
                runtimes: 'html5,html4',
                url: '../Image/Create',
                max_file_count: 20,
                filters: {
                    max_file_size: '1000mb',
                    mime_types: [
                        { title: "Image files", extensions: "jpg,gif,png" }
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
                    ProductId: form.findField('Id').getValue(),
                    TableId: form.findField('tableId').getValue(),
                },
                init: {
                    FileUploaded: function (up, file, info) {
                        var obj = Ext.decode(info.response);
                        
                        if (obj.success) {
                            var id = obj.id;
                            var address = obj.address;
                            $('.currentFiles').append('<li style="float:left" class="plupload_file ui-state-default plupload_delete"><div class="plupload_file_thumb"><img style="width:100px;height:100px" src=' + address + ' /></div><div class="plupload_file_action" d-id=' + id + ' style="position:absolute;right:0;top:0"><div class="plupload_action_icon ui-icon ui-icon-circle-minus"> </div></div></li>');
                            $('.ImagesContainer .plupload_file_action').click(function () {
                                deleteImage($(this).attr('d-id'));
                            });
                        }
                        else {
                            Ext.Msg.alert('خطا', obj.message);
                            //alert(obj.message);
                        }
                    },
                }

            });

            $.ajax({
                url: 'Image/Load',
                type: 'POST',
                dataType: 'json',
                data:
                {
                    "ImageOrFile": '1',
                    "tableId": form.findField('tableId').getValue(),
                    "productId": form.findField('Id').getValue(),
                    "typeOfFileOrImage": '0'

                },
                success: function (data) {
                    $('.currentFiles').html('');
                    if (data.length > 0) {

                        for (var i = 0; i < data.length; i++) {
                            $('.currentFiles').append('<li style="float:left" class="plupload_file ui-state-default plupload_delete"><div class="plupload_file_thumb"><img style="width:100px;height:100px" src=' + data[i].adress + ' /></div><div class="plupload_file_action" d-id=' + data[i].id + ' style="position:absolute;right:0;top:0"><div class="plupload_action_icon ui-icon ui-icon-circle-minus"> </div></div></li>');
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
                { id: 'tableId', value: config.tableId },
            ]);

        }
    }
});

function deleteImage(imageId) {
    Ext.Msg.show({
        title: 'حذف تصویر از سرور',
        msg: 'آیا از حذف فایل اطمینان دارید؟',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.QUESTION,
        fn: function (btn) {
            if (btn == 'yes') {
                Ext.Ajax.request({
                    method: 'post',
                    url: 'Image/Delete?Id=' + imageId + '&FileOrImage=1',
                    success: function (response, eOpts) {
                        $('.plupload_file_action[d-id=' + response.responseText + ']').parent().remove();
                        jump('حذف', 'تصویر مورد نظر حذف گردید');
                    }
                });
            }
        }
    });

}