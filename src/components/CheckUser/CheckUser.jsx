// import { useState } from 'react';
// import './optionSelect.css';

// export default function OptionSelect(props) {
//     const {
//         page,
//         inputs,
//         type,
//         placeholder,
//         label,
//         name,
//         value1,
//         text1,
//         value2,
//         text2,
//         handleChange,
//     } = props;

//     const handleChangeSelect = (e) => {
//         if (handleChange) {
//             handleChange(e);
//         }
//     };

//     return (
//         <div
//         className={`new-discount-type-person ${
//             inputs.type_user === 'person' ? 'block' : ''
//         }`}
//     >
//         <OptionSelect
//             type="text"
//             placeholder="_id người sử dụng"
//             label="Thêm người dùng"
//             name="used_by"
//             handleChange={handleChange}
//         />

//         <button
//             className="new-discount-check-user_id"
//             style={
//                 inputs.used_by !== ''
//                     ? {
//                           backgroundColor: '#338dbc',
//                           color: 'white',
//                           cursor: 'pointer',
//                       }
//                     : {}
//             }
//             onClick={handleCheck}
//         >
//             Kiểm tra
//         </button>
//         {checkUser && <span>{checkUser}</span>}
//     </div>
//     );
// }
