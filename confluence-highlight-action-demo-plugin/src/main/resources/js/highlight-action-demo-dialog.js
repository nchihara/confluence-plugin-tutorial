Confluence.HighlightDemoDialogs = Confluence.HighlightDemoDialogs || (function($) {

    var DIALOG_MAX_HEIGHT = 200;
    var DIALOG_WIDTH = 300;
    var highlightDemoDialog;
    var defaultDialogOptions = {
        hideDelay: null,
        width : DIALOG_WIDTH,
        maxHeight: DIALOG_MAX_HEIGHT
    };

    function showHighlightDemoDialog(selectionObject) {
        highlightDemoDialog && highlightDemoDialog.remove();
        var displayFn = function(content, trigger, showPopup) {
            $(content).html(Confluence.HighlightDemoDialogs.Templates.createDialogContent(
                {
                    highlightText: selectionObject.text,
                    foundNum: selectionObject.searchText.numMatches
                }
            ));
            showPopup();
            return false;
        };
        highlightDemoDialog = _openDialog(selectionObject, 'highlight-demo-dialog', defaultDialogOptions, displayFn);
    };

    function _openDialog(selectionObject, id, options, displayFn) {
        var $target = $("<div>");
        _appendDialogTarget(selectionObject.area.average, $target);
        var originalCallback = options.hideCallback;
        options.hideCallback = function() {
            $target.remove(); // clean up dialog target element when hiding the dialog
            originalCallback && originalCallback();
        };
        var dialog = Confluence.ScrollingInlineDialog($target, id, displayFn, options);
        dialog.show();
        return dialog;
    };

    function _appendDialogTarget(targetDimensions, $target) {
        Confluence.DocThemeUtils.appendAbsolutePositionedElement($target);
        $target.css({
            top: targetDimensions.top,
            height: targetDimensions.height,
            left: targetDimensions.left,
            width: targetDimensions.width,
            "z-index": -9999,
            position: 'absolute'
        });
    };

    return {
        showHighlightDemoDialog: showHighlightDemoDialog
    };
})(AJS.$);