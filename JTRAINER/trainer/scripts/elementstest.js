var VElements;// A variable for future validator
var elementstest = function () {
    var plot = null;
    this.preDispatch = function (callback) {
         var w = new WolframAlpha(); // Making a call to wolfram api to build a plot
         w.setQuery('3x2+2x+5').plot(function (data) {
             plot = '<img src="' + data + '">';
             callback();
         });
		
		
    }

    this.postDispatch = function () {
        VElements = new Validator();
		//first param - DOM object, second - correct value or array of values, third - if there are multiple correct answers
		//fourth - if you need to have 2 answers at the same time to be entered
        VElements.addValidator($('select[name="test-select"]'), 2)
            .addValidator($('input[name="test-textinput"]'), ['test', 'Text'], false, true) //It means user is required to enter both 'test' and 'text' separated by comas. They will be validated separately
            .addValidator($('div.droppable[name="test-droppable"]'), ['one', 'four'], false, true) //<----- Please, don't use numbers as values if you want multiple answers at same time
			.addValidator($('input[name="test-input1"]'), ['1','4'],true, false) // It means 1 and 4 will be correct
			.addValidator($('input[name="test-radios"]'), 'fourr')
			.addValidator($('input[name="test-input"]'), 4.5) // Either 4.5 and 4,5 will be correct
			.addValidator($('input[name="test-checkbox1"]'), "test1")
			.addValidator($('input[name="test-checkbox2"]'), "test2")
            .setStrictMode(true) // Restrict number of attempts to 3 (default)
            .setIgnoreCase(false) // Ignore letter case (eg. TEXT, text)
			.enableStepFinishAlert(true); // Enable showing alert after step is done
			//.disableAnswersBacklight(true); //-- Disable green/red color of correct/incorrect answers
		$('button.check').click(function () {			
			VElements.fixRadio('test-radios'); // This is how you make radio buttons work
			VElements.fixCheckbox('test-checkbox1', false); // This is how you make checkboxes work. Second param - if you want un-checked state to be correct answer
			VElements.fixCheckbox('test-checkbox2', true); // This is how you make checkboxes work. Second param - if you want un-checked state to be correct answer
			
			VElements.setAttemptsOnCheckButton($(this)); //dynamically changing amount of attempts left on check button
			VElements.validate(); // validate the validators
			
			
			/* IN ACTIVE DEVELOPMENT 
			$('div.draggable').each(function() {
				$(this).resizeText({ maxFontPixels: 50 });
			});
			*/
			
        });
    }

    this.mustache = function () {
        return {
            TEST_SELECT: new Select('test-select')
                .addOption('{{ELEMENTSTEST_OPTION_ONE}}', 0)
                .addOption('{{ELEMENTSTEST_OPTION_TWO}}', 1)
                .addOption('{{ELEMENTSTEST_OPTION_THREE}}', 2)
				//.randomize() -- You can randomize select choice elements
                .render(),
            TEST_DROPPABLE: new DroppableArea('test-droppable')
                .addClass('input')
                .render(),
            TEST_DRAGGABLE: new DraggableGroup('test-draggable')
                .addClass('value')
                .addOption('Answer 1', 'one')
                .addOption('Answer 2', 'two')
                .addOption('Answer 3', 'three')
                .addOption('Answer 4', 'four')
				.randomize() // You can randomize draggable elements
                .render(),
		    TEST_INPUT1: new TextInput('test-input1')
                .render(),
            TEST_TEXTINPUT: new TextInput('test-textinput')
                .render(),
			TEST_RADIOS: new Radios('test-radios')
				.addRadio('{{RADIO_TEXT_1}}', 'onee')
				.addRadio('{{RADIO_TEXT_2}}', 'twoo')
				.addRadio('{{RADIO_TEXT_3}}', 'threee')
				.addRadio('{{RADIO_TEXT_4}}', 'fourr')
				.randomize() // You can randomize radio elements
				.render(),
			TEST_INPUT: new TextInput('test-input')
                .render(),
			TEST_CHECKBOX1: new CheckBox('test-checkbox1')
				.setValue("test1")
				.setLabel('{{{CHECKBOX1}}}')
                .render(),
			TEST_CHECKBOX2: new CheckBox('test-checkbox2')
				.setValue("test2")
				.setLabel('{{{CHECKBOX2}}}')
                .render(),
            PLOT: plot
        }
    }
}