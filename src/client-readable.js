(function() {
  const i = document.createElement("link").relList;
  if (i && i.supports && i.supports("modulepreload"))
    return;
  for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
    a(o);
  new MutationObserver((o) => {
    for (const s of o)
      if (s.type === "childList")
        for (const c of s.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: true, subtree: true });
  function l(o) {
    const s = {};
    return o.integrity && (s.integrity = o.integrity), o.referrerPolicy && (s.referrerPolicy = o.referrerPolicy), o.crossOrigin === "use-credentials" ? s.credentials = "include" : o.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
  }
  function a(o) {
    if (o.ep)
      return;
    o.ep = true;
    const s = l(o);
    fetch(o.href, s);
  }
})();
function qc(e12) {
  return e12 && e12.__esModule && Object.prototype.hasOwnProperty.call(e12, "default") ? e12.default : e12;
}
var Bh = { exports: {} }, Iu = {};
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var ux;
function qk() {
  if (ux)
    return Iu;
  ux = 1;
  var e12 = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function l(a, o, s) {
    var c = null;
    if (s !== void 0 && (c = "" + s), o.key !== void 0 && (c = "" + o.key), "key" in o) {
      s = {};
      for (var d in o)
        d !== "key" && (s[d] = o[d]);
    } else
      s = o;
    return o = s.ref, { $$typeof: e12, type: a, key: c, ref: o !== void 0 ? o : null, props: s };
  }
  return Iu.Fragment = i, Iu.jsx = l, Iu.jsxs = l, Iu;
}
var ox;
function Vk() {
  return ox || (ox = 1, Bh.exports = qk()), Bh.exports;
}
var b = Vk(), Uh = { exports: {} }, qu = {}, Ih = { exports: {} }, qh = {};
/**
* @license React
* scheduler.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var sx;
function Yk() {
  return sx || (sx = 1, (function(e12) {
    function i(H, V) {
      var $ = H.length;
      H.push(V);
      e: for (; 0 < $; ) {
        var F = $ - 1 >>> 1, _ = H[F];
        if (0 < o(_, V))
          H[F] = V, H[$] = _, $ = F;
        else
          break e;
      }
    }
    function l(H) {
      return H.length === 0 ? null : H[0];
    }
    function a(H) {
      if (H.length === 0)
        return null;
      var V = H[0], $ = H.pop();
      if ($ !== V) {
        H[0] = $;
        e: for (var F = 0, _ = H.length, se = _ >>> 1; F < se; ) {
          var he = 2 * (F + 1) - 1, R = H[he], O = he + 1, te = H[O];
          if (0 > o(R, $))
            O < _ && 0 > o(te, R) ? (H[F] = te, H[O] = $, F = O) : (H[F] = R, H[he] = $, F = he);
          else if (O < _ && 0 > o(te, $))
            H[F] = te, H[O] = $, F = O;
          else
            break e;
        }
      }
      return V;
    }
    function o(H, V) {
      var $ = H.sortIndex - V.sortIndex;
      return $ !== 0 ? $ : H.id - V.id;
    }
    if (e12.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var s = performance;
      e12.unstable_now = function() {
        return s.now();
      };
    } else {
      var c = Date, d = c.now();
      e12.unstable_now = function() {
        return c.now() - d;
      };
    }
    var m = [], g = [], y = 1, p = null, x = 3, v = false, S = false, E = false, N = false, C = typeof setTimeout == "function" ? setTimeout : null, A = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function T(H) {
      for (var V = l(g); V !== null; ) {
        if (V.callback === null)
          a(g);
        else if (V.startTime <= H)
          a(g), V.sortIndex = V.expirationTime, i(m, V);
        else
          break;
        V = l(g);
      }
    }
    function Y(H) {
      if (E = false, T(H), !S)
        if (l(m) !== null)
          S = true, M || (M = true, ie());
        else {
          var V = l(g);
          V !== null && D(Y, V.startTime - H);
        }
    }
    var M = false, B = -1, G = 5, J = -1;
    function U() {
      return N ? true : !(e12.unstable_now() - J < G);
    }
    function X() {
      if (N = false, M) {
        var H = e12.unstable_now();
        J = H;
        var V = true;
        try {
          e: {
            S = false, E && (E = false, A(B), B = -1), v = true;
            var $ = x;
            try {
              t: {
                for (T(H), p = l(m); p !== null && !(p.expirationTime > H && U()); ) {
                  var F = p.callback;
                  if (typeof F == "function") {
                    p.callback = null, x = p.priorityLevel;
                    var _ = F(p.expirationTime <= H);
                    if (H = e12.unstable_now(), typeof _ == "function") {
                      p.callback = _, T(H), V = true;
                      break t;
                    }
                    p === l(m) && a(m), T(H);
                  } else
                    a(m);
                  p = l(m);
                }
                if (p !== null)
                  V = true;
                else {
                  var se = l(g);
                  se !== null && D(Y, se.startTime - H), V = false;
                }
              }
              break e;
            } finally {
              p = null, x = $, v = false;
            }
            V = void 0;
          }
        } finally {
          V ? ie() : M = false;
        }
      }
    }
    var ie;
    if (typeof k == "function")
      ie = function() {
        k(X);
      };
    else if (typeof MessageChannel < "u") {
      var re = new MessageChannel(), j = re.port2;
      re.port1.onmessage = X, ie = function() {
        j.postMessage(null);
      };
    } else
      ie = function() {
        C(X, 0);
      };
    function D(H, V) {
      B = C(function() {
        H(e12.unstable_now());
      }, V);
    }
    e12.unstable_IdlePriority = 5, e12.unstable_ImmediatePriority = 1, e12.unstable_LowPriority = 4, e12.unstable_NormalPriority = 3, e12.unstable_Profiling = null, e12.unstable_UserBlockingPriority = 2, e12.unstable_cancelCallback = function(H) {
      H.callback = null;
    }, e12.unstable_forceFrameRate = function(H) {
      0 > H || 125 < H ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : G = 0 < H ? Math.floor(1e3 / H) : 5;
    }, e12.unstable_getCurrentPriorityLevel = function() {
      return x;
    }, e12.unstable_next = function(H) {
      switch (x) {
        case 1:
        case 2:
        case 3:
          var V = 3;
          break;
        default:
          V = x;
      }
      var $ = x;
      x = V;
      try {
        return H();
      } finally {
        x = $;
      }
    }, e12.unstable_requestPaint = function() {
      N = true;
    }, e12.unstable_runWithPriority = function(H, V) {
      switch (H) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          H = 3;
      }
      var $ = x;
      x = H;
      try {
        return V();
      } finally {
        x = $;
      }
    }, e12.unstable_scheduleCallback = function(H, V, $) {
      var F = e12.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? F + $ : F) : $ = F, H) {
        case 1:
          var _ = -1;
          break;
        case 2:
          _ = 250;
          break;
        case 5:
          _ = 1073741823;
          break;
        case 4:
          _ = 1e4;
          break;
        default:
          _ = 5e3;
      }
      return _ = $ + _, H = { id: y++, callback: V, priorityLevel: H, startTime: $, expirationTime: _, sortIndex: -1 }, $ > F ? (H.sortIndex = $, i(g, H), l(m) === null && H === l(g) && (E ? (A(B), B = -1) : E = true, D(Y, $ - F))) : (H.sortIndex = _, i(m, H), S || v || (S = true, M || (M = true, ie()))), H;
    }, e12.unstable_shouldYield = U, e12.unstable_wrapCallback = function(H) {
      var V = x;
      return function() {
        var $ = x;
        x = V;
        try {
          return H.apply(this, arguments);
        } finally {
          x = $;
        }
      };
    };
  })(qh)), qh;
}
var cx;
function Xk() {
  return cx || (cx = 1, Ih.exports = Yk()), Ih.exports;
}
var Vh = { exports: {} }, Qe = {};
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var fx;
function Gk() {
  if (fx)
    return Qe;
  fx = 1;
  var e12 = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), l = Symbol.for("react.fragment"), a = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), c = Symbol.for("react.context"), d = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), g = Symbol.for("react.memo"), y = Symbol.for("react.lazy"), p = Symbol.for("react.activity"), x = Symbol.for("react.view_transition"), v = Symbol.iterator;
  function S(O) {
    return O === null || typeof O != "object" ? null : (O = v && O[v] || O["@@iterator"], typeof O == "function" ? O : null);
  }
  var E = { isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, N = Object.assign, C = {};
  function A(O, te, pe) {
    this.props = O, this.context = te, this.refs = C, this.updater = pe || E;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(O, te) {
    if (typeof O != "object" && typeof O != "function" && O != null)
      throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, O, te, "setState");
  }, A.prototype.forceUpdate = function(O) {
    this.updater.enqueueForceUpdate(this, O, "forceUpdate");
  };
  function k() {
  }
  k.prototype = A.prototype;
  function T(O, te, pe) {
    this.props = O, this.context = te, this.refs = C, this.updater = pe || E;
  }
  var Y = T.prototype = new k();
  Y.constructor = T, N(Y, A.prototype), Y.isPureReactComponent = true;
  var M = Array.isArray;
  function B() {
  }
  var G = { H: null, A: null, T: null, S: null }, J = Object.prototype.hasOwnProperty;
  function U(O, te, pe) {
    var me = pe.ref;
    return { $$typeof: e12, type: O, key: te, ref: me !== void 0 ? me : null, props: pe };
  }
  function X(O, te) {
    return U(O.type, te, O.props);
  }
  function ie(O) {
    return typeof O == "object" && O !== null && O.$$typeof === e12;
  }
  function re(O) {
    var te = { "=": "=0", ":": "=2" };
    return "$" + O.replace(/[=:]/g, function(pe) {
      return te[pe];
    });
  }
  var j = /\/+/g;
  function D(O, te) {
    return typeof O == "object" && O !== null && O.key != null ? re("" + O.key) : te.toString(36);
  }
  function H(O) {
    switch (O.status) {
      case "fulfilled":
        return O.value;
      case "rejected":
        throw O.reason;
      default:
        switch (typeof O.status == "string" ? O.then(B, B) : (O.status = "pending", O.then(function(te) {
          O.status === "pending" && (O.status = "fulfilled", O.value = te);
        }, function(te) {
          O.status === "pending" && (O.status = "rejected", O.reason = te);
        })), O.status) {
          case "fulfilled":
            return O.value;
          case "rejected":
            throw O.reason;
        }
    }
    throw O;
  }
  function V(O, te, pe, me, ne) {
    var xe = typeof O;
    (xe === "undefined" || xe === "boolean") && (O = null);
    var Se = false;
    if (O === null)
      Se = true;
    else
      switch (xe) {
        case "bigint":
        case "string":
        case "number":
          Se = true;
          break;
        case "object":
          switch (O.$$typeof) {
            case e12:
            case i:
              Se = true;
              break;
            case y:
              return Se = O._init, V(Se(O._payload), te, pe, me, ne);
          }
      }
    if (Se)
      return ne = ne(O), Se = me === "" ? "." + D(O, 0) : me, M(ne) ? (pe = "", Se != null && (pe = Se.replace(j, "$&/") + "/"), V(ne, te, pe, "", function(we) {
        return we;
      })) : ne != null && (ie(ne) && (ne = X(ne, pe + (ne.key == null || O && O.key === ne.key ? "" : ("" + ne.key).replace(j, "$&/") + "/") + Se)), te.push(ne)), 1;
    Se = 0;
    var fe = me === "" ? "." : me + ":";
    if (M(O))
      for (var q = 0; q < O.length; q++)
        me = O[q], xe = fe + D(me, q), Se += V(me, te, pe, xe, ne);
    else if (q = S(O), typeof q == "function")
      for (O = q.call(O), q = 0; !(me = O.next()).done; )
        me = me.value, xe = fe + D(me, q++), Se += V(me, te, pe, xe, ne);
    else if (xe === "object") {
      if (typeof O.then == "function")
        return V(H(O), te, pe, me, ne);
      throw te = String(O), Error("Objects are not valid as a React child (found: " + (te === "[object Object]" ? "object with keys {" + Object.keys(O).join(", ") + "}" : te) + "). If you meant to render a collection of children, use an array instead.");
    }
    return Se;
  }
  function $(O, te, pe) {
    if (O == null)
      return O;
    var me = [], ne = 0;
    return V(O, me, "", "", function(xe) {
      return te.call(pe, xe, ne++);
    }), me;
  }
  function F(O) {
    if (O._status === -1) {
      var te = O._result, pe = te();
      pe.then(function(me) {
        (O._status === 0 || O._status === -1) && (O._status = 1, O._result = me, pe.status === void 0 && (pe.status = "fulfilled", pe.value = me));
      }, function(me) {
        (O._status === 0 || O._status === -1) && (O._status = 2, O._result = me, pe.status === void 0 && (pe.status = "rejected", pe.reason = me));
      }), O._status === -1 && (O._status = 0, O._result = pe);
    }
    if (O._status === 1)
      return O._result.default;
    throw O._result;
  }
  var _ = typeof reportError == "function" ? reportError : function(O) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var te = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof O == "object" && O !== null && typeof O.message == "string" ? String(O.message) : String(O), error: O });
      if (!window.dispatchEvent(te))
        return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", O);
      return;
    }
    console.error(O);
  };
  function se(O) {
    var te = G.T, pe = {};
    pe.types = te !== null ? te.types : null, G.T = pe;
    try {
      var me = O(), ne = G.S;
      ne !== null && ne(pe, me), typeof me == "object" && me !== null && typeof me.then == "function" && me.then(B, _);
    } catch (xe) {
      _(xe);
    } finally {
      te !== null && pe.types !== null && (te.types = pe.types), G.T = te;
    }
  }
  function he(O) {
    var te = G.T;
    if (te !== null) {
      var pe = te.types;
      pe === null ? te.types = [O] : pe.indexOf(O) === -1 && pe.push(O);
    } else
      se(he.bind(null, O));
  }
  var R = { map: $, forEach: function(O, te, pe) {
    $(O, function() {
      te.apply(this, arguments);
    }, pe);
  }, count: function(O) {
    var te = 0;
    return $(O, function() {
      te++;
    }), te;
  }, toArray: function(O) {
    return $(O, function(te) {
      return te;
    }) || [];
  }, only: function(O) {
    if (!ie(O))
      throw Error("React.Children.only expected to receive a single React element child.");
    return O;
  } };
  return Qe.Activity = p, Qe.Children = R, Qe.Component = A, Qe.Fragment = l, Qe.Profiler = o, Qe.PureComponent = T, Qe.StrictMode = a, Qe.Suspense = m, Qe.ViewTransition = x, Qe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, Qe.__COMPILER_RUNTIME = { __proto__: null, c: function(O) {
    return G.H.useMemoCache(O);
  } }, Qe.addTransitionType = he, Qe.cache = function(O) {
    return function() {
      return O.apply(null, arguments);
    };
  }, Qe.cacheSignal = function() {
    return null;
  }, Qe.cloneElement = function(O, te, pe) {
    if (O == null)
      throw Error("The argument must be a React element, but you passed " + O + ".");
    var me = N({}, O.props), ne = O.key;
    if (te != null)
      for (xe in te.key !== void 0 && (ne = "" + te.key), te)
        !J.call(te, xe) || xe === "key" || xe === "__self" || xe === "__source" || xe === "ref" && te.ref === void 0 || (me[xe] = te[xe]);
    var xe = arguments.length - 2;
    if (xe === 1)
      me.children = pe;
    else if (1 < xe) {
      for (var Se = Array(xe), fe = 0; fe < xe; fe++)
        Se[fe] = arguments[fe + 2];
      me.children = Se;
    }
    return U(O.type, ne, me);
  }, Qe.createContext = function(O) {
    return O = { $$typeof: c, _currentValue: O, _currentValue2: O, _threadCount: 0, Provider: null, Consumer: null }, O.Provider = O, O.Consumer = { $$typeof: s, _context: O }, O;
  }, Qe.createElement = function(O, te, pe) {
    var me, ne = {}, xe = null;
    if (te != null)
      for (me in te.key !== void 0 && (xe = "" + te.key), te)
        J.call(te, me) && me !== "key" && me !== "__self" && me !== "__source" && (ne[me] = te[me]);
    var Se = arguments.length - 2;
    if (Se === 1)
      ne.children = pe;
    else if (1 < Se) {
      for (var fe = Array(Se), q = 0; q < Se; q++)
        fe[q] = arguments[q + 2];
      ne.children = fe;
    }
    if (O && O.defaultProps)
      for (me in Se = O.defaultProps, Se)
        ne[me] === void 0 && (ne[me] = Se[me]);
    return U(O, xe, ne);
  }, Qe.createRef = function() {
    return { current: null };
  }, Qe.forwardRef = function(O) {
    return { $$typeof: d, render: O };
  }, Qe.isValidElement = ie, Qe.lazy = function(O) {
    return { $$typeof: y, _payload: { _status: -1, _result: O }, _init: F };
  }, Qe.memo = function(O, te) {
    return { $$typeof: g, type: O, compare: te === void 0 ? null : te };
  }, Qe.startTransition = se, Qe.unstable_useCacheRefresh = function() {
    return G.H.useCacheRefresh();
  }, Qe.use = function(O) {
    return G.H.use(O);
  }, Qe.useActionState = function(O, te, pe) {
    return G.H.useActionState(O, te, pe);
  }, Qe.useCallback = function(O, te) {
    return G.H.useCallback(O, te);
  }, Qe.useContext = function(O) {
    return G.H.useContext(O);
  }, Qe.useDebugValue = function() {
  }, Qe.useDeferredValue = function(O, te) {
    return G.H.useDeferredValue(O, te);
  }, Qe.useEffect = function(O, te) {
    return G.H.useEffect(O, te);
  }, Qe.useEffectEvent = function(O) {
    return G.H.useEffectEvent(O);
  }, Qe.useId = function() {
    return G.H.useId();
  }, Qe.useImperativeHandle = function(O, te, pe) {
    return G.H.useImperativeHandle(O, te, pe);
  }, Qe.useInsertionEffect = function(O, te) {
    return G.H.useInsertionEffect(O, te);
  }, Qe.useLayoutEffect = function(O, te) {
    return G.H.useLayoutEffect(O, te);
  }, Qe.useMemo = function(O, te) {
    return G.H.useMemo(O, te);
  }, Qe.useOptimistic = function(O, te) {
    return G.H.useOptimistic(O, te);
  }, Qe.useReducer = function(O, te, pe) {
    return G.H.useReducer(O, te, pe);
  }, Qe.useRef = function(O) {
    return G.H.useRef(O);
  }, Qe.useState = function(O) {
    return G.H.useState(O);
  }, Qe.useSyncExternalStore = function(O, te, pe) {
    return G.H.useSyncExternalStore(O, te, pe);
  }, Qe.useTransition = function() {
    return G.H.useTransition();
  }, Qe.version = "19.3.1", Qe;
}
var dx;
function go() {
  return dx || (dx = 1, Vh.exports = Gk()), Vh.exports;
}
var Yh = { exports: {} }, sn = {};
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var hx;
function $k() {
  if (hx)
    return sn;
  hx = 1;
  var e12 = go();
  function i(y) {
    var p = "https://react.dev/errors/" + y;
    if (1 < arguments.length) {
      p += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var x = 2; x < arguments.length; x++)
        p += "&args[]=" + encodeURIComponent(arguments[x]);
    }
    return "Minified React error #" + y + "; visit " + p + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function l() {
  }
  var a = { d: { f: l, r: function() {
    throw Error(i(522));
  }, D: l, C: l, L: l, m: l, X: l, S: l, M: l }, p: 0, findDOMNode: null }, o = Symbol.for("react.portal"), s = Symbol.for("react.recoverable"), c = Symbol.for("react.optimistic_key");
  function d(y, p, x) {
    var v = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: o, key: v == null ? null : v === c ? c : "" + v, children: y, containerInfo: p, implementation: x };
  }
  var m = e12.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function g(y, p) {
    if (y === "font")
      return "";
    if (typeof p == "string")
      return p === "use-credentials" ? p : "";
  }
  return sn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, sn.browser = function(y) {
    return { $$typeof: s, _reason: y };
  }, sn.createPortal = function(y, p) {
    var x = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!p || p.nodeType !== 1 && p.nodeType !== 9 && p.nodeType !== 11)
      throw Error(i(299));
    return d(y, p, null, x);
  }, sn.flushSync = function(y) {
    var p = m.T, x = a.p;
    try {
      if (m.T = null, a.p = 2, y)
        return y();
    } finally {
      m.T = p, a.p = x, a.d.f();
    }
  }, sn.preconnect = function(y, p) {
    typeof y == "string" && (p ? (p = p.crossOrigin, p = typeof p == "string" ? p === "use-credentials" ? p : "" : void 0) : p = null, a.d.C(y, p));
  }, sn.prefetchDNS = function(y) {
    typeof y == "string" && a.d.D(y);
  }, sn.preinit = function(y, p) {
    if (typeof y == "string" && p && typeof p.as == "string") {
      var x = p.as, v = g(x, p.crossOrigin), S = typeof p.integrity == "string" ? p.integrity : void 0, E = typeof p.fetchPriority == "string" ? p.fetchPriority : void 0;
      x === "style" ? a.d.S(y, typeof p.precedence == "string" ? p.precedence : void 0, { crossOrigin: v, integrity: S, fetchPriority: E }) : x === "script" && a.d.X(y, { crossOrigin: v, integrity: S, fetchPriority: E, nonce: typeof p.nonce == "string" ? p.nonce : void 0 });
    }
  }, sn.preinitModule = function(y, p) {
    if (typeof y == "string")
      if (typeof p == "object" && p !== null) {
        if (p.as == null || p.as === "script") {
          var x = g(p.as, p.crossOrigin);
          a.d.M(y, { crossOrigin: x, integrity: typeof p.integrity == "string" ? p.integrity : void 0, nonce: typeof p.nonce == "string" ? p.nonce : void 0, fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0 });
        }
      } else
        p == null && a.d.M(y);
  }, sn.preload = function(y, p) {
    if (typeof y == "string" && typeof p == "object" && p !== null && typeof p.as == "string") {
      var x = p.as, v = g(x, p.crossOrigin);
      a.d.L(y, x, { crossOrigin: v, integrity: typeof p.integrity == "string" ? p.integrity : void 0, nonce: typeof p.nonce == "string" ? p.nonce : void 0, type: typeof p.type == "string" ? p.type : void 0, fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0, referrerPolicy: typeof p.referrerPolicy == "string" ? p.referrerPolicy : void 0, imageSrcSet: typeof p.imageSrcSet == "string" ? p.imageSrcSet : void 0, imageSizes: typeof p.imageSizes == "string" ? p.imageSizes : void 0, media: typeof p.media == "string" ? p.media : void 0 });
    }
  }, sn.preloadModule = function(y, p) {
    if (typeof y == "string")
      if (p) {
        var x = g(p.as, p.crossOrigin);
        a.d.m(y, { as: typeof p.as == "string" && p.as !== "script" ? p.as : void 0, crossOrigin: x, integrity: typeof p.integrity == "string" ? p.integrity : void 0, nonce: typeof p.nonce == "string" ? p.nonce : void 0, fetchPriority: typeof p.fetchPriority == "string" ? p.fetchPriority : void 0 });
      } else
        a.d.m(y);
  }, sn.requestFormReset = function(y) {
    a.d.r(y);
  }, sn.unstable_batchedUpdates = function(y, p) {
    return y(p);
  }, sn.useFormState = function(y, p, x) {
    return m.H.useFormState(y, p, x);
  }, sn.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, sn.version = "19.3.1", sn;
}
var mx;
function jb() {
  if (mx)
    return Yh.exports;
  mx = 1;
  function e12() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e12);
      } catch (i) {
        console.error(i);
      }
  }
  return e12(), Yh.exports = $k(), Yh.exports;
}
/**
* @license React
* react-dom-client.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var px;
function Qk() {
  if (px)
    return qu;
  px = 1;
  var e12 = Xk(), i = go(), l = jb();
  function a(t) {
    var n = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var r = 2; r < arguments.length; r++)
        n += "&args[]=" + encodeURIComponent(arguments[r]);
    }
    return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function s(t) {
    for (var n = t, r = n; r && !r.alternate; )
      n = r, (n.flags & 4098) !== 0 && (t = n.return), r = n.return;
    for (; n.return; )
      n = n.return;
    return n.tag === 3 ? t : null;
  }
  function c(t) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null)
        return n.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var n = t.memoizedState;
      if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null)
        return n.dehydrated;
    }
    return null;
  }
  function m(t) {
    if (s(t) !== t)
      throw Error(a(188));
  }
  function g(t) {
    var n = t.alternate;
    if (!n) {
      if (n = s(t), n === null)
        throw Error(a(188));
      return n !== t ? null : t;
    }
    for (var r = t, u = n; ; ) {
      var f = r.return;
      if (f === null)
        break;
      var h = f.alternate;
      if (h === null) {
        if (u = f.return, u !== null) {
          r = u;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === r)
            return m(f), t;
          if (h === u)
            return m(f), n;
          h = h.sibling;
        }
        throw Error(a(188));
      }
      if (r.return !== u.return)
        r = f, u = h;
      else {
        for (var w = false, z = f.child; z; ) {
          if (z === r) {
            w = true, r = f, u = h;
            break;
          }
          if (z === u) {
            w = true, u = f, r = h;
            break;
          }
          z = z.sibling;
        }
        if (!w) {
          for (z = h.child; z; ) {
            if (z === r) {
              w = true, r = h, u = f;
              break;
            }
            if (z === u) {
              w = true, u = h, r = f;
              break;
            }
            z = z.sibling;
          }
          if (!w)
            throw Error(a(189));
        }
      }
      if (r.alternate !== u)
        throw Error(a(190));
    }
    if (r.tag !== 3)
      throw Error(a(188));
    return r.stateNode.current === r ? t : n;
  }
  function y(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6)
      return t;
    for (t = t.child; t !== null; ) {
      if (n = y(t), n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function p(t, n, r, u, f, h) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && r(t, u, f, h) || (t.tag !== 22 || t.memoizedState === null) && (n || t.tag !== 5 && t.tag !== 27) && p(t.child, n, r, u, f, h))
        return true;
      t = t.sibling;
    }
    return false;
  }
  function x(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27)
        return t;
      t = t.return;
    }
    return null;
  }
  function v(t) {
    var n = false;
    for (t = t.return; t !== null && (t.tag === 4 && (n = true), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return n;
  }
  function S(t) {
    var n = [null, null], r = x(t);
    return r === null || E(n, t, r.child, { foundSelf: false }), n;
  }
  function E(t, n, r, u) {
    for (; r !== null; ) {
      if (r === n)
        u.foundSelf = true;
      else if (r.tag === 5 || r.tag === 27 || r.tag === 6) {
        if (u.foundSelf)
          return t[1] = r, true;
        t[0] = r;
      } else if ((r.tag !== 22 || r.memoizedState === null) && E(t, n, r.child, u))
        return true;
      r = r.sibling;
    }
    return false;
  }
  function N(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(a(559));
    }
  }
  var C = null, A = null;
  function k(t, n, r) {
    return t === r ? true : t === n ? (C = t, true) : false;
  }
  function T(t, n, r) {
    return t === r ? (A = t, false) : t === n ? (A !== null && (C = t), true) : false;
  }
  function Y(t) {
    if (t === null)
      return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function M(t, n, r) {
    for (var u = 0, f = t; f; f = r(f))
      u++;
    f = 0;
    for (var h = n; h; h = r(h))
      f++;
    for (; 0 < u - f; )
      t = r(t), u--;
    for (; 0 < f - u; )
      n = r(n), f--;
    for (; u--; ) {
      if (t === n || n !== null && t === n.alternate)
        return t;
      t = r(t), n = r(n);
    }
    return null;
  }
  var B = Object.assign, G = Symbol.for("react.element"), J = Symbol.for("react.transitional.element"), U = Symbol.for("react.portal"), X = Symbol.for("react.fragment"), ie = Symbol.for("react.strict_mode"), re = Symbol.for("react.profiler"), j = Symbol.for("react.consumer"), D = Symbol.for("react.context"), H = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), $ = Symbol.for("react.suspense_list"), F = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), se = Symbol.for("react.activity"), he = Symbol.for("react.legacy_hidden"), R = Symbol.for("react.memo_cache_sentinel"), O = Symbol.for("react.view_transition"), te = Symbol.for("react.recoverable"), pe = Symbol.iterator;
  function me(t) {
    return t === null || typeof t != "object" ? null : (t = pe && t[pe] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ne = Symbol.for("react.client.reference");
  function xe(t) {
    if (t == null)
      return null;
    if (typeof t == "function")
      return t.$$typeof === ne ? null : t.displayName || t.name || null;
    if (typeof t == "string")
      return t;
    switch (t) {
      case X:
        return "Fragment";
      case re:
        return "Profiler";
      case ie:
        return "StrictMode";
      case V:
        return "Suspense";
      case $:
        return "SuspenseList";
      case se:
        return "Activity";
      case O:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case U:
          return "Portal";
        case D:
          return t.displayName || "Context";
        case j:
          return (t._context.displayName || "Context") + ".Consumer";
        case H:
          var n = t.render;
          return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case F:
          return n = t.displayName || null, n !== null ? n : xe(t.type) || "Memo";
        case _:
          n = t._payload, t = t._init;
          try {
            return xe(t(n));
          } catch {
          }
      }
    return null;
  }
  var Se = Array.isArray, fe = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, q = l.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, we = { pending: false, data: null, method: null, action: null }, Ce = [], Te = -1;
  function Ae(t) {
    return { current: t };
  }
  function Ee(t) {
    0 > Te || (t.current = Ce[Te], Ce[Te] = null, Te--);
  }
  function qe(t, n) {
    Te++, Ce[Te] = t.current, t.current = n;
  }
  var Le = Ae(null), pt = Ae(null), vt = Ae(null), Lt = Ae(null);
  function Zt(t, n) {
    switch (qe(vt, n), qe(pt, t), qe(Le, null), n.nodeType) {
      case 9:
      case 11:
        t = (t = n.documentElement) && (t = t.namespaceURI) ? g1(t) : 0;
        break;
      default:
        if (t = n.tagName, n = n.namespaceURI)
          n = g1(n), t = y1(n, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Ee(Le), qe(Le, t);
  }
  function Ht() {
    Ee(Le), Ee(pt), Ee(vt);
  }
  function _t(t) {
    var n = t.memoizedState;
    n !== null && (Ea._currentValue = n.memoizedState, qe(Lt, t)), n = Le.current;
    var r = y1(n, t.type);
    n !== r && (qe(pt, t), qe(Le, r));
  }
  function ce(t) {
    pt.current === t && (Ee(Le), Ee(pt)), Lt.current === t && (Ee(Lt), Ea._currentValue = we);
  }
  var K, de;
  function Ne(t) {
    if (K === void 0)
      try {
        throw Error();
      } catch (r) {
        var n = r.stack.trim().match(/\n( *(at )?)/);
        K = n && n[1] || "", de = -1 < r.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < r.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + K + t + de;
  }
  var be = false;
  function Ze(t, n) {
    if (!t || be)
      return "";
    be = true;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var u = { DetermineComponentFrameRoot: function() {
        try {
          if (n) {
            var ve = function() {
              throw Error();
            };
            if (Object.defineProperty(ve.prototype, "props", { set: function() {
              throw Error();
            } }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(ve, []);
              } catch (Me) {
                var P = Me;
              }
              Reflect.construct(t, [], ve);
            } else {
              try {
                ve.call();
              } catch (Me) {
                P = Me;
              }
              ve = false;
              try {
                var ae = Object.getOwnPropertyDescriptor(t.prototype, "props");
                Object.defineProperty(t.prototype, "props", { configurable: true, set: function() {
                  throw Error();
                } }), ve = true, new t();
              } finally {
                ve && (ae !== void 0 ? Object.defineProperty(t.prototype, "props", ae) : delete t.prototype.props);
              }
            }
          } else {
            try {
              throw Error();
            } catch (Me) {
              P = Me;
            }
            (ve = t()) && typeof ve.catch == "function" && ve.catch(function() {
            });
          }
        } catch (Me) {
          if (Me && P && typeof Me.stack == "string")
            return [Me.stack, P.stack];
        }
        return [null, null];
      } };
      u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var f = Object.getOwnPropertyDescriptor(u.DetermineComponentFrameRoot, "name");
      f && f.configurable && Object.defineProperty(u.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
      var h = u.DetermineComponentFrameRoot(), w = h[0], z = h[1];
      if (w && z) {
        var I = w.split(`
`), ee = z.split(`
`);
        for (f = u = 0; u < I.length && !I[u].includes("DetermineComponentFrameRoot"); )
          u++;
        for (; f < ee.length && !ee[f].includes("DetermineComponentFrameRoot"); )
          f++;
        if (u === I.length || f === ee.length)
          for (u = I.length - 1, f = ee.length - 1; 1 <= u && 0 <= f && I[u] !== ee[f]; )
            f--;
        for (; 1 <= u && 0 <= f; u--, f--)
          if (I[u] !== ee[f]) {
            if (u !== 1 || f !== 1)
              do
                if (u--, f--, 0 > f || I[u] !== ee[f]) {
                  var oe = `
` + I[u].replace(" at new ", " at ");
                  return t.displayName && oe.includes("<anonymous>") && (oe = oe.replace("<anonymous>", t.displayName)), oe;
                }
              while (1 <= u && 0 <= f);
            break;
          }
      }
    } finally {
      be = false, Error.prepareStackTrace = r;
    }
    return (r = t ? t.displayName || t.name : "") ? Ne(r) : "";
  }
  function Ve(t, n) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Ne(t.type);
      case 16:
        return Ne("Lazy");
      case 13:
        return t.child !== n && n !== null ? Ne("Suspense Fallback") : Ne("Suspense");
      case 19:
        return Ne("SuspenseList");
      case 0:
      case 15:
        return Ze(t.type, false);
      case 11:
        return Ze(t.type.render, false);
      case 1:
        return Ze(t.type, true);
      case 31:
        return Ne("Activity");
      case 30:
        return Ne("ViewTransition");
      default:
        return "";
    }
  }
  function Ke(t) {
    try {
      var n = "", r = null;
      do
        n += Ve(t, r), r = t, t = t.return;
      while (t);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  var lt = Object.prototype.hasOwnProperty, Ye = e12.unstable_scheduleCallback, It = e12.unstable_cancelCallback, zt = e12.unstable_shouldYield, Oi = e12.unstable_requestPaint, bt = e12.unstable_now, Dt = e12.unstable_getCurrentPriorityLevel, dn = e12.unstable_ImmediatePriority, Ft = e12.unstable_UserBlockingPriority, gi = e12.unstable_NormalPriority, Hr = e12.unstable_LowPriority, rl = e12.unstable_IdlePriority, Br = e12.log, Ql = e12.unstable_setDisableYieldValue, In = null, nn = null;
  function Nn(t) {
    if (typeof Br == "function" && Ql(t), nn && typeof nn.setStrictMode == "function")
      try {
        nn.setStrictMode(In, t);
      } catch {
      }
  }
  var Pt = Math.clz32 ? Math.clz32 : al, Za = Math.log, Bt = Math.LN2;
  function al(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Za(t) / Bt | 0) | 0;
  }
  var Ri = 256, Jn = 262144, _n = 4194304;
  function qn(t) {
    var n = t & 42;
    if (n !== 0)
      return n;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function ul(t, n, r) {
    var u = t.pendingLanes;
    if (u === 0)
      return 0;
    var f = 0, h = t.suspendedLanes, w = t.pingedLanes;
    t = t.warmLanes;
    var z = u & 134217727;
    return z !== 0 ? (u = z & ~h, u !== 0 ? f = qn(u) : (w &= z, w !== 0 ? f = qn(w) : r || (r = z & ~t, r !== 0 && (f = qn(r))))) : (z = u & ~h, z !== 0 ? f = qn(z) : w !== 0 ? f = qn(w) : r || (r = u & ~t, r !== 0 && (f = qn(r)))), f === 0 ? 0 : n !== 0 && n !== f && (n & h) === 0 && (h = f & -f, r = n & -n, h >= r || h === 32 && (r & 4194048) !== 0) ? n : f;
  }
  function Li(t, n) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0;
  }
  function Zl(t, n) {
    (n & 8) !== 0 && (n |= n & 32);
    var r = t.entangledLanes;
    if (r !== 0)
      for (t = t.entanglements, r &= n; 0 < r; ) {
        var u = 31 - Pt(r), f = 1 << u;
        n |= t[u], r &= ~f;
      }
    return n;
  }
  function Fa(t, n) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Hi() {
    var t = _n;
    return _n <<= 1, (_n & 62914560) === 0 && (_n = 4194304), t;
  }
  function Z(t) {
    for (var n = [], r = 0; 31 > r; r++)
      n.push(t);
    return n;
  }
  function ue(t, n) {
    t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function ge(t, n, r, u, f, h) {
    var w = t.pendingLanes;
    t.pendingLanes = r, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= r, t.entangledLanes &= r, t.errorRecoveryDisabledLanes &= r, t.shellSuspendCounter = 0;
    var z = t.entanglements, I = t.expirationTimes, ee = t.hiddenUpdates;
    for (r = w & ~r; 0 < r; ) {
      var oe = 31 - Pt(r), ve = 1 << oe;
      z[oe] = 0, I[oe] = -1;
      var P = ee[oe];
      if (P !== null)
        for (ee[oe] = null, oe = 0; oe < P.length; oe++) {
          var ae = P[oe];
          ae !== null && (ae.lane &= -536870913);
        }
      r &= ~ve;
    }
    u !== 0 && _e(t, u, 0), h !== 0 && f === 0 && t.tag !== 0 && (t.suspendedLanes |= h & ~(w & ~n));
  }
  function _e(t, n, r) {
    t.pendingLanes |= n, t.suspendedLanes &= ~n;
    var u = 31 - Pt(n);
    t.entangledLanes |= n, t.entanglements[u] = t.entanglements[u] | 1073741824 | r & 261930;
  }
  function ze(t, n) {
    var r = t.entangledLanes |= n;
    for (t = t.entanglements; r; ) {
      var u = 31 - Pt(r), f = 1 << u;
      f & n | t[u] & n && (t[u] |= n), r &= ~f;
    }
  }
  function je(t, n) {
    var r = n & -n;
    return r = (r & 42) !== 0 ? 1 : He(r), (r & (t.suspendedLanes | n)) !== 0 ? 0 : r;
  }
  function He(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Re(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ue() {
    var t = q.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ex(t.type));
  }
  function tt(t, n) {
    var r = q.p;
    try {
      return q.p = t, n();
    } finally {
      q.p = r;
    }
  }
  var ft = Math.random().toString(36).slice(2), ht = "__reactFiber$" + ft, hn = "__reactProps$" + ft, ol = "__reactContainer$" + ft, zo = "__reactEvents$" + ft, To = "__reactListeners$" + ft, df = "__reactHandles$" + ft, Ao = "__reactResources$" + ft, Fl = "__reactMarker$" + ft, Ur = "__reactLoad$" + ft;
  function Ir(t) {
    delete t[ht], delete t[hn], delete t[To], delete t[df];
  }
  function Bi(t) {
    var n;
    if (n = t[ht])
      return n;
    for (var r = t.parentNode; r; ) {
      if (n = r[ol] || r[ht]) {
        if (r = n.alternate, n.child !== null || r !== null && r.child !== null)
          for (t = O1(t); t !== null; ) {
            if (r = t[ht])
              return r;
            t = O1(t);
          }
        return n;
      }
      t = r, r = t.parentNode;
    }
    return null;
  }
  function sl(t) {
    if (t = t[ht] || t[ol]) {
      var n = t.tag;
      if (n === 5 || n === 6 || n === 13 || n === 31 || n === 26 || n === 27 || n === 3)
        return t;
    }
    return null;
  }
  function Kl(t) {
    var n = t.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6)
      return t.stateNode;
    throw Error(a(33));
  }
  function Wn(t) {
    var n = t[Ao];
    return n || (n = t[Ao] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function qt(t) {
    t[Fl] = true;
  }
  function Ka(t) {
    t[Ur] = void 0;
  }
  var Mo = /* @__PURE__ */ new Set(), jo = {};
  function ei(t, n) {
    cl(t, n), cl(t + "Capture", n);
  }
  function cl(t, n) {
    for (jo[t] = n, t = 0; t < n.length; t++)
      Mo.add(n[t]);
  }
  var hf = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Pa = {}, tg = {};
  function aE(t) {
    return lt.call(tg, t) ? true : lt.call(Pa, t) ? false : hf.test(t) ? tg[t] = true : (Pa[t] = true, false);
  }
  var st = false;
  function ng() {
    var t = st;
    return st = false, t;
  }
  function Do(t, n, r) {
    if (aE(n))
      if (r === null)
        t.removeAttribute(n);
      else {
        switch (typeof r) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(n);
            return;
          case "boolean":
            var u = n.toLowerCase().slice(0, 5);
            if (u !== "data-" && u !== "aria-") {
              t.removeAttribute(n);
              return;
            }
        }
        t.setAttribute(n, r);
      }
  }
  function Oo(t, n, r) {
    if (r === null)
      t.removeAttribute(n);
    else {
      switch (typeof r) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttribute(n, r);
    }
  }
  function Ui(t, n, r, u) {
    if (u === null)
      t.removeAttribute(r);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(r);
          return;
      }
      t.setAttributeNS(n, r, u);
    }
  }
  function zn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ig(t) {
    var n = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function uE(t, n, r) {
    var u = Object.getOwnPropertyDescriptor(t.constructor.prototype, n);
    if (!t.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var f = u.get, h = u.set;
      return Object.defineProperty(t, n, { configurable: true, get: function() {
        return f.call(this);
      }, set: function(w) {
        r = "" + w, h.call(this, w);
      } }), Object.defineProperty(t, n, { enumerable: u.enumerable }), { getValue: function() {
        return r;
      }, setValue: function(w) {
        r = "" + w;
      }, stopTracking: function() {
        t._valueTracker = null, delete t[n];
      } };
    }
  }
  function mf(t) {
    if (!t._valueTracker) {
      var n = ig(t) ? "checked" : "value";
      t._valueTracker = uE(t, n, "" + t[n]);
    }
  }
  function lg(t) {
    if (!t)
      return false;
    var n = t._valueTracker;
    if (!n)
      return true;
    var r = n.getValue(), u = "";
    return t && (u = ig(t) ? t.checked ? "true" : "false" : t.value), t = u, t !== r ? (n.setValue(t), true) : false;
  }
  var oE = /[\n"\\]/g;
  function Vn(t) {
    return t.replace(oE, function(n) {
      return "\\" + n.charCodeAt(0).toString(16) + " ";
    });
  }
  function pf(t, n, r, u, f, h, w, z) {
    t.name = "", w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" ? t.type = w : t.removeAttribute("type"), n != null ? w === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + zn(n)) : t.value !== "" + zn(n) && (t.value = "" + zn(n)) : w !== "submit" && w !== "reset" || t.removeAttribute("value"), n != null ? w === "number" && t.value == n ? gf(t, zn(t.value)) : gf(t, zn(n)) : r != null ? gf(t, zn(r)) : u != null && t.removeAttribute("value"), f == null && h != null && (t.defaultChecked = !!h), f != null && (t.checked = f && typeof f != "function" && typeof f != "symbol"), z != null && typeof z != "function" && typeof z != "symbol" && typeof z != "boolean" ? t.name = "" + zn(z) : t.removeAttribute("name");
  }
  function rg(t, n, r, u, f, h, w, z) {
    if (h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.type = h), n != null || r != null) {
      if (!(h !== "submit" && h !== "reset" || n != null)) {
        mf(t);
        return;
      }
      r = r != null ? "" + zn(r) : "", n = n != null ? "" + zn(n) : r, z || n === t.value || (t.value = n), t.defaultValue = n;
    }
    u = u ?? f, u = typeof u != "function" && typeof u != "symbol" && !!u, t.checked = z ? t.checked : !!u, t.defaultChecked = !!u, w != null && typeof w != "function" && typeof w != "symbol" && typeof w != "boolean" && (t.name = w), mf(t);
  }
  function gf(t, n) {
    t.defaultValue !== "" + n && (t.defaultValue = "" + n);
  }
  function qr(t, n, r, u) {
    if (t = t.options, n) {
      n = {};
      for (var f = 0; f < r.length; f++)
        n["$" + r[f]] = true;
      for (r = 0; r < t.length; r++)
        f = n.hasOwnProperty("$" + t[r].value), t[r].selected !== f && (t[r].selected = f), f && u && (t[r].defaultSelected = true);
    } else {
      for (r = "" + zn(r), n = null, f = 0; f < t.length; f++) {
        if (t[f].value === r) {
          t[f].selected = true, u && (t[f].defaultSelected = true);
          return;
        }
        n !== null || t[f].disabled || (n = t[f]);
      }
      n !== null && (n.selected = true);
    }
  }
  function ag(t, n, r) {
    if (n != null && (n = "" + zn(n), n !== t.value && (t.value = n), r == null)) {
      t.defaultValue !== n && (t.defaultValue = n);
      return;
    }
    t.defaultValue = r != null ? "" + zn(r) : "";
  }
  function ug(t, n, r, u) {
    if (n == null) {
      if (u != null) {
        if (r != null)
          throw Error(a(92));
        if (Se(u)) {
          if (1 < u.length)
            throw Error(a(93));
          u = u[0];
        }
        r = u;
      }
      r == null && (r = ""), n = r;
    }
    r = zn(n), t.defaultValue = r, u = t.textContent, u === r && u !== "" && u !== null && (t.value = u), mf(t);
  }
  function Vr(t, n) {
    if (n) {
      var r = t.firstChild;
      if (r && r === t.lastChild && r.nodeType === 3) {
        r.nodeValue = n;
        return;
      }
    }
    t.textContent = n;
  }
  var sE = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
  function og(t, n, r) {
    var u = n.indexOf("--") === 0;
    r == null || typeof r == "boolean" || r === "" ? u ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : u ? t.setProperty(n, r) : typeof r != "number" || r === 0 || sE.has(n) ? n === "float" ? t.cssFloat = r : t[n] = ("" + r).trim() : t[n] = r + "px";
  }
  function sg(t, n, r) {
    if (n != null && typeof n != "object")
      throw Error(a(62));
    if (t = t.style, r != null) {
      for (var u in r)
        !r.hasOwnProperty(u) || n != null && n.hasOwnProperty(u) || (u.indexOf("--") === 0 ? t.setProperty(u, "") : u === "float" ? t.cssFloat = "" : t[u] = "", st = true);
      for (var f in n)
        u = n[f], n.hasOwnProperty(f) && r[f] !== u && (og(t, f, u), st = true);
    } else
      for (var h in n)
        n.hasOwnProperty(h) && og(t, h, n[h]);
  }
  function yf(t) {
    if (t.indexOf("-") === -1)
      return false;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return false;
      default:
        return true;
    }
  }
  var cE = /* @__PURE__ */ new Map([["acceptCharset", "accept-charset"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"], ["crossOrigin", "crossorigin"], ["accentHeight", "accent-height"], ["alignmentBaseline", "alignment-baseline"], ["arabicForm", "arabic-form"], ["baselineShift", "baseline-shift"], ["capHeight", "cap-height"], ["clipPath", "clip-path"], ["clipRule", "clip-rule"], ["colorInterpolation", "color-interpolation"], ["colorInterpolationFilters", "color-interpolation-filters"], ["colorProfile", "color-profile"], ["colorRendering", "color-rendering"], ["dominantBaseline", "dominant-baseline"], ["enableBackground", "enable-background"], ["fillOpacity", "fill-opacity"], ["fillRule", "fill-rule"], ["floodColor", "flood-color"], ["floodOpacity", "flood-opacity"], ["fontFamily", "font-family"], ["fontSize", "font-size"], ["fontSizeAdjust", "font-size-adjust"], ["fontStretch", "font-stretch"], ["fontStyle", "font-style"], ["fontVariant", "font-variant"], ["fontWeight", "font-weight"], ["glyphName", "glyph-name"], ["glyphOrientationHorizontal", "glyph-orientation-horizontal"], ["glyphOrientationVertical", "glyph-orientation-vertical"], ["horizAdvX", "horiz-adv-x"], ["horizOriginX", "horiz-origin-x"], ["imageRendering", "image-rendering"], ["letterSpacing", "letter-spacing"], ["lightingColor", "lighting-color"], ["markerEnd", "marker-end"], ["markerMid", "marker-mid"], ["markerStart", "marker-start"], ["maskType", "mask-type"], ["overlinePosition", "overline-position"], ["overlineThickness", "overline-thickness"], ["paintOrder", "paint-order"], ["panose-1", "panose-1"], ["pointerEvents", "pointer-events"], ["renderingIntent", "rendering-intent"], ["shapeRendering", "shape-rendering"], ["stopColor", "stop-color"], ["stopOpacity", "stop-opacity"], ["strikethroughPosition", "strikethrough-position"], ["strikethroughThickness", "strikethrough-thickness"], ["strokeDasharray", "stroke-dasharray"], ["strokeDashoffset", "stroke-dashoffset"], ["strokeLinecap", "stroke-linecap"], ["strokeLinejoin", "stroke-linejoin"], ["strokeMiterlimit", "stroke-miterlimit"], ["strokeOpacity", "stroke-opacity"], ["strokeWidth", "stroke-width"], ["textAnchor", "text-anchor"], ["textDecoration", "text-decoration"], ["textRendering", "text-rendering"], ["transformOrigin", "transform-origin"], ["underlinePosition", "underline-position"], ["underlineThickness", "underline-thickness"], ["unicodeBidi", "unicode-bidi"], ["unicodeRange", "unicode-range"], ["unitsPerEm", "units-per-em"], ["vAlphabetic", "v-alphabetic"], ["vHanging", "v-hanging"], ["vIdeographic", "v-ideographic"], ["vMathematical", "v-mathematical"], ["vectorEffect", "vector-effect"], ["vertAdvY", "vert-adv-y"], ["vertOriginX", "vert-origin-x"], ["vertOriginY", "vert-origin-y"], ["wordSpacing", "word-spacing"], ["writingMode", "writing-mode"], ["xmlnsXlink", "xmlns:xlink"], ["xHeight", "x-height"]]), fE = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Ro(t) {
    return fE.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function yi() {
  }
  var xf = null;
  function vf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Yr = null, Xr = null;
  function cg(t) {
    var n = sl(t);
    if (n && (t = n.stateNode)) {
      var r = t[hn] || null;
      e: switch (t = n.stateNode, n.type) {
        case "input":
          if (pf(t, r.value, r.defaultValue, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name), n = r.name, r.type === "radio" && n != null) {
            for (r = t; r.parentNode; )
              r = r.parentNode;
            for (r = r.querySelectorAll('input[name="' + Vn("" + n) + '"][type="radio"]'), n = 0; n < r.length; n++) {
              var u = r[n];
              if (u !== t && u.form === t.form) {
                var f = u[hn] || null;
                if (!f)
                  throw Error(a(90));
                pf(u, f.value, f.defaultValue, f.defaultValue, f.checked, f.defaultChecked, f.type, f.name);
              }
            }
            for (n = 0; n < r.length; n++)
              u = r[n], u.form === t.form && lg(u);
          }
          break e;
        case "textarea":
          ag(t, r.value, r.defaultValue);
          break e;
        case "select":
          n = r.value, n != null && qr(t, !!r.multiple, n, false);
      }
    }
  }
  var bf = false;
  function fg(t, n, r) {
    if (bf)
      return t(n, r);
    bf = true;
    try {
      var u = t(n);
      return u;
    } finally {
      if (bf = false, (Yr !== null || Xr !== null) && (Rs(), Yr && (n = Yr, t = Xr, Xr = Yr = null, cg(n), t)))
        for (n = 0; n < t.length; n++)
          cg(t[n]);
    }
  }
  function Ja(t, n) {
    var r = t.stateNode;
    if (r === null)
      return null;
    var u = r[hn] || null;
    if (u === null)
      return null;
    r = u[n];
    e: switch (n) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (u = !u.disabled) || (t = t.type, u = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !u;
        break e;
      default:
        t = false;
    }
    if (t)
      return null;
    if (r && typeof r != "function")
      throw Error(a(231, n, typeof r));
    return r;
  }
  var Ii = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), wf = false;
  if (Ii)
    try {
      var Wa = {};
      Object.defineProperty(Wa, "passive", { get: function() {
        wf = true;
      } }), window.addEventListener("test", Wa, Wa), window.removeEventListener("test", Wa, Wa);
    } catch {
      wf = false;
    }
  var fl = null, Sf = null, Lo = null;
  function dg() {
    if (Lo)
      return Lo;
    var t, n = Sf, r = n.length, u, f = "value" in fl ? fl.value : fl.textContent, h = f.length;
    for (t = 0; t < r && n[t] === f[t]; t++)
      ;
    var w = r - t;
    for (u = 1; u <= w && n[r - u] === f[h - u]; u++)
      ;
    return Lo = f.slice(t, 1 < u ? 1 - u : void 0);
  }
  function Ho(t) {
    var n = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Bo() {
    return true;
  }
  function hg() {
    return false;
  }
  function pn(t) {
    function n(r, u, f, h, w) {
      this._reactName = r, this._targetInst = f, this.type = u, this.nativeEvent = h, this.target = w, this.currentTarget = null;
      for (var z in t)
        t.hasOwnProperty(z) && (r = t[z], this[z] = r ? r(h) : h[z]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === false) ? Bo : hg, this.isPropagationStopped = hg, this;
    }
    return B(n.prototype, { preventDefault: function() {
      this.defaultPrevented = true;
      var r = this.nativeEvent;
      r && (r.preventDefault ? r.preventDefault() : typeof r.returnValue != "unknown" && (r.returnValue = false), this.isDefaultPrevented = Bo);
    }, stopPropagation: function() {
      var r = this.nativeEvent;
      r && (r.stopPropagation ? r.stopPropagation() : typeof r.cancelBubble != "unknown" && (r.cancelBubble = true), this.isPropagationStopped = Bo);
    }, persist: function() {
    }, isPersistent: Bo }), n;
  }
  var dl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(t) {
    return t.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Uo = pn(dl), eu = B({}, dl, { view: 0, detail: 0 }), dE = pn(eu), Ef, Cf, tu, Io = B({}, eu, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Nf, button: 0, buttons: 0, relatedTarget: function(t) {
    return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
  }, movementX: function(t) {
    return "movementX" in t ? t.movementX : (t !== tu && (tu && t.type === "mousemove" ? (Ef = t.screenX - tu.screenX, Cf = t.screenY - tu.screenY) : Cf = Ef = 0, tu = t), Ef);
  }, movementY: function(t) {
    return "movementY" in t ? t.movementY : Cf;
  } }), mg = pn(Io), hE = B({}, Io, { dataTransfer: 0 }), mE = pn(hE), pE = B({}, eu, { relatedTarget: 0 }), kf = pn(pE), gE = B({}, dl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), yE = pn(gE), xE = B({}, dl, { clipboardData: function(t) {
    return "clipboardData" in t ? t.clipboardData : window.clipboardData;
  } }), vE = pn(xE), bE = B({}, dl, { data: 0 }), pg = pn(bE), wE = { Esc: "Escape", Spacebar: " ", Left: "ArrowLeft", Up: "ArrowUp", Right: "ArrowRight", Down: "ArrowDown", Del: "Delete", Win: "OS", Menu: "ContextMenu", Apps: "ContextMenu", Scroll: "ScrollLock", MozPrintableKey: "Unidentified" }, SE = { 8: "Backspace", 9: "Tab", 12: "Clear", 13: "Enter", 16: "Shift", 17: "Control", 18: "Alt", 19: "Pause", 20: "CapsLock", 27: "Escape", 32: " ", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home", 37: "ArrowLeft", 38: "ArrowUp", 39: "ArrowRight", 40: "ArrowDown", 45: "Insert", 46: "Delete", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "NumLock", 145: "ScrollLock", 224: "Meta" }, EE = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function CE(t) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(t) : (t = EE[t]) ? !!n[t] : false;
  }
  function Nf() {
    return CE;
  }
  var kE = B({}, eu, { key: function(t) {
    if (t.key) {
      var n = wE[t.key] || t.key;
      if (n !== "Unidentified")
        return n;
    }
    return t.type === "keypress" ? (t = Ho(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? SE[t.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Nf, charCode: function(t) {
    return t.type === "keypress" ? Ho(t) : 0;
  }, keyCode: function(t) {
    return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  }, which: function(t) {
    return t.type === "keypress" ? Ho(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
  } }), NE = pn(kE), _E = B({}, Io, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), gg = pn(_E), zE = B({}, dl, { submitter: 0 }), TE = pn(zE), AE = B({}, eu, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Nf }), ME = pn(AE), jE = B({}, dl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), DE = pn(jE), OE = B({}, Io, { deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
  }, deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
  }, deltaZ: 0, deltaMode: 0 }), RE = pn(OE), LE = B({}, dl, { newState: 0, oldState: 0, source: 0 }), HE = pn(LE), BE = [9, 13, 27, 32], _f = Ii && "CompositionEvent" in window, nu = null;
  Ii && "documentMode" in document && (nu = document.documentMode);
  var UE = Ii && "TextEvent" in window && !nu, yg = Ii && (!_f || nu && 8 < nu && 11 >= nu), xg = " ", vg = false;
  function bg(t, n) {
    switch (t) {
      case "keyup":
        return BE.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return true;
      default:
        return false;
    }
  }
  function wg(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Gr = false;
  function IE(t, n) {
    switch (t) {
      case "compositionend":
        return wg(n);
      case "keypress":
        return n.which !== 32 ? null : (vg = true, xg);
      case "textInput":
        return t = n.data, t === xg && vg ? null : t;
      default:
        return null;
    }
  }
  function qE(t, n) {
    if (Gr)
      return t === "compositionend" || !_f && bg(t, n) ? (t = dg(), Lo = Sf = fl = null, Gr = false, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which)
            return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return yg && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var VE = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
  function Sg(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n === "input" ? !!VE[t.type] : n === "textarea";
  }
  function Eg(t, n, r, u) {
    Yr ? Xr ? Xr.push(u) : Xr = [u] : Yr = u, n = qs(n, "onChange"), 0 < n.length && (r = new Uo("onChange", "change", null, r, u), t.push({ event: r, listeners: n }));
  }
  var iu = null, lu = null;
  function YE(t) {
    c1(t, 0);
  }
  function qo(t) {
    var n = Kl(t);
    if (lg(n))
      return t;
  }
  function Cg(t, n) {
    if (t === "change")
      return n;
  }
  var kg = false;
  if (Ii) {
    var zf;
    if (Ii) {
      var Tf = "oninput" in document;
      if (!Tf) {
        var Ng = document.createElement("div");
        Ng.setAttribute("oninput", "return;"), Tf = typeof Ng.oninput == "function";
      }
      zf = Tf;
    } else
      zf = false;
    kg = zf && (!document.documentMode || 9 < document.documentMode);
  }
  function _g() {
    iu && (iu.detachEvent("onpropertychange", zg), lu = iu = null);
  }
  function zg(t) {
    if (t.propertyName === "value" && qo(lu)) {
      var n = [];
      Eg(n, lu, t, vf(t)), fg(YE, n);
    }
  }
  function XE(t, n, r) {
    t === "focusin" ? (_g(), iu = n, lu = r, iu.attachEvent("onpropertychange", zg)) : t === "focusout" && _g();
  }
  function GE(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return qo(lu);
  }
  function $E(t, n) {
    if (t === "click")
      return qo(n);
  }
  function QE(t, n) {
    if (t === "input" || t === "change")
      return qo(n);
  }
  function ZE(t, n) {
    return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n;
  }
  var Tn = typeof Object.is == "function" ? Object.is : ZE;
  function ru(t, n) {
    if (Tn(t, n))
      return true;
    if (typeof t != "object" || t === null || typeof n != "object" || n === null)
      return false;
    var r = Object.keys(t), u = Object.keys(n);
    if (r.length !== u.length)
      return false;
    for (u = 0; u < r.length; u++) {
      var f = r[u];
      if (!lt.call(n, f) || !Tn(t[f], n[f]))
        return false;
    }
    return true;
  }
  function Af(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u")
      return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Tg(t) {
    for (; t && t.firstChild; )
      t = t.firstChild;
    return t;
  }
  function Ag(t, n) {
    var r = Tg(t);
    t = 0;
    for (var u; r; ) {
      if (r.nodeType === 3) {
        if (u = t + r.textContent.length, t <= n && u >= n)
          return { node: r, offset: n - t };
        t = u;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Tg(r);
    }
  }
  function Mg(t, n) {
    return t && n ? t === n ? true : t && t.nodeType === 3 ? false : n && n.nodeType === 3 ? Mg(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : false : false;
  }
  function jg(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var n = Af(t.document); n instanceof t.HTMLIFrameElement; ) {
      try {
        var r = typeof n.contentWindow.location.href == "string";
      } catch {
        r = false;
      }
      if (r)
        t = n.contentWindow;
      else
        break;
      n = Af(t.document);
    }
    return n;
  }
  function Mf(t) {
    var n = t && t.nodeName && t.nodeName.toLowerCase();
    return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true");
  }
  var FE = Ii && "documentMode" in document && 11 >= document.documentMode, $r = null, jf = null, au = null, Df = false;
  function Dg(t, n, r) {
    var u = r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    Df || $r == null || $r !== Af(u) || (u = $r, "selectionStart" in u && Mf(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), au && ru(au, u) || (au = u, u = qs(jf, "onSelect"), 0 < u.length && (n = new Uo("onSelect", "select", null, n, r), t.push({ event: n, listeners: u }), n.target = $r)));
  }
  function Pl(t, n) {
    var r = {};
    return r[t.toLowerCase()] = n.toLowerCase(), r["Webkit" + t] = "webkit" + n, r["Moz" + t] = "moz" + n, r;
  }
  var Qr = { animationend: Pl("Animation", "AnimationEnd"), animationiteration: Pl("Animation", "AnimationIteration"), animationstart: Pl("Animation", "AnimationStart"), transitionrun: Pl("Transition", "TransitionRun"), transitionstart: Pl("Transition", "TransitionStart"), transitioncancel: Pl("Transition", "TransitionCancel"), transitionend: Pl("Transition", "TransitionEnd") }, Of = {}, Og = {};
  Ii && (Og = document.createElement("div").style, "AnimationEvent" in window || (delete Qr.animationend.animation, delete Qr.animationiteration.animation, delete Qr.animationstart.animation), "TransitionEvent" in window || delete Qr.transitionend.transition);
  function Jl(t) {
    if (Of[t])
      return Of[t];
    if (!Qr[t])
      return t;
    var n = Qr[t], r;
    for (r in n)
      if (n.hasOwnProperty(r) && r in Og)
        return Of[t] = n[r];
    return t;
  }
  var Rg = Jl("animationend"), Lg = Jl("animationiteration"), Hg = Jl("animationstart"), KE = Jl("transitionrun"), PE = Jl("transitionstart"), JE = Jl("transitioncancel"), Bg = Jl("transitionend"), Ug = /* @__PURE__ */ new Map(), Rf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  Rf.push("scrollEnd");
  function ti(t, n) {
    Ug.set(t, n), ei(n, [t]);
  }
  var WE = 0;
  function qi(t, n) {
    if (t.name != null && t.name !== "auto")
      return t.name;
    if (n.autoName !== null)
      return n.autoName;
    t = ri.identifierPrefix;
    var r = WE++;
    return t = "_" + t + "t_" + r.toString(32) + "_", n.autoName = t;
  }
  function Ig(t) {
    if (t == null || typeof t == "string")
      return t;
    var n = null, r = ha;
    if (r !== null)
      for (var u = 0; u < r.length; u++) {
        var f = t[r[u]];
        if (f != null) {
          if (f === "none")
            return "none";
          n = n == null ? f : n + (" " + f);
        }
      }
    return n ?? t.default;
  }
  function Vi(t, n) {
    return t = Ig(t), n = Ig(n), n == null ? t === "auto" ? null : t : n === "auto" ? null : n;
  }
  var Vo = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", { bubbles: true, cancelable: true, message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t), error: t });
      if (!window.dispatchEvent(n))
        return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Yn = [], Zr = 0, Lf = 0;
  function Yo() {
    for (var t = Zr, n = Lf = Zr = 0; n < t; ) {
      var r = Yn[n];
      Yn[n++] = null;
      var u = Yn[n];
      Yn[n++] = null;
      var f = Yn[n];
      Yn[n++] = null;
      var h = Yn[n];
      if (Yn[n++] = null, u !== null && f !== null) {
        var w = u.pending;
        w === null ? f.next = f : (f.next = w.next, w.next = f), u.pending = f;
      }
      h !== 0 && qg(r, f, h);
    }
  }
  function Xo(t, n, r, u) {
    Yn[Zr++] = t, Yn[Zr++] = n, Yn[Zr++] = r, Yn[Zr++] = u, Lf |= u, t.lanes |= u, t = t.alternate, t !== null && (t.lanes |= u);
  }
  function Hf(t, n, r, u) {
    return Xo(t, n, r, u), Go(t);
  }
  function Wl(t, n) {
    return Xo(t, null, null, n), Go(t);
  }
  function qg(t, n, r) {
    t.lanes |= r;
    var u = t.alternate;
    u !== null && (u.lanes |= r);
    for (var f = false, h = t.return; h !== null; )
      h.childLanes |= r, u = h.alternate, u !== null && (u.childLanes |= r), h.tag === 22 && (t = h.stateNode, t === null || t._visibility & 1 || (f = true)), t = h, h = h.return;
    return t.tag === 3 ? (h = t.stateNode, f && n !== null && (f = 31 - Pt(r), t = h.hiddenUpdates, u = t[f], u === null ? t[f] = [n] : u.push(n), n.lane = r | 536870912), h) : null;
  }
  function Go(t) {
    if (50 < zu)
      throw zu = 0, Os = null, Error(a(185));
    for (var n = t.return; n !== null; )
      t = n, n = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Fr = {};
  function eC(t, n, r, u) {
    this.tag = t, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function vn(t, n, r, u) {
    return new eC(t, n, r, u);
  }
  function Bf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Yi(t, n) {
    var r = t.alternate;
    return r === null ? (r = vn(t.tag, n, t.key, t.mode), r.elementType = t.elementType, r.type = t.type, r.stateNode = t.stateNode, r.alternate = t, t.alternate = r) : (r.pendingProps = n, r.type = t.type, r.flags = 0, r.subtreeFlags = 0, r.deletions = null), r.flags = t.flags & 1206910976, r.childLanes = t.childLanes, r.lanes = t.lanes, r.child = t.child, r.memoizedProps = t.memoizedProps, r.memoizedState = t.memoizedState, r.updateQueue = t.updateQueue, n = t.dependencies, r.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, r.sibling = t.sibling, r.index = t.index, r.ref = t.ref, r.refCleanup = t.refCleanup, r;
  }
  function Vg(t, n) {
    t.flags &= 1206910978;
    var r = t.alternate;
    return r === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = r.childLanes, t.lanes = r.lanes, t.child = r.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = r.memoizedProps, t.memoizedState = r.memoizedState, t.updateQueue = r.updateQueue, t.type = r.type, n = r.dependencies, t.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), t;
  }
  function $o(t, n, r, u, f, h) {
    var w = 0;
    if (u = t, typeof u == "function")
      Bf(u) && (w = 1);
    else if (typeof u == "string")
      w = zk(t, r, Le.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      e: switch (u) {
        case se:
          return t = vn(31, r, n, f), t.elementType = se, t.lanes = h, t;
        case X:
          return er(r.children, f, h, n);
        case ie:
          w = 8, f |= 24;
          break;
        case re:
          return t = vn(12, r, n, f | 2), t.elementType = re, t.lanes = h, t;
        case V:
          return t = vn(13, r, n, f), t.elementType = V, t.lanes = h, t;
        case $:
          return t = vn(19, r, n, f), t.elementType = $, t.lanes = h, t;
        case he:
        case O:
          return t = f | 32, t = vn(30, r, n, t), t.elementType = O, t.lanes = h, t.stateNode = { autoName: null, paired: null, clones: null, ref: null }, t;
        default:
          if (typeof u == "object" && u !== null)
            switch (u.$$typeof) {
              case D:
                w = 10;
                break e;
              case j:
                w = 9;
                break e;
              case H:
                w = 11;
                break e;
              case F:
                w = 14;
                break e;
              case _:
                w = 16, u = null;
                break e;
            }
          w = 29, r = Error(a(130, t === null ? "null" : typeof t, "")), u = null;
      }
    return n = vn(w, r, n, f), n.elementType = t, n.type = u, n.lanes = h, n;
  }
  function er(t, n, r, u) {
    return t = vn(7, t, u, n), t.lanes = r, t;
  }
  function Uf(t, n, r) {
    return t = vn(6, t, null, n), t.lanes = r, t;
  }
  function Yg(t) {
    var n = vn(18, null, null, 0);
    return n.stateNode = t, n;
  }
  function If(t, n, r) {
    return n = vn(4, t.children !== null ? t.children : [], t.key, n), n.lanes = r, n.stateNode = { containerInfo: t.containerInfo, pendingChildren: null, implementation: t.implementation }, n;
  }
  var Xg = /* @__PURE__ */ new WeakMap();
  function Xn(t, n) {
    if (typeof t == "object" && t !== null) {
      var r = Xg.get(t);
      return r !== void 0 ? r : (n = { value: t, source: n, stack: Ke(n) }, Xg.set(t, n), n);
    }
    return { value: t, source: n, stack: Ke(n) };
  }
  var Kr = [], Pr = 0, Qo = null, uu = 0, Gn = [], $n = 0, hl = null, xi = 1, vi = "";
  function Xi(t, n) {
    Kr[Pr++] = uu, Kr[Pr++] = Qo, Qo = t, uu = n;
  }
  function Gg(t, n, r) {
    Gn[$n++] = xi, Gn[$n++] = vi, Gn[$n++] = hl, hl = t;
    var u = xi;
    t = vi;
    var f = 32 - Pt(u) - 1;
    u &= ~(1 << f), r += 1;
    var h = 32 - Pt(n) + f;
    if (30 < h) {
      var w = f - f % 5;
      h = (u & (1 << w) - 1).toString(32), u >>= w, f -= w, xi = 1 << 32 - Pt(n) + f | r << f | u, vi = h + t;
    } else
      xi = 1 << h | r << f | u, vi = t;
  }
  function Zo(t) {
    t.return !== null && (Xi(t, 1), Gg(t, 1, 0));
  }
  function qf(t) {
    for (; t === Qo; )
      Qo = Kr[--Pr], Kr[Pr] = null, uu = Kr[--Pr], Kr[Pr] = null;
    for (; t === hl; )
      hl = Gn[--$n], Gn[$n] = null, vi = Gn[--$n], Gn[$n] = null, xi = Gn[--$n], Gn[$n] = null;
  }
  function $g(t, n) {
    Gn[$n++] = xi, Gn[$n++] = vi, Gn[$n++] = hl, xi = n.id, vi = n.overflow, hl = t;
  }
  var Jt = null, kt = null, We = false, ml = null, Qn = false, Vf = Error(a(519));
  function pl(t) {
    var n = Error(a(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
    throw ou(Xn(n, t)), Vf;
  }
  function Qg(t) {
    var n = t.stateNode, r = t.type, u = t.memoizedProps;
    switch (n[ht] = t, n[hn] = u, r) {
      case "dialog":
        it("cancel", n), it("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        it("load", n);
        break;
      case "video":
      case "audio":
        for (r = 0; r < Au.length; r++)
          it(Au[r], n);
        break;
      case "source":
        it("error", n);
        break;
      case "img":
      case "image":
      case "link":
        it("error", n), it("load", n);
        break;
      case "details":
        it("toggle", n);
        break;
      case "input":
        it("invalid", n), rg(n, u.value, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name, true);
        break;
      case "select":
        it("invalid", n);
        break;
      case "textarea":
        it("invalid", n), ug(n, u.value, u.defaultValue, u.children);
    }
    r = u.children, typeof r != "string" && typeof r != "number" && typeof r != "bigint" || n.textContent === "" + r || u.suppressHydrationWarning === true || m1(n.textContent, r) ? (u.popover != null && (it("beforetoggle", n), it("toggle", n)), u.onScroll != null && it("scroll", n), u.onScrollEnd != null && it("scrollend", n), u.onClick != null && (n.onclick = yi), n = true) : n = false, n || pl(t, true);
  }
  function Fo(t) {
    for (Jt = t.return; Jt; )
      switch (Jt.tag) {
        case 5:
        case 31:
        case 13:
          Qn = false;
          return;
        case 27:
        case 3:
          Qn = true;
          return;
        default:
          Jt = Jt.return;
      }
  }
  function Jr(t) {
    if (t !== Jt)
      return false;
    if (!We)
      return Fo(t), We = true, false;
    var n = t.tag, r;
    if ((r = n !== 3 && n !== 27) && ((r = n === 5) && (r = t.type, r = !(r !== "form" && r !== "button") || xh(t.type, t.memoizedProps)), r = !r), r && kt && pl(t), Fo(t), n === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
        throw Error(a(317));
      kt = D1(t);
    } else if (n === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t)
        throw Error(a(317));
      kt = D1(t);
    } else
      n === 27 ? (n = kt, Ml(t.type) ? (t = _h, _h = null, kt = t) : kt = n) : kt = Jt ? Fn(t.stateNode.nextSibling) : null;
    return true;
  }
  function tr() {
    kt = Jt = null, We = false;
  }
  function Yf() {
    var t = ml;
    return t !== null && (Sn === null ? Sn = t : Sn.push.apply(Sn, t), ml = null), t;
  }
  function ou(t) {
    ml === null ? ml = [t] : ml.push(t);
  }
  var Xf = Ae(null), nr = null, Gi = null;
  function gl(t, n, r) {
    qe(Xf, n._currentValue), n._currentValue = r;
  }
  function $i(t) {
    t._currentValue = Xf.current, Ee(Xf);
  }
  function Ko(t, n, r) {
    for (; t !== null; ) {
      var u = t.alternate;
      if ((t.childLanes & n) !== n ? (t.childLanes |= n, u !== null && (u.childLanes |= n)) : u !== null && (u.childLanes & n) !== n && (u.childLanes |= n), t === r)
        break;
      t = t.return;
    }
  }
  function Gf(t, n, r, u) {
    var f = t.child;
    for (f !== null && (f.return = t); f !== null; ) {
      var h = f.dependencies;
      if (h !== null) {
        var w = f.child;
        h = h.firstContext;
        e: for (; h !== null; ) {
          var z = h;
          h = f;
          for (var I = 0; I < n.length; I++)
            if (z.context === n[I]) {
              h.lanes |= r, z = h.alternate, z !== null && (z.lanes |= r), Ko(h.return, r, t), u || (w = null);
              break e;
            }
          h = z.next;
        }
      } else if (f.tag === 18) {
        if (w = f.return, w === null)
          throw Error(a(341));
        w.lanes |= r, h = w.alternate, h !== null && (h.lanes |= r), Ko(w, r, t), w = null;
      } else
        f.tag === 13 && f.memoizedState !== null && f.memoizedState.dehydrated === null ? (f.lanes |= r, w = f.alternate, w !== null && (w.lanes |= r), Ko(f.return, r, t), w = f.child, w = w !== null ? w.sibling : null) : w = f.child;
      if (w !== null)
        w.return = f;
      else
        for (w = f; w !== null; ) {
          if (w === t) {
            w = null;
            break;
          }
          if (f = w.sibling, f !== null) {
            f.return = w.return, w = f;
            break;
          }
          w = w.return;
        }
      f = w;
    }
  }
  function ir(t, n, r, u) {
    t = null;
    for (var f = n, h = false; f !== null; ) {
      if (!h) {
        if ((f.flags & 524288) !== 0)
          h = true;
        else if ((f.flags & 262144) !== 0)
          break;
      }
      if (f.tag === 10) {
        var w = f.alternate;
        if (w === null)
          throw Error(a(387));
        if (w = w.memoizedProps, w !== null) {
          var z = f.type;
          Tn(f.pendingProps.value, w.value) || (t !== null ? t.push(z) : t = [z]);
        }
      } else if (f === Lt.current) {
        if (w = f.alternate, w === null)
          throw Error(a(387));
        w.memoizedState.memoizedState !== f.memoizedState.memoizedState && (t !== null ? t.push(Ea) : t = [Ea]);
      }
      f = f.return;
    }
    return t !== null && Gf(n, t, r, u), n.flags |= 262144, t !== null;
  }
  function Po(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Tn(t.context._currentValue, t.memoizedValue))
        return true;
      t = t.next;
    }
    return false;
  }
  function lr(t) {
    nr = t, Gi = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ln(t) {
    return Zg(nr, t);
  }
  function Jo(t, n) {
    return nr === null && lr(t), Zg(t, n);
  }
  function Zg(t, n) {
    var r = n._currentValue;
    if (n = { context: n, memoizedValue: r, next: null }, Gi === null) {
      if (t === null)
        throw Error(a(308));
      Gi = n, t.dependencies = { lanes: 0, firstContext: n }, t.flags |= 524288;
    } else
      Gi = Gi.next = n;
    return r;
  }
  var tC = typeof AbortController < "u" ? AbortController : function() {
    var t = [], n = this.signal = { aborted: false, addEventListener: function(r, u) {
      t.push(u);
    } };
    this.abort = function() {
      n.aborted = true, t.forEach(function(r) {
        return r();
      });
    };
  }, nC = e12.unstable_scheduleCallback, iC = e12.unstable_NormalPriority, Vt = { $$typeof: D, Consumer: null, Provider: null, _currentValue: null, _currentValue2: null, _threadCount: 0 };
  function $f() {
    return { controller: new tC(), data: /* @__PURE__ */ new Map(), refCount: 0 };
  }
  function su(t) {
    t.refCount--, t.refCount === 0 && nC(iC, function() {
      t.controller.abort();
    });
  }
  function Fg(t, n) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var r = t.transitionTypes;
      for (r === null && (r = t.transitionTypes = []), t = 0; t < n.length; t++) {
        var u = n[t];
        r.indexOf(u) === -1 && r.push(u);
      }
    }
  }
  var cu = null;
  function lC(t) {
    var n = t.transitionTypes;
    return t.transitionTypes = null, n;
  }
  var fu = null, Qf = 0, rr = 0, Wr = null;
  function rC(t, n) {
    if (fu === null) {
      var r = fu = [];
      Qf = 0, rr = sh(), Wr = { status: "pending", value: void 0, then: function(u) {
        r.push(u);
      } };
    }
    return Qf++, n.then(Kg, Kg), n;
  }
  function Kg() {
    if (--Qf === 0 && (cu = null, fu !== null)) {
      Wr !== null && (Wr.status = "fulfilled");
      var t = fu;
      fu = null, rr = 0, Wr = null;
      for (var n = 0; n < t.length; n++)
        (0, t[n])();
    }
  }
  function aC(t, n) {
    var r = [], u = { status: "pending", value: null, reason: null, then: function(f) {
      r.push(f);
    } };
    return t.then(function() {
      u.status = "fulfilled", u.value = n;
      for (var f = 0; f < r.length; f++)
        (0, r[f])(n);
    }, function(f) {
      for (u.status = "rejected", u.reason = f, f = 0; f < r.length; f++)
        (0, r[f])(void 0);
    }), u;
  }
  var Pg = fe.S;
  fe.S = function(t, n) {
    if (Yy = bt(), typeof n == "object" && n !== null && typeof n.then == "function" && rC(t, n), cu !== null)
      for (var r = ya; r !== null; )
        Fg(r, cu), r = r.next;
    if (r = t.types, r !== null) {
      for (var u = ya; u !== null; )
        Fg(u, r), u = u.next;
      if (rr !== 0) {
        u = cu, u === null && (u = cu = []);
        for (var f = 0; f < r.length; f++) {
          var h = r[f];
          u.indexOf(h) === -1 && u.push(h);
        }
      }
    }
    Pg !== null && Pg(t, n);
  };
  var ar = Ae(null);
  function Zf() {
    var t = ar.current;
    return t !== null ? t : St.pooledCache;
  }
  function Wo(t, n) {
    n === null ? qe(ar, ar.current) : qe(ar, n.pool);
  }
  function Jg() {
    var t = Zf();
    return t === null ? null : { parent: Vt._currentValue, pool: t };
  }
  var ea = Error(a(460)), Ff = Error(a(474)), es = Error(a(542)), ts = { then: function() {
  } };
  function Wg(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function e0(t, n, r) {
    switch (r = t[r], r === void 0 ? t.push(n) : r !== n && (n.then(yi, yi), n = r), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw t = n.reason, n0(t), t === void 0 && !("reason" in n) ? Error(a(600)) : t;
      default:
        if (typeof n.status == "string")
          n.then(yi, yi);
        else {
          if (t = St, t !== null && 100 < t.shellSuspendCounter)
            throw Error(a(482));
          t = n, t.status = "pending", t.then(function(u) {
            if (n.status === "pending") {
              var f = n;
              f.status = "fulfilled", f.value = u;
            }
          }, function(u) {
            if (n.status === "pending") {
              var f = n;
              f.status = "rejected", f.reason = u;
            }
          });
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw t = n.reason, n0(t), t;
        }
        throw or = n, ea;
    }
  }
  function ur(t) {
    try {
      var n = t._init;
      return n(t._payload);
    } catch (r) {
      throw r !== null && typeof r == "object" && typeof r.then == "function" ? (or = r, ea) : r;
    }
  }
  var or = null;
  function t0() {
    if (or === null)
      throw Error(a(459));
    var t = or;
    return or = null, t;
  }
  function n0(t) {
    if (t === ea || t === es)
      throw Error(a(483));
  }
  var ta = null, du = 0;
  function ns(t) {
    var n = du;
    return du += 1, ta === null && (ta = []), e0(ta, t, n);
  }
  function yl(t, n) {
    n = n.props.ref, t.ref = n !== void 0 ? n : null;
  }
  function is(t, n) {
    throw n.$$typeof === G ? Error(a(525)) : (t = Object.prototype.toString.call(n), Error(a(31, t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t)));
  }
  function i0(t) {
    function n(W, Q) {
      if (t) {
        var le = W.deletions;
        le === null ? (W.deletions = [Q], W.flags |= 16) : le.push(Q);
      }
    }
    function r(W, Q) {
      if (!t)
        return null;
      for (; Q !== null; )
        n(W, Q), Q = Q.sibling;
      return null;
    }
    function u(W) {
      for (var Q = /* @__PURE__ */ new Map(); W !== null; )
        W.key === null ? Q.set(W.index, W) : Q.set(W.key, W), W = W.sibling;
      return Q;
    }
    function f(W, Q) {
      return W = Yi(W, Q), W.index = 0, W.sibling = null, W;
    }
    function h(W, Q, le) {
      return W.index = le, t ? (le = W.alternate, le !== null ? (le = le.index, le < Q ? (W.flags |= 2, Q) : le) : (W.flags |= 134217730, Q)) : (W.flags |= 1048576, Q);
    }
    function w(W) {
      return t && W.alternate === null && (W.flags |= 134217730), W;
    }
    function z(W, Q, le, ye) {
      return Q === null || Q.tag !== 6 ? (Q = Uf(le, W.mode, ye), Q.return = W, Q) : (Q = f(Q, le), Q.return = W, Q);
    }
    function I(W, Q, le, ye) {
      var De = le.type;
      return De === X ? (W = oe(W, Q, le.props.children, ye, le.key), yl(W, le), W) : Q !== null && (Q.elementType === De || typeof De == "object" && De !== null && De.$$typeof === _ && ur(De) === Q.type) ? (Q = f(Q, le.props), yl(Q, le), Q.return = W, Q) : (Q = $o(le.type, le.key, le.props, null, W.mode, ye), yl(Q, le), Q.return = W, Q);
    }
    function ee(W, Q, le, ye) {
      return Q === null || Q.tag !== 4 || Q.stateNode.containerInfo !== le.containerInfo || Q.stateNode.implementation !== le.implementation ? (Q = If(le, W.mode, ye), Q.return = W, Q) : (Q = f(Q, le.children || []), Q.return = W, Q);
    }
    function oe(W, Q, le, ye, De) {
      return Q === null || Q.tag !== 7 ? (Q = er(le, W.mode, ye, De), Q.return = W, Q) : (Q = f(Q, le), Q.return = W, Q);
    }
    function ve(W, Q, le) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number" || typeof Q == "bigint")
        return Q = Uf("" + Q, W.mode, le), Q.return = W, Q;
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case J:
            return le = $o(Q.type, Q.key, Q.props, null, W.mode, le), yl(le, Q), le.return = W, le;
          case U:
            return Q = If(Q, W.mode, le), Q.return = W, Q;
          case _:
            return Q = ur(Q), ve(W, Q, le);
        }
        if (Se(Q) || me(Q))
          return Q = er(Q, W.mode, le, null), Q.return = W, Q;
        if (typeof Q.then == "function")
          return ve(W, ns(Q), le);
        if (Q.$$typeof === D)
          return ve(W, Jo(W, Q), le);
        is(W, Q);
      }
      return null;
    }
    function P(W, Q, le, ye) {
      var De = Q !== null ? Q.key : null;
      if (typeof le == "string" && le !== "" || typeof le == "number" || typeof le == "bigint")
        return De !== null ? null : z(W, Q, "" + le, ye);
      if (typeof le == "object" && le !== null) {
        switch (le.$$typeof) {
          case J:
            return le.key === De ? I(W, Q, le, ye) : null;
          case U:
            return le.key === De ? ee(W, Q, le, ye) : null;
          case _:
            return le = ur(le), P(W, Q, le, ye);
        }
        if (Se(le) || me(le))
          return De !== null ? null : oe(W, Q, le, ye, null);
        if (typeof le.then == "function")
          return P(W, Q, ns(le), ye);
        if (le.$$typeof === D)
          return P(W, Q, Jo(W, le), ye);
        is(W, le);
      }
      return null;
    }
    function ae(W, Q, le, ye, De) {
      if (typeof ye == "string" && ye !== "" || typeof ye == "number" || typeof ye == "bigint")
        return W = W.get(le) || null, z(Q, W, "" + ye, De);
      if (typeof ye == "object" && ye !== null) {
        switch (ye.$$typeof) {
          case J:
            return W = W.get(ye.key === null ? le : ye.key) || null, I(Q, W, ye, De);
          case U:
            return W = W.get(ye.key === null ? le : ye.key) || null, ee(Q, W, ye, De);
          case _:
            return ye = ur(ye), ae(W, Q, le, ye, De);
        }
        if (Se(ye) || me(ye))
          return W = W.get(le) || null, oe(Q, W, ye, De, null);
        if (typeof ye.then == "function")
          return ae(W, Q, le, ns(ye), De);
        if (ye.$$typeof === D)
          return ae(W, Q, le, Jo(Q, ye), De);
        is(Q, ye);
      }
      return null;
    }
    function Me(W, Q, le, ye) {
      for (var De = null, at = null, Be = Q, Ge = Q = 0, Gt = null; Be !== null && Ge < le.length; Ge++) {
        Be.index > Ge ? (Gt = Be, Be = null) : Gt = Be.sibling;
        var ut = P(W, Be, le[Ge], ye);
        if (ut === null) {
          Be === null && (Be = Gt);
          break;
        }
        t && Be && ut.alternate === null && n(W, Be), Q = h(ut, Q, Ge), at === null ? De = ut : at.sibling = ut, at = ut, Be = Gt;
      }
      if (Ge === le.length)
        return r(W, Be), We && Xi(W, Ge), De;
      if (Be === null) {
        for (; Ge < le.length; Ge++)
          Be = ve(W, le[Ge], ye), Be !== null && (Q = h(Be, Q, Ge), at === null ? De = Be : at.sibling = Be, at = Be);
        return We && Xi(W, Ge), De;
      }
      for (Be = u(Be); Ge < le.length; Ge++)
        Gt = ae(Be, W, Ge, le[Ge], ye), Gt !== null && (t && (ut = Gt.alternate, ut !== null && Be.delete(ut.key === null ? Ge : ut.key)), Q = h(Gt, Q, Ge), at === null ? De = Gt : at.sibling = Gt, at = Gt);
      return t && Be.forEach(function(Ll) {
        return n(W, Ll);
      }), We && Xi(W, Ge), De;
    }
    function Oe(W, Q, le, ye) {
      if (le == null)
        throw Error(a(151));
      for (var De = null, at = null, Be = Q, Ge = Q = 0, Gt = null, ut = le.next(); Be !== null && !ut.done; Ge++, ut = le.next()) {
        Be.index > Ge ? (Gt = Be, Be = null) : Gt = Be.sibling;
        var Ll = P(W, Be, ut.value, ye);
        if (Ll === null) {
          Be === null && (Be = Gt);
          break;
        }
        t && Be && Ll.alternate === null && n(W, Be), Q = h(Ll, Q, Ge), at === null ? De = Ll : at.sibling = Ll, at = Ll, Be = Gt;
      }
      if (ut.done)
        return r(W, Be), We && Xi(W, Ge), De;
      if (Be === null) {
        for (; !ut.done; Ge++, ut = le.next())
          ut = ve(W, ut.value, ye), ut !== null && (Q = h(ut, Q, Ge), at === null ? De = ut : at.sibling = ut, at = ut);
        return We && Xi(W, Ge), De;
      }
      for (Be = u(Be); !ut.done; Ge++, ut = le.next())
        ut = ae(Be, W, Ge, ut.value, ye), ut !== null && (t && (Gt = ut.alternate, Gt !== null && Be.delete(Gt.key === null ? Ge : Gt.key)), Q = h(ut, Q, Ge), at === null ? De = ut : at.sibling = ut, at = ut);
      return t && Be.forEach(function(Ik) {
        return n(W, Ik);
      }), We && Xi(W, Ge), De;
    }
    function Je(W, Q, le, ye) {
      if (typeof le == "object" && le !== null && le.type === X && le.key === null && le.props.ref === void 0 && (le = le.props.children), typeof le == "object" && le !== null) {
        switch (le.$$typeof) {
          case J:
            e: {
              for (var De = le.key; Q !== null; ) {
                if (Q.key === De) {
                  if (De = le.type, De === X) {
                    if (Q.tag === 7) {
                      r(W, Q.sibling), ye = f(Q, le.props.children), yl(ye, le), ye.return = W, W = ye;
                      break e;
                    }
                  } else if (Q.elementType === De || typeof De == "object" && De !== null && De.$$typeof === _ && ur(De) === Q.type) {
                    r(W, Q.sibling), ye = f(Q, le.props), yl(ye, le), ye.return = W, W = ye;
                    break e;
                  }
                  r(W, Q);
                  break;
                } else
                  n(W, Q);
                Q = Q.sibling;
              }
              le.type === X ? (ye = er(le.props.children, W.mode, ye, le.key), yl(ye, le), ye.return = W, W = ye) : (ye = $o(le.type, le.key, le.props, null, W.mode, ye), yl(ye, le), ye.return = W, W = ye);
            }
            return w(W);
          case U:
            e: {
              for (De = le.key; Q !== null; ) {
                if (Q.key === De)
                  if (Q.tag === 4 && Q.stateNode.containerInfo === le.containerInfo && Q.stateNode.implementation === le.implementation) {
                    r(W, Q.sibling), ye = f(Q, le.children || []), ye.return = W, W = ye;
                    break e;
                  } else {
                    r(W, Q);
                    break;
                  }
                else
                  n(W, Q);
                Q = Q.sibling;
              }
              ye = If(le, W.mode, ye), ye.return = W, W = ye;
            }
            return w(W);
          case _:
            return le = ur(le), Je(W, Q, le, ye);
        }
        if (Se(le))
          return Me(W, Q, le, ye);
        if (me(le)) {
          if (De = me(le), typeof De != "function")
            throw Error(a(150));
          return le = De.call(le), Oe(W, Q, le, ye);
        }
        if (typeof le.then == "function")
          return Je(W, Q, ns(le), ye);
        if (le.$$typeof === D)
          return Je(W, Q, Jo(W, le), ye);
        is(W, le);
      }
      return typeof le == "string" && le !== "" || typeof le == "number" || typeof le == "bigint" ? (le = "" + le, Q !== null && Q.tag === 6 ? (r(W, Q.sibling), ye = f(Q, le), ye.return = W, W = ye) : (r(W, Q), ye = Uf(le, W.mode, ye), ye.return = W, W = ye), w(W)) : r(W, Q);
    }
    return function(W, Q, le, ye) {
      try {
        du = 0;
        var De = Je(W, Q, le, ye);
        return ta = null, De;
      } catch (Be) {
        if (Be === ea || Be === es)
          throw Be;
        var at = vn(29, Be, null, W.mode);
        return at.lanes = ye, at.return = W, at;
      } finally {
      }
    };
  }
  var sr = i0(true), l0 = i0(false), xl = false;
  function Kf(t) {
    t.updateQueue = { baseState: t.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, lanes: 0, hiddenCallbacks: null }, callbacks: null };
  }
  function Pf(t, n) {
    t = t.updateQueue, n.updateQueue === t && (n.updateQueue = { baseState: t.baseState, firstBaseUpdate: t.firstBaseUpdate, lastBaseUpdate: t.lastBaseUpdate, shared: t.shared, callbacks: null });
  }
  function vl(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function bl(t, n, r) {
    var u = t.updateQueue;
    if (u === null)
      return null;
    if (u = u.shared, (dt & 2) !== 0) {
      var f = u.pending;
      return f === null ? n.next = n : (n.next = f.next, f.next = n), u.pending = n, n = Go(t), qg(t, null, r), n;
    }
    return Xo(t, u, n, r), Go(t);
  }
  function hu(t, n, r) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (r & 4194048) !== 0)) {
      var u = n.lanes;
      u &= t.pendingLanes, r |= u, n.lanes = r, ze(t, r);
    }
  }
  function Jf(t, n) {
    var r = t.updateQueue, u = t.alternate;
    if (u !== null && (u = u.updateQueue, r === u)) {
      var f = null, h = null;
      if (r = r.firstBaseUpdate, r !== null) {
        do {
          var w = { lane: r.lane, tag: r.tag, payload: r.payload, callback: null, next: null };
          h === null ? f = h = w : h = h.next = w, r = r.next;
        } while (r !== null);
        h === null ? f = h = n : h = h.next = n;
      } else
        f = h = n;
      r = { baseState: u.baseState, firstBaseUpdate: f, lastBaseUpdate: h, shared: u.shared, callbacks: u.callbacks }, t.updateQueue = r;
      return;
    }
    t = r.lastBaseUpdate, t === null ? r.firstBaseUpdate = n : t.next = n, r.lastBaseUpdate = n;
  }
  var Wf = false;
  function mu() {
    if (Wf) {
      var t = Wr;
      if (t !== null)
        throw t;
    }
  }
  function pu(t, n, r, u) {
    Wf = false;
    var f = t.updateQueue;
    xl = false;
    var h = f.firstBaseUpdate, w = f.lastBaseUpdate, z = f.shared.pending;
    if (z !== null) {
      f.shared.pending = null;
      var I = z, ee = I.next;
      I.next = null, w === null ? h = ee : w.next = ee, w = I;
      var oe = t.alternate;
      oe !== null && (oe = oe.updateQueue, z = oe.lastBaseUpdate, z !== w && (z === null ? oe.firstBaseUpdate = ee : z.next = ee, oe.lastBaseUpdate = I));
    }
    if (h !== null) {
      var ve = f.baseState;
      w = 0, oe = ee = I = null, z = h;
      do {
        var P = z.lane & -536870913, ae = P !== z.lane;
        if (ae ? (rt & P) === P : (u & P) === P) {
          P !== 0 && P === rr && (Wf = true), oe !== null && (oe = oe.next = { lane: 0, tag: z.tag, payload: z.payload, callback: null, next: null });
          e: {
            var Me = t, Oe = z;
            P = n;
            var Je = r;
            switch (Oe.tag) {
              case 1:
                if (Me = Oe.payload, typeof Me == "function") {
                  ve = Me.call(Je, ve, P);
                  break e;
                }
                ve = Me;
                break e;
              case 3:
                Me.flags = Me.flags & -65537 | 128;
              case 0:
                if (Me = Oe.payload, P = typeof Me == "function" ? Me.call(Je, ve, P) : Me, P == null)
                  break e;
                ve = B({}, ve, P);
                break e;
              case 2:
                xl = true;
            }
          }
          P = z.callback, P !== null && (t.flags |= 64, ae && (t.flags |= 8192), ae = f.callbacks, ae === null ? f.callbacks = [P] : ae.push(P));
        } else
          ae = { lane: P, tag: z.tag, payload: z.payload, callback: z.callback, next: null }, oe === null ? (ee = oe = ae, I = ve) : oe = oe.next = ae, w |= P;
        if (z = z.next, z === null) {
          if (z = f.shared.pending, z === null)
            break;
          ae = z, z = ae.next, ae.next = null, f.lastBaseUpdate = ae, f.shared.pending = null;
        }
      } while (true);
      oe === null && (I = ve), f.baseState = I, f.firstBaseUpdate = ee, f.lastBaseUpdate = oe, h === null && (f.shared.lanes = 0), _l |= w, t.lanes = w, t.memoizedState = ve;
    }
  }
  function r0(t, n) {
    if (typeof t != "function")
      throw Error(a(191, t));
    t.call(n);
  }
  function a0(t, n) {
    var r = t.callbacks;
    if (r !== null)
      for (t.callbacks = null, t = 0; t < r.length; t++)
        r0(r[t], n);
  }
  var wl = Ae(null), ls = Ae(0);
  function u0(t, n) {
    t = Pi, qe(ls, t), qe(wl, n), Pi = t | n.baseLanes;
  }
  function ed() {
    qe(ls, Pi), qe(wl, wl.current);
  }
  function td() {
    Pi = ls.current, Ee(wl), Ee(ls);
  }
  var rn = Ae(null), mn = null;
  function Sl(t) {
    var n = t.alternate;
    qe(an, an.current & 1), qe(rn, t), mn === null && (n === null || wl.current !== null || n.memoizedState !== null) && (mn = t);
  }
  function nd(t) {
    qe(an, an.current), qe(rn, t), mn === null && (mn = t);
  }
  function o0(t) {
    t.tag === 22 ? (qe(an, an.current), qe(rn, t), mn === null && (mn = t)) : El();
  }
  function El() {
    qe(an, an.current), qe(rn, rn.current);
  }
  function An(t) {
    Ee(rn), mn === t && (mn = null), Ee(an);
  }
  var an = Ae(0);
  function gu(t, n) {
    qe(rn, rn.current), qe(an, n);
  }
  function id(t) {
    Ee(an), Ee(rn), mn === t && (mn = null);
  }
  function rs(t) {
    for (var n = t; n !== null; ) {
      if (n.tag === 13) {
        var r = n.memoizedState;
        if (r !== null && (r = r.dehydrated, r === null || kh(r) || Nh(r)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== "independent") {
        if ((n.flags & 128) !== 0)
          return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === t)
        break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === t)
          return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  var Qi = 0, Pe = null, wt = null, Yt = null, as = false, na = false, cr = false, us = 0, yu = 0, ia = null, uC = 0;
  function Ot() {
    throw Error(a(321));
  }
  function ld(t, n) {
    if (n === null)
      return false;
    for (var r = 0; r < n.length && r < t.length; r++)
      if (!Tn(t[r], n[r]))
        return false;
    return true;
  }
  function rd(t, n, r, u, f, h) {
    return Qi = h, Pe = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, fe.H = t === null || t.memoizedState === null ? G0 : $0, cr = false, h = r(u, f), cr = false, na && (h = c0(n, r, u, f)), s0(t), h;
  }
  function s0(t) {
    fe.H = ms;
    var n = wt !== null && wt.next !== null;
    if (Qi = 0, Yt = wt = Pe = null, as = false, yu = 0, ia = null, n)
      throw Error(a(300));
    t === null || Xt || (t = t.dependencies, t !== null && Po(t) && (Xt = true));
  }
  function c0(t, n, r, u) {
    Pe = t;
    var f = 0;
    do {
      if (na && (ia = null), yu = 0, na = false, 25 <= f)
        throw Error(a(301));
      if (f += 1, Yt = wt = null, t.updateQueue != null) {
        var h = t.updateQueue;
        h.lastEffect = null, h.events = null, h.stores = null, h.memoCache != null && (h.memoCache.index = 0);
      }
      fe.H = pC, h = n(r, u);
    } while (na);
    return h;
  }
  function oC() {
    var t = fe.H, n = t.useState()[0];
    return n = typeof n.then == "function" ? xu(n) : n, t = t.useState()[0], (wt !== null ? wt.memoizedState : null) !== t && (Pe.flags |= 1024), n;
  }
  function ad() {
    var t = us !== 0;
    return us = 0, t;
  }
  function ud(t, n, r) {
    n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~r;
  }
  function od(t) {
    if (as) {
      for (t = t.memoizedState; t !== null; ) {
        var n = t.queue;
        n !== null && (n.pending = null), t = t.next;
      }
      as = false;
    }
    Qi = 0, Yt = wt = Pe = null, na = false, yu = us = 0, ia = null;
  }
  function gn() {
    var t = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Yt === null ? Pe.memoizedState = Yt = t : Yt = Yt.next = t, Yt;
  }
  function Ut() {
    if (wt === null) {
      var t = Pe.alternate;
      t = t !== null ? t.memoizedState : null;
    } else
      t = wt.next;
    var n = Yt === null ? Pe.memoizedState : Yt.next;
    if (n !== null)
      Yt = n, wt = t;
    else {
      if (t === null)
        throw Pe.alternate === null ? Error(a(467)) : Error(a(310));
      wt = t, t = { memoizedState: wt.memoizedState, baseState: wt.baseState, baseQueue: wt.baseQueue, queue: wt.queue, next: null }, Yt === null ? Pe.memoizedState = Yt = t : Yt = Yt.next = t;
    }
    return Yt;
  }
  function os() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function xu(t) {
    var n = yu;
    return yu += 1, ia === null && (ia = []), t = e0(ia, t, n), n = Pe, (Yt === null ? n.memoizedState : Yt.next) === null && (n = n.alternate, fe.H = n === null || n.memoizedState === null ? G0 : $0), t;
  }
  function ss(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function")
        return xu(t);
      if (t.$$typeof === te)
        return;
      if (t.$$typeof === D)
        return ln(t);
    }
    throw Error(a(438, String(t)));
  }
  function sd(t) {
    var n = null, r = Pe.updateQueue;
    if (r !== null && (n = r.memoCache), n == null) {
      var u = Pe.alternate;
      u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (n = { data: u.data.map(function(f) {
        return f.slice();
      }), index: 0 })));
    }
    if (n == null && (n = { data: [], index: 0 }), r === null && (r = os(), Pe.updateQueue = r), r.memoCache = n, r = n.data[n.index], r === void 0)
      for (r = n.data[n.index] = Array(t), u = 0; u < t; u++)
        r[u] = R;
    return n.index++, r;
  }
  function Zi(t, n) {
    return typeof n == "function" ? n(t) : n;
  }
  function cs(t) {
    var n = Ut();
    return cd(n, wt, t);
  }
  function cd(t, n, r) {
    var u = t.queue;
    if (u === null)
      throw Error(a(311));
    u.lastRenderedReducer = r;
    var f = t.baseQueue, h = u.pending;
    if (h !== null) {
      if (f !== null) {
        var w = f.next;
        f.next = h.next, h.next = w;
      }
      n.baseQueue = f = h, u.pending = null;
    }
    if (h = t.baseState, f === null)
      t.memoizedState = h;
    else {
      n = f.next;
      var z = w = null, I = null, ee = n, oe = false;
      do {
        var ve = ee.lane & -536870913;
        if (ve !== ee.lane ? (rt & ve) === ve : (Qi & ve) === ve) {
          var P = ee.revertLane;
          if (P === 0)
            I !== null && (I = I.next = { lane: 0, revertLane: 0, gesture: null, action: ee.action, hasEagerState: ee.hasEagerState, eagerState: ee.eagerState, next: null }), ve === rr && (oe = true);
          else if ((Qi & P) === P) {
            ee = ee.next, P === rr && (oe = true);
            continue;
          } else
            ve = { lane: 0, revertLane: ee.revertLane, gesture: null, action: ee.action, hasEagerState: ee.hasEagerState, eagerState: ee.eagerState, next: null }, I === null ? (z = I = ve, w = h) : I = I.next = ve, Pe.lanes |= P, _l |= P;
          ve = ee.action, cr && r(h, ve), h = ee.hasEagerState ? ee.eagerState : r(h, ve);
        } else
          P = { lane: ve, revertLane: ee.revertLane, gesture: ee.gesture, action: ee.action, hasEagerState: ee.hasEagerState, eagerState: ee.eagerState, next: null }, I === null ? (z = I = P, w = h) : I = I.next = P, Pe.lanes |= ve, _l |= ve;
        ee = ee.next;
      } while (ee !== null && ee !== n);
      if (I === null ? w = h : I.next = z, !Tn(h, t.memoizedState) && (Xt = true, oe && (r = Wr, r !== null)))
        throw r;
      t.memoizedState = h, t.baseState = w, t.baseQueue = I, u.lastRenderedState = h;
    }
    return f === null && (u.lanes = 0), [t.memoizedState, u.dispatch];
  }
  function fd(t) {
    var n = Ut(), r = n.queue;
    if (r === null)
      throw Error(a(311));
    r.lastRenderedReducer = t;
    var u = r.dispatch, f = r.pending, h = n.memoizedState;
    if (f !== null) {
      r.pending = null;
      var w = f = f.next;
      do
        h = t(h, w.action), w = w.next;
      while (w !== f);
      Tn(h, n.memoizedState) || (Xt = true), n.memoizedState = h, n.baseQueue === null && (n.baseState = h), r.lastRenderedState = h;
    }
    return [h, u];
  }
  function f0(t, n, r) {
    var u = Pe, f = Ut(), h = We;
    if (h) {
      if (r === void 0)
        throw Error(a(407));
      r = r();
    } else
      r = n();
    var w = !Tn((wt || f).memoizedState, r);
    if (w && (f.memoizedState = r, Xt = true), f = f.queue, md(m0.bind(null, u, f, t), [t]), t = f.getSnapshot !== n || w || Yt !== null && (Yt.memoizedState.tag & 1) !== 0, la(t ? 9 : 8, { destroy: void 0 }, h0.bind(null, u, f, r, n), null), t) {
      if (u.flags |= 2048, St === null)
        throw Error(a(349));
      h || (Qi & 127) !== 0 || d0(u, n, r);
    }
    return r;
  }
  function d0(t, n, r) {
    t.flags |= 16384, t = { getSnapshot: n, value: r }, n = Pe.updateQueue, n === null ? (n = os(), Pe.updateQueue = n, n.stores = [t]) : (r = n.stores, r === null ? n.stores = [t] : r.push(t));
  }
  function h0(t, n, r, u) {
    n.value = r, n.getSnapshot = u, p0(n) && g0(t);
  }
  function m0(t, n, r) {
    return r(function() {
      p0(n) && g0(t);
    });
  }
  function p0(t) {
    var n = t.getSnapshot;
    t = t.value;
    try {
      var r = n();
      return !Tn(t, r);
    } catch {
      return true;
    }
  }
  function g0(t) {
    var n = Wl(t, 2);
    n !== null && En(n, t, 2);
  }
  function dd(t) {
    var n = gn();
    if (typeof t == "function") {
      var r = t;
      if (t = r(), cr) {
        Nn(true);
        try {
          r();
        } finally {
          Nn(false);
        }
      }
    }
    return n.memoizedState = n.baseState = t, n.queue = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zi, lastRenderedState: t }, n;
  }
  function y0(t, n, r, u) {
    return t.baseState = r, cd(t, wt, typeof u == "function" ? u : Zi);
  }
  function sC(t, n, r, u, f) {
    if (hs(t))
      throw Error(a(485));
    if (t = n.action, t !== null) {
      var h = { payload: f, action: t, next: null, isTransition: true, status: "pending", value: null, reason: null, listeners: [], then: function(w) {
        h.listeners.push(w);
      } };
      fe.T !== null ? r(true) : h.isTransition = false, u(h), r = n.pending, r === null ? (h.next = n.pending = h, x0(n, h)) : (h.next = r.next, n.pending = r.next = h);
    }
  }
  function x0(t, n) {
    var r = n.action, u = n.payload, f = t.state;
    if (n.isTransition) {
      var h = fe.T, w = {};
      w.types = h !== null ? h.types : null, fe.T = w;
      try {
        var z = r(f, u), I = fe.S;
        I !== null && I(w, z), v0(t, n, z);
      } catch (ee) {
        hd(t, n, ee);
      } finally {
        h !== null && w.types !== null && (h.types = w.types), fe.T = h;
      }
    } else
      try {
        h = r(f, u), v0(t, n, h);
      } catch (ee) {
        hd(t, n, ee);
      }
  }
  function v0(t, n, r) {
    r !== null && typeof r == "object" && typeof r.then == "function" ? r.then(function(u) {
      b0(t, n, u);
    }, function(u) {
      return hd(t, n, u);
    }) : b0(t, n, r);
  }
  function b0(t, n, r) {
    n.status = "fulfilled", n.value = r, w0(n), t.state = r, n = t.pending, n !== null && (r = n.next, r === n ? t.pending = null : (r = r.next, n.next = r, x0(t, r)));
  }
  function hd(t, n, r) {
    var u = t.pending;
    if (t.pending = null, u !== null) {
      u = u.next;
      do
        n.status = "rejected", n.reason = r, w0(n), n = n.next;
      while (n !== u);
    }
    t.action = null;
  }
  function w0(t) {
    t = t.listeners;
    for (var n = 0; n < t.length; n++)
      (0, t[n])();
  }
  function S0(t, n) {
    return n;
  }
  function E0(t, n) {
    if (We) {
      var r = St.formState;
      if (r !== null) {
        e: {
          var u = Pe;
          if (We) {
            if (kt) {
              t: {
                for (var f = kt, h = Qn; f.nodeType !== 8; ) {
                  if (!h) {
                    f = null;
                    break t;
                  }
                  if (f = Fn(f.nextSibling), f === null) {
                    f = null;
                    break t;
                  }
                }
                h = f.data, f = h === "F!" || h === "F" ? f : null;
              }
              if (f) {
                kt = Fn(f.nextSibling), u = f.data === "F!";
                break e;
              }
            }
            pl(u);
          }
          u = false;
        }
        u && (n = r[0]);
      }
    }
    return r = gn(), r.memoizedState = r.baseState = n, u = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: S0, lastRenderedState: n }, r.queue = u, r = V0.bind(null, Pe, u), u.dispatch = r, u = dd(false), h = vd.bind(null, Pe, false, u.queue), u = gn(), f = { state: n, dispatch: null, action: t, pending: null }, u.queue = f, r = sC.bind(null, Pe, f, h, r), f.dispatch = r, u.memoizedState = t, [n, r, false];
  }
  function C0(t) {
    var n = Ut();
    return k0(n, wt, t);
  }
  function k0(t, n, r) {
    if (n = cd(t, n, S0)[0], t = cs(Zi)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var u = xu(n);
      } catch (w) {
        throw w === ea ? es : w;
      }
    else
      u = n;
    n = Ut();
    var f = n.queue, h = f.dispatch;
    return r !== n.memoizedState && (Pe.flags |= 2048, la(9, { destroy: void 0 }, cC.bind(null, f, r), null)), [u, h, t];
  }
  function cC(t, n) {
    t.action = n;
  }
  function N0(t) {
    var n = Ut(), r = wt;
    if (r !== null)
      return k0(n, r, t);
    Ut(), n = n.memoizedState, r = Ut();
    var u = r.queue.dispatch;
    return r.memoizedState = t, [n, u, false];
  }
  function la(t, n, r, u) {
    return t = { tag: t, create: r, deps: u, inst: n, next: null }, n = Pe.updateQueue, n === null && (n = os(), Pe.updateQueue = n), r = n.lastEffect, r === null ? n.lastEffect = t.next = t : (u = r.next, r.next = t, t.next = u, n.lastEffect = t), t;
  }
  function _0() {
    return Ut().memoizedState;
  }
  function fs(t, n, r, u) {
    var f = gn();
    Pe.flags |= t, f.memoizedState = la(1 | n, { destroy: void 0 }, r, u === void 0 ? null : u);
  }
  function ds(t, n, r, u) {
    var f = Ut();
    u = u === void 0 ? null : u;
    var h = f.memoizedState.inst;
    wt !== null && u !== null && ld(u, wt.memoizedState.deps) ? f.memoizedState = la(n, h, r, u) : (Pe.flags |= t, f.memoizedState = la(1 | n, h, r, u));
  }
  function z0(t, n) {
    fs(8390656, 8, t, n);
  }
  function md(t, n) {
    ds(2048, 8, t, n);
  }
  function fC(t) {
    Pe.flags |= 4;
    var n = Pe.updateQueue;
    if (n === null)
      n = os(), Pe.updateQueue = n, n.events = [t];
    else {
      var r = n.events;
      r === null ? n.events = [t] : r.push(t);
    }
  }
  function T0(t) {
    var n = Ut().memoizedState;
    return fC({ ref: n, nextImpl: t }), function() {
      if ((dt & 2) !== 0)
        throw Error(a(440));
      return n.impl.apply(void 0, arguments);
    };
  }
  function A0(t, n) {
    return ds(4, 2, t, n);
  }
  function M0(t, n) {
    return ds(4, 4, t, n);
  }
  function j0(t, n) {
    if (typeof n == "function") {
      t = t();
      var r = n(t);
      return function() {
        typeof r == "function" ? r() : n(null);
      };
    }
    if (n != null)
      return t = t(), n.current = t, function() {
        n.current = null;
      };
  }
  function D0(t, n, r) {
    r = r != null ? r.concat([t]) : null, ds(4, 4, j0.bind(null, n, t), r);
  }
  function pd() {
  }
  function O0(t, n) {
    var r = Ut();
    n = n === void 0 ? null : n;
    var u = r.memoizedState;
    return n !== null && ld(n, u[1]) ? u[0] : (r.memoizedState = [t, n], t);
  }
  function R0(t, n) {
    var r = Ut();
    n = n === void 0 ? null : n;
    var u = r.memoizedState;
    if (n !== null && ld(n, u[1]))
      return u[0];
    if (u = t(), cr) {
      Nn(true);
      try {
        t();
      } finally {
        Nn(false);
      }
    }
    return r.memoizedState = [u, n], u;
  }
  function gd(t, n, r) {
    return r === void 0 || (Qi & 1073741824) !== 0 && (rt & 261930) === 0 ? t.memoizedState = n : (t.memoizedState = r, t = Gy(), Pe.lanes |= t, _l |= t, r);
  }
  function L0(t, n, r, u) {
    return Tn(r, n) ? r : wl.current !== null ? (t = gd(t, r, u), Tn(t, n) || (Xt = true), t) : (Qi & 106) === 0 || (Qi & 1073741824) !== 0 && (rt & 261930) === 0 ? (Xt = true, t.memoizedState = r) : (t = Gy(), Pe.lanes |= t, _l |= t, n);
  }
  function H0(t, n, r, u, f) {
    var h = q.p;
    q.p = h !== 0 && 8 > h ? h : 8;
    var w = fe.T, z = {};
    z.types = w !== null ? w.types : null, fe.T = z, vd(t, false, n, r);
    try {
      var I = f(), ee = fe.S;
      if (ee !== null && ee(z, I), I !== null && typeof I == "object" && typeof I.then == "function") {
        var oe = aC(I, u);
        vu(t, n, oe, On(t));
      } else
        vu(t, n, u, On(t));
    } catch (ve) {
      vu(t, n, { then: function() {
      }, status: "rejected", reason: ve }, On());
    } finally {
      q.p = h, w !== null && z.types !== null && (w.types = z.types), fe.T = w;
    }
  }
  function dC() {
  }
  function yd(t, n, r, u) {
    if (t.tag !== 5)
      throw Error(a(476));
    var f = B0(t).queue;
    H0(t, f, n, we, r === null ? dC : function() {
      return U0(t), r(u);
    });
  }
  function B0(t) {
    var n = t.memoizedState;
    if (n !== null)
      return n;
    n = { memoizedState: we, baseState: we, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zi, lastRenderedState: we }, next: null };
    var r = {};
    return n.next = { memoizedState: r, baseState: r, baseQueue: null, queue: { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: Zi, lastRenderedState: r }, next: null }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n;
  }
  function U0(t) {
    var n = B0(t);
    n.next === null && (n = t.alternate.memoizedState), vu(t, n.next.queue, {}, On());
  }
  function xd() {
    return ln(Ea);
  }
  function I0() {
    return Ut().memoizedState;
  }
  function q0() {
    return Ut().memoizedState;
  }
  function hC(t) {
    for (var n = t.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var r = On();
          t = vl(r);
          var u = bl(n, t, r);
          u !== null && (En(u, n, r), hu(u, n, r)), n = { cache: $f() }, t.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function mC(t, n, r) {
    var u = On();
    r = { lane: u, revertLane: 0, gesture: null, action: r, hasEagerState: false, eagerState: null, next: null }, hs(t) ? Y0(n, r) : (r = Hf(t, n, r, u), r !== null && (En(r, t, u), X0(r, n, u)));
  }
  function V0(t, n, r) {
    var u = On();
    vu(t, n, r, u);
  }
  function vu(t, n, r, u) {
    var f = { lane: u, revertLane: 0, gesture: null, action: r, hasEagerState: false, eagerState: null, next: null };
    if (hs(t))
      Y0(n, f);
    else {
      var h = t.alternate;
      if (t.lanes === 0 && (h === null || h.lanes === 0) && (h = n.lastRenderedReducer, h !== null))
        try {
          var w = n.lastRenderedState, z = h(w, r);
          if (f.hasEagerState = true, f.eagerState = z, Tn(z, w))
            return Xo(t, n, f, 0), St === null && Yo(), false;
        } catch {
        } finally {
        }
      if (r = Hf(t, n, f, u), r !== null)
        return En(r, t, u), X0(r, n, u), true;
    }
    return false;
  }
  function vd(t, n, r, u) {
    if (u = { lane: 2, revertLane: sh(), gesture: null, action: u, hasEagerState: false, eagerState: null, next: null }, hs(t)) {
      if (n)
        throw Error(a(479));
    } else
      n = Hf(t, r, u, 2), n !== null && En(n, t, 2);
  }
  function hs(t) {
    var n = t.alternate;
    return t === Pe || n !== null && n === Pe;
  }
  function Y0(t, n) {
    na = as = true;
    var r = t.pending;
    r === null ? n.next = n : (n.next = r.next, r.next = n), t.pending = n;
  }
  function X0(t, n, r) {
    if ((r & 4194048) !== 0) {
      var u = n.lanes;
      u &= t.pendingLanes, r |= u, n.lanes = r, ze(t, r);
    }
  }
  var ms = { readContext: ln, use: ss, useCallback: Ot, useContext: Ot, useEffect: Ot, useImperativeHandle: Ot, useLayoutEffect: Ot, useInsertionEffect: Ot, useMemo: Ot, useReducer: Ot, useRef: Ot, useState: Ot, useDebugValue: Ot, useDeferredValue: Ot, useTransition: Ot, useSyncExternalStore: Ot, useId: Ot, useHostTransitionStatus: Ot, useFormState: Ot, useActionState: Ot, useOptimistic: Ot, useMemoCache: Ot, useCacheRefresh: Ot, useEffectEvent: Ot }, G0 = { readContext: ln, use: ss, useCallback: function(t, n) {
    return gn().memoizedState = [t, n === void 0 ? null : n], t;
  }, useContext: ln, useEffect: z0, useImperativeHandle: function(t, n, r) {
    r = r != null ? r.concat([t]) : null, fs(4194308, 4, j0.bind(null, n, t), r);
  }, useLayoutEffect: function(t, n) {
    return fs(4194308, 4, t, n);
  }, useInsertionEffect: function(t, n) {
    fs(4, 2, t, n);
  }, useMemo: function(t, n) {
    var r = gn();
    n = n === void 0 ? null : n;
    var u = t();
    if (cr) {
      Nn(true);
      try {
        t();
      } finally {
        Nn(false);
      }
    }
    return r.memoizedState = [u, n], u;
  }, useReducer: function(t, n, r) {
    var u = gn();
    if (r !== void 0) {
      var f = r(n);
      if (cr) {
        Nn(true);
        try {
          r(n);
        } finally {
          Nn(false);
        }
      }
    } else
      f = n;
    return u.memoizedState = u.baseState = f, t = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: t, lastRenderedState: f }, u.queue = t, t = t.dispatch = mC.bind(null, Pe, t), [u.memoizedState, t];
  }, useRef: function(t) {
    var n = gn();
    return t = { current: t }, n.memoizedState = t;
  }, useState: function(t) {
    t = dd(t);
    var n = t.queue, r = V0.bind(null, Pe, n);
    return n.dispatch = r, [t.memoizedState, r];
  }, useDebugValue: pd, useDeferredValue: function(t, n) {
    var r = gn();
    return gd(r, t, n);
  }, useTransition: function() {
    var t = dd(false);
    return t = H0.bind(null, Pe, t.queue, true, false), gn().memoizedState = t, [false, t];
  }, useSyncExternalStore: function(t, n, r) {
    var u = Pe, f = gn();
    if (We) {
      if (r === void 0)
        throw Error(a(407));
      r = r();
    } else {
      if (r = n(), St === null)
        throw Error(a(349));
      (rt & 127) !== 0 || d0(u, n, r);
    }
    f.memoizedState = r;
    var h = { value: r, getSnapshot: n };
    return f.queue = h, z0(m0.bind(null, u, h, t), [t]), u.flags |= 2048, la(9, { destroy: void 0 }, h0.bind(null, u, h, r, n), null), r;
  }, useId: function() {
    var t = gn(), n = St.identifierPrefix;
    if (We) {
      var r = vi, u = xi;
      r = (u & ~(1 << 32 - Pt(u) - 1)).toString(32) + r, n = "_" + n + "R_" + r, r = us++, 0 < r && (n += "H" + r.toString(32)), n += "_";
    } else
      r = uC++, n = "_" + n + "r_" + r.toString(32) + "_";
    return t.memoizedState = n;
  }, useHostTransitionStatus: xd, useFormState: E0, useActionState: E0, useOptimistic: function(t) {
    var n = gn();
    n.memoizedState = n.baseState = t;
    var r = { pending: null, lanes: 0, dispatch: null, lastRenderedReducer: null, lastRenderedState: null };
    return n.queue = r, n = vd.bind(null, Pe, true, r), r.dispatch = n, [t, n];
  }, useMemoCache: sd, useCacheRefresh: function() {
    return gn().memoizedState = hC.bind(null, Pe);
  }, useEffectEvent: function(t) {
    var n = gn(), r = { impl: t };
    return n.memoizedState = r, function() {
      if ((dt & 2) !== 0)
        throw Error(a(440));
      return r.impl.apply(void 0, arguments);
    };
  } }, $0 = { readContext: ln, use: ss, useCallback: O0, useContext: ln, useEffect: md, useImperativeHandle: D0, useInsertionEffect: A0, useLayoutEffect: M0, useMemo: R0, useReducer: cs, useRef: _0, useState: function() {
    return cs(Zi);
  }, useDebugValue: pd, useDeferredValue: function(t, n) {
    var r = Ut();
    return L0(r, wt.memoizedState, t, n);
  }, useTransition: function() {
    var t = cs(Zi)[0], n = Ut().memoizedState;
    return [typeof t == "boolean" ? t : xu(t), n];
  }, useSyncExternalStore: f0, useId: I0, useHostTransitionStatus: xd, useFormState: C0, useActionState: C0, useOptimistic: function(t, n) {
    var r = Ut();
    return y0(r, wt, t, n);
  }, useMemoCache: sd, useCacheRefresh: q0, useEffectEvent: T0 }, pC = { readContext: ln, use: ss, useCallback: O0, useContext: ln, useEffect: md, useImperativeHandle: D0, useInsertionEffect: A0, useLayoutEffect: M0, useMemo: R0, useReducer: fd, useRef: _0, useState: function() {
    return fd(Zi);
  }, useDebugValue: pd, useDeferredValue: function(t, n) {
    var r = Ut();
    return wt === null ? gd(r, t, n) : L0(r, wt.memoizedState, t, n);
  }, useTransition: function() {
    var t = fd(Zi)[0], n = Ut().memoizedState;
    return [typeof t == "boolean" ? t : xu(t), n];
  }, useSyncExternalStore: f0, useId: I0, useHostTransitionStatus: xd, useFormState: N0, useActionState: N0, useOptimistic: function(t, n) {
    var r = Ut();
    return wt !== null ? y0(r, wt, t, n) : (r.baseState = t, [t, r.queue.dispatch]);
  }, useMemoCache: sd, useCacheRefresh: q0, useEffectEvent: T0 };
  function bd(t, n, r, u) {
    n = t.memoizedState, r = r(u, n), r = r == null ? n : B({}, n, r), t.memoizedState = r, t.lanes === 0 && (t.updateQueue.baseState = r);
  }
  var wd = { enqueueSetState: function(t, n, r) {
    t = t._reactInternals;
    var u = On(), f = vl(u);
    f.payload = n, r != null && (f.callback = r), n = bl(t, f, u), n !== null && (En(n, t, u), hu(n, t, u));
  }, enqueueReplaceState: function(t, n, r) {
    t = t._reactInternals;
    var u = On(), f = vl(u);
    f.tag = 1, f.payload = n, r != null && (f.callback = r), n = bl(t, f, u), n !== null && (En(n, t, u), hu(n, t, u));
  }, enqueueForceUpdate: function(t, n) {
    t = t._reactInternals;
    var r = On(), u = vl(r);
    u.tag = 2, n != null && (u.callback = n), n = bl(t, u, r), n !== null && (En(n, t, r), hu(n, t, r));
  } };
  function Q0(t, n, r, u, f, h, w) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(u, h, w) : n.prototype && n.prototype.isPureReactComponent ? !ru(r, u) || !ru(f, h) : true;
  }
  function Z0(t, n, r, u) {
    t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(r, u), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(r, u), n.state !== t && wd.enqueueReplaceState(n, n.state, null);
  }
  function fr(t, n) {
    var r = n;
    if ("ref" in n) {
      r = {};
      for (var u in n)
        u !== "ref" && (r[u] = n[u]);
    }
    if (t = t.defaultProps) {
      r === n && (r = B({}, r));
      for (var f in t)
        r[f] === void 0 && (r[f] = t[f]);
    }
    return r;
  }
  function F0(t) {
    Vo(t);
  }
  function K0(t) {
    console.error(t);
  }
  function P0(t) {
    Vo(t);
  }
  function ps(t, n) {
    try {
      var r = t.onUncaughtError;
      r(n.value, { componentStack: n.stack });
    } catch (u) {
      setTimeout(function() {
        throw u;
      });
    }
  }
  function J0(t, n, r) {
    try {
      var u = t.onCaughtError;
      u(r.value, { componentStack: r.stack, errorBoundary: n.tag === 1 ? n.stateNode : null });
    } catch (f) {
      setTimeout(function() {
        throw f;
      });
    }
  }
  function Sd(t, n, r) {
    return r = vl(r), r.tag = 3, r.payload = { element: null }, r.callback = function() {
      ps(t, n);
    }, r;
  }
  function W0(t) {
    return t = vl(t), t.tag = 3, t;
  }
  function ey(t, n, r, u) {
    var f = r.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var h = u.value;
      t.payload = function() {
        return f(h);
      }, t.callback = function() {
        J0(n, r, u);
      };
    }
    var w = r.stateNode;
    w !== null && typeof w.componentDidCatch == "function" && (t.callback = function() {
      J0(n, r, u), typeof f != "function" && (zl === null ? zl = /* @__PURE__ */ new Set([this]) : zl.add(this));
      var z = u.stack;
      this.componentDidCatch(u.value, { componentStack: z !== null ? z : "" });
    });
  }
  function gC(t, n, r, u, f) {
    if (r.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
      if (n = r.alternate, n !== null && ir(n, r, f, true), r = rn.current, r !== null) {
        switch (r.tag) {
          case 31:
          case 13:
          case 19:
            return mn === null ? Ls() : r.alternate === null && Rt === 0 && (Rt = 3), r.flags &= -257, r.flags |= 65536, r.lanes = f, u === ts ? r.flags |= 16384 : (n = r.updateQueue, n === null ? r.updateQueue = /* @__PURE__ */ new Set([u]) : n.add(u), ah(t, u, f)), false;
          case 22:
            return r.flags |= 65536, u === ts ? r.flags |= 16384 : (n = r.updateQueue, n === null ? (n = { transitions: null, markerInstances: null, retryQueue: /* @__PURE__ */ new Set([u]) }, r.updateQueue = n) : (r = n.retryQueue, r === null ? n.retryQueue = /* @__PURE__ */ new Set([u]) : r.add(u)), ah(t, u, f)), false;
        }
        throw Error(a(435, r.tag));
      }
      return ah(t, u, f), Ls(), false;
    }
    if (We)
      return n = rn.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = f, u !== Vf && (t = Error(a(422), { cause: u }), ou(Xn(t, r)))) : (u !== Vf && (n = Error(a(423), { cause: u }), ou(Xn(n, r))), t = t.current.alternate, t.flags |= 65536, f &= -f, t.lanes |= f, u = Xn(u, r), f = Sd(t.stateNode, u, f), Jf(t, f), Rt !== 4 && (Rt = 2)), false;
    var h = Error(a(520), { cause: u });
    if (h = Xn(h, r), _u === null ? _u = [h] : _u.push(h), Rt !== 4 && (Rt = 2), n === null)
      return true;
    u = Xn(u, r), r = n;
    do {
      switch (r.tag) {
        case 3:
          return r.flags |= 65536, t = f & -f, r.lanes |= t, t = Sd(r.stateNode, u, t), Jf(r, t), false;
        case 1:
          if (n = r.type, h = r.stateNode, (r.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (zl === null || !zl.has(h))))
            return r.flags |= 65536, f &= -f, r.lanes |= f, f = W0(f), ey(f, t, r, u), Jf(r, f), false;
          break;
        case 22:
          if (r.memoizedState !== null)
            return r.flags |= 65536, false;
      }
      r = r.return;
    } while (r !== null);
    return false;
  }
  var Ed = Error(a(461)), Xt = false;
  function Kt(t, n, r, u) {
    n.child = t === null ? l0(n, null, r, u) : sr(n, t.child, r, u);
  }
  function ty(t, n, r, u, f) {
    r = r.render;
    var h = n.ref;
    if ("ref" in u) {
      var w = {};
      for (var z in u)
        z !== "ref" && (w[z] = u[z]);
    } else
      w = u;
    return lr(n), u = rd(t, n, r, w, h, f), z = ad(), t !== null && !Xt ? (ud(t, n, f), Fi(t, n, f)) : (We && z && Zo(n), n.flags |= 1, Kt(t, n, u, f), n.child);
  }
  function ny(t, n, r, u, f) {
    if (t === null) {
      var h = r.type;
      return typeof h == "function" && !Bf(h) && h.defaultProps === void 0 && r.compare === null ? (n.tag = 15, n.type = h, iy(t, n, h, u, f)) : (t = $o(r.type, null, u, n, n.mode, f), t.ref = n.ref, t.return = n, n.child = t);
    }
    if (h = t.child, !Md(t, f)) {
      var w = h.memoizedProps;
      if (r = r.compare, r = r !== null ? r : ru, r(w, u) && t.ref === n.ref)
        return Fi(t, n, f);
    }
    return n.flags |= 1, t = Yi(h, u), t.ref = n.ref, t.return = n, n.child = t;
  }
  function iy(t, n, r, u, f) {
    if (t !== null) {
      var h = t.memoizedProps;
      if (ru(h, u) && t.ref === n.ref)
        if (Xt = false, n.pendingProps = u = h, Md(t, f))
          (t.flags & 131072) !== 0 && (Xt = true);
        else
          return n.lanes = t.lanes, Fi(t, n, f);
    }
    return Cd(t, n, r, u, f);
  }
  function ly(t, n, r, u) {
    var f = u.children, h = t !== null ? t.memoizedState : null;
    if (t === null && n.stateNode === null && (n.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), u.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (h = h !== null ? h.baseLanes | r : r, t !== null) {
          for (u = n.child = t.child, f = 0; u !== null; )
            f = f | u.lanes | u.childLanes, u = u.sibling;
          u = f & ~h;
        } else
          u = 0, n.child = null;
        return ry(t, n, h, r, u);
      }
      if ((r & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Wo(n, h !== null ? h.cachePool : null), h !== null ? u0(n, h) : ed(), o0(n);
      else
        return u = n.lanes = 536870912, ry(t, n, h !== null ? h.baseLanes | r : r, r, u);
    } else
      h !== null ? (Wo(n, h.cachePool), u0(n, h), El(), n.memoizedState = null) : (t !== null && Wo(n, null), ed(), El());
    return Kt(t, n, f, r), n.child;
  }
  function bu(t, n) {
    return t !== null && t.tag === 22 || n.stateNode !== null || (n.stateNode = { _visibility: 1, _pendingMarkers: null, _retryCache: null, _transitions: null }), n.sibling;
  }
  function ry(t, n, r, u, f) {
    var h = Zf();
    return h = h === null ? null : { parent: Vt._currentValue, pool: h }, n.memoizedState = { baseLanes: r, cachePool: h }, t !== null && Wo(n, null), ed(), o0(n), t !== null && ir(t, n, u, true), n.childLanes = f, null;
  }
  function gs(t, n) {
    return n = ys({ mode: n.mode, children: n.children }, t.mode), n.ref = t.ref, t.child = n, n.return = t, n;
  }
  function ay(t, n, r) {
    return sr(n, t.child, null, r), t = gs(n, n.pendingProps), t.flags |= 2, An(n), n.memoizedState = null, t;
  }
  function yC(t, n, r) {
    var u = n.pendingProps, f = (n.flags & 128) !== 0;
    if (n.flags &= -129, t === null) {
      if (We) {
        if (u.mode === "hidden")
          return t = gs(n, u), n.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, bu(null, t);
        if (nd(n), (t = kt) ? (t = j1(t, Qn), t = t !== null && t.data === "&" ? t : null, t !== null && (n.memoizedState = { dehydrated: t, treeContext: hl !== null ? { id: xi, overflow: vi } : null, retryLane: 536870912, hydrationErrors: null }, r = Yg(t), r.return = n, n.child = r, Jt = n, kt = null)) : t = null, t === null)
          throw pl(n);
        return n.lanes = 536870912, null;
      }
      return gs(n, u);
    }
    var h = t.memoizedState;
    if (h !== null) {
      var w = h.dehydrated;
      if (nd(n), f)
        if (n.flags & 256)
          n.flags &= -257, n = ay(t, n, r);
        else if (n.memoizedState !== null)
          n.child = t.child, n.flags |= 128, n = null;
        else
          throw Error(a(558));
      else if (Xt || ir(t, n, r, false), f = (r & t.childLanes) !== 0, Xt || f) {
        if (wl.current === null) {
          if (u = St, u !== null && (w = je(u, r), w !== 0 && w !== h.retryLane))
            throw h.retryLane = w, Wl(t, w), En(u, t, w), Ed;
          Ls();
        }
        n = ay(t, n, r);
      } else
        t = h.treeContext, kt = Fn(w.nextSibling), Jt = n, We = true, ml = null, Qn = false, t !== null && $g(n, t), n = gs(n, u), n.flags |= 134221824;
      return n;
    }
    return t = Yi(t.child, { mode: u.mode, children: u.children }), t.ref = n.ref, n.child = t, t.return = n, t;
  }
  function ra(t, n) {
    var r = n.ref;
    if (r === null)
      t !== null && t.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof r != "function" && typeof r != "object")
        throw Error(a(284));
      (t === null || t.ref !== r) && (n.flags |= 4194816);
    }
  }
  function Cd(t, n, r, u, f) {
    return lr(n), r = rd(t, n, r, u, void 0, f), u = ad(), t !== null && !Xt ? (ud(t, n, f), Fi(t, n, f)) : (We && u && Zo(n), n.flags |= 1, Kt(t, n, r, f), n.child);
  }
  function uy(t, n, r, u, f, h) {
    return lr(n), n.updateQueue = null, r = c0(n, u, r, f), s0(t), u = ad(), t !== null && !Xt ? (ud(t, n, h), Fi(t, n, h)) : (We && u && Zo(n), n.flags |= 1, Kt(t, n, r, h), n.child);
  }
  function oy(t, n, r, u, f) {
    if (lr(n), n.stateNode === null) {
      var h = Fr, w = r.contextType;
      typeof w == "object" && w !== null && (h = ln(w)), h = new r(u, h), n.memoizedState = h.state !== null && h.state !== void 0 ? h.state : null, h.updater = wd, n.stateNode = h, h._reactInternals = n, h = n.stateNode, h.props = u, h.state = n.memoizedState, h.refs = {}, Kf(n), w = r.contextType, h.context = typeof w == "object" && w !== null ? ln(w) : Fr, h.state = n.memoizedState, w = r.getDerivedStateFromProps, typeof w == "function" && (bd(n, r, w, u), h.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof h.getSnapshotBeforeUpdate == "function" || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (w = h.state, typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount(), w !== h.state && wd.enqueueReplaceState(h, h.state, null), pu(n, u, h, f), mu(), h.state = n.memoizedState), typeof h.componentDidMount == "function" && (n.flags |= 4194308), u = true;
    } else if (t === null) {
      h = n.stateNode;
      var z = n.memoizedProps, I = fr(r, z);
      h.props = I;
      var ee = h.context, oe = r.contextType;
      w = Fr, typeof oe == "object" && oe !== null && (w = ln(oe));
      var ve = r.getDerivedStateFromProps;
      oe = typeof ve == "function" || typeof h.getSnapshotBeforeUpdate == "function", z = n.pendingProps !== z, oe || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (z || ee !== w) && Z0(n, h, u, w), xl = false;
      var P = n.memoizedState;
      h.state = P, pu(n, u, h, f), mu(), ee = n.memoizedState, z || P !== ee || xl ? (typeof ve == "function" && (bd(n, r, ve, u), ee = n.memoizedState), (I = xl || Q0(n, r, I, u, P, ee, w)) ? (oe || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = u, n.memoizedState = ee), h.props = u, h.state = ee, h.context = w, u = I) : (typeof h.componentDidMount == "function" && (n.flags |= 4194308), u = false);
    } else {
      h = n.stateNode, Pf(t, n), w = n.memoizedProps, oe = fr(r, w), h.props = oe, ve = n.pendingProps, P = h.context, ee = r.contextType, I = Fr, typeof ee == "object" && ee !== null && (I = ln(ee)), z = r.getDerivedStateFromProps, (ee = typeof z == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (w !== ve || P !== I) && Z0(n, h, u, I), xl = false, P = n.memoizedState, h.state = P, pu(n, u, h, f), mu();
      var ae = n.memoizedState;
      w !== ve || P !== ae || xl || t !== null && t.dependencies !== null && Po(t.dependencies) ? (typeof z == "function" && (bd(n, r, z, u), ae = n.memoizedState), (oe = xl || Q0(n, r, oe, u, P, ae, I) || t !== null && t.dependencies !== null && Po(t.dependencies)) ? (ee || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(u, ae, I), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(u, ae, I)), typeof h.componentDidUpdate == "function" && (n.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && P === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && P === t.memoizedState || (n.flags |= 1024), n.memoizedProps = u, n.memoizedState = ae), h.props = u, h.state = ae, h.context = I, u = oe) : (typeof h.componentDidUpdate != "function" || w === t.memoizedProps && P === t.memoizedState || (n.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || w === t.memoizedProps && P === t.memoizedState || (n.flags |= 1024), u = false);
    }
    return h = u, ra(t, n), u = (n.flags & 128) !== 0, h || u ? (h = n.stateNode, r = u && typeof r.getDerivedStateFromError != "function" ? null : h.render(), n.flags |= 1, t !== null && u ? (n.child = sr(n, t.child, null, f), n.child = sr(n, null, r, f)) : Kt(t, n, r, f), n.memoizedState = h.state, t = n.child) : t = Fi(t, n, f), t;
  }
  function sy(t, n, r, u) {
    return tr(), n.flags |= 256, Kt(t, n, r, u), n.child;
  }
  var kd = { dehydrated: null, treeContext: null, retryLane: 0, hydrationErrors: null };
  function Nd(t) {
    return { baseLanes: t, cachePool: Jg() };
  }
  function _d(t, n, r) {
    return t = t !== null ? t.childLanes & ~r : 0, n && (t |= Dn), t;
  }
  function cy(t, n, r) {
    var u = n.pendingProps, f = false, h = (n.flags & 128) !== 0, w;
    if ((w = h) || (w = t !== null && t.memoizedState === null ? false : (an.current & 2) !== 0), w && (f = true, n.flags &= -129), w = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
      if (We) {
        if (f ? Sl(n) : El(), (t = kt) ? (t = j1(t, Qn), t = t !== null && t.data !== "&" ? t : null, t !== null && (n.memoizedState = { dehydrated: t, treeContext: hl !== null ? { id: xi, overflow: vi } : null, retryLane: 536870912, hydrationErrors: null }, r = Yg(t), r.return = n, n.child = r, Jt = n, kt = null)) : t = null, t === null)
          throw pl(n);
        return Nh(t) ? n.lanes = 32 : n.lanes = 536870912, null;
      }
      return h = u.children, u = u.fallback, f ? (El(), f = n.mode, h = ys({ mode: "hidden", children: h }, f), u = er(u, f, r, null), h.return = n, u.return = n, h.sibling = u, n.child = h, u = n.child, u.memoizedState = Nd(r), u.childLanes = _d(t, w, r), n.memoizedState = kd, bu(null, u)) : (Sl(n), zd(n, h));
    }
    var z = t.memoizedState;
    if (z !== null) {
      var I = z.dehydrated;
      if (I !== null)
        return xC(t, n, h, w, u, I, z, r);
    }
    return f ? (El(), f = u.fallback, h = n.mode, z = t.child, I = z.sibling, u = Yi(z, { mode: "hidden", children: u.children }), u.subtreeFlags = z.subtreeFlags & 1206910976, I !== null ? f = Yi(I, f) : (f = er(f, h, r, null), f.flags |= 2), f.return = n, u.return = n, u.sibling = f, n.child = u, bu(null, u), u = n.child, f = t.child.memoizedState, f === null ? f = Nd(r) : (h = f.cachePool, h !== null ? (z = Vt._currentValue, h = h.parent !== z ? { parent: z, pool: z } : h) : h = Jg(), f = { baseLanes: f.baseLanes | r, cachePool: h }), u.memoizedState = f, u.childLanes = _d(t, w, r), n.memoizedState = kd, bu(t.child, u)) : (Sl(n), r = t.child, t = r.sibling, r = Yi(r, { mode: "visible", children: u.children }), r.return = n, r.sibling = null, t !== null && (w = n.deletions, w === null ? (n.deletions = [t], n.flags |= 16) : w.push(t)), n.child = r, n.memoizedState = null, r);
  }
  function zd(t, n) {
    return n = ys({ mode: "visible", children: n }, t.mode), n.return = t, t.child = n;
  }
  function ys(t, n) {
    return t = vn(22, t, null, n), t.lanes = 0, t;
  }
  function xs(t, n, r) {
    return sr(n, t.child, null, r), t = zd(n, n.pendingProps.children), t.flags |= 2, n.memoizedState = null, t;
  }
  function xC(t, n, r, u, f, h, w, z) {
    if (r)
      return n.flags & 256 ? (Sl(n), n.flags &= -257, xs(t, n, z)) : n.memoizedState !== null ? (El(), n.child = t.child, n.flags |= 128, null) : (El(), h = f.fallback, w = n.mode, f = ys({ mode: "visible", children: f.children }, w), h = er(h, w, z, null), h.flags |= 2, f.return = n, h.return = n, f.sibling = h, n.child = f, sr(n, t.child, null, z), f = n.child, f.memoizedState = Nd(z), f.childLanes = _d(t, u, z), n.memoizedState = kd, bu(null, f));
    if (Sl(n), Nh(h)) {
      if (u = h.nextSibling && h.nextSibling.dataset, u)
        var I = u.dgst;
      return u = I, u !== "" && (f = Error(a(419)), f.stack = "", f.digest = u, ou({ value: f, source: null, stack: null })), xs(t, n, z);
    }
    if (Xt || ir(t, n, z, false), u = (z & t.childLanes) !== 0, Xt || u) {
      if (wl.current !== null)
        return xs(t, n, z);
      if (u = St, u !== null && (f = je(u, z), f !== 0 && f !== w.retryLane))
        throw w.retryLane = f, Wl(t, f), En(u, t, f), Ed;
      return kh(h) || Ls(), xs(t, n, z);
    }
    return kh(h) ? (n.flags |= 192, n.child = t.child, null) : (t = w.treeContext, kt = Fn(h.nextSibling), Jt = n, We = true, ml = null, Qn = false, t !== null && $g(n, t), n = zd(n, f.children), n.flags |= 134221824, n);
  }
  function fy(t, n, r) {
    t.lanes |= n;
    var u = t.alternate;
    u !== null && (u.lanes |= n), Ko(t.return, n, r);
  }
  function dy(t) {
    for (var n = null; t !== null; ) {
      var r = t.alternate;
      r !== null && rs(r) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function vs(t, n, r, u, f, h) {
    var w = t.memoizedState;
    w === null ? t.memoizedState = { isBackwards: n, rendering: null, renderingStartTime: 0, last: u, tail: r, tailMode: f, treeForkCount: h } : (w.isBackwards = n, w.rendering = null, w.renderingStartTime = 0, w.last = u, w.tail = r, w.tailMode = f, w.treeForkCount = h);
  }
  function Td(t) {
    var n = t.child;
    for (t.child = null; n !== null; ) {
      var r = n.sibling;
      n.sibling = t.child, t.child = n, n = r;
    }
  }
  function Ad(t, n, r) {
    var u = n.pendingProps, f = u.revealOrder, h = u.tail;
    u = u.children;
    var w = an.current;
    if (n.flags & 128)
      return gu(n, w), null;
    var z = (w & 2) !== 0;
    if (z ? (w = w & 1 | 2, n.flags |= 128) : w &= 1, gu(n, w), f === "backwards" && t !== null ? (Td(t), Kt(t, n, u, r), Td(t)) : Kt(t, n, u, r), u = We ? uu : 0, !z && t !== null && (t.flags & 128) !== 0)
      e: for (t = n.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && fy(t, r, n);
        else if (t.tag === 19)
          fy(t, r, n);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === n)
          break e;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === n)
            break e;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (f) {
      case "backwards":
        r = dy(n.child), r === null ? (f = n.child, n.child = null) : (f = r.sibling, r.sibling = null, Td(n)), vs(n, true, f, null, h, u);
        break;
      case "unstable_legacy-backwards":
        for (r = null, f = n.child, n.child = null; f !== null; ) {
          if (t = f.alternate, t !== null && rs(t) === null) {
            n.child = f;
            break;
          }
          t = f.sibling, f.sibling = r, r = f, f = t;
        }
        vs(n, true, r, null, h, u);
        break;
      case "together":
        vs(n, false, null, null, void 0, u);
        break;
      case "independent":
        n.memoizedState = null;
        break;
      default:
        r = dy(n.child), r === null ? (f = n.child, n.child = null) : (f = r.sibling, r.sibling = null), vs(n, false, f, r, h, u);
    }
    return n.child;
  }
  function hy(t, n, r) {
    var u = n.pendingProps;
    return gl(n, n.type, u.value), Kt(t, n, u.children, r), n.child;
  }
  function Fi(t, n, r) {
    if (t !== null && (n.dependencies = t.dependencies), _l |= n.lanes, (r & n.childLanes) === 0)
      if (t !== null) {
        if (ir(t, n, r, false), (r & n.childLanes) === 0)
          return null;
      } else
        return null;
    if (t !== null && n.child !== t.child)
      throw Error(a(153));
    if (n.child !== null) {
      for (t = n.child, r = Yi(t, t.pendingProps), n.child = r, r.return = n; t.sibling !== null; )
        t = t.sibling, r = r.sibling = Yi(t, t.pendingProps), r.return = n;
      r.sibling = null;
    }
    return n.child;
  }
  function Md(t, n) {
    return (t.lanes & n) !== 0 ? true : (t = t.dependencies, !!(t !== null && Po(t)));
  }
  function vC(t, n, r) {
    switch (n.tag) {
      case 3:
        Zt(n, n.stateNode.containerInfo), gl(n, Vt, t.memoizedState.cache), tr();
        break;
      case 27:
      case 5:
        _t(n);
        break;
      case 4:
        Zt(n, n.stateNode.containerInfo);
        break;
      case 10:
        gl(n, n.type, n.memoizedProps.value);
        break;
      case 31:
        if (n.memoizedState !== null)
          return n.flags |= 128, nd(n), null;
        break;
      case 13:
        var u = n.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Sl(n), n.flags |= 128, null;
          u = ir(t, n, r, false);
          var f = n.child.childLanes;
          return u || (r & f) !== 0 ? cy(t, n, r) : (Sl(n), t = Fi(t, n, r), t !== null ? t.sibling : null);
        }
        Sl(n);
        break;
      case 19:
        if (n.flags & 128)
          return Ad(t, n, r);
        if (f = (t.flags & 128) !== 0, u = (r & n.childLanes) !== 0, u || (ir(t, n, r, false), u = (r & n.childLanes) !== 0), f) {
          if (u)
            return Ad(t, n, r);
          n.flags |= 128;
        }
        if (f = n.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), gu(n, an.current), u)
          break;
        return null;
      case 22:
        return n.lanes = 0, ly(t, n, r, n.pendingProps);
      case 24:
        gl(n, Vt, t.memoizedState.cache);
    }
    return Fi(t, n, r);
  }
  function my(t, n, r) {
    if (t !== null)
      if (t.memoizedProps !== n.pendingProps)
        Xt = true;
      else {
        if (!Md(t, r) && (n.flags & 128) === 0)
          return Xt = false, vC(t, n, r);
        Xt = (t.flags & 131072) !== 0;
      }
    else
      Xt = false, We && (n.flags & 1048576) !== 0 && Gg(n, uu, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          var u = n.pendingProps;
          if (t = ur(n.elementType), n.type = t, typeof t == "function")
            Bf(t) ? (u = fr(t, u), n.tag = 1, n = oy(null, n, t, u, r)) : (n.tag = 0, n = Cd(null, n, t, u, r));
          else {
            if (t != null) {
              var f = t.$$typeof;
              if (f === H) {
                n.tag = 11, n = ty(null, n, t, u, r);
                break e;
              } else if (f === F) {
                n.tag = 14, n = ny(null, n, t, u, r);
                break e;
              } else if (f === D) {
                n.tag = 10, n.type = t, n = hy(null, n, r);
                break e;
              }
            }
            throw n = xe(t) || t, Error(a(306, n, ""));
          }
        }
        return n;
      case 0:
        return Cd(t, n, n.type, n.pendingProps, r);
      case 1:
        return u = n.type, f = fr(u, n.pendingProps), oy(t, n, u, f, r);
      case 3:
        e: {
          if (Zt(n, n.stateNode.containerInfo), t === null)
            throw Error(a(387));
          u = n.pendingProps;
          var h = n.memoizedState;
          f = h.element, Pf(t, n), pu(n, u, null, r);
          var w = n.memoizedState;
          if (u = w.cache, gl(n, Vt, u), u !== h.cache && Gf(n, [Vt], r, true), mu(), u = w.element, h.isDehydrated)
            if (h = { element: u, isDehydrated: false, cache: w.cache }, n.updateQueue.baseState = h, n.memoizedState = h, n.flags & 256) {
              n = sy(t, n, u, r);
              break e;
            } else if (u !== f) {
              f = Xn(Error(a(424)), n), ou(f), n = sy(t, n, u, r);
              break e;
            } else {
              switch (t = n.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (kt = Fn(t.firstChild), Jt = n, We = true, ml = null, Qn = true, r = l0(n, null, u, r), n.child = r; r; )
                r.flags = r.flags & -3 | 134221824, r = r.sibling;
            }
          else {
            if (tr(), u === f) {
              n = Fi(t, n, r);
              break e;
            }
            Kt(t, n, u, r);
          }
          n = n.child;
        }
        return n;
      case 26:
        return ra(t, n), t === null ? (r = U1(n.type, null, n.pendingProps, null)) ? n.memoizedState = r : We || (n.stateNode = x1(n.type, n.pendingProps, vt.current, n)) : n.memoizedState = U1(n.type, t.memoizedProps, n.pendingProps, t.memoizedState), null;
      case 27:
        return _t(n), t === null && We && (u = n.stateNode = R1(n.type, n.pendingProps, vt.current), Jt = n, Qn = true, f = kt, Ml(n.type) ? (_h = f, kt = Fn(u.firstChild)) : kt = f), Kt(t, n, n.pendingProps.children, r), ra(t, n), t === null && (n.flags |= 4194304), n.child;
      case 5:
        return t === null && We && ((f = u = kt) && (u = hk(u, n.type, n.pendingProps, Qn), u !== null ? (n.stateNode = u, Jt = n, kt = Fn(u.firstChild), Qn = false, f = true) : f = false), f || pl(n)), _t(n), f = n.type, h = n.pendingProps, w = t !== null ? t.memoizedProps : null, u = h.children, xh(f, h) ? u = null : w !== null && xh(f, w) && (n.flags |= 32), n.memoizedState !== null && (f = rd(t, n, oC, null, null, r), Ea._currentValue = f), ra(t, n), Kt(t, n, u, r), n.child;
      case 6:
        return t === null && We && ((t = r = kt) && (r = mk(r, n.pendingProps, Qn), r !== null ? (n.stateNode = r, Jt = n, kt = null, t = true) : t = false), t || pl(n)), null;
      case 13:
        return cy(t, n, r);
      case 4:
        return Zt(n, n.stateNode.containerInfo), u = n.pendingProps, t === null ? n.child = sr(n, null, u, r) : Kt(t, n, u, r), n.child;
      case 11:
        return ty(t, n, n.type, n.pendingProps, r);
      case 7:
        return u = n.pendingProps, ra(t, n), Kt(t, n, u, r), n.child;
      case 8:
        return Kt(t, n, n.pendingProps.children, r), n.child;
      case 12:
        return Kt(t, n, n.pendingProps.children, r), n.child;
      case 10:
        return hy(t, n, r);
      case 9:
        return f = n.type._context, u = n.pendingProps.children, lr(n), f = ln(f), u = u(f), n.flags |= 1, Kt(t, n, u, r), n.child;
      case 14:
        return ny(t, n, n.type, n.pendingProps, r);
      case 15:
        return iy(t, n, n.type, n.pendingProps, r);
      case 19:
        return Ad(t, n, r);
      case 31:
        return yC(t, n, r);
      case 22:
        return ly(t, n, r, n.pendingProps);
      case 24:
        return lr(n), u = ln(Vt), t === null ? (f = Zf(), f === null && (f = St, h = $f(), f.pooledCache = h, h.refCount++, h !== null && (f.pooledCacheLanes |= r), f = h), n.memoizedState = { parent: u, cache: f }, Kf(n), gl(n, Vt, f)) : ((t.lanes & r) !== 0 && (Pf(t, n), pu(n, null, null, r), mu()), f = t.memoizedState, h = n.memoizedState, f.parent !== u ? (f = { parent: u, cache: u }, n.memoizedState = f, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = f), gl(n, Vt, u)) : (u = h.cache, gl(n, Vt, u), u !== f.cache && Gf(n, [Vt], r, true))), Kt(t, n, n.pendingProps.children, r), n.child;
      case 30:
        return n.stateNode === null && (n.stateNode = { autoName: null, paired: null, clones: null, ref: null }), u = n.pendingProps, u.name != null && u.name !== "auto" ? n.flags |= t === null ? 18882560 : 18874368 : We && Zo(n), t !== null && t.memoizedProps.name !== u.name ? n.flags |= 4194816 : ra(t, n), Kt(t, n, u.children, r), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(a(156, n.tag));
  }
  function Ki(t) {
    t.flags |= 4;
  }
  function jd(t, n, r, u, f) {
    var h;
    if ((h = (t.mode & 32) !== 0) && (h = r === null ? Y1(n, u) : Y1(n, u) && (u.src !== r.src || u.srcSet !== r.srcSet)), h) {
      if (t.flags |= 16777216, (f & 335544128) === f)
        if (t.stateNode.complete)
          t.flags |= 8192;
        else if (Fy())
          t.flags |= 8192;
        else
          throw or = ts, Ff;
    } else
      t.flags &= -16777217;
  }
  function py(t, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !X1(n))
      if (Fy())
        t.flags |= 8192;
      else
        throw or = ts, Ff;
  }
  function bs(t, n) {
    n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Hi() : 536870912, t.lanes |= n, ca |= n);
  }
  function wu(t, n) {
    if (!We)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var r = t.tail, u = null; r !== null; )
            r.alternate !== null && (u = r), r = r.sibling;
          u === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : u.sibling = null;
          break;
        default:
          for (n = t.tail, r = null; n !== null; )
            n.alternate !== null && (r = n), n = n.sibling;
          r === null ? t.tail = null : r.sibling = null;
      }
  }
  function Nt(t) {
    var n = t.alternate !== null && t.alternate.child === t.child, r = 0, u = 0;
    if (n)
      for (var f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, u |= f.subtreeFlags & 1206910976, u |= f.flags & 1206910976, f.return = t, f = f.sibling;
    else
      for (f = t.child; f !== null; )
        r |= f.lanes | f.childLanes, u |= f.subtreeFlags, u |= f.flags, f.return = t, f = f.sibling;
    return t.subtreeFlags |= u, t.childLanes = r, n;
  }
  function bC(t, n, r) {
    var u = n.pendingProps;
    switch (qf(n), n.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Nt(n), null;
      case 1:
        return Nt(n), null;
      case 3:
        return r = n.stateNode, u = null, t !== null && (u = t.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), $i(Vt), Ht(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (t === null || t.child === null) && (Jr(n) ? Ki(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Yf())), Nt(n), null;
      case 26:
        var f = n.type, h = n.memoizedState;
        return t === null ? (Ki(n), h !== null ? (Nt(n), py(n, h)) : (Nt(n), jd(n, f, null, u, r))) : h ? h !== t.memoizedState ? (Ki(n), Nt(n), py(n, h)) : (Nt(n), n.flags &= -16777217) : (t = t.memoizedProps, t !== u && Ki(n), Nt(n), jd(n, f, t, u, r)), null;
      case 27:
        if (ce(n), r = vt.current, f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== u && Ki(n);
        else {
          if (!u) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Nt(n), n.subtreeFlags &= -33554433, null;
          }
          t = Le.current, Jr(n) ? Qg(n) : (t = R1(f, u, r), n.stateNode = t, Ki(n));
        }
        return Nt(n), n.subtreeFlags &= -33554433, null;
      case 5:
        if (ce(n), f = n.type, t !== null && n.stateNode != null)
          t.memoizedProps !== u && Ki(n);
        else {
          if (!u) {
            if (n.stateNode === null)
              throw Error(a(166));
            return Nt(n), n.subtreeFlags &= -33554433, null;
          }
          if (h = Le.current, Jr(n))
            Qg(n);
          else {
            var w = ju(vt.current);
            switch (h) {
              case 1:
                h = w.createElementNS("http://www.w3.org/2000/svg", f);
                break;
              case 2:
                h = w.createElementNS("http://www.w3.org/1998/Math/MathML", f);
                break;
              default:
                switch (f) {
                  case "svg":
                    h = w.createElementNS("http://www.w3.org/2000/svg", f);
                    break;
                  case "math":
                    h = w.createElementNS("http://www.w3.org/1998/Math/MathML", f);
                    break;
                  case "script":
                    h = w.createElement("div"), h.innerHTML = "<script><\/script>", h = h.removeChild(h.firstChild);
                    break;
                  case "select":
                    h = typeof u.is == "string" ? w.createElement("select", { is: u.is }) : w.createElement("select"), u.multiple ? h.multiple = true : u.size && (h.size = u.size);
                    break;
                  default:
                    h = typeof u.is == "string" ? w.createElement(f, { is: u.is }) : w.createElement(f);
                }
            }
            h[ht] = n, h[hn] = u;
            e: for (w = n.child; w !== null; ) {
              if (w.tag === 5 || w.tag === 6)
                h.appendChild(w.stateNode);
              else if (w.tag !== 4 && w.tag !== 27 && w.child !== null) {
                w.child.return = w, w = w.child;
                continue;
              }
              if (w === n)
                break e;
              for (; w.sibling === null; ) {
                if (w.return === null || w.return === n)
                  break e;
                w = w.return;
              }
              w.sibling.return = w.return, w = w.sibling;
            }
            n.stateNode = h;
            e: switch (on(h, f, u), f) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                u = !!u.autoFocus;
                break e;
              case "img":
                u = true;
                break e;
              default:
                u = false;
            }
            u && Ki(n);
          }
        }
        return Nt(n), n.subtreeFlags &= -33554433, jd(n, n.type, t === null ? null : t.memoizedProps, n.pendingProps, r), null;
      case 6:
        if (t && n.stateNode != null)
          t.memoizedProps !== u && Ki(n);
        else {
          if (typeof u != "string" && n.stateNode === null)
            throw Error(a(166));
          if (t = vt.current, Jr(n)) {
            if (t = n.stateNode, r = n.memoizedProps, u = null, f = Jt, f !== null)
              switch (f.tag) {
                case 27:
                case 5:
                  u = f.memoizedProps;
              }
            t[ht] = n, t = !!(t.nodeValue === r || u !== null && u.suppressHydrationWarning === true || m1(t.nodeValue, r)), t || pl(n, true);
          } else
            t = ju(t).createTextNode(u), t[ht] = n, n.stateNode = t;
        }
        return Nt(n), null;
      case 31:
        if (r = n.memoizedState, t === null || t.memoizedState !== null) {
          if (u = Jr(n), r !== null) {
            if (t === null) {
              if (!u)
                throw Error(a(318));
              if (t = n.memoizedState, t = t !== null ? t.dehydrated : null, !t)
                throw Error(a(557));
              t[ht] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Nt(n), t = false;
          } else
            r = Yf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), t = true;
          if (!t)
            return n.flags & 256 ? (An(n), n) : (An(n), null);
          if ((n.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Nt(n), null;
      case 13:
        if (u = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (f = Jr(n), u !== null && u.dehydrated !== null) {
            if (t === null) {
              if (!f)
                throw Error(a(318));
              if (f = n.memoizedState, f = f !== null ? f.dehydrated : null, !f)
                throw Error(a(317));
              f[ht] = n;
            } else
              tr(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Nt(n), f = false;
          } else
            f = Yf(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = f), f = true;
          if (!f)
            return n.flags & 256 ? (An(n), n) : (An(n), null);
        }
        return An(n), (n.flags & 128) !== 0 ? (n.lanes = r, n) : (r = u !== null, t = t !== null && t.memoizedState !== null, r && (u = n.child, f = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (f = u.alternate.memoizedState.cachePool.pool), h = null, u.memoizedState !== null && u.memoizedState.cachePool !== null && (h = u.memoizedState.cachePool.pool), h !== f && (u.flags |= 2048)), r !== t && r && (n.child.flags |= 8192), bs(n, n.updateQueue), Nt(n), null);
      case 4:
        return Ht(), t === null && hh(n.stateNode.containerInfo), n.flags |= 67108864, Nt(n), null;
      case 10:
        return $i(n.type), Nt(n), null;
      case 19:
        if (id(n), u = n.memoizedState, u === null)
          return Nt(n), null;
        if (f = (n.flags & 128) !== 0, h = u.rendering, h === null)
          if (f)
            wu(u, false);
          else {
            if (Rt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = n.child; t !== null; ) {
                if (h = rs(t), h !== null) {
                  for (n.flags |= 128, wu(u, false), t = h.updateQueue, n.updateQueue = t, bs(n, t), n.subtreeFlags = 0, t = r, r = n.child; r !== null; )
                    Vg(r, t), r = r.sibling;
                  return gu(n, an.current & 1 | 2), We && Xi(n, u.treeForkCount), n.child;
                }
                t = t.sibling;
              }
            u.tail !== null && bt() > js && (n.flags |= 128, f = true, wu(u, false), n.lanes = 4194304);
          }
        else {
          if (!f)
            if (t = rs(h), t !== null) {
              if (n.flags |= 128, f = true, t = t.updateQueue, n.updateQueue = t, bs(n, t), wu(u, true), u.tail === null && u.tailMode !== "collapsed" && u.tailMode !== "visible" && !h.alternate && !We)
                return Nt(n), null;
            } else
              2 * bt() - u.renderingStartTime > js && r !== 536870912 && (n.flags |= 128, f = true, wu(u, false), n.lanes = 4194304);
          u.isBackwards ? (h.sibling = n.child, n.child = h) : (t = u.last, t !== null ? t.sibling = h : n.child = h, u.last = h);
        }
        if (u.tail !== null) {
          t = u.tail;
          e: {
            for (r = t; r !== null; ) {
              if (r.alternate !== null) {
                r = false;
                break e;
              }
              r = r.sibling;
            }
            r = true;
          }
          return u.rendering = t, u.tail = t.sibling, u.renderingStartTime = bt(), t.sibling = null, h = an.current, h = f ? h & 1 | 2 : h & 1, u.tailMode === "visible" || u.tailMode === "collapsed" || !r || We ? gu(n, h) : (r = h, qe(rn, n), qe(an, r), mn === null && (mn = n)), We && Xi(n, u.treeForkCount), t;
        }
        return Nt(n), null;
      case 22:
      case 23:
        return An(n), td(), u = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== u && (n.flags |= 8192) : u && (n.flags |= 8192), u ? (r & 536870912) !== 0 && (n.flags & 128) === 0 && (Nt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Nt(n), r = n.updateQueue, r !== null && bs(n, r.retryQueue), r = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), u = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (u = n.memoizedState.cachePool.pool), u !== r && (n.flags |= 2048), t !== null && Ee(ar), null;
      case 24:
        return r = null, t !== null && (r = t.memoizedState.cache), n.memoizedState.cache !== r && (n.flags |= 2048), $i(Vt), Nt(n), null;
      case 25:
        return null;
      case 30:
        return n.flags |= 33554432, Nt(n), null;
    }
    throw Error(a(156, n.tag));
  }
  function wC(t, n) {
    switch (qf(n), n.tag) {
      case 1:
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 3:
        return $i(Vt), Ht(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return ce(n), null;
      case 31:
        if (n.memoizedState !== null) {
          if (An(n), n.alternate === null)
            throw Error(a(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 13:
        if (An(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(a(340));
          tr();
        }
        return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 19:
        return id(n), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, t = n.memoizedState, t !== null && (t.rendering = null, t.tail = null), n.flags |= 4, n) : null;
      case 4:
        return Ht(), null;
      case 10:
        return $i(n.type), null;
      case 22:
      case 23:
        return An(n), td(), t !== null && Ee(ar), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
      case 24:
        return $i(Vt), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function gy(t, n) {
    switch (qf(n), n.tag) {
      case 3:
        $i(Vt), Ht();
        break;
      case 26:
      case 27:
      case 5:
        ce(n);
        break;
      case 4:
        Ht();
        break;
      case 31:
        n.memoizedState !== null && An(n);
        break;
      case 13:
        An(n);
        break;
      case 19:
        id(n);
        break;
      case 10:
        $i(n.type);
        break;
      case 22:
      case 23:
        An(n), td(), t !== null && Ee(ar);
        break;
      case 24:
        $i(Vt);
    }
  }
  function Su(t, n) {
    try {
      var r = n.updateQueue, u = r !== null ? r.lastEffect : null;
      if (u !== null) {
        var f = u.next;
        r = f;
        do {
          if ((r.tag & t) === t) {
            u = void 0;
            var h = r.create, w = r.inst;
            u = h(), w.destroy = u;
          }
          r = r.next;
        } while (r !== f);
      }
    } catch (z) {
      yt(n, n.return, z);
    }
  }
  function Cl(t, n, r) {
    try {
      var u = n.updateQueue, f = u !== null ? u.lastEffect : null;
      if (f !== null) {
        var h = f.next;
        u = h;
        do {
          if ((u.tag & t) === t) {
            var w = u.inst, z = w.destroy;
            if (z !== void 0) {
              w.destroy = void 0, f = n;
              var I = r, ee = z;
              try {
                ee();
              } catch (oe) {
                yt(f, I, oe);
              }
            }
          }
          u = u.next;
        } while (u !== h);
      }
    } catch (oe) {
      yt(n, n.return, oe);
    }
  }
  function yy(t) {
    var n = t.updateQueue;
    if (n !== null) {
      var r = t.stateNode;
      try {
        a0(n, r);
      } catch (u) {
        yt(t, t.return, u);
      }
    }
  }
  function xy(t, n, r) {
    r.props = fr(t.type, t.memoizedProps), r.state = t.memoizedState;
    try {
      r.componentWillUnmount();
    } catch (u) {
      yt(t, n, u);
    }
  }
  function bi(t, n) {
    try {
      var r = t.ref;
      if (r !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var u = t.stateNode;
            break;
          case 30:
            var f = t.stateNode, h = qi(t.memoizedProps, f);
            (f.ref === null || f.ref.name !== h) && (f.ref = k1(h)), u = f.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var w = new Rn(t);
              p(t.child, false, fk, w, void 0, void 0), t.stateNode = w;
            }
            u = t.stateNode;
            break;
          default:
            u = t.stateNode;
        }
        typeof r == "function" ? t.refCleanup = r(u) : r.current = u;
      }
    } catch (z) {
      yt(t, n, z);
    }
  }
  function un(t, n) {
    var r = t.ref, u = t.refCleanup;
    if (r !== null)
      if (typeof u == "function")
        try {
          u();
        } catch (f) {
          yt(t, n, f);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof r == "function")
        try {
          r(null);
        } catch (f) {
          yt(t, n, f);
        }
      else
        r.current = null;
  }
  function ws(t, n) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && n !== null)
      for (var r = 0; r < n.length; r++)
        M1(t.stateNode, n[r]);
  }
  function vy(t) {
    for (var n = t.return; n !== null && (Od(n) && M1(t.stateNode, n.stateNode), !Dd(n)); )
      n = n.return;
  }
  function Eu(t) {
    for (var n = t.return; n !== null && (Od(n) && dk(t.stateNode, n.stateNode), !Dd(n)); )
      n = n.return;
  }
  function Dd(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Od(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Rd(t) {
    var n = t.type, r = t.memoizedProps, u = t.stateNode;
    try {
      e: switch (n) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          r.autoFocus && u.focus();
          break e;
        case "img":
          r.src ? u.src = r.src : r.srcSet && (u.srcset = r.srcSet);
      }
    } catch (f) {
      yt(t, t.return, f);
    }
  }
  function Ld(t, n, r) {
    try {
      var u = t.stateNode;
      QC(u, t.type, r, n), u[hn] = n;
    } catch (f) {
      yt(t, t.return, f);
    }
  }
  function by(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ml(t.type) || t.tag === 4;
  }
  function Hd(t) {
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || by(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ml(t.type) || t.flags & 2 || t.child === null || t.tag === 4)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2))
        return t.stateNode;
    }
  }
  function Bd(t, n, r, u) {
    var f = t.tag;
    if (f === 5 || f === 6)
      f = t.stateNode, n ? (r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r).insertBefore(f, n) : (n = r.nodeType === 9 ? r.body : r.nodeName === "HTML" ? r.ownerDocument.body : r, n.appendChild(f), r = r._reactRootContainer, r != null || n.onclick !== null || (n.onclick = yi)), ws(t, u), st = true;
    else if (f !== 4 && (f === 27 && (ws(t, u), u = null, Ml(t.type) && (r = t.stateNode, n = null)), t = t.child, t !== null))
      for (Bd(t, n, r, u), t = t.sibling; t !== null; )
        Bd(t, n, r, u), t = t.sibling;
  }
  function Ss(t, n, r, u) {
    var f = t.tag;
    if (f === 5 || f === 6)
      f = t.stateNode, n ? r.insertBefore(f, n) : r.appendChild(f), ws(t, u), st = true;
    else if (f !== 4 && (f === 27 && (ws(t, u), u = null, Ml(t.type) && (r = t.stateNode)), t = t.child, t !== null))
      for (Ss(t, n, r, u), t = t.sibling; t !== null; )
        Ss(t, n, r, u), t = t.sibling;
  }
  function wy(t) {
    var n = t.stateNode, r = t.memoizedProps;
    try {
      for (var u = t.type, f = n.attributes; f.length; )
        n.removeAttributeNode(f[0]);
      on(n, u, r), n[ht] = t, n[hn] = r;
    } catch (h) {
      yt(t, t.return, h);
    }
  }
  var Es = false, Mn = null;
  function Sy(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (Es = true);
  }
  var wi = null;
  function Ey() {
    var t = wi;
    return wi = null, t;
  }
  var bn = 0;
  function aa(t, n, r, u, f) {
    return bn = 0, Cy(t.child, n, r, u, f);
  }
  function Cy(t, n, r, u, f) {
    for (var h = false; t !== null; ) {
      if (t.tag === 5) {
        var w = t.stateNode;
        if (u !== null) {
          var z = wh(w);
          u.push(z), z.view && (h = true);
        } else
          h || wh(w).view && (h = true);
        Es = true, E1(w, bn === 0 ? n : n + "_" + bn, r), bn++;
      } else
        (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && f || Cy(t.child, n, r, u, f) && (h = true));
      t = t.sibling;
    }
    return h;
  }
  function Si(t, n) {
    for (; t !== null; )
      t.tag === 5 ? C1(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && n || Si(t.child, n)), t = t.sibling;
  }
  function Cs(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (Cs(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var n = t.memoizedProps;
          if (n.name == null || n.name === "auto")
            throw Error(a(544));
          var r = n.name;
          n = Vi(n.default, n.share), n !== "none" && (aa(t, r, n, null, false) || Si(t.child, false));
        }
        t = t.sibling;
      }
  }
  function Ud(t, n) {
    if (t.tag === 30) {
      var r = t.stateNode, u = t.memoizedProps, f = qi(u, r), h = Vi(u.default, r.paired ? u.share : u.enter);
      h !== "none" ? aa(t, f, h, null, false) ? (Cs(t), r.paired || n || ma(t, u.onEnter)) : Si(t.child, false) : Cs(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ud(t, n), t = t.sibling;
    else
      Cs(t);
  }
  function Id(t) {
    if (Mn !== null && Mn.size !== 0) {
      var n = Mn;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var r = t.memoizedProps, u = r.name;
              if (u != null && u !== "auto") {
                var f = n.get(u);
                if (f !== void 0) {
                  var h = Vi(r.default, r.share);
                  if (h !== "none" && (aa(t, u, h, null, false) ? (h = t.stateNode, f.paired = h, h.paired = f, ma(t, r.onShare)) : Si(t.child, false)), n.delete(u), n.size === 0)
                    break;
                }
              }
            }
            Id(t);
          }
          t = t.sibling;
        }
    }
  }
  function qd(t) {
    if (t.tag === 30) {
      var n = t.memoizedProps, r = qi(n, t.stateNode), u = Mn !== null ? Mn.get(r) : void 0, f = Vi(n.default, u !== void 0 ? n.share : n.exit);
      f !== "none" && (aa(t, r, f, null, false) ? u !== void 0 ? (f = t.stateNode, u.paired = f, f.paired = u, Mn.delete(r), ma(t, n.onShare)) : ma(t, n.onExit) : Si(t.child, false)), Mn !== null && Id(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        qd(t), t = t.sibling;
    else
      Mn !== null && Id(t);
  }
  function ky(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, r = qi(n, t.stateNode);
        n = Vi(n.default, n.update), t.flags &= -5, n !== "none" && aa(t, r, n, t.memoizedState = [], false);
      } else
        (t.subtreeFlags & 33554432) !== 0 && ky(t);
      t = t.sibling;
    }
  }
  function Vd(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var n = t.stateNode;
            n.paired !== null && (n.paired = null, Si(t.child, false));
          }
          Vd(t);
        }
        t = t.sibling;
      }
  }
  function ks(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Si(t.child, false), Vd(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ks(t), t = t.sibling;
    else
      Vd(t);
  }
  function Ny(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Si(t.child, false) : (t.subtreeFlags & 33554432) !== 0 && Ny(t), t = t.sibling;
  }
  function Yd(t, n, r, u, f, h, w) {
    for (var z = false; n !== null; ) {
      if (n.tag === 5) {
        var I = n.stateNode;
        if (h !== null && bn < h.length) {
          var ee = h[bn], oe = wh(I);
          (ee.view || oe.view) && (z = true);
          var ve;
          if (ve = (t.flags & 4) === 0)
            if (oe.clip)
              ve = true;
            else {
              ve = ee.rect;
              var P = oe.rect;
              ve = ve.y !== P.y || ve.x !== P.x || ve.height !== P.height || ve.width !== P.width;
            }
          ve && (t.flags |= 4), oe.abs ? oe = !ee.abs : (ee = ee.rect, oe = oe.rect, oe = ee.height !== oe.height || ee.width !== oe.width), oe && (t.flags |= 32);
        } else
          t.flags |= 32;
        (t.flags & 4) !== 0 && E1(I, bn === 0 ? r : r + "_" + bn, f), z && (t.flags & 4) !== 0 || (wi === null && (wi = []), wi.push(I, bn === 0 ? u : u + "_" + bn, n.memoizedProps)), bn++;
      } else
        (n.tag !== 22 || n.memoizedState === null) && (n.tag === 30 && w ? t.flags |= n.flags & 32 : Yd(t, n.child, r, u, f, h, w) && (z = true));
      n = n.sibling;
    }
    return z;
  }
  function _y(t, n) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var r = t.memoizedProps, u = t.stateNode, f = qi(r, u), h = Vi(r.default, r.update), w;
        w = t.memoizedState, t.memoizedState = null, u = t;
        var z = t.child;
        bn = 0, f = Yd(u, z, f, f, h, w, false), (t.flags & 4) !== 0 && f && ma(t, r.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && _y(t);
      t = t.sibling;
    }
  }
  var Wt = false, mt = false, Ei = false, Xd = false, zy = typeof WeakSet == "function" ? WeakSet : Set, en = null, Ci = false, Cu = false, Ns = false, Gd = false;
  function SC(t, n, r) {
    if (t = t.containerInfo, gh = Ca, t = jg(t), Mf(t)) {
      if ("selectionStart" in t)
        var u = { start: t.selectionStart, end: t.selectionEnd };
      else
        e: {
          u = (u = t.ownerDocument) && u.defaultView || window;
          var f = u.getSelection && u.getSelection();
          if (f && f.rangeCount !== 0) {
            u = f.anchorNode;
            var h = f.anchorOffset, w = f.focusNode;
            f = f.focusOffset;
            try {
              u.nodeType, w.nodeType;
            } catch {
              u = null;
              break e;
            }
            var z = 0, I = -1, ee = -1, oe = 0, ve = 0, P = t, ae = null;
            t: for (; ; ) {
              for (var Me; P !== u || h !== 0 && P.nodeType !== 3 || (I = z + h), P !== w || f !== 0 && P.nodeType !== 3 || (ee = z + f), P.nodeType === 3 && (z += P.nodeValue.length), (Me = P.firstChild) !== null; )
                ae = P, P = Me;
              for (; ; ) {
                if (P === t)
                  break t;
                if (ae === u && ++oe === h && (I = z), ae === w && ++ve === f && (ee = z), (Me = P.nextSibling) !== null)
                  break;
                P = ae, ae = P.parentNode;
              }
              P = Me;
            }
            u = I === -1 || ee === -1 ? null : { start: I, end: ee };
          } else
            u = null;
        }
      u = u || { start: 0, end: 0 };
    } else
      u = null;
    for (yh = { focusedElem: t, selectionRange: u }, Ca = false, r = (r & 335544064) === r, en = n, n = r ? 9270 : 1024; en !== null; ) {
      if (t = en, r && (u = t.deletions, u !== null))
        for (h = 0; h < u.length; h++)
          r && qd(u[h]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        r && Sy(t), _s(r);
      else {
        if (t.tag === 22) {
          if (u = t.alternate, t.memoizedState !== null) {
            u !== null && u.memoizedState === null && r && qd(u), _s(r);
            continue;
          } else if (u !== null && u.memoizedState !== null) {
            r && Sy(t), _s(r);
            continue;
          }
        }
        u = t.child, (t.subtreeFlags & n) !== 0 && u !== null ? (u.return = t, en = u) : (r && ky(t), _s(r));
      }
    }
    Mn = null;
  }
  function _s(t) {
    for (; en !== null; ) {
      var n = en, r = t, u = n.alternate, f = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((f & 1024) !== 0 && u !== null) {
            r = void 0, f = u.memoizedProps, u = u.memoizedState;
            var h = n.stateNode;
            try {
              var w = fr(n.type, f);
              r = h.getSnapshotBeforeUpdate(w, u), h.__reactInternalSnapshotBeforeUpdate = r;
            } catch (z) {
              yt(n, n.return, z);
            }
          }
          break;
        case 3:
          if ((f & 1024) !== 0) {
            if (u = n.stateNode.containerInfo, r = u.nodeType, r === 9)
              Ch(u);
            else if (r === 1)
              switch (u.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Ch(u);
                  break;
                default:
                  u.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          r && u !== null && (r = qi(u.memoizedProps, u.stateNode), f = n.memoizedProps, f = Vi(f.default, f.update), f !== "none" && aa(u, r, f, u.memoizedState = [], true));
          break;
        default:
          if ((f & 1024) !== 0)
            throw Error(a(163));
      }
      if (u = n.sibling, u !== null) {
        u.return = n.return, en = u;
        break;
      }
      en = n.return;
    }
  }
  function Ty(t, n, r) {
    var u = r.flags;
    switch (r.tag) {
      case 0:
      case 11:
      case 15:
        ki(t, r), u & 4 && Su(5, r);
        break;
      case 1:
        if (ki(t, r), u & 4)
          if (t = r.stateNode, n === null)
            try {
              t.componentDidMount();
            } catch (w) {
              yt(r, r.return, w);
            }
          else {
            var f = fr(r.type, n.memoizedProps);
            n = n.memoizedState;
            try {
              t.componentDidUpdate(f, n, t.__reactInternalSnapshotBeforeUpdate);
            } catch (w) {
              yt(r, r.return, w);
            }
          }
        u & 64 && yy(r), u & 512 && bi(r, r.return);
        break;
      case 3:
        if (ki(t, r), u & 64 && (t = r.updateQueue, t !== null)) {
          if (n = null, r.child !== null)
            switch (r.child.tag) {
              case 27:
              case 5:
                n = r.child.stateNode;
                break;
              case 1:
                n = r.child.stateNode;
            }
          try {
            a0(t, n);
          } catch (w) {
            yt(r, r.return, w);
          }
        }
        break;
      case 27:
        n === null && u & 4 && wy(r);
      case 26:
      case 5:
        ki(t, r), n === null && u & 4 && Rd(r), u & 512 && bi(r, r.return);
        break;
      case 12:
        ki(t, r);
        break;
      case 31:
        ki(t, r), u & 4 && Dy(t, r);
        break;
      case 13:
        ki(t, r), u & 4 && Oy(t, r), u & 64 && (t = r.memoizedState, t !== null && (t = t.dehydrated, t !== null && (r = OC.bind(null, r), pk(t, r))));
        break;
      case 22:
        if (u = r.memoizedState !== null || Wt, !u) {
          var h = n !== null && n.memoizedState !== null || mt;
          n = Wt, f = mt, Wt = u, (mt = h) && !f ? (u = 2, (r.subtreeFlags & 8772) !== 0 && (u |= 1), li(t, r, u)) : ki(t, r), Wt = n, mt = f;
        }
        break;
      case 30:
        ki(t, r), u & 512 && bi(r, r.return);
        break;
      case 7:
        u & 512 && bi(r, r.return);
      default:
        ki(t, r);
    }
  }
  function $d(t, n) {
    for (t = t.child; t !== null; )
      Ay(t, n), t = t.sibling;
  }
  function Ay(t, n) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var r = t.stateNode;
          if (n) {
            var u = r.style;
            typeof u.setProperty == "function" ? u.setProperty("display", "none", "important") : u.display = "none";
          } else {
            var f = t.stateNode, h = t.memoizedProps.style, w = h != null && h.hasOwnProperty("display") ? h.display : null;
            f.style.display = w == null || typeof w == "boolean" ? "" : ("" + w).trim();
          }
        } catch (I) {
          yt(t, t.return, I);
        }
        Qd(t, n);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = n ? "" : t.memoizedProps, st = true;
        } catch (I) {
          yt(t, t.return, I);
        }
        break;
      case 18:
        try {
          var z = t.stateNode;
          n ? S1(z, true) : S1(t.stateNode, false);
        } catch (I) {
          yt(t, t.return, I);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && $d(t, n);
        break;
      default:
        $d(t, n);
    }
  }
  function Qd(t, n) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        e: {
          var r = t, u = n;
          switch (r.tag) {
            case 4:
              Ay(r, u);
              break e;
            case 22:
              r.memoizedState === null && Qd(r, u);
              break e;
            default:
              Qd(r, u);
          }
        }
        t = t.sibling;
      }
  }
  function My(t) {
    var n = t.alternate;
    n !== null && (t.alternate = null, My(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Ir(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var At = null, wn = false;
  function ni(t, n, r) {
    for (r = r.child; r !== null; )
      jy(t, n, r), r = r.sibling;
  }
  function jy(t, n, r) {
    if (nn && typeof nn.onCommitFiberUnmount == "function")
      try {
        nn.onCommitFiberUnmount(In, r);
      } catch {
      }
    switch (r.tag) {
      case 26:
        mt || un(r, n), ni(t, n, r), r.memoizedState ? r.memoizedState.count-- : r.stateNode && !mt && (r = r.stateNode, r.parentNode.removeChild(r));
        break;
      case 27:
        mt || un(r, n), Eu(r);
        var u = At, f = wn;
        Ml(r.type) && (At = r.stateNode, wn = false), ni(t, n, r), L1(r.stateNode, r.type, r.memoizedProps), At = u, wn = f;
        break;
      case 5:
        mt || un(r, n), Eu(r);
      case 6:
        if (r.tag === 6 && Eu(r), u = At, f = wn, At = null, ni(t, n, r), At = u, wn = f, At !== null)
          if (wn)
            try {
              (At.nodeType === 9 ? At.body : At.nodeName === "HTML" ? At.ownerDocument.body : At).removeChild(r.stateNode), st = true;
            } catch (h) {
              yt(r, n, h);
            }
          else
            try {
              At.removeChild(r.stateNode), st = true;
            } catch (h) {
              yt(r, n, h);
            }
        break;
      case 18:
        At !== null && (wn ? (t = At, w1(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, r.stateNode), ka(t)) : w1(At, r.stateNode));
        break;
      case 4:
        u = At, f = wn, At = r.stateNode.containerInfo, wn = true, ni(t, n, r), At = u, wn = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Cl(2, r, n), mt || Cl(4, r, n), ni(t, n, r);
        break;
      case 1:
        mt || (un(r, n), u = r.stateNode, typeof u.componentWillUnmount == "function" && xy(r, n, u)), ni(t, n, r);
        break;
      case 21:
        ni(t, n, r);
        break;
      case 22:
        mt = (u = mt) || r.memoizedState !== null, ni(t, n, r), mt = u;
        break;
      case 30:
        un(r, n), ni(t, n, r);
        break;
      case 7:
        mt || un(r, n), ni(t, n, r);
        break;
      default:
        ni(t, n, r);
    }
  }
  function Dy(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        ka(t);
      } catch (r) {
        yt(n, n.return, r);
      }
    }
  }
  function Oy(t, n) {
    if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        ka(t);
      } catch (r) {
        yt(n, n.return, r);
      }
  }
  function EC(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var n = t.stateNode;
        return n === null && (n = t.stateNode = new zy()), n;
      case 22:
        return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new zy()), n;
      default:
        throw Error(a(435, t.tag));
    }
  }
  function zs(t, n) {
    var r = EC(t);
    n.forEach(function(u) {
      if (!r.has(u)) {
        r.add(u);
        var f = RC.bind(null, t, u);
        u.then(f, f);
      }
    });
  }
  function yn(t, n, r) {
    var u = n.deletions;
    if (u !== null)
      for (var f = 0; f < u.length; f++) {
        var h = u[f], w = t, z = n, I = z;
        e: for (; I !== null; ) {
          switch (I.tag) {
            case 27:
              if (Ml(I.type)) {
                At = I.stateNode, wn = false;
                break e;
              }
              break;
            case 5:
              At = I.stateNode, wn = false;
              break e;
            case 3:
            case 4:
              At = I.stateNode.containerInfo, wn = true;
              break e;
          }
          I = I.return;
        }
        if (At === null)
          throw Error(a(160));
        jy(w, z, h), At = null, wn = false, w = h.alternate, w !== null && (w.return = null), h.return = null;
      }
    if (n.subtreeFlags & 13886)
      for (n = n.child; n !== null; )
        Ry(n, t, r), n = n.sibling;
  }
  var ii = null;
  function Ry(t, n, r) {
    var u = t.alternate, f = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (f & 4 && (u = t.updateQueue, u = u !== null ? u.events : null, u !== null))
          for (var h = 0; h < u.length; h++) {
            var w = u[h];
            w.ref.impl = w.nextImpl;
          }
        yn(n, t, r), xn(t), f & 4 && (Cl(3, t, t.return), Su(3, t), Cl(5, t, t.return));
        break;
      case 1:
        yn(n, t, r), xn(t), f & 512 && (mt || u === null || un(u, u.return)), f & 64 && Wt && (t = t.updateQueue, t !== null && (n = t.callbacks, n !== null && (r = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = r === null ? n : r.concat(n))));
        break;
      case 26:
        if (h = ii, yn(n, t, r), xn(t), f & 512 && (mt || u === null || un(u, u.return)), f & 4)
          if (f = u !== null ? u.memoizedState : null, r = t.memoizedState, u === null)
            if (r === null)
              if (t.stateNode === null)
                if (Wt)
                  t.stateNode = x1(t.type, t.memoizedProps, n.containerInfo, t);
                else {
                  e: {
                    n = t.type, r = t.memoizedProps, f = h.ownerDocument || h;
                    t: switch (n) {
                      case "title":
                        u = f.getElementsByTagName("title")[0], (!u || u[Fl] || u[ht] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = f.createElement(n), f.head.insertBefore(u, f.querySelector("head > title"))), on(u, n, r), u[ht] = t, qt(u), n = u;
                        break e;
                      case "link":
                        if (h = V1("link", "href", f).get(n + (r.href || ""))) {
                          for (w = 0; w < h.length; w++)
                            if (u = h[w], u.getAttribute("href") === (r.href == null || r.href === "" ? null : r.href) && u.getAttribute("rel") === (r.rel == null ? null : r.rel) && u.getAttribute("title") === (r.title == null ? null : r.title) && u.getAttribute("crossorigin") === (r.crossOrigin == null ? null : r.crossOrigin)) {
                              h.splice(w, 1);
                              break t;
                            }
                        }
                        u = f.createElement(n), on(u, n, r), f.head.appendChild(u);
                        break;
                      case "meta":
                        if (h = V1("meta", "content", f).get(n + (r.content || ""))) {
                          for (w = 0; w < h.length; w++)
                            if (u = h[w], u.getAttribute("content") === (r.content == null ? null : "" + r.content) && u.getAttribute("name") === (r.name == null ? null : r.name) && u.getAttribute("property") === (r.property == null ? null : r.property) && u.getAttribute("http-equiv") === (r.httpEquiv == null ? null : r.httpEquiv) && u.getAttribute("charset") === (r.charSet == null ? null : r.charSet)) {
                              h.splice(w, 1);
                              break t;
                            }
                        }
                        u = f.createElement(n), on(u, n, r), f.head.appendChild(u);
                        break;
                      default:
                        throw Error(a(468, n));
                    }
                    u[ht] = t, qt(u), n = u;
                  }
                  t.stateNode = n;
                }
              else
                Wt || Mh(h, t.type, t.stateNode);
            else
              t.stateNode = q1(h, r, t.memoizedProps);
          else
            f !== r ? (f === null ? (n = u.stateNode, n === null || mt || n.parentNode.removeChild(n)) : f.count--, r === null ? Wt || Mh(h, t.type, t.stateNode) : q1(h, r, t.memoizedProps)) : r === null && t.stateNode !== null && Ld(t, t.memoizedProps, u.memoizedProps);
        break;
      case 27:
        yn(n, t, r), xn(t), f & 512 && (mt || u === null || un(u, u.return)), u !== null && f & 4 && Ld(t, t.memoizedProps, u.memoizedProps);
        break;
      case 5:
        if (h = Ei, Ei = false, yn(n, t, r), Ei = h, xn(t), f & 512 && (mt || u === null || un(u, u.return)), t.flags & 32) {
          n = t.stateNode;
          try {
            Vr(n, ""), st = true;
          } catch (oe) {
            yt(t, t.return, oe);
          }
        }
        f & 4 && t.stateNode != null && (n = t.memoizedProps, Ld(t, n, u !== null ? u.memoizedProps : n)), f & 1024 && (Xd = true);
        break;
      case 6:
        if (yn(n, t, r), xn(t), f & 4) {
          if (t.stateNode === null)
            throw Error(a(162));
          n = t.memoizedProps, r = t.stateNode;
          try {
            r.nodeValue = n, st = true;
          } catch (oe) {
            yt(t, t.return, oe);
          }
        }
        break;
      case 3:
        if (st = false, Ys = null, h = ii, ii = Du(n.containerInfo), yn(n, t, r), ii = h, xn(t), f & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            ka(n.containerInfo);
          } catch (oe) {
            yt(t, t.return, oe);
          }
        Xd && (Xd = false, Ly(t)), st = false;
        break;
      case 4:
        f = Ei, Ei = Wt, u = ng(), h = ii, ii = Du(t.stateNode.containerInfo), yn(n, t, r), xn(t), ii = h, st && Cu && (Ns = true), st = u, Ei = f;
        break;
      case 12:
        yn(n, t, r), xn(t);
        break;
      case 31:
        yn(n, t, r), xn(t), f & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, zs(t, n)));
        break;
      case 13:
        yn(n, t, r), xn(t), t.child.flags & 8192 && t.memoizedState !== null != (u !== null && u.memoizedState !== null) && (Ms = bt()), f & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, zs(t, n)));
        break;
      case 22:
        h = t.memoizedState !== null, w = u !== null && u.memoizedState !== null;
        var z = Wt, I = mt, ee = Ei;
        Wt = z || h, Ei = ee || h, mt = I || w, yn(n, t, r), mt = I, Ei = ee, Wt = z, xn(t), f & 8192 && (n = t.stateNode, n._visibility = h ? n._visibility & -2 : n._visibility | 1, !h || u === null || w || Wt || mt || (n = w || mt, r = Wt, u = mt, Wt = h || Wt, mt = n, kl(t, 2), Wt = r, mt = u), !h && Ei || $d(t, h)), f & 4 && (n = t.updateQueue, n !== null && (r = n.retryQueue, r !== null && (n.retryQueue = null, zs(t, r))));
        break;
      case 19:
        yn(n, t, r), xn(t), f & 4 && (n = t.updateQueue, n !== null && (t.updateQueue = null, zs(t, n)));
        break;
      case 30:
        f & 512 && (mt || u === null || un(u, u.return)), f = ng(), h = Cu, w = (r & 335544064) === r, z = t.memoizedProps, Cu = w && Vi(z.default, z.update) !== "none", yn(n, t, r), xn(t), w && u !== null && st && (t.flags |= 4), Cu = h, st = f;
        break;
      case 21:
        break;
      case 7:
        f & 512 && (mt || u === null || un(u, u.return)), u && u.stateNode !== null && (u.stateNode._fragmentFiber = t);
      default:
        yn(n, t, r), xn(t);
    }
  }
  function xn(t) {
    var n = t.flags;
    if (n & 2) {
      try {
        for (var r, u = t.return; u !== null; ) {
          if (by(u)) {
            r = u;
            break;
          }
          u = u.return;
        }
        u = null;
        for (var f = t.return; f !== null; ) {
          if (Od(f)) {
            var h = f.stateNode;
            u === null ? u = [h] : u.push(h);
          }
          if (Dd(f))
            break;
          f = f.return;
        }
        var w = u;
        if (r == null)
          throw Error(a(160));
        switch (r.tag) {
          case 27:
            var z = r.stateNode, I = Hd(t);
            Ss(t, I, z, w);
            break;
          case 5:
            var ee = r.stateNode;
            r.flags & 32 && (Vr(ee, ""), r.flags &= -33);
            var oe = Hd(t);
            Ss(t, oe, ee, w);
            break;
          case 3:
          case 4:
            var ve = r.stateNode.containerInfo, P = Hd(t);
            Bd(t, P, ve, w);
            break;
          default:
            throw Error(a(161));
        }
      } catch (ae) {
        yt(t, t.return, ae);
      }
      t.flags &= -3;
    }
    n & 4096 && (t.flags &= -4097);
  }
  function Ly(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var n = t;
        Ly(n), n.tag === 5 && n.flags & 1024 && (n = n.stateNode, Ca = true, n.reset(), Ca = false), t = t.sibling;
      }
  }
  function ua(t, n) {
    if (n.subtreeFlags & 9270)
      for (n = n.child; n !== null; )
        Hy(n, t), n = n.sibling;
    else
      _y(n);
  }
  function Hy(t, n) {
    var r = t.alternate;
    if (r === null)
      Ud(t, false);
    else
      switch (t.tag) {
        case 3:
          if (Gd = Ci = false, Ey(), ua(n, t), !Ci && !Ns) {
            if (t = wi, t !== null)
              for (var u = 0; u < t.length; u += 3) {
                r = t[u];
                var f = t[u + 1];
                C1(r, t[u + 2]), r = r.ownerDocument.documentElement, r !== null && r.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(" + f + ")" });
              }
            t = n.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate({ opacity: [0, 0], pointerEvents: ["none", "none"] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition-group(root)" }), t.animate({ width: [0, 0], height: [0, 0] }, { duration: 0, fill: "forwards", pseudoElement: "::view-transition" })), Gd = true;
          }
          wi = null;
          break;
        case 5:
          ua(n, t);
          break;
        case 4:
          u = Ci, Ci = false, ua(n, t), Ci && (Ns = true), Ci = u;
          break;
        case 22:
          t.memoizedState === null && (r.memoizedState !== null ? Ud(t, false) : ua(n, t));
          break;
        case 30:
          u = Ci, f = Ey(), Ci = false, ua(n, t), Ci && (t.flags |= 4);
          var h = t.memoizedProps, w = t.stateNode;
          n = qi(h, w), w = qi(r.memoizedProps, w);
          var z = Vi(h.default, h.update);
          z === "none" ? n = false : (h = r.memoizedState, r.memoizedState = null, r = t.child, bn = 0, n = Yd(t, r, n, w, z, h, true), bn !== (h === null ? 0 : h.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && n ? (ma(t, t.memoizedProps.onUpdate), wi = f) : f !== null && (f.push.apply(f, wi), wi = f), Ci = (t.flags & 32) !== 0 ? true : u;
          break;
        default:
          ua(n, t);
      }
  }
  function ki(t, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        Ty(t, n.alternate, n), n = n.sibling;
  }
  function kl(t, n) {
    for (t = t.child; t !== null; ) {
      var r = t, u = n;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Cl(4, r, r.return), kl(r, u);
          break;
        case 1:
          un(r, r.return);
          var f = r.stateNode;
          typeof f.componentWillUnmount == "function" && xy(r, r.return, f), kl(r, u);
          break;
        case 27:
          (u & 2) !== 0 && L1(r.stateNode, r.type, r.memoizedProps);
        case 5:
          un(r, r.return), r.tag !== 5 && r.tag !== 27 || Eu(r), kl(r, u);
          break;
        case 6:
          Eu(r);
          break;
        case 26:
          un(r, r.return), f = r.stateNode, r.memoizedState !== null || f === null || mt || f.parentNode.removeChild(f), kl(r, u);
          break;
        case 22:
          r.memoizedState === null && kl(r, u);
          break;
        case 30:
          un(r, r.return), kl(r, u);
          break;
        case 7:
          un(r, r.return);
        default:
          kl(r, u);
      }
      t = t.sibling;
    }
  }
  function li(t, n, r) {
    for (r = (n.subtreeFlags & 8772) !== 0 ? r : r & -2, n = n.child; n !== null; ) {
      var u = n.alternate, f = t, h = n, w = h.flags, z = (r & 1) !== 0;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          li(f, h, r), Su(4, h);
          break;
        case 1:
          if (li(f, h, r), u = h, f = u.stateNode, typeof f.componentDidMount == "function")
            try {
              f.componentDidMount();
            } catch (oe) {
              yt(u, u.return, oe);
            }
          if (u = h, f = u.updateQueue, f !== null) {
            var I = u.stateNode;
            try {
              var ee = f.shared.hiddenCallbacks;
              if (ee !== null)
                for (f.shared.hiddenCallbacks = null, f = 0; f < ee.length; f++)
                  r0(ee[f], I);
            } catch (oe) {
              yt(u, u.return, oe);
            }
          }
          z && w & 64 && yy(h), bi(h, h.return);
          break;
        case 27:
          (r & 2) !== 0 && wy(h);
        case 5:
          h.tag !== 5 && h.tag !== 27 || vy(h), li(f, h, r), z && u === null && w & 4 && Rd(h), bi(h, h.return);
          break;
        case 6:
          vy(h);
          break;
        case 26:
          I = h.stateNode, h.memoizedState !== null || I === null || Wt || Mh(Du(I.ownerDocument), h.type, I), li(f, h, r), z && u === null && w & 4 && Rd(h), bi(h, h.return);
          break;
        case 12:
          li(f, h, r);
          break;
        case 31:
          li(f, h, r), z && w & 4 && Dy(f, h);
          break;
        case 13:
          li(f, h, r), z && w & 4 && Oy(f, h);
          break;
        case 22:
          h.memoizedState === null && li(f, h, r), bi(h, h.return);
          break;
        case 30:
          li(f, h, r), bi(h, h.return);
          break;
        case 7:
          bi(h, h.return);
        default:
          li(f, h, r);
      }
      n = n.sibling;
    }
  }
  function Zd(t, n) {
    var r = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== r && (t != null && t.refCount++, r != null && su(r));
  }
  function Fd(t, n) {
    t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && su(t));
  }
  function Zn(t, n, r, u) {
    var f = (r & 335544064) === r;
    if (n.subtreeFlags & (f ? 10262 : 10256))
      for (n = n.child; n !== null; )
        By(t, n, r, u), n = n.sibling;
    else
      f && Ny(n);
  }
  function By(t, n, r, u) {
    var f = (r & 335544064) === r;
    f && n.alternate === null && n.return !== null && n.return.alternate !== null && ks(n);
    var h = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        Zn(t, n, r, u), h & 2048 && Su(9, n);
        break;
      case 1:
        Zn(t, n, r, u);
        break;
      case 3:
        Zn(t, n, r, u), f && Gd && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), h & 2048 && (h = null, n.alternate !== null && (h = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== h && (n.refCount++, h != null && su(h)));
        break;
      case 12:
        if (h & 2048) {
          Zn(t, n, r, u), h = n.stateNode;
          try {
            var w = n.memoizedProps, z = w.id, I = w.onPostCommit;
            typeof I == "function" && I(z, n.alternate === null ? "mount" : "update", h.passiveEffectDuration, -0);
          } catch (ee) {
            yt(n, n.return, ee);
          }
        } else
          Zn(t, n, r, u);
        break;
      case 31:
        Zn(t, n, r, u);
        break;
      case 13:
        Zn(t, n, r, u);
        break;
      case 23:
        break;
      case 22:
        w = n.stateNode, z = n.alternate, n.memoizedState !== null ? (f && z !== null && z.memoizedState === null && ks(z), w._visibility & 2 ? Zn(t, n, r, u) : ku(t, n)) : (f && z !== null && z.memoizedState !== null && ks(n), w._visibility & 2 ? Zn(t, n, r, u) : (w._visibility |= 2, oa(t, n, r, u, (n.subtreeFlags & 10256) !== 0 || false))), h & 2048 && Zd(z, n);
        break;
      case 24:
        Zn(t, n, r, u), h & 2048 && Fd(n.alternate, n);
        break;
      case 30:
        f && (h = n.alternate, h !== null && (Si(h.child, true), Si(n.child, true))), Zn(t, n, r, u);
        break;
      default:
        Zn(t, n, r, u);
    }
  }
  function oa(t, n, r, u, f) {
    for (f = f && ((n.subtreeFlags & 10256) !== 0 || false), n = n.child; n !== null; ) {
      var h = t, w = n, z = r, I = u, ee = w.flags;
      switch (w.tag) {
        case 0:
        case 11:
        case 15:
          oa(h, w, z, I, f), Su(8, w);
          break;
        case 23:
          break;
        case 22:
          var oe = w.stateNode;
          w.memoizedState !== null ? oe._visibility & 2 ? oa(h, w, z, I, f) : ku(h, w) : (oe._visibility |= 2, oa(h, w, z, I, f)), f && ee & 2048 && Zd(w.alternate, w);
          break;
        case 24:
          oa(h, w, z, I, f), f && ee & 2048 && Fd(w.alternate, w);
          break;
        default:
          oa(h, w, z, I, f);
      }
      n = n.sibling;
    }
  }
  function ku(t, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var r = t, u = n, f = u.flags;
        switch (u.tag) {
          case 22:
            ku(r, u), f & 2048 && Zd(u.alternate, u);
            break;
          case 24:
            ku(r, u), f & 2048 && Fd(u.alternate, u);
            break;
          default:
            ku(r, u);
        }
        n = n.sibling;
      }
  }
  var dr = 8192;
  function hr(t, n, r) {
    if (t.subtreeFlags & dr)
      for (t = t.child; t !== null; )
        Uy(t, n, r), t = t.sibling;
  }
  function Uy(t, n, r) {
    switch (t.tag) {
      case 26:
        hr(t, n, r), t.flags & dr && (t.memoizedState !== null ? Tk(r, ii, t.memoizedState, t.memoizedProps) : (t = t.stateNode, (n & 335544128) === n && $1(r, t)));
        break;
      case 5:
        hr(t, n, r), t.flags & dr && (t = t.stateNode, (n & 335544128) === n && $1(r, t));
        break;
      case 3:
      case 4:
        var u = ii;
        ii = Du(t.stateNode.containerInfo), hr(t, n, r), ii = u;
        break;
      case 22:
        t.memoizedState === null && (u = t.alternate, u !== null && u.memoizedState !== null ? (u = dr, dr = 16777216, hr(t, n, r), dr = u) : hr(t, n, r));
        break;
      case 30:
        if ((t.flags & dr) !== 0 && (u = t.memoizedProps.name, u != null && u !== "auto")) {
          var f = t.stateNode;
          f.paired = null, Mn === null && (Mn = /* @__PURE__ */ new Map()), Mn.set(u, f);
        }
        hr(t, n, r);
        break;
      default:
        hr(t, n, r);
    }
  }
  function Iy(t) {
    var n = t.alternate;
    if (n !== null && (t = n.child, t !== null)) {
      n.child = null;
      do
        n = t.sibling, t.sibling = null, t = n;
      while (t !== null);
    }
  }
  function Nu(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var u = n[r];
          en = u, Vy(u, t);
        }
      Iy(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        qy(t), t = t.sibling;
  }
  function qy(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Nu(t), t.flags & 2048 && Cl(9, t, t.return);
        break;
      case 3:
        Nu(t);
        break;
      case 12:
        Nu(t);
        break;
      case 22:
        var n = t.stateNode;
        t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, Ts(t)) : Nu(t);
        break;
      default:
        Nu(t);
    }
  }
  function Ts(t) {
    var n = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (n !== null)
        for (var r = 0; r < n.length; r++) {
          var u = n[r];
          en = u, Vy(u, t);
        }
      Iy(t);
    }
    for (t = t.child; t !== null; ) {
      switch (n = t, n.tag) {
        case 0:
        case 11:
        case 15:
          Cl(8, n, n.return), Ts(n);
          break;
        case 22:
          r = n.stateNode, r._visibility & 2 && (r._visibility &= -3, Ts(n));
          break;
        default:
          Ts(n);
      }
      t = t.sibling;
    }
  }
  function Vy(t, n) {
    for (; en !== null; ) {
      var r = en;
      switch (r.tag) {
        case 0:
        case 11:
        case 15:
          Cl(8, r, n);
          break;
        case 23:
        case 22:
          if (r.memoizedState !== null && r.memoizedState.cachePool !== null) {
            var u = r.memoizedState.cachePool.pool;
            u != null && u.refCount++;
          }
          break;
        case 24:
          su(r.memoizedState.cache);
      }
      if (u = r.child, u !== null)
        u.return = r, en = u;
      else
        e: for (r = t; en !== null; ) {
          u = en;
          var f = u.sibling, h = u.return;
          if (My(u), u === r) {
            en = null;
            break e;
          }
          if (f !== null) {
            f.return = h, en = f;
            break e;
          }
          en = h;
        }
    }
  }
  var CC = { getCacheForType: function(t) {
    var n = ln(Vt), r = n.data.get(t);
    return r === void 0 && (r = t(), n.data.set(t, r)), r;
  }, cacheSignal: function() {
    return ln(Vt).controller.signal;
  } }, kC = typeof WeakMap == "function" ? WeakMap : Map, dt = 0, St = null, nt = null, rt = 0, gt = 0, jn = null, Nl = false, sa = false, Kd = false, Pi = 0, Rt = 0, _l = 0, mr = 0, As = 0, Dn = 0, ca = 0, _u = null, Sn = null, Pd = false, Ms = 0, Yy = 0, js = 1 / 0, Ds = null, zl = null, jt = 0, ri = null, pr = null, Ni = 0, Jd = 0, Wd = null, Xy = null, fa = null, da = null, ha = null, zu = 0, Os = null;
  function On() {
    return (dt & 2) !== 0 && rt !== 0 ? rt & -rt : fe.T !== null ? sh() : Ue();
  }
  function Gy() {
    if (Dn === 0)
      if ((rt & 536870912) === 0 || We) {
        var t = Jn;
        Jn <<= 1, (Jn & 3932160) === 0 && (Jn = 262144), Dn = t;
      } else
        Dn = 536870912;
    return t = rn.current, t !== null && (t.flags |= 32), Dn;
  }
  function ma(t, n) {
    if (n != null) {
      var r = t.stateNode, u = r.ref;
      u === null && (u = r.ref = k1(qi(t.memoizedProps, r))), da === null && (da = []), da.push(n.bind(null, u));
    }
  }
  function En(t, n, r) {
    (t === St && (gt === 2 || gt === 9) || t.cancelPendingCommit !== null) && (pa(t, 0), Tl(t, rt, Dn, false)), ue(t, r), ((dt & 2) === 0 || t !== St) && (t === St && ((dt & 2) === 0 && (mr |= r), Rt === 4 && Tl(t, rt, Dn, false)), _i(t));
  }
  function $y(t, n, r) {
    if ((dt & 6) !== 0)
      throw Error(a(327));
    var u = !r && (n & 127) === 0 && (n & t.expiredLanes) === 0 || Li(t, n), f = u ? zC(t, n) : th(t, n, true), h = u;
    do {
      if (f === 0) {
        sa && !u && Tl(t, n, 0, false);
        break;
      } else {
        if (r = t.current.alternate, h && !NC(r)) {
          f = th(t, n, false), h = false;
          continue;
        }
        if (f === 2) {
          if (h = n, t.errorRecoveryDisabledLanes & h)
            var w = 0;
          else
            w = t.pendingLanes & -536870913, w = w !== 0 ? w : w & 536870912 ? 536870912 : 0;
          if (w !== 0) {
            n = w;
            e: {
              var z = t;
              f = _u;
              var I = z.current.memoizedState.isDehydrated;
              if (I && (pa(z, w).flags |= 256), w = th(z, w, false), w !== 2 && w !== 6) {
                if (Kd && !I) {
                  z.errorRecoveryDisabledLanes |= h, mr |= h, f = 4;
                  break e;
                }
                h = Sn, Sn = f, h !== null && (Sn === null ? Sn = h : Sn.push.apply(Sn, h));
              }
              f = w;
            }
            if (h = false, f !== 2)
              continue;
          }
        }
        if (f === 1) {
          pa(t, 0), Tl(t, n, 0, true);
          break;
        }
        e: {
          switch (u = t, h = f, h) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((n & 4194048) !== n && (n & 62914560) !== n)
                break;
            case 6:
              Tl(u, n, Dn, !Nl);
              break e;
            case 2:
              Sn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((n & 62914560) === n && (f = Ms + 300 - bt(), 10 < f)) {
            if (Tl(u, n, Dn, !Nl), ul(u, 0, true) !== 0)
              break e;
            Ni = n, u.timeoutHandle = bh(Qy.bind(null, u, r, Sn, Ds, Pd, n, Dn, mr, ca, Nl, h, "Throttled", -0, 0), f);
            break e;
          }
          Qy(u, r, Sn, Ds, Pd, n, Dn, mr, ca, Nl, h, null, -0, 0);
        }
      }
      break;
    } while (true);
    _i(t);
  }
  function Qy(t, n, r, u, f, h, w, z, I, ee, oe, ve, P, ae) {
    t.timeoutHandle = -1;
    var Me = n.subtreeFlags, Oe = (h & 335544064) === h;
    if (ve = null, (Oe || Me & 8192 || (Me & 16785408) === 16785408) && (ve = { stylesheets: null, count: 0, imgCount: 0, imgBytes: 0, suspenseyImages: [], waitingForImages: true, waitingForViewTransition: false, unsuspend: yi }, Mn = null, Uy(n, h, ve), Oe && (Me = ve, Oe = t.containerInfo, Oe = (Oe.nodeType === 9 ? Oe : Oe.ownerDocument).__reactViewTransition, Oe != null && (Me.count++, Me.waitingForViewTransition = true, Me = Lu.bind(Me), Oe.finished.then(Me, Me))), Me = (h & 62914560) === h ? Ms - bt() : (h & 4194048) === h ? Yy - bt() : 0, Me = Ak(ve, Me), Me !== null)) {
      Ni = h, t.cancelPendingCommit = Me(t1.bind(null, t, n, h, r, u, f, w, z, I, ee, oe, ve, null, P, ae)), Tl(t, h, w, !ee);
      return;
    }
    t1(t, n, h, r, u, f, w, z, I, ee, oe, ve);
  }
  function NC(t) {
    for (var n = t; ; ) {
      var r = n.tag;
      if ((r === 0 || r === 11 || r === 15) && n.flags & 16384 && (r = n.updateQueue, r !== null && (r = r.stores, r !== null)))
        for (var u = 0; u < r.length; u++) {
          var f = r[u], h = f.getSnapshot;
          f = f.value;
          try {
            if (!Tn(h(), f))
              return false;
          } catch {
            return false;
          }
        }
      if (r = n.child, n.subtreeFlags & 16384 && r !== null)
        r.return = n, n = r;
      else {
        if (n === t)
          break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === t)
            return true;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return true;
  }
  function Tl(t, n, r, u) {
    n = Zl(t, n), n &= ~As, n &= ~mr, t.suspendedLanes |= n, t.pingedLanes &= ~n, u && (t.warmLanes |= n), u = t.expirationTimes;
    for (var f = n; 0 < f; ) {
      var h = 31 - Pt(f), w = 1 << h;
      u[h] = -1, f &= ~w;
    }
    r !== 0 && _e(t, r, n);
  }
  function Rs() {
    return (dt & 6) === 0 ? (Tu(0), false) : true;
  }
  function eh() {
    if (nt !== null) {
      if (gt === 0)
        var t = nt.return;
      else
        t = nt, Gi = nr = null, od(t), ta = null, du = 0, t = nt;
      for (; t !== null; )
        gy(t.alternate, t), t = t.return;
      nt = null;
    }
  }
  function pa(t, n) {
    var r = t.timeoutHandle;
    return r !== -1 && (t.timeoutHandle = -1, KC(r)), r = t.cancelPendingCommit, r !== null && (t.cancelPendingCommit = null, r()), Ni = 0, eh(), St = t, nt = r = Yi(t.current, null), rt = n, gt = 0, jn = null, Nl = false, sa = Li(t, n), Kd = false, ca = Dn = As = mr = _l = Rt = 0, Sn = _u = null, Pd = false, Pi = Zl(t, n), Yo(), r;
  }
  function Zy(t, n) {
    Pe = null, fe.H = ms, n === ea || n === es ? (n = t0(), gt = 3) : n === Ff ? (n = t0(), gt = 4) : gt = n === Ed ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, jn = n, nt === null && (Rt = 1, ps(t, Xn(n, t.current)));
  }
  function Fy() {
    var t = rn.current;
    return t === null ? true : (rt & 4194048) === rt ? mn === null : (rt & 62914560) === rt || (rt & 536870912) !== 0 ? t === mn : false;
  }
  function Ky() {
    var t = fe.H;
    return fe.H = ms, t === null ? ms : t;
  }
  function Py() {
    var t = fe.A;
    return fe.A = CC, t;
  }
  function Ls() {
    Rt = 4, Nl || (rt & 4194048) !== rt && rn.current !== null || (sa = true), (_l & 134217727) === 0 && (mr & 134217727) === 0 || St === null || Tl(St, rt, Dn, false);
  }
  function th(t, n, r) {
    var u = dt;
    dt |= 2;
    var f = Ky(), h = Py();
    (St !== t || rt !== n) && (Ds = null, pa(t, n)), n = false;
    var w = Rt;
    e: do
      try {
        if (gt !== 0 && nt !== null) {
          var z = nt, I = jn;
          switch (gt) {
            case 8:
              eh(), w = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              rn.current === null && (n = true);
              var ee = gt;
              if (gt = 0, jn = null, ga(t, z, I, ee), r && sa) {
                w = 0;
                break e;
              }
              break;
            default:
              ee = gt, gt = 0, jn = null, ga(t, z, I, ee);
          }
        }
        _C(), w = Rt;
        break;
      } catch (oe) {
        Zy(t, oe);
      }
    while (true);
    return n && t.shellSuspendCounter++, Gi = nr = null, dt = u, fe.H = f, fe.A = h, nt === null && (St = null, rt = 0, Yo()), w;
  }
  function _C() {
    for (; nt !== null; )
      Jy(nt);
  }
  function zC(t, n) {
    var r = dt;
    dt |= 2;
    var u = Ky(), f = Py();
    St !== t || rt !== n ? (Ds = null, js = bt() + 500, pa(t, n)) : sa = Li(t, n);
    e: do
      try {
        if (gt !== 0 && nt !== null) {
          n = nt;
          var h = jn;
          t: switch (gt) {
            case 1:
              gt = 0, jn = null, ga(t, n, h, 1);
              break;
            case 2:
            case 9:
              if (Wg(h)) {
                gt = 0, jn = null, Wy(n);
                break;
              }
              n = function() {
                gt !== 2 && gt !== 9 || St !== t || (gt = 7), _i(t);
              }, h.then(n, n);
              break e;
            case 3:
              gt = 7;
              break e;
            case 4:
              gt = 5;
              break e;
            case 7:
              Wg(h) ? (gt = 0, jn = null, Wy(n)) : (gt = 0, jn = null, ga(t, n, h, 7));
              break;
            case 5:
              var w = null;
              switch (nt.tag) {
                case 26:
                  w = nt.memoizedState;
                case 5:
                case 27:
                  var z = nt;
                  if (w ? X1(w) : z.stateNode.complete) {
                    gt = 0, jn = null;
                    var I = z.sibling;
                    if (I !== null)
                      nt = I;
                    else {
                      var ee = z.return;
                      ee !== null ? (nt = ee, Hs(ee)) : nt = null;
                    }
                    break t;
                  }
              }
              gt = 0, jn = null, ga(t, n, h, 5);
              break;
            case 6:
              gt = 0, jn = null, ga(t, n, h, 6);
              break;
            case 8:
              eh(), Rt = 6;
              break e;
            default:
              throw Error(a(462));
          }
        }
        TC();
        break;
      } catch (oe) {
        Zy(t, oe);
      }
    while (true);
    return Gi = nr = null, fe.H = u, fe.A = f, dt = r, nt !== null ? 0 : (St = null, rt = 0, Yo(), Rt);
  }
  function TC() {
    for (; nt !== null && !zt(); )
      Jy(nt);
  }
  function Jy(t) {
    var n = my(t.alternate, t, Pi);
    t.memoizedProps = t.pendingProps, n === null ? Hs(t) : nt = n;
  }
  function Wy(t) {
    var n = t, r = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = uy(r, n, n.pendingProps, n.type, void 0, rt);
        break;
      case 11:
        n = uy(r, n, n.pendingProps, n.type.render, n.ref, rt);
        break;
      case 5:
        od(n);
        var u = n;
        u === Jt && (We ? (Fo(u), u.tag === 5 && u.stateNode != null && (kt = u.stateNode)) : (Fo(u), We = true));
      default:
        gy(r, n), n = nt = Vg(n, Pi), n = my(r, n, Pi);
    }
    t.memoizedProps = t.pendingProps, n === null ? Hs(t) : nt = n;
  }
  function ga(t, n, r, u) {
    Gi = nr = null, od(n), ta = null, du = 0;
    var f = n.return;
    try {
      if (gC(t, f, n, r, rt)) {
        Rt = 1, ps(t, Xn(r, t.current)), nt = null;
        return;
      }
    } catch (h) {
      if (f !== null)
        throw nt = f, h;
      Rt = 1, ps(t, Xn(r, t.current)), nt = null;
      return;
    }
    n.flags & 32768 ? (We || u === 1 ? t = true : sa || (rt & 536870912) !== 0 ? t = false : (Nl = t = true, (u === 2 || u === 9 || u === 3 || u === 6) && (u = rn.current, u !== null && u.tag === 13 && (u.flags |= 16384))), e1(n, t)) : Hs(n);
  }
  function Hs(t) {
    var n = t;
    do {
      if ((n.flags & 32768) !== 0) {
        e1(n, Nl);
        return;
      }
      t = n.return;
      var r = bC(n.alternate, n, Pi);
      if (r !== null) {
        nt = r;
        return;
      }
      if (n = n.sibling, n !== null) {
        nt = n;
        return;
      }
      nt = n = t;
    } while (n !== null);
    Rt === 0 && (Rt = 5);
  }
  function e1(t, n) {
    do {
      var r = wC(t.alternate, t);
      if (r !== null) {
        r.flags &= 32767, nt = r;
        return;
      }
      if (r = t.return, r !== null && (r.flags |= 32768, r.subtreeFlags = 0, r.deletions = null), !n && (t = t.sibling, t !== null)) {
        nt = t;
        return;
      }
      nt = t = r;
    } while (t !== null);
    Rt = 6, nt = null;
  }
  function t1(t, n, r, u, f, h, w, z, I, ee, oe, ve) {
    t.cancelPendingCommit = null;
    do
      Bs();
    while (jt !== 0);
    if ((dt & 6) !== 0)
      throw Error(a(327));
    if (n !== null) {
      if (n === t.current)
        throw Error(a(177));
      t === St && (nt = St = null, rt = 0), pr = n, ri = t, Ni = r, Wd = f, Xy = u, AC(t, n, r, w, z, I, ve);
    }
  }
  function AC(t, n, r, u, f, h, w) {
    var z = n.lanes | n.childLanes;
    if (Jd = z, z |= Lf, ge(t, r, z, u, f, h), da = null, (r & 335544064) === r ? (ha = lC(t), u = 10262) : (ha = null, u = 10256), (n.subtreeFlags & u) !== 0 || (n.flags & u) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, LC(gi, function() {
      return rh(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), Es = false, u = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || u) {
      u = fe.T, fe.T = null, f = q.p, q.p = 2, h = dt, dt |= 4;
      try {
        SC(t, n, r);
      } finally {
        dt = h, q.p = f, fe.T = u;
      }
    }
    jt = 1, Es ? fa = nk(w, t.containerInfo, ha, nh, ih, jC, lh, rh, MC) : (nh(), ih(), lh());
  }
  function MC(t) {
    if (jt !== 0) {
      var n = ri.onRecoverableError;
      n(t, { componentStack: null });
    }
  }
  function jC() {
    jt === 3 && (jt = 0, Hy(pr, ri), jt = 4);
  }
  function nh() {
    if (jt === 1) {
      jt = 0;
      var t = ri, n = pr, r = Ni, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = fe.T, fe.T = null;
        var f = q.p;
        q.p = 2;
        var h = dt;
        dt |= 4;
        try {
          Cu = Ns = false, Ry(n, t, r), r = yh;
          var w = jg(t.containerInfo), z = r.focusedElem, I = r.selectionRange;
          if (w !== z && z && z.ownerDocument && Mg(z.ownerDocument.documentElement, z)) {
            if (I !== null && Mf(z)) {
              var ee = I.start, oe = I.end;
              if (oe === void 0 && (oe = ee), "selectionStart" in z)
                z.selectionStart = ee, z.selectionEnd = Math.min(oe, z.value.length);
              else {
                var ve = z.ownerDocument || document, P = ve && ve.defaultView || window;
                if (P.getSelection) {
                  var ae = P.getSelection(), Me = z.textContent.length, Oe = Math.min(I.start, Me), Je = I.end === void 0 ? Oe : Math.min(I.end, Me);
                  !ae.extend && Oe > Je && (w = Je, Je = Oe, Oe = w);
                  var W = Ag(z, Oe), Q = Ag(z, Je);
                  if (W && Q && (ae.rangeCount !== 1 || ae.anchorNode !== W.node || ae.anchorOffset !== W.offset || ae.focusNode !== Q.node || ae.focusOffset !== Q.offset)) {
                    var le = ve.createRange();
                    le.setStart(W.node, W.offset), ae.removeAllRanges(), Oe > Je ? (ae.addRange(le), ae.extend(Q.node, Q.offset)) : (le.setEnd(Q.node, Q.offset), ae.addRange(le));
                  }
                }
              }
            }
            for (ve = [], ae = z; ae = ae.parentNode; )
              ae.nodeType === 1 && ve.push({ element: ae, left: ae.scrollLeft, top: ae.scrollTop });
            for (typeof z.focus == "function" && z.focus(), z = 0; z < ve.length; z++) {
              var ye = ve[z];
              ye.element.scrollLeft = ye.left, ye.element.scrollTop = ye.top;
            }
          }
          Ca = !!gh, yh = gh = null;
        } finally {
          dt = h, q.p = f, fe.T = u;
        }
      }
      t.current = n, jt = 2;
    }
  }
  function ih() {
    if (jt === 2) {
      jt = 0;
      var t = ri, n = pr, r = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || r) {
        r = fe.T, fe.T = null;
        var u = q.p;
        q.p = 2;
        var f = dt;
        dt |= 4;
        try {
          Ty(t, n.alternate, n);
        } finally {
          dt = f, q.p = u, fe.T = r;
        }
      }
      jt = 3;
    }
  }
  function lh() {
    if (jt === 4 || jt === 3) {
      jt = 0;
      var t = fa;
      fa = null, Oi();
      var n = ri, r = pr, u = Ni, f = Xy, h = (u & 335544064) === u ? 10262 : 10256;
      if ((r.subtreeFlags & h) !== 0 || (r.flags & h) !== 0 ? jt = 5 : (jt = 0, pr = ri = null, n1(n, n.pendingLanes)), h = n.pendingLanes, h === 0 && (zl = null), Re(u), r = r.stateNode, nn && typeof nn.onCommitFiberRoot == "function")
        try {
          nn.onCommitFiberRoot(In, r, void 0, (r.current.flags & 128) === 128);
        } catch {
        }
      if (f !== null) {
        r = fe.T, h = q.p, q.p = 2, fe.T = null;
        try {
          for (var w = n.onRecoverableError, z = 0; z < f.length; z++) {
            var I = f[z];
            w(I.value, { componentStack: I.stack });
          }
        } finally {
          fe.T = r, q.p = h;
        }
      }
      if (f = da, w = ha, ha = null, f !== null && (da = null, w === null && (w = []), t !== null))
        for (I = 0; I < f.length; I++)
          r = (0, f[I])(w), r !== void 0 && t.finished.finally(r);
      (Ni & 3) !== 0 && Bs(), _i(n), h = n.pendingLanes, (u & 261930) !== 0 && (h & 42) !== 0 ? n === Os ? zu++ : (zu = 0, Os = n) : (zu = 0, Os = null), Tu(0);
    }
  }
  function n1(t, n) {
    (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, su(n)));
  }
  function Bs() {
    return fa !== null && (fa.skipTransition(), fa = null), nh(), ih(), lh(), rh();
  }
  function rh() {
    if (jt !== 5)
      return false;
    var t = ri, n = Jd;
    Jd = 0;
    var r = Re(Ni), u = fe.T, f = q.p;
    try {
      q.p = 32 > r ? 32 : r, fe.T = null, r = Wd, Wd = null;
      var h = ri, w = Ni;
      if (jt = 0, pr = ri = null, Ni = 0, (dt & 6) !== 0)
        throw Error(a(331));
      var z = dt;
      if (dt |= 4, qy(h.current), By(h, h.current, w, r), dt = z, Tu(0, false), nn && typeof nn.onPostCommitFiberRoot == "function")
        try {
          nn.onPostCommitFiberRoot(In, h);
        } catch {
        }
      return true;
    } finally {
      q.p = f, fe.T = u, n1(t, n);
    }
  }
  function i1(t, n, r) {
    n = Xn(r, n), n = Sd(t.stateNode, n, 2), t = bl(t, n, 2), t !== null && (ue(t, 2), _i(t));
  }
  function yt(t, n, r) {
    if (t.tag === 3)
      i1(t, t, r);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          i1(n, t, r);
          break;
        } else if (n.tag === 1) {
          var u = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (zl === null || !zl.has(u))) {
            t = Xn(r, t), r = W0(2), u = bl(n, r, 2), u !== null && (ey(r, u, n, t), ue(u, 2), _i(u));
            break;
          }
        }
        n = n.return;
      }
  }
  function ah(t, n, r) {
    var u = t.pingCache;
    if (u === null) {
      u = t.pingCache = new kC();
      var f = /* @__PURE__ */ new Set();
      u.set(n, f);
    } else
      f = u.get(n), f === void 0 && (f = /* @__PURE__ */ new Set(), u.set(n, f));
    f.has(r) || (Kd = true, f.add(r), t = DC.bind(null, t, n, r), n.then(t, t));
  }
  function DC(t, n, r) {
    var u = t.pingCache;
    u !== null && u.delete(n), t.pingedLanes |= t.suspendedLanes & r, t.warmLanes &= ~r, St === t && (rt & r) === r && ((Rt === 4 || Rt === 3 && (rt & 62914560) === rt && 300 > bt() - Ms) && (dt & 2) === 0 ? pa(t, 0) : As |= r, ca === rt && (ca = 0)), _i(t);
  }
  function l1(t, n) {
    n === 0 && (n = Hi()), t = Wl(t, n), t !== null && (ue(t, n), _i(t));
  }
  function OC(t) {
    var n = t.memoizedState, r = 0;
    n !== null && (r = n.retryLane), l1(t, r);
  }
  function RC(t, n) {
    var r = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var u = t.stateNode, f = t.memoizedState;
        f !== null && (r = f.retryLane);
        break;
      case 19:
        u = t.stateNode;
        break;
      case 22:
        u = t.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    u !== null && u.delete(n), l1(t, r);
  }
  function LC(t, n) {
    return Ye(t, n);
  }
  var ya = null, xa = null, uh = false, Us = false, oh = false, Al = 0;
  function _i(t) {
    t !== xa && t.next === null && (xa === null ? ya = xa = t : xa = xa.next = t), Us = true, uh || (uh = true, BC());
  }
  function Tu(t, n) {
    if (!oh && Us) {
      oh = true;
      do
        for (var r = false, u = ya; u !== null; ) {
          if (t !== 0) {
            var f = u.pendingLanes;
            if (f === 0)
              var h = 0;
            else {
              var w = u.suspendedLanes, z = u.pingedLanes;
              h = (1 << 31 - Pt(42 | t) + 1) - 1, h &= f & ~(w & ~z), h = h & 201326741 ? h & 201326741 | 1 : h ? h | 2 : 0;
            }
            h !== 0 && (r = true, o1(u, h));
          } else
            h = rt, h = ul(u, u === St ? h : 0, u.cancelPendingCommit !== null || u.timeoutHandle !== -1), (h & 3) === 0 || Li(u, h) || (r = true, o1(u, h));
          u = u.next;
        }
      while (r);
      oh = false;
    }
  }
  function HC() {
    r1();
  }
  function r1() {
    Us = uh = false;
    var t = 0;
    Al !== 0 && FC() && (t = Al);
    for (var n = bt(), r = null, u = ya; u !== null; ) {
      var f = u.next, h = a1(u, n);
      h === 0 ? (u.next = null, r === null ? ya = f : r.next = f, f === null && (xa = r)) : (r = u, (t !== 0 || (h & 3) !== 0) && (Us = true)), u = f;
    }
    jt !== 0 && jt !== 5 || Tu(t), Al !== 0 && (Al = 0);
  }
  function a1(t, n) {
    for (var r = t.suspendedLanes, u = t.pingedLanes, f = t.expirationTimes, h = t.pendingLanes & -62914561; 0 < h; ) {
      var w = 31 - Pt(h), z = 1 << w, I = f[w];
      I === -1 ? ((z & r) === 0 || (z & u) !== 0) && (f[w] = Fa(z, n)) : I <= n && (t.expiredLanes |= z), h &= ~z;
    }
    if (n = St, r = rt, r = ul(t, t === n ? r : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), u = t.callbackNode, r === 0 || t === n && (gt === 2 || gt === 9) || t.cancelPendingCommit !== null)
      return u !== null && u !== null && It(u), t.callbackNode = null, t.callbackPriority = 0;
    if ((r & 3) === 0 || Li(t, r)) {
      if (n = r & -r, n === t.callbackPriority)
        return n;
      switch (u !== null && It(u), Re(r)) {
        case 2:
        case 8:
          r = Ft;
          break;
        case 32:
          r = gi;
          break;
        case 268435456:
          r = rl;
          break;
        default:
          r = gi;
      }
      return u = u1.bind(null, t), r = Ye(r, u), t.callbackPriority = n, t.callbackNode = r, n;
    }
    return u !== null && u !== null && It(u), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function u1(t, n) {
    if (jt !== 0 && jt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var r = t.callbackNode;
    if (Bs() && t.callbackNode !== r)
      return null;
    var u = rt;
    return u = ul(t, t === St ? u : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), u === 0 ? null : ($y(t, u, n), a1(t, bt()), t.callbackNode != null && t.callbackNode === r ? u1.bind(null, t) : null);
  }
  function o1(t, n) {
    if (Bs())
      return null;
    $y(t, n, true);
  }
  function BC() {
    PC(function() {
      (dt & 6) !== 0 ? Ye(dn, HC) : r1();
    });
  }
  function sh() {
    if (Al === 0) {
      var t = rr;
      t === 0 && (t = Ri, Ri <<= 1, (Ri & 261888) === 0 && (Ri = 256)), Al = t;
    }
    return Al;
  }
  function s1(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : Ro(t);
  }
  function UC(t, n, r, u, f) {
    if (n === "submit" && r && r.stateNode === f) {
      var h = s1((f[hn] || null).action), w = u.submitter;
      w && (n = (n = w[hn] || null) ? s1(n.formAction) : w.getAttribute("formAction"), n !== null && (h = n, w = null));
      var z = new Uo("action", "action", null, u, f);
      t.push({ event: z, listeners: [{ instance: null, listener: function() {
        if (u.defaultPrevented) {
          if (Al !== 0) {
            var I = new FormData(f, w);
            yd(r, { pending: true, data: I, method: f.method, action: h }, null, I);
          }
        } else
          typeof h == "function" && (z.preventDefault(), I = new FormData(f, w), yd(r, { pending: true, data: I, method: f.method, action: h }, h, I));
      }, currentTarget: f }] });
    }
  }
  for (var ch = 0; ch < Rf.length; ch++) {
    var fh = Rf[ch], IC = fh.toLowerCase(), qC = fh[0].toUpperCase() + fh.slice(1);
    ti(IC, "on" + qC);
  }
  ti(Rg, "onAnimationEnd"), ti(Lg, "onAnimationIteration"), ti(Hg, "onAnimationStart"), ti("dblclick", "onDoubleClick"), ti("focusin", "onFocus"), ti("focusout", "onBlur"), ti(KE, "onTransitionRun"), ti(PE, "onTransitionStart"), ti(JE, "onTransitionCancel"), ti(Bg, "onTransitionEnd"), cl("onMouseEnter", ["mouseout", "mouseover"]), cl("onMouseLeave", ["mouseout", "mouseover"]), cl("onPointerEnter", ["pointerout", "pointerover"]), cl("onPointerLeave", ["pointerout", "pointerover"]), ei("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ei("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ei("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ei("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ei("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ei("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Au = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), VC = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Au));
  function c1(t, n) {
    n = (n & 4) !== 0;
    for (var r = 0; r < t.length; r++) {
      var u = t[r], f = u.event;
      u = u.listeners;
      e: {
        var h = void 0;
        if (n)
          for (var w = u.length - 1; 0 <= w; w--) {
            var z = u[w], I = z.instance, ee = z.currentTarget;
            if (z = z.listener, I !== h && f.isPropagationStopped())
              break e;
            h = z, f.currentTarget = ee;
            try {
              h(f);
            } catch (oe) {
              Vo(oe);
            }
            f.currentTarget = null, h = I;
          }
        else
          for (w = 0; w < u.length; w++) {
            if (z = u[w], I = z.instance, ee = z.currentTarget, z = z.listener, I !== h && f.isPropagationStopped())
              break e;
            h = z, f.currentTarget = ee;
            try {
              h(f);
            } catch (oe) {
              Vo(oe);
            }
            f.currentTarget = null, h = I;
          }
      }
    }
  }
  function it(t, n) {
    var r = n[zo];
    r === void 0 && (r = n[zo] = /* @__PURE__ */ new Set());
    var u = t + "__bubble";
    r.has(u) || (f1(n, t, 2, false), r.add(u));
  }
  function dh(t, n, r) {
    var u = 0;
    n && (u |= 4), f1(r, t, u, n);
  }
  var Is = "_reactListening" + Math.random().toString(36).slice(2);
  function hh(t) {
    if (!t[Is]) {
      t[Is] = true, Mo.forEach(function(r) {
        r !== "selectionchange" && (VC.has(r) || dh(r, false, t), dh(r, true, t));
      });
      var n = t.nodeType === 9 ? t : t.ownerDocument;
      n === null || n[Is] || (n[Is] = true, dh("selectionchange", false, n));
    }
  }
  function f1(t, n, r, u) {
    switch (ex(n)) {
      case 2:
        var f = Ok;
        break;
      case 8:
        f = Rk;
        break;
      default:
        f = Dh;
    }
    r = f.bind(null, n, r, t), f = void 0, !wf || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (f = true), u ? f !== void 0 ? t.addEventListener(n, r, { capture: true, passive: f }) : t.addEventListener(n, r, true) : f !== void 0 ? t.addEventListener(n, r, { passive: f }) : t.addEventListener(n, r, false);
  }
  function mh(t, n, r, u, f) {
    var h = u;
    if ((n & 1) === 0 && (n & 2) === 0 && u !== null)
      e: for (; ; ) {
        if (u === null)
          return;
        var w = u.tag;
        if (w === 3 || w === 4) {
          var z = u.stateNode.containerInfo;
          if (z === f)
            break;
          if (w === 4)
            for (w = u.return; w !== null; ) {
              var I = w.tag;
              if ((I === 3 || I === 4) && w.stateNode.containerInfo === f)
                return;
              w = w.return;
            }
          for (; z !== null; ) {
            if (w = Bi(z), w === null)
              return;
            if (I = w.tag, I === 5 || I === 6 || I === 26 || I === 27) {
              u = h = w;
              continue e;
            }
            z = z.parentNode;
          }
        }
        u = u.return;
      }
    fg(function() {
      var ee = h, oe = vf(r), ve = [];
      e: {
        var P = Ug.get(t);
        if (P !== void 0) {
          var ae = Uo, Me = t;
          switch (t) {
            case "keypress":
              if (Ho(r) === 0)
                break e;
            case "keydown":
            case "keyup":
              ae = NE;
              break;
            case "focusin":
              Me = "focus", ae = kf;
              break;
            case "focusout":
              Me = "blur", ae = kf;
              break;
            case "beforeblur":
            case "afterblur":
              ae = kf;
              break;
            case "click":
              if (r.button === 2)
                break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ae = mg;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ae = mE;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ae = ME;
              break;
            case Rg:
            case Lg:
            case Hg:
              ae = yE;
              break;
            case Bg:
              ae = DE;
              break;
            case "scroll":
            case "scrollend":
              ae = dE;
              break;
            case "wheel":
              ae = RE;
              break;
            case "copy":
            case "cut":
            case "paste":
              ae = vE;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ae = gg;
              break;
            case "submit":
              ae = TE;
              break;
            case "toggle":
            case "beforetoggle":
              ae = HE;
          }
          var Oe = (n & 4) !== 0, Je = !Oe && (t === "scroll" || t === "scrollend"), W = Oe ? P !== null ? P + "Capture" : null : P;
          Oe = [];
          for (var Q = ee, le; Q !== null; ) {
            var ye = Q;
            if (le = ye.stateNode, ye = ye.tag, ye !== 5 && ye !== 26 && ye !== 27 || le === null || W === null || (ye = Ja(Q, W), ye != null && Oe.push(Mu(Q, ye, le))), Je)
              break;
            Q = Q.return;
          }
          0 < Oe.length && (P = new ae(P, Me, null, r, oe), ve.push({ event: P, listeners: Oe }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (ae = t === "mouseover" || t === "pointerover", P = t === "mouseout" || t === "pointerout", ae && r !== xf && (Me = r.relatedTarget || r.fromElement) && (Bi(Me) || Me[ol]))
            break e;
          (P || ae) && (Me = oe.window === oe ? oe : (ae = oe.ownerDocument) ? ae.defaultView || ae.parentWindow : window, P ? (ae = r.relatedTarget || r.toElement, P = ee, ae = ae ? Bi(ae) : null, ae !== null && (Je = s(ae), Oe = ae.tag, ae !== Je || Oe !== 5 && Oe !== 27 && Oe !== 6) && (ae = null)) : (P = null, ae = ee), P !== ae && (Oe = mg, ye = "onMouseLeave", W = "onMouseEnter", Q = "mouse", (t === "pointerout" || t === "pointerover") && (Oe = gg, ye = "onPointerLeave", W = "onPointerEnter", Q = "pointer"), Je = P == null ? Me : Kl(P), le = ae == null ? Me : Kl(ae), Me = new Oe(ye, Q + "leave", P, r, oe), Me.target = Je, Me.relatedTarget = le, ye = null, Bi(oe) === ee && (Oe = new Oe(W, Q + "enter", ae, r, oe), Oe.target = le, Oe.relatedTarget = Je, ye = Oe), Je = ye, Oe = P && ae ? M(P, ae, YC) : null, P !== null && d1(ve, Me, P, Oe, false), ae !== null && Je !== null && d1(ve, Je, ae, Oe, true)));
        }
        e: {
          if (P = ee ? Kl(ee) : window, ae = P.nodeName && P.nodeName.toLowerCase(), ae === "select" || ae === "input" && P.type === "file")
            var De = Cg;
          else if (Sg(P))
            if (kg)
              De = QE;
            else {
              De = GE;
              var at = XE;
            }
          else
            ae = P.nodeName, !ae || ae.toLowerCase() !== "input" || P.type !== "checkbox" && P.type !== "radio" ? ee && yf(ee.elementType) && (De = Cg) : De = $E;
          if (De && (De = De(t, ee))) {
            Eg(ve, De, r, oe);
            break e;
          }
          at && at(t, P, ee);
        }
        switch (at = ee ? Kl(ee) : window, t) {
          case "focusin":
            (Sg(at) || at.contentEditable === "true") && ($r = at, jf = ee, au = null);
            break;
          case "focusout":
            au = jf = $r = null;
            break;
          case "mousedown":
            Df = true;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Df = false, Dg(ve, r, oe);
            break;
          case "selectionchange":
            if (FE)
              break;
          case "keydown":
          case "keyup":
            Dg(ve, r, oe);
        }
        var Be;
        if (_f)
          e: {
            switch (t) {
              case "compositionstart":
                var Ge = "onCompositionStart";
                break e;
              case "compositionend":
                Ge = "onCompositionEnd";
                break e;
              case "compositionupdate":
                Ge = "onCompositionUpdate";
                break e;
            }
            Ge = void 0;
          }
        else
          Gr ? bg(t, r) && (Ge = "onCompositionEnd") : t === "keydown" && r.keyCode === 229 && (Ge = "onCompositionStart");
        Ge && (yg && r.locale !== "ko" && (Gr || Ge !== "onCompositionStart" ? Ge === "onCompositionEnd" && Gr && (Be = dg()) : (fl = oe, Sf = "value" in fl ? fl.value : fl.textContent, Gr = true)), at = qs(ee, Ge), 0 < at.length && (Ge = new pg(Ge, t, null, r, oe), ve.push({ event: Ge, listeners: at }), Be ? Ge.data = Be : (Be = wg(r), Be !== null && (Ge.data = Be)))), (Be = UE ? IE(t, r) : qE(t, r)) && (Ge = qs(ee, "onBeforeInput"), 0 < Ge.length && (at = new pg("onBeforeInput", "beforeinput", null, r, oe), ve.push({ event: at, listeners: Ge }), at.data = Be)), UC(ve, t, ee, r, oe);
      }
      c1(ve, n);
    });
  }
  function Mu(t, n, r) {
    return { instance: t, listener: n, currentTarget: r };
  }
  function qs(t, n) {
    for (var r = n + "Capture", u = []; t !== null; ) {
      var f = t, h = f.stateNode;
      if (f = f.tag, f !== 5 && f !== 26 && f !== 27 || h === null || (f = Ja(t, r), f != null && u.unshift(Mu(t, f, h)), f = Ja(t, n), f != null && u.push(Mu(t, f, h))), t.tag === 3)
        return u;
      t = t.return;
    }
    return [];
  }
  function YC(t) {
    if (t === null)
      return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function d1(t, n, r, u, f) {
    for (var h = n._reactName, w = []; r !== null && r !== u; ) {
      var z = r, I = z.alternate, ee = z.stateNode;
      if (z = z.tag, I !== null && I === u)
        break;
      z !== 5 && z !== 26 && z !== 27 || ee === null || (I = ee, f ? (ee = Ja(r, h), ee != null && w.unshift(Mu(r, ee, I))) : f || (ee = Ja(r, h), ee != null && w.push(Mu(r, ee, I)))), r = r.return;
    }
    w.length !== 0 && t.push({ event: n, listeners: w });
  }
  var XC = /\r\n?/g, GC = /\u0000|\uFFFD/g;
  function h1(t) {
    return (typeof t == "string" ? t : "" + t).replace(XC, `
`).replace(GC, "");
  }
  function m1(t, n) {
    return n = h1(n), h1(t) === n;
  }
  function xt(t, n, r, u, f, h) {
    switch (r) {
      case "children":
        if (typeof u == "string")
          n === "body" || n === "textarea" && u === "" || Vr(t, u);
        else if (typeof u == "number" || typeof u == "bigint")
          n !== "body" && Vr(t, "" + u);
        else
          return;
        break;
      case "className":
        Oo(t, "class", u);
        break;
      case "tabIndex":
        Oo(t, "tabindex", u);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Oo(t, r, u);
        break;
      case "style":
        sg(t, u, h);
        return;
      case "data":
        if (n !== "object") {
          Oo(t, "data", u);
          break;
        }
      case "src":
      case "href":
        if (u === "" && (n !== "a" || r !== "href")) {
          t.removeAttribute(r);
          break;
        }
        if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
          t.removeAttribute(r);
          break;
        }
        u = Ro(u), t.setAttribute(r, u);
        break;
      case "action":
      case "formAction":
        if (typeof u == "function") {
          t.setAttribute(r, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
          break;
        } else
          typeof h == "function" && (r === "formAction" ? (n !== "input" && xt(t, n, "name", f.name, f, null), xt(t, n, "formEncType", f.formEncType, f, null), xt(t, n, "formMethod", f.formMethod, f, null), xt(t, n, "formTarget", f.formTarget, f, null)) : (xt(t, n, "encType", f.encType, f, null), xt(t, n, "method", f.method, f, null), xt(t, n, "target", f.target, f, null)));
        if (u == null || typeof u == "symbol" || typeof u == "boolean") {
          t.removeAttribute(r);
          break;
        }
        u = Ro(u), t.setAttribute(r, u);
        break;
      case "onClick":
        u != null && (t.onclick = yi);
        return;
      case "onScroll":
        u != null && it("scroll", t);
        return;
      case "onScrollEnd":
        u != null && it("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u))
            throw Error(a(61));
          if (r = u.__html, r != null) {
            if (f.children != null)
              throw Error(a(60));
            (h != null ? h.__html : void 0) !== r && (t.innerHTML = r);
          }
        }
        break;
      case "multiple":
        t.multiple = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "muted":
        t.muted = u && typeof u != "function" && typeof u != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        r = Ro(u), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", r);
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        u != null && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(r, u) : t.removeAttribute(r);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        u && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(r, "") : t.removeAttribute(r);
        break;
      case "capture":
      case "download":
        u === true ? t.setAttribute(r, "") : u !== false && u != null && typeof u != "function" && typeof u != "symbol" ? t.setAttribute(r, u) : t.removeAttribute(r);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? t.setAttribute(r, u) : t.removeAttribute(r);
        break;
      case "rowSpan":
      case "start":
        u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? t.removeAttribute(r) : t.setAttribute(r, u);
        break;
      case "popover":
        it("beforetoggle", t), it("toggle", t), Do(t, "popover", u);
        break;
      case "xlinkActuate":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:actuate", u);
        break;
      case "xlinkArcrole":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", u);
        break;
      case "xlinkRole":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:role", u);
        break;
      case "xlinkShow":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:show", u);
        break;
      case "xlinkTitle":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:title", u);
        break;
      case "xlinkType":
        Ui(t, "http://www.w3.org/1999/xlink", "xlink:type", u);
        break;
      case "xmlBase":
        Ui(t, "http://www.w3.org/XML/1998/namespace", "xml:base", u);
        break;
      case "xmlLang":
        Ui(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", u);
        break;
      case "xmlSpace":
        Ui(t, "http://www.w3.org/XML/1998/namespace", "xml:space", u);
        break;
      case "is":
        Do(t, "is", u);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N")
          r = cE.get(r) || r, Do(t, r, u);
        else
          return;
    }
    st = true;
  }
  function ph(t, n, r, u, f, h) {
    switch (r) {
      case "style":
        sg(t, u, h);
        return;
      case "dangerouslySetInnerHTML":
        if (u != null) {
          if (typeof u != "object" || !("__html" in u))
            throw Error(a(61));
          if (r = u.__html, r != null) {
            if (f.children != null)
              throw Error(a(60));
            (h != null ? h.__html : void 0) !== r && (t.innerHTML = r);
          }
        }
        break;
      case "children":
        if (typeof u == "string")
          Vr(t, u);
        else if (typeof u == "number" || typeof u == "bigint")
          Vr(t, "" + u);
        else
          return;
        break;
      case "onScroll":
        u != null && it("scroll", t);
        return;
      case "onScrollEnd":
        u != null && it("scrollend", t);
        return;
      case "onClick":
        u != null && (t.onclick = yi);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!jo.hasOwnProperty(r))
          e: {
            if (r[0] === "o" && r[1] === "n" && (f = r.endsWith("Capture"), h = r.slice(2, f ? r.length - 7 : void 0), n = t[hn] || null, n = n != null ? n[r] : null, typeof n == "function" && t.removeEventListener(h, n, f), typeof u == "function")) {
              typeof n != "function" && n !== null && (r in t ? t[r] = null : t.hasAttribute(r) && t.removeAttribute(r)), t.addEventListener(h, u, f);
              break e;
            }
            st = true, r in t ? t[r] = u : u === true ? t.setAttribute(r, "") : Do(t, r, u);
          }
        return;
    }
    st = true;
  }
  function on(t, n, r) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        it("error", t), it("load", t);
        var u = false, f = false, h;
        for (h in r)
          if (r.hasOwnProperty(h)) {
            var w = r[h];
            if (w != null)
              switch (h) {
                case "src":
                  u = true;
                  break;
                case "srcSet":
                  f = true;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, n));
                default:
                  xt(t, n, h, w, r, null);
              }
          }
        f && xt(t, n, "srcSet", r.srcSet, r, null), u && xt(t, n, "src", r.src, r, null);
        return;
      case "input":
        it("invalid", t);
        var z = h = w = f = null, I = null, ee = null;
        for (u in r)
          if (r.hasOwnProperty(u)) {
            var oe = r[u];
            if (oe != null)
              switch (u) {
                case "name":
                  f = oe;
                  break;
                case "type":
                  w = oe;
                  break;
                case "checked":
                  I = oe;
                  break;
                case "defaultChecked":
                  ee = oe;
                  break;
                case "value":
                  h = oe;
                  break;
                case "defaultValue":
                  z = oe;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (oe != null)
                    throw Error(a(137, n));
                  break;
                default:
                  xt(t, n, u, oe, r, null);
              }
          }
        rg(t, h, z, I, ee, w, f, false);
        return;
      case "select":
        it("invalid", t), u = w = h = null;
        for (f in r)
          if (r.hasOwnProperty(f) && (z = r[f], z != null))
            switch (f) {
              case "value":
                h = z;
                break;
              case "defaultValue":
                w = z;
                break;
              case "multiple":
                u = z;
              default:
                xt(t, n, f, z, r, null);
            }
        n = h, r = w, t.multiple = !!u, n != null ? qr(t, !!u, n, false) : r != null && qr(t, !!u, r, true);
        return;
      case "textarea":
        it("invalid", t), h = f = u = null;
        for (w in r)
          if (r.hasOwnProperty(w) && (z = r[w], z != null))
            switch (w) {
              case "value":
                u = z;
                break;
              case "defaultValue":
                f = z;
                break;
              case "children":
                h = z;
                break;
              case "dangerouslySetInnerHTML":
                if (z != null)
                  throw Error(a(91));
                break;
              default:
                xt(t, n, w, z, r, null);
            }
        ug(t, u, f, h);
        return;
      case "option":
        for (I in r)
          if (r.hasOwnProperty(I) && (u = r[I], u != null))
            switch (I) {
              case "selected":
                t.selected = u && typeof u != "function" && typeof u != "symbol";
                break;
              default:
                xt(t, n, I, u, r, null);
            }
        return;
      case "dialog":
        it("beforetoggle", t), it("toggle", t), it("cancel", t), it("close", t);
        break;
      case "iframe":
      case "object":
        it("load", t);
        break;
      case "video":
      case "audio":
        for (u = 0; u < Au.length; u++)
          it(Au[u], t);
        break;
      case "image":
        it("error", t), it("load", t);
        break;
      case "details":
        it("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        it("error", t), it("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (ee in r)
          if (r.hasOwnProperty(ee) && (u = r[ee], u != null))
            switch (ee) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, n));
              default:
                xt(t, n, ee, u, r, null);
            }
        return;
      default:
        if (yf(n)) {
          for (oe in r)
            r.hasOwnProperty(oe) && (u = r[oe], u !== void 0 && ph(t, n, oe, u, r, void 0));
          return;
        }
    }
    for (z in r)
      r.hasOwnProperty(z) && (u = r[z], u != null && xt(t, n, z, u, r, null));
  }
  var $C = {};
  function QC(t, n, r, u) {
    switch (n) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var f = null, h = null, w = null, z = null, I = null, ee = null, oe = null;
        for (ae in r) {
          var ve = r[ae];
          if (r.hasOwnProperty(ae) && ve != null)
            switch (ae) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                I = ve;
              default:
                u.hasOwnProperty(ae) || xt(t, n, ae, null, u, ve);
            }
        }
        for (var P in u) {
          var ae = u[P];
          if (ve = r[P], u.hasOwnProperty(P) && (ae != null || ve != null))
            switch (P) {
              case "type":
                ae !== ve && (st = true), h = ae;
                break;
              case "name":
                ae !== ve && (st = true), f = ae;
                break;
              case "checked":
                ae !== ve && (st = true), ee = ae;
                break;
              case "defaultChecked":
                ae !== ve && (st = true), oe = ae;
                break;
              case "value":
                ae !== ve && (st = true), w = ae;
                break;
              case "defaultValue":
                ae !== ve && (st = true), z = ae;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (ae != null)
                  throw Error(a(137, n));
                break;
              default:
                ae !== ve && xt(t, n, P, ae, u, ve);
            }
        }
        pf(t, w, z, I, ee, oe, h, f);
        return;
      case "select":
        ae = w = z = P = null;
        for (h in r)
          if (I = r[h], r.hasOwnProperty(h) && I != null)
            switch (h) {
              case "value":
                break;
              case "multiple":
                ae = I;
              default:
                u.hasOwnProperty(h) || xt(t, n, h, null, u, I);
            }
        for (f in u)
          if (h = u[f], I = r[f], u.hasOwnProperty(f) && (h != null || I != null))
            switch (f) {
              case "value":
                h !== I && (st = true), P = h;
                break;
              case "defaultValue":
                h !== I && (st = true), z = h;
                break;
              case "multiple":
                h !== I && (st = true), w = h;
              default:
                h !== I && xt(t, n, f, h, u, I);
            }
        n = z, r = w, u = ae, P != null ? qr(t, !!r, P, false) : !!u != !!r && (n != null ? qr(t, !!r, n, true) : qr(t, !!r, r ? [] : "", false));
        return;
      case "textarea":
        ae = P = null;
        for (z in r)
          if (f = r[z], r.hasOwnProperty(z) && f != null && !u.hasOwnProperty(z))
            switch (z) {
              case "value":
                break;
              case "children":
                break;
              default:
                xt(t, n, z, null, u, f);
            }
        for (w in u)
          if (f = u[w], h = r[w], u.hasOwnProperty(w) && (f != null || h != null))
            switch (w) {
              case "value":
                f !== h && (st = true), P = f;
                break;
              case "defaultValue":
                f !== h && (st = true), ae = f;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (f != null)
                  throw Error(a(91));
                break;
              default:
                f !== h && xt(t, n, w, f, u, h);
            }
        ag(t, P, ae);
        return;
      case "option":
        for (var Me in r)
          if (P = r[Me], r.hasOwnProperty(Me) && P != null && !u.hasOwnProperty(Me))
            switch (Me) {
              case "selected":
                t.selected = false;
                break;
              default:
                xt(t, n, Me, null, u, P);
            }
        for (I in u)
          if (P = u[I], ae = r[I], u.hasOwnProperty(I) && P !== ae && (P != null || ae != null))
            switch (I) {
              case "selected":
                P !== ae && (st = true), t.selected = P && typeof P != "function" && typeof P != "symbol";
                break;
              default:
                xt(t, n, I, P, u, ae);
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Oe in r)
          P = r[Oe], r.hasOwnProperty(Oe) && P != null && !u.hasOwnProperty(Oe) && xt(t, n, Oe, null, u, P);
        for (ee in u)
          if (P = u[ee], ae = r[ee], u.hasOwnProperty(ee) && P !== ae && (P != null || ae != null))
            switch (ee) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (P != null)
                  throw Error(a(137, n));
                break;
              default:
                xt(t, n, ee, P, u, ae);
            }
        return;
      default:
        if (yf(n)) {
          for (var Je in r)
            P = r[Je], r.hasOwnProperty(Je) && P !== void 0 && !u.hasOwnProperty(Je) && ph(t, n, Je, void 0, u, P);
          for (oe in u)
            P = u[oe], ae = r[oe], !u.hasOwnProperty(oe) || P === ae || P === void 0 && ae === void 0 || ph(t, n, oe, P, u, ae);
          return;
        }
    }
    for (var W in r)
      P = r[W], r.hasOwnProperty(W) && P != null && !u.hasOwnProperty(W) && xt(t, n, W, null, u, P);
    for (ve in u)
      P = u[ve], ae = r[ve], !u.hasOwnProperty(ve) || P === ae || P == null && ae == null || xt(t, n, ve, P, u, ae);
  }
  function p1(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return true;
      default:
        return false;
    }
  }
  function ZC() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, n = 0, r = performance.getEntriesByType("resource"), u = 0; u < r.length; u++) {
        var f = r[u], h = f.transferSize, w = f.initiatorType, z = f.duration;
        if (h && z && p1(w)) {
          for (w = 0, z = f.responseEnd, u += 1; u < r.length; u++) {
            var I = r[u], ee = I.startTime;
            if (ee > z)
              break;
            var oe = I.transferSize, ve = I.initiatorType;
            oe && p1(ve) && (I = I.responseEnd, w += oe * (I < z ? 1 : (z - ee) / (I - ee)));
          }
          if (--u, n += 8 * (h + w) / (f.duration / 1e3), t++, 10 < t)
            break;
        }
      }
      if (0 < t)
        return n / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var gh = null, yh = null;
  function ju(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function g1(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function y1(t, n) {
    if (t === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && n === "foreignObject" ? 0 : t;
  }
  function x1(t, n, r, u) {
    return r = ju(r).createElement(t), r[ht] = u, r[hn] = n, on(r, t, n), qt(r), r;
  }
  function xh(t, n) {
    return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var vh = null;
  function FC() {
    var t = window.event;
    return t && t.type === "popstate" ? t === vh ? false : (vh = t, true) : (vh = null, false);
  }
  var bh = typeof setTimeout == "function" ? setTimeout : void 0, KC = typeof clearTimeout == "function" ? clearTimeout : void 0, v1 = typeof Promise == "function" ? Promise : void 0, b1 = typeof requestAnimationFrame == "function" ? requestAnimationFrame : bh, PC = typeof queueMicrotask == "function" ? queueMicrotask : typeof v1 < "u" ? function(t) {
    return v1.resolve(null).then(t).catch(JC);
  } : bh;
  function JC(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ml(t) {
    return t === "head";
  }
  function w1(t, n) {
    var r = n, u = 0;
    do {
      var f = r.nextSibling;
      if (t.removeChild(r), f && f.nodeType === 8)
        if (r = f.data, r === "/$" || r === "/&") {
          if (u === 0) {
            t.removeChild(f), ka(n);
            return;
          }
          u--;
        } else if (r === "$" || r === "$?" || r === "$~" || r === "$!" || r === "&")
          u++;
        else if (r === "html")
          zh(t.ownerDocument.documentElement);
        else if (r === "head") {
          r = t.ownerDocument.head, zh(r);
          for (var h = r.firstChild; h; ) {
            var w = h.nextSibling, z = h.nodeName;
            h[Fl] || z === "SCRIPT" || z === "STYLE" || z === "LINK" && h.rel.toLowerCase() === "stylesheet" || r.removeChild(h), h = w;
          }
        } else
          r === "body" && zh(t.ownerDocument.body);
      r = f;
    } while (r);
    ka(n);
  }
  function S1(t, n) {
    var r = t;
    t = 0;
    do {
      var u = r.nextSibling;
      if (r.nodeType === 1 ? n ? (r._stashedDisplay = r.style.display, r.style.display = "none") : (r.style.display = r._stashedDisplay || "", r.getAttribute("style") === "" && r.removeAttribute("style")) : r.nodeType === 3 && (n ? (r._stashedText = r.nodeValue, r.nodeValue = "") : r.nodeValue = r._stashedText || ""), u && u.nodeType === 8)
        if (r = u.data, r === "/$") {
          if (t === 0)
            break;
          t--;
        } else
          r !== "$" && r !== "$?" && r !== "$~" && r !== "$!" || t++;
      r = u;
    } while (r);
  }
  function E1(t, n, r) {
    if (n = CSS.escape(n) !== n ? "r-" + btoa(n).replace(/=/g, "") : n, t.style.viewTransitionName = n, r != null && (t.style.viewTransitionClass = r), r = getComputedStyle(t), r.display === "inline") {
      if (n = t.getClientRects(), n.length === 1)
        var u = 1;
      else
        for (var f = u = 0; f < n.length; f++) {
          var h = n[f];
          0 < h.width && 0 < h.height && u++;
        }
      u === 1 && (t = t.style, t.display = n.length === 1 ? "inline-block" : "block", t.marginTop = "-" + r.paddingTop, t.marginBottom = "-" + r.paddingBottom);
    }
  }
  function C1(t, n) {
    t = t.style, n = n.style;
    var r = n != null ? n.hasOwnProperty("viewTransitionName") ? n.viewTransitionName : n.hasOwnProperty("view-transition-name") ? n["view-transition-name"] : null : null;
    t.viewTransitionName = r == null || typeof r == "boolean" ? "" : ("" + r).trim(), r = n != null ? n.hasOwnProperty("viewTransitionClass") ? n.viewTransitionClass : n.hasOwnProperty("view-transition-class") ? n["view-transition-class"] : null : null, t.viewTransitionClass = r == null || typeof r == "boolean" ? "" : ("" + r).trim(), t.display === "inline-block" && (n == null ? t.display = t.margin = "" : (r = n.display, t.display = r == null || typeof r == "boolean" ? "" : r, r = n.margin, r != null ? t.margin = r : (r = n.hasOwnProperty("marginTop") ? n.marginTop : n["margin-top"], t.marginTop = r == null || typeof r == "boolean" ? "" : r, n = n.hasOwnProperty("marginBottom") ? n.marginBottom : n["margin-bottom"], t.marginBottom = n == null || typeof n == "boolean" ? "" : n)));
  }
  function WC(t, n, r) {
    return r = r.ownerDocument.defaultView, { rect: t, abs: n.position === "absolute" || n.position === "fixed", clip: n.clipPath !== "none" || n.overflow !== "visible" || n.filter !== "none" || n.mask !== "none" || n.mask !== "none" || n.borderRadius !== "0px", view: 0 <= t.bottom && 0 <= t.right && t.top <= r.innerHeight && t.left <= r.innerWidth };
  }
  function wh(t) {
    var n = t.getBoundingClientRect(), r = getComputedStyle(t);
    return WC(n, r, t);
  }
  function ek(t) {
    return t.documentElement.clientHeight;
  }
  function tk(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function nk(t, n, r, u, f, h, w, z, I) {
    var ee = n.nodeType === 9 ? n : n.ownerDocument;
    try {
      var oe = ee.startViewTransition({ update: function() {
        var P = ee.defaultView, ae = P.navigation && P.navigation.transition, Me = ee.fonts.status;
        u();
        var Oe = [];
        if (Me === "loaded" && (ek(ee), ee.fonts.status === "loading" && Oe.push(ee.fonts.ready)), Me = Oe.length, t !== null)
          for (var Je = t.suspenseyImages, W = 0, Q = 0; Q < Je.length; Q++) {
            var le = Je[Q];
            if (!le.complete) {
              var ye = le.getBoundingClientRect();
              if (0 < ye.bottom && 0 < ye.right && ye.top < P.innerHeight && ye.left < P.innerWidth) {
                if (W += G1(le), W > Xs) {
                  Oe.length = Me;
                  break;
                }
                le = new Promise(tk.bind(le)), Oe.push(le);
              }
            }
          }
        if (0 < Oe.length)
          return P = Promise.race([Promise.all(Oe), new Promise(function(De) {
            return setTimeout(De, 500);
          })]).then(f, f), (ae ? Promise.allSettled([ae.finished, P]) : P).then(h, h);
        if (f(), ae)
          return ae.finished.then(h, h);
        h();
      }, types: r });
      ee.__reactViewTransition = oe;
      var ve = [];
      return oe.ready.then(function() {
        for (var P = ee.documentElement.getAnimations({ subtree: true }), ae = 0; ae < P.length; ae++) {
          var Me = P[ae], Oe = Me.effect, Je = Oe.pseudoElement;
          if (Je != null && Je.startsWith("::view-transition")) {
            ve.push(Me), Me = Oe.getKeyframes();
            for (var W = Je = void 0, Q = true, le = 0; le < Me.length; le++) {
              var ye = Me[le], De = ye.width;
              if (Je === void 0)
                Je = De;
              else if (Je !== De) {
                Q = false;
                break;
              }
              if (De = ye.height, W === void 0)
                W = De;
              else if (W !== De) {
                Q = false;
                break;
              }
              delete ye.width, delete ye.height, ye.transform === "none" && delete ye.transform;
            }
            Q && Je !== void 0 && W !== void 0 && (Oe.setKeyframes(Me), Q = getComputedStyle(Oe.target, Oe.pseudoElement), Q.width !== Je || Q.height !== W) && (Q = Me[0], Q.width = Je, Q.height = W, Q = Me[Me.length - 1], Q.width = Je, Q.height = W, Oe.setKeyframes(Me));
          }
        }
        w();
      }, function(P) {
        ee.__reactViewTransition === oe && (ee.__reactViewTransition = null);
        try {
          if (typeof P == "object" && P !== null)
            switch (P.name) {
              case "InvalidStateError":
                (P.message === "View transition was skipped because document visibility state is hidden." || P.message === "Skipping view transition because document visibility state has become hidden." || P.message === "Skipping view transition because viewport size changed." || P.message === "Transition was aborted because of invalid state") && (P = null);
            }
          P !== null && I(P);
        } finally {
          u(), f(), w();
        }
      }), oe.finished.finally(function() {
        for (var P = 0; P < ve.length; P++)
          ve[P].cancel();
        ee.__reactViewTransition === oe && (ee.__reactViewTransition = null), z();
      }), oe;
    } catch {
      return u(), f(), w(), null;
    }
  }
  function gr(t, n) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + n + ")";
  }
  gr.prototype.animate = function(t, n) {
    return n = typeof n == "number" ? { duration: n } : B({}, n), n.pseudoElement = this._selector, this._scope.animate(t, n);
  }, gr.prototype.getAnimations = function() {
    for (var t = this._scope, n = this._selector, r = t.getAnimations({ subtree: true }), u = [], f = 0; f < r.length; f++) {
      var h = r[f].effect;
      h !== null && h.target === t && h.pseudoElement === n && u.push(r[f]);
    }
    return u;
  }, gr.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function k1(t) {
    return { name: t, group: new gr("group", t), imagePair: new gr("image-pair", t), old: new gr("old", t), new: new gr("new", t) };
  }
  function Rn(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Rn.prototype.addEventListener = function(t, n, r) {
    var u = null, f = null;
    if (!(r != null && typeof r != "boolean" && (u = r.signal || null, u !== null && u.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var h = this._eventListeners;
      if (_1(h, t, n, r) === -1) {
        var w = this, z = n;
        r != null && typeof r != "boolean" && r.once === true && (z = function(I) {
          w.removeEventListener(t, n, r), typeof n == "function" ? n.call(this, I) : n.handleEvent(I);
        }), u !== null && (f = w.removeEventListener.bind(w, t, n, r), u.addEventListener("abort", f, { once: true }), f = u.removeEventListener.bind(u, "abort", f)), u = va(r), h.push({ type: t, listener: n, optionsOrUseCapture: r, attachedListener: z, cleanup: f }), p(this._fragmentFiber.child, false, ik, t, z, u);
      }
      this._eventListeners = h;
    }
  };
  function ik(t, n, r, u) {
    return N(t).addEventListener(n, r, u), false;
  }
  Rn.prototype.removeEventListener = function(t, n, r) {
    var u = this._eventListeners;
    if (u !== null && (n = _1(u, t, n, r), n !== -1)) {
      var f = u[n];
      r = f.attachedListener;
      var h = f.cleanup;
      f = va(f.optionsOrUseCapture), p(this._fragmentFiber.child, false, lk, t, r, f), u.splice(n, 1), h !== null && h();
    }
  };
  function lk(t, n, r, u) {
    return N(t).removeEventListener(n, r, u), false;
  }
  function va(t) {
    return t != null && typeof t != "boolean" && (t.once === true || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function N1(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function _1(t, n, r, u) {
    if (t.length === 0)
      return -1;
    u = N1(u);
    for (var f = 0; f < t.length; f++) {
      var h = t[f];
      if (h.type === n && h.listener === r && N1(h.optionsOrUseCapture) === u)
        return f;
    }
    return -1;
  }
  Rn.prototype.dispatchEvent = function(t) {
    var n = x(this._fragmentFiber);
    if (n === null)
      return true;
    n = N(n);
    var r = this._eventListeners;
    if (r !== null && 0 < r.length || !t.bubbles) {
      var u = n.nodeType === 9 ? n.createComment("") : document.createTextNode("");
      if (r)
        for (var f = 0; f < r.length; f++) {
          var h = r[f];
          u.addEventListener(h.type, h.attachedListener, va(h.optionsOrUseCapture));
        }
      if (n.appendChild(u), t = u.dispatchEvent(t), r)
        for (f = 0; f < r.length; f++)
          h = r[f], u.removeEventListener(h.type, h.attachedListener, va(h.optionsOrUseCapture));
      return n.removeChild(u), t;
    }
    return n.dispatchEvent(t);
  }, Rn.prototype.focus = function(t) {
    p(this._fragmentFiber.child, true, z1, t, void 0, void 0);
  };
  function z1(t, n) {
    return t.tag === 6 ? false : (t = N(t), gk(t, n));
  }
  Rn.prototype.focusLast = function(t) {
    var n = [];
    p(this._fragmentFiber.child, true, Sh, n, void 0, void 0);
    for (var r = n.length - 1; 0 <= r && !z1(n[r], t); r--)
      ;
  };
  function Sh(t, n) {
    return n.push(t), false;
  }
  Rn.prototype.blur = function() {
    var t = x(this._fragmentFiber);
    t !== null && (t = N(t), t = ju(t).activeElement, t !== null && p(this._fragmentFiber.child, false, rk, t, void 0, void 0));
  };
  function rk(t, n) {
    return t.tag === 6 ? false : (t = N(t), t === n || t.contains(n) ? (n.blur(), true) : false);
  }
  Rn.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), p(this._fragmentFiber.child, false, ak, t, void 0, void 0);
  };
  function ak(t, n) {
    return t.tag === 6 || (t = N(t), n.observe(t)), false;
  }
  Rn.prototype.unobserveUsing = function(t) {
    var n = this._observers;
    if (n !== null && n.has(t)) {
      n.delete(t), p(this._fragmentFiber.child, false, uk, t, void 0, void 0);
      for (var r = n = 0; r < ai.length; r++) {
        var u = ai[r];
        u.fragmentInstance === this && u.observer === t ? t.unobserve(u.instance) : ai[n++] = u;
      }
      ai.length = n;
    }
  };
  function uk(t, n) {
    return t.tag === 6 || (t = N(t), n.unobserve(t)), false;
  }
  var ai = [], Eh = false;
  function ok(t, n, r) {
    ai.push({ fragmentInstance: t, observer: n, instance: r }), Eh || (Eh = true, yk(function() {
      Eh = false;
      var u = ai;
      ai = [];
      for (var f = 0; f < u.length; f++) {
        var h = u[f];
        h.observer.unobserve(h.instance);
      }
    }));
  }
  Rn.prototype.getClientRects = function() {
    var t = [];
    return p(this._fragmentFiber.child, false, sk, t, void 0, void 0), t;
  };
  function sk(t, n) {
    if (t.tag === 6) {
      t = t.stateNode;
      var r = t.ownerDocument.createRange();
      r.selectNodeContents(t), n.push.apply(n, r.getClientRects());
    } else
      t = N(t), n.push.apply(n, t.getClientRects());
    return false;
  }
  Rn.prototype.getRootNode = function(t) {
    var n = x(this._fragmentFiber);
    return n === null ? this : N(n).getRootNode(t);
  }, Rn.prototype.compareDocumentPosition = function(t) {
    var n = x(this._fragmentFiber);
    if (n === null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    var r = [];
    p(this._fragmentFiber.child, false, Sh, r, void 0, void 0);
    var u = N(n);
    if (r.length === 0) {
      if (r = u, v(this._fragmentFiber)) {
        e: {
          for (n = this._fragmentFiber.return; n !== null; ) {
            if (n.tag === 4) {
              n = n.stateNode.containerInfo;
              break e;
            }
            if (n.tag === 3 || n.tag === 5 || n.tag === 27)
              break;
            n = n.return;
          }
          n = null;
        }
        n != null && (r = n);
      }
      n = this._fragmentFiber;
      var f = u = r.compareDocumentPosition(t);
      return r === t ? f = Node.DOCUMENT_POSITION_CONTAINS : u & Node.DOCUMENT_POSITION_CONTAINED_BY && (r = S(n)[1], r === null ? f = Node.DOCUMENT_POSITION_PRECEDING : (t = N(r).compareDocumentPosition(t), f = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), f |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    n = N(r[0]), f = N(r[r.length - 1]);
    var h = v(this._fragmentFiber) ? n.parentElement : u;
    if (h == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    u = h.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY, h = h.compareDocumentPosition(f) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var w = n.compareDocumentPosition(t), z = f.compareDocumentPosition(t), I = w & Node.DOCUMENT_POSITION_CONTAINED_BY || z & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return z = u && h && w & Node.DOCUMENT_POSITION_FOLLOWING && z & Node.DOCUMENT_POSITION_PRECEDING, n = u && n === t || h && f === t || I || z ? Node.DOCUMENT_POSITION_CONTAINED_BY : !u && n === t || !h && f === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : w, n & Node.DOCUMENT_POSITION_DISCONNECTED || n & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || ck(n, this._fragmentFiber, r[0], r[r.length - 1], t) ? n : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function ck(t, n, r, u, f) {
    var h = Bi(f);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (r = !!h)
        e: {
          for (; h !== null; ) {
            if (h.tag === 7 && (h === n || h.alternate === n)) {
              r = true;
              break e;
            }
            h = h.return;
          }
          r = false;
        }
      return r;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (h === null)
        return h = f.ownerDocument, f === h || f === h.documentElement || f === h.body;
      e: {
        for (h = n, n = x(n); h !== null; ) {
          if (!(h.tag !== 5 && h.tag !== 3 && h.tag !== 27 || h !== n && h.alternate !== n)) {
            h = true;
            break e;
          }
          h = h.return;
        }
        h = false;
      }
      return h;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((n = !!h) && !(n = h === r) && (n = M(r, h, Y), n === null ? n = false : (p(n, true, k, h, r), h = C, C = null, n = h !== null)), n) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((n = !!h) && !(n = h === u) && (n = M(u, h, Y), n === null ? n = false : (p(n, true, T, h, u), h = C, A = C = null, n = h !== null)), n) : false;
  }
  function T1(t, n) {
    var r = t.ownerDocument.createRange();
    r.selectNodeContents(t), t = r.getBoundingClientRect(), window.scrollTo(window.scrollX + t.left, n ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight);
  }
  Rn.prototype.scrollIntoView = function(t) {
    if (typeof t == "object")
      throw Error(a(566));
    var n = [];
    p(this._fragmentFiber.child, false, Sh, n, void 0, void 0);
    var r = t !== false;
    if (n.length === 0) {
      var u = S(this._fragmentFiber);
      if (u = r ? u[1] || u[0] || x(this._fragmentFiber) : u[0] || u[1], u === null)
        return;
      if (u.tag === 6) {
        t = N(u), T1(t, r);
        return;
      }
      if (u = N(u), u.nodeType !== 9) {
        if (u.nodeType === 11) {
          r = "host" in u ? u.host : null, r !== null && r.scrollIntoView(t);
          return;
        }
        u.scrollIntoView(t);
      }
    }
    for (u = r ? n.length - 1 : 0; u !== (r ? -1 : n.length); ) {
      var f = n[u];
      f.tag === 6 ? (f = N(f), T1(f, r)) : N(f).scrollIntoView(t), u += r ? -1 : 1;
    }
  };
  function fk(t, n) {
    return t = N(t), A1(t, n), false;
  }
  function A1(t, n) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(n);
  }
  function M1(t, n) {
    var r = n._eventListeners;
    if (r !== null)
      for (var u = 0; u < r.length; u++) {
        var f = r[u];
        t.addEventListener(f.type, f.attachedListener, va(f.optionsOrUseCapture));
      }
    t.nodeType !== 3 && (r = n._observers, r !== null && r.forEach(function(h) {
      for (var w = 0, z = 0; z < ai.length; z++) {
        var I = ai[z];
        (I.fragmentInstance !== n || I.observer !== h || I.instance !== t) && (ai[w++] = I);
      }
      ai.length = w, h.observe(t);
    }), A1(t, n));
  }
  function dk(t, n) {
    var r = n._eventListeners;
    if (r !== null)
      for (var u = 0; u < r.length; u++) {
        var f = r[u];
        t.removeEventListener(f.type, f.attachedListener, va(f.optionsOrUseCapture));
      }
    t.nodeType !== 3 && (r = n._observers, r !== null && r.forEach(function(h) {
      typeof h.rootMargin == "string" ? ok(n, h, t) : h.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(n));
  }
  function Ch(t) {
    var n = t.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var r = n;
      switch (n = n.nextSibling, r.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Ch(r), Ir(r);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (r.rel.toLowerCase() === "stylesheet")
            continue;
      }
      t.removeChild(r);
    }
  }
  function hk(t, n, r, u) {
    for (; t.nodeType === 1; ) {
      var f = r;
      if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!u && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (u) {
        if (!t[Fl])
          switch (n) {
            case "meta":
              if (!t.hasAttribute("itemprop"))
                break;
              return t;
            case "link":
              if (h = t.getAttribute("rel"), h === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (h !== f.rel || t.getAttribute("href") !== (f.href == null || f.href === "" ? null : f.href) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin) || t.getAttribute("title") !== (f.title == null ? null : f.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence"))
                break;
              return t;
            case "script":
              if (h = t.getAttribute("src"), (h !== (f.src == null ? null : f.src) || t.getAttribute("type") !== (f.type == null ? null : f.type) || t.getAttribute("crossorigin") !== (f.crossOrigin == null ? null : f.crossOrigin)) && h && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (n === "input" && t.type === "hidden") {
        var h = f.name == null ? null : "" + f.name;
        if (f.type === "hidden" && t.getAttribute("name") === h)
          return t;
      } else
        return t;
      if (t = Fn(t.nextSibling), t === null)
        break;
    }
    return null;
  }
  function mk(t, n, r) {
    if (n === "")
      return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !r || (t = Fn(t.nextSibling), t === null))
        return null;
    return t;
  }
  function j1(t, n) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Fn(t.nextSibling), t === null))
        return null;
    return t;
  }
  function kh(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Nh(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function pk(t, n) {
    var r = t.ownerDocument;
    if (t.data === "$~")
      t._reactRetry = n;
    else if (t.data !== "$?" || r.readyState !== "loading")
      n();
    else {
      var u = function() {
        n(), r.removeEventListener("DOMContentLoaded", u);
      };
      r.addEventListener("DOMContentLoaded", u), t._reactRetry = u;
    }
  }
  function Fn(t) {
    for (; t != null; t = t.nextSibling) {
      var n = t.nodeType;
      if (n === 1 || n === 3)
        break;
      if (n === 8) {
        if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&" || n === "F!" || n === "F")
          break;
        if (n === "/$" || n === "/&")
          return null;
      }
    }
    return t;
  }
  var _h = null;
  function D1(t) {
    t = t.nextSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "/$" || r === "/&") {
          if (n === 0)
            return Fn(t.nextSibling);
          n--;
        } else
          r !== "$" && r !== "$!" && r !== "$?" && r !== "$~" && r !== "&" || n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function O1(t) {
    t = t.previousSibling;
    for (var n = 0; t; ) {
      if (t.nodeType === 8) {
        var r = t.data;
        if (r === "$" || r === "$!" || r === "$?" || r === "$~" || r === "&") {
          if (n === 0)
            return t;
          n--;
        } else
          r !== "/$" && r !== "/&" || n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function gk(t, n) {
    function r() {
      u = true;
    }
    if (t.ownerDocument.activeElement === t)
      return true;
    var u = false;
    try {
      t.ownerDocument.addEventListener("focus", r, true), (t.focus || HTMLElement.prototype.focus).call(t, n);
    } finally {
      t.ownerDocument.removeEventListener("focus", r, true);
    }
    return u;
  }
  function yk(t) {
    b1(function() {
      b1(function(n) {
        return t(n);
      });
    });
  }
  function R1(t, n, r) {
    switch (n = ju(r), t) {
      case "html":
        if (t = n.documentElement, !t)
          throw Error(a(452));
        return t;
      case "head":
        if (t = n.head, !t)
          throw Error(a(453));
        return t;
      case "body":
        if (t = n.body, !t)
          throw Error(a(454));
        return t;
      default:
        throw Error(a(451));
    }
  }
  function L1(t, n, r) {
    for (var u in r) {
      var f = r[u];
      r.hasOwnProperty(u) && f != null && xt(t, n, u, null, $C, f);
    }
    r.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === yi && (t.onclick = null), Ir(t);
  }
  function zh(t) {
    for (var n = t.attributes; n.length; )
      t.removeAttributeNode(n[0]);
    Ir(t);
  }
  var Kn = /* @__PURE__ */ new Map(), H1 = /* @__PURE__ */ new Set();
  function Du(t) {
    if (typeof t.getRootNode == "function") {
      var n = t.getRootNode();
      if (n.nodeType === 9 || n.nodeType === 11)
        return n;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Ji = q.d;
  q.d = { f: xk, r: vk, D: bk, C: wk, L: Sk, m: Ek, X: kk, S: Ck, M: Nk };
  function xk() {
    var t = Ji.f(), n = Rs();
    return t || n;
  }
  function vk(t) {
    var n = sl(t);
    n !== null && n.tag === 5 && n.type === "form" ? U0(n) : Ji.r(t);
  }
  var ba = typeof document > "u" ? null : document;
  function B1(t, n, r) {
    var u = ba;
    if (u && typeof n == "string" && n) {
      var f = Vn(n);
      f = 'link[rel="' + t + '"][href="' + f + '"]', typeof r == "string" && (f += '[crossorigin="' + r + '"]'), H1.has(f) || (H1.add(f), t = { rel: t, crossOrigin: r, href: n }, u.querySelector(f) === null && (n = u.createElement("link"), on(n, "link", t), qt(n), u.head.appendChild(n)));
    }
  }
  function bk(t) {
    Ji.D(t), B1("dns-prefetch", t, null);
  }
  function wk(t, n) {
    Ji.C(t, n), B1("preconnect", t, n);
  }
  function Sk(t, n, r) {
    Ji.L(t, n, r);
    var u = ba;
    if (u && t && n) {
      var f = 'link[rel="preload"][as="' + Vn(n) + '"]';
      n === "image" && r && r.imageSrcSet ? (f += '[imagesrcset="' + Vn(r.imageSrcSet) + '"]', typeof r.imageSizes == "string" && (f += '[imagesizes="' + Vn(r.imageSizes) + '"]')) : f += '[href="' + Vn(t) + '"]';
      var h = f;
      switch (n) {
        case "style":
          h = wa(t);
          break;
        case "script":
          h = Sa(t);
      }
      if (!(Kn.has(h) || (t = B({ rel: "preload", href: n === "image" && r && r.imageSrcSet ? void 0 : t, as: n }, r), Kn.set(h, t), u.querySelector(f) !== null || n === "style" && u.querySelector(Ou(h)) || n === "script" && u.querySelector(Ru(h))))) {
        var w = u.createElement("link");
        on(w, "link", t), n === "style" && (w[Ur] = true, w.onload = w.onerror = function() {
          Ka(w);
        }), qt(w), u.head.appendChild(w);
      }
    }
  }
  function Ek(t, n) {
    Ji.m(t, n);
    var r = ba;
    if (r && t) {
      var u = n && typeof n.as == "string" ? n.as : "script", f = 'link[rel="modulepreload"][as="' + Vn(u) + '"][href="' + Vn(t) + '"]', h = f;
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          h = Sa(t);
      }
      if (!Kn.has(h) && (t = B({ rel: "modulepreload", href: t }, n), Kn.set(h, t), r.querySelector(f) === null)) {
        switch (u) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (r.querySelector(Ru(h)))
              return;
        }
        u = r.createElement("link"), on(u, "link", t), qt(u), r.head.appendChild(u);
      }
    }
  }
  function Ck(t, n, r) {
    Ji.S(t, n, r);
    var u = ba;
    if (u && t) {
      var f = Wn(u).hoistableStyles, h = wa(t);
      n = n || "default";
      var w = f.get(h);
      if (!w) {
        var z = { loading: 0, preload: null };
        if (w = u.querySelector(Ou(h)))
          z.loading = 5;
        else {
          t = B({ rel: "stylesheet", href: t, "data-precedence": n }, r), (r = Kn.get(h)) && Th(t, r);
          var I = w = u.createElement("link");
          qt(I), on(I, "link", t), I._p = new Promise(function(ee, oe) {
            I.onload = ee, I.onerror = oe;
          }), I.addEventListener("load", function() {
            z.loading |= 1;
          }), I.addEventListener("error", function() {
            z.loading |= 2;
          }), z.loading |= 4, Vs(w, n, u);
        }
        w = { type: "stylesheet", instance: w, count: 1, state: z }, f.set(h, w);
      }
    }
  }
  function kk(t, n) {
    Ji.X(t, n);
    var r = ba;
    if (r && t) {
      var u = Wn(r).hoistableScripts, f = Sa(t), h = u.get(f);
      h || (h = r.querySelector(Ru(f)), h || (t = B({ src: t, async: true }, n), (n = Kn.get(f)) && Ah(t, n), h = r.createElement("script"), qt(h), on(h, "link", t), r.head.appendChild(h)), h = { type: "script", instance: h, count: 1, state: null }, u.set(f, h));
    }
  }
  function Nk(t, n) {
    Ji.M(t, n);
    var r = ba;
    if (r && t) {
      var u = Wn(r).hoistableScripts, f = Sa(t), h = u.get(f);
      h || (h = r.querySelector(Ru(f)), h || (t = B({ src: t, async: true, type: "module" }, n), (n = Kn.get(f)) && Ah(t, n), h = r.createElement("script"), qt(h), on(h, "link", t), r.head.appendChild(h)), h = { type: "script", instance: h, count: 1, state: null }, u.set(f, h));
    }
  }
  function U1(t, n, r, u) {
    var f = (f = vt.current) ? Du(f) : null;
    if (!f)
      throw Error(a(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof r.precedence == "string" && typeof r.href == "string" ? (r = wa(r.href), n = Wn(f).hoistableStyles, u = n.get(r), u || (u = { type: "style", instance: null, count: 0, state: null }, n.set(r, u)), u) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (r.rel === "stylesheet" && typeof r.href == "string" && typeof r.precedence == "string") {
          t = wa(r.href);
          var h = Wn(f).hoistableStyles, w = h.get(t);
          if (w || (f = f.ownerDocument || f, w = { type: "stylesheet", instance: null, count: 0, state: { loading: 0, preload: null } }, h.set(t, w), (h = f.querySelector(Ou(t))) ? h._p || (w.instance = h, w.state.loading = 5) : (h = Kn.get(t), h || (h = { rel: "preload", as: "style", href: r.href, crossOrigin: r.crossOrigin, integrity: r.integrity, media: r.media, hrefLang: r.hrefLang, referrerPolicy: r.referrerPolicy }, Kn.set(t, h)), _k(f, t, h, w.state))), n && u === null)
            throw Error(a(528, ""));
          return w;
        }
        if (n && u !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return n = r.async, r = r.src, typeof r == "string" && n && typeof n != "function" && typeof n != "symbol" ? (r = Sa(r), n = Wn(f).hoistableScripts, u = n.get(r), u || (u = { type: "script", instance: null, count: 0, state: null }, n.set(r, u)), u) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, t));
    }
  }
  function wa(t) {
    return 'href="' + Vn(t) + '"';
  }
  function Ou(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function I1(t) {
    return B({}, t, { "data-precedence": t.precedence, precedence: null });
  }
  function _k(t, n, r, u) {
    if (n = t.querySelector('link[rel="preload"][as="style"][' + n + "]")) {
      if (n[Ur] !== true) {
        u.loading = 1;
        return;
      }
    } else
      n = t.createElement("link"), n[Ur] = true, n.onload = n.onerror = Ka.bind(null, n), on(n, "link", r), qt(n), t.head.appendChild(n);
    u.preload = n, n.addEventListener("load", function() {
      return u.loading |= 1;
    }), n.addEventListener("error", function() {
      return u.loading |= 2;
    });
  }
  function Sa(t) {
    return '[src="' + Vn(t) + '"]';
  }
  function Ru(t) {
    return "script[async]" + t;
  }
  function q1(t, n, r) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var u = t.querySelector('style[data-href~="' + Vn(r.href) + '"]');
          if (u)
            return n.instance = u, qt(u), u;
          var f = B({}, r, { "data-href": r.href, "data-precedence": r.precedence, href: null, precedence: null });
          return u = (t.ownerDocument || t).createElement("style"), qt(u), on(u, "style", f), Vs(u, r.precedence, t), n.instance = u;
        case "stylesheet":
          f = wa(r.href);
          var h = t.querySelector(Ou(f));
          if (h)
            return n.state.loading |= 4, n.instance = h, qt(h), h;
          u = I1(r), (f = Kn.get(f)) && Th(u, f), h = (t.ownerDocument || t).createElement("link"), qt(h);
          var w = h;
          return w._p = new Promise(function(z, I) {
            w.onload = z, w.onerror = I;
          }), on(h, "link", u), n.state.loading |= 4, Vs(h, r.precedence, t), n.instance = h;
        case "script":
          return h = Sa(r.src), (f = t.querySelector(Ru(h))) ? (n.instance = f, qt(f), f) : (u = r, (f = Kn.get(h)) && (u = B({}, r), Ah(u, f)), t = t.ownerDocument || t, f = t.createElement("script"), qt(f), on(f, "link", u), t.head.appendChild(f), n.instance = f);
        case "void":
          return null;
        default:
          throw Error(a(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (u = n.instance, n.state.loading |= 4, Vs(u, r.precedence, t));
    return n.instance;
  }
  function Vs(t, n, r) {
    for (var u = r.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), f = u.length ? u[u.length - 1] : null, h = f, w = 0; w < u.length; w++) {
      var z = u[w];
      if (z.dataset.precedence === n)
        h = z;
      else if (h !== f)
        break;
    }
    h ? h.parentNode.insertBefore(t, h.nextSibling) : (n = r.nodeType === 9 ? r.head : r, n.insertBefore(t, n.firstChild));
  }
  function Th(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title);
  }
  function Ah(t, n) {
    t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity);
  }
  var Ys = null;
  function V1(t, n, r) {
    if (Ys === null) {
      var u = /* @__PURE__ */ new Map(), f = Ys = /* @__PURE__ */ new Map();
      f.set(r, u);
    } else
      f = Ys, u = f.get(r), u || (u = /* @__PURE__ */ new Map(), f.set(r, u));
    if (u.has(t))
      return u;
    for (u.set(t, null), r = r.getElementsByTagName(t), f = 0; f < r.length; f++) {
      var h = r[f];
      if (!(h[Fl] || h[ht] || t === "link" && h.getAttribute("rel") === "stylesheet") && h.namespaceURI !== "http://www.w3.org/2000/svg") {
        var w = h.getAttribute(n) || "";
        w = t + w;
        var z = u.get(w);
        z ? z.push(h) : u.set(w, [h]);
      }
    }
    return u;
  }
  function Mh(t, n, r) {
    t = t.ownerDocument || t, t.head.insertBefore(r, n === "title" ? t.querySelector("head > title") : null);
  }
  function zk(t, n, r) {
    if (r === 1 || n.itemProp != null)
      return false;
    switch (t) {
      case "meta":
      case "title":
        return true;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return true;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return t = n.disabled, typeof n.precedence == "string" && t == null;
          default:
            return true;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return true;
    }
    return false;
  }
  function Y1(t, n) {
    return t === "img" && n.src != null && n.src !== "" && n.onLoad == null && n.loading !== "lazy";
  }
  function X1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function G1(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function $1(t, n) {
    typeof n.decode == "function" && (t.imgCount++, n.complete || (t.imgBytes += G1(n), t.suspenseyImages.push(n)), t = Mk.bind(t), n.decode().then(t, t));
  }
  function Tk(t, n, r, u) {
    if (r.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== false) && (r.state.loading & 4) === 0) {
      if (r.instance === null) {
        var f = wa(u.href), h = n.querySelector(Ou(f));
        if (h) {
          n = h._p, n !== null && typeof n == "object" && typeof n.then == "function" && (t.count++, t = Lu.bind(t), n.then(t, t)), r.state.loading |= 4, r.instance = h, qt(h);
          return;
        }
        h = n.ownerDocument || n, u = I1(u), (f = Kn.get(f)) && Th(u, f), h = h.createElement("link"), qt(h);
        var w = h;
        w._p = new Promise(function(z, I) {
          w.onload = z, w.onerror = I;
        }), on(h, "link", u), r.instance = h;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(r, n), (n = r.state.preload) && (r.state.loading & 3) === 0 && (t.count++, r = Lu.bind(t), n.addEventListener("load", r), n.addEventListener("error", r));
    }
  }
  var Xs = 0;
  function Ak(t, n) {
    return t.stylesheets && t.count === 0 && $s(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(r) {
      var u = setTimeout(function() {
        if (t.stylesheets && $s(t, t.stylesheets), t.unsuspend) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, 6e4 + n);
      0 < t.imgBytes && Xs === 0 && (Xs = 62500 * ZC());
      var f = setTimeout(function() {
        if (t.waitingForImages = false, t.count === 0 && (t.stylesheets && $s(t, t.stylesheets), t.unsuspend)) {
          var h = t.unsuspend;
          t.unsuspend = null, h();
        }
      }, (t.imgBytes > Xs ? 50 : 800) + n);
      return t.unsuspend = r, function() {
        t.unsuspend = null, clearTimeout(u), clearTimeout(f);
      };
    } : null;
  }
  function Q1(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets)
        $s(t, t.stylesheets);
      else if (t.unsuspend) {
        var n = t.unsuspend;
        t.unsuspend = null, n();
      }
    }
  }
  function Lu() {
    this.count--, Q1(this);
  }
  function Mk() {
    this.imgCount--, Q1(this);
  }
  var Gs = null;
  function $s(t, n) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Gs = /* @__PURE__ */ new Map(), n.forEach(jk, t), Gs = null, Lu.call(t));
  }
  function jk(t, n) {
    if (!(n.state.loading & 4)) {
      var r = Gs.get(t);
      if (r)
        var u = r.get(null);
      else {
        r = /* @__PURE__ */ new Map(), Gs.set(t, r);
        for (var f = t.querySelectorAll("link[data-precedence],style[data-precedence]"), h = 0; h < f.length; h++) {
          var w = f[h];
          (w.nodeName === "LINK" || w.getAttribute("media") !== "not all") && (r.set(w.dataset.precedence, w), u = w);
        }
        u && r.set(null, u);
      }
      f = n.instance, w = f.getAttribute("data-precedence"), h = r.get(w) || u, h === u && r.set(null, f), r.set(w, f), this.count++, u = Lu.bind(this), f.addEventListener("load", u), f.addEventListener("error", u), h ? h.parentNode.insertBefore(f, h.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(f, t.firstChild)), n.state.loading |= 4;
    }
  }
  var Ea = { $$typeof: D, Provider: null, Consumer: null, _currentValue: we, _currentValue2: we, _threadCount: 0 };
  function Dk(t, n, r, u, f, h, w, z, I) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Z(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Z(0), this.hiddenUpdates = Z(null), this.identifierPrefix = u, this.onUncaughtError = f, this.onCaughtError = h, this.onRecoverableError = w, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = I, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Z1(t, n, r, u, f, h, w, z, I, ee, oe, ve) {
    return t = new Dk(t, n, r, w, I, ee, oe, ve, z), n = 1, h === true && (n |= 24), h = vn(3, null, null, n), t.current = h, h.stateNode = t, n = $f(), n.refCount++, t.pooledCache = n, n.refCount++, h.memoizedState = { element: u, isDehydrated: r, cache: n }, Kf(h), t;
  }
  function F1(t) {
    return t ? (t = Fr, t) : Fr;
  }
  function K1(t, n, r, u, f, h) {
    f = F1(f), u.context === null ? u.context = f : u.pendingContext = f, u = vl(n), u.payload = { element: r }, h = h === void 0 ? null : h, h !== null && (u.callback = h), r = bl(t, u, n), r !== null && (En(r, t, n), hu(r, t, n));
  }
  function P1(t, n) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var r = t.retryLane;
      t.retryLane = r !== 0 && r < n ? r : n;
    }
  }
  function jh(t, n) {
    P1(t, n), (t = t.alternate) && P1(t, n);
  }
  function J1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = Wl(t, 67108864);
      n !== null && En(n, t, 67108864), jh(t, 67108864);
    }
  }
  function W1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var n = On();
      n = He(n);
      var r = Wl(t, n);
      r !== null && En(r, t, n), jh(t, n);
    }
  }
  var Ca = true;
  function Ok(t, n, r, u) {
    var f = fe.T;
    fe.T = null;
    var h = q.p;
    try {
      q.p = 2, Dh(t, n, r, u);
    } finally {
      q.p = h, fe.T = f;
    }
  }
  function Rk(t, n, r, u) {
    var f = fe.T;
    fe.T = null;
    var h = q.p;
    try {
      q.p = 8, Dh(t, n, r, u);
    } finally {
      q.p = h, fe.T = f;
    }
  }
  function Dh(t, n, r, u) {
    if (Ca) {
      var f = Oh(u);
      if (f === null)
        mh(t, n, u, Qs, r), tx(t, u);
      else if (Hk(f, t, n, r, u))
        u.stopPropagation();
      else if (tx(t, u), n & 4 && -1 < Lk.indexOf(t)) {
        for (; f !== null; ) {
          var h = sl(f);
          if (h !== null)
            switch (h.tag) {
              case 3:
                if (h = h.stateNode, h.current.memoizedState.isDehydrated) {
                  var w = qn(h.pendingLanes);
                  if (w !== 0) {
                    var z = h;
                    for (z.pendingLanes |= 2, z.entangledLanes |= 2; w; ) {
                      var I = 1 << 31 - Pt(w);
                      z.entanglements[1] |= I, w &= ~I;
                    }
                    _i(h), (dt & 6) === 0 && (js = bt() + 500, Tu(0));
                  }
                }
                break;
              case 31:
              case 13:
                z = Wl(h, 2), z !== null && En(z, h, 2), Rs(), jh(h, 2);
            }
          if (h = Oh(u), h === null && mh(t, n, u, Qs, r), h === f)
            break;
          f = h;
        }
        f !== null && u.stopPropagation();
      } else
        mh(t, n, u, null, r);
    }
  }
  function Oh(t) {
    return t = vf(t), Rh(t);
  }
  var Qs = null;
  function Rh(t) {
    if (Qs = null, t = Bi(t), t !== null) {
      var n = s(t);
      if (n === null)
        t = null;
      else {
        var r = n.tag;
        if (r === 13) {
          if (t = c(n), t !== null)
            return t;
          t = null;
        } else if (r === 31) {
          if (t = d(n), t !== null)
            return t;
          t = null;
        } else if (r === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          t = null;
        } else
          n !== t && (t = null);
      }
    }
    return Qs = t, null;
  }
  function ex(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Dt()) {
          case dn:
            return 2;
          case Ft:
            return 8;
          case gi:
          case Hr:
            return 32;
          case rl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Lh = false, jl = null, Dl = null, Ol = null, Hu = /* @__PURE__ */ new Map(), Bu = /* @__PURE__ */ new Map(), Rl = [], Lk = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
  function tx(t, n) {
    switch (t) {
      case "focusin":
      case "focusout":
        jl = null;
        break;
      case "dragenter":
      case "dragleave":
        Dl = null;
        break;
      case "mouseover":
      case "mouseout":
        Ol = null;
        break;
      case "pointerover":
      case "pointerout":
        Hu.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Bu.delete(n.pointerId);
    }
  }
  function Uu(t, n, r, u, f, h) {
    return t === null || t.nativeEvent !== h ? (t = { blockedOn: n, domEventName: r, eventSystemFlags: u, nativeEvent: h, targetContainers: [f] }, n !== null && (n = sl(n), n !== null && J1(n)), t) : (t.eventSystemFlags |= u, n = t.targetContainers, f !== null && n.indexOf(f) === -1 && n.push(f), t);
  }
  function Hk(t, n, r, u, f) {
    switch (n) {
      case "focusin":
        return jl = Uu(jl, t, n, r, u, f), true;
      case "dragenter":
        return Dl = Uu(Dl, t, n, r, u, f), true;
      case "mouseover":
        return Ol = Uu(Ol, t, n, r, u, f), true;
      case "pointerover":
        var h = f.pointerId;
        return Hu.set(h, Uu(Hu.get(h) || null, t, n, r, u, f)), true;
      case "gotpointercapture":
        return h = f.pointerId, Bu.set(h, Uu(Bu.get(h) || null, t, n, r, u, f)), true;
    }
    return false;
  }
  function nx(t) {
    var n = Bi(t.target);
    if (n !== null) {
      var r = s(n);
      if (r !== null) {
        if (n = r.tag, n === 13) {
          if (n = c(r), n !== null) {
            t.blockedOn = n, tt(t.priority, function() {
              W1(r);
            });
            return;
          }
        } else if (n === 31) {
          if (n = d(r), n !== null) {
            t.blockedOn = n, tt(t.priority, function() {
              W1(r);
            });
            return;
          }
        } else if (n === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Zs(t) {
    if (t.blockedOn !== null)
      return false;
    for (var n = t.targetContainers; 0 < n.length; ) {
      var r = Oh(t.nativeEvent);
      if (r === null) {
        r = t.nativeEvent;
        var u = new r.constructor(r.type, r);
        xf = u, r.target.dispatchEvent(u), xf = null;
      } else
        return n = sl(r), n !== null && J1(n), t.blockedOn = r, false;
      n.shift();
    }
    return true;
  }
  function ix(t, n, r) {
    Zs(t) && r.delete(n);
  }
  function Bk() {
    Lh = false, jl !== null && Zs(jl) && (jl = null), Dl !== null && Zs(Dl) && (Dl = null), Ol !== null && Zs(Ol) && (Ol = null), Hu.forEach(ix), Bu.forEach(ix);
  }
  function Fs(t, n) {
    t.blockedOn === n && (t.blockedOn = null, Lh || (Lh = true, e12.unstable_scheduleCallback(e12.unstable_NormalPriority, Bk)));
  }
  var Ks = null;
  function lx(t) {
    Ks !== t && (Ks = t, e12.unstable_scheduleCallback(e12.unstable_NormalPriority, function() {
      Ks === t && (Ks = null);
      for (var n = 0; n < t.length; n += 3) {
        var r = t[n], u = t[n + 1], f = t[n + 2];
        if (typeof u != "function") {
          if (Rh(u || r) === null)
            continue;
          break;
        }
        var h = sl(r);
        h !== null && (t.splice(n, 3), n -= 3, yd(h, { pending: true, data: f, method: r.method, action: u }, u, f));
      }
    }));
  }
  function ka(t) {
    function n(I) {
      return Fs(I, t);
    }
    jl !== null && Fs(jl, t), Dl !== null && Fs(Dl, t), Ol !== null && Fs(Ol, t), Hu.forEach(n), Bu.forEach(n);
    for (var r = 0; r < Rl.length; r++) {
      var u = Rl[r];
      u.blockedOn === t && (u.blockedOn = null);
    }
    for (; 0 < Rl.length && (r = Rl[0], r.blockedOn === null); )
      nx(r), r.blockedOn === null && Rl.shift();
    if (r = (t.ownerDocument || t).$$reactFormReplay, r != null)
      for (u = 0; u < r.length; u += 3) {
        var f = r[u], h = r[u + 1], w = f[hn] || null;
        if (typeof h == "function")
          w || lx(r);
        else if (w) {
          var z = null;
          if (h && h.hasAttribute("formAction")) {
            if (f = h, w = h[hn] || null)
              z = w.formAction;
            else if (Rh(f) !== null)
              continue;
          } else
            z = w.action;
          typeof z == "function" ? r[u + 1] = z : (r.splice(u, 3), u -= 3), lx(r);
        }
      }
  }
  function rx() {
    function t(h) {
      h.canIntercept && h.info === "react-transition" && h.intercept({ handler: function() {
        return new Promise(function(w) {
          return f = w;
        });
      }, focusReset: "manual", scroll: "manual" });
    }
    function n() {
      f !== null && (f(), f = null), u || setTimeout(r, 20);
    }
    function r() {
      if (!u && !navigation.transition) {
        var h = navigation.currentEntry;
        h && h.url != null && navigation.navigate(h.url, { state: h.getState(), info: "react-transition", history: "replace" });
      }
    }
    if (typeof navigation == "object") {
      var u = false, f = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", n), navigation.addEventListener("navigateerror", n), setTimeout(r, 100), function() {
        u = true, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", n), navigation.removeEventListener("navigateerror", n), f !== null && (f(), f = null);
      };
    }
  }
  function Hh(t) {
    this._internalRoot = t;
  }
  Ps.prototype.render = Hh.prototype.render = function(t) {
    var n = this._internalRoot;
    if (n === null)
      throw Error(a(409));
    var r = n.current, u = On();
    K1(r, u, t, n, null, null);
  }, Ps.prototype.unmount = Hh.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var n = t.containerInfo;
      K1(t.current, 2, null, t, null, null), Rs(), n[ol] = null;
    }
  };
  function Ps(t) {
    this._internalRoot = t;
  }
  Ps.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var n = Ue();
      t = { blockedOn: null, target: t, priority: n };
      for (var r = 0; r < Rl.length && n !== 0 && n < Rl[r].priority; r++)
        ;
      Rl.splice(r, 0, t), r === 0 && nx(t);
    }
  };
  var ax = i.version;
  if (ax !== "19.3.1")
    throw Error(a(527, ax, "19.3.1"));
  q.findDOMNode = function(t) {
    var n = t._reactInternals;
    if (n === void 0)
      throw typeof t.render == "function" ? Error(a(188)) : (t = Object.keys(t).join(","), Error(a(268, t)));
    return t = g(n), t = t !== null ? y(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Uk = { bundleType: 0, version: "19.3.1", rendererPackageName: "react-dom", currentDispatcherRef: fe, reconcilerVersion: "19.3.1" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Js.isDisabled && Js.supportsFiber)
      try {
        In = Js.inject(Uk), nn = Js;
      } catch {
      }
  }
  return qu.createRoot = function(t, n) {
    if (!o(t))
      throw Error(a(299));
    var r = false, u = "", f = F0, h = K0, w = P0;
    return n != null && (n.unstable_strictMode === true && (r = true), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (w = n.onRecoverableError)), n = Z1(t, 1, false, null, null, r, u, null, f, h, w, rx), t[ol] = n.current, hh(t), new Hh(n);
  }, qu.hydrateRoot = function(t, n, r) {
    if (!o(t))
      throw Error(a(299));
    var u = false, f = "", h = F0, w = K0, z = P0, I = null;
    return r != null && (r.unstable_strictMode === true && (u = true), r.identifierPrefix !== void 0 && (f = r.identifierPrefix), r.onUncaughtError !== void 0 && (h = r.onUncaughtError), r.onCaughtError !== void 0 && (w = r.onCaughtError), r.onRecoverableError !== void 0 && (z = r.onRecoverableError), r.formState !== void 0 && (I = r.formState)), n = Z1(t, 1, true, n, r ?? null, u, f, I, h, w, z, rx), n.context = F1(null), r = n.current, u = On(), u = He(u), f = vl(u), f.callback = null, bl(r, f, u), r = u, n.current.lanes = r, ue(n, r), _i(n), t[ol] = n.current, hh(t), new Ps(n);
  }, qu.version = "19.3.1", qu;
}
var gx;
function Zk() {
  if (gx)
    return Uh.exports;
  gx = 1;
  function e12() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e12);
      } catch (i) {
        console.error(i);
      }
  }
  return e12(), Uh.exports = Qk(), Uh.exports;
}
var Fk = Zk();
const Kk = qc(Fk);
var L = go();
const Pk = qc(L);
function Qt(e12) {
  if (typeof e12 == "string" || typeof e12 == "number")
    return "" + e12;
  let i = "";
  if (Array.isArray(e12))
    for (let l = 0, a; l < e12.length; l++)
      (a = Qt(e12[l])) !== "" && (i += (i && " ") + a);
  else
    for (let l in e12)
      e12[l] && (i += (i && " ") + l);
  return i;
}
var Jk = { value: () => {
} };
function Vc() {
  for (var e12 = 0, i = arguments.length, l = {}, a; e12 < i; ++e12) {
    if (!(a = arguments[e12] + "") || a in l || /[\s.]/.test(a))
      throw new Error("illegal type: " + a);
    l[a] = [];
  }
  return new mc(l);
}
function mc(e12) {
  this._ = e12;
}
function Wk(e12, i) {
  return e12.trim().split(/^|\s+/).map(function(l) {
    var a = "", o = l.indexOf(".");
    if (o >= 0 && (a = l.slice(o + 1), l = l.slice(0, o)), l && !i.hasOwnProperty(l))
      throw new Error("unknown type: " + l);
    return { type: l, name: a };
  });
}
mc.prototype = Vc.prototype = { constructor: mc, on: function(e12, i) {
  var l = this._, a = Wk(e12 + "", l), o, s = -1, c = a.length;
  if (arguments.length < 2) {
    for (; ++s < c; )
      if ((o = (e12 = a[s]).type) && (o = eN(l[o], e12.name)))
        return o;
    return;
  }
  if (i != null && typeof i != "function")
    throw new Error("invalid callback: " + i);
  for (; ++s < c; )
    if (o = (e12 = a[s]).type)
      l[o] = yx(l[o], e12.name, i);
    else if (i == null)
      for (o in l)
        l[o] = yx(l[o], e12.name, null);
  return this;
}, copy: function() {
  var e12 = {}, i = this._;
  for (var l in i)
    e12[l] = i[l].slice();
  return new mc(e12);
}, call: function(e12, i) {
  if ((o = arguments.length - 2) > 0)
    for (var l = new Array(o), a = 0, o, s; a < o; ++a)
      l[a] = arguments[a + 2];
  if (!this._.hasOwnProperty(e12))
    throw new Error("unknown type: " + e12);
  for (s = this._[e12], a = 0, o = s.length; a < o; ++a)
    s[a].value.apply(i, l);
}, apply: function(e12, i, l) {
  if (!this._.hasOwnProperty(e12))
    throw new Error("unknown type: " + e12);
  for (var a = this._[e12], o = 0, s = a.length; o < s; ++o)
    a[o].value.apply(i, l);
} };
function eN(e12, i) {
  for (var l = 0, a = e12.length, o; l < a; ++l)
    if ((o = e12[l]).name === i)
      return o.value;
}
function yx(e12, i, l) {
  for (var a = 0, o = e12.length; a < o; ++a)
    if (e12[a].name === i) {
      e12[a] = Jk, e12 = e12.slice(0, a).concat(e12.slice(a + 1));
      break;
    }
  return l != null && e12.push({ name: i, value: l }), e12;
}
var zm = "http://www.w3.org/1999/xhtml", xx = { svg: "http://www.w3.org/2000/svg", xhtml: zm, xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/" };
function Yc(e12) {
  var i = e12 += "", l = i.indexOf(":");
  return l >= 0 && (i = e12.slice(0, l)) !== "xmlns" && (e12 = e12.slice(l + 1)), xx.hasOwnProperty(i) ? { space: xx[i], local: e12 } : e12;
}
function tN(e12) {
  return function() {
    var i = this.ownerDocument, l = this.namespaceURI;
    return l === zm && i.documentElement.namespaceURI === zm ? i.createElement(e12) : i.createElementNS(l, e12);
  };
}
function nN(e12) {
  return function() {
    return this.ownerDocument.createElementNS(e12.space, e12.local);
  };
}
function Db(e12) {
  var i = Yc(e12);
  return (i.local ? nN : tN)(i);
}
function iN() {
}
function sp(e12) {
  return e12 == null ? iN : function() {
    return this.querySelector(e12);
  };
}
function lN(e12) {
  typeof e12 != "function" && (e12 = sp(e12));
  for (var i = this._groups, l = i.length, a = new Array(l), o = 0; o < l; ++o)
    for (var s = i[o], c = s.length, d = a[o] = new Array(c), m, g, y = 0; y < c; ++y)
      (m = s[y]) && (g = e12.call(m, m.__data__, y, s)) && ("__data__" in m && (g.__data__ = m.__data__), d[y] = g);
  return new Un(a, this._parents);
}
function rN(e12) {
  return e12 == null ? [] : Array.isArray(e12) ? e12 : Array.from(e12);
}
function aN() {
  return [];
}
function Ob(e12) {
  return e12 == null ? aN : function() {
    return this.querySelectorAll(e12);
  };
}
function uN(e12) {
  return function() {
    return rN(e12.apply(this, arguments));
  };
}
function oN(e12) {
  typeof e12 == "function" ? e12 = uN(e12) : e12 = Ob(e12);
  for (var i = this._groups, l = i.length, a = [], o = [], s = 0; s < l; ++s)
    for (var c = i[s], d = c.length, m, g = 0; g < d; ++g)
      (m = c[g]) && (a.push(e12.call(m, m.__data__, g, c)), o.push(m));
  return new Un(a, o);
}
function Rb(e12) {
  return function() {
    return this.matches(e12);
  };
}
function Lb(e12) {
  return function(i) {
    return i.matches(e12);
  };
}
var sN = Array.prototype.find;
function cN(e12) {
  return function() {
    return sN.call(this.children, e12);
  };
}
function fN() {
  return this.firstElementChild;
}
function dN(e12) {
  return this.select(e12 == null ? fN : cN(typeof e12 == "function" ? e12 : Lb(e12)));
}
var hN = Array.prototype.filter;
function mN() {
  return Array.from(this.children);
}
function pN(e12) {
  return function() {
    return hN.call(this.children, e12);
  };
}
function gN(e12) {
  return this.selectAll(e12 == null ? mN : pN(typeof e12 == "function" ? e12 : Lb(e12)));
}
function yN(e12) {
  typeof e12 != "function" && (e12 = Rb(e12));
  for (var i = this._groups, l = i.length, a = new Array(l), o = 0; o < l; ++o)
    for (var s = i[o], c = s.length, d = a[o] = [], m, g = 0; g < c; ++g)
      (m = s[g]) && e12.call(m, m.__data__, g, s) && d.push(m);
  return new Un(a, this._parents);
}
function Hb(e12) {
  return new Array(e12.length);
}
function xN() {
  return new Un(this._enter || this._groups.map(Hb), this._parents);
}
function Sc(e12, i) {
  this.ownerDocument = e12.ownerDocument, this.namespaceURI = e12.namespaceURI, this._next = null, this._parent = e12, this.__data__ = i;
}
Sc.prototype = { constructor: Sc, appendChild: function(e12) {
  return this._parent.insertBefore(e12, this._next);
}, insertBefore: function(e12, i) {
  return this._parent.insertBefore(e12, i);
}, querySelector: function(e12) {
  return this._parent.querySelector(e12);
}, querySelectorAll: function(e12) {
  return this._parent.querySelectorAll(e12);
} };
function vN(e12) {
  return function() {
    return e12;
  };
}
function bN(e12, i, l, a, o, s) {
  for (var c = 0, d, m = i.length, g = s.length; c < g; ++c)
    (d = i[c]) ? (d.__data__ = s[c], a[c] = d) : l[c] = new Sc(e12, s[c]);
  for (; c < m; ++c)
    (d = i[c]) && (o[c] = d);
}
function wN(e12, i, l, a, o, s, c) {
  var d, m, g = /* @__PURE__ */ new Map(), y = i.length, p = s.length, x = new Array(y), v;
  for (d = 0; d < y; ++d)
    (m = i[d]) && (x[d] = v = c.call(m, m.__data__, d, i) + "", g.has(v) ? o[d] = m : g.set(v, m));
  for (d = 0; d < p; ++d)
    v = c.call(e12, s[d], d, s) + "", (m = g.get(v)) ? (a[d] = m, m.__data__ = s[d], g.delete(v)) : l[d] = new Sc(e12, s[d]);
  for (d = 0; d < y; ++d)
    (m = i[d]) && g.get(x[d]) === m && (o[d] = m);
}
function SN(e12) {
  return e12.__data__;
}
function EN(e12, i) {
  if (!arguments.length)
    return Array.from(this, SN);
  var l = i ? wN : bN, a = this._parents, o = this._groups;
  typeof e12 != "function" && (e12 = vN(e12));
  for (var s = o.length, c = new Array(s), d = new Array(s), m = new Array(s), g = 0; g < s; ++g) {
    var y = a[g], p = o[g], x = p.length, v = CN(e12.call(y, y && y.__data__, g, a)), S = v.length, E = d[g] = new Array(S), N = c[g] = new Array(S), C = m[g] = new Array(x);
    l(y, p, E, N, C, v, i);
    for (var A = 0, k = 0, T, Y; A < S; ++A)
      if (T = E[A]) {
        for (A >= k && (k = A + 1); !(Y = N[k]) && ++k < S; )
          ;
        T._next = Y || null;
      }
  }
  return c = new Un(c, a), c._enter = d, c._exit = m, c;
}
function CN(e12) {
  return typeof e12 == "object" && "length" in e12 ? e12 : Array.from(e12);
}
function kN() {
  return new Un(this._exit || this._groups.map(Hb), this._parents);
}
function NN(e12, i, l) {
  var a = this.enter(), o = this, s = this.exit();
  return typeof e12 == "function" ? (a = e12(a), a && (a = a.selection())) : a = a.append(e12 + ""), i != null && (o = i(o), o && (o = o.selection())), l == null ? s.remove() : l(s), a && o ? a.merge(o).order() : o;
}
function _N(e12) {
  for (var i = e12.selection ? e12.selection() : e12, l = this._groups, a = i._groups, o = l.length, s = a.length, c = Math.min(o, s), d = new Array(o), m = 0; m < c; ++m)
    for (var g = l[m], y = a[m], p = g.length, x = d[m] = new Array(p), v, S = 0; S < p; ++S)
      (v = g[S] || y[S]) && (x[S] = v);
  for (; m < o; ++m)
    d[m] = l[m];
  return new Un(d, this._parents);
}
function zN() {
  for (var e12 = this._groups, i = -1, l = e12.length; ++i < l; )
    for (var a = e12[i], o = a.length - 1, s = a[o], c; --o >= 0; )
      (c = a[o]) && (s && c.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(c, s), s = c);
  return this;
}
function TN(e12) {
  e12 || (e12 = AN);
  function i(p, x) {
    return p && x ? e12(p.__data__, x.__data__) : !p - !x;
  }
  for (var l = this._groups, a = l.length, o = new Array(a), s = 0; s < a; ++s) {
    for (var c = l[s], d = c.length, m = o[s] = new Array(d), g, y = 0; y < d; ++y)
      (g = c[y]) && (m[y] = g);
    m.sort(i);
  }
  return new Un(o, this._parents).order();
}
function AN(e12, i) {
  return e12 < i ? -1 : e12 > i ? 1 : e12 >= i ? 0 : NaN;
}
function MN() {
  var e12 = arguments[0];
  return arguments[0] = this, e12.apply(null, arguments), this;
}
function jN() {
  return Array.from(this);
}
function DN() {
  for (var e12 = this._groups, i = 0, l = e12.length; i < l; ++i)
    for (var a = e12[i], o = 0, s = a.length; o < s; ++o) {
      var c = a[o];
      if (c)
        return c;
    }
  return null;
}
function ON() {
  let e12 = 0;
  for (const i of this)
    ++e12;
  return e12;
}
function RN() {
  return !this.node();
}
function LN(e12) {
  for (var i = this._groups, l = 0, a = i.length; l < a; ++l)
    for (var o = i[l], s = 0, c = o.length, d; s < c; ++s)
      (d = o[s]) && e12.call(d, d.__data__, s, o);
  return this;
}
function HN(e12) {
  return function() {
    this.removeAttribute(e12);
  };
}
function BN(e12) {
  return function() {
    this.removeAttributeNS(e12.space, e12.local);
  };
}
function UN(e12, i) {
  return function() {
    this.setAttribute(e12, i);
  };
}
function IN(e12, i) {
  return function() {
    this.setAttributeNS(e12.space, e12.local, i);
  };
}
function qN(e12, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttribute(e12) : this.setAttribute(e12, l);
  };
}
function VN(e12, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? this.removeAttributeNS(e12.space, e12.local) : this.setAttributeNS(e12.space, e12.local, l);
  };
}
function YN(e12, i) {
  var l = Yc(e12);
  if (arguments.length < 2) {
    var a = this.node();
    return l.local ? a.getAttributeNS(l.space, l.local) : a.getAttribute(l);
  }
  return this.each((i == null ? l.local ? BN : HN : typeof i == "function" ? l.local ? VN : qN : l.local ? IN : UN)(l, i));
}
function Bb(e12) {
  return e12.ownerDocument && e12.ownerDocument.defaultView || e12.document && e12 || e12.defaultView;
}
function XN(e12) {
  return function() {
    this.style.removeProperty(e12);
  };
}
function GN(e12, i, l) {
  return function() {
    this.style.setProperty(e12, i, l);
  };
}
function $N(e12, i, l) {
  return function() {
    var a = i.apply(this, arguments);
    a == null ? this.style.removeProperty(e12) : this.style.setProperty(e12, a, l);
  };
}
function QN(e12, i, l) {
  return arguments.length > 1 ? this.each((i == null ? XN : typeof i == "function" ? $N : GN)(e12, i, l ?? "")) : Ra(this.node(), e12);
}
function Ra(e12, i) {
  return e12.style.getPropertyValue(i) || Bb(e12).getComputedStyle(e12, null).getPropertyValue(i);
}
function ZN(e12) {
  return function() {
    delete this[e12];
  };
}
function FN(e12, i) {
  return function() {
    this[e12] = i;
  };
}
function KN(e12, i) {
  return function() {
    var l = i.apply(this, arguments);
    l == null ? delete this[e12] : this[e12] = l;
  };
}
function PN(e12, i) {
  return arguments.length > 1 ? this.each((i == null ? ZN : typeof i == "function" ? KN : FN)(e12, i)) : this.node()[e12];
}
function Ub(e12) {
  return e12.trim().split(/^|\s+/);
}
function cp(e12) {
  return e12.classList || new Ib(e12);
}
function Ib(e12) {
  this._node = e12, this._names = Ub(e12.getAttribute("class") || "");
}
Ib.prototype = { add: function(e12) {
  var i = this._names.indexOf(e12);
  i < 0 && (this._names.push(e12), this._node.setAttribute("class", this._names.join(" ")));
}, remove: function(e12) {
  var i = this._names.indexOf(e12);
  i >= 0 && (this._names.splice(i, 1), this._node.setAttribute("class", this._names.join(" ")));
}, contains: function(e12) {
  return this._names.indexOf(e12) >= 0;
} };
function qb(e12, i) {
  for (var l = cp(e12), a = -1, o = i.length; ++a < o; )
    l.add(i[a]);
}
function Vb(e12, i) {
  for (var l = cp(e12), a = -1, o = i.length; ++a < o; )
    l.remove(i[a]);
}
function JN(e12) {
  return function() {
    qb(this, e12);
  };
}
function WN(e12) {
  return function() {
    Vb(this, e12);
  };
}
function e_(e12, i) {
  return function() {
    (i.apply(this, arguments) ? qb : Vb)(this, e12);
  };
}
function t_(e12, i) {
  var l = Ub(e12 + "");
  if (arguments.length < 2) {
    for (var a = cp(this.node()), o = -1, s = l.length; ++o < s; )
      if (!a.contains(l[o]))
        return false;
    return true;
  }
  return this.each((typeof i == "function" ? e_ : i ? JN : WN)(l, i));
}
function n_() {
  this.textContent = "";
}
function i_(e12) {
  return function() {
    this.textContent = e12;
  };
}
function l_(e12) {
  return function() {
    var i = e12.apply(this, arguments);
    this.textContent = i ?? "";
  };
}
function r_(e12) {
  return arguments.length ? this.each(e12 == null ? n_ : (typeof e12 == "function" ? l_ : i_)(e12)) : this.node().textContent;
}
function a_() {
  this.innerHTML = "";
}
function u_(e12) {
  return function() {
    this.innerHTML = e12;
  };
}
function o_(e12) {
  return function() {
    var i = e12.apply(this, arguments);
    this.innerHTML = i ?? "";
  };
}
function s_(e12) {
  return arguments.length ? this.each(e12 == null ? a_ : (typeof e12 == "function" ? o_ : u_)(e12)) : this.node().innerHTML;
}
function c_() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function f_() {
  return this.each(c_);
}
function d_() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function h_() {
  return this.each(d_);
}
function m_(e12) {
  var i = typeof e12 == "function" ? e12 : Db(e12);
  return this.select(function() {
    return this.appendChild(i.apply(this, arguments));
  });
}
function p_() {
  return null;
}
function g_(e12, i) {
  var l = typeof e12 == "function" ? e12 : Db(e12), a = i == null ? p_ : typeof i == "function" ? i : sp(i);
  return this.select(function() {
    return this.insertBefore(l.apply(this, arguments), a.apply(this, arguments) || null);
  });
}
function y_() {
  var e12 = this.parentNode;
  e12 && e12.removeChild(this);
}
function x_() {
  return this.each(y_);
}
function v_() {
  var e12 = this.cloneNode(false), i = this.parentNode;
  return i ? i.insertBefore(e12, this.nextSibling) : e12;
}
function b_() {
  var e12 = this.cloneNode(true), i = this.parentNode;
  return i ? i.insertBefore(e12, this.nextSibling) : e12;
}
function w_(e12) {
  return this.select(e12 ? b_ : v_);
}
function S_(e12) {
  return arguments.length ? this.property("__data__", e12) : this.node().__data__;
}
function E_(e12) {
  return function(i) {
    e12.call(this, i, this.__data__);
  };
}
function C_(e12) {
  return e12.trim().split(/^|\s+/).map(function(i) {
    var l = "", a = i.indexOf(".");
    return a >= 0 && (l = i.slice(a + 1), i = i.slice(0, a)), { type: i, name: l };
  });
}
function k_(e12) {
  return function() {
    var i = this.__on;
    if (i) {
      for (var l = 0, a = -1, o = i.length, s; l < o; ++l)
        s = i[l], (!e12.type || s.type === e12.type) && s.name === e12.name ? this.removeEventListener(s.type, s.listener, s.options) : i[++a] = s;
      ++a ? i.length = a : delete this.__on;
    }
  };
}
function N_(e12, i, l) {
  return function() {
    var a = this.__on, o, s = E_(i);
    if (a) {
      for (var c = 0, d = a.length; c < d; ++c)
        if ((o = a[c]).type === e12.type && o.name === e12.name) {
          this.removeEventListener(o.type, o.listener, o.options), this.addEventListener(o.type, o.listener = s, o.options = l), o.value = i;
          return;
        }
    }
    this.addEventListener(e12.type, s, l), o = { type: e12.type, name: e12.name, value: i, listener: s, options: l }, a ? a.push(o) : this.__on = [o];
  };
}
function __(e12, i, l) {
  var a = C_(e12 + ""), o, s = a.length, c;
  if (arguments.length < 2) {
    var d = this.node().__on;
    if (d) {
      for (var m = 0, g = d.length, y; m < g; ++m)
        for (o = 0, y = d[m]; o < s; ++o)
          if ((c = a[o]).type === y.type && c.name === y.name)
            return y.value;
    }
    return;
  }
  for (d = i ? N_ : k_, o = 0; o < s; ++o)
    this.each(d(a[o], i, l));
  return this;
}
function Yb(e12, i, l) {
  var a = Bb(e12), o = a.CustomEvent;
  typeof o == "function" ? o = new o(i, l) : (o = a.document.createEvent("Event"), l ? (o.initEvent(i, l.bubbles, l.cancelable), o.detail = l.detail) : o.initEvent(i, false, false)), e12.dispatchEvent(o);
}
function z_(e12, i) {
  return function() {
    return Yb(this, e12, i);
  };
}
function T_(e12, i) {
  return function() {
    return Yb(this, e12, i.apply(this, arguments));
  };
}
function A_(e12, i) {
  return this.each((typeof i == "function" ? T_ : z_)(e12, i));
}
function* M_() {
  for (var e12 = this._groups, i = 0, l = e12.length; i < l; ++i)
    for (var a = e12[i], o = 0, s = a.length, c; o < s; ++o)
      (c = a[o]) && (yield c);
}
var Xb = [null];
function Un(e12, i) {
  this._groups = e12, this._parents = i;
}
function yo() {
  return new Un([[document.documentElement]], Xb);
}
function j_() {
  return this;
}
Un.prototype = yo.prototype = { constructor: Un, select: lN, selectAll: oN, selectChild: dN, selectChildren: gN, filter: yN, data: EN, enter: xN, exit: kN, join: NN, merge: _N, selection: j_, order: zN, sort: TN, call: MN, nodes: jN, node: DN, size: ON, empty: RN, each: LN, attr: YN, style: QN, property: PN, classed: t_, text: r_, html: s_, raise: f_, lower: h_, append: m_, insert: g_, remove: x_, clone: w_, datum: S_, on: __, dispatch: A_, [Symbol.iterator]: M_ };
function Bn(e12) {
  return typeof e12 == "string" ? new Un([[document.querySelector(e12)]], [document.documentElement]) : new Un([[e12]], Xb);
}
var D_ = 0;
function vx() {
  this._ = "@" + (++D_).toString(36);
}
vx.prototype = { constructor: vx, get: function(e12) {
  for (var i = this._; !(i in e12); )
    if (!(e12 = e12.parentNode))
      return;
  return e12[i];
}, set: function(e12, i) {
  return e12[this._] = i;
}, remove: function(e12) {
  return this._ in e12 && delete e12[this._];
}, toString: function() {
  return this._;
} };
function O_(e12) {
  let i;
  for (; i = e12.sourceEvent; )
    e12 = i;
  return e12;
}
function ui(e12, i) {
  if (e12 = O_(e12), i === void 0 && (i = e12.currentTarget), i) {
    var l = i.ownerSVGElement || i;
    if (l.createSVGPoint) {
      var a = l.createSVGPoint();
      return a.x = e12.clientX, a.y = e12.clientY, a = a.matrixTransform(i.getScreenCTM().inverse()), [a.x, a.y];
    }
    if (i.getBoundingClientRect) {
      var o = i.getBoundingClientRect();
      return [e12.clientX - o.left - i.clientLeft, e12.clientY - o.top - i.clientTop];
    }
  }
  return [e12.pageX, e12.pageY];
}
const R_ = { passive: false }, ro = { capture: true, passive: false };
function Xh(e12) {
  e12.stopImmediatePropagation();
}
function Aa(e12) {
  e12.preventDefault(), e12.stopImmediatePropagation();
}
function Gb(e12) {
  var i = e12.document.documentElement, l = Bn(e12).on("dragstart.drag", Aa, ro);
  "onselectstart" in i ? l.on("selectstart.drag", Aa, ro) : (i.__noselect = i.style.MozUserSelect, i.style.MozUserSelect = "none");
}
function $b(e12, i) {
  var l = e12.document.documentElement, a = Bn(e12).on("dragstart.drag", null);
  i && (a.on("click.drag", Aa, ro), setTimeout(function() {
    a.on("click.drag", null);
  }, 0)), "onselectstart" in l ? a.on("selectstart.drag", null) : (l.style.MozUserSelect = l.__noselect, delete l.__noselect);
}
var Ws = (e12) => () => e12;
function Tm(e12, { sourceEvent: i, subject: l, target: a, identifier: o, active: s, x: c, y: d, dx: m, dy: g, dispatch: y }) {
  Object.defineProperties(this, { type: { value: e12, enumerable: true, configurable: true }, sourceEvent: { value: i, enumerable: true, configurable: true }, subject: { value: l, enumerable: true, configurable: true }, target: { value: a, enumerable: true, configurable: true }, identifier: { value: o, enumerable: true, configurable: true }, active: { value: s, enumerable: true, configurable: true }, x: { value: c, enumerable: true, configurable: true }, y: { value: d, enumerable: true, configurable: true }, dx: { value: m, enumerable: true, configurable: true }, dy: { value: g, enumerable: true, configurable: true }, _: { value: y } });
}
Tm.prototype.on = function() {
  var e12 = this._.on.apply(this._, arguments);
  return e12 === this._ ? this : e12;
};
function L_(e12) {
  return !e12.ctrlKey && !e12.button;
}
function H_() {
  return this.parentNode;
}
function B_(e12, i) {
  return i ?? { x: e12.x, y: e12.y };
}
function U_() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Qb() {
  var e12 = L_, i = H_, l = B_, a = U_, o = {}, s = Vc("start", "drag", "end"), c = 0, d, m, g, y, p = 0;
  function x(T) {
    T.on("mousedown.drag", v).filter(a).on("touchstart.drag", N).on("touchmove.drag", C, R_).on("touchend.drag touchcancel.drag", A).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function v(T, Y) {
    if (!(y || !e12.call(this, T, Y))) {
      var M = k(this, i.call(this, T, Y), T, Y, "mouse");
      M && (Bn(T.view).on("mousemove.drag", S, ro).on("mouseup.drag", E, ro), Gb(T.view), Xh(T), g = false, d = T.clientX, m = T.clientY, M("start", T));
    }
  }
  function S(T) {
    if (Aa(T), !g) {
      var Y = T.clientX - d, M = T.clientY - m;
      g = Y * Y + M * M > p;
    }
    o.mouse("drag", T);
  }
  function E(T) {
    Bn(T.view).on("mousemove.drag mouseup.drag", null), $b(T.view, g), Aa(T), o.mouse("end", T);
  }
  function N(T, Y) {
    if (e12.call(this, T, Y)) {
      var M = T.changedTouches, B = i.call(this, T, Y), G = M.length, J, U;
      for (J = 0; J < G; ++J)
        (U = k(this, B, T, Y, M[J].identifier, M[J])) && (Xh(T), U("start", T, M[J]));
    }
  }
  function C(T) {
    var Y = T.changedTouches, M = Y.length, B, G;
    for (B = 0; B < M; ++B)
      (G = o[Y[B].identifier]) && (Aa(T), G("drag", T, Y[B]));
  }
  function A(T) {
    var Y = T.changedTouches, M = Y.length, B, G;
    for (y && clearTimeout(y), y = setTimeout(function() {
      y = null;
    }, 500), B = 0; B < M; ++B)
      (G = o[Y[B].identifier]) && (Xh(T), G("end", T, Y[B]));
  }
  function k(T, Y, M, B, G, J) {
    var U = s.copy(), X = ui(J || M, Y), ie, re, j;
    if ((j = l.call(T, new Tm("beforestart", { sourceEvent: M, target: x, identifier: G, active: c, x: X[0], y: X[1], dx: 0, dy: 0, dispatch: U }), B)) != null)
      return ie = j.x - X[0] || 0, re = j.y - X[1] || 0, function D(H, V, $) {
        var F = X, _;
        switch (H) {
          case "start":
            o[G] = D, _ = c++;
            break;
          case "end":
            delete o[G], --c;
          case "drag":
            X = ui($ || V, Y), _ = c;
            break;
        }
        U.call(H, T, new Tm(H, { sourceEvent: V, subject: j, target: x, identifier: G, active: _, x: X[0] + ie, y: X[1] + re, dx: X[0] - F[0], dy: X[1] - F[1], dispatch: U }), B);
      };
  }
  return x.filter = function(T) {
    return arguments.length ? (e12 = typeof T == "function" ? T : Ws(!!T), x) : e12;
  }, x.container = function(T) {
    return arguments.length ? (i = typeof T == "function" ? T : Ws(T), x) : i;
  }, x.subject = function(T) {
    return arguments.length ? (l = typeof T == "function" ? T : Ws(T), x) : l;
  }, x.touchable = function(T) {
    return arguments.length ? (a = typeof T == "function" ? T : Ws(!!T), x) : a;
  }, x.on = function() {
    var T = s.on.apply(s, arguments);
    return T === s ? x : T;
  }, x.clickDistance = function(T) {
    return arguments.length ? (p = (T = +T) * T, x) : Math.sqrt(p);
  }, x;
}
function Ga(e12, i, l) {
  e12.prototype = i.prototype = l, l.constructor = e12;
}
function xo(e12, i) {
  var l = Object.create(e12.prototype);
  for (var a in i)
    l[a] = i[a];
  return l;
}
function Gl() {
}
var Tr = 0.7, La = 1 / Tr, Ma = "\\s*([+-]?\\d+)\\s*", ao = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ai = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", I_ = /^#([0-9a-f]{3,8})$/, q_ = new RegExp(`^rgb\\(${Ma},${Ma},${Ma}\\)$`), V_ = new RegExp(`^rgb\\(${Ai},${Ai},${Ai}\\)$`), Y_ = new RegExp(`^rgba\\(${Ma},${Ma},${Ma},${ao}\\)$`), X_ = new RegExp(`^rgba\\(${Ai},${Ai},${Ai},${ao}\\)$`), G_ = new RegExp(`^hsl\\(${ao},${Ai},${Ai}\\)$`), $_ = new RegExp(`^hsla\\(${ao},${Ai},${Ai},${ao}\\)$`), bx = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 };
Ga(Gl, Ar, { copy(e12) {
  return Object.assign(new this.constructor(), this, e12);
}, displayable() {
  return this.rgb().displayable();
}, hex: wx, formatHex: wx, formatHex8: Q_, formatHsl: Z_, formatRgb: Sx, toString: Sx });
function wx() {
  return this.rgb().formatHex();
}
function Q_() {
  return this.rgb().formatHex8();
}
function Z_() {
  return Zb(this).formatHsl();
}
function Sx() {
  return this.rgb().formatRgb();
}
function Ar(e12) {
  var i, l;
  return e12 = (e12 + "").trim().toLowerCase(), (i = I_.exec(e12)) ? (l = i[1].length, i = parseInt(i[1], 16), l === 6 ? Ex(i) : l === 3 ? new tn(i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, (i & 15) << 4 | i & 15, 1) : l === 8 ? ec(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, (i & 255) / 255) : l === 4 ? ec(i >> 12 & 15 | i >> 8 & 240, i >> 8 & 15 | i >> 4 & 240, i >> 4 & 15 | i & 240, ((i & 15) << 4 | i & 15) / 255) : null) : (i = q_.exec(e12)) ? new tn(i[1], i[2], i[3], 1) : (i = V_.exec(e12)) ? new tn(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, 1) : (i = Y_.exec(e12)) ? ec(i[1], i[2], i[3], i[4]) : (i = X_.exec(e12)) ? ec(i[1] * 255 / 100, i[2] * 255 / 100, i[3] * 255 / 100, i[4]) : (i = G_.exec(e12)) ? Nx(i[1], i[2] / 100, i[3] / 100, 1) : (i = $_.exec(e12)) ? Nx(i[1], i[2] / 100, i[3] / 100, i[4]) : bx.hasOwnProperty(e12) ? Ex(bx[e12]) : e12 === "transparent" ? new tn(NaN, NaN, NaN, 0) : null;
}
function Ex(e12) {
  return new tn(e12 >> 16 & 255, e12 >> 8 & 255, e12 & 255, 1);
}
function ec(e12, i, l, a) {
  return a <= 0 && (e12 = i = l = NaN), new tn(e12, i, l, a);
}
function fp(e12) {
  return e12 instanceof Gl || (e12 = Ar(e12)), e12 ? (e12 = e12.rgb(), new tn(e12.r, e12.g, e12.b, e12.opacity)) : new tn();
}
function Am(e12, i, l, a) {
  return arguments.length === 1 ? fp(e12) : new tn(e12, i, l, a ?? 1);
}
function tn(e12, i, l, a) {
  this.r = +e12, this.g = +i, this.b = +l, this.opacity = +a;
}
Ga(tn, Am, xo(Gl, { brighter(e12) {
  return e12 = e12 == null ? La : Math.pow(La, e12), new tn(this.r * e12, this.g * e12, this.b * e12, this.opacity);
}, darker(e12) {
  return e12 = e12 == null ? Tr : Math.pow(Tr, e12), new tn(this.r * e12, this.g * e12, this.b * e12, this.opacity);
}, rgb() {
  return this;
}, clamp() {
  return new tn(Er(this.r), Er(this.g), Er(this.b), Ec(this.opacity));
}, displayable() {
  return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
}, hex: Cx, formatHex: Cx, formatHex8: F_, formatRgb: kx, toString: kx }));
function Cx() {
  return `#${Sr(this.r)}${Sr(this.g)}${Sr(this.b)}`;
}
function F_() {
  return `#${Sr(this.r)}${Sr(this.g)}${Sr(this.b)}${Sr((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function kx() {
  const e12 = Ec(this.opacity);
  return `${e12 === 1 ? "rgb(" : "rgba("}${Er(this.r)}, ${Er(this.g)}, ${Er(this.b)}${e12 === 1 ? ")" : `, ${e12})`}`;
}
function Ec(e12) {
  return isNaN(e12) ? 1 : Math.max(0, Math.min(1, e12));
}
function Er(e12) {
  return Math.max(0, Math.min(255, Math.round(e12) || 0));
}
function Sr(e12) {
  return e12 = Er(e12), (e12 < 16 ? "0" : "") + e12.toString(16);
}
function Nx(e12, i, l, a) {
  return a <= 0 ? e12 = i = l = NaN : l <= 0 || l >= 1 ? e12 = i = NaN : i <= 0 && (e12 = NaN), new oi(e12, i, l, a);
}
function Zb(e12) {
  if (e12 instanceof oi)
    return new oi(e12.h, e12.s, e12.l, e12.opacity);
  if (e12 instanceof Gl || (e12 = Ar(e12)), !e12)
    return new oi();
  if (e12 instanceof oi)
    return e12;
  e12 = e12.rgb();
  var i = e12.r / 255, l = e12.g / 255, a = e12.b / 255, o = Math.min(i, l, a), s = Math.max(i, l, a), c = NaN, d = s - o, m = (s + o) / 2;
  return d ? (i === s ? c = (l - a) / d + (l < a) * 6 : l === s ? c = (a - i) / d + 2 : c = (i - l) / d + 4, d /= m < 0.5 ? s + o : 2 - s - o, c *= 60) : d = m > 0 && m < 1 ? 0 : c, new oi(c, d, m, e12.opacity);
}
function K_(e12, i, l, a) {
  return arguments.length === 1 ? Zb(e12) : new oi(e12, i, l, a ?? 1);
}
function oi(e12, i, l, a) {
  this.h = +e12, this.s = +i, this.l = +l, this.opacity = +a;
}
Ga(oi, K_, xo(Gl, { brighter(e12) {
  return e12 = e12 == null ? La : Math.pow(La, e12), new oi(this.h, this.s, this.l * e12, this.opacity);
}, darker(e12) {
  return e12 = e12 == null ? Tr : Math.pow(Tr, e12), new oi(this.h, this.s, this.l * e12, this.opacity);
}, rgb() {
  var e12 = this.h % 360 + (this.h < 0) * 360, i = isNaN(e12) || isNaN(this.s) ? 0 : this.s, l = this.l, a = l + (l < 0.5 ? l : 1 - l) * i, o = 2 * l - a;
  return new tn(Gh(e12 >= 240 ? e12 - 240 : e12 + 120, o, a), Gh(e12, o, a), Gh(e12 < 120 ? e12 + 240 : e12 - 120, o, a), this.opacity);
}, clamp() {
  return new oi(_x(this.h), tc(this.s), tc(this.l), Ec(this.opacity));
}, displayable() {
  return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
}, formatHsl() {
  const e12 = Ec(this.opacity);
  return `${e12 === 1 ? "hsl(" : "hsla("}${_x(this.h)}, ${tc(this.s) * 100}%, ${tc(this.l) * 100}%${e12 === 1 ? ")" : `, ${e12})`}`;
} }));
function _x(e12) {
  return e12 = (e12 || 0) % 360, e12 < 0 ? e12 + 360 : e12;
}
function tc(e12) {
  return Math.max(0, Math.min(1, e12 || 0));
}
function Gh(e12, i, l) {
  return (e12 < 60 ? i + (l - i) * e12 / 60 : e12 < 180 ? l : e12 < 240 ? i + (l - i) * (240 - e12) / 60 : i) * 255;
}
const Fb = Math.PI / 180, Kb = 180 / Math.PI, Cc = 18, Pb = 0.96422, Jb = 1, Wb = 0.82521, ew = 4 / 29, ja = 6 / 29, tw = 3 * ja * ja, P_ = ja * ja * ja;
function nw(e12) {
  if (e12 instanceof Mi)
    return new Mi(e12.l, e12.a, e12.b, e12.opacity);
  if (e12 instanceof el)
    return iw(e12);
  e12 instanceof tn || (e12 = fp(e12));
  var i = Fh(e12.r), l = Fh(e12.g), a = Fh(e12.b), o = $h((0.2225045 * i + 0.7168786 * l + 0.0606169 * a) / Jb), s, c;
  return i === l && l === a ? s = c = o : (s = $h((0.4360747 * i + 0.3850649 * l + 0.1430804 * a) / Pb), c = $h((0.0139322 * i + 0.0971045 * l + 0.7141733 * a) / Wb)), new Mi(116 * o - 16, 500 * (s - o), 200 * (o - c), e12.opacity);
}
function J_(e12, i, l, a) {
  return arguments.length === 1 ? nw(e12) : new Mi(e12, i, l, a ?? 1);
}
function Mi(e12, i, l, a) {
  this.l = +e12, this.a = +i, this.b = +l, this.opacity = +a;
}
Ga(Mi, J_, xo(Gl, { brighter(e12) {
  return new Mi(this.l + Cc * (e12 ?? 1), this.a, this.b, this.opacity);
}, darker(e12) {
  return new Mi(this.l - Cc * (e12 ?? 1), this.a, this.b, this.opacity);
}, rgb() {
  var e12 = (this.l + 16) / 116, i = isNaN(this.a) ? e12 : e12 + this.a / 500, l = isNaN(this.b) ? e12 : e12 - this.b / 200;
  return i = Pb * Qh(i), e12 = Jb * Qh(e12), l = Wb * Qh(l), new tn(Zh(3.1338561 * i - 1.6168667 * e12 - 0.4906146 * l), Zh(-0.9787684 * i + 1.9161415 * e12 + 0.033454 * l), Zh(0.0719453 * i - 0.2289914 * e12 + 1.4052427 * l), this.opacity);
} }));
function $h(e12) {
  return e12 > P_ ? Math.pow(e12, 1 / 3) : e12 / tw + ew;
}
function Qh(e12) {
  return e12 > ja ? e12 * e12 * e12 : tw * (e12 - ew);
}
function Zh(e12) {
  return 255 * (e12 <= 31308e-7 ? 12.92 * e12 : 1.055 * Math.pow(e12, 1 / 2.4) - 0.055);
}
function Fh(e12) {
  return (e12 /= 255) <= 0.04045 ? e12 / 12.92 : Math.pow((e12 + 0.055) / 1.055, 2.4);
}
function W_(e12) {
  if (e12 instanceof el)
    return new el(e12.h, e12.c, e12.l, e12.opacity);
  if (e12 instanceof Mi || (e12 = nw(e12)), e12.a === 0 && e12.b === 0)
    return new el(NaN, 0 < e12.l && e12.l < 100 ? 0 : NaN, e12.l, e12.opacity);
  var i = Math.atan2(e12.b, e12.a) * Kb;
  return new el(i < 0 ? i + 360 : i, Math.sqrt(e12.a * e12.a + e12.b * e12.b), e12.l, e12.opacity);
}
function ez(e12, i, l, a) {
  return arguments.length === 1 ? W_(e12) : new el(e12, i, l, a ?? 1);
}
function el(e12, i, l, a) {
  this.h = +e12, this.c = +i, this.l = +l, this.opacity = +a;
}
function iw(e12) {
  if (isNaN(e12.h))
    return new Mi(e12.l, 0, 0, e12.opacity);
  var i = e12.h * Fb;
  return new Mi(e12.l, Math.cos(i) * e12.c, Math.sin(i) * e12.c, e12.opacity);
}
Ga(el, ez, xo(Gl, { brighter(e12) {
  return new el(this.h, this.c, this.l + Cc * (e12 ?? 1), this.opacity);
}, darker(e12) {
  return new el(this.h, this.c, this.l - Cc * (e12 ?? 1), this.opacity);
}, rgb() {
  return iw(this).rgb();
} }));
var lw = -0.14861, dp = 1.78277, hp = -0.29227, Xc = -0.90649, uo = 1.97294, zx = uo * Xc, Tx = uo * dp, Ax = dp * hp - Xc * lw;
function tz(e12) {
  if (e12 instanceof Cr)
    return new Cr(e12.h, e12.s, e12.l, e12.opacity);
  e12 instanceof tn || (e12 = fp(e12));
  var i = e12.r / 255, l = e12.g / 255, a = e12.b / 255, o = (Ax * a + zx * i - Tx * l) / (Ax + zx - Tx), s = a - o, c = (uo * (l - o) - hp * s) / Xc, d = Math.sqrt(c * c + s * s) / (uo * o * (1 - o)), m = d ? Math.atan2(c, s) * Kb - 120 : NaN;
  return new Cr(m < 0 ? m + 360 : m, d, o, e12.opacity);
}
function Mm(e12, i, l, a) {
  return arguments.length === 1 ? tz(e12) : new Cr(e12, i, l, a ?? 1);
}
function Cr(e12, i, l, a) {
  this.h = +e12, this.s = +i, this.l = +l, this.opacity = +a;
}
Ga(Cr, Mm, xo(Gl, { brighter(e12) {
  return e12 = e12 == null ? La : Math.pow(La, e12), new Cr(this.h, this.s, this.l * e12, this.opacity);
}, darker(e12) {
  return e12 = e12 == null ? Tr : Math.pow(Tr, e12), new Cr(this.h, this.s, this.l * e12, this.opacity);
}, rgb() {
  var e12 = isNaN(this.h) ? 0 : (this.h + 120) * Fb, i = +this.l, l = isNaN(this.s) ? 0 : this.s * i * (1 - i), a = Math.cos(e12), o = Math.sin(e12);
  return new tn(255 * (i + l * (lw * a + dp * o)), 255 * (i + l * (hp * a + Xc * o)), 255 * (i + l * (uo * a)), this.opacity);
} }));
var Gc = (e12) => () => e12;
function rw(e12, i) {
  return function(l) {
    return e12 + l * i;
  };
}
function nz(e12, i, l) {
  return e12 = Math.pow(e12, l), i = Math.pow(i, l) - e12, l = 1 / l, function(a) {
    return Math.pow(e12 + a * i, l);
  };
}
function iz(e12, i) {
  var l = i - e12;
  return l ? rw(e12, l > 180 || l < -180 ? l - 360 * Math.round(l / 360) : l) : Gc(isNaN(e12) ? i : e12);
}
function lz(e12) {
  return (e12 = +e12) == 1 ? Da : function(i, l) {
    return l - i ? nz(i, l, e12) : Gc(isNaN(i) ? l : i);
  };
}
function Da(e12, i) {
  var l = i - e12;
  return l ? rw(e12, l) : Gc(isNaN(e12) ? i : e12);
}
var kc = (function e(i) {
  var l = lz(i);
  function a(o, s) {
    var c = l((o = Am(o)).r, (s = Am(s)).r), d = l(o.g, s.g), m = l(o.b, s.b), g = Da(o.opacity, s.opacity);
    return function(y) {
      return o.r = c(y), o.g = d(y), o.b = m(y), o.opacity = g(y), o + "";
    };
  }
  return a.gamma = e, a;
})(1);
function rz(e12, i) {
  i || (i = []);
  var l = e12 ? Math.min(i.length, e12.length) : 0, a = i.slice(), o;
  return function(s) {
    for (o = 0; o < l; ++o)
      a[o] = e12[o] * (1 - s) + i[o] * s;
    return a;
  };
}
function az(e12) {
  return ArrayBuffer.isView(e12) && !(e12 instanceof DataView);
}
function uz(e12, i) {
  var l = i ? i.length : 0, a = e12 ? Math.min(l, e12.length) : 0, o = new Array(a), s = new Array(l), c;
  for (c = 0; c < a; ++c)
    o[c] = Pu(e12[c], i[c]);
  for (; c < l; ++c)
    s[c] = i[c];
  return function(d) {
    for (c = 0; c < a; ++c)
      s[c] = o[c](d);
    return s;
  };
}
function oz(e12, i) {
  var l = /* @__PURE__ */ new Date();
  return e12 = +e12, i = +i, function(a) {
    return l.setTime(e12 * (1 - a) + i * a), l;
  };
}
function Ti(e12, i) {
  return e12 = +e12, i = +i, function(l) {
    return e12 * (1 - l) + i * l;
  };
}
function sz(e12, i) {
  var l = {}, a = {}, o;
  (e12 === null || typeof e12 != "object") && (e12 = {}), (i === null || typeof i != "object") && (i = {});
  for (o in i)
    o in e12 ? l[o] = Pu(e12[o], i[o]) : a[o] = i[o];
  return function(s) {
    for (o in l)
      a[o] = l[o](s);
    return a;
  };
}
var jm = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Kh = new RegExp(jm.source, "g");
function cz(e12) {
  return function() {
    return e12;
  };
}
function fz(e12) {
  return function(i) {
    return e12(i) + "";
  };
}
function aw(e12, i) {
  var l = jm.lastIndex = Kh.lastIndex = 0, a, o, s, c = -1, d = [], m = [];
  for (e12 = e12 + "", i = i + ""; (a = jm.exec(e12)) && (o = Kh.exec(i)); )
    (s = o.index) > l && (s = i.slice(l, s), d[c] ? d[c] += s : d[++c] = s), (a = a[0]) === (o = o[0]) ? d[c] ? d[c] += o : d[++c] = o : (d[++c] = null, m.push({ i: c, x: Ti(a, o) })), l = Kh.lastIndex;
  return l < i.length && (s = i.slice(l), d[c] ? d[c] += s : d[++c] = s), d.length < 2 ? m[0] ? fz(m[0].x) : cz(i) : (i = m.length, function(g) {
    for (var y = 0, p; y < i; ++y)
      d[(p = m[y]).i] = p.x(g);
    return d.join("");
  });
}
function Pu(e12, i) {
  var l = typeof i, a;
  return i == null || l === "boolean" ? Gc(i) : (l === "number" ? Ti : l === "string" ? (a = Ar(i)) ? (i = a, kc) : aw : i instanceof Ar ? kc : i instanceof Date ? oz : az(i) ? rz : Array.isArray(i) ? uz : typeof i.valueOf != "function" && typeof i.toString != "function" || isNaN(i) ? sz : Ti)(e12, i);
}
var Mx = 180 / Math.PI, Dm = { translateX: 0, translateY: 0, rotate: 0, skewX: 0, scaleX: 1, scaleY: 1 };
function uw(e12, i, l, a, o, s) {
  var c, d, m;
  return (c = Math.sqrt(e12 * e12 + i * i)) && (e12 /= c, i /= c), (m = e12 * l + i * a) && (l -= e12 * m, a -= i * m), (d = Math.sqrt(l * l + a * a)) && (l /= d, a /= d, m /= d), e12 * a < i * l && (e12 = -e12, i = -i, m = -m, c = -c), { translateX: o, translateY: s, rotate: Math.atan2(i, e12) * Mx, skewX: Math.atan(m) * Mx, scaleX: c, scaleY: d };
}
var nc;
function dz(e12) {
  const i = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e12 + "");
  return i.isIdentity ? Dm : uw(i.a, i.b, i.c, i.d, i.e, i.f);
}
function hz(e12) {
  return e12 == null || (nc || (nc = document.createElementNS("http://www.w3.org/2000/svg", "g")), nc.setAttribute("transform", e12), !(e12 = nc.transform.baseVal.consolidate())) ? Dm : (e12 = e12.matrix, uw(e12.a, e12.b, e12.c, e12.d, e12.e, e12.f));
}
function ow(e12, i, l, a) {
  function o(g) {
    return g.length ? g.pop() + " " : "";
  }
  function s(g, y, p, x, v, S) {
    if (g !== p || y !== x) {
      var E = v.push("translate(", null, i, null, l);
      S.push({ i: E - 4, x: Ti(g, p) }, { i: E - 2, x: Ti(y, x) });
    } else
      (p || x) && v.push("translate(" + p + i + x + l);
  }
  function c(g, y, p, x) {
    g !== y ? (g - y > 180 ? y += 360 : y - g > 180 && (g += 360), x.push({ i: p.push(o(p) + "rotate(", null, a) - 2, x: Ti(g, y) })) : y && p.push(o(p) + "rotate(" + y + a);
  }
  function d(g, y, p, x) {
    g !== y ? x.push({ i: p.push(o(p) + "skewX(", null, a) - 2, x: Ti(g, y) }) : y && p.push(o(p) + "skewX(" + y + a);
  }
  function m(g, y, p, x, v, S) {
    if (g !== p || y !== x) {
      var E = v.push(o(v) + "scale(", null, ",", null, ")");
      S.push({ i: E - 4, x: Ti(g, p) }, { i: E - 2, x: Ti(y, x) });
    } else
      (p !== 1 || x !== 1) && v.push(o(v) + "scale(" + p + "," + x + ")");
  }
  return function(g, y) {
    var p = [], x = [];
    return g = e12(g), y = e12(y), s(g.translateX, g.translateY, y.translateX, y.translateY, p, x), c(g.rotate, y.rotate, p, x), d(g.skewX, y.skewX, p, x), m(g.scaleX, g.scaleY, y.scaleX, y.scaleY, p, x), g = y = null, function(v) {
      for (var S = -1, E = x.length, N; ++S < E; )
        p[(N = x[S]).i] = N.x(v);
      return p.join("");
    };
  };
}
var mz = ow(dz, "px, ", "px)", "deg)"), pz = ow(hz, ", ", ")", ")"), gz = 1e-12;
function jx(e12) {
  return ((e12 = Math.exp(e12)) + 1 / e12) / 2;
}
function yz(e12) {
  return ((e12 = Math.exp(e12)) - 1 / e12) / 2;
}
function xz(e12) {
  return ((e12 = Math.exp(2 * e12)) - 1) / (e12 + 1);
}
var pc = (function e2(i, l, a) {
  function o(s, c) {
    var d = s[0], m = s[1], g = s[2], y = c[0], p = c[1], x = c[2], v = y - d, S = p - m, E = v * v + S * S, N, C;
    if (E < gz)
      C = Math.log(x / g) / i, N = function(B) {
        return [d + B * v, m + B * S, g * Math.exp(i * B * C)];
      };
    else {
      var A = Math.sqrt(E), k = (x * x - g * g + a * E) / (2 * g * l * A), T = (x * x - g * g - a * E) / (2 * x * l * A), Y = Math.log(Math.sqrt(k * k + 1) - k), M = Math.log(Math.sqrt(T * T + 1) - T);
      C = (M - Y) / i, N = function(B) {
        var G = B * C, J = jx(Y), U = g / (l * A) * (J * xz(i * G + Y) - yz(Y));
        return [d + U * v, m + U * S, g * J / jx(i * G + Y)];
      };
    }
    return N.duration = Math.abs(C) * 1e3 * i / Math.SQRT2, N;
  }
  return o.rho = function(s) {
    var c = Math.max(1e-3, +s), d = c * c, m = d * d;
    return e2(c, d, m);
  }, o;
})(Math.SQRT2, 2, 4);
function sw(e12) {
  return (function i(l) {
    l = +l;
    function a(o, s) {
      var c = e12((o = Mm(o)).h, (s = Mm(s)).h), d = Da(o.s, s.s), m = Da(o.l, s.l), g = Da(o.opacity, s.opacity);
      return function(y) {
        return o.h = c(y), o.s = d(y), o.l = m(Math.pow(y, l)), o.opacity = g(y), o + "";
      };
    }
    return a.gamma = i, a;
  })(1);
}
sw(iz);
sw(Da);
var Ha = 0, Zu = 0, Vu = 0, cw = 1e3, Nc, Fu, _c = 0, Mr = 0, $c = 0, oo = typeof performance == "object" && performance.now ? performance : Date, fw = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e12) {
  setTimeout(e12, 17);
};
function mp() {
  return Mr || (fw(vz), Mr = oo.now() + $c);
}
function vz() {
  Mr = 0;
}
function zc() {
  this._call = this._time = this._next = null;
}
zc.prototype = dw.prototype = { constructor: zc, restart: function(e12, i, l) {
  if (typeof e12 != "function")
    throw new TypeError("callback is not a function");
  l = (l == null ? mp() : +l) + (i == null ? 0 : +i), !this._next && Fu !== this && (Fu ? Fu._next = this : Nc = this, Fu = this), this._call = e12, this._time = l, Om();
}, stop: function() {
  this._call && (this._call = null, this._time = 1 / 0, Om());
} };
function dw(e12, i, l) {
  var a = new zc();
  return a.restart(e12, i, l), a;
}
function bz() {
  mp(), ++Ha;
  for (var e12 = Nc, i; e12; )
    (i = Mr - e12._time) >= 0 && e12._call.call(void 0, i), e12 = e12._next;
  --Ha;
}
function Dx() {
  Mr = (_c = oo.now()) + $c, Ha = Zu = 0;
  try {
    bz();
  } finally {
    Ha = 0, Sz(), Mr = 0;
  }
}
function wz() {
  var e12 = oo.now(), i = e12 - _c;
  i > cw && ($c -= i, _c = e12);
}
function Sz() {
  for (var e12, i = Nc, l, a = 1 / 0; i; )
    i._call ? (a > i._time && (a = i._time), e12 = i, i = i._next) : (l = i._next, i._next = null, i = e12 ? e12._next = l : Nc = l);
  Fu = e12, Om(a);
}
function Om(e12) {
  if (!Ha) {
    Zu && (Zu = clearTimeout(Zu));
    var i = e12 - Mr;
    i > 24 ? (e12 < 1 / 0 && (Zu = setTimeout(Dx, Math.ceil(e12 - oo.now() - $c) + 1)), Vu && (Vu = clearInterval(Vu))) : (Vu || (_c = oo.now(), Vu = setInterval(wz, cw)), Ha = 1, fw(Dx));
  }
}
function Ox(e12, i, l) {
  var a = new zc();
  return i = i == null ? 0 : +i, a.restart((o) => {
    a.stop(), e12(o + i);
  }, i, l), a;
}
function Ez(e12) {
  return ((e12 *= 2) <= 1 ? e12 * e12 * e12 : (e12 -= 2) * e12 * e12 + 2) / 2;
}
var pp = 3;
(function e3(i) {
  i = +i;
  function l(a) {
    return Math.pow(a, i);
  }
  return l.exponent = e3, l;
})(pp);
(function e4(i) {
  i = +i;
  function l(a) {
    return 1 - Math.pow(1 - a, i);
  }
  return l.exponent = e4, l;
})(pp);
(function e5(i) {
  i = +i;
  function l(a) {
    return ((a *= 2) <= 1 ? Math.pow(a, i) : 2 - Math.pow(2 - a, i)) / 2;
  }
  return l.exponent = e5, l;
})(pp);
function Tc(e12) {
  return (Math.pow(2, -10 * e12) - 9765625e-10) * 1.0009775171065494;
}
var gp = 1.70158;
(function e6(i) {
  i = +i;
  function l(a) {
    return (a = +a) * a * (i * (a - 1) + a);
  }
  return l.overshoot = e6, l;
})(gp);
(function e7(i) {
  i = +i;
  function l(a) {
    return --a * a * ((a + 1) * i + a) + 1;
  }
  return l.overshoot = e7, l;
})(gp);
(function e8(i) {
  i = +i;
  function l(a) {
    return ((a *= 2) < 1 ? a * a * ((i + 1) * a - i) : (a -= 2) * a * ((i + 1) * a + i) + 2) / 2;
  }
  return l.overshoot = e8, l;
})(gp);
var Ba = 2 * Math.PI, yp = 1, xp = 0.3;
(function e9(i, l) {
  var a = Math.asin(1 / (i = Math.max(1, i))) * (l /= Ba);
  function o(s) {
    return i * Tc(- --s) * Math.sin((a - s) / l);
  }
  return o.amplitude = function(s) {
    return e9(s, l * Ba);
  }, o.period = function(s) {
    return e9(i, s);
  }, o;
})(yp, xp);
(function e10(i, l) {
  var a = Math.asin(1 / (i = Math.max(1, i))) * (l /= Ba);
  function o(s) {
    return 1 - i * Tc(s = +s) * Math.sin((s + a) / l);
  }
  return o.amplitude = function(s) {
    return e10(s, l * Ba);
  }, o.period = function(s) {
    return e10(i, s);
  }, o;
})(yp, xp);
(function e11(i, l) {
  var a = Math.asin(1 / (i = Math.max(1, i))) * (l /= Ba);
  function o(s) {
    return ((s = s * 2 - 1) < 0 ? i * Tc(-s) * Math.sin((a - s) / l) : 2 - i * Tc(s) * Math.sin((a + s) / l)) / 2;
  }
  return o.amplitude = function(s) {
    return e11(s, l * Ba);
  }, o.period = function(s) {
    return e11(i, s);
  }, o;
})(yp, xp);
var Cz = Vc("start", "end", "cancel", "interrupt"), kz = [], hw = 0, Rx = 1, Rm = 2, gc = 3, Lx = 4, Lm = 5, yc = 6;
function Qc(e12, i, l, a, o, s) {
  var c = e12.__transition;
  if (!c)
    e12.__transition = {};
  else if (l in c)
    return;
  Nz(e12, l, { name: i, index: a, group: o, on: Cz, tween: kz, time: s.time, delay: s.delay, duration: s.duration, ease: s.ease, timer: null, state: hw });
}
function vp(e12, i) {
  var l = mi(e12, i);
  if (l.state > hw)
    throw new Error("too late; already scheduled");
  return l;
}
function ji(e12, i) {
  var l = mi(e12, i);
  if (l.state > gc)
    throw new Error("too late; already running");
  return l;
}
function mi(e12, i) {
  var l = e12.__transition;
  if (!l || !(l = l[i]))
    throw new Error("transition not found");
  return l;
}
function Nz(e12, i, l) {
  var a = e12.__transition, o;
  a[i] = l, l.timer = dw(s, 0, l.time);
  function s(g) {
    l.state = Rx, l.timer.restart(c, l.delay, l.time), l.delay <= g && c(g - l.delay);
  }
  function c(g) {
    var y, p, x, v;
    if (l.state !== Rx)
      return m();
    for (y in a)
      if (v = a[y], v.name === l.name) {
        if (v.state === gc)
          return Ox(c);
        v.state === Lx ? (v.state = yc, v.timer.stop(), v.on.call("interrupt", e12, e12.__data__, v.index, v.group), delete a[y]) : +y < i && (v.state = yc, v.timer.stop(), v.on.call("cancel", e12, e12.__data__, v.index, v.group), delete a[y]);
      }
    if (Ox(function() {
      l.state === gc && (l.state = Lx, l.timer.restart(d, l.delay, l.time), d(g));
    }), l.state = Rm, l.on.call("start", e12, e12.__data__, l.index, l.group), l.state === Rm) {
      for (l.state = gc, o = new Array(x = l.tween.length), y = 0, p = -1; y < x; ++y)
        (v = l.tween[y].value.call(e12, e12.__data__, l.index, l.group)) && (o[++p] = v);
      o.length = p + 1;
    }
  }
  function d(g) {
    for (var y = g < l.duration ? l.ease.call(null, g / l.duration) : (l.timer.restart(m), l.state = Lm, 1), p = -1, x = o.length; ++p < x; )
      o[p].call(e12, y);
    l.state === Lm && (l.on.call("end", e12, e12.__data__, l.index, l.group), m());
  }
  function m() {
    l.state = yc, l.timer.stop(), delete a[i];
    for (var g in a)
      return;
    delete e12.__transition;
  }
}
function xc(e12, i) {
  var l = e12.__transition, a, o, s = true, c;
  if (l) {
    i = i == null ? null : i + "";
    for (c in l) {
      if ((a = l[c]).name !== i) {
        s = false;
        continue;
      }
      o = a.state > Rm && a.state < Lm, a.state = yc, a.timer.stop(), a.on.call(o ? "interrupt" : "cancel", e12, e12.__data__, a.index, a.group), delete l[c];
    }
    s && delete e12.__transition;
  }
}
function _z(e12) {
  return this.each(function() {
    xc(this, e12);
  });
}
function zz(e12, i) {
  var l, a;
  return function() {
    var o = ji(this, e12), s = o.tween;
    if (s !== l) {
      a = l = s;
      for (var c = 0, d = a.length; c < d; ++c)
        if (a[c].name === i) {
          a = a.slice(), a.splice(c, 1);
          break;
        }
    }
    o.tween = a;
  };
}
function Tz(e12, i, l) {
  var a, o;
  if (typeof l != "function")
    throw new Error();
  return function() {
    var s = ji(this, e12), c = s.tween;
    if (c !== a) {
      o = (a = c).slice();
      for (var d = { name: i, value: l }, m = 0, g = o.length; m < g; ++m)
        if (o[m].name === i) {
          o[m] = d;
          break;
        }
      m === g && o.push(d);
    }
    s.tween = o;
  };
}
function Az(e12, i) {
  var l = this._id;
  if (e12 += "", arguments.length < 2) {
    for (var a = mi(this.node(), l).tween, o = 0, s = a.length, c; o < s; ++o)
      if ((c = a[o]).name === e12)
        return c.value;
    return null;
  }
  return this.each((i == null ? zz : Tz)(l, e12, i));
}
function bp(e12, i, l) {
  var a = e12._id;
  return e12.each(function() {
    var o = ji(this, a);
    (o.value || (o.value = {}))[i] = l.apply(this, arguments);
  }), function(o) {
    return mi(o, a).value[i];
  };
}
function mw(e12, i) {
  var l;
  return (typeof i == "number" ? Ti : i instanceof Ar ? kc : (l = Ar(i)) ? (i = l, kc) : aw)(e12, i);
}
function Mz(e12) {
  return function() {
    this.removeAttribute(e12);
  };
}
function jz(e12) {
  return function() {
    this.removeAttributeNS(e12.space, e12.local);
  };
}
function Dz(e12, i, l) {
  var a, o = l + "", s;
  return function() {
    var c = this.getAttribute(e12);
    return c === o ? null : c === a ? s : s = i(a = c, l);
  };
}
function Oz(e12, i, l) {
  var a, o = l + "", s;
  return function() {
    var c = this.getAttributeNS(e12.space, e12.local);
    return c === o ? null : c === a ? s : s = i(a = c, l);
  };
}
function Rz(e12, i, l) {
  var a, o, s;
  return function() {
    var c, d = l(this), m;
    return d == null ? void this.removeAttribute(e12) : (c = this.getAttribute(e12), m = d + "", c === m ? null : c === a && m === o ? s : (o = m, s = i(a = c, d)));
  };
}
function Lz(e12, i, l) {
  var a, o, s;
  return function() {
    var c, d = l(this), m;
    return d == null ? void this.removeAttributeNS(e12.space, e12.local) : (c = this.getAttributeNS(e12.space, e12.local), m = d + "", c === m ? null : c === a && m === o ? s : (o = m, s = i(a = c, d)));
  };
}
function Hz(e12, i) {
  var l = Yc(e12), a = l === "transform" ? pz : mw;
  return this.attrTween(e12, typeof i == "function" ? (l.local ? Lz : Rz)(l, a, bp(this, "attr." + e12, i)) : i == null ? (l.local ? jz : Mz)(l) : (l.local ? Oz : Dz)(l, a, i));
}
function Bz(e12, i) {
  return function(l) {
    this.setAttribute(e12, i.call(this, l));
  };
}
function Uz(e12, i) {
  return function(l) {
    this.setAttributeNS(e12.space, e12.local, i.call(this, l));
  };
}
function Iz(e12, i) {
  var l, a;
  function o() {
    var s = i.apply(this, arguments);
    return s !== a && (l = (a = s) && Uz(e12, s)), l;
  }
  return o._value = i, o;
}
function qz(e12, i) {
  var l, a;
  function o() {
    var s = i.apply(this, arguments);
    return s !== a && (l = (a = s) && Bz(e12, s)), l;
  }
  return o._value = i, o;
}
function Vz(e12, i) {
  var l = "attr." + e12;
  if (arguments.length < 2)
    return (l = this.tween(l)) && l._value;
  if (i == null)
    return this.tween(l, null);
  if (typeof i != "function")
    throw new Error();
  var a = Yc(e12);
  return this.tween(l, (a.local ? Iz : qz)(a, i));
}
function Yz(e12, i) {
  return function() {
    vp(this, e12).delay = +i.apply(this, arguments);
  };
}
function Xz(e12, i) {
  return i = +i, function() {
    vp(this, e12).delay = i;
  };
}
function Gz(e12) {
  var i = this._id;
  return arguments.length ? this.each((typeof e12 == "function" ? Yz : Xz)(i, e12)) : mi(this.node(), i).delay;
}
function $z(e12, i) {
  return function() {
    ji(this, e12).duration = +i.apply(this, arguments);
  };
}
function Qz(e12, i) {
  return i = +i, function() {
    ji(this, e12).duration = i;
  };
}
function Zz(e12) {
  var i = this._id;
  return arguments.length ? this.each((typeof e12 == "function" ? $z : Qz)(i, e12)) : mi(this.node(), i).duration;
}
function Fz(e12, i) {
  if (typeof i != "function")
    throw new Error();
  return function() {
    ji(this, e12).ease = i;
  };
}
function Kz(e12) {
  var i = this._id;
  return arguments.length ? this.each(Fz(i, e12)) : mi(this.node(), i).ease;
}
function Pz(e12, i) {
  return function() {
    var l = i.apply(this, arguments);
    if (typeof l != "function")
      throw new Error();
    ji(this, e12).ease = l;
  };
}
function Jz(e12) {
  if (typeof e12 != "function")
    throw new Error();
  return this.each(Pz(this._id, e12));
}
function Wz(e12) {
  typeof e12 != "function" && (e12 = Rb(e12));
  for (var i = this._groups, l = i.length, a = new Array(l), o = 0; o < l; ++o)
    for (var s = i[o], c = s.length, d = a[o] = [], m, g = 0; g < c; ++g)
      (m = s[g]) && e12.call(m, m.__data__, g, s) && d.push(m);
  return new il(a, this._parents, this._name, this._id);
}
function eT(e12) {
  if (e12._id !== this._id)
    throw new Error();
  for (var i = this._groups, l = e12._groups, a = i.length, o = l.length, s = Math.min(a, o), c = new Array(a), d = 0; d < s; ++d)
    for (var m = i[d], g = l[d], y = m.length, p = c[d] = new Array(y), x, v = 0; v < y; ++v)
      (x = m[v] || g[v]) && (p[v] = x);
  for (; d < a; ++d)
    c[d] = i[d];
  return new il(c, this._parents, this._name, this._id);
}
function tT(e12) {
  return (e12 + "").trim().split(/^|\s+/).every(function(i) {
    var l = i.indexOf(".");
    return l >= 0 && (i = i.slice(0, l)), !i || i === "start";
  });
}
function nT(e12, i, l) {
  var a, o, s = tT(i) ? vp : ji;
  return function() {
    var c = s(this, e12), d = c.on;
    d !== a && (o = (a = d).copy()).on(i, l), c.on = o;
  };
}
function iT(e12, i) {
  var l = this._id;
  return arguments.length < 2 ? mi(this.node(), l).on.on(e12) : this.each(nT(l, e12, i));
}
function lT(e12) {
  return function() {
    var i = this.parentNode;
    for (var l in this.__transition)
      if (+l !== e12)
        return;
    i && i.removeChild(this);
  };
}
function rT() {
  return this.on("end.remove", lT(this._id));
}
function aT(e12) {
  var i = this._name, l = this._id;
  typeof e12 != "function" && (e12 = sp(e12));
  for (var a = this._groups, o = a.length, s = new Array(o), c = 0; c < o; ++c)
    for (var d = a[c], m = d.length, g = s[c] = new Array(m), y, p, x = 0; x < m; ++x)
      (y = d[x]) && (p = e12.call(y, y.__data__, x, d)) && ("__data__" in y && (p.__data__ = y.__data__), g[x] = p, Qc(g[x], i, l, x, g, mi(y, l)));
  return new il(s, this._parents, i, l);
}
function uT(e12) {
  var i = this._name, l = this._id;
  typeof e12 != "function" && (e12 = Ob(e12));
  for (var a = this._groups, o = a.length, s = [], c = [], d = 0; d < o; ++d)
    for (var m = a[d], g = m.length, y, p = 0; p < g; ++p)
      if (y = m[p]) {
        for (var x = e12.call(y, y.__data__, p, m), v, S = mi(y, l), E = 0, N = x.length; E < N; ++E)
          (v = x[E]) && Qc(v, i, l, E, x, S);
        s.push(x), c.push(y);
      }
  return new il(s, c, i, l);
}
var oT = yo.prototype.constructor;
function sT() {
  return new oT(this._groups, this._parents);
}
function cT(e12, i) {
  var l, a, o;
  return function() {
    var s = Ra(this, e12), c = (this.style.removeProperty(e12), Ra(this, e12));
    return s === c ? null : s === l && c === a ? o : o = i(l = s, a = c);
  };
}
function pw(e12) {
  return function() {
    this.style.removeProperty(e12);
  };
}
function fT(e12, i, l) {
  var a, o = l + "", s;
  return function() {
    var c = Ra(this, e12);
    return c === o ? null : c === a ? s : s = i(a = c, l);
  };
}
function dT(e12, i, l) {
  var a, o, s;
  return function() {
    var c = Ra(this, e12), d = l(this), m = d + "";
    return d == null && (m = d = (this.style.removeProperty(e12), Ra(this, e12))), c === m ? null : c === a && m === o ? s : (o = m, s = i(a = c, d));
  };
}
function hT(e12, i) {
  var l, a, o, s = "style." + i, c = "end." + s, d;
  return function() {
    var m = ji(this, e12), g = m.on, y = m.value[s] == null ? d || (d = pw(i)) : void 0;
    (g !== l || o !== y) && (a = (l = g).copy()).on(c, o = y), m.on = a;
  };
}
function mT(e12, i, l) {
  var a = (e12 += "") == "transform" ? mz : mw;
  return i == null ? this.styleTween(e12, cT(e12, a)).on("end.style." + e12, pw(e12)) : typeof i == "function" ? this.styleTween(e12, dT(e12, a, bp(this, "style." + e12, i))).each(hT(this._id, e12)) : this.styleTween(e12, fT(e12, a, i), l).on("end.style." + e12, null);
}
function pT(e12, i, l) {
  return function(a) {
    this.style.setProperty(e12, i.call(this, a), l);
  };
}
function gT(e12, i, l) {
  var a, o;
  function s() {
    var c = i.apply(this, arguments);
    return c !== o && (a = (o = c) && pT(e12, c, l)), a;
  }
  return s._value = i, s;
}
function yT(e12, i, l) {
  var a = "style." + (e12 += "");
  if (arguments.length < 2)
    return (a = this.tween(a)) && a._value;
  if (i == null)
    return this.tween(a, null);
  if (typeof i != "function")
    throw new Error();
  return this.tween(a, gT(e12, i, l ?? ""));
}
function xT(e12) {
  return function() {
    this.textContent = e12;
  };
}
function vT(e12) {
  return function() {
    var i = e12(this);
    this.textContent = i ?? "";
  };
}
function bT(e12) {
  return this.tween("text", typeof e12 == "function" ? vT(bp(this, "text", e12)) : xT(e12 == null ? "" : e12 + ""));
}
function wT(e12) {
  return function(i) {
    this.textContent = e12.call(this, i);
  };
}
function ST(e12) {
  var i, l;
  function a() {
    var o = e12.apply(this, arguments);
    return o !== l && (i = (l = o) && wT(o)), i;
  }
  return a._value = e12, a;
}
function ET(e12) {
  var i = "text";
  if (arguments.length < 1)
    return (i = this.tween(i)) && i._value;
  if (e12 == null)
    return this.tween(i, null);
  if (typeof e12 != "function")
    throw new Error();
  return this.tween(i, ST(e12));
}
function CT() {
  for (var e12 = this._name, i = this._id, l = gw(), a = this._groups, o = a.length, s = 0; s < o; ++s)
    for (var c = a[s], d = c.length, m, g = 0; g < d; ++g)
      if (m = c[g]) {
        var y = mi(m, i);
        Qc(m, e12, l, g, c, { time: y.time + y.delay + y.duration, delay: 0, duration: y.duration, ease: y.ease });
      }
  return new il(a, this._parents, e12, l);
}
function kT() {
  var e12, i, l = this, a = l._id, o = l.size();
  return new Promise(function(s, c) {
    var d = { value: c }, m = { value: function() {
      --o === 0 && s();
    } };
    l.each(function() {
      var g = ji(this, a), y = g.on;
      y !== e12 && (i = (e12 = y).copy(), i._.cancel.push(d), i._.interrupt.push(d), i._.end.push(m)), g.on = i;
    }), o === 0 && s();
  });
}
var NT = 0;
function il(e12, i, l, a) {
  this._groups = e12, this._parents = i, this._name = l, this._id = a;
}
function gw() {
  return ++NT;
}
var Wi = yo.prototype;
il.prototype = { constructor: il, select: aT, selectAll: uT, selectChild: Wi.selectChild, selectChildren: Wi.selectChildren, filter: Wz, merge: eT, selection: sT, transition: CT, call: Wi.call, nodes: Wi.nodes, node: Wi.node, size: Wi.size, empty: Wi.empty, each: Wi.each, on: iT, attr: Hz, attrTween: Vz, style: mT, styleTween: yT, text: bT, textTween: ET, remove: rT, tween: Az, delay: Gz, duration: Zz, ease: Kz, easeVarying: Jz, end: kT, [Symbol.iterator]: Wi[Symbol.iterator] };
var _T = { time: null, delay: 0, duration: 250, ease: Ez };
function zT(e12, i) {
  for (var l; !(l = e12.__transition) || !(l = l[i]); )
    if (!(e12 = e12.parentNode))
      throw new Error(`transition ${i} not found`);
  return l;
}
function TT(e12) {
  var i, l;
  e12 instanceof il ? (i = e12._id, e12 = e12._name) : (i = gw(), (l = _T).time = mp(), e12 = e12 == null ? null : e12 + "");
  for (var a = this._groups, o = a.length, s = 0; s < o; ++s)
    for (var c = a[s], d = c.length, m, g = 0; g < d; ++g)
      (m = c[g]) && Qc(m, e12, i, g, c, l || zT(m, i));
  return new il(a, this._parents, e12, i);
}
yo.prototype.interrupt = _z;
yo.prototype.transition = TT;
var ic = (e12) => () => e12;
function AT(e12, { sourceEvent: i, target: l, transform: a, dispatch: o }) {
  Object.defineProperties(this, { type: { value: e12, enumerable: true, configurable: true }, sourceEvent: { value: i, enumerable: true, configurable: true }, target: { value: l, enumerable: true, configurable: true }, transform: { value: a, enumerable: true, configurable: true }, _: { value: o } });
}
function tl(e12, i, l) {
  this.k = e12, this.x = i, this.y = l;
}
tl.prototype = { constructor: tl, scale: function(e12) {
  return e12 === 1 ? this : new tl(this.k * e12, this.x, this.y);
}, translate: function(e12, i) {
  return e12 === 0 & i === 0 ? this : new tl(this.k, this.x + this.k * e12, this.y + this.k * i);
}, apply: function(e12) {
  return [e12[0] * this.k + this.x, e12[1] * this.k + this.y];
}, applyX: function(e12) {
  return e12 * this.k + this.x;
}, applyY: function(e12) {
  return e12 * this.k + this.y;
}, invert: function(e12) {
  return [(e12[0] - this.x) / this.k, (e12[1] - this.y) / this.k];
}, invertX: function(e12) {
  return (e12 - this.x) / this.k;
}, invertY: function(e12) {
  return (e12 - this.y) / this.k;
}, rescaleX: function(e12) {
  return e12.copy().domain(e12.range().map(this.invertX, this).map(e12.invert, e12));
}, rescaleY: function(e12) {
  return e12.copy().domain(e12.range().map(this.invertY, this).map(e12.invert, e12));
}, toString: function() {
  return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
} };
var Zc = new tl(1, 0, 0);
yw.prototype = tl.prototype;
function yw(e12) {
  for (; !e12.__zoom; )
    if (!(e12 = e12.parentNode))
      return Zc;
  return e12.__zoom;
}
function Ph(e12) {
  e12.stopImmediatePropagation();
}
function Yu(e12) {
  e12.preventDefault(), e12.stopImmediatePropagation();
}
function MT(e12) {
  return (!e12.ctrlKey || e12.type === "wheel") && !e12.button;
}
function jT() {
  var e12 = this;
  return e12 instanceof SVGElement ? (e12 = e12.ownerSVGElement || e12, e12.hasAttribute("viewBox") ? (e12 = e12.viewBox.baseVal, [[e12.x, e12.y], [e12.x + e12.width, e12.y + e12.height]]) : [[0, 0], [e12.width.baseVal.value, e12.height.baseVal.value]]) : [[0, 0], [e12.clientWidth, e12.clientHeight]];
}
function Hx() {
  return this.__zoom || Zc;
}
function DT(e12) {
  return -e12.deltaY * (e12.deltaMode === 1 ? 0.05 : e12.deltaMode ? 1 : 2e-3) * (e12.ctrlKey ? 10 : 1);
}
function OT() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function RT(e12, i, l) {
  var a = e12.invertX(i[0][0]) - l[0][0], o = e12.invertX(i[1][0]) - l[1][0], s = e12.invertY(i[0][1]) - l[0][1], c = e12.invertY(i[1][1]) - l[1][1];
  return e12.translate(o > a ? (a + o) / 2 : Math.min(0, a) || Math.max(0, o), c > s ? (s + c) / 2 : Math.min(0, s) || Math.max(0, c));
}
function xw() {
  var e12 = MT, i = jT, l = RT, a = DT, o = OT, s = [0, 1 / 0], c = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], d = 250, m = pc, g = Vc("start", "zoom", "end"), y, p, x, v = 500, S = 150, E = 0, N = 10;
  function C(j) {
    j.property("__zoom", Hx).on("wheel.zoom", G, { passive: false }).on("mousedown.zoom", J).on("dblclick.zoom", U).filter(o).on("touchstart.zoom", X).on("touchmove.zoom", ie).on("touchend.zoom touchcancel.zoom", re).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  C.transform = function(j, D, H, V) {
    var $ = j.selection ? j.selection() : j;
    $.property("__zoom", Hx), j !== $ ? Y(j, D, H, V) : $.interrupt().each(function() {
      M(this, arguments).event(V).start().zoom(null, typeof D == "function" ? D.apply(this, arguments) : D).end();
    });
  }, C.scaleBy = function(j, D, H, V) {
    C.scaleTo(j, function() {
      var $ = this.__zoom.k, F = typeof D == "function" ? D.apply(this, arguments) : D;
      return $ * F;
    }, H, V);
  }, C.scaleTo = function(j, D, H, V) {
    C.transform(j, function() {
      var $ = i.apply(this, arguments), F = this.__zoom, _ = H == null ? T($) : typeof H == "function" ? H.apply(this, arguments) : H, se = F.invert(_), he = typeof D == "function" ? D.apply(this, arguments) : D;
      return l(k(A(F, he), _, se), $, c);
    }, H, V);
  }, C.translateBy = function(j, D, H, V) {
    C.transform(j, function() {
      return l(this.__zoom.translate(typeof D == "function" ? D.apply(this, arguments) : D, typeof H == "function" ? H.apply(this, arguments) : H), i.apply(this, arguments), c);
    }, null, V);
  }, C.translateTo = function(j, D, H, V, $) {
    C.transform(j, function() {
      var F = i.apply(this, arguments), _ = this.__zoom, se = V == null ? T(F) : typeof V == "function" ? V.apply(this, arguments) : V;
      return l(Zc.translate(se[0], se[1]).scale(_.k).translate(typeof D == "function" ? -D.apply(this, arguments) : -D, typeof H == "function" ? -H.apply(this, arguments) : -H), F, c);
    }, V, $);
  };
  function A(j, D) {
    return D = Math.max(s[0], Math.min(s[1], D)), D === j.k ? j : new tl(D, j.x, j.y);
  }
  function k(j, D, H) {
    var V = D[0] - H[0] * j.k, $ = D[1] - H[1] * j.k;
    return V === j.x && $ === j.y ? j : new tl(j.k, V, $);
  }
  function T(j) {
    return [(+j[0][0] + +j[1][0]) / 2, (+j[0][1] + +j[1][1]) / 2];
  }
  function Y(j, D, H, V) {
    j.on("start.zoom", function() {
      M(this, arguments).event(V).start();
    }).on("interrupt.zoom end.zoom", function() {
      M(this, arguments).event(V).end();
    }).tween("zoom", function() {
      var $ = this, F = arguments, _ = M($, F).event(V), se = i.apply($, F), he = H == null ? T(se) : typeof H == "function" ? H.apply($, F) : H, R = Math.max(se[1][0] - se[0][0], se[1][1] - se[0][1]), O = $.__zoom, te = typeof D == "function" ? D.apply($, F) : D, pe = m(O.invert(he).concat(R / O.k), te.invert(he).concat(R / te.k));
      return function(me) {
        if (me === 1)
          me = te;
        else {
          var ne = pe(me), xe = R / ne[2];
          me = new tl(xe, he[0] - ne[0] * xe, he[1] - ne[1] * xe);
        }
        _.zoom(null, me);
      };
    });
  }
  function M(j, D, H) {
    return !H && j.__zooming || new B(j, D);
  }
  function B(j, D) {
    this.that = j, this.args = D, this.active = 0, this.sourceEvent = null, this.extent = i.apply(j, D), this.taps = 0;
  }
  B.prototype = { event: function(j) {
    return j && (this.sourceEvent = j), this;
  }, start: function() {
    return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
  }, zoom: function(j, D) {
    return this.mouse && j !== "mouse" && (this.mouse[1] = D.invert(this.mouse[0])), this.touch0 && j !== "touch" && (this.touch0[1] = D.invert(this.touch0[0])), this.touch1 && j !== "touch" && (this.touch1[1] = D.invert(this.touch1[0])), this.that.__zoom = D, this.emit("zoom"), this;
  }, end: function() {
    return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
  }, emit: function(j) {
    var D = Bn(this.that).datum();
    g.call(j, this.that, new AT(j, { sourceEvent: this.sourceEvent, target: C, transform: this.that.__zoom, dispatch: g }), D);
  } };
  function G(j, ...D) {
    if (!e12.apply(this, arguments))
      return;
    var H = M(this, D).event(j), V = this.__zoom, $ = Math.max(s[0], Math.min(s[1], V.k * Math.pow(2, a.apply(this, arguments)))), F = ui(j);
    if (H.wheel)
      (H.mouse[0][0] !== F[0] || H.mouse[0][1] !== F[1]) && (H.mouse[1] = V.invert(H.mouse[0] = F)), clearTimeout(H.wheel);
    else {
      if (V.k === $)
        return;
      H.mouse = [F, V.invert(F)], xc(this), H.start();
    }
    Yu(j), H.wheel = setTimeout(_, S), H.zoom("mouse", l(k(A(V, $), H.mouse[0], H.mouse[1]), H.extent, c));
    function _() {
      H.wheel = null, H.end();
    }
  }
  function J(j, ...D) {
    if (x || !e12.apply(this, arguments))
      return;
    var H = j.currentTarget, V = M(this, D, true).event(j), $ = Bn(j.view).on("mousemove.zoom", he, true).on("mouseup.zoom", R, true), F = ui(j, H), _ = j.clientX, se = j.clientY;
    Gb(j.view), Ph(j), V.mouse = [F, this.__zoom.invert(F)], xc(this), V.start();
    function he(O) {
      if (Yu(O), !V.moved) {
        var te = O.clientX - _, pe = O.clientY - se;
        V.moved = te * te + pe * pe > E;
      }
      V.event(O).zoom("mouse", l(k(V.that.__zoom, V.mouse[0] = ui(O, H), V.mouse[1]), V.extent, c));
    }
    function R(O) {
      $.on("mousemove.zoom mouseup.zoom", null), $b(O.view, V.moved), Yu(O), V.event(O).end();
    }
  }
  function U(j, ...D) {
    if (e12.apply(this, arguments)) {
      var H = this.__zoom, V = ui(j.changedTouches ? j.changedTouches[0] : j, this), $ = H.invert(V), F = H.k * (j.shiftKey ? 0.5 : 2), _ = l(k(A(H, F), V, $), i.apply(this, D), c);
      Yu(j), d > 0 ? Bn(this).transition().duration(d).call(Y, _, V, j) : Bn(this).call(C.transform, _, V, j);
    }
  }
  function X(j, ...D) {
    if (e12.apply(this, arguments)) {
      var H = j.touches, V = H.length, $ = M(this, D, j.changedTouches.length === V).event(j), F, _, se, he;
      for (Ph(j), _ = 0; _ < V; ++_)
        se = H[_], he = ui(se, this), he = [he, this.__zoom.invert(he), se.identifier], $.touch0 ? !$.touch1 && $.touch0[2] !== he[2] && ($.touch1 = he, $.taps = 0) : ($.touch0 = he, F = true, $.taps = 1 + !!y);
      y && (y = clearTimeout(y)), F && ($.taps < 2 && (p = he[0], y = setTimeout(function() {
        y = null;
      }, v)), xc(this), $.start());
    }
  }
  function ie(j, ...D) {
    if (this.__zooming) {
      var H = M(this, D).event(j), V = j.changedTouches, $ = V.length, F, _, se, he;
      for (Yu(j), F = 0; F < $; ++F)
        _ = V[F], se = ui(_, this), H.touch0 && H.touch0[2] === _.identifier ? H.touch0[0] = se : H.touch1 && H.touch1[2] === _.identifier && (H.touch1[0] = se);
      if (_ = H.that.__zoom, H.touch1) {
        var R = H.touch0[0], O = H.touch0[1], te = H.touch1[0], pe = H.touch1[1], me = (me = te[0] - R[0]) * me + (me = te[1] - R[1]) * me, ne = (ne = pe[0] - O[0]) * ne + (ne = pe[1] - O[1]) * ne;
        _ = A(_, Math.sqrt(me / ne)), se = [(R[0] + te[0]) / 2, (R[1] + te[1]) / 2], he = [(O[0] + pe[0]) / 2, (O[1] + pe[1]) / 2];
      } else if (H.touch0)
        se = H.touch0[0], he = H.touch0[1];
      else
        return;
      H.zoom("touch", l(k(_, se, he), H.extent, c));
    }
  }
  function re(j, ...D) {
    if (this.__zooming) {
      var H = M(this, D).event(j), V = j.changedTouches, $ = V.length, F, _;
      for (Ph(j), x && clearTimeout(x), x = setTimeout(function() {
        x = null;
      }, v), F = 0; F < $; ++F)
        _ = V[F], H.touch0 && H.touch0[2] === _.identifier ? delete H.touch0 : H.touch1 && H.touch1[2] === _.identifier && delete H.touch1;
      if (H.touch1 && !H.touch0 && (H.touch0 = H.touch1, delete H.touch1), H.touch0)
        H.touch0[1] = this.__zoom.invert(H.touch0[0]);
      else if (H.end(), H.taps === 2 && (_ = ui(_, this), Math.hypot(p[0] - _[0], p[1] - _[1]) < N)) {
        var se = Bn(this).on("dblclick.zoom");
        se && se.apply(this, arguments);
      }
    }
  }
  return C.wheelDelta = function(j) {
    return arguments.length ? (a = typeof j == "function" ? j : ic(+j), C) : a;
  }, C.filter = function(j) {
    return arguments.length ? (e12 = typeof j == "function" ? j : ic(!!j), C) : e12;
  }, C.touchable = function(j) {
    return arguments.length ? (o = typeof j == "function" ? j : ic(!!j), C) : o;
  }, C.extent = function(j) {
    return arguments.length ? (i = typeof j == "function" ? j : ic([[+j[0][0], +j[0][1]], [+j[1][0], +j[1][1]]]), C) : i;
  }, C.scaleExtent = function(j) {
    return arguments.length ? (s[0] = +j[0], s[1] = +j[1], C) : [s[0], s[1]];
  }, C.translateExtent = function(j) {
    return arguments.length ? (c[0][0] = +j[0][0], c[1][0] = +j[1][0], c[0][1] = +j[0][1], c[1][1] = +j[1][1], C) : [[c[0][0], c[0][1]], [c[1][0], c[1][1]]];
  }, C.constrain = function(j) {
    return arguments.length ? (l = j, C) : l;
  }, C.duration = function(j) {
    return arguments.length ? (d = +j, C) : d;
  }, C.interpolate = function(j) {
    return arguments.length ? (m = j, C) : m;
  }, C.on = function() {
    var j = g.on.apply(g, arguments);
    return j === g ? C : j;
  }, C.clickDistance = function(j) {
    return arguments.length ? (E = (j = +j) * j, C) : Math.sqrt(E);
  }, C.tapDistance = function(j) {
    return arguments.length ? (N = +j, C) : N;
  }, C;
}
const hi = { error001: (e12 = "react") => `Seems like you have not used ${e12 === "svelte" ? "SvelteFlowProvider" : "ReactFlowProvider"} as an ancestor. Help: https://${e12}flow.dev/error#001`, error002: () => "It looks like you've created a new nodeTypes or edgeTypes object. If this wasn't on purpose please define the nodeTypes/edgeTypes outside of the component or memoize them.", error003: (e12) => `Node type "${e12}" not found. Using fallback type "default".`, error004: () => "The parent container needs a width and a height to render the graph.", error005: () => "Only child nodes can use a parent extent.", error006: () => "Can't create edge. An edge needs a source and a target.", error007: (e12) => `The old edge with id=${e12} does not exist.`, error009: (e12) => `Marker type "${e12}" doesn't exist.`, error008: (e12, { id: i, sourceHandle: l, targetHandle: a }) => `Couldn't create edge for ${e12} handle id: "${e12 === "source" ? l : a}", edge id: ${i}.`, error010: () => "Handle: No node id found. Make sure to only use a Handle inside a custom Node.", error011: (e12) => `Edge type "${e12}" not found. Using fallback type "default".`, error012: (e12) => `Node with id "${e12}" does not exist, it may have been removed. This can happen when a node is deleted before the "onNodeClick" handler is called.`, error013: (e12 = "react") => `It seems that you haven't loaded the styles. Please import '@xyflow/${e12}/dist/style.css' or base.css to make sure everything is working properly.`, error014: () => "useNodeConnections: No node ID found. Call useNodeConnections inside a custom Node or provide a node ID.", error015: () => "It seems that you are trying to drag a node that is not initialized. Please use onNodesChange as explained in the docs.", error016: (e12) => `Edge with id "${e12}" does not exist, it may have been removed. This can happen when an edge is deleted before the "onEdgeClick" handler is called.` }, so = [[Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY], [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]], vw = ["Enter", " ", "Escape"], bw = { "node.a11yDescription.default": "Press enter or space to select a node. Press delete to remove it and escape to cancel.", "node.a11yDescription.keyboardDisabled": "Press enter or space to select a node. You can then use the arrow keys to move the node around. Press delete to remove it and escape to cancel.", "node.a11yDescription.ariaLiveMessage": ({ direction: e12, x: i, y: l }) => `Moved selected node ${e12}. New position, x: ${i}, y: ${l}`, "edge.a11yDescription.default": "Press enter or space to select an edge. You can then press delete to remove it or escape to cancel.", "controls.ariaLabel": "Control Panel", "controls.zoomIn.ariaLabel": "Zoom In", "controls.zoomOut.ariaLabel": "Zoom Out", "controls.fitView.ariaLabel": "Fit View", "controls.interactive.ariaLabel": "Toggle Interactivity", "minimap.ariaLabel": "Mini Map", "handle.ariaLabel": "Handle" };
var Ua;
(function(e12) {
  e12.Strict = "strict", e12.Loose = "loose";
})(Ua || (Ua = {}));
var kr;
(function(e12) {
  e12.Free = "free", e12.Vertical = "vertical", e12.Horizontal = "horizontal";
})(kr || (kr = {}));
var co;
(function(e12) {
  e12.Partial = "partial", e12.Full = "full";
})(co || (co = {}));
const ww = { inProgress: false, isValid: null, from: null, fromHandle: null, fromPosition: null, fromNode: null, to: null, toHandle: null, toPosition: null, toNode: null, pointer: null };
var ql;
(function(e12) {
  e12.Bezier = "default", e12.Straight = "straight", e12.Step = "step", e12.SmoothStep = "smoothstep", e12.SimpleBezier = "simplebezier";
})(ql || (ql = {}));
var Ac;
(function(e12) {
  e12.Arrow = "arrow", e12.ArrowClosed = "arrowclosed";
})(Ac || (Ac = {}));
var Ie;
(function(e12) {
  e12.Left = "left", e12.Top = "top", e12.Right = "right", e12.Bottom = "bottom";
})(Ie || (Ie = {}));
const Bx = { [Ie.Left]: Ie.Right, [Ie.Right]: Ie.Left, [Ie.Top]: Ie.Bottom, [Ie.Bottom]: Ie.Top }, Sw = (e12) => !!e12 && typeof e12 == "object" && "id" in e12 && "source" in e12 && "target" in e12, LT = (e12) => !!e12 && typeof e12 == "object" && "id" in e12 && "position" in e12 && !("source" in e12) && !("target" in e12), wp = (e12) => !!e12 && typeof e12 == "object" && "id" in e12 && "internals" in e12 && !("source" in e12) && !("target" in e12), vo = (e12, i = [0, 0]) => {
  const { width: l, height: a } = pi(e12), o = e12.origin ?? i, s = l * o[0], c = a * o[1];
  return { x: e12.position.x - s, y: e12.position.y - c };
}, HT = (e12, i = { nodeOrigin: [0, 0] }) => {
  if (e12.length === 0)
    return { x: 0, y: 0, width: 0, height: 0 };
  let l = false;
  const a = e12.reduce((o, s) => {
    const c = typeof s == "string";
    let d = !i.nodeLookup && !c ? s : void 0;
    return i.nodeLookup && (d = c ? i.nodeLookup.get(s) : wp(s) ? s : i.nodeLookup.get(s.id)), d ? (l = true, Fc(o, Mc(d, i.nodeOrigin))) : o;
  }, { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 });
  return l ? Kc(a) : { x: 0, y: 0, width: 0, height: 0 };
}, bo = (e12, i = {}) => {
  let l = { x: 1 / 0, y: 1 / 0, x2: -1 / 0, y2: -1 / 0 }, a = false;
  return e12.forEach((o) => {
    (i.filter === void 0 || i.filter(o)) && (l = Fc(l, Mc(o)), a = true);
  }), a ? Kc(l) : { x: 0, y: 0, width: 0, height: 0 };
}, Sp = (e12, i, [l, a, o] = [0, 0, 1], s = false, c = false) => {
  const d = (i.x - l) / o, m = (i.y - a) / o, g = i.width / o, y = i.height / o, p = [];
  for (const x of e12.values()) {
    const { measured: v, selectable: S = true, hidden: E = false } = x;
    if (c && !S || E)
      continue;
    const N = v.width ?? x.width ?? x.initialWidth ?? 0, C = v.height ?? x.height ?? x.initialHeight ?? 0, { x: A, y: k } = x.internals.positionAbsolute, T = Nw(d, m, g, y, A, k, N, C), Y = N * C, M = s && T > 0;
    (!x.internals.handleBounds || M || T >= Y || x.dragging) && p.push(x);
  }
  return p;
}, BT = (e12, i) => {
  const l = /* @__PURE__ */ new Set();
  return e12.forEach((a) => {
    l.add(a.id);
  }), i.filter((a) => l.has(a.source) || l.has(a.target));
};
function UT(e12, i) {
  const l = /* @__PURE__ */ new Map(), a = i != null && i.nodes ? new Set(i.nodes.map((o) => o.id)) : null;
  return e12.forEach((o) => {
    let s;
    if (i != null && i.includeHiddenNodes) {
      const { width: c, height: d } = pi(o);
      s = c > 0 && d > 0;
    } else
      s = !!(o.measured.width && o.measured.height && !o.hidden);
    s && (!a || a.has(o.id)) && l.set(o.id, o);
  }), l;
}
async function IT({ nodes: e12, width: i, height: l, panZoom: a, minZoom: o, maxZoom: s }, c) {
  if (e12.size === 0)
    return true;
  const d = UT(e12, c), m = bo(d), g = Cp(m, i, l, (c == null ? void 0 : c.minZoom) ?? o, (c == null ? void 0 : c.maxZoom) ?? s, (c == null ? void 0 : c.padding) ?? 0.1);
  return await a.setViewport(g, { duration: c == null ? void 0 : c.duration, ease: c == null ? void 0 : c.ease, interpolate: c == null ? void 0 : c.interpolate }), true;
}
function Ew({ nodeId: e12, nextPosition: i, nodeLookup: l, nodeOrigin: a = [0, 0], nodeExtent: o, onError: s }) {
  const c = l.get(e12), d = c.parentId ? l.get(c.parentId) : void 0, { x: m, y: g } = d ? d.internals.positionAbsolute : { x: 0, y: 0 }, y = c.origin ?? a;
  let p = c.extent || o;
  if (c.extent === "parent" && !c.expandParent)
    if (!d)
      s == null || s("005", hi.error005());
    else {
      const { width: v, height: S } = pi(d);
      v && S && (p = [[m, g], [m + v, g + S]]);
    }
  else
    d && Dr(c.extent) && (p = [[c.extent[0][0] + m, c.extent[0][1] + g], [c.extent[1][0] + m, c.extent[1][1] + g]]);
  const x = Dr(p) ? jr(i, p, c.measured) : i;
  return (c.measured.width === void 0 || c.measured.height === void 0) && (s == null || s("015", hi.error015())), { position: { x: x.x - m + (c.measured.width ?? 0) * y[0], y: x.y - g + (c.measured.height ?? 0) * y[1] }, positionAbsolute: x };
}
async function qT({ nodesToRemove: e12 = [], edgesToRemove: i = [], nodes: l, edges: a, onBeforeDelete: o }) {
  const s = new Set(e12.map((x) => x.id)), c = [];
  for (const x of l) {
    if (x.deletable === false)
      continue;
    const v = s.has(x.id), S = !v && x.parentId && c.find((E) => E.id === x.parentId);
    (v || S) && c.push(x);
  }
  const d = new Set(i.map((x) => x.id)), m = a.filter((x) => x.deletable !== false), y = BT(c, m);
  for (const x of m)
    d.has(x.id) && !y.find((S) => S.id === x.id) && y.push(x);
  if (!o)
    return { edges: y, nodes: c };
  const p = await o({ nodes: c, edges: y });
  return typeof p == "boolean" ? p ? { edges: y, nodes: c } : { edges: [], nodes: [] } : p;
}
const Ia = (e12, i = 0, l = 1) => Math.min(Math.max(e12, i), l), jr = (e12 = { x: 0, y: 0 }, i, l) => ({ x: Ia(e12.x, i[0][0], i[1][0] - ((l == null ? void 0 : l.width) ?? 0)), y: Ia(e12.y, i[0][1], i[1][1] - ((l == null ? void 0 : l.height) ?? 0)) });
function Cw(e12, i, l) {
  const { width: a, height: o } = pi(l), { x: s, y: c } = l.internals.positionAbsolute;
  return jr(e12, [[s, c], [s + a, c + o]], i);
}
const Ux = (e12, i, l) => e12 < i ? Ia(Math.abs(e12 - i), 1, i) / i : e12 > l ? -Ia(Math.abs(e12 - l), 1, i) / i : 0, Ep = (e12, i, l = 15, a = 40) => {
  const o = Ux(e12.x, a, i.width - a) * l, s = Ux(e12.y, a, i.height - a) * l;
  return [o, s];
}, Fc = (e12, i) => ({ x: Math.min(e12.x, i.x), y: Math.min(e12.y, i.y), x2: Math.max(e12.x2, i.x2), y2: Math.max(e12.y2, i.y2) }), Hm = ({ x: e12, y: i, width: l, height: a }) => ({ x: e12, y: i, x2: e12 + l, y2: i + a }), Kc = ({ x: e12, y: i, x2: l, y2: a }) => ({ x: e12, y: i, width: l - e12, height: a - i }), fo = (e12, i = [0, 0]) => {
  var o, s;
  const { x: l, y: a } = wp(e12) ? e12.internals.positionAbsolute : vo(e12, i);
  return { x: l, y: a, width: ((o = e12.measured) == null ? void 0 : o.width) ?? e12.width ?? e12.initialWidth ?? 0, height: ((s = e12.measured) == null ? void 0 : s.height) ?? e12.height ?? e12.initialHeight ?? 0 };
}, Mc = (e12, i = [0, 0]) => {
  var o, s;
  const { x: l, y: a } = wp(e12) ? e12.internals.positionAbsolute : vo(e12, i);
  return { x: l, y: a, x2: l + (((o = e12.measured) == null ? void 0 : o.width) ?? e12.width ?? e12.initialWidth ?? 0), y2: a + (((s = e12.measured) == null ? void 0 : s.height) ?? e12.height ?? e12.initialHeight ?? 0) };
}, kw = (e12, i) => Kc(Fc(Hm(e12), Hm(i))), Nw = (e12, i, l, a, o, s, c, d) => {
  const m = Math.max(0, Math.min(e12 + l, o + c) - Math.max(e12, o)), g = Math.max(0, Math.min(i + a, s + d) - Math.max(i, s));
  return Math.ceil(m * g);
}, jc = (e12, i) => Nw(e12.x, e12.y, e12.width, e12.height, i.x, i.y, i.width, i.height), Ix = (e12) => si(e12.width) && si(e12.height) && si(e12.x) && si(e12.y), si = (e12) => !isNaN(e12) && isFinite(e12), _w = (e12, i) => (l, a) => {
}, wo = (e12, i = [1, 1]) => ({ x: i[0] * Math.round(e12.x / i[0]), y: i[1] * Math.round(e12.y / i[1]) }), So = ({ x: e12, y: i }, [l, a, o], s = false, c = [1, 1]) => {
  const d = { x: (e12 - l) / o, y: (i - a) / o };
  return s ? wo(d, c) : d;
}, qa = ({ x: e12, y: i }, [l, a, o]) => ({ x: e12 * o + l, y: i * o + a });
function Na(e12, i) {
  if (typeof e12 == "number")
    return Math.floor((i - i / (1 + e12)) * 0.5);
  if (typeof e12 == "string" && e12.endsWith("px")) {
    const l = parseFloat(e12);
    if (!Number.isNaN(l))
      return Math.floor(l);
  }
  if (typeof e12 == "string" && e12.endsWith("%")) {
    const l = parseFloat(e12);
    if (!Number.isNaN(l))
      return Math.floor(i * l * 0.01);
  }
  return console.error(`The padding value "${e12}" is invalid. Please provide a number or a string with a valid unit (px or %).`), 0;
}
function VT(e12, i, l) {
  if (typeof e12 == "string" || typeof e12 == "number") {
    const a = Na(e12, l), o = Na(e12, i);
    return { top: a, right: o, bottom: a, left: o, x: o * 2, y: a * 2 };
  }
  if (typeof e12 == "object") {
    const a = Na(e12.top ?? e12.y ?? 0, l), o = Na(e12.bottom ?? e12.y ?? 0, l), s = Na(e12.left ?? e12.x ?? 0, i), c = Na(e12.right ?? e12.x ?? 0, i);
    return { top: a, right: c, bottom: o, left: s, x: s + c, y: a + o };
  }
  return { top: 0, right: 0, bottom: 0, left: 0, x: 0, y: 0 };
}
function YT(e12, i, l, a, o, s) {
  const { x: c, y: d } = qa(e12, [i, l, a]), { x: m, y: g } = qa({ x: e12.x + e12.width, y: e12.y + e12.height }, [i, l, a]), y = o - m, p = s - g;
  return { left: Math.floor(c), top: Math.floor(d), right: Math.floor(y), bottom: Math.floor(p) };
}
const Cp = (e12, i, l, a, o, s) => {
  const c = VT(s, i, l), d = (i - c.x) / e12.width, m = (l - c.y) / e12.height, g = Math.min(d, m), y = Ia(g, a, o), p = e12.x + e12.width / 2, x = e12.y + e12.height / 2, v = i / 2 - p * y, S = l / 2 - x * y, E = YT(e12, v, S, y, i, l), N = { left: Math.min(E.left - c.left, 0), top: Math.min(E.top - c.top, 0), right: Math.min(E.right - c.right, 0), bottom: Math.min(E.bottom - c.bottom, 0) };
  return { x: v - N.left + N.right, y: S - N.top + N.bottom, zoom: y };
}, ho = () => {
  var e12;
  return typeof navigator < "u" && ((e12 = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e12.indexOf("Mac")) >= 0;
};
function Dr(e12) {
  return e12 != null && e12 !== "parent";
}
function pi(e12) {
  var i, l;
  return { width: ((i = e12.measured) == null ? void 0 : i.width) ?? e12.width ?? e12.initialWidth ?? 0, height: ((l = e12.measured) == null ? void 0 : l.height) ?? e12.height ?? e12.initialHeight ?? 0 };
}
function zw(e12) {
  var i, l;
  return (((i = e12.measured) == null ? void 0 : i.width) ?? e12.width ?? e12.initialWidth) !== void 0 && (((l = e12.measured) == null ? void 0 : l.height) ?? e12.height ?? e12.initialHeight) !== void 0;
}
function Tw(e12, i = { width: 0, height: 0 }, l, a, o) {
  const s = { ...e12 }, c = a.get(l);
  if (c) {
    const d = c.origin || o;
    s.x += c.internals.positionAbsolute.x - (i.width ?? 0) * d[0], s.y += c.internals.positionAbsolute.y - (i.height ?? 0) * d[1];
  }
  return s;
}
function qx(e12, i) {
  if (e12.size !== i.size)
    return false;
  for (const l of e12)
    if (!i.has(l))
      return false;
  return true;
}
function XT() {
  let e12, i;
  return { promise: new Promise((a, o) => {
    e12 = a, i = o;
  }), resolve: e12, reject: i };
}
function GT(e12) {
  return { ...bw, ...e12 || {} };
}
function Aw(e12) {
  return e12 === null ? null : e12 ? "valid" : "invalid";
}
function Ju(e12, { snapGrid: i = [0, 0], snapToGrid: l = false, transform: a, containerBounds: o }) {
  const { x: s, y: c } = ci(e12), d = So({ x: s - ((o == null ? void 0 : o.left) ?? 0), y: c - ((o == null ? void 0 : o.top) ?? 0) }, a), { x: m, y: g } = l ? wo(d, i) : d;
  return { xSnapped: m, ySnapped: g, ...d };
}
const kp = (e12) => ({ width: e12.offsetWidth, height: e12.offsetHeight }), Mw = (e12) => {
  var i;
  return ((i = e12 == null ? void 0 : e12.getRootNode) == null ? void 0 : i.call(e12)) || (window == null ? void 0 : window.document);
}, $T = ["INPUT", "SELECT", "TEXTAREA"];
function jw(e12) {
  var a, o;
  const i = ((o = (a = e12.composedPath) == null ? void 0 : a.call(e12)) == null ? void 0 : o[0]) || e12.target;
  return (i == null ? void 0 : i.nodeType) !== 1 ? false : $T.includes(i.nodeName) || i.hasAttribute("contenteditable") || !!i.closest(".nokey");
}
const Dw = (e12) => "clientX" in e12, ci = (e12, i) => {
  var s, c;
  const l = Dw(e12), a = l ? e12.clientX : (s = e12.touches) == null ? void 0 : s[0].clientX, o = l ? e12.clientY : (c = e12.touches) == null ? void 0 : c[0].clientY;
  return { x: a - ((i == null ? void 0 : i.left) ?? 0), y: o - ((i == null ? void 0 : i.top) ?? 0) };
}, Vx = (e12, i, l, a, o) => {
  const s = i.querySelectorAll(`.${e12}`);
  return !s || !s.length ? null : Array.from(s).map((c) => {
    const d = c.getBoundingClientRect();
    return { id: c.getAttribute("data-handleid"), type: e12, nodeId: o, position: c.getAttribute("data-handlepos"), x: (d.left - l.left) / a, y: (d.top - l.top) / a, ...kp(c) };
  });
};
function Ow({ sourceX: e12, sourceY: i, targetX: l, targetY: a, sourceControlX: o, sourceControlY: s, targetControlX: c, targetControlY: d }) {
  const m = e12 * 0.125 + o * 0.375 + c * 0.375 + l * 0.125, g = i * 0.125 + s * 0.375 + d * 0.375 + a * 0.125, y = Math.abs(m - e12), p = Math.abs(g - i);
  return [m, g, y, p];
}
function lc(e12, i) {
  return e12 >= 0 ? 0.5 * e12 : i * 25 * Math.sqrt(-e12);
}
function Yx({ pos: e12, x1: i, y1: l, x2: a, y2: o, c: s }) {
  switch (e12) {
    case Ie.Left:
      return [i - lc(i - a, s), l];
    case Ie.Right:
      return [i + lc(a - i, s), l];
    case Ie.Top:
      return [i, l - lc(l - o, s)];
    case Ie.Bottom:
      return [i, l + lc(o - l, s)];
  }
}
function Rw({ sourceX: e12, sourceY: i, sourcePosition: l = Ie.Bottom, targetX: a, targetY: o, targetPosition: s = Ie.Top, curvature: c = 0.25 }) {
  const [d, m] = Yx({ pos: l, x1: e12, y1: i, x2: a, y2: o, c }), [g, y] = Yx({ pos: s, x1: a, y1: o, x2: e12, y2: i, c }), [p, x, v, S] = Ow({ sourceX: e12, sourceY: i, targetX: a, targetY: o, sourceControlX: d, sourceControlY: m, targetControlX: g, targetControlY: y });
  return [`M${e12},${i} C${d},${m} ${g},${y} ${a},${o}`, p, x, v, S];
}
function Lw({ sourceX: e12, sourceY: i, targetX: l, targetY: a }) {
  const o = Math.abs(l - e12) / 2, s = l < e12 ? l + o : l - o, c = Math.abs(a - i) / 2, d = a < i ? a + c : a - c;
  return [s, d, o, c];
}
function QT({ sourceNode: e12, targetNode: i, selected: l = false, zIndex: a = 0, elevateOnSelect: o = false, zIndexMode: s = "basic" }) {
  if (s === "manual")
    return a;
  const c = o && l ? a + 1e3 : a, d = Math.max(e12.parentId || o && e12.selected ? e12.internals.z : 0, i.parentId || o && i.selected ? i.internals.z : 0);
  return c + d;
}
function ZT({ sourceNode: e12, targetNode: i, width: l, height: a, transform: o }) {
  const s = Fc(Mc(e12), Mc(i));
  s.x === s.x2 && (s.x2 += 1), s.y === s.y2 && (s.y2 += 1);
  const c = { x: -o[0] / o[2], y: -o[1] / o[2], width: l / o[2], height: a / o[2] };
  return jc(c, Kc(s)) > 0;
}
const FT = ({ source: e12, sourceHandle: i, target: l, targetHandle: a }) => `xy-edge__${e12}${i || ""}-${l}${a || ""}`, KT = (e12, i) => i.some((l) => l.source === e12.source && l.target === e12.target && (l.sourceHandle === e12.sourceHandle || !l.sourceHandle && !e12.sourceHandle) && (l.targetHandle === e12.targetHandle || !l.targetHandle && !e12.targetHandle)), PT = (e12, i, l = {}) => {
  var s;
  if (!e12.source || !e12.target)
    return (s = l.onError) == null || s.call(l, "006", hi.error006()), i;
  const a = l.getEdgeId || FT;
  let o;
  return Sw(e12) ? o = { ...e12 } : o = { ...e12, id: a(e12) }, KT(o, i) ? i : (o.sourceHandle === null && delete o.sourceHandle, o.targetHandle === null && delete o.targetHandle, i.concat(o));
};
function Hw({ sourceX: e12, sourceY: i, targetX: l, targetY: a }) {
  const [o, s, c, d] = Lw({ sourceX: e12, sourceY: i, targetX: l, targetY: a });
  return [`M ${e12},${i}L ${l},${a}`, o, s, c, d];
}
const Xx = { [Ie.Left]: { x: -1, y: 0 }, [Ie.Right]: { x: 1, y: 0 }, [Ie.Top]: { x: 0, y: -1 }, [Ie.Bottom]: { x: 0, y: 1 } }, JT = ({ source: e12, sourcePosition: i = Ie.Bottom, target: l }) => i === Ie.Left || i === Ie.Right ? e12.x < l.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e12.y < l.y ? { x: 0, y: 1 } : { x: 0, y: -1 }, Gx = (e12, i) => Math.sqrt(Math.pow(i.x - e12.x, 2) + Math.pow(i.y - e12.y, 2)), WT = (e12, i, l) => e12.x === i.x && i.x === l.x && (i.y - e12.y) * (l.y - i.y) >= 0 || e12.y === i.y && i.y === l.y && (i.x - e12.x) * (l.x - i.x) >= 0;
function e32({ source: e12, sourcePosition: i = Ie.Bottom, target: l, targetPosition: a = Ie.Top, center: o, offset: s, stepPosition: c }) {
  const d = Xx[i], m = Xx[a], g = { x: e12.x + d.x * s, y: e12.y + d.y * s }, y = { x: l.x + m.x * s, y: l.y + m.y * s }, p = JT({ source: g, sourcePosition: i, target: y }), x = p.x !== 0 ? "x" : "y", v = p[x];
  let S = [], E, N;
  const C = { x: 0, y: 0 }, A = { x: 0, y: 0 }, [, , k, T] = Lw({ sourceX: e12.x, sourceY: e12.y, targetX: l.x, targetY: l.y });
  if (d[x] * m[x] === -1) {
    x === "x" ? (E = o.x ?? g.x + (y.x - g.x) * c, N = o.y ?? (g.y + y.y) / 2) : (E = o.x ?? (g.x + y.x) / 2, N = o.y ?? g.y + (y.y - g.y) * c);
    const G = [{ x: E, y: g.y }, { x: E, y: y.y }], J = [{ x: g.x, y: N }, { x: y.x, y: N }];
    d[x] === v ? S = x === "x" ? G : J : S = x === "x" ? J : G;
  } else {
    const G = [{ x: g.x, y: y.y }], J = [{ x: y.x, y: g.y }];
    if (x === "x" ? S = d.x === v ? J : G : S = d.y === v ? G : J, i === a) {
      const j = Math.abs(e12[x] - l[x]);
      if (j <= s) {
        const D = Math.min(s - 1, s - j);
        d[x] === v ? C[x] = (g[x] > e12[x] ? -1 : 1) * D : A[x] = (y[x] > l[x] ? -1 : 1) * D;
      }
    }
    if (i !== a) {
      const j = x === "x" ? "y" : "x", D = d[x] === m[j], H = g[j] > y[j], V = g[j] < y[j];
      (d[x] === 1 && (!D && H || D && V) || d[x] !== 1 && (!D && V || D && H)) && (S = x === "x" ? G : J);
    }
    const U = { x: g.x + C.x, y: g.y + C.y }, X = { x: y.x + A.x, y: y.y + A.y }, ie = Math.max(Math.abs(U.x - S[0].x), Math.abs(X.x - S[0].x)), re = Math.max(Math.abs(U.y - S[0].y), Math.abs(X.y - S[0].y));
    ie >= re ? (E = (U.x + X.x) / 2, N = S[0].y) : (E = S[0].x, N = (U.y + X.y) / 2);
  }
  const Y = { x: g.x + C.x, y: g.y + C.y }, M = { x: y.x + A.x, y: y.y + A.y }, B = [];
  for (const G of [e12, Y, ...S, M, l]) {
    const [J, U] = B.slice(-2);
    U && WT(J, U, G) && B.pop(), B.push(G);
  }
  return [B, E, N, k, T];
}
function t3(e12, i, l, a) {
  const o = Math.min(Gx(e12, i) / 2, Gx(i, l) / 2, a), { x: s, y: c } = i;
  if (e12.x === s && s === l.x || e12.y === c && c === l.y)
    return `L${s} ${c}`;
  if (e12.y === c) {
    const g = e12.x < l.x ? -1 : 1, y = e12.y < l.y ? 1 : -1;
    return `L ${s + o * g},${c}Q ${s},${c} ${s},${c + o * y}`;
  }
  const d = e12.x < l.x ? 1 : -1, m = e12.y < l.y ? -1 : 1;
  return `L ${s},${c + o * m}Q ${s},${c} ${s + o * d},${c}`;
}
function Bm({ sourceX: e12, sourceY: i, sourcePosition: l = Ie.Bottom, targetX: a, targetY: o, targetPosition: s = Ie.Top, borderRadius: c = 5, centerX: d, centerY: m, offset: g = 20, stepPosition: y = 0.5 }) {
  const [p, x, v, S, E] = e32({ source: { x: e12, y: i }, sourcePosition: l, target: { x: a, y: o }, targetPosition: s, center: { x: d, y: m }, offset: g, stepPosition: y });
  let N = `M${p[0].x} ${p[0].y}`;
  for (let C = 1; C < p.length - 1; C++)
    N += t3(p[C - 1], p[C], p[C + 1], c);
  return N += `L${p[p.length - 1].x} ${p[p.length - 1].y}`, [N, x, v, S, E];
}
function $x(e12) {
  var i;
  return e12 && !!(e12.internals.handleBounds || (i = e12.handles) != null && i.length) && !!(e12.measured.width || e12.width || e12.initialWidth);
}
function n3(e12) {
  var p;
  const { sourceNode: i, targetNode: l } = e12;
  if (!$x(i) || !$x(l))
    return null;
  const a = i.internals.handleBounds || Qx(i.handles), o = l.internals.handleBounds || Qx(l.handles), s = Zx((a == null ? void 0 : a.source) ?? [], e12.sourceHandle), c = Zx(e12.connectionMode === Ua.Strict ? (o == null ? void 0 : o.target) ?? [] : ((o == null ? void 0 : o.target) ?? []).concat((o == null ? void 0 : o.source) ?? []), e12.targetHandle);
  if (!s || !c)
    return (p = e12.onError) == null || p.call(e12, "008", hi.error008(s ? "target" : "source", { id: e12.id, sourceHandle: e12.sourceHandle, targetHandle: e12.targetHandle })), null;
  const d = (s == null ? void 0 : s.position) || Ie.Bottom, m = (c == null ? void 0 : c.position) || Ie.Top, g = Or(i, s, d), y = Or(l, c, m);
  return { sourceX: g.x, sourceY: g.y, targetX: y.x, targetY: y.y, sourcePosition: d, targetPosition: m };
}
function Qx(e12) {
  if (!e12)
    return null;
  const i = [], l = [];
  for (const a of e12)
    a.width = a.width ?? 1, a.height = a.height ?? 1, a.type === "source" ? i.push(a) : a.type === "target" && l.push(a);
  return { source: i, target: l };
}
function Or(e12, i, l = Ie.Left, a = false) {
  const o = ((i == null ? void 0 : i.x) ?? 0) + e12.internals.positionAbsolute.x, s = ((i == null ? void 0 : i.y) ?? 0) + e12.internals.positionAbsolute.y, { width: c, height: d } = i ?? pi(e12);
  if (a)
    return { x: o + c / 2, y: s + d / 2 };
  switch ((i == null ? void 0 : i.position) ?? l) {
    case Ie.Top:
      return { x: o + c / 2, y: s };
    case Ie.Right:
      return { x: o + c, y: s + d / 2 };
    case Ie.Bottom:
      return { x: o + c / 2, y: s + d };
    case Ie.Left:
      return { x: o, y: s + d / 2 };
  }
}
function Zx(e12, i) {
  return e12 && (i ? e12.find((l) => l.id === i) : e12[0]) || null;
}
function Um(e12, i) {
  return e12 ? typeof e12 == "string" ? e12 : `${i ? `${i}__` : ""}${Object.keys(e12).sort().map((a) => `${a}=${e12[a]}`).join("&")}` : "";
}
function i3(e12, { id: i, defaultColor: l, defaultMarkerStart: a, defaultMarkerEnd: o }) {
  const s = /* @__PURE__ */ new Set();
  return e12.reduce((c, d) => ([d.markerStart || a, d.markerEnd || o].forEach((m) => {
    if (m && typeof m == "object") {
      const g = Um(m, i);
      s.has(g) || (c.push({ id: g, color: m.color || l, ...m }), s.add(g));
    }
  }), c), []).sort((c, d) => c.id.localeCompare(d.id));
}
const Bw = 1e3, l3 = 10, Np = { nodeOrigin: [0, 0], nodeExtent: so, elevateNodesOnSelect: true, zIndexMode: "basic", defaults: {} }, r3 = { ...Np, checkEquality: true };
function _p(e12, i) {
  const l = { ...e12 };
  for (const a in i)
    i[a] !== void 0 && (l[a] = i[a]);
  return l;
}
function a3(e12, i, l) {
  const a = _p(Np, l);
  for (const o of e12.values())
    if (o.parentId)
      Tp(o, e12, i, a);
    else {
      const s = vo(o, a.nodeOrigin), c = Dr(o.extent) ? o.extent : a.nodeExtent, d = jr(s, c, pi(o));
      o.internals.positionAbsolute = d;
    }
}
function u3(e12, i) {
  if (!e12.handles)
    return e12.measured ? i == null ? void 0 : i.internals.handleBounds : void 0;
  const l = [], a = [];
  for (const o of e12.handles) {
    const s = { id: o.id, width: o.width ?? 1, height: o.height ?? 1, nodeId: e12.id, x: o.x, y: o.y, position: o.position, type: o.type };
    o.type === "source" ? l.push(s) : o.type === "target" && a.push(s);
  }
  return { source: l, target: a };
}
function zp(e12) {
  return e12 === "manual";
}
function Im(e12, i, l, a = {}) {
  var y, p;
  const o = _p(r3, a), s = { i: 0 }, c = new Map(i), d = o != null && o.elevateNodesOnSelect && !zp(o.zIndexMode) ? Bw : 0;
  let m = e12.length > 0, g = false;
  i.clear(), l.clear();
  for (const x of e12) {
    let v = c.get(x.id);
    if (o.checkEquality && x === (v == null ? void 0 : v.internals.userNode))
      i.set(x.id, v);
    else {
      const S = vo(x, o.nodeOrigin), E = Dr(x.extent) ? x.extent : o.nodeExtent, N = jr(S, E, pi(x));
      v = { ...o.defaults, ...x, measured: { width: (y = x.measured) == null ? void 0 : y.width, height: (p = x.measured) == null ? void 0 : p.height }, internals: { positionAbsolute: N, handleBounds: u3(x, v), z: Uw(x, d, o.zIndexMode), userNode: x } }, i.set(x.id, v);
    }
    (v.measured === void 0 || v.measured.width === void 0 || v.measured.height === void 0) && !v.hidden && (m = false), x.parentId && Tp(v, i, l, a, s), g || (g = x.selected ?? false);
  }
  return { nodesInitialized: m, hasSelectedNodes: g };
}
function o3(e12, i) {
  if (!e12.parentId)
    return;
  const l = i.get(e12.parentId);
  l ? l.set(e12.id, e12) : i.set(e12.parentId, /* @__PURE__ */ new Map([[e12.id, e12]]));
}
function Tp(e12, i, l, a, o) {
  const { elevateNodesOnSelect: s, nodeOrigin: c, nodeExtent: d, zIndexMode: m } = _p(Np, a), g = e12.parentId, y = i.get(g);
  if (!y) {
    console.warn(`Parent node ${g} not found. Please make sure that parent nodes are in front of their child nodes in the nodes array.`);
    return;
  }
  o3(e12, l), o && !y.parentId && y.internals.rootParentIndex === void 0 && m === "auto" && (y.internals.rootParentIndex = ++o.i, y.internals.z = y.internals.z + o.i * l3), o && y.internals.rootParentIndex !== void 0 && (o.i = y.internals.rootParentIndex);
  const p = s && !zp(m) ? Bw : 0, { x, y: v, z: S } = s3(e12, y, c, d, p, m), { positionAbsolute: E } = e12.internals, N = x !== E.x || v !== E.y;
  (N || S !== e12.internals.z) && i.set(e12.id, { ...e12, internals: { ...e12.internals, positionAbsolute: N ? { x, y: v } : E, z: S } });
}
function Uw(e12, i, l) {
  const a = si(e12.zIndex) ? e12.zIndex : 0;
  return zp(l) ? a : a + (e12.selected ? i : 0);
}
function s3(e12, i, l, a, o, s) {
  const { x: c, y: d } = i.internals.positionAbsolute, m = pi(e12), g = vo(e12, l), y = Dr(e12.extent) ? jr(g, e12.extent, m) : g;
  let p = jr({ x: c + y.x, y: d + y.y }, a, m);
  e12.extent === "parent" && (p = Cw(p, m, i));
  const x = Uw(e12, o, s), v = i.internals.z ?? 0;
  return { x: p.x, y: p.y, z: v >= x ? v + 1 : x };
}
function Ap(e12, i, l, a = [0, 0]) {
  var c;
  const o = [], s = /* @__PURE__ */ new Map();
  for (const d of e12) {
    const m = i.get(d.parentId);
    if (!m)
      continue;
    const g = ((c = s.get(d.parentId)) == null ? void 0 : c.expandedRect) ?? fo(m), y = kw(g, d.rect);
    s.set(d.parentId, { expandedRect: y, parent: m });
  }
  return s.size > 0 && s.forEach(({ expandedRect: d, parent: m }, g) => {
    var k;
    const y = m.internals.positionAbsolute, p = pi(m), x = m.origin ?? a, v = d.x < y.x ? Math.round(Math.abs(y.x - d.x)) : 0, S = d.y < y.y ? Math.round(Math.abs(y.y - d.y)) : 0, E = Math.max(p.width, Math.round(d.width)), N = Math.max(p.height, Math.round(d.height)), C = (E - p.width) * x[0], A = (N - p.height) * x[1];
    (v > 0 || S > 0 || C || A) && (o.push({ id: g, type: "position", position: { x: m.position.x - v + C, y: m.position.y - S + A } }), (k = l.get(g)) == null || k.forEach((T) => {
      e12.some((Y) => Y.id === T.id) || o.push({ id: T.id, type: "position", position: { x: T.position.x + v, y: T.position.y + S } });
    })), (p.width < d.width || p.height < d.height || v || S) && o.push({ id: g, type: "dimensions", setAttributes: true, dimensions: { width: E + (v ? x[0] * v - C : 0), height: N + (S ? x[1] * S - A : 0) } });
  }), o;
}
function c3(e12, i, l, a, o, s, c) {
  const d = a == null ? void 0 : a.querySelector(".xyflow__viewport");
  let m = false;
  if (!d)
    return { changes: [], updatedInternals: m };
  const g = [], y = window.getComputedStyle(d), { m22: p } = new window.DOMMatrixReadOnly(y.transform), x = [];
  for (const v of e12.values()) {
    const S = i.get(v.id);
    if (!S)
      continue;
    if (S.hidden) {
      i.set(S.id, { ...S, internals: { ...S.internals, handleBounds: void 0 } }), m = true;
      continue;
    }
    const E = kp(v.nodeElement), N = S.measured.width !== E.width || S.measured.height !== E.height;
    if (!!(E.width && E.height && (N || !S.internals.handleBounds || v.force))) {
      const A = v.nodeElement.getBoundingClientRect(), k = Dr(S.extent) ? S.extent : s;
      let { positionAbsolute: T } = S.internals;
      if (S.parentId && S.extent === "parent") {
        const M = i.get(S.parentId);
        M && (T = Cw(T, E, M));
      } else
        k && (T = jr(T, k, E));
      const Y = { ...S, measured: E, internals: { ...S.internals, positionAbsolute: T, handleBounds: { source: Vx("source", v.nodeElement, A, p, S.id), target: Vx("target", v.nodeElement, A, p, S.id) } } };
      i.set(S.id, Y), S.parentId && Tp(Y, i, l, { nodeOrigin: o, zIndexMode: c }), m = true, N && (g.push({ id: S.id, type: "dimensions", dimensions: E }), S.expandParent && S.parentId && x.push({ id: S.id, parentId: S.parentId, rect: fo(Y, o) }));
    }
  }
  if (x.length > 0) {
    const v = Ap(x, i, l, o);
    g.push(...v);
  }
  return { changes: g, updatedInternals: m };
}
async function f3({ delta: e12, panZoom: i, transform: l, translateExtent: a, width: o, height: s }) {
  if (!i || !e12.x && !e12.y)
    return false;
  const c = await i.setViewportConstrained({ x: l[0] + e12.x, y: l[1] + e12.y, zoom: l[2] }, [[0, 0], [o, s]], a);
  return !!c && (c.x !== l[0] || c.y !== l[1] || c.k !== l[2]);
}
function Fx(e12, i, l, a, o, s) {
  let c = o;
  const d = a.get(c) || /* @__PURE__ */ new Map();
  a.set(c, d.set(l, i)), c = `${o}-${e12}`;
  const m = a.get(c) || /* @__PURE__ */ new Map();
  if (a.set(c, m.set(l, i)), s) {
    c = `${o}-${e12}-${s}`;
    const g = a.get(c) || /* @__PURE__ */ new Map();
    a.set(c, g.set(l, i));
  }
}
function Iw(e12, i, l) {
  e12.clear(), i.clear();
  for (const a of l) {
    const { source: o, target: s, sourceHandle: c = null, targetHandle: d = null } = a, m = { edgeId: a.id, source: o, target: s, sourceHandle: c, targetHandle: d }, g = `${o}-${c}--${s}-${d}`, y = `${s}-${d}--${o}-${c}`;
    Fx("source", m, y, e12, o, c), Fx("target", m, g, e12, s, d), i.set(a.id, a);
  }
}
function qw(e12, i) {
  if (!e12.parentId)
    return false;
  const l = i.get(e12.parentId);
  return l ? l.selected ? true : qw(l, i) : false;
}
function Kx(e12, i, l) {
  var o;
  let a = e12;
  do {
    if ((o = a == null ? void 0 : a.matches) != null && o.call(a, i))
      return true;
    if (a === l)
      return false;
    a = a == null ? void 0 : a.parentElement;
  } while (a);
  return false;
}
function d3(e12, i, l, a, o) {
  const s = /* @__PURE__ */ new Map();
  for (const [c, d] of e12)
    if ((o ? d.id === a : d.selected || d.id === a) && (o || !d.parentId || !qw(d, e12)) && (d.draggable || i && typeof d.draggable > "u")) {
      const g = e12.get(c);
      g && s.set(c, { id: c, position: g.position || { x: 0, y: 0 }, distance: { x: l.x - g.internals.positionAbsolute.x, y: l.y - g.internals.positionAbsolute.y }, extent: g.extent, parentId: g.parentId, origin: g.origin, expandParent: g.expandParent, internals: { positionAbsolute: g.internals.positionAbsolute || { x: 0, y: 0 } }, measured: { width: g.measured.width ?? 0, height: g.measured.height ?? 0 } });
    }
  return s;
}
function Jh({ nodeId: e12, dragItems: i, nodeLookup: l, dragging: a = true }) {
  var c, d, m;
  const o = [];
  for (const [g, y] of i) {
    const p = (c = l.get(g)) == null ? void 0 : c.internals.userNode;
    p && o.push({ ...p, position: y.position, dragging: a });
  }
  if (!e12)
    return [o[0], o];
  const s = (d = l.get(e12)) == null ? void 0 : d.internals.userNode;
  return [s ? { ...s, position: ((m = i.get(e12)) == null ? void 0 : m.position) || s.position, dragging: a } : o[0], o];
}
function h3({ dragItems: e12, snapGrid: i, x: l, y: a }) {
  const o = e12.values().next().value;
  if (!o)
    return null;
  const s = { x: l - o.distance.x, y: a - o.distance.y }, c = wo(s, i);
  return { x: c.x - s.x, y: c.y - s.y };
}
function m3({ onNodeMouseDown: e12, getStoreItems: i, onDragStart: l, onDrag: a, onDragStop: o }) {
  let s = { x: null, y: null }, c = 0, d = /* @__PURE__ */ new Map(), m = false, g = { x: 0, y: 0 }, y = null, p = false, x = null, v = false, S = false, E = null;
  function N({ noDragClassName: A, handleSelector: k, domNode: T, isSelectable: Y, nodeId: M, nodeClickDistance: B = 0 }) {
    x = Bn(T);
    function G({ x: ie, y: re }) {
      const { nodeLookup: j, nodeExtent: D, snapGrid: H, snapToGrid: V, nodeOrigin: $, onNodeDrag: F, onSelectionDrag: _, onError: se, updateNodePositions: he } = i();
      s = { x: ie, y: re };
      let R = false;
      const O = d.size > 1, te = O && D ? Hm(bo(d)) : null, pe = O && V ? h3({ dragItems: d, snapGrid: H, x: ie, y: re }) : null;
      for (const [me, ne] of d) {
        if (!j.has(me))
          continue;
        let xe = { x: ie - ne.distance.x, y: re - ne.distance.y };
        V && (xe = pe ? { x: Math.round(xe.x + pe.x), y: Math.round(xe.y + pe.y) } : wo(xe, H));
        let Se = null;
        if (O && D && !ne.extent && te) {
          const { positionAbsolute: we } = ne.internals, Ce = we.x - te.x + D[0][0], Te = we.x + ne.measured.width - te.x2 + D[1][0], Ae = we.y - te.y + D[0][1], Ee = we.y + ne.measured.height - te.y2 + D[1][1];
          Se = [[Ce, Ae], [Te, Ee]];
        }
        const { position: fe, positionAbsolute: q } = Ew({ nodeId: me, nextPosition: xe, nodeLookup: j, nodeExtent: Se || D, nodeOrigin: $, onError: se });
        R = R || ne.position.x !== fe.x || ne.position.y !== fe.y, ne.position = fe, ne.internals.positionAbsolute = q;
      }
      if (S = S || R, !!R && (he(d, true), E && (a || F || !M && _))) {
        const [me, ne] = Jh({ nodeId: M, dragItems: d, nodeLookup: j });
        a == null || a(E, d, me, ne), F == null || F(E, me, ne), M || _ == null || _(E, ne);
      }
    }
    async function J() {
      if (!y)
        return;
      const { transform: ie, panBy: re, autoPanSpeed: j, autoPanOnNodeDrag: D } = i();
      if (!D) {
        m = false, cancelAnimationFrame(c);
        return;
      }
      const [H, V] = Ep(g, y, j);
      (H !== 0 || V !== 0) && (s.x = (s.x ?? 0) - H / ie[2], s.y = (s.y ?? 0) - V / ie[2], await re({ x: H, y: V }) && G(s)), c = requestAnimationFrame(J);
    }
    function U(ie) {
      var te, pe;
      const { nodeLookup: re, multiSelectionActive: j, nodesDraggable: D, transform: H, snapGrid: V, snapToGrid: $, selectNodesOnDrag: F, onNodeDragStart: _, onSelectionDragStart: se, unselectNodesAndEdges: he } = i();
      p = true;
      const R = !!M && !j && !((te = re.get(M)) != null && te.selected);
      (!F || !Y) && !j && M && ((pe = re.get(M)) != null && pe.selected || he()), Y && F && M && (e12 == null || e12(M));
      const O = Ju(ie.sourceEvent, { transform: H, snapGrid: V, snapToGrid: $, containerBounds: y });
      if (s = O, d = d3(re, D, O, M, R), d.size > 0 && (l || _ || !M && se)) {
        const [me, ne] = Jh({ nodeId: M, dragItems: d, nodeLookup: re });
        l == null || l(ie.sourceEvent, d, me, ne), _ == null || _(ie.sourceEvent, me, ne), M || se == null || se(ie.sourceEvent, ne);
      }
    }
    const X = Qb().clickDistance(B).on("start", (ie) => {
      const { domNode: re, nodeDragThreshold: j, transform: D, snapGrid: H, snapToGrid: V } = i();
      y = (re == null ? void 0 : re.getBoundingClientRect()) || null, v = false, S = false, E = ie.sourceEvent, j === 0 && U(ie), s = Ju(ie.sourceEvent, { transform: D, snapGrid: H, snapToGrid: V, containerBounds: y }), g = ci(ie.sourceEvent, y);
    }).on("drag", (ie) => {
      const { autoPanOnNodeDrag: re, transform: j, snapGrid: D, snapToGrid: H, nodeDragThreshold: V, nodeLookup: $ } = i(), F = Ju(ie.sourceEvent, { transform: j, snapGrid: D, snapToGrid: H, containerBounds: y });
      if (E = ie.sourceEvent, (ie.sourceEvent.type === "touchmove" && ie.sourceEvent.touches.length > 1 || M && !$.has(M)) && (v = true), !v) {
        if (!m && re && p && (m = true, J()), !p) {
          const _ = ci(ie.sourceEvent, y), se = _.x - g.x, he = _.y - g.y;
          Math.sqrt(se * se + he * he) > V && U(ie);
        }
        (s.x !== F.xSnapped || s.y !== F.ySnapped) && d && p && (g = ci(ie.sourceEvent, y), G(F));
      }
    }).on("end", (ie) => {
      if (!p || v) {
        v && d.size > 0 && i().updateNodePositions(d, false);
        return;
      }
      if (m = false, p = false, cancelAnimationFrame(c), d.size > 0) {
        const { nodeLookup: re, updateNodePositions: j, onNodeDragStop: D, onSelectionDragStop: H } = i();
        if (S && (j(d, false), S = false), o || D || !M && H) {
          const [V, $] = Jh({ nodeId: M, dragItems: d, nodeLookup: re, dragging: false });
          o == null || o(ie.sourceEvent, d, V, $), D == null || D(ie.sourceEvent, V, $), M || H == null || H(ie.sourceEvent, $);
        }
      }
    }).filter((ie) => {
      const re = ie.target;
      return !ie.button && (!A || !Kx(re, `.${A}`, T)) && (!k || Kx(re, k, T));
    });
    x.call(X);
  }
  function C() {
    x == null || x.on(".drag", null);
  }
  return { update: N, destroy: C };
}
function p3(e12, i, l) {
  const a = [], o = { x: e12.x - l, y: e12.y - l, width: l * 2, height: l * 2 };
  for (const s of i.values())
    jc(o, fo(s)) > 0 && a.push(s);
  return a;
}
const g3 = 250;
function y3(e12, i, l, a) {
  var d, m;
  let o = [], s = 1 / 0;
  const c = p3(e12, l, i + g3);
  for (const g of c) {
    const y = [...((d = g.internals.handleBounds) == null ? void 0 : d.source) ?? [], ...((m = g.internals.handleBounds) == null ? void 0 : m.target) ?? []];
    for (const p of y) {
      if (a.nodeId === p.nodeId && a.type === p.type && a.id === p.id)
        continue;
      const { x, y: v } = Or(g, p, p.position, true), S = Math.sqrt(Math.pow(x - e12.x, 2) + Math.pow(v - e12.y, 2));
      S > i || (S < s ? (o = [{ ...p, x, y: v }], s = S) : S === s && o.push({ ...p, x, y: v }));
    }
  }
  if (!o.length)
    return null;
  if (o.length > 1) {
    const g = a.type === "source" ? "target" : "source";
    return o.find((y) => y.type === g) ?? o[0];
  }
  return o[0];
}
function Vw(e12, i, l, a, o, s = false) {
  var g, y, p;
  const c = a.get(e12);
  if (!c)
    return null;
  const d = o === "strict" ? (g = c.internals.handleBounds) == null ? void 0 : g[i] : [...((y = c.internals.handleBounds) == null ? void 0 : y.source) ?? [], ...((p = c.internals.handleBounds) == null ? void 0 : p.target) ?? []], m = (l ? d == null ? void 0 : d.find((x) => x.id === l) : d == null ? void 0 : d[0]) ?? null;
  return m && s ? { ...m, ...Or(c, m, m.position, true) } : m;
}
function Yw(e12, i) {
  return e12 || (i != null && i.classList.contains("target") ? "target" : i != null && i.classList.contains("source") ? "source" : null);
}
function x3(e12, i) {
  let l = null;
  return i ? l = true : e12 && !i && (l = false), l;
}
const Xw = () => true;
function v3(e12, { connectionMode: i, connectionRadius: l, handleId: a, nodeId: o, edgeUpdaterType: s, isTarget: c, domNode: d, nodeLookup: m, lib: g, autoPanOnConnect: y, flowId: p, panBy: x, cancelConnection: v, onConnectStart: S, onConnect: E, onConnectEnd: N, isValidConnection: C = Xw, onReconnectEnd: A, updateConnection: k, getTransform: T, getFromHandle: Y, autoPanSpeed: M, dragThreshold: B = 1, handleDomNode: G }) {
  const J = Mw(e12.target);
  let U = 0, X;
  const { x: ie, y: re } = ci(e12), j = Yw(s, G), D = d == null ? void 0 : d.getBoundingClientRect();
  let H = false;
  if (!D || !j)
    return;
  const V = Vw(o, j, a, m, i);
  if (!V)
    return;
  let $ = ci(e12, D), F = false, _ = null, se = false, he = null;
  function R() {
    if (!y || !D)
      return;
    const [fe, q] = Ep($, D, M);
    x({ x: fe, y: q }), U = requestAnimationFrame(R);
  }
  const O = { ...V, nodeId: o, type: j, position: V.position }, te = m.get(o);
  let me = { inProgress: true, isValid: null, from: Or(te, O, Ie.Left, true), fromHandle: O, fromPosition: O.position, fromNode: te, to: $, toHandle: null, toPosition: Bx[O.position], toNode: null, pointer: $ };
  function ne() {
    H = true, k(me), S == null || S(e12, { nodeId: o, handleId: a, handleType: j });
  }
  B === 0 && ne();
  function xe(fe) {
    if (!H) {
      const { x: Ee, y: qe } = ci(fe), Le = Ee - ie, pt = qe - re;
      if (!(Le * Le + pt * pt > B * B))
        return;
      ne();
    }
    if (!Y() || !O) {
      Se(fe);
      return;
    }
    const q = T();
    $ = ci(fe, D), X = y3(So($, q, false, [1, 1]), l, m, O), F || (R(), F = true);
    const we = Gw(fe, { handle: X, connectionMode: i, fromNodeId: o, fromHandleId: a, fromType: c ? "target" : "source", isValidConnection: C, doc: J, lib: g, flowId: p, nodeLookup: m });
    he = we.handleDomNode, _ = we.connection, se = x3(!!X, we.isValid);
    const Ce = m.get(o), Te = Ce ? Or(Ce, O, Ie.Left, true) : me.from, Ae = { ...me, from: Te, isValid: se, to: we.toHandle && se ? qa({ x: we.toHandle.x, y: we.toHandle.y }, q) : $, toHandle: we.toHandle, toPosition: se && we.toHandle ? we.toHandle.position : Bx[O.position], toNode: we.toHandle ? m.get(we.toHandle.nodeId) : null, pointer: $ };
    k(Ae), me = Ae;
  }
  function Se(fe) {
    if (!("touches" in fe && fe.touches.length > 0)) {
      if (H) {
        (X || he) && _ && se && (E == null || E(_));
        const { inProgress: q, ...we } = me, Ce = { ...we, toPosition: me.toHandle ? me.toPosition : null };
        N == null || N(fe, Ce), s && (A == null || A(fe, Ce));
      }
      v(), cancelAnimationFrame(U), F = false, se = false, _ = null, he = null, J.removeEventListener("mousemove", xe), J.removeEventListener("mouseup", Se), J.removeEventListener("touchmove", xe), J.removeEventListener("touchend", Se);
    }
  }
  J.addEventListener("mousemove", xe), J.addEventListener("mouseup", Se), J.addEventListener("touchmove", xe), J.addEventListener("touchend", Se);
}
function Gw(e12, { handle: i, connectionMode: l, fromNodeId: a, fromHandleId: o, fromType: s, doc: c, lib: d, flowId: m, isValidConnection: g = Xw, nodeLookup: y }) {
  const p = s === "target", x = i ? c.querySelector(`.${d}-flow__handle[data-id="${m}-${i == null ? void 0 : i.nodeId}-${i == null ? void 0 : i.id}-${i == null ? void 0 : i.type}"]`) : null, { x: v, y: S } = ci(e12), E = c.elementFromPoint(v, S), N = E != null && E.classList.contains(`${d}-flow__handle`) ? E : x, C = { handleDomNode: N, isValid: false, connection: null, toHandle: null };
  if (N) {
    const A = Yw(void 0, N), k = N.getAttribute("data-nodeid"), T = N.getAttribute("data-handleid"), Y = N.classList.contains("connectable"), M = N.classList.contains("connectableend");
    if (!k || !A)
      return C;
    const B = { source: p ? k : a, sourceHandle: p ? T : o, target: p ? a : k, targetHandle: p ? o : T };
    C.connection = B;
    const J = Y && M && (l === Ua.Strict ? p && A === "source" || !p && A === "target" : k !== a || T !== o);
    C.isValid = J && g(B), C.toHandle = Vw(k, A, T, y, l, true);
  }
  return C;
}
const qm = { onPointerDown: v3, isValid: Gw };
function b3({ domNode: e12, panZoom: i, getTransform: l, getViewScale: a }) {
  const o = Bn(e12);
  function s({ translateExtent: d, width: m, height: g, zoomStep: y = 1, pannable: p = true, zoomable: x = true, inversePan: v = false }) {
    const S = (k) => {
      if (k.sourceEvent.type !== "wheel" || !i)
        return;
      const T = l(), Y = k.sourceEvent.ctrlKey && ho() ? 10 : 1, M = -k.sourceEvent.deltaY * (k.sourceEvent.deltaMode === 1 ? 0.05 : k.sourceEvent.deltaMode ? 1 : 2e-3) * y, B = T[2] * Math.pow(2, M * Y);
      i.scaleTo(B);
    };
    let E = [0, 0];
    const N = (k) => {
      (k.sourceEvent.type === "mousedown" || k.sourceEvent.type === "touchstart") && (E = [k.sourceEvent.clientX ?? k.sourceEvent.touches[0].clientX, k.sourceEvent.clientY ?? k.sourceEvent.touches[0].clientY]);
    }, C = (k) => {
      const T = l();
      if (k.sourceEvent.type !== "mousemove" && k.sourceEvent.type !== "touchmove" || !i)
        return;
      const Y = [k.sourceEvent.clientX ?? k.sourceEvent.touches[0].clientX, k.sourceEvent.clientY ?? k.sourceEvent.touches[0].clientY], M = [Y[0] - E[0], Y[1] - E[1]];
      E = Y;
      const B = a() * Math.max(T[2], Math.log(T[2])) * (v ? -1 : 1), G = { x: T[0] - M[0] * B, y: T[1] - M[1] * B }, J = [[0, 0], [m, g]];
      i.setViewportConstrained({ x: G.x, y: G.y, zoom: T[2] }, J, d);
    }, A = xw().on("start", N).on("zoom", p ? C : null).on("zoom.wheel", x ? S : null);
    o.call(A, {});
  }
  function c() {
    o.on("zoom", null);
  }
  return { update: s, destroy: c, pointer: ui };
}
const Pc = (e12) => ({ x: e12.x, y: e12.y, zoom: e12.k }), Wh = ({ x: e12, y: i, zoom: l }) => Zc.translate(e12, i).scale(l), Il = (e12, i) => e12.target.closest(`.${i}`), $w = (e12, i) => i === 2 && Array.isArray(e12) && e12.includes(2), w3 = (e12) => ((e12 *= 2) <= 1 ? e12 * e12 * e12 : (e12 -= 2) * e12 * e12 + 2) / 2, em = (e12, i = 0, l = w3, a = () => {
}) => {
  const o = typeof i == "number" && i > 0;
  return o || a(), o ? e12.transition().duration(i).ease(l).on("end", a) : e12;
}, Qw = (e12) => {
  const i = e12.ctrlKey && ho() ? 10 : 1;
  return -e12.deltaY * (e12.deltaMode === 1 ? 0.05 : e12.deltaMode ? 1 : 2e-3) * i;
};
function S3({ zoomPanValues: e12, noWheelClassName: i, d3Selection: l, d3Zoom: a, panOnScrollMode: o, panOnScrollSpeed: s, zoomOnPinch: c, onPanZoomStart: d, onPanZoom: m, onPanZoomEnd: g }) {
  return (y) => {
    if (Il(y, i))
      return y.ctrlKey && y.preventDefault(), false;
    y.preventDefault(), y.stopImmediatePropagation();
    const p = l.property("__zoom").k || 1;
    if (y.ctrlKey && c) {
      const N = ui(y), C = Qw(y), A = p * Math.pow(2, C);
      a.scaleTo(l, A, N, y);
      return;
    }
    const x = y.deltaMode === 1 ? 20 : 1;
    let v = o === kr.Vertical ? 0 : y.deltaX * x, S = o === kr.Horizontal ? 0 : y.deltaY * x;
    !ho() && y.shiftKey && o !== kr.Vertical && (v = y.deltaY * x, S = 0), a.translateBy(l, -(v / p) * s, -(S / p) * s, { internal: true });
    const E = Pc(l.property("__zoom"));
    clearTimeout(e12.panScrollTimeout), e12.isPanScrolling ? m == null || m(y, E) : (e12.isPanScrolling = true, d == null || d(y, E)), e12.panScrollTimeout = setTimeout(() => {
      g == null || g(y, E), e12.isPanScrolling = false;
    }, 150);
  };
}
function E3({ noWheelClassName: e12, preventScrolling: i, d3ZoomHandler: l }) {
  return function(a, o) {
    const s = a.type === "wheel", c = !i && s && !a.ctrlKey, d = Il(a, e12);
    if (a.ctrlKey && s && d && a.preventDefault(), c || d)
      return null;
    a.preventDefault(), l.call(this, a, o);
  };
}
function C3({ zoomPanValues: e12, onDraggingChange: i, onPanZoomStart: l }) {
  return (a) => {
    var s, c, d;
    if ((s = a.sourceEvent) != null && s.internal)
      return;
    const o = Pc(a.transform);
    e12.mouseButton = ((c = a.sourceEvent) == null ? void 0 : c.button) || 0, e12.isZoomingOrPanning = true, e12.prevViewport = o, ((d = a.sourceEvent) == null ? void 0 : d.type) === "mousedown" && i(true), l && (l == null || l(a.sourceEvent, o));
  };
}
function k3({ zoomPanValues: e12, panOnDrag: i, onPaneContextMenu: l, onTransformChange: a, onPanZoom: o }) {
  return (s) => {
    var c, d;
    e12.usedRightMouseButton = !!(l && $w(i, e12.mouseButton ?? 0)), (c = s.sourceEvent) != null && c.sync || a([s.transform.x, s.transform.y, s.transform.k]), o && !((d = s.sourceEvent) != null && d.internal) && (o == null || o(s.sourceEvent, Pc(s.transform)));
  };
}
function N3({ zoomPanValues: e12, panOnDrag: i, panOnScroll: l, onDraggingChange: a, onPanZoomEnd: o, onPaneContextMenu: s }) {
  return (c) => {
    var d;
    if (!((d = c.sourceEvent) != null && d.internal) && (e12.isZoomingOrPanning = false, s && $w(i, e12.mouseButton ?? 0) && !e12.usedRightMouseButton && c.sourceEvent && s(c.sourceEvent), e12.usedRightMouseButton = false, a(false), o)) {
      const m = Pc(c.transform);
      e12.prevViewport = m, clearTimeout(e12.timerId), e12.timerId = setTimeout(() => {
        o == null || o(c.sourceEvent, m);
      }, l ? 150 : 0);
    }
  };
}
function _3({ panActivationKeyPressed: e12, zoomActivationKeyPressed: i, zoomOnScroll: l, zoomOnPinch: a, panOnDrag: o, panOnScroll: s, zoomOnDoubleClick: c, userSelectionActive: d, noWheelClassName: m, noPanClassName: g, lib: y, connectionInProgress: p }) {
  return (x) => {
    var C;
    const v = i || l, S = a && x.ctrlKey, E = x.type === "wheel";
    if (x.button === 1 && x.type === "mousedown" && (Il(x, `${y}-flow__node`) || Il(x, `${y}-flow__edge`) || Il(x, `${y}-flow__selection`) || Il(x, `${y}-flow__nodesselection`)))
      return true;
    if (!o && !v && !s && !c && !a || d || p && !E || Il(x, m) && E || Il(x, g) && (!E || s && E && !i) || !a && x.ctrlKey && E)
      return false;
    if (!a && x.type === "touchstart" && ((C = x.touches) == null ? void 0 : C.length) > 1)
      return x.preventDefault(), false;
    if (!v && !s && !S && E || !o && (x.type === "mousedown" || x.type === "touchstart") || Array.isArray(o) && !o.includes(x.button) && x.type === "mousedown")
      return false;
    const N = Array.isArray(o) && o.includes(x.button) || !x.button || x.button <= 1;
    return (!x.ctrlKey || E || e12) && N;
  };
}
function z3({ domNode: e12, minZoom: i, maxZoom: l, translateExtent: a, viewport: o, onPanZoom: s, onPanZoomStart: c, onPanZoomEnd: d, onDraggingChange: m }) {
  const g = { isZoomingOrPanning: false, usedRightMouseButton: false, prevViewport: {}, mouseButton: 0, timerId: void 0, panScrollTimeout: void 0, isPanScrolling: false }, y = e12.getBoundingClientRect();
  let p = [[0, 0], [y.width, y.height]];
  const x = typeof ResizeObserver < "u" ? new ResizeObserver((re) => {
    const j = re[0];
    j != null && j.contentRect && (p = [[0, 0], [j.contentRect.width, j.contentRect.height]]);
  }) : null;
  x == null || x.observe(e12);
  const v = xw().extent(() => p).scaleExtent([i, l]).translateExtent(a), S = Bn(e12).call(v);
  T({ x: o.x, y: o.y, zoom: Ia(o.zoom, i, l) }, [[0, 0], [y.width, y.height]], a);
  const E = S.on("wheel.zoom"), N = S.on("dblclick.zoom");
  v.wheelDelta(Qw);
  async function C(re, j) {
    return S ? new Promise((D) => {
      v == null || v.interpolate((j == null ? void 0 : j.interpolate) === "linear" ? Pu : pc).transform(em(S, j == null ? void 0 : j.duration, j == null ? void 0 : j.ease, () => D(true)), re);
    }) : false;
  }
  function A({ noWheelClassName: re, noPanClassName: j, onPaneContextMenu: D, userSelectionActive: H, panOnScroll: V, panOnDrag: $, panOnScrollMode: F, panOnScrollSpeed: _, preventScrolling: se, zoomOnPinch: he, zoomOnScroll: R, zoomOnDoubleClick: O, panActivationKeyPressed: te = false, zoomActivationKeyPressed: pe, lib: me, onTransformChange: ne, connectionInProgress: xe, paneClickDistance: Se, selectionOnDrag: fe }) {
    H && !g.isZoomingOrPanning && v.on("zoom", null);
    const q = V && !pe && !H;
    v.clickDistance(fe ? 1 / 0 : !si(Se) || Se < 0 ? 0 : Se);
    const we = q ? S3({ zoomPanValues: g, noWheelClassName: re, d3Selection: S, d3Zoom: v, panOnScrollMode: F, panOnScrollSpeed: _, zoomOnPinch: he, onPanZoomStart: c, onPanZoom: s, onPanZoomEnd: d }) : E3({ noWheelClassName: re, preventScrolling: se, d3ZoomHandler: E });
    S.on("wheel.zoom", we, { passive: false });
    const Ce = C3({ zoomPanValues: g, onDraggingChange: m, onPanZoomStart: c });
    v.on("start", Ce);
    const Te = k3({ zoomPanValues: g, panOnDrag: $, onPaneContextMenu: !!D, onPanZoom: s, onTransformChange: ne });
    v.on("zoom", Te);
    const Ae = N3({ zoomPanValues: g, panOnDrag: $, panOnScroll: V, onPaneContextMenu: D, onPanZoomEnd: d, onDraggingChange: m });
    v.on("end", Ae);
    const Ee = _3({ panActivationKeyPressed: te, zoomActivationKeyPressed: pe, panOnDrag: $, zoomOnScroll: R, panOnScroll: V, zoomOnDoubleClick: O, zoomOnPinch: he, userSelectionActive: H, noPanClassName: j, noWheelClassName: re, lib: me, connectionInProgress: xe });
    v.filter(Ee), O ? S.on("dblclick.zoom", N) : S.on("dblclick.zoom", null);
  }
  function k() {
    v.on("zoom", null), x == null || x.disconnect();
  }
  async function T(re, j, D) {
    const H = Wh(re), V = v == null ? void 0 : v.constrain()(H, j, D);
    return V && await C(V), V;
  }
  async function Y(re, j) {
    const D = Wh(re);
    return await C(D, j), D;
  }
  function M(re) {
    if (S) {
      const j = Wh(re), D = S.property("__zoom");
      (D.k !== re.zoom || D.x !== re.x || D.y !== re.y) && (v == null || v.transform(S, j, null, { sync: true }));
    }
  }
  function B() {
    const re = S ? yw(S.node()) : { x: 0, y: 0, k: 1 };
    return { x: re.x, y: re.y, zoom: re.k };
  }
  async function G(re, j) {
    return S ? new Promise((D) => {
      v == null || v.interpolate((j == null ? void 0 : j.interpolate) === "linear" ? Pu : pc).scaleTo(em(S, j == null ? void 0 : j.duration, j == null ? void 0 : j.ease, () => D(true)), re);
    }) : false;
  }
  async function J(re, j) {
    return S ? new Promise((D) => {
      v == null || v.interpolate((j == null ? void 0 : j.interpolate) === "linear" ? Pu : pc).scaleBy(em(S, j == null ? void 0 : j.duration, j == null ? void 0 : j.ease, () => D(true)), re);
    }) : false;
  }
  function U(re) {
    v == null || v.scaleExtent(re);
  }
  function X(re) {
    v == null || v.translateExtent(re);
  }
  function ie(re) {
    const j = !si(re) || re < 0 ? 0 : re;
    v == null || v.clickDistance(j);
  }
  return { update: A, destroy: k, setViewport: Y, setViewportConstrained: T, getViewport: B, scaleTo: G, scaleBy: J, setScaleExtent: U, setTranslateExtent: X, syncViewport: M, setClickDistance: ie };
}
var Va;
(function(e12) {
  e12.Line = "line", e12.Handle = "handle";
})(Va || (Va = {}));
function T3({ width: e12, prevWidth: i, height: l, prevHeight: a, affectsX: o, affectsY: s }) {
  const c = e12 - i, d = l - a, m = [c > 0 ? 1 : c < 0 ? -1 : 0, d > 0 ? 1 : d < 0 ? -1 : 0];
  return c && o && (m[0] = m[0] * -1), d && s && (m[1] = m[1] * -1), m;
}
function Px(e12) {
  const i = e12.includes("right") || e12.includes("left"), l = e12.includes("bottom") || e12.includes("top"), a = e12.includes("left"), o = e12.includes("top");
  return { isHorizontal: i, isVertical: l, affectsX: a, affectsY: o };
}
function Hl(e12, i) {
  return Math.max(0, i - e12);
}
function Bl(e12, i) {
  return Math.max(0, e12 - i);
}
function rc(e12, i, l) {
  return Math.max(0, i - e12, e12 - l);
}
function Jx(e12, i) {
  return e12 ? !i : i;
}
function A3(e12, i, l, a, o, s, c, d) {
  let { affectsX: m, affectsY: g } = i;
  const { isHorizontal: y, isVertical: p } = i, x = y && p, { xSnapped: v, ySnapped: S } = l, { minWidth: E, maxWidth: N, minHeight: C, maxHeight: A } = a, { x: k, y: T, width: Y, height: M, aspectRatio: B } = e12;
  let G = Math.floor(y ? v - e12.pointerX : 0), J = Math.floor(p ? S - e12.pointerY : 0);
  const U = Y + (m ? -G : G), X = M + (g ? -J : J), ie = -s[0] * Y, re = -s[1] * M;
  let j = rc(U, E, N), D = rc(X, C, A);
  if (c) {
    let $ = 0, F = 0;
    m && G < 0 ? $ = Hl(k + G + ie, c[0][0]) : !m && G > 0 && ($ = Bl(k + U + ie, c[1][0])), g && J < 0 ? F = Hl(T + J + re, c[0][1]) : !g && J > 0 && (F = Bl(T + X + re, c[1][1])), j = Math.max(j, $), D = Math.max(D, F);
  }
  if (d) {
    let $ = 0, F = 0;
    m && G > 0 ? $ = Bl(k + G, d[0][0]) : !m && G < 0 && ($ = Hl(k + U, d[1][0])), g && J > 0 ? F = Bl(T + J, d[0][1]) : !g && J < 0 && (F = Hl(T + X, d[1][1])), j = Math.max(j, $), D = Math.max(D, F);
  }
  if (o) {
    if (y) {
      const $ = rc(U / B, C, A) * B;
      if (j = Math.max(j, $), c) {
        let F = 0;
        !m && !g || m && !g && x ? F = Bl(T + re + U / B, c[1][1]) * B : F = Hl(T + re + (m ? G : -G) / B, c[0][1]) * B, j = Math.max(j, F);
      }
      if (d) {
        let F = 0;
        !m && !g || m && !g && x ? F = Hl(T + U / B, d[1][1]) * B : F = Bl(T + (m ? G : -G) / B, d[0][1]) * B, j = Math.max(j, F);
      }
    }
    if (p) {
      const $ = rc(X * B, E, N) / B;
      if (D = Math.max(D, $), c) {
        let F = 0;
        !m && !g || g && !m && x ? F = Bl(k + X * B + ie, c[1][0]) / B : F = Hl(k + (g ? J : -J) * B + ie, c[0][0]) / B, D = Math.max(D, F);
      }
      if (d) {
        let F = 0;
        !m && !g || g && !m && x ? F = Hl(k + X * B, d[1][0]) / B : F = Bl(k + (g ? J : -J) * B, d[0][0]) / B, D = Math.max(D, F);
      }
    }
  }
  J = J + (J < 0 ? D : -D), G = G + (G < 0 ? j : -j), o && (x ? U > X * B ? J = (Jx(m, g) ? -G : G) / B : G = (Jx(m, g) ? -J : J) * B : y ? (J = G / B, g = m) : (G = J * B, m = g));
  const H = m ? k + G : k, V = g ? T + J : T;
  return { width: Y + (m ? -G : G), height: M + (g ? -J : J), x: s[0] * G * (m ? -1 : 1) + H, y: s[1] * J * (g ? -1 : 1) + V };
}
const Zw = { width: 0, height: 0, x: 0, y: 0 }, M3 = { ...Zw, pointerX: 0, pointerY: 0, aspectRatio: 1 };
function j3(e12, i, l) {
  const a = i.position.x + e12.position.x, o = i.position.y + e12.position.y, s = e12.measured.width ?? 0, c = e12.measured.height ?? 0, d = l[0] * s, m = l[1] * c;
  return [[a - d, o - m], [a + s - d, o + c - m]];
}
function D3({ domNode: e12, nodeId: i, getStoreItems: l, onChange: a, onEnd: o }) {
  const s = Bn(e12);
  let c = { controlDirection: Px("bottom-right"), boundaries: { minWidth: 0, minHeight: 0, maxWidth: Number.MAX_VALUE, maxHeight: Number.MAX_VALUE }, resizeDirection: void 0, keepAspectRatio: false };
  function d({ controlPosition: g, boundaries: y, keepAspectRatio: p, resizeDirection: x, onResizeStart: v, onResize: S, onResizeEnd: E, shouldResize: N }) {
    let C = { ...Zw }, A = { ...M3 };
    c = { boundaries: y, resizeDirection: x, keepAspectRatio: p, controlDirection: Px(g) };
    let k, T = null, Y = [], M, B, G;
    const J = Qb().on("start", (U) => {
      const { nodeLookup: X, transform: ie, snapGrid: re, snapToGrid: j, nodeOrigin: D, paneDomNode: H } = l();
      if (k = X.get(i), !k)
        return;
      T = (H == null ? void 0 : H.getBoundingClientRect()) ?? null;
      const { xSnapped: V, ySnapped: $ } = Ju(U.sourceEvent, { transform: ie, snapGrid: re, snapToGrid: j, containerBounds: T });
      C = { width: k.measured.width ?? 0, height: k.measured.height ?? 0, x: k.position.x ?? 0, y: k.position.y ?? 0 }, A = { ...C, pointerX: V, pointerY: $, aspectRatio: C.width / C.height }, M = void 0, B = Dr(k.extent) ? k.extent : void 0, k.parentId && (k.extent === "parent" || k.expandParent) && (M = X.get(k.parentId)), M && k.extent === "parent" && (B = [[0, 0], [M.measured.width, M.measured.height]]), Y = [], G = void 0;
      for (const [F, _] of X)
        if (_.parentId === i && (Y.push({ id: F, position: { ..._.position }, extent: _.extent }), _.extent === "parent" || _.expandParent)) {
          const se = j3(_, k, _.origin ?? D);
          G ? G = [[Math.min(se[0][0], G[0][0]), Math.min(se[0][1], G[0][1])], [Math.max(se[1][0], G[1][0]), Math.max(se[1][1], G[1][1])]] : G = se;
        }
      v == null || v(U, { ...C });
    }).on("drag", (U) => {
      const { transform: X, snapGrid: ie, snapToGrid: re, nodeOrigin: j } = l(), D = Ju(U.sourceEvent, { transform: X, snapGrid: ie, snapToGrid: re, containerBounds: T }), H = [];
      if (!k)
        return;
      const { x: V, y: $, width: F, height: _ } = C, se = {}, he = k.origin ?? j, { width: R, height: O, x: te, y: pe } = A3(A, c.controlDirection, D, c.boundaries, c.keepAspectRatio, he, B, G), me = R !== F, ne = O !== _, xe = te !== V && me, Se = pe !== $ && ne;
      if (!xe && !Se && !me && !ne)
        return;
      const fe = { prevValues: { ...C }, startX: A.x, startY: A.y, childNodes: Y.map((Te) => ({ ...Te, position: { ...Te.position } })) };
      if ((xe || Se || he[0] === 1 || he[1] === 1) && (se.x = xe ? te : C.x, se.y = Se ? pe : C.y, C.x = se.x, C.y = se.y, Y.length > 0)) {
        const Te = te - V, Ae = pe - $;
        for (const Ee of Y)
          Ee.position = { x: Ee.position.x - Te + he[0] * (R - F), y: Ee.position.y - Ae + he[1] * (O - _) }, H.push(Ee);
      }
      if ((me || ne) && (se.width = me && (!c.resizeDirection || c.resizeDirection === "horizontal") ? R : C.width, se.height = ne && (!c.resizeDirection || c.resizeDirection === "vertical") ? O : C.height, C.width = se.width, C.height = se.height), M && k.expandParent) {
        const Te = he[0] * (se.width ?? 0);
        se.x && se.x < Te && (C.x = Te, A.x = A.x - (se.x - Te));
        const Ae = he[1] * (se.height ?? 0);
        se.y && se.y < Ae && (C.y = Ae, A.y = A.y - (se.y - Ae));
      }
      const q = T3({ width: C.width, prevWidth: F, height: C.height, prevHeight: _, affectsX: c.controlDirection.affectsX, affectsY: c.controlDirection.affectsY }), we = { ...C, direction: q };
      if ((N == null ? void 0 : N(U, we)) === false) {
        C = fe.prevValues, A.x = fe.startX, A.y = fe.startY, Y.forEach((Te, Ae) => {
          Te.position = fe.childNodes[Ae].position;
        });
        return;
      }
      S == null || S(U, we), a(se, H);
    }).on("end", (U) => {
      E == null || E(U, { ...C }), o == null || o({ ...C });
    });
    s.call(J);
  }
  function m() {
    s.on(".drag", null);
  }
  return { update: d, destroy: m };
}
var tm = { exports: {} }, nm = {}, im = { exports: {} }, lm = {};
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var Wx;
function O3() {
  if (Wx)
    return lm;
  Wx = 1;
  var e12 = go();
  function i(p, x) {
    return p === x && (p !== 0 || 1 / p === 1 / x) || p !== p && x !== x;
  }
  var l = typeof Object.is == "function" ? Object.is : i, a = e12.useState, o = e12.useEffect, s = e12.useLayoutEffect, c = e12.useDebugValue;
  function d(p, x) {
    var v = x(), S = a({ inst: { value: v, getSnapshot: x } }), E = S[0].inst, N = S[1];
    return s(function() {
      E.value = v, E.getSnapshot = x, m(E) && N({ inst: E });
    }, [p, v, x]), o(function() {
      return m(E) && N({ inst: E }), p(function() {
        m(E) && N({ inst: E });
      });
    }, [p]), c(v), v;
  }
  function m(p) {
    var x = p.getSnapshot;
    p = p.value;
    try {
      var v = x();
      return !l(p, v);
    } catch {
      return true;
    }
  }
  function g(p, x) {
    return x();
  }
  var y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? g : d;
  return lm.useSyncExternalStore = e12.useSyncExternalStore !== void 0 ? e12.useSyncExternalStore : y, lm;
}
var ev;
function R3() {
  return ev || (ev = 1, im.exports = O3()), im.exports;
}
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var tv;
function L3() {
  if (tv)
    return nm;
  tv = 1;
  var e12 = go(), i = R3();
  function l(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var a = typeof Object.is == "function" ? Object.is : l, o = i.useSyncExternalStore, s = e12.useRef, c = e12.useEffect, d = e12.useMemo, m = e12.useDebugValue;
  return nm.useSyncExternalStoreWithSelector = function(g, y, p, x, v) {
    var S = s(null);
    if (S.current === null) {
      var E = { hasValue: false, value: null };
      S.current = E;
    } else
      E = S.current;
    S = d(function() {
      function C(M) {
        if (!A) {
          if (A = true, k = M, M = x(M), v !== void 0 && E.hasValue) {
            var B = E.value;
            if (v(B, M))
              return T = B;
          }
          return T = M;
        }
        if (B = T, a(k, M))
          return B;
        var G = x(M);
        return v !== void 0 && v(B, G) ? (k = M, B) : (k = M, T = G);
      }
      var A = false, k, T, Y = p === void 0 ? null : p;
      return [function() {
        return C(y());
      }, Y === null ? void 0 : function() {
        return C(Y());
      }];
    }, [y, p, x, v]);
    var N = o(g, S[0], S[1]);
    return c(function() {
      E.hasValue = true, E.value = N;
    }, [N]), m(N), N;
  }, nm;
}
var nv;
function H3() {
  return nv || (nv = 1, tm.exports = L3()), tm.exports;
}
var B3 = H3();
const U3 = qc(B3), I3 = {}, iv = (e12) => {
  let i;
  const l = /* @__PURE__ */ new Set(), a = (y, p) => {
    const x = typeof y == "function" ? y(i) : y;
    if (!Object.is(x, i)) {
      const v = i;
      i = p ?? (typeof x != "object" || x === null) ? x : Object.assign({}, i, x), l.forEach((S) => S(i, v));
    }
  }, o = () => i, m = { setState: a, getState: o, getInitialState: () => g, subscribe: (y) => (l.add(y), () => l.delete(y)), destroy: () => {
    (I3 ? "production" : void 0) !== "production" && console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."), l.clear();
  } }, g = i = e12(a, o, m);
  return m;
}, q3 = (e12) => e12 ? iv(e12) : iv, { useDebugValue: V3 } = Pk, { useSyncExternalStoreWithSelector: Y3 } = U3, X3 = (e12) => e12;
function Fw(e12, i = X3, l) {
  const a = Y3(e12.subscribe, e12.getState, e12.getServerState || e12.getInitialState, i, l);
  return V3(a), a;
}
const lv = (e12, i) => {
  const l = q3(e12), a = (o, s = i) => Fw(l, o, s);
  return Object.assign(a, l), a;
}, G3 = (e12, i) => e12 ? lv(e12, i) : lv;
function Mt(e12, i) {
  if (Object.is(e12, i))
    return true;
  if (typeof e12 != "object" || e12 === null || typeof i != "object" || i === null)
    return false;
  if (e12 instanceof Map && i instanceof Map) {
    if (e12.size !== i.size)
      return false;
    for (const [a, o] of e12)
      if (!Object.is(o, i.get(a)))
        return false;
    return true;
  }
  if (e12 instanceof Set && i instanceof Set) {
    if (e12.size !== i.size)
      return false;
    for (const a of e12)
      if (!i.has(a))
        return false;
    return true;
  }
  const l = Object.keys(e12);
  if (l.length !== Object.keys(i).length)
    return false;
  for (const a of l)
    if (!Object.prototype.hasOwnProperty.call(i, a) || !Object.is(e12[a], i[a]))
      return false;
  return true;
}
var Jc = jb();
const Wc = L.createContext(null), $3 = Wc.Provider, Kw = hi.error001("react");
function ot(e12, i) {
  const l = L.useContext(Wc);
  if (l === null)
    throw new Error(Kw);
  return Fw(l, e12, i);
}
function Tt() {
  const e12 = L.useContext(Wc);
  if (e12 === null)
    throw new Error(Kw);
  return L.useMemo(() => ({ getState: e12.getState, setState: e12.setState, subscribe: e12.subscribe }), [e12]);
}
const rv = { display: "none" }, Q3 = { position: "absolute", width: 1, height: 1, margin: -1, border: 0, padding: 0, overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", clipPath: "inset(100%)" }, Pw = "react-flow__node-desc", Jw = "react-flow__edge-desc", Z3 = "react-flow__aria-live", F3 = (e12) => e12.ariaLiveMessage, K3 = (e12) => e12.ariaLabelConfig;
function P3({ rfId: e12 }) {
  const i = ot(F3);
  return b.jsx("div", { id: `${Z3}-${e12}`, "aria-live": "assertive", "aria-atomic": "true", style: Q3, children: i });
}
function J3({ rfId: e12, disableKeyboardA11y: i }) {
  const l = ot(K3);
  return b.jsxs(b.Fragment, { children: [b.jsx("div", { id: `${Pw}-${e12}`, style: rv, children: i ? l["node.a11yDescription.default"] : l["node.a11yDescription.keyboardDisabled"] }), b.jsx("div", { id: `${Jw}-${e12}`, style: rv, children: l["edge.a11yDescription.default"] }), !i && b.jsx(P3, { rfId: e12 })] });
}
const Nr = L.forwardRef(({ position: e12 = "top-left", children: i, className: l, style: a, ...o }, s) => {
  const c = `${e12}`.split("-");
  return b.jsx("div", { className: Qt(["react-flow__panel", l, ...c]), style: a, ref: s, ...o, children: i });
});
Nr.displayName = "Panel";
const av = "https://reactflow.dev?utm_source=attribution";
function W3({ proOptions: e12, position: i = "bottom-right" }) {
  return L.useEffect(() => {
  }, []), e12 != null && e12.hideAttribution ? null : b.jsx(Nr, { position: i, className: "react-flow__attribution", "data-message": `Please only hide this attribution when you are subscribed to React Flow Pro: ${av}`, children: b.jsx("a", { href: av, target: "_blank", rel: "noopener noreferrer", "aria-label": "React Flow attribution", children: "React Flow" }) });
}
const e42 = (e12) => {
  const i = [], l = [];
  for (const [, a] of e12.nodeLookup)
    a.selected && i.push(a.internals.userNode);
  for (const [, a] of e12.edgeLookup)
    a.selected && l.push(a);
  return { selectedNodes: i, selectedEdges: l };
}, ac = (e12) => e12.id;
function t4(e12, i) {
  return Mt(e12.selectedNodes.map(ac), i.selectedNodes.map(ac)) && Mt(e12.selectedEdges.map(ac), i.selectedEdges.map(ac));
}
function n4({ onSelectionChange: e12 }) {
  const i = Tt(), { selectedNodes: l, selectedEdges: a } = ot(e42, t4);
  return L.useEffect(() => {
    const o = { nodes: l, edges: a };
    e12 == null || e12(o), i.getState().onSelectionChangeHandlers.forEach((s) => s(o));
  }, [l, a, e12]), null;
}
const i4 = (e12) => !!e12.onSelectionChangeHandlers;
function l4({ onSelectionChange: e12 }) {
  const i = ot(i4);
  return e12 || i ? b.jsx(n4, { onSelectionChange: e12 }) : null;
}
const Ww = [0, 0], r4 = { x: 0, y: 0, zoom: 1 }, a4 = ["nodes", "edges", "defaultNodes", "defaultEdges", "onConnect", "onConnectStart", "onConnectEnd", "onClickConnectStart", "onClickConnectEnd", "nodesDraggable", "autoPanOnNodeFocus", "nodesConnectable", "nodesFocusable", "edgesFocusable", "edgesReconnectable", "elevateNodesOnSelect", "elevateEdgesOnSelect", "minZoom", "maxZoom", "nodeExtent", "onNodesChange", "onEdgesChange", "elementsSelectable", "connectionMode", "snapGrid", "snapToGrid", "translateExtent", "connectOnClick", "defaultEdgeOptions", "fitView", "fitViewOptions", "onNodesDelete", "onEdgesDelete", "onDelete", "onNodeDrag", "onNodeDragStart", "onNodeDragStop", "onSelectionDrag", "onSelectionDragStart", "onSelectionDragStop", "onMoveStart", "onMove", "onMoveEnd", "noPanClassName", "nodeOrigin", "autoPanOnConnect", "autoPanOnNodeDrag", "onError", "connectionRadius", "isValidConnection", "selectNodesOnDrag", "nodeDragThreshold", "connectionDragThreshold", "onBeforeDelete", "debug", "autoPanSpeed", "ariaLabelConfig", "zIndexMode"], uv = [...a4, "rfId"], u4 = (e12) => ({ setNodes: e12.setNodes, setEdges: e12.setEdges, setMinZoom: e12.setMinZoom, setMaxZoom: e12.setMaxZoom, setTranslateExtent: e12.setTranslateExtent, setNodeExtent: e12.setNodeExtent, reset: e12.reset, setDefaultNodesAndEdges: e12.setDefaultNodesAndEdges }), ov = { translateExtent: so, nodeOrigin: Ww, minZoom: 0.5, maxZoom: 2, elementsSelectable: true, noPanClassName: "nopan", rfId: "1" };
function o4(e12) {
  const { setNodes: i, setEdges: l, setMinZoom: a, setMaxZoom: o, setTranslateExtent: s, setNodeExtent: c, reset: d, setDefaultNodesAndEdges: m } = ot(u4, Mt), g = Tt();
  L.useEffect(() => (m(e12.defaultNodes, e12.defaultEdges), () => {
    y.current = ov, d();
  }), []);
  const y = L.useRef(ov);
  return L.useEffect(() => {
    for (const p of uv) {
      const x = e12[p], v = y.current[p];
      x !== v && (typeof e12[p] > "u" || (p === "nodes" ? i(x) : p === "edges" ? l(x) : p === "minZoom" ? a(x) : p === "maxZoom" ? o(x) : p === "translateExtent" ? s(x) : p === "nodeExtent" ? c(x) : p === "ariaLabelConfig" ? g.setState({ ariaLabelConfig: GT(x) }) : p === "fitView" ? g.setState({ fitViewQueued: x }) : p === "fitViewOptions" ? g.setState({ fitViewOptions: x }) : g.setState({ [p]: x })));
    }
    y.current = e12;
  }, uv.map((p) => e12[p])), null;
}
function sv() {
  return typeof window > "u" || !window.matchMedia ? null : window.matchMedia("(prefers-color-scheme: dark)");
}
function s4(e12) {
  var a;
  const [i, l] = L.useState(e12 === "system" ? null : e12);
  return L.useEffect(() => {
    if (e12 !== "system") {
      l(e12);
      return;
    }
    const o = sv(), s = () => l(o != null && o.matches ? "dark" : "light");
    return s(), o == null || o.addEventListener("change", s), () => {
      o == null || o.removeEventListener("change", s);
    };
  }, [e12]), i !== null ? i : (a = sv()) != null && a.matches ? "dark" : "light";
}
const cv = typeof document < "u" ? document : null;
function mo(e12 = null, i = { target: cv, actInsideInputWithModifier: true }) {
  const [l, a] = L.useState(false), o = L.useRef(false), s = L.useRef(/* @__PURE__ */ new Set([])), [c, d] = L.useMemo(() => {
    if (e12 !== null) {
      const g = (Array.isArray(e12) ? e12 : [e12]).filter((p) => typeof p == "string").map((p) => p.replace(/\+/g, `
`).replace(`

`, `
+`).split(`
`)), y = g.reduce((p, x) => p.concat(...x), []);
      return [g, y];
    }
    return [[], []];
  }, [e12]);
  return L.useEffect(() => {
    const m = (i == null ? void 0 : i.target) ?? cv, g = (i == null ? void 0 : i.actInsideInputWithModifier) ?? true;
    if (e12 !== null) {
      const y = (v) => {
        var N, C;
        if (o.current = v.ctrlKey || v.metaKey || v.shiftKey || v.altKey, (!o.current || o.current && !g) && jw(v))
          return false;
        const E = dv(v.code, d);
        if (s.current.add(v[E]), fv(c, s.current, false)) {
          const A = ((C = (N = v.composedPath) == null ? void 0 : N.call(v)) == null ? void 0 : C[0]) || v.target, k = (A == null ? void 0 : A.nodeName) === "BUTTON" || (A == null ? void 0 : A.nodeName) === "A";
          i.preventDefault !== false && (o.current || !k) && v.preventDefault(), a(true);
        }
      }, p = (v) => {
        const S = dv(v.code, d);
        fv(c, s.current, true) ? (a(false), s.current.clear()) : s.current.delete(v[S]), v.key === "Meta" && s.current.clear(), o.current = false;
      }, x = () => {
        s.current.clear(), a(false);
      };
      return m == null || m.addEventListener("keydown", y), m == null || m.addEventListener("keyup", p), window.addEventListener("blur", x), window.addEventListener("contextmenu", x), () => {
        m == null || m.removeEventListener("keydown", y), m == null || m.removeEventListener("keyup", p), window.removeEventListener("blur", x), window.removeEventListener("contextmenu", x);
      };
    }
  }, [e12, a]), l;
}
function fv(e12, i, l) {
  return e12.filter((a) => l || a.length === i.size).some((a) => a.every((o) => i.has(o)));
}
function dv(e12, i) {
  return i.includes(e12) ? "code" : "key";
}
const c4 = () => {
  const e12 = Tt();
  return L.useMemo(() => ({ zoomIn: async (i) => {
    const { panZoom: l } = e12.getState();
    return l ? l.scaleBy(1.2, i) : false;
  }, zoomOut: async (i) => {
    const { panZoom: l } = e12.getState();
    return l ? l.scaleBy(1 / 1.2, i) : false;
  }, zoomTo: async (i, l) => {
    const { panZoom: a } = e12.getState();
    return a ? a.scaleTo(i, l) : false;
  }, getZoom: () => e12.getState().transform[2], setViewport: async (i, l) => {
    const { transform: [a, o, s], panZoom: c } = e12.getState();
    return c ? (await c.setViewport({ x: i.x ?? a, y: i.y ?? o, zoom: i.zoom ?? s }, l), true) : false;
  }, getViewport: () => {
    const [i, l, a] = e12.getState().transform;
    return { x: i, y: l, zoom: a };
  }, setCenter: async (i, l, a) => e12.getState().setCenter(i, l, a), fitBounds: async (i, l) => {
    const { width: a, height: o, minZoom: s, maxZoom: c, panZoom: d } = e12.getState(), m = Cp(i, a, o, s, c, (l == null ? void 0 : l.padding) ?? 0.1);
    return d ? (await d.setViewport(m, { duration: l == null ? void 0 : l.duration, ease: l == null ? void 0 : l.ease, interpolate: l == null ? void 0 : l.interpolate }), true) : false;
  }, screenToFlowPosition: (i, l = {}) => {
    const { transform: a, snapGrid: o, snapToGrid: s, domNode: c } = e12.getState();
    if (!c)
      return i;
    const { x: d, y: m } = c.getBoundingClientRect(), g = { x: i.x - d, y: i.y - m }, y = l.snapGrid ?? o, p = l.snapToGrid ?? s;
    return So(g, a, p, y);
  }, flowToScreenPosition: (i) => {
    const { transform: l, domNode: a } = e12.getState();
    if (!a)
      return i;
    const { x: o, y: s } = a.getBoundingClientRect(), c = qa(i, l);
    return { x: c.x + o, y: c.y + s };
  } }), []);
};
function e22(e12, i) {
  const l = [], a = /* @__PURE__ */ new Map(), o = [];
  for (const s of e12)
    if (s.type === "add") {
      o.push(s);
      continue;
    } else if (s.type === "remove" || s.type === "replace")
      a.set(s.id, [s]);
    else {
      const c = a.get(s.id);
      c ? c.push(s) : a.set(s.id, [s]);
    }
  for (const s of i) {
    const c = a.get(s.id);
    if (!c) {
      l.push(s);
      continue;
    }
    if (c[0].type === "remove")
      continue;
    if (c[0].type === "replace") {
      l.push({ ...c[0].item });
      continue;
    }
    const d = { ...s };
    for (const m of c)
      f4(m, d);
    l.push(d);
  }
  return o.length && o.forEach((s) => {
    s.index !== void 0 ? l.splice(s.index, 0, { ...s.item }) : l.push({ ...s.item });
  }), l;
}
function f4(e12, i) {
  switch (e12.type) {
    case "select": {
      i.selected = e12.selected;
      break;
    }
    case "position": {
      typeof e12.position < "u" && (i.position = e12.position), typeof e12.dragging < "u" && (i.dragging = e12.dragging);
      break;
    }
    case "dimensions": {
      typeof e12.dimensions < "u" && (i.measured = { ...e12.dimensions }, e12.setAttributes && ((e12.setAttributes === true || e12.setAttributes === "width") && (i.width = e12.dimensions.width), (e12.setAttributes === true || e12.setAttributes === "height") && (i.height = e12.dimensions.height))), typeof e12.resizing == "boolean" && (i.resizing = e12.resizing);
      break;
    }
  }
}
function t2(e12, i) {
  return e22(e12, i);
}
function n2(e12, i) {
  return e22(e12, i);
}
function vr(e12, i) {
  return { id: e12, type: "select", selected: i };
}
function za(e12, i = /* @__PURE__ */ new Set()) {
  const l = [];
  for (const [a, o] of e12) {
    const s = i.has(a);
    !(o.selected === void 0 && !s) && o.selected !== s && l.push(vr(o.id, s));
  }
  return l;
}
function hv({ items: e12 = [], lookup: i }) {
  var o;
  const l = [], a = new Map(e12.map((s) => [s.id, s]));
  for (const [s, c] of e12.entries()) {
    const d = i.get(c.id), m = ((o = d == null ? void 0 : d.internals) == null ? void 0 : o.userNode) ?? d;
    m !== void 0 && m !== c && l.push({ id: c.id, item: c, type: "replace" }), m === void 0 && l.push({ item: c, type: "add", index: s });
  }
  for (const [s] of i)
    a.get(s) === void 0 && l.push({ id: s, type: "remove" });
  return l;
}
function mv(e12) {
  return { id: e12.id, type: "remove" };
}
const d4 = _w();
function h4(e12, i, l = {}) {
  return PT(e12, i, { ...l, onError: l.onError ?? d4 });
}
const pv = (e12) => LT(e12), m4 = (e12) => Sw(e12);
function i2(e12) {
  return L.forwardRef(e12);
}
const l2 = typeof window < "u" ? L.useLayoutEffect : L.useEffect;
function gv(e12) {
  const [i, l] = L.useState(BigInt(0)), [a] = L.useState(() => p4(() => l((o) => o + BigInt(1))));
  return l2(() => {
    const o = a.get();
    o.length && (e12(o), a.reset());
  }, [i]), a;
}
function p4(e12) {
  let i = [];
  return { get: () => i, reset: () => {
    i = [];
  }, push: (l) => {
    i.push(l), e12();
  } };
}
const r2 = L.createContext(null);
function g4({ children: e12 }) {
  const i = Tt(), l = L.useCallback((d) => {
    const { nodes: m = [], setNodes: g, hasDefaultNodes: y, onNodesChange: p, nodeLookup: x, fitViewQueued: v, onNodesChangeMiddlewareMap: S } = i.getState();
    let E = m;
    for (const C of d)
      E = typeof C == "function" ? C(E) : C;
    let N = hv({ items: E, lookup: x });
    for (const C of S.values())
      N = C(N);
    y && g(E), N.length > 0 ? p == null || p(N) : v && window.requestAnimationFrame(() => {
      const { fitViewQueued: C, nodes: A, setNodes: k } = i.getState();
      C && k(A);
    });
  }, []), a = gv(l), o = L.useCallback((d) => {
    const { edges: m = [], setEdges: g, hasDefaultEdges: y, onEdgesChange: p, edgeLookup: x } = i.getState();
    let v = m;
    for (const S of d)
      v = typeof S == "function" ? S(v) : S;
    y ? g(v) : p && p(hv({ items: v, lookup: x }));
  }, []), s = gv(o), c = L.useMemo(() => ({ nodeQueue: a, edgeQueue: s }), []);
  return b.jsx(r2.Provider, { value: c, children: e12 });
}
function y4() {
  const e12 = L.useContext(r2);
  if (!e12)
    throw new Error("useBatchContext must be used within a BatchProvider");
  return e12;
}
const x4 = (e12) => !!e12.panZoom;
function Eo() {
  const e12 = c4(), i = Tt(), l = y4(), a = ot(x4), o = L.useMemo(() => {
    const s = (p) => i.getState().nodeLookup.get(p), c = (p) => {
      l.nodeQueue.push(p);
    }, d = (p) => {
      l.edgeQueue.push(p);
    }, m = (p) => {
      var C, A;
      const { nodeLookup: x, nodeOrigin: v } = i.getState(), S = pv(p) ? p : x.get(p.id), E = S.parentId ? Tw(S.position, S.measured, S.parentId, x, v) : S.position, N = { ...S, position: E, width: ((C = S.measured) == null ? void 0 : C.width) ?? S.width, height: ((A = S.measured) == null ? void 0 : A.height) ?? S.height };
      return fo(N, S.parentId ? void 0 : v);
    }, g = (p, x, v = { replace: false }) => {
      c((S) => S.map((E) => {
        if (E.id === p) {
          const N = typeof x == "function" ? x(E) : x;
          return v.replace && pv(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    }, y = (p, x, v = { replace: false }) => {
      d((S) => S.map((E) => {
        if (E.id === p) {
          const N = typeof x == "function" ? x(E) : x;
          return v.replace && m4(N) ? N : { ...E, ...N };
        }
        return E;
      }));
    };
    return { getNodes: () => i.getState().nodes.map((p) => ({ ...p })), getNode: (p) => {
      var x;
      return (x = s(p)) == null ? void 0 : x.internals.userNode;
    }, getInternalNode: s, getEdges: () => {
      const { edges: p = [] } = i.getState();
      return p.map((x) => ({ ...x }));
    }, getEdge: (p) => i.getState().edgeLookup.get(p), setNodes: c, setEdges: d, addNodes: (p) => {
      const x = Array.isArray(p) ? p : [p];
      l.nodeQueue.push((v) => [...v, ...x]);
    }, addEdges: (p) => {
      const x = Array.isArray(p) ? p : [p];
      l.edgeQueue.push((v) => [...v, ...x]);
    }, toObject: () => {
      const { nodes: p = [], edges: x = [], transform: v } = i.getState(), [S, E, N] = v;
      return { nodes: p.map((C) => ({ ...C })), edges: x.map((C) => ({ ...C })), viewport: { x: S, y: E, zoom: N } };
    }, deleteElements: async ({ nodes: p = [], edges: x = [] }) => {
      const { nodes: v, edges: S, onNodesDelete: E, onEdgesDelete: N, triggerNodeChanges: C, triggerEdgeChanges: A, onDelete: k, onBeforeDelete: T } = i.getState(), { nodes: Y, edges: M } = await qT({ nodesToRemove: p, edgesToRemove: x, nodes: v, edges: S, onBeforeDelete: T }), B = M.length > 0, G = Y.length > 0;
      if (B) {
        const J = M.map(mv);
        N == null || N(M), A(J);
      }
      if (G) {
        const J = Y.map(mv);
        E == null || E(Y), C(J);
      }
      return (G || B) && (k == null || k({ nodes: Y, edges: M })), { deletedNodes: Y, deletedEdges: M };
    }, getIntersectingNodes: (p, x = true, v) => {
      const S = Ix(p), E = S ? p : m(p), N = v !== void 0;
      if (!E)
        return [];
      const { nodeOrigin: C } = i.getState();
      return (v || i.getState().nodes).filter((A) => {
        const k = i.getState().nodeLookup.get(A.id);
        if (k && !S && (A.id === p.id || !k.internals.positionAbsolute))
          return false;
        const T = fo(N ? A : k, C), Y = jc(T, E);
        return x && Y > 0 || Y >= T.width * T.height || Y >= E.width * E.height;
      });
    }, isNodeIntersecting: (p, x, v = true) => {
      const E = Ix(p) ? p : m(p);
      if (!E)
        return false;
      const N = jc(E, x);
      return v && N > 0 || N >= x.width * x.height || N >= E.width * E.height;
    }, updateNode: g, updateNodeData: (p, x, v = { replace: false }) => {
      g(p, (S) => {
        const E = typeof x == "function" ? x(S) : x;
        return v.replace ? { ...S, data: E } : { ...S, data: { ...S.data, ...E } };
      }, v);
    }, updateEdge: y, updateEdgeData: (p, x, v = { replace: false }) => {
      y(p, (S) => {
        const E = typeof x == "function" ? x(S) : x;
        return v.replace ? { ...S, data: E } : { ...S, data: { ...S.data, ...E } };
      }, v);
    }, getNodesBounds: (p) => {
      const { nodeLookup: x, nodeOrigin: v } = i.getState();
      return HT(p, { nodeLookup: x, nodeOrigin: v });
    }, getHandleConnections: ({ type: p, id: x, nodeId: v }) => {
      var S;
      return Array.from(((S = i.getState().connectionLookup.get(`${v}-${p}${x ? `-${x}` : ""}`)) == null ? void 0 : S.values()) ?? []);
    }, getNodeConnections: ({ type: p, handleId: x, nodeId: v }) => {
      var S;
      return Array.from(((S = i.getState().connectionLookup.get(`${v}${p ? x ? `-${p}-${x}` : `-${p}` : ""}`)) == null ? void 0 : S.values()) ?? []);
    }, fitView: async (p) => {
      const x = i.getState().fitViewResolver ?? XT();
      return i.setState({ fitViewQueued: true, fitViewOptions: p, fitViewResolver: x }), l.nodeQueue.push((v) => [...v]), x.promise;
    } };
  }, []);
  return L.useMemo(() => ({ ...o, ...e12, viewportInitialized: a }), [a]);
}
const yv = (e12) => e12.selected, v4 = typeof window < "u" ? window : void 0;
function b4({ deleteKeyCode: e12, multiSelectionKeyCode: i }) {
  const l = Tt(), { deleteElements: a } = Eo(), o = mo(e12, { actInsideInputWithModifier: false }), s = mo(i, { target: v4 });
  L.useEffect(() => {
    if (o) {
      const { edges: c, nodes: d } = l.getState();
      a({ nodes: d.filter(yv), edges: c.filter(yv) }), l.setState({ nodesSelectionActive: false });
    }
  }, [o]), L.useEffect(() => {
    l.setState({ multiSelectionActive: s });
  }, [s]);
}
function w4(e12) {
  const i = Tt();
  L.useEffect(() => {
    const l = () => {
      var o, s, c, d;
      if (!e12.current || !(((s = (o = e12.current).checkVisibility) == null ? void 0 : s.call(o)) ?? true))
        return false;
      const a = kp(e12.current);
      (a.height === 0 || a.width === 0) && ((d = (c = i.getState()).onError) == null || d.call(c, "004", hi.error004())), i.setState({ width: a.width || 500, height: a.height || 500 });
    };
    if (e12.current) {
      l(), window.addEventListener("resize", l);
      const a = new ResizeObserver(() => l());
      return a.observe(e12.current), () => {
        window.removeEventListener("resize", l), a.disconnect();
      };
    }
  }, []);
}
const ef = { position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }, S4 = (e12) => ({ userSelectionActive: e12.userSelectionActive, lib: e12.lib, connectionInProgress: e12.connection.inProgress });
function E4({ onPaneContextMenu: e12, zoomOnScroll: i = true, zoomOnPinch: l = true, panOnScroll: a = false, panActivationKeyPressed: o, panOnScrollSpeed: s = 0.5, panOnScrollMode: c = kr.Free, zoomOnDoubleClick: d = true, panOnDrag: m = true, defaultViewport: g, translateExtent: y, minZoom: p, maxZoom: x, zoomActivationKeyCode: v, preventScrolling: S = true, children: E, noWheelClassName: N, noPanClassName: C, onViewportChange: A, isControlledViewport: k, paneClickDistance: T, selectionOnDrag: Y }) {
  const M = Tt(), B = L.useRef(null), { userSelectionActive: G, lib: J, connectionInProgress: U } = ot(S4, Mt), X = mo(v), ie = L.useRef();
  w4(B);
  const re = L.useCallback((j) => {
    A == null || A({ x: j[0], y: j[1], zoom: j[2] }), k || M.setState({ transform: j });
  }, [A, k]);
  return L.useEffect(() => {
    if (B.current) {
      ie.current = z3({ domNode: B.current, minZoom: p, maxZoom: x, translateExtent: y, viewport: g, onDraggingChange: (V) => M.setState(($) => $.paneDragging === V ? $ : { paneDragging: V }), onPanZoomStart: (V, $) => {
        const { onViewportChangeStart: F, onMoveStart: _ } = M.getState();
        _ == null || _(V, $), F == null || F($);
      }, onPanZoom: (V, $) => {
        const { onViewportChange: F, onMove: _ } = M.getState();
        _ == null || _(V, $), F == null || F($);
      }, onPanZoomEnd: (V, $) => {
        const { onViewportChangeEnd: F, onMoveEnd: _ } = M.getState();
        _ == null || _(V, $), F == null || F($);
      } });
      const { x: j, y: D, zoom: H } = ie.current.getViewport();
      return M.setState({ panZoom: ie.current, transform: [j, D, H], domNode: B.current.closest(".react-flow") }), () => {
        var V;
        (V = ie.current) == null || V.destroy();
      };
    }
  }, []), L.useEffect(() => {
    var j;
    (j = ie.current) == null || j.update({ onPaneContextMenu: e12, zoomOnScroll: i, zoomOnPinch: l, panOnScroll: a, panActivationKeyPressed: o, panOnScrollSpeed: s, panOnScrollMode: c, zoomOnDoubleClick: d, panOnDrag: m, zoomActivationKeyPressed: X, preventScrolling: S, noPanClassName: C, userSelectionActive: G, noWheelClassName: N, lib: J, onTransformChange: re, connectionInProgress: U, selectionOnDrag: Y, paneClickDistance: T });
  }, [e12, i, l, a, o, s, c, d, m, X, S, C, G, N, J, re, U, Y, T]), b.jsx("div", { className: "react-flow__renderer", ref: B, style: ef, children: E });
}
const C4 = (e12) => ({ userSelectionActive: e12.userSelectionActive, userSelectionRect: e12.userSelectionRect });
function k4() {
  const { userSelectionActive: e12, userSelectionRect: i } = ot(C4, Mt);
  return e12 && i ? b.jsx("div", { className: "react-flow__selection react-flow__container", style: { width: i.width, height: i.height, transform: `translate(${i.x}px, ${i.y}px)` } }) : null;
}
const rm = (e12, i) => (l) => {
  l.target === i.current && (e12 == null || e12(l));
}, N4 = (e12) => ({ userSelectionActive: e12.userSelectionActive, elementsSelectable: e12.elementsSelectable, dragging: e12.paneDragging, panBy: e12.panBy, autoPanSpeed: e12.autoPanSpeed });
function _4({ isSelecting: e12, selectionKeyPressed: i, selectionMode: l = co.Full, panOnDrag: a, autoPanOnSelection: o, paneClickDistance: s, selectionOnDrag: c, onSelectionStart: d, onSelectionEnd: m, onPaneClick: g, onPaneContextMenu: y, onPaneScroll: p, onPaneMouseEnter: x, onPaneMouseMove: v, onPaneMouseLeave: S, children: E }) {
  const N = L.useRef(0), C = Tt(), { userSelectionActive: A, elementsSelectable: k, dragging: T, panBy: Y, autoPanSpeed: M } = ot(N4, Mt), B = k && (e12 || A), G = L.useRef(null), J = L.useRef(), U = L.useRef(/* @__PURE__ */ new Set()), X = L.useRef(/* @__PURE__ */ new Set()), ie = L.useRef(false), re = L.useRef(false), j = L.useRef({ x: 0, y: 0 }), D = L.useRef(false), H = (ne) => {
    if (re.current || ie.current || C.getState().connection.inProgress) {
      re.current = false, ie.current = false;
      return;
    }
    const { connectionClickStartHandle: xe, connection: Se, onClickConnectEnd: fe, resetSelectedElements: q } = C.getState();
    if (xe) {
      const we = structuredClone(Se);
      delete we.inProgress, we.toPosition = we.toHandle ? we.toHandle.position : null, fe == null || fe(ne.nativeEvent, we), C.setState({ connectionClickStartHandle: null });
    }
    g == null || g(ne), q(), C.setState({ nodesSelectionActive: false });
  }, V = (ne) => {
    if (Array.isArray(a) && (a != null && a.includes(2))) {
      ne.preventDefault();
      return;
    }
    y == null || y(ne);
  }, $ = p ? (ne) => p(ne) : void 0, F = (ne) => {
    re.current && (ne.stopPropagation(), re.current = false);
  }, _ = (ne) => {
    var Ee, qe;
    if (ne.pointerType === "touch" && a !== false && !i)
      return;
    const { domNode: xe, transform: Se } = C.getState();
    if (J.current = xe == null ? void 0 : xe.getBoundingClientRect(), !J.current)
      return;
    const fe = ne.target === G.current;
    if (!fe && !!ne.target.closest(".nokey") || !e12 || !(c && fe || i) || ne.button !== 0 || !ne.isPrimary)
      return;
    (qe = (Ee = ne.target) == null ? void 0 : Ee.setPointerCapture) == null || qe.call(Ee, ne.pointerId), re.current = false;
    const { x: Ce, y: Te } = ci(ne.nativeEvent, J.current), Ae = So({ x: Ce, y: Te }, Se);
    C.setState({ userSelectionRect: { width: 0, height: 0, startX: Ae.x, startY: Ae.y, x: Ce, y: Te } }), fe || (ne.stopPropagation(), ne.preventDefault());
  };
  function se(ne, xe) {
    const { userSelectionRect: Se } = C.getState();
    if (!Se)
      return;
    const { transform: fe, nodeLookup: q, edgeLookup: we, connectionLookup: Ce, triggerNodeChanges: Te, triggerEdgeChanges: Ae, defaultEdgeOptions: Ee } = C.getState(), qe = { x: Se.startX, y: Se.startY }, { x: Le, y: pt } = qa(qe, fe), vt = { startX: qe.x, startY: qe.y, x: ne < Le ? ne : Le, y: xe < pt ? xe : pt, width: Math.abs(ne - Le), height: Math.abs(xe - pt) }, Lt = U.current, Zt = X.current;
    U.current = new Set(Sp(q, vt, fe, l === co.Partial, true).map((_t) => _t.id)), X.current = /* @__PURE__ */ new Set();
    const Ht = (Ee == null ? void 0 : Ee.selectable) ?? true;
    for (const _t of U.current) {
      const ce = Ce.get(_t);
      if (ce)
        for (const { edgeId: K } of ce.values()) {
          const de = we.get(K);
          de && (de.selectable ?? Ht) && X.current.add(K);
        }
    }
    if (!qx(Lt, U.current)) {
      const _t = za(q, U.current);
      Te(_t);
    }
    if (!qx(Zt, X.current)) {
      const _t = za(we, X.current);
      Ae(_t);
    }
    C.setState({ userSelectionRect: vt, userSelectionActive: true, nodesSelectionActive: false });
  }
  function he() {
    if (!o || !J.current)
      return;
    const [ne, xe] = Ep(j.current, J.current, M);
    Y({ x: ne, y: xe }).then((Se) => {
      if (!re.current || !Se) {
        N.current = requestAnimationFrame(he);
        return;
      }
      const { x: fe, y: q } = j.current;
      se(fe, q), N.current = requestAnimationFrame(he);
    });
  }
  const R = () => {
    cancelAnimationFrame(N.current), N.current = 0, D.current = false;
  };
  L.useEffect(() => () => R(), []);
  const O = (ne) => {
    const { userSelectionRect: xe, transform: Se, resetSelectedElements: fe } = C.getState();
    if (!J.current || !xe)
      return;
    const { x: q, y: we } = ci(ne.nativeEvent, J.current);
    j.current = { x: q, y: we };
    const Ce = qa({ x: xe.startX, y: xe.startY }, Se);
    if (!re.current) {
      const Te = i ? 0 : s;
      if (Math.hypot(q - Ce.x, we - Ce.y) <= Te)
        return;
      fe(), d == null || d(ne);
    }
    re.current = true, D.current || (he(), D.current = true), se(q, we);
  }, te = (ne) => {
    var xe, Se;
    if (!B) {
      ne.target === G.current && C.getState().connection.inProgress && (ie.current = true);
      return;
    }
    ne.button === 0 && ((Se = (xe = ne.target) == null ? void 0 : xe.releasePointerCapture) == null || Se.call(xe, ne.pointerId), !A && ne.target === G.current && C.getState().userSelectionRect && (H == null || H(ne)), C.setState({ userSelectionActive: false, userSelectionRect: null }), re.current && (m == null || m(ne), C.setState({ nodesSelectionActive: U.current.size > 0 })), R());
  }, pe = (ne) => {
    var xe, Se;
    (Se = (xe = ne.target) == null ? void 0 : xe.releasePointerCapture) == null || Se.call(xe, ne.pointerId), R();
  }, me = a === true || Array.isArray(a) && a.includes(0);
  return b.jsxs("div", { className: Qt(["react-flow__pane", { draggable: me, dragging: T, selection: e12 }]), onClick: B ? void 0 : rm(H, G), onContextMenu: rm(V, G), onWheel: rm($, G), onPointerEnter: B ? void 0 : x, onPointerMove: B ? O : v, onPointerUp: te, onPointerCancel: B ? pe : void 0, onPointerDownCapture: B ? _ : void 0, onClickCapture: B ? F : void 0, onPointerLeave: S, ref: G, style: ef, children: [E, b.jsx(k4, {})] });
}
function Vm({ id: e12, store: i, unselect: l = false, nodeRef: a }) {
  const { addSelectedNodes: o, unselectNodesAndEdges: s, multiSelectionActive: c, nodeLookup: d, onError: m } = i.getState(), g = d.get(e12);
  if (!g) {
    m == null || m("012", hi.error012(e12));
    return;
  }
  i.setState({ nodesSelectionActive: false }), g.selected ? (l || g.selected && c) && (s({ nodes: [g], edges: [] }), requestAnimationFrame(() => {
    var y;
    return (y = a == null ? void 0 : a.current) == null ? void 0 : y.blur();
  })) : o([e12]);
}
function a2({ nodeRef: e12, disabled: i = false, noDragClassName: l, handleSelector: a, nodeId: o, isSelectable: s, nodeClickDistance: c }) {
  const d = Tt(), [m, g] = L.useState(false), y = L.useRef();
  return L.useEffect(() => {
    if (!i)
      return y.current = m3({ getStoreItems: () => d.getState(), onNodeMouseDown: (p) => {
        Vm({ id: p, store: d, nodeRef: e12 });
      }, onDragStart: () => {
        g(true);
      }, onDragStop: () => {
        g(false);
      } }), () => {
        var p;
        (p = y.current) == null || p.destroy(), y.current = void 0;
      };
  }, [i, d, e12]), L.useEffect(() => {
    i || !e12.current || !y.current || y.current.update({ noDragClassName: l, handleSelector: a, domNode: e12.current, isSelectable: s, nodeId: o, nodeClickDistance: c });
  }, [l, a, i, s, e12, o, c]), m;
}
const z4 = (e12) => (i) => i.selected && (i.draggable || e12 && typeof i.draggable > "u");
function u2() {
  const e12 = Tt();
  return L.useCallback((l) => {
    const { nodeExtent: a, snapToGrid: o, snapGrid: s, nodesDraggable: c, onError: d, updateNodePositions: m, nodeLookup: g, nodeOrigin: y } = e12.getState(), p = /* @__PURE__ */ new Map(), x = z4(c), v = o ? s[0] : 5, S = o ? s[1] : 5, E = l.direction.x * v * l.factor, N = l.direction.y * S * l.factor;
    for (const [, C] of g) {
      if (!x(C))
        continue;
      let A = { x: C.internals.positionAbsolute.x + E, y: C.internals.positionAbsolute.y + N };
      o && (A = wo(A, s));
      const { position: k, positionAbsolute: T } = Ew({ nodeId: C.id, nextPosition: A, nodeLookup: g, nodeExtent: a, nodeOrigin: y, onError: d });
      C.position = k, C.internals.positionAbsolute = T, p.set(C.id, C);
    }
    m(p);
  }, []);
}
const Mp = L.createContext(null), T4 = Mp.Provider;
Mp.Consumer;
const o2 = () => L.useContext(Mp), A4 = (e12) => ({ connectOnClick: e12.connectOnClick, noPanClassName: e12.noPanClassName, rfId: e12.rfId }), s2 = L.createContext(null);
function M4({ children: e12 }) {
  const i = ot(A4, Mt);
  return b.jsx(s2.Provider, { value: i, children: e12 });
}
function j4() {
  const e12 = L.useContext(s2);
  if (!e12)
    throw new Error("useHandleConfig must be used within a HandleConfigProvider");
  return e12;
}
const D4 = { connectingFrom: false, connectingTo: false, clickConnecting: false, isPossibleEndHandle: true, connectionInProcess: false, clickConnectionInProcess: false, valid: false }, O4 = (e12, i, l) => (a) => {
  const { connectionClickStartHandle: o, connectionMode: s, connection: c } = a, { fromHandle: d, toHandle: m, isValid: g } = c;
  if (!d && !o)
    return D4;
  const y = (m == null ? void 0 : m.nodeId) === e12 && (m == null ? void 0 : m.id) === i && (m == null ? void 0 : m.type) === l;
  return { connectingFrom: (d == null ? void 0 : d.nodeId) === e12 && (d == null ? void 0 : d.id) === i && (d == null ? void 0 : d.type) === l, connectingTo: y, clickConnecting: (o == null ? void 0 : o.nodeId) === e12 && (o == null ? void 0 : o.id) === i && (o == null ? void 0 : o.type) === l, isPossibleEndHandle: s === Ua.Strict ? (d == null ? void 0 : d.type) !== l : e12 !== (d == null ? void 0 : d.nodeId) || i !== (d == null ? void 0 : d.id), connectionInProcess: !!d, clickConnectionInProcess: !!o, valid: y && g };
};
function R4({ type: e12 = "source", position: i = Ie.Top, isValidConnection: l, isConnectable: a = true, isConnectableStart: o = true, isConnectableEnd: s = true, id: c, onConnect: d, children: m, className: g, onMouseDown: y, onTouchStart: p, ...x }, v) {
  var D, H;
  const S = c || null, E = e12 === "target", N = Tt(), C = o2(), { connectOnClick: A, noPanClassName: k, rfId: T } = j4(), { connectingFrom: Y, connectingTo: M, clickConnecting: B, isPossibleEndHandle: G, connectionInProcess: J, clickConnectionInProcess: U, valid: X } = ot(O4(C, S, e12), Mt);
  C || (H = (D = N.getState()).onError) == null || H.call(D, "010", hi.error010());
  const ie = (V) => {
    const { defaultEdgeOptions: $, onConnect: F, hasDefaultEdges: _ } = N.getState(), se = { ...$, ...V };
    if (_) {
      const { edges: he, setEdges: R, onError: O } = N.getState();
      R(h4(se, he, { onError: O }));
    }
    F == null || F(se), d == null || d(se);
  }, re = (V) => {
    if (!C)
      return;
    const $ = Dw(V.nativeEvent);
    if (o && ($ && V.button === 0 || !$)) {
      const F = N.getState();
      qm.onPointerDown(V.nativeEvent, { handleDomNode: V.currentTarget, autoPanOnConnect: F.autoPanOnConnect, connectionMode: F.connectionMode, connectionRadius: F.connectionRadius, domNode: F.domNode, nodeLookup: F.nodeLookup, lib: F.lib, isTarget: E, handleId: S, nodeId: C, flowId: F.rfId, panBy: F.panBy, cancelConnection: F.cancelConnection, onConnectStart: F.onConnectStart, onConnectEnd: (..._) => {
        var se, he;
        return (he = (se = N.getState()).onConnectEnd) == null ? void 0 : he.call(se, ..._);
      }, updateConnection: F.updateConnection, onConnect: ie, isValidConnection: l || ((..._) => {
        var se, he;
        return ((he = (se = N.getState()).isValidConnection) == null ? void 0 : he.call(se, ..._)) ?? true;
      }), getTransform: () => N.getState().transform, getFromHandle: () => N.getState().connection.fromHandle, autoPanSpeed: F.autoPanSpeed, dragThreshold: F.connectionDragThreshold });
    }
    $ ? y == null || y(V) : p == null || p(V);
  }, j = (V) => {
    const { onClickConnectStart: $, onClickConnectEnd: F, connectionClickStartHandle: _, connectionMode: se, isValidConnection: he, lib: R, rfId: O, nodeLookup: te, connection: pe } = N.getState();
    if (!C || !_ && !o)
      return;
    if (!_) {
      $ == null || $(V.nativeEvent, { nodeId: C, handleId: S, handleType: e12 }), N.setState({ connectionClickStartHandle: { nodeId: C, type: e12, id: S } });
      return;
    }
    const me = Mw(V.target), ne = l || he, { connection: xe, isValid: Se } = qm.isValid(V.nativeEvent, { handle: { nodeId: C, id: S, type: e12 }, connectionMode: se, fromNodeId: _.nodeId, fromHandleId: _.id || null, fromType: _.type, isValidConnection: ne, flowId: O, doc: me, lib: R, nodeLookup: te });
    Se && xe && ie(xe);
    const fe = structuredClone(pe);
    delete fe.inProgress, fe.toPosition = fe.toHandle ? fe.toHandle.position : null, F == null || F(V, fe), N.setState({ connectionClickStartHandle: null });
  };
  return b.jsx("div", { "data-handleid": S, "data-nodeid": C, "data-handlepos": i, "data-id": `${T}-${C}-${S}-${e12}`, className: Qt(["react-flow__handle", `react-flow__handle-${i}`, "nodrag", k, g, { source: !E, target: E, connectable: a, connectablestart: o, connectableend: s, clickconnecting: B, connectingfrom: Y, connectingto: M, valid: X, connectionindicator: a && (!J || G) && (J || U ? s : o) }]), onMouseDown: re, onTouchStart: re, onClick: A ? j : void 0, ref: v, ...x, children: m });
}
const Ya = L.memo(i2(R4));
function L4({ data: e12, isConnectable: i, sourcePosition: l = Ie.Bottom }) {
  return b.jsxs(b.Fragment, { children: [e12 == null ? void 0 : e12.label, b.jsx(Ya, { type: "source", position: l, isConnectable: i })] });
}
function H4({ data: e12, isConnectable: i, targetPosition: l = Ie.Top, sourcePosition: a = Ie.Bottom }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Ya, { type: "target", position: l, isConnectable: i }), e12 == null ? void 0 : e12.label, b.jsx(Ya, { type: "source", position: a, isConnectable: i })] });
}
function B4() {
  return null;
}
function U4({ data: e12, isConnectable: i, targetPosition: l = Ie.Top }) {
  return b.jsxs(b.Fragment, { children: [b.jsx(Ya, { type: "target", position: l, isConnectable: i }), e12 == null ? void 0 : e12.label] });
}
const Dc = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 } }, xv = { input: L4, default: H4, output: U4, group: B4 };
function I4(e12) {
  var i, l, a, o;
  return e12.internals.handleBounds === void 0 ? { width: e12.width ?? e12.initialWidth ?? ((i = e12.style) == null ? void 0 : i.width), height: e12.height ?? e12.initialHeight ?? ((l = e12.style) == null ? void 0 : l.height) } : { width: e12.width ?? ((a = e12.style) == null ? void 0 : a.width), height: e12.height ?? ((o = e12.style) == null ? void 0 : o.height) };
}
const q4 = (e12) => {
  const { width: i, height: l, x: a, y: o } = bo(e12.nodeLookup, { filter: (s) => !!s.selected });
  return { width: si(i) ? i : null, height: si(l) ? l : null, userSelectionActive: e12.userSelectionActive, transformString: `translate(${e12.transform[0]}px,${e12.transform[1]}px) scale(${e12.transform[2]}) translate(${a}px,${o}px)` };
};
function V4({ onSelectionContextMenu: e12, noPanClassName: i, disableKeyboardA11y: l }) {
  const a = Tt(), { width: o, height: s, transformString: c, userSelectionActive: d } = ot(q4, Mt), m = u2(), g = L.useRef(null);
  L.useEffect(() => {
    var v;
    l || (v = g.current) == null || v.focus({ preventScroll: true });
  }, [l]);
  const y = !d && o !== null && s !== null;
  if (a2({ nodeRef: g, disabled: !y }), !y)
    return null;
  const p = e12 ? (v) => {
    const S = a.getState().nodes.filter((E) => E.selected);
    e12(v, S);
  } : void 0, x = (v) => {
    Object.prototype.hasOwnProperty.call(Dc, v.key) && (v.preventDefault(), m({ direction: Dc[v.key], factor: v.shiftKey ? 4 : 1 }));
  };
  return b.jsx("div", { className: Qt(["react-flow__nodesselection", "react-flow__container", i]), style: { transform: c }, children: b.jsx("div", { ref: g, className: "react-flow__nodesselection-rect", onContextMenu: p, tabIndex: l ? void 0 : -1, onKeyDown: l ? void 0 : x, style: { width: o, height: s } }) });
}
const vv = typeof window < "u" ? window : void 0, Y4 = (e12) => ({ nodesSelectionActive: e12.nodesSelectionActive, userSelectionActive: e12.userSelectionActive });
function c2({ children: e12, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: a, onPaneMouseLeave: o, onPaneContextMenu: s, onPaneScroll: c, paneClickDistance: d, deleteKeyCode: m, selectionKeyCode: g, selectionOnDrag: y, selectionMode: p, onSelectionStart: x, onSelectionEnd: v, multiSelectionKeyCode: S, panActivationKeyCode: E, zoomActivationKeyCode: N, elementsSelectable: C, zoomOnScroll: A, zoomOnPinch: k, panOnScroll: T, panOnScrollSpeed: Y, panOnScrollMode: M, zoomOnDoubleClick: B, panOnDrag: G, autoPanOnSelection: J, defaultViewport: U, translateExtent: X, minZoom: ie, maxZoom: re, preventScrolling: j, onSelectionContextMenu: D, noWheelClassName: H, noPanClassName: V, disableKeyboardA11y: $, onViewportChange: F, isControlledViewport: _ }) {
  const { nodesSelectionActive: se, userSelectionActive: he } = ot(Y4, Mt), R = mo(g, { target: vv }), O = mo(E, { target: vv }), te = O || G, pe = O || T, me = y && te !== true, ne = R || he || me;
  return b4({ deleteKeyCode: m, multiSelectionKeyCode: S }), b.jsx(E4, { onPaneContextMenu: s, elementsSelectable: C, zoomOnScroll: A, zoomOnPinch: k, panOnScroll: pe, panActivationKeyPressed: O, panOnScrollSpeed: Y, panOnScrollMode: M, zoomOnDoubleClick: B, panOnDrag: !R && te, defaultViewport: U, translateExtent: X, minZoom: ie, maxZoom: re, zoomActivationKeyCode: N, preventScrolling: j, noWheelClassName: H, noPanClassName: V, onViewportChange: F, isControlledViewport: _, paneClickDistance: d, selectionOnDrag: me, children: b.jsxs(_4, { onSelectionStart: x, onSelectionEnd: v, onPaneClick: i, onPaneMouseEnter: l, onPaneMouseMove: a, onPaneMouseLeave: o, onPaneContextMenu: s, onPaneScroll: c, panOnDrag: te, autoPanOnSelection: J, isSelecting: !!ne, selectionMode: p, selectionKeyPressed: R, paneClickDistance: d, selectionOnDrag: me, children: [e12, se && b.jsx(V4, { onSelectionContextMenu: D, noPanClassName: V, disableKeyboardA11y: $ })] }) });
}
c2.displayName = "FlowRenderer";
const X4 = L.memo(c2), G4 = (e12) => (i) => e12 ? Sp(i.nodeLookup, { x: 0, y: 0, width: i.width, height: i.height }, i.transform, true).map((l) => l.id) : Array.from(i.nodeLookup.keys());
function $4(e12) {
  return ot(L.useCallback(G4(e12), [e12]), Mt);
}
const Q4 = (e12) => e12.updateNodeInternals;
function Z4() {
  const e12 = ot(Q4), [i] = L.useState(() => typeof ResizeObserver > "u" ? null : new ResizeObserver((l) => {
    const a = /* @__PURE__ */ new Map();
    l.forEach((o) => {
      const s = o.target.getAttribute("data-id");
      a.set(s, { id: s, nodeElement: o.target, force: true });
    }), e12(a);
  }));
  return L.useEffect(() => () => {
    i == null || i.disconnect();
  }, [i]), i;
}
function F4({ node: e12, nodeType: i, hasDimensions: l, resizeObserver: a }) {
  const o = Tt(), s = L.useRef(null), c = L.useRef(null), d = L.useRef(e12.sourcePosition), m = L.useRef(e12.targetPosition), g = L.useRef(i), y = l && !!e12.internals.handleBounds;
  return L.useEffect(() => {
    s.current && !e12.hidden && (!y || c.current !== s.current) && (c.current && (a == null || a.unobserve(c.current)), a == null || a.observe(s.current), c.current = s.current);
  }, [y, e12.hidden]), L.useEffect(() => () => {
    c.current && (a == null || a.unobserve(c.current), c.current = null);
  }, []), L.useEffect(() => {
    if (s.current) {
      const p = g.current !== i, x = d.current !== e12.sourcePosition, v = m.current !== e12.targetPosition;
      (p || x || v) && (g.current = i, d.current = e12.sourcePosition, m.current = e12.targetPosition, o.getState().updateNodeInternals(/* @__PURE__ */ new Map([[e12.id, { id: e12.id, nodeElement: s.current, force: true }]])));
    }
  }, [e12.id, i, e12.sourcePosition, e12.targetPosition]), s;
}
function K4({ id: e12, onClick: i, onMouseEnter: l, onMouseMove: a, onMouseLeave: o, onContextMenu: s, onDoubleClick: c, nodesDraggable: d, elementsSelectable: m, nodesConnectable: g, nodesFocusable: y, resizeObserver: p, noDragClassName: x, noPanClassName: v, disableKeyboardA11y: S, rfId: E, nodeTypes: N, nodeClickDistance: C, onError: A }) {
  const { node: k, internals: T, isParent: Y } = ot((ne) => {
    const xe = ne.nodeLookup.get(e12), Se = ne.parentLookup.has(e12);
    return { node: xe, internals: xe.internals, isParent: Se };
  }, Mt);
  let M = k.type || "default", B = (N == null ? void 0 : N[M]) || xv[M];
  B === void 0 && (A == null || A("003", hi.error003(M)), M = "default", B = (N == null ? void 0 : N.default) || xv.default);
  const G = !!(k.draggable || d && typeof k.draggable > "u"), J = !!(k.selectable || m && typeof k.selectable > "u"), U = !!(k.connectable || g && typeof k.connectable > "u"), X = !!(k.focusable || y && typeof k.focusable > "u"), ie = Tt(), re = zw(k), j = F4({ node: k, nodeType: M, hasDimensions: re, resizeObserver: p }), D = a2({ nodeRef: j, disabled: k.hidden || !G, noDragClassName: x, handleSelector: k.dragHandle, nodeId: e12, isSelectable: J, nodeClickDistance: C }), H = u2();
  if (k.hidden)
    return null;
  const V = pi(k), $ = I4(k), F = J || G || i || l || a || o, _ = l ? (ne) => l(ne, { ...T.userNode }) : void 0, se = a ? (ne) => a(ne, { ...T.userNode }) : void 0, he = o ? (ne) => o(ne, { ...T.userNode }) : void 0, R = s ? (ne) => s(ne, { ...T.userNode }) : void 0, O = c ? (ne) => c(ne, { ...T.userNode }) : void 0, te = (ne) => {
    const { selectNodesOnDrag: xe, nodeDragThreshold: Se } = ie.getState();
    J && (!xe || !G || Se > 0) && Vm({ id: e12, store: ie, nodeRef: j }), i && i(ne, { ...T.userNode });
  }, pe = (ne) => {
    if (!(jw(ne.nativeEvent) || S)) {
      if (vw.includes(ne.key) && J) {
        const xe = ne.key === "Escape";
        Vm({ id: e12, store: ie, unselect: xe, nodeRef: j });
      } else if (G && k.selected && Object.prototype.hasOwnProperty.call(Dc, ne.key)) {
        ne.preventDefault();
        const { ariaLabelConfig: xe } = ie.getState();
        ie.setState({ ariaLiveMessage: xe["node.a11yDescription.ariaLiveMessage"]({ direction: ne.key.replace("Arrow", "").toLowerCase(), x: ~~T.positionAbsolute.x, y: ~~T.positionAbsolute.y }) }), H({ direction: Dc[ne.key], factor: ne.shiftKey ? 4 : 1 });
      }
    }
  }, me = () => {
    var Ce;
    if (S || !((Ce = j.current) != null && Ce.matches(":focus-visible")))
      return;
    const { transform: ne, width: xe, height: Se, autoPanOnNodeFocus: fe, setCenter: q } = ie.getState();
    if (!fe)
      return;
    Sp(/* @__PURE__ */ new Map([[e12, k]]), { x: 0, y: 0, width: xe, height: Se }, ne, true).length > 0 || q(k.position.x + V.width / 2, k.position.y + V.height / 2, { zoom: ne[2] });
  };
  return b.jsx("div", { className: Qt(["react-flow__node", `react-flow__node-${M}`, { [v]: G }, k.className, { selected: k.selected, selectable: J, parent: Y, draggable: G, dragging: D }]), ref: j, style: { zIndex: T.z, transform: `translate(${T.positionAbsolute.x}px,${T.positionAbsolute.y}px)`, pointerEvents: F ? "all" : "none", visibility: re ? "visible" : "hidden", ...k.style, ...$ }, "data-id": e12, "data-testid": `rf__node-${e12}`, onMouseEnter: _, onMouseMove: se, onMouseLeave: he, onContextMenu: R, onClick: te, onDoubleClick: O, onKeyDown: X ? pe : void 0, tabIndex: X ? 0 : void 0, onFocus: X ? me : void 0, role: k.ariaRole ?? (X ? "group" : void 0), "aria-roledescription": "node", "aria-describedby": S ? void 0 : `${Pw}-${E}`, "aria-label": k.ariaLabel, ...k.domAttributes, children: b.jsx(T4, { value: e12, children: b.jsx(B, { id: e12, data: k.data, type: M, positionAbsoluteX: T.positionAbsolute.x, positionAbsoluteY: T.positionAbsolute.y, selected: k.selected ?? false, selectable: J, draggable: G, deletable: k.deletable ?? true, isConnectable: U, sourcePosition: k.sourcePosition, targetPosition: k.targetPosition, dragging: D, dragHandle: k.dragHandle, zIndex: T.z, parentId: k.parentId, ...V }) }) });
}
var P4 = L.memo(K4);
const J4 = (e12) => ({ nodesConnectable: e12.nodesConnectable, nodesFocusable: e12.nodesFocusable, elementsSelectable: e12.elementsSelectable, onError: e12.onError });
function f2(e12) {
  const { nodesConnectable: i, nodesFocusable: l, elementsSelectable: a, onError: o } = ot(J4, Mt), s = $4(e12.onlyRenderVisibleElements), c = Z4();
  return b.jsx("div", { className: "react-flow__nodes", style: ef, children: s.map((d) => b.jsx(P4, { id: d, nodeTypes: e12.nodeTypes, nodeExtent: e12.nodeExtent, onClick: e12.onNodeClick, onMouseEnter: e12.onNodeMouseEnter, onMouseMove: e12.onNodeMouseMove, onMouseLeave: e12.onNodeMouseLeave, onContextMenu: e12.onNodeContextMenu, onDoubleClick: e12.onNodeDoubleClick, noDragClassName: e12.noDragClassName, noPanClassName: e12.noPanClassName, rfId: e12.rfId, disableKeyboardA11y: e12.disableKeyboardA11y, resizeObserver: c, nodesDraggable: e12.nodesDraggable ?? true, nodesConnectable: i, nodesFocusable: l, elementsSelectable: a, nodeClickDistance: e12.nodeClickDistance, onError: o }, d)) });
}
f2.displayName = "NodeRenderer";
const W4 = L.memo(f2);
function eA(e12) {
  return ot(L.useCallback((l) => {
    if (!e12)
      return l.edges.map((o) => o.id);
    const a = [];
    if (l.width && l.height)
      for (const o of l.edges) {
        const s = l.nodeLookup.get(o.source), c = l.nodeLookup.get(o.target);
        s && c && ZT({ sourceNode: s, targetNode: c, width: l.width, height: l.height, transform: l.transform }) && a.push(o.id);
      }
    return a;
  }, [e12]), Mt);
}
const tA = ({ color: e12 = "none", strokeWidth: i = 1 }) => {
  const l = { strokeWidth: i, ...e12 && { stroke: e12 } };
  return b.jsx("polyline", { className: "arrow", style: l, strokeLinecap: "round", fill: "none", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4" });
}, nA = ({ color: e12 = "none", strokeWidth: i = 1 }) => {
  const l = { strokeWidth: i, ...e12 && { stroke: e12, fill: e12 } };
  return b.jsx("polyline", { className: "arrowclosed", style: l, strokeLinecap: "round", strokeLinejoin: "round", points: "-5,-4 0,0 -5,4 -5,-4" });
}, bv = { [Ac.Arrow]: tA, [Ac.ArrowClosed]: nA };
function iA(e12) {
  const i = Tt();
  return L.useMemo(() => {
    var o, s;
    return Object.prototype.hasOwnProperty.call(bv, e12) ? bv[e12] : ((s = (o = i.getState()).onError) == null || s.call(o, "009", hi.error009(e12)), null);
  }, [e12]);
}
const lA = ({ id: e12, type: i, color: l, width: a = 12.5, height: o = 12.5, markerUnits: s = "strokeWidth", strokeWidth: c, orient: d = "auto-start-reverse" }) => {
  const m = iA(i);
  return m ? b.jsx("marker", { className: "react-flow__arrowhead", id: e12, markerWidth: `${a}`, markerHeight: `${o}`, viewBox: "-10 -10 20 20", markerUnits: s, orient: d, refX: "0", refY: "0", children: b.jsx(m, { color: l, strokeWidth: c }) }) : null;
}, d2 = ({ defaultColor: e12, rfId: i }) => {
  const l = ot((s) => s.edges), a = ot((s) => s.defaultEdgeOptions), o = L.useMemo(() => i3(l, { id: i, defaultColor: e12, defaultMarkerStart: a == null ? void 0 : a.markerStart, defaultMarkerEnd: a == null ? void 0 : a.markerEnd }), [l, a, i, e12]);
  return o.length ? b.jsx("svg", { className: "react-flow__marker", "aria-hidden": "true", children: b.jsx("defs", { children: o.map((s) => b.jsx(lA, { id: s.id, type: s.type, color: s.color, width: s.width, height: s.height, markerUnits: s.markerUnits, strokeWidth: s.strokeWidth, orient: s.orient }, s.id)) }) }) : null;
};
d2.displayName = "MarkerDefinitions";
var rA = L.memo(d2);
function h2({ x: e12, y: i, label: l, labelStyle: a, labelShowBg: o = true, labelBgStyle: s, labelBgPadding: c = [2, 4], labelBgBorderRadius: d = 2, children: m, className: g, ...y }) {
  const [p, x] = L.useState({ x: 1, y: 0, width: 0, height: 0 }), v = Qt(["react-flow__edge-textwrapper", g]), S = L.useRef(null);
  return L.useEffect(() => {
    if (S.current) {
      const E = S.current.getBBox();
      x({ x: E.x, y: E.y, width: E.width, height: E.height });
    }
  }, [l]), l ? b.jsxs("g", { transform: `translate(${e12 - p.width / 2} ${i - p.height / 2})`, className: v, visibility: p.width ? "visible" : "hidden", ...y, children: [o && b.jsx("rect", { width: p.width + 2 * c[0], x: -c[0], y: -c[1], height: p.height + 2 * c[1], className: "react-flow__edge-textbg", style: s, rx: d, ry: d }), b.jsx("text", { className: "react-flow__edge-text", y: p.height / 2, dy: "0.3em", ref: S, style: a, children: l }), m] }) : null;
}
h2.displayName = "EdgeText";
const aA = L.memo(h2);
function tf({ path: e12, labelX: i, labelY: l, label: a, labelStyle: o, labelShowBg: s, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m, interactionWidth: g = 20, ...y }) {
  return b.jsxs(b.Fragment, { children: [b.jsx("path", { ...y, d: e12, fill: "none", className: Qt(["react-flow__edge-path", y.className]) }), g ? b.jsx("path", { d: e12, fill: "none", strokeOpacity: 0, strokeWidth: g, className: "react-flow__edge-interaction" }) : null, a && si(i) && si(l) ? b.jsx(aA, { x: i, y: l, label: a, labelStyle: o, labelShowBg: s, labelBgStyle: c, labelBgPadding: d, labelBgBorderRadius: m }) : null] });
}
function wv({ pos: e12, x1: i, y1: l, x2: a, y2: o }) {
  return e12 === Ie.Left || e12 === Ie.Right ? [0.5 * (i + a), l] : [i, 0.5 * (l + o)];
}
function m2({ sourceX: e12, sourceY: i, sourcePosition: l = Ie.Bottom, targetX: a, targetY: o, targetPosition: s = Ie.Top }) {
  const [c, d] = wv({ pos: l, x1: e12, y1: i, x2: a, y2: o }), [m, g] = wv({ pos: s, x1: a, y1: o, x2: e12, y2: i }), [y, p, x, v] = Ow({ sourceX: e12, sourceY: i, targetX: a, targetY: o, sourceControlX: c, sourceControlY: d, targetControlX: m, targetControlY: g });
  return [`M${e12},${i} C${c},${d} ${m},${g} ${a},${o}`, y, p, x, v];
}
function p2(e12) {
  return L.memo(({ id: i, sourceX: l, sourceY: a, targetX: o, targetY: s, sourcePosition: c, targetPosition: d, label: m, labelStyle: g, labelShowBg: y, labelBgStyle: p, labelBgPadding: x, labelBgBorderRadius: v, style: S, markerEnd: E, markerStart: N, interactionWidth: C }) => {
    const [A, k, T] = m2({ sourceX: l, sourceY: a, sourcePosition: c, targetX: o, targetY: s, targetPosition: d }), Y = e12.isInternal ? void 0 : i;
    return b.jsx(tf, { id: Y, path: A, labelX: k, labelY: T, label: m, labelStyle: g, labelShowBg: y, labelBgStyle: p, labelBgPadding: x, labelBgBorderRadius: v, style: S, markerEnd: E, markerStart: N, interactionWidth: C });
  });
}
const uA = p2({ isInternal: false }), g2 = p2({ isInternal: true });
uA.displayName = "SimpleBezierEdge";
g2.displayName = "SimpleBezierEdgeInternal";
function y2(e12) {
  return L.memo(({ id: i, sourceX: l, sourceY: a, targetX: o, targetY: s, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: p, style: x, sourcePosition: v = Ie.Bottom, targetPosition: S = Ie.Top, markerEnd: E, markerStart: N, pathOptions: C, interactionWidth: A }) => {
    const [k, T, Y] = Bm({ sourceX: l, sourceY: a, sourcePosition: v, targetX: o, targetY: s, targetPosition: S, borderRadius: C == null ? void 0 : C.borderRadius, offset: C == null ? void 0 : C.offset, stepPosition: C == null ? void 0 : C.stepPosition }), M = e12.isInternal ? void 0 : i;
    return b.jsx(tf, { id: M, path: k, labelX: T, labelY: Y, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: p, style: x, markerEnd: E, markerStart: N, interactionWidth: A });
  });
}
const x2 = y2({ isInternal: false }), v2 = y2({ isInternal: true });
x2.displayName = "SmoothStepEdge";
v2.displayName = "SmoothStepEdgeInternal";
function b2(e12) {
  return L.memo(({ id: i, ...l }) => {
    var o;
    const a = e12.isInternal ? void 0 : i;
    return b.jsx(x2, { ...l, id: a, pathOptions: L.useMemo(() => {
      var s;
      return { borderRadius: 0, offset: (s = l.pathOptions) == null ? void 0 : s.offset };
    }, [(o = l.pathOptions) == null ? void 0 : o.offset]) });
  });
}
const oA = b2({ isInternal: false }), w2 = b2({ isInternal: true });
oA.displayName = "StepEdge";
w2.displayName = "StepEdgeInternal";
function S2(e12) {
  return L.memo(({ id: i, sourceX: l, sourceY: a, targetX: o, targetY: s, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: p, style: x, markerEnd: v, markerStart: S, interactionWidth: E }) => {
    const [N, C, A] = Hw({ sourceX: l, sourceY: a, targetX: o, targetY: s }), k = e12.isInternal ? void 0 : i;
    return b.jsx(tf, { id: k, path: N, labelX: C, labelY: A, label: c, labelStyle: d, labelShowBg: m, labelBgStyle: g, labelBgPadding: y, labelBgBorderRadius: p, style: x, markerEnd: v, markerStart: S, interactionWidth: E });
  });
}
const sA = S2({ isInternal: false }), E2 = S2({ isInternal: true });
sA.displayName = "StraightEdge";
E2.displayName = "StraightEdgeInternal";
function C2(e12) {
  return L.memo(({ id: i, sourceX: l, sourceY: a, targetX: o, targetY: s, sourcePosition: c = Ie.Bottom, targetPosition: d = Ie.Top, label: m, labelStyle: g, labelShowBg: y, labelBgStyle: p, labelBgPadding: x, labelBgBorderRadius: v, style: S, markerEnd: E, markerStart: N, pathOptions: C, interactionWidth: A }) => {
    const [k, T, Y] = Rw({ sourceX: l, sourceY: a, sourcePosition: c, targetX: o, targetY: s, targetPosition: d, curvature: C == null ? void 0 : C.curvature }), M = e12.isInternal ? void 0 : i;
    return b.jsx(tf, { id: M, path: k, labelX: T, labelY: Y, label: m, labelStyle: g, labelShowBg: y, labelBgStyle: p, labelBgPadding: x, labelBgBorderRadius: v, style: S, markerEnd: E, markerStart: N, interactionWidth: A });
  });
}
const cA = C2({ isInternal: false }), k2 = C2({ isInternal: true });
cA.displayName = "BezierEdge";
k2.displayName = "BezierEdgeInternal";
const Sv = { default: k2, straight: E2, step: w2, smoothstep: v2, simplebezier: g2 }, Ev = { sourceX: null, sourceY: null, targetX: null, targetY: null, sourcePosition: null, targetPosition: null, zIndex: void 0 }, fA = (e12, i, l) => l === Ie.Left ? e12 - i : l === Ie.Right ? e12 + i : e12, dA = (e12, i, l) => l === Ie.Top ? e12 - i : l === Ie.Bottom ? e12 + i : e12, Cv = "react-flow__edgeupdater";
function kv({ position: e12, centerX: i, centerY: l, radius: a = 10, onMouseDown: o, onMouseEnter: s, onMouseOut: c, type: d }) {
  return b.jsx("circle", { onMouseDown: o, onMouseEnter: s, onMouseOut: c, className: Qt([Cv, `${Cv}-${d}`]), cx: fA(i, a, e12), cy: dA(l, a, e12), r: a, stroke: "transparent", fill: "transparent" });
}
function hA({ isReconnectable: e12, reconnectRadius: i, edge: l, sourceX: a, sourceY: o, targetX: s, targetY: c, sourcePosition: d, targetPosition: m, onReconnect: g, onReconnectStart: y, onReconnectEnd: p, setReconnecting: x, setUpdateHover: v }) {
  const S = Tt(), E = (T, Y) => {
    if (T.button !== 0)
      return;
    const { autoPanOnConnect: M, domNode: B, connectionMode: G, connectionRadius: J, lib: U, onConnectStart: X, cancelConnection: ie, nodeLookup: re, rfId: j, panBy: D, updateConnection: H } = S.getState(), V = Y.type === "target", $ = (se, he) => {
      x(false), p == null || p(se, l, Y.type, he);
    }, F = (se) => g == null ? void 0 : g(l, se), _ = (se, he) => {
      x(true), y == null || y(T, l, Y.type), X == null || X(se, he);
    };
    qm.onPointerDown(T.nativeEvent, { autoPanOnConnect: M, connectionMode: G, connectionRadius: J, domNode: B, handleId: Y.id, nodeId: Y.nodeId, nodeLookup: re, isTarget: V, edgeUpdaterType: Y.type, lib: U, flowId: j, cancelConnection: ie, panBy: D, isValidConnection: (...se) => {
      var he, R;
      return ((R = (he = S.getState()).isValidConnection) == null ? void 0 : R.call(he, ...se)) ?? true;
    }, onConnect: F, onConnectStart: _, onConnectEnd: (...se) => {
      var he, R;
      return (R = (he = S.getState()).onConnectEnd) == null ? void 0 : R.call(he, ...se);
    }, onReconnectEnd: $, updateConnection: H, getTransform: () => S.getState().transform, getFromHandle: () => S.getState().connection.fromHandle, dragThreshold: S.getState().connectionDragThreshold, handleDomNode: T.currentTarget });
  }, N = (T) => E(T, { nodeId: l.target, id: l.targetHandle ?? null, type: "target" }), C = (T) => E(T, { nodeId: l.source, id: l.sourceHandle ?? null, type: "source" }), A = () => v(true), k = () => v(false);
  return b.jsxs(b.Fragment, { children: [(e12 === true || e12 === "source") && b.jsx(kv, { position: d, centerX: a, centerY: o, radius: i, onMouseDown: N, onMouseEnter: A, onMouseOut: k, type: "source" }), (e12 === true || e12 === "target") && b.jsx(kv, { position: m, centerX: s, centerY: c, radius: i, onMouseDown: C, onMouseEnter: A, onMouseOut: k, type: "target" })] });
}
function mA({ id: e12, edgesFocusable: i, edgesReconnectable: l, elementsSelectable: a, onClick: o, onDoubleClick: s, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: g, reconnectRadius: y, onReconnect: p, onReconnectStart: x, onReconnectEnd: v, rfId: S, edgeTypes: E, noPanClassName: N, onError: C, disableKeyboardA11y: A }) {
  let k = ot((q) => q.edgeLookup.get(e12));
  const T = ot((q) => q.defaultEdgeOptions);
  k = T ? { ...T, ...k } : k;
  let Y = k.type || "default", M = (E == null ? void 0 : E[Y]) || Sv[Y];
  M === void 0 && (C == null || C("011", hi.error011(Y)), Y = "default", M = (E == null ? void 0 : E.default) || Sv.default);
  const B = !!(k.focusable || i && typeof k.focusable > "u"), G = typeof p < "u" && (k.reconnectable || l && typeof k.reconnectable > "u"), J = !!(k.selectable || a && typeof k.selectable > "u"), U = L.useRef(null), [X, ie] = L.useState(false), [re, j] = L.useState(false), D = Tt(), { zIndex: H = k.zIndex, sourceX: V, sourceY: $, targetX: F, targetY: _, sourcePosition: se, targetPosition: he } = ot(L.useCallback((q) => {
    const we = q.nodeLookup.get(k.source), Ce = q.nodeLookup.get(k.target);
    if (!we || !Ce)
      return Ev;
    const Te = n3({ id: e12, sourceNode: we, targetNode: Ce, sourceHandle: k.sourceHandle || null, targetHandle: k.targetHandle || null, connectionMode: q.connectionMode, onError: C }), Ae = QT({ selected: k.selected, zIndex: k.zIndex, sourceNode: we, targetNode: Ce, elevateOnSelect: q.elevateEdgesOnSelect, zIndexMode: q.zIndexMode });
    return { ...Te || Ev, zIndex: Ae };
  }, [k.source, k.target, k.sourceHandle, k.targetHandle, k.selected, k.zIndex, C]), Mt), R = L.useMemo(() => k.markerStart ? `url('#${Um(k.markerStart, S)}')` : void 0, [k.markerStart, S]), O = L.useMemo(() => k.markerEnd ? `url('#${Um(k.markerEnd, S)}')` : void 0, [k.markerEnd, S]);
  if (k.hidden || V === null || $ === null || F === null || _ === null)
    return null;
  const te = (q) => {
    var Ae;
    const { addSelectedEdges: we, unselectNodesAndEdges: Ce, multiSelectionActive: Te } = D.getState();
    J && (D.setState({ nodesSelectionActive: false }), k.selected && Te ? (Ce({ nodes: [], edges: [k] }), (Ae = U.current) == null || Ae.blur()) : we([e12])), o && o(q, k);
  }, pe = s ? (q) => {
    s(q, { ...k });
  } : void 0, me = c ? (q) => {
    c(q, { ...k });
  } : void 0, ne = d ? (q) => {
    d(q, { ...k });
  } : void 0, xe = m ? (q) => {
    m(q, { ...k });
  } : void 0, Se = g ? (q) => {
    g(q, { ...k });
  } : void 0, fe = (q) => {
    var we;
    if (!A && vw.includes(q.key) && J) {
      const { unselectNodesAndEdges: Ce, addSelectedEdges: Te } = D.getState();
      q.key === "Escape" ? ((we = U.current) == null || we.blur(), Ce({ edges: [k] })) : Te([e12]);
    }
  };
  return b.jsx("svg", { style: { zIndex: H }, children: b.jsxs("g", { className: Qt(["react-flow__edge", `react-flow__edge-${Y}`, k.className, N, { selected: k.selected, animated: k.animated, inactive: !J && !o, updating: X, selectable: J }]), onClick: te, onDoubleClick: pe, onContextMenu: me, onMouseEnter: ne, onMouseMove: xe, onMouseLeave: Se, onKeyDown: B ? fe : void 0, tabIndex: B ? 0 : void 0, role: k.ariaRole ?? (B ? "group" : "img"), "aria-roledescription": "edge", "data-id": e12, "data-testid": `rf__edge-${e12}`, "aria-label": k.ariaLabel === null ? void 0 : k.ariaLabel || `Edge from ${k.source} to ${k.target}`, "aria-describedby": B ? `${Jw}-${S}` : void 0, ref: U, ...k.domAttributes, children: [!re && b.jsx(M, { id: e12, source: k.source, target: k.target, type: k.type, selected: k.selected, animated: k.animated, selectable: J, deletable: k.deletable ?? true, label: k.label, labelStyle: k.labelStyle, labelShowBg: k.labelShowBg, labelBgStyle: k.labelBgStyle, labelBgPadding: k.labelBgPadding, labelBgBorderRadius: k.labelBgBorderRadius, sourceX: V, sourceY: $, targetX: F, targetY: _, sourcePosition: se, targetPosition: he, data: k.data, style: k.style, sourceHandleId: k.sourceHandle, targetHandleId: k.targetHandle, markerStart: R, markerEnd: O, pathOptions: "pathOptions" in k ? k.pathOptions : void 0, interactionWidth: k.interactionWidth }), G && b.jsx(hA, { edge: k, isReconnectable: G, reconnectRadius: y, onReconnect: p, onReconnectStart: x, onReconnectEnd: v, sourceX: V, sourceY: $, targetX: F, targetY: _, sourcePosition: se, targetPosition: he, setUpdateHover: ie, setReconnecting: j })] }) });
}
var pA = L.memo(mA);
const gA = (e12) => ({ edgesFocusable: e12.edgesFocusable, edgesReconnectable: e12.edgesReconnectable, elementsSelectable: e12.elementsSelectable, connectionMode: e12.connectionMode, onError: e12.onError });
function N2({ defaultMarkerColor: e12, onlyRenderVisibleElements: i, rfId: l, edgeTypes: a, noPanClassName: o, onReconnect: s, onEdgeContextMenu: c, onEdgeMouseEnter: d, onEdgeMouseMove: m, onEdgeMouseLeave: g, onEdgeClick: y, reconnectRadius: p, onEdgeDoubleClick: x, onReconnectStart: v, onReconnectEnd: S, disableKeyboardA11y: E }) {
  const { edgesFocusable: N, edgesReconnectable: C, elementsSelectable: A, onError: k } = ot(gA, Mt), T = eA(i);
  return b.jsxs("div", { className: "react-flow__edges", children: [b.jsx(rA, { defaultColor: e12, rfId: l }), T.map((Y) => b.jsx(pA, { id: Y, edgesFocusable: N, edgesReconnectable: C, elementsSelectable: A, noPanClassName: o, onReconnect: s, onContextMenu: c, onMouseEnter: d, onMouseMove: m, onMouseLeave: g, onClick: y, reconnectRadius: p, onDoubleClick: x, onReconnectStart: v, onReconnectEnd: S, rfId: l, onError: k, edgeTypes: a, disableKeyboardA11y: E }, Y))] });
}
N2.displayName = "EdgeRenderer";
const yA = L.memo(N2), Nv = (e12) => `translate(${e12[0]}px,${e12[1]}px) scale(${e12[2]})`;
function xA({ children: e12 }) {
  const i = Tt(), l = L.useRef(null), [a] = L.useState(() => i.getState().transform);
  return l2(() => {
    let o = null;
    const s = () => {
      const c = i.getState().transform;
      o && c[0] === o[0] && c[1] === o[1] && c[2] === o[2] || (o = c, l.current && (l.current.style.transform = Nv(c)));
    };
    return s(), i.subscribe(s);
  }, [i]), b.jsx("div", { ref: l, className: "react-flow__viewport xyflow__viewport react-flow__container", style: { transform: Nv(a) }, children: e12 });
}
function vA(e12) {
  const i = Eo(), l = L.useRef(false);
  L.useEffect(() => {
    !l.current && i.viewportInitialized && e12 && (setTimeout(() => e12(i), 1), l.current = true);
  }, [e12, i.viewportInitialized]);
}
const bA = (e12) => {
  var i;
  return (i = e12.panZoom) == null ? void 0 : i.syncViewport;
};
function wA(e12) {
  const i = ot(bA), l = Tt();
  return L.useEffect(() => {
    e12 && (i == null || i(e12), l.setState({ transform: [e12.x, e12.y, e12.zoom] }));
  }, [e12, i]), null;
}
function SA(e12) {
  return e12.connection.inProgress ? { ...e12.connection, to: So(e12.connection.to, e12.transform) } : { ...e12.connection };
}
function EA(e12) {
  return SA;
}
function CA(e12) {
  const i = EA();
  return ot(i, Mt);
}
const kA = (e12) => ({ nodesConnectable: e12.nodesConnectable, isValid: e12.connection.isValid, inProgress: e12.connection.inProgress, width: e12.width, height: e12.height });
function NA({ containerStyle: e12, style: i, type: l, component: a }) {
  const { nodesConnectable: o, width: s, height: c, isValid: d, inProgress: m } = ot(kA, Mt);
  return !(s && o && m) ? null : b.jsx("svg", { style: e12, width: s, height: c, className: "react-flow__connectionline react-flow__container", children: b.jsx("g", { className: Qt(["react-flow__connection", Aw(d)]), children: b.jsx(_2, { style: i, type: l, CustomComponent: a, isValid: d }) }) });
}
const _2 = ({ style: e12, type: i = ql.Bezier, CustomComponent: l, isValid: a }) => {
  const { inProgress: o, from: s, fromNode: c, fromHandle: d, fromPosition: m, to: g, toNode: y, toHandle: p, toPosition: x, pointer: v } = CA();
  if (!o)
    return;
  if (l)
    return b.jsx(l, { connectionLineType: i, connectionLineStyle: e12, fromNode: c, fromHandle: d, fromX: s.x, fromY: s.y, toX: g.x, toY: g.y, fromPosition: m, toPosition: x, connectionStatus: Aw(a), toNode: y, toHandle: p, pointer: v });
  let S = "";
  const E = { sourceX: s.x, sourceY: s.y, sourcePosition: m, targetX: g.x, targetY: g.y, targetPosition: x };
  switch (i) {
    case ql.Bezier:
      [S] = Rw(E);
      break;
    case ql.SimpleBezier:
      [S] = m2(E);
      break;
    case ql.Step:
      [S] = Bm({ ...E, borderRadius: 0 });
      break;
    case ql.SmoothStep:
      [S] = Bm(E);
      break;
    default:
      [S] = Hw(E);
  }
  return b.jsx("path", { d: S, fill: "none", className: "react-flow__connection-path", style: e12 });
};
_2.displayName = "ConnectionLine";
const _A = {};
function _v(e12 = _A) {
  L.useRef(e12), Tt(), L.useEffect(() => {
  }, [e12]);
}
function zA() {
  Tt(), L.useRef(false), L.useEffect(() => {
  }, []);
}
function z2({ nodeTypes: e12, edgeTypes: i, onInit: l, onNodeClick: a, onEdgeClick: o, onNodeDoubleClick: s, onEdgeDoubleClick: c, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: g, onNodeContextMenu: y, onSelectionContextMenu: p, onSelectionStart: x, onSelectionEnd: v, connectionLineType: S, connectionLineStyle: E, connectionLineComponent: N, connectionLineContainerStyle: C, selectionKeyCode: A, selectionOnDrag: k, selectionMode: T, multiSelectionKeyCode: Y, panActivationKeyCode: M, zoomActivationKeyCode: B, deleteKeyCode: G, onlyRenderVisibleElements: J, elementsSelectable: U, defaultViewport: X, translateExtent: ie, minZoom: re, maxZoom: j, preventScrolling: D, defaultMarkerColor: H, zoomOnScroll: V, zoomOnPinch: $, panOnScroll: F, panOnScrollSpeed: _, panOnScrollMode: se, zoomOnDoubleClick: he, panOnDrag: R, autoPanOnSelection: O, onPaneClick: te, onPaneMouseEnter: pe, onPaneMouseMove: me, onPaneMouseLeave: ne, onPaneScroll: xe, onPaneContextMenu: Se, paneClickDistance: fe, nodeClickDistance: q, onEdgeContextMenu: we, onEdgeMouseEnter: Ce, onEdgeMouseMove: Te, onEdgeMouseLeave: Ae, reconnectRadius: Ee, onReconnect: qe, onReconnectStart: Le, onReconnectEnd: pt, noDragClassName: vt, noWheelClassName: Lt, noPanClassName: Zt, disableKeyboardA11y: Ht, nodeExtent: _t, rfId: ce, viewport: K, onViewportChange: de, nodesDraggable: Ne }) {
  return _v(e12), _v(i), zA(), vA(l), wA(K), b.jsx(X4, { onPaneClick: te, onPaneMouseEnter: pe, onPaneMouseMove: me, onPaneMouseLeave: ne, onPaneContextMenu: Se, onPaneScroll: xe, paneClickDistance: fe, deleteKeyCode: G, selectionKeyCode: A, selectionOnDrag: k, selectionMode: T, onSelectionStart: x, onSelectionEnd: v, multiSelectionKeyCode: Y, panActivationKeyCode: M, zoomActivationKeyCode: B, elementsSelectable: U, zoomOnScroll: V, zoomOnPinch: $, zoomOnDoubleClick: he, panOnScroll: F, panOnScrollSpeed: _, panOnScrollMode: se, panOnDrag: R, autoPanOnSelection: O, defaultViewport: X, translateExtent: ie, minZoom: re, maxZoom: j, onSelectionContextMenu: p, preventScrolling: D, noDragClassName: vt, noWheelClassName: Lt, noPanClassName: Zt, disableKeyboardA11y: Ht, onViewportChange: de, isControlledViewport: !!K, children: b.jsxs(xA, { children: [b.jsx(yA, { edgeTypes: i, onEdgeClick: o, onEdgeDoubleClick: c, onReconnect: qe, onReconnectStart: Le, onReconnectEnd: pt, onlyRenderVisibleElements: J, onEdgeContextMenu: we, onEdgeMouseEnter: Ce, onEdgeMouseMove: Te, onEdgeMouseLeave: Ae, reconnectRadius: Ee, defaultMarkerColor: H, noPanClassName: Zt, disableKeyboardA11y: Ht, rfId: ce }), b.jsx(NA, { style: E, type: S, component: N, containerStyle: C }), b.jsx("div", { className: "react-flow__edgelabel-renderer" }), b.jsx(W4, { nodeTypes: e12, onNodeClick: a, onNodeDoubleClick: s, onNodeMouseEnter: d, onNodeMouseMove: m, onNodeMouseLeave: g, onNodeContextMenu: y, nodeClickDistance: q, onlyRenderVisibleElements: J, noPanClassName: Zt, noDragClassName: vt, disableKeyboardA11y: Ht, nodeExtent: _t, rfId: ce, nodesDraggable: Ne }), b.jsx("div", { className: "react-flow__viewport-portal" })] }) });
}
z2.displayName = "GraphView";
const TA = L.memo(z2), AA = _w(), zv = ({ nodes: e12, edges: i, defaultNodes: l, defaultEdges: a, width: o, height: s, fitView: c, fitViewOptions: d, minZoom: m = 0.5, maxZoom: g = 2, nodeOrigin: y, nodeExtent: p, zIndexMode: x = "basic" } = {}) => {
  const v = /* @__PURE__ */ new Map(), S = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), N = /* @__PURE__ */ new Map(), C = a ?? i ?? [], A = l ?? e12 ?? [], k = y ?? [0, 0], T = p ?? so;
  Iw(E, N, C);
  const { nodesInitialized: Y } = Im(A, v, S, { nodeOrigin: k, nodeExtent: T, zIndexMode: x });
  let M = [0, 0, 1];
  if (c && o && s) {
    const B = bo(v, { filter: (X) => !!((X.width || X.initialWidth) && (X.height || X.initialHeight)) }), { x: G, y: J, zoom: U } = Cp(B, o, s, m, g, (d == null ? void 0 : d.padding) ?? 0.1);
    M = [G, J, U];
  }
  return { rfId: "1", width: o ?? 0, height: s ?? 0, transform: M, nodes: A, nodesInitialized: Y, nodeLookup: v, parentLookup: S, edges: C, edgeLookup: N, connectionLookup: E, onNodesChange: null, onEdgesChange: null, hasDefaultNodes: l !== void 0, hasDefaultEdges: a !== void 0, panZoom: null, minZoom: m, maxZoom: g, translateExtent: so, nodeExtent: T, nodesSelectionActive: false, userSelectionActive: false, userSelectionRect: null, connectionMode: Ua.Strict, domNode: null, paneDragging: false, noPanClassName: "nopan", nodeOrigin: k, nodeDragThreshold: 1, connectionDragThreshold: 1, snapGrid: [15, 15], snapToGrid: false, nodesDraggable: true, nodesConnectable: true, nodesFocusable: true, edgesFocusable: true, edgesReconnectable: true, elementsSelectable: true, elevateNodesOnSelect: true, elevateEdgesOnSelect: true, selectNodesOnDrag: true, multiSelectionActive: false, fitViewQueued: c ?? false, fitViewOptions: d, fitViewResolver: null, connection: { ...ww }, connectionClickStartHandle: null, connectOnClick: true, ariaLiveMessage: "", autoPanOnConnect: true, autoPanOnNodeDrag: true, autoPanOnNodeFocus: true, autoPanSpeed: 15, connectionRadius: 20, onError: AA, isValidConnection: void 0, onSelectionChangeHandlers: [], lib: "react", debug: false, ariaLabelConfig: bw, zIndexMode: x, defaultEdgeOptions: void 0, onNodesChangeMiddlewareMap: /* @__PURE__ */ new Map(), onEdgesChangeMiddlewareMap: /* @__PURE__ */ new Map(), onNodesDelete: void 0, onEdgesDelete: void 0, onDelete: void 0, onBeforeDelete: void 0, onViewportChangeStart: void 0, onViewportChange: void 0, onViewportChangeEnd: void 0, onNodeDragStart: void 0, onNodeDrag: void 0, onNodeDragStop: void 0, onSelectionDragStart: void 0, onSelectionDrag: void 0, onSelectionDragStop: void 0, onMoveStart: void 0, onMove: void 0, onMoveEnd: void 0, onConnect: void 0, onConnectStart: void 0, onConnectEnd: void 0, onClickConnectStart: void 0, onClickConnectEnd: void 0 };
}, MA = ({ nodes: e12, edges: i, defaultNodes: l, defaultEdges: a, width: o, height: s, fitView: c, fitViewOptions: d, minZoom: m, maxZoom: g, nodeOrigin: y, nodeExtent: p, zIndexMode: x }) => G3((v, S) => {
  async function E() {
    const { nodeLookup: N, panZoom: C, fitViewOptions: A, fitViewResolver: k, width: T, height: Y, minZoom: M, maxZoom: B } = S();
    C && (await IT({ nodes: N, width: T, height: Y, panZoom: C, minZoom: M, maxZoom: B }, A), k == null || k.resolve(true), v({ fitViewResolver: null }));
  }
  return { ...zv({ nodes: e12, edges: i, width: o, height: s, fitView: c, fitViewOptions: d, minZoom: m, maxZoom: g, nodeOrigin: y, nodeExtent: p, defaultNodes: l, defaultEdges: a, zIndexMode: x }), setNodes: (N) => {
    const { nodeLookup: C, parentLookup: A, nodeOrigin: k, nodeExtent: T, elevateNodesOnSelect: Y, fitViewQueued: M, zIndexMode: B, nodesSelectionActive: G } = S(), { nodesInitialized: J, hasSelectedNodes: U } = Im(N, C, A, { nodeOrigin: k, nodeExtent: T, elevateNodesOnSelect: Y, checkEquality: true, zIndexMode: B }), X = G && U;
    M && J ? (E(), v({ nodes: N, nodesInitialized: J, fitViewQueued: false, fitViewOptions: void 0, nodesSelectionActive: X })) : v({ nodes: N, nodesInitialized: J, nodesSelectionActive: X });
  }, setEdges: (N) => {
    const { connectionLookup: C, edgeLookup: A } = S();
    Iw(C, A, N), v({ edges: N });
  }, setDefaultNodesAndEdges: (N, C) => {
    if (N) {
      const { setNodes: A } = S();
      A(N), v({ hasDefaultNodes: true });
    }
    if (C) {
      const { setEdges: A } = S();
      A(C), v({ hasDefaultEdges: true });
    }
  }, updateNodeInternals: (N) => {
    const { triggerNodeChanges: C, nodeLookup: A, parentLookup: k, domNode: T, nodeOrigin: Y, nodeExtent: M, debug: B, fitViewQueued: G, zIndexMode: J } = S(), { changes: U, updatedInternals: X } = c3(N, A, k, T, Y, M, J);
    X && (a3(A, k, { nodeOrigin: Y, nodeExtent: M, zIndexMode: J }), G ? (E(), v({ fitViewQueued: false, fitViewOptions: void 0 })) : v({}), (U == null ? void 0 : U.length) > 0 && (B && console.log("React Flow: trigger node changes", U), C == null || C(U)));
  }, updateNodePositions: (N, C = false) => {
    const A = [];
    let k = [];
    const { nodeLookup: T, triggerNodeChanges: Y, connection: M, updateConnection: B, onNodesChangeMiddlewareMap: G } = S();
    for (const [J, U] of N) {
      const X = T.get(J), ie = !!(X != null && X.expandParent && (X != null && X.parentId) && (U != null && U.position)), re = { id: J, type: "position", position: ie ? { x: Math.max(0, U.position.x), y: Math.max(0, U.position.y) } : U.position, dragging: C };
      if (X && M.inProgress && M.fromNode.id === X.id) {
        const j = Or(X, M.fromHandle, Ie.Left, true);
        B({ ...M, from: j });
      }
      ie && X.parentId && A.push({ id: J, parentId: X.parentId, rect: { ...U.internals.positionAbsolute, width: U.measured.width ?? 0, height: U.measured.height ?? 0 } }), k.push(re);
    }
    if (A.length > 0) {
      const { parentLookup: J, nodeOrigin: U } = S(), X = Ap(A, T, J, U);
      k.push(...X);
    }
    for (const J of G.values())
      k = J(k);
    Y(k);
  }, triggerNodeChanges: (N) => {
    const { onNodesChange: C, setNodes: A, nodes: k, hasDefaultNodes: T, debug: Y } = S();
    if (N != null && N.length) {
      if (T) {
        const M = t2(N, k);
        A(M);
      }
      Y && console.log("React Flow: trigger node changes", N), C == null || C(N);
    }
  }, triggerEdgeChanges: (N) => {
    const { onEdgesChange: C, setEdges: A, edges: k, hasDefaultEdges: T, debug: Y } = S();
    if (N != null && N.length) {
      if (T) {
        const M = n2(N, k);
        A(M);
      }
      Y && console.log("React Flow: trigger edge changes", N), C == null || C(N);
    }
  }, addSelectedNodes: (N) => {
    const { multiSelectionActive: C, edgeLookup: A, nodeLookup: k, triggerNodeChanges: T, triggerEdgeChanges: Y } = S();
    if (C) {
      const M = N.map((B) => vr(B, true));
      T(M);
      return;
    }
    T(za(k, /* @__PURE__ */ new Set([...N]))), Y(za(A));
  }, addSelectedEdges: (N) => {
    const { multiSelectionActive: C, edgeLookup: A, nodeLookup: k, triggerNodeChanges: T, triggerEdgeChanges: Y } = S();
    if (C) {
      const M = N.map((B) => vr(B, true));
      Y(M);
      return;
    }
    Y(za(A, /* @__PURE__ */ new Set([...N]))), T(za(k, /* @__PURE__ */ new Set()));
  }, unselectNodesAndEdges: ({ nodes: N, edges: C } = {}) => {
    const { edges: A, nodes: k, nodeLookup: T, triggerNodeChanges: Y, triggerEdgeChanges: M } = S(), B = N || k, G = C || A, J = [];
    for (const X of B)
      X.selected && J.push(vr(X.id, false));
    const U = [];
    for (const X of G)
      X.selected && U.push(vr(X.id, false));
    Y(J), M(U);
  }, setMinZoom: (N) => {
    const { panZoom: C, maxZoom: A } = S();
    C == null || C.setScaleExtent([N, A]), v({ minZoom: N });
  }, setMaxZoom: (N) => {
    const { panZoom: C, minZoom: A } = S();
    C == null || C.setScaleExtent([A, N]), v({ maxZoom: N });
  }, setTranslateExtent: (N) => {
    var C;
    (C = S().panZoom) == null || C.setTranslateExtent(N), v({ translateExtent: N });
  }, resetSelectedElements: () => {
    const { edges: N, nodes: C, triggerNodeChanges: A, triggerEdgeChanges: k, elementsSelectable: T } = S();
    if (!T)
      return;
    const Y = C.reduce((B, G) => G.selected ? [...B, vr(G.id, false)] : B, []), M = N.reduce((B, G) => G.selected ? [...B, vr(G.id, false)] : B, []);
    A(Y), k(M);
  }, setNodeExtent: (N) => {
    const { nodes: C, nodeLookup: A, parentLookup: k, nodeOrigin: T, elevateNodesOnSelect: Y, nodeExtent: M, zIndexMode: B } = S();
    N[0][0] === M[0][0] && N[0][1] === M[0][1] && N[1][0] === M[1][0] && N[1][1] === M[1][1] || (Im(C, A, k, { nodeOrigin: T, nodeExtent: N, elevateNodesOnSelect: Y, checkEquality: false, zIndexMode: B }), v({ nodeExtent: N }));
  }, panBy: (N) => {
    const { transform: C, width: A, height: k, panZoom: T, translateExtent: Y } = S();
    return f3({ delta: N, panZoom: T, transform: C, translateExtent: Y, width: A, height: k });
  }, setCenter: async (N, C, A) => {
    const { width: k, height: T, maxZoom: Y, panZoom: M } = S();
    if (!M)
      return false;
    const B = typeof (A == null ? void 0 : A.zoom) < "u" ? A.zoom : Y;
    return await M.setViewport({ x: k / 2 - N * B, y: T / 2 - C * B, zoom: B }, { duration: A == null ? void 0 : A.duration, ease: A == null ? void 0 : A.ease, interpolate: A == null ? void 0 : A.interpolate }), true;
  }, cancelConnection: () => {
    v({ connection: { ...ww } });
  }, updateConnection: (N) => {
    v({ connection: N });
  }, reset: () => v({ ...zv() }) };
}, Object.is);
function T2({ initialNodes: e12, initialEdges: i, defaultNodes: l, defaultEdges: a, initialWidth: o, initialHeight: s, initialMinZoom: c, initialMaxZoom: d, initialFitViewOptions: m, fitView: g, nodeOrigin: y, nodeExtent: p, zIndexMode: x, children: v }) {
  const [S] = L.useState(() => MA({ nodes: e12, edges: i, defaultNodes: l, defaultEdges: a, width: o, height: s, fitView: g, minZoom: c, maxZoom: d, fitViewOptions: m, nodeOrigin: y, nodeExtent: p, zIndexMode: x }));
  return b.jsx($3, { value: S, children: b.jsx(g4, { children: b.jsx(M4, { children: v }) }) });
}
function jA({ children: e12, nodes: i, edges: l, defaultNodes: a, defaultEdges: o, width: s, height: c, fitView: d, fitViewOptions: m, minZoom: g, maxZoom: y, nodeOrigin: p, nodeExtent: x, zIndexMode: v }) {
  return L.useContext(Wc) ? b.jsx(b.Fragment, { children: e12 }) : b.jsx(T2, { initialNodes: i, initialEdges: l, defaultNodes: a, defaultEdges: o, initialWidth: s, initialHeight: c, fitView: d, initialFitViewOptions: m, initialMinZoom: g, initialMaxZoom: y, nodeOrigin: p, nodeExtent: x, zIndexMode: v, children: e12 });
}
const DA = { width: "100%", height: "100%", overflow: "hidden", position: "relative", zIndex: 0 };
function OA({ nodes: e12, edges: i, defaultNodes: l, defaultEdges: a, className: o, nodeTypes: s, edgeTypes: c, onNodeClick: d, onEdgeClick: m, onInit: g, onMove: y, onMoveStart: p, onMoveEnd: x, onConnect: v, onConnectStart: S, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: C, onNodeMouseEnter: A, onNodeMouseMove: k, onNodeMouseLeave: T, onNodeContextMenu: Y, onNodeDoubleClick: M, onNodeDragStart: B, onNodeDrag: G, onNodeDragStop: J, onNodesDelete: U, onEdgesDelete: X, onDelete: ie, onSelectionChange: re, onSelectionDragStart: j, onSelectionDrag: D, onSelectionDragStop: H, onSelectionContextMenu: V, onSelectionStart: $, onSelectionEnd: F, onBeforeDelete: _, connectionMode: se, connectionLineType: he = ql.Bezier, connectionLineStyle: R, connectionLineComponent: O, connectionLineContainerStyle: te, deleteKeyCode: pe = "Backspace", selectionKeyCode: me = "Shift", selectionOnDrag: ne = false, selectionMode: xe = co.Full, panActivationKeyCode: Se = "Space", multiSelectionKeyCode: fe = ho() ? "Meta" : "Control", zoomActivationKeyCode: q = ho() ? "Meta" : "Control", snapToGrid: we, snapGrid: Ce, onlyRenderVisibleElements: Te = false, selectNodesOnDrag: Ae, nodesDraggable: Ee, autoPanOnNodeFocus: qe, nodesConnectable: Le, nodesFocusable: pt, nodeOrigin: vt = Ww, edgesFocusable: Lt, edgesReconnectable: Zt, elementsSelectable: Ht = true, defaultViewport: _t = r4, minZoom: ce = 0.5, maxZoom: K = 2, translateExtent: de = so, preventScrolling: Ne = true, nodeExtent: be, defaultMarkerColor: Ze = "#b1b1b7", zoomOnScroll: Ve = true, zoomOnPinch: Ke = true, panOnScroll: lt = false, panOnScrollSpeed: Ye = 0.5, panOnScrollMode: It = kr.Free, zoomOnDoubleClick: zt = true, panOnDrag: Oi = true, onPaneClick: bt, onPaneMouseEnter: Dt, onPaneMouseMove: dn, onPaneMouseLeave: Ft, onPaneScroll: gi, onPaneContextMenu: Hr, paneClickDistance: rl = 1, nodeClickDistance: Br = 0, children: Ql, onReconnect: In, onReconnectStart: nn, onReconnectEnd: Nn, onEdgeContextMenu: Pt, onEdgeDoubleClick: Za, onEdgeMouseEnter: Bt, onEdgeMouseMove: al, onEdgeMouseLeave: Ri, reconnectRadius: Jn = 10, onNodesChange: _n, onEdgesChange: qn, noDragClassName: ul = "nodrag", noWheelClassName: Li = "nowheel", noPanClassName: Zl = "nopan", fitView: Fa, fitViewOptions: Hi, connectOnClick: Z, attributionPosition: ue, proOptions: ge, defaultEdgeOptions: _e, elevateNodesOnSelect: ze = true, elevateEdgesOnSelect: je = false, disableKeyboardA11y: He = false, autoPanOnConnect: Re, autoPanOnNodeDrag: Ue, autoPanOnSelection: tt = true, autoPanSpeed: ft, connectionRadius: ht, isValidConnection: hn, onError: ol, style: zo, id: To, nodeDragThreshold: df, connectionDragThreshold: Ao, viewport: Fl, onViewportChange: Ur, width: Ir, height: Bi, colorMode: sl = "light", debug: Kl, onScroll: Wn, ariaLabelConfig: qt, zIndexMode: Ka = "basic", ...Mo }, jo) {
  const ei = To || "1", cl = s4(sl), hf = L.useCallback((Pa) => {
    Pa.currentTarget.scrollTo({ top: 0, left: 0, behavior: "instant" }), Wn == null || Wn(Pa);
  }, [Wn]);
  return b.jsx("div", { "data-testid": "rf__wrapper", ...Mo, onScroll: hf, style: { ...zo, ...DA }, ref: jo, className: Qt(["react-flow", o, cl]), id: To, role: "application", children: b.jsxs(jA, { nodes: e12, edges: i, width: Ir, height: Bi, fitView: Fa, fitViewOptions: Hi, minZoom: ce, maxZoom: K, nodeOrigin: vt, nodeExtent: be, zIndexMode: Ka, children: [b.jsx(o4, { nodes: e12, edges: i, defaultNodes: l, defaultEdges: a, onConnect: v, onConnectStart: S, onConnectEnd: E, onClickConnectStart: N, onClickConnectEnd: C, nodesDraggable: Ee, autoPanOnNodeFocus: qe, nodesConnectable: Le, nodesFocusable: pt, edgesFocusable: Lt, edgesReconnectable: Zt, elementsSelectable: Ht, elevateNodesOnSelect: ze, elevateEdgesOnSelect: je, minZoom: ce, maxZoom: K, nodeExtent: be, onNodesChange: _n, onEdgesChange: qn, snapToGrid: we, snapGrid: Ce, connectionMode: se, translateExtent: de, connectOnClick: Z, defaultEdgeOptions: _e, fitView: Fa, fitViewOptions: Hi, onNodesDelete: U, onEdgesDelete: X, onDelete: ie, onNodeDragStart: B, onNodeDrag: G, onNodeDragStop: J, onSelectionDrag: D, onSelectionDragStart: j, onSelectionDragStop: H, onMove: y, onMoveStart: p, onMoveEnd: x, noPanClassName: Zl, nodeOrigin: vt, rfId: ei, autoPanOnConnect: Re, autoPanOnNodeDrag: Ue, autoPanSpeed: ft, onError: ol, connectionRadius: ht, isValidConnection: hn, selectNodesOnDrag: Ae, nodeDragThreshold: df, connectionDragThreshold: Ao, onBeforeDelete: _, debug: Kl, ariaLabelConfig: qt, zIndexMode: Ka }), b.jsx(TA, { onInit: g, onNodeClick: d, onEdgeClick: m, onNodeMouseEnter: A, onNodeMouseMove: k, onNodeMouseLeave: T, onNodeContextMenu: Y, onNodeDoubleClick: M, nodeTypes: s, edgeTypes: c, connectionLineType: he, connectionLineStyle: R, connectionLineComponent: O, connectionLineContainerStyle: te, selectionKeyCode: me, selectionOnDrag: ne, selectionMode: xe, deleteKeyCode: pe, multiSelectionKeyCode: fe, panActivationKeyCode: Se, zoomActivationKeyCode: q, onlyRenderVisibleElements: Te, defaultViewport: _t, translateExtent: de, minZoom: ce, maxZoom: K, preventScrolling: Ne, zoomOnScroll: Ve, zoomOnPinch: Ke, zoomOnDoubleClick: zt, panOnScroll: lt, panOnScrollSpeed: Ye, panOnScrollMode: It, panOnDrag: Oi, autoPanOnSelection: tt, onPaneClick: bt, onPaneMouseEnter: Dt, onPaneMouseMove: dn, onPaneMouseLeave: Ft, onPaneScroll: gi, onPaneContextMenu: Hr, paneClickDistance: rl, nodeClickDistance: Br, onSelectionContextMenu: V, onSelectionStart: $, onSelectionEnd: F, onReconnect: In, onReconnectStart: nn, onReconnectEnd: Nn, onEdgeContextMenu: Pt, onEdgeDoubleClick: Za, onEdgeMouseEnter: Bt, onEdgeMouseMove: al, onEdgeMouseLeave: Ri, reconnectRadius: Jn, defaultMarkerColor: Ze, noDragClassName: ul, noWheelClassName: Li, noPanClassName: Zl, rfId: ei, disableKeyboardA11y: He, nodeExtent: be, viewport: Fl, onViewportChange: Ur, nodesDraggable: Ee }), b.jsx(l4, { onSelectionChange: re }), Ql, b.jsx(W3, { proOptions: ge, position: ue }), b.jsx(J3, { rfId: ei, disableKeyboardA11y: He })] }) });
}
var RA = i2(OA);
const LA = (e12) => ({ x: e12.transform[0], y: e12.transform[1], zoom: e12.transform[2] });
function HA() {
  return ot(LA, Mt);
}
function BA({ dimensions: e12, lineWidth: i, variant: l, className: a }) {
  return b.jsx("path", { strokeWidth: i, d: `M${e12[0] / 2} 0 V${e12[1]} M0 ${e12[1] / 2} H${e12[0]}`, className: Qt(["react-flow__background-pattern", l, a]) });
}
function UA({ radius: e12, className: i }) {
  return b.jsx("circle", { cx: e12, cy: e12, r: e12, className: Qt(["react-flow__background-pattern", "dots", i]) });
}
var nl;
(function(e12) {
  e12.Lines = "lines", e12.Dots = "dots", e12.Cross = "cross";
})(nl || (nl = {}));
const IA = { [nl.Dots]: 1, [nl.Lines]: 1, [nl.Cross]: 6 }, qA = (e12) => ({ transform: e12.transform, patternId: `pattern-${e12.rfId}` });
function A2({ id: e12, variant: i = nl.Dots, gap: l = 20, size: a, lineWidth: o = 1, offset: s = 0, color: c, bgColor: d, style: m, className: g, patternClassName: y }) {
  const p = L.useRef(null), { transform: x, patternId: v } = ot(qA, Mt), S = a || IA[i], E = i === nl.Dots, N = i === nl.Cross, C = Array.isArray(l) ? l : [l, l], A = [C[0] * x[2] || 1, C[1] * x[2] || 1], k = S * x[2], T = Array.isArray(s) ? s : [s, s], Y = N ? [k, k] : A, M = [T[0] * x[2] + Y[0] / 2, T[1] * x[2] + Y[1] / 2], B = `${v}${e12 || ""}`;
  return b.jsxs("svg", { className: Qt(["react-flow__background", g]), style: { ...m, ...ef, "--xy-background-color-props": d, "--xy-background-pattern-color-props": c }, ref: p, "data-testid": "rf__background", children: [b.jsx("pattern", { id: B, x: x[0] % A[0], y: x[1] % A[1], width: A[0], height: A[1], patternUnits: "userSpaceOnUse", patternTransform: `translate(-${M[0]},-${M[1]})`, children: E ? b.jsx(UA, { radius: k / 2, className: y }) : b.jsx(BA, { dimensions: Y, lineWidth: o, variant: i, className: y }) }), b.jsx("rect", { x: "0", y: "0", width: "100%", height: "100%", fill: `url(#${B})` })] });
}
A2.displayName = "Background";
const VA = L.memo(A2);
function YA() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", children: b.jsx("path", { d: "M32 18.133H18.133V32h-4.266V18.133H0v-4.266h13.867V0h4.266v13.867H32z" }) });
}
function XA() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 5", children: b.jsx("path", { d: "M0 0h32v4.2H0z" }) });
}
function GA() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 30", children: b.jsx("path", { d: "M3.692 4.63c0-.53.4-.938.939-.938h5.215V0H4.708C2.13 0 0 2.054 0 4.63v5.216h3.692V4.631zM27.354 0h-5.2v3.692h5.17c.53 0 .984.4.984.939v5.215H32V4.631A4.624 4.624 0 0027.354 0zm.954 24.83c0 .532-.4.94-.939.94h-5.215v3.768h5.215c2.577 0 4.631-2.13 4.631-4.707v-5.139h-3.692v5.139zm-23.677.94c-.531 0-.939-.4-.939-.94v-5.138H0v5.139c0 2.577 2.13 4.707 4.708 4.707h5.138V25.77H4.631z" }) });
}
function $A() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z" }) });
}
function QA() {
  return b.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 25 32", children: b.jsx("path", { d: "M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z" }) });
}
function uc({ children: e12, className: i, ...l }) {
  return b.jsx("button", { type: "button", className: Qt(["react-flow__controls-button", i]), ...l, children: e12 });
}
const ZA = (e12) => ({ isInteractive: e12.nodesDraggable || e12.nodesConnectable || e12.elementsSelectable, minZoomReached: e12.transform[2] <= e12.minZoom, maxZoomReached: e12.transform[2] >= e12.maxZoom, ariaLabelConfig: e12.ariaLabelConfig });
function M2({ style: e12, showZoom: i = true, showFitView: l = true, showInteractive: a = true, fitViewOptions: o, onZoomIn: s, onZoomOut: c, onFitView: d, onInteractiveChange: m, className: g, children: y, position: p = "bottom-left", orientation: x = "vertical", "aria-label": v }) {
  const S = Tt(), { isInteractive: E, minZoomReached: N, maxZoomReached: C, ariaLabelConfig: A } = ot(ZA, Mt), { zoomIn: k, zoomOut: T, fitView: Y } = Eo(), M = () => {
    k(), s == null || s();
  }, B = () => {
    T(), c == null || c();
  }, G = () => {
    Y(o), d == null || d();
  }, J = () => {
    S.setState({ nodesDraggable: !E, nodesConnectable: !E, elementsSelectable: !E }), m == null || m(!E);
  }, U = x === "horizontal" ? "horizontal" : "vertical";
  return b.jsxs(Nr, { className: Qt(["react-flow__controls", U, g]), position: p, style: e12, "data-testid": "rf__controls", "aria-label": v ?? A["controls.ariaLabel"], children: [i && b.jsxs(b.Fragment, { children: [b.jsx(uc, { onClick: M, className: "react-flow__controls-zoomin", title: A["controls.zoomIn.ariaLabel"], "aria-label": A["controls.zoomIn.ariaLabel"], disabled: C, children: b.jsx(YA, {}) }), b.jsx(uc, { onClick: B, className: "react-flow__controls-zoomout", title: A["controls.zoomOut.ariaLabel"], "aria-label": A["controls.zoomOut.ariaLabel"], disabled: N, children: b.jsx(XA, {}) })] }), l && b.jsx(uc, { className: "react-flow__controls-fitview", onClick: G, title: A["controls.fitView.ariaLabel"], "aria-label": A["controls.fitView.ariaLabel"], children: b.jsx(GA, {}) }), a && b.jsx(uc, { className: "react-flow__controls-interactive", onClick: J, title: A["controls.interactive.ariaLabel"], "aria-label": A["controls.interactive.ariaLabel"], children: E ? b.jsx(QA, {}) : b.jsx($A, {}) }), y] });
}
M2.displayName = "Controls";
L.memo(M2);
function FA({ id: e12, x: i, y: l, width: a, height: o, style: s, color: c, strokeColor: d, strokeWidth: m, className: g, borderRadius: y, shapeRendering: p, selected: x, onClick: v }) {
  const { background: S, backgroundColor: E } = s || {}, N = c || S || E;
  return b.jsx("rect", { className: Qt(["react-flow__minimap-node", { selected: x }, g]), x: i, y: l, rx: y, ry: y, width: a, height: o, style: { fill: N, stroke: d, strokeWidth: m }, shapeRendering: p, onClick: v ? (C) => v(C, e12) : void 0 });
}
const KA = L.memo(FA), PA = (e12) => e12.nodes.map((i) => i.id), am = (e12) => e12 instanceof Function ? e12 : () => e12;
function JA({ nodeStrokeColor: e12, nodeColor: i, nodeClassName: l = "", nodeBorderRadius: a = 5, nodeStrokeWidth: o, nodeComponent: s = KA, onClick: c }) {
  const d = ot(PA, Mt), m = am(i), g = am(e12), y = am(l), p = typeof window > "u" || window.chrome ? "crispEdges" : "geometricPrecision";
  return b.jsx(b.Fragment, { children: d.map((x) => b.jsx(eM, { id: x, nodeColorFunc: m, nodeStrokeColorFunc: g, nodeClassNameFunc: y, nodeBorderRadius: a, nodeStrokeWidth: o, NodeComponent: s, onClick: c, shapeRendering: p }, x)) });
}
function WA({ id: e12, nodeColorFunc: i, nodeStrokeColorFunc: l, nodeClassNameFunc: a, nodeBorderRadius: o, nodeStrokeWidth: s, shapeRendering: c, NodeComponent: d, onClick: m }) {
  const { node: g, x: y, y: p, width: x, height: v } = ot((S) => {
    const E = S.nodeLookup.get(e12);
    if (!E)
      return { node: void 0, x: 0, y: 0, width: 0, height: 0 };
    const N = E.internals.userNode, { x: C, y: A } = E.internals.positionAbsolute, { width: k, height: T } = pi(N);
    return { node: N, x: C, y: A, width: k, height: T };
  }, Mt);
  return !g || g.hidden || !zw(g) ? null : b.jsx(d, { x: y, y: p, width: x, height: v, style: g.style, selected: !!g.selected, className: a(g), color: i(g), borderRadius: o, strokeColor: l(g), strokeWidth: s, shapeRendering: c, onClick: m, id: g.id });
}
const eM = L.memo(WA);
var tM = L.memo(JA);
const nM = 200, iM = 150, lM = (e12) => !e12.hidden, rM = (e12) => {
  const i = { x: -e12.transform[0] / e12.transform[2], y: -e12.transform[1] / e12.transform[2], width: e12.width / e12.transform[2], height: e12.height / e12.transform[2] };
  let l = false;
  for (const a of e12.nodeLookup.values())
    if (!a.hidden) {
      l = true;
      break;
    }
  return { viewBB: i, boundingRect: l ? kw(bo(e12.nodeLookup, { filter: lM }), i) : i, rfId: e12.rfId, panZoom: e12.panZoom, translateExtent: e12.translateExtent, flowWidth: e12.width, flowHeight: e12.height, ariaLabelConfig: e12.ariaLabelConfig };
}, Tv = (e12, i) => e12.x === i.x && e12.y === i.y && e12.width === i.width && e12.height === i.height, aM = (e12, i) => Tv(e12.viewBB, i.viewBB) && Tv(e12.boundingRect, i.boundingRect) && e12.rfId === i.rfId && e12.panZoom === i.panZoom && e12.translateExtent === i.translateExtent && e12.flowWidth === i.flowWidth && e12.flowHeight === i.flowHeight && e12.ariaLabelConfig === i.ariaLabelConfig, uM = "react-flow__minimap-desc";
function j2({ style: e12, className: i, nodeStrokeColor: l, nodeColor: a, nodeClassName: o = "", nodeBorderRadius: s = 5, nodeStrokeWidth: c, nodeComponent: d, bgColor: m, maskColor: g, maskStrokeColor: y, maskStrokeWidth: p, position: x = "bottom-right", onClick: v, onNodeClick: S, pannable: E = false, zoomable: N = false, ariaLabel: C, inversePan: A, zoomStep: k = 1, offsetScale: T = 5 }) {
  const Y = Tt(), M = L.useRef(null), { boundingRect: B, panZoom: G, viewBB: J, rfId: U, translateExtent: X, flowWidth: ie, flowHeight: re, ariaLabelConfig: j } = ot(rM, aM), D = (e12 == null ? void 0 : e12.width) ?? nM, H = (e12 == null ? void 0 : e12.height) ?? iM, V = B.width / D, $ = B.height / H, F = Math.max(V, $), _ = F * D, se = F * H, he = T * F, R = B.x - (_ - B.width) / 2 - he, O = B.y - (se - B.height) / 2 - he, te = _ + he * 2, pe = se + he * 2, me = `${uM}-${U}`, ne = L.useRef(0), xe = L.useRef();
  ne.current = F, L.useEffect(() => {
    const Ce = Y.getState().panZoom;
    if (M.current && Ce)
      return xe.current = b3({ domNode: M.current, panZoom: Ce, getTransform: () => Y.getState().transform, getViewScale: () => ne.current }), () => {
        var Te;
        (Te = xe.current) == null || Te.destroy();
      };
  }, [G]), L.useEffect(() => {
    var Ce;
    (Ce = xe.current) == null || Ce.update({ translateExtent: X, width: ie, height: re, inversePan: A, pannable: E, zoomStep: k, zoomable: N });
  }, [E, N, A, k, X, ie, re]);
  const Se = v ? (Ce) => {
    var Ee;
    const [Te, Ae] = ((Ee = xe.current) == null ? void 0 : Ee.pointer(Ce)) || [0, 0];
    v(Ce, { x: Te, y: Ae });
  } : void 0, fe = L.useCallback((Ce, Te) => {
    const Ae = Y.getState().nodeLookup.get(Te).internals.userNode;
    S == null || S(Ce, Ae);
  }, [S]), q = S ? fe : void 0, we = C ?? j["minimap.ariaLabel"];
  return b.jsx(Nr, { position: x, style: { ...e12, "--xy-minimap-background-color-props": typeof m == "string" ? m : void 0, "--xy-minimap-mask-background-color-props": typeof g == "string" ? g : void 0, "--xy-minimap-mask-stroke-color-props": typeof y == "string" ? y : void 0, "--xy-minimap-mask-stroke-width-props": typeof p == "number" ? p * F : void 0, "--xy-minimap-node-background-color-props": typeof a == "string" ? a : void 0, "--xy-minimap-node-stroke-color-props": typeof l == "string" ? l : void 0, "--xy-minimap-node-stroke-width-props": typeof c == "number" ? c : void 0 }, className: Qt(["react-flow__minimap", i]), "data-testid": "rf__minimap", children: b.jsxs("svg", { width: D, height: H, viewBox: `${R} ${O} ${te} ${pe}`, className: "react-flow__minimap-svg", role: "img", "aria-labelledby": me, ref: M, onClick: Se, children: [we && b.jsx("title", { id: me, children: we }), b.jsx(tM, { onClick: q, nodeColor: a, nodeStrokeColor: l, nodeBorderRadius: s, nodeClassName: o, nodeStrokeWidth: c, nodeComponent: d }), b.jsx("path", { className: "react-flow__minimap-mask", d: `M${R - he},${O - he}h${te + he * 2}v${pe + he * 2}h${-te - he * 2}z
        M${J.x},${J.y}h${J.width}v${J.height}h${-J.width}z`, fillRule: "evenodd", pointerEvents: "none" })] }) });
}
j2.displayName = "MiniMap";
L.memo(j2);
const oM = (e12) => (i) => e12 ? `${Math.max(1 / i.transform[2], 1)}` : void 0, sM = { [Va.Line]: "right", [Va.Handle]: "bottom-right" };
function cM({ nodeId: e12, position: i, variant: l = Va.Handle, className: a, style: o = void 0, children: s, color: c, minWidth: d = 10, minHeight: m = 10, maxWidth: g = Number.MAX_VALUE, maxHeight: y = Number.MAX_VALUE, keepAspectRatio: p = false, resizeDirection: x, autoScale: v = true, shouldResize: S, onResizeStart: E, onResize: N, onResizeEnd: C }) {
  const A = o2(), k = typeof e12 == "string" ? e12 : A, T = Tt(), Y = L.useRef(null), M = l === Va.Handle, B = ot(L.useCallback(oM(M && v), [M, v]), Mt), G = L.useRef(null), J = i ?? sM[l];
  L.useEffect(() => {
    if (!(!Y.current || !k))
      return G.current || (G.current = D3({ domNode: Y.current, nodeId: k, getStoreItems: () => {
        const { nodeLookup: X, transform: ie, snapGrid: re, snapToGrid: j, nodeOrigin: D, domNode: H } = T.getState();
        return { nodeLookup: X, transform: ie, snapGrid: re, snapToGrid: j, nodeOrigin: D, paneDomNode: H };
      }, onChange: (X, ie) => {
        const { triggerNodeChanges: re, nodeLookup: j, parentLookup: D, nodeOrigin: H } = T.getState(), V = [], $ = { x: X.x, y: X.y }, F = j.get(k);
        if (F && F.expandParent && F.parentId) {
          const _ = F.origin ?? H, se = X.width ?? F.measured.width ?? 0, he = X.height ?? F.measured.height ?? 0, R = { id: F.id, parentId: F.parentId, rect: { width: se, height: he, ...Tw({ x: X.x ?? F.position.x, y: X.y ?? F.position.y }, { width: se, height: he }, F.parentId, j, _) } }, O = Ap([R], j, D, H);
          V.push(...O), $.x = X.x ? Math.max(_[0] * se, X.x) : void 0, $.y = X.y ? Math.max(_[1] * he, X.y) : void 0;
        }
        if ($.x !== void 0 && $.y !== void 0) {
          const _ = { id: k, type: "position", position: { ...$ } };
          V.push(_);
        }
        if (X.width !== void 0 && X.height !== void 0) {
          const se = { id: k, type: "dimensions", resizing: true, setAttributes: x ? x === "horizontal" ? "width" : "height" : true, dimensions: { width: X.width, height: X.height } };
          V.push(se);
        }
        for (const _ of ie) {
          const se = { ..._, type: "position" };
          V.push(se);
        }
        re(V);
      }, onEnd: ({ width: X, height: ie }) => {
        const re = { id: k, type: "dimensions", resizing: false, dimensions: { width: X, height: ie } };
        T.getState().triggerNodeChanges([re]);
      } })), G.current.update({ controlPosition: J, boundaries: { minWidth: d, minHeight: m, maxWidth: g, maxHeight: y }, keepAspectRatio: p, resizeDirection: x, onResizeStart: E, onResize: N, onResizeEnd: C, shouldResize: S }), () => {
        var X;
        (X = G.current) == null || X.destroy();
      };
  }, [J, d, m, g, y, p, E, N, C, S]);
  const U = J.split("-");
  return b.jsx("div", { className: Qt(["react-flow__resize-control", "nodrag", ...U, l, a]), ref: Y, style: { ...o, scale: B, ...c && { [M ? "backgroundColor" : "borderColor"]: c } }, children: s });
}
L.memo(cM);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fM = (e12) => e12.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), D2 = (...e12) => e12.filter((i, l, a) => !!i && i.trim() !== "" && a.indexOf(i) === l).join(" ").trim();
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var dM = { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const hM = L.forwardRef(({ color: e12 = "currentColor", size: i = 24, strokeWidth: l = 2, absoluteStrokeWidth: a, className: o = "", children: s, iconNode: c, ...d }, m) => L.createElement("svg", { ref: m, ...dM, width: i, height: i, stroke: e12, strokeWidth: a ? Number(l) * 24 / Number(i) : l, className: D2("lucide", o), ...d }, [...c.map(([g, y]) => L.createElement(g, y)), ...Array.isArray(s) ? s : [s]]));
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const $e = (e12, i) => {
  const l = L.forwardRef(({ className: a, ...o }, s) => L.createElement(hM, { ref: s, iconNode: i, className: D2(`lucide-${fM(e12)}`, a), ...o }));
  return l.displayName = `${e12}`, l;
};
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Av = $e("Archive", [["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }], ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }], ["path", { d: "M10 12h4", key: "a56b0p" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const mM = $e("ArrowDown", [["path", { d: "M12 5v14", key: "s699le" }], ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const pM = $e("ArrowLeft", [["path", { d: "m12 19-7-7 7-7", key: "1l729n" }], ["path", { d: "M19 12H5", key: "x3x0zl" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const O2 = $e("ArrowUp", [["path", { d: "m5 12 7-7 7 7", key: "hav0vg" }], ["path", { d: "M12 19V5", key: "x0mq9r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ym = $e("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const gM = $e("ChevronDown", [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Wu = $e("ChevronRight", [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const yM = $e("ChevronUp", [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const jp = $e("CircleAlert", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }], ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const xM = $e("CircleCheck", [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }], ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const R2 = $e("Copy", [["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }], ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Xa = $e("Download", [["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }], ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }], ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const L2 = $e("ExternalLink", [["path", { d: "M15 3h6v6", key: "1q9fwt" }], ["path", { d: "M10 14 21 3", key: "gplh6r" }], ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const vM = $e("EyeOff", [["path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49", key: "ct8e1f" }], ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }], ["path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143", key: "13bj9a" }], ["path", { d: "m2 2 20 20", key: "1ooewy" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const H2 = $e("Eye", [["path", { d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0", key: "1nclc0" }], ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const bM = $e("FileText", [["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }], ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }], ["path", { d: "M10 9H8", key: "b1mrlr" }], ["path", { d: "M16 13H8", key: "t4e002" }], ["path", { d: "M16 17H8", key: "z1uh3a" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const wM = $e("GitBranch", [["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }], ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }], ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }], ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Mv = $e("Hand", [["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }], ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }], ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }], ["path", { d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15", key: "1s1gnw" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const SM = $e("HardDrive", [["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }], ["path", { d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z", key: "oot6mr" }], ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }], ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const vc = $e("Image", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }], ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }], ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const EM = $e("KeyRound", [["path", { d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z", key: "1s6t7t" }], ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const jv = $e("Keyboard", [["path", { d: "M10 8h.01", key: "1r9ogq" }], ["path", { d: "M12 12h.01", key: "1mp3jc" }], ["path", { d: "M14 8h.01", key: "1primd" }], ["path", { d: "M16 12h.01", key: "1l6xoz" }], ["path", { d: "M18 8h.01", key: "emo2bl" }], ["path", { d: "M6 8h.01", key: "x9i8wu" }], ["path", { d: "M7 16h10", key: "wp8him" }], ["path", { d: "M8 12h.01", key: "czm47f" }], ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const B2 = $e("Link2", [["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }], ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }], ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const CM = $e("LoaderCircle", [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const U2 = $e("Maximize2", [["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }], ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }], ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }], ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const kM = $e("Maximize", [["path", { d: "M8 3H5a2 2 0 0 0-2 2v3", key: "1dcmit" }], ["path", { d: "M21 8V5a2 2 0 0 0-2-2h-3", key: "1e4gt3" }], ["path", { d: "M3 16v3a2 2 0 0 0 2 2h3", key: "wsl5sc" }], ["path", { d: "M16 21h3a2 2 0 0 0 2-2v-3", key: "18trek" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const wr = $e("MessageSquare", [["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const NM = $e("Minimize2", [["polyline", { points: "4 14 10 14 10 20", key: "11kfnr" }], ["polyline", { points: "20 10 14 10 14 4", key: "rlmsce" }], ["line", { x1: "14", x2: "21", y1: "10", y2: "3", key: "o5lafz" }], ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const _M = $e("Minus", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const zM = $e("MousePointer2", [["path", { d: "M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z", key: "edeuup" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const TM = $e("PanelLeftClose", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M9 3v18", key: "fh3hqa" }], ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const AM = $e("PanelLeftOpen", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }], ["path", { d: "M9 3v18", key: "fh3hqa" }], ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const MM = $e("Paperclip", [["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }], ["path", { d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486", key: "1pkts6" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Vl = $e("Plus", [["path", { d: "M5 12h14", key: "1ays0h" }], ["path", { d: "M12 5v14", key: "s699le" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const jM = $e("Redo2", [["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }], ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const DM = $e("RefreshCw", [["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }], ["path", { d: "M21 3v5h-5", key: "1q7to0" }], ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }], ["path", { d: "M8 16H3v5", key: "1cv678" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const OM = $e("Save", [["path", { d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", key: "1c8476" }], ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }], ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Oc = $e("Search", [["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }], ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Xm = $e("Settings2", [["path", { d: "M20 7h-9", key: "3s1dr2" }], ["path", { d: "M14 17H5", key: "gfn3mx" }], ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }], ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const I2 = $e("SlidersHorizontal", [["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }], ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }], ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }], ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }], ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }], ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }], ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }], ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }], ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const RM = $e("Square", [["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const q2 = $e("StickyNote", [["path", { d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z", key: "qazsjp" }], ["path", { d: "M15 3v4a2 2 0 0 0 2 2h4", key: "40519r" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const bc = $e("Trash2", [["path", { d: "M3 6h18", key: "d0wm0j" }], ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }], ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }], ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }], ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const LM = $e("Type", [["polyline", { points: "4 7 4 4 20 4 20 7", key: "1nosan" }], ["line", { x1: "9", x2: "15", y1: "20", y2: "20", key: "swin9y" }], ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const HM = $e("Undo2", [["path", { d: "M9 14 4 9l5-5", key: "102s5s" }], ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const BM = $e("Upload", [["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }], ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }], ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]]);
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Yl = $e("X", [["path", { d: "M18 6 6 18", key: "1bl5f8" }], ["path", { d: "m6 6 12 12", key: "d8bk6v" }]]);
let Gm = "";
const UM = (e12) => {
  Gm = e12;
};
async function Hn(e12, i = {}) {
  const l = new Headers(i.headers);
  i.body && typeof i.body == "string" && l.set("Content-Type", "application/json"), Gm && l.set("X-LC-Token", Gm);
  const a = new AbortController(), o = setTimeout(() => a.abort(), e12.startsWith("/assets") ? 6e4 : 15e3);
  let s;
  try {
    s = await fetch("/api" + e12, { ...i, headers: l, signal: i.signal || a.signal });
  } catch (c) {
    throw a.signal.aborted ? new Error("本地服务响应超时，请检查启动窗口。任务不会自动重发。") : c;
  } finally {
    clearTimeout(o);
  }
  if (!s.ok) {
    const c = await s.json().catch(() => ({}));
    throw new Error(c.error || `请求失败 (${s.status})`);
  }
  return s.json();
}
async function Rc() {
  const e12 = await Hn("/bootstrap");
  return UM(e12.token), e12;
}
const _r = (e12, i) => Hn(e12, { method: "POST", body: JSON.stringify(i) }), V2 = (e12, i) => Hn(e12, { method: "PUT", body: JSON.stringify(i) });
function $m(e12, i) {
  const l = URL.createObjectURL(new Blob([i], { type: "text/plain;charset=utf-8" })), a = document.createElement("a");
  a.href = l, a.download = e12, a.click(), setTimeout(() => URL.revokeObjectURL(l), 1e3);
}
async function IM(e12) {
  const i = await new Promise((l, a) => {
    const o = new FileReader();
    o.onload = () => l(String(o.result).split(",")[1]), o.onerror = a, o.readAsDataURL(e12);
  });
  return _r("/assets", { name: e12.name, mime: e12.type, base64: i });
}
function qM(e12, i) {
  const l = {};
  return (e12[e12.length - 1] === "" ? [...e12, ""] : e12).join((l.padRight ? " " : "") + "," + (l.padLeft === false ? "" : " ")).trim();
}
const VM = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, YM = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u, XM = {};
function Dv(e12, i) {
  return (XM.jsx ? YM : VM).test(e12);
}
const GM = /[ \t\n\f\r]/g;
function $M(e12) {
  return typeof e12 == "object" ? e12.type === "text" ? Ov(e12.value) : false : Ov(e12);
}
function Ov(e12) {
  return e12.replace(GM, "") === "";
}
class Co {
  constructor(i, l, a) {
    this.normal = l, this.property = i, a && (this.space = a);
  }
}
Co.prototype.normal = {};
Co.prototype.property = {};
Co.prototype.space = void 0;
function Y2(e12, i) {
  const l = {}, a = {};
  for (const o of e12)
    Object.assign(l, o.property), Object.assign(a, o.normal);
  return new Co(l, a, i);
}
function Qm(e12) {
  return e12.toLowerCase();
}
class kn {
  constructor(i, l) {
    this.attribute = l, this.property = i;
  }
}
kn.prototype.attribute = "";
kn.prototype.booleanish = false;
kn.prototype.boolean = false;
kn.prototype.commaOrSpaceSeparated = false;
kn.prototype.commaSeparated = false;
kn.prototype.defined = false;
kn.prototype.mustUseProperty = false;
kn.prototype.number = false;
kn.prototype.overloadedBoolean = false;
kn.prototype.property = "";
kn.prototype.spaceSeparated = false;
kn.prototype.space = void 0;
let QM = 0;
const Fe = Lr(), $t = Lr(), Zm = Lr(), ke = Lr(), Et = Lr(), zr = Lr(), Ln = Lr();
function Lr() {
  return 2 ** ++QM;
}
const Fm = Object.freeze(Object.defineProperty({ __proto__: null, boolean: Fe, booleanish: $t, commaOrSpaceSeparated: Ln, commaSeparated: zr, number: ke, overloadedBoolean: Zm, spaceSeparated: Et }, Symbol.toStringTag, { value: "Module" })), um = Object.keys(Fm);
class Dp extends kn {
  constructor(i, l, a, o) {
    let s = -1;
    if (super(i, l), Rv(this, "space", o), typeof a == "number")
      for (; ++s < um.length; ) {
        const c = um[s];
        Rv(this, um[s], (a & Fm[c]) === Fm[c]);
      }
  }
}
Dp.prototype.defined = true;
function Rv(e12, i, l) {
  l && (e12[i] = l);
}
function $a(e12) {
  const i = {}, l = {};
  for (const [a, o] of Object.entries(e12.properties)) {
    const s = new Dp(a, e12.transform(e12.attributes || {}, a), o, e12.space);
    e12.mustUseProperty && e12.mustUseProperty.includes(a) && (s.mustUseProperty = true), i[a] = s, l[Qm(a)] = a, l[Qm(s.attribute)] = a;
  }
  return new Co(i, l, e12.space);
}
const X2 = $a({ properties: { ariaActiveDescendant: null, ariaAtomic: $t, ariaAutoComplete: null, ariaBusy: $t, ariaChecked: $t, ariaColCount: ke, ariaColIndex: ke, ariaColSpan: ke, ariaControls: Et, ariaCurrent: null, ariaDescribedBy: Et, ariaDetails: null, ariaDisabled: $t, ariaDropEffect: Et, ariaErrorMessage: null, ariaExpanded: $t, ariaFlowTo: Et, ariaGrabbed: $t, ariaHasPopup: null, ariaHidden: $t, ariaInvalid: null, ariaKeyShortcuts: null, ariaLabel: null, ariaLabelledBy: Et, ariaLevel: ke, ariaLive: null, ariaModal: $t, ariaMultiLine: $t, ariaMultiSelectable: $t, ariaOrientation: null, ariaOwns: Et, ariaPlaceholder: null, ariaPosInSet: ke, ariaPressed: $t, ariaReadOnly: $t, ariaRelevant: null, ariaRequired: $t, ariaRoleDescription: Et, ariaRowCount: ke, ariaRowIndex: ke, ariaRowSpan: ke, ariaSelected: $t, ariaSetSize: ke, ariaSort: null, ariaValueMax: ke, ariaValueMin: ke, ariaValueNow: ke, ariaValueText: null, role: null }, transform(e12, i) {
  return i === "role" ? i : "aria-" + i.slice(4).toLowerCase();
} });
function G2(e12, i) {
  return i in e12 ? e12[i] : i;
}
function $2(e12, i) {
  return G2(e12, i.toLowerCase());
}
const ZM = $a({ attributes: { acceptcharset: "accept-charset", classname: "class", htmlfor: "for", httpequiv: "http-equiv" }, mustUseProperty: ["checked", "multiple", "muted", "selected"], properties: { abbr: null, accept: zr, acceptCharset: Et, accessKey: Et, action: null, allow: null, allowFullScreen: Fe, allowPaymentRequest: Fe, allowUserMedia: Fe, alpha: Fe, alt: null, as: null, async: Fe, autoCapitalize: null, autoComplete: Et, autoFocus: Fe, autoPlay: Fe, blocking: Et, capture: null, charSet: null, checked: Fe, cite: null, className: Et, closedBy: null, colorSpace: null, cols: ke, colSpan: ke, command: null, commandFor: null, content: null, contentEditable: $t, controls: Fe, controlsList: Et, coords: ke | zr, crossOrigin: null, data: null, dateTime: null, decoding: null, default: Fe, defer: Fe, dir: null, dirName: null, disabled: Fe, download: Zm, draggable: $t, encType: null, enterKeyHint: null, fetchPriority: null, form: null, formAction: null, formEncType: null, formMethod: null, formNoValidate: Fe, formTarget: null, headers: Et, height: ke, hidden: Zm, high: ke, href: null, hrefLang: null, htmlFor: Et, httpEquiv: Et, id: null, imageSizes: null, imageSrcSet: null, inert: Fe, inputMode: null, integrity: null, is: null, isMap: Fe, itemId: null, itemProp: Et, itemRef: Et, itemScope: Fe, itemType: Et, kind: null, label: null, lang: null, language: null, list: null, loading: null, loop: Fe, low: ke, manifest: null, max: null, maxLength: ke, media: null, method: null, min: null, minLength: ke, multiple: Fe, muted: Fe, name: null, nonce: null, noModule: Fe, noValidate: Fe, onAbort: null, onAfterPrint: null, onAuxClick: null, onBeforeMatch: null, onBeforePrint: null, onBeforeToggle: null, onBeforeUnload: null, onBlur: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onContextLost: null, onContextMenu: null, onContextRestored: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnded: null, onError: null, onFocus: null, onFormData: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLanguageChange: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadEnd: null, onLoadStart: null, onMessage: null, onMessageError: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRejectionHandled: null, onReset: null, onResize: null, onScroll: null, onScrollEnd: null, onSecurityPolicyViolation: null, onSeeked: null, onSeeking: null, onSelect: null, onSlotChange: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnhandledRejection: null, onUnload: null, onVolumeChange: null, onWaiting: null, onWheel: null, open: Fe, optimum: ke, pattern: null, ping: Et, placeholder: null, playsInline: Fe, popover: null, popoverTarget: null, popoverTargetAction: null, poster: null, preload: null, readOnly: Fe, referrerPolicy: null, rel: Et, required: Fe, reversed: Fe, rows: ke, rowSpan: ke, sandbox: Et, scope: null, scoped: Fe, seamless: Fe, selected: Fe, shadowRootClonable: Fe, shadowRootCustomElementRegistry: Fe, shadowRootDelegatesFocus: Fe, shadowRootMode: null, shadowRootSerializable: Fe, shape: null, size: ke, sizes: null, slot: null, span: ke, spellCheck: $t, src: null, srcDoc: null, srcLang: null, srcSet: null, start: ke, step: null, style: null, tabIndex: ke, target: null, title: null, translate: null, type: null, typeMustMatch: Fe, useMap: null, value: $t, width: ke, wrap: null, writingSuggestions: null, align: null, aLink: null, archive: Et, axis: null, background: null, bgColor: null, border: ke, borderColor: null, bottomMargin: ke, cellPadding: null, cellSpacing: null, char: null, charOff: null, classId: null, clear: null, code: null, codeBase: null, codeType: null, color: null, compact: Fe, declare: Fe, event: null, face: null, frame: null, frameBorder: null, hSpace: ke, leftMargin: ke, link: null, longDesc: null, lowSrc: null, marginHeight: ke, marginWidth: ke, noResize: Fe, noHref: Fe, noShade: Fe, noWrap: Fe, object: null, profile: null, prompt: null, rev: null, rightMargin: ke, rules: null, scheme: null, scrolling: $t, standby: null, summary: null, text: null, topMargin: ke, valueType: null, version: null, vAlign: null, vLink: null, vSpace: ke, allowTransparency: null, autoCorrect: null, autoSave: null, credentialless: Fe, disablePictureInPicture: Fe, disableRemotePlayback: Fe, exportParts: zr, part: Et, prefix: null, property: null, results: ke, security: null, unselectable: null }, space: "html", transform: $2 }), FM = $a({ attributes: { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", className: "class", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", crossOrigin: "crossorigin", dataType: "datatype", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", hrefLang: "hreflang", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", horizOriginY: "horiz-origin-y", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", maskType: "mask-type", navDown: "nav-down", navDownLeft: "nav-down-left", navDownRight: "nav-down-right", navLeft: "nav-left", navNext: "nav-next", navPrev: "nav-prev", navRight: "nav-right", navUp: "nav-up", navUpLeft: "nav-up-left", navUpRight: "nav-up-right", onAbort: "onabort", onActivate: "onactivate", onAfterPrint: "onafterprint", onBeforePrint: "onbeforeprint", onBegin: "onbegin", onCancel: "oncancel", onCanPlay: "oncanplay", onCanPlayThrough: "oncanplaythrough", onChange: "onchange", onClick: "onclick", onClose: "onclose", onCopy: "oncopy", onCueChange: "oncuechange", onCut: "oncut", onDblClick: "ondblclick", onDrag: "ondrag", onDragEnd: "ondragend", onDragEnter: "ondragenter", onDragExit: "ondragexit", onDragLeave: "ondragleave", onDragOver: "ondragover", onDragStart: "ondragstart", onDrop: "ondrop", onDurationChange: "ondurationchange", onEmptied: "onemptied", onEnd: "onend", onEnded: "onended", onError: "onerror", onFocus: "onfocus", onFocusIn: "onfocusin", onFocusOut: "onfocusout", onHashChange: "onhashchange", onInput: "oninput", onInvalid: "oninvalid", onKeyDown: "onkeydown", onKeyPress: "onkeypress", onKeyUp: "onkeyup", onLoad: "onload", onLoadedData: "onloadeddata", onLoadedMetadata: "onloadedmetadata", onLoadStart: "onloadstart", onMessage: "onmessage", onMouseDown: "onmousedown", onMouseEnter: "onmouseenter", onMouseLeave: "onmouseleave", onMouseMove: "onmousemove", onMouseOut: "onmouseout", onMouseOver: "onmouseover", onMouseUp: "onmouseup", onMouseWheel: "onmousewheel", onOffline: "onoffline", onOnline: "ononline", onPageHide: "onpagehide", onPageShow: "onpageshow", onPaste: "onpaste", onPause: "onpause", onPlay: "onplay", onPlaying: "onplaying", onPopState: "onpopstate", onProgress: "onprogress", onRateChange: "onratechange", onRepeat: "onrepeat", onReset: "onreset", onResize: "onresize", onScroll: "onscroll", onSeeked: "onseeked", onSeeking: "onseeking", onSelect: "onselect", onShow: "onshow", onStalled: "onstalled", onStorage: "onstorage", onSubmit: "onsubmit", onSuspend: "onsuspend", onTimeUpdate: "ontimeupdate", onToggle: "ontoggle", onUnload: "onunload", onVolumeChange: "onvolumechange", onWaiting: "onwaiting", onZoom: "onzoom", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", referrerPolicy: "referrerpolicy", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDashArray: "stroke-dasharray", strokeDashOffset: "stroke-dashoffset", strokeLineCap: "stroke-linecap", strokeLineJoin: "stroke-linejoin", strokeMiterLimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", tabIndex: "tabindex", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", transformOrigin: "transform-origin", typeOf: "typeof", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", playbackOrder: "playbackorder", timelineBegin: "timelinebegin" }, properties: { about: Ln, accentHeight: ke, accumulate: null, additive: null, alignmentBaseline: null, alphabetic: ke, amplitude: ke, arabicForm: null, ascent: ke, attributeName: null, attributeType: null, azimuth: ke, bandwidth: null, baselineShift: null, baseFrequency: null, baseProfile: null, bbox: null, begin: null, bias: ke, by: null, calcMode: null, capHeight: ke, className: Et, clip: null, clipPath: null, clipPathUnits: null, clipRule: null, color: null, colorInterpolation: null, colorInterpolationFilters: null, colorProfile: null, colorRendering: null, content: null, contentScriptType: null, contentStyleType: null, crossOrigin: null, cursor: null, cx: null, cy: null, d: null, dataType: null, defaultAction: null, descent: ke, diffuseConstant: ke, direction: null, display: null, dur: null, divisor: ke, dominantBaseline: null, download: Fe, dx: null, dy: null, edgeMode: null, editable: null, elevation: ke, enableBackground: null, end: null, event: null, exponent: ke, externalResourcesRequired: null, fill: null, fillOpacity: ke, fillRule: null, filter: null, filterRes: null, filterUnits: null, floodColor: null, floodOpacity: null, focusable: null, focusHighlight: null, fontFamily: null, fontSize: null, fontSizeAdjust: null, fontStretch: null, fontStyle: null, fontVariant: null, fontWeight: null, format: null, fr: null, from: null, fx: null, fy: null, g1: zr, g2: zr, glyphName: zr, glyphOrientationHorizontal: null, glyphOrientationVertical: null, glyphRef: null, gradientTransform: null, gradientUnits: null, handler: null, hanging: ke, hatchContentUnits: null, hatchUnits: null, height: null, href: null, hrefLang: null, horizAdvX: ke, horizOriginX: ke, horizOriginY: ke, id: null, ideographic: ke, imageRendering: null, initialVisibility: null, in: null, in2: null, intercept: ke, k: ke, k1: ke, k2: ke, k3: ke, k4: ke, kernelMatrix: Ln, kernelUnitLength: null, keyPoints: null, keySplines: null, keyTimes: null, kerning: null, lang: null, lengthAdjust: null, letterSpacing: null, lightingColor: null, limitingConeAngle: ke, local: null, markerEnd: null, markerMid: null, markerStart: null, markerHeight: null, markerUnits: null, markerWidth: null, mask: null, maskContentUnits: null, maskType: null, maskUnits: null, mathematical: null, max: null, media: null, mediaCharacterEncoding: null, mediaContentEncodings: null, mediaSize: ke, mediaTime: null, method: null, min: null, mode: null, name: null, navDown: null, navDownLeft: null, navDownRight: null, navLeft: null, navNext: null, navPrev: null, navRight: null, navUp: null, navUpLeft: null, navUpRight: null, numOctaves: null, observer: null, offset: null, onAbort: null, onActivate: null, onAfterPrint: null, onBeforePrint: null, onBegin: null, onCancel: null, onCanPlay: null, onCanPlayThrough: null, onChange: null, onClick: null, onClose: null, onCopy: null, onCueChange: null, onCut: null, onDblClick: null, onDrag: null, onDragEnd: null, onDragEnter: null, onDragExit: null, onDragLeave: null, onDragOver: null, onDragStart: null, onDrop: null, onDurationChange: null, onEmptied: null, onEnd: null, onEnded: null, onError: null, onFocus: null, onFocusIn: null, onFocusOut: null, onHashChange: null, onInput: null, onInvalid: null, onKeyDown: null, onKeyPress: null, onKeyUp: null, onLoad: null, onLoadedData: null, onLoadedMetadata: null, onLoadStart: null, onMessage: null, onMouseDown: null, onMouseEnter: null, onMouseLeave: null, onMouseMove: null, onMouseOut: null, onMouseOver: null, onMouseUp: null, onMouseWheel: null, onOffline: null, onOnline: null, onPageHide: null, onPageShow: null, onPaste: null, onPause: null, onPlay: null, onPlaying: null, onPopState: null, onProgress: null, onRateChange: null, onRepeat: null, onReset: null, onResize: null, onScroll: null, onSeeked: null, onSeeking: null, onSelect: null, onShow: null, onStalled: null, onStorage: null, onSubmit: null, onSuspend: null, onTimeUpdate: null, onToggle: null, onUnload: null, onVolumeChange: null, onWaiting: null, onZoom: null, opacity: null, operator: null, order: null, orient: null, orientation: null, origin: null, overflow: null, overlay: null, overlinePosition: ke, overlineThickness: ke, paintOrder: null, panose1: null, path: null, pathLength: ke, patternContentUnits: null, patternTransform: null, patternUnits: null, phase: null, ping: Et, pitch: null, playbackOrder: null, pointerEvents: null, points: null, pointsAtX: ke, pointsAtY: ke, pointsAtZ: ke, preserveAlpha: null, preserveAspectRatio: null, primitiveUnits: null, propagate: null, property: Ln, r: null, radius: null, referrerPolicy: null, refX: null, refY: null, rel: Ln, rev: Ln, renderingIntent: null, repeatCount: null, repeatDur: null, requiredExtensions: Ln, requiredFeatures: Ln, requiredFonts: Ln, requiredFormats: Ln, resource: null, restart: null, result: null, rotate: null, rx: null, ry: null, scale: null, seed: null, shapeRendering: null, side: null, slope: null, snapshotTime: null, specularConstant: ke, specularExponent: ke, spreadMethod: null, spacing: null, startOffset: null, stdDeviation: null, stemh: null, stemv: null, stitchTiles: null, stopColor: null, stopOpacity: null, strikethroughPosition: ke, strikethroughThickness: ke, string: null, stroke: null, strokeDashArray: Ln, strokeDashOffset: null, strokeLineCap: null, strokeLineJoin: null, strokeMiterLimit: ke, strokeOpacity: ke, strokeWidth: null, style: null, surfaceScale: ke, syncBehavior: null, syncBehaviorDefault: null, syncMaster: null, syncTolerance: null, syncToleranceDefault: null, systemLanguage: Ln, tabIndex: ke, tableValues: null, target: null, targetX: ke, targetY: ke, textAnchor: null, textDecoration: null, textRendering: null, textLength: null, timelineBegin: null, title: null, transformBehavior: null, type: null, typeOf: Ln, to: null, transform: null, transformOrigin: null, u1: null, u2: null, underlinePosition: ke, underlineThickness: ke, unicode: null, unicodeBidi: null, unicodeRange: null, unitsPerEm: ke, values: null, vAlphabetic: ke, vMathematical: ke, vectorEffect: null, vHanging: ke, vIdeographic: ke, version: null, vertAdvY: ke, vertOriginX: ke, vertOriginY: ke, viewBox: null, viewTarget: null, visibility: null, width: null, widths: null, wordSpacing: null, writingMode: null, x: null, x1: null, x2: null, xChannelSelector: null, xHeight: ke, y: null, y1: null, y2: null, yChannelSelector: null, z: null, zoomAndPan: null }, space: "svg", transform: G2 }), Q2 = $a({ properties: { xLinkActuate: null, xLinkArcRole: null, xLinkHref: null, xLinkRole: null, xLinkShow: null, xLinkTitle: null, xLinkType: null }, space: "xlink", transform(e12, i) {
  return "xlink:" + i.slice(5).toLowerCase();
} }), Z2 = $a({ attributes: { xmlnsxlink: "xmlns:xlink" }, properties: { xmlnsXLink: null, xmlns: null }, space: "xmlns", transform: $2 }), F2 = $a({ properties: { xmlBase: null, xmlLang: null, xmlSpace: null }, space: "xml", transform(e12, i) {
  return "xml:" + i.slice(3).toLowerCase();
} }), KM = { classId: "classID", dataType: "datatype", itemId: "itemID", strokeDashArray: "strokeDasharray", strokeDashOffset: "strokeDashoffset", strokeLineCap: "strokeLinecap", strokeLineJoin: "strokeLinejoin", strokeMiterLimit: "strokeMiterlimit", typeOf: "typeof", xLinkActuate: "xlinkActuate", xLinkArcRole: "xlinkArcrole", xLinkHref: "xlinkHref", xLinkRole: "xlinkRole", xLinkShow: "xlinkShow", xLinkTitle: "xlinkTitle", xLinkType: "xlinkType", xmlnsXLink: "xmlnsXlink" }, PM = /[A-Z]/g, Lv = /-[a-z]/g, JM = /^data[-\w.:]+$/i;
function WM(e12, i) {
  const l = Qm(i);
  let a = i, o = kn;
  if (l in e12.normal)
    return e12.property[e12.normal[l]];
  if (l.length > 4 && l.slice(0, 4) === "data" && JM.test(i)) {
    if (i.charAt(4) === "-") {
      const s = i.slice(5).replace(Lv, t5);
      a = "data" + s.charAt(0).toUpperCase() + s.slice(1);
    } else {
      const s = i.slice(4);
      if (!Lv.test(s)) {
        let c = s.replace(PM, e52);
        c.charAt(0) !== "-" && (c = "-" + c), i = "data" + c;
      }
    }
    o = Dp;
  }
  return new o(a, i);
}
function e52(e12) {
  return "-" + e12.toLowerCase();
}
function t5(e12) {
  return e12.charAt(1).toUpperCase();
}
const n5 = Y2([X2, ZM, Q2, Z2, F2], "html"), Op = Y2([X2, FM, Q2, Z2, F2], "svg");
function i5(e12) {
  return e12.join(" ").trim();
}
var Hv = /\/\*(?:[^*]|\*(?!\/))*\*\//g, l5 = /\n/g, r5 = /^\s*/, a5 = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, u5 = /^:\s*/, o5 = /^((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|url\((?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|[^)]*)\)|[^};])+)/, s5 = /^[;\s]*/, c5 = `
`, Bv = "/", Uv = "*", Xu = "", f5 = "comment", d5 = "declaration";
function h5(e12, i) {
  if (typeof e12 != "string")
    throw new TypeError("First argument must be a string");
  if (!e12)
    return [];
  i = i || {};
  var l = 1, a = 1;
  function o(S) {
    var E = S.match(l5);
    E && (l += E.length);
    var N = S.lastIndexOf(c5);
    a = ~N ? S.length - N : a + S.length;
  }
  function s() {
    var S = { line: l, column: a };
    return function(E) {
      return E.position = new c(S), g(), E;
    };
  }
  function c(S) {
    this.start = S, this.end = { line: l, column: a }, this.source = i.source;
  }
  c.prototype.content = e12;
  function d(S) {
    var E = new Error(i.source + ":" + l + ":" + a + ": " + S);
    if (E.reason = S, E.filename = i.source, E.line = l, E.column = a, E.source = e12, !i.silent)
      throw E;
  }
  function m(S) {
    var E = S.exec(e12);
    if (E) {
      var N = E[0];
      return o(N), e12 = e12.slice(N.length), E;
    }
  }
  function g() {
    m(r5);
  }
  function y(S) {
    for (var E; E = p(); )
      S.push(E);
    return S;
  }
  function p() {
    var S = s();
    if (!(Bv != e12.charAt(0) || Uv != e12.charAt(1))) {
      for (var E = 2; Xu != e12.charAt(E) && (Uv != e12.charAt(E) || Bv != e12.charAt(E + 1)); )
        ++E;
      if (E += 2, Xu === e12.charAt(E - 1))
        return d("End of comment missing");
      var N = e12.slice(2, E - 2);
      return a += 2, o(N), e12 = e12.slice(E), a += 2, S({ type: f5, comment: N });
    }
  }
  function x() {
    var S = s(), E = m(a5);
    if (E) {
      if (p(), !m(u5))
        return d("property missing ':'");
      var N = m(o5), C = S({ type: d5, property: E[0].replace(Hv, Xu).trim(), value: N ? N[0].replace(Hv, Xu).trim() : Xu });
      return m(s5), C;
    }
  }
  function v() {
    var S = [];
    y(S);
    for (var E; E = x(); )
      S.push(E), y(S);
    return S;
  }
  return g(), v();
}
function m5(e12, i) {
  let l = null;
  if (!e12 || typeof e12 != "string")
    return l;
  const a = h5(e12), o = typeof i == "function";
  return a.forEach((s) => {
    if (s.type !== "declaration")
      return;
    const { property: c, value: d } = s;
    o ? i(c, d, s) : d && (l = l ?? {}, l[c] = d);
  }), l;
}
const K2 = P2("end"), Rp = P2("start");
function P2(e12) {
  return i;
  function i(l) {
    const a = l && l.position && l.position[e12] || {};
    if (typeof a.line == "number" && a.line > 0 && typeof a.column == "number" && a.column > 0)
      return { line: a.line, column: a.column, offset: typeof a.offset == "number" && a.offset > -1 ? a.offset : void 0 };
  }
}
function p5(e12) {
  const i = Rp(e12), l = K2(e12);
  if (i && l)
    return { start: i, end: l };
}
function eo(e12) {
  return !e12 || typeof e12 != "object" ? "" : "position" in e12 || "type" in e12 ? Iv(e12.position) : "start" in e12 || "end" in e12 ? Iv(e12) : "line" in e12 || "column" in e12 ? Km(e12) : "";
}
function Km(e12) {
  return qv(e12 && e12.line) + ":" + qv(e12 && e12.column);
}
function Iv(e12) {
  return Km(e12 && e12.start) + "-" + Km(e12 && e12.end);
}
function qv(e12) {
  return e12 && typeof e12 == "number" ? e12 : 1;
}
class nf extends Error {
  constructor(i, l, a) {
    super(), typeof l == "string" && (a = l, l = void 0);
    let o = "", s = {}, c = false;
    if (l && ("line" in l && "column" in l ? s = { place: l } : "start" in l && "end" in l ? s = { place: l } : "type" in l ? s = { ancestors: [l], place: l.position } : s = { ...l }), typeof i == "string" ? o = i : !s.cause && i && (c = true, o = i.message, s.cause = i), !s.ruleId && !s.source && typeof a == "string") {
      const m = a.indexOf(":");
      m === -1 ? s.ruleId = a : (s.source = a.slice(0, m), s.ruleId = a.slice(m + 1));
    }
    if (!s.place && s.ancestors) {
      const m = s.ancestors[s.ancestors.length - 1];
      m && (s.place = m.position);
    }
    const d = s.place && "start" in s.place ? s.place.start : s.place;
    this.ancestors = s.ancestors || void 0, this.cause = s.cause || void 0, this.column = d ? d.column : void 0, this.fatal = void 0, this.file = "", this.message = o, this.line = d ? d.line : void 0, this.name = eo(s.place) || "1:1", this.place = s.place || void 0, this.reason = this.message, this.ruleId = s.ruleId || void 0, this.source = s.source || void 0, this.stack = c && s.cause && typeof s.cause.stack == "string" ? s.cause.stack : "", this.actual = void 0, this.expected = void 0, this.note = void 0, this.url = void 0;
  }
}
Object.defineProperties(nf.prototype, { file: { configurable: true, enumerable: true, value: "", writable: true }, name: { configurable: true, enumerable: true, value: "", writable: true }, reason: { configurable: true, enumerable: true, value: "", writable: true }, message: { configurable: true, enumerable: true, value: "", writable: true }, stack: { configurable: true, enumerable: true, value: "", writable: true }, column: { configurable: true, enumerable: true, writable: true }, line: { configurable: true, enumerable: true, writable: true }, ancestors: { configurable: true, enumerable: true, writable: true }, cause: { configurable: true, enumerable: true, writable: true }, fatal: { configurable: true, enumerable: true, writable: true }, place: { configurable: true, enumerable: true, writable: true }, ruleId: { configurable: true, enumerable: true, writable: true }, source: { configurable: true, enumerable: true, writable: true } });
const Lp = {}.hasOwnProperty, g5 = /* @__PURE__ */ new Map(), y5 = /[A-Z]/g, x5 = /-([a-z])/g, v5 = /* @__PURE__ */ new Set(["table", "tbody", "thead", "tfoot", "tr"]), b5 = /* @__PURE__ */ new Set(["td", "th"]), J2 = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function w5(e12, i) {
  if (!i || i.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const l = i.filePath || void 0;
  let a;
  if (i.development) {
    if (typeof i.jsxDEV != "function")
      throw new TypeError("Expected `jsxDEV` in options when `development: true`");
    a = T5(l, i.jsxDEV);
  } else {
    if (typeof i.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof i.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    a = z5(l, i.jsx, i.jsxs);
  }
  const o = { Fragment: i.Fragment, ancestors: [], components: i.components || {}, create: a, elementAttributeNameCase: i.elementAttributeNameCase || "react", evaluater: i.createEvaluater ? i.createEvaluater() : void 0, filePath: l, ignoreInvalidStyle: i.ignoreInvalidStyle || false, passKeys: i.passKeys !== false, passNode: i.passNode || false, schema: i.space === "svg" ? Op : n5, stylePropertyNameCase: i.stylePropertyNameCase || "dom", tableCellAlignToStyle: i.tableCellAlignToStyle !== false }, s = W2(o, e12, void 0);
  return s && typeof s != "string" ? s : o.create(e12, o.Fragment, { children: s || void 0 }, void 0);
}
function W2(e12, i, l) {
  if (i.type === "element")
    return S5(e12, i, l);
  if (i.type === "mdxFlowExpression" || i.type === "mdxTextExpression")
    return E5(e12, i);
  if (i.type === "mdxJsxFlowElement" || i.type === "mdxJsxTextElement")
    return k5(e12, i, l);
  if (i.type === "mdxjsEsm")
    return C5(e12, i);
  if (i.type === "root")
    return N5(e12, i, l);
  if (i.type === "text")
    return _5(e12, i);
}
function S5(e12, i, l) {
  const a = e12.schema;
  let o = a;
  i.tagName.toLowerCase() === "svg" && a.space === "html" && (o = Op, e12.schema = o), e12.ancestors.push(i);
  const s = tS(e12, i.tagName, false), c = A5(e12, i);
  let d = Bp(e12, i);
  return v5.has(i.tagName) && (d = d.filter(function(m) {
    return typeof m == "string" ? !$M(m) : true;
  })), eS(e12, c, s, i), Hp(c, d), e12.ancestors.pop(), e12.schema = a, e12.create(i, s, c, l);
}
function E5(e12, i) {
  if (i.data && i.data.estree && e12.evaluater) {
    const a = i.data.estree.body[0];
    return a.type, e12.evaluater.evaluateExpression(a.expression);
  }
  po(e12, i.position);
}
function C5(e12, i) {
  if (i.data && i.data.estree && e12.evaluater)
    return e12.evaluater.evaluateProgram(i.data.estree);
  po(e12, i.position);
}
function k5(e12, i, l) {
  const a = e12.schema;
  let o = a;
  i.name === "svg" && a.space === "html" && (o = Op, e12.schema = o), e12.ancestors.push(i);
  const s = i.name === null ? e12.Fragment : tS(e12, i.name, true), c = M5(e12, i), d = Bp(e12, i);
  return eS(e12, c, s, i), Hp(c, d), e12.ancestors.pop(), e12.schema = a, e12.create(i, s, c, l);
}
function N5(e12, i, l) {
  const a = {};
  return Hp(a, Bp(e12, i)), e12.create(i, e12.Fragment, a, l);
}
function _5(e12, i) {
  return i.value;
}
function eS(e12, i, l, a) {
  typeof l != "string" && l !== e12.Fragment && e12.passNode && (i.node = a);
}
function Hp(e12, i) {
  if (i.length > 0) {
    const l = i.length > 1 ? i : i[0];
    l && (e12.children = l);
  }
}
function z5(e12, i, l) {
  return a;
  function a(o, s, c, d) {
    const g = Array.isArray(c.children) ? l : i;
    return d ? g(s, c, d) : g(s, c);
  }
}
function T5(e12, i) {
  return l;
  function l(a, o, s, c) {
    const d = Array.isArray(s.children), m = Rp(a);
    return i(o, s, c, d, { columnNumber: m ? m.column - 1 : void 0, fileName: e12, lineNumber: m ? m.line : void 0 }, void 0);
  }
}
function A5(e12, i) {
  const l = {};
  let a, o;
  for (o in i.properties)
    if (o !== "children" && Lp.call(i.properties, o)) {
      const s = j5(e12, o, i.properties[o]);
      if (s) {
        const [c, d] = s;
        e12.tableCellAlignToStyle && c === "align" && typeof d == "string" && b5.has(i.tagName) ? a = d : l[c] = d;
      }
    }
  if (a) {
    const s = l.style || (l.style = {});
    s[e12.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = a;
  }
  return l;
}
function M5(e12, i) {
  const l = {};
  for (const a of i.attributes)
    if (a.type === "mdxJsxExpressionAttribute")
      if (a.data && a.data.estree && e12.evaluater) {
        const s = a.data.estree.body[0];
        s.type;
        const c = s.expression;
        c.type;
        const d = c.properties[0];
        d.type, Object.assign(l, e12.evaluater.evaluateExpression(d.argument));
      } else
        po(e12, i.position);
    else {
      const { name: o } = a;
      let s;
      if (a.value && typeof a.value == "object")
        if (a.value.data && a.value.data.estree && e12.evaluater) {
          const d = a.value.data.estree.body[0];
          d.type, s = e12.evaluater.evaluateExpression(d.expression);
        } else
          po(e12, i.position);
      else
        s = a.value === null ? true : a.value;
      l[o] = s;
    }
  return l;
}
function Bp(e12, i) {
  const l = [];
  let a = -1;
  const o = e12.passKeys ? /* @__PURE__ */ new Map() : g5;
  for (; ++a < i.children.length; ) {
    const s = i.children[a];
    let c;
    if (e12.passKeys) {
      const m = s.type === "element" ? s.tagName : s.type === "mdxJsxFlowElement" || s.type === "mdxJsxTextElement" ? s.name : void 0;
      if (m) {
        const g = o.get(m) || 0;
        c = m + "-" + g, o.set(m, g + 1);
      }
    }
    const d = W2(e12, s, c);
    d !== void 0 && l.push(d);
  }
  return l;
}
function j5(e12, i, l) {
  if (l == null || typeof l == "number" && Number.isNaN(l))
    return;
  const a = WM(e12.schema, i);
  return Array.isArray(l) && (l = a.commaSeparated ? qM(l) : i5(l)), a.property === "style" ? ["style", typeof l == "object" ? e12.stylePropertyNameCase === "dom" ? l : O5(l) : D5(e12, String(l))] : [e12.elementAttributeNameCase === "react" && a.space ? KM[a.property] || a.property : a.attribute, l];
}
function D5(e12, i) {
  const l = {};
  try {
    m5(i, function(a, o) {
      if (a && o) {
        let s = a;
        s.slice(0, 2) !== "--" && (s = s.toLowerCase(), e12.stylePropertyNameCase === "dom" && (s.slice(0, 4) === "-ms-" && (s = s.slice(1)), s = s.replace(x5, H5))), l[s] = o;
      }
    });
  } catch (a) {
    if (e12.ignoreInvalidStyle)
      return {};
    const o = a, s = new nf("Cannot parse `style` attribute", { ancestors: e12.ancestors, cause: o, ruleId: "style", source: "hast-util-to-jsx-runtime" });
    throw s.file = e12.filePath || void 0, s.url = J2 + "#cannot-parse-style-attribute", s;
  }
  return l;
}
function tS(e12, i, l) {
  let a;
  if (!l)
    a = { type: "Literal", value: i };
  else if (i.includes(".")) {
    const o = i.split(".");
    let s = -1, c;
    for (; ++s < o.length; ) {
      const d = Dv(o[s]) ? { type: "Identifier", name: o[s] } : { type: "Literal", value: o[s] };
      c = c ? { type: "MemberExpression", object: c, property: d, computed: !!(s && d.type === "Literal"), optional: false } : d;
    }
    a = c;
  } else
    a = Dv(i) && !/^[a-z]/.test(i) ? { type: "Identifier", name: i } : { type: "Literal", value: i };
  if (a.type === "Literal") {
    const o = a.value;
    return Lp.call(e12.components, o) ? e12.components[o] : o;
  }
  if (e12.evaluater)
    return e12.evaluater.evaluateExpression(a);
  po(e12);
}
function po(e12, i) {
  const l = new nf("Cannot handle MDX estrees without `createEvaluater`", { ancestors: e12.ancestors, place: i, ruleId: "mdx-estree", source: "hast-util-to-jsx-runtime" });
  throw l.file = e12.filePath || void 0, l.url = J2 + "#cannot-handle-mdx-estrees-without-createevaluater", l;
}
function O5(e12) {
  const i = {};
  let l;
  for (l in e12)
    Lp.call(e12, l) && (i[R5(l)] = e12[l]);
  return i;
}
function R5(e12) {
  if (e12.slice(0, 2) === "--")
    return e12;
  let i = e12.replace(y5, L5);
  return i.slice(0, 3) === "ms-" && (i = "-" + i), i;
}
function L5(e12) {
  return "-" + e12.toLowerCase();
}
function H5(e12, i) {
  return i.toUpperCase();
}
const om = { action: ["form"], cite: ["blockquote", "del", "ins", "q"], data: ["object"], formAction: ["button", "input"], href: ["a", "area", "base", "link"], icon: ["menuitem"], itemId: null, manifest: ["html"], ping: ["a", "area"], poster: ["video"], src: ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"] }, B5 = {};
function lf(e12, i) {
  const l = B5, a = typeof l.includeImageAlt == "boolean" ? l.includeImageAlt : true, o = typeof l.includeHtml == "boolean" ? l.includeHtml : true;
  return nS(e12, a, o);
}
function nS(e12, i, l) {
  if (U5(e12)) {
    if ("value" in e12)
      return e12.type === "html" && !l ? "" : e12.value;
    if (i && "alt" in e12 && e12.alt)
      return e12.alt;
    if ("children" in e12)
      return Vv(e12.children, i, l);
  }
  return Array.isArray(e12) ? Vv(e12, i, l) : "";
}
function Vv(e12, i, l) {
  const a = [];
  let o = -1;
  for (; ++o < e12.length; )
    a[o] = nS(e12[o], i, l);
  return a.join("");
}
function U5(e12) {
  return !!(e12 && typeof e12 == "object");
}
const Yv = document.createElement("i");
function Up(e12) {
  const i = "&" + e12 + ";";
  Yv.innerHTML = i;
  const l = Yv.textContent;
  return l.charCodeAt(l.length - 1) === 59 && e12 !== "semi" || l === i ? false : l;
}
function fi(e12, i, l, a) {
  const o = e12.length;
  let s = 0, c;
  if (i < 0 ? i = -i > o ? 0 : o + i : i = i > o ? o : i, l = l > 0 ? l : 0, a.length < 1e4)
    c = Array.from(a), c.unshift(i, l), e12.splice(...c);
  else
    for (l && e12.splice(i, l); s < a.length; )
      c = a.slice(s, s + 1e4), c.unshift(i, 0), e12.splice(...c), s += 1e4, i += 1e4;
}
function Pn(e12, i) {
  return e12.length > 0 ? (fi(e12, e12.length, 0, i), e12) : i;
}
const Xv = {}.hasOwnProperty;
function iS(e12) {
  const i = {};
  let l = -1;
  for (; ++l < e12.length; )
    I5(i, e12[l]);
  return i;
}
function I5(e12, i) {
  let l;
  for (l in i) {
    const o = (Xv.call(e12, l) ? e12[l] : void 0) || (e12[l] = {}), s = i[l];
    let c;
    if (s)
      for (c in s) {
        Xv.call(o, c) || (o[c] = []);
        const d = s[c];
        q5(o[c], Array.isArray(d) ? d : d ? [d] : []);
      }
  }
}
function q5(e12, i) {
  let l = -1;
  const a = [];
  for (; ++l < i.length; )
    (i[l].add === "after" ? e12 : a).push(i[l]);
  fi(e12, 0, 0, a);
}
function lS(e12, i) {
  const l = Number.parseInt(e12, i);
  return l < 9 || l === 11 || l > 13 && l < 32 || l > 126 && l < 160 || l > 55295 && l < 57344 || l > 64975 && l < 65008 || (l & 65535) === 65535 || (l & 65535) === 65534 || l > 1114111 ? "�" : String.fromCodePoint(l);
}
function di(e12) {
  return e12.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const cn = $l(/[A-Za-z]/), fn = $l(/[\dA-Za-z]/), V5 = $l(/[#-'*+\--9=?A-Z^-~]/);
function Lc(e12) {
  return e12 !== null && (e12 < 32 || e12 === 127);
}
const Pm = $l(/\d/), Y5 = $l(/[\dA-Fa-f]/), rS = $l(/[!-/:-@[-`{-~]/);
function Xe(e12) {
  return e12 !== null && e12 < -2;
}
function Ct(e12) {
  return e12 !== null && (e12 < 0 || e12 === 32);
}
function et(e12) {
  return e12 === -2 || e12 === -1 || e12 === 32;
}
const ko = $l(new RegExp("\\p{P}|\\p{S}", "u")), Rr = $l(/\s/);
function $l(e12) {
  return i;
  function i(l) {
    return l !== null && l > -1 && e12.test(String.fromCharCode(l));
  }
}
function Qa(e12) {
  const i = [];
  let l = -1, a = 0, o = 0;
  for (; ++l < e12.length; ) {
    const s = e12.charCodeAt(l);
    let c = "";
    if (s === 37 && fn(e12.charCodeAt(l + 1)) && fn(e12.charCodeAt(l + 2)))
      o = 2;
    else if (s < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(s)) || (c = String.fromCharCode(s));
    else if (s > 55295 && s < 57344) {
      const d = e12.charCodeAt(l + 1);
      s < 56320 && d > 56319 && d < 57344 ? (c = String.fromCharCode(s, d), o = 1) : c = "�";
    } else
      c = String.fromCharCode(s);
    c && (i.push(e12.slice(a, l), encodeURIComponent(c)), a = l + o + 1, c = ""), o && (l += o, o = 0);
  }
  return i.join("") + e12.slice(a);
}
function ct(e12, i, l, a) {
  const o = a ? a - 1 : 1 / 0;
  let s = 0;
  return c;
  function c(m) {
    return et(m) ? (e12.enter(l), d(m)) : i(m);
  }
  function d(m) {
    return et(m) && s++ < o ? (e12.consume(m), d) : (e12.exit(l), i(m));
  }
}
function aS(e12, i, l, a, o, s) {
  let c = 0;
  return d;
  function d(y) {
    return et(y) ? (e12.enter(a), m(y)) : g(y);
  }
  function m(y) {
    return et(y) && c < s ? (e12.consume(y), c++, m) : (e12.exit(a), g(y));
  }
  function g(y) {
    return c >= o ? i(y) : l(y);
  }
}
const X5 = { tokenize: G5 };
function G5(e12) {
  const i = e12.attempt(this.parser.constructs.contentInitial, a, o);
  let l;
  return i;
  function a(d) {
    if (d === null) {
      e12.consume(d);
      return;
    }
    return e12.enter("lineEnding"), e12.consume(d), e12.exit("lineEnding"), ct(e12, i, "linePrefix");
  }
  function o(d) {
    return e12.enter("paragraph"), s(d);
  }
  function s(d) {
    const m = e12.enter("chunkText", { contentType: "text", previous: l });
    return l && (l.next = m), l = m, c(d);
  }
  function c(d) {
    if (d === null) {
      e12.exit("chunkText"), e12.exit("paragraph"), e12.consume(d);
      return;
    }
    return Xe(d) ? (e12.consume(d), e12.exit("chunkText"), s) : (e12.consume(d), c);
  }
}
let Hc = class {
  constructor() {
    this.index = /* @__PURE__ */ new Map(), this.map = [];
  }
  add(i, l, a) {
    Gv(this, i, l, a, false);
  }
  addBefore(i, l, a) {
    Gv(this, i, l, a, true);
  }
  consume(i) {
    if (this.map.sort(function(s, c) {
      return s[0] - c[0];
    }), this.map.length === 0)
      return;
    let l = this.map.length;
    const a = [];
    for (; l > 0; )
      l -= 1, a.push(i.slice(this.map[l][0] + this.map[l][1]), this.map[l][2]), i.length = this.map[l][0];
    a.push(i.slice()), i.length = 0;
    let o = a.pop();
    for (; o; ) {
      for (const s of o)
        i.push(s);
      o = a.pop();
    }
    this.map.length = 0, this.index.clear();
  }
};
function Gv(e12, i, l, a, o) {
  if (l === 0 && a.length === 0)
    return;
  const s = e12.index.get(i);
  if (s) {
    s[1] += l, o ? (a.push(...s[2]), s[2] = a) : s[2].push(...a);
    return;
  }
  const c = [i, l, a];
  e12.map.push(c), e12.index.set(i, c);
}
const $5 = { tokenize: Q5 }, $v = { tokenize: Z5 };
function Q5(e12) {
  const i = this, l = [];
  let a = 0, o, s, c;
  return d;
  function d(k) {
    if (a < l.length) {
      const T = l[a];
      return i.containerState = T[1], e12.attempt(T[0].continuation, m, g)(k);
    }
    return g(k);
  }
  function m(k) {
    if (a++, i.containerState._closeFlow) {
      i.containerState._closeFlow = void 0, o && A();
      const T = i.events.length;
      let Y = T, M;
      for (; Y--; )
        if (i.events[Y][0] === "exit" && i.events[Y][1].type === "chunkFlow") {
          M = i.events[Y][1].end;
          break;
        }
      C(a);
      let B = T;
      for (; B < i.events.length; )
        i.events[B][1].end = { ...M }, B++;
      const G = new Hc();
      return G.add(Y + 1, 0, i.events.slice(T)), G.add(T, B - T, []), G.consume(i.events), g(k);
    }
    return d(k);
  }
  function g(k) {
    if (a === l.length) {
      if (!o)
        return x(k);
      if (o.currentConstruct && o.currentConstruct.concrete)
        return S(k);
      i.interrupt = !!(o.currentConstruct && !o._gfmTableDynamicInterruptHack);
    }
    return i.containerState = {}, e12.check($v, y, p)(k);
  }
  function y(k) {
    return o && A(), C(a), x(k);
  }
  function p(k) {
    return i.parser.lazy[i.now().line] = a !== l.length, c = i.now().offset, S(k);
  }
  function x(k) {
    return i.containerState = {}, e12.attempt($v, v, S)(k);
  }
  function v(k) {
    return a++, l.push([i.currentConstruct, i.containerState]), x(k);
  }
  function S(k) {
    if (k === null) {
      o && A(), C(0), e12.consume(k);
      return;
    }
    return o = o || i.parser.flow(i.now()), e12.enter("chunkFlow", { _tokenizer: o, contentType: "flow", previous: s }), E(k);
  }
  function E(k) {
    if (k === null) {
      N(e12.exit("chunkFlow"), true), C(0), e12.consume(k);
      return;
    }
    return Xe(k) ? (e12.consume(k), N(e12.exit("chunkFlow")), a = 0, i.interrupt = void 0, d) : (e12.consume(k), E);
  }
  function N(k, T) {
    const Y = i.sliceStream(k);
    if (T && Y.push(null), k.previous = s, s && (s.next = k), s = k, o.defineSkip(k.start), o.write(Y), i.parser.lazy[k.start.line]) {
      let M = o.events.length;
      for (; M--; )
        if (o.events[M][1].start.offset < c && (!o.events[M][1].end || o.events[M][1].end.offset > c))
          return;
      const B = i.events.length;
      let G = B, J, U;
      for (; G--; )
        if (i.events[G][0] === "exit" && i.events[G][1].type === "chunkFlow") {
          if (J) {
            U = i.events[G][1].end;
            break;
          }
          J = true;
        }
      for (C(a), M = B; M < i.events.length; )
        i.events[M][1].end = { ...U }, M++;
      const X = new Hc();
      X.add(G + 1, 0, i.events.slice(B)), X.add(B, M - B, []), X.consume(i.events);
    }
  }
  function C(k) {
    let T = l.length;
    for (; T-- > k; ) {
      const Y = l[T];
      i.containerState = Y[1], Y[0].exit.call(i, e12);
    }
    l.length = k;
  }
  function A() {
    o.write([null]), s = void 0, o = void 0, i.containerState._closeFlow = void 0;
  }
}
function Z5(e12, i, l) {
  return ct(e12, e12.attempt(this.parser.constructs.document, i, l), "linePrefix", this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4);
}
function Xl(e12) {
  if (e12 === null || Ct(e12) || Rr(e12))
    return 1;
  if (ko(e12))
    return 2;
}
function rf(e12, i, l) {
  const a = [];
  let o = -1;
  for (; ++o < e12.length; ) {
    const s = e12[o].resolveAll;
    s && !a.includes(s) && (i = s(i, l), a.push(s));
  }
  return i;
}
const Jm = { name: "attention", resolveAll: F5, tokenize: K5 };
function F5(e12, i) {
  let l = -1, a;
  for (; ++l < e12.length; )
    if (e12[l][0] === "enter" && e12[l][1].type === "attentionSequence" && e12[l][1]._close) {
      let o = l;
      for (; o--; )
        if (e12[o][0] === "exit" && e12[o][1].type === "attentionSequence" && e12[o][1]._open && i.sliceSerialize(e12[o][1]).charCodeAt(0) === i.sliceSerialize(e12[l][1]).charCodeAt(0)) {
          if ((e12[o][1]._close || e12[l][1]._open) && (e12[l][1].end.offset - e12[l][1].start.offset) % 3 && !((e12[o][1].end.offset - e12[o][1].start.offset + e12[l][1].end.offset - e12[l][1].start.offset) % 3))
            continue;
          const s = e12[o][1].end.offset - e12[o][1].start.offset > 1 && e12[l][1].end.offset - e12[l][1].start.offset > 1 ? 2 : 1, c = { ...e12[o][1].end }, d = { ...e12[l][1].start };
          Qv(c, -s), Qv(d, s);
          const m = { type: s > 1 ? "strongSequence" : "emphasisSequence", start: c, end: { ...e12[o][1].end } }, g = { type: s > 1 ? "strongSequence" : "emphasisSequence", start: { ...e12[l][1].start }, end: d }, y = { type: s > 1 ? "strongText" : "emphasisText", start: { ...e12[o][1].end }, end: { ...e12[l][1].start } }, p = { type: s > 1 ? "strong" : "emphasis", start: { ...m.start }, end: { ...g.end } };
          e12[o][1].end = { ...m.start }, e12[l][1].start = { ...g.end }, a = [], e12[o][1].end.offset - e12[o][1].start.offset && (a = Pn(a, [["enter", e12[o][1], i], ["exit", e12[o][1], i]])), a = Pn(a, [["enter", p, i], ["enter", m, i], ["exit", m, i], ["enter", y, i]]), a = Pn(a, rf(i.parser.constructs.insideSpan.null, e12.slice(o + 1, l), i)), a = Pn(a, [["exit", y, i], ["enter", g, i], ["exit", g, i], ["exit", p, i]]);
          let x = 0;
          e12[l][1].end.offset - e12[l][1].start.offset && (x = 2, a = Pn(a, [["enter", e12[l][1], i], ["exit", e12[l][1], i]])), fi(e12, o - 1, l - o + 3, a), l = o + a.length - x - 2;
          break;
        }
    }
  for (l = -1; ++l < e12.length; )
    e12[l][1].type === "attentionSequence" && (e12[l][1].type = "data");
  return e12;
}
function K5(e12, i) {
  const l = this.parser.constructs.attentionMarkers.null, a = this.previous, o = Xl(a);
  let s;
  return c;
  function c(m) {
    return s = m, e12.enter("attentionSequence"), d(m);
  }
  function d(m) {
    if (m === s)
      return e12.consume(m), d;
    const g = e12.exit("attentionSequence"), y = Xl(m), p = !y || y === 2 && o || l.includes(m) && m !== 42 && m !== 95, x = !o || o === 2 && y || l.includes(a) && a !== 42 && a !== 95;
    return g._open = !!(s === 42 ? p : p && (o || !x)), g._close = !!(s === 42 ? x : x && (y || !p)), i(m);
  }
}
function Qv(e12, i) {
  e12.column += i, e12.offset += i, e12._bufferIndex += i;
}
const P5 = { name: "autolink", tokenize: J5 };
function J5(e12, i, l) {
  let a = 0;
  return o;
  function o(v) {
    return e12.enter("autolink"), e12.enter("autolinkMarker"), e12.consume(v), e12.exit("autolinkMarker"), e12.enter("autolinkProtocol"), s;
  }
  function s(v) {
    return cn(v) ? (e12.consume(v), c) : v === 64 ? l(v) : g(v);
  }
  function c(v) {
    return v === 43 || v === 45 || v === 46 || fn(v) ? (a = 1, d(v)) : g(v);
  }
  function d(v) {
    return v === 58 ? (e12.consume(v), a = 0, m) : (v === 43 || v === 45 || v === 46 || fn(v)) && a++ < 32 ? (e12.consume(v), d) : (a = 0, g(v));
  }
  function m(v) {
    return v === 62 ? (e12.exit("autolinkProtocol"), e12.enter("autolinkMarker"), e12.consume(v), e12.exit("autolinkMarker"), e12.exit("autolink"), i) : v === null || v === 32 || v === 60 || Lc(v) ? l(v) : (e12.consume(v), m);
  }
  function g(v) {
    return v === 64 ? (e12.consume(v), y) : V5(v) ? (e12.consume(v), g) : l(v);
  }
  function y(v) {
    return fn(v) ? p(v) : l(v);
  }
  function p(v) {
    return v === 46 ? (e12.consume(v), a = 0, y) : v === 62 ? (e12.exit("autolinkProtocol").type = "autolinkEmail", e12.enter("autolinkMarker"), e12.consume(v), e12.exit("autolinkMarker"), e12.exit("autolink"), i) : x(v);
  }
  function x(v) {
    if ((v === 45 || fn(v)) && a++ < 63) {
      const S = v === 45 ? x : p;
      return e12.consume(v), S;
    }
    return l(v);
  }
}
const No = { partial: true, tokenize: W5 };
function W5(e12, i, l) {
  return a;
  function a(s) {
    return et(s) ? ct(e12, o, "linePrefix")(s) : o(s);
  }
  function o(s) {
    return s === null || Xe(s) ? i(s) : l(s);
  }
}
const uS = { continuation: { tokenize: tj }, exit: nj, name: "blockQuote", tokenize: ej };
function ej(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    if (c === 62) {
      const d = a.containerState;
      return d.open || (e12.enter("blockQuote", { _container: true }), d.open = true), e12.enter("blockQuotePrefix"), e12.enter("blockQuoteMarker"), e12.consume(c), e12.exit("blockQuoteMarker"), s;
    }
    return l(c);
  }
  function s(c) {
    return et(c) ? (e12.enter("blockQuotePrefixWhitespace"), e12.consume(c), e12.exit("blockQuotePrefixWhitespace"), e12.exit("blockQuotePrefix"), i) : (e12.exit("blockQuotePrefix"), i(c));
  }
}
function tj(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    return et(c) ? ct(e12, s, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(c) : s(c);
  }
  function s(c) {
    return e12.attempt(uS, i, l)(c);
  }
}
function nj(e12) {
  e12.exit("blockQuote");
}
const oS = { name: "characterEscape", tokenize: ij };
function ij(e12, i, l) {
  return a;
  function a(s) {
    return e12.enter("characterEscape"), e12.enter("escapeMarker"), e12.consume(s), e12.exit("escapeMarker"), o;
  }
  function o(s) {
    return rS(s) ? (e12.enter("characterEscapeValue"), e12.consume(s), e12.exit("characterEscapeValue"), e12.exit("characterEscape"), i) : l(s);
  }
}
const sS = { name: "characterReference", tokenize: lj };
function lj(e12, i, l) {
  const a = this;
  let o = 0, s, c;
  return d;
  function d(p) {
    return e12.enter("characterReference"), e12.enter("characterReferenceMarker"), e12.consume(p), e12.exit("characterReferenceMarker"), m;
  }
  function m(p) {
    return p === 35 ? (e12.enter("characterReferenceMarkerNumeric"), e12.consume(p), e12.exit("characterReferenceMarkerNumeric"), g) : (e12.enter("characterReferenceValue"), s = 31, c = fn, y(p));
  }
  function g(p) {
    return p === 88 || p === 120 ? (e12.enter("characterReferenceMarkerHexadecimal"), e12.consume(p), e12.exit("characterReferenceMarkerHexadecimal"), e12.enter("characterReferenceValue"), s = 6, c = Y5, y) : (e12.enter("characterReferenceValue"), s = 7, c = Pm, y(p));
  }
  function y(p) {
    if (p === 59 && o) {
      const x = e12.exit("characterReferenceValue");
      return c === fn && !Up(a.sliceSerialize(x)) ? l(p) : (e12.enter("characterReferenceMarker"), e12.consume(p), e12.exit("characterReferenceMarker"), e12.exit("characterReference"), i);
    }
    return c(p) && o++ < s ? (e12.consume(p), y) : l(p);
  }
}
const Wm = { partial: true, tokenize: rj };
function rj(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    return c === null ? l(c) : (e12.enter("lineEnding"), e12.consume(c), e12.exit("lineEnding"), s);
  }
  function s(c) {
    return a.parser.lazy[a.now().line] ? l(c) : i(c);
  }
}
const Zv = { concrete: true, name: "codeFenced", tokenize: aj };
function aj(e12, i, l) {
  const a = this, o = { partial: true, tokenize: Y };
  let s = 0, c = 0, d;
  return m;
  function m(M) {
    return g(M);
  }
  function g(M) {
    const B = a.events[a.events.length - 1];
    return s = B && B[1].type === "linePrefix" ? B[2].sliceSerialize(B[1], true).length : 0, d = M, e12.enter("codeFenced"), e12.enter("codeFencedFence"), e12.enter("codeFencedFenceSequence"), y(M);
  }
  function y(M) {
    return M === d ? (c++, e12.consume(M), y) : c < 3 ? l(M) : (e12.exit("codeFencedFenceSequence"), et(M) ? ct(e12, p, "whitespace")(M) : p(M));
  }
  function p(M) {
    return M === null || Xe(M) ? (e12.exit("codeFencedFence"), a.interrupt ? i(M) : e12.check(Wm, E, T)(M)) : (e12.enter("codeFencedFenceInfo"), e12.enter("chunkString", { contentType: "string" }), x(M));
  }
  function x(M) {
    return M === null || Xe(M) ? (e12.exit("chunkString"), e12.exit("codeFencedFenceInfo"), p(M)) : et(M) ? (e12.exit("chunkString"), e12.exit("codeFencedFenceInfo"), ct(e12, v, "whitespace")(M)) : M === 96 && M === d ? l(M) : (e12.consume(M), x);
  }
  function v(M) {
    return M === null || Xe(M) ? p(M) : (e12.enter("codeFencedFenceMeta"), e12.enter("chunkString", { contentType: "string" }), S(M));
  }
  function S(M) {
    return M === null || Xe(M) ? (e12.exit("chunkString"), e12.exit("codeFencedFenceMeta"), p(M)) : M === 96 && M === d ? l(M) : (e12.consume(M), S);
  }
  function E(M) {
    return e12.attempt(o, T, N)(M);
  }
  function N(M) {
    return e12.enter("lineEnding"), e12.consume(M), e12.exit("lineEnding"), C;
  }
  function C(M) {
    return s > 0 && et(M) ? ct(e12, A, "linePrefix", s + 1)(M) : A(M);
  }
  function A(M) {
    return M === null || Xe(M) ? e12.check(Wm, E, T)(M) : (e12.enter("codeFlowValue"), k(M));
  }
  function k(M) {
    return M === null || Xe(M) ? (e12.exit("codeFlowValue"), A(M)) : (e12.consume(M), k);
  }
  function T(M) {
    return e12.exit("codeFenced"), i(M);
  }
  function Y(M, B, G) {
    let J = 0;
    return U;
    function U(D) {
      return M.enter("lineEnding"), M.consume(D), M.exit("lineEnding"), X;
    }
    function X(D) {
      return M.enter("codeFencedFence"), et(D) ? ct(M, ie, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(D) : ie(D);
    }
    function ie(D) {
      return D === d ? (M.enter("codeFencedFenceSequence"), re(D)) : G(D);
    }
    function re(D) {
      return D === d ? (J++, M.consume(D), re) : J >= c ? (M.exit("codeFencedFenceSequence"), et(D) ? ct(M, j, "whitespace")(D) : j(D)) : G(D);
    }
    function j(D) {
      return D === null || Xe(D) ? (M.exit("codeFencedFence"), B(D)) : G(D);
    }
  }
}
const sm = { name: "codeIndented", tokenize: oj }, uj = { partial: true, tokenize: sj };
function oj(e12, i, l) {
  return a;
  function a(d) {
    return e12.enter("codeIndented"), aS(e12, o, l, "linePrefix", 4, 4)(d);
  }
  function o(d) {
    return d === null ? c(d) : Xe(d) ? e12.attempt(uj, o, c)(d) : (e12.enter("codeFlowValue"), s(d));
  }
  function s(d) {
    return d === null || Xe(d) ? (e12.exit("codeFlowValue"), o(d)) : (e12.consume(d), s);
  }
  function c(d) {
    return e12.exit("codeIndented"), i(d);
  }
}
function sj(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    return a.parser.lazy[a.now().line] ? l(c) : Xe(c) ? (e12.enter("lineEnding"), e12.consume(c), e12.exit("lineEnding"), o) : aS(e12, i, s, "linePrefix", 4, 4)(c);
  }
  function s(c) {
    return Xe(c) ? o(c) : l(c);
  }
}
const cj = { name: "codeText", previous: dj, resolve: fj, tokenize: hj };
function fj(e12) {
  let i = e12.length - 4, l = 3, a, o;
  if ((e12[l][1].type === "lineEnding" || e12[l][1].type === "space") && (e12[i][1].type === "lineEnding" || e12[i][1].type === "space")) {
    for (a = l; ++a < i; )
      if (e12[a][1].type === "codeTextData") {
        e12[l][1].type = "codeTextPadding", e12[i][1].type = "codeTextPadding", l += 2, i -= 2;
        break;
      }
  }
  for (a = l - 1, i++; ++a <= i; )
    o === void 0 ? a !== i && e12[a][1].type !== "lineEnding" && (o = a) : (a === i || e12[a][1].type === "lineEnding") && (e12[o][1].type = "codeTextData", a !== o + 2 && (e12[o][1].end = e12[a - 1][1].end, e12.splice(o + 2, a - o - 2), i -= a - o - 2, a = o + 2), o = void 0);
  return e12;
}
function dj(e12) {
  return e12 !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function hj(e12, i, l) {
  let a = 0, o, s;
  return c;
  function c(p) {
    return e12.enter("codeText"), e12.enter("codeTextSequence"), d(p);
  }
  function d(p) {
    return p === 96 ? (e12.consume(p), a++, d) : (e12.exit("codeTextSequence"), m(p));
  }
  function m(p) {
    return p === null ? l(p) : p === 32 ? (e12.enter("space"), e12.consume(p), e12.exit("space"), m) : p === 96 ? (s = e12.enter("codeTextSequence"), o = 0, y(p)) : Xe(p) ? (e12.enter("lineEnding"), e12.consume(p), e12.exit("lineEnding"), m) : (e12.enter("codeTextData"), g(p));
  }
  function g(p) {
    return p === null || p === 32 || p === 96 || Xe(p) ? (e12.exit("codeTextData"), m(p)) : (e12.consume(p), g);
  }
  function y(p) {
    return p === 96 ? (e12.consume(p), o++, y) : o === a ? (e12.exit("codeTextSequence"), e12.exit("codeText"), i(p)) : (s.type = "codeTextData", g(p));
  }
}
class mj {
  constructor(i) {
    this.left = i ? [...i] : [], this.right = [];
  }
  get(i) {
    if (i < 0 || i >= this.left.length + this.right.length)
      throw new RangeError("Cannot access index `" + i + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
    return i < this.left.length ? this.left[i] : this.right[this.right.length - i + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(i, l) {
    const a = l ?? Number.POSITIVE_INFINITY;
    return a < this.left.length ? this.left.slice(i, a) : i > this.left.length ? this.right.slice(this.right.length - a + this.left.length, this.right.length - i + this.left.length).reverse() : this.left.slice(i).concat(this.right.slice(this.right.length - a + this.left.length).reverse());
  }
  splice(i, l, a) {
    const o = l || 0;
    this.setCursor(Math.trunc(i));
    const s = this.right.splice(this.right.length - o, Number.POSITIVE_INFINITY);
    return a && Gu(this.left, a), s.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(i) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(i);
  }
  pushMany(i) {
    this.setCursor(Number.POSITIVE_INFINITY), Gu(this.left, i);
  }
  unshift(i) {
    this.setCursor(0), this.right.push(i);
  }
  unshiftMany(i) {
    this.setCursor(0), Gu(this.right, i.reverse());
  }
  setCursor(i) {
    if (!(i === this.left.length || i > this.left.length && this.right.length === 0 || i < 0 && this.left.length === 0))
      if (i < this.left.length) {
        const l = this.left.splice(i, Number.POSITIVE_INFINITY);
        Gu(this.right, l.reverse());
      } else {
        const l = this.right.splice(this.left.length + this.right.length - i, Number.POSITIVE_INFINITY);
        Gu(this.left, l.reverse());
      }
  }
}
function Gu(e12, i) {
  let l = 0;
  if (i.length < 1e4)
    e12.push(...i);
  else
    for (; l < i.length; )
      e12.push(...i.slice(l, l + 1e4)), l += 1e4;
}
function cS(e12) {
  const i = {};
  let l = -1, a, o, s, c, d, m, g;
  const y = new mj(e12);
  for (; ++l < y.length; ) {
    for (; l in i; )
      l = i[l];
    if (a = y.get(l), l && a[1].type === "chunkFlow" && y.get(l - 1)[1].type === "listItemPrefix" && (m = a[1]._tokenizer.events, s = 0, s < m.length && m[s][1].type === "lineEndingBlank" && (s += 2), s < m.length && m[s][1].type === "content"))
      for (; ++s < m.length && m[s][1].type !== "content"; )
        m[s][1].type === "chunkText" && (m[s][1]._isInFirstContentOfListItem = true, s++);
    if (a[0] === "enter")
      a[1].contentType && (Object.assign(i, pj(y, l)), l = i[l], g = true);
    else if (a[1]._container) {
      for (s = l, o = void 0; s--; )
        if (c = y.get(s), c[1].type === "lineEnding" || c[1].type === "lineEndingBlank")
          c[0] === "enter" && (o && (y.get(o)[1].type = "lineEndingBlank"), c[1].type = "lineEnding", o = s);
        else if (!(c[1].type === "linePrefix" || c[1].type === "listItemIndent"))
          break;
      o && (a[1].end = { ...y.get(o)[1].start }, d = y.slice(o, l), d.unshift(a), y.splice(o, l - o + 1, d));
    }
  }
  return fi(e12, 0, Number.POSITIVE_INFINITY, y.slice(0)), !g;
}
function pj(e12, i) {
  const l = e12.get(i)[1], a = e12.get(i)[2];
  let o = i - 1;
  const s = [];
  let c = l._tokenizer;
  c || (c = a.parser[l.contentType](l.start), l._contentTypeTextTrailing && (c._contentTypeTextTrailing = true));
  const d = c.events, m = [], g = {};
  let y, p, x = -1, v = l, S = 0, E = 0;
  const N = [E];
  for (; v; ) {
    for (; e12.get(++o)[1] !== v; )
      ;
    s.push(o), v._tokenizer || (y = a.sliceStream(v), v.next || y.push(null), p && c.defineSkip(v.start), v._isInFirstContentOfListItem && (c._gfmTasklistFirstContentOfListItem = true), c.write(y), v._isInFirstContentOfListItem && (c._gfmTasklistFirstContentOfListItem = void 0)), p = v, v = v.next;
  }
  for (v = l; ++x < d.length; )
    d[x][0] === "exit" && d[x - 1][0] === "enter" && d[x][1].type === d[x - 1][1].type && d[x][1].start.line !== d[x][1].end.line && (E = x + 1, N.push(E), v._tokenizer = void 0, v.previous = void 0, v = v.next);
  for (c.events = [], v ? (v._tokenizer = void 0, v.previous = void 0) : N.pop(), x = N.length; x--; ) {
    const C = d.slice(N[x], N[x + 1]), A = s.pop();
    m.push([A, A + C.length - 1]), e12.splice(A, 2, C);
  }
  for (m.reverse(), x = -1; ++x < m.length; )
    g[S + m[x][0]] = S + m[x][1], S += m[x][1] - m[x][0] - 1;
  return g;
}
const gj = { resolve: xj, tokenize: vj }, yj = { partial: true, tokenize: bj };
function xj(e12) {
  return cS(e12), e12;
}
function vj(e12, i) {
  let l;
  return a;
  function a(d) {
    return e12.enter("content"), l = e12.enter("chunkContent", { contentType: "content" }), o(d);
  }
  function o(d) {
    return d === null ? s(d) : Xe(d) ? e12.check(yj, c, s)(d) : (e12.consume(d), o);
  }
  function s(d) {
    return e12.exit("chunkContent"), e12.exit("content"), i(d);
  }
  function c(d) {
    return e12.consume(d), e12.exit("chunkContent"), l.next = e12.enter("chunkContent", { contentType: "content", previous: l }), l = l.next, o;
  }
}
function bj(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    return e12.exit("chunkContent"), e12.enter("lineEnding"), e12.consume(c), e12.exit("lineEnding"), ct(e12, s, "linePrefix");
  }
  function s(c) {
    if (c === null || Xe(c))
      return l(c);
    const d = a.events[a.events.length - 1];
    return !a.parser.constructs.disable.null.includes("codeIndented") && d && d[1].type === "linePrefix" && d[2].sliceSerialize(d[1], true).length >= 4 ? i(c) : e12.interrupt(a.parser.constructs.flow, l, i)(c);
  }
}
function fS(e12, i, l, a, o, s, c, d, m) {
  const g = m || Number.POSITIVE_INFINITY;
  let y = 0;
  return p;
  function p(C) {
    return C === 60 ? (e12.enter(a), e12.enter(o), e12.enter(s), e12.consume(C), e12.exit(s), x) : C === null || C === 32 || C === 41 || Lc(C) ? l(C) : (e12.enter(a), e12.enter(c), e12.enter(d), e12.enter("chunkString", { contentType: "string" }), E(C));
  }
  function x(C) {
    return C === 62 ? (e12.enter(s), e12.consume(C), e12.exit(s), e12.exit(o), e12.exit(a), i) : (e12.enter(d), e12.enter("chunkString", { contentType: "string" }), v(C));
  }
  function v(C) {
    return C === 62 ? (e12.exit("chunkString"), e12.exit(d), x(C)) : C === null || C === 60 || Xe(C) ? l(C) : (e12.consume(C), C === 92 ? S : v);
  }
  function S(C) {
    return C === 60 || C === 62 || C === 92 ? (e12.consume(C), v) : v(C);
  }
  function E(C) {
    return !y && (C === null || C === 41 || Ct(C)) ? (e12.exit("chunkString"), e12.exit(d), e12.exit(c), e12.exit(a), i(C)) : y < g && C === 40 ? (e12.consume(C), y++, E) : C === 41 ? (e12.consume(C), y--, E) : C === null || C === 32 || C === 40 || Lc(C) ? l(C) : (e12.consume(C), C === 92 ? N : E);
  }
  function N(C) {
    return C === 40 || C === 41 || C === 92 ? (e12.consume(C), E) : E(C);
  }
}
function dS(e12, i, l, a, o, s) {
  const c = this;
  let d = 0, m;
  return g;
  function g(v) {
    return e12.enter(a), e12.enter(o), e12.consume(v), e12.exit(o), e12.enter(s), y;
  }
  function y(v) {
    return d > 999 || v === null || v === 91 || v === 93 && !m || v === 94 && !d && "_hiddenFootnoteSupport" in c.parser.constructs ? l(v) : v === 93 ? (e12.exit(s), e12.enter(o), e12.consume(v), e12.exit(o), e12.exit(a), i) : Xe(v) ? (e12.enter("lineEnding"), e12.consume(v), e12.exit("lineEnding"), y) : (e12.enter("chunkString", { contentType: "string" }), p(v));
  }
  function p(v) {
    return v === null || v === 91 || v === 93 || Xe(v) || d++ > 999 ? (e12.exit("chunkString"), y(v)) : (e12.consume(v), m || (m = !et(v)), v === 92 ? x : p);
  }
  function x(v) {
    return v === 91 || v === 92 || v === 93 ? (e12.consume(v), d++, p) : p(v);
  }
}
function hS(e12, i, l, a, o, s) {
  let c;
  return d;
  function d(x) {
    return x === 34 || x === 39 || x === 40 ? (e12.enter(a), e12.enter(o), e12.consume(x), e12.exit(o), c = x === 40 ? 41 : x, m) : l(x);
  }
  function m(x) {
    return x === c ? (e12.enter(o), e12.consume(x), e12.exit(o), e12.exit(a), i) : (e12.enter(s), g(x));
  }
  function g(x) {
    return x === c ? (e12.exit(s), m(c)) : x === null ? l(x) : Xe(x) ? (e12.enter("lineEnding"), e12.consume(x), e12.exit("lineEnding"), ct(e12, g, "linePrefix")) : (e12.enter("chunkString", { contentType: "string" }), y(x));
  }
  function y(x) {
    return x === c || x === null || Xe(x) ? (e12.exit("chunkString"), g(x)) : (e12.consume(x), x === 92 ? p : y);
  }
  function p(x) {
    return x === c || x === 92 ? (e12.consume(x), y) : y(x);
  }
}
function to(e12, i) {
  let l;
  return a;
  function a(o) {
    return Xe(o) ? (e12.enter("lineEnding"), e12.consume(o), e12.exit("lineEnding"), l = true, a) : et(o) ? ct(e12, a, l ? "linePrefix" : "lineSuffix")(o) : i(o);
  }
}
const wj = { name: "definition", tokenize: Ej }, Sj = { partial: true, tokenize: Cj };
function Ej(e12, i, l) {
  const a = this;
  let o;
  return s;
  function s(v) {
    return e12.enter("definition"), c(v);
  }
  function c(v) {
    return dS.call(a, e12, d, l, "definitionLabel", "definitionLabelMarker", "definitionLabelString")(v);
  }
  function d(v) {
    return o = di(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1)), v === 58 ? (e12.enter("definitionMarker"), e12.consume(v), e12.exit("definitionMarker"), m) : l(v);
  }
  function m(v) {
    return Ct(v) ? to(e12, g)(v) : g(v);
  }
  function g(v) {
    return fS(e12, y, l, "definitionDestination", "definitionDestinationLiteral", "definitionDestinationLiteralMarker", "definitionDestinationRaw", "definitionDestinationString")(v);
  }
  function y(v) {
    return e12.attempt(Sj, p, p)(v);
  }
  function p(v) {
    return et(v) ? ct(e12, x, "whitespace")(v) : x(v);
  }
  function x(v) {
    return v === null || Xe(v) ? (e12.exit("definition"), a.parser.defined.push(o), i(v)) : l(v);
  }
}
function Cj(e12, i, l) {
  return a;
  function a(d) {
    return Ct(d) ? to(e12, o)(d) : l(d);
  }
  function o(d) {
    return hS(e12, s, l, "definitionTitle", "definitionTitleMarker", "definitionTitleString")(d);
  }
  function s(d) {
    return et(d) ? ct(e12, c, "whitespace")(d) : c(d);
  }
  function c(d) {
    return d === null || Xe(d) ? i(d) : l(d);
  }
}
const kj = { name: "hardBreakEscape", tokenize: Nj };
function Nj(e12, i, l) {
  return a;
  function a(s) {
    return e12.enter("hardBreakEscape"), e12.consume(s), o;
  }
  function o(s) {
    return Xe(s) ? (e12.exit("hardBreakEscape"), i(s)) : l(s);
  }
}
const _j = { name: "headingAtx", resolve: zj, tokenize: Tj };
function zj(e12, i) {
  let l = e12.length - 2, a = 3;
  if (e12[a][1].type === "whitespace" && (a += 2), l - 2 > a && e12[l][1].type === "whitespace" && (l -= 2), e12[l][1].type === "atxHeadingSequence" && (a === l - 1 || l - 4 > a && e12[l - 2][1].type === "whitespace") && (l -= a + 1 === l ? 2 : 4), l > a) {
    const o = { type: "atxHeadingText", start: e12[a][1].start, end: e12[l][1].end }, s = { type: "chunkText", start: e12[a][1].start, end: e12[l][1].end, contentType: "text" };
    fi(e12, a, l - a + 1, [["enter", o, i], ["enter", s, i], ["exit", s, i], ["exit", o, i]]);
  }
  return e12;
}
function Tj(e12, i, l) {
  let a = 0;
  return o;
  function o(y) {
    return e12.enter("atxHeading"), s(y);
  }
  function s(y) {
    return e12.enter("atxHeadingSequence"), c(y);
  }
  function c(y) {
    return y === 35 && a++ < 6 ? (e12.consume(y), c) : y === null || Ct(y) ? (e12.exit("atxHeadingSequence"), d(y)) : l(y);
  }
  function d(y) {
    return y === 35 ? (e12.enter("atxHeadingSequence"), m(y)) : y === null || Xe(y) ? (e12.exit("atxHeading"), i(y)) : et(y) ? ct(e12, d, "whitespace")(y) : (e12.enter("atxHeadingText"), g(y));
  }
  function m(y) {
    return y === 35 ? (e12.consume(y), m) : (e12.exit("atxHeadingSequence"), d(y));
  }
  function g(y) {
    return y === null || y === 35 || Ct(y) ? (e12.exit("atxHeadingText"), d(y)) : (e12.consume(y), g);
  }
}
const mS = ["address", "article", "aside", "base", "basefont", "blockquote", "body", "caption", "center", "col", "colgroup", "dd", "details", "dialog", "dir", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hr", "html", "iframe", "legend", "li", "link", "main", "menu", "menuitem", "nav", "noframes", "ol", "optgroup", "option", "p", "param", "search", "section", "summary", "table", "tbody", "td", "tfoot", "th", "thead", "title", "tr", "track", "ul"], ep = ["pre", "script", "style", "textarea"], Aj = { concrete: true, name: "htmlFlow", resolveTo: jj, tokenize: Dj }, Mj = { partial: true, tokenize: Oj };
function jj(e12) {
  let i = e12.length;
  for (; i-- && !(e12[i][0] === "enter" && e12[i][1].type === "htmlFlow"); )
    ;
  return i > 1 && e12[i - 2][1].type === "linePrefix" && (e12[i][1].start = e12[i - 2][1].start, e12[i + 1][1].start = e12[i - 2][1].start, e12.splice(i - 2, 2)), e12;
}
function Dj(e12, i, l) {
  const a = this;
  let o, s, c, d, m;
  return g;
  function g(R) {
    return y(R);
  }
  function y(R) {
    return e12.enter("htmlFlow"), e12.enter("htmlFlowData"), e12.consume(R), p;
  }
  function p(R) {
    return R === 33 ? (e12.consume(R), x) : R === 47 ? (e12.consume(R), s = true, E) : R === 63 ? (e12.consume(R), o = 3, a.interrupt ? i : _) : cn(R) ? (e12.consume(R), c = String.fromCharCode(R), N) : l(R);
  }
  function x(R) {
    return R === 45 ? (e12.consume(R), o = 2, v) : R === 91 ? (e12.consume(R), o = 5, d = 0, S) : cn(R) ? (e12.consume(R), o = 4, a.interrupt ? i : _) : l(R);
  }
  function v(R) {
    return R === 45 ? (e12.consume(R), a.interrupt ? i : _) : l(R);
  }
  function S(R) {
    const O = "CDATA[";
    return R === O.charCodeAt(d++) ? (e12.consume(R), d === O.length ? a.interrupt ? i : ie : S) : l(R);
  }
  function E(R) {
    return cn(R) ? (e12.consume(R), c = String.fromCharCode(R), N) : l(R);
  }
  function N(R) {
    if (R === null || R === 47 || R === 62 || Ct(R)) {
      const O = R === 47, te = c.toLowerCase();
      return !O && !s && ep.includes(te) ? (o = 1, a.interrupt ? i(R) : ie(R)) : mS.includes(c.toLowerCase()) ? (o = 6, O ? (e12.consume(R), C) : a.interrupt ? i(R) : ie(R)) : (o = 7, a.interrupt && !a.parser.lazy[a.now().line] ? l(R) : s ? A(R) : k(R));
    }
    return R === 45 || fn(R) ? (e12.consume(R), c += String.fromCharCode(R), N) : l(R);
  }
  function C(R) {
    return R === 62 ? (e12.consume(R), a.interrupt ? i : ie) : l(R);
  }
  function A(R) {
    return et(R) ? (e12.consume(R), A) : U(R);
  }
  function k(R) {
    return R === 47 ? (e12.consume(R), U) : R === 58 || R === 95 || cn(R) ? (e12.consume(R), T) : et(R) ? (e12.consume(R), k) : U(R);
  }
  function T(R) {
    return R === 45 || R === 46 || R === 58 || R === 95 || fn(R) ? (e12.consume(R), T) : Y(R);
  }
  function Y(R) {
    return R === 61 ? (e12.consume(R), M) : et(R) ? (e12.consume(R), Y) : k(R);
  }
  function M(R) {
    return R === null || R === 60 || R === 61 || R === 62 || R === 96 ? l(R) : R === 34 || R === 39 ? (e12.consume(R), m = R, B) : et(R) ? (e12.consume(R), M) : G(R);
  }
  function B(R) {
    return R === m ? (e12.consume(R), m = null, J) : R === null || Xe(R) ? l(R) : (e12.consume(R), B);
  }
  function G(R) {
    return R === null || R === 34 || R === 39 || R === 47 || R === 60 || R === 61 || R === 62 || R === 96 || Ct(R) ? Y(R) : (e12.consume(R), G);
  }
  function J(R) {
    return R === 47 || R === 62 || et(R) ? k(R) : l(R);
  }
  function U(R) {
    return R === 62 ? (e12.consume(R), X) : l(R);
  }
  function X(R) {
    return R === null || Xe(R) ? ie(R) : et(R) ? (e12.consume(R), X) : l(R);
  }
  function ie(R) {
    return R === 45 && o === 2 ? (e12.consume(R), H) : R === 60 && o === 1 ? (e12.consume(R), V) : R === 62 && o === 4 ? (e12.consume(R), se) : R === 63 && o === 3 ? (e12.consume(R), _) : R === 93 && o === 5 ? (e12.consume(R), F) : Xe(R) && (o === 6 || o === 7) ? (e12.exit("htmlFlowData"), e12.check(Mj, he, re)(R)) : R === null || Xe(R) ? (e12.exit("htmlFlowData"), re(R)) : (e12.consume(R), ie);
  }
  function re(R) {
    return e12.check(Wm, j, he)(R);
  }
  function j(R) {
    return e12.enter("lineEnding"), e12.consume(R), e12.exit("lineEnding"), D;
  }
  function D(R) {
    return R === null || Xe(R) ? re(R) : (e12.enter("htmlFlowData"), ie(R));
  }
  function H(R) {
    return R === 45 ? (e12.consume(R), _) : ie(R);
  }
  function V(R) {
    return R === 47 ? (e12.consume(R), c = "", $) : ie(R);
  }
  function $(R) {
    if (R === 62) {
      const O = c.toLowerCase();
      return ep.includes(O) ? (e12.consume(R), se) : ie(R);
    }
    return cn(R) && c.length < 8 ? (e12.consume(R), c += String.fromCharCode(R), $) : ie(R);
  }
  function F(R) {
    return R === 93 ? (e12.consume(R), _) : ie(R);
  }
  function _(R) {
    return R === 62 ? (e12.consume(R), se) : R === 45 && o === 2 ? (e12.consume(R), _) : ie(R);
  }
  function se(R) {
    return R === null || Xe(R) ? (e12.exit("htmlFlowData"), he(R)) : (e12.consume(R), se);
  }
  function he(R) {
    return e12.exit("htmlFlow"), i(R);
  }
}
function Oj(e12, i, l) {
  return a;
  function a(o) {
    return e12.enter("lineEnding"), e12.consume(o), e12.exit("lineEnding"), e12.attempt(No, i, l);
  }
}
const Rj = { name: "htmlText", tokenize: Lj };
function Lj(e12, i, l) {
  const a = this;
  let o, s, c;
  return d;
  function d(_) {
    return e12.enter("htmlText"), e12.enter("htmlTextData"), e12.consume(_), m;
  }
  function m(_) {
    return _ === 33 ? (e12.consume(_), g) : _ === 47 ? (e12.consume(_), Y) : _ === 63 ? (e12.consume(_), k) : cn(_) ? (e12.consume(_), G) : l(_);
  }
  function g(_) {
    return _ === 45 ? (e12.consume(_), y) : _ === 91 ? (e12.consume(_), s = 0, S) : cn(_) ? (e12.consume(_), A) : l(_);
  }
  function y(_) {
    return _ === 45 ? (e12.consume(_), v) : l(_);
  }
  function p(_) {
    return _ === null ? l(_) : _ === 45 ? (e12.consume(_), x) : Xe(_) ? (c = p, V(_)) : (e12.consume(_), p);
  }
  function x(_) {
    return _ === 45 ? (e12.consume(_), v) : p(_);
  }
  function v(_) {
    return _ === 62 ? H(_) : _ === 45 ? x(_) : p(_);
  }
  function S(_) {
    const se = "CDATA[";
    return _ === se.charCodeAt(s++) ? (e12.consume(_), s === se.length ? E : S) : l(_);
  }
  function E(_) {
    return _ === null ? l(_) : _ === 93 ? (e12.consume(_), N) : Xe(_) ? (c = E, V(_)) : (e12.consume(_), E);
  }
  function N(_) {
    return _ === 93 ? (e12.consume(_), C) : E(_);
  }
  function C(_) {
    return _ === 62 ? H(_) : _ === 93 ? (e12.consume(_), C) : E(_);
  }
  function A(_) {
    return _ === null || _ === 62 ? H(_) : Xe(_) ? (c = A, V(_)) : (e12.consume(_), A);
  }
  function k(_) {
    return _ === null ? l(_) : _ === 63 ? (e12.consume(_), T) : Xe(_) ? (c = k, V(_)) : (e12.consume(_), k);
  }
  function T(_) {
    return _ === 62 ? H(_) : k(_);
  }
  function Y(_) {
    return cn(_) ? (e12.consume(_), M) : l(_);
  }
  function M(_) {
    return _ === 45 || fn(_) ? (e12.consume(_), M) : B(_);
  }
  function B(_) {
    return Xe(_) ? (c = B, V(_)) : et(_) ? (e12.consume(_), B) : H(_);
  }
  function G(_) {
    return _ === 45 || fn(_) ? (e12.consume(_), G) : _ === 47 || _ === 62 || Ct(_) ? J(_) : l(_);
  }
  function J(_) {
    return _ === 47 ? (e12.consume(_), H) : _ === 58 || _ === 95 || cn(_) ? (e12.consume(_), U) : Xe(_) ? (c = J, V(_)) : et(_) ? (e12.consume(_), J) : H(_);
  }
  function U(_) {
    return _ === 45 || _ === 46 || _ === 58 || _ === 95 || fn(_) ? (e12.consume(_), U) : X(_);
  }
  function X(_) {
    return _ === 61 ? (e12.consume(_), ie) : Xe(_) ? (c = X, V(_)) : et(_) ? (e12.consume(_), X) : J(_);
  }
  function ie(_) {
    return _ === null || _ === 60 || _ === 61 || _ === 62 || _ === 96 ? l(_) : _ === 34 || _ === 39 ? (e12.consume(_), o = _, re) : Xe(_) ? (c = ie, V(_)) : et(_) ? (e12.consume(_), ie) : (e12.consume(_), j);
  }
  function re(_) {
    return _ === o ? (e12.consume(_), o = void 0, D) : _ === null ? l(_) : Xe(_) ? (c = re, V(_)) : (e12.consume(_), re);
  }
  function j(_) {
    return _ === null || _ === 34 || _ === 39 || _ === 60 || _ === 61 || _ === 96 ? l(_) : _ === 47 || _ === 62 || Ct(_) ? J(_) : (e12.consume(_), j);
  }
  function D(_) {
    return _ === 47 || _ === 62 || Ct(_) ? J(_) : l(_);
  }
  function H(_) {
    return _ === 62 ? (e12.consume(_), e12.exit("htmlTextData"), e12.exit("htmlText"), i) : l(_);
  }
  function V(_) {
    return e12.exit("htmlTextData"), e12.enter("lineEnding"), e12.consume(_), e12.exit("lineEnding"), $;
  }
  function $(_) {
    return et(_) ? ct(e12, F, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(_) : F(_);
  }
  function F(_) {
    return e12.enter("htmlTextData"), c(_);
  }
}
const Ip = { name: "labelEnd", resolveAll: Ij, resolveTo: qj, tokenize: Vj }, Hj = { tokenize: Yj }, Bj = { tokenize: Xj }, Uj = { tokenize: Gj };
function Ij(e12) {
  let i = -1;
  const l = [];
  for (; ++i < e12.length; ) {
    const a = e12[i][1];
    if (l.push(e12[i]), a.type === "labelImage" || a.type === "labelLink" || a.type === "labelEnd") {
      const o = a.type === "labelImage" ? 4 : 2;
      a.type = "data", i += o;
    }
  }
  return e12.length !== l.length && fi(e12, 0, e12.length, l), e12;
}
function qj(e12, i) {
  let l = e12.length, a = 0, o, s, c;
  for (; l--; ) {
    const y = e12[l][1];
    if (o) {
      if (y.type === "link" || y.type === "labelLink" && y._inactive)
        break;
      e12[l][0] === "enter" && y.type === "labelLink" && (y._inactive = true);
    } else if (s) {
      if (e12[l][0] === "enter" && (y.type === "labelImage" || y.type === "labelLink") && !y._balanced && (o = l, y.type !== "labelLink")) {
        a = 2;
        break;
      }
    } else
      y.type === "labelEnd" && (s = l);
  }
  const d = { type: e12[o][1].type === "labelLink" ? "link" : "image", start: { ...e12[o][1].start }, end: { ...e12[e12.length - 1][1].end } }, m = { type: "label", start: { ...e12[o][1].start }, end: { ...e12[s][1].end } }, g = { type: "labelText", start: { ...e12[o + a + 2][1].end }, end: { ...e12[s - 2][1].start } };
  return c = [["enter", d, i], ["enter", m, i]], c = Pn(c, e12.slice(o + 1, o + a + 3)), c = Pn(c, [["enter", g, i]]), c = Pn(c, rf(i.parser.constructs.insideSpan.null, e12.slice(o + a + 4, s - 3), i)), c = Pn(c, [["exit", g, i], e12[s - 2], e12[s - 1], ["exit", m, i]]), c = Pn(c, e12.slice(s + 1)), c = Pn(c, [["exit", d, i]]), fi(e12, o, e12.length, c), e12;
}
function Vj(e12, i, l) {
  const a = this, o = a._labelStarts;
  let s, c;
  if (o) {
    for (; o.length > 0 && o[o.length - 1]._balanced; )
      o.pop();
    s = o[o.length - 1];
  }
  return d;
  function d(x) {
    return s ? s._inactive ? p(x) : (c = a.parser.defined.includes(di(a.sliceSerialize({ start: s.end, end: a.now() }))), e12.enter("labelEnd"), e12.enter("labelMarker"), e12.consume(x), e12.exit("labelMarker"), e12.exit("labelEnd"), m) : l(x);
  }
  function m(x) {
    return x === 40 ? e12.attempt(Hj, y, c ? y : p)(x) : x === 91 ? e12.attempt(Bj, y, c ? g : p)(x) : c ? y(x) : p(x);
  }
  function g(x) {
    return e12.attempt(Uj, y, p)(x);
  }
  function y(x) {
    return o.pop(), i(x);
  }
  function p(x) {
    return s._balanced = true, l(x);
  }
}
function Yj(e12, i, l) {
  return a;
  function a(p) {
    return e12.enter("resource"), e12.enter("resourceMarker"), e12.consume(p), e12.exit("resourceMarker"), o;
  }
  function o(p) {
    return Ct(p) ? to(e12, s)(p) : s(p);
  }
  function s(p) {
    return p === 41 ? y(p) : fS(e12, c, d, "resourceDestination", "resourceDestinationLiteral", "resourceDestinationLiteralMarker", "resourceDestinationRaw", "resourceDestinationString", 32)(p);
  }
  function c(p) {
    return Ct(p) ? to(e12, m)(p) : y(p);
  }
  function d(p) {
    return l(p);
  }
  function m(p) {
    return p === 34 || p === 39 || p === 40 ? hS(e12, g, l, "resourceTitle", "resourceTitleMarker", "resourceTitleString")(p) : y(p);
  }
  function g(p) {
    return Ct(p) ? to(e12, y)(p) : y(p);
  }
  function y(p) {
    return p === 41 ? (e12.enter("resourceMarker"), e12.consume(p), e12.exit("resourceMarker"), e12.exit("resource"), i) : l(p);
  }
}
function Xj(e12, i, l) {
  const a = this;
  return o;
  function o(d) {
    return dS.call(a, e12, s, c, "reference", "referenceMarker", "referenceString")(d);
  }
  function s(d) {
    return a.parser.defined.includes(di(a.sliceSerialize(a.events[a.events.length - 1][1]).slice(1, -1))) ? i(d) : l(d);
  }
  function c(d) {
    return l(d);
  }
}
function Gj(e12, i, l) {
  return a;
  function a(s) {
    return e12.enter("reference"), e12.enter("referenceMarker"), e12.consume(s), e12.exit("referenceMarker"), o;
  }
  function o(s) {
    return s === 93 ? (e12.enter("referenceMarker"), e12.consume(s), e12.exit("referenceMarker"), e12.exit("reference"), i) : l(s);
  }
}
const $j = { name: "labelStartImage", resolveAll: Ip.resolveAll, tokenize: Qj };
function Qj(e12, i, l) {
  const a = this;
  let o;
  return s;
  function s(m) {
    return e12.enter("labelImage"), e12.enter("labelImageMarker"), e12.consume(m), e12.exit("labelImageMarker"), c;
  }
  function c(m) {
    return m === 91 ? (e12.enter("labelMarker"), e12.consume(m), e12.exit("labelMarker"), o = e12.exit("labelImage"), d) : l(m);
  }
  function d(m) {
    return m === 94 && "_hiddenFootnoteSupport" in a.parser.constructs ? l(m) : (a._labelStarts = a._labelStarts || [], a._labelStarts.push(o), i(m));
  }
}
const Zj = { name: "labelStartLink", resolveAll: Ip.resolveAll, tokenize: Fj };
function Fj(e12, i, l) {
  const a = this;
  let o;
  return s;
  function s(d) {
    return e12.enter("labelLink"), e12.enter("labelMarker"), e12.consume(d), e12.exit("labelMarker"), o = e12.exit("labelLink"), c;
  }
  function c(d) {
    return d === 94 && "_hiddenFootnoteSupport" in a.parser.constructs ? l(d) : (a._labelStarts = a._labelStarts || [], a._labelStarts.push(o), i(d));
  }
}
const cm = { name: "lineEnding", tokenize: Kj };
function Kj(e12, i) {
  return l;
  function l(a) {
    return e12.enter("lineEnding"), e12.consume(a), e12.exit("lineEnding"), ct(e12, i, "linePrefix");
  }
}
const wc = { name: "thematicBreak", tokenize: Pj };
function Pj(e12, i, l) {
  let a = 0, o;
  return s;
  function s(g) {
    return e12.enter("thematicBreak"), c(g);
  }
  function c(g) {
    return o = g, d(g);
  }
  function d(g) {
    return g === o ? (e12.enter("thematicBreakSequence"), m(g)) : a >= 3 && (g === null || Xe(g)) ? (e12.exit("thematicBreak"), i(g)) : l(g);
  }
  function m(g) {
    return g === o ? (e12.consume(g), a++, m) : (e12.exit("thematicBreakSequence"), et(g) ? ct(e12, d, "whitespace")(g) : d(g));
  }
}
const Cn = { continuation: { tokenize: t6 }, exit: i6, name: "list", tokenize: e62 }, Jj = { partial: true, tokenize: l6 }, Wj = { partial: true, tokenize: n6 };
function e62(e12, i, l) {
  const a = this, o = a.events[a.events.length - 1];
  let s = o && o[1].type === "linePrefix" ? o[2].sliceSerialize(o[1], true).length : 0, c = 0;
  return d;
  function d(v) {
    const S = a.containerState.type || (v === 42 || v === 43 || v === 45 ? "listUnordered" : "listOrdered");
    if (S === "listUnordered" ? !a.containerState.marker || v === a.containerState.marker : Pm(v)) {
      if (a.containerState.type || (a.containerState.type = S, e12.enter(S, { _container: true })), S === "listUnordered")
        return e12.enter("listItemPrefix"), v === 42 || v === 45 ? e12.check(wc, l, g)(v) : g(v);
      if (!a.interrupt || v === 49)
        return e12.enter("listItemPrefix"), e12.enter("listItemValue"), m(v);
    }
    return l(v);
  }
  function m(v) {
    return Pm(v) && ++c < 10 ? (e12.consume(v), m) : (!a.interrupt || c < 2) && (a.containerState.marker ? v === a.containerState.marker : v === 41 || v === 46) ? (e12.exit("listItemValue"), g(v)) : l(v);
  }
  function g(v) {
    return e12.enter("listItemMarker"), e12.consume(v), e12.exit("listItemMarker"), a.containerState.marker = a.containerState.marker || v, e12.check(No, a.interrupt ? l : y, e12.attempt(Jj, x, p));
  }
  function y(v) {
    return a.containerState.initialBlankLine = true, s++, x(v);
  }
  function p(v) {
    return et(v) ? (e12.enter("listItemPrefixWhitespace"), e12.consume(v), e12.exit("listItemPrefixWhitespace"), x) : l(v);
  }
  function x(v) {
    return a.containerState.size = s + a.sliceSerialize(e12.exit("listItemPrefix"), true).length, i(v);
  }
}
function t6(e12, i, l) {
  const a = this;
  return a.containerState._closeFlow = void 0, e12.check(No, o, s);
  function o(d) {
    return a.containerState.furtherBlankLines = a.containerState.furtherBlankLines || a.containerState.initialBlankLine, ct(e12, i, "listItemIndent", a.containerState.size + 1)(d);
  }
  function s(d) {
    return a.containerState.furtherBlankLines || !et(d) ? (a.containerState.furtherBlankLines = void 0, a.containerState.initialBlankLine = void 0, c(d)) : (a.containerState.furtherBlankLines = void 0, a.containerState.initialBlankLine = void 0, e12.attempt(Wj, i, c)(d));
  }
  function c(d) {
    return a.containerState._closeFlow = true, a.interrupt = void 0, ct(e12, e12.attempt(Cn, i, l), "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(d);
  }
}
function n6(e12, i, l) {
  const a = this;
  return ct(e12, o, "listItemIndent", a.containerState.size + 1);
  function o(s) {
    const c = a.events[a.events.length - 1];
    return c && c[1].type === "listItemIndent" && c[2].sliceSerialize(c[1], true).length === a.containerState.size ? i(s) : l(s);
  }
}
function i6(e12) {
  e12.exit(this.containerState.type);
}
function l6(e12, i, l) {
  const a = this;
  return ct(e12, o, "listItemPrefixWhitespace", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 5);
  function o(s) {
    const c = a.events[a.events.length - 1];
    return !et(s) && c && c[1].type === "listItemPrefixWhitespace" ? i(s) : l(s);
  }
}
const Fv = { name: "setextUnderline", resolveTo: r6, tokenize: a6 };
function r6(e12, i) {
  const l = new Hc();
  let a = e12.length, o, s, c;
  for (; a--; )
    if (e12[a][0] === "enter") {
      if (e12[a][1].type === "content") {
        o = a;
        break;
      }
      e12[a][1].type === "paragraph" && (s = a);
    } else
      e12[a][1].type === "content" && l.add(a, 1, []), !c && e12[a][1].type === "definition" && (c = a);
  const d = { type: "setextHeading", start: { ...e12[o][1].start }, end: { ...e12[e12.length - 1][1].end } };
  return e12[s][1].type = "setextHeadingText", c ? (l.add(s, 0, [["enter", d, i]]), l.add(c + 1, 0, [["exit", e12[o][1], i]]), e12[o][1].end = { ...e12[c][1].end }) : e12[o][1] = d, l.add(e12.length, 0, [["exit", d, i]]), l.consume(e12), e12;
}
function a6(e12, i, l) {
  const a = this;
  let o;
  return s;
  function s(g) {
    let y = a.events.length, p;
    for (; y--; )
      if (a.events[y][1].type !== "lineEnding" && a.events[y][1].type !== "linePrefix" && a.events[y][1].type !== "content") {
        p = a.events[y][1].type === "paragraph";
        break;
      }
    return !a.parser.lazy[a.now().line] && (a.interrupt || p) ? (e12.enter("setextHeadingLine"), o = g, c(g)) : l(g);
  }
  function c(g) {
    return e12.enter("setextHeadingLineSequence"), d(g);
  }
  function d(g) {
    return g === o ? (e12.consume(g), d) : (e12.exit("setextHeadingLineSequence"), et(g) ? ct(e12, m, "lineSuffix")(g) : m(g));
  }
  function m(g) {
    return g === null || Xe(g) ? (e12.exit("setextHeadingLine"), i(g)) : l(g);
  }
}
const u6 = { tokenize: o6 };
function o6(e12) {
  const i = this, l = e12.attempt(No, a, e12.attempt(this.parser.constructs.flowInitial, o, ct(e12, e12.attempt(this.parser.constructs.flow, o, e12.attempt(gj, o)), "linePrefix")));
  return l;
  function a(s) {
    if (s === null) {
      e12.consume(s);
      return;
    }
    return e12.enter("lineEndingBlank"), e12.consume(s), e12.exit("lineEndingBlank"), i.currentConstruct = void 0, l;
  }
  function o(s) {
    if (s === null) {
      e12.consume(s);
      return;
    }
    return e12.enter("lineEnding"), e12.consume(s), e12.exit("lineEnding"), i.currentConstruct = void 0, l;
  }
}
const s6 = { resolveAll: gS() }, c6 = pS("string"), f6 = pS("text");
function pS(e12) {
  return { resolveAll: gS(e12 === "text" ? d6 : void 0), tokenize: i };
  function i(l) {
    const a = this, o = this.parser.constructs[e12], s = l.attempt(o, c, d);
    return c;
    function c(y) {
      return g(y) ? s(y) : d(y);
    }
    function d(y) {
      if (y === null) {
        l.consume(y);
        return;
      }
      return l.enter("data"), l.consume(y), m;
    }
    function m(y) {
      return g(y) ? (l.exit("data"), s(y)) : (l.consume(y), m);
    }
    function g(y) {
      if (y === null)
        return true;
      const p = o[y];
      let x = -1;
      if (p)
        for (; ++x < p.length; ) {
          const v = p[x];
          if (!v.previous || v.previous.call(a, a.previous))
            return true;
        }
      return false;
    }
  }
}
function gS(e12) {
  return i;
  function i(l, a) {
    let o = -1, s;
    for (; ++o <= l.length; )
      s === void 0 ? l[o] && l[o][1].type === "data" && (s = o, o++) : (!l[o] || l[o][1].type !== "data") && (o !== s + 2 && (l[s][1].end = l[o - 1][1].end, l.splice(s + 2, o - s - 2), o = s + 2), s = void 0);
    return e12 ? e12(l, a) : l;
  }
}
function d6(e12, i) {
  const l = new Hc();
  let a = 0;
  for (; ++a <= e12.length; )
    if ((a === e12.length || e12[a][1].type === "lineEnding") && e12[a - 1][1].type === "data") {
      const o = e12[a - 1][1], s = i.sliceStream(o);
      let c = s.length, d = -1, m = 0, g;
      for (; c--; ) {
        const y = s[c];
        if (typeof y == "string") {
          for (d = y.length; y.charCodeAt(d - 1) === 32; )
            m++, d--;
          if (d)
            break;
          d = -1;
        } else if (y === -2)
          g = true, m++;
        else if (y !== -1) {
          c++;
          break;
        }
      }
      if (i._contentTypeTextTrailing && a === e12.length && (m = 0), m) {
        const y = { type: a === e12.length || g || m < 2 ? "lineSuffix" : "hardBreakTrailing", start: { _bufferIndex: c ? d : o.start._bufferIndex + d, _index: o.start._index + c, line: o.end.line, column: o.end.column - m, offset: o.end.offset - m }, end: { ...o.end } };
        o.end = { ...y.start }, o.start.offset === o.end.offset ? Object.assign(o, y) : l.add(a, 0, [["enter", y, i], ["exit", y, i]]);
      }
      a++;
    }
  return l.consume(e12), e12;
}
const h6 = { 42: Cn, 43: Cn, 45: Cn, 48: Cn, 49: Cn, 50: Cn, 51: Cn, 52: Cn, 53: Cn, 54: Cn, 55: Cn, 56: Cn, 57: Cn, 62: uS }, m6 = { 91: wj }, p6 = { [-2]: sm, [-1]: sm, 32: sm }, g6 = { 35: _j, 42: wc, 45: [Fv, wc], 60: Aj, 61: Fv, 95: wc, 96: Zv, 126: Zv }, y6 = { 38: sS, 92: oS }, x6 = { [-5]: cm, [-4]: cm, [-3]: cm, 33: $j, 38: sS, 42: Jm, 60: [P5, Rj], 91: Zj, 92: [kj, oS], 93: Ip, 95: Jm, 96: cj }, v6 = { null: [Jm, s6] }, b6 = { null: [42, 95] }, w6 = { null: [] }, S6 = Object.freeze(Object.defineProperty({ __proto__: null, attentionMarkers: b6, contentInitial: m6, disable: w6, document: h6, flow: g6, flowInitial: p6, insideSpan: v6, string: y6, text: x6 }, Symbol.toStringTag, { value: "Module" }));
function E6(e12, i, l) {
  let a = { _bufferIndex: -1, _index: 0, line: l && l.line || 1, column: l && l.column || 1, offset: l && l.offset || 0 };
  const o = {}, s = [];
  let c = [], d = [];
  const m = { attempt: B(Y), check: B(M), consume: A, enter: k, exit: T, interrupt: B(M, { interrupt: true }) }, g = { code: null, containerState: {}, defineSkip: E, events: [], now: S, parser: e12, previous: null, sliceSerialize: x, sliceStream: v, write: p };
  let y = i.tokenize.call(g, m);
  return i.resolveAll && s.push(i), g;
  function p(X) {
    return c = Pn(c, X), N(), c[c.length - 1] !== null ? [] : (G(i, 0), g.events = rf(s, g.events, g), g.events);
  }
  function x(X, ie) {
    return k6(v(X), ie);
  }
  function v(X) {
    return C6(c, X);
  }
  function S() {
    const { _bufferIndex: X, _index: ie, line: re, column: j, offset: D } = a;
    return { _bufferIndex: X, _index: ie, line: re, column: j, offset: D };
  }
  function E(X) {
    o[X.line] = X.column, U();
  }
  function N() {
    for (; a._index < c.length; ) {
      const X = c[a._index];
      if (typeof X == "string") {
        const ie = a._index;
        for (a._bufferIndex < 0 && (a._bufferIndex = 0); a._index === ie && a._bufferIndex < X.length; )
          C(X.charCodeAt(a._bufferIndex));
      } else
        C(X);
    }
  }
  function C(X) {
    y = y(X);
  }
  function A(X) {
    Xe(X) ? (a.line++, a.column = 1, a.offset += X === -3 ? 2 : 1, U()) : X !== -1 && (a.column++, a.offset++), a._bufferIndex < 0 ? a._index++ : (a._bufferIndex++, a._bufferIndex === c[a._index].length && (a._bufferIndex = -1, a._index++)), g.previous = X;
  }
  function k(X, ie) {
    const re = ie || {};
    return re.type = X, re.start = S(), g.events.push(["enter", re, g]), d.push(re), re;
  }
  function T(X) {
    const ie = d.pop();
    return ie.end = S(), g.events.push(["exit", ie, g]), ie;
  }
  function Y(X, ie) {
    G(X, ie.from);
  }
  function M(X, ie) {
    ie.restore();
  }
  function B(X, ie) {
    return re;
    function re(j, D, H) {
      let V, $, F, _;
      return Array.isArray(j) ? he(j) : "tokenize" in j ? he([j]) : se(j);
      function se(pe) {
        return me;
        function me(ne) {
          const xe = ne !== null && pe[ne], Se = ne !== null && pe.null, fe = [...Array.isArray(xe) ? xe : xe ? [xe] : [], ...Array.isArray(Se) ? Se : Se ? [Se] : []];
          return he(fe)(ne);
        }
      }
      function he(pe) {
        return V = pe, $ = 0, pe.length === 0 ? H : R(pe[$]);
      }
      function R(pe) {
        return me;
        function me(ne) {
          return _ = J(), F = pe, pe.partial || (g.currentConstruct = pe), pe.name && g.parser.constructs.disable.null.includes(pe.name) ? te() : pe.tokenize.call(ie ? Object.assign(Object.create(g), ie) : g, m, O, te)(ne);
        }
      }
      function O(pe) {
        return X(F, _), D;
      }
      function te(pe) {
        return _.restore(), ++$ < V.length ? R(V[$]) : H;
      }
    }
  }
  function G(X, ie) {
    X.resolveAll && !s.includes(X) && s.push(X), X.resolve && fi(g.events, ie, g.events.length - ie, X.resolve(g.events.slice(ie), g)), X.resolveTo && (g.events = X.resolveTo(g.events, g));
  }
  function J() {
    const X = S(), ie = g.previous, re = g.currentConstruct, j = g.events.length, D = Array.from(d);
    return { from: j, restore: H };
    function H() {
      a = X, g.previous = ie, g.currentConstruct = re, g.events.length = j, d = D, U();
    }
  }
  function U() {
    a.line in o && a.column < 2 && (a.column = o[a.line], a.offset += o[a.line] - 1);
  }
}
function C6(e12, i) {
  const l = i.start._index, a = i.start._bufferIndex, o = i.end._index, s = i.end._bufferIndex;
  let c;
  if (l === o)
    c = [e12[l].slice(a, s)];
  else {
    if (c = e12.slice(l, o), a > -1) {
      const d = c[0];
      typeof d == "string" ? c[0] = d.slice(a) : c.shift();
    }
    s > 0 && c.push(e12[o].slice(0, s));
  }
  return c;
}
function k6(e12, i) {
  let l = -1;
  const a = [];
  let o;
  for (; ++l < e12.length; ) {
    const s = e12[l];
    let c;
    if (typeof s == "string")
      c = s;
    else
      switch (s) {
        case -5: {
          c = "\r";
          break;
        }
        case -4: {
          c = `
`;
          break;
        }
        case -3: {
          c = `\r
`;
          break;
        }
        case -2: {
          c = i ? " " : "	";
          break;
        }
        case -1: {
          if (!i && o)
            continue;
          c = " ";
          break;
        }
        default:
          c = String.fromCharCode(s);
      }
    o = s === -2, a.push(c);
  }
  return a.join("");
}
function N6(e12) {
  const a = { constructs: iS([S6, ...(e12 || {}).extensions || []]), content: o(X5), defined: [], document: o($5), flow: o(u6), lazy: {}, string: o(c6), text: o(f6) };
  return a;
  function o(s) {
    return c;
    function c(d) {
      return E6(a, s, d);
    }
  }
}
function _6(e12) {
  for (; !cS(e12); )
    ;
  return e12;
}
const Kv = /[\0\t\n\r]/g;
function z6() {
  let e12 = 1, i = "", l = true, a;
  return o;
  function o(s, c, d) {
    s = i + (typeof s == "string" ? s.toString() : new TextDecoder(c || void 0).decode(s));
    const m = [];
    let g = 0;
    for (i = "", l && (s.charCodeAt(0) === 65279 && g++, l = void 0); g < s.length; ) {
      Kv.lastIndex = g;
      const y = Kv.exec(s), p = y && y.index !== void 0 ? y.index : s.length, x = s.charCodeAt(p);
      if (!y) {
        i = s.slice(g);
        break;
      }
      if (x === 10 && g === p && a)
        m.push(-3), a = void 0;
      else
        switch (a && (m.push(-5), a = void 0), g < p && (m.push(s.slice(g, p)), e12 += p - g), x) {
          case 0: {
            m.push(65533), e12++;
            break;
          }
          case 9: {
            const v = Math.ceil(e12 / 4) * 4;
            for (m.push(-2); e12++ < v; )
              m.push(-1);
            break;
          }
          case 10: {
            m.push(-4), e12 = 1;
            break;
          }
          default:
            a = true, e12 = 1;
        }
      g = p + 1;
    }
    return d && (a && m.push(-5), i && m.push(i), m.push(null)), m;
  }
}
const T6 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function A6(e12) {
  return e12.replace(T6, M6);
}
function M6(e12, i, l) {
  if (i)
    return i;
  if (l.charCodeAt(0) === 35) {
    const o = l.charCodeAt(1), s = o === 120 || o === 88;
    return lS(l.slice(s ? 2 : 1), s ? 16 : 10);
  }
  return Up(l) || e12;
}
const yS = {}.hasOwnProperty;
function j6(e12, i, l) {
  return i && typeof i == "object" && (l = i, i = void 0), D6(l)(_6(N6(l).document().write(z6()(e12, i, true))));
}
function D6(e12) {
  const i = { afterExit: [], beforeEnter: [], transforms: [], canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"], enter: { autolink: c(pt), autolinkProtocol: U, autolinkEmail: U, atxHeading: c(Ae), blockQuote: c(fe), characterEscape: U, characterReference: U, codeFenced: c(q), codeFencedFenceInfo: d, codeFencedFenceMeta: d, codeIndented: c(q, d), codeText: c(we, d), codeTextData: U, data: U, codeFlowValue: U, definition: c(Ce), definitionDestinationString: d, definitionLabelString: d, definitionTitleString: d, emphasis: c(Te), hardBreakEscape: c(Ee), hardBreakTrailing: c(Ee), htmlFlow: c(qe, d), htmlFlowData: U, htmlText: c(qe, d), htmlTextData: U, image: c(Le), label: d, link: c(pt), listItem: c(Lt), listItemValue: v, listOrdered: c(vt, x), listUnordered: c(vt), paragraph: c(Zt), reference: O, referenceString: d, resourceDestinationString: d, resourceTitleString: d, setextHeading: c(Ae), strong: c(Ht), thematicBreak: c(ce) }, exit: { atxHeading: g(), atxHeadingSequence: M, autolink: g(), autolinkEmail: Se, autolinkProtocol: xe, blockQuote: g(), characterEscapeValue: X, characterReferenceMarkerHexadecimal: pe, characterReferenceMarkerNumeric: pe, characterReferenceValue: me, characterReference: ne, codeFenced: g(C), codeFencedFence: N, codeFencedFenceInfo: S, codeFencedFenceMeta: E, codeFlowValue: X, codeIndented: g(A), codeText: g(H), codeTextData: X, data: X, definition: g(), definitionDestinationString: Y, definitionLabelString: k, definitionTitleString: T, emphasis: g(), hardBreakEscape: g(re), hardBreakTrailing: g(re), htmlFlow: g(j), htmlFlowData: X, htmlText: g(D), htmlTextData: X, image: g($), label: _, labelText: F, lineEnding: ie, link: g(V), listItem: g(), listOrdered: g(), listUnordered: g(), paragraph: g(), referenceString: te, resourceDestinationString: se, resourceTitleString: he, resource: R, setextHeading: g(J), setextHeadingLineSequence: G, setextHeadingText: B, strong: g(), thematicBreak: g() } };
  xS(i, (e12 || {}).mdastExtensions || []);
  const l = {};
  return a;
  function a(K) {
    let de = { type: "root", children: [], position: void 0 };
    const Ne = { stack: [de], tokenStack: [], config: i, enter: m, exit: y, buffer: d, resume: p, data: l }, be = [], Ze = [];
    let Ve = -1;
    for (; ++Ve < K.length; )
      if (Ze.push(K[Ve]), K[Ve][1].type === "listOrdered" || K[Ve][1].type === "listUnordered")
        if (K[Ve][0] === "enter")
          be.push(Ze.length - 1);
        else {
          const Ke = be.pop();
          s(Ze, Ke);
        }
    for (K = Ze, Ve = -1; ++Ve < K.length; ) {
      const Ke = i[K[Ve][0]];
      K[Ve][0] === "enter" && i.beforeEnter.length > 0 && o(i.beforeEnter, { ...Ne, sliceSerialize: K[Ve][2].sliceSerialize }, K[Ve][1]), yS.call(Ke, K[Ve][1].type) && Ke[K[Ve][1].type].call({ ...Ne, sliceSerialize: K[Ve][2].sliceSerialize }, K[Ve][1]), K[Ve][0] === "exit" && i.afterExit.length > 0 && o(i.afterExit, { ...Ne, sliceSerialize: K[Ve][2].sliceSerialize }, K[Ve][1]);
    }
    if (Ne.tokenStack.length > 0) {
      const Ke = Ne.tokenStack[Ne.tokenStack.length - 1];
      (Ke[1] || Pv).call(Ne, void 0, Ke[0]);
    }
    for (de.position = { start: Ul(K.length > 0 ? K[0][1].start : { line: 1, column: 1, offset: 0 }), end: Ul(K.length > 0 ? K[K.length - 2][1].end : { line: 1, column: 1, offset: 0 }) }, Ve = -1; ++Ve < i.transforms.length; )
      de = i.transforms[Ve](de) || de;
    return de;
  }
  function o(K, de, Ne) {
    let be = -1;
    for (; ++be < K.length; )
      K[be].call(de, Ne);
  }
  function s(K, de) {
    const Ne = K.length - 1;
    let be = de - 1, Ze = -1, Ve = false, Ke, lt, Ye, It;
    const zt = [];
    for (; ++be <= Ne; ) {
      const Dt = K[be];
      switch (Dt[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Dt[0] === "enter" ? Ze++ : Ze--, It = void 0;
          break;
        }
        case "lineEndingBlank": {
          Dt[0] === "enter" && (Ke && !It && !Ze && !Ye && (Ye = be), It = void 0);
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          It = void 0;
      }
      if (!Ze && Dt[0] === "enter" && Dt[1].type === "listItemPrefix" || Ze === -1 && Dt[0] === "exit" && (Dt[1].type === "listUnordered" || Dt[1].type === "listOrdered")) {
        if (Ke) {
          let dn = be;
          for (lt = void 0; dn--; ) {
            const Ft = K[dn];
            if (Ft[1].type === "lineEnding" || Ft[1].type === "lineEndingBlank") {
              if (Ft[0] === "exit")
                continue;
              lt && (K[lt][1].type = "lineEndingBlank", Ve = true), Ft[1].type = "lineEnding", lt = dn;
            } else if (!(Ft[1].type === "linePrefix" || Ft[1].type === "blockQuotePrefix" || Ft[1].type === "blockQuotePrefixWhitespace" || Ft[1].type === "blockQuoteMarker" || Ft[1].type === "listItemIndent"))
              break;
          }
          Ye && (!lt || Ye < lt) && (Ke._spread = true), Ke.end = Object.assign({}, lt ? K[lt][1].start : Dt[1].end), zt.push({ at: lt || be, event: ["exit", Ke, Dt[2]] });
        }
        if (Dt[1].type === "listItemPrefix") {
          const dn = { type: "listItem", _spread: false, start: Object.assign({}, Dt[1].start), end: void 0 };
          Ke = dn, zt.push({ at: be, event: ["enter", dn, Dt[2]] }), Ye = void 0, It = true;
        }
      }
    }
    const Oi = K.splice(de);
    let bt = 0;
    for (be = -1; ++be < Oi.length; ) {
      for (; bt < zt.length && zt[bt].at === de + be; )
        K.push(zt[bt++].event);
      K.push(Oi[be]);
    }
    K[de][1]._spread = Ve;
  }
  function c(K, de) {
    return Ne;
    function Ne(be) {
      m.call(this, K(be), be), de && de.call(this, be);
    }
  }
  function d() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function m(K, de, Ne) {
    this.stack[this.stack.length - 1].children.push(K), this.stack.push(K), this.tokenStack.push([de, Ne || void 0]), K.position = { start: Ul(de.start), end: void 0 };
  }
  function g(K) {
    return de;
    function de(Ne) {
      K && K.call(this, Ne), y.call(this, Ne);
    }
  }
  function y(K, de) {
    const Ne = this.stack.pop(), be = this.tokenStack.pop();
    if (!be)
      throw new Error("Cannot close `" + K.type + "` (" + eo({ start: K.start, end: K.end }) + "): it’s not open");
    be[0].type !== K.type && (de ? de.call(this, K, be[0]) : (be[1] || Pv).call(this, K, be[0])), Ne.position.end = Ul(K.end);
  }
  function p() {
    return lf(this.stack.pop());
  }
  function x() {
    this.data.expectingFirstListItemValue = true;
  }
  function v(K) {
    if (this.data.expectingFirstListItemValue) {
      const de = this.stack[this.stack.length - 2];
      de.start = Number.parseInt(this.sliceSerialize(K), 10), this.data.expectingFirstListItemValue = void 0;
    }
  }
  function S() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.lang = K;
  }
  function E() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.meta = K;
  }
  function N() {
    this.data.flowCodeInside || (this.buffer(), this.data.flowCodeInside = true);
  }
  function C() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.value = K.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), this.data.flowCodeInside = void 0;
  }
  function A() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.value = K.replace(/(\r?\n|\r)$/g, "");
  }
  function k(K) {
    const de = this.resume(), Ne = this.stack[this.stack.length - 1];
    Ne.label = de, Ne.identifier = di(this.sliceSerialize(K)).toLowerCase();
  }
  function T() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.title = K;
  }
  function Y() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.url = K;
  }
  function M(K) {
    const de = this.stack[this.stack.length - 1];
    if (!de.depth) {
      const Ne = this.sliceSerialize(K).length;
      de.depth = Ne;
    }
  }
  function B() {
    this.data.setextHeadingSlurpLineEnding = true;
  }
  function G(K) {
    const de = this.stack[this.stack.length - 1];
    de.depth = this.sliceSerialize(K).codePointAt(0) === 61 ? 1 : 2;
  }
  function J() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function U(K) {
    const Ne = this.stack[this.stack.length - 1].children;
    let be = Ne[Ne.length - 1];
    (!be || be.type !== "text") && (be = _t(), be.position = { start: Ul(K.start), end: void 0 }, Ne.push(be)), this.stack.push(be);
  }
  function X(K) {
    const de = this.stack.pop();
    de.value += this.sliceSerialize(K), de.position.end = Ul(K.end);
  }
  function ie(K) {
    const de = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const Ne = de.children[de.children.length - 1];
      Ne.position.end = Ul(K.end), this.data.atHardBreak = void 0;
      return;
    }
    !this.data.setextHeadingSlurpLineEnding && i.canContainEols.includes(de.type) && (U.call(this, K), X.call(this, K));
  }
  function re() {
    this.data.atHardBreak = true;
  }
  function j() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.value = K;
  }
  function D() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.value = K;
  }
  function H() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.value = K;
  }
  function V() {
    const K = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const de = this.data.referenceType || "shortcut";
      K.type += "Reference", K.referenceType = de, delete K.url, delete K.title;
    } else
      delete K.identifier, delete K.label;
    this.data.referenceType = void 0;
  }
  function $() {
    const K = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const de = this.data.referenceType || "shortcut";
      K.type += "Reference", K.referenceType = de, delete K.url, delete K.title;
    } else
      delete K.identifier, delete K.label;
    this.data.referenceType = void 0;
  }
  function F(K) {
    const de = this.sliceSerialize(K), Ne = this.stack[this.stack.length - 2];
    Ne.label = A6(de), Ne.identifier = di(de).toLowerCase();
  }
  function _() {
    const K = this.stack[this.stack.length - 1], de = this.resume(), Ne = this.stack[this.stack.length - 1];
    if (this.data.inReference = true, Ne.type === "link") {
      const be = K.children;
      Ne.children = be;
    } else
      Ne.alt = de;
  }
  function se() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.url = K;
  }
  function he() {
    const K = this.resume(), de = this.stack[this.stack.length - 1];
    de.title = K;
  }
  function R() {
    this.data.inReference = void 0;
  }
  function O() {
    this.data.referenceType = "collapsed";
  }
  function te(K) {
    const de = this.resume(), Ne = this.stack[this.stack.length - 1];
    Ne.label = de, Ne.identifier = di(this.sliceSerialize(K)).toLowerCase(), this.data.referenceType = "full";
  }
  function pe(K) {
    this.data.characterReferenceType = K.type;
  }
  function me(K) {
    const de = this.sliceSerialize(K), Ne = this.data.characterReferenceType;
    let be;
    Ne ? (be = lS(de, Ne === "characterReferenceMarkerNumeric" ? 10 : 16), this.data.characterReferenceType = void 0) : be = Up(de);
    const Ze = this.stack[this.stack.length - 1];
    Ze.value += be;
  }
  function ne(K) {
    const de = this.stack.pop();
    de.position.end = Ul(K.end);
  }
  function xe(K) {
    X.call(this, K);
    const de = this.stack[this.stack.length - 1];
    de.url = this.sliceSerialize(K);
  }
  function Se(K) {
    X.call(this, K);
    const de = this.stack[this.stack.length - 1];
    de.url = "mailto:" + this.sliceSerialize(K);
  }
  function fe() {
    return { type: "blockquote", children: [], position: void 0 };
  }
  function q() {
    return { type: "code", lang: null, meta: null, value: "", position: void 0 };
  }
  function we() {
    return { type: "inlineCode", value: "", position: void 0 };
  }
  function Ce() {
    return { type: "definition", identifier: "", label: null, title: null, url: "", position: void 0 };
  }
  function Te() {
    return { type: "emphasis", children: [], position: void 0 };
  }
  function Ae() {
    return { type: "heading", depth: 0, children: [], position: void 0 };
  }
  function Ee() {
    return { type: "break", position: void 0 };
  }
  function qe() {
    return { type: "html", value: "", position: void 0 };
  }
  function Le() {
    return { type: "image", title: null, url: "", alt: null, position: void 0 };
  }
  function pt() {
    return { type: "link", title: null, url: "", children: [], position: void 0 };
  }
  function vt(K) {
    return { type: "list", ordered: K.type === "listOrdered", start: null, spread: K._spread, children: [], position: void 0 };
  }
  function Lt(K) {
    return { type: "listItem", spread: K._spread, checked: null, children: [], position: void 0 };
  }
  function Zt() {
    return { type: "paragraph", children: [], position: void 0 };
  }
  function Ht() {
    return { type: "strong", children: [], position: void 0 };
  }
  function _t() {
    return { type: "text", value: "", position: void 0 };
  }
  function ce() {
    return { type: "thematicBreak", position: void 0 };
  }
}
function Ul(e12) {
  return { line: e12.line, column: e12.column, offset: e12.offset };
}
function xS(e12, i) {
  let l = -1;
  for (; ++l < i.length; ) {
    const a = i[l];
    Array.isArray(a) ? xS(e12, a) : O6(e12, a);
  }
}
function O6(e12, i) {
  let l;
  for (l in i)
    if (yS.call(i, l))
      switch (l) {
        case "canContainEols": {
          const a = i[l];
          a && e12[l].push(...a);
          break;
        }
        case "transforms": {
          const a = i[l];
          a && e12[l].push(...a);
          break;
        }
        case "afterExit":
        case "beforeEnter": {
          const a = i[l];
          a && e12[l].push(a);
          break;
        }
        case "enter":
        case "exit": {
          const a = i[l];
          a && Object.assign(e12[l], a);
          break;
        }
      }
}
function Pv(e12, i) {
  throw e12 ? new Error("Cannot close `" + e12.type + "` (" + eo({ start: e12.start, end: e12.end }) + "): a different token (`" + i.type + "`, " + eo({ start: i.start, end: i.end }) + ") is open") : new Error("Cannot close document, a token (`" + i.type + "`, " + eo({ start: i.start, end: i.end }) + ") is still open");
}
function R6(e12) {
  const i = this;
  i.parser = l;
  function l(a) {
    return j6(a, { ...i.data("settings"), ...e12, extensions: i.data("micromarkExtensions") || [], mdastExtensions: i.data("fromMarkdownExtensions") || [] });
  }
}
function L6(e12, i) {
  const l = { type: "element", tagName: "blockquote", properties: {}, children: e12.wrap(e12.all(i), true) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function H6(e12, i) {
  const l = { type: "element", tagName: "br", properties: {}, children: [] };
  return e12.patch(i, l), [e12.applyData(i, l), { type: "text", value: `
` }];
}
function B6(e12, i) {
  const l = i.value ? i.value + `
` : "", a = {}, o = i.lang ? i.lang.split(/\s+/) : [];
  o.length > 0 && (a.className = ["language-" + o[0]]);
  let s = { type: "element", tagName: "code", properties: a, children: [{ type: "text", value: l }] };
  return i.meta && (s.data = { meta: i.meta }), e12.patch(i, s), s = e12.applyData(i, s), s = { type: "element", tagName: "pre", properties: {}, children: [s] }, e12.patch(i, s), s;
}
function U6(e12, i) {
  const l = { type: "element", tagName: "del", properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function I6(e12, i) {
  const l = { type: "element", tagName: "em", properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function q6(e12, i) {
  const l = typeof e12.options.clobberPrefix == "string" ? e12.options.clobberPrefix : "user-content-", a = String(i.identifier).toUpperCase(), o = Qa(a.toLowerCase()), s = e12.footnoteOrder.indexOf(a);
  let c, d = e12.footnoteCounts.get(a);
  d === void 0 ? (d = 0, e12.footnoteOrder.push(a), c = e12.footnoteOrder.length) : c = s + 1, d += 1, e12.footnoteCounts.set(a, d);
  const m = { type: "element", tagName: "a", properties: { href: "#" + l + "fn-" + o, id: l + "fnref-" + o + (d > 1 ? "-" + d : ""), dataFootnoteRef: true, ariaDescribedBy: ["footnote-label"] }, children: [{ type: "text", value: String(c) }] };
  e12.patch(i, m);
  const g = { type: "element", tagName: "sup", properties: {}, children: [m] };
  return e12.patch(i, g), e12.applyData(i, g);
}
function V6(e12, i) {
  const l = { type: "element", tagName: "h" + i.depth, properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function Y6(e12, i) {
  if (e12.options.allowDangerousHtml) {
    const l = { type: "raw", value: i.value };
    return e12.patch(i, l), e12.applyData(i, l);
  }
}
function vS(e12, i) {
  const l = i.referenceType;
  let a = "]";
  if (l === "collapsed" ? a += "[]" : l === "full" && (a += "[" + (i.label || i.identifier) + "]"), i.type === "imageReference")
    return [{ type: "text", value: "![" + i.alt + a }];
  const o = e12.all(i), s = o[0];
  s && s.type === "text" ? s.value = "[" + s.value : o.unshift({ type: "text", value: "[" });
  const c = o[o.length - 1];
  return c && c.type === "text" ? c.value += a : o.push({ type: "text", value: a }), o;
}
function X6(e12, i) {
  const l = String(i.identifier).toUpperCase(), a = e12.definitionById.get(l);
  if (!a)
    return vS(e12, i);
  const o = { src: Qa(a.url || ""), alt: i.alt };
  a.title !== null && a.title !== void 0 && (o.title = a.title);
  const s = { type: "element", tagName: "img", properties: o, children: [] };
  return e12.patch(i, s), e12.applyData(i, s);
}
function G6(e12, i) {
  const l = { src: Qa(i.url) };
  i.alt !== null && i.alt !== void 0 && (l.alt = i.alt), i.title !== null && i.title !== void 0 && (l.title = i.title);
  const a = { type: "element", tagName: "img", properties: l, children: [] };
  return e12.patch(i, a), e12.applyData(i, a);
}
function $6(e12, i) {
  const l = { type: "text", value: i.value.replace(/\r?\n|\r/g, " ") };
  e12.patch(i, l);
  const a = { type: "element", tagName: "code", properties: {}, children: [l] };
  return e12.patch(i, a), e12.applyData(i, a);
}
function Q6(e12, i) {
  const l = String(i.identifier).toUpperCase(), a = e12.definitionById.get(l);
  if (!a)
    return vS(e12, i);
  const o = { href: Qa(a.url || "") };
  a.title !== null && a.title !== void 0 && (o.title = a.title);
  const s = { type: "element", tagName: "a", properties: o, children: e12.all(i) };
  return e12.patch(i, s), e12.applyData(i, s);
}
function Z6(e12, i) {
  const l = { href: Qa(i.url) };
  i.title !== null && i.title !== void 0 && (l.title = i.title);
  const a = { type: "element", tagName: "a", properties: l, children: e12.all(i) };
  return e12.patch(i, a), e12.applyData(i, a);
}
function F6(e12, i, l) {
  const a = e12.all(i), o = l ? K6(l) : bS(i), s = {}, c = [];
  if (typeof i.checked == "boolean") {
    const y = a[0];
    let p;
    y && y.type === "element" && y.tagName === "p" ? p = y : (p = { type: "element", tagName: "p", properties: {}, children: [] }, a.unshift(p)), p.children.length > 0 && p.children.unshift({ type: "text", value: " " }), p.children.unshift({ type: "element", tagName: "input", properties: { type: "checkbox", checked: i.checked, disabled: true }, children: [] }), s.className = ["task-list-item"];
  }
  let d = -1;
  for (; ++d < a.length; ) {
    const y = a[d];
    (o || d !== 0 || y.type !== "element" || y.tagName !== "p") && c.push({ type: "text", value: `
` }), y.type === "element" && y.tagName === "p" && !o ? c.push(...y.children) : c.push(y);
  }
  const m = a[a.length - 1];
  m && (o || m.type !== "element" || m.tagName !== "p") && c.push({ type: "text", value: `
` });
  const g = { type: "element", tagName: "li", properties: s, children: c };
  return e12.patch(i, g), e12.applyData(i, g);
}
function K6(e12) {
  let i = false;
  if (e12.type === "list") {
    i = e12.spread || false;
    const l = e12.children;
    let a = -1;
    for (; !i && ++a < l.length; )
      i = bS(l[a]);
  }
  return i;
}
function bS(e12) {
  const i = e12.spread;
  return i ?? e12.children.length > 1;
}
function P6(e12, i) {
  const l = {}, a = e12.all(i);
  let o = -1;
  for (typeof i.start == "number" && i.start !== 1 && (l.start = i.start); ++o < a.length; ) {
    const c = a[o];
    if (c.type === "element" && c.tagName === "li" && c.properties && Array.isArray(c.properties.className) && c.properties.className.includes("task-list-item")) {
      l.className = ["contains-task-list"];
      break;
    }
  }
  const s = { type: "element", tagName: i.ordered ? "ol" : "ul", properties: l, children: e12.wrap(a, true) };
  return e12.patch(i, s), e12.applyData(i, s);
}
function J6(e12, i) {
  const l = { type: "element", tagName: "p", properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function W6(e12, i) {
  const l = { type: "root", children: e12.wrap(e12.all(i)) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function eD(e12, i) {
  const l = { type: "element", tagName: "strong", properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function tD(e12, i) {
  const l = e12.all(i), a = l.shift(), o = [];
  if (a) {
    const c = { type: "element", tagName: "thead", properties: {}, children: e12.wrap([a], true) };
    e12.patch(i.children[0], c), o.push(c);
  }
  if (l.length > 0) {
    const c = { type: "element", tagName: "tbody", properties: {}, children: e12.wrap(l, true) }, d = Rp(i.children[1]), m = K2(i.children[i.children.length - 1]);
    d && m && (c.position = { start: d, end: m }), o.push(c);
  }
  const s = { type: "element", tagName: "table", properties: {}, children: e12.wrap(o, true) };
  return e12.patch(i, s), e12.applyData(i, s);
}
function nD(e12, i, l) {
  const a = l ? l.children : void 0, s = (a ? a.indexOf(i) : 1) === 0 ? "th" : "td", c = l && l.type === "table" ? l.align : void 0, d = c ? c.length : i.children.length;
  let m = -1;
  const g = [];
  for (; ++m < d; ) {
    const p = i.children[m], x = {}, v = c ? c[m] : void 0;
    v && (x.align = v);
    let S = { type: "element", tagName: s, properties: x, children: [] };
    p && (S.children = e12.all(p), e12.patch(p, S), S = e12.applyData(p, S)), g.push(S);
  }
  const y = { type: "element", tagName: "tr", properties: {}, children: e12.wrap(g, true) };
  return e12.patch(i, y), e12.applyData(i, y);
}
function iD(e12, i) {
  const l = { type: "element", tagName: "td", properties: {}, children: e12.all(i) };
  return e12.patch(i, l), e12.applyData(i, l);
}
const Jv = 9, Wv = 32;
function lD(e12) {
  const i = String(e12), l = /\r?\n|\r/g;
  let a = l.exec(i), o = 0;
  const s = [];
  for (; a; )
    s.push(eb(i.slice(o, a.index), o > 0, true), a[0]), o = a.index + a[0].length, a = l.exec(i);
  return s.push(eb(i.slice(o), o > 0, false)), s.join("");
}
function eb(e12, i, l) {
  let a = 0, o = e12.length;
  if (i) {
    let s = e12.codePointAt(a);
    for (; s === Jv || s === Wv; )
      a++, s = e12.codePointAt(a);
  }
  if (l) {
    let s = e12.codePointAt(o - 1);
    for (; s === Jv || s === Wv; )
      o--, s = e12.codePointAt(o - 1);
  }
  return o > a ? e12.slice(a, o) : "";
}
function rD(e12, i) {
  const l = { type: "text", value: lD(String(i.value)) };
  return e12.patch(i, l), e12.applyData(i, l);
}
function aD(e12, i) {
  const l = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e12.patch(i, l), e12.applyData(i, l);
}
const uD = { blockquote: L6, break: H6, code: B6, delete: U6, emphasis: I6, footnoteReference: q6, heading: V6, html: Y6, imageReference: X6, image: G6, inlineCode: $6, linkReference: Q6, link: Z6, listItem: F6, list: P6, paragraph: J6, root: W6, strong: eD, table: tD, tableCell: iD, tableRow: nD, text: rD, thematicBreak: aD, toml: oc, yaml: oc, definition: oc, footnoteDefinition: oc };
function oc() {
}
const wS = -1, af = 0, no = 1, Bc = 2, qp = 3, Vp = 4, Yp = 5, Xp = 6, SS = 7, ES = 8, { defineProperty: oD } = Object, CS = typeof self == "object" ? self : globalThis, tb = (e12, i) => {
  switch (e12) {
    case "Function":
    case "SharedWorker":
    case "Worker":
    case "eval":
    case "setInterval":
    case "setTimeout":
      throw new TypeError("unable to deserialize " + e12);
  }
  return new CS[e12](i);
}, sD = (e12, i) => {
  const l = (o, s) => (e12.set(s, o), o), a = (o) => {
    if (e12.has(o))
      return e12.get(o);
    const [s, c] = i[o];
    switch (s) {
      case af:
      case wS:
        return l(c, o);
      case no: {
        const d = l([], o);
        for (const m of c)
          d.push(a(m));
        return d;
      }
      case Bc: {
        const d = l({}, o);
        for (const [m, g] of c) {
          const y = a(m), p = a(g);
          y === "__proto__" ? oD(d, y, { value: p, configurable: true, enumerable: true, writable: true }) : d[y] = p;
        }
        return d;
      }
      case qp:
        return l(new Date(c), o);
      case Vp: {
        const { source: d, flags: m } = c;
        return l(new RegExp(d, m), o);
      }
      case Yp: {
        const d = l(/* @__PURE__ */ new Map(), o);
        for (const [m, g] of c)
          d.set(a(m), a(g));
        return d;
      }
      case Xp: {
        const d = l(/* @__PURE__ */ new Set(), o);
        for (const m of c)
          d.add(a(m));
        return d;
      }
      case SS: {
        const { name: d, message: m } = c;
        return l(typeof CS[d] == "function" ? tb(d, m) : new Error(m), o);
      }
      case ES:
        return l(BigInt(c), o);
      case "BigInt":
        return l(Object(BigInt(c)), o);
      case "ArrayBuffer":
        return l(new Uint8Array(c).buffer, c);
      case "DataView": {
        const { buffer: d } = new Uint8Array(c);
        return l(new DataView(d), c);
      }
      case "-0":
        return -0;
    }
    return l(tb(s, c), o);
  };
  return a;
}, nb = (e12) => sD(/* @__PURE__ */ new Map(), e12)(0), br = "", { toString: cD } = {}, { keys: fD, is: dD } = Object, $u = (e12) => {
  const i = typeof e12;
  if (i !== "object" || !e12)
    return [af, i];
  const l = cD.call(e12).slice(8, -1);
  switch (l) {
    case "Array":
      return [no, br];
    case "Object":
      return [Bc, br];
    case "Date":
      return [qp, br];
    case "RegExp":
      return [Vp, br];
    case "Map":
      return [Yp, br];
    case "Set":
      return [Xp, br];
    case "DataView":
      return [no, l];
  }
  return l.includes("Array") ? [no, l] : e12 instanceof Error ? [SS, e12.name || "Error"] : [Bc, l];
}, sc = ([e12, i]) => e12 === af && (i === "function" || i === "symbol"), hD = (e12, i, l, a) => {
  const o = (c, d) => {
    const m = a.push(c) - 1;
    return l.set(d, m), m;
  }, s = (c) => {
    if (l.has(c))
      return l.get(c);
    let [d, m] = $u(c);
    switch (d) {
      case af: {
        let y = c;
        switch (m) {
          case "bigint":
            d = ES, y = c.toString();
            break;
          case "number":
            if (!c && dD(c, -0))
              return a.push(["-0"]) - 1;
            break;
          case "function":
          case "symbol":
            if (e12)
              throw new TypeError("unable to serialize " + m);
            y = null;
            break;
          case "undefined":
            return o([wS], c);
        }
        return o([d, y], c);
      }
      case no: {
        if (m) {
          let x = c;
          return m === "DataView" ? x = new Uint8Array(c.buffer) : m === "ArrayBuffer" && (x = new Uint8Array(c)), o([m, [...x]], c);
        }
        const y = [], p = o([d, y], c);
        for (const x of c)
          y.push(s(x));
        return p;
      }
      case Bc: {
        if (m)
          switch (m) {
            case "BigInt":
              return o([m, c.toString()], c);
            case "Boolean":
            case "Number":
            case "String":
              return o([m, c.valueOf()], c);
          }
        if (i && "toJSON" in c)
          return s(c.toJSON());
        const y = [], p = o([d, y], c);
        for (const x of fD(c))
          (e12 || !sc($u(c[x]))) && y.push([s(x), s(c[x])]);
        return p;
      }
      case qp:
        return o([d, isNaN(c.getTime()) ? br : c.toISOString()], c);
      case Vp: {
        const { source: y, flags: p } = c;
        return o([d, { source: y, flags: p }], c);
      }
      case Yp: {
        const y = [], p = o([d, y], c);
        for (const [x, v] of c)
          (e12 || !(sc($u(x)) || sc($u(v)))) && y.push([s(x), s(v)]);
        return p;
      }
      case Xp: {
        const y = [], p = o([d, y], c);
        for (const x of c)
          (e12 || !sc($u(x))) && y.push(s(x));
        return p;
      }
    }
    const { message: g } = c;
    return o([d, { name: m, message: g }], c);
  };
  return s;
}, ib = (e12, { json: i, lossy: l } = {}) => {
  const a = [];
  return hD(!(i || l), !!i, /* @__PURE__ */ new Map(), a)(e12), a;
}, Uc = typeof structuredClone == "function" ? (e12, i) => i && ("json" in i || "lossy" in i) ? nb(ib(e12, i)) : structuredClone(e12) : (e12, i) => nb(ib(e12, i));
function mD(e12, i) {
  const l = [{ type: "text", value: "↩" }];
  return i > 1 && l.push({ type: "element", tagName: "sup", properties: {}, children: [{ type: "text", value: String(i) }] }), l;
}
function pD(e12, i) {
  return "Back to reference " + (e12 + 1) + (i > 1 ? "-" + i : "");
}
function gD(e12) {
  const i = typeof e12.options.clobberPrefix == "string" ? e12.options.clobberPrefix : "user-content-", l = e12.options.footnoteBackContent || mD, a = e12.options.footnoteBackLabel || pD, o = e12.options.footnoteLabel || "Footnotes", s = e12.options.footnoteLabelTagName || "h2", c = e12.options.footnoteLabelProperties || { className: ["sr-only"] }, d = [];
  let m = -1;
  for (; ++m < e12.footnoteOrder.length; ) {
    const g = e12.footnoteById.get(e12.footnoteOrder[m]);
    if (!g)
      continue;
    const y = e12.all(g), p = String(g.identifier).toUpperCase(), x = Qa(p.toLowerCase());
    let v = 0;
    const S = [], E = e12.footnoteCounts.get(p);
    for (; E !== void 0 && ++v <= E; ) {
      S.length > 0 && S.push({ type: "text", value: " " });
      let A = typeof l == "string" ? l : l(m, v);
      typeof A == "string" && (A = { type: "text", value: A }), S.push({ type: "element", tagName: "a", properties: { href: "#" + i + "fnref-" + x + (v > 1 ? "-" + v : ""), dataFootnoteBackref: "", ariaLabel: typeof a == "string" ? a : a(m, v), className: ["data-footnote-backref"] }, children: Array.isArray(A) ? A : [A] });
    }
    const N = y[y.length - 1];
    if (N && N.type === "element" && N.tagName === "p") {
      const A = N.children[N.children.length - 1];
      A && A.type === "text" ? A.value += " " : N.children.push({ type: "text", value: " " }), N.children.push(...S);
    } else
      y.push(...S);
    const C = { type: "element", tagName: "li", properties: { id: i + "fn-" + x }, children: e12.wrap(y, true) };
    e12.patch(g, C), d.push(C);
  }
  if (d.length !== 0)
    return { type: "element", tagName: "section", properties: { dataFootnotes: true, className: ["footnotes"] }, children: [{ type: "element", tagName: s, properties: { ...Uc(c), id: "footnote-label" }, children: [{ type: "text", value: o }] }, { type: "text", value: `
` }, { type: "element", tagName: "ol", properties: {}, children: e12.wrap(d, true) }, { type: "text", value: `
` }] };
}
const uf = (function(e12) {
  if (e12 == null)
    return bD;
  if (typeof e12 == "function")
    return of(e12);
  if (typeof e12 == "object")
    return Array.isArray(e12) ? yD(e12) : xD(e12);
  if (typeof e12 == "string")
    return vD(e12);
  throw new Error("Expected function, string, or object as test");
});
function yD(e12) {
  const i = [];
  let l = -1;
  for (; ++l < e12.length; )
    i[l] = uf(e12[l]);
  return of(a);
  function a(...o) {
    let s = -1;
    for (; ++s < i.length; )
      if (i[s].apply(this, o))
        return true;
    return false;
  }
}
function xD(e12) {
  const i = e12;
  return of(l);
  function l(a) {
    const o = a;
    let s;
    for (s in e12)
      if (o[s] !== i[s])
        return false;
    return true;
  }
}
function vD(e12) {
  return of(i);
  function i(l) {
    return l && l.type === e12;
  }
}
function of(e12) {
  return i;
  function i(l, a, o) {
    return !!(wD(l) && e12.call(this, l, typeof a == "number" ? a : void 0, o || void 0));
  }
}
function bD() {
  return true;
}
function wD(e12) {
  return e12 !== null && typeof e12 == "object" && "type" in e12;
}
const kS = [], SD = true, io = false, tp = "skip";
function np(e12, i, l, a) {
  if (!e12 || typeof e12 != "object")
    throw new Error("Unexpected value `" + e12 + "` for `tree`, expected node");
  let o = true, s, c, d, m;
  if (typeof l == "function" || l && typeof l == "object" ? (s = i, c = l, a && (o = false)) : (c = i, l && (o = false)), typeof c == "function")
    d = c;
  else if (c && typeof c == "object") {
    if (!(c.enter === null || c.enter === void 0))
      if (typeof c.enter == "function")
        d = c.enter;
      else
        throw new Error("Unexpected value `" + c.enter + "` for `visitors.enter`, expected optional visitor");
    if (typeof c.exit == "function")
      m = c.exit;
    else
      throw new Error("Unexpected value `" + c.exit + "` for `visitors.exit`, expected visitor (pass a visitor directly if you only want an enter visitor)");
  } else
    throw new Error("Unexpected value `" + c + "` for `enter` or `visitors`, expected visitor or object with visitors");
  const g = uf(s), y = o ? 1 : -1;
  p(e12, void 0, [])();
  function p(x, v, S) {
    const E = x && typeof x == "object" ? x : {};
    if (typeof E.type == "string") {
      const C = typeof E.tagName == "string" ? E.tagName : typeof E.name == "string" ? E.name : void 0;
      Object.defineProperty(N, "name", { value: "node (" + (x.type + (C ? "<" + C + ">" : "")) + ")" });
    }
    return N;
    function N() {
      const C = !s || g(x, v, S[S.length - 1] || void 0);
      let A = kS;
      if (d && C && (A = lb(d(x, S, v)), A[0] === io))
        return A;
      if ("children" in x && x.children) {
        const k = x;
        if (k.children && A[0] !== tp) {
          let T = (o ? -1 : k.children.length) + y;
          const Y = [...S, k];
          for (; T > -1 && T < k.children.length; ) {
            const M = k.children[T], B = p(M, T, Y)();
            if (B[0] === io)
              return B;
            T = typeof B[1] == "number" ? B[1] : T + y;
          }
        }
      }
      if (m && C) {
        const k = lb(m(x, S, v));
        if (k[0] === tp)
          throw new Error("Unexpected value `" + k[0] + "` from `exit`, expected `CONTINUE`, `EXIT`, index, or nothing");
        if (k[0] === io || typeof k[1] == "number")
          return k;
      }
      return A;
    }
  }
}
function lb(e12) {
  return Array.isArray(e12) ? e12 : typeof e12 == "number" ? [SD, e12] : e12 == null ? kS : [e12];
}
function sf(e12, i, l, a) {
  let o, s, c;
  s = i, c = l, typeof s == "function" ? np(e12, o, ip(s), c) : np(e12, o, ED(s), c);
}
function ED(e12) {
  return !e12 || typeof e12 != "object" ? e12 : { enter: typeof e12.enter == "function" ? ip(e12.enter) : e12.enter, exit: typeof e12.exit == "function" ? ip(e12.exit) : e12.exit };
}
function ip(e12) {
  return i;
  function i(l, a, o) {
    return e12(l, o, a[a.length - 1]);
  }
}
const lp = {}.hasOwnProperty, CD = {};
function kD(e12, i) {
  const l = i || CD, a = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = { ...uD, ...l.handlers }, d = { all: g, applyData: _D, definitionById: a, footnoteById: o, footnoteCounts: s, footnoteOrder: [], handlers: c, one: m, options: l, patch: ND, wrap: TD };
  return sf(e12, function(y) {
    if (y.type === "definition" || y.type === "footnoteDefinition") {
      const p = y.type === "definition" ? a : o, x = String(y.identifier).toUpperCase();
      p.has(x) || p.set(x, y);
    }
  }), d;
  function m(y, p) {
    const x = y.type, v = d.handlers[x];
    if (lp.call(d.handlers, x) && v)
      return v(d, y, p);
    if (d.options.passThrough && d.options.passThrough.includes(x)) {
      if ("children" in y) {
        const { children: E, ...N } = y, C = Uc(N);
        return C.children = d.all(y), C;
      }
      return Uc(y);
    }
    return (d.options.unknownHandler || zD)(d, y, p);
  }
  function g(y) {
    const p = [];
    if ("children" in y) {
      const x = y.children;
      let v = -1;
      for (; ++v < x.length; ) {
        const S = d.one(x[v], y);
        if (S) {
          if (v && x[v - 1].type === "break" && (!Array.isArray(S) && S.type === "text" && (S.value = rb(S.value)), !Array.isArray(S) && S.type === "element")) {
            const E = S.children[0];
            E && E.type === "text" && (E.value = rb(E.value));
          }
          Array.isArray(S) ? p.push(...S) : p.push(S);
        }
      }
    }
    return p;
  }
}
function ND(e12, i) {
  e12.position && (i.position = p5(e12));
}
function _D(e12, i) {
  let l = i;
  if (e12 && e12.data) {
    const a = e12.data.hName, o = e12.data.hChildren, s = e12.data.hProperties;
    if (typeof a == "string")
      if (l.type === "element")
        l.tagName = a;
      else {
        const c = "children" in l ? l.children : [l];
        l = { type: "element", tagName: a, properties: {}, children: c };
      }
    l.type === "element" && s && Object.assign(l.properties, Uc(s)), "children" in l && l.children && o !== null && o !== void 0 && (l.children = o);
  }
  return l;
}
function zD(e12, i) {
  const l = i.data || {}, a = "value" in i && !(lp.call(l, "hProperties") || lp.call(l, "hChildren")) ? { type: "text", value: i.value } : { type: "element", tagName: "div", properties: {}, children: e12.all(i) };
  return e12.patch(i, a), e12.applyData(i, a);
}
function TD(e12, i) {
  const l = [];
  let a = -1;
  for (i && l.push({ type: "text", value: `
` }); ++a < e12.length; )
    a && l.push({ type: "text", value: `
` }), l.push(e12[a]);
  return i && e12.length > 0 && l.push({ type: "text", value: `
` }), l;
}
function rb(e12) {
  let i = 0, l = e12.charCodeAt(i);
  for (; l === 9 || l === 32; )
    i++, l = e12.charCodeAt(i);
  return e12.slice(i);
}
function ab(e12, i) {
  const l = kD(e12, i), a = l.one(e12, void 0), o = gD(l), s = Array.isArray(a) ? { type: "root", children: a } : a || { type: "root", children: [] };
  return o && s.children.push({ type: "text", value: `
` }, o), s;
}
function AD(e12, i) {
  return e12 && "run" in e12 ? async function(l, a) {
    const o = ab(l, { file: a, ...i });
    await e12.run(o, a);
  } : function(l, a) {
    return ab(l, { file: a, ...e12 || i });
  };
}
function ub(e12) {
  if (e12)
    throw e12;
}
var fm, ob;
function MD() {
  if (ob)
    return fm;
  ob = 1;
  var e12 = Object.prototype.hasOwnProperty, i = Object.prototype.toString, l = Object.defineProperty, a = Object.getOwnPropertyDescriptor, o = function(g) {
    return typeof Array.isArray == "function" ? Array.isArray(g) : i.call(g) === "[object Array]";
  }, s = function(g) {
    if (!g || i.call(g) !== "[object Object]")
      return false;
    var y = e12.call(g, "constructor"), p = g.constructor && g.constructor.prototype && e12.call(g.constructor.prototype, "isPrototypeOf");
    if (g.constructor && !y && !p)
      return false;
    var x;
    for (x in g)
      ;
    return typeof x > "u" || e12.call(g, x);
  }, c = function(g, y) {
    l && y.name === "__proto__" ? l(g, y.name, { enumerable: true, configurable: true, value: y.newValue, writable: true }) : g[y.name] = y.newValue;
  }, d = function(g, y) {
    if (y === "__proto__")
      if (e12.call(g, y)) {
        if (a)
          return a(g, y).value;
      } else
        return;
    return g[y];
  };
  return fm = function m() {
    var g, y, p, x, v, S, E = arguments[0], N = 1, C = arguments.length, A = false;
    for (typeof E == "boolean" && (A = E, E = arguments[1] || {}, N = 2), (E == null || typeof E != "object" && typeof E != "function") && (E = {}); N < C; ++N)
      if (g = arguments[N], g != null)
        for (y in g)
          p = d(E, y), x = d(g, y), E !== x && (A && x && (s(x) || (v = o(x))) ? (v ? (v = false, S = p && o(p) ? p : []) : S = p && s(p) ? p : {}, c(E, { name: y, newValue: m(A, S, x) })) : typeof x < "u" && c(E, { name: y, newValue: x }));
    return E;
  }, fm;
}
var jD = MD();
const dm = qc(jD);
function rp(e12) {
  if (typeof e12 != "object" || e12 === null)
    return false;
  const i = Object.getPrototypeOf(e12);
  return (i === null || i === Object.prototype || Object.getPrototypeOf(i) === null) && !(Symbol.toStringTag in e12) && !(Symbol.iterator in e12);
}
function DD() {
  const e12 = [], i = { run: l, use: a };
  return i;
  function l(...o) {
    let s = -1;
    const c = o.pop();
    if (typeof c != "function")
      throw new TypeError("Expected function as last argument, not " + c);
    d(null, ...o);
    function d(m, ...g) {
      const y = e12[++s];
      let p = -1;
      if (m) {
        c(m);
        return;
      }
      for (; ++p < o.length; )
        (g[p] === null || g[p] === void 0) && (g[p] = o[p]);
      o = g, y ? OD(y, d)(...g) : c(null, ...g);
    }
  }
  function a(o) {
    if (typeof o != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + o);
    return e12.push(o), i;
  }
}
function OD(e12, i) {
  let l;
  return a;
  function a(...c) {
    const d = e12.length > c.length;
    let m;
    d && c.push(o);
    try {
      m = e12.apply(this, c);
    } catch (g) {
      const y = g;
      if (d && l)
        throw y;
      return o(y);
    }
    d || (m && m.then && typeof m.then == "function" ? m.then(s, o) : m instanceof Error ? o(m) : s(m));
  }
  function o(c, ...d) {
    l || (l = true, i(c, ...d));
  }
  function s(c) {
    o(null, c);
  }
}
const zi = { basename: RD, dirname: LD, extname: HD, join: BD, sep: "/" };
function RD(e12, i) {
  if (i !== void 0 && typeof i != "string")
    throw new TypeError('"ext" argument must be a string');
  _o(e12);
  let l = 0, a = -1, o = e12.length, s;
  if (i === void 0 || i.length === 0 || i.length > e12.length) {
    for (; o--; )
      if (e12.codePointAt(o) === 47) {
        if (s) {
          l = o + 1;
          break;
        }
      } else
        a < 0 && (s = true, a = o + 1);
    return a < 0 ? "" : e12.slice(l, a);
  }
  if (i === e12)
    return "";
  let c = -1, d = i.length - 1;
  for (; o--; )
    if (e12.codePointAt(o) === 47) {
      if (s) {
        l = o + 1;
        break;
      }
    } else
      c < 0 && (s = true, c = o + 1), d > -1 && (e12.codePointAt(o) === i.codePointAt(d--) ? d < 0 && (a = o) : (d = -1, a = c));
  return l === a ? a = c : a < 0 && (a = e12.length), e12.slice(l, a);
}
function LD(e12) {
  if (_o(e12), e12.length === 0)
    return ".";
  let i = -1, l = e12.length, a;
  for (; --l; )
    if (e12.codePointAt(l) === 47) {
      if (a) {
        i = l;
        break;
      }
    } else
      a || (a = true);
  return i < 0 ? e12.codePointAt(0) === 47 ? "/" : "." : i === 1 && e12.codePointAt(0) === 47 ? "//" : e12.slice(0, i);
}
function HD(e12) {
  _o(e12);
  let i = e12.length, l = -1, a = 0, o = -1, s = 0, c;
  for (; i--; ) {
    const d = e12.codePointAt(i);
    if (d === 47) {
      if (c) {
        a = i + 1;
        break;
      }
      continue;
    }
    l < 0 && (c = true, l = i + 1), d === 46 ? o < 0 ? o = i : s !== 1 && (s = 1) : o > -1 && (s = -1);
  }
  return o < 0 || l < 0 || s === 0 || s === 1 && o === l - 1 && o === a + 1 ? "" : e12.slice(o, l);
}
function BD(...e12) {
  let i = -1, l;
  for (; ++i < e12.length; )
    _o(e12[i]), e12[i] && (l = l === void 0 ? e12[i] : l + "/" + e12[i]);
  return l === void 0 ? "." : UD(l);
}
function UD(e12) {
  _o(e12);
  const i = e12.codePointAt(0) === 47;
  let l = ID(e12, !i);
  return l.length === 0 && !i && (l = "."), l.length > 0 && e12.codePointAt(e12.length - 1) === 47 && (l += "/"), i ? "/" + l : l;
}
function ID(e12, i) {
  let l = "", a = 0, o = -1, s = 0, c = -1, d, m;
  for (; ++c <= e12.length; ) {
    if (c < e12.length)
      d = e12.codePointAt(c);
    else {
      if (d === 47)
        break;
      d = 47;
    }
    if (d === 47) {
      if (!(o === c - 1 || s === 1))
        if (o !== c - 1 && s === 2) {
          if (l.length < 2 || a !== 2 || l.codePointAt(l.length - 1) !== 46 || l.codePointAt(l.length - 2) !== 46) {
            if (l.length > 2) {
              if (m = l.lastIndexOf("/"), m !== l.length - 1) {
                m < 0 ? (l = "", a = 0) : (l = l.slice(0, m), a = l.length - 1 - l.lastIndexOf("/")), o = c, s = 0;
                continue;
              }
            } else if (l.length > 0) {
              l = "", a = 0, o = c, s = 0;
              continue;
            }
          }
          i && (l = l.length > 0 ? l + "/.." : "..", a = 2);
        } else
          l.length > 0 ? l += "/" + e12.slice(o + 1, c) : l = e12.slice(o + 1, c), a = c - o - 1;
      o = c, s = 0;
    } else
      d === 46 && s > -1 ? s++ : s = -1;
  }
  return l;
}
function _o(e12) {
  if (typeof e12 != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e12));
}
const qD = { cwd: VD };
function VD() {
  return "/";
}
function ap(e12) {
  return !!(e12 !== null && typeof e12 == "object" && "href" in e12 && e12.href && "protocol" in e12 && e12.protocol && e12.auth === void 0);
}
function YD(e12) {
  if (typeof e12 == "string")
    e12 = new URL(e12);
  else if (!ap(e12)) {
    const i = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + e12 + "`");
    throw i.code = "ERR_INVALID_ARG_TYPE", i;
  }
  if (e12.protocol !== "file:") {
    const i = new TypeError("The URL must be of scheme file");
    throw i.code = "ERR_INVALID_URL_SCHEME", i;
  }
  return XD(e12);
}
function XD(e12) {
  if (e12.hostname !== "") {
    const a = new TypeError('File URL host must be "localhost" or empty on darwin');
    throw a.code = "ERR_INVALID_FILE_URL_HOST", a;
  }
  const i = e12.pathname;
  let l = -1;
  for (; ++l < i.length; )
    if (i.codePointAt(l) === 37 && i.codePointAt(l + 1) === 50) {
      const a = i.codePointAt(l + 2);
      if (a === 70 || a === 102) {
        const o = new TypeError("File URL path must not include encoded / characters");
        throw o.code = "ERR_INVALID_FILE_URL_PATH", o;
      }
    }
  return decodeURIComponent(i);
}
const hm = ["history", "path", "basename", "stem", "extname", "dirname"];
class NS {
  constructor(i) {
    let l;
    i ? ap(i) ? l = { path: i } : typeof i == "string" || GD(i) ? l = { value: i } : l = i : l = {}, this.cwd = "cwd" in l ? "" : qD.cwd(), this.data = {}, this.history = [], this.messages = [], this.value, this.map, this.result, this.stored;
    let a = -1;
    for (; ++a < hm.length; ) {
      const s = hm[a];
      s in l && l[s] !== void 0 && l[s] !== null && (this[s] = s === "history" ? [...l[s]] : l[s]);
    }
    let o;
    for (o in l)
      hm.includes(o) || (this[o] = l[o]);
  }
  get basename() {
    return typeof this.path == "string" ? zi.basename(this.path) : void 0;
  }
  set basename(i) {
    pm(i, "basename"), mm(i, "basename"), this.path = zi.join(this.dirname || "", i);
  }
  get dirname() {
    return typeof this.path == "string" ? zi.dirname(this.path) : void 0;
  }
  set dirname(i) {
    sb(this.basename, "dirname"), this.path = zi.join(i || "", this.basename);
  }
  get extname() {
    return typeof this.path == "string" ? zi.extname(this.path) : void 0;
  }
  set extname(i) {
    if (mm(i, "extname"), sb(this.dirname, "extname"), i) {
      if (i.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (i.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = zi.join(this.dirname, this.stem + (i || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(i) {
    ap(i) && (i = YD(i)), pm(i, "path"), this.path !== i && this.history.push(i);
  }
  get stem() {
    return typeof this.path == "string" ? zi.basename(this.path, this.extname) : void 0;
  }
  set stem(i) {
    pm(i, "stem"), mm(i, "stem"), this.path = zi.join(this.dirname || "", i + (this.extname || ""));
  }
  fail(i, l, a) {
    const o = this.message(i, l, a);
    throw o.fatal = true, o;
  }
  info(i, l, a) {
    const o = this.message(i, l, a);
    return o.fatal = void 0, o;
  }
  message(i, l, a) {
    const o = new nf(i, l, a);
    return this.path && (o.name = this.path + ":" + o.name, o.file = this.path), o.fatal = false, this.messages.push(o), o;
  }
  toString(i) {
    return this.value === void 0 ? "" : typeof this.value == "string" ? this.value : new TextDecoder(i || void 0).decode(this.value);
  }
}
function mm(e12, i) {
  if (e12 && e12.includes(zi.sep))
    throw new Error("`" + i + "` cannot be a path: did not expect `" + zi.sep + "`");
}
function pm(e12, i) {
  if (!e12)
    throw new Error("`" + i + "` cannot be empty");
}
function sb(e12, i) {
  if (!e12)
    throw new Error("Setting `" + i + "` requires `path` to be set too");
}
function GD(e12) {
  return !!(e12 && typeof e12 == "object" && "byteLength" in e12 && "byteOffset" in e12);
}
const $D = (function(e12) {
  const a = this.constructor.prototype, o = a[e12], s = function() {
    return o.apply(s, arguments);
  };
  return Object.setPrototypeOf(s, a), s;
}), QD = {}.hasOwnProperty;
class Gp extends $D {
  constructor() {
    super("copy"), this.Compiler = void 0, this.Parser = void 0, this.attachers = [], this.compiler = void 0, this.freezeIndex = -1, this.frozen = void 0, this.namespace = {}, this.parser = void 0, this.transformers = DD();
  }
  copy() {
    const i = new Gp();
    let l = -1;
    for (; ++l < this.attachers.length; ) {
      const a = this.attachers[l];
      i.use(...a);
    }
    return i.data(dm(true, {}, this.namespace)), i;
  }
  data(i, l) {
    return typeof i == "string" ? arguments.length === 2 ? (xm("data", this.frozen), this.namespace[i] = l, this) : QD.call(this.namespace, i) && this.namespace[i] || void 0 : i ? (xm("data", this.frozen), this.namespace = i, this) : this.namespace;
  }
  freeze() {
    if (this.frozen)
      return this;
    const i = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [l, ...a] = this.attachers[this.freezeIndex];
      if (a[0] === false)
        continue;
      a[0] === true && (a[0] = void 0);
      const o = l.call(i, ...a);
      typeof o == "function" && this.transformers.use(o);
    }
    return this.frozen = true, this.freezeIndex = Number.POSITIVE_INFINITY, this;
  }
  parse(i) {
    this.freeze();
    const l = cc(i), a = this.parser || this.Parser;
    return gm("parse", a), a(String(l), l);
  }
  process(i, l) {
    const a = this;
    return this.freeze(), gm("process", this.parser || this.Parser), ym("process", this.compiler || this.Compiler), l ? o(void 0, l) : new Promise(o);
    function o(s, c) {
      const d = cc(i), m = a.parse(d);
      a.run(m, d, function(y, p, x) {
        if (y || !p || !x)
          return g(y);
        const v = p, S = a.stringify(v, x);
        KD(S) ? x.value = S : x.result = S, g(y, x);
      });
      function g(y, p) {
        y || !p ? c(y) : s ? s(p) : l(void 0, p);
      }
    }
  }
  processSync(i) {
    let l = false, a;
    return this.freeze(), gm("processSync", this.parser || this.Parser), ym("processSync", this.compiler || this.Compiler), this.process(i, o), fb("processSync", "process", l), a;
    function o(s, c) {
      l = true, ub(s), a = c;
    }
  }
  run(i, l, a) {
    cb(i), this.freeze();
    const o = this.transformers;
    return !a && typeof l == "function" && (a = l, l = void 0), a ? s(void 0, a) : new Promise(s);
    function s(c, d) {
      const m = cc(l);
      o.run(i, m, g);
      function g(y, p, x) {
        const v = p || i;
        y ? d(y) : c ? c(v) : a(void 0, v, x);
      }
    }
  }
  runSync(i, l) {
    let a = false, o;
    return this.run(i, l, s), fb("runSync", "run", a), o;
    function s(c, d) {
      ub(c), o = d, a = true;
    }
  }
  stringify(i, l) {
    this.freeze();
    const a = cc(l), o = this.compiler || this.Compiler;
    return ym("stringify", o), cb(i), o(i, a);
  }
  use(i, ...l) {
    const a = this.attachers, o = this.namespace;
    if (xm("use", this.frozen), i != null)
      if (typeof i == "function")
        m(i, l);
      else if (typeof i == "object")
        Array.isArray(i) ? d(i) : c(i);
      else
        throw new TypeError("Expected usable value, not `" + i + "`");
    return this;
    function s(g) {
      if (typeof g == "function")
        m(g, []);
      else if (typeof g == "object")
        if (Array.isArray(g)) {
          const [y, ...p] = g;
          m(y, p);
        } else
          c(g);
      else
        throw new TypeError("Expected usable value, not `" + g + "`");
    }
    function c(g) {
      if (!("plugins" in g) && !("settings" in g))
        throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
      d(g.plugins), g.settings && (o.settings = dm(true, o.settings, g.settings));
    }
    function d(g) {
      let y = -1;
      if (g != null)
        if (Array.isArray(g))
          for (; ++y < g.length; ) {
            const p = g[y];
            s(p);
          }
        else
          throw new TypeError("Expected a list of plugins, not `" + g + "`");
    }
    function m(g, y) {
      let p = -1, x = -1;
      for (; ++p < a.length; )
        if (a[p][0] === g) {
          x = p;
          break;
        }
      if (x === -1)
        a.push([g, ...y]);
      else if (y.length > 0) {
        let [v, ...S] = y;
        const E = a[x][1];
        rp(E) && rp(v) && (v = dm(true, E, v)), a[x] = [g, v, ...S];
      }
    }
  }
}
const ZD = new Gp().freeze();
function gm(e12, i) {
  if (typeof i != "function")
    throw new TypeError("Cannot `" + e12 + "` without `parser`");
}
function ym(e12, i) {
  if (typeof i != "function")
    throw new TypeError("Cannot `" + e12 + "` without `compiler`");
}
function xm(e12, i) {
  if (i)
    throw new Error("Cannot call `" + e12 + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
}
function cb(e12) {
  if (!rp(e12) || typeof e12.type != "string")
    throw new TypeError("Expected node, got `" + e12 + "`");
}
function fb(e12, i, l) {
  if (!l)
    throw new Error("`" + e12 + "` finished async. Use `" + i + "` instead");
}
function cc(e12) {
  return FD(e12) ? e12 : new NS(e12);
}
function FD(e12) {
  return !!(e12 && typeof e12 == "object" && "message" in e12 && "messages" in e12);
}
function KD(e12) {
  return typeof e12 == "string" || PD(e12);
}
function PD(e12) {
  return !!(e12 && typeof e12 == "object" && "byteLength" in e12 && "byteOffset" in e12);
}
const JD = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md", db = [], hb = { allowDangerousHtml: true }, WD = /^(https?|ircs?|mailto|xmpp)$/i, eO = [{ from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "allowNode", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowElement" }, { from: "allowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "allowedElements" }, { from: "className", id: "remove-classname" }, { from: "disallowedTypes", id: "replace-allownode-allowedtypes-and-disallowedtypes", to: "disallowedElements" }, { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" }, { from: "includeElementIndex", id: "#remove-includeelementindex" }, { from: "includeNodeIndex", id: "change-includenodeindex-to-includeelementindex" }, { from: "linkTarget", id: "remove-linktarget" }, { from: "plugins", id: "change-plugins-to-remarkplugins", to: "remarkPlugins" }, { from: "rawSourcePos", id: "#remove-rawsourcepos" }, { from: "renderers", id: "change-renderers-to-components", to: "components" }, { from: "source", id: "change-source-to-children", to: "children" }, { from: "sourcePos", id: "#remove-sourcepos" }, { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" }, { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" }];
function tO(e12) {
  const i = nO(e12), l = iO(e12);
  return lO(i.runSync(i.parse(l), l), e12);
}
function nO(e12) {
  const i = e12.rehypePlugins || db, l = e12.remarkPlugins || db, a = e12.remarkRehypeOptions ? { ...e12.remarkRehypeOptions, ...hb } : hb;
  return ZD().use(R6).use(l).use(AD, a).use(i);
}
function iO(e12) {
  const i = e12.children || "", l = new NS();
  return typeof i == "string" && (l.value = i), l;
}
function lO(e12, i) {
  const l = i.allowedElements, a = i.allowElement, o = i.components, s = i.disallowedElements, c = i.skipHtml, d = i.unwrapDisallowed, m = i.urlTransform || rO;
  for (const y of eO)
    Object.hasOwn(i, y.from) && ("" + y.from + (y.to ? "use `" + y.to + "` instead" : "remove it") + JD + y.id, void 0);
  return sf(e12, g), w5(e12, { Fragment: b.Fragment, components: o, ignoreInvalidStyle: true, jsx: b.jsx, jsxs: b.jsxs, passKeys: true, passNode: true });
  function g(y, p, x) {
    if (y.type === "raw" && x && typeof p == "number")
      return c ? x.children.splice(p, 1) : x.children[p] = { type: "text", value: y.value }, p;
    if (y.type === "element") {
      let v;
      for (v in om)
        if (Object.hasOwn(om, v) && Object.hasOwn(y.properties, v)) {
          const S = y.properties[v], E = om[v];
          (E === null || E.includes(y.tagName)) && (y.properties[v] = m(String(S || ""), v, y));
        }
    }
    if (y.type === "element") {
      let v = l ? !l.includes(y.tagName) : s ? s.includes(y.tagName) : false;
      if (!v && a && typeof p == "number" && (v = !a(y, p, x)), v && x && typeof p == "number")
        return d && y.children ? x.children.splice(p, 1, ...y.children) : x.children.splice(p, 1), p;
    }
  }
}
function rO(e12) {
  const i = e12.indexOf(":"), l = e12.indexOf("?"), a = e12.indexOf("#"), o = e12.indexOf("/");
  return i === -1 || o !== -1 && i > o || l !== -1 && i > l || a !== -1 && i > a || WD.test(e12.slice(0, i)) ? e12 : "";
}
function mb(e12, i) {
  const l = String(e12);
  if (typeof i != "string")
    throw new TypeError("Expected character");
  let a = 0, o = l.indexOf(i);
  for (; o !== -1; )
    a++, o = l.indexOf(i, o + i.length);
  return a;
}
function aO(e12) {
  if (typeof e12 != "string")
    throw new TypeError("Expected a string");
  return e12.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function uO(e12, i, l) {
  const o = uf((l || {}).ignore || []), s = oO(i);
  let c = -1;
  for (; ++c < s.length; )
    np(e12, d);
  function d(g, y, p) {
    if (g.type === "text" && typeof p == "number")
      return m(g, y, p);
    if (o(g, p, y[y.length - 1]))
      return tp;
  }
  function m(g, y, p) {
    const x = y[y.length - 1], v = s[c][0], S = s[c][1];
    let E = 0, N = false, C = [];
    v.lastIndex = 0;
    let A = v.exec(g.value);
    for (; A; ) {
      const T = A.index, Y = { index: A.index, input: A.input, stack: [...y, g] };
      let M = S(...A, Y);
      if (typeof M == "string" && (M = M.length > 0 ? { type: "text", value: M } : void 0), M === false)
        v.lastIndex = T + 1;
      else {
        if (E !== T && k({ type: "text", value: g.value.slice(E, T) }), Array.isArray(M))
          for (const B of M)
            k(B);
        else
          M && k(M);
        E = T + A[0].length, N = true;
      }
      if (!v.global)
        break;
      A = v.exec(g.value);
    }
    return N ? (E < g.value.length && k({ type: "text", value: g.value.slice(E) }), x.children.splice(p, 1, ...C)) : C = [g], p + C.length;
    function k(T) {
      const Y = C[C.length - 1];
      Y && Y.type === "text" && T.type === "text" ? Y.value += T.value : C.push(T);
    }
  }
}
function oO(e12) {
  if (!Array.isArray(e12))
    throw new TypeError("Expected find and replace tuple or list of tuples");
  const i = [], l = !e12[0] || Array.isArray(e12[0]) ? e12 : [e12];
  let a = -1;
  for (; ++a < l.length; ) {
    const o = l[a];
    i.push([sO(o[0]), cO(o[1])]);
  }
  return i;
}
function sO(e12) {
  return typeof e12 == "string" ? new RegExp(aO(e12), "g") : e12;
}
function cO(e12) {
  return typeof e12 == "function" ? e12 : function() {
    return e12;
  };
}
const vm = "phrasing", bm = ["autolink", "link", "image", "label"];
function fO() {
  return { transforms: [xO], enter: { literalAutolink: hO, literalAutolinkEmail: wm, literalAutolinkHttp: wm, literalAutolinkWww: wm }, exit: { literalAutolink: yO, literalAutolinkEmail: gO, literalAutolinkHttp: mO, literalAutolinkWww: pO } };
}
function dO() {
  return { unsafe: [{ character: "@", before: "[+\\-.\\w]", after: "[\\-.\\w]", inConstruct: vm, notInConstruct: bm }, { character: ".", before: "[Ww]", after: "[\\-.\\w]", inConstruct: vm, notInConstruct: bm }, { character: ":", before: "[ps]", after: "\\/", inConstruct: vm, notInConstruct: bm }] };
}
function hO(e12) {
  this.enter({ type: "link", title: null, url: "", children: [], position: void 0 }, e12);
}
function wm(e12) {
  this.config.enter.autolinkProtocol.call(this, e12);
}
function mO(e12) {
  this.config.exit.autolinkProtocol.call(this, e12);
}
function pO(e12) {
  this.config.exit.data.call(this, e12);
  const i = this.stack[this.stack.length - 1];
  i.type, i.url = "http://" + this.sliceSerialize(e12);
}
function gO(e12) {
  this.config.exit.autolinkEmail.call(this, e12);
}
function yO(e12) {
  this.exit(e12);
}
function xO(e12) {
  uO(e12, [[new RegExp("(?<![\\da-z])(https?:\\/\\/|www(?=\\.))([\\w-]*\\.[\\w\\-.]*)([^\\t\\n\\r ]*)", "gi"), vO], [new RegExp("(?<![\\w+\\-.@])xmpp:([\\w+\\-.]+)@([\\w-]+(?:\\.[\\w-]+)+)(\\/(?:[\\w\\-/]|\\.(?=[\\dA-Za-z]))*)?", "g"), SO], [new RegExp("(?<![\\w+\\-.@])mailto:([\\w+\\-.]+)@([\\w-]+(?:\\.[\\w-]+)+)", "g"), wO], [new RegExp("(?<![\\w+\\-.]|(?:^|[^\\d@A-Za-z])(?:mailto|xmpp):)([\\w+\\-.]+)@([\\w-]+(?:\\.[\\w-]+)+)", "g"), bO]], { ignore: ["link", "linkReference"] });
}
function vO(e12, i, l, a, o) {
  if (!kO(o))
    return false;
  let s = "";
  if (/^w/i.test(i) && (l = i + l, i = "", s = "http://"), ko(l.charCodeAt(0)) || !EO(l))
    return false;
  const c = CO(l + a), d = { type: "link", title: null, url: s + i + c[0], children: [{ type: "text", value: i + c[0], position: void 0 }], position: void 0 };
  return c[1] ? [d, { type: "text", value: c[1], position: void 0 }] : d;
}
function bO(e12, i, l) {
  return /[\d\-_]$/.test(l) ? false : { type: "link", title: null, url: "mailto:" + i + "@" + l, children: [{ type: "text", value: i + "@" + l, position: void 0 }], position: void 0 };
}
function wO(e12, i, l) {
  if (/[\d\-_]$/.test(l))
    return false;
  const a = "mailto:" + i + "@" + l;
  return { type: "link", title: null, url: a, children: [{ type: "text", value: a, position: void 0 }], position: void 0 };
}
function SO(e12, i, l, a, o) {
  if (/[\d\-_]$/.test(l) || a && (!/[A-Za-z]$/.test(a) || o.input.charAt(o.index + e12.length) === "@"))
    return false;
  const s = "xmpp:" + i + "@" + l + (a || "");
  return { type: "link", title: null, url: s, children: [{ type: "text", value: s, position: void 0 }], position: void 0 };
}
function EO(e12) {
  const i = e12.split(".");
  return !(i.length < 2 || i[i.length - 1] && (/_/.test(i[i.length - 1]) || !/[\dA-Za-z]/.test(i[i.length - 1])) || i[i.length - 2] && (/_/.test(i[i.length - 2]) || !/[\dA-Za-z]/.test(i[i.length - 2])));
}
function CO(e12) {
  let i = e12.length;
  for (; i > 0; ) {
    const c = e12.charCodeAt(i - 1);
    if (c === 33 || c === 34 || c === 38 || c === 39 || c === 41 || c === 44 || c === 46 || c === 58 || c === 59 || c === 60 || c === 62 || c === 63 || c === 93 || c === 125)
      i--;
    else
      break;
  }
  if (i === e12.length)
    return [e12, void 0];
  let l = e12.slice(i);
  e12 = e12.slice(0, i);
  let a = l.indexOf(")");
  const o = mb(e12, "(");
  let s = mb(e12, ")");
  for (; a !== -1 && o > s; )
    e12 += l.slice(0, a + 1), l = l.slice(a + 1), a = l.indexOf(")"), s++;
  return [e12, l];
}
function kO(e12) {
  const i = e12.input.charCodeAt(e12.index - 1);
  return e12.index === 0 || Rr(i) || ko(i);
}
_S.peek = OO;
function NO() {
  this.buffer();
}
function _O(e12) {
  this.enter({ type: "footnoteReference", identifier: "", label: "" }, e12);
}
function zO() {
  this.buffer();
}
function TO(e12) {
  this.enter({ type: "footnoteDefinition", identifier: "", label: "", children: [] }, e12);
}
function AO(e12) {
  const i = this.resume(), l = this.stack[this.stack.length - 1];
  l.type, l.identifier = di(this.sliceSerialize(e12)).toLowerCase(), l.label = i;
}
function MO(e12) {
  this.exit(e12);
}
function jO(e12) {
  const i = this.resume(), l = this.stack[this.stack.length - 1];
  l.type, l.identifier = di(this.sliceSerialize(e12)).toLowerCase(), l.label = i;
}
function DO(e12) {
  this.exit(e12);
}
function OO() {
  return "[";
}
function _S(e12, i, l, a) {
  const o = l.createTracker(a);
  let s = o.move("[^");
  const c = l.enter("footnoteReference"), d = l.enter("reference");
  return s += o.move(l.safe(l.associationId(e12), { after: "]", before: s })), d(), c(), s += o.move("]"), s;
}
function RO() {
  return { enter: { gfmFootnoteCallString: NO, gfmFootnoteCall: _O, gfmFootnoteDefinitionLabelString: zO, gfmFootnoteDefinition: TO }, exit: { gfmFootnoteCallString: AO, gfmFootnoteCall: MO, gfmFootnoteDefinitionLabelString: jO, gfmFootnoteDefinition: DO } };
}
function LO(e12) {
  let i = false;
  return e12 && e12.firstLineBlank && (i = true), { handlers: { footnoteDefinition: l, footnoteReference: _S }, unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }] };
  function l(a, o, s, c) {
    const d = s.createTracker(c);
    let m = d.move("[^");
    const g = s.enter("footnoteDefinition"), y = s.enter("label");
    return m += d.move(s.safe(s.associationId(a), { before: m, after: "]" })), y(), m += d.move("]:"), a.children && a.children.length > 0 && (d.shift(4), m += d.move((i ? `
` : " ") + s.indentLines(s.containerFlow(a, d.current()), i ? zS : HO))), g(), m;
  }
}
function HO(e12, i, l) {
  return i === 0 ? e12 : zS(e12, i, l);
}
function zS(e12, i, l) {
  return (l ? "" : "    ") + e12;
}
const BO = ["autolink", "destinationLiteral", "destinationRaw", "reference", "titleQuote", "titleApostrophe"];
$p.attention = YO;
$p.peek = XO;
function UO() {
  return { canContainEols: ["delete"], enter: { strikethrough: qO }, exit: { strikethrough: VO } };
}
function IO() {
  return { handlers: { delete: $p }, unsafe: [{ character: "~", inConstruct: "phrasing", notInConstruct: BO }] };
}
function qO(e12) {
  this.enter({ type: "delete", children: [], position: void 0 }, e12);
}
function VO(e12) {
  this.exit(e12);
}
function $p(e12, i, l, a) {
  const o = l.createTracker(a), s = l.stack.includes("strikethrough") ? "~" : "~~", c = l.enter("strikethrough");
  let d = o.move(s);
  return d += l.containerPhrasing(e12, { ...o.current(), before: d, after: "~" }), d += o.move(s), c(), d;
}
function YO() {
  return { construct: "strikethrough", markers: ["~"], sizes: [2, 1] };
}
function XO() {
  return "~";
}
function GO(e12) {
  return e12.length;
}
function $O(e12, i) {
  const l = i || {}, a = (l.align || []).concat(), o = l.stringLength || GO, s = [], c = [], d = [], m = [];
  let g = 0, y = -1;
  for (; ++y < e12.length; ) {
    const E = [], N = [];
    let C = -1;
    for (e12[y].length > g && (g = e12[y].length); ++C < e12[y].length; ) {
      const A = QO(e12[y][C]);
      if (l.alignDelimiters !== false) {
        const k = o(A);
        N[C] = k, (m[C] === void 0 || k > m[C]) && (m[C] = k);
      }
      E.push(A);
    }
    c[y] = E, d[y] = N;
  }
  let p = -1;
  if (typeof a == "object" && "length" in a)
    for (; ++p < g; )
      s[p] = pb(a[p]);
  else {
    const E = pb(a);
    for (; ++p < g; )
      s[p] = E;
  }
  p = -1;
  const x = [], v = [];
  for (; ++p < g; ) {
    const E = s[p];
    let N = "", C = "";
    E === 99 ? (N = ":", C = ":") : E === 108 ? N = ":" : E === 114 && (C = ":");
    let A = l.alignDelimiters === false ? 1 : Math.max(1, m[p] - N.length - C.length);
    const k = N + "-".repeat(A) + C;
    l.alignDelimiters !== false && (A = N.length + A + C.length, A > m[p] && (m[p] = A), v[p] = A), x[p] = k;
  }
  c.splice(1, 0, x), d.splice(1, 0, v), y = -1;
  const S = [];
  for (; ++y < c.length; ) {
    const E = c[y], N = d[y], C = l.fillRows === false ? Math.max(1, c[y === 1 ? 0 : y].length) : g;
    p = -1;
    const A = [];
    for (; ++p < C; ) {
      const k = E[p] || "";
      let T = "", Y = "";
      if (l.alignDelimiters !== false) {
        const M = m[p] - (N[p] || 0), B = s[p];
        if (B === 114)
          T = " ".repeat(M);
        else if (B === 99) {
          const G = M / 2;
          M % 2 ? (T = " ".repeat(G + 0.5), Y = " ".repeat(G - 0.5)) : (T = " ".repeat(G), Y = T);
        } else
          Y = " ".repeat(M);
      }
      l.delimiterStart !== false && !p && A.push("|"), l.padding !== false && !(l.alignDelimiters === false && k === "") && (l.delimiterStart !== false || p) && A.push(" "), l.alignDelimiters !== false && A.push(T), A.push(k), l.alignDelimiters !== false && A.push(Y), l.padding !== false && A.push(" "), (l.delimiterEnd !== false || p !== C - 1) && A.push("|");
    }
    S.push(l.delimiterEnd === false ? A.join("").replace(/ +$/, "") : A.join(""));
  }
  return S.join(`
`);
}
function QO(e12) {
  return e12 == null ? "" : String(e12);
}
function pb(e12) {
  const i = typeof e12 == "string" ? e12.codePointAt(0) : 0;
  return i === 67 || i === 99 ? 99 : i === 76 || i === 108 ? 108 : i === 82 || i === 114 ? 114 : 0;
}
const ZO = uf(["break", "delete", "emphasis", "footnote", "footnoteReference", "image", "imageReference", "inlineCode", "inlineMath", "link", "linkReference", "mdxJsxTextElement", "mdxTextExpression", "strong", "text", "textDirective"]);
function FO(e12, i, l, a) {
  const o = l.enter("blockquote"), s = l.createTracker(a);
  s.move("> "), s.shift(2);
  const c = l.indentLines(l.containerFlow(e12, s.current()), KO);
  return o(), c;
}
function KO(e12, i, l) {
  return ">" + (l ? "" : " ") + e12;
}
function PO(e12, i) {
  return gb(e12, i.inConstruct, true) && !gb(e12, i.notInConstruct, false);
}
function gb(e12, i, l) {
  if (typeof i == "string" && (i = [i]), !i || i.length === 0)
    return l;
  let a = -1;
  for (; ++a < i.length; )
    if (e12.includes(i[a]))
      return true;
  return false;
}
function yb(e12, i, l, a) {
  let o = -1;
  for (; ++o < l.unsafe.length; ) {
    const s = l.unsafe[o];
    if (s.character === `
` && !s.before && !s.after && PO(l.stack, s))
      return /[\t ]/.test(a.before) ? "" : " ";
  }
  return `\\
`;
}
function JO(e12, i) {
  const l = String(e12);
  let a = l.indexOf(i), o = a, s = 0, c = 0;
  if (typeof i != "string")
    throw new TypeError("Expected substring");
  for (; a !== -1; )
    a === o ? ++s > c && (c = s) : s = 1, o = a + i.length, a = l.indexOf(i, o);
  return c;
}
function WO(e12, i) {
  return !!(i.options.fences === false && e12.value && !e12.lang && /[^\n\r ]/.test(e12.value) && !/^[\t ]*(?:[\n\r]|$)|(?:^|[\n\r])[\t ]*$/.test(e12.value));
}
function eR(e12) {
  const i = e12.options.fence || "`";
  if (i !== "`" && i !== "~")
    throw new Error("Cannot serialize code with `" + i + "` for `options.fence`, expected `` ` `` or `~`");
  return i;
}
function tR(e12, i, l, a) {
  const o = eR(l), s = e12.value || "";
  if (WO(e12, l)) {
    const p = l.enter("codeIndented"), x = l.indentLines(s, nR);
    return p(), x;
  }
  const c = l.createTracker(a), d = o.repeat(Math.max(JO(s, o) + 1, 3)), m = l.enter("codeFenced"), g = o === "`" ? "GraveAccent" : "Tilde";
  let y = c.move(d);
  if (e12.lang) {
    const p = l.enter(`codeFencedLang${g}`);
    y += c.move(l.safe(e12.lang, { before: y, after: " ", encode: ["`"], ...c.current() })), p();
  }
  if (e12.lang && e12.meta) {
    const p = l.enter(`codeFencedMeta${g}`);
    y += c.move(" "), y += c.move(l.safe(e12.meta, { before: y, after: `
`, encode: ["`"], ...c.current() })), p();
  }
  return y += c.move(`
`), s && (y += c.move(s + `
`)), y += c.move(d), m(), y;
}
function nR(e12, i, l) {
  return (l ? "" : "    ") + e12;
}
function Qp(e12) {
  const i = e12.options.quote || '"';
  if (i !== '"' && i !== "'")
    throw new Error("Cannot serialize title with `" + i + "` for `options.quote`, expected `\"`, or `'`");
  return i;
}
function iR(e12, i, l, a) {
  const o = Qp(l), s = o === '"' ? "Quote" : "Apostrophe", c = l.enter("definition");
  let d = l.enter("label");
  const m = l.createTracker(a);
  let g = m.move("[");
  return g += m.move(l.safe(l.associationId(e12), { before: g, after: "]", ...m.current() })), g += m.move("]: "), d(), !e12.url || /[\0- \u007F]/.test(e12.url) ? (d = l.enter("destinationLiteral"), g += m.move("<"), g += m.move(l.safe(e12.url, { before: g, after: ">", ...m.current() })), g += m.move(">")) : (d = l.enter("destinationRaw"), g += m.move(l.safe(e12.url, { before: g, after: e12.title ? " " : `
`, ...m.current() }))), d(), e12.title && (d = l.enter(`title${s}`), g += m.move(" " + o), g += m.move(l.safe(e12.title, { before: g, after: o, ...m.current() })), g += m.move(o), d()), c(), g;
}
function lR(e12) {
  const i = e12.options.emphasis || "*";
  if (i !== "*" && i !== "_")
    throw new Error("Cannot serialize emphasis with `" + i + "` for `options.emphasis`, expected `*`, or `_`");
  return i;
}
function Ic(e12) {
  const i = e12.codePointAt(0);
  return i === void 0 ? "" : String.fromCodePoint(i);
}
function Oa(e12) {
  const i = e12.codePointAt(e12.length - 2);
  return i !== void 0 && i > 65535 ? e12.slice(-2) : e12.slice(-1);
}
function TS(e12) {
  return "&#x" + e12.toString(16).toUpperCase() + ";";
}
function xb(e12, i, l) {
  const a = Xl(e12), o = Xl(i);
  return a === void 0 ? o === void 0 ? l === "_" ? { inside: true, outside: true } : { inside: false, outside: false } : o === 1 ? { inside: true, outside: true } : { inside: false, outside: true } : a === 1 ? o === void 0 ? { inside: false, outside: false } : o === 1 ? { inside: true, outside: true } : { inside: false, outside: false } : o === void 0 ? { inside: false, outside: false } : o === 1 ? { inside: true, outside: false } : { inside: false, outside: false };
}
function rR(e12) {
  if (e12.charCodeAt(0) !== 60)
    return;
  const i = e12.charCodeAt(1);
  if (i === 33) {
    const d = e12.charCodeAt(2);
    return d === 45 ? 2 : d === 91 ? 5 : cn(d) ? 4 : void 0;
  }
  if (i === 63)
    return 3;
  const l = i === 47, a = l ? 2 : 1;
  let o = a, s = e12.charCodeAt(o);
  if (!cn(s))
    return;
  for (; s === 45 || fn(s); )
    s = e12.charCodeAt(++o);
  const c = e12.slice(a, o).toLowerCase();
  return !l && s !== 47 && ep.includes(c) ? 1 : mS.includes(c) ? 6 : 7;
}
const AS = /* @__PURE__ */ new Map([["*", false], ["_", true]]);
function aR(e12, i, l) {
  const a = /* @__PURE__ */ new Set();
  for (const s of e12) {
    const c = l.get(s);
    if (c && s.attention && i.some((d) => d.attention === s.attention))
      for (const d of c.tokens)
        a.add(d.attention);
  }
  const o = [];
  for (const s of e12)
    s.attention && a.delete(s.attention) && o.push(s.attention);
  return o.reverse(), o;
}
function MS(e12, i, l) {
  const a = [], o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  let c = 0;
  for (; c < e12.length; ) {
    if (!e12[c].attention) {
      c++;
      continue;
    }
    const d = e12[c].value.charAt(0), m = AS.get(d);
    let g = c + 1;
    for (; g < e12.length && e12[g].attention && e12[g].value.charAt(0) === d; )
      g++;
    const y = c ? e12[c - 1].value : i, p = Xl(y.charCodeAt(y.length - 1)), x = Xl((g < e12.length ? e12[g].value : l).charCodeAt(0)), v = !x || x === 2 && !!p, S = !p || p === 2 && !!x, E = { tokens: e12.slice(c, g), markers: [], start: 0, end: 0, open: m ? v && (!!p || !S) : v, close: m ? S && (!!x || !v) : S, split: m !== void 0 };
    for (const N of E.tokens) {
      o.set(N, [...E.tokens]), s.set(N, E);
      let C = N.value.length;
      for (; C--; )
        E.markers.push(N);
    }
    E.end = E.markers.length, a.push(E), c = g;
  }
  for (oR(a, o), c = -1; ++c < e12.length; ) {
    const d = o.get(e12[c]);
    if (d)
      return { attention: aR(e12, d, s), index: c };
  }
}
function fc(e12, i) {
  const l = e12[i ? 0 : e12.length - 1];
  if (!l || l.attention)
    return;
  const a = i ? Ic(l.value) : Oa(l.value), o = TS(a.codePointAt(0));
  if (i)
    l.value = o + l.value.slice(a.length);
  else {
    let s = l.value.slice(0, l.value.length - a.length), c = 0;
    for (; s.charCodeAt(s.length - 1 - c) === 92; )
      c++;
    c % 2 && (s += "\\"), l.value = s + o;
  }
}
function uR(e12, i, l, a, o) {
  for (const s of l.attention) {
    const c = i.get(s) || s.sequences[0];
    for (const d of s.sequences) {
      if (d === c)
        continue;
      const m = new Map(i);
      m.set(s, d);
      const g = cf(e12, m, a, o), y = MS(g, a, o);
      if (!y || y.index > l.index)
        return { chosen: m, mistake: y, tokens: g };
    }
  }
}
function oR(e12, i) {
  const l = /* @__PURE__ */ new Map();
  for (const a of e12) {
    const o = a.tokens[0].value.charAt(0);
    let s = l.get(o);
    s || (s = [], l.set(o, s));
    let c = a.close ? s.length : 0;
    for (; c-- && a.start < a.end; ) {
      const d = s[c], m = d.end - d.start, g = a.end - a.start;
      if (a.split ? (d.close || a.open) && g % 3 && !((m + g) % 3) : m !== d.markers.length || m !== g)
        continue;
      const y = a.split ? m > 1 && g > 1 ? 2 : 1 : g, p = d.markers.slice(d.end - y, d.end), x = a.markers.slice(a.start, a.start + y), v = p[0], S = x[0];
      if (v === p[y - 1] && v.value.length === y && S === x[y - 1] && S.value.length === y && v.attention === S.attention)
        i.delete(v), i.delete(S);
      else {
        const E = [.../* @__PURE__ */ new Set([...p, ...x])];
        for (const N of E) {
          const C = i.get(N);
          C && C.push(...E);
        }
      }
      d.end -= y, a.start += y, d.start === d.end && s.splice(c, 1), c = s.length;
    }
    a.open && a.start < a.end && s.push(a);
  }
}
function sR(e12, i, l) {
  if (i.length === 0)
    throw new Error("Cannot serialize `" + e12 + "` as attention without markers, expected one or more markers");
  if (l.length === 0)
    throw new Error("Cannot serialize `" + e12 + "` as attention without sizes, expected one or more sizes");
  for (const o of l)
    if (!Number.isSafeInteger(o) || o < 1)
      throw new Error("Cannot serialize `" + e12 + "` as attention with `" + o + "` as size, expected positive integer");
  const a = [];
  for (const o of i) {
    if (o.length !== 1)
      throw new Error("Cannot serialize `" + e12 + "` as attention with `" + o + "` as marker, expected a single ascii character");
    if (!rS(o.charCodeAt(0)))
      throw new Error("Cannot serialize `" + e12 + "` as attention with `" + o + "` as marker, expected ascii punctuation");
    for (const s of l)
      a.push(o.repeat(s));
  }
  return a;
}
function cR(e12, i, l) {
  const a = i.indexStack, o = e12.children || [], s = [];
  let c = -1, d = l.before;
  a.push(-1);
  let m = i.createTracker(l);
  for (; ++c < o.length; ) {
    const g = o[c];
    let y;
    if (a[a.length - 1] = c, c + 1 < o.length) {
      let v = i.handle.handlers[o[c + 1].type];
      v && v.peek && (v = v.peek), y = v ? Ic(v(o[c + 1], e12, i, { before: "", after: "", ...m.current() })) : "";
    } else
      y = l.after;
    const p = s[s.length - 1];
    typeof p == "string" && (d === "\r" || d === `
`) && g.type === "html" && rR(g.value) !== 7 && (s[s.length - 1] = p.replace(/(\r?\n|\r)$/, " "), d = " ", m = i.createTracker(l), m.move(ff(s, l.before, l.after)));
    const x = i.handle.handlers[g.type];
    if (x && x.attention) {
      const v = Zp(g, x.attention, i, m);
      if (!v)
        continue;
      s.push(v), d = Oa(v.sequences[0]);
    } else {
      const v = i.handle(g, e12, i, { ...m.current(), after: y, before: d });
      if (!v)
        continue;
      m.move(v), s.push(v), d = Oa(v);
    }
  }
  return a.pop(), s;
}
function Zp(e12, i, l, a) {
  const { construct: o, markers: s, sizes: c } = i(e12, l), d = sR(e12.type, s, c), m = d[0], g = l.enter(o), y = l.createTracker(a.current());
  y.move(m);
  const p = cR(e12, l, { ...y.current(), before: m, after: m });
  if (g(), p.length !== 0)
    return a.move(m), a.move(ff(p, m, m)), a.move(m), { children: p, sequences: d };
}
function vb(e12, i, l, a) {
  let o = cf(e12, i, l, a), s = MS(o, l, a);
  for (; s; ) {
    const c = uR(e12, i, s, l, a);
    if (!c)
      return;
    i = c.chosen, o = c.tokens, s = c.mistake;
  }
  return o;
}
function jS(e12, i, l, a) {
  let o = l, s = -1;
  for (; ++s < e12.length; ) {
    const c = e12[s];
    if (typeof c == "string") {
      o = "";
      continue;
    }
    const d = s === e12.length - 1 ? a : "", m = c.sequences.find(function(g) {
      const y = g.charAt(0);
      return y !== o.charAt(0) && y !== d.charAt(0) || e12.length === 1 && AS.has(y) && g.length > l.length;
    }) || c.sequences[0];
    m !== c.sequences[0] && i.set(c, m), jS(c.children, i, m, m), o = m;
  }
}
function cf(e12, i, l, a) {
  const o = [];
  let s, c = Oa(l), d = -1;
  for (; ++d < e12.length; ) {
    const m = e12[d];
    if (typeof m == "string") {
      const k = { value: m, attention: void 0 };
      s && s === Ic(m) && fc([k], true), s = void 0, o.push(k), k.value && (c = Oa(k.value));
      continue;
    }
    const g = i.get(m) || m.sequences[0], y = g.charAt(0), p = e12[d + 1], x = c, v = Ic(p === void 0 ? a : typeof p == "string" ? p : i.get(p) || p.sequences[0]), S = cf(m.children, i, g, g), E = S[0].value, N = xb(x.charCodeAt(x.length - 1), E.charCodeAt(0), y);
    N.inside && fc(S, true);
    const C = Oa(S[S.length - 1].value), A = xb(v.charCodeAt(0), C.charCodeAt(C.length - 1), y);
    A.inside && fc(S, false), N.outside && x !== `
` && x !== "\r" && fc(o, false), A.outside && (s = v), o.push({ value: g, attention: m }, ...S, { value: g, attention: m }), c = g.charAt(g.length - 1);
  }
  return o;
}
function ff(e12, i, l) {
  const a = /* @__PURE__ */ new Map();
  jS(e12, a, i, l);
  const o = (a.size > 0 ? vb(e12, a, i, l) : void 0) || vb(e12, /* @__PURE__ */ new Map(), i, l) || cf(e12, /* @__PURE__ */ new Map(), i, l);
  let s = "";
  for (const c of o)
    s += c.value;
  return s;
}
Fp.attention = DS;
Fp.peek = fR;
function Fp(e12, i, l, a) {
  const o = l.enter("phrasing"), s = Zp(e12, DS, l, l.createTracker(a)), c = s ? ff([s], a.before, a.after) : "";
  return o(), c;
}
function DS(e12, i) {
  return { construct: "emphasis", markers: lR(i) === "*" ? ["*", "_"] : ["_", "*"], sizes: [1] };
}
function fR(e12, i, l) {
  return l.options.emphasis || "*";
}
function dR(e12, i) {
  let l = false;
  return sf(e12, function(a) {
    if ("value" in a && /\r?\n|\r/.test(a.value) || a.type === "break")
      return l = true, io;
  }), !!((!e12.depth || e12.depth < 3) && lf(e12) && (i.options.setext || l));
}
function hR(e12, i, l, a) {
  const o = Math.max(Math.min(6, e12.depth || 1), 1), s = l.createTracker(a);
  if (dR(e12, l)) {
    const p = l.enter("headingSetext"), x = l.enter("phrasing"), v = l.containerPhrasing(e12, { ...s.current(), before: `
`, after: `
` });
    return x(), p(), v + `
` + (o === 1 ? "=" : "-").repeat(v.length - (Math.max(v.lastIndexOf("\r"), v.lastIndexOf(`
`)) + 1));
  }
  const c = "#".repeat(o), d = l.enter("headingAtx"), m = l.enter("phrasing");
  s.move(c + " ");
  let g = l.containerPhrasing(e12, { before: "# ", after: `
`, ...s.current() });
  const y = g.charCodeAt(0);
  return (y === 9 || y === 32) && (g = TS(y) + g.slice(1)), g = g ? c + " " + g : c, l.options.closeAtx && (g += " " + c), m(), d(), g;
}
OS.peek = mR;
function OS(e12) {
  return e12.value || "";
}
function mR() {
  return "<";
}
RS.peek = pR;
function RS(e12, i, l, a) {
  const o = Qp(l), s = o === '"' ? "Quote" : "Apostrophe", c = l.enter("image");
  let d = l.enter("label");
  const m = l.createTracker(a);
  let g = m.move("![");
  return g += m.move(l.safe(e12.alt, { before: g, after: "]", ...m.current() })), g += m.move("]("), d(), !e12.url && e12.title || /[\0- \u007F]/.test(e12.url) ? (d = l.enter("destinationLiteral"), g += m.move("<"), g += m.move(l.safe(e12.url, { before: g, after: ">", ...m.current() })), g += m.move(">")) : (d = l.enter("destinationRaw"), g += m.move(l.safe(e12.url, { before: g, after: e12.title ? " " : ")", ...m.current() }))), d(), e12.title && (d = l.enter(`title${s}`), g += m.move(" " + o), g += m.move(l.safe(e12.title, { before: g, after: o, ...m.current() })), g += m.move(o), d()), g += m.move(")"), c(), g;
}
function pR() {
  return "!";
}
LS.peek = gR;
function LS(e12, i, l, a) {
  const o = e12.referenceType, s = l.enter("imageReference");
  let c = l.enter("label");
  const d = l.createTracker(a);
  let m = d.move("![");
  const g = l.safe(e12.alt, { before: m, after: "]", ...d.current() });
  m += d.move(g + "]["), c();
  const y = l.stack;
  l.stack = y.filter(function(x) {
    return x !== "phrasing";
  }), c = l.enter("reference");
  const p = l.safe(l.associationId(e12), { before: m, after: "]", ...d.current() });
  return c(), l.stack = y, s(), o === "full" || !g || g !== p ? m += d.move(p + "]") : o === "shortcut" ? m = m.slice(0, -1) : m += d.move("]"), m;
}
function gR() {
  return "!";
}
HS.peek = yR;
function HS(e12, i, l) {
  let a = e12.value || "", o = "`", s = -1;
  for (; new RegExp("(^|[^`])" + o + "([^`]|$)").test(a); )
    o += "`";
  for (/[^\n\r ]/.test(a) && (/^[\n\r ]/.test(a) && /[\n\r ]$/.test(a) || /^`|`$/.test(a)) && (a = " " + a + " "); ++s < l.unsafe.length; ) {
    const c = l.unsafe[s], d = l.compilePattern(c);
    if (!c.atBreak)
      continue;
    let m;
    for (; m = d.exec(a); ) {
      let g = m.index;
      a.charCodeAt(g) === 10 && a.charCodeAt(g - 1) === 13 && g--, a = a.slice(0, g) + " " + a.slice(m.index + 1);
    }
  }
  return o + a + o;
}
function yR() {
  return "`";
}
function BS(e12, i) {
  const l = lf(e12);
  return !!(!i.options.resourceLink && e12.url && !e12.title && e12.children && e12.children.length === 1 && e12.children[0].type === "text" && (l === e12.url || "mailto:" + l === e12.url) && /^[a-z][+\-.a-z]+:/i.test(e12.url) && !/[\0- <>\u007F]/.test(e12.url));
}
US.peek = xR;
function US(e12, i, l, a) {
  const o = Qp(l), s = o === '"' ? "Quote" : "Apostrophe", c = l.createTracker(a);
  if (BS(e12, l)) {
    const S = l.stack;
    l.stack = S.filter(function(C) {
      return C !== "phrasing";
    });
    const E = l.enter("autolink");
    let N = c.move("<");
    return N += c.move(l.containerPhrasing(e12, { before: N, after: ">", ...c.current() })), N += c.move(">"), E(), l.stack = S, N;
  }
  const d = l.enter("link");
  let m = l.enter("label"), g = c.move("[");
  const y = l.containerPhrasing(e12, { before: g, after: "](", ...c.current() });
  g += c.move(y), m(), g += c.move("](");
  const p = /[\0- \u007F]/.test(e12.url), x = a.before.charAt(a.before.length - 1);
  let v = e12.title || void 0;
  if (!v && !p && (x === `
` || x === "\r")) {
    let S = 0;
    for (; S < y.length && y.charCodeAt(S) !== 93; )
      S += y.charCodeAt(S) === 92 ? 2 : 1;
    y.charCodeAt(S + 1) === 58 && (v = "");
  }
  return !e12.url && typeof v == "string" || p ? (m = l.enter("destinationLiteral"), g += c.move("<"), g += c.move(l.safe(e12.url, { before: g, after: ">", ...c.current() })), g += c.move(">")) : (m = l.enter("destinationRaw"), g += c.move(l.safe(e12.url, { before: g, after: typeof v == "string" ? " " : ")", ...c.current() }))), m(), typeof v == "string" && (m = l.enter(`title${s}`), g += c.move(" " + o), g += c.move(l.safe(v, { before: g, after: o, ...c.current() })), g += c.move(o), m()), g += c.move(")"), d(), g;
}
function xR(e12, i, l) {
  return BS(e12, l) ? "<" : "[";
}
IS.peek = vR;
function IS(e12, i, l, a) {
  const o = e12.referenceType, s = l.enter("linkReference");
  let c = l.enter("label");
  const d = l.createTracker(a);
  let m = d.move("[");
  const g = l.containerPhrasing(e12, { before: m, after: "]", ...d.current() });
  m += d.move(g + "]["), c();
  const y = l.stack;
  l.stack = y.filter(function(x) {
    return x !== "phrasing";
  }), c = l.enter("reference");
  const p = l.safe(l.associationId(e12), { before: m, after: "]", ...d.current() });
  return c(), l.stack = y, s(), o === "full" || !g || g !== p ? m += d.move(p + "]") : o === "shortcut" ? m = m.slice(0, -1) : m += d.move("]"), m;
}
function vR() {
  return "[";
}
function Kp(e12) {
  const i = e12.options.bullet || "*";
  if (i !== "*" && i !== "+" && i !== "-")
    throw new Error("Cannot serialize items with `" + i + "` for `options.bullet`, expected `*`, `+`, or `-`");
  return i;
}
function bR(e12) {
  const i = Kp(e12), l = e12.options.bulletOther;
  if (!l)
    return i === "*" ? "-" : "*";
  if (l !== "*" && l !== "+" && l !== "-")
    throw new Error("Cannot serialize items with `" + l + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
  if (l === i)
    throw new Error("Expected `bullet` (`" + i + "`) and `bulletOther` (`" + l + "`) to be different");
  return l;
}
function wR(e12) {
  const i = e12.options.bulletOrdered || ".";
  if (i !== "." && i !== ")")
    throw new Error("Cannot serialize items with `" + i + "` for `options.bulletOrdered`, expected `.` or `)`");
  return i;
}
function qS(e12) {
  const i = e12.options.rule || "*";
  if (i !== "*" && i !== "-" && i !== "_")
    throw new Error("Cannot serialize rules with `" + i + "` for `options.rule`, expected `*`, `-`, or `_`");
  return i;
}
function SR(e12, i, l, a) {
  const o = l.enter("list"), s = l.bulletCurrent;
  let c = e12.ordered ? wR(l) : Kp(l);
  const d = e12.ordered ? c === "." ? ")" : "." : bR(l);
  let m = i && l.bulletLastUsed ? c === l.bulletLastUsed : false;
  if (!e12.ordered) {
    const y = e12.children ? e12.children[0] : void 0;
    if ((c === "*" || c === "-") && y && (!y.children || !y.children[0]) && l.stack[l.stack.length - 1] === "list" && l.stack[l.stack.length - 2] === "listItem" && l.stack[l.stack.length - 3] === "list" && l.stack[l.stack.length - 4] === "listItem" && l.indexStack[l.indexStack.length - 1] === 0 && l.indexStack[l.indexStack.length - 2] === 0 && l.indexStack[l.indexStack.length - 3] === 0 && (m = true), qS(l) === c && y) {
      let p = -1;
      for (; ++p < e12.children.length; ) {
        const x = e12.children[p];
        if (x && x.type === "listItem" && x.children && x.children[0] && x.children[0].type === "thematicBreak") {
          m = true;
          break;
        }
      }
    }
  }
  m && (c = d), l.bulletCurrent = c;
  const g = l.containerFlow(e12, a);
  return l.bulletLastUsed = c, l.bulletCurrent = s, o(), g;
}
function ER(e12) {
  const i = e12.options.listItemIndent || "one";
  if (i !== "tab" && i !== "one" && i !== "mixed")
    throw new Error("Cannot serialize items with `" + i + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
  return i;
}
function CR(e12, i, l, a) {
  const o = ER(l);
  let s = l.bulletCurrent || Kp(l);
  i && i.type === "list" && i.ordered && (s = (typeof i.start == "number" && i.start > -1 ? i.start : 1) + (l.options.incrementListMarker === false ? 0 : i.children.indexOf(e12)) + s);
  let c = s.length + 1;
  (o === "tab" || o === "mixed" && (i && i.type === "list" && i.spread || e12.spread)) && (c = Math.ceil(c / 4) * 4);
  const d = l.createTracker(a);
  d.move(s + " ".repeat(c - s.length)), d.shift(c);
  const m = l.enter("listItem"), g = l.indentLines(l.containerFlow(e12, d.current()), y);
  return m(), g;
  function y(p, x, v) {
    return x ? (v ? "" : " ".repeat(c)) + p : (v ? s : s + " ".repeat(c - s.length)) + p;
  }
}
function kR(e12, i, l, a) {
  const o = l.enter("paragraph"), s = l.enter("phrasing"), c = l.containerPhrasing(e12, a);
  return s(), o(), c;
}
function NR(e12, i, l, a) {
  if (!e12.children.some(function(d) {
    return ZO(d);
  }))
    return l.containerFlow(e12, a);
  const s = l.enter("phrasing"), c = l.containerPhrasing(e12, a);
  return s(), c;
}
function _R(e12) {
  const i = e12.options.strong || "*";
  if (i !== "*" && i !== "_")
    throw new Error("Cannot serialize strong with `" + i + "` for `options.strong`, expected `*`, or `_`");
  return i;
}
Pp.attention = VS;
Pp.peek = zR;
function Pp(e12, i, l, a) {
  const o = l.enter("phrasing"), s = Zp(e12, VS, l, l.createTracker(a)), c = s ? ff([s], a.before, a.after) : "";
  return o(), c;
}
function VS(e12, i) {
  return { construct: "strong", markers: _R(i) === "*" ? ["*", "_"] : ["_", "*"], sizes: [2] };
}
function zR(e12, i, l) {
  return l.options.strong || "*";
}
function TR(e12, i, l, a) {
  const o = i ? i.children : [], s = l.indexStack[l.indexStack.length - 1];
  return l.safe(e12.value, { ...a, afterNode: o[s + 1], beforeNode: o[s - 1] });
}
function AR(e12) {
  const i = e12.options.ruleRepetition || 3;
  if (i < 3)
    throw new Error("Cannot serialize rules with repetition `" + i + "` for `options.ruleRepetition`, expected `3` or more");
  return i;
}
function MR(e12, i, l) {
  const a = (qS(l) + (l.options.ruleSpaces ? " " : "")).repeat(AR(l));
  return l.options.ruleSpaces ? a.slice(0, -1) : a;
}
const up = { blockquote: FO, break: yb, code: tR, definition: iR, emphasis: Fp, hardBreak: yb, heading: hR, html: OS, image: RS, imageReference: LS, inlineCode: HS, link: US, linkReference: IS, list: SR, listItem: CR, paragraph: kR, root: NR, strong: Pp, text: TR, thematicBreak: MR };
function jR() {
  return { enter: { table: DR, tableData: bb, tableHeader: bb, tableRow: RR }, exit: { codeText: LR, table: OR, tableData: Sm, tableHeader: Sm, tableRow: Sm } };
}
function DR(e12) {
  const i = e12._align;
  this.enter({ type: "table", align: i.map(function(l) {
    return l === "none" ? null : l;
  }), children: [], position: void 0 }, e12), this.data.inTable = true;
}
function OR(e12) {
  this.exit(e12), this.data.inTable = void 0;
}
function RR(e12) {
  this.enter({ type: "tableRow", children: [], position: void 0 }, e12);
}
function Sm(e12) {
  this.exit(e12);
}
function bb(e12) {
  this.enter({ type: "tableCell", children: [], position: void 0 }, e12);
}
function LR(e12) {
  let i = this.resume();
  this.data.inTable && (i = i.replace(/\\([\\|])/g, HR));
  const l = this.stack[this.stack.length - 1];
  l.type, l.value = i, this.exit(e12);
}
function HR(e12, i) {
  return i === "|" ? i : e12;
}
function BR(e12) {
  const i = e12 || {}, { tableCellPadding: l, tablePipeAlign: a, stringLength: o } = i, s = l ? " " : "|";
  return { handlers: { inlineCode: x, table: c, tableCell: m, tableRow: d }, join: [UR], unsafe: [{ character: "\r", inConstruct: "tableCell" }, { character: `
`, inConstruct: "tableCell" }, { atBreak: true, character: "|", after: "[	 :-]" }, { character: "|", inConstruct: "tableCell" }, { atBreak: true, character: ":", after: "-" }, { atBreak: true, character: "-", after: "[:|-]" }] };
  function c(v, S, E, N) {
    const C = y(v, E, N), A = C[0];
    if (A) {
      let k = v.align ? v.align.length : 0, T = -1;
      if (!k)
        for (; ++T < C.length; )
          C[T].length > k && (k = C[T].length);
      for (; A.length < k; )
        A.push("");
    }
    return g(C, v.align);
  }
  function d(v, S, E, N) {
    const C = p(v, E, N), A = g([C]);
    return A.slice(0, A.indexOf(`
`));
  }
  function m(v, S, E, N) {
    const C = E.enter("tableCell"), A = E.enter("phrasing"), k = E.containerPhrasing(v, { ...N, before: s, after: s });
    return A(), C(), k;
  }
  function g(v, S) {
    return $O(v, { align: S, alignDelimiters: a, fillRows: false, padding: l, stringLength: o });
  }
  function y(v, S, E) {
    const { children: N } = v;
    let C = -1;
    const A = [], k = S.enter("table");
    for (; ++C < N.length; )
      A[C] = p(N[C], S, E);
    return k(), A;
  }
  function p(v, S, E) {
    const { children: N } = v;
    let C = -1;
    const A = [], k = S.enter("tableRow");
    for (; ++C < N.length; )
      A[C] = m(N[C], v, S, E);
    return k(), A;
  }
  function x(v, S, E) {
    const N = up.inlineCode(v, S, E);
    if (!E.stack.includes("tableCell"))
      return N;
    const C = [];
    let A = 0, k = N.indexOf("|");
    for (; k !== -1; ) {
      let T = k;
      for (; T > A && N.charCodeAt(T - 1) === 92; )
        T--;
      C.push(N.slice(A, k)), (k - T) % 2 === 0 && C.push("\\"), A = k, k = N.indexOf("|", k + 1);
    }
    return C.push(N.slice(A)), C.join("");
  }
}
function UR(e12, i, l, a) {
  if (e12.type === "table" && l.type === "listItem" && l.spread === false && (i.type === "definition" || i.type === "heading" && IR(i, a) || i.type === "paragraph" || i.type === "table"))
    return 1;
}
function IR(e12, i) {
  let l = false;
  return sf(e12, function(a) {
    if (a.type === "break" || "value" in a && /\r?\n|\r/.test(a.value))
      return l = true, io;
  }), !!((!e12.depth || e12.depth < 3) && lf(e12) && (i.options.setext || l));
}
function qR() {
  return { exit: { taskListCheckValueChecked: wb, taskListCheckValueUnchecked: wb, paragraph: YR } };
}
function VR() {
  return { handlers: { paragraph: XR }, join: [GR] };
}
function wb(e12) {
  const i = this.stack[this.stack.length - 2];
  i.type, i.checked = e12.type === "taskListCheckValueChecked";
}
function YR(e12) {
  const i = this.stack[this.stack.length - 2];
  if (i && i.type === "listItem" && typeof i.checked == "boolean") {
    const l = this.stack[this.stack.length - 1];
    l.type;
    const a = l.children[0];
    if (a && a.type === "text") {
      const o = i.children;
      let s = -1, c;
      for (; ++s < o.length; ) {
        const d = o[s];
        if (d.type === "paragraph") {
          c = d;
          break;
        }
      }
      c === l && (a.value = a.value.slice(1), a.value.length === 0 ? l.children.shift() : l.position && a.position && typeof a.position.start.offset == "number" && (a.position.start.column++, a.position.start.offset++, l.position.start = { ...a.position.start }));
    }
  }
  this.exit(e12);
}
function XR(e12, i, l, a) {
  if (!i || i.type !== "listItem" || YS(i) !== e12)
    return up.paragraph(e12, i, l, a);
  const o = "[" + (i.checked ? "x" : " ") + "] ", s = l.createTracker(a);
  s.move(o);
  const c = up.paragraph(e12.children.length > 0 ? e12 : { type: "paragraph", children: [{ type: "text", value: " " }] }, i, l, { ...a, ...s.current() });
  return o + c;
}
function GR(e12, i, l) {
  if (!(e12.type === "definition" && l.type === "listItem"))
    return;
  const a = YS(l);
  if (a && l.children.indexOf(e12) < l.children.indexOf(a))
    return 0;
}
function YS(e12) {
  if (typeof e12.checked == "boolean")
    for (const i of e12.children) {
      if (i.type === "paragraph")
        return i;
      if (i.type !== "definition")
        return;
    }
}
function $R() {
  return [fO(), RO(), UO(), jR(), qR()];
}
function QR(e12) {
  return { extensions: [dO(), LO(e12), IO(), BR(e12), VR()] };
}
const ZR = { tokenize: e82, partial: true }, XS = { tokenize: t8, partial: true }, GS = { tokenize: n8, partial: true }, $S = { tokenize: i8, partial: true }, FR = { tokenize: l8, partial: true }, QS = { name: "wwwAutolink", tokenize: JR, previous: FS }, ZS = { name: "protocolAutolink", tokenize: WR, previous: KS }, ll = { name: "emailAutolink", tokenize: PR, previous: PS }, Di = {};
function KR() {
  return { text: Di };
}
let yr = 48;
for (; yr < 123; )
  Di[yr] = ll, yr++, yr === 58 ? yr = 65 : yr === 91 && (yr = 97);
Di[43] = ll;
Di[45] = ll;
Di[46] = ll;
Di[95] = ll;
Di[72] = [ll, ZS];
Di[104] = [ll, ZS];
Di[87] = [ll, QS];
Di[119] = [ll, QS];
function PR(e12, i, l) {
  const a = this;
  let o, s;
  return c;
  function c(p) {
    return !op(p) || !PS.call(a, a.previous) || Jp(a.events) ? l(p) : (e12.enter("literalAutolink"), e12.enter("literalAutolinkEmail"), d(p));
  }
  function d(p) {
    return op(p) ? (e12.consume(p), d) : p === 64 ? (e12.consume(p), m) : l(p);
  }
  function m(p) {
    return p === 46 ? e12.check(FR, y, g)(p) : p === 45 || p === 95 || fn(p) ? (s = true, e12.consume(p), m) : y(p);
  }
  function g(p) {
    return e12.consume(p), o = true, m;
  }
  function y(p) {
    return s && o && cn(a.previous) ? (e12.exit("literalAutolinkEmail"), e12.exit("literalAutolink"), i(p)) : l(p);
  }
}
function JR(e12, i, l) {
  const a = this;
  return o;
  function o(c) {
    return c !== 87 && c !== 119 || !FS.call(a, a.previous) || Jp(a.events) ? l(c) : (e12.enter("literalAutolink"), e12.enter("literalAutolinkWww"), e12.check(ZR, e12.attempt(XS, e12.attempt(GS, s), l), l)(c));
  }
  function s(c) {
    return e12.exit("literalAutolinkWww"), e12.exit("literalAutolink"), i(c);
  }
}
function WR(e12, i, l) {
  const a = this;
  let o = "", s = false;
  return c;
  function c(p) {
    return (p === 72 || p === 104) && KS.call(a, a.previous) && !Jp(a.events) ? (e12.enter("literalAutolink"), e12.enter("literalAutolinkHttp"), o += String.fromCodePoint(p), e12.consume(p), d) : l(p);
  }
  function d(p) {
    if (cn(p) && o.length < 5)
      return o += String.fromCodePoint(p), e12.consume(p), d;
    if (p === 58) {
      const x = o.toLowerCase();
      if (x === "http" || x === "https")
        return e12.consume(p), m;
    }
    return l(p);
  }
  function m(p) {
    return p === 47 ? (e12.consume(p), s ? g : (s = true, m)) : l(p);
  }
  function g(p) {
    return p === null || Lc(p) || Ct(p) || Rr(p) || ko(p) ? l(p) : e12.attempt(XS, e12.attempt(GS, y), l)(p);
  }
  function y(p) {
    return e12.exit("literalAutolinkHttp"), e12.exit("literalAutolink"), i(p);
  }
}
function e82(e12, i, l) {
  let a = 0;
  return o;
  function o(c) {
    return (c === 87 || c === 119) && a < 3 ? (a++, e12.consume(c), o) : c === 46 && a === 3 ? (e12.consume(c), s) : l(c);
  }
  function s(c) {
    return c === null ? l(c) : i(c);
  }
}
function t8(e12, i, l) {
  let a, o, s;
  return c;
  function c(g) {
    return g === 46 || g === 95 ? e12.check($S, m, d)(g) : g === null || Ct(g) || Rr(g) || g !== 45 && ko(g) ? m(g) : (s = true, e12.consume(g), c);
  }
  function d(g) {
    return g === 95 ? a = true : (o = a, a = void 0), e12.consume(g), c;
  }
  function m(g) {
    return o || a || !s ? l(g) : i(g);
  }
}
function n8(e12, i) {
  let l = 0, a = 0;
  return o;
  function o(c) {
    return c === 40 ? (l++, e12.consume(c), o) : c === 41 && a < l ? s(c) : c === 33 || c === 34 || c === 38 || c === 39 || c === 41 || c === 42 || c === 44 || c === 46 || c === 58 || c === 59 || c === 60 || c === 63 || c === 93 || c === 95 || c === 126 ? e12.check($S, i, s)(c) : c === null || Ct(c) || Rr(c) ? i(c) : (e12.consume(c), o);
  }
  function s(c) {
    return c === 41 && a++, e12.consume(c), o;
  }
}
function i8(e12, i, l) {
  return a;
  function a(d) {
    return d === 33 || d === 34 || d === 39 || d === 41 || d === 42 || d === 44 || d === 46 || d === 58 || d === 59 || d === 63 || d === 95 || d === 126 ? (e12.consume(d), a) : d === 38 ? (e12.consume(d), s) : d === 93 ? (e12.consume(d), o) : d === 60 || d === null || Ct(d) || Rr(d) ? i(d) : l(d);
  }
  function o(d) {
    return d === null || d === 40 || d === 91 || Ct(d) || Rr(d) ? i(d) : a(d);
  }
  function s(d) {
    return cn(d) ? c(d) : l(d);
  }
  function c(d) {
    return d === 59 ? (e12.consume(d), a) : cn(d) ? (e12.consume(d), c) : l(d);
  }
}
function l8(e12, i, l) {
  return a;
  function a(s) {
    return e12.consume(s), o;
  }
  function o(s) {
    return fn(s) ? l(s) : i(s);
  }
}
function FS(e12) {
  return e12 === null || e12 === 40 || e12 === 42 || e12 === 95 || e12 === 91 || e12 === 93 || e12 === 126 || Ct(e12);
}
function KS(e12) {
  return !cn(e12);
}
function PS(e12) {
  return !(e12 === 47 || op(e12));
}
function op(e12) {
  return e12 === 43 || e12 === 45 || e12 === 46 || e12 === 95 || fn(e12);
}
function Jp(e12) {
  let i = e12.length, l = false;
  for (; i--; ) {
    const a = e12[i][1];
    if ((a.type === "labelLink" || a.type === "labelImage") && !a._balanced) {
      l = true;
      break;
    }
    if (a._gfmAutolinkLiteralWalkedInto) {
      l = false;
      break;
    }
  }
  return e12.length > 0 && !l && (e12[e12.length - 1][1]._gfmAutolinkLiteralWalkedInto = true), l;
}
const r8 = { tokenize: h8, partial: true };
function a8() {
  return { document: { 91: { name: "gfmFootnoteDefinition", tokenize: c8, continuation: { tokenize: f8 }, exit: d8 } }, text: { 91: { name: "gfmFootnoteCall", tokenize: s8 }, 93: { name: "gfmPotentialFootnoteCall", add: "after", tokenize: u8, resolveTo: o8 } } };
}
function u8(e12, i, l) {
  const a = this;
  let o = a.events.length;
  const s = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let c;
  for (; o--; ) {
    const m = a.events[o][1];
    if (m.type === "labelImage") {
      c = m;
      break;
    }
    if (m.type === "gfmFootnoteCall" || m.type === "labelLink" || m.type === "label" || m.type === "image" || m.type === "link")
      break;
  }
  return d;
  function d(m) {
    if (!c || !c._balanced)
      return l(m);
    const g = di(a.sliceSerialize({ start: c.end, end: a.now() }));
    return g.codePointAt(0) !== 94 || !s.includes(g.slice(1)) ? l(m) : (e12.enter("gfmFootnoteCallLabelMarker"), e12.consume(m), e12.exit("gfmFootnoteCallLabelMarker"), i(m));
  }
}
function o8(e12, i) {
  let l = e12.length;
  for (; l--; )
    if (e12[l][1].type === "labelImage" && e12[l][0] === "enter") {
      e12[l][1];
      break;
    }
  e12[l + 1][1].type = "data", e12[l + 3][1].type = "gfmFootnoteCallLabelMarker";
  const a = { type: "gfmFootnoteCall", start: Object.assign({}, e12[l + 3][1].start), end: Object.assign({}, e12[e12.length - 1][1].end) }, o = { type: "gfmFootnoteCallMarker", start: Object.assign({}, e12[l + 3][1].end), end: Object.assign({}, e12[l + 3][1].end) };
  o.end.column++, o.end.offset++, o.end._bufferIndex++;
  const s = { type: "gfmFootnoteCallString", start: Object.assign({}, o.end), end: Object.assign({}, e12[e12.length - 1][1].start) }, c = { type: "chunkString", contentType: "string", start: Object.assign({}, s.start), end: Object.assign({}, s.end) }, d = [e12[l + 1], e12[l + 2], ["enter", a, i], e12[l + 3], e12[l + 4], ["enter", o, i], ["exit", o, i], ["enter", s, i], ["enter", c, i], ["exit", c, i], ["exit", s, i], e12[e12.length - 2], e12[e12.length - 1], ["exit", a, i]];
  return e12.splice(l, e12.length - l + 1, ...d), e12;
}
function s8(e12, i, l) {
  const a = this, o = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let s = 0, c;
  return d;
  function d(p) {
    return e12.enter("gfmFootnoteCall"), e12.enter("gfmFootnoteCallLabelMarker"), e12.consume(p), e12.exit("gfmFootnoteCallLabelMarker"), m;
  }
  function m(p) {
    return p !== 94 ? l(p) : (e12.enter("gfmFootnoteCallMarker"), e12.consume(p), e12.exit("gfmFootnoteCallMarker"), e12.enter("gfmFootnoteCallString"), e12.enter("chunkString").contentType = "string", g);
  }
  function g(p) {
    if (s > 999 || p === 93 && !c || p === null || p === 91 || Ct(p))
      return l(p);
    if (p === 93) {
      e12.exit("chunkString");
      const x = e12.exit("gfmFootnoteCallString");
      return o.includes(di(a.sliceSerialize(x))) ? (e12.enter("gfmFootnoteCallLabelMarker"), e12.consume(p), e12.exit("gfmFootnoteCallLabelMarker"), e12.exit("gfmFootnoteCall"), i) : l(p);
    }
    return Ct(p) || (c = true), s++, e12.consume(p), p === 92 ? y : g;
  }
  function y(p) {
    return p === 91 || p === 92 || p === 93 ? (e12.consume(p), s++, g) : g(p);
  }
}
function c8(e12, i, l) {
  const a = this, o = a.parser.gfmFootnotes || (a.parser.gfmFootnotes = []);
  let s, c = 0, d;
  return m;
  function m(S) {
    return e12.enter("gfmFootnoteDefinition")._container = true, e12.enter("gfmFootnoteDefinitionLabel"), e12.enter("gfmFootnoteDefinitionLabelMarker"), e12.consume(S), e12.exit("gfmFootnoteDefinitionLabelMarker"), g;
  }
  function g(S) {
    return S === 94 ? (e12.enter("gfmFootnoteDefinitionMarker"), e12.consume(S), e12.exit("gfmFootnoteDefinitionMarker"), e12.enter("gfmFootnoteDefinitionLabelString"), e12.enter("chunkString").contentType = "string", y) : l(S);
  }
  function y(S) {
    if (c > 999 || S === 93 && !d || S === null || S === 91 || Ct(S))
      return l(S);
    if (S === 93) {
      e12.exit("chunkString");
      const E = e12.exit("gfmFootnoteDefinitionLabelString");
      return s = di(a.sliceSerialize(E)), e12.enter("gfmFootnoteDefinitionLabelMarker"), e12.consume(S), e12.exit("gfmFootnoteDefinitionLabelMarker"), e12.exit("gfmFootnoteDefinitionLabel"), x;
    }
    return Ct(S) || (d = true), c++, e12.consume(S), S === 92 ? p : y;
  }
  function p(S) {
    return S === 91 || S === 92 || S === 93 ? (e12.consume(S), c++, y) : y(S);
  }
  function x(S) {
    return S === 58 ? (e12.enter("definitionMarker"), e12.consume(S), e12.exit("definitionMarker"), o.includes(s) || o.push(s), ct(e12, v, "gfmFootnoteDefinitionWhitespace")) : l(S);
  }
  function v(S) {
    return i(S);
  }
}
function f8(e12, i, l) {
  return e12.check(No, i, e12.attempt(r8, i, l));
}
function d8(e12) {
  e12.exit("gfmFootnoteDefinition");
}
function h8(e12, i, l) {
  const a = this;
  return ct(e12, o, "gfmFootnoteDefinitionIndent", 5);
  function o(s) {
    const c = a.events[a.events.length - 1];
    return c && c[1].type === "gfmFootnoteDefinitionIndent" && c[2].sliceSerialize(c[1], true).length === 4 ? i(s) : l(s);
  }
}
function m8(e12) {
  let l = (e12 || {}).singleTilde;
  const a = { name: "strikethrough", tokenize: s, resolveAll: o };
  return l == null && (l = true), { text: { 126: a }, insideSpan: { null: [a] }, attentionMarkers: { null: [126] } };
  function o(c, d) {
    let m = -1;
    for (; ++m < c.length; )
      if (c[m][0] === "enter" && c[m][1].type === "strikethroughSequenceTemporary" && c[m][1]._close) {
        let g = m;
        for (; g--; )
          if (c[g][0] === "exit" && c[g][1].type === "strikethroughSequenceTemporary" && c[g][1]._open && c[m][1].end.offset - c[m][1].start.offset === c[g][1].end.offset - c[g][1].start.offset) {
            c[m][1].type = "strikethroughSequence", c[g][1].type = "strikethroughSequence";
            const y = { type: "strikethrough", start: Object.assign({}, c[g][1].start), end: Object.assign({}, c[m][1].end) }, p = { type: "strikethroughText", start: Object.assign({}, c[g][1].end), end: Object.assign({}, c[m][1].start) }, x = [["enter", y, d], ["enter", c[g][1], d], ["exit", c[g][1], d], ["enter", p, d]], v = d.parser.constructs.insideSpan.null;
            v && fi(x, x.length, 0, rf(v, c.slice(g + 1, m), d)), fi(x, x.length, 0, [["exit", p, d], ["enter", c[m][1], d], ["exit", c[m][1], d], ["exit", y, d]]), fi(c, g - 1, m - g + 3, x), m = g + x.length - 2;
            break;
          }
      }
    for (m = -1; ++m < c.length; )
      c[m][1].type === "strikethroughSequenceTemporary" && (c[m][1].type = "data");
    return c;
  }
  function s(c, d, m) {
    const g = this.previous, y = this.events;
    let p = 0;
    return x;
    function x(S) {
      return g === 126 && y[y.length - 1][1].type !== "characterEscape" ? m(S) : (c.enter("strikethroughSequenceTemporary"), v(S));
    }
    function v(S) {
      const E = Xl(g);
      if (S === 126)
        return p > 1 ? m(S) : (c.consume(S), p++, v);
      if (p < 2 && !l)
        return m(S);
      const N = c.exit("strikethroughSequenceTemporary"), C = Xl(S);
      return N._open = !C || C === 2 && !!E, N._close = !E || E === 2 && !!C, d(S);
    }
  }
}
class p8 {
  constructor() {
    this.map = [], this.index = /* @__PURE__ */ new Map();
  }
  add(i, l, a) {
    g8(this, i, l, a);
  }
  consume(i) {
    if (this.map.sort(function(s, c) {
      return s[0] - c[0];
    }), this.map.length === 0)
      return;
    let l = this.map.length;
    const a = [];
    for (; l > 0; )
      l -= 1, a.push(i.slice(this.map[l][0] + this.map[l][1]), this.map[l][2]), i.length = this.map[l][0];
    a.push(i.slice()), i.length = 0;
    let o = a.pop();
    for (; o; ) {
      for (const s of o)
        i.push(s);
      o = a.pop();
    }
    this.map.length = 0, this.index.clear();
  }
}
function g8(e12, i, l, a) {
  if (l === 0 && a.length === 0)
    return;
  const o = e12.index.get(i);
  if (o) {
    o[1] += l, o[2].push(...a);
    return;
  }
  const s = [i, l, a];
  e12.map.push(s), e12.index.set(i, s);
}
function y8(e12, i) {
  let l = false;
  const a = [];
  for (; i < e12.length; ) {
    const o = e12[i];
    if (l) {
      if (o[0] === "enter")
        o[1].type === "tableContent" && a.push(e12[i + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
      else if (o[1].type === "tableContent") {
        if (e12[i - 1][1].type === "tableDelimiterMarker") {
          const s = a.length - 1;
          a[s] = a[s] === "left" ? "center" : "right";
        }
      } else if (o[1].type === "tableDelimiterRow")
        break;
    } else
      o[0] === "enter" && o[1].type === "tableDelimiterRow" && (l = true);
    i += 1;
  }
  return a;
}
function x8() {
  return { flow: { null: { name: "table", tokenize: v8, resolveAll: b8 } } };
}
function v8(e12, i, l) {
  const a = this;
  let o = 0, s = 0, c;
  return d;
  function d(U) {
    let X = a.events.length - 1;
    for (; X > -1; ) {
      const { type: j } = a.events[X][1];
      if (j === "lineEnding" || j === "linePrefix")
        X--;
      else
        break;
    }
    const ie = X > -1 ? a.events[X][1].type : null, re = ie === "tableHead" || ie === "tableRow" ? M : m;
    return re === M && a.parser.lazy[a.now().line] ? l(U) : re(U);
  }
  function m(U) {
    return e12.enter("tableHead"), e12.enter("tableRow"), g(U);
  }
  function g(U) {
    return U === 124 || (c = true, s += 1), y(U);
  }
  function y(U) {
    return U === null ? l(U) : Xe(U) ? s > 1 ? (s = 0, a.interrupt = true, e12.exit("tableRow"), e12.enter("lineEnding"), e12.consume(U), e12.exit("lineEnding"), v) : l(U) : et(U) ? ct(e12, y, "whitespace")(U) : (s += 1, c && (c = false, o += 1), U === 124 ? (e12.enter("tableCellDivider"), e12.consume(U), e12.exit("tableCellDivider"), c = true, y) : (e12.enter("data"), p(U)));
  }
  function p(U) {
    return U === null || U === 124 || Ct(U) ? (e12.exit("data"), y(U)) : (e12.consume(U), U === 92 ? x : p);
  }
  function x(U) {
    return U === 92 || U === 124 ? (e12.consume(U), p) : p(U);
  }
  function v(U) {
    return a.interrupt = false, a.parser.lazy[a.now().line] ? l(U) : (e12.enter("tableDelimiterRow"), c = false, et(U) ? ct(e12, S, "linePrefix", a.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4)(U) : S(U));
  }
  function S(U) {
    return U === 45 || U === 58 ? N(U) : U === 124 ? (c = true, e12.enter("tableCellDivider"), e12.consume(U), e12.exit("tableCellDivider"), E) : Y(U);
  }
  function E(U) {
    return et(U) ? ct(e12, N, "whitespace")(U) : N(U);
  }
  function N(U) {
    return U === 58 ? (s += 1, c = true, e12.enter("tableDelimiterMarker"), e12.consume(U), e12.exit("tableDelimiterMarker"), C) : U === 45 ? (s += 1, C(U)) : U === null || Xe(U) ? T(U) : Y(U);
  }
  function C(U) {
    return U === 45 ? (e12.enter("tableDelimiterFiller"), A(U)) : Y(U);
  }
  function A(U) {
    return U === 45 ? (e12.consume(U), A) : U === 58 ? (c = true, e12.exit("tableDelimiterFiller"), e12.enter("tableDelimiterMarker"), e12.consume(U), e12.exit("tableDelimiterMarker"), k) : (e12.exit("tableDelimiterFiller"), k(U));
  }
  function k(U) {
    return et(U) ? ct(e12, T, "whitespace")(U) : T(U);
  }
  function T(U) {
    return U === 124 ? S(U) : U === null || Xe(U) ? !c || o !== s ? Y(U) : (e12.exit("tableDelimiterRow"), e12.exit("tableHead"), i(U)) : Y(U);
  }
  function Y(U) {
    return l(U);
  }
  function M(U) {
    return e12.enter("tableRow"), B(U);
  }
  function B(U) {
    return U === 124 ? (e12.enter("tableCellDivider"), e12.consume(U), e12.exit("tableCellDivider"), B) : U === null || Xe(U) ? (e12.exit("tableRow"), i(U)) : et(U) ? ct(e12, B, "whitespace")(U) : (e12.enter("data"), G(U));
  }
  function G(U) {
    return U === null || U === 124 || Ct(U) ? (e12.exit("data"), B(U)) : (e12.consume(U), U === 92 ? J : G);
  }
  function J(U) {
    return U === 92 || U === 124 ? (e12.consume(U), G) : G(U);
  }
}
function b8(e12, i) {
  let l = -1, a = true, o = 0, s = [0, 0, 0, 0], c = [0, 0, 0, 0], d = false, m = 0, g, y, p;
  const x = new p8();
  for (; ++l < e12.length; ) {
    const v = e12[l], S = v[1];
    v[0] === "enter" ? S.type === "tableHead" ? (d = false, m !== 0 && (Sb(x, i, m, g, y), y = void 0, m = 0), g = { type: "table", start: Object.assign({}, S.start), end: Object.assign({}, S.end) }, x.add(l, 0, [["enter", g, i]])) : S.type === "tableRow" || S.type === "tableDelimiterRow" ? (a = true, p = void 0, s = [0, 0, 0, 0], c = [0, l + 1, 0, 0], d && (d = false, y = { type: "tableBody", start: Object.assign({}, S.start), end: Object.assign({}, S.end) }, x.add(l, 0, [["enter", y, i]])), o = S.type === "tableDelimiterRow" ? 2 : y ? 3 : 1) : o && (S.type === "data" || S.type === "tableDelimiterMarker" || S.type === "tableDelimiterFiller") ? (a = false, c[2] === 0 && (s[1] !== 0 && (c[0] = c[1], p = dc(x, i, s, o, void 0, p), s = [0, 0, 0, 0]), c[2] = l)) : S.type === "tableCellDivider" && (a ? a = false : (s[1] !== 0 && (c[0] = c[1], p = dc(x, i, s, o, void 0, p)), s = c, c = [s[1], l, 0, 0])) : S.type === "tableHead" ? (d = true, m = l) : S.type === "tableRow" || S.type === "tableDelimiterRow" ? (m = l, s[1] !== 0 ? (c[0] = c[1], p = dc(x, i, s, o, l, p)) : c[1] !== 0 && (p = dc(x, i, c, o, l, p)), o = 0) : o && (S.type === "data" || S.type === "tableDelimiterMarker" || S.type === "tableDelimiterFiller") && (c[3] = l);
  }
  for (m !== 0 && Sb(x, i, m, g, y), x.consume(i.events), l = -1; ++l < i.events.length; ) {
    const v = i.events[l];
    v[0] === "enter" && v[1].type === "table" && (v[1]._align = y8(i.events, l));
  }
  return e12;
}
function dc(e12, i, l, a, o, s) {
  const c = a === 1 ? "tableHeader" : a === 2 ? "tableDelimiter" : "tableData", d = "tableContent";
  l[0] !== 0 && (s.end = Object.assign({}, _a(i.events, l[0])), e12.add(l[0], 0, [["exit", s, i]]));
  const m = _a(i.events, l[1]);
  if (s = { type: c, start: Object.assign({}, m), end: Object.assign({}, m) }, e12.add(l[1], 0, [["enter", s, i]]), l[2] !== 0) {
    const g = _a(i.events, l[2]), y = _a(i.events, l[3]), p = { type: d, start: Object.assign({}, g), end: Object.assign({}, y) };
    if (e12.add(l[2], 0, [["enter", p, i]]), a !== 2) {
      const x = i.events[l[2]], v = i.events[l[3]];
      if (x[1].end = Object.assign({}, v[1].end), x[1].type = "chunkText", x[1].contentType = "text", l[3] > l[2] + 1) {
        const S = l[2] + 1, E = l[3] - l[2] - 1;
        e12.add(S, E, []);
      }
    }
    e12.add(l[3] + 1, 0, [["exit", p, i]]);
  }
  return o !== void 0 && (s.end = Object.assign({}, _a(i.events, o)), e12.add(o, 0, [["exit", s, i]]), s = void 0), s;
}
function Sb(e12, i, l, a, o) {
  const s = [], c = _a(i.events, l);
  o && (o.end = Object.assign({}, c), s.push(["exit", o, i])), a.end = Object.assign({}, c), s.push(["exit", a, i]), e12.add(l + 1, 0, s);
}
function _a(e12, i) {
  const l = e12[i], a = l[0] === "enter" ? "start" : "end";
  return l[1][a];
}
const w8 = { name: "tasklistCheck", tokenize: E8 };
function S8() {
  return { text: { 91: w8 } };
}
function E8(e12, i, l) {
  const a = this;
  return o;
  function o(m) {
    return a.previous !== null || !a._gfmTasklistFirstContentOfListItem ? l(m) : (e12.enter("taskListCheck"), e12.enter("taskListCheckMarker"), e12.consume(m), e12.exit("taskListCheckMarker"), s);
  }
  function s(m) {
    return Ct(m) ? (e12.enter("taskListCheckValueUnchecked"), e12.consume(m), e12.exit("taskListCheckValueUnchecked"), c) : m === 88 || m === 120 ? (e12.enter("taskListCheckValueChecked"), e12.consume(m), e12.exit("taskListCheckValueChecked"), c) : l(m);
  }
  function c(m) {
    return m === 93 ? (e12.enter("taskListCheckMarker"), e12.consume(m), e12.exit("taskListCheckMarker"), e12.exit("taskListCheck"), d) : l(m);
  }
  function d(m) {
    return Xe(m) ? i(m) : et(m) ? e12.check({ tokenize: C8 }, i, l)(m) : l(m);
  }
}
function C8(e12, i, l) {
  return ct(e12, a, "whitespace");
  function a(o) {
    return o === null ? l(o) : i(o);
  }
}
function k8(e12) {
  return iS([KR(), a8(), m8(e12), x8(), S8()]);
}
const N8 = {};
function _8(e12) {
  const i = this, l = e12 || N8, a = i.data(), o = a.micromarkExtensions || (a.micromarkExtensions = []), s = a.fromMarkdownExtensions || (a.fromMarkdownExtensions = []), c = a.toMarkdownExtensions || (a.toMarkdownExtensions = []);
  o.push(k8(l)), s.push($R()), c.push(QR(l));
}
const JS = L.memo(function({ text: i, className: l = "" }) {
  return b.jsx("div", { className: `lc-markdown ${l}`, children: b.jsx(tO, { remarkPlugins: [_8], components: { a: ({ href: a, children: o }) => b.jsx("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: o }), img: ({ src: a, alt: o }) => a != null && a.startsWith("/api/assets/") ? b.jsx(lcAssetImage, { src: a, alt: o || "返回的图片", loading: "lazy" }) : b.jsx("a", { href: a, target: "_blank", rel: "noopener noreferrer", children: o || "查看图片链接" }), table: ({ children: a }) => b.jsx("div", { className: "lc-markdown-table", tabIndex: 0, "aria-label": "可横向滚动的表格", children: b.jsx("table", { children: a }) }), pre: ({ children: a }) => b.jsx("pre", { tabIndex: 0, children: a }) }, children: i }) });
}), Eb = ["1024x1024", "1536x1024", "1024x1536"], Ku = ["auto", "low", "medium", "high"], Cb = [...Ku, "xhigh", "max"], kb = ["1024x1024", "1536x1536", "2048x2048", "1536x1024", "2304x1536", "3072x2048", "1024x1536", "1536x2304", "2048x3072", "1536x864", "2048x1152", "2560x1440", "3840x2160", "864x1536", "1152x2048", "1440x2560", "2160x3840", "1024x768", "1536x1152", "2048x1536", "3072x2304", "768x1024", "1152x1536", "1536x2048", "2304x3072"], z8 = /* @__PURE__ */ new Set(["gpt-image-2", "gpt-image-2-2026-04-21"]), Nb = /* @__PURE__ */ new Set(["gpt-image-2.5-flare", "gpt-image-2.5-flare-2026-09-08", "gpt-image-2.5-sunburst", "gpt-image-2.5-sunburst-2026-09-08"]), _b = /* @__PURE__ */ new Set(["gpt-image-2.6-flare", "gpt-image-2.6-sunburst"]), T8 = /* @__PURE__ */ new Set(["gpt-image-1", "gpt-image-1-mini", "gpt-image-1.5"]);
function Wp(e12) {
  return z8.has(e12) || Nb.has(e12) ? { sizing: "flexible", sizes: [...kb], qualities: [...Nb.has(e12) ? Cb : Ku], autoSize: true, maxCount: 10 } : T8.has(e12) ? { sizing: "fixed", sizes: [...Eb], qualities: [...Ku], autoSize: true, maxCount: 10, note: e12 === "gpt-image-1" ? "此旧模型已从 OpenAI 官方下线；兼容服务的可用性以供应商为准。" : void 0 } : _b.has(e12) || e12 === "chatgpt-image-latest" ? { sizing: "standard-manual", sizes: [...Eb], qualities: [..._b.has(e12) ? Cb : Ku], autoSize: true, maxCount: 10, note: "提供已确认的标准尺寸；其他尺寸可手动填写，支持范围请核对供应商说明。" } : e12 === "dall-e-2" ? { sizing: "fixed", sizes: ["256x256", "512x512", "1024x1024"], qualities: ["standard"], autoSize: false, maxCount: 10, note: "DALL·E 2 已从 OpenAI 官方下线；这里保留兼容服务的旧版选项。" } : e12 === "dall-e-3" ? { sizing: "fixed", sizes: ["1024x1024", "1792x1024", "1024x1792"], qualities: ["standard", "hd"], autoSize: false, maxCount: 1, note: "DALL·E 3 已从 OpenAI 官方下线；这里保留兼容服务的旧版选项。" } : e12 === "demo-image" ? { sizing: "flexible", sizes: [...kb], qualities: [...Ku], autoSize: true, maxCount: 10, note: "本地演示可试选参数；返回的演示图固定为 256 × 256，不调用 API。" } : { sizing: "manual", sizes: [], qualities: null, autoSize: false, note: "此模型的尺寸、质量和张数范围尚未确认，请按供应商说明填写。" };
}
function eg(e12) {
  const i = /^(\d+)x(\d+)$/.exec(e12 || "");
  if (!i)
    return null;
  const l = Number(i[1]), a = Number(i[2]);
  return Number.isSafeInteger(l) && Number.isSafeInteger(a) && l > 0 && a > 0 ? { width: l, height: a } : null;
}
function WS(e12) {
  const i = eg(e12);
  if (!i)
    return "";
  const l = (o, s) => s ? l(s, o % s) : o, a = l(i.width, i.height);
  return `${i.width / a}:${i.height / a}`;
}
function eE(e12) {
  const i = eg(e12);
  return !!i && i.width * i.height > 2560 * 1440;
}
function A8(e12) {
  const i = Wp(e12);
  return i.sizes.map((l) => ({ value: l, ratio: WS(l), label: l.replace("x", " × "), experimental: i.sizing === "flexible" && e12 !== "demo-image" && eE(l) }));
}
function tE(e12, i) {
  const l = Wp(e12), a = [];
  if (!i.imageResolution && !i.imageAspectRatio && i.size && l.sizing !== "manual")
    if (i.size === "auto")
      l.autoSize || a.push("当前模型不支持自动尺寸，请重新选择分辨率。");
    else if (l.sizing === "fixed")
      l.sizes.includes(i.size) || a.push(`已保留尺寸 ${i.size}，当前模型不支持；请重新选择比例与分辨率。`);
    else {
      const o = eg(i.size);
      if (!o)
        a.push("尺寸格式应为宽x高，例如 1536x864。");
      else if (l.sizing === "flexible") {
        (o.width % 16 || o.height % 16) && a.push("宽和高都必须是 16 的倍数。"), Math.max(o.width, o.height) > 3840 && a.push("任一边不能超过 3840 像素。"), Math.max(o.width, o.height) / Math.min(o.width, o.height) > 3 && a.push("长边与短边的比例不能超过 3:1。");
        const s = o.width * o.height;
        (s < 655360 || s > 8294400) && a.push("总像素数需在 655,360 到 8,294,400 之间。");
      }
    }
  return i.quality && l.qualities && !l.qualities.includes(i.quality) && a.push(`已保留质量 ${i.quality}，当前模型不支持；请重新选择质量。`), i.n !== void 0 && (!Number.isInteger(i.n) || i.n < 1 || l.maxCount !== void 0 && i.n > l.maxCount) && a.push(l.maxCount === 1 ? "当前模型每次只支持 1 张，请修改张数。" : `张数需为 1${l.maxCount ? `–${l.maxCount}` : " 或更大"}的整数。`), a;
}
const M8 = { auto: "自动", low: "低 · low", medium: "中 · medium", high: "高 · high", xhigh: "极高 · xhigh", max: "最高 · max", standard: "标准 · standard", hd: "高清 · hd" }, j8 = { "1:1": "1:1 方形", "3:2": "3:2 横向", "2:3": "2:3 纵向", "16:9": "16:9 宽屏", "9:16": "9:16 竖屏", "4:3": "4:3 横向", "3:4": "3:4 纵向", "7:4": "7:4 横向", "4:7": "4:7 纵向" };
// Replace the complete existing nE function with this snippet.
// Bundle dependencies: b (JSX runtime), L (React), Wp, M8, eg, WS, tE, jp, vc.
const lc12ImageRatios = ["auto", "1:1", "9:16", "16:9", "3:4", "4:3", "2:3", "3:2", "9:21", "21:9"];
const lc12ImageTiers = ["auto", "1k", "2k", "4k"];
const lc12ImageLongEdges = { "1k": 1024, "2k": 2048, "4k": 3840 };

function lc12ImageSelection(params, model) {
  const oldDimensions = eg(params.size);
  const oldRatio = WS(params.size);
  const ratio = lc12ImageRatios.includes(params.imageAspectRatio)
    ? params.imageAspectRatio
    : lc12ImageRatios.includes(oldRatio) ? oldRatio : "auto";
  const legacyEdge = oldDimensions ? Math.max(oldDimensions.width, oldDimensions.height) : 0;
  const legacyTier = Object.keys(lc12ImageLongEdges).find((tier) => lc12ImageLongEdges[tier] === legacyEdge);
  const tier = lc12ImageTiers.includes(params.imageResolution)
    ? params.imageResolution
    : legacyTier || "auto";
  const explicitSizing = params.imageAspectRatio !== void 0 || params.imageResolution !== void 0;
  let dimensions = !explicitSizing ? oldDimensions : null;
  if (explicitSizing && ratio !== "auto") {
    const [width, height] = ratio.split(":").map(Number);
    const longEdge = lc12ImageLongEdges[tier] || 1024;
    const factor = longEdge / Math.max(width, height);
    dimensions = { width: Math.round(width * factor), height: Math.round(height * factor) };
  }
  const sizing = explicitSizing ? window.LightCanvasSizing.preview(model,params) : null;
  if(explicitSizing) dimensions=sizing?.apiSize?eg(sizing.apiSize):null;
  return { ratio, tier, dimensions, explicitSizing, sizing };
}

function nE({ model: e12, params: i, onChange: l, compact: a = false, disabled: o = false }) {
  const id = L.useId();
  const capability = Wp(e12);
  const selection = lc12ImageSelection(i,e12);
  // UI and request builder share native size validation.
  const issues = [...tE(e12, { ...i, size: void 0 }),...(selection.sizing?.error?[selection.sizing.error]:[])];
  const retainedQuality = i.quality && capability.qualities && !capability.qualities.includes(i.quality);
  const setRatio = (ratio) => l({
    imageAspectRatio: ratio,
    imageResolution: ratio !== "auto" && selection.tier === "auto" ? "1k" : selection.tier,
    size: void 0
  });
  const setTier = (tier) => l({ imageAspectRatio: selection.ratio, imageResolution: tier, size: void 0 });
  const dimensionsText = selection.dimensions
    ? `${selection.dimensions.width} × ${selection.dimensions.height} 像素`
    : selection.tier !== "auto" ? `长边 ${lc12ImageLongEdges[selection.tier]} 像素 · 比例由模型决定` : "尺寸与比例由模型决定";
  const deliveryText = selection.sizing?.error || selection.sizing?.note || "按接口默认尺寸返回原图。";
  return b.jsxs("fieldset", {
    className: `image-options image-options-v12 nodrag nowheel${a ? " is-compact" : ""}`,
    disabled: o,
    "aria-label": "图片生成参数",
    "aria-describedby": `${id}-delivery${issues.length ? ` ${id}-issues` : ""}`,
    children: [
      b.jsx("legend", { children: "图片设置" }),
      b.jsxs("div", { className: "lc12-image-option-group", children: [
        b.jsx("span", { className: "lc12-image-option-label", id: `${id}-ratio-label`, children: "画面比例" }),
        b.jsx("div", { className: "lc12-ratio-grid", role: "group", "aria-labelledby": `${id}-ratio-label`, children: lc12ImageRatios.map((ratio) => {
          const [w, h] = ratio === "auto" ? [1, 1] : ratio.split(":").map(Number);
          const factor = 20 / Math.max(w, h);
          return b.jsxs("button", {
            type: "button",
            className: "lc12-ratio-choice nodrag nowheel",
            "aria-pressed": selection.ratio === ratio,
            "aria-label": ratio === "auto" ? "画面比例：智能" : `画面比例：${ratio}`,
            title: ratio === "auto" ? "智能：跟随模型返回的画面比例" : `${ratio} 画面比例`,
            onClick: () => setRatio(ratio),
            children: [
              b.jsx("span", { className: "lc12-ratio-preview", "aria-hidden": true, children: ratio === "auto"
                ? b.jsx(vc, { size: 18, strokeWidth: 1.5 })
                : b.jsx("span", { className: "lc12-ratio-frame", style: { width: `${Math.max(7, w * factor)}px`, height: `${Math.max(7, h * factor)}px` } }) }),
              b.jsx("span", { children: ratio === "auto" ? "智能" : ratio })
            ]
          }, ratio);
        }) })
      ] }),
      b.jsxs("div", { className: "lc12-image-option-group", children: [
        b.jsx("span", { className: "lc12-image-option-label", id: `${id}-resolution-label`, children: "分辨率" }),
        b.jsx("div", { className: "lc12-resolution-grid", role: "group", "aria-labelledby": `${id}-resolution-label`, children: lc12ImageTiers.map((tier) => b.jsx("button", {
          type: "button",
          className: "lc12-resolution-choice nodrag nowheel",
          "aria-pressed": selection.tier === tier,
          "aria-label": `分辨率：${tier === "auto" ? "自动" : tier.toUpperCase()}`,
          title: tier === "auto" ? "自动：智能比例使用接口默认；固定比例使用 1K" : `${tier.toUpperCase()} · 长边 ${lc12ImageLongEdges[tier]} 像素`,
          onClick: () => setTier(tier),
          children: tier === "auto" ? "自动" : tier.toUpperCase()
        }, tier)) }),
        b.jsx("p", { className: "lc12-image-dimensions", "aria-live": "polite", children: dimensionsText })
      ] }),
      b.jsxs("div", { className: "image-option-row image-option-secondary", children: [
        b.jsxs("label", { className: "image-option-field", children: [
          b.jsx("span", { children: "生成质量" }),
          capability.qualities ? b.jsxs("select", { className: "nodrag nowheel", "aria-label": "图片生成质量", value: i.quality ?? "", onChange: (event) => l({ quality: event.target.value || void 0 }), children: [
            b.jsx("option", { value: "", children: "接口默认" }),
            capability.qualities.map((quality) => b.jsx("option", { value: quality, children: M8[quality] || quality }, quality)),
            retainedQuality && b.jsx("option", { value: i.quality, children: `${i.quality} · 待调整` })
          ] }) : b.jsx("input", { className: "nodrag nowheel", "aria-label": "图片生成质量", placeholder: "接口默认", value: i.quality ?? "", onChange: (event) => l({ quality: event.target.value || void 0 }) })
        ] }),
        b.jsxs("label", { className: "image-option-field", children: [
          b.jsx("span", { children: "生成张数" }),
          b.jsx("input", { className: "nodrag nowheel", "aria-label": "图片生成张数", type: "number", inputMode: "numeric", min: "1", max: capability.maxCount, step: "1", placeholder: "默认 1", value: i.n ?? "", onChange: (event) => l({ n: event.target.value === "" ? void 0 : Number(event.target.value) }) })
        ] })
      ] }),
      b.jsx("p", { id: `${id}-delivery`, className: "image-option-help lc12-image-delivery", children: deliveryText }),
      issues.length > 0 && b.jsxs("div", { id: `${id}-issues`, className: "image-option-issues", role: "status", children: [b.jsx(jp, { size: 14, "aria-hidden": true }), b.jsx("div", { children: issues.map((issue) => b.jsx("p", { children: issue }, issue)) })] })
    ]
  });
}

function lc12HasLinkedImages(nodeId,context) {
  return context.workspace?.edges.some(edge => {
    if(edge.target !== nodeId || edge.data?.kind === "generation") return false;
    const source=context.workspace.nodes.find(node=>node.id===edge.source);
    const ids=source?.data.runId ? context.runs[source.data.runId]?.assetIds : source?.data.assetIds;
    return !!ids?.length;
  });
}
function lc12ReferenceImages({nodeId,context}) {
  const refs=window.LightCanvasImages.resolve(context.workspace,nodeId,context.runs,context.assets);
  if(!refs.length)return null;
  return b.jsxs("section",{className:"linked-reference-images","aria-label":"已选择的参考图",children:[
    b.jsxs("div",{className:"reference-heading",children:[b.jsx(vc,{size:14}),"参考图",b.jsx("span",{children:refs.length+" 张"})]}),
    b.jsx("div",{className:"reference-thumbnails",children:refs.map(ref=>b.jsxs("div",{className:"reference-thumbnail",children:[
      b.jsx(lcAssetImage,{src:window.__lcAssetUrl(ref.assetId),alt:ref.label,draggable:false}),
      b.jsx("button",{className:"image-mention-chip",title:`在提示词中引用 @${ref.label}`,"aria-label":`引用 @${ref.label}`,onMouseDown:event=>event.preventDefault(),onClick:()=>document.getElementById('lc-prompt-'+nodeId)?.dispatchEvent(new CustomEvent('lc-mention-image',{detail:{assetId:ref.assetId}})),children:'@'+ref.label}),
      b.jsx("button",{className:"node-icon",title:"移除这张参考图","aria-label":`移除 ${ref.label}`,onClick:()=>context.removeImage(nodeId,ref.assetId),children:b.jsx(Yl,{size:13})})
    ]},ref.assetId))}),
    b.jsx("p",{children:"输入 @ 选图。发送时仅将标记替换为对应的“第几张参考图”，其他文字不变。"})
  ]});
}

// Offscreen images hold no image lease. Reader uses originals; cards use previews.
function lcAssetImage(props) {
  const {src,original=false,...rest}=props;
  const ref=L.useRef(null), [url,setUrl]=L.useState('');
  const id=typeof src==='string' && src.startsWith('#lc-asset=')?decodeURIComponent(src.slice(10)):null;
  L.useEffect(()=>{
    if(!id)return;
    let visible=false, disposed=false, lease=null, serial=0;
    const observer=new IntersectionObserver(entries=>{
      const next=entries[0].isIntersecting;if(next===visible)return;visible=next;const ticket=++serial;
      if(!next){setUrl('');lease?.release();lease=null;return;}
      window.__lcAcquireImage(id,original).then(value=>{
        if(disposed||!visible||ticket!==serial){value.release();return;}lease=value;setUrl(value.url);
      }).catch(error=>{if(!disposed){setUrl('');rest.onError?.(error)}});
    },{rootMargin:'240px'});
    observer.observe(ref.current);
    return ()=>{disposed=true;serial++;observer.disconnect();lease?.release();};
  },[id,original]);
  return b.jsx('img',{...rest,ref,src:id?(url||undefined):src,decoding:'async',loading:'lazy'});
}

function lc15PromptEditor({nodeId,data,context,note}) {
  const [draft,setDraft]=L.useState(data.prompt||''),[query,setQuery]=L.useState(null),[active,setActive]=L.useState(0);
  const composing=L.useRef(false),field=L.useRef(null),menu=L.useRef(null);
  const images=window.LightCanvasImages.candidates(context.workspace,nodeId,context.runs,context.assets);
  const options=query?images.filter(image=>('@'+image.label).includes(query.text.replace('@图片','@图'))||image.name.toLowerCase().includes(query.text.replace('@','').toLowerCase())):[];
  const bounds=field.current?.getBoundingClientRect(),menuWidth=Math.min(window.innerWidth-24,Math.max(260,bounds?.width||300)),menuHeight=Math.min(260,window.innerHeight-24);
  const menuStyle=bounds?{position:'fixed',width:menuWidth,left:Math.max(12,Math.min(bounds.left,window.innerWidth-menuWidth-12)),right:'auto',top:bounds.bottom+menuHeight+8>window.innerHeight-12?Math.max(12,bounds.top-menuHeight-4):bounds.bottom+4,maxHeight:menuHeight}:undefined;
  L.useEffect(()=>{const list=menu.current,option=list?.querySelector('[aria-selected="true"]');if(list&&option){if(option.offsetTop<list.scrollTop)list.scrollTop=option.offsetTop;else if(option.offsetTop+option.offsetHeight>list.scrollTop+list.clientHeight)list.scrollTop=option.offsetTop+option.offsetHeight-list.clientHeight;}},[active,query]);
  L.useEffect(()=>{if(!composing.current)setDraft(data.prompt||'');},[data.prompt]);
  const detect=(value,caret)=>{
    if(note||composing.current){setQuery(null);return;}
    const found=/@(?:图|图片)?\d*$/.exec(value.slice(0,caret));
    setQuery(found?{start:found.index,end:caret,text:found[0]}:null);setActive(0);
  };
  const commit=value=>{setDraft(value);if(value!==data.prompt)context.update(nodeId,{prompt:value});};
  const choose=(image,replaceQuery=true)=>{
    const element=field.current;if(!element)return;
    const start=replaceQuery&&query?query.start:element.selectionStart,end=replaceQuery&&query?query.end:element.selectionEnd;
    const text=element.value.slice(0,start)+'@'+image.label+' '+element.value.slice(end),caret=start+image.label.length+2;
    setDraft(text);setQuery(null);context.mentionImage(nodeId,image.assetId,text);
    requestAnimationFrame(()=>{element.focus({preventScroll:true});element.setSelectionRange(caret,caret);});
  };
  L.useEffect(()=>{const element=field.current;const insert=event=>{const image=images.find(item=>item.assetId===event.detail.assetId);if(image)choose(image,false);};element?.addEventListener('lc-mention-image',insert);return()=>element?.removeEventListener('lc-mention-image',insert);});
  return b.jsxs("div",{className:"prompt-editor nodrag nopan nowheel",children:[b.jsx("textarea",{
    ref:field,id:'lc-prompt-'+nodeId,className:"prompt-input nodrag nopan nowheel","aria-label":note?"笔记内容":"提示词",
    "aria-expanded":!!query,"aria-controls":query?'lc-images-'+nodeId:undefined,
    placeholder:note?"记下想法…":data.mode==='image'?"描述画面，输入 @ 引用已连接的图片…":"写下提示词，输入 @ 引用图片…",
    value:draft,onPointerDown:event=>event.stopPropagation(),onClick:event=>{event.stopPropagation();detect(event.currentTarget.value,event.currentTarget.selectionStart);},
    onCompositionStart:()=>{composing.current=true;setQuery(null);},
    onCompositionEnd:event=>{composing.current=false;commit(event.currentTarget.value);detect(event.currentTarget.value,event.currentTarget.selectionStart);},
    onChange:event=>{setDraft(event.currentTarget.value);if(!composing.current){context.update(nodeId,{prompt:event.currentTarget.value});detect(event.currentTarget.value,event.currentTarget.selectionStart);}},
    onBlur:event=>{composing.current=false;commit(event.currentTarget.value);setQuery(null);},
    onKeyDown:event=>{
      event.stopPropagation();if(composing.current||event.nativeEvent.isComposing||event.keyCode===229)return;
      if(query&&event.key==='Escape'){event.preventDefault();setQuery(null);return;}
      if(query&&options.length&&!event.ctrlKey&&!event.metaKey&&['ArrowDown','ArrowUp','Enter','Tab'].includes(event.key)){
        event.preventDefault();if(event.key==='ArrowDown')setActive(index=>(index+1)%options.length);else if(event.key==='ArrowUp')setActive(index=>(index+options.length-1)%options.length);else choose(options[active%options.length]);return;
      }
      if(!note&&(event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();if(!event.repeat)context.send(nodeId);}
    },onKeyUp:event=>event.stopPropagation()
  }),query&&Jc.createPortal(b.jsxs("div",{ref:menu,className:"image-mention-menu",style:menuStyle,id:'lc-images-'+nodeId,role:'listbox',"aria-label":"选择参考图片",children:[
    b.jsx("div",{className:"image-mention-heading",children:"选择参考图片"}),
    options.length?options.map((image,index)=>b.jsxs("button",{type:'button',role:'option',"aria-selected":active%options.length===index,className:active%options.length===index?'is-active':'',onMouseDown:event=>event.preventDefault(),onClick:()=>choose(image),children:[b.jsx(lcAssetImage,{src:window.__lcAssetUrl(image.assetId),alt:''}),b.jsxs("span",{children:[b.jsx("strong",{children:'@'+image.label}),b.jsx("small",{children:image.name})]})]},image.assetId)):b.jsx("p",{children:images.length?'没有匹配的图片':data.mode==='image'?'请先连接参考图片到当前节点':'先粘贴或导入图片到画布'})
  ]}),document.body)]});
}
function lc15ClipboardImages(clipboard) {
  const normalize=file=>{
    const mime=file.type?.startsWith('image/')?file.type:({png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp'}[file.name?.split('.').pop()?.toLowerCase()]);
    return mime?.startsWith('image/')?(file.type===mime?file:new File([file],file.name,{type:mime})):null;
  };
  const files=Array.from(clipboard?.files||[]).map(normalize).filter(Boolean);
  return files.length?files:Array.from(clipboard?.items||[]).filter(item=>item.kind==='file').map(item=>item.getAsFile()).filter(Boolean).map(normalize).filter(Boolean);
}

function lc12ImageDelivery({run}) {
  if (!run || !Array.isArray(run.imageDelivery) || !run.imageDelivery.length) return null;
  return b.jsx("div",{className:"image-delivery-details",children:run.imageDelivery.map((item,index) => b.jsxs("div",{className:"image-delivery-line",children:[
    b.jsxs("span",{children:[item.width," × ",item.height, " · ",item.method === "native" ? "API 原图" : item.method === "original-fallback" ? "原图 · 本地处理未完成" : "本地调整"]}),
    item.warning && b.jsx("span",{role:"status",children:item.warning}),
    item.originalAssetId && item.originalAssetId !== item.finalAssetId && b.jsx("a",{href:"/api/assets/"+item.originalAssetId,download:item.originalName || "api-original-"+(index+1),children:"下载原图"})
  ]},item.finalAssetId || index))});
}


function lc13NodeOptions({data,children}) {
  const image=data.mode === "image";
  const selection=lc12ImageSelection(data.params || {},data.model);
  const model=data.model?.startsWith("demo-") ? "本地演示" : data.model || "选择模型";
  const parts=[model];
  if(image) {
    parts.push(selection.ratio === "auto" ? "智能比例" : selection.ratio);
    parts.push(selection.tier === "auto" ? (selection.dimensions ? selection.dimensions.width+"×"+selection.dimensions.height : "自动尺寸") : selection.tier.toUpperCase());
  }
  const label=image ? "模型与图片设置" : "聊天模型";
  return b.jsxs("details",{className:"node-configuration nodrag nowheel",children:[
    b.jsxs("summary",{className:"node-configuration-toggle",title:"点击展开或收起设置", "aria-label":label,children:[
      b.jsx(I2,{size:15,"aria-hidden":true}),
      b.jsxs("span",{className:"node-configuration-copy",children:[b.jsx("span",{className:"node-configuration-title",children:label}),b.jsx("span",{className:"node-configuration-current",title:parts.join(" · "),children:parts.join(" · ")})]}),
      b.jsx(Wu,{size:15,className:"node-configuration-chevron","aria-hidden":true})
    ]}),
    b.jsx("div",{className:"node-configuration-content",children})
  ]});
}


function lc15ReferenceImageNode({id,data,selected,context}) {
  const alias=window.LightCanvasImages.catalog(context.workspace,context.runs,context.assets).find(image=>image.assetId===data.assetIds?.[0])?.label;
  return b.jsxs("article",{className:`canvas-card reference-image-card ${selected?"is-selected":""}`,"data-testid":"node-reference-image",children:[
    b.jsxs("header",{className:"node-drag-handle",children:[
      b.jsxs("span",{className:"node-title",children:[b.jsx(vc,{size:16}),b.jsx("span",{children:data.label||"参考图片"})]}),
      b.jsxs("span",{className:"node-tools nodrag",children:[
        b.jsx("button",{className:"node-icon",title:"引用到其他节点","aria-label":"引用到其他节点",onClick:()=>context.connect(id),children:b.jsx(B2,{size:14})}),
        b.jsx("button",{className:"node-icon",title:"删除节点","aria-label":"删除节点",onClick:()=>context.remove(id),children:b.jsx(bc,{size:14})})
      ]})
    ]}),
    b.jsxs("div",{className:"nodrag nopan reference-image-body",children:[
      ...(data.assetIds||[]).map(assetId=>b.jsx("a",{href:window.__lcAssetUrl(assetId),target:"_blank",rel:"noopener noreferrer",className:"reference-image-preview",title:"打开原图",draggable:true,onDragStart:event=>{event.dataTransfer.setData("application/x-light-canvas-reference",id);event.dataTransfer.effectAllowed="link";},children:b.jsx(lcAssetImage,{src:window.__lcAssetUrl(assetId),alt:context.assets[assetId]?.name||"粘贴的参考图片",draggable:false})},assetId)),
      b.jsx("p",{className:"reference-image-caption",children:(alias?"@"+alias+" · ":"")+"原图 · 可连线或在提示词中 @ 引用"}),
      b.jsxs("button",{className:"reference-image-button",onClick:()=>context.follow(id),children:[b.jsx(wM,{size:15}),"作为参考图",b.jsx("span",{children:"继续生图"})]})
    ]}),
    b.jsx(Ya,{type:"source",position:Ie.Right,className:"canvas-handle",isConnectable:true})
  ]});
}

const iE = L.createContext(null), D8 = { queued: "排队中", running: "正在生成", completed: "已完成", failed: "请求失败", cancelled: "已停止", unknown: "结果待核实" }, O8 = L.memo(function({ id: i, data: l, selected: a }) {
  var v, S;
  const o = L.useContext(iE), s = L.useRef(null), c = l.runId ? o.runs[l.runId] : void 0, d = (c == null ? void 0 : c.status) === "running" || (c == null ? void 0 : c.status) === "queued", m = l.kind === "input", g = l.kind === "note", y = o.providers.filter((E) => E.protocol === "mock" || (l.mode === "chat" ? E.protocol !== "images" : E.protocol === "images")), p = (E) => {
    if (E === l.mode)
      return;
    const N = o.providers.find((k) => k.id === l.providerId), A = N && (N.protocol === "mock" || (E === "chat" ? N.protocol !== "images" : N.protocol === "images")) ? N : o.providers.find((k) => k.protocol !== "mock" && (E === "image" ? k.protocol === "images" : k.protocol !== "images")) || o.providers.find((k) => k.protocol === "mock");
    o.update(i, { mode: E, providerId: (A == null ? void 0 : A.id) || "demo", model: (A == null ? void 0 : A.protocol) === "mock" ? E === "chat" ? "demo-chat" : "demo-image" : (A == null ? void 0 : A.models[0]) || "" });
  }, x = g ? b.jsx(q2, { size: 16 }) : l.kind === "image" || l.mode === "image" ? b.jsx(vc, { size: 16 }) : b.jsx(wr, { size: 16 });
  if(l.kind === "image" && !l.runId) return b.jsx(lc15ReferenceImageNode,{id:i,data:l,selected:a,context:o});
  return b.jsxs("article", { className: `canvas-card ${a ? "is-selected" : ""} ${m ? "input-card" : g ? "note-card" : "output-card"}`, "data-testid": `node-${l.kind}`, children: [b.jsx(Ya, { type: "target", position: Ie.Left, className: "canvas-handle", isConnectable: m }), b.jsxs("header", { className: "node-drag-handle", children: [b.jsxs("span", { className: "node-title", children: [x, b.jsx("span", { children: l.label || "未命名节点" })] }), b.jsxs("span", { className: "node-tools nodrag", children: [b.jsx("button", { className: "node-icon", title: "引用到其他节点", "aria-label": "引用到其他节点", onClick: () => o.connect(i), children: b.jsx(B2, { size: 14 }) }), b.jsx("button", { className: "node-icon", title: "删除节点", "aria-label": "删除节点", onClick: () => o.remove(i), children: b.jsx(bc, { size: 14 }) })] })] }), m || g ? b.jsxs("div", { className: "nodrag node-editor", onDrop: (E) => {
    const reference = E.dataTransfer.getData("application/x-light-canvas-reference");
    if (reference) { E.preventDefault(); E.stopPropagation(); o.reference(reference, i); return; }
    E.dataTransfer.files.length && (E.preventDefault(), E.stopPropagation(), o.upload(i, Array.from(E.dataTransfer.files)));
  }, onDragOver: (E) => {
    (E.dataTransfer.types.includes("Files") || E.dataTransfer.types.includes("application/x-light-canvas-reference")) && E.preventDefault();
  }, children: [m && b.jsx(lc12ReferenceImages, {nodeId:i, context:o}), m && b.jsxs("div", { className: "mode-tabs", children: [b.jsxs("button", { className: l.mode === "chat" ? "active" : "", onClick: () => p("chat"), children: [b.jsx(wr, { size: 14 }), "聊天"] }), b.jsxs("button", { className: l.mode === "image" ? "active" : "", onClick: () => p("image"), children: [b.jsx(vc, { size: 14 }), "生图"] }), b.jsx("button", { className: "mode-settings", "aria-label": "节点参数", title: "参数与上下文", onClick: () => o.showParams(i), children: b.jsx(I2, { size: 14 }) })] }), b.jsx(lc15PromptEditor, {nodeId:i,data:l,context:o,note:g}), !m && l.assetIds.length > 0 && b.jsx("div", { className: "attachments", children: l.assetIds.map((E) => {
    var N, C;
    return b.jsxs("div", { className: "attachment", children: [b.jsx(lcAssetImage, { src: `/api/assets/${E}`, alt: ((N = o.assets[E]) == null ? void 0 : N.name) || "图片附件" }), b.jsx("span", { children: ((C = o.assets[E]) == null ? void 0 : C.name) || "原图" }), b.jsx("button", { className: "node-icon", title: "移除附件", onClick: () => o.update(i, { assetIds: l.assetIds.filter((A) => A !== E) }), children: b.jsx(Yl, { size: 12 }) })] }, E);
  }) }), m && b.jsxs(b.Fragment, { children: [b.jsxs(lc13NodeOptions, { data:l, children: [b.jsx("div", { className: "node-model", children: b.jsxs("select", { "aria-label": "节点模型", value: `${l.providerId}::${l.model}`, onChange: (E) => {
    const [N, ...C] = E.target.value.split("::");
    o.update(i, { providerId: N, model: C.join("::") });
  }, children: [y.map((E) => b.jsx("optgroup", { label: E.name, children: (E.protocol === "mock" ? [l.mode === "chat" ? "demo-chat" : "demo-image"] : E.models).map((N) => b.jsx("option", { value: `${E.id}::${N}`, children: E.protocol === "mock" ? "本地演示 · 不调用 API" : N }, N)) }, E.id)), !y.some((E) => E.id === l.providerId && (E.protocol === "mock" || E.models.includes(l.model))) && b.jsx("option", { value: `${l.providerId}::${l.model}`, children: l.model || "请选择模型" })] }) }), l.mode === "image" && b.jsx(nE, { model: l.model, params: l.params, compact: true, onChange: (E) => o.update(i, { params: { ...l.params, ...E } }) })] }), b.jsxs("div", { className: "input-bottom", children: [b.jsxs("div", { className: "input-tools", children: [b.jsx("button", { className: "node-icon", title: "添加图片原文件", "aria-label": "添加图片", onClick: () => {
    var E;
    return (E = s.current) == null ? void 0 : E.click();
  }, children: b.jsx(MM, { size: 16 }) }), b.jsx("button", { className: "node-icon", title: "查看实际发送内容", "aria-label": "查看实际发送内容", onClick: () => o.inspect(i), children: b.jsx(H2, { size: 16 }) }), b.jsx("span", { className: "input-shortcut", children: o.uploading[i] ? "正在保存图片…" : "Ctrl ↵ 发送" })] }), b.jsx("button", { className: "send-button", title: "发送原文与所选图片", "aria-label": "发送", disabled: !!o.uploading[i] || !l.prompt.trim() && !l.assetIds.length && !lc12HasLinkedImages(i, o), onClick: () => o.send(i), children: b.jsx(O2, { size: 18 }) })] }), b.jsx("input", { hidden: true, ref: s, type: "file", accept: "image/png,image/jpeg,image/webp", multiple: true, onChange: (E) => {
    o.upload(i, Array.from(E.target.files || [])), E.target.value = "";
  } })] })] }) : b.jsxs("div", { className: "nodrag result-body", children: [b.jsxs("div", { className: "result-meta", children: [b.jsxs("span", { className: "run-status", children: [d ? b.jsx(CM, { size: 13, className: "spin" }) : (c == null ? void 0 : c.status) === "completed" ? b.jsx(xM, { size: 13 }) : b.jsx(jp, { size: 13 }), " ", c ? D8[c.status] : "等待提交"] }), b.jsx("span", { children: (c == null ? void 0 : c.providerName) || "" })] }), l.kind === "image" ? (v = c == null ? void 0 : c.assetIds) != null && v.length ? b.jsx("div", { className: "image-grid", children: c.assetIds.map((E) => b.jsx("button", { className: "image-preview", draggable:true, title:"点击查看大图，或拖到输入节点作为参考", onDragStart:event => {event.dataTransfer.setData("application/x-light-canvas-reference",i);event.dataTransfer.effectAllowed="link";}, onClick: () => l.runId && o.read(l.runId), children: b.jsx(lcAssetImage, { src: `/api/assets/${E}`, alt: "生成结果", draggable:false }) }, E)) }) : b.jsxs("div", { className: "image-wait", children: [b.jsx(vc, { size: 30 }), b.jsx("span", { children: d ? "正在等待图片返回…" : "图片会显示在这里" })] }) : b.jsxs("div", { className: "result-preview nowheel", children: [b.jsx(JS, { text: ((S = c == null ? void 0 : c.text) == null ? void 0 : S.slice(0, 2e3)) || (d ? "正在连接，等待响应…" : "") }), ((c == null ? void 0 : c.text.length) || 0) > 2e3 && b.jsx("div", { className: "preview-cut", children: "卡片显示部分内容，展开阅读全文" })] }), l.kind === "image" && b.jsx(lc12ImageDelivery, {run:c}), l.kind === "image" && c?.status === "completed" && c.assetIds?.length > 0 && b.jsxs("button", {className:"reference-image-button", onClick:() => o.follow(i), children:[b.jsx(wM,{size:15}),"作为参考图", b.jsx("span",{children:"继续生图"})]}), (c == null ? void 0 : c.error) && b.jsx("p", { className: "run-error", children: c.error }), b.jsxs("div", { className: "result-actions", children: [b.jsxs("button", { className: "text-btn", onClick: () => l.runId && o.read(l.runId), children: [b.jsx(U2, { size: 14 }), "展开阅读"] }), b.jsxs("div", { className: "result-action-icons", children: [b.jsx("button", { className: "node-icon", title: "独立窗口查看", "aria-label": "独立窗口查看", onClick: () => {
    if (l.runId) {
      const E = window.open(`/reader/${l.runId}`, `reader-${l.runId}`, "width=1120,height=850");
      E ? E.opener = null : o.read(l.runId);
    }
  }, children: b.jsx(L2, { size: 14 }) }), b.jsx("button", { className: "node-icon", title: "复制全文", "aria-label": "复制全文", onClick: () => o.copy((c == null ? void 0 : c.text) || ""), children: b.jsx(R2, { size: 14 }) }), d ? b.jsx("button", { className: "node-icon", title: "停止生成", "aria-label": "停止生成", onClick: () => l.runId && o.stop(l.runId), children: b.jsx(RM, { size: 14 }) }) : b.jsx("button", { className: "node-icon", title: l.kind === "image" ? "作为参考图继续生图" : "继续追问", "aria-label": l.kind === "image" ? "作为参考图继续生图" : "继续追问", disabled: (c == null ? void 0 : c.status) !== "completed", onClick: () => o.follow(i), children: b.jsx(wM, { size: 14 }) })] })] })] }), b.jsx(Ya, { type: "source", position: Ie.Right, className: "canvas-handle" })] });
}), Ta = () => crypto.randomUUID();
function zb(e12, i, l, a) {
  const o = l.find((s) => s.id === (a == null ? void 0 : a.providerId)) || l.find((s) => s.protocol !== "mock" && (e12 === "image" ? s.protocol === "images" : s.protocol !== "images")) || l.find((s) => s.protocol === "mock");
  return { id: Ta(), type: "canvas", position: i, data: { kind: "input", label: e12 === "image" ? "图片提示词" : "新的提示词", prompt: "", mode: e12, providerId: (o == null ? void 0 : o.id) || "demo", model: (o == null ? void 0 : o.protocol) === "mock" ? e12 === "image" ? "demo-image" : "demo-chat" : (o == null ? void 0 : o.models[0]) || "", systemPrompt: "", params: {}, assetIds: [], ...a } };
}
function Em(e12, i, l) {
  return { id: Ta(), source: e12, target: i, type: "default", pathOptions: { curvature: 0.3 }, data: { kind: l }, label: l === "generation" ? undefined : l === "history" ? "对话" : "引用", markerEnd: { type: "arrowclosed", color: "#999" }, style: { stroke: l === "reference" ? "#888" : "#aaa", strokeWidth: 1.3, strokeDasharray: l === "reference" ? "5 5" : void 0 }, labelStyle: { fill: "#666", fontSize: 11 }, labelBgStyle: { fill: "#f7f7f7" }, interactionWidth: 18 };
}
function Cm(e12, i, l) {
  var s;
  if (i === l || ((s = e12.nodes.find((c) => c.id === l)) == null ? void 0 : s.data.kind) !== "input" || e12.edges.some((c) => c.source === i && c.target === l))
    return false;
  const a = /* @__PURE__ */ new Set(), o = [l];
  for (; o.length; ) {
    const c = o.shift();
    if (c === i)
      return false;
    a.has(c) || (a.add(c), e12.edges.filter((d) => d.source === c).forEach((d) => o.push(d.target)));
  }
  return true;
}
// lc16 layout start — pure functions, covered by tests/layout.mjs.
function lc16NodeSize(node) {
  return {width:node.measured?.width || node.width || 350,height:node.measured?.height || node.height || (node.data?.kind === "input" ? 430 : 420)};
}
function lc16Intersects(a,b,gap=28) {
  return a.x < b.x+b.width+gap && a.x+a.width+gap > b.x && a.y < b.y+b.height+gap && a.y+a.height+gap > b.y;
}
function lc16Right(workspace,source,kind="input") {
  const size=lc16NodeSize({data:{kind}}),sourceSize=lc16NodeSize(source);
  const position={x:source.position.x+sourceSize.width+100,y:source.position.y};
  for(let pass=0;pass<=workspace.nodes.length;pass++) {
    const collisions=workspace.nodes.filter(node=>lc16Intersects({...position,...size},{...node.position,...lc16NodeSize(node)}));
    if(!collisions.length)break;
    position.y=Math.max(...collisions.map(node=>node.position.y+lc16NodeSize(node).height))+90;
  }
  return position;
}
// Transpose the established graph layout so generation flows from left to right.
function lc16Arrange(workspace,ids) {
  const selected=new Set(ids);
  if(!workspace.nodes.some(node=>selected.has(node.id)))return workspace;
  const transformed={...workspace,nodes:workspace.nodes.map(node=>{
    const size=lc16NodeSize(node);
    return {...node,position:{x:node.position.y,y:node.position.x},measured:{width:size.height,height:size.width}};
  })};
  const arranged=lc16ArrangeVertical(transformed,ids),positions=new Map(arranged.nodes.map(node=>[node.id,node.position]));
  return {...workspace,nodes:workspace.nodes.map(node=>selected.has(node.id)?{...node,position:{x:positions.get(node.id).y,y:positions.get(node.id).x}}:node)};
}
function lc16ArrangeVertical(workspace,ids) {
  const selected=new Set(ids),nodes=workspace.nodes.filter(node=>selected.has(node.id));
  if(!nodes.length) return workspace;
  const byId=new Map(nodes.map(node=>[node.id,node]));
  const edges=workspace.edges.filter(edge=>byId.has(edge.source)&&byId.has(edge.target)&&edge.source!==edge.target);
  const outgoing=new Map(nodes.map(node=>[node.id,[]])),incoming=new Map(nodes.map(node=>[node.id,[]]));
  for(const edge of edges){outgoing.get(edge.source).push(edge.target);incoming.get(edge.target).push(edge.source);}
  const order=(a,b)=>a.position.x-b.position.x||a.position.y-b.position.y||a.id.localeCompare(b.id);
  const pending=new Set(nodes.map(node=>node.id)),components=[];
  for(const first of [...nodes].sort((a,b)=>a.position.y-b.position.y||order(a,b))) {
    if(!pending.has(first.id)) continue;
    const queue=[first.id],component=[];pending.delete(first.id);
    while(queue.length){const id=queue.shift();component.push(id);for(const next of [...outgoing.get(id),...incoming.get(id)])if(pending.delete(next))queue.push(next);}
    components.push(component);
  }
  const groups=components.map(component=>{
    const degree=new Map(component.map(id=>[id,incoming.get(id).length])),rank=new Map(component.map(id=>[id,0]));
    const queue=component.filter(id=>degree.get(id)===0).sort((a,b)=>order(byId.get(a),byId.get(b))),visited=new Set();
    while(queue.length){const id=queue.shift();visited.add(id);for(const next of outgoing.get(id)){rank.set(next,Math.max(rank.get(next),rank.get(id)+1));degree.set(next,degree.get(next)-1);if(degree.get(next)===0)queue.push(next);}}
    const last=Math.max(0,...rank.values())+1;
    for(const id of component)if(!visited.has(id))rank.set(id,last);
    const rows=[];
    for(const id of component){const level=rank.get(id);(rows[level]||= []).push(byId.get(id));}
    const cellWidth=Math.max(...component.map(id=>lc16NodeSize(byId.get(id)).width)),gapX=90,gapY=100;
    const width=Math.max(...rows.filter(Boolean).map(row=>row.length*cellWidth+(row.length-1)*gapX));
    const positions=new Map();let y=0;
    for(const row of rows.filter(Boolean)){
      const parentX=node=>{const parents=incoming.get(node.id).map(id=>positions.get(id)).filter(Boolean);return parents.length?parents.reduce((sum,p)=>sum+p.x,0)/parents.length:node.position.x;};
      row.sort((a,b)=>parentX(a)-parentX(b)||order(a,b));
      const rowWidth=row.length*cellWidth+(row.length-1)*gapX;
      row.forEach((node,index)=>positions.set(node.id,{x:(width-rowWidth)/2+index*(cellWidth+gapX)+(cellWidth-lc16NodeSize(node).width)/2,y}));
      y+=Math.max(...row.map(node=>lc16NodeSize(node).height))+gapY;
    }
    const left=Math.min(...[...positions.values()].map(p=>p.x)),top=Math.min(...[...positions.values()].map(p=>p.y));
    for(const p of positions.values()){p.x-=left;p.y-=top;}
    return {positions,width:Math.max(...component.map(id=>positions.get(id).x+lc16NodeSize(byId.get(id)).width)),height:Math.max(...component.map(id=>positions.get(id).y+lc16NodeSize(byId.get(id)).height))};
  });
  const anchor={x:Math.min(...nodes.map(node=>node.position.x)),y:Math.min(...nodes.map(node=>node.position.y))};
  const maxWidth=Math.max(1400,...groups.map(group=>group.width)),positions=new Map();let x=0,y=0,rowHeight=0;
  for(const group of groups){if(x&&x+group.width>maxWidth){x=0;y+=rowHeight+160;rowHeight=0;}for(const [id,p] of group.positions)positions.set(id,{x:anchor.x+x+p.x,y:anchor.y+y+p.y});x+=group.width+160;rowHeight=Math.max(rowHeight,group.height);}
  // When aligning a selection, keep unselected nodes fixed and avoid covering them.
  const obstacles=workspace.nodes.filter(node=>!selected.has(node.id));
  for(let pass=0;pass<=obstacles.length;pass++){
    const collisions=[];
    for(const node of nodes)for(const obstacle of obstacles)if(lc16Intersects({...positions.get(node.id),...lc16NodeSize(node)},{...obstacle.position,...lc16NodeSize(obstacle)}))collisions.push({node,obstacle});
    if(!collisions.length) break;
    const shift=Math.max(...collisions.map(({node,obstacle})=>obstacle.position.y+lc16NodeSize(obstacle).height+100-positions.get(node.id).y));
    for(const p of positions.values())p.y+=shift;
  }
  return {...workspace,nodes:workspace.nodes.map(node=>positions.has(node.id)?{...node,position:positions.get(node.id)}:node)};
}
// lc16 layout end

function km(e12, i) {
  let l = { ...i };
  for (let a = 0; a < 30; a++) {
    if (!e12.nodes.some((o) => Math.abs(o.position.x - l.x) < 355 && Math.abs(o.position.y - l.y) < 350))
      return l;
    l.x += 400, a % 4 === 3 && (l.x = i.x, l.y += 430);
  }
  return l;
}
const R8 = (e12) => JSON.parse(JSON.stringify(e12)), lo = /* @__PURE__ */ new Map(), Nm = (e12) => !["running", "queued"].includes(e12.status), Tb = { queued: "等待返回", running: "正在生成", completed: "已完成", failed: "生成失败", cancelled: "已停止", unknown: "状态未知" }, L8 = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]';
function lE(e12) {
  if (!e12 || typeof e12 != "object")
    return false;
  const i = e12;
  return Number.isFinite(i.top) && i.top >= 0 && typeof i.atBottom == "boolean" && (i.anchor === void 0 || Number.isInteger(i.anchor) && i.anchor >= 0) && (i.offset === void 0 || Number.isFinite(i.offset));
}
function H8(e12) {
  if (lo.has(e12))
    return lo.get(e12);
  try {
    const i = sessionStorage.getItem(`light-canvas:reader:${e12}`), l = i ? JSON.parse(i) : void 0;
    return lE(l) ? l : void 0;
  } catch {
    return;
  }
}
function lcGenerationDetails({run}) {
  const snap=run.snapshot||{}, refs=snap.attachments||[], prompt=snap.transmittedPrompt??snap.currentPrompt??snap.request?.prompt;
  return b.jsxs("div",{className:"image-context-grid",children:[
    b.jsxs("section",{className:"image-reference-section",children:[b.jsxs("h2",{children:["参考图",refs.length>0&&b.jsx("span",{children:refs.length})]}),refs.length?b.jsx("div",{className:"generation-references",children:refs.map(ref=>{
      const id=ref.assetId||ref.id, name=ref.name||"未命名图片";
      return b.jsxs("figure",{children:[b.jsx("a",{href:window.__lcAssetUrl(id),target:"_blank",rel:"noopener noreferrer",title:"查看参考原图",children:b.jsx(lcAssetImage,{src:window.__lcAssetUrl(id),alt:name})}),b.jsx("figcaption",{title:name,children:name})]},id);
    })}):b.jsx("p",{className:"image-detail-muted",children:"未使用参考图"})]}),
    b.jsxs("section",{className:"image-prompt-section",children:[b.jsx("h2",{children:"提示词"}),b.jsx("p",{className:"generation-prompt",children:prompt||"这条记录未保存提示词。"})]})
  ]});
}
function lcCostBasisText(run){
  const s=run.costBasis||{},cur=s.currency||run.currency||'USD',sym=cur==='USD'?'$':`${cur} `,parts=[];
  const price=v=>`${sym}${parseFloat(Number(v).toPrecision(6))}`;
  if(typeof s.inputTokens==='number'&&typeof s.inputPrice==='number')parts.push(`输入 ${s.inputTokens.toLocaleString()} tokens × ${price(s.inputPrice)}/百万`);
  if(typeof s.outputTokens==='number'&&typeof s.outputPrice==='number')parts.push(`输出 ${s.outputTokens.toLocaleString()} tokens × ${price(s.outputPrice)}/百万`);
  if(typeof s.images==='number'&&typeof s.imagePrice==='number')parts.push(`${s.images} 张 × ${price(s.imagePrice)}/张`);
  return parts.length?parts.join(' + '):"以服务商账单为准";
}
function lcImageResult({run,initialAssetId}) {
  const ids=run.assetIds||[],[selected,setSelected]=L.useState(()=>Math.max(0,ids.indexOf(initialAssetId))),[loaded,setLoaded]=L.useState(''),[failed,setFailed]=L.useState('');
  const index=Math.min(selected,Math.max(0,ids.length-1)),id=ids[index],delivery=run.imageDelivery?.[index],name=delivery?.finalName||`生成图片 ${index+1}`,snap=run.snapshot||{},usage=run.usage||{};
  const input=usage.input_tokens??usage.prompt_tokens,output=usage.output_tokens??usage.completion_tokens,total=usage.total_tokens??(typeof input==='number'&&typeof output==='number'?input+output:undefined);
  const tokenDetail=[typeof input==='number'?`输入 ${input.toLocaleString()}`:'',typeof output==='number'?`输出 ${output.toLocaleString()}`:''].filter(Boolean).join(' · ');
  return b.jsxs("div",{className:"image-result-layout",children:[
    id?b.jsxs("figure",{className:"image-result-figure",children:[
      b.jsxs("div",{className:"image-result-stage",children:[b.jsx("a",{className:"image-result-open",href:window.__lcAssetUrl(id),target:"_blank",rel:"noopener noreferrer","data-image-viewer":"true",title:"在新窗口查看图片，点击切换原始分辨率","aria-label":`在新窗口查看图片：${name}`,children:b.jsx(lcAssetImage,{key:id,src:window.__lcAssetUrl(id),alt:name,original:true,onLoad:()=>setLoaded(id),onError:()=>setFailed(id)})}),loaded!==id&&b.jsx("span",{className:"image-load-state",role:failed===id?'alert':'status',children:failed===id?"无法读取图片，请检查 data 文件夹中的原图文件。":"正在加载原图…"})]}),
      b.jsxs("figcaption",{children:[b.jsxs("div",{className:"image-result-caption",children:[b.jsx("span",{title:name,children:name}),delivery?.width&&delivery?.height&&b.jsx("small",{children:`${delivery.width} × ${delivery.height}`})]}),b.jsxs("a",{className:"image-download",href:window.__lcAssetUrl(id),download:name,children:[b.jsx(Xa,{size:15}),"下载图片"]})]})
    ]}):b.jsx("div",{className:"image-result-stage is-empty",children:b.jsx("p",{className:"image-detail-muted",children:_m(run)?"正在等待图片返回…":"这次请求没有生成图片"})}),
    ids.length>1&&b.jsx("div",{className:"image-result-filmstrip","aria-label":"本次生成图片",children:ids.map((assetId,i)=>b.jsx("button",{type:"button","aria-label":`查看第 ${i+1} 张图片`,"aria-pressed":index===i,onClick:()=>setSelected(i),children:b.jsx(lcAssetImage,{src:window.__lcAssetUrl(assetId),alt:`生成图片 ${i+1}`})},assetId))}),
    delivery?.warning&&b.jsx("p",{role:"status",className:"image-detail-muted",children:delivery.warning}),
    delivery?.method==="local-resize"&&b.jsx("p",{className:"image-detail-muted",children:"旧版记录：此图曾经过本地缩放或补边，画面比例不代表 API 原生出图比例。"}),
    b.jsx(lcGenerationDetails,{run}),
    b.jsxs("dl",{className:"image-result-facts",children:[
      b.jsxs("div",{className:"image-api-fact",children:[b.jsx("dt",{children:"API 接口"}),b.jsx("dd",{children:run.providerName||snap.providerName||"未记录"}),b.jsx("dd",{className:"image-detail-muted",children:run.model||snap.model||"未记录模型"})]}),
      b.jsxs("div",{children:[b.jsx("dt",{children:"预估费用"}),b.jsx("dd",{children:typeof run.cost==='number'?`${run.currency||'USD'} ${run.cost.toFixed(4)}`:"未提供"}),b.jsx("dd",{className:"image-detail-muted",children:lcCostBasisText(run)})]}),
      b.jsxs("div",{children:[b.jsx("dt",{children:"Token 消耗"}),b.jsx("dd",{children:typeof total==='number'?total.toLocaleString():"API 未返回总量"}),tokenDetail&&b.jsx("dd",{className:"image-detail-muted",children:tokenDetail})]}),
      b.jsxs("div",{children:[b.jsx("dt",{children:"生成时间"}),b.jsx("dd",{children:run.createdAt?new Date(run.createdAt).toLocaleString():"未记录"}),b.jsx("dd",{className:"image-detail-muted",children:Tb[run.status]||run.status})]})
    ]})
  ]});
}
function lcImageHistory({workspace, runs, assets, onDeleteImage}) {
  const [open,setOpen]=L.useState(false),[limit,setLimit]=L.useState(60),[selection,setSelection]=L.useState(null),[deleting,setDeleting]=L.useState(null),[deleteError,setDeleteError]=L.useState(""),scroll=L.useRef(0),grid=L.useRef(null);
  const close=L.useCallback(()=>{if(!deleting)setOpen(false)},[deleting]),back=L.useCallback(()=>setSelection(null),[]);
  const removeImage=async(run,id,name)=>{
    if(deleting)return;
    if(!window.confirm(`永久删除“${name}”？\n\n将删除原始图片、生成副本、缩略图和对应记录，并从所有画布和参考引用中移除。此操作无法撤销。`))return;
    setDeleteError('');setDeleting(id);
    try {await onDeleteImage(run.id,id)}catch(error){setDeleteError(error.message||'删除失败，请重试。')}finally{setDeleting(null)}
  };
  const images=Object.values(runs).filter(run=>run.workspaceId===workspace?.id&&run.mode==='image').sort((a,b)=>String(b.createdAt).localeCompare(String(a.createdAt))).flatMap(run=>(run.assetIds||[]).map((id,index)=>({run,id,index})));
  L.useEffect(()=>{if(open&&!selection&&grid.current)grid.current.scrollTop=scroll.current},[open,selection]);
  return b.jsxs(b.Fragment,{children:[b.jsxs("button",{className:"workspace-row",disabled:!workspace,onClick:()=>{setLimit(60);scroll.current=0;setOpen(true)},children:[b.jsx(vc,{size:17}),b.jsx("span",{children:"生图历史"})]}),
    open&&!selection&&b.jsx(hc,{title:"生图历史",wide:true,onClose:close,children:b.jsxs("div",{className:"image-history",ref:grid,onScroll:e=>{scroll.current=e.currentTarget.scrollTop},children:[
      deleteError&&b.jsx("p",{className:"history-delete-error",role:"alert",children:deleteError}),
      b.jsxs("div",{className:"image-history-summary",children:[b.jsx("span",{children:workspace?.name||"当前画布"}),b.jsx("span",{children:`${images.length} 张图片`})]}),
      images.length?b.jsx("div",{className:"image-history-grid",children:images.slice(0,limit).map(({run,id,index})=>{
        const name=assets[id]?.name||run.imageDelivery?.[index]?.finalName||"生成图片";
        return b.jsxs("div",{className:"history-tile",children:[b.jsxs("button",{type:"button",className:"history-result",disabled:!!deleting,onClick:()=>setSelection({runId:run.id,assetId:id}),"aria-label":`查看图片结果：${name}`,children:[b.jsx("span",{className:"history-image-mat",children:b.jsx(lcAssetImage,{src:window.__lcAssetUrl(id),alt:name})}),b.jsx("span",{className:"history-image-name",title:name,children:name})]}),b.jsx("button",{type:"button",className:"history-delete",disabled:!!deleting||_m(run),title:deleting===id?"正在删除…":"永久删除图片","aria-label":`永久删除图片：${name}`,onClick:()=>removeImage(run,id,name),children:b.jsx(deleting===id?CM:bc,{size:14,className:deleting===id?'spin':undefined})})]},run.id+':'+id);})}):b.jsxs("div",{className:"history-empty",children:[b.jsx(vc,{size:32,strokeWidth:1.3}),b.jsx("p",{children:"还没有生成的图片"}),b.jsx("small",{children:"在当前画布生成图片后，会自动保存在这里。"})]}),
      images.length>limit&&b.jsx("button",{className:"btn history-more",onClick:()=>setLimit(n=>n+60),children:"显示更多图片"})
    ]})}),open&&selection&&b.jsx(rE,{key:selection.runId,runId:selection.runId,initialAssetId:selection.assetId,onClose:back})
  ]});
}

function rE({ runId: e12, onClose: i, standalone: l = false, initialAssetId }) {
  const [a, o] = L.useState(null), [s, c] = L.useState(""), [d, m] = L.useState(true), [g, y] = L.useState(""), [p, x] = L.useState(false), [v, S] = L.useState(() => {
    try {
      const ce = Number(localStorage.getItem("light-canvas:reader-font"));
      return ce >= 15 && ce <= 23 ? ce : 17;
    } catch {
      return 17;
    }
  }), [E, N] = L.useState(false), [C, A] = L.useState(""), k = L.useDeferredValue(C.trim()), [T, Y] = L.useState(0), [M, B] = L.useState(0), [G, J] = L.useState(""), [U, X] = L.useState(""), [ie, re] = L.useState(false), [j, D] = L.useState(0), H = L.useRef(null), V = L.useRef(null), $ = L.useRef(null), F = L.useRef(null), _ = L.useRef([]), se = L.useRef(""), he = L.useRef(true), R = L.useRef(false), O = L.useRef({ text: "", assets: "" }), te = L.useRef(void 0), pe = L.useRef(void 0), me = L.useRef(void 0), ne = L.useRef(false), xe = L.useRef(Promise.resolve()), Se = L.useRef(/* @__PURE__ */ new Map()), fe = L.useRef(/* @__PURE__ */ new Set()), q = L.useRef(true), we = L.useRef(i);
  we.current = i;
  const Ce = L.useCallback((ce) => {
    J(ce), clearTimeout(pe.current), pe.current = setTimeout(() => J(""), 3500);
  }, []), Te = L.useCallback(() => {
    var be;
    const ce = V.current;
    if (!ce)
      return;
    const K = Array.from(((be = $.current) == null ? void 0 : be.querySelectorAll("p,h1,h2,h3,h4,li,pre,blockquote,table,figure")) || []), de = ce.getBoundingClientRect().top, Ne = K.findIndex((Ze) => Ze.getBoundingClientRect().bottom > de + 8);
    return { top: ce.scrollTop, anchor: Ne >= 0 ? Ne : void 0, offset: Ne >= 0 ? K[Ne].getBoundingClientRect().top - de : void 0, atBottom: ce.scrollHeight - ce.clientHeight - ce.scrollTop < 48 };
  }, []), Ae = L.useCallback((ce, K) => {
    const de = JSON.stringify(K);
    Se.current.get(ce) !== de && (Se.current.set(ce, de), xe.current = xe.current.catch(() => {
    }).then(async () => {
      try {
        await Hn("/preferences", { method: "PUT", body: JSON.stringify({ key: ce, value: K }), keepalive: true }), fe.current.delete(ce), q.current && !fe.current.size && X("");
      } catch {
        Se.current.get(ce) === de && Se.current.delete(ce), fe.current.add(ce), q.current && X("阅读设置暂存于当前浏览器，尚未同步到备份");
      }
    }));
  }, []), Ee = L.useCallback(() => {
    if (clearTimeout(me.current), !R.current)
      return;
    const ce = Te() || lo.get(e12);
    if (ce) {
      lo.set(e12, ce);
      try {
        sessionStorage.setItem(`light-canvas:reader:${e12}`, JSON.stringify(ce));
      } catch {
      }
      ne.current && Ae(`reader:${e12}`, ce);
    }
  }, [Te, e12, Ae]), qe = L.useCallback((ce) => {
    var be;
    const K = V.current;
    if (!K)
      return;
    if (ce.atBottom && he.current) {
      K.scrollTop = K.scrollHeight;
      return;
    }
    const de = (be = $.current) == null ? void 0 : be.querySelectorAll("p,h1,h2,h3,h4,li,pre,blockquote,table,figure"), Ne = ce.anchor === void 0 || de == null ? void 0 : de[ce.anchor];
    K.scrollTop = Ne ? K.scrollTop + Ne.getBoundingClientRect().top - K.getBoundingClientRect().top - (ce.offset || 0) : ce.top;
  }, []);
  L.useEffect(() => {
    let ce = false, K;
    R.current = false, ne.current = false;
    const de = H8(e12);
    te.current = de, he.current = de ? de.atBottom : true, o(null), m(true), c(""), y("");
    const Ne = (Ze) => {
      ce || Ze.id !== e12 || (o((Ve) => Ve && (Ze.seq !== void 0 && Ve.seq !== void 0 && Ze.seq <= Ve.seq || Ze.seq === void 0 && Date.parse(Ze.updatedAt) < Date.parse(Ve.updatedAt)) ? Ve : Ze), m(false), c(""), Nm(Ze) && (y(""), K == null || K.close()));
    }, be = async () => {
      try {
        return l && await Rc(), await Hn("/preferences");
      } catch {
        ce || (fe.current.add("load"), X("阅读设置暂存于当前浏览器，尚未同步到备份"));
        return;
      }
    };
    return Promise.all([Hn(`/runs/${encodeURIComponent(e12)}`), be()]).then(([Ze, Ve]) => {
      if (ce)
        return;
      ne.current = true;
      const Ke = Ve == null ? void 0 : Ve[`reader:${e12}`];
      if (lE(Ke)) {
        te.current = Ke, he.current = Ke.atBottom, lo.set(e12, Ke);
        try {
          sessionStorage.setItem(`light-canvas:reader:${e12}`, JSON.stringify(Ke));
        } catch {
        }
      }
      const lt = Ve == null ? void 0 : Ve["reader-font"];
      if (typeof lt == "number" && [15, 17, 19, 21, 23].includes(lt)) {
        S(lt);
        try {
          localStorage.setItem("light-canvas:reader-font", String(lt));
        } catch {
        }
      }
      Ve && (fe.current.delete("load"), fe.current.size || X(""), lt === void 0 && Ae("reader-font", v), Ke === void 0 && de && Ae(`reader:${e12}`, de)), Ne(Ze), !Nm(Ze) && (K = new EventSource(`/api/runs/${encodeURIComponent(e12)}/events`), K.addEventListener("run", (Ye) => {
        try {
          Ne(JSON.parse(Ye.data));
        } catch {
          y("暂时无法读取更新，正在等待下一次同步");
        }
      }), K.onopen = () => !ce && y(""), K.onerror = () => !ce && y("连接中断，正在重新同步已有结果…"));
    }).catch((Ze) => {
      ce || (c(Ze instanceof Error ? Ze.message : "无法读取这条结果"), m(false));
    }), () => {
      ce = true, K == null || K.close(), clearTimeout(pe.current);
    };
  }, [e12, j, l, Ae]), L.useEffect(() => {
    const ce = document.activeElement, K = H.current, de = K == null ? void 0 : K.parentElement, Ne = [];
    return l || Array.from(document.body.children).forEach((be) => {
      be instanceof HTMLElement && be !== de && !["SCRIPT", "STYLE"].includes(be.tagName) && (Ne.push({ element: be, wasInert: be.inert }), be.inert = true);
    }), K == null || K.focus({ preventScroll: true }), () => {
      Ne.forEach((be) => {
        be.element.inert = be.wasInert;
      }), ce == null || ce.focus({ preventScroll: true });
    };
  }, [l]), L.useEffect(() => {
    q.current = true;
    const ce = () => Ee();
    return window.addEventListener("pagehide", ce), () => {
      ce(), q.current = false, clearTimeout(me.current), window.removeEventListener("pagehide", ce);
    };
  }, [Ee]), L.useLayoutEffect(() => {
    if (!a || !V.current)
      return;
    const ce = a.assetIds.join(","), K = O.current.text !== a.text || O.current.assets !== ce;
    O.current = { text: a.text, assets: ce }, R.current ? te.current ? (qe(te.current), te.current = void 0) : he.current ? V.current.scrollTop = V.current.scrollHeight : !he.current && K && re(true) : (R.current = true, te.current ? qe(te.current) : V.current.scrollTop = 0, te.current = void 0);
  }, [a, v, p, qe]), L.useEffect(() => {
    var ce;
    E && ((ce = F.current) == null || ce.focus());
  }, [E]), L.useEffect(() => {
    const ce = CSS.highlights, K = window.Highlight;
    if (_.current = [], ce == null || ce.delete("lc-reader-matches"), ce == null || ce.delete("lc-reader-active"), !k || !$.current) {
      Y(0), B(0), se.current = "";
      return;
    }
    const de = document.createTreeWalker($.current, NodeFilter.SHOW_TEXT), Ne = [];
    let be = "", Ze;
    for (; Ze = de.nextNode(); ) {
      const Ye = Ze;
      Ne.push({ node: Ye, start: be.length, end: be.length + Ye.length }), be += Ye.data;
    }
    const Ve = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), Ke = new RegExp(Ve, "giu");
    let lt;
    for (; (lt = Ke.exec(be)) && _.current.length < 500; ) {
      const Ye = Ne.find((zt) => zt.end > lt.index), It = Ne.find((zt) => zt.end >= lt.index + lt[0].length);
      if (Ye && It) {
        const zt = document.createRange();
        zt.setStart(Ye.node, lt.index - Ye.start), zt.setEnd(It.node, lt.index + lt[0].length - It.start), _.current.push(zt);
      }
    }
    return Y(_.current.length), B((Ye) => Math.min(Ye, Math.max(0, _.current.length - 1))), se.current !== k && _.current[0] && V.current && (he.current = false, V.current.scrollTop += _.current[0].getBoundingClientRect().top - V.current.getBoundingClientRect().top - V.current.clientHeight / 3), se.current = k, K && ce && ce.set("lc-reader-matches", new K(..._.current)), () => {
      ce == null || ce.delete("lc-reader-matches"), ce == null || ce.delete("lc-reader-active");
    };
  }, [k, a == null ? void 0 : a.text]), L.useEffect(() => {
    const ce = CSS.highlights, K = window.Highlight, de = _.current[M];
    ce && K && de && ce.set("lc-reader-active", new K(de));
  }, [M, T, k, a == null ? void 0 : a.text]);
  function Le(ce) {
    if (!_.current.length)
      return;
    const K = (M + ce + _.current.length) % _.current.length;
    B(K), he.current = false;
    const de = _.current[K], Ne = V.current;
    if (Ne && (Ne.scrollTop += de.getBoundingClientRect().top - Ne.getBoundingClientRect().top - Ne.clientHeight / 3), !CSS.highlights) {
      const be = window.getSelection();
      be == null || be.removeAllRanges(), be == null || be.addRange(de);
    }
  }
  function pt(ce) {
    te.current = Te(), S(ce);
    try {
      localStorage.setItem("light-canvas:reader-font", String(ce));
    } catch {
    }
    ne.current && Ae("reader-font", ce), clearTimeout(me.current), me.current = setTimeout(Ee, 500);
  }
  function vt() {
    te.current = Te(), x((ce) => !ce);
  }
  function Lt() {
    var ce;
    Ee(), (ce = we.current) == null || ce.call(we);
  }
  function Zt(ce) {
    var K;
    if (ce.stopPropagation(), !(ce.nativeEvent.isComposing || ce.keyCode === 229) && (ce.key === "Escape" && (E ? (N(false), A(""), (K = H.current) == null || K.focus()) : p ? vt() : l || Lt(), ce.preventDefault()), ce.key === "Tab" && !l && H.current)) {
      const de = Array.from(H.current.querySelectorAll(L8)).filter((Ze) => Ze.getClientRects().length > 0), Ne = de[0], be = de[de.length - 1];
      if (!Ne) {
        ce.preventDefault();
        return;
      }
      ce.shiftKey && (document.activeElement === Ne || document.activeElement === H.current) ? (ce.preventDefault(), be.focus()) : !ce.shiftKey && document.activeElement === be && (ce.preventDefault(), Ne.focus());
    }
  }
  async function Ht() {
    if (a != null && a.text)
      try {
        await navigator.clipboard.writeText(a.text), Ce("已复制完整原文");
      } catch {
        Ce("浏览器未允许复制，请选择文字后复制");
      }
  }
  const _t = b.jsx("div", { className: `lc-reader-overlay ${a?.mode === "image" ? "is-image" : ""} ${l ? "lc-reader-standalone" : ""} ${p ? "lc-reader-fullscreen" : ""}`, onKeyDown: Zt, onMouseDown: event => { if (!l && a?.mode === "image" && event.target === event.currentTarget) Lt(); }, children: b.jsxs("div", { className: "lc-reader", ref: H, role: l ? "main" : "dialog", "aria-modal": l ? void 0 : true, "aria-labelledby": "lc-reader-title", tabIndex: -1, children: [b.jsxs("header", { className: "lc-reader-header", children: [b.jsxs("div", { className: "lc-reader-heading", children: [b.jsx("h1", { id: "lc-reader-title", children: (a == null ? void 0 : a.mode) === "image" ? "图片结果" : "阅读结果" }), b.jsx("p", { children: a ? `${a.providerName} · ${a.model}` : "读取已保存的内容" })] }), b.jsxs("div", { className: "lc-reader-actions", children: [l ? b.jsxs("a", { className: "lc-reader-button", href: "/", title: "打开画布", children: [b.jsx(pM, { size: 17 }), b.jsx("span", { className: "lc-reader-action-label", children: "画布" })] }) : b.jsx("button", { className: "lc-reader-button", title: "在独立窗口阅读", "aria-label": "在独立窗口阅读", onClick: () => {
    Ee();
    const ce = window.open(`/reader/${encodeURIComponent(e12)}`, "_blank", "popup,width=1100,height=860");
    ce ? ce.opener = null : Ce("浏览器阻止了新窗口，请允许本站弹出窗口");
  }, children: b.jsx(L2, { size: 18 }) }), b.jsx("button", { className: "lc-reader-button", title: "查找文字", "aria-label": "查找文字", "aria-expanded": E, onClick: () => {
    N((ce) => !ce), E && A("");
  }, children: b.jsx(Oc, { size: 18 }) }), b.jsx("button", { className: "lc-reader-button", title: "复制完整原文", "aria-label": "复制完整原文", disabled: !(a != null && a.text), onClick: Ht, children: b.jsx(R2, { size: 18 }) }), b.jsx("button", { className: "lc-reader-button", title: "下载完整原文", "aria-label": "下载完整原文", disabled: !(a != null && a.text), onClick: () => a && $m(`结果-${a.id.slice(0, 8)}.md`, a.text), children: b.jsx(Xa, { size: 18 }) }), !l && b.jsx("button", { className: "lc-reader-button", title: p ? "恢复窗口" : "全屏阅读", "aria-label": p ? "恢复窗口" : "全屏阅读", onClick: vt, children: p ? b.jsx(NM, { size: 18 }) : b.jsx(U2, { size: 18 }) }), !l && b.jsx("button", { className: "lc-reader-button", title: "关闭阅读窗", "aria-label": "关闭阅读窗", onClick: Lt, children: b.jsx(Yl, { size: 20 }) })] })] }), b.jsxs("div", { className: "lc-reader-meta", children: [b.jsx("span", { className: "lc-reader-status", "aria-live": "polite", children: d ? "读取中…" : a ? Tb[a.status] : "无法读取" }), a && b.jsxs("span", { children: [a.text.length.toLocaleString(), " 字符", a.imported ? " · 已导入" : ""] }), b.jsxs("label", { className: "lc-reader-font", children: [b.jsx(LM, { size: 16, "aria-hidden": "true" }), b.jsx("span", { className: "lc-sr-only", children: "正文字号" }), b.jsx("select", { "aria-label": "正文字号", value: v, disabled: d, onChange: (ce) => pt(Number(ce.target.value)), children: [15, 17, 19, 21, 23].map((ce) => b.jsxs("option", { value: ce, children: [ce, " px"] }, ce)) })] })] }), E && b.jsxs("div", { className: "lc-reader-search", children: [b.jsx(Oc, { size: 16, "aria-hidden": "true" }), b.jsx("input", { ref: F, value: C, onChange: (ce) => {
    A(ce.target.value), B(0);
  }, placeholder: "在本条结果中查找", "aria-label": "查找结果文字", onKeyDown: (ce) => {
    ce.key === "Enter" && !ce.nativeEvent.isComposing && (ce.preventDefault(), Le(ce.shiftKey ? -1 : 1));
  } }), b.jsx("span", { role: "status", children: k ? `${T ? M + 1 : 0} / ${T}${T === 500 ? "+" : ""}` : "" }), b.jsx("button", { className: "lc-reader-button", disabled: !T, "aria-label": "上一个匹配", onClick: () => Le(-1), children: b.jsx(yM, { size: 17 }) }), b.jsx("button", { className: "lc-reader-button", disabled: !T, "aria-label": "下一个匹配", onClick: () => Le(1), children: b.jsx(gM, { size: 17 }) }), b.jsx("button", { className: "lc-reader-button", "aria-label": "关闭查找", onClick: () => {
    N(false), A("");
  }, children: b.jsx(Yl, { size: 17 }) })] }), g && b.jsx("p", { className: "lc-reader-banner", role: "status", children: g }), b.jsx("div", { className: "lc-reader-scroll", ref: V, tabIndex: 0, "aria-label": "结果正文", onScroll: () => {
    const ce = V.current;
    ce && (he.current = ce.scrollHeight - ce.clientHeight - ce.scrollTop < 48, he.current && re(false), clearTimeout(me.current), me.current = setTimeout(Ee, 500));
  }, children: b.jsxs("article", { className: "lc-reader-article", ref: $, style: { fontSize: v }, children: [d && b.jsx("p", { className: "lc-reader-empty", role: "status", children: "正在读取结果…" }), s && b.jsxs("div", { className: "lc-reader-empty", role: "alert", children: [b.jsx("p", { children: s }), b.jsx("button", { className: "lc-reader-text-button", onClick: () => D((ce) => ce + 1), children: "重新读取" })] }), (a == null ? void 0 : a.error) && b.jsxs("div", { className: "lc-reader-error", role: "alert", children: [b.jsx("strong", { children: Tb[a.status] }), b.jsx("p", { children: a.error }), b.jsx("p", { children: "已返回的内容保留在下方。" })] }), a?.mode === "image" && b.jsx(lcImageResult,{key:a.id,run:a,initialAssetId}), (a == null ? void 0 : a.text) && b.jsx(JS, { text: a.text }), a == null || a.mode === "image" ? void 0 : a.assetIds.map((ce, K) => b.jsxs("figure", { className: "lc-reader-image", children: [b.jsx("a", { href: `/api/assets/${encodeURIComponent(ce)}`, target: "_blank", rel: "noopener noreferrer", title: "查看原始图片", children: b.jsx(lcAssetImage, { src: `/api/assets/${encodeURIComponent(ce)}`, alt: `生成结果 ${K + 1}`, original:true, onLoad: () => {
    te.current && qe(te.current);
  } }) }), b.jsxs("figcaption", { children: [b.jsxs("span", { children: [a.imageDelivery?.[K]?.finalName || `图片 ${K + 1}`] }), b.jsxs("a", { href: `/api/assets/${encodeURIComponent(ce)}?download=1`, download: true, children: [b.jsx(Xa, { size: 15 }), "下载原图"] })] })] }, ce)), a && !a.text && !a.assetIds.length && !a.error && b.jsx("p", { className: "lc-reader-empty", children: Nm(a) ? "这条结果没有返回正文或图片。" : "等待 API 返回内容…" })] }) }), ie && b.jsxs("button", { className: "lc-reader-latest", onClick: () => {
    V.current && (V.current.scrollTop = V.current.scrollHeight), he.current = true, re(false);
  }, children: [b.jsx(mM, { size: 16 }), "有新内容，回到最新"] }), b.jsxs("footer", { className: "lc-reader-footer", children: [b.jsx("span", { children: G || U || "阅读、复制和下载不会再次调用模型" }), a?.mode !== "image" && (a == null ? void 0 : a.cost) != null && b.jsxs("span", { children: [a.currency || "", " ", a.cost.toFixed(6)] })] }), b.jsx("span", { className: "lc-sr-only", role: "status", children: G })] }) });
  return l ? _t : Jc.createPortal(_t, document.body);
}
const B8 = { responses: "Responses", "chat-completions": "Chat Completions", images: "Images", mock: "本地演示（不联网）" }, Qu = (e12) => {
  var i, l, a;
  return { ...e12, apiKey: "", clearKey: false, modelText: e12.models.join(`
`), inputPriceText: ((i = e12.inputPrice) == null ? void 0 : i.toString()) || "", outputPriceText: ((l = e12.outputPrice) == null ? void 0 : l.toString()) || "", imagePriceText: ((a = e12.imagePrice) == null ? void 0 : a.toString()) || "", dirty: false };
}, xr = (e12) => e12 instanceof Error ? e12.message : "操作失败，请重试";
function U8({ providers: e12, onClose: i, onSaved: l, onRestored: a }) {
  var Se, fe;
  const [o, s] = L.useState(() => Object.fromEntries(e12.map((q) => [q.id, Qu(q)]))), [c, d] = L.useState(((Se = e12.find((q) => q.id !== "demo")) == null ? void 0 : Se.id) || ((fe = e12[0]) == null ? void 0 : fe.id) || ""), [m, g] = L.useState("providers"), [y, p] = L.useState(""), [x, v] = L.useState(""), [S, E] = L.useState(""), [N, C] = L.useState({}), [A, k] = L.useState(false), [T, Y] = L.useState(""), [M, B] = L.useState(false), [G, J] = L.useState(null), [U, X] = L.useState(null), ie = L.useRef(null), re = L.useRef(null), j = L.useRef(null), D = o[c], H = (D == null ? void 0 : D.id) === "demo" || (D == null ? void 0 : D.protocol) === "mock", V = Object.values(o).some((q) => q.dirty || q.isNew);
  L.useEffect(() => {
    s((q) => {
      const we = { ...q };
      return e12.forEach((Ce) => {
        var Te, Ae;
        !((Te = we[Ce.id]) != null && Te.dirty) && !((Ae = we[Ce.id]) != null && Ae.isNew) && (we[Ce.id] = Qu(Ce));
      }), we;
    });
  }, [e12]), L.useEffect(() => {
    const q = document.activeElement, we = ie.current, Ce = we == null ? void 0 : we.parentElement, Te = Array.from(document.body.children).filter((Ee) => Ee instanceof HTMLElement && Ee !== Ce && !["SCRIPT", "STYLE"].includes(Ee.tagName)), Ae = Te.map((Ee) => Ee.inert);
    return Te.forEach((Ee) => {
      Ee.inert = true;
    }), we == null || we.focus({ preventScroll: true }), () => {
      Te.forEach((Ee, qe) => {
        Ee.inert = Ae[qe];
      }), q == null || q.focus({ preventScroll: true });
    };
  }, []), L.useEffect(() => {
    k(false), Y(""), X(null), v(""), E("");
  }, [c, m]);
  function $(q) {
    s((we) => ({ ...we, [c]: { ...we[c], ...q, dirty: true } })), E(""), v("");
  }
  function F() {
    const q = crypto.randomUUID(), we = Qu({ id: q, name: "新接口", protocol: "responses", baseUrl: "", models: [], imageInput: false, imageEdit: false, currency: "USD" });
    s((Ce) => ({ ...Ce, [q]: { ...we, isNew: true } })), d(q), g("providers"), requestAnimationFrame(() => {
      var Ce, Te;
      (Ce = j.current) == null || Ce.focus(), (Te = j.current) == null || Te.select();
    });
  }
  function _(q, we) {
    if (!q.trim())
      return;
    const Ce = Number(q);
    if (!Number.isFinite(Ce) || Ce < 0)
      throw new Error(`${we}应为大于或等于 0 的数字`);
    return Ce;
  }
  async function se() {
    var q, we;
    if (!(!D || H || y)) {
      v(""), E(""), p("save");
      try {
        if (!D.name.trim())
          throw new Error("请填写接口名称");
        let Ce;
        try {
          Ce = new URL(D.baseUrl.trim());
        } catch {
          throw new Error("请填写有效的 API 基础地址，例如 https://api.example.com/v1");
        }
        const Te = ["localhost", "127.0.0.1", "[::1]"].includes(Ce.hostname);
        if (Ce.protocol !== "https:" && !(Te && Ce.protocol === "http:"))
          throw new Error("远程接口地址需要使用 https；本机接口可使用 http");
        if (Ce.username || Ce.password || Ce.search || Ce.hash)
          throw new Error("基础地址不要包含用户名、密码、查询参数或片段");
        const Ae = [...new Set(D.modelText.split(/[\n,，]/).map((Le) => Le.trim()).filter(Boolean))], Ee = { id: D.id, name: D.name.trim(), protocol: D.protocol, baseUrl: D.baseUrl.trim().replace(/\/$/, ""), models: Ae, apiKeyEnv: ((q = D.apiKeyEnv) == null ? void 0 : q.trim()) || void 0, imageInput: !!D.imageInput, imageEdit: !!D.imageEdit, inputPrice: _(D.inputPriceText, "输入价格"), outputPrice: _(D.outputPriceText, "输出价格"), imagePrice: _(D.imagePriceText, "图片价格"), currency: ((we = D.currency) == null ? void 0 : we.trim()) || "USD" };
        D.apiKey && (Ee.apiKey = D.apiKey), D.clearKey && (Ee.clearKey = true);
        const qe = await V2(`/providers/${encodeURIComponent(D.id)}`, Ee);
        s((Le) => ({ ...Le, [qe.id]: Qu(qe) })), E("接口配置已保存"), l();
      } catch (Ce) {
        v(xr(Ce));
      } finally {
        p("");
      }
    }
  }
  async function he(q) {
    var we;
    if (!(!q || q === "demo" || y)) {
      p("delete"), v(""), E("");
      try {
        (we = o[q]) != null && we.isNew || await Hn(`/providers/${encodeURIComponent(q)}`, { method: "DELETE" });
        const Ce = Object.keys(o).filter((Te) => Te !== q);
        s((Te) => {
          const Ae = { ...Te };
          return delete Ae[q], Ae;
        }), d(Ce[0] || ""), Y(""), E("接口已删除"), l();
      } catch (Ce) {
        v(xr(Ce));
      } finally {
        p("");
      }
    }
  }
  async function R() {
    if (!(!D || D.isNew || D.dirty || y)) {
      p("models"), v(""), E("");
      try {
        const q = await _r(`/providers/${encodeURIComponent(D.id)}/sync-models`, {});
        if (!Array.isArray(q.models))
          throw new Error("接口返回的模型列表格式不正确");
        const we = q.models.filter((Ce) => typeof Ce == "string");
        s((Ce) => ({ ...Ce, [D.id]: Qu(q.provider) })), C((Ce) => ({ ...Ce, [D.id]: q })), E(`已同步并保存 ${we.length} 个${D.protocol === "images" ? "生图" : "聊天"}模型。仅获取模型列表，没有发送生成请求。`), l();
      } catch (q) {
        v(xr(q));
      } finally {
        p("");
      }
    }
  }
  async function O() {
    if (!y) {
      p("backup"), v(""), E("");
      try {
        const q = await fetch("/api/backup");
        if (!q.ok) {
          const Ae = await q.json().catch(() => ({}));
          throw new Error(Ae.error || `备份失败 (${q.status})`);
        }
        const we = await q.blob(), Ce = URL.createObjectURL(we), Te = document.createElement("a");
        Te.href = Ce, Te.download = `light-canvas-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`, Te.click(), setTimeout(() => URL.revokeObjectURL(Ce), 1500), E("完整备份已下载");
      } catch (q) {
        v(xr(q));
      } finally {
        p("");
      }
    }
  }
  async function te() {
    if (!(!G || y)) {
      p("restore"), v(""), E("");
      try {
        const q = await Rc(), we = await fetch("/api/restore", { method: "POST", headers: { "Content-Type": "application/zip", "X-LC-Token": q.token }, body: G }), Ce = await we.json().catch(() => ({}));
        if (!we.ok)
          throw new Error(Ce.error || `恢复失败 (${we.status})`);
        E(`备份已恢复，新增 ${Array.isArray(Ce.workspaceIds) ? Ce.workspaceIds.length : ""} 个画布`), J(null), X(null), re.current && (re.current.value = ""), a();
      } catch (q) {
        v(xr(q));
      } finally {
        p("");
      }
    }
  }
  async function pe() {
    if (!y) {
      p("cleanup-preview"), v(""), E(""), X(null);
      try {
        const q = await _r("/cleanup/preview", {});
        X(q), !q.runCount && !q.assetCount && E("没有需要清理的历史结果或图片");
      } catch (q) {
        v(xr(q));
      } finally {
        p("");
      }
    }
  }
  async function me() {
    if (!(y || !U || !U.runCount && !U.assetCount)) {
      p("cleanup"), v(""), E("");
      try {
        const q = await _r("/cleanup", {});
        X(null), E(`已清理 ${q.runCount} 条历史结果和 ${q.assetCount} 张图片`), l();
      } catch (q) {
        v(xr(q));
      } finally {
        p("");
      }
    }
  }
  function ne() {
    y || (V ? B(true) : i());
  }
  function xe(q) {
    if (q.stopPropagation(), !(q.nativeEvent.isComposing || q.keyCode === 229) && (q.key === "Escape" && (q.preventDefault(), M ? B(false) : T ? Y("") : U ? X(null) : ne()), q.key === "Tab" && ie.current)) {
      const we = Array.from(ie.current.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter((Ae) => Ae.getClientRects().length > 0), Ce = we[0], Te = we[we.length - 1];
      if (!Ce) {
        q.preventDefault();
        return;
      }
      q.shiftKey && (document.activeElement === Ce || document.activeElement === ie.current) ? (q.preventDefault(), Te.focus()) : !q.shiftKey && document.activeElement === Te && (q.preventDefault(), Ce.focus());
    }
  }
  return Jc.createPortal(b.jsx("div", { className: "lc-settings-overlay", onKeyDown: xe, children: b.jsxs("div", { className: "lc-settings", role: "dialog", "aria-modal": "true", "aria-labelledby": "lc-settings-title", ref: ie, tabIndex: -1, children: [b.jsxs("header", { className: "lc-settings-header", children: [b.jsxs("div", { children: [b.jsx("h1", { id: "lc-settings-title", children: "设置" }), b.jsx("p", { children: "配置接口，保存和迁移你的画布" })] }), b.jsx("button", { className: "lc-settings-icon", onClick: ne, "aria-label": "关闭设置", title: "关闭设置", disabled: !!y, children: b.jsx(Yl, { size: 20 }) })] }), M && b.jsxs("div", { className: "lc-settings-confirm", role: "alert", children: [b.jsx("span", { children: "有尚未保存的接口修改。" }), b.jsx("button", { className: "lc-settings-button", onClick: () => B(false), children: "继续编辑" }), b.jsx("button", { className: "lc-settings-button", onClick: i, children: "放弃修改并关闭" })] }), b.jsxs("div", { className: "lc-settings-body", children: [b.jsxs("nav", { className: "lc-settings-nav", "aria-label": "设置分类", children: [b.jsxs("button", { className: m === "providers" ? "is-active" : "", onClick: () => g("providers"), children: [b.jsx(Xm, { size: 17 }), "接口与模型", b.jsx(Wu, { size: 15 })] }), b.jsxs("button", { className: m === "backup" ? "is-active" : "", onClick: () => g("backup"), children: [b.jsx(Av, { size: 17 }), "备份与迁移", b.jsx(Wu, { size: 15 })] }), b.jsxs("div", { className: "lc-settings-nav-note", children: ["每次生成都由你发送。", b.jsx("br", {}), "提示词和图片按原样提交。"] })] }), b.jsxs("div", { className: "lc-settings-main", children: [m === "providers" ? b.jsxs(b.Fragment, { children: [b.jsxs("div", { className: "lc-settings-section-heading", children: [b.jsxs("div", { children: [b.jsx("h2", { children: "接口与模型" }), b.jsx("p", { children: "可以为聊天和图片分别添加接口。" })] }), b.jsxs("button", { className: "lc-settings-button", onClick: F, disabled: !!y, children: [b.jsx(Vl, { size: 16 }), "添加接口"] })] }), b.jsx("div", { className: "lc-provider-tabs", role: "group", "aria-label": "接口列表", children: Object.values(o).map((q) => b.jsxs("button", { "aria-pressed": c === q.id, className: c === q.id ? "is-active" : "", onClick: () => d(q.id), disabled: !!y, children: [q.name, (q.dirty || q.isNew) && b.jsx("span", { "aria-label": "未保存", children: " ·" })] }, q.id)) }), D ? H ? b.jsxs("div", { className: "lc-demo-provider", children: [b.jsx("h3", { children: "本地演示" }), b.jsx("p", { children: "用于验证聊天、图片和画布操作。不会向外部服务发送请求，也不会消耗 API 额度。" }), b.jsxs("dl", { children: [b.jsxs("div", { children: [b.jsx("dt", { children: "聊天模型" }), b.jsx("dd", { children: "demo-chat" })] }), b.jsxs("div", { children: [b.jsx("dt", { children: "图片模型" }), b.jsx("dd", { children: "demo-image" })] })] }), b.jsx("p", { className: "lc-settings-muted", children: "此内置配置固定保留。点击“添加接口”配置真实 API。" })] }) : b.jsxs("form", { className: "lc-provider-form", onSubmit: (q) => {
    q.preventDefault(), se();
  }, children: [b.jsxs("fieldset", { disabled: !!y, children: [b.jsxs("div", { className: "lc-settings-grid", children: [b.jsxs("label", { className: "lc-settings-field", children: ["接口名称", b.jsx("input", { ref: j, value: D.name, onChange: (q) => $({ name: q.target.value }), placeholder: "例如：我的聊天接口", required: true })] }), b.jsxs("label", { className: "lc-settings-field", children: ["接口协议", b.jsx("select", { value: D.protocol, onChange: (q) => $({ protocol: q.target.value }), children: ["responses", "chat-completions", "images"].map((q) => b.jsx("option", { value: q, children: B8[q] }, q)) })] })] }), b.jsxs("label", { className: "lc-settings-field", children: ["API 基础地址", b.jsx("input", { type: "url", value: D.baseUrl, onChange: (q) => $({ baseUrl: q.target.value }), placeholder: "https://api.example.com/v1", autoCapitalize: "none", spellCheck: false, required: true }), b.jsx("small", { children: "填写基础地址，程序会按协议追加请求路径。本机接口可使用 http。" })] }), b.jsx("div", { className: "lc-settings-divider" }), b.jsxs("div", { className: "lc-settings-subheading", children: [b.jsxs("h3", { children: [b.jsx(EM, { size: 16 }), "访问密钥"] }), b.jsx("span", { children: D.hasKey ? "已配置密钥" : "尚未配置密钥" })] }), b.jsxs("label", { className: "lc-settings-field", children: ["本次服务会话的 API Key", b.jsxs("div", { className: "lc-settings-secret", children: [b.jsx("input", { type: A ? "text" : "password", value: D.apiKey, onChange: (q) => $({ apiKey: q.target.value, clearKey: false }), placeholder: D.hasKey ? "留空保留已有密钥，填写后替换" : "输入 API Key", autoComplete: "new-password", spellCheck: false, autoCapitalize: "none" }), b.jsx("button", { type: "button", className: "lc-settings-icon", "aria-label": A ? "隐藏密钥" : "显示密钥", onClick: () => k((q) => !q), children: A ? b.jsx(vM, { size: 17 }) : b.jsx(H2, { size: 17 }) })] }), b.jsx("small", { children: "仅保存在本次本地服务的内存中，重启服务后需重新填写；不会写入备份。" })] }), b.jsxs("label", { className: "lc-settings-field", children: ["或使用环境变量名称", b.jsx("input", { value: D.apiKeyEnv || "", onChange: (q) => $({ apiKeyEnv: q.target.value }), placeholder: "例如：MY_API_KEY", spellCheck: false, autoCapitalize: "none" }), b.jsx("small", { children: "填写变量名，实际密钥由本地服务读取。更换电脑后重新设置该变量。" })] }), D.hasKey && b.jsxs("label", { className: "lc-settings-check", children: [b.jsx("input", { type: "checkbox", checked: D.clearKey, onChange: (q) => $({ clearKey: q.target.checked, apiKey: q.target.checked ? "" : D.apiKey }) }), b.jsx("span", { children: "保存时清除已保存的会话密钥（环境变量不受影响）" })] }), b.jsx("div", { className: "lc-settings-divider" }), b.jsxs("label", { className: "lc-settings-field", children: ["可选模型（每行一个 ID）", b.jsx("textarea", { rows: 6, value: D.modelText, onChange: (q) => $({ modelText: q.target.value }), placeholder: `每行一个模型 ID
也可保存接口后同步模型列表`, spellCheck: false }), b.jsx("small", { children: "同步后，当前协议可用的模型会直接出现在节点下拉列表。也可手动填写接口支持的模型。" })] }), b.jsxs("div", { className: "lc-settings-model-action", children: [b.jsxs("button", { type: "button", className: "lc-settings-button", onClick: R, disabled: !!D.isNew || D.dirty || !!y, children: [b.jsx(DM, { size: 15 }), y === "models" ? "正在同步…" : "同步全部可用模型"] }), b.jsx("small", { children: D.isNew || D.dirty ? "请先保存接口修改，再同步模型。" : "点击后读取并替换模型列表，自动保存；不会生成内容。" })] }), N[D.id] && b.jsxs("div", { className: "lc-model-catalog", children: [b.jsxs("p", { role: "status", children: ["接口返回 ", N[D.id].discoveredModels.length, " 个模型 · 当前协议可选 ", N[D.id].models.length, " 个"] }), b.jsx("p", { children: "列表来自此密钥的接口返回；能否生成还取决于模型权限、余额和所选参数。" }), N[D.id].excludedModels.length > 0 && b.jsxs("details", { children: [b.jsxs("summary", { children: ["查看其他模型及未列入原因（", N[D.id].excludedModels.length, "）"] }), b.jsx("ul", { children: N[D.id].excludedModels.map((q) => b.jsxs("li", { children: [b.jsx("code", { children: q.id }), b.jsx("span", { children: q.reason })] }, q.id)) })] })] }), b.jsx("div", { className: "lc-settings-divider" }), b.jsx("h3", { children: "图片能力" }), b.jsx("p", { className: "lc-settings-helper", children: "按接口实际支持的能力勾选，程序不会代为转换或润色。" }), b.jsxs("label", { className: "lc-settings-check", children: [b.jsx("input", { type: "checkbox", checked: !!D.imageInput, onChange: (q) => $({ imageInput: q.target.checked }) }), b.jsx("span", { children: "聊天模型支持图片输入" })] }), b.jsxs("label", { className: "lc-settings-check", children: [b.jsx("input", { type: "checkbox", checked: !!D.imageEdit, onChange: (q) => $({ imageEdit: q.target.checked }) }), b.jsx("span", { children: "图片接口支持图片编辑／参考图输入" })] }), b.jsxs("details", { className: "lc-settings-prices", children: [b.jsx("summary", { children: "可选：费用估算" }), b.jsx("p", { className: "lc-settings-helper", children: "按供应商公布的价格填写（美元计价）；空白表示不估算。生成后会按实际 token 用量或图片张数，在结果详情中给出具体费用估算；账单以供应商实际计费为准。" }), b.jsxs("div", { className: "lc-settings-grid", children: [b.jsxs("label", { className: "lc-settings-field", children: ["输入／百万 tokens", b.jsx("input", { type: "number", min: "0", step: "any", value: D.inputPriceText, onChange: (q) => $({ inputPriceText: q.target.value }), placeholder: "不估算" })] }), b.jsxs("label", { className: "lc-settings-field", children: ["输出／百万 tokens", b.jsx("input", { type: "number", min: "0", step: "any", value: D.outputPriceText, onChange: (q) => $({ outputPriceText: q.target.value }), placeholder: "不估算" })] }), b.jsxs("label", { className: "lc-settings-field", children: ["每张图片", b.jsx("input", { type: "number", min: "0", step: "any", value: D.imagePriceText, onChange: (q) => $({ imagePriceText: q.target.value }), placeholder: "不估算" })] }), b.jsxs("label", { className: "lc-settings-field", children: ["币种", b.jsx("input", { value: D.currency || "", onChange: (q) => $({ currency: q.target.value }), placeholder: "USD", maxLength: 12 })] })] })] })] }), b.jsxs("div", { className: "lc-settings-form-actions", children: [b.jsxs("button", { type: "button", className: "lc-settings-button lc-settings-delete", onClick: () => Y(D.id), disabled: !!y, children: [b.jsx(bc, { size: 15 }), "删除接口"] }), b.jsx("span", { children: D.dirty || D.isNew ? "有未保存的修改" : "配置已保存" }), b.jsxs("button", { type: "submit", className: "lc-settings-button lc-settings-primary", disabled: !!y || !D.dirty && !D.isNew, children: [b.jsx(OM, { size: 16 }), y === "save" ? "保存中…" : "保存配置"] })] }), T === D.id && b.jsxs("div", { className: "lc-settings-confirm", role: "alert", children: [b.jsxs("span", { children: ["删除“", D.name, "”的接口配置？已有结果会保留。"] }), b.jsx("button", { type: "button", className: "lc-settings-button", onClick: () => Y(""), children: "取消" }), b.jsx("button", { type: "button", className: "lc-settings-button", disabled: !!y, onClick: () => he(D.id), children: "确认删除" })] })] }) : b.jsxs("div", { className: "lc-demo-provider", children: [b.jsx("p", { children: "还没有接口配置。" }), b.jsxs("button", { className: "lc-settings-button", onClick: F, children: [b.jsx(Vl, { size: 16 }), "添加接口"] })] })] }) : b.jsxs(b.Fragment, { children: [b.jsx("div", { className: "lc-settings-section-heading", children: b.jsxs("div", { children: [b.jsx("h2", { children: "备份与迁移" }), b.jsx("p", { children: "把完整画布和原始附件带到另一台电脑。" })] }) }), b.jsxs("section", { className: "lc-settings-backup-section", children: [b.jsx("h3", { children: "下载完整备份" }), b.jsx("p", { children: "包含所有画布、节点、连线、已有结果、原始图片、接口配置，以及已保存的阅读字号和位置。API 密钥不会包含在备份中。" }), b.jsxs("button", { className: "lc-settings-button lc-settings-primary", onClick: O, disabled: !!y, children: [b.jsx(Xa, { size: 16 }), y === "backup" ? "正在打包…" : "下载 ZIP 备份"] })] }), b.jsxs("section", { className: "lc-settings-backup-section", children: [b.jsx("h3", { children: "从备份恢复" }), b.jsx("p", { children: "恢复为新的画布，保留当前内容。导入已有结果不会重新调用 API。" }), b.jsx("input", { className: "lc-settings-file", ref: re, type: "file", accept: ".zip,application/zip,application/x-zip-compressed", disabled: !!y, "aria-label": "选择完整 ZIP 备份", onChange: (q) => {
    var we;
    J(((we = q.target.files) == null ? void 0 : we[0]) || null), v(""), E("");
  } }), b.jsxs("div", { className: "lc-settings-restore-actions", children: [b.jsxs("button", { className: "lc-settings-button", onClick: () => {
    var q;
    return (q = re.current) == null ? void 0 : q.click();
  }, disabled: !!y, children: [b.jsx(BM, { size: 16 }), "选择备份文件"] }), b.jsx("span", { children: G ? `${G.name} · ${(G.size / 1024 / 1024).toFixed(1)} MB` : "选择本工具导出的 ZIP 文件" })] }), G && b.jsxs("button", { className: "lc-settings-button lc-settings-primary", onClick: te, disabled: !!y, children: [b.jsx(Av, { size: 16 }), y === "restore" ? "正在校验并恢复…" : "恢复为新画布"] })] }), b.jsx("p", { className: "lc-settings-helper", children: "ZIP 恢复限制：压缩包最大 128 MiB，解压后的数据总量最大 256 MiB。超过限制时，请先关闭程序，再整体复制程序文件夹及其中的 data 目录进行迁移。迁移后，在新电脑重新填写 API Key 或设置对应环境变量，即可继续使用真实接口。" }), b.jsxs("section", { className: "lc-settings-backup-section lc-settings-cleanup", children: [b.jsx("h3", { children: "清理未使用的数据" }), b.jsx("p", { children: "永久移除未被任何画布保留的历史结果，以及不再被节点或保留结果引用的图片。运行中的任务会保留。清理无法撤销，建议先下载完整备份。" }), b.jsxs("button", { className: "lc-settings-button", onClick: pe, disabled: !!y, children: [b.jsx(bc, { size: 16 }), y === "cleanup-preview" ? "正在检查…" : "检查可清理的数据"] }), U && !!(U.runCount || U.assetCount) && b.jsxs("div", { className: "lc-settings-cleanup-confirm", role: "alert", children: [b.jsx("p", { children: b.jsxs("strong", { children: ["可清理 ", U.runCount, " 条历史结果和 ", U.assetCount, " 张图片。"] }) }), b.jsx("p", { children: "确认后将永久移除这些未被保留的数据。执行时会再次检查当前引用。" }), b.jsxs("div", { children: [b.jsx("button", { className: "lc-settings-button", onClick: () => X(null), disabled: !!y, children: "取消" }), b.jsxs("button", { className: "lc-settings-button", onClick: O, disabled: !!y, children: [b.jsx(Xa, { size: 15 }), "先下载备份"] }), b.jsxs("button", { className: "lc-settings-button lc-settings-primary", onClick: me, disabled: !!y, children: [b.jsx(bc, { size: 15 }), y === "cleanup" ? "正在清理…" : "确认永久清理"] })] })] })] })] }), x && b.jsxs("div", { className: "lc-settings-feedback is-error", role: "alert", children: [b.jsx("strong", { children: "未完成" }), b.jsx("span", { children: x })] }), S && b.jsxs("div", { className: "lc-settings-feedback", role: "status", children: [b.jsx(Ym, { size: 16 }), b.jsx("span", { children: S })] })] })] })] }) }), document.body);
}
const I8 = { canvas: O8 }, _m = (e12) => (e12 == null ? void 0 : e12.status) === "running" || (e12 == null ? void 0 : e12.status) === "queued", Ab = (e12) => e12 instanceof Element && !e12.closest(".canvas-paste-target") && !!e12.closest('input,textarea,select,button,[contenteditable="true"],[role="dialog"]');
function q8() {
  const e12 = Eo(), { zoom: i } = HA();
  return b.jsxs("div", { className: "view-controls", children: [b.jsx("button", { className: "icon-btn", "aria-label": "缩小画布", onClick: () => e12.zoomOut(), children: b.jsx(_M, { size: 16 }) }), b.jsxs("button", { className: "zoom-label", title: "恢复 100%", onClick: () => e12.zoomTo(1), children: [Math.round(i * 100), "%"] }), b.jsx("button", { className: "icon-btn", "aria-label": "放大画布", onClick: () => e12.zoomIn(), children: b.jsx(Vl, { size: 16 }) }), b.jsx("span", { className: "control-divider" }), b.jsx("button", { className: "icon-btn", "aria-label": "适合全部节点", title: "适合全部 · F", onClick: () => e12.fitView({ padding: 0.2, maxZoom: 1.2, duration: 200 }), children: b.jsx(kM, { size: 16 }) })] });
}
function hc({ title: e12, onClose: i, children: l, wide: a = false }) {
  const o = L.useRef(null);
  return L.useEffect(() => {
    var d;
    const s = document.activeElement;
    (d = o.current) == null || d.focus();
    const c = (m) => {
      var g;
      if (!(m.isComposing || m.keyCode === 229) && (m.key === "Escape" && (m.stopPropagation(), i()), m.key === "Tab")) {
        const y = (g = o.current) == null ? void 0 : g.querySelectorAll('button:not(:disabled),input,select,textarea,a[href],[tabindex="0"]');
        if (!(y != null && y.length))
          return;
        const p = y[0], x = y[y.length - 1];
        m.shiftKey && document.activeElement === p ? (m.preventDefault(), x.focus()) : !m.shiftKey && document.activeElement === x && (m.preventDefault(), p.focus());
      }
    };
    return document.addEventListener("keydown", c, true), () => {
      document.removeEventListener("keydown", c, true), s == null || s.focus();
    };
  }, [i]), Jc.createPortal(b.jsx("div", { className: "dialog-backdrop", onMouseDown: (s) => {
    s.target === s.currentTarget && i();
  }, children: b.jsxs("div", { className: `dialog ${a ? "wide" : ""}`, ref: o, tabIndex: -1, role: "dialog", "aria-modal": "true", "aria-label": e12, children: [b.jsxs("header", { className: "dialog-header", children: [b.jsx("h2", { children: e12 }), b.jsx("button", { className: "icon-btn", "aria-label": "关闭", onClick: i, children: b.jsx(Yl, { size: 19 }) })] }), l] }) }), document.body);
}
const lc16AlignIcon=$e("AlignVerticalJustifyCenter",[["rect",{width:"14",height:"6",x:"5",y:"16",rx:"2",key:"align-a"}],["rect",{width:"10",height:"6",x:"7",y:"2",rx:"2",key:"align-b"}],["path",{d:"M2 12h20",key:"align-c"}]]);

function V8() {
  const [e12, i] = L.useState([]), [l, a] = L.useState(""), [o, s] = L.useState([]), [c, d] = L.useState({}), [m, g] = L.useState({}), [y, p] = L.useState(false), [x, v] = L.useState(""), [S, E] = L.useState("已保存"), [N, C] = L.useState(""), [A, k] = L.useState(() => window.innerWidth > 760), [T, Y] = L.useState(false), [M, B] = L.useState(null), [G, J] = L.useState(false), [U, X] = L.useState(null), [ie, re] = L.useState(null), [j, D] = L.useState(null), [H, V] = L.useState(null), [$, F] = L.useState(""), [_, se] = L.useState(() => localStorage.getItem("lc-scroll-mode") === "zoom" ? "zoom" : "pan"), [he, R] = L.useState(false), O = L.useRef(false), te = L.useRef(/* @__PURE__ */ new Map()), [pe, me] = L.useState({}), ne = L.useRef({}), xe = L.useRef({}), Se = L.useRef(/* @__PURE__ */ new Set()), fe = L.useRef(null), [Ce, Te] = L.useState(0), Ae = Eo(), Ee = e12.find((Z) => Z.id === l), qe = L.useRef(e12);
  qe.current = e12;
  const Le = L.useRef(Ee);
  Le.current = Ee;
  const pt = L.useRef(c);
  pt.current = c;
  const vt = L.useRef(o);
  vt.current = o;
  const Lt = L.useRef(void 0), Zt = L.useRef(Promise.resolve()), Ht = L.useRef(void 0), _t = L.useRef({}), ce = L.useRef(/* @__PURE__ */ new Set()), K = L.useRef(null), de = L.useRef(null), Ne = L.useRef(false), be = L.useCallback((Z) => {
    F(Z), clearTimeout(Ht.current), Ht.current = setTimeout(() => F(""), 5200);
  }, []), Ze = L.useCallback(async (Z = true) => {
    const ue = await Rc();
    return ne.current = Object.fromEntries(ue.workspaces.map((ge) => [ge.id, ge.version || 0])), Se.current.clear(), s(ue.providers), d(Object.fromEntries(ue.runs.map((ge) => [ge.id, ge]))), g(Object.fromEntries(ue.assets.map((ge) => [ge.id, ge]))), Ne.current = true, i(ue.workspaces), a((ge) => {
      var _e;
      return Z && ue.workspaces.some((ze) => ze.id === ge) ? ge : ((_e = ue.workspaces[0]) == null ? void 0 : _e.id) || "";
    }), Hn("/preferences").then((ge) => {
      (ge["scroll-mode"] === "pan" || ge["scroll-mode"] === "zoom") && (se(ge["scroll-mode"]), localStorage.setItem("lc-scroll-mode", ge["scroll-mode"]));
    }).catch(() => {
    }), p(true), ue;
  }, []);
  L.useEffect(() => {
    Ze(false).catch((Z) => {
      v(Z.message), p(true);
    });
  }, [Ze]), L.useEffect(() => {
    if (!y || x)
      return;
    const Z = new EventSource("/api/events");
    return Z.addEventListener("run", (ue) => {
      try {
        const ge = JSON.parse(ue.data);
        d((_e) => {
          var ze;
          return ((ze = _e[ge.id]) == null ? void 0 : ze.seq) !== void 0 && ge.seq !== void 0 && _e[ge.id].seq > ge.seq ? _e : { ..._e, [ge.id]: ge };
        });
      } catch {
      }
    }), () => Z.close();
  }, [y, x]);
  const Ve = L.useCallback((Z) => {
    E("正在保存");
    const ue = R8(Z), ge = xe.current[ue.id] || 0, _e = Zt.current.catch(() => {
    }).then(async () => {
      var je, He;
      const ze = await Hn(`/workspaces/${ue.id}`, { method: "PUT", headers: { "X-LC-Workspace-Version": String(ne.current[ue.id] ?? ue.version ?? 0) }, body: JSON.stringify(ue) });
      ne.current[ue.id] = ze.version || 0, (xe.current[ue.id] || 0) === ge ? (Se.current.delete(ue.id), ((je = Le.current) == null ? void 0 : je.id) === ue.id && E("已保存")) : ((He = Le.current) == null ? void 0 : He.id) === ue.id && E("待保存");
    });
    return Zt.current = _e, _e.catch((ze) => {
      E("保存失败"), be(`保存失败：${ze.message}`);
    }), _e;
  }, [be]);
  L.useEffect(() => {
    if (!(!Ee || !y)) {
      if (Ne.current) {
        Ne.current = false;
        return;
      }
      if (Se.current.has(Ee.id))
        return clearTimeout(Lt.current), E("待保存"), Lt.current = setTimeout(() => {
          Ve(Ee).catch(() => {
          });
        }, 500), () => clearTimeout(Lt.current);
    }
  }, [Ee, y, Ve]);
  const Ke = L.useCallback(async () => {
    var ue;
    clearTimeout(Lt.current);
    let Z = Le.current;
    for (; Z && (await Ve(Z), !(((ue = Le.current) == null ? void 0 : ue.id) !== Z.id || !Se.current.has(Z.id))); )
      clearTimeout(Lt.current), Z = Le.current;
  }, [Ve]);
  L.useEffect(() => {
    const Z = (ue) => {
      (Se.current.size || S === "正在保存" || S === "保存失败") && (ue.preventDefault(), ue.returnValue = "");
    };
    return window.addEventListener("beforeunload", Z), () => window.removeEventListener("beforeunload", Z);
  }, [S]);
  const lt = L.useCallback(() => {
    const Z = Le.current;
    if (!Z)
      return;
    fe.current = null;
    const ue = _t.current[Z.id] || { undo: [], redo: [] };
    ue.undo.push({ nodes: Z.nodes, edges: Z.edges }), ue.undo.length > 60 && ue.undo.shift(), ue.redo = [], _t.current[Z.id] = ue, Te((ge) => ge + 1);
  }, []), Ye = L.useCallback((Z, ue = false, ge = false) => {
    const _e = Le.current;
    if (!_e)
      return;
    ue && lt();
    const ze = window.LightCanvasImages.assign(Z(_e),pt.current);
    ge || (xe.current[_e.id] = (xe.current[_e.id] || 0) + 1, Se.current.add(_e.id)), Le.current = ze, i((je) => je.map((He) => He.id === ze.id ? ze : He));
  }, [lt]), It = L.useCallback((Z = false) => {
    const ue = Le.current;
    if (!ue)
      return;
    const ge = _t.current[ue.id];
    if (!ge)
      return;
    const ze = (Z ? ge.redo : ge.undo).pop();
    ze && ((Z ? ge.undo : ge.redo).push({ nodes: ue.nodes, edges: ue.edges }), Ye((je) => ({ ...je, ...ze })), Te((je) => je + 1));
  }, [Ye]), zt = L.useCallback((Z, ue) => {
    var _e;
    if (O.current)
      return;
    const ge = Date.now();
    (((_e = fe.current) == null ? void 0 : _e.id) !== Z || ge - fe.current.at > 1e3) && lt(), fe.current = { id: Z, at: ge }, Ye((ze) => ({ ...ze, nodes: ze.nodes.map((je) => je.id === Z ? { ...je, data: { ...je.data, ...ue } } : je) }));
  }, [Ye, lt]), Oi = L.useCallback(() => {
    var ue;
    const Z = (ue = de.current) == null ? void 0 : ue.getBoundingClientRect();
    return Ae.screenToFlowPosition({ x: ((Z == null ? void 0 : Z.left) || 0) + ((Z == null ? void 0 : Z.width) || 1e3) / 2 - 175, y: ((Z == null ? void 0 : Z.top) || 0) + ((Z == null ? void 0 : Z.height) || 700) / 2 - 160 });
  }, [Ae]), bt = L.useCallback((Z = "chat", ue, ge = false, aligned = false) => {
    const _e = Le.current;
    if (!_e)
      return;
    const ze = zb(Z, aligned && ue ? ue : km(_e, ue || Oi()), vt.current);
    return ze.dragHandle = ".node-drag-handle", ge && (ze.data.kind = "note", ze.data.label = "笔记"), Ye((je) => ({ ...je, nodes: [...je.nodes.map((He) => ({ ...He, selected: false })), { ...ze, selected: true }] }), true), ze;
  }, [Oi, Ye]), Dt = L.useCallback((Z, ue, ge = "reference") => {
    const _e = Le.current;
    if (_e) {
      if (!Cm(_e, Z, ue)) {
        be("这个连接不可用：目标需为输入节点，且不能重复或形成循环。");
        return;
      }
      Ye((ze) => ({ ...ze, edges: [...ze.edges, Em(Z, ue, ge)] }), true), V(null), be(ge === "history" ? "已连接分支历史" : "已添加引用；发送前可查看实际内容");
    }
  }, [Ye, be]), dn = L.useCallback((Z) => {
    const workspace = Le.current, source = workspace?.nodes.find(node => node.id === Z);
    if (!workspace || !source) return;
    const parent = workspace.nodes.find(node => workspace.edges.some(edge => edge.source === node.id && edge.target === Z && edge.data?.kind === "generation"));
    const imageFollow = source.data.kind === "image";
    const mode = imageFollow ? "image" : "chat";
    const inherited = parent && parent.data.mode === mode ? {providerId: parent.data.providerId, model: parent.data.model, systemPrompt: parent.data.systemPrompt, params: {...parent.data.params}} : {};
    const next = zb(mode, lc16Right(workspace,source,"input"), vt.current, inherited);
    next.data.label = imageFollow ? "参考图生图" : "新的提示词";
    next.dragHandle = ".node-drag-handle";
    Ye(current => ({...current, nodes:[...current.nodes.map(node => ({...node,selected:false})), {...next,selected:true}], edges:[...current.edges,Em(Z,next.id,imageFollow ? "reference" : "history")]}),true);
    setTimeout(() => Ae.fitView({nodes:[{id:next.id}],maxZoom:1,padding:0.45,duration:200}),40);
  }, [Ye, Ae]), Ft = L.useCallback((Z) => {
    const ue = Le.current;
    if (!ue)
      return;
    const ge = new Set(Z ? [Z] : ue.nodes.filter((ze) => ze.selected).map((ze) => ze.id)), _e = new Set(Z ? [] : ue.edges.filter((ze) => ze.selected).map((ze) => ze.id));
    !ge.size && !_e.size || (ue.nodes.filter((ze) => ge.has(ze.id) && ze.data.runId).forEach((ze) => {
      const je = pt.current[ze.data.runId];
      _m(je) && _r(`/runs/${je.id}/cancel`, {}).catch((He) => be(He.message));
    }), Ye((ze) => ({ ...ze, nodes: ze.nodes.filter((je) => !ge.has(je.id)), edges: ze.edges.filter((je) => !ge.has(je.source) && !ge.has(je.target) && !_e.has(je.id)) }), true), j && ge.has(j) && D(null), be(`已删除 ${ge.size ? `${ge.size} 个节点` : `${_e.size} 条连线`}，可撤销`));
  }, [Ye, j, be]), gi = L.useCallback(async (Z, ue = false) => {
    if (O.current || ce.current.has(Z))
      return;
    if (te.current.size) {
      be("图片正在保存，请等待附件显示后再发送。");
      return;
    }
    const ge = Le.current, _e = ge == null ? void 0 : ge.nodes.find((je) => je.id === Z);
    if (!ge || !_e)
      return;
    if (_e.data.mode === "image") {
      const je = tE(_e.data.model, _e.data.params);
      if (je.length) {
        be(je[0]);
        return;
      }
    }
    if (Object.values(pt.current).some((je) => je.workspaceId === ge.id && je.inputNodeId === Z && _m(je))) {
      be("该输入已有任务正在执行。");
      return;
    }
    if (!ue && Object.values(pt.current).some((je) => je.workspaceId === ge.id && je.inputNodeId === Z && je.status === "unknown")) {
      X(Z);
      return;
    }
    ce.current.add(Z), O.current = true, R(true);
    let ze = "";
    try {
      await Ke(), await Hn("/preview", { method: "POST", headers: { "X-LC-Workspace-Version": String(ne.current[ge.id] ?? ge.version ?? 0) }, body: JSON.stringify({ workspaceId: ge.id, nodeId: Z }) }), ze = Ta();
      const je = Le.current;
      if (je.id !== ge.id || !je.nodes.some((Ue) => Ue.id === Z))
        throw new Error("画布已改变，尚未发送，请在目标节点重新操作。");
      const He = { id: Ta(), type: "canvas", dragHandle: ".node-drag-handle", position: lc16Right(je,je.nodes.find(node=>node.id===Z),_e.data.mode === "image" ? "image" : "text"), data: { ..._e.data, kind: _e.data.mode === "image" ? "image" : "text", label: _e.data.mode === "image" ? "图片结果" : "回复", prompt: "", runId: ze, assetIds: [] } };
      Ye((Ue) => ({ ...Ue, nodes: [...Ue.nodes, He], edges: [...Ue.edges, Em(Z, He.id, "generation")] }), true), await Ke();
      const Re = await Hn("/runs", { method: "POST", headers: { "X-LC-Workspace-Version": String(ne.current[ge.id] ?? ge.version ?? 0) }, body: JSON.stringify({ id: ze, workspaceId: ge.id, nodeId: Z }) });
      d((Ue) => ({ ...Ue, [Re.id]: Ue[Re.id] && (Ue[Re.id].seq || 0) > (Re.seq || 0) ? Ue[Re.id] : Re })), be("已发送，结果将显示在新卡片中");
    } catch (je) {
      if (be(je.message), ze)
        try {
          const He = await Hn(`/runs/${ze}`);
          d((Re) => ({ ...Re, [ze]: He }));
        } catch {
          d((He) => ({ ...He, [ze]: { id: ze, workspaceId: ge.id, inputNodeId: Z, mode: _e.data.mode, status: "unknown", text: "", assetIds: [], createdAt: (/* @__PURE__ */ new Date()).toISOString(), updatedAt: (/* @__PURE__ */ new Date()).toISOString(), model: _e.data.model, providerName: "", error: "未取得任务状态。请刷新核实后再决定是否重新发送。", snapshot: {} } }));
        }
    } finally {
      ce.current.delete(Z), O.current = false, R(false);
    }
  }, [Ye, Ke, be]), Hr = L.useCallback((Z) => {
    _r(`/runs/${Z}/cancel`, {}).then((ue) => {
      d((ge) => ({ ...ge, [ue.id]: ue })), be("已请求停止；上游是否计费以服务商为准。");
    }).catch((ue) => be(ue.message));
  }, [be]), rl = L.useCallback(async (Z) => {
    var ue;
    try {
      const ge = Le.current;
      if (!ge)
        return;
      const _e = ge.nodes.find((je) => je.id === Z);
      if (_e != null && _e.data.runId) {
        re({ title: "本次请求记录", data: ((ue = pt.current[_e.data.runId]) == null ? void 0 : ue.snapshot) || {} });
        return;
      }
      await Ke();
      const ze = await Hn("/preview", { method: "POST", headers: { "X-LC-Workspace-Version": String(ne.current[ge.id] ?? ge.version ?? 0) }, body: JSON.stringify({ workspaceId: ge.id, nodeId: Z }) });
      re({ title: "实际发送内容", data: ze });
    } catch (ge) {
      be(ge.message);
    }
  }, [Ke, be]), Br = L.useCallback(async (Z, ue) => {
    var _e, ze;
    const ge = (_e = Le.current) == null ? void 0 : _e.id;
    if (ge) {
      te.current.set(Z, (te.current.get(Z) || 0) + 1), me(Object.fromEntries(te.current));
      try {
        const je = ue.filter((tt) => ["image/png", "image/jpeg", "image/webp"].includes(tt.type));
        if (!je.length) {
          be("请选择 PNG、JPEG 或 WebP 图片。");
          return;
        }
        const He = [];
        for (const tt of je) {
          if (tt.size > 20 * 1024 * 1024)
            throw new Error("单张图片不能超过 20 MB");
          He.push(await IM(tt));
        }
        g((tt) => ({ ...tt, ...Object.fromEntries(He.map((ft) => [ft.id, ft])) }));
        const Re = qe.current.find((tt) => tt.id === ge), Ue = Re == null ? void 0 : Re.nodes.find((tt) => tt.id === Z);
        if (Ue && Re)
          if (((ze = Le.current) == null ? void 0 : ze.id) === ge)
            Ye((tt) => ({ ...tt, nodes: tt.nodes.map((ft) => ft.id === Z ? { ...ft, data: { ...ft.data, assetIds: [...ft.data.assetIds, ...He.map((ht) => ht.id)] } } : ft) }), true);
          else {
            const tt = { ...Re, nodes: Re.nodes.map((ft) => ft.id === Z ? { ...ft, data: { ...ft.data, assetIds: [...ft.data.assetIds, ...He.map((ht) => ht.id)] } } : ft) };
            xe.current[ge] = (xe.current[ge] || 0) + 1, Se.current.add(ge), i((ft) => ft.map((ht) => ht.id === ge ? tt : ht)), await Ve(tt);
          }
        be(Ue ? `已添加 ${He.length} 张原图，未进行压缩或修改` : "原节点已删除，未附加图片。");
      } catch (je) {
        be(je.message);
      } finally {
        const je = (te.current.get(Z) || 1) - 1;
        je ? te.current.set(Z, je) : te.current.delete(Z), me(Object.fromEntries(te.current));
      }
    }
  }, [be, Ye, Ve]), Ql = L.useCallback((Z) => {
    navigator.clipboard.writeText(Z).then(() => be("已复制")).catch(() => be("复制失败，请选中文字后复制。"));
  }, [be]), In = L.useCallback((Z) => {
    const ue = Le.current, ge = Z || K.current;
    if (!ue || !(ge != null && ge.nodes.length))
      return;
    const _e = new Map(ge.nodes.map((He) => [He.id, Ta()])), ze = ge.nodes.map((He) => {
      var Re, Ue;
      return { ...structuredClone(He), id: _e.get(He.id), selected: true, position: { x: He.position.x + 70, y: He.position.y + 70 }, data: { ...structuredClone(He.data), ...He.data.runId ? { kind: "note", prompt: ((Re = pt.current[He.data.runId]) == null ? void 0 : Re.text) || "", assetIds: ((Ue = pt.current[He.data.runId]) == null ? void 0 : Ue.assetIds) || [], runId: void 0, label: "结果副本" } : {} } };
    }), je = ge.edges.filter((He) => _e.has(He.source) && _e.has(He.target)).map((He) => ({ ...structuredClone(He), id: Ta(), source: _e.get(He.source), target: _e.get(He.target), selected: false }));
    Ye((He) => ({ ...He, nodes: [...He.nodes.map((Re) => ({ ...Re, selected: false })), ...ze], edges: [...He.edges, ...je] }), true);
  }, [Ye]), nn = L.useCallback(async (Z) => {
    var ue;
    if (!O.current)
      try {
        await Ke(), a(Z), D(null), (ue = de.current) == null || ue.focus();
      } catch {
      }
  }, [Ke]), Nn = L.useCallback(async () => {
    if (!O.current)
      try {
        await Ke();
        const Z = await _r("/workspaces", { name: `未命名画布 ${e12.length + 1}` });
        Ne.current = true, i((ue) => [...ue, Z]), a(Z.id), D(null);
      } catch (Z) {
        be(Z.message);
      }
  }, [Ke, be, e12.length]), Pt = T || !!U || !!M || G || !!ie || !!H;


  const alignNodes=L.useCallback(()=>{
    const workspace=Le.current;
    if(!workspace||O.current||workspace.nodes.length<2)return;
    const selected=workspace.nodes.filter(node=>node.selected);
    const ids=(selected.length>1?selected:workspace.nodes).map(node=>node.id);
    Ye(current=>lc16Arrange(current,ids),true);
    setTimeout(()=>Ae.fitView({nodes:ids.map(id=>({id})),maxZoom:1,padding:0.25,duration:200}),40);
    be(selected.length>1?"已自动对齐所选节点，可撤销":"已自动对齐全部节点，可撤销");
  },[Ye,Ae,be]);

  const pasteImages = L.useCallback(async (files,targetId=null) => {
    const initial=Le.current;
    if(!initial||O.current) return;
    const workspaceId=initial.id;
    const position=Oi();
    const uploadTag="canvas:"+Ta();te.current.set(uploadTag,1);me(Object.fromEntries(te.current));
    try {
      const supported=files.filter(file=>["image/png","image/jpeg","image/webp"].includes(file.type));
      if(!supported.length || supported.length!==files.length) throw new Error("请选择 PNG、JPEG 或 WebP 图片。");
      if(supported.some(file=>file.size>20*1024*1024)) throw new Error("单张图片不能超过 20 MB");
      be("正在粘贴图片…");
      const assets=[];
      for(const file of supported) assets.push(await IM(file));
      g(current=>({...current,...Object.fromEntries(assets.map(asset=>[asset.id,asset]))}));
      const workspace=qe.current.find(item=>item.id===workspaceId);
      if(!workspace) return;
      const target=workspace.nodes.find(node=>node.id===targetId&&node.data.kind==="input");
      const base=target?{x:target.position.x-430,y:target.position.y}:position;
      const nodes=[];
      for(const [index,asset] of assets.entries()) {
        const node=zb("image",km({...workspace,nodes:[...workspace.nodes,...nodes]},{x:base.x+index*390,y:base.y}),vt.current);
        node.dragHandle=".node-drag-handle";
        node.data={...node.data,kind:"image",label:assets.length>1?`参考图片 ${index+1}`:"参考图片",assetIds:[asset.id],prompt:""};
        node.selected=true;
        nodes.push(node);
      }
      const append=current=>({...current,nodes:[...current.nodes.map(node=>({...node,selected:false})),...nodes],edges:[...current.edges,...(target?nodes.map(node=>Em(node.id,target.id,"reference")):[])]});
      if(Le.current?.id===workspaceId) {
        Ye(append,true);
        setTimeout(()=>Ae.fitView({nodes:[...nodes.map(node=>({id:node.id})),...(target?[{id:target.id}]:[])],maxZoom:1,padding:0.3,duration:180}),40);
      } else {
        const next=append(workspace);
        xe.current[workspaceId]=(xe.current[workspaceId]||0)+1;
        Se.current.add(workspaceId);
        i(current=>current.map(item=>item.id===workspaceId?next:item));
        await Ve(next);
      }
      be(target?"已粘贴原图并连接到提示词":"已粘贴为图片节点，可连接到提示词作为参考图");
    } catch(error) { be(error.message); } finally {te.current.delete(uploadTag);me(Object.fromEntries(te.current));}
  },[Oi,Ye,Ve,Ae,be]);

  L.useEffect(() => {
    const Z = (ue) => {
      var je, He;
      if (O.current || ue.isComposing || ue.keyCode === 229 || Pt || Ab(ue.target))
        return;
      const ge = Le.current;
      if (!ge || !((je = de.current) != null && je.contains(document.activeElement)))
        return;
      const _e = ue.ctrlKey || ue.metaKey, ze = ue.key.toLowerCase();
      if (!(ue.repeat && ["n", "b", "c", "delete", "backspace"].includes(ze))) {
        if (_e && ze === "a")
          ue.preventDefault(), Ye((Re) => ({ ...Re, nodes: Re.nodes.map((Ue) => ({ ...Ue, selected: true })) }));
        else if (_e && ze === "z")
          ue.preventDefault(), It(ue.shiftKey);
        else if (_e && ze === "c") {
          if ((He = window.getSelection()) != null && He.toString())
            return;
          const Re = ge.nodes.filter((tt) => tt.selected);
          if (!Re.length)
            return;
          ue.preventDefault();
          const Ue = new Set(Re.map((tt) => tt.id));
          K.current = structuredClone({ nodes: Re, edges: ge.edges.filter((tt) => Ue.has(tt.source) && Ue.has(tt.target)) }), navigator.clipboard.writeText(JSON.stringify({ format: "light-canvas-nodes", ...K.current })).catch(() => {
          }), be("已复制节点");
        }
        else if (!_e) {
          const Re = ge.nodes.find((Ue) => Ue.selected);
          ze === "delete" || ze === "backspace" ? (ue.preventDefault(), Ft()) : ze === "n" ? (ue.preventDefault(), bt()) : ze === "b" && (Re != null && Re.data.runId) ? (ue.preventDefault(), dn(Re.id)) : ze === "c" && Re ? (ue.preventDefault(), V(Re.id)) : ze === "e" && (Re != null && Re.data.runId) ? (ue.preventDefault(), B(Re.data.runId)) : ze === "f" ? (ue.preventDefault(), Ae.fitView({ nodes: ue.shiftKey ? ge.nodes.filter((Ue) => Ue.selected).map((Ue) => ({ id: Ue.id })) : void 0, padding: 0.2, maxZoom: 1.2, duration: 200 })) : ze === "0" ? (ue.preventDefault(), Ae.zoomTo(1)) : ue.key === "?" ? (ue.preventDefault(), J(true)) : ze === "escape" && (D(null), Ye((Ue) => ({ ...Ue, nodes: Ue.nodes.map((tt) => ({ ...tt, selected: false })), edges: Ue.edges.map((tt) => ({ ...tt, selected: false })) })));
        }
      }
    };
    return window.addEventListener("keydown", Z), () => window.removeEventListener("keydown", Z);
  }, [Pt, Ye, It, be, In, Ft, bt, dn, Ae]);

  const pasteClipboard=L.useCallback(async()=>{
    if(!Le.current||Pt||O.current)return;
    try {
      if(!navigator.clipboard?.read)throw new Error('浏览器无法读取剪贴板，请使用 Ctrl / Command + V，或导入图片。');
      const items=await navigator.clipboard.read(),files=[];
      for(const [index,item] of items.entries()){
        const type=['image/png','image/jpeg','image/webp'].find(type=>item.types.includes(type));
        if(type){const blob=await item.getType(type);files.push(new File([blob],`clipboard-${index+1}.${type.split('/')[1]}`,{type}));}
      }
      if(!files.length)throw new Error('剪贴板没有可读取的图片。复制图片本身，或使用“导入图片”一次选择多张。');
      await pasteImages(files);
    }catch(error){be(error.name==='NotAllowedError'?'请允许浏览器读取剪贴板，或使用“导入图片”。':error.message);}
  },[Pt,pasteImages,be]);
  const mentionImage=L.useCallback((nodeId,assetId,prompt)=>{
    Ye(workspace=>{
      const image=window.LightCanvasImages.candidates(workspace,nodeId,pt.current,m).find(item=>item.assetId===assetId);
      if(!image)return workspace;
      const edge=image.nodeId!==nodeId&&Cm(workspace,image.nodeId,nodeId)?Em(image.nodeId,nodeId,'reference'):null;
      return {...workspace,edges:edge?[...workspace.edges,edge]:workspace.edges,nodes:workspace.nodes.map(node=>node.id===nodeId?{...node,data:{...node.data,prompt,excludedImageIds:(node.data.excludedImageIds||[]).filter(id=>id!==assetId)}}:node)};
    },true);
  },[Ye,m]);
  const removeImage=L.useCallback((nodeId,assetId)=>{
    Ye(workspace=>{
      const image=window.LightCanvasImages.catalog(workspace,pt.current,m).find(item=>item.assetId===assetId);
      return {...workspace,nodes:workspace.nodes.map(node=>node.id===nodeId?{...node,data:{...node.data,assetIds:(node.data.assetIds||[]).filter(id=>id!==assetId),excludedImageIds:[...new Set([...(node.data.excludedImageIds||[]),assetId])],prompt:image?node.data.prompt.replace(new RegExp('@(?:图片|图)'+image.label.slice(1)+'(?!\\d)','g'),''):node.data.prompt}}:node)};
    },true);
  },[Ye,m]);
  const pasteSerial=L.useRef(0),pasteFallback=L.useRef(null),canvasImageInput=L.useRef(null),pasteSink=L.useRef(null);
  L.useEffect(()=>{
    const editable=target=>target instanceof Element&&!!target.closest('input,textarea,select,[contenteditable="true"]:not(.canvas-paste-target)');
    const blocked=event=>Pt||O.current||!Le.current||document.querySelector('#folder-gate:not([hidden])')||editable(event.target)&&!event.target.closest('.prompt-input');
    const paste=event=>{
      if(event.defaultPrevented||blocked(event))return;
      pasteSerial.current++;clearTimeout(pasteFallback.current);
      const images=lc15ClipboardImages(event.clipboardData);
      const targetId=event.target.closest?.('.prompt-input')?.closest('.react-flow__node')?.dataset.id;
      if(images.length){event.preventDefault();event.stopPropagation();pasteImages(images,targetId||null);return;}
      if(editable(event.target))return;
      const text=event.clipboardData?.getData('text/plain')||'';
      try{const copied=JSON.parse(text);if(copied.format==='light-canvas-nodes'&&Array.isArray(copied.nodes)){event.preventDefault();In(copied);return;}}catch{}
      // Some browsers expose embedded clipboard pictures as data URLs in HTML.
      const html=event.clipboardData?.getData('text/html')||'';
      if(html){const images=Array.from(html.matchAll(/src\s*=\s*["'](data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+\/=]+)["']/gi),match=>match[1]);if(images.length){event.preventDefault();Promise.all(images.map(async(src,index)=>{const blob=await fetch(src).then(r=>r.blob());return new File([blob],`clipboard-${index+1}.${blob.type.split('/')[1]}`,{type:blob.type});})).then(files=>pasteImages(files,targetId||null)).catch(error=>be(error.message));return;}}
      if(event.target.closest?.('.canvas-paste-target')||!editable(event.target))event.preventDefault();
      if(event.clipboardData?.files?.length)be('这些文件不是支持的图片。请选择 PNG、JPEG 或 WebP。');
    };
    const fallback=event=>{
      if(!(event.ctrlKey||event.metaKey)||event.key.toLowerCase()!=='v'||event.repeat||blocked(event)||editable(event.target))return;
      pasteSink.current?.focus({preventScroll:true});
      const serial=pasteSerial.current;clearTimeout(pasteFallback.current);
      pasteFallback.current=setTimeout(()=>{if(pasteSerial.current===serial)pasteClipboard();},180);
    };
    window.addEventListener('paste',paste,true);window.addEventListener('keydown',fallback,true);
    return()=>{window.removeEventListener('paste',paste,true);window.removeEventListener('keydown',fallback,true);clearTimeout(pasteFallback.current);};
  },[Pt,pasteImages,pasteClipboard,In,be]);

  const lcNodeIndex = L.useMemo(()=>new Map((Ee?.nodes||[]).map(n=>[n.id,n])),[Ee?.nodes]);
  const Za = L.useMemo(() => ({ pasteImages, mentionImage, removeImage, providers: o, runs: c, assets: m, workspace: Ee, reference: Dt, unlink: edgeId => Ye(w => ({...w, edges:w.edges.filter(edge => edge.id !== edgeId)}), true), uploading: pe, update: zt, send: gi, stop: Hr, read: B, follow: dn, remove: Ft, inspect: rl, copy: Ql, connect: V, upload: Br, settings: () => {
    Ke().then(() => Y(true)).catch(() => {
    });
  }, showParams: D }), [o, c, m, pe, zt, gi, Hr, dn, Ft, rl, Ql, Br, Ee, Dt, Ye, pasteImages, mentionImage, removeImage]), Bt = Ee == null ? void 0 : Ee.nodes.find((Z) => Z.id === j), al = (Ee == null ? void 0 : Ee.edges.filter((Z) => {
    var ue;
    return Z.target === j && ((ue = Z.data) == null ? void 0 : ue.kind) !== "generation";
  }).sort((Z, ue) => {
    var ge, _e;
    return (((ge = Z.data) == null ? void 0 : ge.kind) === "history" ? 0 : 1) - (((_e = ue.data) == null ? void 0 : _e.kind) === "history" ? 0 : 1);
  })) || [], Ri = e12.filter((Z) => !N || Z.name.includes(N)), Jn = N ? Ee == null ? void 0 : Ee.nodes.filter((Z) => {
    var ue;
    return [Z.data.label, Z.data.prompt, Z.data.runId ? (ue = c[Z.data.runId]) == null ? void 0 : ue.text : ""].some((ge) => ge == null ? void 0 : ge.toLowerCase().includes(N.toLowerCase()));
  }).slice(0, 12) : [], _n = l ? _t.current[l] : void 0, qn = L.useCallback(() => X(null), []), ul = L.useCallback(() => re(null), []), Li = L.useCallback(() => J(false), []), Zl = L.useCallback(() => V(null), []), Hi = Object.values(c).filter((Z) => Z.workspaceId === l).filter(_m);
  return y ? x ? b.jsxs("div", { className: "app-loading", children: [b.jsx(jp, { size: 28 }), b.jsx("h2", { children: "未连接到本地服务" }), b.jsx("p", { children: x }), b.jsx("button", { className: "btn primary", onClick: () => location.reload(), children: "重新连接" })] }) : b.jsxs("div", { inert: he || void 0, className: `app-shell ${A ? "" : "sidebar-collapsed"}`, children: [A && b.jsxs("aside", { className: "sidebar", children: [b.jsxs("div", { className: "brand", children: [b.jsx("div", { className: "brand-mark", children: b.jsx(wr, { size: 19 }) }), b.jsx("span", { title: `版本 ${window.__lcAppVersion}`, children: "轻画布" }), b.jsx("button", { className: "icon-btn", "aria-label": "收起侧栏", onClick: () => k(false), children: b.jsx(TM, { size: 17 }) })] }), b.jsxs("button", { className: "new-workspace btn", onClick: Nn, children: [b.jsx(Vl, { size: 16 }), "新建画布"] }), b.jsxs("label", { className: "sidebar-search", children: [b.jsx(Oc, { size: 15 }), b.jsx("input", { "aria-label": "搜索画布与节点", placeholder: "搜索画布与节点", value: N, onChange: (Z) => C(Z.target.value) })] }), b.jsxs("div", { className: "sidebar-section-title", children: ["我的画布 ", b.jsx("span", { children: e12.length })] }), b.jsxs("nav", { className: "workspace-list", children: [Ri.map((Z) => b.jsxs("button", { className: `workspace-row ${Z.id === l ? "active" : ""}`, onClick: () => nn(Z.id), children: [b.jsx(bM, { size: 16 }), b.jsx("span", { children: Z.name }), Z.id === l && b.jsx(Wu, { size: 13 })] }, Z.id)), !Ri.length && b.jsx("p", { className: "small muted", children: "没有匹配的画布" })] }), !!(Jn != null && Jn.length) && b.jsxs("div", { className: "node-search-results", children: [b.jsx("div", { className: "sidebar-section-title", children: "当前画布内" }), Jn.map((Z) => b.jsxs("button", { className: "workspace-row", onClick: () => Ae.fitView({ nodes: [{ id: Z.id }], maxZoom: 1, padding: 0.5, duration: 200 }), children: [b.jsx(Oc, { size: 13 }), b.jsx("span", { children: Z.data.prompt.slice(0, 24) || Z.data.label })] }, Z.id))] }), b.jsxs("div", { className: "sidebar-bottom", children: [b.jsx(lcImageHistory,{workspace:Ee,runs:c,assets:m,onDeleteImage:async(runId,assetId)=>{
    if(O.current)throw Error("请等待当前操作结束后重试。");
    O.current=true;
    try{await Ke();await Hn(`/runs/${encodeURIComponent(runId)}/images/${encodeURIComponent(assetId)}`,{method:"DELETE"});_t.current={};fe.current=null;await Ze();}finally{O.current=false;}
  }}), b.jsxs("button", { className: "workspace-row", onClick: () => {
    Ke().then(() => Y(true)).catch(() => {
    });
  }, children: [b.jsx(Xm, { size: 17 }), b.jsx("span", { children: "服务商与设置" })] }), b.jsxs("button", { className: "workspace-row", onClick: () => J(true), children: [b.jsx(jv, { size: 17 }), b.jsx("span", { children: "快捷键" })] }), b.jsxs("div", { className: "local-note", children: [b.jsx(SM, { size: 13 }), b.jsx("span", { children: "保存在本机 · 可完整迁移" })] })] })] }), b.jsxs("main", { className: "workspace-main", children: [b.jsxs("header", { className: "topbar", children: [b.jsxs("div", { className: "workspace-heading", children: [!A && b.jsx("button", { className: "icon-btn", "aria-label": "展开侧栏", onClick: () => k(true), children: b.jsx(AM, { size: 18 }) }), b.jsx("span", { className: "breadcrumb", children: "我的画布" }), b.jsx(Wu, { className: "breadcrumb-arrow", size: 14 }), b.jsx("input", { className: "workspace-name", "aria-label": "画布名称", value: (Ee == null ? void 0 : Ee.name) || "", onChange: (Z) => Ye((ue) => ({ ...ue, name: Z.target.value })) }), b.jsxs("span", { className: `save-indicator ${S === "保存失败" ? "failed" : ""}`, children: [S === "已保存" && b.jsx(Ym, { size: 12 }), " ", S] })] }), b.jsxs("div", { className: "topbar-actions", children: [S === "保存失败" && b.jsx("button", { className: "btn compact", onClick: () => {
    Le.current && $m("未保存草稿-" + Le.current.name + ".json", JSON.stringify(Le.current, null, 2));
  }, children: "保存草稿副本" }), b.jsx("span", { className: "direct-badge", children: "原文 · 原图直传" }), b.jsxs("button", { className: "btn compact", title: "导出画布结构 JSON；完整迁移请使用设置中的备份", onClick: async () => {
    await Ke(), Le.current && $m(`${Le.current.name}.json`, JSON.stringify(Le.current, null, 2));
  }, children: [b.jsx(Xa, { size: 15 }), b.jsx("span", { children: "导出结构" })] }), b.jsx("button", { className: "icon-btn", "aria-label": "打开设置", onClick: () => {
    Ke().then(() => Y(true)).catch(() => {
    });
  }, children: b.jsx(Xm, { size: 18 }) })] })] }), b.jsxs("div", { className: "canvas-layout", children: [b.jsxs("div", { className: "canvas-container", ref: de, tabIndex: 0, "aria-label": "节点画布", onDoubleClick: (Z) => {
    Z.target.classList.contains("react-flow__pane") && bt("chat", Ae.screenToFlowPosition({ x: Z.clientX, y: Z.clientY }));
  }, onPointerDown: (Z) => {
    var ue;
    Ab(Z.target) || (ue = pasteSink.current || de.current) == null || ue.focus({ preventScroll: true });
  }, children: [b.jsx("div",{ref:pasteSink,contentEditable:true,suppressContentEditableWarning:true,className:"canvas-paste-target",tabIndex:-1,"aria-hidden":true,onInput:event=>{event.currentTarget.textContent="";}}), b.jsx("input",{ref:canvasImageInput,hidden:true,type:"file",accept:"image/png,image/jpeg,image/webp",multiple:true,"aria-label":"导入多张图片",onChange:event=>{const files=lc15ClipboardImages({files:event.currentTarget.files});event.currentTarget.value="";if(files.length)pasteImages(files);}}), Ee ? b.jsx(iE.Provider, { value: Za, children: b.jsxs(RA, { onlyRenderVisibleElements:true, nodes: Ee.nodes.map((Z) => ({ ...Z, type: "canvas", sourcePosition:Ie.Right, targetPosition:Ie.Left, dragHandle: ".node-drag-handle" })), edges: Ee.edges.map(edge => {
  const source = lcNodeIndex.get(edge.source), target = lcNodeIndex.get(edge.target);
  const images = source?.data.runId ? c[source.data.runId]?.assetIds : source?.data.assetIds;
  return {...edge, type: "default", pathOptions: {curvature: 0.3}, label: edge.data?.kind === "generation" ? undefined : target?.data.mode === "image" && images?.length ? "参考图" : edge.label};
}), connectionLineType: "default", nodeTypes: I8, onNodesChange: (Z) => Ye((ue) => ({ ...ue, nodes: t2(Z, ue.nodes) }), false, Z.every((ue) => ue.type === "dimensions" || ue.type === "select")), onEdgesChange: (Z) => Ye((ue) => ({ ...ue, edges: n2(Z, ue.edges) }), false, Z.every((ue) => ue.type === "select")), onNodeDragStart: lt, onConnect: (Z) => {
    Z.source && Z.target && Dt(Z.source, Z.target);
  }, isValidConnection: (Z) => !!Le.current && Cm(Le.current, Z.source, Z.target), onPaneClick: () => D(null), onNodeClick: (Z, ue) => {
    H && ue.data.kind === "input" && Dt(H, ue.id);
  }, onMoveEnd: (Z, ue) => Ye((ge) => ({ ...ge, viewport: ue })), defaultViewport: Ee.viewport || { x: 70, y: 75, zoom: 1 }, deleteKeyCode: null, panOnDrag: [1], selectionOnDrag: true, selectionKeyCode: "Shift", multiSelectionKeyCode: "Shift", panActivationKeyCode: "Space", panOnScroll: _ === "pan", zoomOnScroll: _ === "zoom", zoomOnPinch: true, zoomOnDoubleClick: false, minZoom: 0.1, maxZoom: 2, connectionRadius: 28, connectOnClick: true, proOptions: { hideAttribution: false }, children: [b.jsx(VA, { variant: nl.Dots, gap: 22, size: 1, color: "#d7d7d7" }), b.jsx(Nr, { position: "top-left", children: b.jsxs("div", { className: "canvas-toolbar", children: [b.jsxs("button", { className: "toolbar-main", onClick: () => bt(), children: [b.jsx(Vl, { size: 16 }), "新建输入"] }), b.jsxs("button",{className:"toolbar-align","aria-label":"粘贴图片",title:"从系统剪贴板粘贴图片 · Ctrl / Cmd + V",onClick:pasteClipboard,children:[b.jsx(R2,{size:15}),"粘贴图片"]}), b.jsxs("button",{className:"toolbar-align","aria-label":"导入图片",title:"一次选择多张图片",onClick:()=>canvasImageInput.current?.click(),children:[b.jsx(vc,{size:15}),"导入图片"]}), b.jsx("span", { className: "control-divider" }), b.jsx("button", { className: "icon-btn", "aria-label": "新建图片输入", title: "新建图片输入", onClick: () => bt("image"), children: b.jsx(vc, { size: 17 }) }), b.jsx("button", { className: "icon-btn", "aria-label": "新建笔记", title: "新建笔记", onClick: () => bt("chat", void 0, true), children: b.jsx(q2, { size: 17 }) }), b.jsx("span", { className: "control-divider" }), b.jsx("button", { className: "icon-btn", "aria-label": "撤销", title: "撤销 Ctrl+Z", disabled: !(_n != null && _n.undo.length), onClick: () => It(), children: b.jsx(HM, { size: 17 }) }), b.jsx("button", { className: "icon-btn", "aria-label": "重做", title: "重做 Ctrl+Shift+Z", disabled: !(_n != null && _n.redo.length), onClick: () => It(true), children: b.jsx(jM, { size: 17 }) }), b.jsx("span",{className:"control-divider"}), b.jsxs("button",{className:"toolbar-align","aria-label":"自动对齐",title:"选中多个节点时对齐所选，否则整理整个画布",disabled:!Ee || Ee.nodes.length<2,onClick:alignNodes,children:[b.jsx(lc16AlignIcon,{size:16}),"自动对齐"]})] }) }), b.jsx(Nr, { position: "bottom-left", children: b.jsx("div", { className: "canvas-bottom", children: b.jsx(q8, {}) }) }), b.jsx(Nr, { position: "bottom-right", children: b.jsxs("button", { className: "canvas-help", onClick: () => J(true), children: [b.jsx(jv, { size: 14 }), b.jsx("span", { children: "左键框选 · 中键平移" })] }) })] }, Ee.id) }) : b.jsxs("div", { className: "empty-canvas", children: [b.jsx(wr, { size: 32 }), b.jsx("h2", { children: "打开一张新的画布" }), b.jsxs("button", { className: "btn primary", onClick: Nn, children: [b.jsx(Vl, { size: 16 }), "新建画布"] })] }), (Ee == null ? void 0 : Ee.nodes.length) === 0 && b.jsxs("div", { className: "empty-canvas", children: [b.jsx(wr, { size: 30 }), b.jsx("h2", { children: "想法，从一张卡片开始" }), b.jsx("p", { children: "双击空白处，或添加一个输入节点。" }), b.jsxs("button", { className: "btn primary", onClick: () => bt(), children: [b.jsx(Vl, { size: 16 }), "新建输入"] })] }), !!Hi.length && b.jsxs("div", { className: "running-strip", children: [b.jsx("span", { className: "pulse-dot" }), Hi.length, " 个任务处理中", b.jsx("button", { onClick: () => {
    const Z = Hi[0], ue = Ee == null ? void 0 : Ee.nodes.find((ge) => ge.data.runId === Z.id);
    ue && Ae.fitView({ nodes: [{ id: ue.id }], maxZoom: 1, padding: 0.6, duration: 200 });
  }, children: "查看" })] })] }), Bt && b.jsxs("aside", { className: "inspector", children: [b.jsxs("header", { children: [b.jsxs("h2", { children: [b.jsx(I2, { size: 16 }), "节点设置"] }), b.jsx("button", { className: "icon-btn", "aria-label": "关闭节点设置", onClick: () => D(null), children: b.jsx(Yl, { size: 17 }) })] }), b.jsxs("div", { className: "inspector-body", children: [b.jsxs("label", { className: "field", children: ["节点名称", b.jsx("input", { className: "input", value: Bt.data.label, onChange: (Z) => zt(Bt.id, { label: Z.target.value }) })] }), b.jsx("div", { className: "section-heading", children: "本次上下文" }), b.jsx("p", { className: "small muted", children: "只发送当前输入，以及下面明确连接的内容。" }), al.length ? al.map((Z, ue) => {
    var _e, ze, je, He;
    const ge = Ee == null ? void 0 : Ee.nodes.find((Re) => Re.id === Z.source);
    return b.jsxs("div", { className: "context-item", children: [b.jsx(B2, { size: 13 }), b.jsxs("span", { children: [(ge == null ? void 0 : ge.data.label) || "来源缺失", b.jsx("small", { children: ((_e = Z.data) == null ? void 0 : _e.kind) === "history" ? "本分支历史" : "仅引用内容" })] }), b.jsx("button", { className: "node-icon", "aria-label": "引用上移", disabled: ue === 0 || ((ze = Z.data) == null ? void 0 : ze.kind) !== "reference" || ((He = (je = al[ue - 1]) == null ? void 0 : je.data) == null ? void 0 : He.kind) !== "reference", onClick: () => Ye((Re) => {
      const Ue = [...Re.edges], tt = Ue.findIndex((ht) => ht.id === Z.id), ft = Ue.findIndex((ht) => ht.id === al[ue - 1].id);
      return [Ue[tt], Ue[ft]] = [Ue[ft], Ue[tt]], { ...Re, edges: Ue };
    }, true), children: b.jsx(O2, { size: 12 }) }), b.jsx("button", { className: "node-icon", "aria-label": "移除上下文", onClick: () => Ye((Re) => ({ ...Re, edges: Re.edges.filter((Ue) => Ue.id !== Z.id) }), true), children: b.jsx(Yl, { size: 12 }) })] }, Z.id);
  }) : b.jsx("div", { className: "context-empty", children: "仅当前提示词和所附图片" }), b.jsx("button", { className: "btn full", onClick: () => rl(Bt.id), children: "查看实际发送内容" }), b.jsx("div", { className: "section-heading", children: "生成参数" }), Bt.data.mode === "chat" ? b.jsxs(b.Fragment, { children: [b.jsxs("label", { className: "field", children: ["最大输出长度", b.jsx("input", { type: "number", className: "input", min: "1", placeholder: "使用服务商默认值", value: Bt.data.params.maxOutputTokens ?? "", onChange: (Z) => zt(Bt.id, { params: { ...Bt.data.params, maxOutputTokens: Z.target.value ? Number(Z.target.value) : void 0 } }) })] }), b.jsxs("label", { className: "field", children: ["Temperature（仅支持的模型）", b.jsx("input", { type: "number", className: "input", min: "0", max: "2", step: "0.1", placeholder: "不指定", value: Bt.data.params.temperature ?? "", onChange: (Z) => zt(Bt.id, { params: { ...Bt.data.params, temperature: Z.target.value ? Number(Z.target.value) : void 0 } }) })] }), b.jsxs("label", { className: "field", children: ["系统提示词（可留空）", b.jsx("textarea", { className: "input", rows: 4, placeholder: "仅使用你明确写下的内容", value: Bt.data.systemPrompt, onChange: (Z) => zt(Bt.id, { systemPrompt: Z.target.value }) })] })] }) : b.jsxs(b.Fragment, { children: [b.jsx(nE, { model: Bt.data.model, params: Bt.data.params, onChange: (Z) => zt(Bt.id, { params: { ...Bt.data.params, ...Z } }) }), b.jsx("p", { className: "small muted", children: "有图片附件时使用图片编辑接口，需服务商明确支持。图片按原文件转发。" })] }), b.jsx("p", { className: "small muted", children: "参数是否支持取决于所选模型。应用不会自动换模型或重试。" })] })] })] })] }), he && Jc.createPortal(b.jsx("div", { className: "preparation-shield", role: "status", children: b.jsx("span", { children: "正在保存并提交原文…" }) }), document.body), $ && b.jsxs("div", { className: "toast", role: "status", children: [b.jsx(Ym, { size: 15 }), b.jsx("span", { children: $ }), b.jsx("button", { className: "node-icon", "aria-label": "关闭提示", onClick: () => F(""), children: b.jsx(Yl, { size: 14 }) })] }), T && b.jsx(U8, { providers: o, onClose: () => Y(false), onSaved: () => {
    Rc().then((Z) => s(Z.providers)).catch((Z) => be(Z.message));
  }, onRestored: () => {
    Ze(false).then(() => be("已恢复为新画布")).catch((Z) => be(Z.message)), Y(false);
  } }), M && b.jsx(rE, { runId: M, onClose: () => B(null) }), U && b.jsx(hc, { title: "重新发送新的请求", onClose: qn, children: b.jsxs("div", { className: "preview-content", children: [b.jsx("p", { children: "这个输入有一条结果未知的请求，上游可能已处理并计费。请先到服务商核实；重新发送会创建另一条请求，并可能再次计费。" }), b.jsxs("div", { className: "confirm-actions", children: [b.jsx("button", { className: "btn", onClick: qn, children: "返回核实" }), b.jsx("button", { className: "btn primary", onClick: () => {
    const Z = U;
    X(null), gi(Z, true);
  }, children: "确认发送新请求" })] })] }) }), ie && b.jsx(hc, { title: ie.title, onClose: ul, wide: true, children: b.jsxs("div", { className: "preview-content", children: [b.jsx("p", { className: "muted", children: "以下内容由当前节点和明确选择的来源组成。提示词不润色，图片不压缩；查看不会调用 API。" }), b.jsx("pre", { className: "request-json", children: JSON.stringify(ie.data, null, 2) }), b.jsxs("button", { className: "btn", onClick: () => Ql(JSON.stringify(ie.data, null, 2)), children: [b.jsx(Xa, { size: 15 }), "复制请求记录"] })] }) }), H && b.jsx(hc, { title: "选择引用目标", onClose: Zl, children: b.jsxs("div", { className: "connect-options", children: [b.jsx("p", { className: "muted", children: "将选中节点的内容引用到一个输入节点，连接后不会自动发送。" }), Ee == null ? void 0 : Ee.nodes.filter((Z) => Cm(Ee, H, Z.id)).map((Z) => b.jsxs("button", { className: "connect-option", onClick: () => Dt(H, Z.id), children: [b.jsx(wr, { size: 16 }), b.jsxs("span", { children: [Z.data.label, b.jsx("small", { children: Z.data.prompt.slice(0, 60) || "空白输入" })] }), b.jsx(Wu, { size: 16 })] }, Z.id)), b.jsxs("button", { className: "btn full", onClick: () => {
    const source=Ee?.nodes.find(node=>node.id===H);
    const Z = bt(source?.data.kind === "image" ? "image" : "chat",source?lc16Right(Ee,source,"input"):undefined,false,true);
    Z && Dt(H, Z.id);
  }, children: [b.jsx(Vl, { size: 16 }), "创建新输入并引用"] })] }) }), G && b.jsx(hc, { title: "操作与快捷键", onClose: Li, children: b.jsxs("div", { className: "help-content", children: [b.jsxs("div", { className: "help-intro", children: [b.jsx(Mv, { size: 22 }), b.jsx("p", { children: "鼠标与触摸板都能完整操作。拖动标题栏移动节点，正文可以正常选字。" })] }), b.jsxs("label", { className: "field", children: ["滚动方式", b.jsxs("select", { className: "select", value: _, onChange: (Z) => {
    const ue = Z.target.value;
    se(ue), localStorage.setItem("lc-scroll-mode", ue), V2("/preferences", { key: "scroll-mode", value: ue }).catch((ge) => be(ge.message));
  }, children: [b.jsx("option", { value: "pan", children: "滚动平移（触摸板推荐）" }), b.jsx("option", { value: "zoom", children: "滚动缩放（鼠标习惯）" })] })] }), b.jsx("dl", { className: "shortcut-list", children: [["发送当前提示词", "Ctrl / Cmd + Enter"], ["新建输入 / 继续追问", "N / B"], ["连接引用 / 展开阅读", "C / E"], ["删除所选节点或线", "Delete / Backspace"], ["撤销 / 重做", "Ctrl + Z / Ctrl + Shift + Z"], ["多选", "Shift + 点击"], ["框选", "左键拖动空白处"], ["复制 / 粘贴节点", "Ctrl / Cmd + C / V"], ["粘贴图片为参考节点", "Ctrl / Cmd + V"], ["适合全部 / 定位所选", "F / Shift + F"], ["恢复 100%", "0"], ["移动画布", "中键拖动 / Space + 拖动"], ["缩放", "捏合 / Ctrl + 滚轮"], ["取消当前操作", "Esc"]].map(([Z, ue]) => b.jsxs("div", { children: [b.jsx("dt", { children: Z }), b.jsx("dd", { children: b.jsx("kbd", { children: ue }) })] }, Z)) }), b.jsx("p", { className: "small muted", children: "输入文字、中文选字或阅读窗口打开时，画布快捷键暂停。普通 Enter 换行。连线也可先点输出端，再点目标输入端。" })] }) })] }) : b.jsxs("div", { className: "app-loading", children: [b.jsx("div", { className: "brand-mark", children: b.jsx(wr, { size: 21 }) }), b.jsx("p", { children: "正在打开你的画布…" })] });
}
const Mb = location.pathname.match(/^\/reader\/([^/]+)$/);
Kk.createRoot(document.getElementById("root")).render(Mb ? b.jsx(rE, { runId: decodeURIComponent(Mb[1]), standalone: true }) : b.jsx(T2, { children: b.jsx(V8, {}) }));
