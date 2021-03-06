import {
    getItems
}
from '../general/safenetwork.js';
import './posts.js';
import './comments.js';

export async function displayPosts() {
    $('.post-feed').html(""); // should receive live updates but now it just refreshes and reloads all posts
    let posts = [];
    posts = await getItems();
    if (posts.length == 0) {
        $('.post-feed').html("There are no posts to show");
    } else {
        posts.forEach(async(item) => {
            let template = `
                <div class="post">
                    <i class="fa fa-fw fa-close delete-post"></i>
                    <i id="${item.key}" class="fa fa-fw fa-pencil edit-post"></i>
                    <div class="post-body">
                    <img src="${item.value.img}" class="user-image-medium" alt="User Image">
                    <span><a class="webID" href="${item.value.id}">${item.value.name}</a><br /><span class="date">${item.value.date}</span></span>
                    <div class="post-desc">${item.value.post}</div></div>
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
    }
}
