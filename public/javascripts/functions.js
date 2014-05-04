$(document).ready(function() {
    var count = 0;
    $(document).scroll(function(event) {
        /* Act on the event */


        if ($(window).height() + $(window).scrollTop() == $(document).height()) {
            $("#submitButton").trigger('click');
            count++;
            console.log(count + ' hit the bottom');
        }
    });
    $("#submitButton").click(function() {

        var htmlContent = "";
        if ($("#searchString").val().length) {


            $.ajax({
                url: '/search',
                type: 'post',
                dataType: 'json',
                data: {
                    search: $("#searchString").val()
                },
            })
                .done(function(data) {
                    console.log("data is " + data)
                    if (data.length == 0) {
                        alert('search returned 0 result');
                    } else {
                        for (var i = 0; i < data.length; i++) {
                            htmlContent += '<li><a href="#pic' + i + '"><h1>Picture' + i + '</h1><img class="lazy" data-original="' + data[i] + '"></a></li>';
                        };
                        $('#imageList').append(htmlContent);
                    }
                    $(function() {
                        $("img.lazy").lazyload();
                    });
                })
                .fail(function() {
                    alert("error");
                })
        }
    });

});
