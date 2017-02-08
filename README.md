# nuContextMenu
A modern context menu with font awesome support for web apps.
The script is extremely light weight (2.2 kB), and it treats the menu as the primary object.
This means that a single menu can be attached to multiple elements.

# Installation 
Use npm

    npm i jquery-nucontextmenu

or include the following files from the `src`-foler

    <script type="text/javascript" src="path/to/src/jquery.nu-context-manu.js"></script>
    <link rel="stylesheet" href="path/to/src/nu-context-menu.css"/>

Remember, that you should include [FontAwesome](http://fontawesome.io/) and [jQuery](https://jquery.com/) before this plugin.

# Code Example
``` javascript
$(function() {
  var context = $('#node')
    .nuContextMenu({

      hideAfterClick: true,

      items: '.demo-item',

      callback: function(key, element) {
        alert('Clicked ' + key + ' on ' + $(element)
          .attr('id'));
      },

      menu: [
        {
          name: 'archive',
          title: 'Archive',
          icon: 'archive',
        },
        {
          name: 'mark',
          title: 'Mark as read',
          icon: 'check',
        },
        {
          name: 'void'
        },
        {
          name: 'delete',
          title: 'Delete',
          icon: 'trash',
        },
      ]

    });

  // Disable context menu
  // context.nuContextMenu('disable');

  // Remove context menu
  // context.nuContextMenu('destroy');

});
```

## Guide
Initialize the context menu and store it as a variable.
Here `#node` is the parent item, containing all the elements with a custom context menu.

    var context = $('#node').nuContextMenu({
      ...
    });

The elements with the custom context menu is set by adding the following atribute inside the `.nuContextMenu`.
This will set the element type or class, that will have the custom context menu.

    items: '.demo-item'

To set what elements are in the context menu set the following atribute.

    menu : []

Inside `menu`, create an object with the following structure.

    {
      name: '',
      title: '',
      icon: ''
    }

Where `name` sets the name used when using `callback`, `title` is the text that is written in the menu and `icon` is the name of the font-awesome icon(without the `fa-`).

To setup `callback` set the following atribute.

    callback: function(key, element) {}

This will be called on all clicks on elements in the context menu. The value `key` is the value `name` from the `menu` and `element` is the element, originally right clicked on, as a jQuery element.

# Screenshots
![Screenshot] (https://cloud.githubusercontent.com/assets/13611918/10264217/117b0946-69d3-11e5-8914-e00c391065e1.png)

# License
The MIT License (MIT)

Copyright (c) 2015 Alex Suyun

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
