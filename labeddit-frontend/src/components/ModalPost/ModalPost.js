import Header from "../../components/Header/Header"
import axios from "axios"
import { useContext } from "react"
import {GlobalContext} from "../../context/GlobalContext"
import { StyleContainerModal, StyleSection } from "./styleModalPost"
import like from "../../assets/like.svg"
import dislike from "../../assets/dislike.svg"
import coment from "../../assets/coment.svg"
import { useEffect, useState } from "react"
import { BASE_URL } from "../../constants/BASE_URL"

function ModalPost(props){

    const context = useContext(GlobalContext)
    const [post, setPost] = useState({}) 
    const [content, setContent] = useState('') 
    useEffect(()=>{
        browserPost()
    },
    [])
    const browserPost = async()=>{
        try {
            let auxPost = '' 
            const response = await axios.get(`${BASE_URL}/posts/${context.urlPost}`,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
            auxPost = response.data[0]
            console.log("Post", response.data[0])  
            setPost(auxPost)
        } catch (error) {
            console.log(error)
        }
    }
    const likePost = async (postId)=>{
        try {
            let body = {
                like: 1,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
                browserPost()
                props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }
    const dislikePost = async (postId)=>{
        try {
            let body = {
                like: 0,
            }
            await axios.put(`${BASE_URL}/posts/${postId}/like`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})
                browserPost()
                props.browserPosts()
        } catch (error) {
            console.log(error)
        }
    }
    const insertNewComment = async () =>{
        try {          
            let body = {
                content,
            }
            await axios.post(`${BASE_URL}/posts/${context.urlPost}`,body,{
                headers:{
                    Authorization:window.localStorage.getItem("TokenApi-Labeddit")
                }})         
            setContent('')
            browserPost()
            props.browserPosts()
            } catch (error) {
            console.log(error)
        }
    }
    return(
        <>         
            <StyleContainerModal>
            <Header/>
                <StyleSection>
                    <div>
                        <article>
                            <p className="subText">Enviado por: {post && post?.creator?.name}</p>
                            <p>{post.content}</p>
                            <p className="menuPost">
                                <span className="subTextBold">
                                    <img src={like} onClick={()=>likePost(post.id)} alt="botão-like"/>
                                    { post.likes}
                                    <img src={dislike} onClick={()=>dislikePost(post.id)} alt="botão-dislike"/> 
                                </span> 
                                <span className="subText">
                                    <img src={coment} alt="botão-comentários" />
                                    {post.comments}
                                </span>
                            </p>
                        </article>
                        <input value={content} onChange={(event)=>setContent(event.target.value)} className="InputPost" placeholder="Escreva seu post..."/>
                        <button onClick={()=>{insertNewComment()}}>Responder</button>
                    </div>
                    <div>
                        {post && post?.comments_post?.map((comment)=>{return(
                        <article key={comment.id}>
                            <p className="subText">Enviado por: {comment.name}</p>
                            {console.log("creator",comment )}
                            <p>{comment.content}</p>
                            <p className="menuPost">
                                <span className="subTextBold">
                                    <img src={like} onClick={()=>likePost(comment.id)} alt="botão-like"/>
                                    {comment.likes}
                                    <img src={dislike} onClick={()=>dislikePost(comment.id)} alt="botão-dislike"/> 
                                </span> 
                            </p>
                        </article>
                        )})}
                    </div>
                </StyleSection>
            </StyleContainerModal>
        </>
    )
}
export default ModalPost