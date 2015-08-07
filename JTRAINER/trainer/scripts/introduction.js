var introduction = function () {
    this.preDispatch = function () {
	
    }

    this.postDispatch = function () {
		$('img[name="langs"]').each(function() {
			$(this).attr('onclick', 'window.location.href = \'?lang=\' + $(this).attr("alt")');
		});
    }

    this.mustache = function () {
        return {
		}
    }
}