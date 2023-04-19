import { useState } from "react";
import classNames from "classnames/bind";
import styles from './Upload.module.scss';
import { Modal, Select } from 'antd';
import { useAuth } from "~/firebase";
import images from "~/assets/images";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { openNotificationSuccess, openNotificationErorr } from '~/components/Notification'
import { uploadVideo } from "~/firebase";

const firestore = getFirestore();
const postVideos = collection(firestore, "postVideo")

// upload Video 


const cx = classNames.bind(styles)

function Upload() {
    const currentUser = useAuth();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [video, setVideo] = useState('');
    const [tagsVideo, setTagsVideo] = useState({});
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
            openNotificationSuccess("topRight", 'Thành công !', 'Video của bạn đã được tải lên !')

        } catch (error) {
            openNotificationErorr("topRight", 'Thất bại !', 'Dường như có lỗi sảy ra')
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
                            <div className={cx("jsx-4258277349", "text-main")}><span className={cx("css-1q42136")}>Chọn video để tải lên</span></div>
                            <div className={cx("jsx-4258277349 ")}><span className={cx("css-1wbo2p7")}>Hoặc kéo và thả tập tin</span></div>
                            <div className={cx("jsx-4258277349", "text-sub")}><span className={cx("css-1wbo2p7")}>Có thể tách video dài thành nhiều phần để tăng khả năng hiển thị</span></div>
                            <div className={cx("jsx-4258277349", "text-video-info")}>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>MP4 hoặc WebM</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>Độ phân giải 720x1280 trở lên</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>Tối đa 30 phút</span></div>
                                <div className={cx("jsx-4258277349")}><span className={cx("css-tad11f")}>Nhỏ hơn 2 GB</span></div>
                            </div>
                            <div className={cx("jsx-4258277349 file-select-button wide-file-select-button")}>
                                <button onClick={showModal} className={cx("css-byn4hh")}>
                                    <div className={cx("css-1db5cpb")}>
                                        <div className={cx("css-1z070dx")}>Chọn tập tin</div>
                                    </div>
                                </button>

                                <Modal title="Upload Video" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <div className={cx('wrapper_modal')}>
                                        <form >
                                            {loading && (<div className={cx('lds-ring')}><div></div><div></div><div></div><div></div></div>)}
                                            <div className={cx('change-flies-box')}>
                                                <video className={cx('video-preview')} playsInline muted controls src={video} > </video>
                                                <input onChange={handleChangeVideo} type='file' />
                                                <input className={cx('description_video')} value={description} onChange={(e) => { setDescription(e.target.value) }} type='text' placeholder="Mô tả Video" />
                                                <Select
                                                    mode="tags"
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                    placeholder="Tags Video"
                                                    onChange={handleChange}
                                                    options={options}
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