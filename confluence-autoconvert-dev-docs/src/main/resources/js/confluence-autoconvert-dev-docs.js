(function(){
    AJS.bind("init.rte", function(){
        var pasteHandler = function(uri, node, done){
            var directoryParts = uri.directory.split('/'),
                pageName;
		    if ((uri.host === "developer.atlassian.com") && (directoryParts.length === 4) && (directoryParts[0] === "")
		        && (directoryParts[1] === "confdev") && (uri.anchor === "") && (node.text() === uri.source) ){
                    pageName = decodeURIComponent(directoryParts[3]).replace(/\+/g, " ");

                    node.text(pageName);
                    done(node);
		    }else{
                done();
            }
        };

    tinymce.plugins.Autoconvert.autoConvert.addHandler(pasteHandler);
});

})();