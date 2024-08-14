// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __reExport = (target, mod, secondTarget) => {
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(target, key) && key !== "default")
      __defProp(target, key, {
        get: () => mod[key],
        enumerable: true
      });
  if (secondTarget) {
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(secondTarget, key) && key !== "default")
        __defProp(secondTarget, key, {
          get: () => mod[key],
          enumerable: true
        });
    return secondTarget;
  }
};
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = (id) => {
  return import.meta.require(id);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/@kitajs/html/index.js
var require_html = __commonJS((exports, module) => {
  var isUpper = function(input, index) {
    const code = input.charCodeAt(index);
    return code >= 65 && code <= 90;
  };
  var toKebabCase = function(camel) {
    if (!CAMEL_REGEX.test(camel)) {
      return camel;
    }
    const length = camel.length;
    let start = 0;
    let end = 0;
    let kebab = "";
    let prev = true;
    let curr = isUpper(camel, 0);
    let next;
    for (;end < length; end++) {
      next = isUpper(camel, end + 1);
      if (!prev && curr && !next) {
        kebab += camel.slice(start, end) + "-" + camel[end].toLowerCase();
        start = end + 1;
      }
      prev = curr;
      curr = next;
    }
    kebab += camel.slice(start, end);
    return kebab;
  };
  var isVoidElement = function(tag) {
    return tag === "meta" || tag === "link" || tag === "img" || tag === "br" || tag === "input" || tag === "hr" || tag === "area" || tag === "base" || tag === "col" || tag === "command" || tag === "embed" || tag === "keygen" || tag === "param" || tag === "source" || tag === "track" || tag === "wbr";
  };
  var styleToString = function(style) {
    if (typeof style === "string") {
      let end2 = style.indexOf('"');
      if (end2 === -1) {
        return style;
      }
      const length2 = style.length;
      let escaped = "";
      let start2 = 0;
      for (;end2 < length2; end2++) {
        if (style[end2] === '"') {
          escaped += style.slice(start2, end2) + "&#34;";
          start2 = end2 + 1;
        }
      }
      escaped += style.slice(start2, end2);
      return escaped;
    }
    const keys = Object.keys(style);
    const length = keys.length;
    let key, value, end, start;
    let index = 0;
    let result = "";
    for (;index < length; index++) {
      key = keys[index];
      value = style[key];
      if (value === null || value === undefined) {
        continue;
      }
      result += toKebabCase(key) + ":";
      if (typeof value !== "string") {
        result += value.toString() + ";";
        continue;
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += value + ";";
        continue;
      }
      const length2 = value.length;
      start = 0;
      for (;end < length2; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + ";";
    }
    return result;
  };
  var attributesToString = function(attributes) {
    const keys = Object.keys(attributes);
    const length = keys.length;
    let key, value, type, end, start;
    let result = "";
    let index = 0;
    for (;index < length; index++) {
      key = keys[index];
      if (key === "children" || key === "safe") {
        continue;
      }
      value = attributes[key];
      if (key === "className") {
        if (attributes.class !== undefined) {
          continue;
        }
        key = "class";
      }
      if (key === "style") {
        result += ' style="' + styleToString(value) + '"';
        continue;
      }
      type = typeof value;
      if (type === "boolean") {
        if (value) {
          result += " " + key;
        }
        continue;
      }
      if (value === null || value === undefined) {
        continue;
      }
      result += " " + key;
      if (type !== "string") {
        if (type !== "object") {
          result += '="' + value.toString() + '"';
          continue;
        } else if (value instanceof Date) {
          result += '="' + value.toISOString() + '"';
          continue;
        }
        value = value.toString();
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += '="' + value + '"';
        continue;
      }
      result += '="';
      const length2 = value.length;
      start = 0;
      for (;end < length2; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + '"';
    }
    return result;
  };
  var contentsToString = function(contents, escape) {
    const length = contents.length;
    let result = "";
    let content;
    let index = 0;
    for (;index < length; index++) {
      content = contents[index];
      if (typeof content !== "string") {
        if (!content && content !== 0) {
          continue;
        }
        if (Array.isArray(content)) {
          content = contentsToString(content);
        }
        if (content.then) {
          return content.then(function resolveAsyncContent(resolved) {
            return contentsToString([result, resolved].concat(contents.slice(index + 1)), escape);
          });
        }
      }
      result += content;
    }
    if (escape === true) {
      return escapeHtml(result);
    }
    return result;
  };
  var createElement = function(name, attrs, ...children) {
    const hasAttrs = attrs !== null;
    if (typeof name === "function") {
      if (!hasAttrs) {
        attrs = { children: children.length > 1 ? children : children[0] };
      } else if (attrs.children === undefined) {
        attrs.children = children.length > 1 ? children : children[0];
      }
      return name(attrs);
    }
    if (hasAttrs && name === "tag") {
      name = String(attrs.of);
      delete attrs.of;
    }
    const attributes = hasAttrs ? attributesToString(attrs) : "";
    if (children.length === 0 && isVoidElement(name)) {
      return "<" + name + attributes + "/>";
    }
    const contents = contentsToString(children, hasAttrs && attrs.safe);
    if (typeof contents === "string") {
      return "<" + name + attributes + ">" + contents + "</" + name + ">";
    }
    return contents.then(function asyncChildren(child) {
      return "<" + name + attributes + ">" + child + "</" + name + ">";
    });
  };
  var Fragment = function(props) {
    return Html2.contentsToString([props.children]);
  };
  var compile = function(htmlFn, strict = true, separator = "/*\0*/") {
    if (typeof htmlFn !== "function") {
      throw new Error("The first argument must be a function.");
    }
    const properties = new Set;
    const html = htmlFn(new Proxy({}, {
      get(_, name) {
        properties.add(name);
        const isChildren = name === "children";
        let access = `args[${separator}\`${name.toString()}\`${separator}]`;
        if (isChildren) {
          access = `Array.isArray(${access}) ? ${access}.join(${separator}\`\`${separator}) : ${access}`;
        }
        return `\`${separator} + (${access} || ${strict && !isChildren ? `throwPropertyNotFound(${separator}\`${name.toString()}\`${separator})` : `${separator}\`\`${separator}`}) + ${separator}\``;
      }
    }));
    if (typeof html !== "string") {
      throw new Error("You cannot use compile() with async components.");
    }
    const sepLength = separator.length;
    const length = html.length;
    let body = "";
    let nextStart = 0;
    let index = 0;
    for (;index < length; index++) {
      if (html[index] === "`" && html.slice(index - sepLength, index) !== separator && html.slice(index + 1, index + sepLength + 1) !== separator) {
        body += html.slice(nextStart, index) + "\\`";
        nextStart = index + 1;
        continue;
      }
    }
    body += html.slice(nextStart);
    if (strict) {
      return Function("args", 'if (args === undefined) { throw new Error("The arguments object was not provided.") };\nfunction throwPropertyNotFound(name) { throw new Error("Property " + name + " was not provided.") };\n' + `return \`${body}\``);
    }
    return Function("args", "if (args === undefined) { args = Object.create(null) };\n" + `return \`${body}\``);
  };
  var ESCAPED_REGEX = /[<"'&]/;
  var CAMEL_REGEX = /[a-z][A-Z]/;
  var escapeHtml = function(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (!ESCAPED_REGEX.test(value)) {
      return value;
    }
    const length = value.length;
    let escaped = "";
    let start = 0;
    let end = 0;
    for (;end < length; end++) {
      switch (value[end]) {
        case "&":
          escaped += value.slice(start, end) + "&amp;";
          start = end + 1;
          continue;
        case "<":
          escaped += value.slice(start, end) + "&lt;";
          start = end + 1;
          continue;
        case '"':
          escaped += value.slice(start, end) + "&#34;";
          start = end + 1;
          continue;
        case "'":
          escaped += value.slice(start, end) + "&#39;";
          start = end + 1;
          continue;
      }
    }
    escaped += value.slice(start, end);
    return escaped;
  };
  if (typeof Bun !== "undefined")
    escapeHtml = Bun.escapeHTML;
  var Html2 = {
    escapeHtml,
    isVoidElement,
    attributesToString,
    toKebabCase,
    isUpper,
    styleToString,
    createElement,
    h: createElement,
    contentsToString,
    compile,
    Fragment
  };
  module.exports = Html2;
  module.exports.Html = Html2;
  module.exports.default = Html2;
});

// node_modules/@kitajs/html/register.js
var require_register = __commonJS(() => {
  var root;
  try {
    root = Function("return this")();
  } catch (_) {
    root = window;
  }
  if (!root.Html) {
    root.Html = require_html();
  }
  if (root.Html.default) {
    root.Html = root.Html.default;
  }
});

// node_modules/dayjs/dayjs.min.js
var require_dayjs_min = __commonJS((exports, module) => {
  (function(t, e) {
    typeof exports == "object" && typeof module != "undefined" ? module.exports = e() : typeof define == "function" && define.amd ? define(e) : (t = typeof globalThis != "undefined" ? globalThis : t || self).dayjs = e();
  })(exports, function() {
    var t = 1000, e = 60000, n = 3600000, r = "millisecond", i = "second", s = "minute", u = "hour", a2 = "day", o = "week", c = "month", f = "quarter", h = "year", d = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t2) {
      var e2 = ["th", "st", "nd", "rd"], n2 = t2 % 100;
      return "[" + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + "]";
    } }, m = function(t2, e2, n2) {
      var r2 = String(t2);
      return !r2 || r2.length >= e2 ? t2 : "" + Array(e2 + 1 - r2.length).join(n2) + t2;
    }, v = { s: m, z: function(t2) {
      var e2 = -t2.utcOffset(), n2 = Math.abs(e2), r2 = Math.floor(n2 / 60), i2 = n2 % 60;
      return (e2 <= 0 ? "+" : "-") + m(r2, 2, "0") + ":" + m(i2, 2, "0");
    }, m: function t(e2, n2) {
      if (e2.date() < n2.date())
        return -t(n2, e2);
      var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()), i2 = e2.clone().add(r2, c), s2 = n2 - i2 < 0, u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
      return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
    }, a: function(t2) {
      return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
    }, p: function(t2) {
      return { M: c, y: h, w: o, d: a2, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] || String(t2 || "").toLowerCase().replace(/s$/, "");
    }, u: function(t2) {
      return t2 === undefined;
    } }, g = "en", D = {};
    D[g] = M;
    var p = "$isDayjsObject", S = function(t2) {
      return t2 instanceof _ || !(!t2 || !t2[p]);
    }, w = function t(e2, n2, r2) {
      var i2;
      if (!e2)
        return g;
      if (typeof e2 == "string") {
        var s2 = e2.toLowerCase();
        D[s2] && (i2 = s2), n2 && (D[s2] = n2, i2 = s2);
        var u2 = e2.split("-");
        if (!i2 && u2.length > 1)
          return t(u2[0]);
      } else {
        var a3 = e2.name;
        D[a3] = e2, i2 = a3;
      }
      return !r2 && i2 && (g = i2), i2 || !r2 && g;
    }, O = function(t2, e2) {
      if (S(t2))
        return t2.clone();
      var n2 = typeof e2 == "object" ? e2 : {};
      return n2.date = t2, n2.args = arguments, new _(n2);
    }, b = v;
    b.l = w, b.i = S, b.w = function(t2, e2) {
      return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
    };
    var _ = function() {
      function M2(t2) {
        this.$L = w(t2.locale, null, true), this.parse(t2), this.$x = this.$x || t2.x || {}, this[p] = true;
      }
      var m2 = M2.prototype;
      return m2.parse = function(t2) {
        this.$d = function(t3) {
          var { date: e2, utc: n2 } = t3;
          if (e2 === null)
            return new Date(NaN);
          if (b.u(e2))
            return new Date;
          if (e2 instanceof Date)
            return new Date(e2);
          if (typeof e2 == "string" && !/Z$/i.test(e2)) {
            var r2 = e2.match($);
            if (r2) {
              var i2 = r2[2] - 1 || 0, s2 = (r2[7] || "0").substring(0, 3);
              return n2 ? new Date(Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2)) : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
            }
          }
          return new Date(e2);
        }(t2), this.init();
      }, m2.init = function() {
        var t2 = this.$d;
        this.$y = t2.getFullYear(), this.$M = t2.getMonth(), this.$D = t2.getDate(), this.$W = t2.getDay(), this.$H = t2.getHours(), this.$m = t2.getMinutes(), this.$s = t2.getSeconds(), this.$ms = t2.getMilliseconds();
      }, m2.$utils = function() {
        return b;
      }, m2.isValid = function() {
        return !(this.$d.toString() === l);
      }, m2.isSame = function(t2, e2) {
        var n2 = O(t2);
        return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
      }, m2.isAfter = function(t2, e2) {
        return O(t2) < this.startOf(e2);
      }, m2.isBefore = function(t2, e2) {
        return this.endOf(e2) < O(t2);
      }, m2.$g = function(t2, e2, n2) {
        return b.u(t2) ? this[e2] : this.set(n2, t2);
      }, m2.unix = function() {
        return Math.floor(this.valueOf() / 1000);
      }, m2.valueOf = function() {
        return this.$d.getTime();
      }, m2.startOf = function(t2, e2) {
        var n2 = this, r2 = !!b.u(e2) || e2, f2 = b.p(t2), l2 = function(t3, e3) {
          var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
          return r2 ? i2 : i2.endOf(a2);
        }, $2 = function(t3, e3) {
          return b.w(n2.toDate()[t3].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)), n2);
        }, y2 = this.$W, M3 = this.$M, m3 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
        switch (f2) {
          case h:
            return r2 ? l2(1, 0) : l2(31, 11);
          case c:
            return r2 ? l2(1, M3) : l2(0, M3 + 1);
          case o:
            var g2 = this.$locale().weekStart || 0, D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
            return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
          case a2:
          case d:
            return $2(v2 + "Hours", 0);
          case u:
            return $2(v2 + "Minutes", 1);
          case s:
            return $2(v2 + "Seconds", 2);
          case i:
            return $2(v2 + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, m2.endOf = function(t2) {
        return this.startOf(t2, false);
      }, m2.$set = function(t2, e2) {
        var n2, o2 = b.p(t2), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a2] = f2 + "Date", n2[d] = f2 + "Date", n2[c] = f2 + "Month", n2[h] = f2 + "FullYear", n2[u] = f2 + "Hours", n2[s] = f2 + "Minutes", n2[i] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a2 ? this.$D + (e2 - this.$W) : e2;
        if (o2 === c || o2 === h) {
          var y2 = this.clone().set(d, 1);
          y2.$d[l2]($2), y2.init(), this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d;
        } else
          l2 && this.$d[l2]($2);
        return this.init(), this;
      }, m2.set = function(t2, e2) {
        return this.clone().$set(t2, e2);
      }, m2.get = function(t2) {
        return this[b.p(t2)]();
      }, m2.add = function(r2, f2) {
        var d2, l2 = this;
        r2 = Number(r2);
        var $2 = b.p(f2), y2 = function(t2) {
          var e2 = O(l2);
          return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
        };
        if ($2 === c)
          return this.set(c, this.$M + r2);
        if ($2 === h)
          return this.set(h, this.$y + r2);
        if ($2 === a2)
          return y2(1);
        if ($2 === o)
          return y2(7);
        var M3 = (d2 = {}, d2[s] = e, d2[u] = n, d2[i] = t, d2)[$2] || 1, m3 = this.$d.getTime() + r2 * M3;
        return b.w(m3, this);
      }, m2.subtract = function(t2, e2) {
        return this.add(-1 * t2, e2);
      }, m2.format = function(t2) {
        var e2 = this, n2 = this.$locale();
        if (!this.isValid())
          return n2.invalidDate || l;
        var r2 = t2 || "YYYY-MM-DDTHH:mm:ssZ", i2 = b.z(this), s2 = this.$H, u2 = this.$m, a3 = this.$M, o2 = n2.weekdays, c2 = n2.months, f2 = n2.meridiem, h2 = function(t3, n3, i3, s3) {
          return t3 && (t3[n3] || t3(e2, r2)) || i3[n3].slice(0, s3);
        }, d2 = function(t3) {
          return b.s(s2 % 12 || 12, t3, "0");
        }, $2 = f2 || function(t3, e3, n3) {
          var r3 = t3 < 12 ? "AM" : "PM";
          return n3 ? r3.toLowerCase() : r3;
        };
        return r2.replace(y, function(t3, r3) {
          return r3 || function(t4) {
            switch (t4) {
              case "YY":
                return String(e2.$y).slice(-2);
              case "YYYY":
                return b.s(e2.$y, 4, "0");
              case "M":
                return a3 + 1;
              case "MM":
                return b.s(a3 + 1, 2, "0");
              case "MMM":
                return h2(n2.monthsShort, a3, c2, 3);
              case "MMMM":
                return h2(c2, a3);
              case "D":
                return e2.$D;
              case "DD":
                return b.s(e2.$D, 2, "0");
              case "d":
                return String(e2.$W);
              case "dd":
                return h2(n2.weekdaysMin, e2.$W, o2, 2);
              case "ddd":
                return h2(n2.weekdaysShort, e2.$W, o2, 3);
              case "dddd":
                return o2[e2.$W];
              case "H":
                return String(s2);
              case "HH":
                return b.s(s2, 2, "0");
              case "h":
                return d2(1);
              case "hh":
                return d2(2);
              case "a":
                return $2(s2, u2, true);
              case "A":
                return $2(s2, u2, false);
              case "m":
                return String(u2);
              case "mm":
                return b.s(u2, 2, "0");
              case "s":
                return String(e2.$s);
              case "ss":
                return b.s(e2.$s, 2, "0");
              case "SSS":
                return b.s(e2.$ms, 3, "0");
              case "Z":
                return i2;
            }
            return null;
          }(t3) || i2.replace(":", "");
        });
      }, m2.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, m2.diff = function(r2, d2, l2) {
        var $2, y2 = this, M3 = b.p(d2), m3 = O(r2), v2 = (m3.utcOffset() - this.utcOffset()) * e, g2 = this - m3, D2 = function() {
          return b.m(y2, m3);
        };
        switch (M3) {
          case h:
            $2 = D2() / 12;
            break;
          case c:
            $2 = D2();
            break;
          case f:
            $2 = D2() / 3;
            break;
          case o:
            $2 = (g2 - v2) / 604800000;
            break;
          case a2:
            $2 = (g2 - v2) / 86400000;
            break;
          case u:
            $2 = g2 / n;
            break;
          case s:
            $2 = g2 / e;
            break;
          case i:
            $2 = g2 / t;
            break;
          default:
            $2 = g2;
        }
        return l2 ? $2 : b.a($2);
      }, m2.daysInMonth = function() {
        return this.endOf(c).$D;
      }, m2.$locale = function() {
        return D[this.$L];
      }, m2.locale = function(t2, e2) {
        if (!t2)
          return this.$L;
        var n2 = this.clone(), r2 = w(t2, e2, true);
        return r2 && (n2.$L = r2), n2;
      }, m2.clone = function() {
        return b.w(this.$d, this);
      }, m2.toDate = function() {
        return new Date(this.valueOf());
      }, m2.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, m2.toISOString = function() {
        return this.$d.toISOString();
      }, m2.toString = function() {
        return this.$d.toUTCString();
      }, M2;
    }(), k = _.prototype;
    return O.prototype = k, [["$ms", r], ["$s", i], ["$m", s], ["$H", u], ["$W", a2], ["$M", c], ["$y", h], ["$D", d]].forEach(function(t2) {
      k[t2[1]] = function(e2) {
        return this.$g(e2, t2[0], t2[1]);
      };
    }), O.extend = function(t2, e2) {
      return t2.$i || (t2(e2, _, O), t2.$i = true), O;
    }, O.locale = w, O.isDayjs = S, O.unix = function(t2) {
      return O(1000 * t2);
    }, O.en = D[g], O.Ls = D, O.p = {}, O;
  });
});

