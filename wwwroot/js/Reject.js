 
function Cancel() {
    var id = $('#RunningID').html();
    if (id == "") { showWarning("ไม่พบ เลขที่ใบแจ้ง !"); return; }
    swal({
        title: "คุณแน่ใจ หรือไม่?",
        text: "เมื่อคุณยืนยันการเปลี่ยนข้อมูล รายการนี้จะถูกยกเลิก!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef5350",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            rejectC01(id);
        } else {
            return;
        }
    });

    function rejectC01(id) {
        var url = URL + '/Service/Cancel';
        $.ajax({
            type: "POST",
            url: url,
            data: { id: id },
            dataType: "json",
            beforeSend: function () { ShowLoading(); },
            success: function (res) {
                if (res.success == true) {
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
}


function Reject() {
    swal({
        title: "เมื่อคุณยืนยันการเปลี่ยนข้อมูล รายการนี้จะถูกยกเลิก กลับไปที่ ต้นสังกัดลงข้อมูล!!",
        text: "หมายเหตุ ",
        type: "input",

        closeOnConfirm: true,
        closeOnCancel: true, showCancelButton: true
    }, function (value) {
        if (value === false) {
            return;
        } else {
            _reject($("#RunningID").html(), value);
        }
    });
}
function _reject(id, remark) {
       var url = URL + '/Service/Reject'; 
    $.ajax({
        type: "POST",
        url: url,
        data: { id: id, remark: remark },
        dataType: "json",
        beforeSend: function () { ShowLoading(); },
        success: function (res) {
            if (res.success == true) {
                      let link = URL + '/Service/ListService?statusPage=P01'; showCompleate(link);

            }
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (ex) { }
    });
}