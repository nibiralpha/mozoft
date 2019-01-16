$.get("http://localhost:3000/home", function (keys) {
    // console.log(keys);
    var regex;
    // \b(bla hello)

    if (keys && keys.keywords && keys.keywords.length > 0) {
        keys.keywords.forEach(key => {
            var matched = false;

            for (var i = 0; i < excludes.length; i++) {
                regex = new RegExp('\\' +  'b(' + excludes[i] + ')', 'gi');
                // console.log(regex);
                
                var found = key.keyword.match(regex);
                
                if (found != null) {
                    matched = true;
                    return;
                }
            }
            
            if(!matched){
                $("#container").append("<div id='" + key._id + "'>" + key.keyword + "</div>");
            }
        });
    }
});

var count = 0;
var searchTxt = '';

$(document).ready(function () {

    $("#start").click(function () {
        console.log("start");
        doOver();
    })
});

function doOver() {
    console.log("do over", count);
    searchTxt = $("#container div:eq('" + count + "')").html();
    var id = $("#container div:eq('" + count + "')").attr("id");

    $.post("http://127.0.0.1:3000/saveid",
        {
            id: id
        },
        function (data, status) {
            if (data && data.id != null) {
                window.open('https://www.google.com/?#q=' + searchTxt);
                count++;
            }
        });
}

window.addEventListener("message",
    function (e) {
        console.log("message receive");
        if (e.origin == "http://localhost" && e.data && e.data.id !== undefined) {
            console.log("condition pass");
            doOver();
        }
    },
    false);
