import { useEffect, useState, useRef } from 'react';
import HasslessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner, faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';


import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/components/hooks';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

import { useTranslation } from "react-i18next";


const cx = classNames.bind(styles)


function Search() {
    const { t } = useTranslation('common');

    const db = getFirestore()
    const [searchValue, setSearchValue] = useState('')
    const [resultSearch, setResultSearch] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loadding, setLoadding] = useState(false)

    const debounced = useDebounce(searchValue, 500)

    const inputRef = useRef();

    useEffect(() => {
        if (!debounced.trim()) {
            setResultSearch([])
            return;
        }

        const fetchApi = async () => {
            setLoadding(true)
            console.log(debounced, 'debounced')
            const q = query(collection(db, "Users"))
            const data = await getDocs(q);

            setResultSearch(data.docs.map((doc) => doc))




            setLoadding(false)
        }

        fetchApi()

    }, [debounced])

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setResultSearch([])
    }


    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleValue = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {

            setSearchValue(searchValue);
        }


    }
    return (
        //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context. 
        <div className={cx('wrapper-search')}>
            <HasslessTippy
                visible={showResult && resultSearch.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex='-1' {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accout</h4>
                            {resultSearch.map((result, index) => {
                                if (result.data().user.displayName.includes(debounced)) {
                                    return <AccountItem key={index} data={result.data()} />
                                } else {

                                    return false;

                                }

                            })}
                        </PopperWrapper>

                    </div>
                )}
                onClickOutside={handleHideResult}
            >

                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        placeholder={t('header.search')}
                        onChange={handleValue}
                        onFocus={() => {
                            setShowResult(true)
                        }}
                    />
                    {!!searchValue && !loadding && (
                        <button
                            className={cx('clear-search')}
                            onClick={handleClear}
                        >
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}


                    {loadding && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}



                    <button className={cx('search-btn')} onMouseDown={(e) => { e.preventDefault() }}>

                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </button>

                </div>
            </HasslessTippy>
        </div>
    );
}

export default Search;