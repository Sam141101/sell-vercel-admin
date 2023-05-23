import { Link, useLocation } from 'react-router-dom';
import './product.css';
import Chart from '../../components/chart/Chart';
import { Publish } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import { updateProduct } from '../../redux/apiCalls';
import { createAxiosInstance } from '../../useAxiosJWT';
import { BASE_URL_API } from '../../requestMethods';

export default function Product() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const dispatch = useDispatch();
    const location = useLocation();
    const productId = location.pathname.split('/')[2];

    const axiosJWT = createAxiosInstance(admin, dispatch);

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId),
    );

    const [pStats, setPStats] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [infoProduct, setInfoProduct] = useState({});

    const MONTHS = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        [],
    );

    // load hình ảnh lên
    const handleChangeFile = async (event) => {
        const files = event.target.files;
        let images = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.readAsDataURL(file);

            // Promisify FileReader onload event
            const onLoad = () => {
                return new Promise((resolve, reject) => {
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = reject;
                });
            };

            const src = await onLoad();
            images.push(src);
        }

        setSelectedFiles(selectedFiles.concat(images));
        setFileList((prevFileList) => [...prevFileList, ...[...event.target.files]]);
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedFiles];
        newImages.splice(index, 1);
        setSelectedFiles(newImages);

        const newStorage = [...fileList];
        newStorage.splice(index, 1);
        setFileList(newStorage);
    };

    // upload product
    const [inputs, setInputs] = useState({
        expireAt: 0,
    });
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleClick = (e) => {
        e.preventDefault();

        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
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
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const upproduct = { ...inputs, img: downloadURL };
                    updateProduct(productId, upproduct, dispatch, token, axiosJWT);
                });
            },
        );
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API + 'products/size-discount-product/' + productId,
                );
                setInfoProduct(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [productId]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axiosJWT.get(
                    'http://localhost:5000/api/orders/income?pid=' + productId,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                const list = res.data.sort((a, b) => {
                    return a._id - b._id;
                });
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ]),
                );
            } catch (err) {}
        };
        getStats();
    }, [token, productId, MONTHS]);

    console.log('infoProduct', infoProduct);

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Tạo mới</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="product-top-right-frame">
                        <div className="product-top-right-title">Kho hàng</div>

                        <div className="productInfoBottom">
                            <div className="productInfoItem">
                                <span className="productInfoKey">ID:</span>
                                <span className="productInfoValue">{product._id}</span>
                            </div>
                            <div className="productInfoItem">
                                <span className="productInfoKey">Giảm giá sản phẩm:</span>
                                <span className="productInfoValue">
                                    {infoProduct.findDiscount?.discount_amount}%
                                </span>
                            </div>

                            <div className="productInfoItem">
                                <div className="productInfoKey">
                                    Số lượng sản phẩm trong kho:
                                </div>
                            </div>

                            <table className="table">
                                <tbody>
                                    <tr>
                                        <th className="product-th th">Size</th>
                                        <th className="th">Số lượng</th>
                                    </tr>

                                    {Object.keys(infoProduct).length !== 0 &&
                                        infoProduct.findSizes.map((item, index) => (
                                            <tr key={index}>
                                                <td className="td">{item.size}</td>
                                                <td className="td">{item.inStock}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="productTopLeft">
                    <div className="product-top-left-frame">
                        <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Tên sản phẩm</label>
                        <input
                            name="title"
                            type="text"
                            onChange={handleChange}
                            placeholder={product.title}
                        />
                        <label>Mô tả</label>
                        <input
                            name="desc"
                            type="text"
                            onChange={handleChange}
                            placeholder={product.desc}
                        />
                        <label>Giá tiền</label>
                        <input
                            name="price"
                            type="text"
                            onChange={handleChange}
                            placeholder={product.price}
                        />

                        <label>Kiểu sản phẩm</label>
                        <input
                            name="categories"
                            type="text"
                            onChange={handleChange}
                            placeholder={product.categories}
                        />

                        <label>Màu sắc</label>
                        <input
                            name="color"
                            type="text"
                            onChange={handleChange}
                            placeholder={product.color}
                        />

                        <label>Số lượng hàng</label>

                        {Object.keys(infoProduct).length !== 0 &&
                            infoProduct.findSizes.map((item, index) => (
                                <div className="frame-size" key={index}>
                                    <span className="title-size">Size {item.size}:</span>
                                    <input
                                        name={`Size${item.size}`}
                                        type="number"
                                        onChange={handleChange}
                                        className="size-amount-inStock"
                                        placeholder={item.inStock}
                                        // value={item.inStock || 0}
                                    />
                                </div>
                            ))}

                        <label>Giảm giá sản phẩm</label>
                        <input
                            name="discount"
                            type="number"
                            onChange={handleChange}
                            placeholder={infoProduct.findDiscount?.discount_amount || 0}
                        />

                        <label>Thời gian giảm giá</label>
                        <input
                            name="expireAt"
                            type="number"
                            onChange={handleChange}
                            placeholder={
                                infoProduct.findDiscount?.expireAt === null ? 0 : 0
                            }
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.img} alt="" className="productUploadImg" />
                            {/* <label for="file"> */}
                            <label htmlFor="file">
                                <Publish />
                            </label>
                            <input
                                // className="user-profile-button-select-img"
                                type="file"
                                id="file"
                                multiple
                                onChange={handleChangeFile}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <button onClick={handleClick} className="productButton">
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
