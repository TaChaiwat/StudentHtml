function Save(s) {
   
    var url = URL + '/Service/ServiceAdd'; 
     let status = (s == "Y" ? true : false);
     let RunningID = $("#RunningID").html();
    let EmployeeID = $("#EmployeeID").html();
    let SYS_Status = $("#SYS_Status").val();
    let Remark = $("#Remark").val(); 
    let DepartmentID = $('#DepartmentID').html();//departemtStr[0];
    let Phone = $("#Phone").val();
    let EquipmentID = $("#EquipmentType").val();
    let TypeNoticeID = $("#TypeNoticeID").val();
    let IDComputerEquipment = $("#ComputerEquipment").val(); 
     if (TypeNoticeID == "" || DepartmentID == "" || EmployeeID == "" || Phone == "" ) { PopupMessage("กรุณาใส่ข้อมูลให้ครบ"); return; }

     if ($('#TypeNoticeID').val() == $("#HardwareHide").val() || $('#TypeNoticeID').val() == $("#SoftwareHide").val()|| $('#TypeNoticeID').val() == $("#SoftwareRemoveHide").val()) {
         if (EquipmentID == "" || IDComputerEquipment == "" || EmployeeID == "" || Phone == "") { PopupMessage("กรุณาใส่ข้อมูลให้ครบ"); return; }
     }

     var departemtStr = DepartmentID.split('-'); 
     var formData = new FormData(); 
     var _file = $("#FilePdf").get(0).files;  
    if (_file.length > 0) {
        //var nametpe = _file[0].type; 
        //var size = _file[0].size;
        //if (size > 10240) {
        //    PopupMessage("ไฟล์อัพโหลดเกิน 10 MB");
        //}
        //if (nametpe == "image/png" || nametpe == "application/pdf" || nametpe == "image/jpeg") {
            formData.append('FilePdf', _file[0], "รูป");
        //} else {

        //    PopupMessage("ประเภทไฟล์อัพโหลดไม่ถูกต้อง");
        //    return;
        //} 
    } 
 
     formData.append('TypeCreateService', $("#typeCreteSp").val());
     formData.append('RunningID', RunningID); 
     formData.append('EmployeeID', EmployeeID);
     formData.append('SYS_Status', SYS_Status);
     formData.append('Remark', Remark);
     formData.append('DepartmentID', departemtStr[0]);
     formData.append('Phone', Phone);
     formData.append('TypeNoticeID', TypeNoticeID);
     formData.append('EquipmentID', EquipmentID);
     formData.append('IDComputerEquipment', IDComputerEquipment);
     formData.append('Send', status); 
    $.ajax({
        type: "POST",
        url: url,
        data: formData,
        processData: false,
        contentType: false, 
        //dataType: "json",
        beforeSend: function () {
            ShowLoading();
        },
        success: function (res) {
            if (res.success == false) {
                PopupMessage(res.ex);
                return;
            }
            if (res.success) {
                let link = URL + '/Service/ListService?statusPage=P01';
                showCompleate(link);
            }
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (ex) { }
    });
}
 
$('#TypeNoticeID').on('change', function () {
    if (this.value == $("#HardwareHide").val() || this.value == $("#SoftwareHide").val() || this.value == $("#SoftwareRemoveHide").val())
    {
                $("#TypeOther").show();
     } else {
                $("#TypeOther").hide();
      }      
  });
        function SelecteEmp(btn) {
            var EmployeeID = $(btn).closest('tr').find('td:eq(1)').html();
            var EmployeeName = $(btn).closest('tr').find('td:eq(2)').html();
            var Department = $(btn).closest('tr').find('td:eq(4)').html();

            var UserID = $(btn).closest('tr').find('td:eq(7)').html();
            var UserName = $(btn).closest('tr').find('td:eq(8)').html();
            var UserEmail = $(btn).closest('tr').find('td:eq(9)').html();
            var DepartmentID4 = $(btn).closest('tr').find('td:eq(10)').html();

            $("#EmployeeID").html(EmployeeID);
            $("#EmployeeName").html(EmployeeName);
            //$("#DepartmentID").html(Department);
            $("#DepartmentID").html(Department);

            $("#UserID").html(UserID);
            $("#UserName").html(UserName);
            $("#UserEmail").html(UserEmail); 
            $("#DepartmentID4").html(DepartmentID4); 

            $("#EquipmentType").val("");
            $('#ComputerEquipment').empty();

            
            
            $('#modalEmployee').modal('hide');
        }
    
        function ShowModalEmployee() {  $('#modalEmployee').modal('show');   }  
        function GetsubsectionmodalId() {
                var DepartmentID = document.getElementById("modalEmployeedepartment"); 
                var url =   URL + '/Service/GetSubsection?departmentid=' + DepartmentID.value;
                $('#modalEmployeesubsection').empty();
                $('#modalEmployeesubsection').append('<option value="">โปรดเลือกสายพาน</option>');
                $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        $.each(data, function (i, item) {
                            $('#modalEmployeesubsection').append('<option value="' + item.subsectionid + '">' + item.subsectionid + '</option>');
                        });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
        }
        function GetNameEquipment() {
             var url =   URL + '/Service/GetNameEquipmentByEmpID?id=' + $("#EmployeeID").html();
            $('#ComputerEquipment').empty();
            $("#tel").html("");
                 $.ajax({
                    url: url,
                    type: "GET",
                    dataType: "json",
                    contentType: "application/json",
                     success: function (data) {
                        
                        $.each(data, function (i, item) {
                            $('#ComputerEquipment').append('<option value="' + item.computerName + '">' + item.computerName + '</option>');
                            $("#tel").html(item.tel);
                        });
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
        }
        function SearchModalEmployee(_url) {
            var url = URL + '/Service/GetEmployeeByCritiria';
            var data = {
                'critiria': $("#critiria").val(),
                'subSection': $("#modalEmployeesubsection").val(),
                'department': $("#modalEmployeedepartment").val(),
                'workingDateFrom': $("#workingDateFrom").val(),
                'workingDateTo': $("#workingDateTo").val(),
                'typeTemplate': $("#TemplateType").val()
            };
            $("#tbSearchEmployee > tbody").empty();
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
                    $.each(data, function (index, element) {
                        var isHasEmployee = false;
                        $('#tbListEmployee > tbody  > tr').each(function (j, k) {
                            var r = $(k);
                            if (element.employeeID == r.find('td:eq(0)').html()) {
                                isHasEmployee = true;
                                return false;
                            }
                        });
                        chk = '<div class="icheckbox_flat-green"> <button type="button" data-btn="  ' + element.employeeID + '" class="btn btn-secondary  fix-font-btn-modal" id="' + element.employeeID + '" onclick="SelecteEmp(this);"><i class="fa fa-user-plus"></i></button>';
                        chk += '</div>';

                        newRow = '<tr>';
                        newRow += '<td class="text-center">' + ((isHasEmployee) ? "" : chk) + '</td>';
                        newRow += '<td class="text-center">' + element.employeeID + '</td>';
                        newRow += '<td>' + element.employeeName + '</td>';
                        newRow += '<td>' + element.positionID + '</td>';
                        newRow += '<td>' + element.department + '</td>';
                        newRow += '<td class="text-center">' + element.subSection + '</td>';
                        newRow += '<td class="text-center">' + element.startingDate + '</td>';
                        newRow += '<td hidden>' + element.userID + '</td>';
                        newRow += '<td hidden>' + element.userName + '</td>';
                        newRow += '<td hidden>' + element.userEmail + '</td>';
                        newRow += '<td hidden>' + element.departmentID4 + '</td>';
                        newRow += '</tr>';
                        $('#tbSearchEmployee > tbody').append(newRow);
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


function Approve(sys) {
    var isApprove = false;
    var remark = "";
    if ($('#approve1').is(':checked')) {
        isApprove = true;
    } else if (!$('#approve1').is(':checked') && !$('#reject1').is(':checked')) {
        PopupMessage('กรุณาเลือกประภทการอนุมัติ'); return;
    }
    else {
        if ($('#Approve1Remark').val() == '') { PopupMessage('กรุณาระบุหมายเหตุ'); return; }
    }
    remark = $('#Approve1Remark').val();

    ShowLoading();
    console.log(remark);
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
                let link = URL + '/Service/ListService?statusPage=' + sys;
                showCompleate(link);
            } else {
                PopupMessage(res.ex);
            }
        },
        error: function (ex) { ShowLoading(false); }
    });
} 

