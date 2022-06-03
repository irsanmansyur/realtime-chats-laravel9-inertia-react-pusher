const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
const tailwindPlugins = [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
];

mix.js("resources/js/chats.js", "public/js")
    .react()

    .webpackConfig(require("./webpack.config"))
    .postCss("resources/css/chats.css", "public/css", tailwindPlugins)
    .postCss("resources/css/app.css", "public/css", tailwindPlugins)
    .alias({
        "@": "resources/js",
    });

if (mix.inProduction()) {
    mix.version();
}
