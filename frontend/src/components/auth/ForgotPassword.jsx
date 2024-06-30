import React from 'react'

const ForgotPassword = () => {
    return (
        <div class="row wrapper">
            <div class="col-10 col-lg-5">
                <form
                    class="shadow rounded bg-body"
                    action="your_submit_url_here"
                    method="post"
                >
                    <h2 class="mb-4">Forgot Password</h2>
                    <div class="mt-3">
                        <label for="email_field" class="form-label">Enter Email</label>
                        <input
                            type="email"
                            id="email_field"
                            class="form-control"
                            name="email"
                            value=""
                        />
                    </div>

                    <button
                        id="forgot_password_button"
                        type="submit"
                        class="btn w-100 py-2"
                    >
                        Send Email
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword