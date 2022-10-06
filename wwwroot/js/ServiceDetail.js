function Save(s) { 

     ServiceDatatype = [];
     ServiceSoftware = [];
     GenArrayType();
     GenArraySoftware();

    var url = URL + '/Service/ITUpdate';
    var send = false;
    var Hardware = false;
    var Sofware = false;
    var Other = false;
    if (s == "Y") { send = true; }
    var remark =  $('#Approve2Remark').val();
    var TypeServiceID = $('#TypeHardware').val();
    if ($('#Hardware').is(':checked')) { Hardware = true;  }
    if ($('#Sofware').is(':checked')) { Sofware = true;  }
    if ($('#Other').is(':checked')) { Other = true; }  
    var formData = new FormData();
    $('#tblSoftware  > tbody  > tr').each(function () {
        var _file = $(this).closest('tr').find('input:file').get(0);
        var files = _file.files;
        if (files.length > 0) { formData.append('FilePdf', files[0], $(this).closest('tr').find('td:eq(0)').html()); }
    });
    if (typeof TypeServiceID === "undefined") {
        TypeServiceID = "";
    }

    //'TypeDataID': $(row).find('td:eq(0)').html(),
    //    'IDComputerEquipment': $("#ComputerEquipment").html(),
    //        'Detail': $(row).find('input:eq(0)').val(),
    //            'Remark': $(row).find('input:eq(1)').val(),
    //                'ReferenceID': $("#RunningID").html(),


    var indexdatatype = 0;
    $.each(ServiceDatatype, function (index, datatype) {
        formData.append("ServiceDatatype[" + indexdatatype + "].TypeDataID", datatype.TypeDataID);
        formData.append("ServiceDatatype[" + indexdatatype + "].IDComputerEquipment", datatype.IDComputerEquipment);
        formData.append("ServiceDatatype[" + indexdatatype + "].Detail", datatype.Detail);
        formData.append("ServiceDatatype[" + indexdatatype + "].Remark", datatype.Remark);
        formData.append("ServiceDatatype[" + indexdatatype + "].ReferenceID", datatype.ReferenceID);
        indexdatatype++;
      
    });

    var index = 0;
    $.each(ServiceSoftware, function (i, pair) {
        formData.append("ServiceSoftware[" + index + "].SoftwareID", pair.SoftwareID);
        formData.append("ServiceSoftware[" + index + "].SoftwareDeataiID", pair.SoftwareDeataiID);
        formData.append("ServiceSoftware[" + index + "].IDComputerEquipment", pair.IDComputerEquipment);
        formData.append("ServiceSoftware[" + index + "].Detail", pair.Detail);
        index++;
    });

    if ($("#DateFromstr").val() == "" || $("#DateTostr").val() == "" || $("#NumberOfHour").val() == "") {
        PopupMessage('กรุณาเลือกวันที่เริ่มทำงาน และ ใส่จำนวนเวลาที่ทำงาน'); return;
    }





    let startDate = moment($("#DateFromstr").val(), 'DD/MM/YYYY HH:mm').format('MM/DD/YYYY HH:mm');
    let endDate = moment($("#DateTostr").val(), 'DD/MM/YYYY HH:mm').format('MM/DD/YYYY HH:mm');

    formData.append('DateFromstr', startDate);
    formData.append('DateTostr', endDate);
    formData.append('NumberOfHour', $("#NumberOfHour").val());
    
    formData.append('remark', remark);
    formData.append('RunningID', $("#RunningID").html()); 
    formData.append('send', send);
    formData.append('Hardware', Hardware);
    formData.append('Sofware', Sofware);
    formData.append('Other', Other);
    formData.append('TypeServiceID', TypeServiceID);
    //formData.append('ServiceDatatype', ServiceDatatype); 
    //formData.append('ServiceSoftware', JSON.stringify(ServiceSoftware)); 
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false, 
        beforeSend: function () {
            ShowLoading();
        },
        success: function (res) {
            if (res.success == false) {
                PopupMessage(res.ex);
                return;
            }
            if (res.success) {
                let link = URL + '/Service/ListService?statusPage=P03';
                showCompleate(link);
            }
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (ex) { }
    });


}

function Approve(sys) {
    var isApprove = false;
    var remark = "";
    if ($('#approve3').is(':checked')) {
        isApprove = true;
    } else if (!$('#approve3').is(':checked') && !$('#reject3').is(':checked')) {
        PopupMessage('กรุณาเลือกประภทการอนุมัติ'); return;
    }
    else {
        if ($('#Approve3Remark').val() == '') { PopupMessage('กรุณาระบุหมายเหตุ'); return; }
    }
    remark = $('#Approve3Remark').val();

    ShowLoading();
    var url = URL + '/Service/ApproveHeader';
    var data = {
        'id': $("#RunningID").html(),
        'isApprove': isApprove,
        'remark': remark,
        'sys': sys,
    };
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: "json",
        success: function (res) {
            ShowLoading(false);
            if (res.success) {
                let link = URL + '/Service/ListService?statusPage=P04';
                showCompleate(link);
            } else {
                PopupMessage(res.ex);
            }
        },
        error: function (ex) { ShowLoading(false); }
    });
}




