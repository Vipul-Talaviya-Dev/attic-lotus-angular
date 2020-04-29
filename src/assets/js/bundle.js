! function(e) {
    var t = {};

    function _() {
        "pause" === localStorage.audio ? ("playing" === i ? (c(s), i = "playing") : (c(a), i = "pause"), localStorage.audio = "playing") : (l(a), l(s), localStorage.audio = "pause")
    }
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (a.pause(), s.pause(), r.pause(), localStorage.audio = "pause", i = "pause"), $(".audioline").click(function() {
        $(".audioline").css("pointer-events", "none"), _(), o.audioLineAnimate()
    }), $(window).blur(function(e) {
        a.volume = 0, s.volume = 0
    }), $(window).focus(function(e) {
        "playing" === localStorage.audio && c("playing" === i ? s : a)
    })
},
function(e, t) {
    console.log("%c interactions.js working", "color: #bada55"), e.exports.audioLineAnimate = r, e.exports.hoverEvents = i, e.exports.removeWebsiteLink = function() {
        "" === $("#link__url")[0].attributes.href.value && $(".link__wrapper").css("display", "none")
    }, e.exports.contactForm = function() {
        $(".question__question")[0].value = "", $(".question__question")[1].value = "", $(".question__question")[2].value = "", $(".question__question")[3].value = "", $(".question__question")[4].value = "";
        let e = 1,
            t = !1,
            n = !1;

        function o(e) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(e)
        }
        $(".question__question").keyup(function(o) {
            n || 13 == o.keyCode && $("#question__question-" + e)[0].value.length >= 0 && !1 === t && ($(".next__button").trigger("click"), $(".question__title").removeClass("question__title--inactive"), o.preventDefault())
        }), $(".question__question").keyup(function() {
            n || ($("#question__question-" + e)[0].value.length >= 0 ? ($(".question__title").addClass("question__title--inactive "), o($("#question__question-5")[0].value) ? o($("#question__question-5")[0].value) && (t = !1, $(".error__wrapper").css("opacity", "0")) : ($(".error__wrapper").css("opacity", "0.2"), $(".error__message")[0].innerText = "Don’t be shy, the entered email is incorrect.", t = !0)) : $(".question__title").removeClass("question__title--inactive "))
        }), $(".question__question").focusout(function() {
            n || 0 === $("#question__question-" + e)[0].value.length && $(".question__title").removeClass("question__title--inactive ")
        }), $(".question__question").focusout(function() {
            o($("#question__question-5")[0].value) && (t = !1, $(".error__wrapper").css("opacity", "0"))
        }), $(".next__button").click(function(o) {
            if (!1 === t)
                if (0 !== $("#question__question-" + e)[0].value.length) switch (e < 6 && e++, $(".error__wrapper").css("opacity", "0"), e <= 5 && $(".question__number").text(e + "/5"), $(".question__title").removeClass("question__title--inactive "), e) {
                    case 2:
                        let t = $(".question__question")[0].value;
                        t = t.charAt(0).toUpperCase() + t.slice(1), $(".question__title")[1].innerText = "Nice too meet you " + t + "!", $("#question-1").addClass("question__wrapper--inactive"), $("#question-2").removeClass("question__wrapper--inactive");
                        break;
                    case 3:
                        $("#question-2").addClass("question__wrapper--inactive"), $("#question-3").removeClass("question__wrapper--inactive");
                        break;
                    case 4:
                        $("#question-3").addClass("question__wrapper--inactive"), $("#question-4").removeClass("question__wrapper--inactive");
                        break;
                    case 5:
                        $("#question-4").addClass("question__wrapper--inactive"), $("#question-5").removeClass("question__wrapper--inactive"), $(".next__button")[0].innerText = "Let's send!";
                        break;
                    case 6:
                        $("input")[5].setAttribute("type", "submit"), n = !0, clientNameFinal = $(".question__question")[0].value;
                        let o = $(".question__question")[4].value;
                        clientNameFinal = clientNameFinal.charAt(0).toUpperCase() + clientNameFinal.slice(1), $(".question__title")[5].innerText = clientNameFinal + ", " + $(".question__title")[5].innerText;
                        let i = "We will contact you via email: " + o + " in no time. But if you don’t want to wait for a good things to happen, feel free to call us - let’s have a conversation!";
                        $(".confirm__p")[0].innerText = i, $("#question-5").addClass("question__wrapper--inactive"), $(".next__wrapper").addClass("next__wrapper--inactive"), $(".question__number").addClass("question__number--inactive"), $("#question-6").removeClass("question__wrapper--inactive")
                } else switch ($(".error__wrapper").css("opacity", "0.2"), e) {
                    case 1:
                        $(".error__message")[0].innerText = "Don’t be shy, tell us your name.";
                        break;
                    case 2:
                        $(".error__message")[0].innerText = "Don’t be shy, tell us about your project.";
                        break;
                    case 3:
                        $(".error__message")[0].innerText = "Don’t be shy, please fill the budget field.";
                        break;
                    case 4:
                        $(".error__message")[0].innerText = "Don’t be shy, please fill the deadline field.";
                        break;
                    case 5:
                        $(".error__message")[0].innerText = "Don’t be shy, we need to contact you somehow."
                }
        })
    }, e.exports.indicateScrollArrow = a, e.exports.countChars = function() {
        $(".delivered__span")[0].nextSibling.data.length < 11 ? $(".delivered__list").css("display", "none") : $(".delivered__list").css("display", "block")
    }, svg = document.getElementById("audioLine"), s = Snap(svg);
    var n = Snap.select("#audioLine"),
        o = !1;

    $("html").addClass("noscroll"), $(".preload").addClass("preload--active"), $(".preload__percent, .preload__title, .preload__favicon ").addClass("preload--active");
    var n = 0,
        i = setInterval(function() {
            if (n += 1, t.textContent = n + "%", 100 === n && (clearInterval(i), $(".website__wrapper").css("visibility", "visible"), $(".preload__percent, .preload__title, .preload__favicon ").removeClass("preload--active"), o.checkVisit(), setTimeout(function() {
                    $(".preload").removeClass("preload--active")
                }, 1500), $("html").removeClass("noscroll"), n = 0, e)) return e()
        }, 20)
};