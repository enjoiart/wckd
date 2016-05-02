
$(function() {
    var $window = $(window), win_height_padded = $window.height() * 1.1, isTouch = Modernizr.touch;
    if (isTouch) {
        $('.revealOnScroll').addClass('animated');
    }
    $window.on('scroll', revealOnScroll);
    function revealOnScroll() {
        var scrolled = $window.scrollTop(), win_height_padded = $window.height() * 1.1;
        $(".revealOnScroll:not(.animated)").each(function() {
            var $this = $(this), offsetTop = $this.offset().top;
            if (scrolled + win_height_padded > offsetTop) {
                if ($this.data('timeout')) {
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animation'));
                    }, parseInt($this.data('timeout'), 10));
                } else {
                    $this.addClass('animated ' + $this.data('animation'));
                }
            }
        });
    }
    revealOnScroll();
});;
(function($, f) {
    if (!$)
        return f;
    var Unslider = function() {
        this.el = f;
        this.items = f;
        this.sizes = [];
        this.max = [0, 0];
        this.current = 0;
        this.interval = f;
        this.opts = {
            speed: 500,
            delay: 3000,
            complete: f,
            keys: !f,
            dots: f,
            fluid: f
        };
        var _ = this;
        this.init = function(el, opts) {
            this.el = el;
            this.ul = el.children('ul');
            this.max = [el.outerWidth(), el.outerHeight()];
            this.items = this.ul.children('li').each(this.calculate);
            this.opts = $.extend(this.opts, opts);
            this.setup();
            return this;
        };
        this.calculate = function(index) {
            var me = $(this), width = me.outerWidth(), height = me.outerHeight();
            _.sizes[index] = [width, height];
            if (width > _.max[0])
                _.max[0] = width;
            if (height > _.max[1])
                _.max[1] = height;
        };
        this.setup = function() {
            this.el.css({
                overflow: 'hidden',
                width: _.max[0],
                height: this.items.first().outerHeight()
            });
            this.ul.css({
                width: (this.items.length * 100) + '%',
                position: 'relative'
            });
            this.items.css('width', (100 / this.items.length) + '%');
            if (this.opts.delay !== f) {
                this.start();
                this.el.hover(this.stop, this.start);
            }
            this.opts.keys && $(document).keydown(this.keys);
            this.opts.dots && this.dots();
            if (this.opts.fluid) {
                var resize = function() {
                    _.el.css('width', Math.min(Math.round((_.el.outerWidth() / _.el.parent().outerWidth()) * 100), 100) + '%');
                };
                resize();
                $(window).resize(resize);
            }
            if (this.opts.arrows) {
                this.el.parent().append('<p class="arrows"><span class="prev">â†</span><span class="next">â†’</span></p>').find('.arrows span').click(function() {
                    $.isFunction(_[this.className]) && _[this.className]();
                });
            };
            if ($.event.swipe) {
                this.el.on('swipeleft', _.prev).on('swiperight', _.next);
            }
        };
        this.move = function(index, cb) {
            if (!this.items.eq(index).length)
                index = 0;
            if (index < 0)
                index = (this.items.length - 1);
            var target = this.items.eq(index);
            var obj = {
                height: target.outerHeight()
            };
            var speed = cb ? 5: this.opts.speed;
            if (!this.ul.is(':animated')) {
                _.el.find('.dot:eq(' + index + ')').addClass('active').siblings().removeClass('active');
                $.isFunction(_.opts.beforestart)&&!cb && _.opts.beforestart(_.el);
                this.el.animate(obj, speed) && this.ul.animate($.extend({
                    left: '-' + index + '00%'
                }, obj), speed, function(data) {
                    _.current = index;
                    $.isFunction(_.opts.complete)&&!cb && _.opts.complete(_.el);
                });
            }
        };
        this.start = function() {
            _.interval = setInterval(function() {
                _.move(_.current + 1);
            }, _.opts.delay);
        };
        this.stop = function() {
            _.interval = clearInterval(_.interval);
            return _;
        };
        this.keys = function(e) {
            var key = e.which;
            var map = {
                37: _.prev,
                39: _.next,
                27: _.stop
            };
            if ($.isFunction(map[key])) {
                map[key]();
            }
        };
        this.next = function() {
            return _.stop().move(_.current + 1)
        };
        this.prev = function() {
            return _.stop().move(_.current - 1)
        };
        this.dots = function() {
            var html = '<ol class="dots">';
            $.each(this.items, function(index) {
                html += '<li class="dot' + (index < 1 ? ' active' : '') + '">' + (index + 1) + '</li>';
            });
            html += '</ol>';
            this.el.addClass('has-dots').append(html).find('.dot').click(function() {
                _.move($(this).index());
            });
        };
    };
    $.fn.unslider = function(o) {
        var len = this.length;
        return this.each(function(index) {
            var me = $(this);
            var instance = (new Unslider).init(me, o);
            me.data('unslider' + (len > 1 ? '-' + (index + 1) : ''), instance);
        });
    };
})(window.jQuery, false);;

