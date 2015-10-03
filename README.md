# nuContextMenu
A modern context menu with font awesome support for web apps. 
The script is extremely light weight (2.2 kB), and it treats the menu as the primary object.
This means that a single menu can be attached to multiple elements.


# Code Example
```
$(function() {
    var context = $('#node').nuContextMenu({

        items: '.item',

        callback: function(key, element) {
            alert('Clicked ' + key + ' on ' + $(element).attr('id'));
        },
        
        // Define menu items here
        // key: {...}
        menu: {

            'archive': {
                title: 'Archive',
                // Font awesome icons here
                icon: 'archive',
            },

            'mark': {
                title: 'Mark as read',
                icon: 'check',
            },

            // If the value is 'separator' then an 
            // <hr> node is added
            'void': 'separator',

            'delete': {
                title: 'Delete',
                icon: 'trash',
            },
        }
    });
    
    // Disable context menu
    // context.nuContextMenu('disable');

});
```
# Screenshots
![Screenshot] (https://cloud.githubusercontent.com/assets/13611918/10264217/117b0946-69d3-11e5-8914-e00c391065e1.png)





