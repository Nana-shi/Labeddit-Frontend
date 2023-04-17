export const goToLoginPage = (navigate)=>{
    navigate("/")
}

export const goToSignUpPage = (navigate)=>{
    navigate("/signup")
}

export const goToHomePage = (navigate)=>{
    navigate("/home")
}

export const goToPostPage = (navigate, post)=>{
    navigate(`/posts/${post}`)
}