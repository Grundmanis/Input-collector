/**
 * Input-Collector: a jQuery plugin for form element collecting
 * Copyright 2016 Armand Grundmanis
 * Version 1.0;
 * @copyright Armand Grundmanis
 * @author agrundmanis@inbox.lv
 * @version 1.0
 * @requires jQuery v2.1.1 - http://jquery.com/
 */
(function ( $ ) {

    $.fn.inputCollector = function( options ) {

        var settings = $.extend({
                inputs: true, // collect inputs
                textareas: true, // collect textarea
                selects: true, // collect textarea
                only_visible: false, // all visible
                allow_empty: false, // allow empty
                also_take_by_name: [],
                ajax:  {
                    dataType: 'json',
                    url: false,
                    data: false,
                    method: 'post'
                },
                by_class : false,
                only_required : false
            }, options),
            ajax_default_dataType = 'json',
            ajax_default_method = 'post',
            required = (settings.only_required ? '[required]' : ''),
            visible = (settings.only_visible ? ':visible' : ''),
            class_name = (settings.by_class ? '.' + settings.by_class : ''),
            also = '';
            if (settings.also_take_by_name.length) {
                $.each(settings.also_take_by_name, function(k,v) {
                    also += ', [name='+v+']';
                });
            }
            var inputs = (settings.inputs ? $(this).find('input'+class_name+required+visible+also) : ''),
            textarea = (settings.textareas ? $(this).find('textarea'+class_name+required+visible) : ''),
            select = (settings.selects ? $(this).find('select'+class_name+required+visible) : ''),
            all_values = [],
            $this = $(this);

        if (inputs != '') {
            $.each(inputs, function(k,v) {
                var input = $(v);
                // if empty=false go back
                if (!settings.allow_empty && input.val() == '') {
                    return;
                }
                if (input.attr('name') == '' || input.attr('name') == null || input.attr('name') == false || input.attr('name') == 'undefined') {
                    //error fields
                }
                else {
                    if (input.attr('name').indexOf(']') >= 0) {
                        var name = input.attr('name').replace('[]',''),
                            lng = $(all_values[name]).length;

                        if (lng == 0) {
                            all_values[name] = [];
                            all_values[name][0] = input.val();
                        }
                        else {
                            all_values[name][lng] = input.val();
                        }

                    }
                    else {
                        all_values[input.attr('name')] = input.val();
                    }
                }

            });
        }
        if (textarea != '') {
            $.each(textarea, function(k,v) {
                var textarea = $(v);
                // if empty=false go back
                if (!settings.allow_empty && textarea.val() == '') {
                    return;
                }
                all_values[textarea.attr('name')] = textarea.val();
            });
        }
        if (select != '') {
            $.each(select, function(k,v) {
                var select = $(v);
                all_values[select.attr('name')] = select.val();
            });
        }

        if (!Object.keys(all_values).length) return;

        if (options.ajax) {
            if (!settings.ajax.url) {
                console.error('Write in "inputCollector" script parameter: url');
            }
            else {
                var ajax_default_url = settings.ajax.url;

                if (settings.ajax.dataType) {
                    ajax_default_dataType = settings.ajax.dataType;
                }
                if (settings.ajax.method) {
                    ajax_default_method = settings.ajax.method;
                }

                var obj = $.extend({}, all_values);

                if (settings.ajax.data) {
                    var ajax_default_data = $.extend(obj, settings.ajax.data);
                } else {
                    ajax_default_data = obj;
                }

                $.ajax({
                    dataType: ajax_default_dataType,
                    url: ajax_default_url,
                    data: ajax_default_data,
                    method: ajax_default_method,
                    success: function(result) {
                        //
                    }
                });
            }
        }

        return all_values;

    };

}( jQuery ));