function SearchModalSoftware() { 
    var url = URL + '/Service/GetMasterSoftwareByCriteria';
    var data = {
        'critiria': $("#critiriaTypeSoftware").val(), 
        'type': $("#TypeSoftwareID").val(), 
    };
    $("#tblSoftwareSearch > tbody").empty();
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        beforeSend: function () {
            ShowLoading();
        },
        success: function (data) {
            var newRow = '';
            var chk = '';
            var Copyright = '';

            $.each(data, function (index, element) {
                var issoftwareID = false;
                $('#tblSoftware > tbody  > tr').each(function (j, k) {
                    var r = $(k);
                    if (element.softwareID == r.find('td:eq(0)').html()) {
                        issoftwareID = true;
                        return false;
                    }
                });

                if (element.v_IT_MT_SoftwareDetail.length > 0) {

                    $.each(element.v_IT_MT_SoftwareDetail, function (index, element) {

                    chk = '<div class="icheckbox_flat-green">';
                    chk += '<input type="checkbox" class="check filled-in chk-col-light-green  Softwarechk"    id="' + element.softwareDeataiID + '" name="' + element.softwareDeataiID + '">';
                    chk += '<label for="' + element.softwareDeataiID + '"></label>';
                    chk += '</div>';
                    newRow = '<tr>';
                    newRow += '<td class="text-center">' + ((issoftwareID) ? "" : chk) + '</td>';
                    newRow += '<td class="text-center">' + element.softwareID + '</td>';
                    newRow += '<td class="text-center">' + element.softwareDeataiID + '</td>';
                        newRow += '<td class="text-center">' + element.softwareName + ' ' + (element.remark == null ? "" : element.remark ) +  '</td>';
                    newRow += '<td class="text-center">' + element.typeSoftwareTH + '</td>';
                    if (element.typeSoftwareICopyright == true) {
                        Copyright = '<label class="text-success"><i class="fa fa-check-circle fa-fw"></i></label> ';
                    } else {
                        Copyright = '<label class="text-danger"><i class="fa fa-times-circle fa-fw"></i></label> ';
                    }
                    newRow += '<td class="text-center">' + Copyright + '</td>';
                    newRow += '<td class="text-center">' + element.iT_MT_SoftwareTypeLicense.typeLicenseName + '</td>';
                    newRow += '<td class="text-center">' + element.datePurchasedTH + '</td>';
                    newRow += '<td class="text-center">' + element.dateStartTH + '-' + element.dateEndTH + '</td>';
                    newRow += '</tr>';
                        $('#tblSoftwareSearch > tbody').append(newRow);
                    });


                } else {
                    chk = '<div class="icheckbox_flat-green">';
                    chk += '<input type="checkbox" class="check filled-in chk-col-light-green  Softwarechk"    id="' + element.softwareID + '" name="' + element.softwareID + '">';
                    chk += '<label for="' + element.softwareID + '"></label>';
                    chk += '</div>';
                    newRow = '<tr>';
                    newRow += '<td class="text-center">' + ((issoftwareID) ? "" : chk) + '</td>';
                    newRow += '<td class="text-center">' + element.softwareID + '</td>';
                    newRow += '<td class="text-center"></td>';
                    newRow += '<td class="text-center">' + element.softwareName + '</td>';
                    newRow += '<td class="text-center">' + element.typeSoftwareTH + '</td>';
                    if (element.typeSoftwareICopyright == true) {
                        Copyright = '<label class="text-success"><i class="fa fa-check-circle fa-fw"></i></label> ';
                    } else {
                        Copyright = '<label class="text-danger"><i class="fa fa-times-circle fa-fw"></i></label> ';
                    }
                    newRow += '<td class="text-center">' + Copyright + '</td>';
                    newRow += '</tr>';
                    $('#tblSoftwareSearch > tbody').append(newRow);
                }

               
               
            });
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (err) {
            ShowLoading(false);
        }
    });
}





