document.addEventListener('DOMContentLoaded', function() {
    // if without option "--toc/-t" do nothing
    if (document.getElementById('markdown-toc') != null) {
        var body, toc, scroll, button;
        // add button element before calling getElementById/getElementsByClassName
        document.body.innerHTML =  document.body.innerHTML + '<div class="toc-button"></div>';
        button = document.getElementsByClassName('toc-button')[0];
        body = document.getElementsByClassName('markdown-body')[0];
        toc = document.getElementById('markdown-toc');
        // wrapper for scrollbar on left side
        toc.innerHTML = '<div class="scroll">' + toc.innerHTML + '</div>';
        scroll = document.querySelector('#markdown-toc > .scroll');

        // generate TOC
        $(scroll).toc({ selectors: 'h1,h2,h3,h4', highlightOffset: 0 });
        // show scrollbar on left side
        toc.style.direction = 'rtl';
        scroll.style.direction = 'ltr';

        // take clearance for TOC area
        window.onload = window.onresize = function() {
            body.style.marginLeft = toc.offsetWidth + 'px';
        };

        // TOC toggle button
        var option = {
            duration: config.button.duration,
            step: function() {
                body.style.marginLeft = toc.offsetWidth + 'px';
            }
        };
        $(button).click(function() {
            if (toc.offsetWidth > 0) {
                $(button).css({
                    background: config.button.color.active,
                    transform: 'rotate(-45deg)'
                });
                $(toc).css({ overflowY: 'hidden' });
                $(toc).animate({ width: '0', minWidth: '0' }, option);
            }
            else {
                $(button).css({
                    background: config.button.color.bg,
                    transform: 'rotate(0)'
                });
                $(toc).css({ overflowY: 'auto' });
                $(toc).animate({ width: config.toc.width, minWidth: config.toc.minwidth }, option);
            }
        });
    }

    // CheckBox
    var list = document.getElementsByTagName('LI');
    for (var i = 0; i < list.length; i++) {
        for (var j = 0; j < list[i].childNodes.length; j++) {
            if (list[i].childNodes[j].tagName == 'P') {
                list[i].childNodes[j].outerHTML = list[i].childNodes[j].innerHTML;
            }
            if (list[i].childNodes[j].nodeName == '#text') {
                if (list[i].childNodes[j].data.substr(0,3) == "[ ]") {
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox"
                    list[i].childNodes[j].data = list[i].childNodes[j].data.substr(3)
                    list[i].insertBefore(checkbox, list[i].childNodes[0]);
                    list[i].classList.add('task-list-item')
                }
                else if (list[i].childNodes[j].data.substr(0,3) == "[x]") {
                    var checkbox = document.createElement('input');
                    checkbox.type = "checkbox"
                    checkbox.checked = "checked"
                    list[i].childNodes[j].data = list[i].childNodes[j].data.substr(3)
                    list[i].insertBefore(checkbox, list[i].childNodes[0]);
                    list[i].classList.add('task-list-item')
                }
            }
        }
    }
}, false);
