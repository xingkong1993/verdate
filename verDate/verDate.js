window.HTMLElement = window.HTMLElement || Element;
window.verDate = (function () {
    var dates = new Date().getDate();
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var hours = new Date().getHours();
    var mins = new Date().getMinutes();
    var sec = new Date().getSeconds();
    var start_year = 1970;
    var start_month = 1;
    var start_date = 1;
    var end_year = 2100;
    var end_month = 12;
    var end_date = 31;
    var default_times = "";
    var day = ["日", "一", "二", "三", "四", "五", "六"];
    var verdate = function () {
        props;
        style();
        document.onclick = function (e) {
            if(!e) e = window.event;
            var target = e.target || e.srcElement;
            var data_date = target.getAttribute("data-dateItems");
            if (data_date != null) {
                dates = new Date().getDate();
                year = new Date().getFullYear();
                month = new Date().getMonth() + 1;
                hours = new Date().getHours();
                mins = new Date().getMinutes();
                sec = new Date().getSeconds();
                start_year = "";
                start_month = "";
                start_date = "";
                end_year = "";
                end_month = "";
                end_date = "";
                //参数重定义
                var t = target.tagName.toLowerCase();
                if (t != "input") {
                    default_times = target.innerText;
                } else {
                    default_times = target.value;
                }
                target.setAttribute("data-date-value", default_times);
                if (default_times) {
                    switch (data_date) {
                        case "dateTime":
                            var default_arr = default_times.split(" ");
                            default_times = default_arr[0].split("-");
                            if (default_times.length == 3) {
                                year = parseInt(default_times[0]);
                                month = parseInt(default_times[1]);
                                dates = parseInt(default_times[2]);
                            }
                            var defs = default_arr[1].split(":");
                            if(defs.length == 3){
                                hours = (defs[0]);
                                mins = (defs[1]);
                                sec = (defs[2]);
                            }
                            break;
                        default:
                            default_times = default_times.split("-");
                            if (default_times.length == 3) {
                                year = parseInt(default_times[0]);
                                month = parseInt(default_times[1]);
                                dates = parseInt(default_times[2]);
                            }
                            break;
                    }
                }
                //判断时间周期
                if (target.getAttribute("data-date-start") != null && target.getAttribute("data-date-start") != undefined) {
                    var start = target.getAttribute("data-date-start").split("-");
                    start_year = start[0];
                    start_month = start[1];
                    start_date = start[2];
                }

                if (target.getAttribute("data-date-end") != null && target.getAttribute("data-date-end") != undefined) {
                    var end = target.getAttribute("data-date-end").split("-");
                    end_year = end[0];
                    end_month = end[1];
                    end_date = end[2];
                }
                calendar_list(target);
            } else if (!target.classList.contains("verDate-onclick")) {
                var ins = document.querySelector(".verDate-box");
                var id = (target.id);
                if (id == "ver-date-clear") {
                    var id = document.querySelector("#" + ins.getAttribute("data-ids"));
                    if (id.tagName.toLowerCase() == "input") {
                        id.value = "";
                    } else {
                        id.innerText = "";
                    }
                }
                if(id == "ver-date-now"){
                    var id_items = document.querySelector("#" + ins.getAttribute("data-ids"));
                    var dds = new Date();
                    var dds_y = dds.getFullYear();
                    var dds_m = dds.getMonth()+1;
                    var dds_d = dds.getDate();
                    var dds_hours = dds.getHours();
                    var dds_mins = dds.getMinutes();
                    var dds_sec = dds.getSeconds();
                    var value = dds_y+"-"+(dds_m<10?"0"+dds_m:dds_m)+"-"+(dds_d<10?"0"+dds_d:dds_d);
                    if(id_items.getAttribute("data-dateItems") == "dateTime"){
                        value += " "+(dds_hours<10?"0"+dds_hours:dds_hours)+":"+(dds_mins<10?"0"+dds_mins:dds_mins)+":"+(dds_sec<10?"0"+dds_sec:dds_sec);
                    }
                    if (id_items.tagName.toLowerCase() == "input") {
                        id_items.value = value;
                    } else {
                        id_items.innerText = value;
                    }
                }
                if (ins) {
                    document.body.removeChild(document.querySelector(".verDate-box"));
                }
            } else if (target.classList.contains("ver-date-day")) {
                check_date(target);
            } else if (target.classList.contains("ver-date-angle")) {
                change_date(target);
            }
        };
    };
    var calendar_list = function (ids) {
        var calen = calendar();
        var box = document.querySelector(".verDate-box");
        if (box) {
            document.body.removeChild(box);
        }
        box = document.createElement("div");
        box.className = "verDate-box verDate-onclick";
        var hei = ids.offsetTop + 5 + ids.offsetHeight;
        box.style.top = hei+"px";
        box.style.left = ids.offsetLeft+"px";
        box.setAttribute("data-ids", ids.getAttribute("id"));
        box.setAttribute("data-start-year", start_year);
        box.setAttribute("data-start-month", start_month);
        box.setAttribute("data-start-date", start_date);
        box.setAttribute("data-end-year", end_year);
        box.setAttribute("data-end-month", end_month);
        box.setAttribute("data-end-date", end_date);
        document.body.appendChild(box);
        var table = document.createElement("table");
        table.className = "verDate-day verDate-onclick";
        var caption = document.createElement("caption");
        caption.className = "verDate-title verDate-onclick";
        if ((parseInt(start_year) <= parseInt(year) && parseInt(start_month) != month) || !start_year) {
            var lefts = document.createElement("div");
            lefts.className = "ver-date-angle verDate-left verDateIcon dateIcon dateIcon-angle-left dateIcon-lg verDate-onclick";
            lefts.setAttribute("data-verDate-anget", "left");
            caption.appendChild(lefts);
        }
        var contetns = document.createElement("div");
        contetns.className = "verDate-item verDate-onclick";
        contetns.innerHTML = '<span class="verDate-year verDate-onclick">' + year + '</span>年<span class="verDate-month verDate-onclick">' + month + '</span>月';
        caption.appendChild(contetns);
        if ((parseInt(end_year) >= year && parseInt(end_month) != month) || !end_year) {
            var right = document.createElement("div");
            right.className = "verDate-right verDateIcon dateIcon dateIcon-angle-right dateIcon-lg verDate-onclick ver-date-angle";
            right.setAttribute("data-verDate-anget", "right");
            caption.appendChild(right);
        }
        table.appendChild(caption);
        box.appendChild(table);
        var div1 = document.createElement("div");
        div1.className = "verDate-btns verDate-onclick";
        var _h = "";
        if(ids.getAttribute("data-dateItems") == "dateTime"){
            _h = '<div class="ver-date-times verDate-onclick">\n' +
                '                <input type="text" class="verDate-onclick" autocomplete="off" id="ver-date-hour" maxlength="2" minlength="1" value="'+hours+'"> : \n' +
                '                <input type="text" class="verDate-onclick" autocomplete="off" id="ver-date-mins" maxlength="2" minlength="1" value="'+mins+'"> :\n' +
                '                <input type="text" class="verDate-onclick" autocomplete="off" id="ver-date-sec" maxlength="2" minlength="1" value="'+sec+'">\n' +
                '            </div>';
        }
        div1.innerHTML = _h+'<a href="javascript:;" id="ver-date-clear">清除</a>\n<a href="javascript:;" id="ver-date-now">现在</a>\n';
        box.appendChild(div1);
        var thead = document.createElement("thead");
        var head_tr = document.createElement("tr");
        for (var i=0; i<day.length;i++) {
            var head_th = document.createElement("th");
            head_th.innerText = day[i];
            head_tr.appendChild(head_th);
        }
        thead.appendChild(head_tr);
        table.appendChild(thead);
        var tbody = document.createElement("tbody");
        tbody.className = "verDate-onclick";
        table.appendChild(tbody);
        var tbody_tr = "";
        for (var j =0;j< calen.length;j++) {
            var chi = calen[j];
            var cls = "ver-date-now";
            if (!chi.items) {
                cls = "ver-date-close";
            }

            if (chi.active) {
                cls += " verDate-day-now";
            }

            if (chi.day == 0) {
                tbody_tr = document.createElement("tr");
            }
            var tbod_td = document.createElement("td");
            tbod_td.className = "ver-date-day " + cls + " verDate-onclick";
            tbod_td.innerText = chi.date;
            tbod_td.setAttribute("data-month", chi.month);
            tbod_td.setAttribute("data-date", chi.date);
            tbod_td.setAttribute("data-year", chi.year);
            tbody_tr.appendChild(tbod_td);
            if (chi.day == 6) {
                tbody.appendChild(tbody_tr);
            }
        }
    };
    var check_date = function (target) {
        var ins = target.parentElement.parentElement.parentElement.parentElement;
        var cins = document.querySelector("#" + ins.getAttribute("data-ids"));
        var y = target.getAttribute("data-year");
        var m = parseInt(target.getAttribute("data-month")) > 10 ? target.getAttribute("data-month") : "0" + target.getAttribute("data-month");
        var d = parseInt(target.getAttribute("data-date")) < 10 ? "0" + target.getAttribute("data-date") : target.getAttribute("data-date");
        var ys = parseInt(ins.getAttribute("data-start-year"));
        var ms = parseInt(ins.getAttribute("data-start-month"));
        var ds = parseInt(ins.getAttribute("data-start-date"));
        var ye = parseInt(ins.getAttribute("data-end-year"));
        var me = parseInt(ins.getAttribute("data-end-month"));
        var md = parseInt(ins.getAttribute("data-end-date"));
        //判断年份是否禁用
        if (ys > y || y > ye) {
            return false;
        }

        //判断月份是否禁用
        if ((ys == y && m < ms) || (ye == y && m > me)) {
            return false;
        }

        //判断日期是否禁用
        if ((ys == y && m == ms && d < ds) || (ye == y && m == me && md < d)) {
            // console.log(ys);
            return false;
        }
        var value = y + "-" + m + "-" + d;
        if(cins.getAttribute("data-dateItems") == "dateTime"){
            value += " "+ins.querySelector("#ver-date-hour").value+":"+ins.querySelector("#ver-date-mins").value+":"+ins.querySelector("#ver-date-sec").value;
        }
        if (cins.tagName.toLowerCase() != "input") {
            cins.innerText = value;
        } else {
            cins.value = value;
        }

        document.body.removeChild(ins);
    };
    var change_date = function (tart) {
        var anget = tart.getAttribute("data-verDate-anget");
        //获取月份数据
        year = parseInt(tart.parentElement.querySelector(".verDate-year").innerText);
        month = parseInt(tart.parentElement.querySelector(".verDate-month").innerText);
        if (anget == "left") {
            month = month - 1;
            if (month <= 0) {
                month = 12;
                year = year - 1;
            }
        } else if (anget == "right") {
            month = month + 1;
            if (month > 12) {
                month = 1;
                year = year + 1;
            }
        }
        var ids = tart.parentElement.parentElement.parentElement.getAttribute("data-ids");
        calendar_list(document.querySelector("#" + ids));
    };
    var calendar = function () {
        var tomonth = getMonth(),
            lastmonth = getLastMonth(),
            nextmonth = getNextMonth();
        //判断本月第一天是星期几
        var first_day = tomonth[0].day,
            last_day = tomonth[tomonth.length - 1].day;//最后一天是星期几

        if (first_day > 0) {
            for (var i = 0; i < lastmonth.length; i++) {
                tomonth.unshift(lastmonth[i]);
                if (lastmonth[i].day == 0) {
                    break;
                }
            }
        }

        if (last_day < 6) {
            for (var j = 0; j < nextmonth.length; j++) {
                tomonth.push(nextmonth[j]);
                if (nextmonth[j].day == 6) {
                    break;
                }
            }
        }
        return tomonth;
    };
    var getMonth = function () {
        var data = new Date();
        var toMonth = [];
        data.setFullYear(year);
        data.setMonth(month);
        data.setDate(0);
        var ends = data.getDate();
        var items_start = false,
            items_end = false;
        if ((data.getMonth() + 1) == parseInt(start_month) && data.getFullYear() == parseInt(start_year)) {
            items_start = true;
        }
        if (data.getFullYear() == parseInt(end_year) && data.getMonth() + 1 == parseInt(end_month)) {
            items_end = true;
        }

        for (var i = 0; i < ends; i++) {
            data.setDate(i + 1);
            var jsons = {
                date: parseInt(data.getDate()),
                month: parseInt(data.getMonth() + 1),
                year: parseInt(data.getFullYear()),
                day: parseInt(data.getDay()),
                active: false,
                items: true
            };
            if (jsons.date == parseInt(dates)) {
                jsons.active = true;
            }

            if (items_start && (jsons.date < parseInt(start_date))) {
                jsons.items = false;
            }

            if (items_end && jsons.date > parseInt(end_date)) {
                jsons.items = false;
            }

            toMonth.push(jsons);
        }

        return toMonth;
    };

    var getLastMonth = function () {
        var lastMonth = [];
        var last = new Date();
        if (month <= 1) {
            last.setFullYear(year - 1);
            last.setMonth(12);
        } else {
            last.setFullYear(year);
            last.setMonth(month - 1);
        }
        last.setDate(0);
        var ends = last.getDate();
        for (var i = ends; i > 0; i--) {
            last.setDate(i);
            lastMonth.push({
                date: last.getDate(),
                month: last.getMonth() + 1,
                year: last.getFullYear(),
                day: last.getDay(),
                active: false,
                items: false
            });
        }

        return lastMonth;
    };
    var getNextMonth = function () {
        var nextMonth = [];
        var next = new Date();
        if (month >= 12) {
            next.setFullYear(year + 1);
            next.setMonth(1);
        } else {
            next.setFullYear(year);
            next.setMonth(month + 1);
        }
        next.setDate(0);
        var ends = next.getDate();
        for (var i = 0; i < ends; i++) {
            next.setDate(i + 1);
            nextMonth.push({
                date: next.getDate(),
                month: next.getMonth() + 1,
                year: next.getFullYear(),
                day: next.getDay(),
                active: false,
                items: false
            });
        }

        return nextMonth;
    };

    //公共参数
    var getPath = function () {
        var jsPath = document.currentScript ? document.currentScript.src : function () {
            var js = document.scripts
                , last = js.length - 1
                , src;
            for (var i = last; i > 0; i--) {
                if (js[i].readyState === 'interactive') {
                    src = js[i].src;
                    break;
                }
            }
            return src || js[last].src;
        }();
        return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }();
    //css样式加载
    var style = function () {
        var css = document.createElement("link"),
            icon = document.createElement("link");
        css.href = getPath + "css/verDate.css?v=1.1.0";
        icon.href = getPath + "css/verDateIcon.css?v=1.1.0";
        css.rel = icon.rel = "stylesheet";
        css.type = icon.type = "text/css";
        var link = document.getElementsByTagName("head")[0];
        link.appendChild(css);
        link.appendChild(icon);
    };
    //判断IE版本
    var ie = function () {
        var DEFAULT_VERSION = 8.0;
        var ua = navigator.userAgent.toLowerCase();
        var isIE = ua.indexOf("msie") > -1;
        var safariVersion;
        if (isIE) {
            safariVersion = ua.match(/msie ([\d.]+)/)[1];
        }
        if (safariVersion <= DEFAULT_VERSION) {
            return false
        }
        return true;
    };
    //追加函数
    var props = function () {
        if (!Array.prototype.forEach) {
            Array.prototype.forEach = function (callback, thisArg) {
                var T, k;
                if (this == null) {
                    throw new TypeError(" this is null or not defined");
                }
                var O = Object(this);
                var len = O.length >>> 0; // Hack to convert O.length to a UInt32
                if ({}.toString.call(callback) != "[object Function]") {
                    throw new TypeError(callback + " is not a function");
                }
                if (thisArg) {
                    T = thisArg;
                }
                k = 0;
                while (k < len) {
                    var kValue;
                    if (k in O) {
                        kValue = O[k];
                        callback.call(T, kValue, k, O);
                    }
                    k++;
                }
            };
        }

        if (!("classList" in document.documentElement)) {
            Object.defineProperty(HTMLElement.prototype, 'classList', {
                get: function () {
                    var self = this;

                    function update(fn) {
                        return function (value) {
                            var classes = self.className.split(/\s+/g),
                                index = classes.indexOf(value);

                            fn(classes, index, value);
                            self.className = classes.join(" ");
                        }
                    }

                    return {
                        add: update(function (classes, index, value) {
                            if (!~index) classes.push(value);
                        }),

                        remove: update(function (classes, index) {
                            if (~index) classes.splice(index, 1);
                        }),

                        toggle: update(function (classes, index, value) {
                            if (~index)
                                classes.splice(index, 1);
                            else
                                classes.push(value);
                        }),

                        contains: function (value) {
                            return !!~self.className.split(/\s+/g).indexOf(value);
                        },

                        item: function (i) {
                            return self.className.split(/\s+/g)[i] || null;
                        }
                    };
                }
            });
        }
    }();
    return verdate;
})();