//function SearchModalSoftware() {
//    var url = URL + '/Service/GetMasterSoftwareByCriteria';
//    var data = {
//        'Criteria': $("#critiriaTypeSoftware").val(), 
//        'Type': $("#TypeSoftwareID").val(), 
//    };
//    $("#tblSoftwareSearch > tbody").empty();
//    $.ajax({
//        type: "GET",
//        url: url,
//        data: data,
//        dataType: "json",
//        beforeSend: function () {
//            ShowLoading();
//        },
//        success: function (data) {
//            var btn = '';  
//            $.each(data.data, function (index, element) { 
//                var has = false;
//                $('#tblSoftware > tbody  > tr').each(function (j, k) {
//                    var r = $(k);
//                    if (element.softwareID == r.find('td:eq(0)').html()) {
//                        has = true;
//                        return false;
//                    }
//                });
//                btn = '<input type="checkbox" id="' + element.softwareID + '" class="filled-in chk-col-light-green" ><label for= "' + element.softwareID + '" ></label >'; 
//                if (has == true) { btn = '';} 
//                newRow = '<tr>';
//                newRow += '<td class="text-center">' + btn + '</td>';  
//                newRow += '<td class="text-left">' + element.softwareID + '</td>';
//                newRow += '<td class="text-left">' + element.softwareName + '</td>';
//                newRow += '<td class="text-left">' + element.typeSoftwareTH + '</td>';
//                if (element.typeSoftwareICopyright == true) {
//                    Copyright = '<label class="text-success"><i class="fa fa-check-circle fa-fw"></i></label> ';
//                } else {
//                    Copyright = '<label class="text-danger"><i class="fa fa-times-circle fa-fw"></i></label> ';
//                }
//                newRow += '<td class="text-center">' + Copyright + '</td>'; 
//                newRow += '</tr>';
//                $('#tblSoftwareSearch > tbody').append(newRow);
//            });
//        },
//        complete: function () {
//            ShowLoading(false);
//        },
//        error: function (err) {
//            ShowLoading(false);
//        }
//    });
//}

function GetTypeDataMT() {
    var url = URL + '/Service/GetDataTypeByIDComputer';
    var data = {
        'id': $("#RunningID").html(),
    };
     $("#tblTypedataSearch > tbody").empty();
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        beforeSend: function () {
            ShowLoading();
        },
        success: function (data) {
             var removebtn = ''; 
            var diasbleInput = 'disabled'; 
            $.each(data.data, function (index, element) { 
                if ($("#Sys").val() == "P03") {
                    removebtn = '<i class="fa fa-trash-o text-red  cursorpoint " onclick="deleterow(this)"></i>';  
                    diasbleInput =  '';
                }
                newRow = '<tr>';
                newRow += '<td class="text-center">' + element.typeDataID + '</td>';
                newRow += '<td>' + element.typeDataName + '</td>';
                newRow += '<td><input type="text" class="form-control" ' + diasbleInput + '  value="' + element.detail + '" autocomplete="off"/></td>';
                newRow += '<td><input type="text" class="form-control"  ' + diasbleInput + ' value="' + element.remark + '" autocomplete="off"/></td>';
                newRow += '<td>' + removebtn + '</td>';
                newRow += '</tr>';
                $('#tblTypedataSearch > tbody').append(newRow);
            });
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (err) {
            ShowLoading(false);
        }
    });
}





//function SelectSoftware() {
//    ShowLoading(true);
//    var newRow = '';
//    $('#tblSoftwareSearch > tbody  > tr').each(function (index, element) {
//        var row = $(element);
//        var sel = row.find('input:checked').val();
//        if (sel) {
//            var isHas = true;
//            $('#tblSoftware > tbody  > tr').each(function (j, k) {
//                var r = $(k);
//                if (row.find('td:eq(1)').html() == r.find('td:eq(0)').html()) {
//                    isHas = false;
//                    return false;
//                }
//            });


//            if (isHas) {
//                newRow = '<tr>';
//                newRow += '<td class="text-center">' + row.find('td:eq(1)').html() + '</td>';
//                newRow += '<td class="text-center">' + row.find('td:eq(2)').html() + '</td>';
//                newRow += '<td class="text-left">' + row.find('td:eq(3)').html() + '</td>';
//                newRow += '<td class="text-left"><input type="text" class="form-control" name=" " id=" "autocomplete="off" /></td>';
//                newRow += '<td class="text-center">' + (typeof row.find('td:eq(6)').html() === 'undefined' ? "" : row.find('td:eq(6)').html()) + '</td>';
//                newRow += '<td class="text-center">' + (typeof row.find('td:eq(7)').html() === 'undefined' ? "" : row.find('td:eq(7)').html()) + '</td>';
//                newRow += '<td class="text-center">' + (typeof row.find('td:eq(8)').html() === 'undefined' ? "" : row.find('td:eq(8)').html()) + '</td>';
//                newRow += '<td class="text-center"><i class="fa fa-trash-o text-red cursorpoint "onclick="deleterow(this)"></i></td>';
//                newRow += '</tr>';
//                $('#tblSoftware > tbody').append(newRow);
//            }
//        }
//    });
//    $("#FindModalSoftware").modal('hide');
//     ShowLoading(false);
//}


