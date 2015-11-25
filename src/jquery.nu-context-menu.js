/**
 * nuContextMenu - jQuery Plugin
 * Copyright (c) 2015, Alex Suyun
 * Copyrights licensed under The MIT License (MIT)
 */
;
(function($, window, document, undefined) {

  'use strict';

  var plugin = 'nuContextMenu';

  var defaults = {
    hideAfterClick: false,
    contextMenuClass: 'nu-context-menu',
    activeClass: 'active'
  };

  var nuContextMenu = function(container, options) {
    this.container = $(container);
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = plugin;
    this.init();
  };

  $.extend(nuContextMenu.prototype, {
    init: function() {

      if (this.options.items) {
        this.items = $(this.options.items);
      }

      if (this._buildContextMenu()) {
        this._bindEvents();
        this._menuVisible = this._menu.hasClass(this.options.activeClass);
      }
    },

    _getCallback: function() {
      return ((this.options.callback && typeof this.options.callback ===
        'function') ? this.options.callback : function() {});
    },

    _buildContextMenu: function() {

      if (!this.options.menu || typeof this.options.menu !==
        'object') {
        return false;
      }

      // Create context menu
      this._menu = $('<div>')
        .addClass(this.options.contextMenuClass)
        .append('<ul>');

      var menuObject = this.options.menu,
        menuList = this._menu.children('ul');

      // Create menu items 
      $.each(menuObject, function(key, value) {

        var item;

        if (value === 'separator') {
          item = $('<hr>');
        }

        if (value && typeof value === 'object') {

          item = $('<li>')
            .attr('data-key', key)
            .text(' ' + value.title);

          // Font-awesome support
          if (value.icon) {
            var icon = $('<i>')
              .addClass('fa fa-' + value.icon.toString());
            item.prepend(icon);
          }

        }

        menuList.append(item);

      });

      $('body')
        .append(this._menu);

      return true;

    },

    _pDefault: function(event) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    },

    _contextMenu: function(event) {

      event.preventDefault();

      // Store the value of this
      // So it can be used in the listItem click event
      var _this = this;
      var element = event.target;

      if (this._menuVisible || this.options.disable) {
        return false;
      }

      var callback = this._getCallback();
      var listItems = this._menu.children('ul')
        .children('li');

      listItems.off()
        .on('click', function() {

          var key = $(this)
            .attr('data-key');
          callback(key, element);
          if (_this.options.hideAfterClick) {
            _this.closeMenu();
          }
        });

      this.openMenu();
      this._menu.css({
        'top': event.pageY + 'px',
        'left': event.pageX + 'px'
      });

      return true;
    },

    _onMouseDown: function(event) {
      // Remove menu if clicked outside
      if (!$(event.target)
        .parents('.' + this.options.contextMenuClass)
        .length) {
        this.closeMenu();
      }
    },

    _bindEvents: function() {

      if (this.items) {
        this.items.on('contextmenu', $.proxy(this._contextMenu,
          this));
        this.container.on('contextmenu', $.proxy(this._pDefault,
          this));
      } else {
        this.container.on('contextmenu', $.proxy(this._contextMenu,
          this));
      }

      // Remove menu on click 
      $(document)
        .on('mousedown', $.proxy(this._onMouseDown, this));

    },

    disable: function() {
      this.options.disable = true;
      return true;
    },

    openMenu: function() {
      this._menu.addClass(this.options.activeClass);
      this._menuVisible = true;
      return true;
    },

    closeMenu: function() {
      this._menu.removeClass(this.options.activeClass);
      this._menuVisible = false;
      return true;
    }

  });

  $.fn[plugin] = function(options) {
    var args = Array.prototype.slice.call(arguments, 1);

    return this.each(function() {
      var item = $(this),
        instance = item.data(plugin);
      if (!instance) {
        item.data(plugin, new nuContextMenu(this, options));
      } else {

        if (typeof options === 'string' && options[0] !== '_' &&
          options !== 'init') {
          instance[options].apply(instance, args);
        }
      }
    });
  };

})(jQuery, window, document);