var args = arguments[0] || {};
$.thumbnail.image = args.image; // will be undefined if there is no arguments, e.i. arguments[0] == falsy
$.title.text = args.title || '';
$.authors.text = args.authors || '';