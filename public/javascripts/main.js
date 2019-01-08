$(function () {
    $.ajax({
        url: '/tenant/all',
        success: function (res) {
            var head = $(".table-body");
            var data = res.data;
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var keys = Object.keys(data[i]);
                var row = $('<tr class="entries" data-id='+data[i][keys[0]]+'></tr>');
                var th = $('<th></th>').attr('scope', 'row').text(i + 1).appendTo(row);
                
                for (var j = 1; j < keys.length - 1; j++) {
                    row.append('<td>' + data[i][keys[j]] + '</td>');
                }
                row.append('<button class="deleteBtn">Delete</button>');
                // console.log(row);                
                head.append(row);
            }
        }
    });

    $('#search').keyup(function () {
        var $rows = $('tbody tr');
        var val = $.trim($(this).val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
    });

    $('.submitBtn').click(function (e) {
        var data = $('#newEntryForm').serialize();
        $.ajax({
            type: "POST",
            url: '/tenant/new',
            data: data,
            success: function (res) {
                console.log(res);
                window.location.href="/";
            }
        });

        e.preventDefault();
    });

    $('body').delegate('.deleteBtn','click',function(event){
        event.preventDefault();
        var curr=$(this);
        var id = curr.parent().data("id");
        $.ajax({
            url: '/tenant/'+id,
            type: "DELETE",
            success: function(res){
                console.log(res);
                window.location.href="/";
            }
        });
    });

    $('body').delegate('tr','click',function(e){
        var curr = $(this);
        if(curr.hasClass('entries')){
            // $('.modal').modal();
            var tds = curr.children();
            var entries=[]
            for(var i = 0;i<tds.length-1; i++){
                entries.push($(tds[i]).text());
            }

            console.log(entries);
            var form = $("#newEntryForm input");
            for (let i = 0; i < form.length; i++) {
                $(form[i]).val(entries[i+1]);
            }

            $('.addBtn').trigger("click");
        }
    });

});