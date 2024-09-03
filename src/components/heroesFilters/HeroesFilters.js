import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import store from '../../store';

import { filtersChanged, fetchFilters, selectAll } from './filtersSlice';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Помилка загрузки</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтри не знайдені</h5>
        }

        return arr.map(({name, className, label}) => {

            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });
            
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(filtersChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Відфільтруйте героїв по елементах</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;
