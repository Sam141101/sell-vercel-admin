import { useState } from 'react';
import './newProduct.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import { addProduct } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function NewProduct() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const axiosJWT = createAxiosInstance(admin, dispatch);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        // addProduct
        const fileName = new Date().getTime() + file.name;

        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;

                    default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const product = { ...inputs, img: downloadURL };
                    addProduct(product, dispatch, token, axiosJWT);
                });
            },
        );
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle1">Sản phẩm mới</h1>

            <div className="addProductItem">
                <label>Hình ảnh</label>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />
            </div>

            <div className="frame-new-info">
                <div className="form-new-info-left">
                    <form className="addProductForm">
                        <div className="addProductItem">
                            <label>Tên sản phẩm</label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Apple Airpods"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Mô tả</label>
                            <input
                                name="desc"
                                type="text"
                                placeholder="Description...."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Giá</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="10000"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="addProductItem">
                            <label>Loại sản phẩm</label>
                            <input
                                type="text"
                                name="categories"
                                placeholder="TEE, SHORT, POLO..."
                                onChange={handleChange}
                            />
                        </div>

                        <div className="addProductItem">
                            <label>Màu sắc</label>
                            <input
                                type="text"
                                name="color"
                                placeholder="RED, BLACK, WHITE..."
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </div>

                <div className="form-new-info-right">
                    <div className="frame-add-size">
                        <div className="addProductItem">
                            <label>Số lượng sản phẩm size S</label>
                            <input
                                name="sizeS"
                                type="number"
                                onChange={handleChange}
                                placeholder="Số lượng sản phẩm"
                            />
                        </div>

                        <div className="addProductItem">
                            <label>Số lượng sản phẩm size M</label>
                            <input
                                type="number"
                                name="sizeM"
                                onChange={handleChange}
                                placeholder="Số lượng sản phẩm"
                            />
                        </div>

                        <div className="addProductItem">
                            <label>Số lượng sản phẩm size L</label>
                            <input
                                type="number"
                                name="sizeL"
                                onChange={handleChange}
                                placeholder="Số lượng sản phẩm"
                            />
                        </div>
                    </div>
                    <div className="frame-add-discount">
                        <div className="addProductItem">
                            <label>Giảm giá sản phẩm</label>
                            <input
                                onChange={handleChange}
                                name="dicount"
                                type="number"
                                placeholder="Số phần trăm muốn giảm"
                            />
                        </div>

                        <div className="addProductItem">
                            <label>Thời gian giảm giá sản phẩm</label>
                            <input
                                type="number"
                                onChange={handleChange}
                                name="expireAt"
                                placeholder="Số giờ giảm giá"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleClick} className="addProductButton">
                Tạo mới
            </button>
        </div>
    );
}