// node_modules/elysia/dist/bun/index.js
var $X = Object.create;
var { defineProperty: C8, getPrototypeOf: WX, getOwnPropertyNames: YX } = Object;
var XX = Object.prototype.hasOwnProperty;
var Z1 = ($, W, Y) => {
  Y = $ != null ? $X(WX($)) : {};
  const X = W || !$ || !$.__esModule ? C8(Y, "default", { value: $, enumerable: true }) : Y;
  for (let Z of YX($))
    if (!XX.call(X, Z))
      C8(X, Z, { get: () => $[Z], enumerable: true });
  return X;
};
var Q0 = ($, W) => () => (W || $((W = { exports: {} }).exports, W), W.exports);
var G8 = Q0((O7, e$) => {
  var r1 = function() {
  }, QX = function($, W, Y) {
    this.fn = $, this.context = W, this.once = Y || false;
  }, b8 = function($, W, Y, X, Z) {
    if (typeof Y !== "function")
      throw new TypeError("The listener must be a function");
    var Q = new QX(Y, X || $, Z), J = _0 ? _0 + W : W;
    if (!$._events[J])
      $._events[J] = Q, $._eventsCount++;
    else if (!$._events[J].fn)
      $._events[J].push(Q);
    else
      $._events[J] = [$._events[J], Q];
    return $;
  }, K$ = function($, W) {
    if (--$._eventsCount === 0)
      $._events = new r1;
    else
      delete $._events[W];
  }, R0 = function() {
    this._events = new r1, this._eventsCount = 0;
  }, ZX = Object.prototype.hasOwnProperty, _0 = "~";
  if (Object.create) {
    if (r1.prototype = Object.create(null), !new r1().__proto__)
      _0 = false;
  }
  R0.prototype.eventNames = function $() {
    var W = [], Y, X;
    if (this._eventsCount === 0)
      return W;
    for (X in Y = this._events)
      if (ZX.call(Y, X))
        W.push(_0 ? X.slice(1) : X);
    if (Object.getOwnPropertySymbols)
      return W.concat(Object.getOwnPropertySymbols(Y));
    return W;
  };
  R0.prototype.listeners = function $(W) {
    var Y = _0 ? _0 + W : W, X = this._events[Y];
    if (!X)
      return [];
    if (X.fn)
      return [X.fn];
    for (var Z = 0, Q = X.length, J = new Array(Q);Z < Q; Z++)
      J[Z] = X[Z].fn;
    return J;
  };
  R0.prototype.listenerCount = function $(W) {
    var Y = _0 ? _0 + W : W, X = this._events[Y];
    if (!X)
      return 0;
    if (X.fn)
      return 1;
    return X.length;
  };
  R0.prototype.emit = function $(W, Y, X, Z, Q, J) {
    var z = _0 ? _0 + W : W;
    if (!this._events[z])
      return false;
    var A = this._events[z], w = arguments.length, F, S;
    if (A.fn) {
      if (A.once)
        this.removeListener(W, A.fn, undefined, true);
      switch (w) {
        case 1:
          return A.fn.call(A.context), true;
        case 2:
          return A.fn.call(A.context, Y), true;
        case 3:
          return A.fn.call(A.context, Y, X), true;
        case 4:
          return A.fn.call(A.context, Y, X, Z), true;
        case 5:
          return A.fn.call(A.context, Y, X, Z, Q), true;
        case 6:
          return A.fn.call(A.context, Y, X, Z, Q, J), true;
      }
      for (S = 1, F = new Array(w - 1);S < w; S++)
        F[S - 1] = arguments[S];
      A.fn.apply(A.context, F);
    } else {
      var R = A.length, j;
      for (S = 0;S < R; S++) {
        if (A[S].once)
          this.removeListener(W, A[S].fn, undefined, true);
        switch (w) {
          case 1:
            A[S].fn.call(A[S].context);
            break;
          case 2:
            A[S].fn.call(A[S].context, Y);
            break;
          case 3:
            A[S].fn.call(A[S].context, Y, X);
            break;
          case 4:
            A[S].fn.call(A[S].context, Y, X, Z);
            break;
          default:
            if (!F)
              for (j = 1, F = new Array(w - 1);j < w; j++)
                F[j - 1] = arguments[j];
            A[S].fn.apply(A[S].context, F);
        }
      }
    }
    return true;
  };
  R0.prototype.on = function $(W, Y, X) {
    return b8(this, W, Y, X, false);
  };
  R0.prototype.once = function $(W, Y, X) {
    return b8(this, W, Y, X, true);
  };
  R0.prototype.removeListener = function $(W, Y, X, Z) {
    var Q = _0 ? _0 + W : W;
    if (!this._events[Q])
      return this;
    if (!Y)
      return K$(this, Q), this;
    var J = this._events[Q];
    if (J.fn) {
      if (J.fn === Y && (!Z || J.once) && (!X || J.context === X))
        K$(this, Q);
    } else {
      for (var z = 0, A = [], w = J.length;z < w; z++)
        if (J[z].fn !== Y || Z && !J[z].once || X && J[z].context !== X)
          A.push(J[z]);
      if (A.length)
        this._events[Q] = A.length === 1 ? A[0] : A;
      else
        K$(this, Q);
    }
    return this;
  };
  R0.prototype.removeAllListeners = function $(W) {
    var Y;
    if (W) {
      if (Y = _0 ? _0 + W : W, this._events[Y])
        K$(this, Y);
    } else
      this._events = new r1, this._eventsCount = 0;
    return this;
  };
  R0.prototype.off = R0.prototype.removeListener;
  R0.prototype.addListener = R0.prototype.on;
  R0.prefixed = _0;
  R0.EventEmitter = R0;
  if (typeof e$ !== "undefined")
    e$.exports = R0;
});
var E0 = Q0((v8) => {
  var JX = function($) {
    return O$($) && (Symbol.asyncIterator in $);
  }, zX = function($) {
    return O$($) && (Symbol.iterator in $);
  }, HX = function($) {
    return ArrayBuffer.isView($);
  }, qX = function($) {
    return $ instanceof Promise;
  }, NX = function($) {
    return $ instanceof Uint8Array;
  }, MX = function($) {
    return $ instanceof Date && Number.isFinite($.getTime());
  }, UX = function($, W) {
    return W in $;
  }, AX = function($) {
    return O$($) && d8($.constructor) && $.constructor.name === "Object";
  }, O$ = function($) {
    return $ !== null && typeof $ === "object";
  }, BX = function($) {
    return Array.isArray($) && !ArrayBuffer.isView($);
  }, x8 = function($) {
    return $ === undefined;
  }, k8 = function($) {
    return $ === null;
  }, g8 = function($) {
    return typeof $ === "boolean";
  }, $6 = function($) {
    return typeof $ === "number";
  }, FX = function($) {
    return $6($) && Number.isInteger($);
  }, f8 = function($) {
    return typeof $ === "bigint";
  }, T8 = function($) {
    return typeof $ === "string";
  }, d8 = function($) {
    return typeof $ === "function";
  }, y8 = function($) {
    return typeof $ === "symbol";
  }, wX = function($) {
    return f8($) || g8($) || k8($) || $6($) || T8($) || y8($) || x8($);
  };
  Object.defineProperty(v8, "__esModule", { value: true });
  v8.IsValueType = v8.IsSymbol = v8.IsFunction = v8.IsString = v8.IsBigInt = v8.IsInteger = v8.IsNumber = v8.IsBoolean = v8.IsNull = v8.IsUndefined = v8.IsArray = v8.IsObject = v8.IsPlainObject = v8.HasPropertyKey = v8.IsDate = v8.IsUint8Array = v8.IsPromise = v8.IsTypedArray = v8.IsIterator = v8.IsAsyncIterator = undefined;
  v8.IsAsyncIterator = JX;
  v8.IsIterator = zX;
  v8.IsTypedArray = HX;
  v8.IsPromise = qX;
  v8.IsUint8Array = NX;
  v8.IsDate = MX;
  v8.HasPropertyKey = UX;
  v8.IsPlainObject = AX;
  v8.IsObject = O$;
  v8.IsArray = BX;
  v8.IsUndefined = x8;
  v8.IsNull = k8;
  v8.IsBoolean = g8;
  v8.IsNumber = $6;
  v8.IsInteger = FX;
  v8.IsBigInt = f8;
  v8.IsString = T8;
  v8.IsFunction = d8;
  v8.IsSymbol = y8;
  v8.IsValueType = wX;
});
var x0 = Q0((h8) => {
  Object.defineProperty(h8, "__esModule", { value: true });
  h8.Type = h8.JsonType = h8.JavaScriptTypeBuilder = h8.JsonTypeBuilder = h8.TypeBuilder = h8.TypeBuilderError = h8.TransformEncodeBuilder = h8.TransformDecodeBuilder = h8.TemplateLiteralDslParser = h8.TemplateLiteralGenerator = h8.TemplateLiteralGeneratorError = h8.TemplateLiteralFinite = h8.TemplateLiteralFiniteError = h8.TemplateLiteralParser = h8.TemplateLiteralParserError = h8.TemplateLiteralResolver = h8.TemplateLiteralPattern = h8.TemplateLiteralPatternError = h8.UnionResolver = h8.KeyArrayResolver = h8.KeyArrayResolverError = h8.KeyResolver = h8.ObjectMap = h8.Intrinsic = h8.IndexedAccessor = h8.TypeClone = h8.TypeExtends = h8.TypeExtendsResult = h8.TypeExtendsError = h8.ExtendsUndefined = h8.TypeGuard = h8.TypeGuardUnknownTypeError = h8.ValueGuard = h8.FormatRegistry = h8.TypeBoxError = h8.TypeRegistry = h8.PatternStringExact = h8.PatternNumberExact = h8.PatternBooleanExact = h8.PatternString = h8.PatternNumber = h8.PatternBoolean = h8.Kind = h8.Hint = h8.Optional = h8.Readonly = h8.Transform = undefined;
  h8.Transform = Symbol.for("TypeBox.Transform");
  h8.Readonly = Symbol.for("TypeBox.Readonly");
  h8.Optional = Symbol.for("TypeBox.Optional");
  h8.Hint = Symbol.for("TypeBox.Hint");
  h8.Kind = Symbol.for("TypeBox.Kind");
  h8.PatternBoolean = "(true|false)";
  h8.PatternNumber = "(0|[1-9][0-9]*)";
  h8.PatternString = "(.*)";
  h8.PatternBooleanExact = `^${h8.PatternBoolean}$`;
  h8.PatternNumberExact = `^${h8.PatternNumber}$`;
  h8.PatternStringExact = `^${h8.PatternString}$`;
  var W6;
  (function($) {
    const W = new Map;
    function Y() {
      return new Map(W);
    }
    $.Entries = Y;
    function X() {
      return W.clear();
    }
    $.Clear = X;
    function Z(A) {
      return W.delete(A);
    }
    $.Delete = Z;
    function Q(A) {
      return W.has(A);
    }
    $.Has = Q;
    function J(A, w) {
      W.set(A, w);
    }
    $.Set = J;
    function z(A) {
      return W.get(A);
    }
    $.Get = z;
  })(W6 || (h8.TypeRegistry = W6 = {}));

  class e0 extends Error {
    constructor($) {
      super($);
    }
  }
  h8.TypeBoxError = e0;
  var i8;
  (function($) {
    const W = new Map;
    function Y() {
      return new Map(W);
    }
    $.Entries = Y;
    function X() {
      return W.clear();
    }
    $.Clear = X;
    function Z(A) {
      return W.delete(A);
    }
    $.Delete = Z;
    function Q(A) {
      return W.has(A);
    }
    $.Has = Q;
    function J(A, w) {
      W.set(A, w);
    }
    $.Set = J;
    function z(A) {
      return W.get(A);
    }
    $.Get = z;
  })(i8 || (h8.FormatRegistry = i8 = {}));
  var V;
  (function($) {
    function W(w) {
      return Array.isArray(w);
    }
    $.IsArray = W;
    function Y(w) {
      return typeof w === "bigint";
    }
    $.IsBigInt = Y;
    function X(w) {
      return typeof w === "boolean";
    }
    $.IsBoolean = X;
    function Z(w) {
      return w === null;
    }
    $.IsNull = Z;
    function Q(w) {
      return typeof w === "number";
    }
    $.IsNumber = Q;
    function J(w) {
      return typeof w === "object" && w !== null;
    }
    $.IsObject = J;
    function z(w) {
      return typeof w === "string";
    }
    $.IsString = z;
    function A(w) {
      return w === undefined;
    }
    $.IsUndefined = A;
  })(V || (h8.ValueGuard = V = {}));

  class u8 extends e0 {
  }
  h8.TypeGuardUnknownTypeError = u8;
  var B;
  (function($) {
    function W(N) {
      try {
        return new RegExp(N), true;
      } catch {
        return false;
      }
    }
    function Y(N) {
      if (!V.IsString(N))
        return false;
      for (let c = 0;c < N.length; c++) {
        const O0 = N.charCodeAt(c);
        if (O0 >= 7 && O0 <= 13 || O0 === 27 || O0 === 127)
          return false;
      }
      return true;
    }
    function X(N) {
      return J(N) || W0(N);
    }
    function Z(N) {
      return V.IsUndefined(N) || V.IsBigInt(N);
    }
    function Q(N) {
      return V.IsUndefined(N) || V.IsNumber(N);
    }
    function J(N) {
      return V.IsUndefined(N) || V.IsBoolean(N);
    }
    function z(N) {
      return V.IsUndefined(N) || V.IsString(N);
    }
    function A(N) {
      return V.IsUndefined(N) || V.IsString(N) && Y(N) && W(N);
    }
    function w(N) {
      return V.IsUndefined(N) || V.IsString(N) && Y(N);
    }
    function F(N) {
      return V.IsUndefined(N) || W0(N);
    }
    function S(N) {
      return _(N, "Any") && z(N.$id);
    }
    $.TAny = S;
    function R(N) {
      return _(N, "Array") && N.type === "array" && z(N.$id) && W0(N.items) && Q(N.minItems) && Q(N.maxItems) && J(N.uniqueItems) && F(N.contains) && Q(N.minContains) && Q(N.maxContains);
    }
    $.TArray = R;
    function j(N) {
      return _(N, "AsyncIterator") && N.type === "AsyncIterator" && z(N.$id) && W0(N.items);
    }
    $.TAsyncIterator = j;
    function M(N) {
      return _(N, "BigInt") && N.type === "bigint" && z(N.$id) && Z(N.exclusiveMaximum) && Z(N.exclusiveMinimum) && Z(N.maximum) && Z(N.minimum) && Z(N.multipleOf);
    }
    $.TBigInt = M;
    function P(N) {
      return _(N, "Boolean") && N.type === "boolean" && z(N.$id);
    }
    $.TBoolean = P;
    function O(N) {
      return _(N, "Constructor") && N.type === "Constructor" && z(N.$id) && V.IsArray(N.parameters) && N.parameters.every((c) => W0(c)) && W0(N.returns);
    }
    $.TConstructor = O;
    function U(N) {
      return _(N, "Date") && N.type === "Date" && z(N.$id) && Q(N.exclusiveMaximumTimestamp) && Q(N.exclusiveMinimumTimestamp) && Q(N.maximumTimestamp) && Q(N.minimumTimestamp) && Q(N.multipleOfTimestamp);
    }
    $.TDate = U;
    function D(N) {
      return _(N, "Function") && N.type === "Function" && z(N.$id) && V.IsArray(N.parameters) && N.parameters.every((c) => W0(c)) && W0(N.returns);
    }
    $.TFunction = D;
    function I(N) {
      return _(N, "Integer") && N.type === "integer" && z(N.$id) && Q(N.exclusiveMaximum) && Q(N.exclusiveMinimum) && Q(N.maximum) && Q(N.minimum) && Q(N.multipleOf);
    }
    $.TInteger = I;
    function G(N) {
      return _(N, "Intersect") && (V.IsString(N.type) && N.type !== "object" ? false : true) && V.IsArray(N.allOf) && N.allOf.every((c) => W0(c) && !D0(c)) && z(N.type) && (J(N.unevaluatedProperties) || F(N.unevaluatedProperties)) && z(N.$id);
    }
    $.TIntersect = G;
    function k(N) {
      return _(N, "Iterator") && N.type === "Iterator" && z(N.$id) && W0(N.items);
    }
    $.TIterator = k;
    function _(N, c) {
      return X0(N) && N[h8.Kind] === c;
    }
    $.TKindOf = _;
    function X0(N) {
      return V.IsObject(N) && (h8.Kind in N) && V.IsString(N[h8.Kind]);
    }
    $.TKind = X0;
    function e(N) {
      return p0(N) && V.IsString(N.const);
    }
    $.TLiteralString = e;
    function N0(N) {
      return p0(N) && V.IsNumber(N.const);
    }
    $.TLiteralNumber = N0;
    function _1(N) {
      return p0(N) && V.IsBoolean(N.const);
    }
    $.TLiteralBoolean = _1;
    function p0(N) {
      return _(N, "Literal") && z(N.$id) && (V.IsBoolean(N.const) || V.IsNumber(N.const) || V.IsString(N.const));
    }
    $.TLiteral = p0;
    function i0(N) {
      return _(N, "Never") && V.IsObject(N.not) && Object.getOwnPropertyNames(N.not).length === 0;
    }
    $.TNever = i0;
    function H0(N) {
      return _(N, "Not") && W0(N.not);
    }
    $.TNot = H0;
    function J0(N) {
      return _(N, "Null") && N.type === "null" && z(N.$id);
    }
    $.TNull = J0;
    function m0(N) {
      return _(N, "Number") && N.type === "number" && z(N.$id) && Q(N.exclusiveMaximum) && Q(N.exclusiveMinimum) && Q(N.maximum) && Q(N.minimum) && Q(N.multipleOf);
    }
    $.TNumber = m0;
    function r0(N) {
      return _(N, "Object") && N.type === "object" && z(N.$id) && V.IsObject(N.properties) && X(N.additionalProperties) && Q(N.minProperties) && Q(N.maxProperties) && Object.entries(N.properties).every(([c, O0]) => Y(c) && W0(O0));
    }
    $.TObject = r0;
    function T0(N) {
      return _(N, "Promise") && N.type === "Promise" && z(N.$id) && W0(N.item);
    }
    $.TPromise = T0;
    function b(N) {
      return _(N, "Record") && N.type === "object" && z(N.$id) && X(N.additionalProperties) && V.IsObject(N.patternProperties) && ((c) => {
        const O0 = Object.getOwnPropertyNames(c.patternProperties);
        return O0.length === 1 && W(O0[0]) && V.IsObject(c.patternProperties) && W0(c.patternProperties[O0[0]]);
      })(N);
    }
    $.TRecord = b;
    function f(N) {
      return V.IsObject(N) && (h8.Hint in N) && N[h8.Hint] === "Recursive";
    }
    $.TRecursive = f;
    function i(N) {
      return _(N, "Ref") && z(N.$id) && V.IsString(N.$ref);
    }
    $.TRef = i;
    function h(N) {
      return _(N, "String") && N.type === "string" && z(N.$id) && Q(N.minLength) && Q(N.maxLength) && A(N.pattern) && w(N.format);
    }
    $.TString = h;
    function z0(N) {
      return _(N, "Symbol") && N.type === "symbol" && z(N.$id);
    }
    $.TSymbol = z0;
    function F0(N) {
      return _(N, "TemplateLiteral") && N.type === "string" && V.IsString(N.pattern) && N.pattern[0] === "^" && N.pattern[N.pattern.length - 1] === "$";
    }
    $.TTemplateLiteral = F0;
    function w0(N) {
      return _(N, "This") && z(N.$id) && V.IsString(N.$ref);
    }
    $.TThis = w0;
    function D0(N) {
      return V.IsObject(N) && (h8.Transform in N);
    }
    $.TTransform = D0;
    function q0(N) {
      return _(N, "Tuple") && N.type === "array" && z(N.$id) && V.IsNumber(N.minItems) && V.IsNumber(N.maxItems) && N.minItems === N.maxItems && (V.IsUndefined(N.items) && V.IsUndefined(N.additionalItems) && N.minItems === 0 || V.IsArray(N.items) && N.items.every((c) => W0(c)));
    }
    $.TTuple = q0;
    function B1(N) {
      return _(N, "Undefined") && N.type === "undefined" && z(N.$id);
    }
    $.TUndefined = B1;
    function K(N) {
      return E(N) && N.anyOf.every((c) => e(c) || N0(c));
    }
    $.TUnionLiteral = K;
    function E(N) {
      return _(N, "Union") && z(N.$id) && V.IsObject(N) && V.IsArray(N.anyOf) && N.anyOf.every((c) => W0(c));
    }
    $.TUnion = E;
    function L(N) {
      return _(N, "Uint8Array") && N.type === "Uint8Array" && z(N.$id) && Q(N.minByteLength) && Q(N.maxByteLength);
    }
    $.TUint8Array = L;
    function p(N) {
      return _(N, "Unknown") && z(N.$id);
    }
    $.TUnknown = p;
    function T(N) {
      return _(N, "Unsafe");
    }
    $.TUnsafe = T;
    function d(N) {
      return _(N, "Void") && N.type === "void" && z(N.$id);
    }
    $.TVoid = d;
    function $0(N) {
      return V.IsObject(N) && N[h8.Readonly] === "Readonly";
    }
    $.TReadonly = $0;
    function K0(N) {
      return V.IsObject(N) && N[h8.Optional] === "Optional";
    }
    $.TOptional = K0;
    function W0(N) {
      return V.IsObject(N) && (S(N) || R(N) || P(N) || M(N) || j(N) || O(N) || U(N) || D(N) || I(N) || G(N) || k(N) || p0(N) || i0(N) || H0(N) || J0(N) || m0(N) || r0(N) || T0(N) || b(N) || i(N) || h(N) || z0(N) || F0(N) || w0(N) || q0(N) || B1(N) || E(N) || L(N) || p(N) || T(N) || d(N) || X0(N) && W6.Has(N[h8.Kind]));
    }
    $.TSchema = W0;
  })(B || (h8.TypeGuard = B = {}));
  var m8;
  (function($) {
    function W(Y) {
      return Y[h8.Kind] === "Intersect" ? Y.allOf.every((X) => W(X)) : Y[h8.Kind] === "Union" ? Y.anyOf.some((X) => W(X)) : Y[h8.Kind] === "Undefined" ? true : Y[h8.Kind] === "Not" ? !W(Y.not) : false;
    }
    $.Check = W;
  })(m8 || (h8.ExtendsUndefined = m8 = {}));

  class Q6 extends e0 {
  }
  h8.TypeExtendsError = Q6;
  var C;
  (function($) {
    $[$.Union = 0] = "Union", $[$.True = 1] = "True", $[$.False = 2] = "False";
  })(C || (h8.TypeExtendsResult = C = {}));
  var P1;
  (function($) {
    function W(H) {
      return H === C.False ? H : C.True;
    }
    function Y(H) {
      throw new Q6(H);
    }
    function X(H) {
      return B.TNever(H) || B.TIntersect(H) || B.TUnion(H) || B.TUnknown(H) || B.TAny(H);
    }
    function Z(H, q) {
      return B.TNever(q) ? _(H, q) : B.TIntersect(q) ? D(H, q) : B.TUnion(q) ? r$(H, q) : B.TUnknown(q) ? L8(H, q) : B.TAny(q) ? Q(H, q) : Y("StructuralRight");
    }
    function Q(H, q) {
      return C.True;
    }
    function J(H, q) {
      return B.TIntersect(q) ? D(H, q) : B.TUnion(q) && q.anyOf.some((r) => B.TAny(r) || B.TUnknown(r)) ? C.True : B.TUnion(q) ? C.Union : B.TUnknown(q) ? C.True : B.TAny(q) ? C.True : C.Union;
    }
    function z(H, q) {
      return B.TUnknown(H) ? C.False : B.TAny(H) ? C.Union : B.TNever(H) ? C.True : C.False;
    }
    function A(H, q) {
      return B.TObject(q) && F0(q) ? C.True : X(q) ? Z(H, q) : !B.TArray(q) ? C.False : W(Z0(H.items, q.items));
    }
    function w(H, q) {
      return X(q) ? Z(H, q) : !B.TAsyncIterator(q) ? C.False : W(Z0(H.items, q.items));
    }
    function F(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TBigInt(q) ? C.True : C.False;
    }
    function S(H, q) {
      return B.TLiteral(H) && V.IsBoolean(H.const) ? C.True : B.TBoolean(H) ? C.True : C.False;
    }
    function R(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TBoolean(q) ? C.True : C.False;
    }
    function j(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : !B.TConstructor(q) ? C.False : H.parameters.length > q.parameters.length ? C.False : !H.parameters.every((r, u0) => W(Z0(q.parameters[u0], r)) === C.True) ? C.False : W(Z0(H.returns, q.returns));
    }
    function M(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TDate(q) ? C.True : C.False;
    }
    function P(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : !B.TFunction(q) ? C.False : H.parameters.length > q.parameters.length ? C.False : !H.parameters.every((r, u0) => W(Z0(q.parameters[u0], r)) === C.True) ? C.False : W(Z0(H.returns, q.returns));
    }
    function O(H, q) {
      return B.TLiteral(H) && V.IsNumber(H.const) ? C.True : B.TNumber(H) || B.TInteger(H) ? C.True : C.False;
    }
    function U(H, q) {
      return B.TInteger(q) || B.TNumber(q) ? C.True : X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : C.False;
    }
    function D(H, q) {
      return q.allOf.every((r) => Z0(H, r) === C.True) ? C.True : C.False;
    }
    function I(H, q) {
      return H.allOf.some((r) => Z0(r, q) === C.True) ? C.True : C.False;
    }
    function G(H, q) {
      return X(q) ? Z(H, q) : !B.TIterator(q) ? C.False : W(Z0(H.items, q.items));
    }
    function k(H, q) {
      return B.TLiteral(q) && q.const === H.const ? C.True : X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TString(q) ? d(H, q) : B.TNumber(q) ? p0(H, q) : B.TInteger(q) ? O(H, q) : B.TBoolean(q) ? S(H, q) : C.False;
    }
    function _(H, q) {
      return C.False;
    }
    function X0(H, q) {
      return C.True;
    }
    function e(H) {
      let [q, r] = [H, 0];
      while (true) {
        if (!B.TNot(q))
          break;
        q = q.not, r += 1;
      }
      return r % 2 === 0 ? q : h8.Type.Unknown();
    }
    function N0(H, q) {
      return B.TNot(H) ? Z0(e(H), q) : B.TNot(q) ? Z0(H, e(q)) : Y("Invalid fallthrough for Not");
    }
    function _1(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TNull(q) ? C.True : C.False;
    }
    function p0(H, q) {
      return B.TLiteralNumber(H) ? C.True : B.TNumber(H) || B.TInteger(H) ? C.True : C.False;
    }
    function i0(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TInteger(q) || B.TNumber(q) ? C.True : C.False;
    }
    function H0(H, q) {
      return Object.getOwnPropertyNames(H.properties).length === q;
    }
    function J0(H) {
      return F0(H);
    }
    function m0(H) {
      return H0(H, 0) || H0(H, 1) && ("description" in H.properties) && B.TUnion(H.properties.description) && H.properties.description.anyOf.length === 2 && (B.TString(H.properties.description.anyOf[0]) && B.TUndefined(H.properties.description.anyOf[1]) || B.TString(H.properties.description.anyOf[1]) && B.TUndefined(H.properties.description.anyOf[0]));
    }
    function r0(H) {
      return H0(H, 0);
    }
    function T0(H) {
      return H0(H, 0);
    }
    function b(H) {
      return H0(H, 0);
    }
    function f(H) {
      return H0(H, 0);
    }
    function i(H) {
      return F0(H);
    }
    function h(H) {
      const q = h8.Type.Number();
      return H0(H, 0) || H0(H, 1) && ("length" in H.properties) && W(Z0(H.properties.length, q)) === C.True;
    }
    function z0(H) {
      return H0(H, 0);
    }
    function F0(H) {
      const q = h8.Type.Number();
      return H0(H, 0) || H0(H, 1) && ("length" in H.properties) && W(Z0(H.properties.length, q)) === C.True;
    }
    function w0(H) {
      const q = h8.Type.Function([h8.Type.Any()], h8.Type.Any());
      return H0(H, 0) || H0(H, 1) && ("then" in H.properties) && W(Z0(H.properties.then, q)) === C.True;
    }
    function D0(H, q) {
      return Z0(H, q) === C.False ? C.False : B.TOptional(H) && !B.TOptional(q) ? C.False : C.True;
    }
    function q0(H, q) {
      return B.TUnknown(H) ? C.False : B.TAny(H) ? C.Union : B.TNever(H) || B.TLiteralString(H) && J0(q) || B.TLiteralNumber(H) && r0(q) || B.TLiteralBoolean(H) && T0(q) || B.TSymbol(H) && m0(q) || B.TBigInt(H) && b(q) || B.TString(H) && J0(q) || B.TSymbol(H) && m0(q) || B.TNumber(H) && r0(q) || B.TInteger(H) && r0(q) || B.TBoolean(H) && T0(q) || B.TUint8Array(H) && i(q) || B.TDate(H) && f(q) || B.TConstructor(H) && z0(q) || B.TFunction(H) && h(q) ? C.True : B.TRecord(H) && B.TString(E(H)) ? (() => {
        return q[h8.Hint] === "Record" ? C.True : C.False;
      })() : B.TRecord(H) && B.TNumber(E(H)) ? (() => {
        return H0(q, 0) ? C.True : C.False;
      })() : C.False;
    }
    function B1(H, q) {
      return X(q) ? Z(H, q) : B.TRecord(q) ? p(H, q) : !B.TObject(q) ? C.False : (() => {
        for (let r of Object.getOwnPropertyNames(q.properties)) {
          if (!(r in H.properties))
            return C.False;
          if (D0(H.properties[r], q.properties[r]) === C.False)
            return C.False;
        }
        return C.True;
      })();
    }
    function K(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) && w0(q) ? C.True : !B.TPromise(q) ? C.False : W(Z0(H.item, q.item));
    }
    function E(H) {
      return h8.PatternNumberExact in H.patternProperties ? h8.Type.Number() : (h8.PatternStringExact in H.patternProperties) ? h8.Type.String() : Y("Unknown record key pattern");
    }
    function L(H) {
      return h8.PatternNumberExact in H.patternProperties ? H.patternProperties[h8.PatternNumberExact] : (h8.PatternStringExact in H.patternProperties) ? H.patternProperties[h8.PatternStringExact] : Y("Unable to get record value schema");
    }
    function p(H, q) {
      const [r, u0] = [E(q), L(q)];
      return B.TLiteralString(H) && B.TNumber(r) && W(Z0(H, u0)) === C.True ? C.True : B.TUint8Array(H) && B.TNumber(r) ? Z0(H, u0) : B.TString(H) && B.TNumber(r) ? Z0(H, u0) : B.TArray(H) && B.TNumber(r) ? Z0(H, u0) : B.TObject(H) ? (() => {
        for (let eY of Object.getOwnPropertyNames(H.properties))
          if (D0(u0, H.properties[eY]) === C.False)
            return C.False;
        return C.True;
      })() : C.False;
    }
    function T(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : !B.TRecord(q) ? C.False : Z0(L(H), L(q));
    }
    function d(H, q) {
      return B.TLiteral(H) && V.IsString(H.const) ? C.True : B.TString(H) ? C.True : C.False;
    }
    function $0(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TString(q) ? C.True : C.False;
    }
    function K0(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TSymbol(q) ? C.True : C.False;
    }
    function W0(H, q) {
      return B.TTemplateLiteral(H) ? Z0(Q1.Resolve(H), q) : B.TTemplateLiteral(q) ? Z0(H, Q1.Resolve(q)) : Y("Invalid fallthrough for TemplateLiteral");
    }
    function N(H, q) {
      return B.TArray(q) && H.items !== undefined && H.items.every((r) => Z0(r, q.items) === C.True);
    }
    function c(H, q) {
      return B.TNever(H) ? C.True : B.TUnknown(H) ? C.False : B.TAny(H) ? C.Union : C.False;
    }
    function O0(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) && F0(q) ? C.True : B.TArray(q) && N(H, q) ? C.True : !B.TTuple(q) ? C.False : V.IsUndefined(H.items) && !V.IsUndefined(q.items) || !V.IsUndefined(H.items) && V.IsUndefined(q.items) ? C.False : V.IsUndefined(H.items) && !V.IsUndefined(q.items) ? C.True : H.items.every((r, u0) => Z0(r, q.items[u0]) === C.True) ? C.True : C.False;
    }
    function t$(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TUint8Array(q) ? C.True : C.False;
    }
    function s$(H, q) {
      return X(q) ? Z(H, q) : B.TObject(q) ? q0(H, q) : B.TRecord(q) ? p(H, q) : B.TVoid(q) ? sY(H, q) : B.TUndefined(q) ? C.True : C.False;
    }
    function r$(H, q) {
      return q.anyOf.some((r) => Z0(H, r) === C.True) ? C.True : C.False;
    }
    function lY(H, q) {
      return H.anyOf.every((r) => Z0(r, q) === C.True) ? C.True : C.False;
    }
    function L8(H, q) {
      return C.True;
    }
    function tY(H, q) {
      return B.TNever(q) ? _(H, q) : B.TIntersect(q) ? D(H, q) : B.TUnion(q) ? r$(H, q) : B.TAny(q) ? Q(H, q) : B.TString(q) ? d(H, q) : B.TNumber(q) ? p0(H, q) : B.TInteger(q) ? O(H, q) : B.TBoolean(q) ? S(H, q) : B.TArray(q) ? z(H, q) : B.TTuple(q) ? c(H, q) : B.TObject(q) ? q0(H, q) : B.TUnknown(q) ? C.True : C.False;
    }
    function sY(H, q) {
      return B.TUndefined(H) ? C.True : B.TUndefined(H) ? C.True : C.False;
    }
    function rY(H, q) {
      return B.TIntersect(q) ? D(H, q) : B.TUnion(q) ? r$(H, q) : B.TUnknown(q) ? L8(H, q) : B.TAny(q) ? Q(H, q) : B.TObject(q) ? q0(H, q) : B.TVoid(q) ? C.True : C.False;
    }
    function Z0(H, q) {
      return B.TTemplateLiteral(H) || B.TTemplateLiteral(q) ? W0(H, q) : B.TNot(H) || B.TNot(q) ? N0(H, q) : B.TAny(H) ? J(H, q) : B.TArray(H) ? A(H, q) : B.TBigInt(H) ? F(H, q) : B.TBoolean(H) ? R(H, q) : B.TAsyncIterator(H) ? w(H, q) : B.TConstructor(H) ? j(H, q) : B.TDate(H) ? M(H, q) : B.TFunction(H) ? P(H, q) : B.TInteger(H) ? U(H, q) : B.TIntersect(H) ? I(H, q) : B.TIterator(H) ? G(H, q) : B.TLiteral(H) ? k(H, q) : B.TNever(H) ? X0(H, q) : B.TNull(H) ? _1(H, q) : B.TNumber(H) ? i0(H, q) : B.TObject(H) ? B1(H, q) : B.TRecord(H) ? T(H, q) : B.TString(H) ? $0(H, q) : B.TSymbol(H) ? K0(H, q) : B.TTuple(H) ? O0(H, q) : B.TPromise(H) ? K(H, q) : B.TUint8Array(H) ? t$(H, q) : B.TUndefined(H) ? s$(H, q) : B.TUnion(H) ? lY(H, q) : B.TUnknown(H) ? tY(H, q) : B.TVoid(H) ? rY(H, q) : Y(`Unknown left type operand '${H[h8.Kind]}'`);
    }
    function aY(H, q) {
      return Z0(H, q);
    }
    $.Extends = aY;
  })(P1 || (h8.TypeExtends = P1 = {}));
  var m;
  (function($) {
    function W(J) {
      const z = Object.getOwnPropertyNames(J).reduce((w, F) => ({ ...w, [F]: X(J[F]) }), {}), A = Object.getOwnPropertySymbols(J).reduce((w, F) => ({ ...w, [F]: X(J[F]) }), {});
      return { ...z, ...A };
    }
    function Y(J) {
      return J.map((z) => X(z));
    }
    function X(J) {
      return V.IsArray(J) ? Y(J) : V.IsObject(J) ? W(J) : J;
    }
    function Z(J) {
      return J.map((z) => Q(z));
    }
    $.Rest = Z;
    function Q(J, z = {}) {
      return { ...X(J), ...z };
    }
    $.Type = Q;
  })(m || (h8.TypeClone = m = {}));
  var Y6;
  (function($) {
    function W(j) {
      return j.map((M) => {
        const { [h8.Optional]: P, ...O } = m.Type(M);
        return O;
      });
    }
    function Y(j) {
      return j.every((M) => B.TOptional(M));
    }
    function X(j) {
      return j.some((M) => B.TOptional(M));
    }
    function Z(j) {
      return Y(j.allOf) ? h8.Type.Optional(h8.Type.Intersect(W(j.allOf))) : j;
    }
    function Q(j) {
      return X(j.anyOf) ? h8.Type.Optional(h8.Type.Union(W(j.anyOf))) : j;
    }
    function J(j) {
      return j[h8.Kind] === "Intersect" ? Z(j) : j[h8.Kind] === "Union" ? Q(j) : j;
    }
    function z(j, M) {
      const P = j.allOf.reduce((O, U) => {
        const D = S(U, M);
        return D[h8.Kind] === "Never" ? O : [...O, D];
      }, []);
      return J(h8.Type.Intersect(P));
    }
    function A(j, M) {
      const P = j.anyOf.map((O) => S(O, M));
      return J(h8.Type.Union(P));
    }
    function w(j, M) {
      const P = j.properties[M];
      return V.IsUndefined(P) ? h8.Type.Never() : h8.Type.Union([P]);
    }
    function F(j, M) {
      const P = j.items;
      if (V.IsUndefined(P))
        return h8.Type.Never();
      const O = P[M];
      if (V.IsUndefined(O))
        return h8.Type.Never();
      return O;
    }
    function S(j, M) {
      return j[h8.Kind] === "Intersect" ? z(j, M) : j[h8.Kind] === "Union" ? A(j, M) : j[h8.Kind] === "Object" ? w(j, M) : j[h8.Kind] === "Tuple" ? F(j, M) : h8.Type.Never();
    }
    function R(j, M, P = {}) {
      const O = M.map((U) => S(j, U.toString()));
      return J(h8.Type.Union(O, P));
    }
    $.Resolve = R;
  })(Y6 || (h8.IndexedAccessor = Y6 = {}));
  var V1;
  (function($) {
    function W(F) {
      const [S, R] = [F.slice(0, 1), F.slice(1)];
      return `${S.toLowerCase()}${R}`;
    }
    function Y(F) {
      const [S, R] = [F.slice(0, 1), F.slice(1)];
      return `${S.toUpperCase()}${R}`;
    }
    function X(F) {
      return F.toUpperCase();
    }
    function Z(F) {
      return F.toLowerCase();
    }
    function Q(F, S) {
      const R = f1.ParseExact(F.pattern);
      if (!T1.Check(R))
        return { ...F, pattern: J(F.pattern, S) };
      const P = [...d1.Generate(R)].map((D) => h8.Type.Literal(D)), O = z(P, S), U = h8.Type.Union(O);
      return h8.Type.TemplateLiteral([U]);
    }
    function J(F, S) {
      return typeof F === "string" ? S === "Uncapitalize" ? W(F) : S === "Capitalize" ? Y(F) : S === "Uppercase" ? X(F) : S === "Lowercase" ? Z(F) : F : F.toString();
    }
    function z(F, S) {
      if (F.length === 0)
        return [];
      const [R, ...j] = F;
      return [w(R, S), ...z(j, S)];
    }
    function A(F, S) {
      return B.TTemplateLiteral(F) ? Q(F, S) : B.TUnion(F) ? h8.Type.Union(z(F.anyOf, S)) : B.TLiteral(F) ? h8.Type.Literal(J(F.const, S)) : F;
    }
    function w(F, S) {
      return A(F, S);
    }
    $.Map = w;
  })(V1 || (h8.Intrinsic = V1 = {}));
  var x1;
  (function($) {
    function W(J, z) {
      return h8.Type.Intersect(J.allOf.map((A) => Z(A, z)), { ...J });
    }
    function Y(J, z) {
      return h8.Type.Union(J.anyOf.map((A) => Z(A, z)), { ...J });
    }
    function X(J, z) {
      return z(J);
    }
    function Z(J, z) {
      return J[h8.Kind] === "Intersect" ? W(J, z) : J[h8.Kind] === "Union" ? Y(J, z) : J[h8.Kind] === "Object" ? X(J, z) : J;
    }
    function Q(J, z, A) {
      return { ...Z(m.Type(J), z), ...A };
    }
    $.Map = Q;
  })(x1 || (h8.ObjectMap = x1 = {}));
  var S$;
  (function($) {
    function W(w) {
      return w[0] === "^" && w[w.length - 1] === "$" ? w.slice(1, w.length - 1) : w;
    }
    function Y(w, F) {
      return w.allOf.reduce((S, R) => [...S, ...J(R, F)], []);
    }
    function X(w, F) {
      const S = w.anyOf.map((R) => J(R, F));
      return [...S.reduce((R, j) => j.map((M) => S.every((P) => P.includes(M)) ? R.add(M) : R)[0], new Set)];
    }
    function Z(w, F) {
      return Object.getOwnPropertyNames(w.properties);
    }
    function Q(w, F) {
      return F.includePatterns ? Object.getOwnPropertyNames(w.patternProperties) : [];
    }
    function J(w, F) {
      return B.TIntersect(w) ? Y(w, F) : B.TUnion(w) ? X(w, F) : B.TObject(w) ? Z(w, F) : B.TRecord(w) ? Q(w, F) : [];
    }
    function z(w, F) {
      return [...new Set(J(w, F))];
    }
    $.ResolveKeys = z;
    function A(w) {
      return `^(${z(w, { includePatterns: true }).map((R) => `(${W(R)})`).join("|")})$`;
    }
    $.ResolvePattern = A;
  })(S$ || (h8.KeyResolver = S$ = {}));

  class J6 extends e0 {
  }
  h8.KeyArrayResolverError = J6;
  var a1;
  (function($) {
    function W(Y) {
      return Array.isArray(Y) ? Y : B.TUnionLiteral(Y) ? Y.anyOf.map((X) => X.const.toString()) : B.TLiteral(Y) ? [Y.const] : B.TTemplateLiteral(Y) ? (() => {
        const X = f1.ParseExact(Y.pattern);
        if (!T1.Check(X))
          throw new J6("Cannot resolve keys from infinite template expression");
        return [...d1.Generate(X)];
      })() : [];
    }
    $.Resolve = W;
  })(a1 || (h8.KeyArrayResolver = a1 = {}));
  var X6;
  (function($) {
    function* W(X) {
      for (let Z of X.anyOf)
        if (Z[h8.Kind] === "Union")
          yield* W(Z);
        else
          yield Z;
    }
    function Y(X) {
      return h8.Type.Union([...W(X)], { ...X });
    }
    $.Resolve = Y;
  })(X6 || (h8.UnionResolver = X6 = {}));

  class z6 extends e0 {
  }
  h8.TemplateLiteralPatternError = z6;
  var L$;
  (function($) {
    function W(Q) {
      throw new z6(Q);
    }
    function Y(Q) {
      return Q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function X(Q, J) {
      return B.TTemplateLiteral(Q) ? Q.pattern.slice(1, Q.pattern.length - 1) : B.TUnion(Q) ? `(${Q.anyOf.map((z) => X(z, J)).join("|")})` : B.TNumber(Q) ? `${J}${h8.PatternNumber}` : B.TInteger(Q) ? `${J}${h8.PatternNumber}` : B.TBigInt(Q) ? `${J}${h8.PatternNumber}` : B.TString(Q) ? `${J}${h8.PatternString}` : B.TLiteral(Q) ? `${J}${Y(Q.const.toString())}` : B.TBoolean(Q) ? `${J}${h8.PatternBoolean}` : W(`Unexpected Kind '${Q[h8.Kind]}'`);
    }
    function Z(Q) {
      return `^${Q.map((J) => X(J, "")).join("")}\$`;
    }
    $.Create = Z;
  })(L$ || (h8.TemplateLiteralPattern = L$ = {}));
  var Q1;
  (function($) {
    function W(Y) {
      const X = f1.ParseExact(Y.pattern);
      if (!T1.Check(X))
        return h8.Type.String();
      const Z = [...d1.Generate(X)].map((Q) => h8.Type.Literal(Q));
      return h8.Type.Union(Z);
    }
    $.Resolve = W;
  })(Q1 || (h8.TemplateLiteralResolver = Q1 = {}));

  class C$ extends e0 {
  }
  h8.TemplateLiteralParserError = C$;
  var f1;
  (function($) {
    function W(j, M, P) {
      return j[M] === P && j.charCodeAt(M - 1) !== 92;
    }
    function Y(j, M) {
      return W(j, M, "(");
    }
    function X(j, M) {
      return W(j, M, ")");
    }
    function Z(j, M) {
      return W(j, M, "|");
    }
    function Q(j) {
      if (!(Y(j, 0) && X(j, j.length - 1)))
        return false;
      let M = 0;
      for (let P = 0;P < j.length; P++) {
        if (Y(j, P))
          M += 1;
        if (X(j, P))
          M -= 1;
        if (M === 0 && P !== j.length - 1)
          return false;
      }
      return true;
    }
    function J(j) {
      return j.slice(1, j.length - 1);
    }
    function z(j) {
      let M = 0;
      for (let P = 0;P < j.length; P++) {
        if (Y(j, P))
          M += 1;
        if (X(j, P))
          M -= 1;
        if (Z(j, P) && M === 0)
          return true;
      }
      return false;
    }
    function A(j) {
      for (let M = 0;M < j.length; M++)
        if (Y(j, M))
          return true;
      return false;
    }
    function w(j) {
      let [M, P] = [0, 0];
      const O = [];
      for (let D = 0;D < j.length; D++) {
        if (Y(j, D))
          M += 1;
        if (X(j, D))
          M -= 1;
        if (Z(j, D) && M === 0) {
          const I = j.slice(P, D);
          if (I.length > 0)
            O.push(S(I));
          P = D + 1;
        }
      }
      const U = j.slice(P);
      if (U.length > 0)
        O.push(S(U));
      if (O.length === 0)
        return { type: "const", const: "" };
      if (O.length === 1)
        return O[0];
      return { type: "or", expr: O };
    }
    function F(j) {
      function M(U, D) {
        if (!Y(U, D))
          throw new C$("TemplateLiteralParser: Index must point to open parens");
        let I = 0;
        for (let G = D;G < U.length; G++) {
          if (Y(U, G))
            I += 1;
          if (X(U, G))
            I -= 1;
          if (I === 0)
            return [D, G];
        }
        throw new C$("TemplateLiteralParser: Unclosed group parens in expression");
      }
      function P(U, D) {
        for (let I = D;I < U.length; I++)
          if (Y(U, I))
            return [D, I];
        return [D, U.length];
      }
      const O = [];
      for (let U = 0;U < j.length; U++)
        if (Y(j, U)) {
          const [D, I] = M(j, U), G = j.slice(D, I + 1);
          O.push(S(G)), U = I;
        } else {
          const [D, I] = P(j, U), G = j.slice(D, I);
          if (G.length > 0)
            O.push(S(G));
          U = I - 1;
        }
      return O.length === 0 ? { type: "const", const: "" } : O.length === 1 ? O[0] : { type: "and", expr: O };
    }
    function S(j) {
      return Q(j) ? S(J(j)) : z(j) ? w(j) : A(j) ? F(j) : { type: "const", const: j };
    }
    $.Parse = S;
    function R(j) {
      return S(j.slice(1, j.length - 1));
    }
    $.ParseExact = R;
  })(f1 || (h8.TemplateLiteralParser = f1 = {}));

  class H6 extends e0 {
  }
  h8.TemplateLiteralFiniteError = H6;
  var T1;
  (function($) {
    function W(J) {
      throw new H6(J);
    }
    function Y(J) {
      return J.type === "or" && J.expr.length === 2 && J.expr[0].type === "const" && J.expr[0].const === "0" && J.expr[1].type === "const" && J.expr[1].const === "[1-9][0-9]*";
    }
    function X(J) {
      return J.type === "or" && J.expr.length === 2 && J.expr[0].type === "const" && J.expr[0].const === "true" && J.expr[1].type === "const" && J.expr[1].const === "false";
    }
    function Z(J) {
      return J.type === "const" && J.const === ".*";
    }
    function Q(J) {
      return X(J) ? true : Y(J) || Z(J) ? false : J.type === "and" ? J.expr.every((z) => Q(z)) : J.type === "or" ? J.expr.every((z) => Q(z)) : J.type === "const" ? true : W("Unknown expression type");
    }
    $.Check = Q;
  })(T1 || (h8.TemplateLiteralFinite = T1 = {}));

  class q6 extends e0 {
  }
  h8.TemplateLiteralGeneratorError = q6;
  var d1;
  (function($) {
    function* W(J) {
      if (J.length === 1)
        return yield* J[0];
      for (let z of J[0])
        for (let A of W(J.slice(1)))
          yield `${z}${A}`;
    }
    function* Y(J) {
      return yield* W(J.expr.map((z) => [...Q(z)]));
    }
    function* X(J) {
      for (let z of J.expr)
        yield* Q(z);
    }
    function* Z(J) {
      return yield J.const;
    }
    function* Q(J) {
      return J.type === "and" ? yield* Y(J) : J.type === "or" ? yield* X(J) : J.type === "const" ? yield* Z(J) : (() => {
        throw new q6("Unknown expression");
      })();
    }
    $.Generate = Q;
  })(d1 || (h8.TemplateLiteralGenerator = d1 = {}));
  var Z6;
  (function($) {
    function* W(Q) {
      const J = Q.trim().replace(/"|'/g, "");
      return J === "boolean" ? yield h8.Type.Boolean() : J === "number" ? yield h8.Type.Number() : J === "bigint" ? yield h8.Type.BigInt() : J === "string" ? yield h8.Type.String() : yield (() => {
        const z = J.split("|").map((A) => h8.Type.Literal(A.trim()));
        return z.length === 0 ? h8.Type.Never() : z.length === 1 ? z[0] : h8.Type.Union(z);
      })();
    }
    function* Y(Q) {
      if (Q[1] !== "{") {
        const J = h8.Type.Literal("$"), z = X(Q.slice(1));
        return yield* [J, ...z];
      }
      for (let J = 2;J < Q.length; J++)
        if (Q[J] === "}") {
          const z = W(Q.slice(2, J)), A = X(Q.slice(J + 1));
          return yield* [...z, ...A];
        }
      yield h8.Type.Literal(Q);
    }
    function* X(Q) {
      for (let J = 0;J < Q.length; J++)
        if (Q[J] === "$") {
          const z = h8.Type.Literal(Q.slice(0, J)), A = Y(Q.slice(J));
          return yield* [z, ...A];
        }
      yield h8.Type.Literal(Q);
    }
    function Z(Q) {
      return [...X(Q)];
    }
    $.Parse = Z;
  })(Z6 || (h8.TemplateLiteralDslParser = Z6 = {}));

  class N6 {
    constructor($) {
      this.schema = $;
    }
    Decode($) {
      return new M6(this.schema, $);
    }
  }
  h8.TransformDecodeBuilder = N6;

  class M6 {
    constructor($, W) {
      this.schema = $, this.decode = W;
    }
    Encode($) {
      const W = m.Type(this.schema);
      return B.TTransform(W) ? (() => {
        const Z = { Encode: (Q) => W[h8.Transform].Encode($(Q)), Decode: (Q) => this.decode(W[h8.Transform].Decode(Q)) };
        return { ...W, [h8.Transform]: Z };
      })() : (() => {
        const Y = { Decode: this.decode, Encode: $ };
        return { ...W, [h8.Transform]: Y };
      })();
    }
  }
  h8.TransformEncodeBuilder = M6;
  var TX = 0;

  class U6 extends e0 {
  }
  h8.TypeBuilderError = U6;

  class A6 {
    Create($) {
      return $;
    }
    Throw($) {
      throw new U6($);
    }
    Discard($, W) {
      return W.reduce((Y, X) => {
        const { [X]: Z, ...Q } = Y;
        return Q;
      }, $);
    }
    Strict($) {
      return JSON.parse(JSON.stringify($));
    }
  }
  h8.TypeBuilder = A6;

  class I$ extends A6 {
    ReadonlyOptional($) {
      return this.Readonly(this.Optional($));
    }
    Readonly($) {
      return { ...m.Type($), [h8.Readonly]: "Readonly" };
    }
    Optional($) {
      return { ...m.Type($), [h8.Optional]: "Optional" };
    }
    Any($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Any" });
    }
    Array($, W = {}) {
      return this.Create({ ...W, [h8.Kind]: "Array", type: "array", items: m.Type($) });
    }
    Boolean($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Boolean", type: "boolean" });
    }
    Capitalize($, W = {}) {
      return { ...V1.Map(m.Type($), "Capitalize"), ...W };
    }
    Composite($, W) {
      const Y = h8.Type.Intersect($, {}), Z = S$.ResolveKeys(Y, { includePatterns: false }).reduce((Q, J) => ({ ...Q, [J]: h8.Type.Index(Y, [J]) }), {});
      return h8.Type.Object(Z, W);
    }
    Enum($, W = {}) {
      const Y = Object.getOwnPropertyNames($).filter((Q) => isNaN(Q)).map((Q) => $[Q]), Z = [...new Set(Y)].map((Q) => h8.Type.Literal(Q));
      return this.Union(Z, { ...W, [h8.Hint]: "Enum" });
    }
    Extends($, W, Y, X, Z = {}) {
      switch (P1.Extends($, W)) {
        case C.Union:
          return this.Union([m.Type(Y, Z), m.Type(X, Z)]);
        case C.True:
          return m.Type(Y, Z);
        case C.False:
          return m.Type(X, Z);
      }
    }
    Exclude($, W, Y = {}) {
      return B.TTemplateLiteral($) ? this.Exclude(Q1.Resolve($), W, Y) : B.TTemplateLiteral(W) ? this.Exclude($, Q1.Resolve(W), Y) : B.TUnion($) ? (() => {
        const X = $.anyOf.filter((Z) => P1.Extends(Z, W) === C.False);
        return X.length === 1 ? m.Type(X[0], Y) : this.Union(X, Y);
      })() : P1.Extends($, W) !== C.False ? this.Never(Y) : m.Type($, Y);
    }
    Extract($, W, Y = {}) {
      return B.TTemplateLiteral($) ? this.Extract(Q1.Resolve($), W, Y) : B.TTemplateLiteral(W) ? this.Extract($, Q1.Resolve(W), Y) : B.TUnion($) ? (() => {
        const X = $.anyOf.filter((Z) => P1.Extends(Z, W) !== C.False);
        return X.length === 1 ? m.Type(X[0], Y) : this.Union(X, Y);
      })() : P1.Extends($, W) !== C.False ? m.Type($, Y) : this.Never(Y);
    }
    Index($, W, Y = {}) {
      return B.TArray($) && B.TNumber(W) ? (() => {
        return m.Type($.items, Y);
      })() : B.TTuple($) && B.TNumber(W) ? (() => {
        const Z = (V.IsUndefined($.items) ? [] : $.items).map((Q) => m.Type(Q));
        return this.Union(Z, Y);
      })() : (() => {
        const X = a1.Resolve(W), Z = m.Type($);
        return Y6.Resolve(Z, X, Y);
      })();
    }
    Integer($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Integer", type: "integer" });
    }
    Intersect($, W = {}) {
      if ($.length === 0)
        return h8.Type.Never();
      if ($.length === 1)
        return m.Type($[0], W);
      if ($.some((Q) => B.TTransform(Q)))
        this.Throw("Cannot intersect transform types");
      const Y = $.every((Q) => B.TObject(Q)), X = m.Rest($), Z = B.TSchema(W.unevaluatedProperties) ? { unevaluatedProperties: m.Type(W.unevaluatedProperties) } : {};
      return W.unevaluatedProperties === false || B.TSchema(W.unevaluatedProperties) || Y ? this.Create({ ...W, ...Z, [h8.Kind]: "Intersect", type: "object", allOf: X }) : this.Create({ ...W, ...Z, [h8.Kind]: "Intersect", allOf: X });
    }
    KeyOf($, W = {}) {
      return B.TRecord($) ? (() => {
        const Y = Object.getOwnPropertyNames($.patternProperties)[0];
        return Y === h8.PatternNumberExact ? this.Number(W) : Y === h8.PatternStringExact ? this.String(W) : this.Throw("Unable to resolve key type from Record key pattern");
      })() : B.TTuple($) ? (() => {
        const X = (V.IsUndefined($.items) ? [] : $.items).map((Z, Q) => h8.Type.Literal(Q.toString()));
        return this.Union(X, W);
      })() : B.TArray($) ? (() => {
        return this.Number(W);
      })() : (() => {
        const Y = S$.ResolveKeys($, { includePatterns: false });
        if (Y.length === 0)
          return this.Never(W);
        const X = Y.map((Z) => this.Literal(Z));
        return this.Union(X, W);
      })();
    }
    Literal($, W = {}) {
      return this.Create({ ...W, [h8.Kind]: "Literal", const: $, type: typeof $ });
    }
    Lowercase($, W = {}) {
      return { ...V1.Map(m.Type($), "Lowercase"), ...W };
    }
    Never($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Never", not: {} });
    }
    Not($, W) {
      return this.Create({ ...W, [h8.Kind]: "Not", not: m.Type($) });
    }
    Null($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Null", type: "null" });
    }
    Number($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Number", type: "number" });
    }
    Object($, W = {}) {
      const Y = Object.getOwnPropertyNames($), X = Y.filter((z) => B.TOptional($[z])), Z = Y.filter((z) => !X.includes(z)), Q = B.TSchema(W.additionalProperties) ? { additionalProperties: m.Type(W.additionalProperties) } : {}, J = Y.reduce((z, A) => ({ ...z, [A]: m.Type($[A]) }), {});
      return Z.length > 0 ? this.Create({ ...W, ...Q, [h8.Kind]: "Object", type: "object", properties: J, required: Z }) : this.Create({ ...W, ...Q, [h8.Kind]: "Object", type: "object", properties: J });
    }
    Omit($, W, Y = {}) {
      const X = a1.Resolve(W);
      return x1.Map(this.Discard(m.Type($), ["$id", h8.Transform]), (Z) => {
        if (V.IsArray(Z.required)) {
          if (Z.required = Z.required.filter((Q) => !X.includes(Q)), Z.required.length === 0)
            delete Z.required;
        }
        for (let Q of Object.getOwnPropertyNames(Z.properties))
          if (X.includes(Q))
            delete Z.properties[Q];
        return this.Create(Z);
      }, Y);
    }
    Partial($, W = {}) {
      return x1.Map(this.Discard(m.Type($), ["$id", h8.Transform]), (Y) => {
        const X = Object.getOwnPropertyNames(Y.properties).reduce((Z, Q) => {
          return { ...Z, [Q]: this.Optional(Y.properties[Q]) };
        }, {});
        return this.Object(X, this.Discard(Y, ["required"]));
      }, W);
    }
    Pick($, W, Y = {}) {
      const X = a1.Resolve(W);
      return x1.Map(this.Discard(m.Type($), ["$id", h8.Transform]), (Z) => {
        if (V.IsArray(Z.required)) {
          if (Z.required = Z.required.filter((Q) => X.includes(Q)), Z.required.length === 0)
            delete Z.required;
        }
        for (let Q of Object.getOwnPropertyNames(Z.properties))
          if (!X.includes(Q))
            delete Z.properties[Q];
        return this.Create(Z);
      }, Y);
    }
    Record($, W, Y = {}) {
      return B.TTemplateLiteral($) ? (() => {
        const X = f1.ParseExact($.pattern);
        return T1.Check(X) ? this.Object([...d1.Generate(X)].reduce((Z, Q) => ({ ...Z, [Q]: m.Type(W) }), {}), Y) : this.Create({ ...Y, [h8.Kind]: "Record", type: "object", patternProperties: { [$.pattern]: m.Type(W) } });
      })() : B.TUnion($) ? (() => {
        const X = X6.Resolve($);
        if (B.TUnionLiteral(X)) {
          const Z = X.anyOf.reduce((Q, J) => ({ ...Q, [J.const]: m.Type(W) }), {});
          return this.Object(Z, { ...Y, [h8.Hint]: "Record" });
        } else
          this.Throw("Record key of type union contains non-literal types");
      })() : B.TLiteral($) ? (() => {
        return V.IsString($.const) || V.IsNumber($.const) ? this.Object({ [$.const]: m.Type(W) }, Y) : this.Throw("Record key of type literal is not of type string or number");
      })() : B.TInteger($) || B.TNumber($) ? (() => {
        return this.Create({ ...Y, [h8.Kind]: "Record", type: "object", patternProperties: { [h8.PatternNumberExact]: m.Type(W) } });
      })() : B.TString($) ? (() => {
        const X = V.IsUndefined($.pattern) ? h8.PatternStringExact : $.pattern;
        return this.Create({ ...Y, [h8.Kind]: "Record", type: "object", patternProperties: { [X]: m.Type(W) } });
      })() : this.Never();
    }
    Recursive($, W = {}) {
      if (V.IsUndefined(W.$id))
        W.$id = `T${TX++}`;
      const Y = $({ [h8.Kind]: "This", $ref: `${W.$id}` });
      return Y.$id = W.$id, this.Create({ ...W, [h8.Hint]: "Recursive", ...Y });
    }
    Ref($, W = {}) {
      if (V.IsString($))
        return this.Create({ ...W, [h8.Kind]: "Ref", $ref: $ });
      if (V.IsUndefined($.$id))
        this.Throw("Reference target type must specify an $id");
      return this.Create({ ...W, [h8.Kind]: "Ref", $ref: $.$id });
    }
    Required($, W = {}) {
      return x1.Map(this.Discard(m.Type($), ["$id", h8.Transform]), (Y) => {
        const X = Object.getOwnPropertyNames(Y.properties).reduce((Z, Q) => {
          return { ...Z, [Q]: this.Discard(Y.properties[Q], [h8.Optional]) };
        }, {});
        return this.Object(X, Y);
      }, W);
    }
    Rest($) {
      return B.TTuple($) && !V.IsUndefined($.items) ? m.Rest($.items) : B.TIntersect($) ? m.Rest($.allOf) : B.TUnion($) ? m.Rest($.anyOf) : [];
    }
    String($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "String", type: "string" });
    }
    TemplateLiteral($, W = {}) {
      const Y = V.IsString($) ? L$.Create(Z6.Parse($)) : L$.Create($);
      return this.Create({ ...W, [h8.Kind]: "TemplateLiteral", type: "string", pattern: Y });
    }
    Transform($) {
      return new N6($);
    }
    Tuple($, W = {}) {
      const [Y, X, Z] = [false, $.length, $.length], Q = m.Rest($), J = $.length > 0 ? { ...W, [h8.Kind]: "Tuple", type: "array", items: Q, additionalItems: Y, minItems: X, maxItems: Z } : { ...W, [h8.Kind]: "Tuple", type: "array", minItems: X, maxItems: Z };
      return this.Create(J);
    }
    Uncapitalize($, W = {}) {
      return { ...V1.Map(m.Type($), "Uncapitalize"), ...W };
    }
    Union($, W = {}) {
      return B.TTemplateLiteral($) ? Q1.Resolve($) : (() => {
        const Y = $;
        if (Y.length === 0)
          return this.Never(W);
        if (Y.length === 1)
          return this.Create(m.Type(Y[0], W));
        const X = m.Rest(Y);
        return this.Create({ ...W, [h8.Kind]: "Union", anyOf: X });
      })();
    }
    Unknown($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Unknown" });
    }
    Unsafe($ = {}) {
      return this.Create({ ...$, [h8.Kind]: $[h8.Kind] || "Unsafe" });
    }
    Uppercase($, W = {}) {
      return { ...V1.Map(m.Type($), "Uppercase"), ...W };
    }
  }
  h8.JsonTypeBuilder = I$;

  class B6 extends I$ {
    AsyncIterator($, W = {}) {
      return this.Create({ ...W, [h8.Kind]: "AsyncIterator", type: "AsyncIterator", items: m.Type($) });
    }
    Awaited($, W = {}) {
      const Y = (X) => X.length > 0 ? (() => {
        const [Z, ...Q] = X;
        return [this.Awaited(Z), ...Y(Q)];
      })() : X;
      return B.TIntersect($) ? h8.Type.Intersect(Y($.allOf)) : B.TUnion($) ? h8.Type.Union(Y($.anyOf)) : B.TPromise($) ? this.Awaited($.item) : m.Type($, W);
    }
    BigInt($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "BigInt", type: "bigint" });
    }
    ConstructorParameters($, W = {}) {
      return this.Tuple([...$.parameters], { ...W });
    }
    Constructor($, W, Y) {
      const [X, Z] = [m.Rest($), m.Type(W)];
      return this.Create({ ...Y, [h8.Kind]: "Constructor", type: "Constructor", parameters: X, returns: Z });
    }
    Date($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Date", type: "Date" });
    }
    Function($, W, Y) {
      const [X, Z] = [m.Rest($), m.Type(W)];
      return this.Create({ ...Y, [h8.Kind]: "Function", type: "Function", parameters: X, returns: Z });
    }
    InstanceType($, W = {}) {
      return m.Type($.returns, W);
    }
    Iterator($, W = {}) {
      return this.Create({ ...W, [h8.Kind]: "Iterator", type: "Iterator", items: m.Type($) });
    }
    Parameters($, W = {}) {
      return this.Tuple($.parameters, { ...W });
    }
    Promise($, W = {}) {
      return this.Create({ ...W, [h8.Kind]: "Promise", type: "Promise", item: m.Type($) });
    }
    RegExp($, W = {}) {
      const Y = V.IsString($) ? $ : $.source;
      return this.Create({ ...W, [h8.Kind]: "String", type: "string", pattern: Y });
    }
    RegEx($, W = {}) {
      return this.RegExp($, W);
    }
    ReturnType($, W = {}) {
      return m.Type($.returns, W);
    }
    Symbol($) {
      return this.Create({ ...$, [h8.Kind]: "Symbol", type: "symbol" });
    }
    Undefined($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Undefined", type: "undefined" });
    }
    Uint8Array($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Uint8Array", type: "Uint8Array" });
    }
    Void($ = {}) {
      return this.Create({ ...$, [h8.Kind]: "Void", type: "void" });
    }
  }
  h8.JavaScriptTypeBuilder = B6;
  h8.JsonType = new I$;
  h8.Type = new B6;
});
var O6 = Q0((l8) => {
  var j6 = function($, W) {
    switch (W) {
      case y.ValueErrorType.ArrayContains:
        return "Expected array to contain at least one matching value";
      case y.ValueErrorType.ArrayMaxContains:
        return `Expected array to contain no more than ${$.maxContains} matching values`;
      case y.ValueErrorType.ArrayMinContains:
        return `Expected array to contain at least ${$.minContains} matching values`;
      case y.ValueErrorType.ArrayMaxItems:
        return `Expected array length to be less or equal to ${$.maxItems}`;
      case y.ValueErrorType.ArrayMinItems:
        return `Expected array length to be greater or equal to ${$.minItems}`;
      case y.ValueErrorType.ArrayUniqueItems:
        return "Expected array elements to be unique";
      case y.ValueErrorType.Array:
        return "Expected array";
      case y.ValueErrorType.AsyncIterator:
        return "Expected AsyncIterator";
      case y.ValueErrorType.BigIntExclusiveMaximum:
        return `Expected bigint to be less than ${$.exclusiveMaximum}`;
      case y.ValueErrorType.BigIntExclusiveMinimum:
        return `Expected bigint to be greater than ${$.exclusiveMinimum}`;
      case y.ValueErrorType.BigIntMaximum:
        return `Expected bigint to be less or equal to ${$.maximum}`;
      case y.ValueErrorType.BigIntMinimum:
        return `Expected bigint to be greater or equal to ${$.minimum}`;
      case y.ValueErrorType.BigIntMultipleOf:
        return `Expected bigint to be a multiple of ${$.multipleOf}`;
      case y.ValueErrorType.BigInt:
        return "Expected bigint";
      case y.ValueErrorType.Boolean:
        return "Expected boolean";
      case y.ValueErrorType.DateExclusiveMinimumTimestamp:
        return `Expected Date timestamp to be greater than ${$.exclusiveMinimumTimestamp}`;
      case y.ValueErrorType.DateExclusiveMaximumTimestamp:
        return `Expected Date timestamp to be less than ${$.exclusiveMaximumTimestamp}`;
      case y.ValueErrorType.DateMinimumTimestamp:
        return `Expected Date timestamp to be greater or equal to ${$.minimumTimestamp}`;
      case y.ValueErrorType.DateMaximumTimestamp:
        return `Expected Date timestamp to be less or equal to ${$.maximumTimestamp}`;
      case y.ValueErrorType.DateMultipleOfTimestamp:
        return `Expected Date timestamp to be a multiple of ${$.multipleOfTimestamp}`;
      case y.ValueErrorType.Date:
        return "Expected Date";
      case y.ValueErrorType.Function:
        return "Expected function";
      case y.ValueErrorType.IntegerExclusiveMaximum:
        return `Expected integer to be less than ${$.exclusiveMaximum}`;
      case y.ValueErrorType.IntegerExclusiveMinimum:
        return `Expected integer to be greater than ${$.exclusiveMinimum}`;
      case y.ValueErrorType.IntegerMaximum:
        return `Expected integer to be less or equal to ${$.maximum}`;
      case y.ValueErrorType.IntegerMinimum:
        return `Expected integer to be greater or equal to ${$.minimum}`;
      case y.ValueErrorType.IntegerMultipleOf:
        return `Expected integer to be a multiple of ${$.multipleOf}`;
      case y.ValueErrorType.Integer:
        return "Expected integer";
      case y.ValueErrorType.IntersectUnevaluatedProperties:
        return "Unexpected property";
      case y.ValueErrorType.Intersect:
        return "Expected all values to match";
      case y.ValueErrorType.Iterator:
        return "Expected Iterator";
      case y.ValueErrorType.Literal:
        return `Expected ${typeof $.const === "string" ? `'${$.const}'` : $.const}`;
      case y.ValueErrorType.Never:
        return "Never";
      case y.ValueErrorType.Not:
        return "Value should not match";
      case y.ValueErrorType.Null:
        return "Expected null";
      case y.ValueErrorType.NumberExclusiveMaximum:
        return `Expected number to be less than ${$.exclusiveMaximum}`;
      case y.ValueErrorType.NumberExclusiveMinimum:
        return `Expected number to be greater than ${$.exclusiveMinimum}`;
      case y.ValueErrorType.NumberMaximum:
        return `Expected number to be less or equal to ${$.maximum}`;
      case y.ValueErrorType.NumberMinimum:
        return `Expected number to be greater or equal to ${$.minimum}`;
      case y.ValueErrorType.NumberMultipleOf:
        return `Expected number to be a multiple of ${$.multipleOf}`;
      case y.ValueErrorType.Number:
        return "Expected number";
      case y.ValueErrorType.Object:
        return "Expected object";
      case y.ValueErrorType.ObjectAdditionalProperties:
        return "Unexpected property";
      case y.ValueErrorType.ObjectMaxProperties:
        return `Expected object to have no more than ${$.maxProperties} properties`;
      case y.ValueErrorType.ObjectMinProperties:
        return `Expected object to have at least ${$.minProperties} properties`;
      case y.ValueErrorType.ObjectRequiredProperty:
        return "Required property";
      case y.ValueErrorType.Promise:
        return "Expected Promise";
      case y.ValueErrorType.StringFormatUnknown:
        return `Unknown format '${$.format}'`;
      case y.ValueErrorType.StringFormat:
        return `Expected string to match '${$.format}' format`;
      case y.ValueErrorType.StringMaxLength:
        return `Expected string length less or equal to ${$.maxLength}`;
      case y.ValueErrorType.StringMinLength:
        return `Expected string length greater or equal to ${$.minLength}`;
      case y.ValueErrorType.StringPattern:
        return `Expected string to match '${$.pattern}'`;
      case y.ValueErrorType.String:
        return "Expected string";
      case y.ValueErrorType.Symbol:
        return "Expected symbol";
      case y.ValueErrorType.TupleLength:
        return `Expected tuple to have ${$.maxItems || 0} elements`;
      case y.ValueErrorType.Tuple:
        return "Expected tuple";
      case y.ValueErrorType.Uint8ArrayMaxByteLength:
        return `Expected byte length less or equal to ${$.maxByteLength}`;
      case y.ValueErrorType.Uint8ArrayMinByteLength:
        return `Expected byte length greater or equal to ${$.minByteLength}`;
      case y.ValueErrorType.Uint8Array:
        return "Expected Uint8Array";
      case y.ValueErrorType.Undefined:
        return "Expected undefined";
      case y.ValueErrorType.Union:
        return "Expected union value";
      case y.ValueErrorType.Void:
        return "Expected void";
      case y.ValueErrorType.Kind:
        return `Expected kind '${$[J1.Kind]}'`;
      default:
        return "Unknown error type";
    }
  };
  Object.defineProperty(l8, "__esModule", { value: true });
  l8.DefaultErrorFunction = l8.TypeSystemPolicy = l8.TypeSystemErrorFunction = l8.TypeSystem = l8.TypeSystemDuplicateFormat = l8.TypeSystemDuplicateTypeKind = undefined;
  var R$ = E0(), y = W$(), J1 = x0();

  class K6 extends J1.TypeBoxError {
    constructor($) {
      super(`Duplicate type kind '${$}' detected`);
    }
  }
  l8.TypeSystemDuplicateTypeKind = K6;

  class P6 extends J1.TypeBoxError {
    constructor($) {
      super(`Duplicate string format '${$}' detected`);
    }
  }
  l8.TypeSystemDuplicateFormat = P6;
  var n8;
  (function($) {
    function W(X, Z) {
      if (J1.TypeRegistry.Has(X))
        throw new K6(X);
      return J1.TypeRegistry.Set(X, Z), (Q = {}) => J1.Type.Unsafe({ ...Q, [J1.Kind]: X });
    }
    $.Type = W;
    function Y(X, Z) {
      if (J1.FormatRegistry.Has(X))
        throw new P6(X);
      return J1.FormatRegistry.Set(X, Z), X;
    }
    $.Format = Y;
  })(n8 || (l8.TypeSystem = n8 = {}));
  var o8;
  (function($) {
    let W = j6;
    function Y() {
      W = j6;
    }
    $.Reset = Y;
    function X(Q) {
      W = Q;
    }
    $.Set = X;
    function Z() {
      return W;
    }
    $.Get = Z;
  })(o8 || (l8.TypeSystemErrorFunction = o8 = {}));
  var c8;
  (function($) {
    $.ExactOptionalPropertyTypes = false, $.AllowArrayObject = false, $.AllowNaN = false, $.AllowNullVoid = false;
    function W(J, z) {
      return $.ExactOptionalPropertyTypes ? z in J : J[z] !== undefined;
    }
    $.IsExactOptionalProperty = W;
    function Y(J) {
      const z = (0, R$.IsObject)(J);
      return $.AllowArrayObject ? z : z && !(0, R$.IsArray)(J);
    }
    $.IsObjectLike = Y;
    function X(J) {
      return Y(J) && !(J instanceof Date) && !(J instanceof Uint8Array);
    }
    $.IsRecordLike = X;
    function Z(J) {
      const z = (0, R$.IsNumber)(J);
      return $.AllowNaN ? z : z && Number.isFinite(J);
    }
    $.IsNumberLike = Z;
    function Q(J) {
      const z = (0, R$.IsUndefined)(J);
      return $.AllowNullVoid ? z || J === null : z;
    }
    $.IsVoidLike = Q;
  })(c8 || (l8.TypeSystemPolicy = c8 = {}));
  l8.DefaultErrorFunction = j6;
});
var w1 = Q0((s8) => {
  var IZ = function($, W) {
    const Y = W.findIndex((X) => X.$id === $.$ref);
    if (Y === -1)
      throw new S6($);
    return W[Y];
  };
  Object.defineProperty(s8, "__esModule", { value: true });
  s8.Deref = s8.TypeDereferenceError = undefined;
  var CZ = x0();

  class S6 extends CZ.TypeBoxError {
    constructor($) {
      super(`Unable to dereference schema with $id '${$.$id}'`);
      this.schema = $;
    }
  }
  s8.TypeDereferenceError = S6;
  s8.Deref = IZ;
});
var Y$ = Q0((WW) => {
  function* EZ($) {
    const W = $ === 0 ? 1 : Math.ceil(Math.floor(Math.log2($) + 1) / 8);
    for (let Y = 0;Y < W; Y++)
      yield $ >> 8 * (W - 1 - Y) & 255;
  }
  var VZ = function($) {
    b0(k0.Array);
    for (let W of $)
      v1(W);
  }, xZ = function($) {
    b0(k0.Boolean), b0($ ? 1 : 0);
  }, kZ = function($) {
    b0(k0.BigInt), e8.setBigInt64(0, $);
    for (let W of $W)
      b0(W);
  }, gZ = function($) {
    b0(k0.Date), v1($.getTime());
  }, fZ = function($) {
    b0(k0.Null);
  }, TZ = function($) {
    b0(k0.Number), e8.setFloat64(0, $);
    for (let W of $W)
      b0(W);
  }, dZ = function($) {
    b0(k0.Object);
    for (let W of globalThis.Object.keys($).sort())
      v1(W), v1($[W]);
  }, yZ = function($) {
    b0(k0.String);
    for (let W = 0;W < $.length; W++)
      for (let Y of EZ($.charCodeAt(W)))
        b0(Y);
  }, vZ = function($) {
    b0(k0.Symbol), v1($.description);
  }, pZ = function($) {
    b0(k0.Uint8Array);
    for (let W = 0;W < $.length; W++)
      b0($[W]);
  }, iZ = function($) {
    return b0(k0.Undefined);
  }, v1 = function($) {
    if ((0, h0.IsArray)($))
      return VZ($);
    if ((0, h0.IsBoolean)($))
      return xZ($);
    if ((0, h0.IsBigInt)($))
      return kZ($);
    if ((0, h0.IsDate)($))
      return gZ($);
    if ((0, h0.IsNull)($))
      return fZ($);
    if ((0, h0.IsNumber)($))
      return TZ($);
    if ((0, h0.IsPlainObject)($))
      return dZ($);
    if ((0, h0.IsString)($))
      return yZ($);
    if ((0, h0.IsSymbol)($))
      return vZ($);
    if ((0, h0.IsUint8Array)($))
      return pZ($);
    if ((0, h0.IsUndefined)($))
      return iZ($);
    throw new L6($);
  }, b0 = function($) {
    y1 = y1 ^ _Z[$], y1 = y1 * bZ % GZ;
  }, mZ = function($) {
    return y1 = BigInt("14695981039346656037"), v1($), y1;
  };
  Object.defineProperty(WW, "__esModule", { value: true });
  WW.Hash = WW.ByteMarker = WW.ValueHashError = undefined;
  var h0 = E0();

  class L6 extends Error {
    constructor($) {
      super("Unable to hash value");
      this.value = $;
    }
  }
  WW.ValueHashError = L6;
  var k0;
  (function($) {
    $[$.Undefined = 0] = "Undefined", $[$.Null = 1] = "Null", $[$.Boolean = 2] = "Boolean", $[$.Number = 3] = "Number", $[$.String = 4] = "String", $[$.Object = 5] = "Object", $[$.Array = 6] = "Array", $[$.Date = 7] = "Date", $[$.Uint8Array = 8] = "Uint8Array", $[$.Symbol = 9] = "Symbol", $[$.BigInt = 10] = "BigInt";
  })(k0 || (WW.ByteMarker = k0 = {}));
  var y1 = BigInt("14695981039346656037"), [bZ, GZ] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")], _Z = Array.from({ length: 256 }).map(($, W) => BigInt(W)), a8 = new Float64Array(1), e8 = new DataView(a8.buffer), $W = new Uint8Array(a8.buffer);
  WW.Hash = mZ;
});
var W$ = Q0((ZW) => {
  var l = function($) {
    return $ !== undefined;
  }, g = function($, W, Y, X) {
    return { type: $, schema: W, path: Y, value: X, message: p1.TypeSystemErrorFunction.Get()(W, $) };
  };
  function* oZ($, W, Y, X) {
  }
  function* cZ($, W, Y, X) {
    if (!(0, A0.IsArray)(X))
      return yield g(x.Array, $, Y, X);
    if (l($.minItems) && !(X.length >= $.minItems))
      yield g(x.ArrayMinItems, $, Y, X);
    if (l($.maxItems) && !(X.length <= $.maxItems))
      yield g(x.ArrayMaxItems, $, Y, X);
    for (let J = 0;J < X.length; J++)
      yield* S0($.items, W, `${Y}/${J}`, X[J]);
    if ($.uniqueItems === true && !function() {
      const J = new Set;
      for (let z of X) {
        const A = (0, nZ.Hash)(z);
        if (J.has(A))
          return false;
        else
          J.add(A);
      }
      return true;
    }())
      yield g(x.ArrayUniqueItems, $, Y, X);
    if (!(l($.contains) || l($.minContains) || l($.maxContains)))
      return;
    const Z = l($.contains) ? $.contains : d0.Type.Never(), Q = X.reduce((J, z, A) => S0(Z, W, `${Y}${A}`, z).next().done === true ? J + 1 : J, 0);
    if (Q === 0)
      yield g(x.ArrayContains, $, Y, X);
    if ((0, A0.IsNumber)($.minContains) && Q < $.minContains)
      yield g(x.ArrayMinContains, $, Y, X);
    if ((0, A0.IsNumber)($.maxContains) && Q > $.maxContains)
      yield g(x.ArrayMaxContains, $, Y, X);
  }
  function* lZ($, W, Y, X) {
    if (!(0, A0.IsAsyncIterator)(X))
      yield g(x.AsyncIterator, $, Y, X);
  }
  function* tZ($, W, Y, X) {
    if (!(0, A0.IsBigInt)(X))
      return yield g(x.BigInt, $, Y, X);
    if (l($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield g(x.BigIntExclusiveMaximum, $, Y, X);
    if (l($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield g(x.BigIntExclusiveMinimum, $, Y, X);
    if (l($.maximum) && !(X <= $.maximum))
      yield g(x.BigIntMaximum, $, Y, X);
    if (l($.minimum) && !(X >= $.minimum))
      yield g(x.BigIntMinimum, $, Y, X);
    if (l($.multipleOf) && X % $.multipleOf !== BigInt(0))
      yield g(x.BigIntMultipleOf, $, Y, X);
  }
  function* sZ($, W, Y, X) {
    if (!(0, A0.IsBoolean)(X))
      yield g(x.Boolean, $, Y, X);
  }
  function* rZ($, W, Y, X) {
    yield* S0($.returns, W, Y, X.prototype);
  }
  function* aZ($, W, Y, X) {
    if (!(0, A0.IsDate)(X))
      return yield g(x.Date, $, Y, X);
    if (l($.exclusiveMaximumTimestamp) && !(X.getTime() < $.exclusiveMaximumTimestamp))
      yield g(x.DateExclusiveMaximumTimestamp, $, Y, X);
    if (l($.exclusiveMinimumTimestamp) && !(X.getTime() > $.exclusiveMinimumTimestamp))
      yield g(x.DateExclusiveMinimumTimestamp, $, Y, X);
    if (l($.maximumTimestamp) && !(X.getTime() <= $.maximumTimestamp))
      yield g(x.DateMaximumTimestamp, $, Y, X);
    if (l($.minimumTimestamp) && !(X.getTime() >= $.minimumTimestamp))
      yield g(x.DateMinimumTimestamp, $, Y, X);
    if (l($.multipleOfTimestamp) && X.getTime() % $.multipleOfTimestamp !== 0)
      yield g(x.DateMultipleOfTimestamp, $, Y, X);
  }
  function* eZ($, W, Y, X) {
    if (!(0, A0.IsFunction)(X))
      yield g(x.Function, $, Y, X);
  }
  function* $4($, W, Y, X) {
    if (!(0, A0.IsInteger)(X))
      return yield g(x.Integer, $, Y, X);
    if (l($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield g(x.IntegerExclusiveMaximum, $, Y, X);
    if (l($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield g(x.IntegerExclusiveMinimum, $, Y, X);
    if (l($.maximum) && !(X <= $.maximum))
      yield g(x.IntegerMaximum, $, Y, X);
    if (l($.minimum) && !(X >= $.minimum))
      yield g(x.IntegerMinimum, $, Y, X);
    if (l($.multipleOf) && X % $.multipleOf !== 0)
      yield g(x.IntegerMultipleOf, $, Y, X);
  }
  function* W4($, W, Y, X) {
    for (let Z of $.allOf) {
      const Q = S0(Z, W, Y, X).next();
      if (!Q.done)
        yield g(x.Intersect, $, Y, X), yield Q.value;
    }
    if ($.unevaluatedProperties === false) {
      const Z = new RegExp(d0.KeyResolver.ResolvePattern($));
      for (let Q of Object.getOwnPropertyNames(X))
        if (!Z.test(Q))
          yield g(x.IntersectUnevaluatedProperties, $, `${Y}/${Q}`, X);
    }
    if (typeof $.unevaluatedProperties === "object") {
      const Z = new RegExp(d0.KeyResolver.ResolvePattern($));
      for (let Q of Object.getOwnPropertyNames(X))
        if (!Z.test(Q)) {
          const J = S0($.unevaluatedProperties, W, `${Y}/${Q}`, X[Q]).next();
          if (!J.done)
            yield J.value;
        }
    }
  }
  function* Y4($, W, Y, X) {
    if (!(0, A0.IsIterator)(X))
      yield g(x.Iterator, $, Y, X);
  }
  function* X4($, W, Y, X) {
    if (X !== $.const)
      yield g(x.Literal, $, Y, X);
  }
  function* Z4($, W, Y, X) {
    yield g(x.Never, $, Y, X);
  }
  function* Q4($, W, Y, X) {
    if (S0($.not, W, Y, X).next().done === true)
      yield g(x.Not, $, Y, X);
  }
  function* J4($, W, Y, X) {
    if (!(0, A0.IsNull)(X))
      yield g(x.Null, $, Y, X);
  }
  function* z4($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsNumberLike(X))
      return yield g(x.Number, $, Y, X);
    if (l($.exclusiveMaximum) && !(X < $.exclusiveMaximum))
      yield g(x.NumberExclusiveMaximum, $, Y, X);
    if (l($.exclusiveMinimum) && !(X > $.exclusiveMinimum))
      yield g(x.NumberExclusiveMinimum, $, Y, X);
    if (l($.maximum) && !(X <= $.maximum))
      yield g(x.NumberMaximum, $, Y, X);
    if (l($.minimum) && !(X >= $.minimum))
      yield g(x.NumberMinimum, $, Y, X);
    if (l($.multipleOf) && X % $.multipleOf !== 0)
      yield g(x.NumberMultipleOf, $, Y, X);
  }
  function* H4($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsObjectLike(X))
      return yield g(x.Object, $, Y, X);
    if (l($.minProperties) && !(Object.getOwnPropertyNames(X).length >= $.minProperties))
      yield g(x.ObjectMinProperties, $, Y, X);
    if (l($.maxProperties) && !(Object.getOwnPropertyNames(X).length <= $.maxProperties))
      yield g(x.ObjectMaxProperties, $, Y, X);
    const Z = Array.isArray($.required) ? $.required : [], Q = Object.getOwnPropertyNames($.properties), J = Object.getOwnPropertyNames(X);
    for (let z of Z) {
      if (J.includes(z))
        continue;
      yield g(x.ObjectRequiredProperty, $.properties[z], `${Y}/${z}`, undefined);
    }
    if ($.additionalProperties === false) {
      for (let z of J)
        if (!Q.includes(z))
          yield g(x.ObjectAdditionalProperties, $, `${Y}/${z}`, X[z]);
    }
    if (typeof $.additionalProperties === "object")
      for (let z of J) {
        if (Q.includes(z))
          continue;
        yield* S0($.additionalProperties, W, `${Y}/${z}`, X[z]);
      }
    for (let z of Q) {
      const A = $.properties[z];
      if ($.required && $.required.includes(z)) {
        if (yield* S0(A, W, `${Y}/${z}`, X[z]), d0.ExtendsUndefined.Check($) && !(z in X))
          yield g(x.ObjectRequiredProperty, A, `${Y}/${z}`, undefined);
      } else if (p1.TypeSystemPolicy.IsExactOptionalProperty(X, z))
        yield* S0(A, W, `${Y}/${z}`, X[z]);
    }
  }
  function* q4($, W, Y, X) {
    if (!(0, A0.IsPromise)(X))
      yield g(x.Promise, $, Y, X);
  }
  function* N4($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsRecordLike(X))
      return yield g(x.Object, $, Y, X);
    if (l($.minProperties) && !(Object.getOwnPropertyNames(X).length >= $.minProperties))
      yield g(x.ObjectMinProperties, $, Y, X);
    if (l($.maxProperties) && !(Object.getOwnPropertyNames(X).length <= $.maxProperties))
      yield g(x.ObjectMaxProperties, $, Y, X);
    const [Z, Q] = Object.entries($.patternProperties)[0], J = new RegExp(Z);
    for (let [z, A] of Object.entries(X))
      if (J.test(z))
        yield* S0(Q, W, `${Y}/${z}`, A);
    if (typeof $.additionalProperties === "object") {
      for (let [z, A] of Object.entries(X))
        if (!J.test(z))
          yield* S0($.additionalProperties, W, `${Y}/${z}`, A);
    }
    if ($.additionalProperties === false)
      for (let [z, A] of Object.entries(X)) {
        if (J.test(z))
          continue;
        return yield g(x.ObjectAdditionalProperties, $, `${Y}/${z}`, A);
      }
  }
  function* M4($, W, Y, X) {
    yield* S0((0, XW.Deref)($, W), W, Y, X);
  }
  function* U4($, W, Y, X) {
    if (!(0, A0.IsString)(X))
      return yield g(x.String, $, Y, X);
    if (l($.minLength) && !(X.length >= $.minLength))
      yield g(x.StringMinLength, $, Y, X);
    if (l($.maxLength) && !(X.length <= $.maxLength))
      yield g(x.StringMaxLength, $, Y, X);
    if ((0, A0.IsString)($.pattern)) {
      if (!new RegExp($.pattern).test(X))
        yield g(x.StringPattern, $, Y, X);
    }
    if ((0, A0.IsString)($.format)) {
      if (!d0.FormatRegistry.Has($.format))
        yield g(x.StringFormatUnknown, $, Y, X);
      else if (!d0.FormatRegistry.Get($.format)(X))
        yield g(x.StringFormat, $, Y, X);
    }
  }
  function* A4($, W, Y, X) {
    if (!(0, A0.IsSymbol)(X))
      yield g(x.Symbol, $, Y, X);
  }
  function* B4($, W, Y, X) {
    if (!(0, A0.IsString)(X))
      return yield g(x.String, $, Y, X);
    if (!new RegExp($.pattern).test(X))
      yield g(x.StringPattern, $, Y, X);
  }
  function* F4($, W, Y, X) {
    yield* S0((0, XW.Deref)($, W), W, Y, X);
  }
  function* w4($, W, Y, X) {
    if (!(0, A0.IsArray)(X))
      return yield g(x.Tuple, $, Y, X);
    if ($.items === undefined && X.length !== 0)
      return yield g(x.TupleLength, $, Y, X);
    if (X.length !== $.maxItems)
      return yield g(x.TupleLength, $, Y, X);
    if (!$.items)
      return;
    for (let Z = 0;Z < $.items.length; Z++)
      yield* S0($.items[Z], W, `${Y}/${Z}`, X[Z]);
  }
  function* D4($, W, Y, X) {
    if (!(0, A0.IsUndefined)(X))
      yield g(x.Undefined, $, Y, X);
  }
  function* j4($, W, Y, X) {
    let Z = 0;
    for (let Q of $.anyOf) {
      const J = [...S0(Q, W, Y, X)];
      if (J.length === 0)
        return;
      Z += J.length;
    }
    if (Z > 0)
      yield g(x.Union, $, Y, X);
  }
  function* K4($, W, Y, X) {
    if (!(0, A0.IsUint8Array)(X))
      return yield g(x.Uint8Array, $, Y, X);
    if (l($.maxByteLength) && !(X.length <= $.maxByteLength))
      yield g(x.Uint8ArrayMaxByteLength, $, Y, X);
    if (l($.minByteLength) && !(X.length >= $.minByteLength))
      yield g(x.Uint8ArrayMinByteLength, $, Y, X);
  }
  function* P4($, W, Y, X) {
  }
  function* O4($, W, Y, X) {
    if (!p1.TypeSystemPolicy.IsVoidLike(X))
      yield g(x.Void, $, Y, X);
  }
  function* S4($, W, Y, X) {
    if (!d0.TypeRegistry.Get($[d0.Kind])($, X))
      yield g(x.Kind, $, Y, X);
  }
  function* S0($, W, Y, X) {
    const Z = l($.$id) ? [...W, $] : W, Q = $;
    switch (Q[d0.Kind]) {
      case "Any":
        return yield* oZ(Q, Z, Y, X);
      case "Array":
        return yield* cZ(Q, Z, Y, X);
      case "AsyncIterator":
        return yield* lZ(Q, Z, Y, X);
      case "BigInt":
        return yield* tZ(Q, Z, Y, X);
      case "Boolean":
        return yield* sZ(Q, Z, Y, X);
      case "Constructor":
        return yield* rZ(Q, Z, Y, X);
      case "Date":
        return yield* aZ(Q, Z, Y, X);
      case "Function":
        return yield* eZ(Q, Z, Y, X);
      case "Integer":
        return yield* $4(Q, Z, Y, X);
      case "Intersect":
        return yield* W4(Q, Z, Y, X);
      case "Iterator":
        return yield* Y4(Q, Z, Y, X);
      case "Literal":
        return yield* X4(Q, Z, Y, X);
      case "Never":
        return yield* Z4(Q, Z, Y, X);
      case "Not":
        return yield* Q4(Q, Z, Y, X);
      case "Null":
        return yield* J4(Q, Z, Y, X);
      case "Number":
        return yield* z4(Q, Z, Y, X);
      case "Object":
        return yield* H4(Q, Z, Y, X);
      case "Promise":
        return yield* q4(Q, Z, Y, X);
      case "Record":
        return yield* N4(Q, Z, Y, X);
      case "Ref":
        return yield* M4(Q, Z, Y, X);
      case "String":
        return yield* U4(Q, Z, Y, X);
      case "Symbol":
        return yield* A4(Q, Z, Y, X);
      case "TemplateLiteral":
        return yield* B4(Q, Z, Y, X);
      case "This":
        return yield* F4(Q, Z, Y, X);
      case "Tuple":
        return yield* w4(Q, Z, Y, X);
      case "Undefined":
        return yield* D4(Q, Z, Y, X);
      case "Union":
        return yield* j4(Q, Z, Y, X);
      case "Uint8Array":
        return yield* K4(Q, Z, Y, X);
      case "Unknown":
        return yield* P4(Q, Z, Y, X);
      case "Void":
        return yield* O4(Q, Z, Y, X);
      default:
        if (!d0.TypeRegistry.Has(Q[d0.Kind]))
          throw new C6($);
        return yield* S4(Q, Z, Y, X);
    }
  }
  var L4 = function(...$) {
    const W = $.length === 3 ? S0($[0], $[1], "", $[2]) : S0($[0], [], "", $[1]);
    return new I6(W);
  };
  Object.defineProperty(ZW, "__esModule", { value: true });
  ZW.Errors = ZW.ValueErrorIterator = ZW.ValueErrorsUnknownTypeError = ZW.ValueErrorType = undefined;
  var A0 = E0(), p1 = O6(), XW = w1(), nZ = Y$(), d0 = x0(), x;
  (function($) {
    $[$.ArrayContains = 0] = "ArrayContains", $[$.ArrayMaxContains = 1] = "ArrayMaxContains", $[$.ArrayMaxItems = 2] = "ArrayMaxItems", $[$.ArrayMinContains = 3] = "ArrayMinContains", $[$.ArrayMinItems = 4] = "ArrayMinItems", $[$.ArrayUniqueItems = 5] = "ArrayUniqueItems", $[$.Array = 6] = "Array", $[$.AsyncIterator = 7] = "AsyncIterator", $[$.BigIntExclusiveMaximum = 8] = "BigIntExclusiveMaximum", $[$.BigIntExclusiveMinimum = 9] = "BigIntExclusiveMinimum", $[$.BigIntMaximum = 10] = "BigIntMaximum", $[$.BigIntMinimum = 11] = "BigIntMinimum", $[$.BigIntMultipleOf = 12] = "BigIntMultipleOf", $[$.BigInt = 13] = "BigInt", $[$.Boolean = 14] = "Boolean", $[$.DateExclusiveMaximumTimestamp = 15] = "DateExclusiveMaximumTimestamp", $[$.DateExclusiveMinimumTimestamp = 16] = "DateExclusiveMinimumTimestamp", $[$.DateMaximumTimestamp = 17] = "DateMaximumTimestamp", $[$.DateMinimumTimestamp = 18] = "DateMinimumTimestamp", $[$.DateMultipleOfTimestamp = 19] = "DateMultipleOfTimestamp", $[$.Date = 20] = "Date", $[$.Function = 21] = "Function", $[$.IntegerExclusiveMaximum = 22] = "IntegerExclusiveMaximum", $[$.IntegerExclusiveMinimum = 23] = "IntegerExclusiveMinimum", $[$.IntegerMaximum = 24] = "IntegerMaximum", $[$.IntegerMinimum = 25] = "IntegerMinimum", $[$.IntegerMultipleOf = 26] = "IntegerMultipleOf", $[$.Integer = 27] = "Integer", $[$.IntersectUnevaluatedProperties = 28] = "IntersectUnevaluatedProperties", $[$.Intersect = 29] = "Intersect", $[$.Iterator = 30] = "Iterator", $[$.Kind = 31] = "Kind", $[$.Literal = 32] = "Literal", $[$.Never = 33] = "Never", $[$.Not = 34] = "Not", $[$.Null = 35] = "Null", $[$.NumberExclusiveMaximum = 36] = "NumberExclusiveMaximum", $[$.NumberExclusiveMinimum = 37] = "NumberExclusiveMinimum", $[$.NumberMaximum = 38] = "NumberMaximum", $[$.NumberMinimum = 39] = "NumberMinimum", $[$.NumberMultipleOf = 40] = "NumberMultipleOf", $[$.Number = 41] = "Number", $[$.ObjectAdditionalProperties = 42] = "ObjectAdditionalProperties", $[$.ObjectMaxProperties = 43] = "ObjectMaxProperties", $[$.ObjectMinProperties = 44] = "ObjectMinProperties", $[$.ObjectRequiredProperty = 45] = "ObjectRequiredProperty", $[$.Object = 46] = "Object", $[$.Promise = 47] = "Promise", $[$.StringFormatUnknown = 48] = "StringFormatUnknown", $[$.StringFormat = 49] = "StringFormat", $[$.StringMaxLength = 50] = "StringMaxLength", $[$.StringMinLength = 51] = "StringMinLength", $[$.StringPattern = 52] = "StringPattern", $[$.String = 53] = "String", $[$.Symbol = 54] = "Symbol", $[$.TupleLength = 55] = "TupleLength", $[$.Tuple = 56] = "Tuple", $[$.Uint8ArrayMaxByteLength = 57] = "Uint8ArrayMaxByteLength", $[$.Uint8ArrayMinByteLength = 58] = "Uint8ArrayMinByteLength", $[$.Uint8Array = 59] = "Uint8Array", $[$.Undefined = 60] = "Undefined", $[$.Union = 61] = "Union", $[$.Void = 62] = "Void";
  })(x || (ZW.ValueErrorType = x = {}));

  class C6 extends d0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  ZW.ValueErrorsUnknownTypeError = C6;

  class I6 {
    constructor($) {
      this.iterator = $;
    }
    [Symbol.iterator]() {
      return this.iterator;
    }
    First() {
      const $ = this.iterator.next();
      return $.done ? undefined : $.value;
    }
  }
  ZW.ValueErrorIterator = I6;
  ZW.Errors = L4;
});
var b$ = Q0((S1) => {
  var b4 = S1 && S1.__createBinding || (Object.create ? function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    var Z = Object.getOwnPropertyDescriptor(W, Y);
    if (!Z || ("get" in Z ? !W.__esModule : Z.writable || Z.configurable))
      Z = { enumerable: true, get: function() {
        return W[Y];
      } };
    Object.defineProperty($, X, Z);
  } : function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    $[X] = W[Y];
  }), G4 = S1 && S1.__exportStar || function($, W) {
    for (var Y in $)
      if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
        b4(W, $, Y);
  };
  Object.defineProperty(S1, "__esModule", { value: true });
  G4(W$(), S1);
});
var G$ = Q0((zW) => {
  Object.defineProperty(zW, "__esModule", { value: true });
  zW.ValuePointer = zW.ValuePointerRootDeleteError = zW.ValuePointerRootSetError = undefined;

  class R6 extends Error {
    constructor($, W, Y) {
      super("Cannot set root value");
      this.value = $, this.path = W, this.update = Y;
    }
  }
  zW.ValuePointerRootSetError = R6;

  class b6 extends Error {
    constructor($, W) {
      super("Cannot delete root value");
      this.value = $, this.path = W;
    }
  }
  zW.ValuePointerRootDeleteError = b6;
  var JW;
  (function($) {
    function W(z) {
      return z.indexOf("~") === -1 ? z : z.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    function* Y(z) {
      if (z === "")
        return;
      let [A, w] = [0, 0];
      for (let F = 0;F < z.length; F++)
        if (z.charAt(F) === "/")
          if (F === 0)
            A = F + 1;
          else
            w = F, yield W(z.slice(A, w)), A = F + 1;
        else
          w = F;
      yield W(z.slice(A));
    }
    $.Format = Y;
    function X(z, A, w) {
      if (A === "")
        throw new R6(z, A, w);
      let [F, S, R] = [null, z, ""];
      for (let j of Y(A)) {
        if (S[j] === undefined)
          S[j] = {};
        F = S, S = S[j], R = j;
      }
      F[R] = w;
    }
    $.Set = X;
    function Z(z, A) {
      if (A === "")
        throw new b6(z, A);
      let [w, F, S] = [null, z, ""];
      for (let R of Y(A)) {
        if (F[R] === undefined || F[R] === null)
          return;
        w = F, F = F[R], S = R;
      }
      if (Array.isArray(w)) {
        const R = parseInt(S);
        w.splice(R, 1);
      } else
        delete w[S];
    }
    $.Delete = Z;
    function Q(z, A) {
      if (A === "")
        return true;
      let [w, F, S] = [null, z, ""];
      for (let R of Y(A)) {
        if (F[R] === undefined)
          return false;
        w = F, F = F[R], S = R;
      }
      return Object.getOwnPropertyNames(w).includes(S);
    }
    $.Has = Q;
    function J(z, A) {
      if (A === "")
        return z;
      let w = z;
      for (let F of Y(A)) {
        if (w[F] === undefined)
          return;
        w = w[F];
      }
      return w;
    }
    $.Get = J;
  })(JW || (zW.ValuePointer = JW = {}));
});
var i1 = Q0((qW) => {
  var V4 = function($) {
    return [...Object.getOwnPropertyNames($), ...Object.getOwnPropertySymbols($)].reduce((Y, X) => ({ ...Y, [X]: G6($[X]) }), {});
  }, x4 = function($) {
    return $.map((W) => G6(W));
  }, k4 = function($) {
    return $.slice();
  }, g4 = function($) {
    return new Date($.toISOString());
  }, f4 = function($) {
    return $;
  }, G6 = function($) {
    if ((0, X$.IsArray)($))
      return x4($);
    if ((0, X$.IsDate)($))
      return g4($);
    if ((0, X$.IsPlainObject)($))
      return V4($);
    if ((0, X$.IsTypedArray)($))
      return k4($);
    if ((0, X$.IsValueType)($))
      return f4($);
    throw new Error("ValueClone: Unable to clone value");
  };
  Object.defineProperty(qW, "__esModule", { value: true });
  qW.Clone = undefined;
  var X$ = E0();
  qW.Clone = G6;
});
var x6 = Q0((AW) => {
  var Z$ = function($, W) {
    return { type: "update", path: $, value: W };
  }, MW = function($, W) {
    return { type: "insert", path: $, value: W };
  }, UW = function($) {
    return { type: "delete", path: $ };
  };
  function* T4($, W, Y) {
    if (!(0, G0.IsPlainObject)(Y))
      return yield Z$($, Y);
    const X = [...Object.keys(W), ...Object.getOwnPropertySymbols(W)], Z = [...Object.keys(Y), ...Object.getOwnPropertySymbols(Y)];
    for (let Q of X) {
      if ((0, G0.IsSymbol)(Q))
        throw new m1(Q);
      if ((0, G0.IsUndefined)(Y[Q]) && Z.includes(Q))
        yield Z$(`${$}/${String(Q)}`, undefined);
    }
    for (let Q of Z) {
      if ((0, G0.IsUndefined)(W[Q]) || (0, G0.IsUndefined)(Y[Q]))
        continue;
      if ((0, G0.IsSymbol)(Q))
        throw new m1(Q);
      yield* _$(`${$}/${String(Q)}`, W[Q], Y[Q]);
    }
    for (let Q of Z) {
      if ((0, G0.IsSymbol)(Q))
        throw new m1(Q);
      if ((0, G0.IsUndefined)(W[Q]))
        yield MW(`${$}/${String(Q)}`, Y[Q]);
    }
    for (let Q of X.reverse()) {
      if ((0, G0.IsSymbol)(Q))
        throw new m1(Q);
      if ((0, G0.IsUndefined)(Y[Q]) && !Z.includes(Q))
        yield UW(`${$}/${String(Q)}`);
    }
  }
  function* d4($, W, Y) {
    if (!(0, G0.IsArray)(Y))
      return yield Z$($, Y);
    for (let X = 0;X < Math.min(W.length, Y.length); X++)
      yield* _$(`${$}/${X}`, W[X], Y[X]);
    for (let X = 0;X < Y.length; X++) {
      if (X < W.length)
        continue;
      yield MW(`${$}/${X}`, Y[X]);
    }
    for (let X = W.length - 1;X >= 0; X--) {
      if (X < Y.length)
        continue;
      yield UW(`${$}/${X}`);
    }
  }
  function* y4($, W, Y) {
    if (!(0, G0.IsTypedArray)(Y) || W.length !== Y.length || Object.getPrototypeOf(W).constructor.name !== Object.getPrototypeOf(Y).constructor.name)
      return yield Z$($, Y);
    for (let X = 0;X < Math.min(W.length, Y.length); X++)
      yield* _$(`${$}/${X}`, W[X], Y[X]);
  }
  function* v4($, W, Y) {
    if (W === Y)
      return;
    yield Z$($, Y);
  }
  function* _$($, W, Y) {
    if ((0, G0.IsPlainObject)(W))
      return yield* T4($, W, Y);
    if ((0, G0.IsArray)(W))
      return yield* d4($, W, Y);
    if ((0, G0.IsTypedArray)(W))
      return yield* y4($, W, Y);
    if ((0, G0.IsValueType)(W))
      return yield* v4($, W, Y);
    throw new V6(W);
  }
  var p4 = function($, W) {
    return [..._$("", $, W)];
  }, i4 = function($) {
    return $.length > 0 && $[0].path === "" && $[0].type === "update";
  }, m4 = function($) {
    return $.length === 0;
  }, u4 = function($, W) {
    if (i4(W))
      return (0, E6.Clone)(W[0].value);
    if (m4(W))
      return (0, E6.Clone)($);
    const Y = (0, E6.Clone)($);
    for (let X of W)
      switch (X.type) {
        case "insert": {
          _6.ValuePointer.Set(Y, X.path, X.value);
          break;
        }
        case "update": {
          _6.ValuePointer.Set(Y, X.path, X.value);
          break;
        }
        case "delete": {
          _6.ValuePointer.Delete(Y, X.path);
          break;
        }
      }
    return Y;
  };
  Object.defineProperty(AW, "__esModule", { value: true });
  AW.Patch = AW.Diff = AW.ValueDeltaUnableToDiffUnknownValue = AW.ValueDeltaObjectWithSymbolKeyError = AW.Edit = AW.Delete = AW.Update = AW.Insert = undefined;
  var G0 = E0(), y0 = x0(), _6 = G$(), E6 = i1();
  AW.Insert = y0.Type.Object({ type: y0.Type.Literal("insert"), path: y0.Type.String(), value: y0.Type.Unknown() });
  AW.Update = y0.Type.Object({ type: y0.Type.Literal("update"), path: y0.Type.String(), value: y0.Type.Unknown() });
  AW.Delete = y0.Type.Object({ type: y0.Type.Literal("delete"), path: y0.Type.String() });
  AW.Edit = y0.Type.Union([AW.Insert, AW.Update, AW.Delete]);

  class m1 extends Error {
    constructor($) {
      super("Cannot diff objects with symbol keys");
      this.key = $;
    }
  }
  AW.ValueDeltaObjectWithSymbolKeyError = m1;

  class V6 extends Error {
    constructor($) {
      super("Unable to create diff edits for unknown value");
      this.value = $;
    }
  }
  AW.ValueDeltaUnableToDiffUnknownValue = V6;
  AW.Diff = p4;
  AW.Patch = u4;
});
var OW = Q0((KW) => {
  var l4 = function($, W, Y, X) {
    if (!(0, g0.IsPlainObject)(Y))
      E$.ValuePointer.Set($, W, (0, k6.Clone)(X));
    else {
      const Z = Object.keys(Y), Q = Object.keys(X);
      for (let J of Z)
        if (!Q.includes(J))
          delete Y[J];
      for (let J of Q)
        if (!Z.includes(J))
          Y[J] = null;
      for (let J of Q)
        T6($, `${W}/${J}`, Y[J], X[J]);
    }
  }, t4 = function($, W, Y, X) {
    if (!(0, g0.IsArray)(Y))
      E$.ValuePointer.Set($, W, (0, k6.Clone)(X));
    else {
      for (let Z = 0;Z < X.length; Z++)
        T6($, `${W}/${Z}`, Y[Z], X[Z]);
      Y.splice(X.length);
    }
  }, s4 = function($, W, Y, X) {
    if ((0, g0.IsTypedArray)(Y) && Y.length === X.length)
      for (let Z = 0;Z < Y.length; Z++)
        Y[Z] = X[Z];
    else
      E$.ValuePointer.Set($, W, (0, k6.Clone)(X));
  }, r4 = function($, W, Y, X) {
    if (Y === X)
      return;
    E$.ValuePointer.Set($, W, X);
  }, T6 = function($, W, Y, X) {
    if ((0, g0.IsArray)(X))
      return t4($, W, Y, X);
    if ((0, g0.IsTypedArray)(X))
      return s4($, W, Y, X);
    if ((0, g0.IsPlainObject)(X))
      return l4($, W, Y, X);
    if ((0, g0.IsValueType)(X))
      return r4($, W, Y, X);
  }, jW = function($) {
    return (0, g0.IsTypedArray)($) || (0, g0.IsValueType)($);
  }, a4 = function($, W) {
    return (0, g0.IsPlainObject)($) && (0, g0.IsArray)(W) || (0, g0.IsArray)($) && (0, g0.IsPlainObject)(W);
  }, e4 = function($, W) {
    if (jW($) || jW(W))
      throw new f6;
    if (a4($, W))
      throw new g6;
    T6($, "", $, W);
  };
  Object.defineProperty(KW, "__esModule", { value: true });
  KW.Mutate = KW.ValueMutateInvalidRootMutationError = KW.ValueMutateTypeMismatchError = undefined;
  var g0 = E0(), E$ = G$(), k6 = i1();

  class g6 extends Error {
    constructor() {
      super("Cannot assign due type mismatch of assignable values");
    }
  }
  KW.ValueMutateTypeMismatchError = g6;

  class f6 extends Error {
    constructor() {
      super("Only object and array types can be mutated at the root level");
    }
  }
  KW.ValueMutateInvalidRootMutationError = f6;
  KW.Mutate = e4;
});
var CW = Q0((SW) => {
  var YQ = function($, W) {
    if (!(0, z1.IsPlainObject)(W))
      return false;
    const Y = [...Object.keys($), ...Object.getOwnPropertySymbols($)], X = [...Object.keys(W), ...Object.getOwnPropertySymbols(W)];
    if (Y.length !== X.length)
      return false;
    return Y.every((Z) => V$($[Z], W[Z]));
  }, XQ = function($, W) {
    return (0, z1.IsDate)(W) && $.getTime() === W.getTime();
  }, ZQ = function($, W) {
    if (!(0, z1.IsArray)(W) || $.length !== W.length)
      return false;
    return $.every((Y, X) => V$(Y, W[X]));
  }, QQ = function($, W) {
    if (!(0, z1.IsTypedArray)(W) || $.length !== W.length || Object.getPrototypeOf($).constructor.name !== Object.getPrototypeOf(W).constructor.name)
      return false;
    return $.every((Y, X) => V$(Y, W[X]));
  }, JQ = function($, W) {
    return $ === W;
  }, V$ = function($, W) {
    if ((0, z1.IsPlainObject)($))
      return YQ($, W);
    if ((0, z1.IsDate)($))
      return XQ($, W);
    if ((0, z1.IsTypedArray)($))
      return QQ($, W);
    if ((0, z1.IsArray)($))
      return ZQ($, W);
    if ((0, z1.IsValueType)($))
      return JQ($, W);
    throw new Error("ValueEquals: Unable to compare value");
  };
  Object.defineProperty(SW, "__esModule", { value: true });
  SW.Equal = undefined;
  var z1 = E0();
  SW.Equal = V$;
});
var x$ = Q0((H1) => {
  var zQ = H1 && H1.__createBinding || (Object.create ? function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    var Z = Object.getOwnPropertyDescriptor(W, Y);
    if (!Z || ("get" in Z ? !W.__esModule : Z.writable || Z.configurable))
      Z = { enumerable: true, get: function() {
        return W[Y];
      } };
    Object.defineProperty($, X, Z);
  } : function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    $[X] = W[Y];
  }), HQ = H1 && H1.__exportStar || function($, W) {
    for (var Y in $)
      if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
        zQ(W, $, Y);
  };
  Object.defineProperty(H1, "__esModule", { value: true });
  H1.ValueErrorType = undefined;
  var qQ = W$();
  Object.defineProperty(H1, "ValueErrorType", { enumerable: true, get: function() {
    return qQ.ValueErrorType;
  } });
  HQ(O6(), H1);
});
var J$ = Q0((RW) => {
  var MQ = function($) {
    return $[L0.Kind] === "Any" || $[L0.Kind] === "Unknown";
  }, t = function($) {
    return $ !== undefined;
  }, UQ = function($, W, Y) {
    return true;
  }, AQ = function($, W, Y) {
    if (!(0, B0.IsArray)(Y))
      return false;
    if (t($.minItems) && !(Y.length >= $.minItems))
      return false;
    if (t($.maxItems) && !(Y.length <= $.maxItems))
      return false;
    if (!Y.every((Q) => C0($.items, W, Q)))
      return false;
    if ($.uniqueItems === true && !function() {
      const Q = new Set;
      for (let J of Y) {
        const z = (0, NQ.Hash)(J);
        if (Q.has(z))
          return false;
        else
          Q.add(z);
      }
      return true;
    }())
      return false;
    if (!(t($.contains) || (0, B0.IsNumber)($.minContains) || (0, B0.IsNumber)($.maxContains)))
      return true;
    const X = t($.contains) ? $.contains : L0.Type.Never(), Z = Y.reduce((Q, J) => C0(X, W, J) ? Q + 1 : Q, 0);
    if (Z === 0)
      return false;
    if ((0, B0.IsNumber)($.minContains) && Z < $.minContains)
      return false;
    if ((0, B0.IsNumber)($.maxContains) && Z > $.maxContains)
      return false;
    return true;
  }, BQ = function($, W, Y) {
    return (0, B0.IsAsyncIterator)(Y);
  }, FQ = function($, W, Y) {
    if (!(0, B0.IsBigInt)(Y))
      return false;
    if (t($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
      return false;
    if (t($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
      return false;
    if (t($.maximum) && !(Y <= $.maximum))
      return false;
    if (t($.minimum) && !(Y >= $.minimum))
      return false;
    if (t($.multipleOf) && Y % $.multipleOf !== BigInt(0))
      return false;
    return true;
  }, wQ = function($, W, Y) {
    return (0, B0.IsBoolean)(Y);
  }, DQ = function($, W, Y) {
    return C0($.returns, W, Y.prototype);
  }, jQ = function($, W, Y) {
    if (!(0, B0.IsDate)(Y))
      return false;
    if (t($.exclusiveMaximumTimestamp) && !(Y.getTime() < $.exclusiveMaximumTimestamp))
      return false;
    if (t($.exclusiveMinimumTimestamp) && !(Y.getTime() > $.exclusiveMinimumTimestamp))
      return false;
    if (t($.maximumTimestamp) && !(Y.getTime() <= $.maximumTimestamp))
      return false;
    if (t($.minimumTimestamp) && !(Y.getTime() >= $.minimumTimestamp))
      return false;
    if (t($.multipleOfTimestamp) && Y.getTime() % $.multipleOfTimestamp !== 0)
      return false;
    return true;
  }, KQ = function($, W, Y) {
    return (0, B0.IsFunction)(Y);
  }, PQ = function($, W, Y) {
    if (!(0, B0.IsInteger)(Y))
      return false;
    if (t($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
      return false;
    if (t($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
      return false;
    if (t($.maximum) && !(Y <= $.maximum))
      return false;
    if (t($.minimum) && !(Y >= $.minimum))
      return false;
    if (t($.multipleOf) && Y % $.multipleOf !== 0)
      return false;
    return true;
  }, OQ = function($, W, Y) {
    const X = $.allOf.every((Z) => C0(Z, W, Y));
    if ($.unevaluatedProperties === false) {
      const Z = new RegExp(L0.KeyResolver.ResolvePattern($)), Q = Object.getOwnPropertyNames(Y).every((J) => Z.test(J));
      return X && Q;
    } else if (L0.TypeGuard.TSchema($.unevaluatedProperties)) {
      const Z = new RegExp(L0.KeyResolver.ResolvePattern($)), Q = Object.getOwnPropertyNames(Y).every((J) => Z.test(J) || C0($.unevaluatedProperties, W, Y[J]));
      return X && Q;
    } else
      return X;
  }, SQ = function($, W, Y) {
    return (0, B0.IsIterator)(Y);
  }, LQ = function($, W, Y) {
    return Y === $.const;
  }, CQ = function($, W, Y) {
    return false;
  }, IQ = function($, W, Y) {
    return !C0($.not, W, Y);
  }, RQ = function($, W, Y) {
    return (0, B0.IsNull)(Y);
  }, bQ = function($, W, Y) {
    if (!Q$.TypeSystemPolicy.IsNumberLike(Y))
      return false;
    if (t($.exclusiveMaximum) && !(Y < $.exclusiveMaximum))
      return false;
    if (t($.exclusiveMinimum) && !(Y > $.exclusiveMinimum))
      return false;
    if (t($.minimum) && !(Y >= $.minimum))
      return false;
    if (t($.maximum) && !(Y <= $.maximum))
      return false;
    if (t($.multipleOf) && Y % $.multipleOf !== 0)
      return false;
    return true;
  }, GQ = function($, W, Y) {
    if (!Q$.TypeSystemPolicy.IsObjectLike(Y))
      return false;
    if (t($.minProperties) && !(Object.getOwnPropertyNames(Y).length >= $.minProperties))
      return false;
    if (t($.maxProperties) && !(Object.getOwnPropertyNames(Y).length <= $.maxProperties))
      return false;
    const X = Object.getOwnPropertyNames($.properties);
    for (let Z of X) {
      const Q = $.properties[Z];
      if ($.required && $.required.includes(Z)) {
        if (!C0(Q, W, Y[Z]))
          return false;
        if ((L0.ExtendsUndefined.Check(Q) || MQ(Q)) && !(Z in Y))
          return false;
      } else if (Q$.TypeSystemPolicy.IsExactOptionalProperty(Y, Z) && !C0(Q, W, Y[Z]))
        return false;
    }
    if ($.additionalProperties === false) {
      const Z = Object.getOwnPropertyNames(Y);
      if ($.required && $.required.length === X.length && Z.length === X.length)
        return true;
      else
        return Z.every((Q) => X.includes(Q));
    } else if (typeof $.additionalProperties === "object")
      return Object.getOwnPropertyNames(Y).every((Q) => X.includes(Q) || C0($.additionalProperties, W, Y[Q]));
    else
      return true;
  }, _Q = function($, W, Y) {
    return (0, B0.IsPromise)(Y);
  }, EQ = function($, W, Y) {
    if (!Q$.TypeSystemPolicy.IsRecordLike(Y))
      return false;
    if (t($.minProperties) && !(Object.getOwnPropertyNames(Y).length >= $.minProperties))
      return false;
    if (t($.maxProperties) && !(Object.getOwnPropertyNames(Y).length <= $.maxProperties))
      return false;
    const [X, Z] = Object.entries($.patternProperties)[0], Q = new RegExp(X), J = Object.entries(Y).every(([w, F]) => {
      return Q.test(w) ? C0(Z, W, F) : true;
    }), z = typeof $.additionalProperties === "object" ? Object.entries(Y).every(([w, F]) => {
      return !Q.test(w) ? C0($.additionalProperties, W, F) : true;
    }) : true, A = $.additionalProperties === false ? Object.getOwnPropertyNames(Y).every((w) => {
      return Q.test(w);
    }) : true;
    return J && z && A;
  }, VQ = function($, W, Y) {
    return C0((0, IW.Deref)($, W), W, Y);
  }, xQ = function($, W, Y) {
    if (!(0, B0.IsString)(Y))
      return false;
    if (t($.minLength)) {
      if (!(Y.length >= $.minLength))
        return false;
    }
    if (t($.maxLength)) {
      if (!(Y.length <= $.maxLength))
        return false;
    }
    if (t($.pattern)) {
      if (!new RegExp($.pattern).test(Y))
        return false;
    }
    if (t($.format)) {
      if (!L0.FormatRegistry.Has($.format))
        return false;
      return L0.FormatRegistry.Get($.format)(Y);
    }
    return true;
  }, kQ = function($, W, Y) {
    return (0, B0.IsSymbol)(Y);
  }, gQ = function($, W, Y) {
    return (0, B0.IsString)(Y) && new RegExp($.pattern).test(Y);
  }, fQ = function($, W, Y) {
    return C0((0, IW.Deref)($, W), W, Y);
  }, TQ = function($, W, Y) {
    if (!(0, B0.IsArray)(Y))
      return false;
    if ($.items === undefined && Y.length !== 0)
      return false;
    if (Y.length !== $.maxItems)
      return false;
    if (!$.items)
      return true;
    for (let X = 0;X < $.items.length; X++)
      if (!C0($.items[X], W, Y[X]))
        return false;
    return true;
  }, dQ = function($, W, Y) {
    return (0, B0.IsUndefined)(Y);
  }, yQ = function($, W, Y) {
    return $.anyOf.some((X) => C0(X, W, Y));
  }, vQ = function($, W, Y) {
    if (!(0, B0.IsUint8Array)(Y))
      return false;
    if (t($.maxByteLength) && !(Y.length <= $.maxByteLength))
      return false;
    if (t($.minByteLength) && !(Y.length >= $.minByteLength))
      return false;
    return true;
  }, pQ = function($, W, Y) {
    return true;
  }, iQ = function($, W, Y) {
    return Q$.TypeSystemPolicy.IsVoidLike(Y);
  }, mQ = function($, W, Y) {
    if (!L0.TypeRegistry.Has($[L0.Kind]))
      return false;
    return L0.TypeRegistry.Get($[L0.Kind])($, Y);
  }, C0 = function($, W, Y) {
    const X = t($.$id) ? [...W, $] : W, Z = $;
    switch (Z[L0.Kind]) {
      case "Any":
        return UQ(Z, X, Y);
      case "Array":
        return AQ(Z, X, Y);
      case "AsyncIterator":
        return BQ(Z, X, Y);
      case "BigInt":
        return FQ(Z, X, Y);
      case "Boolean":
        return wQ(Z, X, Y);
      case "Constructor":
        return DQ(Z, X, Y);
      case "Date":
        return jQ(Z, X, Y);
      case "Function":
        return KQ(Z, X, Y);
      case "Integer":
        return PQ(Z, X, Y);
      case "Intersect":
        return OQ(Z, X, Y);
      case "Iterator":
        return SQ(Z, X, Y);
      case "Literal":
        return LQ(Z, X, Y);
      case "Never":
        return CQ(Z, X, Y);
      case "Not":
        return IQ(Z, X, Y);
      case "Null":
        return RQ(Z, X, Y);
      case "Number":
        return bQ(Z, X, Y);
      case "Object":
        return GQ(Z, X, Y);
      case "Promise":
        return _Q(Z, X, Y);
      case "Record":
        return EQ(Z, X, Y);
      case "Ref":
        return VQ(Z, X, Y);
      case "String":
        return xQ(Z, X, Y);
      case "Symbol":
        return kQ(Z, X, Y);
      case "TemplateLiteral":
        return gQ(Z, X, Y);
      case "This":
        return fQ(Z, X, Y);
      case "Tuple":
        return TQ(Z, X, Y);
      case "Undefined":
        return dQ(Z, X, Y);
      case "Union":
        return yQ(Z, X, Y);
      case "Uint8Array":
        return vQ(Z, X, Y);
      case "Unknown":
        return pQ(Z, X, Y);
      case "Void":
        return iQ(Z, X, Y);
      default:
        if (!L0.TypeRegistry.Has(Z[L0.Kind]))
          throw new d6(Z);
        return mQ(Z, X, Y);
    }
  }, uQ = function(...$) {
    return $.length === 3 ? C0($[0], $[1], $[2]) : C0($[0], [], $[1]);
  };
  Object.defineProperty(RW, "__esModule", { value: true });
  RW.Check = RW.ValueCheckUnknownTypeError = undefined;
  var B0 = E0(), Q$ = x$(), IW = w1(), NQ = Y$(), L0 = x0();

  class d6 extends L0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  RW.ValueCheckUnknownTypeError = d6;
  RW.Check = uQ;
});
var h6 = Q0((VW) => {
  var oQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return {};
  }, cQ = function($, W) {
    if ($.uniqueItems === true && !(0, s.HasPropertyKey)($, "default"))
      throw new Error("ValueCreate.Array: Array with the uniqueItems constraint requires a default value");
    else if (("contains" in $) && !(0, s.HasPropertyKey)($, "default"))
      throw new Error("ValueCreate.Array: Array with the contains constraint requires a default value");
    else if ("default" in $)
      return $.default;
    else if ($.minItems !== undefined)
      return Array.from({ length: $.minItems }).map((Y) => {
        return f0($.items, W);
      });
    else
      return [];
  }, lQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return async function* () {
      }();
  }, tQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return BigInt(0);
  }, sQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return false;
  }, rQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else {
      const Y = f0($.returns, W);
      if (typeof Y === "object" && !Array.isArray(Y))
        return class {
          constructor() {
            for (let [X, Z] of Object.entries(Y)) {
              const Q = this;
              Q[X] = Z;
            }
          }
        };
      else
        return class {
        };
    }
  }, aQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.minimumTimestamp !== undefined)
      return new Date($.minimumTimestamp);
    else
      return new Date(0);
  }, eQ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return () => f0($.returns, W);
  }, $J = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.minimum !== undefined)
      return $.minimum;
    else
      return 0;
  }, WJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else {
      const Y = $.allOf.reduce((X, Z) => {
        const Q = f0(Z, W);
        return typeof Q === "object" ? { ...X, ...Q } : Q;
      }, {});
      if (!(0, nQ.Check)($, W, Y))
        throw new i6($);
      return Y;
    }
  }, YJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return function* () {
      }();
  }, XJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return $.const;
  }, ZJ = function($, W) {
    throw new v6($);
  }, QJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      throw new p6($);
  }, JJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return null;
  }, zJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.minimum !== undefined)
      return $.minimum;
    else
      return 0;
  }, HJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else {
      const Y = new Set($.required);
      return $.default || Object.entries($.properties).reduce((X, [Z, Q]) => {
        return Y.has(Z) ? { ...X, [Z]: f0(Q, W) } : { ...X };
      }, {});
    }
  }, qJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return Promise.resolve(f0($.item, W));
  }, NJ = function($, W) {
    const [Y, X] = Object.entries($.patternProperties)[0];
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if (!(Y === V0.PatternStringExact || Y === V0.PatternNumberExact))
      return Y.slice(1, Y.length - 1).split("|").reduce((Q, J) => {
        return { ...Q, [J]: f0(X, W) };
      }, {});
    else
      return {};
  }, MJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return f0((0, _W.Deref)($, W), W);
  }, UJ = function($, W) {
    if ($.pattern !== undefined)
      if (!(0, s.HasPropertyKey)($, "default"))
        throw new Error("ValueCreate.String: String types with patterns must specify a default value");
      else
        return $.default;
    else if ($.format !== undefined)
      if (!(0, s.HasPropertyKey)($, "default"))
        throw new Error("ValueCreate.String: String types with formats must specify a default value");
      else
        return $.default;
    else if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.minLength !== undefined)
      return Array.from({ length: $.minLength }).map(() => ".").join("");
    else
      return "";
  }, AJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ("value" in $)
      return Symbol.for($.value);
    else
      return Symbol();
  }, BJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    const Y = V0.TemplateLiteralParser.ParseExact($.pattern);
    if (!V0.TemplateLiteralFinite.Check(Y))
      throw new m6($);
    return V0.TemplateLiteralGenerator.Generate(Y).next().value;
  }, FJ = function($, W) {
    if (EW++ > GW)
      throw new u6($, GW);
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return f0((0, _W.Deref)($, W), W);
  }, wJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    if ($.items === undefined)
      return [];
    else
      return Array.from({ length: $.minItems }).map((Y, X) => f0($.items[X], W));
  }, DJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return;
  }, jJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.anyOf.length === 0)
      throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
    else
      return f0($.anyOf[0], W);
  }, KJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else if ($.minByteLength !== undefined)
      return new Uint8Array($.minByteLength);
    else
      return new Uint8Array(0);
  }, PJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return {};
  }, OJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      return;
  }, SJ = function($, W) {
    if ((0, s.HasPropertyKey)($, "default"))
      return $.default;
    else
      throw new Error("User defined types must specify a default value");
  }, f0 = function($, W) {
    const Y = (0, s.IsString)($.$id) ? [...W, $] : W, X = $;
    switch (X[V0.Kind]) {
      case "Any":
        return oQ(X, Y);
      case "Array":
        return cQ(X, Y);
      case "AsyncIterator":
        return lQ(X, Y);
      case "BigInt":
        return tQ(X, Y);
      case "Boolean":
        return sQ(X, Y);
      case "Constructor":
        return rQ(X, Y);
      case "Date":
        return aQ(X, Y);
      case "Function":
        return eQ(X, Y);
      case "Integer":
        return $J(X, Y);
      case "Intersect":
        return WJ(X, Y);
      case "Iterator":
        return YJ(X, Y);
      case "Literal":
        return XJ(X, Y);
      case "Never":
        return ZJ(X, Y);
      case "Not":
        return QJ(X, Y);
      case "Null":
        return JJ(X, Y);
      case "Number":
        return zJ(X, Y);
      case "Object":
        return HJ(X, Y);
      case "Promise":
        return qJ(X, Y);
      case "Record":
        return NJ(X, Y);
      case "Ref":
        return MJ(X, Y);
      case "String":
        return UJ(X, Y);
      case "Symbol":
        return AJ(X, Y);
      case "TemplateLiteral":
        return BJ(X, Y);
      case "This":
        return FJ(X, Y);
      case "Tuple":
        return wJ(X, Y);
      case "Undefined":
        return DJ(X, Y);
      case "Union":
        return jJ(X, Y);
      case "Uint8Array":
        return KJ(X, Y);
      case "Unknown":
        return PJ(X, Y);
      case "Void":
        return OJ(X, Y);
      default:
        if (!V0.TypeRegistry.Has(X[V0.Kind]))
          throw new y6(X);
        return SJ(X, Y);
    }
  }, LJ = function(...$) {
    return EW = 0, $.length === 2 ? f0($[0], $[1]) : f0($[0], []);
  };
  Object.defineProperty(VW, "__esModule", { value: true });
  VW.Create = VW.ValueCreateRecursiveInstantiationError = VW.ValueCreateTempateLiteralTypeError = VW.ValueCreateIntersectTypeError = VW.ValueCreateNotTypeError = VW.ValueCreateNeverTypeError = VW.ValueCreateUnknownTypeError = undefined;
  var s = E0(), nQ = J$(), _W = w1(), V0 = x0();

  class y6 extends V0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  VW.ValueCreateUnknownTypeError = y6;

  class v6 extends V0.TypeBoxError {
    constructor($) {
      super("Never types cannot be created");
      this.schema = $;
    }
  }
  VW.ValueCreateNeverTypeError = v6;

  class p6 extends V0.TypeBoxError {
    constructor($) {
      super("Not types must have a default value");
      this.schema = $;
    }
  }
  VW.ValueCreateNotTypeError = p6;

  class i6 extends V0.TypeBoxError {
    constructor($) {
      super("Intersect produced invalid value. Consider using a default value.");
      this.schema = $;
    }
  }
  VW.ValueCreateIntersectTypeError = i6;

  class m6 extends V0.TypeBoxError {
    constructor($) {
      super("Can only create template literal values from patterns that produce finite sequences. Consider using a default value.");
      this.schema = $;
    }
  }
  VW.ValueCreateTempateLiteralTypeError = m6;

  class u6 extends V0.TypeBoxError {
    constructor($, W) {
      super("Value cannot be created as recursive type may produce value of infinite size. Consider using a default.");
      this.schema = $, this.recursiveMaxDepth = W;
    }
  }
  VW.ValueCreateRecursiveInstantiationError = u6;
  var GW = 512, EW = 0;
  VW.Create = LJ;
});
var vW = Q0((dW) => {
  var fW = function($, W, Y) {
    return (0, v0.Check)($, W, Y) ? (0, u1.Clone)(Y) : (0, N1.Create)($, W);
  }, o6 = function($, W, Y) {
    return (0, v0.Check)($, W, Y) ? Y : (0, N1.Create)($, W);
  }, EJ = function($, W, Y) {
    if ((0, v0.Check)($, W, Y))
      return (0, u1.Clone)(Y);
    const X = (0, D1.IsArray)(Y) ? (0, u1.Clone)(Y) : (0, N1.Create)($, W), Z = (0, D1.IsNumber)($.minItems) && X.length < $.minItems ? [...X, ...Array.from({ length: $.minItems - X.length }, () => null)] : X, J = ((0, D1.IsNumber)($.maxItems) && Z.length > $.maxItems ? Z.slice(0, $.maxItems) : Z).map((A) => $1($.items, W, A));
    if ($.uniqueItems !== true)
      return J;
    const z = [...new Set(J)];
    if (!(0, v0.Check)($, W, z))
      throw new c6($, z);
    return z;
  }, VJ = function($, W, Y) {
    if ((0, v0.Check)($, W, Y))
      return (0, N1.Create)($, W);
    const X = new Set($.returns.required || []), Z = function() {
    };
    for (let [Q, J] of Object.entries($.returns.properties)) {
      if (!X.has(Q) && Y.prototype[Q] === undefined)
        continue;
      Z.prototype[Q] = $1(J, W, Y.prototype[Q]);
    }
    return Z;
  }, xJ = function($, W, Y) {
    const X = (0, N1.Create)($, W), Z = (0, D1.IsPlainObject)(X) && (0, D1.IsPlainObject)(Y) ? { ...X, ...Y } : Y;
    return (0, v0.Check)($, W, Z) ? Z : (0, N1.Create)($, W);
  }, kJ = function($, W, Y) {
    throw new l6($);
  }, gJ = function($, W, Y) {
    if ((0, v0.Check)($, W, Y))
      return Y;
    if (Y === null || typeof Y !== "object")
      return (0, N1.Create)($, W);
    const X = new Set($.required || []), Z = {};
    for (let [Q, J] of Object.entries($.properties)) {
      if (!X.has(Q) && Y[Q] === undefined)
        continue;
      Z[Q] = $1(J, W, Y[Q]);
    }
    if (typeof $.additionalProperties === "object") {
      const Q = Object.getOwnPropertyNames($.properties);
      for (let J of Object.getOwnPropertyNames(Y)) {
        if (Q.includes(J))
          continue;
        Z[J] = $1($.additionalProperties, W, Y[J]);
      }
    }
    return Z;
  }, fJ = function($, W, Y) {
    if ((0, v0.Check)($, W, Y))
      return (0, u1.Clone)(Y);
    if (Y === null || typeof Y !== "object" || Array.isArray(Y) || Y instanceof Date)
      return (0, N1.Create)($, W);
    const X = Object.getOwnPropertyNames($.patternProperties)[0], Z = $.patternProperties[X], Q = {};
    for (let [J, z] of Object.entries(Y))
      Q[J] = $1(Z, W, z);
    return Q;
  }, TJ = function($, W, Y) {
    return $1((0, kW.Deref)($, W), W, Y);
  }, dJ = function($, W, Y) {
    return $1((0, kW.Deref)($, W), W, Y);
  }, yJ = function($, W, Y) {
    if ((0, v0.Check)($, W, Y))
      return (0, u1.Clone)(Y);
    if (!(0, D1.IsArray)(Y))
      return (0, N1.Create)($, W);
    if ($.items === undefined)
      return [];
    return $.items.map((X, Z) => $1(X, W, Y[Z]));
  }, vJ = function($, W, Y) {
    return (0, v0.Check)($, W, Y) ? (0, u1.Clone)(Y) : n6.Create($, W, Y);
  }, $1 = function($, W, Y) {
    const X = (0, D1.IsString)($.$id) ? [...W, $] : W, Z = $;
    switch ($[q1.Kind]) {
      case "Array":
        return EJ(Z, X, Y);
      case "Constructor":
        return VJ(Z, X, Y);
      case "Intersect":
        return xJ(Z, X, Y);
      case "Never":
        return kJ(Z, X, Y);
      case "Object":
        return gJ(Z, X, Y);
      case "Record":
        return fJ(Z, X, Y);
      case "Ref":
        return TJ(Z, X, Y);
      case "This":
        return dJ(Z, X, Y);
      case "Tuple":
        return yJ(Z, X, Y);
      case "Union":
        return vJ(Z, X, Y);
      case "Date":
      case "Symbol":
      case "Uint8Array":
        return fW($, W, Y);
      case "Any":
      case "AsyncIterator":
      case "BigInt":
      case "Boolean":
      case "Function":
      case "Integer":
      case "Iterator":
      case "Literal":
      case "Not":
      case "Null":
      case "Number":
      case "Promise":
      case "String":
      case "TemplateLiteral":
      case "Undefined":
      case "Unknown":
      case "Void":
        return o6(Z, X, Y);
      default:
        if (!q1.TypeRegistry.Has(Z[q1.Kind]))
          throw new t6(Z);
        return o6(Z, X, Y);
    }
  }, TW = function(...$) {
    return $.length === 3 ? $1($[0], $[1], $[2]) : $1($[0], [], $[1]);
  };
  Object.defineProperty(dW, "__esModule", { value: true });
  dW.Cast = dW.Default = dW.DefaultClone = dW.ValueCastUnknownTypeError = dW.ValueCastRecursiveTypeError = dW.ValueCastNeverTypeError = dW.ValueCastArrayUniqueItemsTypeError = undefined;
  var D1 = E0(), N1 = h6(), v0 = J$(), u1 = i1(), kW = w1(), q1 = x0();

  class c6 extends q1.TypeBoxError {
    constructor($, W) {
      super("Array cast produced invalid data due to uniqueItems constraint");
      this.schema = $, this.value = W;
    }
  }
  dW.ValueCastArrayUniqueItemsTypeError = c6;

  class l6 extends q1.TypeBoxError {
    constructor($) {
      super("Never types cannot be cast");
      this.schema = $;
    }
  }
  dW.ValueCastNeverTypeError = l6;

  class gW extends q1.TypeBoxError {
    constructor($) {
      super("Cannot cast recursive schemas");
      this.schema = $;
    }
  }
  dW.ValueCastRecursiveTypeError = gW;

  class t6 extends q1.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  dW.ValueCastUnknownTypeError = t6;
  var n6;
  (function($) {
    function W(Z, Q, J) {
      if (Z[q1.Kind] === "Object" && typeof J === "object" && !(0, D1.IsNull)(J)) {
        const z = Z, A = Object.getOwnPropertyNames(J), w = Object.entries(z.properties), [F, S] = [1 / w.length, w.length];
        return w.reduce((R, [j, M]) => {
          const P = M[q1.Kind] === "Literal" && M.const === J[j] ? S : 0, O = (0, v0.Check)(M, Q, J[j]) ? F : 0, U = A.includes(j) ? F : 0;
          return R + (P + O + U);
        }, 0);
      } else
        return (0, v0.Check)(Z, Q, J) ? 1 : 0;
    }
    function Y(Z, Q, J) {
      let [z, A] = [Z.anyOf[0], 0];
      for (let w of Z.anyOf) {
        const F = W(w, Q, J);
        if (F > A)
          z = w, A = F;
      }
      return z;
    }
    function X(Z, Q, J) {
      if ("default" in Z)
        return Z.default;
      else {
        const z = Y(Z, Q, J);
        return TW(z, Q, J);
      }
    }
    $.Create = X;
  })(n6 || (n6 = {}));
  dW.DefaultClone = fW;
  dW.Default = o6;
  dW.Cast = TW;
});
var oW = Q0((hW) => {
  var k$ = function($) {
    return (0, Y0.IsString)($) && !isNaN($) && !isNaN(parseFloat($));
  }, lJ = function($) {
    return (0, Y0.IsBigInt)($) || (0, Y0.IsBoolean)($) || (0, Y0.IsNumber)($);
  }, z$ = function($) {
    return $ === true || (0, Y0.IsNumber)($) && $ === 1 || (0, Y0.IsBigInt)($) && $ === BigInt("1") || (0, Y0.IsString)($) && ($.toLowerCase() === "true" || $ === "1");
  }, H$ = function($) {
    return $ === false || (0, Y0.IsNumber)($) && ($ === 0 || Object.is($, -0)) || (0, Y0.IsBigInt)($) && $ === BigInt("0") || (0, Y0.IsString)($) && ($.toLowerCase() === "false" || $ === "0" || $ === "-0");
  }, tJ = function($) {
    return (0, Y0.IsString)($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
  }, sJ = function($) {
    return (0, Y0.IsString)($) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
  }, rJ = function($) {
    return (0, Y0.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test($);
  }, aJ = function($) {
    return (0, Y0.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test($);
  }, eJ = function($) {
    return (0, Y0.IsString)($) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test($);
  }, $9 = function($, W) {
    const Y = mW($);
    return Y === W ? Y : $;
  }, W9 = function($, W) {
    const Y = uW($);
    return Y === W ? Y : $;
  }, Y9 = function($, W) {
    const Y = iW($);
    return Y === W ? Y : $;
  }, X9 = function($, W) {
    if (typeof $.const === "string")
      return $9(W, $.const);
    else if (typeof $.const === "number")
      return W9(W, $.const);
    else if (typeof $.const === "boolean")
      return Y9(W, $.const);
    else
      return (0, oJ.Clone)(W);
  }, iW = function($) {
    return z$($) ? true : H$($) ? false : $;
  }, Z9 = function($) {
    return k$($) ? BigInt(parseInt($)) : (0, Y0.IsNumber)($) ? BigInt($ | 0) : H$($) ? BigInt(0) : z$($) ? BigInt(1) : $;
  }, mW = function($) {
    return lJ($) ? $.toString() : (0, Y0.IsSymbol)($) && $.description !== undefined ? $.description.toString() : $;
  }, uW = function($) {
    return k$($) ? parseFloat($) : z$($) ? 1 : H$($) ? 0 : $;
  }, Q9 = function($) {
    return k$($) ? parseInt($) : (0, Y0.IsNumber)($) ? $ | 0 : z$($) ? 1 : H$($) ? 0 : $;
  }, J9 = function($) {
    return (0, Y0.IsString)($) && $.toLowerCase() === "null" ? null : $;
  }, z9 = function($) {
    return (0, Y0.IsString)($) && $ === "undefined" ? undefined : $;
  }, H9 = function($) {
    return (0, Y0.IsDate)($) ? $ : (0, Y0.IsNumber)($) ? new Date($) : z$($) ? new Date(1) : H$($) ? new Date(0) : k$($) ? new Date(parseInt($)) : sJ($) ? new Date(`1970-01-01T${$}.000Z`) : tJ($) ? new Date(`1970-01-01T${$}`) : aJ($) ? new Date(`${$}.000Z`) : rJ($) ? new Date($) : eJ($) ? new Date(`${$}T00:00:00.000Z`) : $;
  }, s6 = function($) {
    return $;
  }, q9 = function($, W, Y) {
    if ((0, Y0.IsArray)(Y))
      return Y.map((X) => n0($.items, W, X));
    return Y;
  }, N9 = function($, W, Y) {
    return Z9(Y);
  }, M9 = function($, W, Y) {
    return iW(Y);
  }, U9 = function($, W, Y) {
    return H9(Y);
  }, A9 = function($, W, Y) {
    return Q9(Y);
  }, B9 = function($, W, Y) {
    return $.allOf.every((X) => h1.TypeGuard.TObject(X)) ? n0(h1.Type.Composite($.allOf), W, Y) : n0($.allOf[0], W, Y);
  }, F9 = function($, W, Y) {
    return X9($, Y);
  }, w9 = function($, W, Y) {
    return J9(Y);
  }, D9 = function($, W, Y) {
    return uW(Y);
  }, j9 = function($, W, Y) {
    if ((0, Y0.IsObject)(Y))
      return Object.getOwnPropertyNames($.properties).reduce((X, Z) => {
        return Y[Z] !== undefined ? { ...X, [Z]: n0($.properties[Z], W, Y[Z]) } : { ...X };
      }, Y);
    return Y;
  }, K9 = function($, W, Y) {
    const X = Object.getOwnPropertyNames($.patternProperties)[0], Z = $.patternProperties[X], Q = {};
    for (let [J, z] of Object.entries(Y))
      Q[J] = n0(Z, W, z);
    return Q;
  }, P9 = function($, W, Y) {
    return n0((0, pW.Deref)($, W), W, Y);
  }, O9 = function($, W, Y) {
    return mW(Y);
  }, S9 = function($, W, Y) {
    return (0, Y0.IsString)(Y) || (0, Y0.IsNumber)(Y) ? Symbol(Y) : Y;
  }, L9 = function($, W, Y) {
    return n0((0, pW.Deref)($, W), W, Y);
  }, C9 = function($, W, Y) {
    if ((0, Y0.IsArray)(Y) && !(0, Y0.IsUndefined)($.items))
      return Y.map((X, Z) => {
        return Z < $.items.length ? n0($.items[Z], W, X) : X;
      });
    return Y;
  }, I9 = function($, W, Y) {
    return z9(Y);
  }, R9 = function($, W, Y) {
    for (let X of $.anyOf) {
      const Z = n0(X, W, Y);
      if ((0, cJ.Check)(X, W, Z))
        return Z;
    }
    return Y;
  }, n0 = function($, W, Y) {
    const X = (0, Y0.IsString)($.$id) ? [...W, $] : W, Z = $;
    switch ($[h1.Kind]) {
      case "Array":
        return q9(Z, X, Y);
      case "BigInt":
        return N9(Z, X, Y);
      case "Boolean":
        return M9(Z, X, Y);
      case "Date":
        return U9(Z, X, Y);
      case "Integer":
        return A9(Z, X, Y);
      case "Intersect":
        return B9(Z, X, Y);
      case "Literal":
        return F9(Z, X, Y);
      case "Null":
        return w9(Z, X, Y);
      case "Number":
        return D9(Z, X, Y);
      case "Object":
        return j9(Z, X, Y);
      case "Record":
        return K9(Z, X, Y);
      case "Ref":
        return P9(Z, X, Y);
      case "String":
        return O9(Z, X, Y);
      case "Symbol":
        return S9(Z, X, Y);
      case "This":
        return L9(Z, X, Y);
      case "Tuple":
        return C9(Z, X, Y);
      case "Undefined":
        return I9(Z, X, Y);
      case "Union":
        return R9(Z, X, Y);
      case "Any":
      case "AsyncIterator":
      case "Constructor":
      case "Function":
      case "Iterator":
      case "Never":
      case "Promise":
      case "TemplateLiteral":
      case "Uint8Array":
      case "Unknown":
      case "Void":
        return s6(Y);
      default:
        if (!h1.TypeRegistry.Has(Z[h1.Kind]))
          throw new r6(Z);
        return s6(Y);
    }
  }, b9 = function(...$) {
    return $.length === 3 ? n0($[0], $[1], $[2]) : n0($[0], [], $[1]);
  };
  Object.defineProperty(hW, "__esModule", { value: true });
  hW.Convert = hW.Default = hW.ValueConvertUnknownTypeError = undefined;
  var Y0 = E0(), oJ = i1(), cJ = J$(), pW = w1(), h1 = x0();

  class r6 extends h1.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  hW.ValueConvertUnknownTypeError = r6;
  hW.Default = s6;
  hW.Convert = b9;
});
var $8 = Q0((aW) => {
  Object.defineProperty(aW, "__esModule", { value: true });
  aW.EncodeTransform = aW.DecodeTransform = aW.HasTransform = aW.TransformEncodeError = aW.TransformDecodeError = aW.TransformEncodeCheckError = aW.TransformDecodeCheckError = aW.TransformUnknownTypeError = undefined;
  var o0 = E0(), n1 = w1(), n = x0();

  class q$ extends n.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  aW.TransformUnknownTypeError = q$;

  class sW extends n.TypeBoxError {
    constructor($, W, Y) {
      super("Unable to decode due to invalid value");
      this.schema = $, this.value = W, this.error = Y;
    }
  }
  aW.TransformDecodeCheckError = sW;

  class rW extends n.TypeBoxError {
    constructor($, W, Y) {
      super("Unable to encode due to invalid value");
      this.schema = $, this.value = W, this.error = Y;
    }
  }
  aW.TransformEncodeCheckError = rW;

  class a6 extends n.TypeBoxError {
    constructor($, W, Y) {
      super(`${Y instanceof Error ? Y.message : "Unknown error"}`);
      this.schema = $, this.value = W;
    }
  }
  aW.TransformDecodeError = a6;

  class e6 extends n.TypeBoxError {
    constructor($, W, Y) {
      super(`${Y instanceof Error ? Y.message : "Unknown error"}`);
      this.schema = $, this.value = W;
    }
  }
  aW.TransformEncodeError = e6;
  var cW;
  (function($) {
    function W(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.items, I);
    }
    function Y(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.items, I);
    }
    function X(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.returns, I) || D.parameters.some((G) => P(G, I));
    }
    function Z(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.returns, I) || D.parameters.some((G) => P(G, I));
    }
    function Q(D, I) {
      return n.TypeGuard.TTransform(D) || n.TypeGuard.TTransform(D.unevaluatedProperties) || D.allOf.some((G) => P(G, I));
    }
    function J(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.items, I);
    }
    function z(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.not, I);
    }
    function A(D, I) {
      return n.TypeGuard.TTransform(D) || Object.values(D.properties).some((G) => P(G, I)) || n.TypeGuard.TSchema(D.additionalProperties) && P(D.additionalProperties, I);
    }
    function w(D, I) {
      return n.TypeGuard.TTransform(D) || P(D.item, I);
    }
    function F(D, I) {
      const G = Object.getOwnPropertyNames(D.patternProperties)[0], k = D.patternProperties[G];
      return n.TypeGuard.TTransform(D) || P(k, I) || n.TypeGuard.TSchema(D.additionalProperties) && n.TypeGuard.TTransform(D.additionalProperties);
    }
    function S(D, I) {
      if (n.TypeGuard.TTransform(D))
        return true;
      return P((0, n1.Deref)(D, I), I);
    }
    function R(D, I) {
      if (n.TypeGuard.TTransform(D))
        return true;
      return P((0, n1.Deref)(D, I), I);
    }
    function j(D, I) {
      return n.TypeGuard.TTransform(D) || n.TypeGuard.TSchema(D.items) && D.items.some((G) => P(G, I));
    }
    function M(D, I) {
      return n.TypeGuard.TTransform(D) || D.anyOf.some((G) => P(G, I));
    }
    function P(D, I) {
      const G = (0, o0.IsString)(D.$id) ? [...I, D] : I, k = D;
      if (D.$id && O.has(D.$id))
        return false;
      if (D.$id)
        O.add(D.$id);
      switch (D[n.Kind]) {
        case "Array":
          return W(k, G);
        case "AsyncIterator":
          return Y(k, G);
        case "Constructor":
          return X(k, G);
        case "Function":
          return Z(k, G);
        case "Intersect":
          return Q(k, G);
        case "Iterator":
          return J(k, G);
        case "Not":
          return z(k, G);
        case "Object":
          return A(k, G);
        case "Promise":
          return w(k, G);
        case "Record":
          return F(k, G);
        case "Ref":
          return S(k, G);
        case "This":
          return R(k, G);
        case "Tuple":
          return j(k, G);
        case "Union":
          return M(k, G);
        case "Any":
        case "BigInt":
        case "Boolean":
        case "Date":
        case "Integer":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "String":
        case "Symbol":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return n.TypeGuard.TTransform(D);
        default:
          if (!n.TypeRegistry.Has(k[n.Kind]))
            throw new q$(k);
          return n.TypeGuard.TTransform(D);
      }
    }
    const O = new Set;
    function U(D, I) {
      return O.clear(), P(D, I);
    }
    $.Has = U;
  })(cW || (aW.HasTransform = cW = {}));
  var lW;
  (function($) {
    function W(M, P) {
      try {
        return n.TypeGuard.TTransform(M) ? M[n.Transform].Decode(P) : P;
      } catch (O) {
        throw new a6(M, P, O);
      }
    }
    function Y(M, P, O) {
      const U = O.map((D) => S(M.items, P, D));
      return W(M, U);
    }
    function X(M, P, O) {
      if (!(0, o0.IsPlainObject)(O) || (0, o0.IsValueType)(O))
        return W(M, O);
      const U = n.KeyResolver.ResolveKeys(M, { includePatterns: false }), D = Object.entries(O).reduce((G, [k, _]) => {
        return !U.includes(k) ? { ...G, [k]: _ } : { ...G, [k]: W(n.IndexedAccessor.Resolve(M, [k]), _) };
      }, {});
      if (!n.TypeGuard.TTransform(M.unevaluatedProperties))
        return W(M, D);
      const I = Object.entries(D).reduce((G, [k, _]) => {
        return U.includes(k) ? { ...G, [k]: _ } : { ...G, [k]: W(M.unevaluatedProperties, _) };
      }, {});
      return W(M, I);
    }
    function Z(M, P, O) {
      const U = S(M.not, P, O);
      return W(M, U);
    }
    function Q(M, P, O) {
      if (!(0, o0.IsPlainObject)(O))
        return W(M, O);
      const U = Object.entries(O).reduce((G, [k, _]) => {
        return !(k in M.properties) ? { ...G, [k]: _ } : { ...G, [k]: S(M.properties[k], P, _) };
      }, {});
      if (!n.TypeGuard.TSchema(M.additionalProperties))
        return W(M, U);
      const D = M.additionalProperties, I = Object.entries(U).reduce((G, [k, _]) => {
        return k in M.properties ? { ...G, [k]: _ } : { ...G, [k]: S(D, P, _) };
      }, {});
      return W(M, I);
    }
    function J(M, P, O) {
      if (!(0, o0.IsPlainObject)(O))
        return W(M, O);
      const U = Object.getOwnPropertyNames(M.patternProperties)[0], D = M.patternProperties[U], I = new RegExp(U), G = Object.entries(O).reduce((X0, [e, N0]) => {
        return !I.test(e) ? { ...X0, [e]: N0 } : { ...X0, [e]: S(D, P, N0) };
      }, {});
      if (!n.TypeGuard.TSchema(M.additionalProperties))
        return W(M, G);
      const k = M.additionalProperties, _ = Object.entries(G).reduce((X0, [e, N0]) => {
        return I.test(e) ? { ...X0, [e]: N0 } : { ...X0, [e]: S(k, P, N0) };
      }, {});
      return W(M, _);
    }
    function z(M, P, O) {
      const U = (0, n1.Deref)(M, P), D = S(U, P, O);
      return W(M, D);
    }
    function A(M, P, O) {
      const U = (0, n1.Deref)(M, P), D = S(U, P, O);
      return W(M, D);
    }
    function w(M, P, O) {
      const U = (0, o0.IsArray)(M.items) ? M.items.map((D, I) => S(D, P, O[I])) : [];
      return W(M, U);
    }
    function F(M, P, O) {
      const U = W(M, O);
      for (let D of M.anyOf) {
        if (!R(D, P, U))
          continue;
        return S(D, P, U);
      }
      return U;
    }
    function S(M, P, O) {
      const U = typeof M.$id === "string" ? [...P, M] : P, D = M;
      switch (M[n.Kind]) {
        case "Array":
          return Y(D, U, O);
        case "Intersect":
          return X(D, U, O);
        case "Not":
          return Z(D, U, O);
        case "Object":
          return Q(D, U, O);
        case "Record":
          return J(D, U, O);
        case "Ref":
          return z(D, U, O);
        case "Symbol":
          return W(D, O);
        case "This":
          return A(D, U, O);
        case "Tuple":
          return w(D, U, O);
        case "Union":
          return F(D, U, O);
        case "Any":
        case "AsyncIterator":
        case "BigInt":
        case "Boolean":
        case "Constructor":
        case "Date":
        case "Function":
        case "Integer":
        case "Iterator":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "Promise":
        case "String":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return W(D, O);
        default:
          if (!n.TypeRegistry.Has(D[n.Kind]))
            throw new q$(D);
          return W(D, O);
      }
    }
    let R = () => false;
    function j(M, P, O, U) {
      return R = U, S(M, P, O);
    }
    $.Decode = j;
  })(lW || (aW.DecodeTransform = lW = {}));
  var tW;
  (function($) {
    function W(M, P) {
      try {
        return n.TypeGuard.TTransform(M) ? M[n.Transform].Encode(P) : P;
      } catch (O) {
        throw new e6(M, P, O);
      }
    }
    function Y(M, P, O) {
      return W(M, O).map((D) => S(M.items, P, D));
    }
    function X(M, P, O) {
      const U = W(M, O);
      if (!(0, o0.IsPlainObject)(O) || (0, o0.IsValueType)(O))
        return U;
      const D = n.KeyResolver.ResolveKeys(M, { includePatterns: false }), I = Object.entries(U).reduce((G, [k, _]) => {
        return !D.includes(k) ? { ...G, [k]: _ } : { ...G, [k]: W(n.IndexedAccessor.Resolve(M, [k]), _) };
      }, {});
      if (!n.TypeGuard.TTransform(M.unevaluatedProperties))
        return W(M, I);
      return Object.entries(I).reduce((G, [k, _]) => {
        return D.includes(k) ? { ...G, [k]: _ } : { ...G, [k]: W(M.unevaluatedProperties, _) };
      }, {});
    }
    function Z(M, P, O) {
      const U = W(M, O);
      return W(M.not, U);
    }
    function Q(M, P, O) {
      const U = W(M, O);
      if (!(0, o0.IsPlainObject)(O))
        return U;
      const D = Object.entries(U).reduce((G, [k, _]) => {
        return !(k in M.properties) ? { ...G, [k]: _ } : { ...G, [k]: S(M.properties[k], P, _) };
      }, {});
      if (!n.TypeGuard.TSchema(M.additionalProperties))
        return D;
      const I = M.additionalProperties;
      return Object.entries(D).reduce((G, [k, _]) => {
        return k in M.properties ? { ...G, [k]: _ } : { ...G, [k]: S(I, P, _) };
      }, {});
    }
    function J(M, P, O) {
      const U = W(M, O);
      if (!(0, o0.IsPlainObject)(O))
        return U;
      const D = Object.getOwnPropertyNames(M.patternProperties)[0], I = M.patternProperties[D], G = new RegExp(D), k = Object.entries(U).reduce((X0, [e, N0]) => {
        return !G.test(e) ? { ...X0, [e]: N0 } : { ...X0, [e]: S(I, P, N0) };
      }, {});
      if (!n.TypeGuard.TSchema(M.additionalProperties))
        return W(M, k);
      const _ = M.additionalProperties;
      return Object.entries(k).reduce((X0, [e, N0]) => {
        return G.test(e) ? { ...X0, [e]: N0 } : { ...X0, [e]: S(_, P, N0) };
      }, {});
    }
    function z(M, P, O) {
      const U = (0, n1.Deref)(M, P), D = S(U, P, O);
      return W(M, D);
    }
    function A(M, P, O) {
      const U = (0, n1.Deref)(M, P), D = S(U, P, O);
      return W(M, D);
    }
    function w(M, P, O) {
      const U = W(M, O);
      return (0, o0.IsArray)(M.items) ? M.items.map((D, I) => S(D, P, U[I])) : [];
    }
    function F(M, P, O) {
      for (let U of M.anyOf) {
        if (!R(U, P, O))
          continue;
        const D = S(U, P, O);
        return W(M, D);
      }
      return W(M, O);
    }
    function S(M, P, O) {
      const U = typeof M.$id === "string" ? [...P, M] : P, D = M;
      switch (M[n.Kind]) {
        case "Array":
          return Y(D, U, O);
        case "Intersect":
          return X(D, U, O);
        case "Not":
          return Z(D, U, O);
        case "Object":
          return Q(D, U, O);
        case "Record":
          return J(D, U, O);
        case "Ref":
          return z(D, U, O);
        case "This":
          return A(D, U, O);
        case "Tuple":
          return w(D, U, O);
        case "Union":
          return F(D, U, O);
        case "Any":
        case "AsyncIterator":
        case "BigInt":
        case "Boolean":
        case "Constructor":
        case "Date":
        case "Function":
        case "Integer":
        case "Iterator":
        case "Literal":
        case "Never":
        case "Null":
        case "Number":
        case "Promise":
        case "String":
        case "Symbol":
        case "TemplateLiteral":
        case "Undefined":
        case "Uint8Array":
        case "Unknown":
        case "Void":
          return W(D, O);
        default:
          if (!n.TypeRegistry.Has(D[n.Kind]))
            throw new q$(D);
          return W(D, O);
      }
    }
    let R = () => false;
    function j(M, P, O, U) {
      return R = U, S(M, P, O);
    }
    $.Encode = j;
  })(tW || (aW.EncodeTransform = tW = {}));
});
var HY = Q0((JY) => {
  Object.defineProperty(JY, "__esModule", { value: true });
  JY.Value = undefined;
  var $Y = b$(), d9 = OW(), y9 = Y$(), v9 = CW(), WY = vW(), p9 = i1(), YY = oW(), XY = h6(), g$ = J$(), ZY = x6(), f$ = $8(), QY;
  (function($) {
    function W(...M) {
      return WY.Cast.apply(WY, M);
    }
    $.Cast = W;
    function Y(...M) {
      return XY.Create.apply(XY, M);
    }
    $.Create = Y;
    function X(...M) {
      return g$.Check.apply(g$, M);
    }
    $.Check = X;
    function Z(...M) {
      return YY.Convert.apply(YY, M);
    }
    $.Convert = Z;
    function Q(M) {
      return p9.Clone(M);
    }
    $.Clone = Q;
    function J(...M) {
      const [P, O, U] = M.length === 3 ? [M[0], M[1], M[2]] : [M[0], [], M[1]];
      if (!X(P, O, U))
        throw new f$.TransformDecodeCheckError(P, U, A(P, O, U).First());
      return f$.DecodeTransform.Decode(P, O, U, g$.Check);
    }
    $.Decode = J;
    function z(...M) {
      const [P, O, U] = M.length === 3 ? [M[0], M[1], M[2]] : [M[0], [], M[1]], D = f$.EncodeTransform.Encode(P, O, U, g$.Check);
      if (!X(P, O, D))
        throw new f$.TransformEncodeCheckError(P, U, A(P, O, U).First());
      return D;
    }
    $.Encode = z;
    function A(...M) {
      return $Y.Errors.apply($Y, M);
    }
    $.Errors = A;
    function w(M, P) {
      return v9.Equal(M, P);
    }
    $.Equal = w;
    function F(M, P) {
      return ZY.Diff(M, P);
    }
    $.Diff = F;
    function S(M) {
      return y9.Hash(M);
    }
    $.Hash = S;
    function R(M, P) {
      return ZY.Patch(M, P);
    }
    $.Patch = R;
    function j(M, P) {
      d9.Mutate(M, P);
    }
    $.Mutate = j;
  })(QY || (JY.Value = QY = {}));
});
var W8 = Q0((W1) => {
  Object.defineProperty(W1, "__esModule", { value: true });
  W1.Value = W1.ValuePointer = W1.Delete = W1.Update = W1.Insert = W1.Edit = W1.ValueErrorIterator = W1.ValueErrorType = undefined;
  var qY = b$();
  Object.defineProperty(W1, "ValueErrorType", { enumerable: true, get: function() {
    return qY.ValueErrorType;
  } });
  Object.defineProperty(W1, "ValueErrorIterator", { enumerable: true, get: function() {
    return qY.ValueErrorIterator;
  } });
  var T$ = x6();
  Object.defineProperty(W1, "Edit", { enumerable: true, get: function() {
    return T$.Edit;
  } });
  Object.defineProperty(W1, "Insert", { enumerable: true, get: function() {
    return T$.Insert;
  } });
  Object.defineProperty(W1, "Update", { enumerable: true, get: function() {
    return T$.Update;
  } });
  Object.defineProperty(W1, "Delete", { enumerable: true, get: function() {
    return T$.Delete;
  } });
  var i9 = G$();
  Object.defineProperty(W1, "ValuePointer", { enumerable: true, get: function() {
    return i9.ValuePointer;
  } });
  var m9 = HY();
  Object.defineProperty(W1, "Value", { enumerable: true, get: function() {
    return m9.Value;
  } });
});
var FY = Q0((AY) => {
  Object.defineProperty(AY, "__esModule", { value: true });
  AY.TypeCompiler = AY.Policy = AY.TypeCompilerTypeGuardError = AY.TypeCompilerUnknownTypeError = AY.TypeCheck = undefined;
  var U$ = $8(), o = E0(), r9 = W$(), A$ = x$(), a9 = w1(), e9 = Y$(), U0 = x0();

  class J8 {
    constructor($, W, Y, X) {
      this.schema = $, this.references = W, this.checkFunc = Y, this.code = X, this.hasTransform = U$.HasTransform.Has($, W);
    }
    Code() {
      return this.code;
    }
    Errors($) {
      return (0, r9.Errors)(this.schema, this.references, $);
    }
    Check($) {
      return this.checkFunc($);
    }
    Decode($) {
      if (!this.checkFunc($))
        throw new U$.TransformDecodeCheckError(this.schema, $, this.Errors($).First());
      return this.hasTransform ? U$.DecodeTransform.Decode(this.schema, this.references, $, (W, Y, X) => this.Check(X)) : $;
    }
    Encode($) {
      const W = this.hasTransform ? U$.EncodeTransform.Encode(this.schema, this.references, $, (Y, X, Z) => this.Check(Z)) : $;
      if (!this.checkFunc(W))
        throw new U$.TransformEncodeCheckError(this.schema, $, this.Errors($).First());
      return W;
    }
  }
  AY.TypeCheck = J8;
  var M1;
  (function($) {
    function W(Q) {
      return Q === 36;
    }
    $.DollarSign = W;
    function Y(Q) {
      return Q === 95;
    }
    $.IsUnderscore = Y;
    function X(Q) {
      return Q >= 65 && Q <= 90 || Q >= 97 && Q <= 122;
    }
    $.IsAlpha = X;
    function Z(Q) {
      return Q >= 48 && Q <= 57;
    }
    $.IsNumeric = Z;
  })(M1 || (M1 = {}));
  var i$;
  (function($) {
    function W(Q) {
      if (Q.length === 0)
        return false;
      return M1.IsNumeric(Q.charCodeAt(0));
    }
    function Y(Q) {
      if (W(Q))
        return false;
      for (let J = 0;J < Q.length; J++) {
        const z = Q.charCodeAt(J);
        if (!(M1.IsAlpha(z) || M1.IsNumeric(z) || M1.DollarSign(z) || M1.IsUnderscore(z)))
          return false;
      }
      return true;
    }
    function X(Q) {
      return Q.replace(/'/g, "\\'");
    }
    function Z(Q, J) {
      return Y(J) ? `${Q}.${J}` : `${Q}['${X(J)}']`;
    }
    $.Encode = Z;
  })(i$ || (i$ = {}));
  var Z8;
  (function($) {
    function W(Y) {
      const X = [];
      for (let Z = 0;Z < Y.length; Z++) {
        const Q = Y.charCodeAt(Z);
        if (M1.IsNumeric(Q) || M1.IsAlpha(Q))
          X.push(Y.charAt(Z));
        else
          X.push(`_${Q}_`);
      }
      return X.join("").replace(/__/g, "_");
    }
    $.Encode = W;
  })(Z8 || (Z8 = {}));
  var Q8;
  (function($) {
    function W(Y) {
      return Y.replace(/'/g, "\\'");
    }
    $.Escape = W;
  })(Q8 || (Q8 = {}));

  class z8 extends U0.TypeBoxError {
    constructor($) {
      super("Unknown type");
      this.schema = $;
    }
  }
  AY.TypeCompilerUnknownTypeError = z8;

  class m$ extends U0.TypeBoxError {
    constructor($) {
      super("Preflight validation check failed to guard for the given schema");
      this.schema = $;
    }
  }
  AY.TypeCompilerTypeGuardError = m$;
  var C1;
  (function($) {
    function W(J, z, A) {
      return A$.TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${z}' in ${J} ? ${A} : true)` : `(${i$.Encode(J, z)} !== undefined ? ${A} : true)`;
    }
    $.IsExactOptionalProperty = W;
    function Y(J) {
      return !A$.TypeSystemPolicy.AllowArrayObject ? `(typeof ${J} === 'object' && ${J} !== null && !Array.isArray(${J}))` : `(typeof ${J} === 'object' && ${J} !== null)`;
    }
    $.IsObjectLike = Y;
    function X(J) {
      return !A$.TypeSystemPolicy.AllowArrayObject ? `(typeof ${J} === 'object' && ${J} !== null && !Array.isArray(${J}) && !(${J} instanceof Date) && !(${J} instanceof Uint8Array))` : `(typeof ${J} === 'object' && ${J} !== null && !(${J} instanceof Date) && !(${J} instanceof Uint8Array))`;
    }
    $.IsRecordLike = X;
    function Z(J) {
      return !A$.TypeSystemPolicy.AllowNaN ? `(typeof ${J} === 'number' && Number.isFinite(${J}))` : `typeof ${J} === 'number'`;
    }
    $.IsNumberLike = Z;
    function Q(J) {
      return A$.TypeSystemPolicy.AllowNullVoid ? `(${J} === undefined || ${J} === null)` : `${J} === undefined`;
    }
    $.IsVoidLike = Q;
  })(C1 || (AY.Policy = C1 = {}));
  var UY;
  (function($) {
    function W(K) {
      return K[U0.Kind] === "Any" || K[U0.Kind] === "Unknown";
    }
    function* Y(K, E, L) {
      yield "true";
    }
    function* X(K, E, L) {
      yield `Array.isArray(${L})`;
      const [p, T] = [F0("value", "any"), F0("acc", "number")];
      if ((0, o.IsNumber)(K.maxItems))
        yield `${L}.length <= ${K.maxItems}`;
      if ((0, o.IsNumber)(K.minItems))
        yield `${L}.length >= ${K.minItems}`;
      const d = f(K.items, E, "value");
      if (yield `${L}.every((${p}) => ${d})`, U0.TypeGuard.TSchema(K.contains) || (0, o.IsNumber)(K.minContains) || (0, o.IsNumber)(K.maxContains)) {
        const $0 = U0.TypeGuard.TSchema(K.contains) ? K.contains : U0.Type.Never(), K0 = f($0, E, "value"), W0 = (0, o.IsNumber)(K.minContains) ? [`(count >= ${K.minContains})`] : [], N = (0, o.IsNumber)(K.maxContains) ? [`(count <= ${K.maxContains})`] : [], c = `const count = value.reduce((${T}, ${p}) => ${K0} ? acc + 1 : acc, 0)`, O0 = ["(count > 0)", ...W0, ...N].join(" && ");
        yield `((${p}) => { ${c}; return ${O0}})(${L})`;
      }
      if (K.uniqueItems === true)
        yield `((${p}) => { const set = new Set(); for(const element of value) { const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true } )(${L})`;
    }
    function* Z(K, E, L) {
      yield `(typeof value === 'object' && Symbol.asyncIterator in ${L})`;
    }
    function* Q(K, E, L) {
      if (yield `(typeof ${L} === 'bigint')`, (0, o.IsBigInt)(K.exclusiveMaximum))
        yield `${L} < BigInt(${K.exclusiveMaximum})`;
      if ((0, o.IsBigInt)(K.exclusiveMinimum))
        yield `${L} > BigInt(${K.exclusiveMinimum})`;
      if ((0, o.IsBigInt)(K.maximum))
        yield `${L} <= BigInt(${K.maximum})`;
      if ((0, o.IsBigInt)(K.minimum))
        yield `${L} >= BigInt(${K.minimum})`;
      if ((0, o.IsBigInt)(K.multipleOf))
        yield `(${L} % BigInt(${K.multipleOf})) === 0`;
    }
    function* J(K, E, L) {
      yield `(typeof ${L} === 'boolean')`;
    }
    function* z(K, E, L) {
      yield* T0(K.returns, E, `${L}.prototype`);
    }
    function* A(K, E, L) {
      if (yield `(${L} instanceof Date) && Number.isFinite(${L}.getTime())`, (0, o.IsNumber)(K.exclusiveMaximumTimestamp))
        yield `${L}.getTime() < ${K.exclusiveMaximumTimestamp}`;
      if ((0, o.IsNumber)(K.exclusiveMinimumTimestamp))
        yield `${L}.getTime() > ${K.exclusiveMinimumTimestamp}`;
      if ((0, o.IsNumber)(K.maximumTimestamp))
        yield `${L}.getTime() <= ${K.maximumTimestamp}`;
      if ((0, o.IsNumber)(K.minimumTimestamp))
        yield `${L}.getTime() >= ${K.minimumTimestamp}`;
      if ((0, o.IsNumber)(K.multipleOfTimestamp))
        yield `(${L}.getTime() % ${K.multipleOfTimestamp}) === 0`;
    }
    function* w(K, E, L) {
      yield `(typeof ${L} === 'function')`;
    }
    function* F(K, E, L) {
      if (yield `(typeof ${L} === 'number' && Number.isInteger(${L}))`, (0, o.IsNumber)(K.exclusiveMaximum))
        yield `${L} < ${K.exclusiveMaximum}`;
      if ((0, o.IsNumber)(K.exclusiveMinimum))
        yield `${L} > ${K.exclusiveMinimum}`;
      if ((0, o.IsNumber)(K.maximum))
        yield `${L} <= ${K.maximum}`;
      if ((0, o.IsNumber)(K.minimum))
        yield `${L} >= ${K.minimum}`;
      if ((0, o.IsNumber)(K.multipleOf))
        yield `(${L} % ${K.multipleOf}) === 0`;
    }
    function* S(K, E, L) {
      const p = K.allOf.map((T) => f(T, E, L)).join(" && ");
      if (K.unevaluatedProperties === false) {
        const T = h(`${new RegExp(U0.KeyResolver.ResolvePattern(K))};`), d = `Object.getOwnPropertyNames(${L}).every(key => ${T}.test(key))`;
        yield `(${p} && ${d})`;
      } else if (U0.TypeGuard.TSchema(K.unevaluatedProperties)) {
        const T = h(`${new RegExp(U0.KeyResolver.ResolvePattern(K))};`), d = `Object.getOwnPropertyNames(${L}).every(key => ${T}.test(key) || ${f(K.unevaluatedProperties, E, `${L}[key]`)})`;
        yield `(${p} && ${d})`;
      } else
        yield `(${p})`;
    }
    function* R(K, E, L) {
      yield `(typeof value === 'object' && Symbol.iterator in ${L})`;
    }
    function* j(K, E, L) {
      if (typeof K.const === "number" || typeof K.const === "boolean")
        yield `(${L} === ${K.const})`;
      else
        yield `(${L} === '${Q8.Escape(K.const)}')`;
    }
    function* M(K, E, L) {
      yield "false";
    }
    function* P(K, E, L) {
      yield `(!${f(K.not, E, L)})`;
    }
    function* O(K, E, L) {
      yield `(${L} === null)`;
    }
    function* U(K, E, L) {
      if (yield C1.IsNumberLike(L), (0, o.IsNumber)(K.exclusiveMaximum))
        yield `${L} < ${K.exclusiveMaximum}`;
      if ((0, o.IsNumber)(K.exclusiveMinimum))
        yield `${L} > ${K.exclusiveMinimum}`;
      if ((0, o.IsNumber)(K.maximum))
        yield `${L} <= ${K.maximum}`;
      if ((0, o.IsNumber)(K.minimum))
        yield `${L} >= ${K.minimum}`;
      if ((0, o.IsNumber)(K.multipleOf))
        yield `(${L} % ${K.multipleOf}) === 0`;
    }
    function* D(K, E, L) {
      if (yield C1.IsObjectLike(L), (0, o.IsNumber)(K.minProperties))
        yield `Object.getOwnPropertyNames(${L}).length >= ${K.minProperties}`;
      if ((0, o.IsNumber)(K.maxProperties))
        yield `Object.getOwnPropertyNames(${L}).length <= ${K.maxProperties}`;
      const p = Object.getOwnPropertyNames(K.properties);
      for (let T of p) {
        const d = i$.Encode(L, T), $0 = K.properties[T];
        if (K.required && K.required.includes(T)) {
          if (yield* T0($0, E, d), U0.ExtendsUndefined.Check($0) || W($0))
            yield `('${T}' in ${L})`;
        } else {
          const K0 = f($0, E, d);
          yield C1.IsExactOptionalProperty(L, T, K0);
        }
      }
      if (K.additionalProperties === false)
        if (K.required && K.required.length === p.length)
          yield `Object.getOwnPropertyNames(${L}).length === ${p.length}`;
        else {
          const T = `[${p.map((d) => `'${d}'`).join(", ")}]`;
          yield `Object.getOwnPropertyNames(${L}).every(key => ${T}.includes(key))`;
        }
      if (typeof K.additionalProperties === "object") {
        const T = f(K.additionalProperties, E, `${L}[key]`), d = `[${p.map(($0) => `'${$0}'`).join(", ")}]`;
        yield `(Object.getOwnPropertyNames(${L}).every(key => ${d}.includes(key) || ${T}))`;
      }
    }
    function* I(K, E, L) {
      yield `(typeof value === 'object' && typeof ${L}.then === 'function')`;
    }
    function* G(K, E, L) {
      if (yield C1.IsRecordLike(L), (0, o.IsNumber)(K.minProperties))
        yield `Object.getOwnPropertyNames(${L}).length >= ${K.minProperties}`;
      if ((0, o.IsNumber)(K.maxProperties))
        yield `Object.getOwnPropertyNames(${L}).length <= ${K.maxProperties}`;
      const [p, T] = Object.entries(K.patternProperties)[0], d = h(`${new RegExp(p)}`), $0 = f(T, E, "value"), K0 = U0.TypeGuard.TSchema(K.additionalProperties) ? f(K.additionalProperties, E, L) : K.additionalProperties === false ? "false" : "true", W0 = `(${d}.test(key) ? ${$0} : ${K0})`;
      yield `(Object.entries(${L}).every(([key, value]) => ${W0}))`;
    }
    function* k(K, E, L) {
      const p = (0, a9.Deref)(K, E);
      if (b.functions.has(K.$ref))
        return yield `${i(K.$ref)}(${L})`;
      yield* T0(p, E, L);
    }
    function* _(K, E, L) {
      if (yield `(typeof ${L} === 'string')`, (0, o.IsNumber)(K.maxLength))
        yield `${L}.length <= ${K.maxLength}`;
      if ((0, o.IsNumber)(K.minLength))
        yield `${L}.length >= ${K.minLength}`;
      if (K.pattern !== undefined)
        yield `${h(`${new RegExp(K.pattern)};`)}.test(${L})`;
      if (K.format !== undefined)
        yield `format('${K.format}', ${L})`;
    }
    function* X0(K, E, L) {
      yield `(typeof ${L} === 'symbol')`;
    }
    function* e(K, E, L) {
      yield `(typeof ${L} === 'string')`, yield `${h(`${new RegExp(K.pattern)};`)}.test(${L})`;
    }
    function* N0(K, E, L) {
      yield `${i(K.$ref)}(${L})`;
    }
    function* _1(K, E, L) {
      if (yield `Array.isArray(${L})`, K.items === undefined)
        return yield `${L}.length === 0`;
      yield `(${L}.length === ${K.maxItems})`;
      for (let p = 0;p < K.items.length; p++)
        yield `${f(K.items[p], E, `${L}[${p}]`)}`;
    }
    function* p0(K, E, L) {
      yield `${L} === undefined`;
    }
    function* i0(K, E, L) {
      yield `(${K.anyOf.map((T) => f(T, E, L)).join(" || ")})`;
    }
    function* H0(K, E, L) {
      if (yield `${L} instanceof Uint8Array`, (0, o.IsNumber)(K.maxByteLength))
        yield `(${L}.length <= ${K.maxByteLength})`;
      if ((0, o.IsNumber)(K.minByteLength))
        yield `(${L}.length >= ${K.minByteLength})`;
    }
    function* J0(K, E, L) {
      yield "true";
    }
    function* m0(K, E, L) {
      yield C1.IsVoidLike(L);
    }
    function* r0(K, E, L) {
      const p = b.instances.size;
      b.instances.set(p, K), yield `kind('${K[U0.Kind]}', ${p}, ${L})`;
    }
    function* T0(K, E, L, p = true) {
      const T = (0, o.IsString)(K.$id) ? [...E, K] : E, d = K;
      if (p && (0, o.IsString)(K.$id)) {
        const $0 = i(K.$id);
        if (b.functions.has($0))
          return yield `${$0}(${L})`;
        else {
          const K0 = z0($0, K, E, "value", false);
          return b.functions.set($0, K0), yield `${$0}(${L})`;
        }
      }
      switch (d[U0.Kind]) {
        case "Any":
          return yield* Y(d, T, L);
        case "Array":
          return yield* X(d, T, L);
        case "AsyncIterator":
          return yield* Z(d, T, L);
        case "BigInt":
          return yield* Q(d, T, L);
        case "Boolean":
          return yield* J(d, T, L);
        case "Constructor":
          return yield* z(d, T, L);
        case "Date":
          return yield* A(d, T, L);
        case "Function":
          return yield* w(d, T, L);
        case "Integer":
          return yield* F(d, T, L);
        case "Intersect":
          return yield* S(d, T, L);
        case "Iterator":
          return yield* R(d, T, L);
        case "Literal":
          return yield* j(d, T, L);
        case "Never":
          return yield* M(d, T, L);
        case "Not":
          return yield* P(d, T, L);
        case "Null":
          return yield* O(d, T, L);
        case "Number":
          return yield* U(d, T, L);
        case "Object":
          return yield* D(d, T, L);
        case "Promise":
          return yield* I(d, T, L);
        case "Record":
          return yield* G(d, T, L);
        case "Ref":
          return yield* k(d, T, L);
        case "String":
          return yield* _(d, T, L);
        case "Symbol":
          return yield* X0(d, T, L);
        case "TemplateLiteral":
          return yield* e(d, T, L);
        case "This":
          return yield* N0(d, T, L);
        case "Tuple":
          return yield* _1(d, T, L);
        case "Undefined":
          return yield* p0(d, T, L);
        case "Union":
          return yield* i0(d, T, L);
        case "Uint8Array":
          return yield* H0(d, T, L);
        case "Unknown":
          return yield* J0(d, T, L);
        case "Void":
          return yield* m0(d, T, L);
        default:
          if (!U0.TypeRegistry.Has(d[U0.Kind]))
            throw new z8(K);
          return yield* r0(d, T, L);
      }
    }
    const b = { language: "javascript", functions: new Map, variables: new Map, instances: new Map };
    function f(K, E, L, p = true) {
      return `(${[...T0(K, E, L, p)].join(" && ")})`;
    }
    function i(K) {
      return `check_${Z8.Encode(K)}`;
    }
    function h(K) {
      const E = `local_${b.variables.size}`;
      return b.variables.set(E, `const ${E} = ${K}`), E;
    }
    function z0(K, E, L, p, T = true) {
      const [d, $0] = ["\n", (c) => "".padStart(c, " ")], K0 = F0("value", "any"), W0 = w0("boolean"), N = [...T0(E, L, p, T)].map((c) => `${$0(4)}${c}`).join(` &&${d}`);
      return `function ${K}(${K0})${W0} {${d}${$0(2)}return (${d}${N}${d}${$0(2)})\n}`;
    }
    function F0(K, E) {
      const L = b.language === "typescript" ? `: ${E}` : "";
      return `${K}${L}`;
    }
    function w0(K) {
      return b.language === "typescript" ? `: ${K}` : "";
    }
    function D0(K, E, L) {
      const p = z0("check", K, E, "value"), T = F0("value", "any"), d = w0("boolean"), $0 = [...b.functions.values()], K0 = [...b.variables.values()], W0 = (0, o.IsString)(K.$id) ? `return function check(${T})${d} {\n  return ${i(K.$id)}(value)\n}` : `return ${p}`;
      return [...K0, ...$0, W0].join("\n");
    }
    function q0(...K) {
      const E = { language: "javascript" }, [L, p, T] = K.length === 2 && (0, o.IsArray)(K[1]) ? [K[0], K[1], E] : K.length === 2 && !(0, o.IsArray)(K[1]) ? [K[0], [], K[1]] : K.length === 3 ? [K[0], K[1], K[2]] : K.length === 1 ? [K[0], [], E] : [null, [], E];
      if (b.language = T.language, b.variables.clear(), b.functions.clear(), b.instances.clear(), !U0.TypeGuard.TSchema(L))
        throw new m$(L);
      for (let d of p)
        if (!U0.TypeGuard.TSchema(d))
          throw new m$(d);
      return D0(L, p, T);
    }
    $.Code = q0;
    function B1(K, E = []) {
      const L = q0(K, E, { language: "javascript" }), p = globalThis.Function("kind", "format", "hash", L), T = new Map(b.instances);
      function d(N, c, O0) {
        if (!U0.TypeRegistry.Has(N) || !T.has(c))
          return false;
        const t$ = U0.TypeRegistry.Get(N), s$ = T.get(c);
        return t$(s$, O0);
      }
      function $0(N, c) {
        if (!U0.FormatRegistry.Has(N))
          return false;
        return U0.FormatRegistry.Get(N)(c);
      }
      function K0(N) {
        return (0, e9.Hash)(N);
      }
      const W0 = p(d, $0, K0);
      return new J8(K, E, W0, L);
    }
    $.Compile = B1;
  })(UY || (AY.TypeCompiler = UY = {}));
});
var DY = Q0((c0) => {
  var Z7 = c0 && c0.__createBinding || (Object.create ? function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    var Z = Object.getOwnPropertyDescriptor(W, Y);
    if (!Z || ("get" in Z ? !W.__esModule : Z.writable || Z.configurable))
      Z = { enumerable: true, get: function() {
        return W[Y];
      } };
    Object.defineProperty($, X, Z);
  } : function($, W, Y, X) {
    if (X === undefined)
      X = Y;
    $[X] = W[Y];
  }), Q7 = c0 && c0.__exportStar || function($, W) {
    for (var Y in $)
      if (Y !== "default" && !Object.prototype.hasOwnProperty.call(W, Y))
        Z7(W, $, Y);
  };
  Object.defineProperty(c0, "__esModule", { value: true });
  c0.ValueErrorIterator = c0.ValueErrorType = undefined;
  var wY = b$();
  Object.defineProperty(c0, "ValueErrorType", { enumerable: true, get: function() {
    return wY.ValueErrorType;
  } });
  Object.defineProperty(c0, "ValueErrorIterator", { enumerable: true, get: function() {
    return wY.ValueErrorIterator;
  } });
  Q7(FY(), c0);
});
var bY = Q0((Dz, RY) => {
  var H7 = function($) {
    var W = $.indexOf("%");
    if (W === -1)
      return $;
    var Y = $.length, X = "", Z = 0, Q = 0, J = W, z = CY;
    while (W > -1 && W < Y) {
      var A = IY($[W + 1], 4), w = IY($[W + 2], 0), F = A | w, S = F8[F];
      if (z = F8[256 + z + S], Q = Q << 6 | F & F8[364 + S], z === CY)
        X += $.slice(Z, J), X += Q <= 65535 ? String.fromCharCode(Q) : String.fromCharCode(55232 + (Q >> 10), 56320 + (Q & 1023)), Q = 0, Z = W + 3, W = J = $.indexOf("%", Z);
      else if (z === z7)
        return null;
      else {
        if (W += 3, W < Y && $.charCodeAt(W) === 37)
          continue;
        return null;
      }
    }
    return X + $.slice(Z);
  }, IY = function($, W) {
    var Y = q7[$];
    return Y === undefined ? 255 : Y << W;
  }, CY = 12, z7 = 0, F8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 7, 7, 10, 9, 9, 9, 11, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 24, 36, 48, 60, 72, 84, 96, 0, 12, 12, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 63, 63, 63, 0, 31, 15, 15, 15, 7, 7, 7], q7 = { "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
  RY.exports = H7;
});
var xY = Q0((jz, VY) => {
  var N7 = function($) {
    const W = new EY;
    if (typeof $ !== "string")
      return W;
    let Y = $.length, X = "", Z = "", Q = -1, J = -1, z = false, A = false, w = false, F = false, S = false, R = 0;
    for (let j = 0;j < Y + 1; j++)
      if (R = j !== Y ? $.charCodeAt(j) : 38, R === 38) {
        if (S = J > Q, !S)
          J = j;
        if (X = $.slice(Q + 1, J), S || X.length > 0) {
          if (w)
            X = X.replace(_Y, " ");
          if (z)
            X = GY(X) || X;
          if (S) {
            if (Z = $.slice(J + 1, j), F)
              Z = Z.replace(_Y, " ");
            if (A)
              Z = GY(Z) || Z;
          }
          const M = W[X];
          if (M === undefined)
            W[X] = Z;
          else if (M.pop)
            M.push(Z);
          else
            W[X] = [M, Z];
        }
        Z = "", Q = j, J = j, z = false, A = false, w = false, F = false;
      } else if (R === 61)
        if (J <= Q)
          J = j;
        else
          A = true;
      else if (R === 43)
        if (J > Q)
          F = true;
        else
          w = true;
      else if (R === 37)
        if (J > Q)
          A = true;
        else
          z = true;
    return W;
  }, GY = bY(), _Y = /\+/g, EY = function() {
  };
  EY.prototype = Object.create(null);
  VY.exports = N7;
});
var gY = Q0((Kz, kY) => {
  var U7 = function($) {
    const W = $.length;
    if (W === 0)
      return "";
    let Y = "", X = 0, Z = 0;
    $:
      for (;Z < W; Z++) {
        let Q = $.charCodeAt(Z);
        while (Q < 128) {
          if (M7[Q] !== 1) {
            if (X < Z)
              Y += $.slice(X, Z);
            X = Z + 1, Y += X1[Q];
          }
          if (++Z === W)
            break $;
          Q = $.charCodeAt(Z);
        }
        if (X < Z)
          Y += $.slice(X, Z);
        if (Q < 2048) {
          X = Z + 1, Y += X1[192 | Q >> 6] + X1[128 | Q & 63];
          continue;
        }
        if (Q < 55296 || Q >= 57344) {
          X = Z + 1, Y += X1[224 | Q >> 12] + X1[128 | Q >> 6 & 63] + X1[128 | Q & 63];
          continue;
        }
        if (++Z, Z >= W)
          throw new Error("URI malformed");
        const J = $.charCodeAt(Z) & 1023;
        X = Z + 1, Q = 65536 + ((Q & 1023) << 10 | J), Y += X1[240 | Q >> 18] + X1[128 | Q >> 12 & 63] + X1[128 | Q >> 6 & 63] + X1[128 | Q & 63];
      }
    if (X === 0)
      return $;
    if (X < W)
      return Y + $.slice(X);
    return Y;
  }, X1 = Array.from({ length: 256 }, ($, W) => "%" + ((W < 16 ? "0" : "") + W.toString(16)).toUpperCase()), M7 = new Int8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0]);
  kY.exports = { encodeString: U7 };
});
var dY = Q0((Pz, TY) => {
  var fY = function($) {
    const W = typeof $;
    if (W === "string")
      return w8($);
    else if (W === "bigint")
      return $.toString();
    else if (W === "boolean")
      return $ ? "true" : "false";
    else if (W === "number" && Number.isFinite($))
      return $ < 1000000000000000000000 ? "" + $ : w8("" + $);
    return "";
  }, A7 = function($) {
    let W = "";
    if ($ === null || typeof $ !== "object")
      return W;
    const Y = "&", X = Object.keys($), Z = X.length;
    let Q = 0;
    for (let J = 0;J < Z; J++) {
      const z = X[J], A = $[z], w = w8(z) + "=";
      if (J)
        W += Y;
      if (Array.isArray(A)) {
        Q = A.length;
        for (let F = 0;F < Q; F++) {
          if (F)
            W += Y;
          W += w, W += fY(A[F]);
        }
      } else
        W += w, W += fY(A);
    }
    return W;
  }, { encodeString: w8 } = gY();
  TY.exports = A7;
});
var D8 = Q0((Oz, w$) => {
  var yY = xY(), vY = dY(), pY = { parse: yY, stringify: vY };
  w$.exports = pY;
  w$.exports.default = pY;
  w$.exports.parse = yY;
  w$.exports.stringify = vY;
});
var E1 = ($, W) => ({ part: $, store: null, inert: W !== undefined ? new Map(W.map((Y) => [Y.part.charCodeAt(0), Y])) : null, params: null, wildcardStore: null });
var I8 = ($, W) => ({ ...$, part: W });
var R8 = ($) => ({ paramName: $, store: null, inert: null });

