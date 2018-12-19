$(document).ready(function () {
    var nav_top =
        `             <ul>
                        <li class="has-dropdown"><a href="#"><i class="fa fa-refresh"></i><span class="label label-red">2</span></a>
                            <div class="dropdown-content">
                                <a class="drop-down-header" href="#">VIEW UPDATES</a>
                                <ul>
                                    <li><span>Design Changes<span class="pull-right"><b>20 July, 2018</b></span><br />
                                            <button class="btn-small btn-green">REVIEW</button>&nbsp;<button class="btn-small btn-blue">UPDATE</button>&nbsp;<button class="btn-small btn-red">ROLLBACK</button>
                                        </span></li>
                                    <li><span>New Search Feature<span class="pull-right"><b>20 July, 2018</b></span><br />
                                            <button class="btn-small btn-green">REVIEW</button>&nbsp;<button class="btn-small btn-blue">UPDATE</button>&nbsp;<button class="btn-small btn-red">ROLLBACK</button>
                                        </span></li>
                                    <li><span>Settings Update<span class="pull-right"><b>20 July, 2018</b></span><br />
                                            <button class="btn-small btn-green">REVIEW</button>&nbsp;<button class="btn-small btn-blue">UPDATE</button>&nbsp;<button class="btn-small btn-red">ROLLBACK</button>
                                        </span></li>
                                </ul>
                            </div>
                        </li>
                        <li class="has-dropdown"><a href="#"><i class="fa fa-list-alt"></i><span class="label label-green">12</span></a>
                            <div class="dropdown-content">
                                <a class="drop-down-header" href="#/business/marketing">VIEW SURVEYS</a>
                                <ul>
                                    <li><img src="img/avatar04.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                    <li><img src="img/avatar2.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                </ul>
                            </div>
                        </li>
                        <li class="has-dropdown"><a href="#"><i class="fa fa-user"></i><span class="label label-yellow">2</span></a>
                            <div class="dropdown-content">
                                <a class="drop-down-header" href="#/business/marketing">FRIEND REQUESTS</a>
                                <ul>
                                    <li><img src="img/avatar.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                </ul>
                            </div>
                        </li>
                        <li class="has-dropdown"><a href="#"><i class="fa fa-envelope-o"></i><span class="label label-blue">6</span></a>
                            <div class="dropdown-content">
                                <a class="drop-down-header" href="#/mailbox/mailbox">READ ALL MESSAGES</a>
                                <ul>
                                    <li><img src="img/avatar.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                    <li><img src="img/avatar04.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                    <li><img src="img/avatar2.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                </ul>
                            </div>
                        </li>
                        <li class="has-dropdown"><a href="#"><i class="fa fa fa-bell-o"></i><span class="label label-red">10</span></a>
                            <div class="dropdown-content">
                                <a class="drop-down-header" href="#/business/marketing">NOTIFICATIONS</a>
                                <ul>
                                    <li><img src="img/avatar.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                    <li><img src="img/avatar04.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                    <li><img src="img/avatar2.png" class="user-image-messages" alt="User Image">
                                        <span><a href="">Guest User</a><span class="pull-right"><b>20 July, 2018</b></span><br />
                                            Sed ut perspiciatis unde omnis...
                                        </span></li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="login.html"><img src="img/default.gif" class="profile-pic-small user-image-small" alt="User Image"><span>Glen</span></a></li>
                        <li><a href="#/settings"><i class="fa fa-gears"></i></a></li>
                    </ul>`;

    $('.dropdown-container').html(nav_top);
});
