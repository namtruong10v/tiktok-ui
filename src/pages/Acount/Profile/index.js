import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Modal, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import images from '~/assets/images';
import Input from '~/components/Input';
import { useAuth, updateProfileUser, firestore } from '~/firebase';
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { uploadVideo } from "~/firebase";
import { faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { openNotificationSuccess } from '~/components/Notification';
import { useTranslation } from 'react-i18next';


const cx = classNames.bind(styles);




function Profile() {

    const { t } = useTranslation('common')

    const currentUser = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [isModalOpenDelect, setIsModalOpenDelect] = useState(false)

    const [isLogin, setIsLogin] = useState(false);
    const [photo, setPhoto] = useState(isLogin && currentUser.photoURL != null ? currentUser.photoURL : images.noImage);
    const [innerPhoto, setInnerPhoto] = useState(null);
    const [showInnerPhoto, setShowInnerPhoto] = useState(false);
    const [nameUser, setNameUser] = useState(isLogin && currentUser.displayName != null ? currentUser.displayName : '');
    const [videoUser, setVideoUser] = useState([]);

    const [loading, setLoading] = useState(false);

    const [filedId, setFiledId] = useState('')
    const [videoEdited, setVideoEdited] = useState();
    const [titleVideoEdit, setTitleVideoEdit] = useState();
    const [tagsVideoEdit, setTagsVideoEdit] = useState({})




    const fechVideo = async () => {
        const q = collection(firestore, "postVideo");
        const data = await getDocs(q);

        setVideoUser(data.docs.filter((doc) => doc.data().account.id === currentUser.uid))


    }

    useEffect(() => {
        if (currentUser) {
            setIsLogin(true);
            setPhoto(currentUser.photoURL)
            setNameUser(currentUser.displayName);
            fechVideo();
        }
    }, [currentUser])



    // làm tiếp cho inner ra video


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {

        await handleSubmitEditProfile();

        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };



    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(file)
            setInnerPhoto(file);
            setShowInnerPhoto(true)

        }
    }

    const handleSubmitEditProfile = async (e) => {
        try {
            updateProfileUser(photo, currentUser, loading, nameUser);
            openNotificationSuccess('topRight', `${t('notification.succeed')}`, `${t('page_profile_admin.profile_update_successful')}`);


        } catch (error) {
            console.log(error)
        }

    }

    //---------------------------------------------------//

    // remove handel


    const getDataIdVideoDelect = (id) => {
        setFiledId(id);
        console.log(id, 'iddddddd')
        setIsModalOpenDelect(true)

    }
    const deleteVideo = async (id) => {
        await deleteDoc(doc(firestore, "postVideo", `${id}`));
        fechVideo();
        openNotificationSuccess('topRight', `${t('notification.succeed')}`, `${t('page_profile_admin.your_video_has_been_removed')}`);
        setIsModalOpenDelect(false)

    }
    const handleCancelDelect = () => {
        setIsModalOpenDelect(false)
    }


    // edit handel


    const handleChangeVideo = async (e) => {
        setLoading(true)
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        const urlFile = await uploadVideo(file, setLoading);
        setLoading(false)
        setVideoEdited(urlFile);
    }

    const options = [];



    const handleChangeSelect = (value) => {
        setTagsVideoEdit(value);
    };



    const editVideo = async (id, video) => {

        setFiledId(id)
        setVideoEdited(video.src_video);
        setTitleVideoEdit(video.title);
        setTagsVideoEdit(video.hastag);

        setIsModalOpenEdit(true);
    }

    //submit edit video
    const handelSubmitEdit = async (id) => {

        const frankDocRef = doc(firestore, "postVideo", `${id}`);
        setLoading(true)
        await updateDoc(frankDocRef, {
            "title": titleVideoEdit,
            "hastag": tagsVideoEdit,
            "src_video": videoEdited
        });
        setLoading(false);
        openNotificationSuccess('topRight', `${t('notification.succeed')}`, `${t('page_profile_admin.your_video_has_been_edited')}`)
        setIsModalOpenEdit(false);
        fechVideo()

    };


    const handelCanelEdit = () => {
        setIsModalOpenEdit(false);
    };






    return (
        <div className={cx('wrapper')} >
            {
                isLogin ?

                    <>
                        <div className={cx('infor_user')}>
                            <div className={cx('avatar_user')}>
                                <img src={photo} />
                            </div>
                            <div className={cx('infor_name_box')}>
                                <p className={cx('infor_name')}>{nameUser}</p>
                                <p className={cx('infor_email')}>{currentUser.email}</p>

                                <button className={cx('actions', 'action-btn', 'action-outline', 'btn-edit-profile')} onClick={showModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" width="1em" height="1em" className="tiktok-l7zpu2-StyledEditIcon e33dl3i2"><path fill="currentColor" fillRule="evenodd" d="M15.393 2.226a.842.842 0 00-1.17.02L8.142 8.33a.842.842 0 00-.247.595v2.34c0 .464.377.841.842.841h2.183a.842.842 0 00.596-.246l6.237-6.238a.843.843 0 00-.02-1.211l-2.34-2.184zM9.58 9.273l5.26-5.26 1.107 1.033-5.374 5.375h-.993V9.273zM9.58 2c.232 0 .42.189.42.421v.842a.421.421 0 01-.42.421H4.526a.842.842 0 00-.842.842v10.948c0 .465.377.842.842.842h10.947a.842.842 0 00.842-.842V10.42c0-.232.189-.421.421-.421h.842c.233 0 .422.188.422.421v5.053A2.526 2.526 0 0115.473 18H4.526A2.526 2.526 0 012 15.474V4.526A2.526 2.526 0 014.526 2H9.58z" clipRule="evenodd" /></svg>
                                    <span style={{ marginLeft: 5 }}>{t('page_profile_admin.edit_profile')}</span>
                                </button>
                                <Modal title={t('page_profile_admin.edit_profile')} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                                    <div className={cx('wrapper_modal')}>
                                        <form onSubmit={handleSubmitEditProfile}>
                                            <div className={cx('change-flies-box')}>
                                                <img className={cx('img-avatar_change')} src={photo} />
                                                {
                                                    showInnerPhoto && (<img className={cx('img-avatar_change2')} src={innerPhoto.preview} />)
                                                }
                                                <input type='file' className={cx('input-avatar_change')} onChange={handleChange} accept="image/*" />
                                            </div>
                                            <Input data={currentUser.email} disabled={true} label='Tiktok ID' type='text' />
                                            <Input data={nameUser} label={t('page_profile_admin.full_name')} type='text' placeholder={t('page_profile_admin.full_name')} setData={setNameUser} />

                                        </form>


                                    </div>

                                </Modal>
                            </div>

                        </div>

                        <h2>{t('page_profile_admin.video_your')}</h2>

                        <div className={cx('video-user_list')}>

                            {
                                videoUser.map((video, index) => (

                                    <div key={index} className={cx('viddeo_control_box')}>
                                        <video className={cx('video-user')} key={index} controls src={video.data().src_video}>

                                        </video>
                                        <Tippy
                                            delay={[0, 300]}
                                            content={t('page_profile_admin.detele_video')}
                                            placement='left'
                                        >
                                            <button key={index} onClick={() => { getDataIdVideoDelect(video.id) }} className={cx('deleteVideo_user')}><FontAwesomeIcon icon={faTrash} /></button>

                                        </Tippy>



                                        <Tippy
                                            delay={[0, 300]}
                                            content={t('page_profile_admin.edit_video')}
                                            placement='left'
                                        >
                                            <button onClick={() => { editVideo(video.id, video.data()) }} key={index} className={cx('editVideo_user')}><FontAwesomeIcon icon={faPencilSquare} /></button>
                                        </Tippy>
                                    </div>


                                ))


                            }

                            <Modal title="Edit Video" open={isModalOpenEdit} onOk={() => { handelSubmitEdit(filedId) }} onCancel={handelCanelEdit}>
                                <div className={cx('wrapper_modal2')}>
                                    <form >
                                        {loading && (<div className={cx('lds-ring')}><div></div><div></div><div></div><div></div></div>)}
                                        <div className={cx('change-flies-box')}>
                                            <video className={cx('video-preview')} playsInline muted controls src={videoEdited} > </video>
                                            <input onChange={handleChangeVideo} type='file' accept="video/*" />
                                            <input className={cx('description_video')} value={titleVideoEdit} onChange={(e) => { setTitleVideoEdit(e.target.value) }} type='text' placeholder={t('page_upload_video.description_this_vd')} />
                                            <Select
                                                mode="tags"
                                                style={{
                                                    width: '100%',
                                                }}
                                                defaultValue={tagsVideoEdit}
                                                placeholder="Tags Video"
                                                onChange={handleChangeSelect}
                                                options={options}
                                            />
                                        </div>
                                    </form>


                                </div>

                            </Modal>

                            <Modal title={t('page_profile_admin.detele_video')} open={isModalOpenDelect} onOk={() => { deleteVideo(filedId) }} onCancel={handleCancelDelect}>
                                <p>{t('page_profile_admin.do_you_want_remove_video')}</p>
                            </Modal>

                        </div>
                    </>



                    :
                    <Link to='/login'>{t('page_profile_admin.you_are_not_logged_in')}</Link>
            }
        </div>

    );
}

export default Profile;