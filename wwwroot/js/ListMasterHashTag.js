function Delete(id) {
    if (id == "") { showWarning("ไม่พบ รหัส !"); return; }
    swal({
        title: "คุณแน่ใจ หรือไม่?",
        text: "เมื่อคุณยืนยันการเปลี่ยนข้อมูล รายการนี้จะถูกลบ!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef5350",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function (isConfirm) {
        if (isConfirm) {
            remove(id);
        } else {
            return;
        }
    });
    function remove(id) {
        var url = URL + '/Service/HashTagDelete';
        $.ajax({
            type: "POST",
            url: url,
            data: { id: id },
            dataType: "json",
            beforeSend: function () { ShowLoading(); },
            success: function (res) {
                if (res.success == true) {
                    window.location.reload();
                }
                else { showWarning(res.ex); return; }

            },
            complete: function () {
                ShowLoading(false);
            },
            error: function (ex) { showWarning(ex.ex); return; }
        });
    }
} 
function Edit(HashTagID, HashTagName) {
    status = "E";
    $("#id").val(HashTagID);
    $("#name").val(HashTagName); 
    $("#popupModal").modal('show');
} 
function ClearInput() {
    $("#id").val("");
    $("#name").val(""); 
} 
function Save() {
    var url = URL + '/Service/HashTagAdd';
    if ($("#name").val() == "") { PopupMessage("กรุณาใส่ข้อมูลให้ครบ"); return; } 

    var item = {
        'HashTagID': $("#id").val(),
        'HashTagName': $("#name").val(), 
        'status': status,
    }; 
    $.ajax({
        type: "POST",
        url: url,
        data: item,
        dataType: "json",
        beforeSend: function () {
            ShowLoading();
        },
        success: function (res) {
            if (res.success == false) {
                PopupMessage(res.ex);
                return;
            }
            if (res.success) { 
                showCompleate(location.href);
            }
        },
        complete: function () {
            ShowLoading(false);
        },
        error: function (ex) { }
    });
}
function OpenModal() {
    status = "A";
    ClearInput();
    $('#popupModal').modal('show');
}