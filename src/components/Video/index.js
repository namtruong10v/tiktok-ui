import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faCheckCircle, faClose, faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import styles from './Video.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import images from '~/assets/images';

import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useAuth } from '~/firebase';

const cx = classNames.bind(styles)



function Video({ id, title, account, music, hastag, src_video, tick, hearts, comments = [] }) {


    const currentUser = useAuth();

    const firestore = getFirestore();
    const frankDocRef = doc(firestore, "postVideo", `${id}`);



    const [heart, setHeart] = useState(hearts);
    const [active, setActive] = useState(false);
    const [comment, setComment] = useState('')
    const [addComment, setAddComment] = useState(comments)
    const [showModal, setShowModal] = useState(false);
    // const [heartCommnet, setHeartCommnet] = useState(0)

    const handleHeart = async () => {
        setActive(!active);
        if (!active) {
            setHeart(heart + 1);
            await updateDoc(frankDocRef, {
                "heart": heart + 1,

            });
        } else {
            setHeart(heart - 1);
            await updateDoc(frankDocRef, {
                "heart": heart - 1,

            });
        }
    }


    const openModal = () => {
        if (currentUser) {

            setShowModal(true);

        } else {
            alert('Vui lòng đăng nhập !')
        }
    }

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"

        }

    }, [showModal])





    // handle send comment

    const inputRef = useRef()
    const handleSentComment = async () => {
        const creatTime = new Date().toLocaleString('en-GB', { hour12: false, })
        const updateCommebt = {
            account: currentUser.uid,
            name_acount: currentUser.displayName,
            src_account: currentUser.photoURL != null ? currentUser.photoURL : images.noImage,
            content_comment: comment,
            create_time: creatTime,
            hearts: 0
        }
        try {
            await updateDoc(frankDocRef, {
                comments: arrayUnion(
                    updateCommebt
                )
            });

            setAddComment([...addComment, updateCommebt]);
            setComment('')
            inputRef.current.focus()


        } catch (error) {

        }

    }

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            handleSentComment()
        }
    }




    const handleDeleteComment = async (cmt) => {
        try {
            await updateDoc(frankDocRef, {
                comments: arrayRemove(cmt)
            });

            const newComment = [...addComment];
            const index = newComment.indexOf(cmt);
            newComment.splice(index, 1);
            setAddComment(newComment)

        } catch (error) {

        }
    }


    const handleLikeComment = async (cmt) => {
        console.log(cmt);
        // if (cmt) {
        //     setHeartCommnet(cmt.hearts + 1, 'hahaha')
        // }
    }



    return (
        <>

            <div className={cx('recommend-list-item-container')}>
                <Link to={currentUser && currentUser.uid === account.id ? '/profile' : `/account/${account.id}`} className={cx('image-acount')}>
                    <img src={account.image} />
                </Link>
                <div className={cx('video-recomend-box')}>
                    <div className={cx('video-recomend-infor-acount', 'd-flex-aitems-center')}>
                        <div className={cx('infor-box')}>

                            <Link to={currentUser && currentUser.uid === account.id ? '/profile' : `/account/${account.id}`} className={cx('d-flex-aitems-center')}>
                                <p className={cx('account_nick_name')}>
                                    {account.nick_name} {tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                                </p>
                                <span className={cx('account_name')}>{account.name_acount}</span>
                            </Link>

                            <div className={cx('video-recomend-content')}>
                                {title}
                            </div>
                            {
                                hastag.map((has, index) => (
                                    <Link key={index} to={has}>
                                        <strong className={cx('video-recomend-tag')}>{has}</strong>
                                    </Link>
                                ))
                            }


                            <div>
                                <Link to=''>
                                    <FontAwesomeIcon className={cx('icon-music')} icon={faMusic} />
                                    <strong className={cx('video-recomend-tag')}>Nhạc Nền</strong>
                                </Link>
                            </div>
                        </div>
                        <Button outline size='small'>follow</Button>
                    </div>

                    <div className={cx('video-box')} style={{ marginTop: 15 }}>
                        <video id={id} title={title} className={cx('video-play')} preload='true' src={src_video} controls playsInline loop></video>
                        <div className={cx('action-of-video')}>
                            <button onClick={handleHeart} className={cx('btn-action-heart')}>
                                {active ?
                                    (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path style={{ fill: 'red' }} d="M12.8197 5.57961L11.999 6.40211L11.1757 5.57886C9.07663 3.4798 5.67337 3.4798 3.5743 5.57886C1.47523 7.67793 1.47523 11.0812 3.5743 13.1803L11.4697 21.0756C11.7626 21.3685 12.2374 21.3685 12.5303 21.0756L20.4318 13.1788C22.5262 11.0728 22.5298 7.67906 20.4303 5.57961C18.3274 3.47672 14.9226 3.47672 12.8197 5.57961Z" fill="#323130" />
                                    </svg>) :
                                    (<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.8197 5.57961L11.999 6.40211L11.1757 5.57886C9.07663 3.4798 5.67337 3.4798 3.5743 5.57886C1.47523 7.67793 1.47523 11.0812 3.5743 13.1803L11.4697 21.0756C11.7626 21.3685 12.2374 21.3685 12.5303 21.0756L20.4318 13.1788C22.5262 11.0728 22.5298 7.67906 20.4303 5.57961C18.3274 3.47672 14.9226 3.47672 12.8197 5.57961ZM19.3682 12.1211L12 19.4846L4.63496 12.1196C3.12168 10.6063 3.12168 8.15281 4.63496 6.63952C6.14824 5.12624 8.60176 5.12624 10.115 6.63952L11.4725 7.99697C11.7703 8.29483 12.255 8.28903 12.5457 7.98412L13.8803 6.64027C15.3974 5.12317 17.8526 5.12316 19.3697 6.64027C20.8833 8.15391 20.8807 10.6001 19.3682 12.1211Z" fill="#323130" />
                                    </svg>)
                                }
                            </button>
                            <strong>
                                {heart}
                            </strong>
                            <button onClick={openModal} className={cx('btn-action-heart')}>
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C10.3817 22 8.81782 21.6146 7.41286 20.888L3.58704 21.9553C2.92212 22.141 2.23258 21.7525 2.04691 21.0876C1.98546 20.8676 1.98549 20.6349 2.04695 20.4151L3.11461 16.5922C2.38637 15.186 2 13.6203 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 13.4696 3.87277 14.8834 4.57303 16.1375L4.72368 16.4072L3.61096 20.3914L7.59755 19.2792L7.86709 19.4295C9.12006 20.1281 10.5322 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM8.75 13H13.2483C13.6625 13 13.9983 13.3358 13.9983 13.75C13.9983 14.1297 13.7161 14.4435 13.35 14.4932L13.2483 14.5H8.75C8.33579 14.5 8 14.1642 8 13.75C8 13.3703 8.28215 13.0565 8.64823 13.0068L8.75 13H13.2483H8.75ZM8.75 9.5H15.2545C15.6687 9.5 16.0045 9.83579 16.0045 10.25C16.0045 10.6297 15.7223 10.9435 15.3563 10.9932L15.2545 11H8.75C8.33579 11 8 10.6642 8 10.25C8 9.8703 8.28215 9.55651 8.64823 9.50685L8.75 9.5H15.2545H8.75Z" fill="#323130" />
                                </svg>
                            </button>
                            <strong>
                                {addComment.length}
                            </strong>
                        </div>
                    </div>

                </div>

            </div>

            {showModal && currentUser &&
                <div onClick={() => { setShowModal(false) }} className={cx('wrapper')}>
                    <div onClick={(e) => { e.stopPropagation() }} className={cx('modal-box')}>
                        <div className={cx('title_action')}>
                            <h2>Bình luận
                                <span>{addComment.length}</span>
                            </h2>
                            <div onClick={() => { setShowModal(false) }} className={cx('action-close')}>
                                <FontAwesomeIcon icon={faClose} />
                            </div>
                        </div>
                        <div className={cx('user-comment')}>
                            <Link to={'/profile'}>
                                <img src={currentUser.photoURL != null ? currentUser.photoURL : images.noImage} />
                            </Link>

                            <input onKeyDown={handleEnterKey} value={comment} ref={inputRef} onChange={(e) => { setComment(e.target.value) }} placeholder='Viết bình luận' />
                            <button onClick={handleSentComment}>Gửi</button>
                        </div>

                        <div className={cx('list-comments')}>
                            {

                                addComment.slice(0).reverse().map((comment, index) => (
                                    <div key={index} className={cx('list-comment')}>
                                        <Link to={currentUser && currentUser.uid === comment.account ? '/profile' : `/account/${comment.account}`}>

                                            <img src={comment.src_account != null ? comment.src_account : images.noImage} />
                                        </Link>
                                        <div className={cx('name-content')}>

                                            <p>
                                                <Link to={currentUser && currentUser.uid === comment.account ? '/profile' : `/account/${comment.account}`}>
                                                    {comment.name_acount}
                                                </Link>
                                                <span>{comment.create_time}</span>
                                            </p>
                                            <div className={cx('content-user-comment')}>
                                                {comment.content_comment}


                                                {/* {comment.hearts && comment.hearts != 0 && (
                                                    <span className={cx('tym-of-comm')}>
                                                        <img src={images.tymFb} />
                                                        <span>{comment.hearts}</span>
                                                    </span>
                                                )} */}




                                            </div>
                                            <div className={cx('action-comment')}>
                                                {
                                                    currentUser.uid === comment.account && (<button onClick={() => { handleDeleteComment(comment) }}>Xóa</button>)
                                                }

                                                <button onClick={() => { handleLikeComment(comment) }}>Thích</button>
                                                <button >Phản hồi</button>

                                            </div>
                                        </div>


                                    </div>

                                ))
                            }


                        </div>

                    </div>
                </div>
            }
        </>

    );
}

export default Video;