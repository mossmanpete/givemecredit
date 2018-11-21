var gun = Gun() // move this into different file

var api = {
    ratePost: ($this) => {
        var elem = $this.parent().next();
        var count = elem.html();
        count++;
        elem.html(count);
    },
    flagPost: ($this) => {
        let elem = $this.parent().parent().parent().find('.post-desc');
        if ($this.hasClass("blurred")) {
            elem.css("filter", "blur(0px)");
            $this.removeClass('blurred');
        } else {
            api.ratePost($this);
            elem.css("filter", "blur(4px)");
            $this.addClass('blurred');
        }
    },
    postComment: async (post, $this) => {
            let date = await api.getDate();
            gun.get('users').once(function (data) {
                gun.get('pub/' + data.pubKey).once(function (result) {
                    let template = `<div class="comment-box">
                        <div class="post-body">
                            <img src="${result.photo}" class="user-image-medium" alt="User Image">
                            <span><a href="">${result.name}</a><br />${date}</span>
                            <div class="post-desc">${post}</div>
                        </div>
                        <div class="grid-toolbar">
                            <div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                            <div>90</div>
                            <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
                            <div>10</div>
                            <div class="red"><i class="fa fa-flag"></i></div>
                            <div>0</div>
                            <div class="rateYoToolbar"></div>
                            <div>
                                <select>
                                    <option>Bitcoin</option>
                                    <option>Crypto20</option>
                                    <option>Dash</option>
                                    <option>Ether</option>
                                </select>
                            </div>
                            <div><input type="number" placeholder="1"></div>
                            <div class="red"><i class="fa fa-heart"></i></div>
                        </div>
                    </div>`;
                    $this.prev().append(template);
                    $('.post-comment-input').val("");
                    $(".rateYoToolbar").rateYo({
                        rating: 4,
                        starWidth: "15px",
                        readOnly: true
                    });
                });
            });
        },
        updateStatus: async (post, $this, isStatusUpdate) => {
                let date = await api.getDate();
                gun.get('users').once(function (data) {
                    gun.get('pub/' + data.pubKey).once(function (result) {
                        let template = `
                <div class="post">
                    <div class="post-body">
                    <img src="${result.photo}" class="user-image-medium" alt="User Image">
                    <span><a href="">${result.name}</a><br />${date}</span>
                    <div class="post-desc">${post}</div></div>
                    <div class="grid-toolbar">
                        <div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                        <div>90</div>
                        <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
                        <div>10</div>
                        <div class="red"><i class="fa fa-flag"></i></div>
                        <div>0</div>
                        <div class="rateYoToolbar"></div>
                        <div>
                            <select>
                                <option>Bitcoin</option>
                                <option>Crypto20</option>
                                <option>Dash</option>
                                <option>Ether</option>
                            </select>
                        </div>
                        <div><input type="number" placeholder="1"></div>
                        <div class="red"><i class="fa fa-heart"></i></div>
                    </div>
                     <div class="post-comment">
                    </div>
                    <input type="text" class="post-comment-input" placeholder="Write a comment..." />
                </div>`;
                        $('.post-feed').prepend(template);
                        $(".rateYoToolbar").rateYo({
                            rating: 4,
                            starWidth: "15px",
                            readOnly: true
                        });
                    });
                });

                /*  let users = gun.get('users');
                  users.once(function (data) {
                      let profilePic = data.picture;
                      let profileName = data.name;

                  }); */
            },
            getDate: () => {
                var d = new Date();
                var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                let day = d.getDate();
                let month = monthNames[d.getMonth()];
                let year = d.getFullYear();
                let date = `${day} ${month}, ${year}`;
                return date;
            },
            distributeCredits: () => {
                var credits = gun.get('credits')
                credits.put({
                    social: "240", //these are dummy values
                    health: "50",
                    education: "0"
                })
                credits.once(function (data) {
                    $('.sc').html(data.social);
                    $('.hc').html(data.health);
                    $('.ec').html(data.education);
                })
            },
            donateSocialCredits: ($this) => {
                var input = $($this).parent().parent().find('input').val();
                var select = $($this).parent().parent().parent().parent().find('select option:selected').val();
                var parent_class = $($this).parent().parent().parent().parent().attr('class');

                if (parent_class == 'topup-hc') {
                    if (select == 'Social Credits') {
                        transferCredits('.sc', '.hc', input);
                    } else if (select == 'Education Credits') {
                        transferCredits('.ec', '.hc', input);
                    }
                } else if (parent_class == 'topup-ec') {
                    transferCredits('.sc', '.ec', input);
                } else if (select == 'Social Credits') {
                    deductCredits('.sc', input);
                } else if (select == 'Health Credits') {
                    deductCredits('.hc', input);
                } else if (select == 'Education Credits') {
                    deductCredits('.ec', input);
                };

                function transferCredits(from, to, amount) {
                    var type_from = $(from).html();
                    type_from = (parseInt(type_from) - parseInt(amount));
                    $(from).html(type_from.toFixed(0));
                    var type_to = $(to).html();
                    type_to = (parseInt(type_to) + parseInt(amount));
                    $(to).html(type_to.toFixed(0));
                }

                function deductCredits(type, amount) {
                    var current_value = $(type).html();
                    var new_value = (parseInt(current_value) - parseInt(amount));
                    $(type).html(new_value.toFixed(0));
                    payRebate(amount);
                }

                function payRebate(amount) {
                    var rebate = 10 / 100 * amount;
                    var result = 0;
                    result = $('.rebate').text();
                    result = rebate + parseInt(result);
                    $('.rebate').html(result.toFixed(0));
                }
            },
            buyLotteryTicket: ($this) => {
                var amount = $($this).parent().prev().find('input').val();
                amount = amount * 10; //this is the price of a lottery ticket - although it is completely arbitrary
                var sc = $('.sc').html();
                var new_sc = (parseInt(sc) + parseInt(amount));
                $('.sc').html(new_sc);
            }
}
