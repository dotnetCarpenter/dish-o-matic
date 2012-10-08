/**
 * DOM scaper for http://www.opensourcefood.com/recipes/all_time_best
 * @author dotnetCarpenter
 * @version 12.10.1
 */
var page = require('webpage').create(),
    base = 'http://www.opensourcefood.com/';
page.onConsoleMessage = function (msg) {
    console.log(msg);
};
/**
 * This callback is invoked when there is a JavaScript window.callPhantom call made on the web page.
 * The only argument passed to the callback is a data object.
 */
page.onCallback = function(data) { }
/**
 * By implementing this callback, you will be notified when a navigation event happens and know
 * if it will be blocked (by page.navigationLocked).
 */
page.onNavigationRequested = function(url, type, willNavigate, main) {}
/**
 * This callback is invoked when the URL changes, e.g. as it navigates away from the current URL.
 * The only argument to the callback is the new targetUrl string.
 */
page.onUrlChanged(targetUrl) {}
page.open(base + 'recipes/all_time_best', function (status) {
    try {
        if(status === "fail") throw status;
        // page.content has the HTML
        // page.plainText has the content as text (without HTML)
        
        page.evaluate(function () {
            var recList = $('.recipe_list > li');
            function getTitle(li) {
                var title = $(li).find('.owner h2 a').text();
                return title === "Untitled" ? "" : title;
            }
            
            
            console.log(
                "jQuery version:",
                recList.jquery,
                "Recipes found:",
                recList.length
            );
            recList.each(function(i, li) {            
                console.log(
                    "Title:",
                    getTitle(li)
                );
            });
            var examine = recList.map(function(i, li) {
                return getTitle(li) ? li : null;
            });
            // TODO: click on elements that requires examination
        });
        //console.log(page.plainText);
        //console.log(Object.keys(page).join("\r\n"));
    } catch(err) {
        console.log(err.message);
    } finally {
        page.close();
        phantom.exit();
    }
});


 