!function($){$.fn.visible=function(i){var l=$(this),n=$(window),o=n.scrollTop(),s=o+n.height(),a=l.offset().top,e=a+l.height(),d=i===!0?e:a,t=i===!0?a:e;return s>=t&&d>=o}}(jQuery);var win=$(window),allMods=$(".slide");allMods.each(function(i,l){var l=$(l);l.visible(!0)&&l.addClass("already-visible")}),win.scroll(function(i){allMods.each(function(i,l){var l=$(l);l.visible(!0)&&l.addClass("come-in")})});