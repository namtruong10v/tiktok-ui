import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Upload.module.scss';
import { Modal, Select } from 'antd';
import { useAuth } from "~/firebase";
import images from "~/assets/images";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { openNotificationSuccess, openNotificationErorr } from '~/components/Notification'
import { uploadVideo } from "~/firebase";
import { useTranslation } from "react-i18next";

const firestore = getFirestore();
const postVideos = collection(firestore, "postVideo")

// upload Video 


const cx = classNames.bind(styles)

function Upload() {
    const { t } = useTranslation('common')

    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [video, setVideo] = useState('');
    const [tagsVideo, setTagsVideo] = useState([]);
    const [description, setDescription] = useState('');




    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {

        try {
            setLoading(true)
            await addDoc(postVideos, {
                id: Math.random(),
                title: description,
                account: {
                    id: currentUser.uid,
                    name_acount: currentUser.displayName,
                    nick_name: currentUser.email,
                    image: currentUser.photoURL != null ? currentUser.photoURL : images.noImage
                },
                music: '',
                hastag: tagsVideo,
                src_video: video,
                tick: true,
                heart: 0,
                comments: []
            });
            setLoading(false);
            setIsModalOpen(false);
            openNotificationSuccess("topRight", `${t('notification.succeed')}`, `${t('page_upload_video.video_uploaded')}`);
            console.log('tagsVideo', tagsVideo)

        } catch (error) {
            openNotificationErorr("topRight", `${t('notification.failed')}`, `${t('notification.something_went_wrong')}`)
            console.log(error, 'có lõi')
        }

    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const options = [];


    const handleChange = (value) => {
        setTagsVideo(value);
        console.log(value)
    };

    const handleChangeVideo = async (e) => {
        const file = e.target.files[0];

        file.preview = URL.createObjectURL(file);
        const urlFile = await uploadVideo(file, setLoading)
        setVideo(urlFile);
    }


    return (
        <div style={{ marginTop: 100 }}>
            <div className={cx("jsx-2674289056 upload-container")}>
                <div className={cx("jsx-2674289056 uploader")}>
                    <div className={cx("jsx-4258277349 upload")}>
                        <input type="file" accept="video/*" className={cx("jsx-4258277349")} style={{ display: 'none' }} />
                        <div className={cx("jsx-4258277349", "upload-card", "before-upload-stage")}>
                            <img src="//lf16-tiktok-common.ibytedtos.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg" className={cx("jsx-4258277349 cloud-icon")} />
                            <div className={cx("jsx-4258277349", "text-main")}><span className={cx("css-1q42136")}>{t('page_upload_video.select_video_to_upload')}</span></div>
                            <div className={cx("jsx-4258277349 ")}><span className={cx("css-1wbo2p7")}> {t('page_upload_video.or_drag_and_drop_files')}</span></div>
                            <div className={cx("jsx-4258277349", "text-sub")}><span className={cx("css-1wbo2p7")}> {t('page_upload_video.long_video_upload')}</span></div>
                            <div className={cx("jsx-4258277349", "text-video-info")}>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>{t('page_upload_video.mp4_or_webM')}</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>{t('page_upload_video.resolution_720')}</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>{t('page_upload_video.max_30_minutes')}</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>{t('page_upload_video.less_than_2GB')}</span></div>
                            </div>
                            <div className={cx("jsx-4258277349 file-select-button wide-file-select-button")}>
                                <button onClick={showModal} className={cx("css-byn4hh")}>
                                    <div className={cx("css-1db5cpb")}>
                                        <div className={cx("css-1z070dx")}>{t('page_upload_video.select_file')}</div>
                                    </div>
                                </button>

                                <Modal title="Upload Video" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    {loading && (<div className={cx('lds-ring')}><div></div><div></div><div></div><div></div></div>)}
                                    <div className={cx('wrapper_modal')}>
                                        <form >

                                            <div className={cx('change-flies-box')}>
                                                <video className={cx('video-preview')} playsInline muted controls src={video} > </video>
                                                <input onChange={handleChangeVideo} type='file' accept="video/*" />
                                                <input className={cx('description_video')} value={description} onChange={(e) => { setDescription(e.target.value) }} type='text' placeholder={t('page_upload_video.description_this_vd')} />
                                                <Select
                                                    mode="tags"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Tags Video"
                                                    onChange={handleChange}
                                                    options={options}
                                                // defaultValue={['#XuHuong', '#Tiktok']}
                                                />
                                            </div>
                                        </form>


                                    </div>

                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Upload;