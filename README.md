# angular2-simple-modal

The simple-modal is a lightweight, reusable Angular 2 provider that will 
create a modal dialog, add it to the DOM, and then remove itself from the DOM 
when it is dismissed. The modal returns a promise indicating which button was 
pressed to dismiss the modal that then optionally can be used for further 
processing.

The modal provider consists of a single file: (`app/simple-modal.ts`) and 
can be used in conjuction with Bootstrap, your own custom style sheet, or
the provided CSS style sheet (`css/modal.css`) for presentation.

The simple-modal can be used as basis for extending for more complex modals 
if needed.


## Demo

A [working demo](http://czeckd.github.io/angular2-simple-modal/demo/) shows
the modal in action. It allows strings, buttons, and icons to be customized.
Two different styling examples for modals are provided: a default style and 
Bootstrap.


## Usage

Copy `simple-modal.ts` into your app. Import the SimpleModal and optionally 
the SimpleModalType into a component and include it in that component's 
providers and constructor.

The following parameters can be set on a modal: 
- **title** - HTML or text for the modal's title
- **message** - HTML or text for the modal's body 
- **type** - (default, info, warning, or critical)
- **blocking** - whether or not the modal can be dismissed by clicking the 
overlay
- **confirmBtn** - label of the optional confirm button. The confirmButton is 
associated with the confirm() function, which may optionally take a string to 
return via the modal's promise if clicked *( for example click('foo') would 
return 'foo' )*. If no string is given for the confirm() function's parameter, 
then the confirmBtn label will be returned.
- **cancelBtn** - label of the cancel button, which is optional if not 
blocking. The cancelButton is associated with the cancel() function, which may 
optionally take a string to return via the modal's promise if clicked *( for 
example: click('bar') )*. If no string is given for the cancel() function's 
parameter, then the cancelBtn label will be returned.
- **size** - (width and/or height) For the Bootstrap demo, the `[ngClass]` 
attribute on `<div class="modal-dialog">` element uses the width to adjust the
size according.
- **template** - HTML template the modal. A default template is provided in
`simple-modal.ts` that works in conjuction with `modal.css`. If a different
presention styling is used, say Bootstrap, then simple-modal's template must
be set. A Bootstrap template example is given in the demo.

For a usage example, see `demo-app.component.ts` and `demo-app.component.html`. 
Additionally, add the `modal.css` to your app's `index.html`.  See 
`index.html` for an example.


### Getting started

1. Clone this repo
1. Install the dependencies:
	```
    npm install
	```
1. Run the TypeScript transpiler and start the server:
	```
	npm start
	```

## License

MIT


## Author
- David Czeck [@czeckd](https://github/czeckd)
