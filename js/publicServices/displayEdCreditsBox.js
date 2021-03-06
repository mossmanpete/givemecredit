import {
    listUsers
}
from '../general/safenetwork.js';

/*** This doesn't work. Need to setup new table users which it can retrieve data from ***/

export async function displayEdCreditsBox() {
    const id = await window.currentWebId["@id"];
    //let rand = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let items = [];
    items = await listUsers();
    items.forEach(async(item) => {
        if (item.value.webID == id) {
            let percentage = (item.value.educationCredits / 1000) * 100;
            let edCreditsBox = `<div id="${item.key}-ec" class="animated slideInUp">
        <h3>Education Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> IDX</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">${item.value.educationCredits}</span> IDX</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: ${percentage}%;">
            </div>
        </div>
        <select class="form-control">
            <option>Social Credits</option>
            <option>Education Credits</option>
            <option>C20 - Crypto20 (Index Fund)</option>
            <option>BTC - Bitcoin</option>
            <option>ETH - Ethereum</option>
            <option>LTC - Litecoin</option>
            <option>DASH - Dash</option>
        </select>
        <br />
        <div class="grid-input-button">
            <div>
                <input type="text" class="form-control donate-input">
            </div>
            <div>
                <button type="button" title="${item.key}-ec" class="topup-ec">DONATE</button>
            </div>
        </div>
    </div>`;
            $('.localServices').append(edCreditsBox);
        }
    });
}
