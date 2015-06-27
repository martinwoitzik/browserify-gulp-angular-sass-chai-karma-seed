# Seed Project including browserify, gulp, angular, sass, chai, karma

Seed project structure for easily setting up frontend projects with angular, browserify, sass, gulp and for TDD-purposes also karma and chai.

All modules are packed in separate folders and can be easily accessed via 'require' statements inside of other modules.
You don't have to care on how to import every module. Just use them.

Module folders are similar to each other. They always include these files:

- index.js (this is where you define your angular-module, e.g. the configuration, controllers, directives, filters, etc.)
- {modulename}.config.js (angular-module configuration for example to define the ui-states)
- {modulename}.controller.js (angular-module controller)
- {modulename}.directive.js (angular-module directive)
- {modulename}.html (template file)
- {modulename}.scss (sass-stylesheets)
- {modulename}_{isoCode}.json (JSON file including localized texts. All possible isoCodes can be specified via gulp/config.js)
- {modulename}.spec.js (optional: spec-file for automated testing of your module)


# Get started

Open a console and enter the following commands:

1. bower install
2. npm install
3. gulp build or gulp watch

The project gets built for the first time. After the build is completed you can open the '/public/index.html' file in your browser.


# Why to use it?

The project structure isn't divided into separate folders for e.g. ui, styles, specs/tests - it's completely module centric.
If you delete one module you also delete all related files and configurations which makes it easier to maintain big projects.
Including modules inside of other modules is also straight forward - just require the specific folder and then add the module to the modules dependencies.
Browserify does all the require magic so you can concentrate on coding features and not caring about files and how to set things up.


# TODO

- language files need to be concatenated to one file
- language files get compiled but are not included via angular yet
- add font folder to /shared
