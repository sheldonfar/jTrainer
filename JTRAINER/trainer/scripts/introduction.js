var introduction = function () {
    this.preDispatch = function () {
		
    }

    this.postDispatch = function () {
		$('div.flag-icon').each(function() {
			$(this).attr('onclick', 'window.location.href = \'?lang=\' + $(this).attr("id")');
		});
		//alert(Rotator.getStepsCount());
    }

    this.mustache = function () {
        return {
			STEPS_COUNT: Rotator.getStepsCount()
		}
    }
}