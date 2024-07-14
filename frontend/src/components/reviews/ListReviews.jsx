import React from 'react'

const ListReviews = () => {
    return (
        <div>
            <div class="reviews w-75">
                <h3>Other's Reviews:</h3>
                <hr />
                <div class="review-card my-3">
                    <div class="row">
                        <div class="col-1">
                            <img
                                src="../images/default_avatar.jpg"
                                alt="User Name"
                                width="50"
                                height="50"
                                class="rounded-circle"
                            />
                        </div>
                        <div class="col-11">
                            <div class="star-ratings">
                                <i class="fa fa-star star-active"></i>
                                <i class="fa fa-star star-active"></i>
                                <i class="fa fa-star star-active"></i>
                                <i class="fa fa-star star-active"></i>
                                <i class="fa fa-star star-active"></i>
                            </div>
                            <p class="review_user">by User Name</p>
                            <p class="review_comment">Review Comment Text</p>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default ListReviews