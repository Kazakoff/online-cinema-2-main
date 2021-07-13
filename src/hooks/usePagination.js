import { useState, useEffect } from 'react';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { first, last } from 'lodash'

export function usePagination(collection) {

    const [pointer, setPointer] = useState(undefined)
    const [forwardPointer, setForwardPointer] = useState(undefined)
    const [backwardPointers, setBackwardPointers] = useState([])
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [loading, setLoading] = useState(false)
    const [isMovedBackward, setIsMovedBackward] = useState(false)
    const [lastDoc, setLastDoc] = useState({})
    const [orderBy, setOrderBy] = useState('time')
    const [where, setWhere] = useState(null)

    useFirestoreConnect([
        {
            collection: collection,
            orderBy: [orderBy, 'asc'],
            where: where,
            limit: limit,
            ...(isMovedBackward ? { startAt: pointer } : { startAfter: pointer })
        },
    ]);

    const paginatedArray = [...useSelector(state => state.firestore.ordered[collection] || [])]

    useEffect(() => { //Reset all if limit or where changed
        setPointer(undefined)
        setForwardPointer(undefined)
        setBackwardPointers([])
        setPage(1)
        setLoading(false)
        setIsMovedBackward(false)
    }, [limit, where])

    useEffect(() => { // Set forward pointer
        if (last(paginatedArray))
            setForwardPointer(last(paginatedArray)[orderBy])
    }, [paginatedArray, orderBy])

    useEffect(() => {
        if (first(paginatedArray) && !isMovedBackward && !loading) { // Add pointer to back chain 
            setBackwardPointers((prevState) => {
                const newState = prevState
                newState[page] = first(paginatedArray)[orderBy]
                return newState
            })
        }
        else if (isMovedBackward === true && !loading) { //Remove pointer if moved back
            setBackwardPointers((prevState) => {
                const newState = prevState
                newState.pop()
                setIsMovedBackward('stop')
                return newState
            })
        }
    }, [page, paginatedArray, isMovedBackward, loading, orderBy])

    const changePointer = (newPage) => {
        if (paginatedArray) {
            if (newPage > page) {
                setPointer(forwardPointer)
            }
            else if (newPage < page) {
                setPointer(backwardPointers[newPage])
            }
        }
    };

    useEffect(() => {
        setLoading(false)
    }, [forwardPointer, backwardPointers])

    const handleNextPage = () => {
        if (forwardPointer !== lastDoc && !loading && paginatedArray.length) {
            changePointer(page + 1)
            setPage(page + 1)
            setLoading(true)
            setIsMovedBackward(false)
        }
    };

    const handlePrevPage = () => {
        if (page !== 1 && !loading) {
            changePointer(page - 1)
            setPage(page - 1)
            setLoading(true)
            setIsMovedBackward(true)
        }
    };

    const firestore = useFirestore() //Get last doc
    useEffect(() => {
        if (forwardPointer && where) {
            firestore.collection(collection).orderBy(orderBy, 'desc').where(...where).limit(1).get().then((resp) => {
                first(resp.docs) &&
                    setLastDoc(first(resp.docs).data()[orderBy])
            })
        }
        if (forwardPointer && !where) {
            firestore.collection(collection).orderBy(orderBy, 'desc').limit(1).get().then((resp) => {
                setLastDoc(first(resp.docs).data()[orderBy])
            })
        }
    }, [firestore, forwardPointer, orderBy, collection, where])

    return { paginatedArray, limit, setLimit, page, handleNextPage, handlePrevPage, where, setWhere, loading };
}