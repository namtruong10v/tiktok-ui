import { useEffect, useState, useRef } from 'react';
import HasslessTippy from '@tippyjs/react/headless';
import { faCircleXmark, faSpinner, faMagnifyingGlass, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';


import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Poper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/components/hooks';

import * as searchSeivces from '~/apiServices/searchSevices'

const cx = classNames.bind(styles)


function Search() { 
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

       const fetchApi = async () =>{
            setLoadding(true)

           const result = await searchSeivces.search(debounced)
           setResultSearch(result);

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
    return (
        <HasslessTippy
            visible={showResult && resultSearch.length > 0}
            interactive={true}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex='-1' {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accout</h4>
                        {resultSearch.map((result) => {

                            return <AccountItem key={result.id} data={result} />
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
                    placeholder='Search accout and videos '
                    onChange={(e) => {
                        setSearchValue(e.target.value);


                    }}
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



                <button className={cx('search-btn')}>

                    <FontAwesomeIcon icon={faMagnifyingGlass} />

                </button>

            </div>
        </HasslessTippy>
    );
}

export default Search;