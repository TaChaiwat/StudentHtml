  $('input[type=radio][name=rating]').change(function () {
           $("#RatingScore").val(this.value); 
         });  
  function SaveScore() {
             if ($("#RatingScore").val() == "0") {
                 PopupMessage('กรุณาเลือกอย่างน้อย 1 ดาว ก่อน บันทึก'); return;
             } 
             ShowLoading();
             var url = URL + '/Service/SaveScore';
             var data = {
                 'RunningID': $("#RunningID").html(),
                 'RatingScore': $("#RatingScore").val(), 
             };
             $.ajax({
                 type: "POST",
                 url: url,
                 data: data,
                 dataType: "json",
                 success: function (res) {
                     ShowLoading(false);
                     if (res.success) {
                         let link = URL + '/Service/ListService?statusPage=F01&Rating=y';
                         showCompleate(link);
                     } else {
                         PopupMessage(res.ex);
                     }
                 },
                 error: function (ex) { ShowLoading(false); }
             });

         }