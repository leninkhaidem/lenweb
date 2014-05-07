$(document).ready(function() {
    var url = []
    var count = 0;
    /*
    $(document).scroll(function(event) {


        if ($(window).height() + $(window).scrollTop() == $(document).height()) {
            //$("#submitButton").trigger('click');
            count++;
            console.log(count + ' hit the bottom');
        }
    });*/
    $("#searchAgain").click(function() {
        location.reload();

    });
    $("#submitButton").click(function() {
        $("#area1").hide(1000);
        $('#area2').hide().addClass('circle').fadeIn(3000);
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
                            data[i] = '<li><a href="#pic' + i + '"><img class="img" data-src="' + data[i] + '"></a><h1 class="center-wrapper">Picture' + i + '</h1></li>';
                            //htmlContent += '<li><a href="#pic' + i + '"><h1>Picture' + i + '</h1><img class="img" data-src="' + data[i] + '"></a></li>';
                        };
                        url = data;
                        $('#imageList').html(url.pop());
                        $.extend($.lazyLoadXT, {
                            edgeY: 0,
                            onshow: {
                                addClass: 'circle'
                            },
                            onload: {
                                removeClass: 'circle'
                            }
                        });
                        // $.lazyLoadXT.autoInit = false;
                        $('img').lazyLoadXT();
                        $("#area1").fadeIn(1500);
                        $('#area2').removeClass('circle');
                        $('#searchArea').fadeOut(500);
                        $('#marker-end').on('lazyshow', function() {
                            $('#imageList').append(
                                url.pop()
                            );
                            $(window).lazyLoadXT();
                            $('#marker-end').lazyLoadXT({
                                visibleOnly: false,
                                checkDuplicates: false
                            });
                        }).lazyLoadXT({
                            visibleOnly: false
                        });
                    }
                })
                .fail(function() {
                    $("#area1").fadeIn(1500);
                    $('#area2').removeClass('circle');
                    alert("error");
                })
        }
    });
});
