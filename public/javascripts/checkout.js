const stripe = Stripe('pk_test_51M9X0UFo3mQUK8OqnFS1vUF5WFpFc14lHxNKfdtfPHPFGnkKvqiGW3Oi2FxQfh9hntgCX5JzhYA7gzLZpK5LIEEe009KmsmTnI');
var $form = document.getElementById("checkout-form");
const buyButton = document.getElementById("buyButton");
const stripToken = document.getElementById("stripToken");

const style = {
  base: {
    fontSize: '16px',
    color: '#32325d',
  },
};

var elements = stripe.elements();
var cardElement = elements.create('card',{style});
cardElement.mount('#naamKaart');


buyButton.addEventListener('click', function(event) {
    stripe.createToken(cardElement).then(function(result) {
        if (result.error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = result.error.message;
        } else {
            console.log(stripToken);
            var token = result.token.id;
            console.log(token);
            $form.append($('<input type="hidden" name="cardToken" />').val(token));
            //stripToken.append(token);
            console.log(stripToken);
            console.log($form);
            
            $form.submit();
        }
    });
    
});


function stripeResponseHandler(status, response) {
    if (response.error) {
        $('#{charge-error}').text(response.error.message);
        $('#{charge-error}').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    }
    else {
        var token = response.id;
        console.log(token);
        $form.append(('input(type="hidden" name="stripToken")'))
        $form.get(0).submit();
    }
}




























