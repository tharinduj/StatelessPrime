angular.module("angular.prime").directive("puiLightbox",["$compile",function(a){return{restrict:"A",priority:5,compile:function(){return function(c,b,d){function f(){var d="";angular.forEach(g,function(a){d=d+'<a href="'+a.image+'" title="'+a.oneLiner+'"><img src="'+a.thumbnail+'" title="'+a.title+'"/></a>'});b.html(d);a(b.contents())(c);$(function(){h||b.puilightbox("destroy",{});b.puilightbox({iframe:e.iframe,iframeWidth:e.iframeWidth,iframeHeight:e.iframeHeight});h=!1})}var e=c.$eval(d.puiLightbox)||
{};e.iframe="A"===b[0].nodeName;var g=[],h=!0;angular.isArray(e)||angular.isArray(e.items)?angular.isArray(e)?c.$watch(d.puiLightbox,function(a){g=a;f()},!0):c.$watch(d.puiLightbox+".items",function(a){g=a;f()},!0):$(function(){b.puilightbox({iframe:e.iframe,iframeWidth:e.iframeWidth,iframeHeight:e.iframeHeight})})}}}}]).directive("puiLightboxItem",function(){return{restrict:"A",priority:10,compile:function(a,c){var b=a.parent().data("puiLightboxType");void 0===b&&(b=a.parent().children("[pui-lightbox-item]"),
b=0!=b.length?1<b.length?"images":"inline":void 0,a.parent().data("puiLightboxType",b));"inline"===b&&(a.addClass("ui-helper-hidden"),a.before('<a class="group" href="#">'+c.title+"</a>  "),a.removeAttr("pui-lightbox-item"));if("images"===b){var b=a.children("img"),d=a.attr("title"),f=a.attr("src"),e=b.attr("src"),g=b.attr("alt")||b.attr("title");$(function(){a.children().attr("src",f);a.children().attr("alt",d);a.children().attr("title",d);a.children().wrap('<a href="'+e+'" title="'+g+'">');a.replaceWith(a.html())})}}}});$(function(){$.widget("primeui.puilightbox",{options:{iframeWidth:640,iframeHeight:480,iframe:!1},_create:function(){this.options.mode=this.options.iframe?"iframe":1==this.element.children("div").length?"inline":"image";this.panel=$('<div class="pui-lightbox ui-widget ui-helper-hidden ui-corner-all pui-shadow"><div class="pui-lightbox-content-wrapper"><a class="ui-state-default pui-lightbox-nav-left ui-corner-right ui-helper-hidden"><span class="ui-icon ui-icon-carat-1-w">go</span></a><div class="pui-lightbox-content ui-corner-all"></div><a class="ui-state-default pui-lightbox-nav-right ui-corner-left ui-helper-hidden"><span class="ui-icon ui-icon-carat-1-e">go</span></a></div><div class="pui-lightbox-caption ui-widget-header"><span class="pui-lightbox-caption-text"></span><a class="pui-lightbox-close ui-corner-all" href="#"><span class="ui-icon ui-icon-closethick"></span></a><div style="clear:both" /></div></div>').appendTo(document.body);
this.contentWrapper=this.panel.children(".pui-lightbox-content-wrapper");this.content=this.contentWrapper.children(".pui-lightbox-content");this.caption=this.panel.children(".pui-lightbox-caption");this.captionText=this.caption.children(".pui-lightbox-caption-text");this.closeIcon=this.caption.children(".pui-lightbox-close");"image"===this.options.mode?this._setupImaging():"inline"===this.options.mode?this._setupInline():"iframe"===this.options.mode&&this._setupIframe();this._bindCommonEvents();this.links.data("puilightbox-trigger",
!0).find("*").data("puilightbox-trigger",!0);this.closeIcon.data("puilightbox-trigger",!0).find("*").data("puilightbox-trigger",!0)},_bindCommonEvents:function(){var a=this;this.closeIcon.hover(function(){$(this).toggleClass("ui-state-hover")}).click(function(c){a.hide();c.preventDefault()});$(document.body).bind("click.pui-lightbox",function(c){if(!a.isHidden()&&!$(c.target).data("puilightbox-trigger")){var b=a.panel.offset();(c.pageX<b.left||c.pageX>b.left+a.panel.width()||c.pageY<b.top||c.pageY>
b.top+a.panel.height())&&a.hide()}});$(window).resize(function(){a.isHidden()||$(document.body).children(".ui-widget-overlay").css({width:$(document).width(),height:$(document).height()})})},_setupImaging:function(){var a=this;this.links=this.element.children("a");this.content.append('<img class="ui-helper-hidden"></img>');this.imageDisplay=this.content.children("img");this.navigators=this.contentWrapper.children("a");this.imageDisplay.load(function(){var c=$(this);a._scaleImage(c);var b=(a.panel.width()-
c.width())/2,d=(a.panel.height()-c.height())/2;a.content.removeClass("pui-lightbox-loading").animate({width:c.width(),height:c.height()},500,function(){c.fadeIn();a._showNavigators();a.caption.slideDown()});a.panel.animate({left:"+="+b,top:"+="+d},500)});this.navigators.hover(function(){$(this).toggleClass("ui-state-hover")}).click(function(c){var b=$(this);a._hideNavigators();b=b.hasClass("pui-lightbox-nav-left")?0==a.current?a.links.length-1:a.current-1:a.current==a.links.length-1?0:a.current+1;
a.links.eq(b).trigger("click");c.preventDefault()});this.links.click(function(c){var b=$(this);a.isHidden()?(a.content.addClass("pui-lightbox-loading").width(32).height(32),a.show()):(a.imageDisplay.fadeOut(function(){$(this).css({width:"auto",height:"auto"});a.content.addClass("pui-lightbox-loading")}),a.caption.slideUp());setTimeout(function(){a.imageDisplay.attr("src",b.attr("href"));a.current=b.index();var c=b.attr("title");c&&a.captionText.html(c)},1E3);c.preventDefault()})},_scaleImage:function(a){var c=
$(window),b=c.width(),c=c.height(),d=a.width(),f=a.height(),e=f/d;d>=b&&1>=e?(d=0.75*b,f=d*e):f>=c&&(f=0.75*c,d=f/e);a.css({width:d+"px",height:f+"px"})},_setupInline:function(){this.links=this.element.children("a");this.inline=this.element.children("div").addClass("pui-lightbox-inline");this.inline.appendTo(this.content).show();var a=this;this.links.click(function(c){a.show();var b=$(this).attr("title");b&&(a.captionText.html(b),a.caption.slideDown());c.preventDefault()})},_setupIframe:function(){var a=
this;this.links=this.element;this.iframe=$('<iframe frameborder="0" style="width:'+this.options.iframeWidth+"px;height:"+this.options.iframeHeight+'px;border:0 none; display: block;"></iframe>').appendTo(this.content);this.options.iframeTitle&&this.iframe.attr("title",this.options.iframeTitle);this.element.click(function(c){a.iframeLoaded?a.show():(a.content.addClass("pui-lightbox-loading").css({width:a.options.iframeWidth,height:a.options.iframeHeight}),a.show(),a.iframe.on("load",function(){a.iframeLoaded=
!0;a.content.removeClass("pui-lightbox-loading")}).attr("src",a.element.attr("href")));var b=a.element.attr("title");b&&(a.caption.html(b),a.caption.slideDown());c.preventDefault()})},show:function(){this.center();this.panel.css("z-index",++PUI.zindex).show();this.modality||this._enableModality();this._trigger("show")},hide:function(){this.panel.fadeOut();this._disableModality();this.caption.hide();"image"===this.options.mode&&(this.imageDisplay.hide().attr("src","").removeAttr("style"),this._hideNavigators());
this._trigger("hide")},center:function(){var a=$(window),c=a.width()/2-this.panel.width()/2,a=a.height()/2-this.panel.height()/2;this.panel.css({left:c,top:a})},_enableModality:function(){this.modality=$('<div class="ui-widget-overlay"></div>').css({width:$(document).width(),height:$(document).height(),"z-index":this.panel.css("z-index")-1}).appendTo(document.body)},_disableModality:function(){this.modality.remove();this.modality=null},_showNavigators:function(){this.navigators.zIndex(this.imageDisplay.zIndex()+
1).show()},_hideNavigators:function(){this.navigators.hide()},isHidden:function(){return this.panel.is(":hidden")},showURL:function(a){a.width&&this.iframe.attr("width",a.width);a.height&&this.iframe.attr("height",a.height);this.iframe.attr("src",a.src);this.show()}})});