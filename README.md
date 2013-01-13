# Angular Enterprise Seed

This project takes angular-seed and adds Twitter Bootstrap, angular-ui, angular-ui/bootstrap, and few less conventional (but currently best-known) implementations.  It is meant to be a more substantial seed, incorporating up to date angular solutions and examples, particular around ui.  

Includes examples for a paginated grid with sort and filter support, accordian, tree, pagination, routes, navbar, etc.

# Goals

Serve as a more concrete starting point for a substantial enterprise type of application compared to angular-seed.  The dev playgound (available on navbar) contains common, ready-made implementations of various user interface components, largely borrowed from the aforementioned popular projects and jstwiddles.

Server agnostic (aka static).  No server requirement lowers the barrier to entry and allows the project to focus strictly on the client side.  A simple "python -m SimpleHTTPServer" from the directory containing this poject is enough to run the project.  Note that this does not prohibit the project from implementing ajax/$http calls.  Just host static json in app/data

# Immediate todo's (read: please help!)

Login needs help.  Trying to emulate a basic login sequence.  (A) Styling is off.  When logged in, the text is not aligned with the text of the button and other nav elements.  (B) login is tied to root scope via ng-model yet does not change when the email field is edited.  (C) Login should be wrapped in a service but have had trouble ggetting that to work (service does not recall currentName as if it's newly instantiated and not a singleton)

Playgound should be broken into individual subprojects instead of sharing a common controller.

The grid/paging http request would ideally be put into a service.

File upload / progress bars.

What to introduce better font/icon capability.

Some focus on responsiveness.

Tests - Enhance tests, consider inclusion of yeoman.

Additional/better directive examples.

Would love to have some vetting by more experienced angular developers.
