/**
* @module       Bootstrap Material Datetimepicker
* @see          https://github.com/T00rk/bootstrap-material-datetimepicker
* @version      2.0
*/
!(function (t, e) {
    function i(e, i) {
        (this.currentView = 0),
            this.minDate,
            this.maxDate,
            (this._attachedEvents = []),
            (this.element = e),
            (this.$element = t(e)),
            (this.params = { date: !0, time: !0, format: "YYYY-MM-DD", minDate: null, maxDate: null, currentDate: null, lang: "en", weekStart: 0, shortTime: !1, cancelText: "Cancel", okText: "OK" }),
            (this.params = t.fn.extend(this.params, i)),
            (this.name = "dtp_" + this.setName()),
            this.$element.attr("data-dtp", this.name),
            this.init();
    }
    var a = "bootstrapMaterialDatePicker",
        s = "plugin_" + a;
    e.locale("en"),
        (t.fn[a] = function (e, a) {
            return (
                this.each(function () {
                    t.data(this, s) ? ("function" == typeof t.data(this, s)[e] && t.data(this, s)[e](a), "destroy" === e && delete t.data(this, s)) : t.data(this, s, new i(this, e));
                }),
                this
            );
        }),
        (i.prototype = {
            init: function () {
                this.initDays(),
                    this.initDates(),
                    this.initTemplate(),
                    this.initButtons(),
                    this._attachEvent(t(window), "resize", this._centerBox(this)),
                    this._attachEvent(this.$dtpElement.find(".dtp-content"), "click", this._onElementClick.bind(this)),
                    this._attachEvent(this.$dtpElement, "click", this._onBackgroundClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find(".dtp-close > a"), "click", this._onCloseClick.bind(this)),
                    this._attachEvent(this.$element, "click", this._onClick.bind(this));
            },
            initDays: function () {
                this.days = [];
                for (var t = this.params.weekStart; this.days.length < 7; t++) t > 6 && (t = 0), this.days.push(t.toString());
            },
            initDates: function () {
                if (this.$element.val().length > 0)
                    "undefined" != typeof this.params.format && null !== this.params.format
                        ? (this.currentDate = e(this.$element.val(), this.params.format).locale(this.params.lang))
                        : (this.currentDate = e(this.$element.val()).locale(this.params.lang));
                else if ("undefined" != typeof this.$element.attr("value") && null !== this.$element.attr("value") && "" !== this.$element.attr("value"))
                    "string" == typeof this.$element.attr("value") &&
                        ("undefined" != typeof this.params.format && null !== this.params.format
                            ? (this.currentDate = e(this.$element.attr("value"), this.params.format).locale(this.params.lang))
                            : (this.currentDate = e(this.$element.attr("value")).locale(this.params.lang)));
                else if ("undefined" != typeof this.params.currentDate && null !== this.params.currentDate) {
                    if ("string" == typeof this.params.currentDate)
                        "undefined" != typeof this.params.format && null !== this.params.format
                            ? (this.currentDate = e(this.params.currentDate, this.params.format).locale(this.params.lang))
                            : (this.currentDate = e(this.params.currentDate).locale(this.params.lang));
                    else if ("undefined" == typeof this.params.currentDate.isValid || "function" != typeof this.params.currentDate.isValid) {
                        var t = this.params.currentDate.getTime();
                        this.currentDate = e(t, "x").locale(this.params.lang);
                    } else this.currentDate = this.params.currentDate;
                    this.$element.val(this.currentDate.format(this.params.format));
                } else this.currentDate = e();
                if ("undefined" != typeof this.params.minDate && null !== this.params.minDate)
                    if ("string" == typeof this.params.minDate)
                        "undefined" != typeof this.params.format && null !== this.params.format
                            ? (this.minDate = e(this.params.minDate, this.params.format).locale(this.params.lang))
                            : (this.minDate = e(this.params.minDate).locale(this.params.lang));
                    else if ("undefined" == typeof this.params.minDate.isValid || "function" != typeof this.params.minDate.isValid) {
                        var t = this.params.minDate.getTime();
                        this.minDate = e(t, "x").locale(this.params.lang);
                    } else this.minDate = this.params.minDate;
                if ("undefined" != typeof this.params.maxDate && null !== this.params.maxDate)
                    if ("string" == typeof this.params.maxDate)
                        "undefined" != typeof this.params.format && null !== this.params.format
                            ? (this.maxDate = e(this.params.maxDate, this.params.format).locale(this.params.lang))
                            : (this.maxDate = e(this.params.maxDate).locale(this.params.lang));
                    else if ("undefined" == typeof this.params.maxDate.isValid || "function" != typeof this.params.maxDate.isValid) {
                        var t = this.params.maxDate.getTime();
                        this.maxDate = e(t, "x").locale(this.params.lang);
                    } else this.maxDate = this.params.maxDate;
                this.isAfterMinDate(this.currentDate) || (this.currentDate = e(this.minDate)), this.isBeforeMaxDate(this.currentDate) || (this.currentDate = e(this.maxDate));
            },
            initTemplate: function () {
                (this.template =
                    '<div class="dtp hidden" id="' +
                    this.name +
                    '"><div class="dtp-content"><div class="dtp-date-view"><header class="dtp-header"><div class="dtp-actual-day">Lundi</div><div class="dtp-close"><a href="javascript:void(0);"><span class="mdi mdi-close"></span></</div></header><div class="dtp-date hidden"><div><div class="left center p10"><a href="javascript:void(0);" class="dtp-select-month-before"><span class="mdi mdi-chevron-left"></span></a></div><div class="dtp-actual-month p80">MAR</div><div class="right center p10"><a href="javascript:void(0);" class="dtp-select-month-after"><span class="mdi mdi-chevron-right"></span></a></div><div class="clearfix"></div></div><div class="dtp-actual-num">13</div><div><div class="left center p10"><a href="javascript:void(0);" class="dtp-select-year-before"><span class="mdi mdi-chevron-left"></span></a></div><div class="dtp-actual-year p80">2014</div><div class="right center p10"><a href="javascript:void(0);" class="dtp-select-year-after"><span class="mdi mdi-chevron-right"></span></a></div><div class="clearfix"></div></div></div><div class="dtp-time hidden"><div class="dtp-actual-maxtime">23:55</div></div><div class="dtp-picker"><div class="dtp-picker-calendar"></div><div class="dtp-picker-datetime hidden"><div class="dtp-actual-meridien"><div class="left p20"><a class="dtp-meridien-am" href="javascript:void(0);">AM</a></div><div class="dtp-actual-time p60"></div><div class="right p20"><a class="dtp-meridien-pm" href="javascript:void(0);">PM</a></div><div class="clearfix"></div></div><div class="dtp-picker-clock"></div></div></div></div><div class="dtp-buttons group"><button class="dtp-btn-cancel btn btn-sm btn-primary">' +
                    this.params.cancelText +
                    '</button><button class="dtp-btn-ok btn btn-sm btn-primary">' +
                    this.params.okText +
                    '</button><div class="clearfix"></div></div></div></div>'),
                    t("body").find("#" + this.name).length <= 0 && (t("body").append(this.template), (this.dtpElement = t("body").find("#" + this.name)), (this.$dtpElement = t(this.dtpElement)));
            },
            initButtons: function () {
                this._attachEvent(this.$dtpElement.find(".dtp-btn-cancel"), "click", this._onCancelClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find(".dtp-btn-ok"), "click", this._onOKClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find("a.dtp-select-month-before"), "click", this._onMonthBeforeClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find("a.dtp-select-month-after"), "click", this._onMonthAfterClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find("a.dtp-select-year-before"), "click", this._onYearBeforeClick.bind(this)),
                    this._attachEvent(this.$dtpElement.find("a.dtp-select-year-after"), "click", this._onYearAfterClick.bind(this));
            },
            initMeridienButtons: function () {
                this.$dtpElement.find("a.dtp-meridien-am").off("click").on("click", this._onSelectAM.bind(this)), this.$dtpElement.find("a.dtp-meridien-pm").off("click").on("click", this._onSelectPM.bind(this));
            },
            initDate: function (t) {
                (this.currentView = 0), this.$dtpElement.find(".dtp-picker-calendar").removeClass("hidden"), this.$dtpElement.find(".dtp-picker-datetime").addClass("hidden");
                var e = "undefined" != typeof this.currentDate && null !== this.currentDate ? this.currentDate : null,
                    i = this.generateCalendar(this.currentDate);
                if ("undefined" != typeof i.week && "undefined" != typeof i.days) {
                    var a = this.constructHTMLCalendar(e, i);
                    this.$dtpElement.find("a.dtp-select-day").off("click"), this.$dtpElement.find(".dtp-picker-calendar").html(a), this.$dtpElement.find("a.dtp-select-day").on("click", this._onSelectDate.bind(this)), this.toggleButtons(e);
                }
                this._centerBox(), this.showDate(e);
            },
            initHours: function () {
                if (((this.currentView = 1), !this.params.date)) {
                    var e = this.$dtpElement.find(".dtp-content").width(),
                        i = this.$dtpElement.find(".dtp-picker-clock").css("marginLeft").replace("px", ""),
                        a = this.$dtpElement.find(".dtp-picker-clock").css("marginRight").replace("px", ""),
                        s = this.$dtpElement.find(".dtp-picker").css("paddingLeft").replace("px", ""),
                        n = this.$dtpElement.find(".dtp-picker").css("paddingRight").replace("px", "");
                    this.$dtpElement.find(".dtp-picker-clock").innerWidth(e - (parseInt(i) + parseInt(a) + parseInt(s) + parseInt(n)));
                }
                this.showTime(this.currentDate),
                    this.initMeridienButtons(),
                    this.$dtpElement.find(".dtp-picker-datetime").removeClass("hidden"),
                    this.$dtpElement.find(".dtp-picker-calendar").addClass("hidden"),
                    this.currentDate.hour() < 12 ? this.$dtpElement.find("a.dtp-meridien-am").click() : this.$dtpElement.find("a.dtp-meridien-pm").click();
                for (
                    var d = this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingLeft").replace("px", ""),
                        r = this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingTop").replace("px", ""),
                        l = this.$dtpElement.find(".dtp-picker-clock").css("marginLeft").replace("px", ""),
                        h = this.$dtpElement.find(".dtp-picker-clock").css("marginTop").replace("px", ""),
                        c = this.$dtpElement.find(".dtp-picker-clock").innerWidth() / 2,
                        p = c / 1.2,
                        m = [],
                        o = 0;
                    12 > o;
                    ++o
                ) {
                    var f = p * Math.sin(2 * Math.PI * (o / 12)),
                        u = p * Math.cos(2 * Math.PI * (o / 12)),
                        v = t("<div>", { class: "dtp-picker-time" }).css({ marginLeft: c + f + parseInt(d) / 2 - (parseInt(d) + parseInt(l)) + "px", marginTop: c - u - parseInt(h) / 2 - (parseInt(r) + parseInt(h)) + "px" }),
                        D = 12 == this.currentDate.format("h") ? 0 : this.currentDate.format("h"),
                        k = t("<a>", { href: "javascript:void(0);", class: "dtp-select-hour" })
                            .data("hour", o)
                            .text(0 == o ? 12 : o);
                    o == parseInt(D) && k.addClass("selected"), v.append(k), m.push(v);
                }
                this.$dtpElement.find("a.dtp-select-hour").off("click"),
                    this.$dtpElement.find(".dtp-picker-clock").html(m),
                    this.toggleTime(!0),
                    this.$dtpElement.find(".dtp-picker-clock").css("height", this.$dtpElement.find(".dtp-picker-clock").width() + (parseInt(r) + parseInt(h)) + "px"),
                    this.initHands(!0);
            },
            initMinutes: function () {
                (this.currentView = 2),
                    this.showTime(this.currentDate),
                    this.initMeridienButtons(),
                    this.currentDate.hour() < 12 ? this.$dtpElement.find("a.dtp-meridien-am").click() : this.$dtpElement.find("a.dtp-meridien-pm").click(),
                    this.$dtpElement.find(".dtp-picker-calendar").addClass("hidden"),
                    this.$dtpElement.find(".dtp-picker-datetime").removeClass("hidden");
                for (
                    var e = this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingLeft").replace("px", ""),
                        i = this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingTop").replace("px", ""),
                        a = this.$dtpElement.find(".dtp-picker-clock").css("marginLeft").replace("px", ""),
                        s = this.$dtpElement.find(".dtp-picker-clock").css("marginTop").replace("px", ""),
                        n = this.$dtpElement.find(".dtp-picker-clock").innerWidth() / 2,
                        d = n / 1.2,
                        r = [],
                        l = 0;
                    60 > l;
                    l += 5
                ) {
                    var h = d * Math.sin(2 * Math.PI * (l / 60)),
                        c = d * Math.cos(2 * Math.PI * (l / 60)),
                        p = t("<div>", { class: "dtp-picker-time" }).css({ marginLeft: n + h + parseInt(e) / 2 - (parseInt(e) + parseInt(a)) + "px", marginTop: n - c - parseInt(s) / 2 - (parseInt(i) + parseInt(s)) + "px" }),
                        m = t("<a>", { href: "javascript:void(0);", class: "dtp-select-minute" })
                            .data("minute", l)
                            .text(2 == l.toString().length ? l : "0" + l);
                    l == 5 * Math.round(this.currentDate.minute() / 5) && (m.addClass("selected"), this.currentDate.minute(l)), p.append(m), r.push(p);
                }
                this.$dtpElement.find("a.dtp-select-minute").off("click"),
                    this.$dtpElement.find(".dtp-picker-clock").html(r),
                    this.toggleTime(!1),
                    this.$dtpElement.find(".dtp-picker-clock").css("height", this.$dtpElement.find(".dtp-picker-clock").width() + (parseInt(i) + parseInt(s)) + "px"),
                    this.initHands(!1),
                    this._centerBox();
            },
            initHands: function (t) {
                this.$dtpElement.find(".dtp-picker-clock").append('<div class="dtp-hand dtp-hour-hand"></div><div class="dtp-hand dtp-minute-hand"></div><div class="dtp-clock-center"></div>');
                var e = this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingLeft").replace("px", ""),
                    i = (this.$dtpElement.find(".dtp-picker-clock").parent().parent().css("paddingTop").replace("px", ""), this.$dtpElement.find(".dtp-picker-clock").css("marginLeft").replace("px", "")),
                    a = (this.$dtpElement.find(".dtp-picker-clock").css("marginTop").replace("px", ""), this.$dtpElement.find(".dtp-clock-center").width() / 2),
                    s = this.$dtpElement.find(".dtp-clock-center").height() / 2,
                    n = this.$dtpElement.find(".dtp-picker-clock").innerWidth() / 2,
                    d = n / 1.7,
                    r = n / 1.5;
                this.$dtpElement
                    .find(".dtp-hour-hand")
                    .css({ left: n + 1.5 * parseInt(i) + "px", height: d + "px", marginTop: n - d - parseInt(e) + "px" })
                    .addClass(t === !0 ? "on" : ""),
                    this.$dtpElement
                        .find(".dtp-minute-hand")
                        .css({ left: n + 1.5 * parseInt(i) + "px", height: r + "px", marginTop: n - r - parseInt(e) + "px" })
                        .addClass(t === !1 ? "on" : ""),
                    this.$dtpElement.find(".dtp-clock-center").css({ left: n + parseInt(e) + parseInt(i) - a + "px", marginTop: n - parseInt(i) / 2 - s + "px" }),
                    this.animateHands(),
                    this._centerBox();
            },
            animateHands: function () {
                var t = this.currentDate.hour();
                this.currentDate.minute();
                this.rotateElement(this.$dtpElement.find(".dtp-hour-hand"), 30 * t), this.rotateElement(this.$dtpElement.find(".dtp-minute-hand"), 6 * (5 * Math.round(this.currentDate.minute() / 5)));
            },
            isAfterMinDate: function (t, i, a) {
                var s = !0;
                if ("undefined" != typeof this.minDate && null !== this.minDate) {
                    var n = e(this.minDate),
                        d = e(t);
                    i || a || (n.hour(0), n.minute(0), d.hour(0), d.minute(0)),
                        n.second(0),
                        d.second(0),
                        n.millisecond(0),
                        d.millisecond(0),
                        a ? (s = parseInt(d.format("X")) >= parseInt(n.format("X"))) : (d.minute(0), n.minute(0), (s = parseInt(d.format("X")) >= parseInt(n.format("X"))));
                }
                return s;
            },
            isBeforeMaxDate: function (t, i, a) {
                var s = !0;
                if ("undefined" != typeof this.maxDate && null !== this.maxDate) {
                    var n = e(this.maxDate),
                        d = e(t);
                    i || a || (n.hour(0), n.minute(0), d.hour(0), d.minute(0)),
                        n.second(0),
                        d.second(0),
                        n.millisecond(0),
                        d.millisecond(0),
                        a ? (s = parseInt(d.format("X")) <= parseInt(n.format("X"))) : (d.minute(0), n.minute(0), (s = parseInt(d.format("X")) <= parseInt(n.format("X"))));
                }
                return s;
            },
            rotateElement: function (e, i) {
                t(e).css({ WebkitTransform: "rotate(" + i + "deg)", "-moz-transform": "rotate(" + i + "deg)" });
            },
            showDate: function (t) {
                t &&
                    (this.$dtpElement.find(".dtp-actual-day").html(t.locale(this.params.lang).format("dddd")),
                    this.$dtpElement.find(".dtp-actual-month").html(t.locale(this.params.lang).format("MMM").toUpperCase()),
                    this.$dtpElement.find(".dtp-actual-num").html(t.locale(this.params.lang).format("DD")),
                    this.$dtpElement.find(".dtp-actual-year").html(t.locale(this.params.lang).format("YYYY")));
            },
            showTime: function (t) {
                if (t) {
                    var e = 5 * Math.round(t.minute() / 5),
                        i = (this.params.shortTime ? t.format("hh") : t.format("HH")) + ":" + (2 == e.toString().length ? e : "0" + e);
                    this.params.date
                        ? this.$dtpElement.find(".dtp-actual-time").html(i)
                        : (this.params.shortTime ? this.$dtpElement.find(".dtp-actual-day").html(t.format("A")) : this.$dtpElement.find(".dtp-actual-day").html(" "), this.$dtpElement.find(".dtp-actual-maxtime").html(i));
                }
            },
            selectDate: function (t) {
                t && (this.currentDate.date(t), this.showDate(this.currentDate), this.$element.trigger("dateSelected", this.currentDate));
            },
            generateCalendar: function (t) {
                var i = {};
                if (null !== t) {
                    var a = e(t).locale(this.params.lang).startOf("month"),
                        s = e(t).locale(this.params.lang).endOf("month"),
                        n = a.format("d");
                    (i.week = this.days), (i.days = []);
                    for (var d = a.date(); d <= s.date(); d++) {
                        if (d === a.date()) {
                            var r = i.week.indexOf(n.toString());
                            if (r > 0) for (var l = 0; r > l; l++) i.days.push(0);
                        }
                        i.days.push(e(a).locale(this.params.lang).date(d));
                    }
                }
                return i;
            },
            constructHTMLCalendar: function (t, i) {
                var a = "";
                (a += '<div class="dtp-picker-month">' + t.locale(this.params.lang).format("MMMM YYYY") + "</div>"), (a += '<table class="table dtp-picker-days"><thead>');
                for (var s = 0; s < i.week.length; s++) a += "<th>" + e(parseInt(i.week[s]), "d").locale(this.params.lang).format("dd").substring(0, 1) + "</th>";
                (a += "</thead>"), (a += "<tbody><tr>");
                for (var s = 0; s < i.days.length; s++)
                    s % 7 == 0 && (a += "</tr><tr>"),
                        (a += '<td data-date="' + e(i.days[s]).locale(this.params.lang).format("D") + '">'),
                        0 != i.days[s] &&
                            ((a +=
                                this.isBeforeMaxDate(e(i.days[s]), !1, !1) === !1 || this.isAfterMinDate(e(i.days[s]), !1, !1) === !1
                                    ? '<span class="dtp-select-day">' + e(i.days[s]).locale(this.params.lang).format("DD") + "</span>"
                                    : e(i.days[s]).locale(this.params.lang).format("DD") === e(this.currentDate).locale(this.params.lang).format("DD")
                                    ? '<a href="javascript:void(0);" class="dtp-select-day selected">' + e(i.days[s]).locale(this.params.lang).format("DD") + "</a>"
                                    : '<a href="javascript:void(0);" class="dtp-select-day">' + e(i.days[s]).locale(this.params.lang).format("DD") + "</a>"),
                            (a += "</td>"));
                return (a += "</tr></tbody></table>");
            },
            setName: function () {
                for (var t = "", e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", i = 0; 5 > i; i++) t += e.charAt(Math.floor(Math.random() * e.length));
                return t;
            },
            isPM: function () {
                return this.$dtpElement.find("a.dtp-meridien-pm").hasClass("selected");
            },
            setElementValue: function () {
                this.$element.trigger("beforeChange", this.currentDate),
                    "undefined" != typeof t.material && this.$element.removeClass("empty"),
                    this.$element.val(e(this.currentDate).locale(this.params.lang).format(this.params.format)),
                    this.$element.parent().find(".rd-input-label").addClass("focus"),
                    this.$element.trigger("change", this.currentDate);
            },
            toggleButtons: function (t) {
                if (t && t.isValid()) {
                    var i = e(t).locale(this.params.lang).startOf("month"),
                        a = e(t).locale(this.params.lang).endOf("month");
                    this.isAfterMinDate(i, !1, !1) ? this.$dtpElement.find("a.dtp-select-month-before").removeClass("invisible") : this.$dtpElement.find("a.dtp-select-month-before").addClass("invisible"),
                        this.isBeforeMaxDate(a, !1, !1) ? this.$dtpElement.find("a.dtp-select-month-after").removeClass("invisible") : this.$dtpElement.find("a.dtp-select-month-after").addClass("invisible");
                    var s = e(t).locale(this.params.lang).startOf("year"),
                        n = e(t).locale(this.params.lang).endOf("year");
                    this.isAfterMinDate(s, !1, !1) ? this.$dtpElement.find("a.dtp-select-year-before").removeClass("invisible") : this.$dtpElement.find("a.dtp-select-year-before").addClass("invisible"),
                        this.isBeforeMaxDate(n, !1, !1) ? this.$dtpElement.find("a.dtp-select-year-after").removeClass("invisible") : this.$dtpElement.find("a.dtp-select-year-after").addClass("invisible");
                }
            },
            toggleTime: function (i) {
                if (i) {
                    this.$dtpElement.find("a.dtp-select-hour").removeClass("disabled"), this.$dtpElement.find("a.dtp-select-hour").removeProp("disabled"), this.$dtpElement.find("a.dtp-select-hour").off("click");
                    var a = this;
                    this.$dtpElement.find("a.dtp-select-hour").each(function () {
                        var i = t(this).data("hour"),
                            s = e(a.currentDate);
                        s.hour(a.convertHours(i)).minute(0).second(0),
                            a.isAfterMinDate(s, !0, !1) === !1 || a.isBeforeMaxDate(s, !0, !1) === !1 ? (t(this).prop("disabled"), t(this).addClass("disabled")) : t(this).on("click", a._onSelectHour.bind(a));
                    });
                } else {
                    this.$dtpElement.find("a.dtp-select-minute").removeClass("disabled"), this.$dtpElement.find("a.dtp-select-minute").removeProp("disabled"), this.$dtpElement.find("a.dtp-select-minute").off("click");
                    var a = this;
                    this.$dtpElement.find("a.dtp-select-minute").each(function () {
                        var i = t(this).data("minute"),
                            s = e(a.currentDate);
                        s.minute(i).second(0), a.isAfterMinDate(s, !0, !0) === !1 || a.isBeforeMaxDate(s, !0, !0) === !1 ? (t(this).prop("disabled"), t(this).addClass("disabled")) : t(this).on("click", a._onSelectMinute.bind(a));
                    });
                }
            },
            _attachEvent: function (t, e, i) {
                t.on(e, i), this._attachedEvents.push([t, e, i]);
            },
            _detachEvents: function () {
                for (var t = this._attachedEvents.length - 1; t >= 0; t--) this._attachedEvents[t][0].off(this._attachedEvents[t][1], this._attachedEvents[t][2]), this._attachedEvents.splice(t, 1);
            },
            _onClick: function () {
                (this.currentView = 0),
                    this.$element.blur(),
                    this.initDates(),
                    this.show(),
                    this.params.date ? (this.$dtpElement.find(".dtp-date").removeClass("hidden"), this.initDate()) : this.params.time && (this.$dtpElement.find(".dtp-time").removeClass("hidden"), this.initHours());
            },
            _onBackgroundClick: function (t) {
                t.stopPropagation(), this.hide();
            },
            _onElementClick: function (t) {
                t.stopPropagation();
            },
            _onCloseClick: function () {
                this.hide();
            },
            _onOKClick: function () {
                switch (this.currentView) {
                    case 0:
                        this.params.time === !0 ? this.initHours() : (this.setElementValue(), this.hide());
                        break;
                    case 1:
                        this.initMinutes();
                        break;
                    case 2:
                        this.setElementValue(), this.hide();
                }
            },
            _onCancelClick: function () {
                if (this.params.time)
                    switch (this.currentView) {
                        case 0:
                            this.hide();
                            break;
                        case 1:
                            this.params.date ? this.initDate() : this.hide();
                            break;
                        case 2:
                            this.initHours();
                    }
                else this.hide();
            },
            _onMonthBeforeClick: function () {
                this.currentDate.subtract(1, "months"), this.initDate(this.currentDate);
            },
            _onMonthAfterClick: function () {
                this.currentDate.add(1, "months"), this.initDate(this.currentDate);
            },
            _onYearBeforeClick: function () {
                this.currentDate.subtract(1, "years"), this.initDate(this.currentDate);
            },
            _onYearAfterClick: function () {
                this.currentDate.add(1, "years"), this.initDate(this.currentDate);
            },
            _onSelectDate: function (e) {
                this.$dtpElement.find("a.dtp-select-day").removeClass("selected"), t(e.currentTarget).addClass("selected"), this.selectDate(t(e.currentTarget).parent().data("date"));
            },
            _onSelectHour: function (e) {
                this.$dtpElement.find("a.dtp-select-hour").removeClass("selected"), t(e.currentTarget).addClass("selected");
                var i = parseInt(t(e.currentTarget).data("hour"));
                this.isPM() && (i += 12), this.currentDate.hour(i), this.showTime(this.currentDate), this.animateHands();
            },
            _onSelectMinute: function (e) {
                this.$dtpElement.find("a.dtp-select-minute").removeClass("selected"),
                    t(e.currentTarget).addClass("selected"),
                    this.currentDate.minute(parseInt(t(e.currentTarget).data("minute"))),
                    this.showTime(this.currentDate),
                    this.animateHands();
            },
            _onSelectAM: function (e) {
                t(".dtp-actual-meridien").find("a").removeClass("selected"),
                    t(e.currentTarget).addClass("selected"),
                    this.currentDate.hour() >= 12 && this.currentDate.subtract(12, "hours") && this.showTime(this.currentDate),
                    this.toggleTime(1 === this.currentView);
            },
            _onSelectPM: function (e) {
                t(".dtp-actual-meridien").find("a").removeClass("selected"),
                    t(e.currentTarget).addClass("selected"),
                    this.currentDate.hour() < 12 && this.currentDate.add(12, "hours") && this.showTime(this.currentDate),
                    this.toggleTime(1 === this.currentView);
            },
            convertHours: function (t) {
                var e = t;
                return 12 > t && this.isPM() && (e += 12), e;
            },
            setDate: function (t) {
                (this.params.currentDate = t), this.initDates();
            },
            setMinDate: function (t) {
                (this.params.minDate = t), this.initDates();
            },
            setMaxDate: function (t) {
                (this.params.maxDate = t), this.initDates();
            },
            destroy: function () {
                this._detachEvents(), this.$dtpElement.remove();
            },
            show: function () {
                this.$dtpElement.removeClass("hidden"), this._centerBox();
            },
            hide: function () {
                this.$dtpElement.addClass("hidden");
            },
            resetDate: function () {},
            _centerBox: function () {
                var t = (this.$dtpElement.height() - this.$dtpElement.find(".dtp-content").height()) / 2;
                this.$dtpElement.find(".dtp-content").css("marginLeft", -(this.$dtpElement.find(".dtp-content").width() / 2) + "px"), this.$dtpElement.find(".dtp-content").css("top", t + "px");
            },
        });
  })(jQuery, moment);