//$("#spin").spinner({
   
//    background: "rgba(255,255,255,0.5)"    
//    , html: "<img src='../images/spin.gif' />"
//    , spin: false
//});

function ShowLoading(isShow) {

	if (typeof isShow == 'undefined')
	{
		 $("#spin").show();
		 return;
	}	

    if (isShow == false) {
        $("#spin").hide();

    } else {
        $("#spin").show();

    }
}

function PopupMessage(msg) {

    if (typeof msg == 'undefined') {       
        return;
    }	

    swal({
        title: "<h3 class='text-danger'>" + msg + "</h2>    ",
        html: true,
        type: "warning"  
    });
}

function showWarning(msg) {

    swal({
        title: "<h3 class='text-danger'>" + msg + "</h2>    ",
        html: true,
        //text: "<h3 class='text-danger'>Message</h2> ",
        type: "warning"  
    });
}


function showCompleate(link)
{
	 swal({
                                 contentType: "application/json; charset=utf-8",
                                 title: "Message",
                                 text: "ทำรายการเรียบร้อยแล้ว",
                                 type: "success",
                                 showConfirmButton: false,
                                 timer: 500
      },
         function () {

             swal.close();             

             if ((typeof link != 'undefined') && (link != ''))
             {
                 window.location.href = link;
             }                     
                        
      });
}


var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
               timer = setTimeout(callback, ms);
    };
})();

