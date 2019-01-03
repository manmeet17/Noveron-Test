$(function () {
    $.ajax({
        url: '/tenant/all',
        success: function (res) {
            var head = $(".table-body");
            var data = res.data;
            // console.log(data);
            for (var i = 0; i < data.length; i++) {
                var row = $('<tr></tr>');
                var th = $('<th></th>').attr('scope', 'row').text(i + 1).appendTo(row);
                var keys = Object.keys(data[i]);
                for (var j = 1; j < keys.length - 1; j++) {
                    row.append('<td>' + data[i][keys[j]] + '</td>');
                }
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
});