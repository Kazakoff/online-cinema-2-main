import React from 'react';
import { tagsFormat } from '../../utils';

export const MovieBody = (props) => {

    return (
        <>
            <td data-title='Title'>{props.movie.title}</td>
            <td data-title='Description'>{props.movie.description}</td>
            <td data-title='Ticket price'>{props.movie.price}</td>
            <td data-title='Date'>{props.movie.start}</td>
            <td data-title='Time'>{props.movie.end}</td>
            <td data-title='Picture'><img src={props.movie.image} alt='' /></td>
            <td data-title='Tags'>{tagsFormat(props.movie.tags)}</td>
        </>
    )
}