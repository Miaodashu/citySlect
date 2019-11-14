// PC端兼容性问题处理 方法封装
(function($) {
    $.extend({
        //初始化
        methodInit: function() {
            this.swiperRoll();
            this.selectColorRest();
            this.placeholderSimulate();
        },
        //轮播图滚动
        swiperRoll: function() {
            var banerLength = $(".banner .swiper-slide").length;
            if (banerLength > 1) {
                var mySwiper = new Swiper('.banner_swiper', {
                    autoplay: 5000, //切换时间
                    speed: 1500, //切换过渡
                    paginationClickable: true, //分页器点击切换
                    loop: true, //循环
                    autoplayDisableOnInteraction: false, //用户操作之后继续轮播
                    pagination: '.pagination', //分页器
                });
            }
        },

        //select 第一个option字体颜色设置
        selectColorRest: function() {
            var unSelected = "#757575";
            var selected = "#333";
            $(function() {
                $("select").css("color", unSelected);
                $("option").css("color", selected);
                $("select").change(function() {
                    var selItem = $(this).val();
                    if (selItem == $(this).find('option:first').val()) {
                        $(this).css("color", unSelected);
                    } else {
                        $(this).css("color", selected);
                    }
                });
            });
        },

        //ie9及以下浏览器模拟placeholder
        placeholderSimulate: function() {
            //判断placeholder属性是否可以使用的方法
            function placeholderSupport() {
                return 'placeholder' in document.createElement('input');
            };
            if (!placeholderSupport()) { // 判断浏览器是否支持 placeholder 不支持则执行一下自定义代码
                $('[placeholder]').focus(function() {
                    var input = $(this);
                    input.css({
                        'color': '#313131'
                    });
                    //判断如果你密码框，获取焦点之后属性修改为密码框 如果没有密码框此处判断可以删除 一下同理
                    if (input[0].id == 'userPassword') {
                        input.prop('type', 'password');
                    }
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        //将所有input置为文本框  主要为了重置密码框 
                        input.prop('type', 'text');
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                        input.css({
                            'color': '#888'
                        });
                    } else {
                        //密码框填写密码后 密码后恢复 密码框 
                        if (input[0].id == 'userPassword') {
                            input.prop('type', 'password');
                        }
                    }
                }).blur();
            };
        },

    });
})(jQuery);

$.methodInit();