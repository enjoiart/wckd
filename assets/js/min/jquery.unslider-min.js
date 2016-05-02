!function($,t){if(!$)return t;var i=function(){this.el=t,this.items=t,this.sizes=[],this.max=[0,0],this.current=0,this.interval=t,this.opts={speed:500,delay:3e3,complete:t,keys:!t,dots:t,fluid:t};var i=this;this.init=function(t,i){return this.el=t,this.ul=t.children("ul"),this.max=[t.outerWidth(),t.outerHeight()],this.items=this.ul.children("li").each(this.calculate),this.opts=$.extend(this.opts,i),this.setup(),this},this.calculate=function(t){var s=$(this),e=s.outerWidth(),n=s.outerHeight();i.sizes[t]=[e,n],e>i.max[0]&&(i.max[0]=e),n>i.max[1]&&(i.max[1]=n)},this.setup=function(){if(this.el.css({overflow:"hidden",width:i.max[0],height:this.items.first().outerHeight()}),this.ul.css({width:100*this.items.length+"%",position:"relative"}),this.items.css("width",100/this.items.length+"%"),this.opts.delay!==t&&(this.start(),this.el.hover(this.stop,this.start)),this.opts.keys&&$(document).keydown(this.keys),this.opts.dots&&this.dots(),this.opts.fluid){var s=function(){i.el.css("width",Math.min(Math.round(i.el.outerWidth()/i.el.parent().outerWidth()*100),100)+"%")};s(),$(window).resize(s)}this.opts.arrows&&this.el.parent().append('<p class="arrows"><span class="prev">â†</span><span class="next">â†’</span></p>').find(".arrows span").click(function(){$.isFunction(i[this.className])&&i[this.className]()}),$.event.swipe&&this.el.on("swipeleft",i.prev).on("swiperight",i.next)},this.move=function(t,s){this.items.eq(t).length||(t=0),0>t&&(t=this.items.length-1);var e=this.items.eq(t),n={height:e.outerHeight()},h=s?5:this.opts.speed;this.ul.is(":animated")||(i.el.find(".dot:eq("+t+")").addClass("active").siblings().removeClass("active"),this.el.animate(n,h)&&this.ul.animate($.extend({left:"-"+t+"00%"},n),h,function(e){i.current=t,$.isFunction(i.opts.complete)&&!s&&i.opts.complete(i.el)}))},this.start=function(){i.interval=setInterval(function(){i.move(i.current+1)},i.opts.delay)},this.stop=function(){return i.interval=clearInterval(i.interval),i},this.keys=function(t){var s=t.which,e={37:i.prev,39:i.next,27:i.stop};$.isFunction(e[s])&&e[s]()},this.next=function(){return i.stop().move(i.current+1)},this.prev=function(){return i.stop().move(i.current-1)},this.dots=function(){var t='<ol class="dots">';$.each(this.items,function(i){t+='<li class="dot'+(1>i?" active":"")+'">'+(i+1)+"</li>"}),t+="</ol>",this.el.addClass("has-dots").append(t).find(".dot").click(function(){i.move($(this).index())})}};$.fn.unslider=function(t){var s=this.length;return this.each(function(e){var n=$(this),h=(new i).init(n,t);n.data("unslider"+(s>1?"-"+(e+1):""),h)})}}(window.jQuery,!1);