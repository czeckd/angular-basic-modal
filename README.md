# angular2-simple-modal

The simple-modal is a lightweight, reusable Angular 2 provider that will 
create a modal dialog, add it to the DOM, and then remove itself from the DOM 
when it is dismissed. The modal returns a promise indicating which button was 
pressed to dismiss the modal that then optionally can be used for further 
processing.

The modal provider consist of a mere two files: a TypeScript source file 
(`app/simple-modal.ts`) and a CSS style sheet (`css/modal.css`) for 
presentation. The simple-modal can be used as basis for extending for more
complext modals if needed.


## Demo

A [working demo](http://czeckd.github.io/angular2-simple-modal/demo/) shows
the modal in action. It allows strings, buttons, and icons to be customized.

## Usage

Copy `simple-modal.ts` into your app. Import the SimpleModal and optionally 
the SimpleModalType into a component and include it in that component's 
providers and constructor.


For a usage example, see `demo-app.component.ts` 
and `demo-app.component.html`. Additionally, add the `modal.css` to your app's 
`index.html`.  See `index.html` for an example.


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
