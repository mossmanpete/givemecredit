var user = gun.user();

let safeApp;

async function authoriseAndConnect() {
  let appInfo = {
      name: 'DEVOLUTION',
      id: 'net.devolution.test.web-app',
      version: '1.0.0',
      vendor: 'Glen Simister.'
  };
  safeApp = await window.safe.initialiseApp(appInfo);
  console.log('Authorising SAFE application...');
  const authReqUri = await safeApp.auth.genAuthUri();
  const authUri = await window.safe.authorise(authReqUri);
  console.log('SAFE application authorised by user');
  await safeApp.auth.loginFromUri(authUri);
  console.log("Application connected to the network");
  const profileImg = await window.currentWebId["#me"]["image"]["@id"];
  const profileName = await window.currentWebId["#me"]["name"];
  $('.profile-summary img.user-image-large ').attr("src", profileImg);
  $('.profile-pic-small').attr("src", profileImg);
  $('.profile-summary h4#fullName').html(profileName);
};

authoriseAndConnect();


/* Import all of the Javascript components. */ 

import {sidebar} from './components/sidebar.js';
import {navTop} from './components/navTop.js';
import {comments} from './components/comments.js';
import {connect} from './components/connect.js';
import {toolbar} from './components/toolbar.js';
import {status} from './components/status.js';
import {listCandidates} from './components/listCandidates.js';
import {distributeCredits,donateSocialCredits,transferCredits} from './components/credits.js';
import {applyAsCandidate} from './components/applyAsCandidate.js';
import {electCandidate} from './components/electCandidate.js';
import {displayPubService} from './components/displayPubService.js';
import {displayUserData} from './components/displayUserData.js';
import {getProfile} from './components/getProfile.js';
import {lottery} from './components/lottery.js';
import {initScripts} from './components/initScripts.js';

/* load partials */

$('.sidebar').load("partials/sidebar.html", function(){sidebar();});
$('.dropdown-container').load("partials/navtop.html", function(){navTop();});
$('.grid-search').load("partials/searchbar.html");

distributeCredits(); //initalize credits

/* routing */ 

;
(function ($) {
    var app = $.sammy(function () {
        this.get('#/', function () {getPage("pages/home.html");});
        this.get('/index.html', function () {getPage("pages/home.html");});
        this.get('/', function () {getPage("pages/home.html");});
        
        this.get('#/:page', function () {
            var page = this.params['page'];
            getPage('pages/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
        });

        this.get('#/:folder/:page', function () {
            var folder = this.params['folder'];
            var page = this.params['page'];
            getPage('pages/' + this.params['folder'] + '/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
        });
    });

    $(function () {
        app.run()
    });
    
    /* insert scripts on correct pages */

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        var thisPage = url.split("/");
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                console.log('current page: ' + thisPage[1]);
                //load home page scripts
                initScripts();
                displayUserData();
                connect();
                toolbar();
                comments();
                status();
                
                //load page specific scripts
                if (thisPage[1] === 'publicservices') { 
                    displayPubService();
                    donateSocialCredits();
                    transferCredits();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'profile.html') {
                    getProfile(); 
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'voting') {
                    listCandidates();
                    electCandidate();
                    applyAsCandidate();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] === 'lottery.html') {
                    lottery();  
                    console.log(thisPage[1] + ' scripts loaded');
                }
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
