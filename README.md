# About Frend

A collection of accessible, modern front-end components.

Frend components are modest and dependency-free. They are built with web standards as a priority and aim to avoid assumptions about tooling or environment. Care has been taken to make sure each component is compliant, keyboard navigable and properly interpreted by assistive technologies.

The purpose of Frend is to offer ready-to-use components for projects. These also provide specifics on how they’ve utilised ARIA attributes and event bindings, based on global recommendations, in order to make them more predictable and usable for all.

The goal is to work on these components collaboratively. This allows us to share our implementation experiences, approaches to supporting different environments, and any bugs we’ve come across along the way.

## Standards
Appropriate, semantic elements are at the core of each Frend component. This ensures that a useable baseline for the content or interaction is in place before we introduce enhancements using CSS or JavaScript. Enhancements are based upon available features, so components won’t necessarily function the same in every browser. And that's okay.

### CSS
CSS included with each component is purely functional. We include the relevant selectors in our stylesheets, but what you do within them is entirely up to you. We favour a BEM syntax when defining selectors, however these are all configurable in the component options if you’d like to use a different convention.

Styling hooks are added to the component when it's initialised, so we have the ability to apply styles to their static state, before we style them in their fully-functioning state.


### JavaScript
JavaScript is written using ES2015 module syntax. Modules export themselves, so they’re available to `import` into your existing project where and when they are needed. If this doesn’t suit your workflow, we also transpile modules to ES5 and bundle them using UMD, so they can be compiled using module loaders, or directly in the browser via a `<script>` tag. You can find these files in the `dist` directory of each component.

A simple API is exposed for each component instance, which usually contains `init()` and `destroy()` methods. More information about invoking components and any additional methods can be found on each of their respective pages.

The JavaScript written to enhance these components has been purposefully left with as little abstraction as possible. While we bundle scripts into ready-to-use plugins, it's also important that the source files can remain a clear reference for those interested in stepping through each of the methods. We hope this helps other developers in uncovering the steps involved in making the components more accessible.

## Testing
Our thanks go to [BrowserStack](https://www.browserstack.com/) for providing us with an open-source account.

## Platform
Frend is powered by [Jekyll](http://jekyllrb.com) and served directly from the [frend/frend.co Github repository](https://github.com/frend/frend.co) thanks to [Github Pages](https://pages.github.com/). If you're cloning the repo, running the site locally will first require installation of Jekyll gems:

~~~
gem install jekyll
gem install jekyll-redirect-from
jekyll serve
~~~

Automated builds for component script files are handled by running Gulp's watch task as you develop:

~~~
npm install
gulp watch
~~~

## Contributing
Please refer to our [contributing guidelines](https://github.com/frend/frend.co/blob/gh-pages/CONTRIBUTING.md).

## Feedback
If you have feedback or suggestions on how to make Frend better, please [email us](mailto:hello@frend.co) or [Tweet us](http://www.twitter.com/ffffrend).