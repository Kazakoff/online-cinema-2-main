import API from '../../API/axios';

export const deleteUser = (uid) => {
    return () => {
        API.post('delete_user', uid);
    }
}