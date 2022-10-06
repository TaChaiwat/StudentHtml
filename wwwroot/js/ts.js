function GeneratePaging(pager) {
    //onclick="selectJob(\'' + $('#DepartmentID option:selected').val() + '\',\'' + element.positionID + '\')"
    //html = html.concat('<a onclick="GetCouseAgency(\'' + id + '\' );" class="page-link"  >Previous<a>');

    debugger;
    let html = "";
    let active = "";
    if (pager.endPage > 1) {
        html = html.concat('<ul class="pagination">');
        if (pager.currentPage > 1) {
            html = html.concat('<li class="page-item">');
            html = html.concat('<a  class="page-link" onclick="ShowLoading();">First<a>');
            html = html.concat('<li>');
            html = html.concat('<li class="page-item">');
            html = html.concat('<a onclick="GetCouseAgency(\'' + id + '\',\'' + position + '\',\'' + pages - 1 + '\' );" class="page-link"  >Previous<a>');
            html = html.concat('<li>');
        }
        for (var pages = pager.startPage; pages < pager.endPage; pages++) {
            if (pages == pager.currentPage) { active = "active"; } else { active = ""; }
            html = html.concat('<li class="page-item " + active + "">');
            html = html.concat('<a  onclick="GetCouseAgency(\'' + id + '\',\'' + position + '\',\'' + pages + '\' );"  class="page-link"  > '+ pages +'<a>');
            html = html.concat('<li>');
        }
        if (pager.currentPage < pager.totalPages) {
            html = html.concat('<li class="page-item">');
            html = html.concat('<a   onclick="GetCouseAgency(\'' + id + '\',\'' + position + '\',\'' + pages + 1 + '\' )"   class="page-link" >Next<a>');
            html = html.concat('<li>');
            html = html.concat('<li class="page-item">');
            html = html.concat('<a  onclick="GetCouseAgency(\'' + id + '\',\'' + position + '\',\'' + pager.totalPages + '\' )"   class="page-link" >Last<a>');
            html = html.concat('<li>');
        }
        html = html.concat('<ul>');

    }