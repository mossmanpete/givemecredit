import {
    listOfficials, updateOffical, listUsers, updateUser, getOfficialUserId, getBalance, sendTo
}
from '../general/safenetwork.js';

export default (async function () {
    $(document.body).on('click', '.donate-sc', async function (e) {
        e.stopImmediatePropagation();
        let input = $(this).parent().parent().find('input').val();
        input = parseFloat(input);
        let id = $(this).attr("id");
        let raisedSoFar = $('#' + id + ' .creditsReceived').html();
        let received = parseInt(raisedSoFar) + input;
        let progress = updateProgressBar(id, input, raisedSoFar);
        let newSocialCreditVal = updateCreditsBar('.sc div', input);
        updateService(id, newSocialCreditVal, progress, received);
        
        let pubKey = $(this).attr("title");
        let balance = await getBalance(pubKey);
        balance = balance + input;
        await sendTo(pubKey, balance);
        balance = await getBalance(pubKey);
        //$('.rebate div').html(balance.toFixed(0)).addClass('animated heartBeat');
        
        
        /*
        const userId = await getOfficialUserId(id);
        console.log(userId);
        let users = [];
        users = await listUsers();
        users.forEach(async(user) => {
            let str = userId.localeCompare(user.value.userId);
            if (str == 0) {
                console.log(input);
                user.value.rebate = input;
                await updateUser(user.key, user.value, user.version);
            }
        });*/

        function updateProgressBar(key, value, raised) {
            $('#' + key + ' .creditsReceived').html(parseInt(raised) + parseInt(value));
            let monthlyTarget = $('#' + key + ' .monthlyTarget').html();
            let percentage = (parseInt(value) / parseInt(monthlyTarget)) * 100;
            let percentageString = percentage.toFixed(0) + "%";
            let progressBarDiv = $('#' + key + " .progress-bar > div");
            if (percentage <= 100) {
                progressBarDiv.css("width", percentageString);
            } else {
                progressBarDiv.css("width", "100%");
            }
            return percentageString;
        }

        function updateCreditsBar(type, amount) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0)).addClass('animated heartBeat');
            //payRebate(amount);
            return new_value.toFixed(0);
        }

        /****** i'll probably remove this as i don't think it is a good idea to pay a rebate for donating to a service *******/
        function payRebate(amount) {
            var rebate = 10 / 100 * amount;
            var result = 0;
            result = $('.rebate div').text();
            result = rebate + parseInt(result);
            $('.rebate div').html(result.toFixed(0)).addClass('animated heartBeat');
        }

        async function updateService(key, socCred, prog, raised) {
            let items = [];
            items = await listOfficials();
            items.forEach(async(item) => {
                if (item.key == key) {
                    item.value.percentageOfTarget = prog;
                    item.value.socialCredits = socCred;
                    item.value.creditsReceived = raised;
                    await updateOffical(key, item.value, item.version);
                }
            });
        }
    });
}());
