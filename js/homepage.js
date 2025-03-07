gsap.to(".loader-img", {
    rotation: 360,
    duration: 1,
    repeat: 0
}), document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loading")
}), window.addEventListener("load", () => {
    setTimeout(() => {
        document.body.classList.remove("loading"), document.querySelector(".loader").style.display = "none"
    }, 1e3)
});
const form = document.getElementById("form"),
    result = document.getElementById("result");

function adjustSidebarWidth() {
    let e = document.querySelector(".Header-ticker")?.offsetWidth || 100,
        t = document.querySelector(".sidebar");
    if (t) {
        let n = `calc(100vw - ${e}px)`;
        t.style.width = n, document.querySelectorAll(".menu-item").forEach(e => {
            e.style.width = n
        })
    }
}

function printViewportDimensions() {
    let e = window.innerWidth,
        t = window.innerHeight;
    console.log("------VIEWPORT SIZES------"), console.log(`Viewport Width: ${e}px`), console.log(`Viewport Height: ${t}px`), console.log("--------------------------")
}
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let t = new FormData(form),
        n = JSON.stringify(Object.fromEntries(t));
    result.innerHTML = "Sending...", fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: n
    }).then(e => e.json()).then(e => {
        e.success ? (result.innerHTML = "✅ Form submitted successfully!", form.reset()) : result.innerHTML = "❌ Error: " + e.message
    }).catch(() => {
        result.innerHTML = "❌ Failed to send. Check your internet connection."
    }), setTimeout(() => {
        result.style.display = "none"
    }, 5e3)
}), document.addEventListener("keydown", e => {
    e.ctrlKey && ("u" === e.key || "U" === e.key) && e.preventDefault()
}), window.addEventListener("load", function() {
    document.querySelector(".logo-image").style.opacity = "1", document.querySelector(".navbar").style.opacity = "1", document.querySelector(".designer-footer").style.opacity = "1", document.querySelector(".hamburger-menu").style.opacity = "1"
}), document.querySelector(".hamburger-menu").addEventListener("click", function() {
    document.querySelector(".container").classList.toggle("change")
}), document.addEventListener("click", function(e) {
    let t = document.querySelector(".container"),
        n = document.querySelector(".sidebar"),
        r = document.querySelector(".hamburger-menu");
    !t.classList.contains("change") || n.contains(e.target) || r.contains(e.target) || t.classList.remove("change")
}), document.addEventListener("DOMContentLoaded", function() {
    let e = document.querySelector("header"),
        t = document.querySelector(".Header-swimlane"),
        n = window.scrollY,
        r = !1,
        o, i, l, a;
    window.innerWidth <= 768 ? (o = 12, i = 6, l = 0, a = 0) : (o = 24, i = 8, l = 0, a = 0), window.addEventListener("scroll", function() {
        let s = window.scrollY,
            c = Math.min(1, s / 200),
            d = o - c * (o - i),
            u = l - c * (l - a);
        e.style.fontSize = `${d}px`, e.style.padding = `${u}px 0`, s > 200 && s > n && !r ? (e.style.transform = "translateY(-170%)", t.style.opacity = "1", r = !0) : s < n && s < 150 && r && (e.style.transform = "translateY(0)", t.style.opacity = "1", t.style.backgroundColor = "#f1f1f1", r = !1), n = s
    })
}), window.addEventListener("resize", adjustSidebarWidth), window.addEventListener("load", adjustSidebarWidth), document.querySelectorAll(".shuffle-text > a").forEach(e => {
    let t = /Mobi|Android/i.test(navigator.userAgent);
    if (!t) {
        let n = e.textContent.split(" "),
            r = [],
            o;
        e.innerHTML = n.map(e => e.split("").map((e, t) => `<span data-char="${e}" data-index="${t}">${e}</span>`).join("")).join(" ");
        let i = [...e.querySelectorAll("span")];

        function l() {
            a(), n.forEach(e => {
                let t = i.findIndex(t => t.dataset.char === e[0]),
                    n = i.slice(t, t + e.length);
                n.shift();
                let o = n.map(e => e.textContent),
                    l = setInterval(() => {
                        let e = [...Array(n.length).keys()];
                        for (let t = e.length - 1; t > 0; t--) {
                            let r = Math.floor(Math.random() * (t + 1));
                            [e[t], e[r]] = [e[r], e[t]]
                        }
                        let i = e.map(e => o[e]);
                        n.forEach((e, t) => {
                            e.textContent = i[t]
                        })
                    }, 50);
                r.push(l)
            }), o = setTimeout(a, 300)
        }

        function a() {
            r.forEach(clearInterval), r = [], clearTimeout(o), s()
        }

        function s() {
            i.forEach(e => {
                e.textContent = e.dataset.char
            })
        }
        e.addEventListener("mouseenter", l), e.addEventListener("mouseleave", a)
    }
}), document.querySelectorAll(".header-shuffle-text").forEach(e => {
    let t = /Mobi|Android/i.test(navigator.userAgent);
    if (!t) {
        let n = e.textContent.split(" "),
            r = [],
            o, i;
        e.innerHTML = n.map(e => e.split("").map((e, t) => `<span data-char="${e}" data-index="${t}">${e}</span>`).join("")).join(" ");
        let l = [...e.querySelectorAll("span")];

        function a() {
            s(), n.forEach(e => {
                let t = l.findIndex(t => t.dataset.char === e[0]),
                    n = l.slice(t, t + e.length);
                n.shift();
                let o = n.map(e => e.textContent),
                    i = setInterval(() => {
                        let e = [...Array(n.length).keys()];
                        for (let t = e.length - 1; t > 0; t--) {
                            let r = Math.floor(Math.random() * (t + 1));
                            [e[t], e[r]] = [e[r], e[t]]
                        }
                        let i = e.map(e => o[e]);
                        n.forEach((e, t) => {
                            e.textContent = i[t]
                        })
                    }, 50);
                r.push(i)
            }), o = setTimeout(s, 400)
        }

        function s() {
            r.forEach(clearInterval), r = [], clearTimeout(o), c()
        }

        function c() {
            l.forEach(e => {
                e.textContent = e.dataset.char
            })
        }
        new IntersectionObserver(e => {
            e.forEach(e => {
                e.isIntersecting && (clearTimeout(i), i = setTimeout(() => {
                    a()
                }, 1e3))
            })
        }, {
            threshold: .5
        }).observe(e), e.addEventListener("mouseenter", a), e.addEventListener("mouseleave", s)
    }
}), document.addEventListener("DOMContentLoaded", () => {
    let e = document.querySelector(".ticker-wrapper"),
        t = Array.from(document.querySelectorAll(".ticker-text"));

    function n() {
        let e = 0;
        return t.forEach(t => {
            let n = t.getBoundingClientRect();
            e = Math.max(e, n.height)
        }), .5 * e
    }

    function r() {
        requestAnimationFrame(() => {
            let r = n();
            t.forEach(e => {
                e.style.marginBottom = `${r}px`
            });
            let o = (t[0].offsetHeight + r) * t.length;
            e.innerHTML = "";
            let i = t.map(e => e.outerHTML).join("");
            e.innerHTML = i + i, t = Array.from(document.querySelectorAll(".ticker-text")), gsap.set(".ticker-wrapper", {
                y: 0
            }), gsap.to(".ticker-wrapper", {
                y: -o,
                duration: 1 * t.length,
                ease: "none",
                repeat: -1
            })
        })
    }
    r();
    let o;
    window.addEventListener("resize", () => {
        clearTimeout(o), o = setTimeout(() => {
            r()
        }, 300)
    }), document.fonts.ready.then(() => {
        r()
    })
}), document.addEventListener("DOMContentLoaded", () => {
    let e = document.querySelectorAll(".menu-link"),
        t = document.querySelector(".page-transition-overlay"),
        n = document.querySelector(".sidebar"),
        r = document.querySelector(".Header-ticker");

    function o() {
        return r ? r.offsetWidth : 100
    }

    function i() {
        let e = o();
        document.documentElement.style.setProperty("--ticker-width", `${e}px`)
    }

    function l() {
        n.classList.remove("change")
    }

    function a(n) {
        n.preventDefault();
        let r = n.currentTarget.getAttribute("href");
        i(), e.forEach(e => e.classList.add("shrink")), setTimeout(() => {
            t.classList.add("active")
        }, 400), setTimeout(() => {
            l()
        }, 1400), setTimeout(() => {
            window.location.href = r
        }, 2e3)
    }

    function s() {
        document.querySelectorAll(".menu-link").forEach(e => {
            e.removeEventListener("click", a), e.addEventListener("click", a)
        })
    }
    s(), window.addEventListener("resize", i)
}), printViewportDimensions(), window.addEventListener("resize", printViewportDimensions);
const options = {
        root: null,
        rootMargin: "0px",
        threshold: .7
    },
    callback = (e, t) => {
        e.forEach(e => {
            e.isIntersecting ? e.target.classList.add("show") : e.target.classList.remove("show")
        })
    },
    observer = new IntersectionObserver(callback, options),
    bulletPoints = document.querySelectorAll(".bullet-point");
bulletPoints.forEach(e => {
    observer.observe(e)
});