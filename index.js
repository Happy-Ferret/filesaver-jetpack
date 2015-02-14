'use strict';

module.exports = FileSaver;

const utils      = require('sdk/window/utils'),
      { Cc, Ci } = require('chrome'),
      fileIO     = require('sdk/io/file');

const nsIFilePicker = Ci.nsIFilePicker;
var fp = Cc['@mozilla.org/filepicker;1'].createInstance(nsIFilePicker);


/**
 * FileSaver class.
 * @param {Object} opts
 *    opts = {
 *      title: 'String',
 *      fileFilter: 'String',
 *      fileExtension: 'String'
 *    }
 *
 *    title - Title of the filesaver.
 *    fileFilter - Refer [Filter constants](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIFilePicker#Constants)
 *    fileExtension - Extension of the file to save.
 */
function FileSaver (opts) {
  opts = opts || {};

  this.title = opts.title || null;
  this.fileFilter = opts.fileFilter || null;
  this.fileExtension = opts.fileExtension || null;
}

FileSaver.prototype = {

  /**
   * Open Filesaver.
   * @param {String} [optional] data
   *    Pass the data to be written to the file. If no data is passed, the
   *    file save path is returned.
   * @return {String|bool}
   *    File save path (String) is returned when no data is passed to save().
   *    A boolean is returned when data is passed, indicating the status of
   *    file write operation.
   */
  save: function (data) {
    var that = this;
    var recentWindow = utils.getMostRecentBrowserWindow();

    fp.init(recentWindow, that.title, nsIFilePicker.modeSave);
    fp.appendFilter(that.fileFilter, that.fileExtension);
    var rv = fp.show();
    if (rv == nsIFilePicker.returnOK || rv == nsIFilePicker.returnReplace) {
      var path = fp.file.path;

      if (that.fileExtension) {
        var ext = path.slice(path.length - that.fileExtension.length);
        if (ext !== that.fileExtension) {
          path += that.fileExtension;
        }
      }

      if (data) {
        var fileWriter = fileIO.open(path, 'w');
        if (!fileWriter.closed) {
          fileWriter.write(data);
          fileWriter.close();
          return true;
        } else {
          return false;
        }
      } else {
        return path;
      }
    }
  }
}