function SelectSoftware() {

    $('#tblSoftwareSearch > tbody  > tr').each(function (index, element) {
        var row = $(element);
        var newRow = '';
        let checkdup = false;
        $(row).find("input[type=checkbox]").each(function () {
            if (this.checked) {

                $('#tblSoftware > tbody  > tr').each(function (index, element) {
                    var rowsOF = $(element);
                    if (rowsOF.find('td:eq(0)').html() == row.find('td:eq(1)').html()) {
                        checkdup = true;
                    }
                });

                if (checkdup == false) {
                    newRow = '<tr >';
                    newRow += '<td class="text-center">' + row.find('td:eq(1)').html() + '</td>';
                    newRow += '<td class="text-left">' + row.find('td:eq(2)').html() + '</td>';
                    newRow += '<td class="text-left">' + row.find('td:eq(3)').html() + '</td>';
                    newRow += '<td class="text-center">' + row.find('td:eq(4)').html() + '</td>';
                    newRow += '<td class="text-center">' + row.find('td:eq(5)').html() + '</td>';

                    newRow += '<td class="text-center">' + (typeof row.find('td:eq(6)').html() === 'undefined' ? "" : row.find('td:eq(6)').html()) + '</td>';
                    newRow += '<td class="text-center">' + (typeof row.find('td:eq(6)').html() === 'undefined' ? "" : row.find('td:eq(7)').html()) + '</td>';
                    newRow += '<td class="text-center">' + (typeof row.find('td:eq(6)').html() === 'undefined' ? "" : row.find('td:eq(8)').html()) + '</td>';



                    newRow += '<td class="text-center"><input type="file"  accept="application/pdf" class="form-control"></td>';
                    newRow += '<td class="text-center"><textarea class="form-control" rows="2" id="' + row.find('td:eq(1)').html() + '"  ></textarea></td>';
                    newRow += '<td class="text-center"> </td>';
                    newRow += '<td class="text-center"><i class="fa fa-trash-o text-red  cursorpoint " onclick="deleterow(this)"></i></td>';
                    newRow += '</tr>';
                    $('#tblSoftware > tbody').append(newRow);
                }

            }
        });
    });
    $('#SoftwareSearch').modal('hide');
}
function GenArrayType() {
    $('#tblTypedataSearch > tbody  > tr').each(function (tempIndex, el) {
        var row = $(el);
        ServiceDatatype.push({
            'TypeDataID': $(row).find('td:eq(0)').html(),
            'IDComputerEquipment': $("#ComputerEquipment").html(),
            'Detail': $(row).find('input:eq(0)').val(),
            'Remark': $(row).find('input:eq(1)').val(),
            'ReferenceID': $("#RunningID").html(),

        });
    });
}

function GenArraySoftware() {
    $('#tblSoftware > tbody  > tr').each(function (tempIndex, el) {
        var row = $(el);
        ServiceSoftware.push({
            'SoftwareID': $(row).find('td:eq(0)').html(),
            'SoftwareDeataiID': $(row).find('td:eq(1)').html(),
            'IDComputerEquipment': $("#ComputerEquipment").html(),
            'Detail':  $(row).find('textarea').val(),
        });
    });
}
function SaveTypeData() {
    $('#FindModal').modal('hide');
}
function SelectdataType() {
    if ($("#DataTypeList option:selected").val() == "") { return; }

    let checkdup = false;

    $('#tblTypedataSearch > tbody  > tr').each(function (index, element) {
        var row = $(element);
        if ($("#DataTypeList option:selected").val() == row.find('td:eq(0)').html()) {
            checkdup = true;
        }
    });

    if (checkdup == false) {
        var newRow = '';
        newRow = '<tr >';
        newRow += '<td class="text-center">' + $("#DataTypeList option:selected").val() + '</td>';
        newRow += '<td class="text-left">' + $("#DataTypeList option:selected").text() + '</td>';
        newRow += '<td><input type="text" class="form-control"   autocomplete="off"/></td>';
        newRow += '<td><input type="text" class="form-control"   autocomplete="off"/></td>';
        newRow += '<td class="text-center"><i class="fa fa-trash-o text-red  cursorpoint " onclick="deleterow(this)"></i></td>';
        newRow += '</tr>';
        $('#tblTypedataSearch > tbody').append(newRow);
    }

}

function OpenFindModalSoftware() {
    $('#FindModalSoftware').modal('show');
}
function OpenFindModalSoftwareRemove() {
    $('#FindModalSoftwareRemove').modal('show');
}
function OpenSoftwareSearch() {
    $('#SoftwareSearch').modal('show');
}
function OpenFindModal() {
    $('#FindModal').modal('show');
}