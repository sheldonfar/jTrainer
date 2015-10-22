jQuery(document).ready(function ($) {
    var operand1 = 0, operator, computed = false;
    var i;

    var $expr = $('#expr');
    var $value = $('span', '#result');

    $(document).keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        switch (code) {
            case 48:
            case 96:
                $("div.calc-button[data-symbol='0']").click();
                break;
            case 49:
            case 97:
                $("div.calc-button[data-symbol='1']").click();
                break;
            case 50:
            case 98:
                $("div.calc-button[data-symbol='2']").click();
                break;
            case 51:
            case 99:
                $("div.calc-button[data-symbol='3']").click();
                break;
            case 52:
            case 100:
                $("div.calc-button[data-symbol='4']").click();
                break;
            case 53:
            case 101:
                $("div.calc-button[data-symbol='5']").click();
                break;
            case 54:
            case 102:
                $("div.calc-button[data-symbol='6']").click();
                break;
            case 55:
            case 103:
                $("div.calc-button[data-symbol='7']").click();
                break;
            case 56:
            case 104:
                $("div.calc-button[data-symbol='8']").click();
                break;
            case 57:
            case 105:
                $("div.calc-button[data-symbol='9']").click();
                break;
            case 107:
                $("div.calc-button[data-symbol='+']").click();
                break;
            case 109:
            case 189:
                $("div.calc-button[data-symbol='-']").click();
                break;
            case 42:
            case 106:
                $("div.calc-button[data-symbol='*']").click();
                break;
            case 191:
            case 111:
                $("div.calc-button[data-symbol='/']").click();
                break;
            case 13:
            case 187:
                $("div.calc-button[data-symbol='=']").click();
                break;
            case 8:
                event.preventDefault();
                $("div.calc-button[data-symbol='←']").click();
                break;
            case 46:
                $("div.calc-button[data-symbol='C']").click();
                break;
            case 110:
            case 188:
            case 190:
                $("div.calc-button[data-symbol='.']").click();
                break;
            case 81:
                $("div.calc-button[data-symbol='x2']").click();
                break;
        }
    });
    $('div.calc-button').click(function (e) {
        $('button').removeClass('active');
        $(this).addClass('active');

        var operation = $(this).attr('data-operation');

        var symbol = $(this).attr('data-symbol');
        var button_text = $(this).html();

        switch (operation) {

            case 'digit':
                if (computed) {
                    $value.html(button_text);
                    computed = false;
                } else {
                    append(button_text);
                }
                break;

            case 'binOp':
                operand1 = $value.html();
                operator = symbol;
                if (operator === 'root') {
                    $expr.html('<a class=sup>' + operand1 + '</a>√')
                } else if (operator === 'log') {
                    $expr.html('<a class=sup>' + operand1 + '</a>log ');
                } else {
                    $expr.html(operand1 + ' ' + operator);
                }
                $value.html(0);
                break;


            case 'unOp':
                $expr.html(button_text + '(' + $value.html() + ') =')
                if ($value.html() == 0) {
                    $value.html(0);
                    $expr.html(0);
                }
                switch (symbol) {
                    case '√'   :
                        $value.html(Math.sqrt($value.html()));
                        break;
                    case 'root3'   :
                        $value.html(Math.pow($value.html(), 1.0 / 3.0));
                        break;
                    case 'root4'   :
                        $value.html(Math.pow($value.html(), 1.0 / 4.0));
                        break;
                    case 'exp'  :
                        $value.html(Math.exp($value.html()));
                        break;
                    case 'ln'  :
                        $value.html(Math.log($value.html()));
                        break;
                    case 'lg'  :
                        $value.html(Math.LOG10E * Math.log($value.html()));
                        break;
                    case 'lb'  :
                        $value.html(Math.LOG2E * Math.log($value.html()));
                        break;
                    case 'sin'  :
                        $value.html(Math.sin($value.html()));
                        break;
                    case 'cos'  :
                        $value.html(Math.cos($value.html()));
                        break;
                    case 'tan'  :
                        $value.html(Math.tan($value.html()));
                        break;
                    case 'cot'  :
                        $value.html(1 / Math.tan($value.html()));
                        break;
                    case '!' :
                        $value.html(factorial($value.html()));
                        break;
                    case '±' :
                        $value.html(-$value.html());
                        break;
                    case 'x2' :
                        $value.html($value.html() * $value.html());
                        break;
                        console.log('Error in unOp');
                }
                $value.text($value.text().substr(0, 14));
                $expr.text($expr.text().substr(0, 30));
                computed = true;
                break;

            case 'constant':
                switch (button_text) {
                    case 'e' :
                        $value.html(Math.E);
                        break;
                    case 'π' :
                        $value.html(Math.PI);
                        break;
                }
                $value.text($value.text().substr(0, 14));
                $expr.text($expr.text().substr(0, 30));
                computed = true;
                break;

            case 'minus':
                if ($value.html().slice(-1) === 'E' ||
                    $value.html() === '' || $value.html() === '0') {
                    append('−');
                } else {
                    operand1 = $value.html();
                    operator = '−';
                    $expr.html(operand1 + ' ' + operator);
                    $value.html(0);
                }
                $value.text($value.text().substr(0, 14));
                $expr.text($expr.text().substr(0, 30));
                break;

            case 'compute':
                $expr.html($expr.html() + ' ' + $value.html() + ' =');
                console.log(operator);
                switch (operator) {
                    case '+' :
                        $value.html(Number(operand1) + Number($value.html()));
                        break;
                    case '−' :
                        $value.html(Number(operand1) - Number($value.html()));
                        break;
                    case '×' :
                        $value.html(Number(operand1) * Number($value.html()));
                        break;
                    case '/' :
                        $value.html(Number(operand1) / Number($value.html()));
                        break;
                    case '^' :
                        $value.html(Math.pow(Number(operand1), Number($value.html())));
                        break;
                    case '%' :
                        $value.html(Number(operand1) * Number($value.html()) / 100);
                        break;
                    case 'root' :
                        $value.html(Math.pow($value.html(), 1.0 / operand1));
                        break;
                    case 'log' :
                        $value.html(Math.log($value.html()) / Math.log(operand1));
                        break;
                }
                $value.text($value.text().substr(0, 14));
                $expr.text($expr.text().substr(0, 30));
                computed = true;
                break;

            case 'clear':
                $value.html(0);
                $expr.html(0);
                break;

            case 'rubout':
                if ($value.html().length > 1) {
                    $value.html($value.html().slice(0, -1));
                } else {
                    $value.html(0);
                }
                break;
        }
    });

    function factorial(n) {
        if (n == 0) {
            return 1
        } else {
            var product = 1;
            for (i = 1; i <= n; i++) {
                product *= i;
            }
            return product;
        }
    }

    function append(ch) {
        var oldvalue = $value.html();
        if (oldvalue === '0') {
            $value.html(ch);
        } else {
            $value.html(oldvalue + ch);
        }
    }
});