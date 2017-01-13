(function($) {
  'use strict';

   $.fn.lowerPreview = function(options) {
     var default_options = {
       maxSize: 300,
       exts: ["gif", "jpeg", "jpg", "bmp", "png"],
       onUnsupportedExt: {},
       unsupportedExtMessage: 'The extension of uploaded image is unsupported',
       onOverSize: {},
       overSizeMessage: 'The size of uploaded image is too large',
       onUnsupportedBrowser: {},
       unsupportedBrowserMessage: "Your browser doesn't support this function",
       onLoad: {}
     }

     var settings = $.extend(default_options, options);

     $(this).on("change", function(){
       var origin = $(this);
       // check if current browser support FileReader
       if (typeof FileReader == "undefined") {
         if($.isFunction(settings.onUnsupportedBrowser)){
           settings.onUnsupportedBrowser();
         }else{
           alert(settings.unsupportedBrowserMessage);
         }
         return false
       }

       $.each(this.files, function(index, file) {
         // if(!RegExp("\.(" + settings.exts.join("|") + ")$", "i").test(this.value.toLowerCase())){
         if (!file.type.match(/^image\/*/)) {
           if($.isFunction(settings.onUnsupportedExt)){
             settings.onUnsupportedExt();
           }else{
             alert(settings.unsupportedExtMessage);
           }
           return false
         }

         if((file.size/1024) > settings.maxSize){
           if($.isFunction(settings.onOverSize)){
             settings.onOverSize();
           }else{
             alert(settings.overSizeMessage);
           }
           return false
         }

         var reader = new FileReader();

         reader.onload = function(){
            var image = $('<img>').attr('src', reader.result);
            if($.isFunction(settings.onLoad)){
              settings.onLoad(origin, image);
            }else{
              console.log("There is no onLoad callback, you will cannot see anymore");
            }
         }
         reader.readAsDataURL(file);
       })
     })
   }
})(jQuery);
