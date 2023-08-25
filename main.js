// const allowedNetworks = ['VISA', 'MASTERCARD'];
// const allowedAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];
// const baseCardPaymentMethod = {
//     type: 'CARD',
//     parameters: {
//         allowedCardNetworks: allowedNetworks,
//         allowedAuthMethods: allowedAuthMethods
//     }
// };
// const googlePayBaseConfiguration = {
//     apiVersion: 2,
//     apiVersionMinor: 0,
//     allowedPaymentMethods: [baseCardPaymentMethod]
// };

// /**
//  * Holds the Google Pay client used to call the different methods available
//  * through the API.
//  * @type {PaymentsClient}
//  * @private
//  */
// let googlePayClient;

// /**
//  * Defines and handles the main operations related to the integration of
//  * Google Pay. This function is executed when the Google Pay library script has
//  * finished loading.
//  */
// function onGooglePayLoaded() {
//     googlePayClient = new google.payments.api.PaymentsClient({
//         environment: 'TEST'
//     });
//     googlePayClient.isReadyToPay(googlePayBaseConfiguration)
//         .then(function (response) {
//             if (response.result) {
//                 createAndAddButton();
//             } else {
//                 alert("Unable to pay using Google Pay");
//             }
//         }).catch(function (err) {
//             console.error("Error determining readiness to use Google Pay: ", err);
//         });
// }

// /**
//  * Handles the creation of the button to pay with Google Pay.
//  * Once created, this button is appended to the DOM, under the element 
//  * 'buy-now'.
//  */
// function createAndAddButton() {

//     const googlePayButton = googlePayClient.createButton({

//         // currently defaults to black if default or omitted
//         buttonColor: 'default',

//         // defaults to long if omitted
//         buttonType: 'long',

//         onClick: onGooglePaymentsButtonClicked
//     });

//     document.getElementById('buy-now').appendChild(googlePayButton);
// }

// /**
//  * Handles the click of the button to pay with Google Pay. Takes
//  * care of defining the payment data request to be used in order to load
//  * the payments methods available to the user.
//  */
// function onGooglePaymentsButtonClicked() {

//     const tokenizationSpecification = {
//         type: 'PAYMENT_GATEWAY',
//         parameters: {
//             gateway: 'example',
//             gatewayMerchantId: 'exampleGatewayMerchantId'
//         }
//     };

//     const cardPaymentMethod = {
//         type: 'CARD',
//         tokenizationSpecification: tokenizationSpecification,
//         parameters: {
//             allowedCardNetworks: ['VISA', 'MASTERCARD'],
//             allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
//             billingAddressRequired: true,
//             billingAddressParameters: {
//                 format: 'FULL',
//                 phoneNumberRequired: true
//             }
//         }
//     };

//     const transactionInfo = {
//         totalPriceStatus: 'FINAL',
//         totalPrice: '123.45',
//         currencyCode: 'USD',
//         countryCode: 'US'
//     };

//     const merchantInfo = {
//         merchantId: '01234567890123456789', //Only in PRODUCTION
//         merchantName: 'Example Merchant Name'
//     };

//     const paymentDataRequest = Object.assign({}, googlePayBaseConfiguration, {
//         allowedPaymentMethods: [cardPaymentMethod],
//         transactionInfo: transactionInfo,
//         merchantInfo: merchantInfo
//     });

//     googlePayClient
//         .loadPaymentData(paymentDataRequest)
//         .then(function (paymentData) {
//             processPayment(paymentData);
//         }).catch(function (err) {
//             // Log error: { statusCode: CANCELED || DEVELOPER_ERROR }
//         });
// }

// function processPayment(paymentData) {
//     // TODO: Send a POST request to your processor with the payload
//     // https://us-central1-devrel-payments.cloudfunctions.net/google-pay-server 
//     // Sorry, this is out-of-scope for this codelab.
//     return new Promise(function (resolve, reject) {
//         // @todo pass payment token to your gateway to process payment
//         const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
//         console.log('mock send token ' + paymentToken + ' to payment processor');
//         setTimeout(function () {
//             console.log('mock response from processor');
//             alert('done');
//             resolve({});
//         }, 800);
//     });
// }
// window.addEventListener("DOMContentLoaded", () => {
//     onGooglePayLoaded()
// })


const newGooglePayButton = {
    __functions: {
        onClickNewGoogleButton: null
    },
    __variables: {
        elementNewGooglePayButton: null,
        googlePayClient: null
    },
    init: ({classNameGoogleButton, func__CallBack}) => {
        newGooglePayButton.__variables.elementNewGooglePayButton = document.querySelector(`.${classNameGoogleButton}`)
        newGooglePayButton.__functions.onClickNewGoogleButton = func__CallBack;
        newGooglePayButton.__variables  = {
            ...newGooglePayButton.__variables,
            googlePayBaseConfiguration: {
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [{
                    type: 'CARD',
                    parameters: {
                        allowedCardNetworks: ['VISA', 'MASTERCARD'],
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS']
                    }
                }]
            }
        }
        newGooglePayButton.onGooglePayLoaded();
    },
    onGooglePayLoaded: () => {
        newGooglePayButton.__variables.googlePayClient = new google.payments.api.PaymentsClient({
            environment: window.ctrwowUtils.link.getQueryParameter('isCardTest') === 1 ? 'TEST' : 'PRODUCTION'
        });
        newGooglePayButton.__variables.googlePayClient.isReadyToPay(newGooglePayButton.__variables.googlePayBaseConfiguration)
            .then(function (response) {
                if (response.result) {
                    newGooglePayButton.createAndAddButton();
                } else {
                    alert("Unable to pay using Google Pay");
                }
            }).catch(function (err) {
                console.error("Error determining readiness to use Google Pay: ", err);
            });
    },
    createAndAddButton: () => {

        const googlePayButton = newGooglePayButton.__variables.googlePayClient.createButton({
            // currently defaults to black if default or omitted
            buttonColor: 'default',
            // defaults to long if omitted
            buttonType: 'long',
            buttonSizeMode: 'fill',
            onClick: () => {
                newGooglePayButton.__functions.onClickNewGoogleButton();
            }
        });
    
        newGooglePayButton.__variables.elementNewGooglePayButton.appendChild(googlePayButton);
    }
}
newGooglePayButton.init({"classNameGoogleButton": 'buy-now', "func__CallBack": () => document.querySelector('.google-button').click()});

window.ctrwowUtils.getDependencies(['https://pay.google.com/gp/p/js/pay.js']).then(() => {
  
});