class K1 {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add($, W, Y) {
    let X;
    if (typeof W != "string")
      throw TypeError("Route path must be a string");
    W === "" ? W = "/" : W[0] !== "/" && (W = `/${W}`), this.history.push([$, W, Y]);
    let Z = W[W.length - 1] === "*";
    Z && (W = W.slice(0, -1));
    let Q = W.split(K1.regex.static), J = W.match(K1.regex.params) || [];
    Q[Q.length - 1] === "" && Q.pop(), X = this.root[$] ? this.root[$] : this.root[$] = E1("/");
    let z = 0;
    for (let A = 0;A < Q.length; ++A) {
      let w = Q[A];
      if (A > 0) {
        let F = J[z++].slice(1);
        if (X.params === null)
          X.params = R8(F);
        else if (X.params.paramName !== F)
          throw Error(`Cannot create route "${W}" with parameter "${F}" because a route already exists with a different parameter name ("${X.params.paramName}") in the same location`);
        let S = X.params;
        if (S.inert === null) {
          X = S.inert = E1(w);
          continue;
        }
        X = S.inert;
      }
      for (let F = 0;; ) {
        if (F === w.length) {
          if (F < X.part.length) {
            let S = I8(X, X.part.slice(F));
            Object.assign(X, E1(w, [S]));
          }
          break;
        }
        if (F === X.part.length) {
          if (X.inert === null)
            X.inert = new Map;
          else if (X.inert.has(w.charCodeAt(F))) {
            X = X.inert.get(w.charCodeAt(F)), w = w.slice(F), F = 0;
            continue;
          }
          let S = E1(w.slice(F));
          X.inert.set(w.charCodeAt(F), S), X = S;
          break;
        }
        if (w[F] !== X.part[F]) {
          let S = I8(X, X.part.slice(F)), R = E1(w.slice(F));
          Object.assign(X, E1(X.part.slice(0, F), [S, R])), X = R;
          break;
        }
        ++F;
      }
    }
    if (z < J.length) {
      let A = J[z], w = A.slice(1);
      if (X.params === null)
        X.params = R8(w);
      else if (X.params.paramName !== w)
        throw Error(`Cannot create route "${W}" with parameter "${w}" because a route already exists with a different parameter name ("${X.params.paramName}") in the same location`);
      return X.params.store === null && (X.params.store = Y), X.params.store;
    }
    return Z ? (X.wildcardStore === null && (X.wildcardStore = Y), X.wildcardStore) : (X.store === null && (X.store = Y), X.store);
  }
  find($, W) {
    let Y = this.root[$];
    return Y ? a$(W, W.length, Y, 0) : null;
  }
}
var a$ = ($, W, Y, X) => {
  let Z = Y?.part, Q = X + Z.length;
  if (Z.length > 1) {
    if (Q > W)
      return null;
    if (Z.length < 15) {
      for (let J = 1, z = X + 1;J < Z.length; ++J, ++z)
        if (Z.charCodeAt(J) !== $.charCodeAt(z))
          return null;
    } else if ($.substring(X, Q) !== Z)
      return null;
  }
  if (Q === W)
    return Y.store !== null ? { store: Y.store, params: {} } : Y.wildcardStore !== null ? { store: Y.wildcardStore, params: { "*": "" } } : null;
  if (Y.inert !== null) {
    let J = Y.inert.get($.charCodeAt(Q));
    if (J !== undefined) {
      let z = a$($, W, J, Q);
      if (z !== null)
        return z;
    }
  }
  if (Y.params !== null) {
    let J = Y.params, z = $.indexOf("/", Q);
    if (z !== Q) {
      if (z === -1 || z >= W) {
        if (J.store !== null) {
          let A = {};
          return A[J.paramName] = $.substring(Q, W), { store: J.store, params: A };
        }
      } else if (J.inert !== null) {
        let A = a$($, W, J.inert, z);
        if (A !== null)
          return A.params[J.paramName] = $.substring(Q, z), A;
      }
    }
  }
  return Y.wildcardStore !== null ? { store: Y.wildcardStore, params: { "*": $.substring(Q, W) } } : null;
};
var _8 = Z1(G8(), 1);
var E8 = _8.default;
var P$ = () => {
  let $;
  return [new Promise((Y) => {
    $ = Y;
  }), $];
};
var F1 = () => {
  const [$, W] = P$(), [Y, X] = P$(), Z = [], Q = [];
  return { signal: $, consume: (J) => {
    switch (J.type) {
      case "begin":
        if (J.unit && Z.length === 0)
          for (let z = 0;z < J.unit; z++) {
            const [A, w] = P$(), [F, S] = P$();
            Z.push(A), Q.push([(R) => {
              w({ children: [], end: F, name: R.name ?? "", skip: false, time: R.time });
            }, (R) => {
              S(R);
            }]);
          }
        W({ children: Z, end: Y, name: J.name ?? "", skip: false, time: J.time });
        break;
      case "end":
        X(J.time);
        break;
    }
  }, consumeChild(J) {
    switch (J.type) {
      case "begin":
        if (!Q[0])
          return;
        const [z] = Q[0];
        z({ children: [], end: Y, name: J.name ?? "", skip: false, time: J.time });
        break;
      case "end":
        const A = Q.shift();
        if (!A)
          return;
        A[1](J.time);
    }
  }, resolve() {
    W({ children: [], end: new Promise((J) => J(0)), name: "", skip: true, time: 0 });
    for (let [J, z] of Q)
      J({ children: [], end: new Promise((A) => A(0)), name: "", skip: true, time: 0 }), z(0);
    X(0);
  } };
};
var V8 = ($, W, Y) => {
  return async function X(X) {
    if (X.event !== "request" || X.type !== "begin")
      return;
    const Z = X.id, Q = $(), J = F1(), z = F1(), A = F1(), w = F1(), F = F1(), S = F1(), R = F1(), j = F1();
    J.consume(X);
    const M = (P) => {
      if (P.id === Z)
        switch (P.event) {
          case "request":
            J.consume(P);
            break;
          case "request.unit":
            J.consumeChild(P);
            break;
          case "parse":
            z.consume(P);
            break;
          case "parse.unit":
            z.consumeChild(P);
            break;
          case "transform":
            A.consume(P);
            break;
          case "transform.unit":
            A.consumeChild(P);
            break;
          case "beforeHandle":
            w.consume(P);
            break;
          case "beforeHandle.unit":
            w.consumeChild(P);
            break;
          case "handle":
            F.consume(P);
            break;
          case "afterHandle":
            S.consume(P);
            break;
          case "afterHandle.unit":
            S.consumeChild(P);
            break;
          case "error":
            R.consume(P);
            break;
          case "error.unit":
            R.consumeChild(P);
            break;
          case "response":
            if (P.type === "begin")
              J.resolve(), z.resolve(), A.resolve(), w.resolve(), F.resolve(), S.resolve(), R.resolve();
            else
              Q.off("event", M);
            j.consume(P);
            break;
          case "response.unit":
            j.consumeChild(P);
            break;
          case "exit":
            J.resolve(), z.resolve(), A.resolve(), w.resolve(), F.resolve(), S.resolve(), R.resolve();
            break;
        }
    };
    Q.on("event", M), await Y({ id: Z, context: X.ctx, set: X.ctx?.set, store: X.ctx?.store, time: X.time, request: J.signal, parse: z.signal, transform: A.signal, beforeHandle: w.signal, handle: F.signal, afterHandle: S.signal, error: R.signal, response: j.signal }), Q.emit(`res${Z}.${W}`, undefined);
  };
};
var Y8 = Z1(W8(), 1);
var NY = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var o1 = Symbol("ErrorCode");
var N$ = (NY?.NODE_ENV ?? NY?.ENV) === "production";

