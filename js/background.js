chrome.omnibox.onInputChanged.addListener(
    function(text, suggest) {
        if(!isNaN(text)){
            switch(true) {
                case text.length === 5 :
                    chrome.omnibox.setDefaultSuggestion({description: "Apartments For Rent Near Zipode "+text});
                    break;
                case text.length > 5:
                    chrome.omnibox.setDefaultSuggestion({description: "View Apartment with SiteId "+text});
                    break;
                default:
                    chrome.omnibox.setDefaultSuggestion({description: "Run ForRent Quick Search Command: "+text});
            }
        }
        else {
            chrome.omnibox.setDefaultSuggestion({description: "Run ForRent Quick Search Command: "+text});
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState==4 && xhr.status==200)
                {
                    var tmp = xhr.responseText, 
                        /* FIXME: Find a nother way to implement JSONP */
                        res = JSON.parse(tmp.substring(1, tmp.length-2)),
                        suggestions = [];
                    for(sug in res) {
                        suggestions.push({
                            content: res[sug].value, 
                            description: "Apartments For Rent in "+res[sug].value
                        });
                    }
                    console.log(suggestions);
                    suggest(suggestions);
                }
            };
            xhr.open("GET", "http://www.forrent.com/fr-search/autocomplete?term="+text, true);
            xhr.send();
        }
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text, currentTab) {
    console.log('inputEntered: ' + text);
    console.log(currentTab);
    chrome.tabs.getSelected(null, function(tab)
    {
        var url;
        if (!isNaN(text) && text.length > 5) {
            url = "http://www.forrent.com/apartment-community-profile/"+text+".php";

        // If text does not look like a URL, user probably selected the default suggestion, eg reddit.com for your example
        } else {
            url = 'http://www.forrent.com/results.php?main_field=' + text;
        }
        chrome.tabs.update(tab.id, {url: url});
    });
});
