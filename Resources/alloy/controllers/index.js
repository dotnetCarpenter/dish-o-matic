function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    var $ = this, exports = {};
    $.__views.win = A$(Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: "true",
        navBarHidden: "true",
        id: "win"
    }), "Window", null);
    $.addTopLevelView($.__views.win);
    $.__views.sfb = Alloy.createWidget("com.appcelerator.searchForBooks", "widget", {
        id: "sfb"
    });
    $.__views.sfb.setParent($.__views.win);
    var __alloyId1 = [];
    $.__views.table = A$(Ti.UI.createTableView({
        top: "50dp",
        bottom: 0,
        data: __alloyId1,
        id: "table"
    }), "TableView", $.__views.win);
    $.__views.win.add($.__views.table);
    _.extend($, $.__views);
    $.sfb.setHandlers({
        success: function(books) {
            var data = [];
            _.each(books, function(book) {
                var args = {
                    title: book.title,
                    authors: book.authors,
                    image: book.image
                }, row = Alloy.createController("row", args).getView();
                data.push(row);
            });
            $.table.setData(data);
        }
    });
    $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, A$ = Alloy.A;

module.exports = Controller;