/**
 * @license
 * Adobe Visitor API for JavaScript version: 4.4.0
 * Copyright 2019 Adobe, Inc. All Rights Reserved
 * More info available at https://marketing.adobe.com/resources/help/en_US/mcvid/
 */
(function(e) {
  (function() {
    "use strict";
    function e(t) {
      return (e =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            })(t);
    }
    function t(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0
            })
          : (e[t] = n),
        e
      );
    }
    function n() {
      return {
        callbacks: {},
        add: function(e, t) {
          this.callbacks[e] = this.callbacks[e] || [];
          var n = this.callbacks[e].push(t) - 1,
            i = this;
          return function() {
            i.callbacks[e].splice(n, 1);
          };
        },
        execute: function(e, t) {
          if (this.callbacks[e]) {
            (t = void 0 === t ? [] : t), (t = t instanceof Array ? t : [t]);
            try {
              for (; this.callbacks[e].length; ) {
                var n = this.callbacks[e].shift();
                "function" == typeof n
                  ? n.apply(null, t)
                  : n instanceof Array && n[1].apply(n[0], t);
              }
              delete this.callbacks[e];
            } catch (e) {}
          }
        },
        executeAll: function(e, t) {
          (t || (e && !x.isObjectEmpty(e))) &&
            Object.keys(this.callbacks).forEach(function(t) {
              var n = void 0 !== e[t] ? e[t] : "";
              this.execute(t, n);
            }, this);
        },
        hasCallbacks: function() {
          return !!Object.keys(this.callbacks).length;
        }
      };
    }
    function i(e, t, n) {
      var i = null == e ? void 0 : e[t];
      return void 0 === i ? n : i;
    }
    function r(e) {
      for (var t = /^\d+$/, n = 0, i = e.length; i > n; n++)
        if (!t.test(e[n])) return !1;
      return !0;
    }
    function o(e, t) {
      for (; e.length < t.length; ) e.push("0");
      for (; t.length < e.length; ) t.push("0");
    }
    function a(e, t) {
      for (var n = 0; n < e.length; n++) {
        var i = parseInt(e[n], 10),
          r = parseInt(t[n], 10);
        if (i > r) return 1;
        if (r > i) return -1;
      }
      return 0;
    }
    function s(e, t) {
      if (e === t) return 0;
      var n = ("" + e).split("."),
        i = ("" + t).split(".");
      return r(n.concat(i)) ? (o(n, i), a(n, i)) : NaN;
    }
    function c(e) {
      return e === Object(e) && 0 === Object.keys(e).length;
    }
    function u(e) {
      return "function" == typeof e || (e instanceof Array && e.length);
    }
    function l() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : function() {
                return !0;
              };
      (this.log = me("log", e, t)),
        (this.warn = me("warn", e, t)),
        (this.error = me("error", e, t));
    }
    function d() {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        t = e.isEnabled,
        n = e.cookieName,
        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        r = i.cookies;
      return t && n && r
        ? {
            remove: function() {
              r.remove(n);
            },
            get: function() {
              var e = r.get(n),
                t = {};
              try {
                t = JSON.parse(e);
              } catch (e) {
                t = {};
              }
              return t;
            },
            set: function(e, t) {
              (t = t || {}),
                r.set(n, JSON.stringify(e), {
                  domain: t.optInCookieDomain || "",
                  cookieLifetime: t.optInStorageExpiry || 3419e4,
                  expires: !0
                });
            }
          }
        : { get: _e, set: _e, remove: _e };
    }
    function f(e) {
      (this.name = this.constructor.name),
        (this.message = e),
        "function" == typeof Error.captureStackTrace
          ? Error.captureStackTrace(this, this.constructor)
          : (this.stack = Error(e).stack);
    }
    function p() {
      function e(e, t) {
        var n = Se(e);
        return n.length
          ? n.every(function(e) {
              return !!t[e];
            })
          : ye(t);
      }
      function t() {
        T(D),
          M(ce.COMPLETE),
          v(m.status, m.permissions),
          h.set(m.permissions, { optInCookieDomain: c, optInStorageExpiry: u }),
          C.execute(je);
      }
      function n(e) {
        return function(n, i) {
          if (!Ae(n))
            throw Error(
              "[OptIn] Invalid category(-ies). Please use the `OptIn.Categories` enum."
            );
          return M(ce.CHANGED), Object.assign(D, be(Se(n), e)), i || t(), m;
        };
      }
      var i =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        r = i.doesOptInApply,
        o = i.previousPermissions,
        a = i.preOptInApprovals,
        s = i.isOptInStorageEnabled,
        c = i.optInCookieDomain,
        u = i.optInStorageExpiry,
        l = i.isIabContext,
        f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        p = f.cookies,
        g = Pe(o);
      Le(g, "Invalid `previousPermissions`!"),
        Le(a, "Invalid `preOptInApprovals`!");
      var h = d(
          { isEnabled: !!s, cookieName: "adobeujs-optin" },
          { cookies: p }
        ),
        m = this,
        v = se(m),
        C = pe(),
        I = Me(g),
        S = Me(a),
        y = h.get(),
        A = {},
        b = (function(e, t) {
          return Te(e) || (t && Te(t)) ? ce.COMPLETE : ce.PENDING;
        })(I, y),
        O = (function(e, t, n) {
          var i = be(fe, !r);
          return r ? Object.assign({}, i, e, t, n) : i;
        })(S, I, y),
        D = Oe(O),
        M = function(e) {
          return (b = e);
        },
        T = function(e) {
          return (O = e);
        };
      (m.deny = n(!1)),
        (m.approve = n(!0)),
        (m.denyAll = m.deny.bind(m, fe)),
        (m.approveAll = m.approve.bind(m, fe)),
        (m.isApproved = function(t) {
          return e(t, m.permissions);
        }),
        (m.isPreApproved = function(t) {
          return e(t, S);
        }),
        (m.fetchPermissions = function(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = t ? m.on(ce.COMPLETE, e) : _e;
          return (
            !r || (r && m.isComplete) || a
              ? e(m.permissions)
              : t ||
                C.add(je, function() {
                  return e(m.permissions);
                }),
            n
          );
        }),
        (m.complete = function() {
          m.status === ce.CHANGED && t();
        }),
        (m.registerPlugin = function(e) {
          if (!e || !e.name || "function" != typeof e.onRegister)
            throw Error(xe);
          A[e.name] || ((A[e.name] = e), e.onRegister.call(e, m));
        }),
        (m.execute = we(A)),
        Object.defineProperties(m, {
          permissions: {
            get: function() {
              return O;
            }
          },
          status: {
            get: function() {
              return b;
            }
          },
          Categories: {
            get: function() {
              return ue;
            }
          },
          doesOptInApply: {
            get: function() {
              return !!r;
            }
          },
          isPending: {
            get: function() {
              return m.status === ce.PENDING;
            }
          },
          isComplete: {
            get: function() {
              return m.status === ce.COMPLETE;
            }
          },
          a: {
            get: function() {
              return Object.keys(A);
            }
          },
          isIabContext: {
            get: function() {
              return l;
            }
          }
        });
    }
    function g(e, t) {
      function n() {
        (r = null), e.call(e, new f("The call took longer than you wanted!"));
      }
      function i() {
        r && (clearTimeout(r), e.apply(e, arguments));
      }
      if (void 0 === t) return e;
      var r = setTimeout(n, t);
      return i;
    }
    function h() {
      if (window.b) return window.b;
      var e = window;
      if (e === window.top) return void Ce.error("__cmp not found");
      for (var t; !t; ) {
        e = e.parent;
        try {
          e.frames.c && (t = e);
        } catch (e) {}
        if (e === window.top) break;
      }
      if (!t) return void Ce.error("__cmp not found");
      var n = {};
      return (
        (window.b = function(e, i, r) {
          var o = Math.random() + "",
            a = { d: { command: e, parameter: i, callId: o } };
          (n[o] = r), t.postMessage(a, "*");
        }),
        window.addEventListener(
          "message",
          function(e) {
            var t = e.data;
            if ("string" == typeof t)
              try {
                t = JSON.parse(e.data);
              } catch (e) {}
            if (t.e) {
              var i = t.e;
              n[i.callId] &&
                (n[i.callId](i.returnValue, i.success), delete n[i.callId]);
            }
          },
          !1
        ),
        window.b
      );
    }
    function m() {
      var e = this;
      (e.name = "iabPlugin"), (e.version = "0.0.1");
      var t = pe(),
        n = { allConsentData: null },
        i = function(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return (n[e] = t);
        };
      (e.fetchConsentData = function(e) {
        var t = e.callback,
          n = e.timeout,
          i = g(t, n);
        r({ callback: i });
      }),
        (e.isApproved = function(e) {
          var t = e.callback,
            i = e.category,
            o = e.timeout;
          if (n.allConsentData)
            return t(
              null,
              s(
                i,
                n.allConsentData.vendorConsents,
                n.allConsentData.purposeConsents
              )
            );
          var a = g(function(e) {
            var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {},
              r = n.vendorConsents,
              o = n.purposeConsents;
            t(e, s(i, r, o));
          }, o);
          r({ category: i, callback: a });
        }),
        (e.onRegister = function(t) {
          var n = Object.keys(le),
            i = function(e) {
              var i =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {},
                r = i.purposeConsents,
                o = i.gdprApplies,
                a = i.vendorConsents;
              !e &&
                o &&
                a &&
                r &&
                (n.forEach(function(e) {
                  var n = s(e, a, r);
                  t[n ? "approve" : "deny"](e, !0);
                }),
                t.complete());
            };
          e.fetchConsentData({ callback: i });
        });
      var r = function(e) {
          var r = e.callback;
          if (n.allConsentData) return r(null, n.allConsentData);
          t.add("FETCH_CONSENT_DATA", r);
          var s = {};
          a(function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              r = e.purposeConsents,
              a = e.gdprApplies,
              c = e.vendorConsents;
            (arguments.length > 1 ? arguments[1] : void 0) &&
              ((s = { purposeConsents: r, gdprApplies: a, vendorConsents: c }),
              i("allConsentData", s)),
              o(function() {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
                (arguments.length > 1 ? arguments[1] : void 0) &&
                  ((s.consentString = e.consentData), i("allConsentData", s)),
                  t.execute("FETCH_CONSENT_DATA", [null, n.allConsentData]);
              });
          });
        },
        o = function(e) {
          var t = h();
          t && t("getConsentData", null, e);
        },
        a = function(e) {
          var t = Ne(le),
            n = h();
          n && n("getVendorConsents", t, e);
        },
        s = function(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {},
            n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : {};
          return (
            !!t[le[e]] &&
            (function() {
              return de[e].every(function(e) {
                return n[e];
              });
            })()
          );
        };
    }
    var v =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
    Object.assign =
      Object.assign ||
      function(e) {
        for (var t, n, i = 1; i < arguments.length; ++i) {
          n = arguments[i];
          for (t in n)
            Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
        }
        return e;
      };
    var C,
      I,
      S = {
        HANDSHAKE: "HANDSHAKE",
        GETSTATE: "GETSTATE",
        PARENTSTATE: "PARENTSTATE"
      },
      y = {
        MCMID: "MCMID",
        MCAID: "MCAID",
        MCAAMB: "MCAAMB",
        MCAAMLH: "MCAAMLH",
        MCOPTOUT: "MCOPTOUT",
        CUSTOMERIDS: "CUSTOMERIDS"
      },
      A = {
        MCMID: "getMarketingCloudVisitorID",
        MCAID: "getAnalyticsVisitorID",
        MCAAMB: "getAudienceManagerBlob",
        MCAAMLH: "getAudienceManagerLocationHint",
        MCOPTOUT: "isOptedOut",
        ALLFIELDS: "getVisitorValues"
      },
      b = { CUSTOMERIDS: "getCustomerIDs" },
      O = {
        MCMID: "getMarketingCloudVisitorID",
        MCAAMB: "getAudienceManagerBlob",
        MCAAMLH: "getAudienceManagerLocationHint",
        MCOPTOUT: "isOptedOut",
        MCAID: "getAnalyticsVisitorID",
        CUSTOMERIDS: "getCustomerIDs",
        ALLFIELDS: "getVisitorValues"
      },
      D = { MC: "MCMID", A: "MCAID", AAM: "MCAAMB" },
      M = {
        MCMID: "MCMID",
        MCOPTOUT: "MCOPTOUT",
        MCAID: "MCAID",
        MCAAMLH: "MCAAMLH",
        MCAAMB: "MCAAMB"
      },
      T = { UNKNOWN: 0, AUTHENTICATED: 1, LOGGED_OUT: 2 },
      E = { GLOBAL: "global" },
      k = {
        MESSAGES: S,
        STATE_KEYS_MAP: y,
        ASYNC_API_MAP: A,
        SYNC_API_MAP: b,
        ALL_APIS: O,
        FIELDGROUP_TO_FIELD: D,
        FIELDS: M,
        AUTH_STATE: T,
        OPT_OUT: E
      },
      _ = (k.STATE_KEYS_MAP,
      function(e) {
        function t() {}
        function n(t, n) {
          var i = this;
          return function() {
            var r = e(0, t),
              o = {};
            return (o[t] = r), i.setStateAndPublish(o), n(r), r;
          };
        }
        (this.getMarketingCloudVisitorID = function(e) {
          e = e || t;
          var i = this.findField("MCMID", e),
            r = n.call(this, "MCMID", e);
          return void 0 !== i ? i : r();
        }),
          (this.getVisitorValues = function(e) {
            this.getMarketingCloudVisitorID(function(t) {
              e({ MCMID: t });
            });
          });
      }),
      P = k.MESSAGES,
      L = k.ASYNC_API_MAP,
      R = k.SYNC_API_MAP,
      N = function() {
        function e() {}
        function t(e, t) {
          var n = this;
          return function() {
            return (
              n.callbackRegistry.add(e, t), n.messageParent(P.GETSTATE), ""
            );
          };
        }
        function n(n) {
          this[L[n]] = function(i) {
            i = i || e;
            var r = this.findField(n, i),
              o = t.call(this, n, i);
            return void 0 !== r ? r : o();
          };
        }
        function i(t) {
          this[R[t]] = function() {
            return this.findField(t, e) || {};
          };
        }
        Object.keys(L).forEach(n, this), Object.keys(R).forEach(i, this);
      },
      w = k.ASYNC_API_MAP,
      j = function() {
        Object.keys(w).forEach(function(e) {
          this[w[e]] = function(t) {
            this.callbackRegistry.add(e, t);
          };
        }, this);
      },
      x = (function(e, t) {
        return (
          (t = { exports: {} }),
          (function(t, n) {
            (n.isObjectEmpty = function(e) {
              return e === Object(e) && 0 === Object.keys(e).length;
            }),
              (n.isValueEmpty = function(e) {
                return "" === e || n.isObjectEmpty(e);
              }),
              (n.getIeVersion = function() {
                if (document.documentMode) return document.documentMode;
                for (var e = 7; e > 4; e--) {
                  var t = document.createElement("div");
                  if (
                    ((t.innerHTML =
                      "\x3c!--[if IE " + e + "]><span></span><![endif]--\x3e"),
                    t.getElementsByTagName("span").length)
                  )
                    return (t = null), e;
                  t = null;
                }
                return null;
              }),
              (n.encodeAndBuildRequest = function(e, t) {
                return e.map(encodeURIComponent).join(t);
              }),
              (n.isObject = function(t) {
                return (
                  null !== t && "object" === e(t) && !1 === Array.isArray(t)
                );
              }),
              (n.defineGlobalNamespace = function() {
                return (
                  (window.adobe = n.isObject(window.adobe) ? window.adobe : {}),
                  window.adobe
                );
              }),
              (n.pluck = function(e, t) {
                return t.reduce(function(t, n) {
                  return e[n] && (t[n] = e[n]), t;
                }, Object.create(null));
              }),
              (n.parseOptOut = function(e, t, n) {
                t ||
                  ((t = n),
                  e.d_optout &&
                    e.d_optout instanceof Array &&
                    (t = e.d_optout.join(",")));
                var i = parseInt(e.d_ottl, 10);
                return isNaN(i) && (i = 7200), { optOut: t, d_ottl: i };
              }),
              (n.normalizeBoolean = function(e) {
                var t = e;
                return "true" === e ? (t = !0) : "false" === e && (t = !1), t;
              });
          })(t, t.exports),
          t.exports
        );
      })(),
      V = (x.isObjectEmpty,
      x.isValueEmpty,
      x.getIeVersion,
      x.encodeAndBuildRequest,
      x.isObject,
      x.defineGlobalNamespace,
      x.pluck,
      x.parseOptOut,
      x.normalizeBoolean,
      n),
      H = k.MESSAGES,
      U = { 0: "prefix", 1: "orgID", 2: "state" },
      B = function(e, t) {
        (this.parse = function(e) {
          try {
            var t = {};
            return (
              e.data.split("|").forEach(function(e, n) {
                void 0 !== e && (t[U[n]] = 2 !== n ? e : JSON.parse(e));
              }),
              t
            );
          } catch (e) {}
        }),
          (this.isInvalid = function(n) {
            var i = this.parse(n);
            if (!i || 2 > Object.keys(i).length) return !0;
            var r = e !== i.orgID,
              o = !t || n.origin !== t,
              a = -1 === Object.keys(H).indexOf(i.prefix);
            return r || o || a;
          }),
          (this.send = function(n, i, r) {
            var o = i + "|" + e;
            r && r === Object(r) && (o += "|" + JSON.stringify(r));
            try {
              n.postMessage(o, t);
            } catch (e) {}
          });
      },
      G = k.MESSAGES,
      F = function(e, t, n, i) {
        function r(e) {
          Object.assign(p, e);
        }
        function o(e) {
          Object.assign(p.state, e),
            Object.assign(p.state.ALLFIELDS, e),
            p.callbackRegistry.executeAll(p.state);
        }
        function a(e) {
          if (!m.isInvalid(e)) {
            h = !1;
            var t = m.parse(e);
            p.setStateAndPublish(t.state);
          }
        }
        function s(e) {
          !h && g && ((h = !0), m.send(i, e));
        }
        function c() {
          r(new _(n.f)),
            p.getMarketingCloudVisitorID(),
            p.callbackRegistry.executeAll(p.state, !0),
            v.removeEventListener("message", u);
        }
        function u(e) {
          if (!m.isInvalid(e)) {
            var t = m.parse(e);
            (h = !1),
              v.clearTimeout(p.g),
              v.removeEventListener("message", u),
              r(new N(p)),
              v.addEventListener("message", a),
              p.setStateAndPublish(t.state),
              p.callbackRegistry.hasCallbacks() && s(G.GETSTATE);
          }
        }
        function l() {
          g && postMessage
            ? (v.addEventListener("message", u),
              s(G.HANDSHAKE),
              (p.g = setTimeout(c, 250)))
            : c();
        }
        function d() {
          v.s_c_in || ((v.s_c_il = []), (v.s_c_in = 0)),
            (p.i = "Visitor"),
            (p.j = v.s_c_il),
            (p.l = v.s_c_in),
            (p.j[p.l] = p),
            v.s_c_in++;
        }
        function f() {
          function e(e) {
            0 !== e.indexOf("_") &&
              "function" == typeof n[e] &&
              (p[e] = function() {});
          }
          Object.keys(n).forEach(e),
            (p.getSupplementalDataID = n.getSupplementalDataID),
            (p.isAllowed = function() {
              return !0;
            });
        }
        var p = this,
          g = t.whitelistParentDomain;
        (p.state = { ALLFIELDS: {} }),
          (p.version = n.version),
          (p.marketingCloudOrgID = e),
          (p.cookieDomain = n.cookieDomain || ""),
          (p.m = "child");
        var h = !1,
          m = new B(e, g);
        (p.callbackRegistry = V()),
          (p.init = function() {
            d(), f(), r(new j(p)), l();
          }),
          (p.findField = function(e, t) {
            if (void 0 !== p.state[e]) return t(p.state[e]), p.state[e];
          }),
          (p.messageParent = s),
          (p.setStateAndPublish = o);
      },
      W = k.MESSAGES,
      Y = k.ALL_APIS,
      q = k.ASYNC_API_MAP,
      X = k.FIELDGROUP_TO_FIELD,
      J = function(e, t) {
        function n() {
          var t = {};
          return (
            Object.keys(Y).forEach(function(n) {
              var i = Y[n],
                r = e[i]();
              x.isValueEmpty(r) || (t[n] = r);
            }),
            t
          );
        }
        function i() {
          var t = [];
          return (
            e.n &&
              Object.keys(e.n).forEach(function(n) {
                if (e.n[n]) {
                  var i = X[n];
                  t.push(i);
                }
              }),
            t.length ? t : null
          );
        }
        function r(t) {
          return function n(r) {
            var o = i();
            if (o) {
              var a = q[o[0]];
              e[a](n, !0);
            } else t();
          };
        }
        function o(e, i) {
          var r = n();
          t.send(e, i, r);
        }
        function a(e) {
          c(e), o(e, W.HANDSHAKE);
        }
        function s(e) {
          r(function() {
            o(e, W.PARENTSTATE);
          })();
        }
        function c(n) {
          function i(i) {
            r.call(e, i),
              t.send(n, W.PARENTSTATE, { CUSTOMERIDS: e.getCustomerIDs() });
          }
          var r = e.setCustomerIDs;
          e.setCustomerIDs = i;
        }
        return function(e) {
          t.isInvalid(e) ||
            (t.parse(e).prefix === W.HANDSHAKE ? a : s)(e.source);
        };
      },
      K = function(e, t) {
        function n(e) {
          return function(n) {
            (i[e] = n), ++r === o && t(i);
          };
        }
        var i = {},
          r = 0,
          o = Object.keys(e).length;
        Object.keys(e).forEach(function(t) {
          var i = e[t];
          if (i.fn) {
            var r = i.args || [];
            r.unshift(n(t)), i.fn.apply(i.context || null, r);
          }
        });
      },
      z = {
        get: function(e) {
          e = encodeURIComponent(e);
          var t = (";" + document.cookie).split(" ").join(";"),
            n = t.indexOf(";" + e + "="),
            i = 0 > n ? n : t.indexOf(";", n + 1);
          return 0 > n
            ? ""
            : decodeURIComponent(
                t.substring(n + 2 + e.length, 0 > i ? t.length : i)
              );
        },
        set: function(e, t, n) {
          var r = i(n, "cookieLifetime"),
            o = i(n, "expires"),
            a = i(n, "domain"),
            s = i(n, "secure"),
            c = s ? "Secure" : "";
          if (o && "SESSION" !== r && "NONE" !== r) {
            var u = "" !== t ? parseInt(r || 0, 10) : -60;
            if (u) (o = new Date()), o.setTime(o.getTime() + 1e3 * u);
            else if (1 === o) {
              o = new Date();
              var l = o.getYear();
              o.setYear(l + 2 + (1900 > l ? 1900 : 0));
            }
          } else o = 0;
          return e && "NONE" !== r
            ? ((document.cookie =
                encodeURIComponent(e) +
                "=" +
                encodeURIComponent(t) +
                "; path=/;" +
                (o ? " expires=" + o.toGMTString() + ";" : "") +
                (a ? " domain=" + a + ";" : "") +
                c),
              this.get(e) === t)
            : 0;
        },
        remove: function(e, t) {
          var n = i(t, "domain");
          (n = n ? " domain=" + n + ";" : ""),
            (document.cookie =
              encodeURIComponent(e) +
              "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;" +
              n);
        }
      },
      $ = function(e) {
        var t;
        !e && v.location && (e = v.location.hostname), (t = e);
        var n,
          i = t.split(".");
        for (n = i.length - 2; n >= 0; n--)
          if (
            ((t = i.slice(n).join(".")), z.set("test", "cookie", { domain: t }))
          )
            return z.remove("test", { domain: t }), t;
        return "";
      },
      Z = {
        compare: s,
        isLessThan: function(e, t) {
          return 0 > s(e, t);
        },
        areVersionsDifferent: function(e, t) {
          return 0 !== s(e, t);
        },
        isGreaterThan: function(e, t) {
          return s(e, t) > 0;
        },
        isEqual: function(e, t) {
          return 0 === s(e, t);
        }
      },
      Q = !!v.postMessage,
      ee = {
        postMessage: function(e, t, n) {
          var i = 1;
          t &&
            (Q
              ? n.postMessage(e, t.replace(/([^:]+:\/\/[^\/]+).*/, "$1"))
              : t &&
                (n.location =
                  t.replace(/#.*$/, "") + "#" + +new Date() + i++ + "&" + e));
        },
        receiveMessage: function(e, t) {
          var n;
          try {
            Q &&
              (e &&
                (n = function(n) {
                  if (
                    ("string" == typeof t && n.origin !== t) ||
                    ("[object Function]" ===
                      Object.prototype.toString.call(t) &&
                      !1 === t(n.origin))
                  )
                    return !1;
                  e(n);
                }),
              v.addEventListener
                ? v[e ? "addEventListener" : "removeEventListener"](
                    "message",
                    n
                  )
                : v[e ? "attachEvent" : "detachEvent"]("onmessage", n));
          } catch (e) {}
        }
      },
      te = function(e) {
        var t,
          n,
          i = "0123456789",
          r = "",
          o = "",
          a = 8,
          s = 10,
          c = 10;
        if (1 == e) {
          for (i += "ABCDEF", t = 0; 16 > t; t++)
            (n = Math.floor(Math.random() * a)),
              (r += i.substring(n, n + 1)),
              (n = Math.floor(Math.random() * a)),
              (o += i.substring(n, n + 1)),
              (a = 16);
          return r + "-" + o;
        }
        for (t = 0; 19 > t; t++)
          (n = Math.floor(Math.random() * s)),
            (r += i.substring(n, n + 1)),
            0 === t && 9 == n
              ? (s = 3)
              : (1 != t && 2 != t) || 10 == s || n >= 2
              ? t > 2 && (s = 10)
              : (s = 10),
            (n = Math.floor(Math.random() * c)),
            (o += i.substring(n, n + 1)),
            0 === t && 9 == n
              ? (c = 3)
              : (1 != t && 2 != t) || 10 == c || n >= 2
              ? t > 2 && (c = 10)
              : (c = 10);
        return r + o;
      },
      ne = function(e, t) {
        return {
          corsMetadata: (function() {
            var e = "none",
              t = !0;
            return (
              "undefined" != typeof XMLHttpRequest &&
                XMLHttpRequest === Object(XMLHttpRequest) &&
                ("withCredentials" in new XMLHttpRequest()
                  ? (e = "XMLHttpRequest")
                  : "undefined" != typeof XDomainRequest &&
                    XDomainRequest === Object(XDomainRequest) &&
                    (t = !1),
                Object.prototype.toString
                  .call(v.HTMLElement)
                  .indexOf("Constructor") > 0 && (t = !1)),
              { corsType: e, corsCookiesEnabled: t }
            );
          })(),
          getCORSInstance: function() {
            return "none" === this.corsMetadata.corsType
              ? null
              : new v[this.corsMetadata.corsType]();
          },
          fireCORS: function(t, n, i) {
            function r(e) {
              var n;
              try {
                if ((n = JSON.parse(e)) !== Object(n))
                  return void o.handleCORSError(
                    t,
                    null,
                    "Response is not JSON"
                  );
              } catch (e) {
                return void o.handleCORSError(
                  t,
                  e,
                  "Error parsing response as JSON"
                );
              }
              try {
                for (var i = t.callback, r = v, a = 0; a < i.length; a++)
                  r = r[i[a]];
                r(n);
              } catch (e) {
                o.handleCORSError(t, e, "Error forming callback function");
              }
            }
            var o = this;
            n && (t.loadErrorHandler = n);
            try {
              var a = this.getCORSInstance();
              a.open("get", t.corsUrl + "&ts=" + new Date().getTime(), !0),
                "XMLHttpRequest" === this.corsMetadata.corsType &&
                  ((a.withCredentials = !0),
                  (a.timeout = e.loadTimeout),
                  a.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                  ),
                  (a.onreadystatechange = function() {
                    4 === this.readyState &&
                      200 === this.status &&
                      r(this.responseText);
                  })),
                (a.onerror = function(e) {
                  o.handleCORSError(t, e, "onerror");
                }),
                (a.ontimeout = function(e) {
                  o.handleCORSError(t, e, "ontimeout");
                }),
                a.send(),
                e.o.requests.push(t.corsUrl);
            } catch (e) {
              this.handleCORSError(t, e, "try-catch");
            }
          },
          handleCORSError: function(t, n, i) {
            e.CORSErrors.push({ corsData: t, error: n, description: i }),
              t.loadErrorHandler &&
                ("ontimeout" === i
                  ? t.loadErrorHandler(!0)
                  : t.loadErrorHandler(!1));
          }
        };
      },
      ie = {
        POST_MESSAGE_ENABLED: !!v.postMessage,
        DAYS_BETWEEN_SYNC_ID_CALLS: 1,
        MILLIS_PER_DAY: 864e5,
        ADOBE_MC: "adobe_mc",
        ADOBE_MC_SDID: "adobe_mc_sdid",
        VALID_VISITOR_ID_REGEX: /^[0-9a-fA-F\-]+$/,
        ADOBE_MC_TTL_IN_MIN: 5,
        VERSION_REGEX: /vVersion\|((\d+\.)?(\d+\.)?(\*|\d+))(?=$|\|)/,
        FIRST_PARTY_SERVER_COOKIE: "s_ecid"
      },
      re = function(e, t) {
        var n = v.document;
        return {
          THROTTLE_START: 3e4,
          MAX_SYNCS_LENGTH: 649,
          throttleTimerSet: !1,
          id: null,
          onPagePixels: [],
          iframeHost: null,
          getIframeHost: function(e) {
            if ("string" == typeof e) {
              var t = e.split("/");
              return t[0] + "//" + t[2];
            }
          },
          subdomain: null,
          url: null,
          getUrl: function() {
            var t,
              i = "http://fast.",
              r =
                "?d_nsid=" +
                e.idSyncContainerID +
                "#" +
                encodeURIComponent(n.location.origin);
            return (
              this.subdomain || (this.subdomain = "nosubdomainreturned"),
              e.loadSSL &&
                (i = e.idSyncSSLUseAkamai ? "https://fast." : "https://"),
              (t = i + this.subdomain + ".demdex.net/dest5.html" + r),
              (this.iframeHost = this.getIframeHost(t)),
              (this.id =
                "destination_publishing_iframe_" +
                this.subdomain +
                "_" +
                e.idSyncContainerID),
              t
            );
          },
          checkDPIframeSrc: function() {
            var t =
              "?d_nsid=" +
              e.idSyncContainerID +
              "#" +
              encodeURIComponent(n.location.href);
            "string" == typeof e.dpIframeSrc &&
              e.dpIframeSrc.length &&
              ((this.id =
                "destination_publishing_iframe_" +
                (e.p || this.subdomain || new Date().getTime()) +
                "_" +
                e.idSyncContainerID),
              (this.iframeHost = this.getIframeHost(e.dpIframeSrc)),
              (this.url = e.dpIframeSrc + t));
          },
          idCallNotProcesssed: null,
          doAttachIframe: !1,
          startedAttachingIframe: !1,
          iframeHasLoaded: null,
          iframeIdChanged: null,
          newIframeCreated: null,
          originalIframeHasLoadedAlready: null,
          iframeLoadedCallbacks: [],
          regionChanged: !1,
          timesRegionChanged: 0,
          sendingMessages: !1,
          messages: [],
          messagesPosted: [],
          messagesReceived: [],
          messageSendingInterval: ie.POST_MESSAGE_ENABLED ? null : 100,
          onPageDestinationsFired: [],
          jsonForComparison: [],
          jsonDuplicates: [],
          jsonWaiting: [],
          jsonProcessed: [],
          canSetThirdPartyCookies: !0,
          receivedThirdPartyCookiesNotification: !1,
          readyToAttachIframePreliminary: function() {
            return !(
              e.idSyncDisableSyncs ||
              e.disableIdSyncs ||
              e.idSyncDisable3rdPartySyncing ||
              e.disableThirdPartyCookies ||
              e.disableThirdPartyCalls
            );
          },
          readyToAttachIframe: function() {
            return (
              this.readyToAttachIframePreliminary() &&
              (this.doAttachIframe || e.q) &&
              ((this.subdomain && "nosubdomainreturned" !== this.subdomain) ||
                e.p) &&
              this.url &&
              !this.startedAttachingIframe
            );
          },
          attachIframe: function() {
            function e() {
              (r = n.createElement("iframe")),
                (r.sandbox = "allow-scripts allow-same-origin"),
                (r.title = "Adobe ID Syncing iFrame"),
                (r.id = i.id),
                (r.name = i.id + "_name"),
                (r.style.cssText = "display: none; width: 0; height: 0;"),
                (r.src = i.url),
                (i.newIframeCreated = !0),
                t(),
                n.body.appendChild(r);
            }
            function t(e) {
              r.addEventListener("load", function() {
                (r.className = "aamIframeLoaded"),
                  (i.iframeHasLoaded = !0),
                  i.fireIframeLoadedCallbacks(e),
                  i.requestToProcess();
              });
            }
            this.startedAttachingIframe = !0;
            var i = this,
              r = n.getElementById(this.id);
            r
              ? "IFRAME" !== r.nodeName
                ? ((this.id += "_2"), (this.iframeIdChanged = !0), e())
                : ((this.newIframeCreated = !1),
                  "aamIframeLoaded" !== r.className
                    ? ((this.originalIframeHasLoadedAlready = !1),
                      t(
                        "The destination publishing iframe already exists from a different library, but hadn't loaded yet."
                      ))
                    : ((this.originalIframeHasLoadedAlready = !0),
                      (this.iframeHasLoaded = !0),
                      (this.iframe = r),
                      this.fireIframeLoadedCallbacks(
                        "The destination publishing iframe already exists from a different library, and had loaded alresady."
                      ),
                      this.requestToProcess()))
              : e(),
              (this.iframe = r);
          },
          fireIframeLoadedCallbacks: function(e) {
            this.iframeLoadedCallbacks.forEach(function(t) {
              "function" == typeof t &&
                t({
                  message:
                    e ||
                    "The destination publishing iframe was attached and loaded successfully."
                });
            }),
              (this.iframeLoadedCallbacks = []);
          },
          requestToProcess: function(t) {
            function n() {
              r.jsonForComparison.push(t),
                r.jsonWaiting.push(t),
                r.processSyncOnPage(t);
            }
            var i,
              r = this;
            if (t === Object(t) && t.ibs)
              if (
                ((i = JSON.stringify(t.ibs || [])),
                this.jsonForComparison.length)
              ) {
                var o,
                  a,
                  s,
                  c = !1;
                for (o = 0, a = this.jsonForComparison.length; a > o; o++)
                  if (
                    ((s = this.jsonForComparison[o]),
                    i === JSON.stringify(s.ibs || []))
                  ) {
                    c = !0;
                    break;
                  }
                c ? this.jsonDuplicates.push(t) : n();
              } else n();
            if (
              (this.receivedThirdPartyCookiesNotification ||
                !ie.POST_MESSAGE_ENABLED ||
                this.iframeHasLoaded) &&
              this.jsonWaiting.length
            ) {
              var u = this.jsonWaiting.shift();
              this.process(u), this.requestToProcess();
            }
            e.idSyncDisableSyncs ||
              e.disableIdSyncs ||
              !this.iframeHasLoaded ||
              !this.messages.length ||
              this.sendingMessages ||
              (this.throttleTimerSet ||
                ((this.throttleTimerSet = !0),
                setTimeout(function() {
                  r.messageSendingInterval = ie.POST_MESSAGE_ENABLED
                    ? null
                    : 150;
                }, this.THROTTLE_START)),
              (this.sendingMessages = !0),
              this.sendMessages());
          },
          getRegionAndCheckIfChanged: function(t, n) {
            var i = e.r("MCAAMLH"),
              r = t.d_region || t.dcs_region;
            return (
              i
                ? r &&
                  (e.s("MCAAMLH", n),
                  e.t("MCAAMLH", r),
                  parseInt(i, 10) !== r &&
                    ((this.regionChanged = !0),
                    this.timesRegionChanged++,
                    e.t("MCSYNCSOP", ""),
                    e.t("MCSYNCS", ""),
                    (i = r)))
                : (i = r) && (e.s("MCAAMLH", n), e.t("MCAAMLH", i)),
              i || (i = ""),
              i
            );
          },
          processSyncOnPage: function(e) {
            var t, n, i, r;
            if ((t = e.ibs) && t instanceof Array && (n = t.length))
              for (i = 0; n > i; i++)
                (r = t[i]),
                  r.syncOnPage &&
                    this.checkFirstPartyCookie(r, "", "syncOnPage");
          },
          process: function(e) {
            var t,
              n,
              i,
              r,
              o,
              a = encodeURIComponent,
              s = !1;
            if ((t = e.ibs) && t instanceof Array && (n = t.length))
              for (s = !0, i = 0; n > i; i++)
                (r = t[i]),
                  (o = [
                    a("ibs"),
                    a(r.id || ""),
                    a(r.tag || ""),
                    x.encodeAndBuildRequest(r.url || [], ","),
                    a(r.ttl || ""),
                    "",
                    "",
                    r.fireURLSync ? "true" : "false"
                  ]),
                  r.syncOnPage ||
                    (this.canSetThirdPartyCookies
                      ? this.addMessage(o.join("|"))
                      : r.fireURLSync &&
                        this.checkFirstPartyCookie(r, o.join("|")));
            s && this.jsonProcessed.push(e);
          },
          checkFirstPartyCookie: function(t, n, i) {
            var r = "syncOnPage" === i,
              o = r ? "MCSYNCSOP" : "MCSYNCS";
            e.u();
            var a,
              s,
              c = e.r(o),
              u = !1,
              l = !1,
              d = Math.ceil(new Date().getTime() / ie.MILLIS_PER_DAY);
            c
              ? ((a = c.split("*")),
                (s = this.pruneSyncData(a, t.id, d)),
                (u = s.dataPresent),
                (l = s.dataValid),
                (u && l) || this.fireSync(r, t, n, a, o, d))
              : ((a = []), this.fireSync(r, t, n, a, o, d));
          },
          pruneSyncData: function(e, t, n) {
            var i,
              r,
              o,
              a = !1,
              s = !1;
            for (r = 0; r < e.length; r++)
              (i = e[r]),
                (o = parseInt(i.split("-")[1], 10)),
                i.match("^" + t + "-")
                  ? ((a = !0), o > n ? (s = !0) : (e.splice(r, 1), r--))
                  : n >= o && (e.splice(r, 1), r--);
            return { dataPresent: a, dataValid: s };
          },
          manageSyncsSize: function(e) {
            if (e.join("*").length > this.MAX_SYNCS_LENGTH)
              for (
                e.sort(function(e, t) {
                  return (
                    parseInt(e.split("-")[1], 10) -
                    parseInt(t.split("-")[1], 10)
                  );
                });
                e.join("*").length > this.MAX_SYNCS_LENGTH;

              )
                e.shift();
          },
          fireSync: function(t, n, i, r, o, a) {
            var s = this;
            if (t) {
              if ("img" === n.tag) {
                var c,
                  u,
                  l,
                  d,
                  f = n.url,
                  p = e.loadSSL ? "https:" : "http:";
                for (c = 0, u = f.length; u > c; c++) {
                  (l = f[c]), (d = /^\/\//.test(l));
                  var g = new Image();
                  g.addEventListener(
                    "load",
                    (function(t, n, i, r) {
                      return function() {
                        (s.onPagePixels[t] = null), e.u();
                        var a,
                          c = e.r(o),
                          u = [];
                        if (c) {
                          a = c.split("*");
                          var l, d, f;
                          for (l = 0, d = a.length; d > l; l++)
                            (f = a[l]), f.match("^" + n.id + "-") || u.push(f);
                        }
                        s.setSyncTrackingData(u, n, i, r);
                      };
                    })(this.onPagePixels.length, n, o, a)
                  ),
                    (g.src = (d ? p : "") + l),
                    this.onPagePixels.push(g);
                }
              }
            } else this.addMessage(i), this.setSyncTrackingData(r, n, o, a);
          },
          addMessage: function(t) {
            var n = encodeURIComponent,
              i = n(e.v ? "---destpub-debug---" : "---destpub---");
            this.messages.push((ie.POST_MESSAGE_ENABLED ? "" : i) + t);
          },
          setSyncTrackingData: function(t, n, i, r) {
            t.push(n.id + "-" + (r + Math.ceil(n.ttl / 60 / 24))),
              this.manageSyncsSize(t),
              e.t(i, t.join("*"));
          },
          sendMessages: function() {
            var e,
              t = this,
              n = "",
              i = encodeURIComponent;
            this.regionChanged &&
              ((n = i("---destpub-clear-dextp---")), (this.regionChanged = !1)),
              this.messages.length
                ? ie.POST_MESSAGE_ENABLED
                  ? ((e =
                      n +
                      i("---destpub-combined---") +
                      this.messages.join("%01")),
                    this.postMessage(e),
                    (this.messages = []),
                    (this.sendingMessages = !1))
                  : ((e = this.messages.shift()),
                    this.postMessage(n + e),
                    setTimeout(function() {
                      t.sendMessages();
                    }, this.messageSendingInterval))
                : (this.sendingMessages = !1);
          },
          postMessage: function(e) {
            ee.postMessage(e, this.url, this.iframe.contentWindow),
              this.messagesPosted.push(e);
          },
          receiveMessage: function(e) {
            var t,
              n = /^---destpub-to-parent---/;
            "string" == typeof e &&
              n.test(e) &&
              ((t = e.replace(n, "").split("|")),
              "canSetThirdPartyCookies" === t[0] &&
                ((this.canSetThirdPartyCookies = "true" === t[1]),
                (this.receivedThirdPartyCookiesNotification = !0),
                this.requestToProcess()),
              this.messagesReceived.push(e));
          },
          processIDCallData: function(i) {
            (null == this.url ||
              (i.subdomain && "nosubdomainreturned" === this.subdomain)) &&
              ("string" == typeof e.p && e.p.length
                ? (this.subdomain = e.p)
                : (this.subdomain = i.subdomain || ""),
              (this.url = this.getUrl())),
              i.ibs instanceof Array &&
                i.ibs.length &&
                (this.doAttachIframe = !0),
              this.readyToAttachIframe() &&
                (e.idSyncAttachIframeOnWindowLoad
                  ? (t.windowLoaded ||
                      "complete" === n.readyState ||
                      "loaded" === n.readyState) &&
                    this.attachIframe()
                  : this.attachIframeASAP()),
              "function" == typeof e.idSyncIDCallResult
                ? e.idSyncIDCallResult(i)
                : this.requestToProcess(i),
              "function" == typeof e.idSyncAfterIDCallResult &&
                e.idSyncAfterIDCallResult(i);
          },
          canMakeSyncIDCall: function(t, n) {
            return e.w || !t || n - t > ie.DAYS_BETWEEN_SYNC_ID_CALLS;
          },
          attachIframeASAP: function() {
            function e() {
              t.startedAttachingIframe ||
                (n.body ? t.attachIframe() : setTimeout(e, 30));
            }
            var t = this;
            e();
          }
        };
      },
      oe = {
        audienceManagerServer: {},
        audienceManagerServerSecure: {},
        cookieDomain: {},
        cookieLifetime: {},
        cookieName: {},
        doesOptInApply: {},
        disableThirdPartyCalls: {},
        discardTrackingServerECID: {},
        idSyncAfterIDCallResult: {},
        idSyncAttachIframeOnWindowLoad: {},
        idSyncContainerID: {},
        idSyncDisable3rdPartySyncing: {},
        disableThirdPartyCookies: {},
        idSyncDisableSyncs: {},
        disableIdSyncs: {},
        idSyncIDCallResult: {},
        idSyncSSLUseAkamai: {},
        isCoopSafe: {},
        isIabContext: {},
        isOptInStorageEnabled: {},
        loadSSL: {},
        loadTimeout: {},
        marketingCloudServer: {},
        marketingCloudServerSecure: {},
        optInCookieDomain: {},
        optInStorageExpiry: {},
        overwriteCrossDomainMCIDAndAID: {},
        preOptInApprovals: {},
        previousPermissions: {},
        resetBeforeVersion: {},
        sdidParamExpiry: {},
        serverState: {},
        sessionCookieName: {},
        secureCookie: {},
        takeTimeoutMetrics: {},
        trackingServer: {},
        trackingServerSecure: {},
        whitelistIframeDomains: {},
        whitelistParentDomain: {}
      },
      ae = {
        getConfigNames: function() {
          return Object.keys(oe);
        },
        getConfigs: function() {
          return oe;
        },
        normalizeConfig: function(e) {
          return "function" != typeof e ? e : e();
        }
      },
      se = function(e) {
        var t = {};
        return (
          (e.on = function(e, n, i) {
            if (!n || "function" != typeof n)
              throw Error("[ON] Callback should be a function.");
            t.hasOwnProperty(e) || (t[e] = []);
            var r = t[e].push({ callback: n, context: i }) - 1;
            return function() {
              t[e].splice(r, 1), t[e].length || delete t[e];
            };
          }),
          (e.off = function(e, n) {
            t.hasOwnProperty(e) &&
              (t[e] = t[e].filter(function(e) {
                if (e.callback !== n) return e;
              }));
          }),
          (e.publish = function(e) {
            if (t.hasOwnProperty(e)) {
              var n = [].slice.call(arguments, 1);
              t[e].slice(0).forEach(function(e) {
                e.callback.apply(e.context, n);
              });
            }
          }),
          e.publish
        );
      },
      ce = { PENDING: "pending", CHANGED: "changed", COMPLETE: "complete" },
      ue = {
        AAM: "aam",
        ADCLOUD: "adcloud",
        ANALYTICS: "aa",
        CAMPAIGN: "campaign",
        ECID: "ecid",
        LIVEFYRE: "livefyre",
        TARGET: "target",
        VIDEO_ANALYTICS: "videoaa"
      },
      le = ((C = {}), t(C, ue.AAM, 565), t(C, ue.ECID, 565), C),
      de = ((I = {}), t(I, ue.AAM, [1, 2, 5]), t(I, ue.ECID, [1, 2, 5]), I),
      fe = (function(e) {
        return Object.keys(e).map(function(t) {
          return e[t];
        });
      })(ue),
      pe = function() {
        var e = {};
        return (
          (e.callbacks = Object.create(null)),
          (e.add = function(t, n) {
            if (!u(n))
              throw Error(
                "[callbackRegistryFactory] Make sure callback is a function or an array of functions."
              );
            e.callbacks[t] = e.callbacks[t] || [];
            var i = e.callbacks[t].push(n) - 1;
            return function() {
              e.callbacks[t].splice(i, 1);
            };
          }),
          (e.execute = function(t, n) {
            if (e.callbacks[t]) {
              (n = void 0 === n ? [] : n), (n = n instanceof Array ? n : [n]);
              try {
                for (; e.callbacks[t].length; ) {
                  var i = e.callbacks[t].shift();
                  "function" == typeof i
                    ? i.apply(null, n)
                    : i instanceof Array && i[1].apply(i[0], n);
                }
                delete e.callbacks[t];
              } catch (e) {}
            }
          }),
          (e.executeAll = function(t, n) {
            (n || (t && !c(t))) &&
              Object.keys(e.callbacks).forEach(function(n) {
                var i = void 0 !== t[n] ? t[n] : "";
                e.execute(n, i);
              }, e);
          }),
          (e.hasCallbacks = function() {
            return !!Object.keys(e.callbacks).length;
          }),
          e
        );
      },
      ge = function() {},
      he = function(e) {
        var t = window,
          n = t.console;
        return !!n && "function" == typeof n[e];
      },
      me = function(e, t, n) {
        return n()
          ? function() {
              if (he(e)) {
                for (var n = arguments.length, i = Array(n), r = 0; n > r; r++)
                  i[r] = arguments[r];
                console[e].apply(console, [t].concat(i));
              }
            }
          : ge;
      },
      ve = l,
      Ce = new ve("[ADOBE OPT-IN]"),
      Ie = function(t, n) {
        return e(t) === n;
      },
      Se = function(e, t) {
        return e instanceof Array ? e : Ie(e, "string") ? [e] : t || [];
      },
      ye = function(e) {
        var t = Object.keys(e);
        return (
          !!t.length &&
          t.every(function(t) {
            return !0 === e[t];
          })
        );
      },
      Ae = function(e) {
        return (
          !(!e || De(e)) &&
          Se(e).every(function(e) {
            return fe.indexOf(e) > -1;
          })
        );
      },
      be = function(e, t) {
        return e.reduce(function(e, n) {
          return (e[n] = t), e;
        }, {});
      },
      Oe = function(e) {
        return JSON.parse(JSON.stringify(e));
      },
      De = function(e) {
        return (
          "[object Array]" === Object.prototype.toString.call(e) && !e.length
        );
      },
      Me = function(e) {
        if (ke(e)) return e;
        try {
          return JSON.parse(e);
        } catch (e) {
          return {};
        }
      },
      Te = function(e) {
        return void 0 === e || (ke(e) ? Ae(Object.keys(e)) : Ee(e));
      },
      Ee = function(e) {
        try {
          var t = JSON.parse(e);
          return !!e && Ie(e, "string") && Ae(Object.keys(t));
        } catch (e) {
          return !1;
        }
      },
      ke = function(e) {
        return null !== e && Ie(e, "object") && !1 === Array.isArray(e);
      },
      _e = function() {},
      Pe = function(e) {
        return Ie(e, "function") ? e() : e;
      },
      Le = function(e, t) {
        Te(e) || Ce.error("".concat(t));
      },
      Re = function(e) {
        return Object.keys(e).map(function(t) {
          return e[t];
        });
      },
      Ne = function(e) {
        return Re(e).filter(function(e, t, n) {
          return n.indexOf(e) === t;
        });
      },
      we = function(e) {
        return function() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            n = t.command,
            i = t.params,
            r = void 0 === i ? {} : i,
            o = t.callback,
            a = void 0 === o ? _e : o;
          if (!n || -1 === n.indexOf("."))
            throw Error("[OptIn.execute] Please provide a valid command.");
          try {
            var s = n.split("."),
              c = e[s[0]],
              u = s[1];
            if (!c || "function" != typeof c[u])
              throw Error("Make sure the plugin and API name exist.");
            var l = Object.assign(r, { callback: a });
            c[u].call(c, l);
          } catch (e) {
            Ce.error("[execute] Something went wrong: " + e.message);
          }
        };
      };
    (f.prototype = Object.create(Error.prototype)),
      (f.prototype.constructor = f);
    var je = "fetchPermissions",
      xe = "[OptIn#registerPlugin] Plugin is invalid.";
    (p.Categories = ue), (p.TimeoutError = f);
    var Ve = Object.freeze({ OptIn: p, IabPlugin: m }),
      He = function(e, t) {
        e.publishDestinations = function(n) {
          var i = arguments[1],
            r = arguments[2];
          try {
            r = "function" == typeof r ? r : n.callback;
          } catch (e) {
            r = function() {};
          }
          var o = t;
          if (!o.readyToAttachIframePreliminary())
            return void r({
              error:
                "The destination publishing iframe is disabled in the Visitor library."
            });
          if ("string" == typeof n) {
            if (!n.length)
              return void r({ error: "subdomain is not a populated string." });
            if (!(i instanceof Array && i.length))
              return void r({ error: "messages is not a populated array." });
            var a = !1;
            if (
              (i.forEach(function(e) {
                "string" == typeof e && e.length && (o.addMessage(e), (a = !0));
              }),
              !a)
            )
              return void r({
                error: "None of the messages are populated strings."
              });
          } else {
            if (!x.isObject(n))
              return void r({ error: "Invalid parameters passed." });
            var s = n;
            if ("string" != typeof (n = s.subdomain) || !n.length)
              return void r({
                error: "config.subdomain is not a populated string."
              });
            var c = s.urlDestinations;
            if (!(c instanceof Array && c.length))
              return void r({
                error: "config.urlDestinations is not a populated array."
              });
            var u = [];
            c.forEach(function(e) {
              x.isObject(e) &&
                (e.hideReferrer
                  ? e.message && o.addMessage(e.message)
                  : u.push(e));
            }),
              (function e() {
                u.length &&
                  setTimeout(function() {
                    var t = new Image(),
                      n = u.shift();
                    (t.src = n.url), o.onPageDestinationsFired.push(n), e();
                  }, 100);
              })();
          }
          o.iframe
            ? (r({
                message:
                  "The destination publishing iframe is already attached and loaded."
              }),
              o.requestToProcess())
            : !e.subdomain && e.r("MCMID")
            ? ((o.subdomain = n),
              (o.doAttachIframe = !0),
              (o.url = o.getUrl()),
              o.readyToAttachIframe()
                ? (o.iframeLoadedCallbacks.push(function(e) {
                    r({
                      message:
                        "Attempted to attach and load the destination publishing iframe through this API call. Result: " +
                        (e.message || "no result")
                    });
                  }),
                  o.attachIframe())
                : r({
                    error:
                      "Encountered a problem in attempting to attach and load the destination publishing iframe through this API call."
                  }))
            : o.iframeLoadedCallbacks.push(function(e) {
                r({
                  message:
                    "Attempted to attach and load the destination publishing iframe through normal Visitor API processing. Result: " +
                    (e.message || "no result")
                });
              });
        };
      },
      Ue = function e(t) {
        function n(e, t) {
          return (e >>> t) | (e << (32 - t));
        }
        for (
          var i,
            r,
            o = Math.pow,
            a = o(2, 32),
            s = "",
            c = [],
            u = 8 * t.length,
            l = (e.h = e.h || []),
            d = (e.k = e.k || []),
            f = d.length,
            p = {},
            g = 2;
          64 > f;
          g++
        )
          if (!p[g]) {
            for (i = 0; 313 > i; i += g) p[i] = g;
            (l[f] = (o(g, 0.5) * a) | 0), (d[f++] = (o(g, 1 / 3) * a) | 0);
          }
        for (t += ""; (t.length % 64) - 56; ) t += "\0";
        for (i = 0; i < t.length; i++) {
          if ((r = t.charCodeAt(i)) >> 8) return;
          c[i >> 2] |= r << (((3 - i) % 4) * 8);
        }
        for (
          c[c.length] = (u / a) | 0, c[c.length] = u, r = 0;
          r < c.length;

        ) {
          var h = c.slice(r, (r += 16)),
            m = l;
          for (l = l.slice(0, 8), i = 0; 64 > i; i++) {
            var v = h[i - 15],
              C = h[i - 2],
              I = l[0],
              S = l[4],
              y =
                l[7] +
                (n(S, 6) ^ n(S, 11) ^ n(S, 25)) +
                ((S & l[5]) ^ (~S & l[6])) +
                d[i] +
                (h[i] =
                  16 > i
                    ? h[i]
                    : (h[i - 16] +
                        (n(v, 7) ^ n(v, 18) ^ (v >>> 3)) +
                        h[i - 7] +
                        (n(C, 17) ^ n(C, 19) ^ (C >>> 10))) |
                      0);
            (l = [
              (y +
                ((n(I, 2) ^ n(I, 13) ^ n(I, 22)) +
                  ((I & l[1]) ^ (I & l[2]) ^ (l[1] & l[2])))) |
                0
            ].concat(l)),
              (l[4] = (l[4] + y) | 0);
          }
          for (i = 0; 8 > i; i++) l[i] = (l[i] + m[i]) | 0;
        }
        for (i = 0; 8 > i; i++)
          for (r = 3; r + 1; r--) {
            var A = (l[i] >> (8 * r)) & 255;
            s += (16 > A ? 0 : "") + A.toString(16);
          }
        return s;
      },
      Be = function(e, t) {
        return (
          ("SHA-256" !== t &&
            "SHA256" !== t &&
            "sha256" !== t &&
            "sha-256" !== t) ||
            (e = Ue(e)),
          e
        );
      },
      Ge = function(e) {
        return (e + "").trim().toLowerCase();
      },
      Fe = Ve.OptIn;
    x.defineGlobalNamespace(), (window.adobe.OptInCategories = Fe.Categories);
    var We = function(t, n, i) {
      function r(e) {
        var t = e;
        return function(e) {
          var n = e || S.location.href;
          try {
            var i = g.x(n, t);
            if (i) return N.parsePipeDelimetedKeyValues(i);
          } catch (e) {}
        };
      }
      function o(e) {
        function t(e, t, n) {
          e &&
            e.match(ie.VALID_VISITOR_ID_REGEX) &&
            (n === b && (I = !0), t(e));
        }
        t(e[b], g.setMarketingCloudVisitorID, b),
          g.s(E, -1),
          t(e[M], g.setAnalyticsVisitorID);
      }
      function a(e) {
        (e = e || {}),
          (g.y = e.supplementalDataIDCurrent || ""),
          (g.z = e.supplementalDataIDCurrentConsumed || {}),
          (g.B = e.supplementalDataIDLast || ""),
          (g.C = e.supplementalDataIDLastConsumed || {});
      }
      function s(e) {
        function t(e, t, n) {
          return (
            (n = n ? (n += "|") : n), (n += e + "=" + encodeURIComponent(t))
          );
        }
        function n(e, n) {
          var i = n[0],
            r = n[1];
          return null != r && r !== _ && (e = t(i, r, e)), e;
        }
        var i = e.reduce(n, "");
        return (function(e) {
          var t = N.getTimestampInSeconds();
          return (e = e ? (e += "|") : e), (e += "TS=" + t);
        })(i);
      }
      function c(e) {
        var t = e.minutesToLive,
          n = "";
        return (
          (g.idSyncDisableSyncs || g.disableIdSyncs) &&
            (n = n || "Error: id syncs have been disabled"),
          ("string" == typeof e.dpid && e.dpid.length) ||
            (n = n || "Error: config.dpid is empty"),
          ("string" == typeof e.url && e.url.length) ||
            (n = n || "Error: config.url is empty"),
          void 0 === t
            ? (t = 20160)
            : ((t = parseInt(t, 10)),
              (isNaN(t) || 0 >= t) &&
                (n =
                  n ||
                  "Error: config.minutesToLive needs to be a positive number")),
          { error: n, ttl: t }
        );
      }
      function u() {
        return !(!g.configs.doesOptInApply || (h.optIn.isComplete && l()));
      }
      function l() {
        return g.configs.isIabContext
          ? h.optIn.isApproved(h.optIn.Categories.ECID) && C
          : h.optIn.isApproved(h.optIn.Categories.ECID);
      }
      function d(e, t) {
        if (((C = !0), e)) throw Error("[IAB plugin] : " + e);
        t.gdprApplies && (m = t.consentString), g.init(), p();
      }
      function f() {
        h.optIn.isApproved(h.optIn.Categories.ECID) &&
          (g.configs.isIabContext
            ? h.optIn.execute({
                command: "iabPlugin.fetchConsentData",
                callback: d
              })
            : (g.init(), p()));
      }
      function p() {
        h.optIn.off("complete", f);
      }
      if (
        !i ||
        i
          .split("")
          .reverse()
          .join("") !== t
      )
        throw Error("Please use `Visitor.getInstance` to instantiate Visitor.");
      var g = this,
        h = window.adobe,
        m = "",
        C = !1,
        I = !1;
      g.version = "4.4.0";
      var S = v,
        y = S.Visitor;
      (y.version = g.version),
        (y.AuthState = k.AUTH_STATE),
        (y.OptOut = k.OPT_OUT),
        S.s_c_in || ((S.s_c_il = []), (S.s_c_in = 0)),
        (g.i = "Visitor"),
        (g.j = S.s_c_il),
        (g.l = S.s_c_in),
        (g.j[g.l] = g),
        S.s_c_in++,
        (g.m = "regular"),
        (g.o = { requests: [] }),
        (g.marketingCloudOrgID = t),
        (g.cookieName = "AMCV_" + t),
        (g.sessionCookieName = "AMCVS_" + t),
        (g.cookieDomain = $()),
        (g.loadSSL = S.location.protocol.toLowerCase().indexOf("https") >= 0),
        (g.loadTimeout = 3e4),
        (g.CORSErrors = []),
        (g.marketingCloudServer = g.audienceManagerServer = "dpm.demdex.net"),
        (g.sdidParamExpiry = 30);
      var A = null,
        b = "MCMID",
        O = "MCIDTS",
        D = "A",
        M = "MCAID",
        T = "AAM",
        E = "MCAAMB",
        _ = "NONE",
        P = function(e) {
          return !Object.prototype[e];
        },
        L = ne(g);
      (g.FIELDS = k.FIELDS),
        (g.cookieRead = function(e) {
          return z.get(e);
        }),
        (g.cookieWrite = function(e, t, n) {
          var i = g.cookieLifetime ? ("" + g.cookieLifetime).toUpperCase() : "",
            r = !1;
          return (
            g.configs &&
              g.configs.secureCookie &&
              "https:" === location.protocol &&
              (r = !0),
            z.set(e, "" + t, {
              expires: n,
              domain: g.cookieDomain,
              cookieLifetime: i,
              secure: r
            })
          );
        }),
        (g.resetState = function(e) {
          e ? g.D(e) : a();
        }),
        (g.F = !1),
        (g.G = !1),
        (g.isAllowed = function() {
          return (
            g.F ||
              ((g.F = !0),
              (g.cookieRead(g.cookieName) ||
                g.cookieWrite(g.cookieName, "T", 1)) &&
                (g.G = !0)),
            "T" === g.cookieRead(g.cookieName) &&
              g.H.removeCookie(g.cookieName),
            g.G
          );
        }),
        (g.setMarketingCloudVisitorID = function(e) {
          g.I(e);
        }),
        (g.J = !1),
        (g.getMarketingCloudVisitorID = function(e, t) {
          g.marketingCloudServer &&
            0 > g.marketingCloudServer.indexOf(".demdex.net") &&
            (g.J = !0);
          var n = g.K("_setMarketingCloudFields"),
            i = n.url;
          return g.L(b, i, e, t, n);
        }),
        (g.getVisitorValues = function(e, t) {
          var n = {
              MCMID: {
                fn: g.getMarketingCloudVisitorID,
                args: [!0],
                context: g
              },
              MCOPTOUT: { fn: g.isOptedOut, args: [void 0, !0], context: g },
              MCAID: { fn: g.getAnalyticsVisitorID, args: [!0], context: g },
              MCAAMLH: {
                fn: g.getAudienceManagerLocationHint,
                args: [!0],
                context: g
              },
              MCAAMB: { fn: g.getAudienceManagerBlob, args: [!0], context: g }
            },
            i = t && t.length ? x.pluck(n, t) : n;
          K(i, e);
        }),
        (g.M = {}),
        (g.N = !1),
        (g.O = ""),
        (g.setCustomerIDs = function(t, n) {
          function i() {
            g.N = !1;
          }
          if (!g.isOptedOut() && t) {
            if (!x.isObject(t) || x.isObjectEmpty(t)) return !1;
            g.u();
            var r, o, a;
            for (r in t)
              if (
                P(r) &&
                ((o = t[r]),
                (n = o.hasOwnProperty("hashType") ? o.hashType : n),
                o)
              )
                if ("object" === e(o)) {
                  var s = {};
                  if (o.id) {
                    if (n) {
                      if (!(a = Be(Ge(o.id), n))) return;
                      (o.id = a), (s.hashType = n);
                    }
                    s.id = o.id;
                  }
                  void 0 != o.authState && (s.authState = o.authState),
                    (g.M[r] = s);
                } else if (n) {
                  if (!(a = Be(Ge(o), n))) return;
                  g.M[r] = { id: a, hashType: n };
                } else g.M[r] = { id: o };
            var c = g.getCustomerIDs(),
              u = g.r("MCCIDH"),
              l = "";
            u || (u = 0);
            for (r in c)
              P(r) &&
                ((o = c[r]),
                (l +=
                  (l ? "|" : "") +
                  r +
                  "|" +
                  (o.id ? o.id : "") +
                  (o.authState ? o.authState : "")));
            (g.O = g.P(l) + ""), g.O !== u && ((g.N = !0), g.Q(i));
          }
        }),
        (g.getCustomerIDs = function() {
          g.u();
          var e,
            t,
            n = {};
          for (e in g.M)
            P(e) &&
              ((t = g.M[e]),
              n[e] || (n[e] = {}),
              t.id && (n[e].id = t.id),
              void 0 != t.authState
                ? (n[e].authState = t.authState)
                : (n[e].authState = y.AuthState.UNKNOWN),
              t.hashType && (n[e].hashType = t.hashType));
          return n;
        }),
        (g.setAnalyticsVisitorID = function(e) {
          g.R(e);
        }),
        (g.getAnalyticsVisitorID = function(e, t, n) {
          if (!N.isTrackingServerPopulated() && !n) return g.S(e, [""]), "";
          var i = "";
          if (
            (n ||
              (i = g.getMarketingCloudVisitorID(function(t) {
                g.getAnalyticsVisitorID(e, !0);
              })),
            i || n)
          ) {
            var r = n ? g.marketingCloudServer : g.trackingServer,
              o = "";
            g.loadSSL &&
              (n
                ? g.marketingCloudServerSecure &&
                  (r = g.marketingCloudServerSecure)
                : g.trackingServerSecure && (r = g.trackingServerSecure));
            var a = {};
            if (r) {
              var s = "http" + (g.loadSSL ? "s" : "") + "://" + r + "/id",
                c =
                  "d_visid_ver=" +
                  g.version +
                  "&mcorgid=" +
                  encodeURIComponent(g.marketingCloudOrgID) +
                  (i ? "&mid=" + encodeURIComponent(i) : "") +
                  (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies
                    ? "&d_coppa=true"
                    : ""),
                u = [
                  "s_c_il",
                  g.l,
                  "_set" + (n ? "MarketingCloud" : "Analytics") + "Fields"
                ];
              (o =
                s +
                "?" +
                c +
                "&callback=s_c_il%5B" +
                g.l +
                "%5D._set" +
                (n ? "MarketingCloud" : "Analytics") +
                "Fields"),
                (a.corsUrl = s + "?" + c),
                (a.callback = u);
            }
            return (a.url = o), g.L(n ? b : M, o, e, t, a);
          }
          return "";
        }),
        (g.getAudienceManagerLocationHint = function(e, t) {
          if (
            g.getMarketingCloudVisitorID(function(t) {
              g.getAudienceManagerLocationHint(e, !0);
            })
          ) {
            var n = g.r(M);
            if (
              (!n &&
                N.isTrackingServerPopulated() &&
                (n = g.getAnalyticsVisitorID(function(t) {
                  g.getAudienceManagerLocationHint(e, !0);
                })),
              n || !N.isTrackingServerPopulated())
            ) {
              var i = g.K(),
                r = i.url;
              return g.L("MCAAMLH", r, e, t, i);
            }
          }
          return "";
        }),
        (g.getLocationHint = g.getAudienceManagerLocationHint),
        (g.getAudienceManagerBlob = function(e, t) {
          if (
            g.getMarketingCloudVisitorID(function(t) {
              g.getAudienceManagerBlob(e, !0);
            })
          ) {
            var n = g.r(M);
            if (
              (!n &&
                N.isTrackingServerPopulated() &&
                (n = g.getAnalyticsVisitorID(function(t) {
                  g.getAudienceManagerBlob(e, !0);
                })),
              n || !N.isTrackingServerPopulated())
            ) {
              var i = g.K(),
                r = i.url;
              return g.N && g.s(E, -1), g.L(E, r, e, t, i);
            }
          }
          return "";
        }),
        (g.y = ""),
        (g.z = {}),
        (g.B = ""),
        (g.C = {}),
        (g.getSupplementalDataID = function(e, t) {
          g.y || t || (g.y = g.f(1));
          var n = g.y;
          return (
            g.B && !g.C[e]
              ? ((n = g.B), (g.C[e] = !0))
              : n &&
                (g.z[e] &&
                  ((g.B = g.y),
                  (g.C = g.z),
                  (g.y = n = t ? "" : g.f(1)),
                  (g.z = {})),
                n && (g.z[e] = !0)),
            n
          );
        });
      var R = !1;
      (g.T = null),
        (g.getOptOut = function(e, t) {
          var n = g.K("_setMarketingCloudFields"),
            i = n.url;
          if (l()) return g.L("MCOPTOUT", i, e, t, n);
          if ((g.U("liberatedOptOut", e), null !== g.T))
            return g.V("liberatedOptOut", [g.T]), (R = !1), g.T;
          if (R) return null;
          R = !0;
          var r = "liberatedGetOptOut";
          return (
            (n.corsUrl = n.corsUrl.replace(
              /dpm\.demdex\.net\/id\?/,
              "dpm.demdex.net/optOutStatus?"
            )),
            (n.callback = [r]),
            (v[r] = function(e) {
              if (e === Object(e)) {
                var t,
                  n,
                  i = x.parseOptOut(e, t, _);
                (t = i.optOut),
                  (n = 1e3 * i.d_ottl),
                  (g.T = t),
                  setTimeout(function() {
                    g.T = null;
                  }, n);
              }
              g.V("liberatedOptOut", [t]), (R = !1);
            }),
            L.fireCORS(n),
            null
          );
        }),
        (g.isOptedOut = function(e, t, n) {
          t || (t = y.OptOut.GLOBAL);
          var i = g.getOptOut(function(n) {
            var i = n === y.OptOut.GLOBAL || n.indexOf(t) >= 0;
            g.S(e, [i]);
          }, n);
          return i ? i === y.OptOut.GLOBAL || i.indexOf(t) >= 0 : null;
        }),
        (g.W = null),
        (g.X = null),
        (g.P = function(e) {
          var t,
            n,
            i = 0;
          if (e)
            for (t = 0; t < e.length; t++)
              (n = e.charCodeAt(t)), (i = (i << 5) - i + n), (i &= i);
          return i;
        }),
        (g.f = te),
        (g.Y = function() {
          var e = g.f(0);
          return (j.isClientSideMarketingCloudVisitorID = !0), e;
        }),
        (g.Z = null),
        (g.S = function(e, t) {
          try {
            "function" == typeof e ? e.apply(S, t) : e[1].apply(e[0], t);
          } catch (e) {}
        }),
        (g.U = function(e, t) {
          t &&
            (null == g.Z && (g.Z = {}),
            void 0 == g.Z[e] && (g.Z[e] = []),
            g.Z[e].push(t));
        }),
        (g.V = function(e, t) {
          if (null != g.Z) {
            var n = g.Z[e];
            if (n) for (; n.length > 0; ) g.S(n.shift(), t);
          }
        }),
        (g.$ = function(e, t, n, i) {
          var r = encodeURIComponent(t) + "=" + encodeURIComponent(n),
            o = N.parseHash(e),
            a = N.hashlessUrl(e);
          if (-1 === a.indexOf("?")) return a + "?" + r + o;
          var s = a.split("?"),
            c = s[0] + "?",
            u = s[1];
          return c + N.addQueryParamAtLocation(u, r, i) + o;
        }),
        (g.x = function(e, t) {
          var n = RegExp("[\\?&#]" + t + "=([^&#]*)"),
            i = n.exec(e);
          if (i && i.length) return decodeURIComponent(i[1]);
        }),
        (g._ = r(ie.ADOBE_MC)),
        (g.aa = r(ie.ADOBE_MC_SDID)),
        (g.ba = function(e) {
          var n = g.aa(e),
            i = 1e9;
          n && n.TS && (i = N.getTimestampInSeconds() - n.TS),
            n &&
              n.SDID &&
              n.MCORGID === t &&
              i < g.sdidParamExpiry &&
              ((g.y = n.SDID), (g.z.SDID_URL_PARAM = !0));
        }),
        (g.ca = function() {
          var e = g._();
          if (e && e.TS) {
            var n = N.getTimestampInSeconds(),
              i = n - e.TS;
            if (Math.floor(i / 60) > ie.ADOBE_MC_TTL_IN_MIN || e.MCORGID !== t)
              return;
            o(e);
          }
        }),
        (g.D = function(e) {
          if (e)
            try {
              if (
                ((e = (function(e) {
                  return N.isObject(e) ? e : JSON.parse(e);
                })(e)),
                e[g.marketingCloudOrgID])
              ) {
                var t = e[g.marketingCloudOrgID];
                !(function(e) {
                  N.isObject(e) && g.setCustomerIDs(e);
                })(t.customerIDs),
                  a(t.sdid);
              }
            } catch (e) {
              throw Error("`serverState` has an invalid format.");
            }
        }),
        (g.da = null),
        (g.ea = function(e, t, n, i) {
          (t = g.$(t, "d_fieldgroup", e, 1)),
            (i.url = g.$(i.url, "d_fieldgroup", e, 1)),
            (i.corsUrl = g.$(i.corsUrl, "d_fieldgroup", e, 1)),
            (j.fieldGroupObj[e] = !0),
            i === Object(i) &&
              i.corsUrl &&
              "XMLHttpRequest" === L.corsMetadata.corsType &&
              L.fireCORS(i, n, e);
        }),
        (g.fa = function(e) {
          null != g.da && g.da[e] && (clearTimeout(g.da[e]), (g.da[e] = 0));
        }),
        (g.ga = 0),
        (g.ha = function() {
          if (!g.ga) {
            var e = g.version;
            g.audienceManagerServer && (e += "|" + g.audienceManagerServer),
              g.audienceManagerServerSecure &&
                (e += "|" + g.audienceManagerServerSecure),
              (g.ga = g.P(e));
          }
          return g.ga;
        }),
        (g.ia = !1),
        (g.u = function() {
          if (!g.ia) {
            g.ia = !0;
            var e,
              t,
              n,
              i,
              r,
              o,
              a = g.ha(),
              s = !1,
              c = g.cookieRead(g.cookieName),
              u = new Date();
            if (
              (c ||
                I ||
                g.discardTrackingServerECID ||
                (c = g.cookieRead(ie.FIRST_PARTY_SERVER_COOKIE)),
              null == g.W && (g.W = {}),
              c && "T" !== c)
            )
              for (
                c = c.split("|"),
                  c[0].match(/^[\-0-9]+$/) &&
                    (parseInt(c[0], 10) !== a && (s = !0), c.shift()),
                  c.length % 2 == 1 && c.pop(),
                  e = 0;
                e < c.length;
                e += 2
              )
                (t = c[e].split("-")),
                  (n = t[0]),
                  (i = c[e + 1]),
                  t.length > 1
                    ? ((r = parseInt(t[1], 10)), (o = t[1].indexOf("s") > 0))
                    : ((r = 0), (o = !1)),
                  s &&
                    ("MCCIDH" === n && (i = ""),
                    r > 0 && (r = u.getTime() / 1e3 - 60)),
                  n &&
                    i &&
                    (g.t(n, i, 1),
                    r > 0 &&
                      ((g.W["expire" + n] = r + (o ? "s" : "")),
                      (u.getTime() >= 1e3 * r ||
                        (o && !g.cookieRead(g.sessionCookieName))) &&
                        (g.X || (g.X = {}), (g.X[n] = !0))));
            !g.r(M) &&
              N.isTrackingServerPopulated() &&
              (c = g.cookieRead("s_vi")) &&
              ((c = c.split("|")),
              c.length > 1 &&
                c[0].indexOf("v1") >= 0 &&
                ((i = c[1]),
                (e = i.indexOf("[")),
                e >= 0 && (i = i.substring(0, e)),
                i && i.match(ie.VALID_VISITOR_ID_REGEX) && g.t(M, i)));
          }
        }),
        (g.ja = function(e) {
          var t = "vVersion|" + g.version,
            n = e ? g.ka(e) : null;
          return (
            n
              ? Z.areVersionsDifferent(n, g.version) &&
                (e = e.replace(ie.VERSION_REGEX, t))
              : (e += (e ? "|" : "") + t),
            e
          );
        }),
        (g.la = function() {
          var e,
            t,
            n = g.ha();
          for (e in g.W)
            P(e) &&
              g.W[e] &&
              "expire" !== e.substring(0, 6) &&
              ((t = g.W[e]),
              (n +=
                (n ? "|" : "") +
                e +
                (g.W["expire" + e] ? "-" + g.W["expire" + e] : "") +
                "|" +
                t));
          (n = g.ja(n)), g.cookieWrite(g.cookieName, n, 1);
        }),
        (g.r = function(e, t) {
          return null == g.W || (!t && g.X && g.X[e]) ? null : g.W[e];
        }),
        (g.t = function(e, t, n) {
          null == g.W && (g.W = {}), (g.W[e] = t), n || g.la();
        }),
        (g.ma = function(e, t) {
          var n = g.r(e, t);
          return n ? n.split("*") : null;
        }),
        (g.na = function(e, t, n) {
          g.t(e, t ? t.join("*") : "", n);
        }),
        (g.oa = function(e, t) {
          var n = g.ma(e, t);
          if (n) {
            var i,
              r = {};
            for (i = 0; i < n.length; i += 2) r[n[i]] = n[i + 1];
            return r;
          }
          return null;
        }),
        (g.pa = function(e, t, n) {
          var i,
            r = null;
          if (t) {
            r = [];
            for (i in t) P(i) && (r.push(i), r.push(t[i]));
          }
          g.na(e, r, n);
        }),
        (g.s = function(e, t, n) {
          var i = new Date();
          i.setTime(i.getTime() + 1e3 * t),
            null == g.W && (g.W = {}),
            (g.W["expire" + e] =
              Math.floor(i.getTime() / 1e3) + (n ? "s" : "")),
            0 > t ? (g.X || (g.X = {}), (g.X[e] = !0)) : g.X && (g.X[e] = !1),
            n &&
              (g.cookieRead(g.sessionCookieName) ||
                g.cookieWrite(g.sessionCookieName, "1"));
        }),
        (g.qa = function(t) {
          return (
            t &&
              ("object" === e(t) &&
                (t = t.d_mid
                  ? t.d_mid
                  : t.visitorID
                  ? t.visitorID
                  : t.id
                  ? t.id
                  : t.uuid
                  ? t.uuid
                  : "" + t),
              t && "NOTARGET" === (t = t.toUpperCase()) && (t = _),
              (t && (t === _ || t.match(ie.VALID_VISITOR_ID_REGEX))) ||
                (t = "")),
            t
          );
        }),
        (g.ra = function(t, n) {
          if (
            (g.fa(t),
            null != g.n && (g.n[t] = !1),
            j.fieldGroupObj[t] && j.setState(t, !1),
            "MC" === t)
          ) {
            !0 !== j.isClientSideMarketingCloudVisitorID &&
              (j.isClientSideMarketingCloudVisitorID = !1);
            var i = g.r(b);
            if (!i || g.overwriteCrossDomainMCIDAndAID) {
              if (!(i = "object" === e(n) && n.mid ? n.mid : g.qa(n))) {
                if (g.J && !g.tried1stPartyMarketingCloudServer)
                  return (
                    (g.tried1stPartyMarketingCloudServer = !0),
                    void g.getAnalyticsVisitorID(null, !1, !0)
                  );
                i = g.Y();
              }
              g.t(b, i);
            }
            (i && i !== _) || (i = ""),
              "object" === e(n) &&
                ((n.d_region || n.dcs_region || n.d_blob || n.blob) &&
                  g.ra(T, n),
                g.J && n.mid && g.ra(D, { id: n.id })),
              g.V(b, [i]);
          }
          if (t === T && "object" === e(n)) {
            var r = 604800;
            void 0 != n.id_sync_ttl &&
              n.id_sync_ttl &&
              (r = parseInt(n.id_sync_ttl, 10));
            var o = w.getRegionAndCheckIfChanged(n, r);
            g.V("MCAAMLH", [o]);
            var a = g.r(E);
            (n.d_blob || n.blob) &&
              ((a = n.d_blob), a || (a = n.blob), g.s(E, r), g.t(E, a)),
              a || (a = ""),
              g.V(E, [a]),
              !n.error_msg && g.O && g.t("MCCIDH", g.O);
          }
          if (t === D) {
            var s = g.r(M);
            (s && !g.overwriteCrossDomainMCIDAndAID) ||
              ((s = g.qa(n)), s ? s !== _ && g.s(E, -1) : (s = _), g.t(M, s)),
              (s && s !== _) || (s = ""),
              g.V(M, [s]);
          }
          if (g.idSyncDisableSyncs || g.disableIdSyncs)
            w.idCallNotProcesssed = !0;
          else {
            w.idCallNotProcesssed = !1;
            var c = {};
            (c.ibs = n.ibs),
              (c.subdomain = n.subdomain),
              w.processIDCallData(c);
          }
          if (n === Object(n)) {
            var u, d;
            l() && g.isAllowed() && (u = g.r("MCOPTOUT"));
            var f = x.parseOptOut(n, u, _);
            (u = f.optOut),
              (d = f.d_ottl),
              g.s("MCOPTOUT", d, !0),
              g.t("MCOPTOUT", u),
              g.V("MCOPTOUT", [u]);
          }
        }),
        (g.n = null),
        (g.L = function(e, t, n, i, r) {
          var o,
            a = "",
            s = N.isFirstPartyAnalyticsVisitorIDCall(e),
            c = { MCAAMLH: !0, MCAAMB: !0 };
          if (l() && g.isAllowed())
            if (
              (g.u(),
              (a = g.r(e, !0 === c[e])),
              (function() {
                return (
                  (!a || (g.X && g.X[e])) && (!g.disableThirdPartyCalls || s)
                );
              })())
            ) {
              if (
                (e === b || "MCOPTOUT" === e
                  ? (o = "MC")
                  : "MCAAMLH" === e || e === E
                  ? (o = T)
                  : e === M && (o = D),
                o)
              )
                return (
                  !t ||
                    (null != g.n && g.n[o]) ||
                    (null == g.n && (g.n = {}),
                    (g.n[o] = !0),
                    g.ea(
                      o,
                      t,
                      function(t) {
                        if (!g.r(e)) {
                          t && j.setState(o, !0);
                          var n = "";
                          e === b
                            ? (n = g.Y())
                            : o === T && (n = { error_msg: "timeout" }),
                            g.ra(o, n);
                        }
                      },
                      r
                    )),
                  g.U(e, n),
                  a || (t || g.ra(o, { id: _ }), "")
                );
            } else
              a ||
                (e === b
                  ? (g.U(e, n), (a = g.Y()), g.setMarketingCloudVisitorID(a))
                  : e === M
                  ? (g.U(e, n), (a = ""), g.setAnalyticsVisitorID(a))
                  : ((a = ""), (i = !0)));
          return (
            (e !== b && e !== M) || a !== _ || ((a = ""), (i = !0)),
            n && i && g.S(n, [a]),
            a
          );
        }),
        (g.I = function(e) {
          g.u(), g.ra("MC", e);
        }),
        (g.Q = function(e) {
          g.getAudienceManagerBlob(e, !0);
        }),
        (g.R = function(e) {
          g.u(), g.ra(D, e);
        }),
        (g.sa = function(e) {
          g.u(), g.ra(T, e);
        }),
        (g.K = function(e) {
          var t = g.audienceManagerServer,
            n = "",
            i = g.r(b),
            r = g.r(E, !0),
            o = g.r(M),
            a = o && o !== _ ? "&d_cid_ic=AVID%01" + encodeURIComponent(o) : "";
          if (
            (g.loadSSL &&
              g.audienceManagerServerSecure &&
              (t = g.audienceManagerServerSecure),
            t)
          ) {
            var s,
              c,
              u = g.getCustomerIDs();
            if (u)
              for (s in u)
                P(s) &&
                  ((c = u[s]),
                  (a +=
                    "&d_cid_ic=" +
                    encodeURIComponent(s) +
                    "%01" +
                    encodeURIComponent(c.id ? c.id : "") +
                    (c.authState ? "%01" + c.authState : "")));
            e || (e = "_setAudienceManagerFields");
            var l = "http" + (g.loadSSL ? "s" : "") + "://" + t + "/id",
              d =
                "d_visid_ver=" +
                g.version +
                (m && -1 !== l.indexOf("demdex.net")
                  ? "&gdpr=1&gdpr_force=1&gdpr_consent=" + m
                  : "") +
                "&d_rtbd=json&d_ver=2" +
                (!i && g.J ? "&d_verify=1" : "") +
                "&d_orgid=" +
                encodeURIComponent(g.marketingCloudOrgID) +
                "&d_nsid=" +
                (g.idSyncContainerID || 0) +
                (i ? "&d_mid=" + encodeURIComponent(i) : "") +
                (g.idSyncDisable3rdPartySyncing || g.disableThirdPartyCookies
                  ? "&d_coppa=true"
                  : "") +
                (!0 === A
                  ? "&d_coop_safe=1"
                  : !1 === A
                  ? "&d_coop_unsafe=1"
                  : "") +
                (r ? "&d_blob=" + encodeURIComponent(r) : "") +
                a,
              f = ["s_c_il", g.l, e];
            return (
              (n = l + "?" + d + "&d_cb=s_c_il%5B" + g.l + "%5D." + e),
              { url: n, corsUrl: l + "?" + d, callback: f }
            );
          }
          return { url: n };
        }),
        (g.appendVisitorIDsTo = function(e) {
          try {
            var t = [
              [b, g.r(b)],
              [M, g.r(M)],
              ["MCORGID", g.marketingCloudOrgID]
            ];
            return g.$(e, ie.ADOBE_MC, s(t));
          } catch (t) {
            return e;
          }
        }),
        (g.appendSupplementalDataIDTo = function(e, t) {
          if (!(t = t || g.getSupplementalDataID(N.generateRandomString(), !0)))
            return e;
          try {
            var n = s([["SDID", t], ["MCORGID", g.marketingCloudOrgID]]);
            return g.$(e, ie.ADOBE_MC_SDID, n);
          } catch (t) {
            return e;
          }
        });
      var N = {
        parseHash: function(e) {
          var t = e.indexOf("#");
          return t > 0 ? e.substr(t) : "";
        },
        hashlessUrl: function(e) {
          var t = e.indexOf("#");
          return t > 0 ? e.substr(0, t) : e;
        },
        addQueryParamAtLocation: function(e, t, n) {
          var i = e.split("&");
          return (n = null != n ? n : i.length), i.splice(n, 0, t), i.join("&");
        },
        isFirstPartyAnalyticsVisitorIDCall: function(e, t, n) {
          if (e !== M) return !1;
          var i;
          return (
            t || (t = g.trackingServer),
            n || (n = g.trackingServerSecure),
            !("string" != typeof (i = g.loadSSL ? n : t) || !i.length) &&
              0 > i.indexOf("2o7.net") &&
              0 > i.indexOf("omtrdc.net")
          );
        },
        isObject: function(e) {
          return !(!e || e !== Object(e));
        },
        removeCookie: function(e) {
          z.remove(e, { domain: g.cookieDomain });
        },
        isTrackingServerPopulated: function() {
          return !!g.trackingServer || !!g.trackingServerSecure;
        },
        getTimestampInSeconds: function() {
          return Math.round(new Date().getTime() / 1e3);
        },
        parsePipeDelimetedKeyValues: function(e) {
          return e.split("|").reduce(function(e, t) {
            var n = t.split("=");
            return (e[n[0]] = decodeURIComponent(n[1])), e;
          }, {});
        },
        generateRandomString: function(e) {
          e = e || 5;
          for (var t = "", n = "abcdefghijklmnopqrstuvwxyz0123456789"; e--; )
            t += n[Math.floor(36 * Math.random())];
          return t;
        },
        normalizeBoolean: function(e) {
          return "true" === e || ("false" !== e && e);
        },
        parseBoolean: function(e) {
          return "true" === e || ("false" !== e && null);
        },
        replaceMethodsWithFunction: function(e, t) {
          for (var n in e)
            e.hasOwnProperty(n) && "function" == typeof e[n] && (e[n] = t);
          return e;
        }
      };
      g.H = N;
      var w = re(g, y);
      (g.ta = w), (g.timeoutMetricsLog = []);
      var j = {
        isClientSideMarketingCloudVisitorID: null,
        MCIDCallTimedOut: null,
        AnalyticsIDCallTimedOut: null,
        AAMIDCallTimedOut: null,
        fieldGroupObj: {},
        setState: function(e, t) {
          switch (e) {
            case "MC":
              !1 === t
                ? !0 !== this.MCIDCallTimedOut && (this.MCIDCallTimedOut = !1)
                : (this.MCIDCallTimedOut = t);
              break;
            case D:
              !1 === t
                ? !0 !== this.AnalyticsIDCallTimedOut &&
                  (this.AnalyticsIDCallTimedOut = !1)
                : (this.AnalyticsIDCallTimedOut = t);
              break;
            case T:
              !1 === t
                ? !0 !== this.AAMIDCallTimedOut && (this.AAMIDCallTimedOut = !1)
                : (this.AAMIDCallTimedOut = t);
          }
        }
      };
      (g.isClientSideMarketingCloudVisitorID = function() {
        return j.isClientSideMarketingCloudVisitorID;
      }),
        (g.MCIDCallTimedOut = function() {
          return j.MCIDCallTimedOut;
        }),
        (g.AnalyticsIDCallTimedOut = function() {
          return j.AnalyticsIDCallTimedOut;
        }),
        (g.AAMIDCallTimedOut = function() {
          return j.AAMIDCallTimedOut;
        }),
        (g.idSyncGetOnPageSyncInfo = function() {
          return g.u(), g.r("MCSYNCSOP");
        }),
        (g.idSyncByURL = function(e) {
          if (!g.isOptedOut()) {
            var t = c(e || {});
            if (t.error) return t.error;
            var n,
              i,
              r = e.url,
              o = encodeURIComponent,
              a = w;
            return (
              (r = r.replace(/^https:/, "").replace(/^http:/, "")),
              (n = x.encodeAndBuildRequest(["", e.dpid, e.dpuuid || ""], ",")),
              (i = ["ibs", o(e.dpid), "img", o(r), t.ttl, "", n]),
              a.addMessage(i.join("|")),
              a.requestToProcess(),
              "Successfully queued"
            );
          }
        }),
        (g.idSyncByDataSource = function(e) {
          if (!g.isOptedOut())
            return e === Object(e) &&
              "string" == typeof e.dpuuid &&
              e.dpuuid.length
              ? ((e.url =
                  "//dpm.demdex.net/ibs:dpid=" +
                  e.dpid +
                  "&dpuuid=" +
                  e.dpuuid),
                g.idSyncByURL(e))
              : "Error: config or config.dpuuid is empty";
        }),
        He(g, w),
        (g.ka = function(e) {
          e = e || g.cookieRead(g.cookieName);
          var t = ie.VERSION_REGEX.exec(e);
          return t && t.length > 1 ? t[1] : null;
        }),
        (g.ua = function(e) {
          var t = g.ka();
          (t && !Z.isLessThan(t, e)) || N.removeCookie(g.cookieName);
        }),
        (g.setAsCoopSafe = function() {
          A = !0;
        }),
        (g.setAsCoopUnsafe = function() {
          A = !1;
        }),
        (function() {
          if (((g.configs = Object.create(null)), N.isObject(n)))
            for (var e in n) P(e) && ((g[e] = n[e]), (g.configs[e] = n[e]));
        })(),
        (function() {
          [
            ["getMarketingCloudVisitorID"],
            ["setCustomerIDs", void 0],
            ["getAnalyticsVisitorID"],
            ["getAudienceManagerLocationHint"],
            ["getLocationHint"],
            ["getAudienceManagerBlob"]
          ].forEach(function(e) {
            var t = e[0],
              n = 2 === e.length ? e[1] : "",
              i = g[t];
            g[t] = function(e) {
              return l() && g.isAllowed()
                ? i.apply(g, arguments)
                : ("function" == typeof e && g.S(e, [n]), n);
            };
          });
        })(),
        (g.init = function() {
          if (u()) return h.optIn.fetchPermissions(f, !0);
          !(function() {
            if (N.isObject(n)) {
              (g.idSyncContainerID = g.idSyncContainerID || 0),
                (A =
                  "boolean" == typeof g.isCoopSafe
                    ? g.isCoopSafe
                    : N.parseBoolean(g.isCoopSafe)),
                g.resetBeforeVersion && g.ua(g.resetBeforeVersion),
                g.ca(),
                g.ba(),
                g.u();
              var e = g.r(O),
                t = Math.ceil(new Date().getTime() / ie.MILLIS_PER_DAY);
              g.idSyncDisableSyncs ||
                g.disableIdSyncs ||
                !w.canMakeSyncIDCall(e, t) ||
                (g.s(E, -1), g.t(O, t)),
                g.getMarketingCloudVisitorID(),
                g.getAudienceManagerLocationHint(),
                g.getAudienceManagerBlob(),
                g.D(g.serverState);
            } else g.ca(), g.ba();
          })(),
            (function() {
              if (!g.idSyncDisableSyncs && !g.disableIdSyncs) {
                w.checkDPIframeSrc();
                var e = function() {
                  var e = w;
                  e.readyToAttachIframe() && e.attachIframe();
                };
                S.addEventListener("load", function() {
                  (y.windowLoaded = !0), e();
                });
                try {
                  ee.receiveMessage(function(e) {
                    w.receiveMessage(e.data);
                  }, w.iframeHost);
                } catch (e) {}
              }
            })(),
            (function() {
              g.whitelistIframeDomains &&
                ie.POST_MESSAGE_ENABLED &&
                ((g.whitelistIframeDomains =
                  g.whitelistIframeDomains instanceof Array
                    ? g.whitelistIframeDomains
                    : [g.whitelistIframeDomains]),
                g.whitelistIframeDomains.forEach(function(e) {
                  var n = new B(t, e),
                    i = J(g, n);
                  ee.receiveMessage(i, e);
                }));
            })();
        });
    };
    (We.config = ae), (v.Visitor = We);
    var Ye = We,
      qe = function(e) {
        if (x.isObject(e))
          return Object.keys(e)
            .filter(function(t) {
              return "" !== e[t];
            })
            .reduce(function(t, n) {
              var i = "doesOptInApply" !== n ? e[n] : ae.normalizeConfig(e[n]),
                r = x.normalizeBoolean(i);
              return (t[n] = r), t;
            }, Object.create(null));
      },
      Xe = Ve.OptIn,
      Je = Ve.IabPlugin;
    (Ye.getInstance = function(e, t) {
      if (!e) throw Error("Visitor requires Adobe Marketing Cloud Org ID.");
      0 > e.indexOf("@") && (e += "@AdobeOrg");
      var n = (function() {
        var t = v.s_c_il;
        if (t)
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            if (i && "Visitor" === i.i && i.marketingCloudOrgID === e) return i;
          }
      })();
      if (n) return n;
      var i = qe(t);
      !(function(e) {
        v.adobe.optIn =
          v.adobe.optIn ||
          (function() {
            var t = x.pluck(e, [
                "doesOptInApply",
                "previousPermissions",
                "preOptInApprovals",
                "isOptInStorageEnabled",
                "optInStorageExpiry",
                "isIabContext"
              ]),
              n = e.optInCookieDomain || e.cookieDomain;
            (n = n || $()),
              (n = n === window.location.hostname ? "" : n),
              (t.optInCookieDomain = n);
            var i = new Xe(t, { cookies: z });
            if (t.isIabContext) {
              var r = new Je(window.b);
              i.registerPlugin(r);
            }
            return i;
          })();
      })(i || {});
      var r = e,
        o = r
          .split("")
          .reverse()
          .join(""),
        a = new Ye(e, null, o);
      x.isObject(i) && i.cookieDomain && (a.cookieDomain = i.cookieDomain),
        (function() {
          v.s_c_il.splice(--v.s_c_in, 1);
        })();
      var s = x.getIeVersion();
      if ("number" == typeof s && 10 > s)
        return a.H.replaceMethodsWithFunction(a, function() {});
      var c =
        (function() {
          try {
            return v.self !== v.parent;
          } catch (e) {
            return !0;
          }
        })() &&
        !(function(e) {
          return (
            e.cookieWrite("TEST_AMCV_COOKIE", "T", 1),
            "T" === e.cookieRead("TEST_AMCV_COOKIE") &&
              (e.H.removeCookie("TEST_AMCV_COOKIE"), !0)
          );
        })(a) &&
        v.parent
          ? new F(e, i, a, v.parent)
          : new Ye(e, i, o);
      return (a = null), c.init(), c;
    }),
      (function() {
        function e() {
          Ye.windowLoaded = !0;
        }
        v.addEventListener
          ? v.addEventListener("load", e)
          : v.attachEvent && v.attachEvent("onload", e),
          (Ye.codeLoadEnd = new Date().getTime());
      })();
  })();
})(define);
