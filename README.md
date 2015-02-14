filesaver-jetpack
=================

[![NPM](https://nodei.co/npm/filesaver-jetpack.png)](https://nodei.co/npm/filesaver-jetpack/)

Quickly create filesaver in firefox add-ons ([jpm](https://github.com/mozilla/jpm) based).

## To use

  1. Install it:

    ```bash
    $ npm i filesaver-jetpack
    ```

  2. Import it and use:

    ```js
    var FileSaver = require('filesaver-jetpack');
    var fs = new FileSaver({title: 'Save a File',
                            fileExtension: '.txt'});
    fs.save('File content to be written');
    ```

#### FileSaver(opts)

`opts` should be an object with 3 optional properties.

`title` - Title of the filesaver dialog box.

`fileFilter` - Refer [Filter constants](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIFilePicker#Constants)

`fileExtension` - Extension of the file to be saved, like '.txt'.


#### save(data)

Opens the save dialog box and writes the passes `data` to a file. If no data is passed, it returns the path of save file selected.

`data` - Data to be written to the file.


## Test it

Clone the repo and run `npm install` inside the repo to install all the dependencies. Prepare for testing by running `npm test`. `cd` into jpmTest/ and run `jpm run -b /path/to/firefox-nightly`.

Example, on OS X

```bash
$ jpm run -b /Applications/Nightly.app
```
This works only in firefox nightly, like jpm.

## LICENSE

MPL
