import React, { useEffect, useState } from 'react'

const MultiSelect = (props) => {
    const [selected, setSelected] = useState([]);
    const [notSelected, setNotSelected] = useState([]);
    useEffect(() => {
        const arr = [];
        const arr2 = [];
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].selected) {
                arr.push({ value: props.data[i].value, userId: props.data[i].userId, selected: props.data[i].selected, img: props.data[i].img });
            } else {
                arr2.push({ value: props.data[i].value, userId: props.data[i].userId, selected: props.data[i].selected, img: props.data[i].img });
            }
        }
        setSelected(arr);
        setNotSelected(arr2);
    }, [props])

    const handleChange = e => {
        let checkedData = selected;
        let unCheckedData = [];
        if (e.target.checked) {
            checkedData.push({ value: e.target.value, userId: e.target.getAttribute("data-id"), selected: true, img: e.target.getAttribute("data-src") });
            for (let i = 0; i < notSelected.length; i++) {
                if (notSelected[i].value !== e.target.value) {
                    unCheckedData.push({ value: notSelected[i].value, userId: notSelected[i].userId, selected: false, img: notSelected[i].img })
                }
            }
        }
        setSelected(checkedData)
        setNotSelected(unCheckedData);
        props.changeData(checkedData);
        unCheckedData = [];
        checkedData = [];
        e.target.checked = false;
    }

    const [newHtml, setHtml] = useState("none");

    const changeHtml = (e) => {
        e.preventDefault();
        if (newHtml === "none") {
            setHtml("flex");
        } else {
            setTimeout(() => {
                setHtml("none");
            }, 500);
        }
    }

    const deleteMember = (id, name, img) => {
        const notChecked = notSelected;
        const selectedData = [];
        notChecked.push({ value: name, userId: id, selected: false, img: img });
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].userId !== id) {
                selectedData.push({ value: selected[i].value, userId: selected[i].userId, selected: true, img: selected[i].img });;
            }
        }
        props.changeData(selectedData);
        setNotSelected(notChecked);
        setSelected(selectedData);
    }

    return (
        <div className='multiselect' onMouseEnter={changeHtml} onMouseLeave={changeHtml}>
            <div className="selected">
                {selected.length > 0 ? selected.map((ele, id) => {
                    return <div key={id} className="item">
                        <p>
                            {ele.value}
                            <button type="button" onClick={e => deleteMember(ele.userId, ele.value, ele.img)} className="btn-close" aria-label="Close"></button>
                        </p>
                    </div>
                }) : <p>Click to select</p>}
            </div>
            <div className="selection" style={{ display: newHtml }}>
                {notSelected.map((ele, id) => {
                    return <div key={id} className='item'>
                        <label htmlFor={id}>
                            <input type="checkbox" onChange={handleChange} data-src={ele.img} data-id={ele.userId} value={ele.value} id={id} />
                            <div className='details'>
                                {ele.img !== "" ? <img src={"https://api.softingart.com/api/files/images/" + ele.img} alt={ele.value} /> : ""}
                                {ele.value}
                            </div>
                        </label>
                    </div>
                })}
            </div>
        </div>
    )
}

export default MultiSelect