class d$ extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor($) {
    super($ ?? "INTERNAL_SERVER_ERROR");
  }
}

class L1 extends Error {
  code = "NOT_FOUND";
  status = 404;
  constructor($) {
    super($ ?? "NOT_FOUND");
  }
}
class M$ extends Error {
  $;
  code = "INVALID_COOKIE_SIGNATURE";
  status = 400;
  constructor($, W) {
    super(W ?? `"${$}" has invalid cookie signature`);
    this.key = $;
  }
}

class P0 extends Error {
  $;
  W;
  Y;
  code = "VALIDATION";
  status = 400;
  constructor($, W, Y) {
    const X = N$ ? undefined : W.Errors(Y).First(), Z = X?.schema.error ? typeof X.schema.error === "function" ? X.schema.error($, W, Y) : X.schema.error : undefined, Q = N$ ? Z ?? `Invalid ${$ ?? X?.schema.error ?? X?.message}` : Z ?? `Invalid ${$}, '${X?.path?.slice(1) || "type"}': ${X?.message}` + "\n\nExpected: " + JSON.stringify(Y8.Value.Create(W.schema), null, 2) + "\n\nFound: " + JSON.stringify(Y, null, 2);
    super(Q);
    this.type = $;
    this.validator = W;
    this.value = Y;
    Object.setPrototypeOf(this, P0.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  get model() {
    return Y8.Value.Create(this.validator.schema);
  }
  toResponse($) {
    return new Response(this.message, { status: 400, headers: $ });
  }
}
var X8 = { open($) {
  $.data.open?.($);
}, message($, W) {
  $.data.message?.($, W);
}, drain($) {
  $.data.drain?.($);
}, close($, W, Y) {
  $.data.close?.($, W, Y);
} };

class c1 {
  $;
  W;
  id;
  validator;
  constructor($, W) {
    this.raw = $;
    this.data = W;
    this.validator = $.data.validator, this.id = Date.now();
  }
  get publish() {
    return ($, W = undefined, Y) => {
      if (this.validator?.Check(W) === false)
        throw new P0("message", this.validator, W);
      if (typeof W === "object")
        W = JSON.stringify(W);
      return this.raw.publish($, W, Y), this;
    };
  }
  get send() {
    return ($) => {
      if (this.validator?.Check($) === false)
        throw new P0("message", this.validator, $);
      if (Buffer.isBuffer($))
        return this.raw.send($), this;
      if (typeof $ === "object")
        $ = JSON.stringify($);
      return this.raw.send($), this;
    };
  }
  get subscribe() {
    return ($) => {
      return this.raw.subscribe($), this;
    };
  }
  get unsubscribe() {
    return ($) => {
      return this.raw.unsubscribe($), this;
    };
  }
  get cork() {
    return ($) => {
      return this.raw.cork($), this;
    };
  }
  get close() {
    return () => {
      return this.raw.close(), this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
}
var n9 = function($, W) {
  if (typeof $ !== "string")
    throw new TypeError("argument str must be a string");
  var Y = {}, X = W || {}, Z = X.decode || c9, Q = 0;
  while (Q < $.length) {
    var J = $.indexOf("=", Q);
    if (J === -1)
      break;
    var z = $.indexOf(";", Q);
    if (z === -1)
      z = $.length;
    else if (z < J) {
      Q = $.lastIndexOf(";", J - 1) + 1;
      continue;
    }
    var A = $.slice(Q, J).trim();
    if (Y[A] === undefined) {
      var w = $.slice(J + 1, z).trim();
      if (w.charCodeAt(0) === 34)
        w = w.slice(1, -1);
      Y[A] = s9(w, Z);
    }
    Q = z + 1;
  }
  return Y;
};
var o9 = function($, W, Y) {
  var X = Y || {}, Z = X.encode || l9;
  if (typeof Z !== "function")
    throw new TypeError("option encode is invalid");
  if (!y$.test($))
    throw new TypeError("argument name is invalid");
  var Q = Z(W);
  if (Q && !y$.test(Q))
    throw new TypeError("argument val is invalid");
  var J = $ + "=" + Q;
  if (X.maxAge != null) {
    var z = X.maxAge - 0;
    if (isNaN(z) || !isFinite(z))
      throw new TypeError("option maxAge is invalid");
    J += "; Max-Age=" + Math.floor(z);
  }
  if (X.domain) {
    if (!y$.test(X.domain))
      throw new TypeError("option domain is invalid");
    J += "; Domain=" + X.domain;
  }
  if (X.path) {
    if (!y$.test(X.path))
      throw new TypeError("option path is invalid");
    J += "; Path=" + X.path;
  }
  if (X.expires) {
    var A = X.expires;
    if (!t9(A) || isNaN(A.valueOf()))
      throw new TypeError("option expires is invalid");
    J += "; Expires=" + A.toUTCString();
  }
  if (X.httpOnly)
    J += "; HttpOnly";
  if (X.secure)
    J += "; Secure";
  if (X.priority) {
    var w = typeof X.priority === "string" ? X.priority.toLowerCase() : X.priority;
    switch (w) {
      case "low":
        J += "; Priority=Low";
        break;
      case "medium":
        J += "; Priority=Medium";
        break;
      case "high":
        J += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (X.sameSite) {
    var F = typeof X.sameSite === "string" ? X.sameSite.toLowerCase() : X.sameSite;
    switch (F) {
      case true:
        J += "; SameSite=Strict";
        break;
      case "lax":
        J += "; SameSite=Lax";
        break;
      case "strict":
        J += "; SameSite=Strict";
        break;
      case "none":
        J += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return J;
};
var c9 = function($) {
  return $.indexOf("%") !== -1 ? decodeURIComponent($) : $;
};
var l9 = function($) {
  return encodeURIComponent($);
};
var t9 = function($) {
  return h9.call($) === "[object Date]" || $ instanceof Date;
};
var s9 = function($, W) {
  try {
    return W($);
  } catch (Y) {
    return $;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var v$ = n9;
var p$ = o9;
var h9 = Object.prototype.toString;
var y$ = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
var u$ = Z1(x0(), 1);
var B$ = Z1(W8(), 1);
var q8 = Z1(DY(), 1);
var H8 = ($) => $ && typeof $ === "object" && !Array.isArray($);
var J7 = ($) => typeof $ === "function" && /^\s*class\s+/.test($.toString()) || $.toString().startsWith("[object ") || l0(Object.getPrototypeOf($));
var U1 = ($, W, { skipKeys: Y } = {}) => {
  if (H8($) && H8(W))
    for (let [X, Z] of Object.entries(W)) {
      if (Y?.includes(X))
        continue;
      if (!H8(Z)) {
        $[X] = Z;
        continue;
      }
      if (!(X in $)) {
        $[X] = Z;
        continue;
      }
      if (J7(Z)) {
        $[X] = Z;
        continue;
      }
      $[X] = U1($[X], Z);
    }
  return $;
};
var jY = ($, W) => U1($, W, { skipKeys: ["properties"] });
var I0 = ($, W) => {
  const Y = [...Array.isArray($) ? $ : [$]], X = [];
  for (let Z of Y)
    if (Z.$elysiaChecksum)
      X.push(Z.$elysiaChecksum);
  for (let Z of Array.isArray(W) ? W : [W])
    if (!X.includes(Z?.$elysiaChecksum))
      Y.push(Z);
  return Y;
};
var I1 = ($, W) => {
  return { body: W?.body ?? $?.body, headers: W?.headers ?? $?.headers, params: W?.params ?? $?.params, query: W?.query ?? $?.query, response: W?.response ?? $?.response, type: $?.type || W?.type, detail: U1(W?.detail ?? {}, $?.detail ?? {}), parse: I0($?.parse ?? [], W?.parse ?? []), transform: I0($?.transform ?? [], W?.transform ?? []), beforeHandle: I0($?.beforeHandle ?? [], W?.beforeHandle ?? []), afterHandle: I0($?.afterHandle ?? [], W?.afterHandle ?? []), onResponse: I0($?.onResponse ?? [], W?.onResponse ?? []), trace: I0($?.trace ?? [], W?.trace ?? []), error: I0($?.error ?? [], W?.error ?? []) };
};
var Y1 = ($, { models: W = {}, additionalProperties: Y = false, dynamic: X = false }) => {
  if (!$)
    return;
  if (typeof $ === "string" && !($ in W))
    return;
  const Z = typeof $ === "string" ? W[$] : $;
  if (Z.type === "object" && ("additionalProperties" in Z) === false)
    Z.additionalProperties = Y;
  if (X)
    return { schema: Z, references: "", checkFunc: () => {
    }, code: "", Check: (Q) => B$.Value.Check(Z, Q), Errors: (Q) => B$.Value.Errors(Z, Q), Code: () => "" };
  return q8.TypeCompiler.Compile(Z);
};
var N8 = ($, { models: W = {}, additionalProperties: Y = false, dynamic: X = false }) => {
  if (!$)
    return;
  if (typeof $ === "string" && !($ in W))
    return;
  const Z = typeof $ === "string" ? W[$] : $, Q = (z) => {
    if (X)
      return { schema: z, references: "", checkFunc: () => {
      }, code: "", Check: (A) => B$.Value.Check(z, A), Errors: (A) => B$.Value.Errors(z, A), Code: () => "" };
    return q8.TypeCompiler.Compile(z);
  };
  if (u$.Kind in Z) {
    if (("additionalProperties" in Z) === false)
      Z.additionalProperties = Y;
    return { 200: Q(Z) };
  }
  const J = {};
  return Object.keys(Z).forEach((z) => {
    const A = Z[+z];
    if (typeof A === "string") {
      if (A in W) {
        const w = W[A];
        w.type === "object" && ("additionalProperties" in w), J[+z] = (u$.Kind in w) ? Q(w) : w;
      }
      return;
    }
    if (A.type === "object" && ("additionalProperties" in A) === false)
      A.additionalProperties = Y;
    J[+z] = (u$.Kind in A) ? Q(A) : A;
  }), J;
};
var M8 = ($) => {
  let W = 9;
  for (let Y = 0;Y < $.length; )
    W = Math.imul(W ^ $.charCodeAt(Y++), 387420489);
  return W = W ^ W >>> 9;
};
var h$ = ($, W, Y) => {
  const X = (Z) => {
    if (Y)
      Z.$elysiaChecksum = Y;
    return Z;
  };
  return { start: I0($.start, ("start" in W ? W.start ?? [] : []).map(X)), request: I0($.request, ("request" in W ? W.request ?? [] : []).map(X)), parse: I0($.parse, "parse" in W ? W?.parse ?? [] : []).map(X), transform: I0($.transform, (W?.transform ?? []).map(X)), beforeHandle: I0($.beforeHandle, (W?.beforeHandle ?? []).map(X)), afterHandle: I0($.afterHandle, (W?.afterHandle ?? []).map(X)), onResponse: I0($.onResponse, (W?.onResponse ?? []).map(X)), trace: $.trace, error: I0($.error, (W?.error ?? []).map(X)), stop: I0($.stop, ("stop" in W ? W.stop ?? [] : []).map(X)) };
};
var KY = ($, W = true) => {
  if (!$)
    return $;
  if (typeof $ === "function") {
    if (W)
      $.$elysiaHookType = "global";
    else
      $.$elysiaHookType = undefined;
    return $;
  }
  return $.map((Y) => {
    if (W)
      Y.$elysiaHookType = "global";
    else
      Y.$elysiaHookType = undefined;
    return Y;
  });
};
var l1 = ($) => {
  if (!$)
    return $;
  if (typeof $ === "function")
    return $.$elysiaHookType === "global" ? $ : undefined;
  return $.filter((W) => W.$elysiaHookType === "global");
};
var U8 = ($) => {
  return { ...$, type: $?.type, detail: $?.detail, parse: l1($?.parse), transform: l1($?.transform), beforeHandle: l1($?.beforeHandle), afterHandle: l1($?.afterHandle), onResponse: l1($?.onResponse), error: l1($?.error) };
};
var A8 = { Continue: 100, "Switching Protocols": 101, Processing: 102, "Early Hints": 103, OK: 200, Created: 201, Accepted: 202, "Non-Authoritative Information": 203, "No Content": 204, "Reset Content": 205, "Partial Content": 206, "Multi-Status": 207, "Already Reported": 208, "Multiple Choices": 300, "Moved Permanently": 301, Found: 302, "See Other": 303, "Not Modified": 304, "Temporary Redirect": 307, "Permanent Redirect": 308, "Bad Request": 400, Unauthorized: 401, "Payment Required": 402, Forbidden: 403, "Not Found": 404, "Method Not Allowed": 405, "Not Acceptable": 406, "Proxy Authentication Required": 407, "Request Timeout": 408, Conflict: 409, Gone: 410, "Length Required": 411, "Precondition Failed": 412, "Payload Too Large": 413, "URI Too Long": 414, "Unsupported Media Type": 415, "Range Not Satisfiable": 416, "Expectation Failed": 417, "I'm a teapot": 418, "Misdirected Request": 421, "Unprocessable Content": 422, Locked: 423, "Failed Dependency": 424, "Too Early": 425, "Upgrade Required": 426, "Precondition Required": 428, "Too Many Requests": 429, "Request Header Fields Too Large": 431, "Unavailable For Legal Reasons": 451, "Internal Server Error": 500, "Not Implemented": 501, "Bad Gateway": 502, "Service Unavailable": 503, "Gateway Timeout": 504, "HTTP Version Not Supported": 505, "Variant Also Negotiates": 506, "Insufficient Storage": 507, "Loop Detected": 508, "Not Extended": 510, "Network Authentication Required": 511 };
var t1 = async ($, W) => {
  if (typeof $ !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (W === null)
    throw new TypeError("Secret key must be provided.");
  const Y = new TextEncoder, X = await crypto.subtle.importKey("raw", Y.encode(W), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), Z = await crypto.subtle.sign("HMAC", X, Y.encode($)), Q = Array.from(new Uint8Array(Z)), J = btoa(String.fromCharCode(...Q));
  return `${$}.${J.replace(/=+$/, "")}`;
};
var B8 = async ($, W) => {
  if (typeof $ !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (W === null)
    throw new TypeError("Secret key must be provided.");
  const Y = $.slice(0, $.lastIndexOf("."));
  return await t1(Y, W) === $ ? Y : false;
};

class t0 {
  $;
  W;
  name;
  setter;
  constructor($, W = {}) {
    this._value = $;
    this.property = W;
  }
  get() {
    return this._value;
  }
  get value() {
    return this._value;
  }
  set value($) {
    if (typeof $ === "object") {
      if (JSON.stringify(this.value) === JSON.stringify($))
        return;
    } else if (this.value === $)
      return;
    this._value = $, this.sync();
  }
  add($) {
    const W = Object.assign(this.property, typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $);
    if ("value" in W)
      this._value = W.value, delete W.value;
    return this.property = W, this.sync();
  }
  set($) {
    const W = typeof $ === "function" ? $(Object.assign(this.property, this.value)) : $;
    if ("value" in W)
      this._value = W.value, delete W.value;
    return this.property = W, this.sync();
  }
  remove($) {
    if (this.value === undefined)
      return;
    this.set({ domain: $?.domain, expires: new Date(0), maxAge: 0, path: $?.path, sameSite: $?.sameSite, secure: $?.secure, value: "" });
  }
  get domain() {
    return this.property.domain;
  }
  set domain($) {
    if (this.property.domain === $)
      return;
    this.property.domain = $, this.sync();
  }
  get expires() {
    return this.property.expires;
  }
  set expires($) {
    if (this.property.expires?.getTime() === $?.getTime())
      return;
    this.property.expires = $, this.sync();
  }
  get httpOnly() {
    return this.property.httpOnly;
  }
  set httpOnly($) {
    if (this.property.domain === $)
      return;
    this.property.httpOnly = $, this.sync();
  }
  get maxAge() {
    return this.property.maxAge;
  }
  set maxAge($) {
    if (this.property.maxAge === $)
      return;
    this.property.maxAge = $, this.sync();
  }
  get path() {
    return this.property.path;
  }
  set path($) {
    if (this.property.path === $)
      return;
    this.property.path = $, this.sync();
  }
  get priority() {
    return this.property.priority;
  }
  set priority($) {
    if (this.property.priority === $)
      return;
    this.property.priority = $, this.sync();
  }
  get sameSite() {
    return this.property.sameSite;
  }
  set sameSite($) {
    if (this.property.sameSite === $)
      return;
    this.property.sameSite = $, this.sync();
  }
  get secure() {
    return this.property.secure;
  }
  set secure($) {
    if (this.property.secure === $)
      return;
    this.property.secure = $, this.sync();
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
  sync() {
    if (!this.name || !this.setter)
      return this;
    if (!this.setter.cookie)
      this.setter.cookie = { [this.name]: Object.assign(this.property, { value: this.toString() }) };
    else
      this.setter.cookie[this.name] = Object.assign(this.property, { value: this.toString() });
    return this;
  }
}
var PY = ($, W, Y) => new Proxy($, { get(X, Z) {
  if (Z in X)
    return X[Z];
  const Q = new t0(undefined, Y ? { ...Y } : undefined);
  return Q.setter = W, Q.name = Z, Q;
}, set(X, Z, Q) {
  if (!(Q instanceof t0))
    return false;
  if (!W.cookie)
    W.cookie = {};
  return Q.setter = W, Q.name = Z, Q.sync(), X[Z] = Q, true;
} });
var n$ = async ($, W, { secret: Y, sign: X, ...Z } = {}) => {
  if (!W)
    return PY({}, $, Z);
  const Q = {}, J = typeof Y === "string";
  if (X && X !== true && !Array.isArray(X))
    X = [X];
  const z = Object.keys(v$(W));
  for (let A = 0;A < z.length; A++) {
    const w = z[A];
    let F = v$(W)[w];
    if (X === true || X?.includes(w)) {
      if (!Y)
        throw new Error("No secret is provided to cookie plugin");
      if (J) {
        if (F = await B8(F, Y), F === false)
          throw new M$(w);
      } else {
        let j = true;
        for (let M = 0;M < Y.length; M++) {
          const P = await B8(F, Y[M]);
          if (P !== false) {
            F = P, j = false;
            break;
          }
        }
        if (j)
          throw new M$(w);
      }
    }
    if (F === undefined)
      continue;
    const S = F.charCodeAt(0);
    if (S === 123 || S === 91)
      try {
        const j = new t0(JSON.parse(F));
        j.setter = $, j.name = w, Q[w] = j;
        continue;
      } catch {
      }
    if (!Number.isNaN(+F))
      F = +F;
    else if (F === "true")
      F = true;
    else if (F === "false")
      F = false;
    const R = new t0(F, Z);
    R.setter = $, R.name = w, Q[w] = R;
  }
  return PY(Q, $);
};
var OY = "toJSON" in new Headers;
var l0 = ($) => {
  for (let W in $)
    return true;
  return false;
};
var SY = ($, W) => {
  if (!$ || !Array.isArray(W))
    return $;
  $.delete("Set-Cookie");
  for (let Y = 0;Y < W.length; Y++) {
    const X = W[Y].indexOf("=");
    $.append("Set-Cookie", `${W[Y].slice(0, X)}=${W[Y].slice(X + 1)}`);
  }
  return $;
};
var LY = ($) => {
  if (!$ || typeof $ !== "object" || !l0($))
    return;
  const W = [];
  for (let [Y, X] of Object.entries($)) {
    if (!Y || !X)
      continue;
    if (Array.isArray(X.value))
      for (let Z = 0;Z < X.value.length; Z++) {
        let Q = X.value[Z];
        if (Q === undefined || Q === null)
          continue;
        if (typeof Q === "object")
          Q = JSON.stringify(Q);
        W.push(p$(Y, Q, X));
      }
    else {
      let Z = X.value;
      if (Z === undefined || Z === null)
        continue;
      if (typeof Z === "object")
        Z = JSON.stringify(Z);
      W.push(p$(Y, X.value, X));
    }
  }
  if (W.length === 0)
    return;
  if (W.length === 1)
    return W[0];
  return W;
};
var A1 = ($, W) => {
  if ($?.$passthrough)
    $ = $[$.$passthrough];
  if (l0(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === "string")
      W.status = A8[W.status];
    if (W.redirect) {
      if (W.headers.Location = W.redirect, !W.status || W.status < 300 || W.status >= 400)
        W.status = 302;
    }
    if (W.cookie && l0(W.cookie))
      W.headers["Set-Cookie"] = LY(W.cookie);
    if (W.headers["Set-Cookie"] && Array.isArray(W.headers["Set-Cookie"]))
      W.headers = SY(new Headers(W.headers), W.headers["Set-Cookie"]);
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($, { status: W.status, headers: W.headers });
      case "Object":
      case "Array":
        return Response.json($, W);
      case "ReadableStream":
        if (!W.headers["content-type"]?.startsWith("text/event-stream"))
          W.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response($, W);
      case undefined:
        if (!$)
          return new Response("", W);
        return Response.json($, W);
      case "Response":
        const Y = { ...W.headers };
        if (OY)
          W.headers = $.headers.toJSON();
        else
          for (let [Z, Q] of $.headers.entries())
            if (Z in W.headers)
              W.headers[Z] = Q;
        for (let Z in Y)
          $.headers.append(Z, Y[Z]);
        return $;
      case "Error":
        return F$($, W);
      case "Promise":
        return $.then((Z) => A1(Z, W));
      case "Function":
        return A1($(), W);
      case "Number":
      case "Boolean":
        return new Response($.toString(), W);
      case "Cookie":
        if ($ instanceof t0)
          return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const X = JSON.stringify($);
        if (X.charCodeAt(0) === 123) {
          if (!W.headers["Content-Type"])
            W.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), W);
        }
        return new Response(X, W);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "ReadableStream":
        return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!$)
          return new Response("");
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "Response":
        return $;
      case "Error":
        return F$($, W);
      case "Promise":
        return $.then((X) => {
          const Z = j1(X);
          if (Z !== undefined)
            return Z;
          return new Response("");
        });
      case "Function":
        return j1($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof t0)
          return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
        return new Response(Y);
    }
};
var s0 = ($, W) => {
  if ($ === undefined || $ === null)
    return;
  if ($?.$passthrough)
    $ = $[$.$passthrough];
  if (l0(W.headers) || W.status !== 200 || W.redirect || W.cookie) {
    if (typeof W.status === "string")
      W.status = A8[W.status];
    if (W.redirect) {
      if (W.headers.Location = W.redirect, !W.status || W.status < 300 || W.status >= 400)
        W.status = 302;
    }
    if (W.cookie && l0(W.cookie))
      W.headers["Set-Cookie"] = LY(W.cookie);
    if (W.headers["Set-Cookie"] && Array.isArray(W.headers["Set-Cookie"]))
      W.headers = SY(new Headers(W.headers), W.headers["Set-Cookie"]);
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($, W);
      case "Object":
      case "Array":
        return Response.json($, W);
      case "ReadableStream":
        if (!W.headers["content-type"]?.startsWith("text/event-stream"))
          W.headers["content-type"] = "text/event-stream; charset=utf-8";
        return new Response($, W);
      case undefined:
        if (!$)
          return;
        return Response.json($, W);
      case "Response":
        const Y = Object.assign({}, W.headers);
        if (OY)
          W.headers = $.headers.toJSON();
        else
          for (let [Z, Q] of $.headers.entries())
            if (!(Z in W.headers))
              W.headers[Z] = Q;
        for (let Z in Y)
          $.headers.append(Z, Y[Z]);
        if ($.status !== W.status)
          W.status = $.status;
        return $;
      case "Promise":
        return $.then((Z) => {
          const Q = s0(Z, W);
          if (Q !== undefined)
            return Q;
          return;
        });
      case "Error":
        return F$($, W);
      case "Function":
        return s0($(), W);
      case "Number":
      case "Boolean":
        return new Response($.toString(), W);
      case "Cookie":
        if ($ instanceof t0)
          return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const X = JSON.stringify($);
        if (X.charCodeAt(0) === 123) {
          if (!W.headers["Content-Type"])
            W.headers["Content-Type"] = "application/json";
          return new Response(JSON.stringify($), W);
        }
        return new Response(X, W);
    }
  } else
    switch ($?.constructor?.name) {
      case "String":
      case "Blob":
        return new Response($);
      case "Object":
      case "Array":
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "ReadableStream":
        return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
      case undefined:
        if (!$)
          return new Response("");
        return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
      case "Response":
        return $;
      case "Promise":
        return $.then((X) => {
          const Z = s0(X, W);
          if (Z !== undefined)
            return Z;
          return;
        });
      case "Error":
        return F$($, W);
      case "Function":
        return j1($());
      case "Number":
      case "Boolean":
        return new Response($.toString());
      case "Cookie":
        if ($ instanceof t0)
          return new Response($.value, W);
        return new Response($?.toString(), W);
      default:
        const Y = JSON.stringify($);
        if (Y.charCodeAt(0) === 123)
          return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
        return new Response(Y);
    }
};
var j1 = ($) => {
  if ($?.$passthrough)
    $ = $[$.$passthrough];
  switch ($?.constructor?.name) {
    case "String":
    case "Blob":
      return new Response($);
    case "Object":
    case "Array":
      return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
    case "ReadableStream":
      return new Response($, { headers: { "Content-Type": "text/event-stream; charset=utf-8" } });
    case undefined:
      if (!$)
        return new Response("");
      return new Response(JSON.stringify($), { headers: { "content-type": "application/json" } });
    case "Response":
      return $;
    case "Error":
      return F$($);
    case "Promise":
      return $.then((Y) => {
        const X = j1(Y);
        if (X !== undefined)
          return X;
        return new Response("");
      });
    case "Function":
      return j1($());
    case "Number":
    case "Boolean":
      return new Response($.toString());
    default:
      const W = JSON.stringify($);
      if (W.charCodeAt(0) === 123)
        return new Response(JSON.stringify($), { headers: { "Content-Type": "application/json" } });
      return new Response(W);
  }
};
var F$ = ($, W) => new Response(JSON.stringify({ name: $?.name, message: $?.message, cause: $?.cause }), { status: W?.status !== 200 ? W?.status ?? 500 : 500, headers: W?.headers });
var iY = Z1(D8(), 1);
var B7 = new Headers().toJSON;
var mY = new RegExp(" (\\w+) = context", "g");
var uY = { value: 0 };
var hY = ({ hasTrace: $, hasTraceSet: W = false, addFn: Y, condition: X = {} }) => {
  if (Y("\nconst reporter = getReporter()\n"), $)
    return (Z, { name: Q, attribute: J = "", unit: z = 0 } = {}) => {
      const A = Z.indexOf("."), w = A === -1;
      if (Z !== "request" && Z !== "response" && !X[w ? Z : Z.slice(0, A)])
        return () => {
          if (W && Z === "afterHandle")
            Y("reporter.emit('event',{id,event:'exit',type:'begin',time:0})"), Y("\nawait traceDone\n");
        };
      if (w)
        Q ||= Z;
      else
        Q ||= "anonymous";
      Y("\n" + `reporter.emit('event', { 
					id,
					event: '${Z}',
					type: 'begin',
					name: '${Q}',
					time: performance.now(),
					${w ? `unit: ${z},` : ""}
					${J}
				})`.replace(/(\t| |\n)/g, "") + "\n");
      let F = false;
      return () => {
        if (F)
          return;
        if (F = true, Y("\n" + `reporter.emit('event', {
							id,
							event: '${Z}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n"), W && Z === "afterHandle")
          Y("\nreporter.emit('event',{id,event:'exit',type:'begin',time:0})\n"), Y("\nawait traceDone\n");
      };
    };
  else
    return () => () => {
    };
};
var D$ = ($) => {
  const W = $.indexOf(")");
  if ($.charCodeAt(W + 2) === 61 && $.charCodeAt(W + 5) !== 123)
    return true;
  return $.includes("return");
};
var F7 = ($, { injectResponse: W = "" } = {}) => ({ composeValidation: (Y, X = `c.${Y}`) => $ ? `c.set.status = 400; throw new ValidationError(
'${Y}',
${Y},
${X}
)` : `c.set.status = 400; return new ValidationError(
	'${Y}',
	${Y},
	${X}
).toResponse(c.set.headers)`, composeResponseValidation: (Y = "r") => {
  const X = $ ? `throw new ValidationError(
'response',
response[c.set.status],
${Y}
)` : `return new ValidationError(
'response',
response[c.set.status],
${Y}
).toResponse(c.set.headers)`;
  return `\n${W}
		if(response[c.set.status]?.Check(${Y}) === false) { 
	if(!(response instanceof Error))
		${X}
}\n`;
} });
var j0 = ($, W) => {
  if (W = W.trimStart(), W = W.replaceAll(/^async /g, ""), /^(\w+)\(/g.test(W))
    W = W.slice(W.indexOf("("));
  const Y = W.charCodeAt(0) === 40 || W.startsWith("function") ? W.slice(W.indexOf("(") + 1, W.indexOf(")")) : W.slice(0, W.indexOf("=") - 1);
  if (Y === "")
    return false;
  const X = Y.charCodeAt(0) === 123 ? Y.indexOf("...") : -1;
  if (Y.charCodeAt(0) === 123) {
    if (Y.includes($))
      return true;
    if (X === -1)
      return false;
  }
  if (W.match(new RegExp(`${Y}(.${$}|\\["${$}"\\])`)))
    return true;
  const Z = X !== -1 ? Y.slice(X + 3, Y.indexOf(" ", X + 3)) : undefined;
  if (W.match(new RegExp(`${Z}(.${$}|\\["${$}"\\])`)))
    return true;
  const Q = [Y];
  if (Z)
    Q.push(Z);
  for (let z of W.matchAll(mY))
    Q.push(z[1]);
  const J = new RegExp(`{.*?} = (${Q.join("|")})`, "g");
  for (let [z] of W.matchAll(J))
    if (z.includes(`{ ${$}`) || z.includes(`, ${$}`))
      return true;
  return false;
};
var j$ = ($) => {
  if ($ = $.trimStart(), $ = $.replaceAll(/^async /g, ""), /^(\w+)\(/g.test($))
    $ = $.slice($.indexOf("("));
  const W = $.charCodeAt(0) === 40 || $.startsWith("function") ? $.slice($.indexOf("(") + 1, $.indexOf(")")) : $.slice(0, $.indexOf("=") - 1);
  if (W === "")
    return false;
  const Y = W.charCodeAt(0) === 123 ? W.indexOf("...") : -1, X = Y !== -1 ? W.slice(Y + 3, W.indexOf(" ", Y + 3)) : undefined, Z = [W];
  if (X)
    Z.push(X);
  for (let J of $.matchAll(mY))
    Z.push(J[1]);
  for (let J of Z)
    if (new RegExp(`\\b\\w+\\([^)]*\\b${J}\\b[^)]*\\)`).test($))
      return true;
  const Q = new RegExp(`{.*?} = (${Z.join("|")})`, "g");
  for (let [J] of $.matchAll(Q))
    if (new RegExp(`\\b\\w+\\([^)]*\\b${J}\\b[^)]*\\)`).test($))
      return true;
  return false;
};
var s1 = Symbol.for("TypeBox.Kind");
var o$ = ($, W) => {
  if (!W)
    return;
  if ((s1 in W) && W[s1] === $)
    return true;
  if (W.type === "object") {
    const Y = W.properties;
    for (let X of Object.keys(Y)) {
      const Z = Y[X];
      if (Z.type === "object") {
        if (o$($, Z))
          return true;
      } else if (Z.anyOf) {
        for (let Q = 0;Q < Z.anyOf.length; Q++)
          if (o$($, Z.anyOf[Q]))
            return true;
      }
      if ((s1 in Z) && Z[s1] === $)
        return true;
    }
    return false;
  }
  return W.properties && (s1 in W.properties) && W.properties[s1] === $;
};
var j8 = Symbol.for("TypeBox.Transform");
var R1 = ($) => {
  if (!$)
    return;
  if ($.type === "object" && $.properties) {
    const W = $.properties;
    for (let Y of Object.keys(W)) {
      const X = W[Y];
      if (X.type === "object") {
        if (R1(X))
          return true;
      } else if (X.anyOf) {
        for (let Q = 0;Q < X.anyOf.length; Q++)
          if (R1(X.anyOf[Q]))
            return true;
      }
      if (j8 in X)
        return true;
    }
    return false;
  }
  return (j8 in $) || $.properties && (j8 in $.properties);
};
var w7 = ($) => {
  if (!$)
    return;
  const W = $?.schema;
  if (W && ("anyOf" in W)) {
    let Y = false;
    const X = W.anyOf[0].type;
    for (let Z of W.anyOf)
      if (Z.type !== X) {
        Y = true;
        break;
      }
    if (!Y)
      return X;
  }
  return $.schema?.type;
};
var D7 = /(?:return|=>) \S*\(/g;
var M0 = ($) => {
  if ($.constructor.name === "AsyncFunction")
    return true;
  return $.toString().match(D7);
};
var nY = ({ path: $, method: W, hooks: Y, validator: X, handler: Z, handleError: Q, definitions: J, schema: z, onRequest: A, config: w, getReporter: F }) => {
  const S = w.forceErrorEncapsulation || Y.error.length > 0 || typeof Bun === "undefined" || Y.onResponse.length > 0 || !!Y.trace.length, R = Y.onResponse.length ? `\n;(async () => {${Y.onResponse.map((b, f) => `await res${f}(c)`).join(";")}})();\n` : "", j = Y.trace.map((b) => b.toString());
  let M = false;
  if (j$(Z.toString()))
    M = true;
  if (!M)
    for (let [b, f] of Object.entries(Y)) {
      if (!Array.isArray(f) || !f.length || !["parse", "transform", "beforeHandle", "afterHandle", "onResponse"].includes(b))
        continue;
      for (let i of f) {
        if (typeof i !== "function")
          continue;
        if (j$(i.toString())) {
          M = true;
          break;
        }
      }
      if (M)
        break;
    }
  const P = { parse: j.some((b) => j0("parse", b)), transform: j.some((b) => j0("transform", b)), handle: j.some((b) => j0("handle", b)), beforeHandle: j.some((b) => j0("beforeHandle", b)), afterHandle: j.some((b) => j0("afterHandle", b)), error: S || j.some((b) => j0("error", b)) }, O = Y.trace.length > 0;
  let U = "";
  const D = X || W !== "GET" && W !== "HEAD" ? [Z, ...Y.transform, ...Y.beforeHandle, ...Y.afterHandle].map((b) => b.toString()) : [], I = M || W !== "GET" && W !== "HEAD" && Y.type !== "none" && (!!X.body || !!Y.type || D.some((b) => j0("body", b))), G = M || X.headers || D.some((b) => j0("headers", b)), k = M || X.cookie || D.some((b) => j0("cookie", b)), _ = X?.cookie?.schema;
  let X0 = "";
  if (_?.sign) {
    if (!_.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${W}) ${$}.`);
    const b = !_.secrets ? undefined : typeof _.secrets === "string" ? _.secrets : _.secrets[0];
    if (X0 += `const _setCookie = c.set.cookie
		if(_setCookie) {`, _.sign === true)
      X0 += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${b}')
			}`;
    else
      for (let f of _.sign)
        X0 += `if(_setCookie['${f}']?.value) { c.set.cookie['${f}'].value = await signCookie(_setCookie['${f}'].value, '${b}') }\n`;
    X0 += "}\n";
  }
  const { composeValidation: e, composeResponseValidation: N0 } = F7(S);
  if (G)
    U += B7 ? "c.headers = c.request.headers.toJSON()\n" : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  if (k) {
    const b = (i, h) => {
      const z0 = _?.[i] ?? h;
      if (!z0)
        return typeof h === "string" ? `${i}: "${h}",` : `${i}: ${h},`;
      if (typeof z0 === "string")
        return `${i}: '${z0}',`;
      if (z0 instanceof Date)
        return `${i}: new Date(${z0.getTime()}),`;
      return `${i}: ${z0},`;
    }, f = _ ? `{
			secret: ${_.secrets !== undefined ? typeof _.secrets === "string" ? `'${_.secrets}'` : "[" + _.secrets.reduce((i, h) => i + `'${h}',`, "") + "]" : "undefined"},
			sign: ${_.sign === true ? true : _.sign !== undefined ? "[" + _.sign.reduce((i, h) => i + `'${h}',`, "") + "]" : "undefined"},
			${b("domain")}
			${b("expires")}
			${b("httpOnly")}
			${b("maxAge")}
			${b("path", "/")}
			${b("priority")}
			${b("sameSite")}
			${b("secure")}
		}` : "undefined";
    if (G)
      U += `\nc.cookie = await parseCookie(c.set, c.headers.cookie, ${f})\n`;
    else
      U += `\nc.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${f})\n`;
  }
  if (M || X.query || D.some((b) => j0("query", b)))
    U += `const url = c.request.url

		if(c.qi !== -1) {
			c.query ??= parseQuery(url.substring(c.qi + 1))
		} else {
			c.query ??= {}
		}
		`;
  const i0 = Y.trace.map((b) => b.toString()).some((b) => j0("set", b) || j$(b));
  M || Y.trace.some((b) => j0("set", b.toString()));
  const H0 = i0 || k || D.some((b) => j0("set", b)) || A.some((b) => j0("set", b.toString()));
  if (O)
    U += "\nconst id = c.$$requestId\n";
  const J0 = hY({ hasTrace: O, hasTraceSet: i0, condition: P, addFn: (b) => {
    U += b;
  } });
  if (U += S ? "try {\n" : "", O) {
    U += "\nconst traceDone = Promise.all([";
    for (let b = 0;b < Y.trace.length; b++)
      U += `new Promise(r => { reporter.once(\`res\${id}.${b}\`, r) }),`;
    U += "])\n";
  }
  const m0 = k || I || i0 || M0(Z) || Y.parse.length > 0 || Y.afterHandle.some(M0) || Y.beforeHandle.some(M0) || Y.transform.some(M0), r0 = J0("parse", { unit: Y.parse.length });
  if (I) {
    const b = w7(X?.body);
    if (Y.type && !Array.isArray(Y.type)) {
      if (Y.type)
        switch (Y.type) {
          case "json":
          case "application/json":
            U += "c.body = await c.request.json()\n";
            break;
          case "text":
          case "text/plain":
            U += "c.body = await c.request.text()\n";
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            U += "c.body = parseQuery(await c.request.text())\n";
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            U += "c.body = await c.request.arrayBuffer()\n";
            break;
          case "formdata":
          case "multipart/form-data":
            U += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}\n`;
            break;
        }
      if (Y.parse.length)
        U += "}}";
    } else {
      const i = (() => {
        if (Y.parse.length && b && !Array.isArray(Y.type)) {
          const h = X?.body?.schema;
          switch (b) {
            case "object":
              if (o$("File", h) || o$("Files", h))
                return `c.body = {}
		
								const form = await c.request.formData()
								for (const key of form.keys()) {
									if (c.body[key])
										continue
			
									const value = form.getAll(key)
									if (value.length === 1)
										c.body[key] = value[0]
									else c.body[key] = value
								}`;
              break;
            default:
              break;
          }
        }
      })();
      if (i)
        U += i;
      else {
        if (U += "\n", U += G ? "let contentType = c.headers['content-type']" : "let contentType = c.request.headers.get('content-type')", U += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)\n`, Y.parse.length) {
          U += "let used = false\n";
          const h = J0("parse", { unit: Y.parse.length });
          for (let z0 = 0;z0 < Y.parse.length; z0++) {
            const F0 = J0("parse.unit", { name: Y.parse[z0].name }), w0 = `bo${z0}`;
            if (z0 !== 0)
              U += "if(!used) {\n";
            if (U += `let ${w0} = parse[${z0}](c, contentType)\n`, U += `if(${w0} instanceof Promise) ${w0} = await ${w0}\n`, U += `if(${w0} !== undefined) { c.body = ${w0}; used = true }\n`, F0(), z0 !== 0)
              U += "}";
          }
          h();
        }
        if (Y.parse.length)
          U += "if (!used)";
        U += `
				switch (contentType) {
					case 'application/json':
						c.body = await c.request.json()
						break
				
					case 'text/plain':
						c.body = await c.request.text()
						break
				
					case 'application/x-www-form-urlencoded':
						c.body = parseQuery(await c.request.text())
						break
				
					case 'application/octet-stream':
						c.body = await c.request.arrayBuffer();
						break
				
					case 'multipart/form-data':
						c.body = {}
				
						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue
				
							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
				
						break
					}\n`, U += "}\n";
      }
    }
    U += "\n";
  }
  if (r0(), Y?.transform) {
    const b = J0("transform", { unit: Y.transform.length });
    for (let f = 0;f < Y.transform.length; f++) {
      const i = Y.transform[f], h = J0("transform.unit", { name: i.name });
      if (i.$elysia === "derive")
        U += M0(Y.transform[f]) ? `Object.assign(c, await transform[${f}](c));` : `Object.assign(c, transform[${f}](c));`;
      else
        U += M0(Y.transform[f]) ? `await transform[${f}](c);` : `transform[${f}](c);`;
      h();
    }
    b();
  }
  if (X) {
    if (U += "\n", X.headers) {
      if (U += `if(headers.Check(c.headers) === false) {
				${e("headers")}
			}`, R1(X.headers.schema))
        U += "\nc.headers = headers.Decode(c.headers)\n";
    }
    if (X.params) {
      if (U += `if(params.Check(c.params) === false) {
				${e("params")}
			}`, R1(X.params.schema))
        U += "\nc.params = params.Decode(c.params)\n";
    }
    if (X.query) {
      if (U += `if(query.Check(c.query) === false) {
				${e("query")} 
			}`, R1(X.query.schema))
        U += "\nc.query = query.Decode(Object.assign({}, c.query))\n";
    }
    if (X.body) {
      if (U += `if(body.Check(c.body) === false) { 
				${e("body")}
			}`, R1(X.body.schema))
        U += "\nc.body = body.Decode(c.body)\n";
    }
    if (l0(X.cookie?.schema.properties ?? {})) {
      if (U += `const cookieValue = {}
			for(const [key, value] of Object.entries(c.cookie))
				cookieValue[key] = value.value

			if(cookie.Check(cookieValue) === false) {
				${e("cookie", "cookieValue")}
			}`, R1(X.cookie.schema))
        U += "\nc.cookie = params.Decode(c.cookie)\n";
    }
  }
  if (Y?.beforeHandle) {
    const b = J0("beforeHandle", { unit: Y.beforeHandle.length });
    for (let f = 0;f < Y.beforeHandle.length; f++) {
      const i = J0("beforeHandle.unit", { name: Y.beforeHandle[f].name }), h = `be${f}`;
      if (!D$(Y.beforeHandle[f].toString()))
        U += M0(Y.beforeHandle[f]) ? `await beforeHandle[${f}](c);\n` : `beforeHandle[${f}](c);\n`, i();
      else {
        U += M0(Y.beforeHandle[f]) ? `let ${h} = await beforeHandle[${f}](c);\n` : `let ${h} = beforeHandle[${f}](c);\n`, i(), U += `if(${h} !== undefined) {\n`;
        const F0 = J0("afterHandle", { unit: Y.transform.length });
        if (Y.afterHandle) {
          const w0 = h;
          for (let D0 = 0;D0 < Y.afterHandle.length; D0++) {
            const q0 = D$(Y.afterHandle[D0].toString()), B1 = J0("afterHandle.unit", { name: Y.afterHandle[D0].name });
            if (U += `c.response = ${w0}\n`, !q0)
              U += M0(Y.afterHandle[D0]) ? `await afterHandle[${D0}](c, ${w0});\n` : `afterHandle[${D0}](c, ${w0});\n`;
            else {
              const K = `af${D0}`;
              U += M0(Y.afterHandle[D0]) ? `const ${K} = await afterHandle[${D0}](c);\n` : `const ${K} = afterHandle[${D0}](c);\n`, U += `if(${K} !== undefined) { c.response = ${w0} = ${K} }\n`;
            }
            B1();
          }
        }
        if (F0(), X.response)
          U += N0(h);
        U += X0, U += `return mapEarlyResponse(${h}, c.set)}\n`;
      }
    }
    b();
  }
  if (Y?.afterHandle.length) {
    const b = J0("handle", { name: Z.name });
    if (Y.afterHandle.length)
      U += M0(Z) ? "let r = c.response = await handler(c);\n" : "let r = c.response = handler(c);\n";
    else
      U += M0(Z) ? "let r = await handler(c);\n" : "let r = handler(c);\n";
    b();
    const f = J0("afterHandle", { unit: Y.afterHandle.length });
    for (let i = 0;i < Y.afterHandle.length; i++) {
      const h = `af${i}`, z0 = D$(Y.afterHandle[i].toString()), F0 = J0("afterHandle.unit", { name: Y.afterHandle[i].name });
      if (!z0)
        U += M0(Y.afterHandle[i]) ? `await afterHandle[${i}](c)\n` : `afterHandle[${i}](c)\n`, F0();
      else {
        if (X.response)
          U += M0(Y.afterHandle[i]) ? `let ${h} = await afterHandle[${i}](c)\n` : `let ${h} = afterHandle[${i}](c)\n`;
        else
          U += M0(Y.afterHandle[i]) ? `let ${h} = mapEarlyResponse(await afterHandle[${i}](c), c.set)\n` : `let ${h} = mapEarlyResponse(afterHandle[${i}](c), c.set)\n`;
        if (F0(), X.response) {
          if (U += `if(${h} !== undefined) {`, U += N0(h), U += `${h} = mapEarlyResponse(${h}, c.set)\n`, U += `if(${h}) {`, f(), i0)
            U += `${h} = mapEarlyResponse(${h}, c.set)\n`;
          U += `return ${h} } }`;
        } else
          U += `if(${h}) {`, f(), U += `return ${h}}\n`;
      }
    }
    if (f(), U += "r = c.response\n", X.response)
      U += N0();
    if (U += X0, H0)
      U += "return mapResponse(r, c.set)\n";
    else
      U += "return mapCompactResponse(r)\n";
  } else {
    const b = J0("handle", { name: Z.name });
    if (X.response)
      if (U += M0(Z) ? "const r = await handler(c);\n" : "const r = handler(c);\n", b(), U += N0(), J0("afterHandle")(), U += X0, H0)
        U += "return mapResponse(r, c.set)\n";
      else
        U += "return mapCompactResponse(r)\n";
    else if (P.handle || k)
      if (U += M0(Z) ? "let r = await handler(c);\n" : "let r = handler(c);\n", b(), J0("afterHandle")(), U += X0, H0)
        U += "return mapResponse(r, c.set)\n";
      else
        U += "return mapCompactResponse(r)\n";
    else {
      b();
      const f = M0(Z) ? "await handler(c) " : "handler(c)";
      if (J0("afterHandle")(), H0)
        U += `return mapResponse(${f}, c.set)\n`;
      else
        U += `return mapCompactResponse(${f})\n`;
    }
  }
  if (S || R) {
    if (U += `
} catch(error) {`, !m0)
      U += "return (async () => {";
    U += `const set = c.set

		if (!set.status || set.status < 300) set.status = 500
	`;
    const b = J0("error", { unit: Y.error.length });
    if (Y.error.length)
      for (let f = 0;f < Y.error.length; f++) {
        const i = `er${f}`, h = J0("error.unit", { name: Y.error[f].name });
        if (U += `\nlet ${i} = handleErrors[${f}](
					Object.assign(c, {
						error: error,
						code: error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
					})
				)\n`, M0(Y.error[f]))
          U += `if (${i} instanceof Promise) ${i} = await ${i}\n`;
        h(), U += `${i} = mapEarlyResponse(${i}, set)\n`, U += `if (${i}) {`, U += `return ${i} }\n`;
      }
    if (b(), U += "return handleError(c, error)\n\n", !m0)
      U += "})()";
    if (U += "}", R || O) {
      U += " finally { ";
      const f = J0("response", { unit: Y.onResponse.length });
      U += R, f(), U += "}";
    }
  }
  return U = `const { 
		handler,
		handleError,
		hooks: {
			transform,
			beforeHandle,
			afterHandle,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie
	} = hooks

	${Y.onResponse.length ? `const ${Y.onResponse.map((b, f) => `res${f} = onResponse[${f}]`).join(",")}` : ""}

	return ${m0 ? "async" : ""} function(c) {
		${z && J ? "c.schema = schema; c.defs = definitions;" : ""}
		${U}
	}`, Function("hooks", U)({ handler: Z, hooks: Y, validator: X, handleError: Q, utils: { mapResponse: A1, mapCompactResponse: j1, mapEarlyResponse: s0, parseQuery: iY.parse }, error: { NotFoundError: L1, ValidationError: P0, InternalServerError: d$ }, schema: z, definitions: J, ERROR_CODE: o1, getReporter: F, requestId: uY, parseCookie: n$, signCookie: t1 });
};
var K8 = ($) => {
  let W = "", Y = "";
  for (let j of Object.keys($.decorators))
    W += `,${j}: app.decorators.${j}`;
  const { router: X, staticRouter: Z } = $, Q = $.event.trace.length > 0, J = `
	const route = find(request.method, path) ${X.root.ALL ? '?? find("ALL", path)' : ""}
	if (route === null)
		return ${$.event.error.length ? "app.handleError(ctx, notFound)" : `new Response(error404, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})`}

	ctx.params = route.params

	return route.store(ctx)`;
  let z = "";
  for (let [j, { code: M, all: P }] of Object.entries(Z.map))
    z += `case '${j}':\nswitch(request.method) {\n${M}\n${P ?? "default: break map"}}\n\n`;
  const A = $.event.request.some(M0);
  Y += `const {
		app,
		app: { store, router, staticRouter, wsRouter },
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter
	} = data

	const notFound = new NotFoundError()

	${$.event.request.length ? "const onRequest = app.event.request" : ""}

	${Z.variables}

	const find = router.find.bind(router)
	const findWs = wsRouter.find.bind(wsRouter)
	const handleError = app.handleError.bind(this)

	${$.event.error.length ? "" : "const error404 = notFound.message.toString()"}

	return ${A ? "async" : ""} function map(request) {
	`;
  const w = $.event.trace.map((j) => j.toString()), F = hY({ hasTrace: Q, hasTraceSet: $.event.trace.some((j) => {
    const M = j.toString();
    return j0("set", M) || j$(M);
  }), condition: { request: w.some((j) => j0("request", j) || j$(j)) }, addFn: (j) => {
    Y += j;
  } });
  if ($.event.request.length) {
    Y += `
			${Q ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				set: {
					cookie: {},
					headers: {},
					status: 200
				}
				${Q ? ",$$requestId: +id" : ""}
				${W}
			}
		`;
    const j = F("request", { attribute: "ctx", unit: $.event.request.length });
    Y += "try {\n";
    for (let M = 0;M < $.event.request.length; M++) {
      const P = $.event.request[M], O = D$(P.toString()), U = M0(P), D = F("request.unit", { name: $.event.request[M].name }), I = `re${M}`;
      if (O)
        Y += `const ${I} = mapEarlyResponse(
					${U ? "await" : ""} onRequest[${M}](ctx),
					ctx.set
				)\n`, D(), Y += `if(${I}) return ${I}\n`;
      else
        Y += `${U ? "await" : ""} onRequest[${M}](ctx)\n`, D();
    }
    Y += `} catch (error) {
			return app.handleError(ctx, error)
		}`, j(), Y += `
		const url = request.url,
		s = url.indexOf('/', 11),
		i = ctx.qi = url.indexOf('?', s + 1),
		path = ctx.path = i === -1 ? url.substring(s) : url.substring(s, i);`;
  } else
    Y += `
		const url = request.url,
			s = url.indexOf('/', 11),
			qi = url.indexOf('?', s + 1),
			path = qi === -1
				? url.substring(s)
				: url.substring(s, qi)

		${Q ? "const id = +requestId.value++" : ""}

		const ctx = {
			request,
			store,
			qi,
			path,
			set: {
				headers: {},
				status: 200
			}
			${Q ? ",$$requestId: id" : ""}
			${W}
		}`, F("request", { unit: $.event.request.length, attribute: w.some((j) => j0("context", j)) || w.some((j) => j0("store", j)) || w.some((j) => j0("set", j)) ? "ctx" : "" })();
  const { wsPaths: S, wsRouter: R } = $;
  if (Object.keys(S).length || R.history.length) {
    Y += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (let [j, M] of Object.entries(S))
      Y += `
					case '${j}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${M}(ctx)
							
						break`;
    Y += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = findWs('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}\n`;
  }
  return Y += `
		map: switch(path) {
			${z}

			default:
				break
		}

		${J}
	}`, $.handleError = P8($), Function("data", Y)({ app: $, mapEarlyResponse: s0, NotFoundError: L1, getReporter: () => $.reporter, requestId: uY });
};
var P8 = ($) => {
  let W = `const {
		app: { event: { error: onError, onResponse: res } },
		mapResponse,
		ERROR_CODE
	} = inject

	return ${$.event.error.find(M0) ? "async" : ""} function(context, error) {
		const { set } = context
		`;
  for (let Y = 0;Y < $.event.error.length; Y++) {
    const X = $.event.error[Y], Z = `${M0(X) ? "await " : ""}onError[${Y}](
			Object.assign(context, {
				code: error.code ?? error[ERROR_CODE] ?? 'UNKNOWN',
				error
			})
		)`;
    if (D$(X.toString()))
      W += `const r${Y} = ${Z}; if(r${Y} !== undefined) return mapResponse(r${Y}, set)\n`;
    else
      W += Z + "\n";
  }
  return W += `if(error.constructor.name === "ValidationError") {
		set.status = error.status ?? 400
		return new Response(
			error.message, 
			{ headers: set.headers, status: set.status }
		)
	} else {
		return new Response(error.message, { headers: set.headers, status: error.status ?? 500 })
	}
}`, Function("inject", W)({ app: $, mapResponse: A1, ERROR_CODE: o1 });
};
var c$ = Z1(D8(), 1);
var O8 = ($) => async (W) => {
  const Y = { cookie: {}, status: 200, headers: {} };
  let X;
  if ($.decorators)
    X = $.decorators, X.request = W, X.set = Y, X.store = $.store;
  else
    X = { set: Y, store: $.store, request: W };
  const Z = W.url, Q = Z.indexOf("/", 11), J = Z.indexOf("?", Q + 1), z = J === -1 ? Z.substring(Q) : Z.substring(Q, J);
  try {
    for (let O = 0;O < $.event.request.length; O++) {
      const U = $.event.request[O];
      let D = U(X);
      if (D instanceof Promise)
        D = await D;
      if (D = s0(D, Y), D)
        return D;
    }
    const A = $.dynamicRouter.find(W.method, z) ?? $.dynamicRouter.find("ALL", z);
    if (!A)
      throw new L1;
    const { handle: w, hooks: F, validator: S, content: R } = A.store;
    let j;
    if (W.method !== "GET" && W.method !== "HEAD")
      if (R)
        switch (R) {
          case "application/json":
            j = await W.json();
            break;
          case "text/plain":
            j = await W.text();
            break;
          case "application/x-www-form-urlencoded":
            j = c$.parse(await W.text());
            break;
          case "application/octet-stream":
            j = await W.arrayBuffer();
            break;
          case "multipart/form-data":
            j = {};
            const O = await W.formData();
            for (let U of O.keys()) {
              if (j[U])
                continue;
              const D = O.getAll(U);
              if (D.length === 1)
                j[U] = D[0];
              else
                j[U] = D;
            }
            break;
        }
      else {
        let O = W.headers.get("content-type");
        if (O) {
          const U = O.indexOf(";");
          if (U !== -1)
            O = O.slice(0, U);
          for (let D = 0;D < $.event.parse.length; D++) {
            let I = $.event.parse[D](X, O);
            if (I instanceof Promise)
              I = await I;
            if (I) {
              j = I;
              break;
            }
          }
          if (j === undefined)
            switch (O) {
              case "application/json":
                j = await W.json();
                break;
              case "text/plain":
                j = await W.text();
                break;
              case "application/x-www-form-urlencoded":
                j = c$.parse(await W.text());
                break;
              case "application/octet-stream":
                j = await W.arrayBuffer();
                break;
              case "multipart/form-data":
                j = {};
                const D = await W.formData();
                for (let I of D.keys()) {
                  if (j[I])
                    continue;
                  const G = D.getAll(I);
                  if (G.length === 1)
                    j[I] = G[0];
                  else
                    j[I] = G;
                }
                break;
            }
        }
      }
    X.body = j, X.params = A?.params || undefined, X.query = J === -1 ? {} : c$.parse(Z.substring(J + 1)), X.headers = {};
    for (let [O, U] of W.headers.entries())
      X.headers[O] = U;
    const M = S?.cookie?.schema;
    X.cookie = await n$(X.set, X.headers.cookie, M ? { secret: M.secrets !== undefined ? typeof M.secrets === "string" ? M.secrets : M.secrets.join(",") : undefined, sign: M.sign === true ? true : M.sign !== undefined ? typeof M.sign === "string" ? M.sign : M.sign.join(",") : undefined } : undefined);
    for (let O = 0;O < F.transform.length; O++) {
      const U = F.transform[O](X);
      if (F.transform[O].$elysia === "derive")
        if (U instanceof Promise)
          Object.assign(X, await U);
        else
          Object.assign(X, U);
      else if (U instanceof Promise)
        await U;
    }
    if (S) {
      if (S.headers) {
        const O = {};
        for (let U in W.headers)
          O[U] = W.headers.get(U);
        if (S.headers.Check(O) === false)
          throw new P0("header", S.headers, O);
      }
      if (S.params?.Check(X.params) === false)
        throw new P0("params", S.params, X.params);
      if (S.query?.Check(X.query) === false)
        throw new P0("query", S.query, X.query);
      if (S.cookie) {
        const O = {};
        for (let [U, D] of Object.entries(X.cookie))
          O[U] = D.value;
        if (S.cookie?.Check(O) === false)
          throw new P0("cookie", S.cookie, O);
      }
      if (S.body?.Check(j) === false)
        throw new P0("body", S.body, j);
    }
    for (let O = 0;O < F.beforeHandle.length; O++) {
      let U = F.beforeHandle[O](X);
      if (U instanceof Promise)
        U = await U;
      if (U !== undefined) {
        X.response = U;
        for (let I = 0;I < F.afterHandle.length; I++) {
          let G = F.afterHandle[I](X);
          if (G instanceof Promise)
            G = await G;
          if (G)
            U = G;
        }
        const D = s0(U, X.set);
        if (D)
          return D;
      }
    }
    let P = w(X);
    if (P instanceof Promise)
      P = await P;
    if (!F.afterHandle.length) {
      const O = S?.response?.[P.status];
      if (O?.Check(P) === false)
        throw new P0("response", O, P);
    } else {
      X.response = P;
      for (let O = 0;O < F.afterHandle.length; O++) {
        let U = F.afterHandle[O](X);
        if (U instanceof Promise)
          U = await U;
        const D = s0(U, X.set);
        if (D !== undefined) {
          const I = S?.response?.[P.status];
          if (I?.Check(D) === false)
            throw new P0("response", I, D);
          return D;
        }
      }
    }
    if (X.set.cookie && M?.sign) {
      const O = !M.secrets ? undefined : typeof M.secrets === "string" ? M.secrets : M.secrets[0];
      if (M.sign === true)
        for (let [U, D] of Object.entries(X.set.cookie))
          X.set.cookie[U].value = await t1(D.value, "${secret}");
      else
        for (let U of M.sign) {
          if (!(U in M.properties))
            continue;
          if (X.set.cookie[U]?.value)
            X.set.cookie[U].value = await t1(X.set.cookie[U].value, O);
        }
    }
    return A1(P, X.set);
  } catch (A) {
    if (A.status)
      Y.status = A.status;
    return $.handleError(X, A);
  } finally {
    for (let A of $.event.onResponse)
      await A(X);
  }
};
var oY = ($) => async (W, Y) => {
  const X = Object.assign(W, Y);
  X.set = W.set;
  for (let Z = 0;Z < $.event.error.length; Z++) {
    let Q = $.event.error[Z](X);
    if (Q instanceof Promise)
      Q = await Q;
    if (Q !== undefined && Q !== null)
      return A1(Q, W.set);
  }
  return new Response(typeof Y.cause === "string" ? Y.cause : Y.message, { headers: W.set.headers, status: Y.status ?? 500 });
};
var b1 = Z1(x$(), 1);
var a = Z1(x0(), 1);
try {
  b1.TypeSystem.Format("email", ($) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test($)), b1.TypeSystem.Format("uuid", ($) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test($)), b1.TypeSystem.Format("date", ($) => !Number.isNaN(new Date($).getTime())), b1.TypeSystem.Format("date-time", ($) => !Number.isNaN(new Date($).getTime()));
} catch ($) {
}
var cY = ($) => {
  if (typeof $ === "string")
    switch ($.slice(-1)) {
      case "k":
        return +$.slice(0, $.length - 1) * 1024;
      case "m":
        return +$.slice(0, $.length - 1) * 1048576;
      default:
        return +$;
    }
  return $;
};
var S8 = ($, W) => {
  if (!(W instanceof Blob))
    return false;
  if ($.minSize && W.size < cY($.minSize))
    return false;
  if ($.maxSize && W.size > cY($.maxSize))
    return false;
  if ($.extension)
    if (typeof $.extension === "string") {
      if (!W.type.startsWith($.extension))
        return false;
    } else {
      for (let Y = 0;Y < $.extension.length; Y++)
        if (W.type.startsWith($.extension[Y]))
          return true;
      return false;
    }
  return true;
};
var j7 = b1.TypeSystem.Type("Files", ($, W) => {
  if (!Array.isArray(W))
    return S8($, W);
  if ($.minItems && W.length < $.minItems)
    return false;
  if ($.maxItems && W.length > $.maxItems)
    return false;
  for (let Y = 0;Y < W.length; Y++)
    if (!S8($, W[Y]))
      return false;
  return true;
});
a.FormatRegistry.Set("numeric", ($) => !isNaN(+$));
a.FormatRegistry.Set("ObjectString", ($) => {
  let W = $.charCodeAt(0);
  if (W === 9 || W === 10 || W === 32)
    W = $.trimStart().charCodeAt(0);
  if (W !== 123 && W !== 91)
    return false;
  try {
    return JSON.parse($), true;
  } catch {
    return false;
  }
});
var G1 = { Numeric: ($) => a.Type.Transform(a.Type.Union([a.Type.String({ format: "numeric", default: 0 }), a.Type.Number($)])).Decode((W) => {
  const Y = +W;
  if (isNaN(Y))
    return W;
  return Y;
}).Encode((W) => W), ObjectString: ($, W) => a.Type.Transform(a.Type.Union([a.Type.String({ format: "ObjectString", default: "" }), a.Type.Object($, W)])).Decode((Y) => {
  if (typeof Y === "string")
    try {
      return JSON.parse(Y);
    } catch {
      return Y;
    }
  return Y;
}).Encode((Y) => JSON.stringify(Y)), File: b1.TypeSystem.Type("File", S8), Files: ($ = {}) => a.Type.Transform(a.Type.Union([j7($)])).Decode((W) => {
  if (Array.isArray(W))
    return W;
  return [W];
}).Encode((W) => W), Nullable: ($) => a.Type.Union([a.Type.Null(), $]), MaybeEmpty: ($) => a.Type.Union([a.Type.Null(), a.Type.Undefined(), $]), Cookie: ($, W) => a.Type.Object($, W) };
a.Type.ObjectString = G1.ObjectString;
a.Type.Numeric = G1.Numeric;
a.Type.File = ($ = {}) => G1.File({ default: "File", ...$, extension: $?.type, type: "string", format: "binary" });
a.Type.Files = ($ = {}) => G1.Files({ ...$, elysiaMeta: "Files", default: "Files", extension: $?.type, type: "array", items: { ...$, default: "Files", type: "string", format: "binary" } });
a.Type.Nullable = ($) => G1.Nullable($);
a.Type.MaybeEmpty = G1.MaybeEmpty;
a.Type.Cookie = G1.Cookie;

class l$ {
  config;
  dependencies = {};
  store = {};
  decorators = {};
  definitions = { type: {}, error: {} };
  schema = {};
  event = { start: [], request: [], parse: [], transform: [], beforeHandle: [], afterHandle: [], onResponse: [], trace: [], error: [], stop: [] };
  reporter = new E8;
  server = null;
  getServer() {
    return this.server;
  }
  validator = null;
  router = new K1;
  wsRouter = new K1;
  routes = [];
  staticRouter = { handlers: [], variables: "", map: {}, all: "" };
  wsPaths = {};
  dynamicRouter = new K1;
  lazyLoadModules = [];
  path = "";
  constructor($) {
    this.config = { forceErrorEncapsulation: false, prefix: "", aot: true, strictPath: false, scoped: false, cookie: {}, ...$, seed: $?.seed === undefined ? "" : $?.seed };
  }
  add($, W, Y, X, { allowMeta: Z = false, skipPrefix: Q = false } = { allowMeta: false, skipPrefix: false }) {
    if (typeof W === "string")
      W = [W];
    for (let J of W) {
      if (J = J === "" ? J : J.charCodeAt(0) === 47 ? J : `/${J}`, this.config.prefix && !Q)
        J = this.config.prefix + J;
      if (X?.type)
        switch (X.type) {
          case "text":
            X.type = "text/plain";
            break;
          case "json":
            X.type = "application/json";
            break;
          case "formdata":
            X.type = "multipart/form-data";
            break;
          case "urlencoded":
            X.type = "application/x-www-form-urlencoded";
            break;
          case "arrayBuffer":
            X.type = "application/octet-stream";
            break;
          default:
            break;
        }
      const z = this.definitions.type;
      let A = Y1(X?.cookie ?? this.validator?.cookie, { dynamic: !this.config.aot, models: z, additionalProperties: true });
      if (l0(this.config.cookie ?? {}))
        if (A)
          A.schema = jY(A.schema, this.config.cookie ?? {});
        else
          A = Y1(a.Type.Cookie({}, this.config.cookie), { dynamic: !this.config.aot, models: z, additionalProperties: true });
      const w = { body: Y1(X?.body ?? this.validator?.body, { dynamic: !this.config.aot, models: z }), headers: Y1(X?.headers ?? this.validator?.headers, { dynamic: !this.config.aot, models: z, additionalProperties: true }), params: Y1(X?.params ?? this.validator?.params, { dynamic: !this.config.aot, models: z }), query: Y1(X?.query ?? this.validator?.query, { dynamic: !this.config.aot, models: z }), cookie: A, response: N8(X?.response ?? this.validator?.response, { dynamic: !this.config.aot, models: z }) }, F = I1(this.event, X), S = J.endsWith("/") ? J.slice(0, J.length - 1) : J + "/";
      if (this.config.aot === false) {
        if (this.dynamicRouter.add($, J, { validator: w, hooks: F, content: X?.type, handle: Y }), this.config.strictPath === false)
          this.dynamicRouter.add($, S, { validator: w, hooks: F, content: X?.type, handle: Y });
        this.routes.push({ method: $, path: J, composed: null, handler: Y, hooks: F });
        return;
      }
      const R = nY({ path: J, method: $, hooks: F, validator: w, handler: Y, handleError: this.handleError, onRequest: this.event.request, config: this.config, definitions: Z ? this.definitions.type : undefined, schema: Z ? this.schema : undefined, getReporter: () => this.reporter }), j = this.routes.findIndex((M) => M.path === J && M.method === $);
      if (j !== -1)
        this.routes.splice(j, 1);
      if (this.routes.push({ method: $, path: J, composed: R, handler: Y, hooks: F }), $ === "$INTERNALWS") {
        const M = this.config.strictPath ? undefined : J.endsWith("/") ? J.slice(0, J.length - 1) : J + "/";
        if (J.indexOf(":") === -1 && J.indexOf("*") === -1) {
          const P = this.staticRouter.handlers.length;
          if (this.staticRouter.handlers.push(R), this.staticRouter.variables += `const st${P} = staticRouter.handlers[${P}]\n`, this.wsPaths[J] = P, M)
            this.wsPaths[M] = P;
        } else if (this.wsRouter.add("ws", J, R), M)
          this.wsRouter.add("ws", M, R);
        return;
      }
      if (J.indexOf(":") === -1 && J.indexOf("*") === -1) {
        const M = this.staticRouter.handlers.length;
        if (this.staticRouter.handlers.push(R), this.staticRouter.variables += `const st${M} = staticRouter.handlers[${M}]\n`, !this.staticRouter.map[J])
          this.staticRouter.map[J] = { code: "" };
        if ($ === "ALL")
          this.staticRouter.map[J].all = `default: return st${M}(ctx)\n`;
        else
          this.staticRouter.map[J].code = `case '${$}': return st${M}(ctx)\n${this.staticRouter.map[J].code}`;
        if (!this.config.strictPath) {
          if (!this.staticRouter.map[S])
            this.staticRouter.map[S] = { code: "" };
          if ($ === "ALL")
            this.staticRouter.map[S].all = `default: return st${M}(ctx)\n`;
          else
            this.staticRouter.map[S].code = `case '${$}': return st${M}(ctx)\n${this.staticRouter.map[S].code}`;
        }
      } else if (this.router.add($, J, R), !this.config.strictPath)
        this.router.add($, J.endsWith("/") ? J.slice(0, J.length - 1) : J + "/", R);
    }
  }
  onStart($) {
    return this.on("start", $), this;
  }
  onRequest($) {
    return this.on("request", $), this;
  }
  onParse($) {
    return this.on("parse", $), this;
  }
  onTransform($) {
    return this.on("transform", $), this;
  }
  onBeforeHandle($) {
    return this.on("beforeHandle", $), this;
  }
  onAfterHandle($) {
    return this.on("afterHandle", $), this;
  }
  onResponse($) {
    return this.on("response", $), this;
  }
  trace($) {
    return this.reporter.on("event", V8(() => this.reporter, this.event.trace.length, $)), this.on("trace", $), this;
  }
  addError($, W) {
    return this.error($, W);
  }
  error($, W) {
    switch (typeof $) {
      case "string":
        return W.prototype[o1] = $, this.definitions.error[$] = W, this;
      case "function":
        return this.definitions.error = $(this.definitions.error), this;
    }
    for (let [Y, X] of Object.entries($))
      X.prototype[o1] = Y, this.definitions.error[Y] = X;
    return this;
  }
  onError($) {
    return this.on("error", $), this;
  }
  onStop($) {
    return this.on("stop", $), this;
  }
  on($, W) {
    for (let Y of Array.isArray(W) ? W : [W])
      switch (Y = KY(Y), $) {
        case "start":
          this.event.start.push(Y);
          break;
        case "request":
          this.event.request.push(Y);
          break;
        case "response":
          this.event.onResponse.push(Y);
          break;
        case "parse":
          this.event.parse.splice(this.event.parse.length - 1, 0, Y);
          break;
        case "transform":
          this.event.transform.push(Y);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(Y);
          break;
        case "afterHandle":
          this.event.afterHandle.push(Y);
          break;
        case "trace":
          this.event.trace.push(Y);
          break;
        case "error":
          this.event.error.push(Y);
          break;
        case "stop":
          this.event.stop.push(Y);
          break;
      }
    return this;
  }
  group($, W, Y) {
    const X = new l$({ ...this.config, prefix: "" });
    X.store = this.store;
    const Z = typeof W === "object", Q = (Z ? Y : W)(X);
    if (this.decorators = U1(this.decorators, X.decorators), Q.event.request.length)
      this.event.request = [...this.event.request, ...Q.event.request];
    if (Q.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...Q.event.onResponse];
    return this.model(Q.definitions.type), Object.values(X.routes).forEach(({ method: J, path: z, handler: A, hooks: w }) => {
      if (z = (Z ? "" : this.config.prefix) + $ + z, Z) {
        const F = W, S = w;
        this.add(J, z, A, I1(F, { ...S, error: !S.error ? Q.event.error : Array.isArray(S.error) ? [...S.error, ...Q.event.error] : [S.error, ...Q.event.error] }));
      } else
        this.add(J, z, A, I1(w, { error: Q.event.error }), { skipPrefix: true });
    }), this;
  }
  guard($, W) {
    if (!W)
      return this.event = h$(this.event, $), this.validator = { body: $.body, headers: $.headers, params: $.params, query: $.query, response: $.response }, this;
    const Y = new l$;
    Y.store = this.store;
    const X = W(Y);
    if (this.decorators = U1(this.decorators, Y.decorators), X.event.request.length)
      this.event.request = [...this.event.request, ...X.event.request];
    if (X.event.onResponse.length)
      this.event.onResponse = [...this.event.onResponse, ...X.event.onResponse];
    return this.model(X.definitions.type), Object.values(Y.routes).forEach(({ method: Z, path: Q, handler: J, hooks: z }) => {
      this.add(Z, Q, J, I1($, { ...z, error: !z.error ? X.event.error : Array.isArray(z.error) ? [...z.error, ...X.event.error] : [z.error, ...X.event.error] }));
    }), this;
  }
  use($) {
    if ($ instanceof Promise)
      return this.lazyLoadModules.push($.then((W) => {
        if (typeof W === "function")
          return W(this);
        if (typeof W.default === "function")
          return W.default(this);
        return this._use(W);
      }).then((W) => W.compile())), this;
    else
      return this._use($);
    return this;
  }
  _use($) {
    if (typeof $ === "function") {
      const Z = $(this);
      if (Z instanceof Promise)
        return this.lazyLoadModules.push(Z.then((Q) => {
          if (typeof Q === "function")
            return Q(this);
          if (typeof Q.default === "function")
            return Q.default(this);
          return this._use(Q);
        }).then((Q) => Q.compile())), this;
      return Z;
    }
    const { name: W, seed: Y } = $.config;
    $.getServer = () => this.getServer();
    const X = $.config.scoped;
    if (X) {
      if (W) {
        if (!(W in this.dependencies))
          this.dependencies[W] = [];
        const Q = Y !== undefined ? M8(W + JSON.stringify(Y)) : 0;
        if (this.dependencies[W].some((J) => Q === J))
          return this;
        this.dependencies[W].push(Q);
      }
      if ($.model(this.definitions.type), $.error(this.definitions.error), $.onRequest((Q) => {
        Object.assign(Q, this.decorators), Object.assign(Q.store, this.store);
      }), $.event.trace = [...this.event.trace, ...$.event.trace], $.config.aot)
        $.compile();
      const Z = this.mount($.fetch);
      return this.routes = this.routes.concat(Z.routes), this;
    } else {
      $.reporter = this.reporter;
      for (let Z of $.event.trace)
        this.trace(Z);
    }
    this.decorate($.decorators), this.state($.store), this.model($.definitions.type), this.error($.definitions.error);
    for (let { method: Z, path: Q, handler: J, hooks: z } of Object.values($.routes))
      this.add(Z, Q, J, I1(z, { error: $.event.error }));
    if (!X)
      if (W) {
        if (!(W in this.dependencies))
          this.dependencies[W] = [];
        const Z = Y !== undefined ? M8(W + JSON.stringify(Y)) : 0;
        if (this.dependencies[W].some((Q) => Z === Q))
          return this;
        this.dependencies[W].push(Z), this.event = h$(this.event, U8($.event), Z);
      } else
        this.event = h$(this.event, U8($.event));
    return this;
  }
  mount($, W) {
    if (typeof $ === "function" || $.length === 0 || $ === "/") {
      const Z = typeof $ === "function" ? $ : W, Q = async ({ request: J, path: z }) => Z(new Request("http://a.cc" + z || "/", J));
      return this.all("/", Q, { type: "none" }), this.all("/*", Q, { type: "none" }), this;
    }
    const Y = $.length, X = async ({ request: Z, path: Q }) => W(new Request("http://a.cc" + Q.slice(Y) || "/", Z));
    return this.all($, X, { type: "none" }), this.all($ + ($.endsWith("/") ? "*" : "/*"), X, { type: "none" }), this;
  }
  get($, W, Y) {
    return this.add("GET", $, W, Y), this;
  }
  post($, W, Y) {
    return this.add("POST", $, W, Y), this;
  }
  put($, W, Y) {
    return this.add("PUT", $, W, Y), this;
  }
  patch($, W, Y) {
    return this.add("PATCH", $, W, Y), this;
  }
  delete($, W, Y) {
    return this.add("DELETE", $, W, Y), this;
  }
  options($, W, Y) {
    return this.add("OPTIONS", $, W, Y), this;
  }
  all($, W, Y) {
    return this.add("ALL", $, W, Y), this;
  }
  head($, W, Y) {
    return this.add("HEAD", $, W, Y), this;
  }
  connect($, W, Y) {
    return this.add("CONNECT", $, W, Y), this;
  }
  ws($, W) {
    const Y = W.transformMessage ? Array.isArray(W.transformMessage) ? W.transformMessage : [W.transformMessage] : undefined;
    let X = null;
    const Z = Y1(W?.body, { models: this.definitions.type }), Q = Y1(W?.response, { models: this.definitions.type }), J = (z) => {
      if (typeof z === "string") {
        const A = z?.charCodeAt(0);
        if (A === 47 || A === 123)
          try {
            z = JSON.parse(z);
          } catch {
          }
        else if (!Number.isNaN(+z))
          z = +z;
      }
      if (Y?.length)
        for (let A = 0;A < Y.length; A++) {
          const w = Y[A](z);
          if (w !== undefined)
            z = w;
        }
      return z;
    };
    return this.route("$INTERNALWS", $, (z) => {
      const { set: A, path: w, qi: F, headers: S, query: R, params: j } = z;
      if (X === null)
        X = this.getServer();
      if (X?.upgrade(z.request, { headers: typeof W.upgrade === "function" ? W.upgrade(z) : W.upgrade, data: { validator: Q, open(M) {
        W.open?.(new c1(M, z));
      }, message: (M, P) => {
        const O = J(P);
        if (Z?.Check(O) === false)
          return void M.send(new P0("message", Z, O).message);
        W.message?.(new c1(M, z), O);
      }, drain(M) {
        W.drain?.(new c1(M, z));
      }, close(M, P, O) {
        W.close?.(new c1(M, z), P, O);
      } } }))
        return;
      return A.status = 400, "Expected a websocket connection";
    }, { beforeHandle: W.beforeHandle, transform: W.transform, headers: W.headers, params: W.params, query: W.query }), this;
  }
  route($, W, Y, { config: X, ...Z } = { config: { allowMeta: false } }) {
    return this.add($, W, Y, Z, X), this;
  }
  state($, W) {
    switch (typeof $) {
      case "object":
        return this.store = U1(this.store, $), this;
      case "function":
        return this.store = $(this.store), this;
    }
    if (!($ in this.store))
      this.store[$] = W;
    return this;
  }
  decorate($, W) {
    switch (typeof $) {
      case "object":
        return this.decorators = U1(this.decorators, $), this;
      case "function":
        return this.decorators = $(this.decorators), this;
    }
    if (!($ in this.decorators))
      this.decorators[$] = W;
    return this;
  }
  derive($) {
    return $.$elysia = "derive", this.onTransform($);
  }
  model($, W) {
    switch (typeof $) {
      case "object":
        return Object.entries($).forEach(([Y, X]) => {
          if (!(Y in this.definitions.type))
            this.definitions.type[Y] = X;
        }), this;
      case "function":
        return this.definitions.type = $(this.definitions.type), this;
    }
    return this.definitions.type[$] = W, this;
  }
  mapDerive($) {
    return $.$elysia = "derive", this.onTransform($);
  }
  affix($, W, Y) {
    if (Y === "")
      return this;
    const X = ["_", "-", " "], Z = (A) => A[0].toUpperCase() + A.slice(1), Q = $ === "prefix" ? (A, w) => X.includes(A.at(-1) ?? "") ? A + w : A + Z(w) : X.includes(Y.at(-1) ?? "") ? (A, w) => w + A : (A, w) => w + Z(A), J = (A) => {
      const w = {};
      switch (A) {
        case "decorator":
          for (let F in this.decorators)
            w[Q(Y, F)] = this.decorators[F];
          this.decorators = w;
          break;
        case "state":
          for (let F in this.store)
            w[Q(Y, F)] = this.store[F];
          this.store = w;
          break;
        case "model":
          for (let F in this.definitions.type)
            w[Q(Y, F)] = this.definitions.type[F];
          this.definitions.type = w;
          break;
        case "error":
          for (let F in this.definitions.error)
            w[Q(Y, F)] = this.definitions.error[F];
          this.definitions.error = w;
          break;
      }
    }, z = Array.isArray(W) ? W : [W];
    for (let A of z.some((w) => w === "all") ? ["decorator", "state", "model", "error"] : z)
      J(A);
    return this;
  }
  prefix($, W) {
    return this.affix("prefix", $, W);
  }
  suffix($, W) {
    return this.affix("suffix", $, W);
  }
  compile() {
    if (this.fetch = this.config.aot ? K8(this) : O8(this), typeof this.server?.reload === "function")
      this.server.reload({ ...this.server, fetch: this.fetch });
    return this;
  }
  handle = async ($) => this.fetch($);
  fetch = ($) => (this.fetch = this.config.aot ? K8(this) : O8(this))($);
  handleError = async ($, W) => (this.handleError = this.config.aot ? P8(this) : oY(this))($, W);
  outerErrorHandler = ($) => new Response($.message || $.name || "Error", { status: $?.status ?? 500 });
  listen = ($, W) => {
    if (!Bun)
      throw new Error("Bun to run");
    if (this.compile(), typeof $ === "string") {
      if ($ = +$.trim(), Number.isNaN($))
        throw new Error("Port must be a numeric value");
    }
    const Y = this.fetch, X = typeof $ === "object" ? { development: !N$, ...this.config.serve, ...$, websocket: { ...this.config.websocket, ...X8 }, fetch: Y, error: this.outerErrorHandler } : { development: !N$, ...this.config.serve, websocket: { ...this.config.websocket, ...X8 }, port: $, fetch: Y, error: this.outerErrorHandler };
    if (typeof Bun === "undefined")
      throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
    if (this.server = Bun?.serve(X), this.event.start.length)
      (async () => {
        const Z = Object.assign(this.decorators, { store: this.store, app: this });
        for (let Q = 0;Q < this.event.transform.length; Q++) {
          const J = this.event.transform[Q](Z);
          if (this.event.transform[Q].$elysia === "derive")
            if (J instanceof Promise)
              Object.assign(Z, await J);
            else
              Object.assign(Z, J);
        }
        for (let Q = 0;Q < this.event.start.length; Q++)
          this.event.start[Q](Z);
      })();
    if (W)
      W(this.server);
    return Promise.all(this.lazyLoadModules).then(() => {
      Bun?.gc(false);
    }), this;
  };
  stop = async () => {
    if (!this.server)
      throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
    if (this.server.stop(), this.event.stop.length)
      (async () => {
        const $ = Object.assign(this.decorators, { store: this.store, app: this });
        for (let W = 0;W < this.event.transform.length; W++) {
          const Y = this.event.transform[W]($);
          if (this.event.transform[W].$elysia === "derive")
            if (Y instanceof Promise)
              Object.assign($, await Y);
            else
              Object.assign($, Y);
        }
        for (let W = 0;W < this.event.stop.length; W++)
          this.event.stop[W]($);
      })();
  };
  get modules() {
    return Promise.all(this.lazyLoadModules);
  }
}
var export_t = a.Type;

// node_modules/@elysiajs/html/dist/index.js
var exports_dist = {};
__export(exports_dist, {
  isTagHtml: () => {
    {
      return isTagHtml;
    }
  },
  isHtml: () => {
    {
      return isHtml;
    }
  },
  html: () => {
    {
      return html;
    }
  },
  Html: () => {
    {
      return import_html.Html;
    }
  }
});

// node_modules/@elysiajs/html/dist/html.js
var exports_html = {};
__export(exports_html, {
  html: () => {
    {
      return html;
    }
  }
});
import {Readable as Readable3} from "stream";

// node_modules/@elysiajs/html/dist/handler.js
import {Readable} from "stream";

// node_modules/@elysiajs/html/dist/utils.js
var exports_utils = {};
__export(exports_utils, {
  isTagHtml: () => {
    {
      return isTagHtml;
    }
  },
  isHtml: () => {
    {
      return isHtml;
    }
  }
});
function isHtml(value) {
  if (typeof value !== "string") {
    return false;
  }
  value = value.trim();
  const length = value.length;
  return length >= 7 && value[0] === "<" && value[length - 1] === ">";
}
function isTagHtml(value) {
  return value.trimStart().slice(0, 5).startsWith("<html");
}

// node_modules/@elysiajs/html/dist/handler.js
function handleHtml(value, options, hasContentType) {
  if (value instanceof Promise) {
    return value.then((v) => handleHtml(v, options, hasContentType));
  }
  if (typeof value === "string") {
    if (options.autoDoctype && isHtml(value) && isTagHtml(value)) {
      value = "<!doctype html>" + value;
    }
    return new Response(value, hasContentType ? undefined : { headers: { "content-type": options.contentType } });
  }
  let stream = Readable.toWeb(value);
  if (options.autoDoctype) {
    let first = true;
    stream = stream.pipeThrough(new TransformStream({
      transform(chunk, controller) {
        let str = chunk.toString();
        if (first && isTagHtml(str) && isTagHtml(str)) {
          first = false;
          str = "<!doctype html>" + str;
        }
        controller.enqueue(str);
      }
    }));
  }
  return new Response(stream, hasContentType ? undefined : { headers: { "content-type": options.contentType } });
}

// node_modules/@kitajs/html/suspense.js
var noop = function() {
};
var renderToStream = function(factory, customRid) {
  if (SUSPENSE_ROOT.enabled === false) {
    SUSPENSE_ROOT.enabled = true;
  }
  if (customRid && SUSPENSE_ROOT.resources.has(customRid)) {
    throw new Error(`The provided resource ID is already in use: ${customRid}.`);
  }
  const resourceId = customRid || SUSPENSE_ROOT.requestCounter++;
  const stream = new Readable2({ read: noop });
  stream.rid = resourceId;
  SUSPENSE_ROOT.resources.set(resourceId, {
    stream: new WeakRef(stream),
    running: 0,
    sent: false
  });
  let html;
  try {
    html = factory(resourceId);
  } catch (renderError) {
    stream.push(null);
    SUSPENSE_ROOT.resources.delete(resourceId);
    throw renderError;
  }
  if (typeof html === "string") {
    stream.push(html);
    const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
    if (!updatedResource || updatedResource.running === 0) {
      stream.push(null);
      SUSPENSE_ROOT.resources.delete(resourceId);
    }
    return stream;
  }
  html.then(function writeStreamHtml(html2) {
    stream.push(html2);
  }).catch(function catchError(error) {
    if (stream.emit("error", error) === false) {
      console.error(error);
    }
  }).finally(function endStream() {
    const updatedResource = SUSPENSE_ROOT.resources.get(resourceId);
    if (!updatedResource || updatedResource.running === 0) {
      stream.push(null);
      SUSPENSE_ROOT.resources.delete(resourceId);
    }
  });
  return stream;
};
var { contentsToString } = require_html();
var { Readable: Readable2 } = import.meta.require("stream");
if (!globalThis.SUSPENSE_ROOT) {
  globalThis.SUSPENSE_ROOT = {
    resources: new Map,
    requestCounter: 1,
    enabled: false,
    autoScript: true
  };
}
var SuspenseScript = `
      <script>
        /* Apache-2.0 https://kita.js.org */
        function \$RC(s){
          var d=document,
            q=d.querySelector.bind(d),
            n=q('template[id="N:'+s+'"][data-sr]'),
            o=q('div[id="B:'+s+'"][data-sf]'),
            f=d.createDocumentFragment(),
            g=q('script[id="S:'+s+'"][data-ss]'),
            c;

          if(n&&o){
            while(c=n.content.firstChild)
              f.appendChild(c);
            o.parentNode.replaceChild(f,o);
            n.remove()
          }

          g&&g.remove()
        }
      </script>
    `.replace(/\n\s*/g, "");
var $renderToStream = renderToStream;

// node_modules/@elysiajs/html/dist/html.js
function html(options = {}) {
  options.contentType ??= "text/html; charset=utf8";
  options.autoDetect ??= true;
  options.isHtml ??= isHtml;
  options.autoDoctype ??= true;
  let instance = new l$({ name: "@elysiajs/html" }).derive(({ set }) => {
    return {
      html(value, ...args) {
        if (typeof value === "function") {
          value = $renderToStream((rid) => value(rid, ...args));
        }
        return handleHtml(value, options, "content-type" in set.headers);
      }
    };
  });
  if (options.autoDetect) {
    instance = instance.onAfterHandle(function handlerPossibleHtml({ response: value, set }) {
      if (isHtml(value) || value instanceof Readable3 && ("rid" in value)) {
        return handleHtml(value, options, "content-type" in set.headers);
      }
      return value;
    });
  }
  return instance;
}
// node_modules/@elysiajs/html/dist/options.js
var exports_options = {};

// node_modules/@elysiajs/html/dist/index.js
__reExport(exports_dist, __toESM(require_register(), 1));
var import_html = __toESM(require_html(), 1);

// src/invoice.tsx
var import_dayjs = __toESM(require_dayjs_min(), 1);
var Invoice = ({
  invoiceNumber,
  currentDate,
  dueDate,
  dueBalance,
  days
}) => Html.createElement("html", null, Html.createElement("head", null, Html.createElement("title", null, "Invoice")), Html.createElement("style", null, `
    @page {
	size: A4;

    }
* {
margin: 0;
padding: 0;
box-sizing: border-box;
 }
body {
font-family: Arial, Helvetica, sans-serif;
-webkit-print-color-adjust:exact !important;
  print-color-adjust:exact !important;
}
.bold {
	font-weight: bold;
}
.title, .summary {
display: flex;
justify-content: space-between;
margin-bottom: 4rem;
}

hgroup {
text-align: right;
}
h1 {
font-size: 3rem;
}
hgroup > h2 {
font-size: 1rem;
color: #666;
margin-top: 0.5rem;
}
.myInfo {
margin-top: 0.5rem;
}
.billTo > span{
color: #666;
}
.balance{
display: flex;
flex-direction: column;
gap: 0.5rem;
min-width: 30%;
}
.balance > div {
display: flex;
justify-content: end;
gap: 2rem;
padding: 0.5rem 1rem;
border-radius: 0.25rem;
}
.balance p {
text-align: right;
}
.gray-bg {
background-color: #eee;
}
`), Html.createElement("body", null, Html.createElement("header", null, Html.createElement("div", {
  class: "title"
}, Html.createElement("div", {
  class: "myInfo"
}, Html.createElement("p", {
  class: "bold"
}, "JOAO PEDRO PIN PORTA 40174460864"), Html.createElement("p", null, "R LUIS ROBERTO GOES, 176, G-17"), Html.createElement("p", null, "PARQUE BRASIL 500 - PAULINIA - SP"), Html.createElement("p", null, "Zip Code: 13.141-064")), Html.createElement("hgroup", null, Html.createElement("h1", null, "INVOICE"), Html.createElement("h2", null, "#", invoiceNumber))), Html.createElement("div", {
  class: "summary"
}, Html.createElement("div", {
  class: "billTo"
}, Html.createElement("span", null, "Bill To:"), Html.createElement("p", {
  class: "bold",
  style: "margin-top: 0.5rem;"
}, "Avodah, Inc. (Corporate)"), Html.createElement("p", null, "Office Address: 1600 SOLANA BLVD, SUITE 8110,"), Html.createElement("p", null, "WESTLAKE, TX 76262"), Html.createElement("p", null, "Phone: 817.588.7100")), Html.createElement("div", {
  class: "balance"
}, Html.createElement("div", {
  class: "row"
}, Html.createElement("p", null, "Date:"), Html.createElement("p", null, currentDate)), Html.createElement("div", {
  class: "row"
}, Html.createElement("p", null, "Due Date:"), Html.createElement("p", null, dueDate)), Html.createElement("div", {
  class: "row gray-bg"
}, Html.createElement("p", {
  class: "bold"
}, "Balance Due:"), Html.createElement("p", {
  class: "bold"
}, dueBalance))))), Html.createElement("main", null, Html.createElement("table", {
  style: "width: 100%"
}, Html.createElement("thead", {
  style: "background-color: #444; color: white"
}, Html.createElement("tr", null, Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, "Item"), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, "Quantity"), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, "Rate"), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, "Amount"))), Html.createElement("tbody", null, Html.createElement("tr", null, Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, Html.createElement("p", {
  class: "bold"
}, "Summary:"), Html.createElement("p", {
  style: "color: #666"
}, days, " days * 8 hours * US$50/hour = ", dueBalance)), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, "1"), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, dueBalance), Html.createElement("td", {
  style: "padding: 0.5rem 1rem;border: none;"
}, dueBalance)))), Html.createElement("div", {
  class: "balance",
  style: "margin-left: auto; margin-top: 2rem;"
}, Html.createElement("div", {
  class: "row"
}, Html.createElement("p", null, "Subtotal:"), Html.createElement("p", {
  style: "min-width: 8rem;"
}, dueBalance)), Html.createElement("div", {
  class: "row"
}, Html.createElement("p", null, "Tax:"), Html.createElement("p", {
  style: "min-width: 8rem;"
}, "US$ 0,00")), Html.createElement("div", {
  class: "row"
}, Html.createElement("p", null, "Total:"), Html.createElement("p", {
  style: "min-width: 8rem;"
}, dueBalance)))), Html.createElement("footer", null, Html.createElement("p", {
  style: "color: #666; margin-bottom: 0.5rem"
}, "Notes:"), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Benificiary"), Html.createElement("p", null, "JOAO PEDRO PIN PORTA 40174460864")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Address"), Html.createElement("p", null, "Campinas, Brazil")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "IBAN"), Html.createElement("p", null, "JOAO PEDRO PIN PORTA 40174460864")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Benificiary"), Html.createElement("p", null, "BR1178632767000010005264481C1")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "SWIFT Code"), Html.createElement("p", null, "OURIBRSPXXX")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Branch Code"), Html.createElement("p", null, "00001")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Bank Name"), Html.createElement("p", null, "BANCO OURINVEST S.A")), Html.createElement("div", {
  style: "margin-bottom: 1rem;"
}, Html.createElement("p", null, "Bank Address"), Html.createElement("p", null, "Sao Paulo, Brazil")))));
var invoicePlugin = new l$({ prefix: "/invoice" }).use(html()).get("/", ({ query: { days, rate } }) => days && rate ? Html.createElement(Invoice, {
  invoiceNumber: import_dayjs.default(new Date).format("YYYYMMDD"),
  currentDate: import_dayjs.default(new Date).format("MMM DD, YYYY"),
  dueDate: import_dayjs.default(new Date).add(15, "days").format("MMM DD, YYYY"),
  dueBalance: (Number(days) * 8 * Number(rate)).toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  }),
  days: days.toString()
}) : Html.createElement("p", null, "Missing info"));

// src/index.ts
var app = new l$().use(invoicePlugin).get("/", () => "Hello Elysia").listen(Bun.env.PORT || 3000);
console.log(`\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
