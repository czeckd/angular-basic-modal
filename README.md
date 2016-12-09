# angular2-simple-modal

Simple-modal is a lightweight, reusable Angular 2.3.0 compatible solution 
that will create a modal dialog, add it to the DOM, and then remove the modal 
from the DOM when it is dismissed. The modal returns a promise indicating 
which button was pressed to dismiss the modal that then optionally can be used 
for further processing.

The ``BaseModal`` has a default, generic modal style provided that can be 
extended to display modals with other style sheets, such as Bootstrap.

### Demo

A [working demo](http://czeckd.github.io/angular2-simple-modal/demo/) shows
the modal in action. It allows strings, buttons, and icons to be customized.

### Usage

Three parts comprise the simple-modal: a ``BaseModalConfig``, a modal 
component, and the ``SimpleModal`` provider.

The ``BaseModalConfig`` contains the settings for the modal and is injected 
when the modal is created by calling ``show(config:BaseModalConfig, 
modal:Type<BaseModal>)`` on the ``SimpleModal`` provider. The modal loaded can 
either be the default ``BaseModal`` component or a component extending it. See 
the ``BootstrapModal`` component for an example.

The following parameters are settable on the ``BaseModalConfig``: 
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
- **width/height** - (size) For the Bootstrap demo, the `[ngClass]` 
attribute on `<div class="modal-dialog">` element uses the width to adjust the
size according.

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

### License

MIT


### Author
- David Czeck [@czeckd](https://github.com/czeckd)
