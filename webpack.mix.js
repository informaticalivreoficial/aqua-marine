const mix = require('laravel-mix');

mix
 //WEB
 .styles([
     'resources/views/web/css/style.css'
 ], 'public/frontend/assets/css/style.css') 
  
.copyDirectory('resources/views/web/fonts','public/frontend/assets/fonts')
.copyDirectory('resources/views/web/images','public/frontend/assets/images')

.scripts([
    'resources/views/web/js/core.min.js'
], 'public/frontend/assets/js/core.min.js')

.scripts([
    'resources/views/web/js/pointer-events.min.js'
], 'public/frontend/assets/js/pointer-events.min.js')
 
.scripts([
    'resources/views/web/js/SmoothScroll.min.js'
], 'public/frontend/assets/js/SmoothScroll.min.js')
 
.scripts([
    'resources/views/web/js/bootstrap.js'
], 'public/frontend/assets/js/bootstrap.js')
 
.scripts([
    'resources/views/web/js/rdvideoplayer.js'
], 'public/frontend/assets/js/rdvideoplayer.js')
 
.scripts([
    'resources/views/web/js/moment.js'
], 'public/frontend/assets/js/moment.js')
 
.scripts([
    'resources/views/web/js/materialdatepicker.js'
], 'public/frontend/assets/js/materialdatepicker.js')
 
.scripts([
    'resources/views/web/js/timecircles.js'
], 'public/frontend/assets/js/timecircles.js')
 
.scripts([
    'resources/views/web/js/script.js'
], 'public/frontend/assets/js/script.js')
 
 .options({
     processCssUrls: false
 })
 
 .version()
     
;