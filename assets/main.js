$(function () { $('#tree').jstree({
    'core' : {
        'check_callback': function (operation, node, node_parent, node_position, more) {
			// operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
            // in case of 'rename_node' node_position is filled with the new node name

            if (operation==='move_node') {

                return more.pos === 'i' || more.pos === undefined ? true : false;

            }

            return false;
        },
        'data':  function (node, cb) {

            if (node.id==='#') {
                cb.call(this, [
                    {
                        'id': 'null',
                        'text': 'Root',
                        'compNumber': 0,
                        'number': 0,
                        'children': true
                    }
                ]);

                return;
            }
            var suffix = node.id === 'null' ? '' : '/'+node.id;
            var parentNumber = node.id === 'null' ? 0 : node.original.compNumber;

            $.getJSON('/api/get'+suffix, function (response) {

                response.map((v) => {

                    var compNumber = parentNumber + v.number;
                    v.parent = v.parentId == null ? 'null' : v.parentId+'';
                    v.compNumber = compNumber;
                    v.text = v.number + ' (' + compNumber + ')';
                    v.children = true;
                });

                cb.call(this, response);

            })

        }
    },
    'contextmenu': {
        'select_node': true,
        'items': {
            'edit': {
                'label': 'Edit number',
                'action': (ref) => {

                    var node = $('#tree').jstree(true).get_node(ref.reference)
                    var number = node.original.number;
                    var newNumber = parseInt(prompt("Enter new number", number+""));

                    if (isNaN(newNumber)) {
                        alert("Wprowadź liczbę!");
                        return;
                    }

                    $.post ({
                        url: '/api/update',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify ({
                            id: node.original.id,
                            parentId: node.original.parentId,
                            number: newNumber
                        }),
                        success: (response) => {
                            
                            var parentNode = $('#tree').jstree(true).get_node(node.parent);
                            var compNumber = parentNode.original.compNumber + response.number;
                            node.original.number = response.number;
                            node.original.compNumber = compNumber;
                            node.text = response.number + ' ('+ compNumber + ')';
                            $('#tree').jstree(true).refresh_node(node);
                        }
                    });
                }
            },
            'delete': {
                'label': 'Delete branch',
                'action': (ref) => {
                    
                    var node = $('#tree').jstree(true).get_node(ref.reference);
                    var parentNode = $('#tree').jstree(true).get_node(node.parent);

                    $.post ({

                        url: '/api/delete/'+node.original.id,
                        success: () => {
                            
                            $('#tree').jstree(true).refresh_node(parentNode);
                        
                        }
                    });
                }
            },
            'create': {
                'label': 'Create child',
                'action': (ref) => {

                    var node = $('#tree').jstree(true).get_node(ref.reference);
                    var newNumber = parseInt(prompt("Enter new number", 0 + ""));

                    if (isNaN(newNumber)) {
                        alert("Wprowadź liczbę!");
                        return;
                    }

                    $.post ({

                        url: '/api/create',
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify ({
                            parentId: node.id === 'null' ? null : node.original.id,
                            number: newNumber
                        }),
                        success: (response) => {
                            
                            node.state.opened = true;
                            $('#tree').jstree(true).refresh_node(node);
                        
                        }
                    });

                }
            }
        }

    },
    'dnd': {
        'copy': false,
        'search_leaves_only': true
    },
    'plugins': ['contextmenu', 'dnd']
    
}) });
$("#tree").bind("move_node.jstree", (e, data)=>{

    var node = data.node;
    var parent = $('#tree').jstree(true).get_node(data.parent);

    $.post ({
        url: '/api/update',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify ({
            id: node.original.id,
            parentId: parent.original.id,
            number: node.original.number
        }),
        success: (response) => {
            
            parent.state.opened = true;
            $('#tree').jstree(true).refresh_node(parent);
        }
    });

});
