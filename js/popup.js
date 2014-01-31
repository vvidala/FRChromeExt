$(function() {
    var locals = {};
    locals.newTab = function(url) {
        
    }
    locals.doSearch = function(cityState, beds, baths, price) {
        // "http://www.forrent.com/results.php?main_field=Norfolk%2C+VA&sbeds=99&sbaths=99&max_price=999"
        beds = beds || 99;
        baths = baths || 99;
        if( !cityState.isNan() && cityState.length > 6) {

        }
    }

    if($("#cityState").length) {
        $("#cityState").focus();
    }
    $('.jq-search-autocomplete').autocomplete({
        source: function (request, response) {
            /*
            $.ajax({
                url: "http://www.forrent.com/fr-search/autocomplete",
                data: {base: $("[name='page_type_id']").val(), term:request.term},
                success: function (data) {
                    response(data);
                },
                cache: true,
                crossDomain: true,
                dataType:'jsonp'
            });
            */
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState==4 && xhr.status==200)
                {
                    var tmp = xhr.responseText, 
                        /* FIXME: Find a nother way to implement JSONP */
                        res = JSON.parse(tmp.substring(1, tmp.length-2));
                    response(res);
                }
            };
            xhr.open("GET", "http://www.forrent.com/fr-search/autocomplete?term="+request.term, true);
            xhr.send();
        },
        minLength: 3
    });

    $('#btnSearch').click(function(e) {
        var text = $("#cityState").val();
        if (!isNaN(text) && text.length > 5) {
            url = "http://www.forrent.com/apartment-community-profile/"+text+".php";
        }
        else {
            var url ="http://www.forrent.com/results.php?"+$("#headerSearch").serialize();
            
        }
        chrome.tabs.create({'url': url});
        
    });
});