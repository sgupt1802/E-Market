import React from 'react'

const ResetPassword = () => {
    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form
                    className="shadow rounded bg-body"
                    action="your_submit_url_here"
                    method="post"
                >
                    <h2 className="mb-4">New Password</h2>

                    <div className="mb-3">
                        <label htmlFor="password_field" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            value=""
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirm_password_field" className="form-label"
                        >Confirm Password</label
                        >
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            name="confirm_password"
                            value=""
                        />
                    </div>

                    <button id="new_password_button" type="submit" className="btn w-100 py-2">
                        Set Password
                    </button>
                </form>
            </div>
        </div>

    )
}

export default ResetPassword