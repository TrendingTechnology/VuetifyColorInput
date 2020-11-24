(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VuetifyColorInput = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var Component = {
    name: 'VColorInput',
    inheritAttrs: false,
    props: {
      appendIcon: String,
      cancelText: {
        type: String,
        "default": 'Cancel'
      },
      clearable: Boolean,
      clearIcon: {
        type: String,
        "default": '$clear'
      },
      color: String,
      dark: Boolean,
      disabled: Boolean,
      error: Boolean,
      errorCount: {},
      errorMessages: {},
      hideDetails: [Boolean, String],
      hint: {},
      id: {},
      label: String,
      light: Boolean,
      loading: Boolean,
      messages: {},
      noAlpha: Boolean,
      persistentHint: Boolean,
      prependIcon: {},
      readonly: Boolean,
      rules: {},
      saveText: {
        type: String,
        "default": 'Save'
      },
      success: Boolean,
      successMessages: {},
      validateOnBlur: Boolean,
      value: {}
    },
    data: function data() {
      return {
        menuActive: false,
        lazyValue: this.value
      };
    },
    computed: {
      hasLabel: function hasLabel() {
        return !!this.label;
      },
      hasValue: function hasValue() {
        return !!this.valueAsInstance;
      },
      valueAsInstance: function valueAsInstance() {
        var value = this.lazyValue;

        if (value) {
          var instance = this.parseColor(value);
          var _instance$rgba = instance.rgba,
              r = _instance$rgba.r,
              g = _instance$rgba.g,
              b = _instance$rgba.b,
              a = _instance$rgba.a;
          var object;
          var string;

          if (this.noAlpha) {
            object = {
              r: r,
              g: g,
              b: b
            };
            string = instance.hex;
          } else {
            object = {
              r: r,
              g: g,
              b: b,
              a: a
            };

            if (a < 1) {
              string = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
            } else {
              string = instance.hex;
            }
          }

          return {
            toObject: function toObject() {
              return object;
            },
            toString: function toString() {
              return string;
            }
          };
        }

        return null;
      },
      valueAsObject: function valueAsObject() {
        var value = this.valueAsInstance;

        if (value) {
          return value.toObject();
        }

        return {
          r: 0,
          g: 0,
          b: 0,
          a: 0
        };
      },
      valueAsString: function valueAsString() {
        var value = this.valueAsInstance;

        if (value) {
          return value.toString();
        }

        return null;
      }
    },
    watch: {
      value: function value(_value) {
        this.lazyValue = _value;
      }
    },
    beforeCreate: function beforeCreate() {
      var _this$$createElement$ = _slicedToArray(this.$createElement('VColorPicker').componentOptions.Ctor.options.watch.value, 1),
          handler = _this$$createElement$[0].handler;

      this.parseColor = function (value) {
        var result;
        handler.call({
          updateColor: function updateColor(value) {
            result = value;
          }
        }, value);
        return result;
      };
    },
    methods: {
      updateValue: function updateValue(value) {
        this.lazyValue = value;
        this.$emit('update:value', this.valueAsString);
      }
    },
    render: function render(h) {
      var _this = this;

      return h('div', {
        style: {
          display: 'flex'
        }
      }, [h('VInput', {
        props: {
          appendIcon: this.appendIcon,
          color: this.color,
          disabled: this.disabled,
          error: this.error,
          errorCount: this.errorCount,
          errorMessages: this.errorMessages,
          hideDetails: this.hideDetails,
          hint: this.hint,
          id: this.id,
          loading: this.loading,
          messages: this.messages,
          persistentHint: this.persistentHint,
          prependIcon: this.prependIcon,
          readonly: this.readonly,
          rules: this.rules,
          success: this.success,
          successMessages: this.successMessages,
          validateOnBlur: this.validateOnBlur
        },
        on: _objectSpread2({}, function (object, keys) {
          return keys.reduce(function (result, key) {
            var value = object[key];

            if (value !== undefined) {
              result[key] = value;
            }

            return result;
          }, {});
        }(this.$listeners, ['click:append', 'click:prepend', 'update:error'])),
        scopedSlots: _objectSpread2({}, function (object, keys) {
          return keys.reduce(function (result, key) {
            var value = object[key];

            if (value !== undefined) {
              result[key] = value;
            }

            return result;
          }, {});
        }(this.$scopedSlots, ['append', 'message', 'prepend']))
      }, [h('VMenu', {
        ref: 'menu',
        props: {
          closeOnContentClick: false,
          offsetY: true,
          returnValue: this.valueAsObject,
          value: this.menuActive
        },
        on: {
          'input': function input(value) {
            _this.menuActive = value;
          },
          'update:return-value': this.updateValue
        },
        scopedSlots: {
          'activator': function activator(_ref) {
            var attrs = _ref.attrs,
                on = _ref.on;
            return h('div', {
              attrs: attrs,
              style: {
                alignItems: 'center',
                display: 'grid',
                gap: '8px',
                gridTemplateColumns: 'auto 1fr',
                userSelect: 'none'
              },
              on: on
            }, [h('div', {
              style: {
                background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat',
                borderRadius: '50%',
                height: '24px',
                overflow: 'hidden',
                width: '24px'
              }
            }, _this.hasValue ? [h('div', {
              style: {
                background: _this.valueAsString,
                height: '100%',
                width: '100%'
              }
            })] : [])].concat(_toConsumableArray(_this.$scopedSlots.label ? _this.$scopedSlots.label() : _this.hasLabel ? [h('div', {
              "class": 'text--secondary'
            }, _this.label)] : [])));
          },
          "default": function _default() {
            return h('VCard', [h('VColorPicker', {
              props: {
                flat: true,
                hideInputs: true,
                value: _this.valueAsObject
              },
              on: {
                input: _this.updateValue
              }
            }), h('VCardActions', [].concat(_toConsumableArray(_this.clearable ? [h('VBtn', {
              props: {
                icon: true
              },
              on: {
                click: function click() {
                  _this.$refs.menu.save(null);
                }
              }
            }, [h('VIcon', _this.clearIcon)])] : []), [h('VSpacer'), h('VBtn', {
              props: {
                text: true
              },
              on: {
                click: function click() {
                  _this.menu = false;
                }
              }
            }, _this.cancelText), h('VBtn', {
              props: {
                color: 'primary',
                text: true
              },
              on: {
                click: function click() {
                  _this.$refs.menu.save(_this.valueAsObject);
                }
              }
            }, _this.saveText)]))]);
          }
        }
      })])]);
    }
  };

  var _globalThis$window, _globalThis$window$Vu;
  (_globalThis$window = globalThis.window) === null || _globalThis$window === void 0 ? void 0 : (_globalThis$window$Vu = _globalThis$window.Vue) === null || _globalThis$window$Vu === void 0 ? void 0 : _globalThis$window$Vu.component(Component.name, Component);

  return Component;

})));
